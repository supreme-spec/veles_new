import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { db } from '@/db';
import { hotels, reviews } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET(req: Request, { params }: { params: Promise<{ hid: string }> }) {
  const { hid } = await params;
  const url = new URL(req.url);
  const checkin = url.searchParams.get('checkin');
  const checkout = url.searchParams.get('checkout');
  const adults = Number(url.searchParams.get('adults') || 2);
  const children = url.searchParams.get('children') ? JSON.parse(url.searchParams.get('children') as string) : [];
  const residency = url.searchParams.get('residency') || 'RU';
  const timeout = Number(url.searchParams.get('timeout') || 30);

  try {
    const [hotel] = await db
      .select()
      .from(hotels)
      .where(eq(hotels.ostrovokHid, Number(hid)))
      .limit(1);

    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    const staleHours = (Date.now() - hotel.lastSyncedAt.getTime()) / (1000 * 60 * 60);

    if (staleHours > 24 || !hotel.description) {
      try {
        const contentResponse = await ostrovokClient.getHotelContent(hotel.ostrovokHid);
        const content = contentResponse?.data?.data || contentResponse?.data || contentResponse;

        const payload: any = {
          lastSyncedAt: new Date(),
          lastSeenAt: new Date(),
        };

        if (content?.name && !hotel.name) payload.name = content.name;
        if (content?.description_struct?.[0]?.paragraphs && !hotel.description) {
          payload.description = content.description_struct[0].paragraphs.join('\n');
        }
        if (Array.isArray(content?.images) && (!hotel.images || hotel.images.length === 0)) payload.images = content.images;
        if (Array.isArray(content?.amenity_groups) && (!hotel.amenities || hotel.amenities.length === 0)) {
          const amenities = content.amenity_groups.flatMap((g: any) => g.amenities || []);
          payload.amenities = amenities;
        }
        if (content?.contacts && !hotel.contacts) payload.contacts = content.contacts;
        if (content?.address && !hotel.address) payload.address = content.address;
        if (content?.metapolicy_struct?.cancellation_penalties && !hotel.cancellationPolicies) {
          payload.cancellationPolicies = content.metapolicy_struct.cancellation_penalties;
        }
        if (content?.metapolicy_struct?.meal && !hotel.roomsData) {
          payload.roomsData = {
            mealTypes: content.metapolicy_struct.meal,
            taxes: content.metapolicy_struct.tax_data?.taxes || [],
          };
        }

        await db.update(hotels).set(payload).where(eq(hotels.id, hotel.id));
      } catch (e) {
        console.error(`[HOTEL DETAIL LAZY ERROR]:`, e);
      }
    }

    const hotelReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.hotelHid, Number(hid)))
      .orderBy(desc(reviews.createdAt))
      .limit(10);

    const aggregateResult = await db
      .select({
        averageRating: sql<number>`ROUND(AVG(${reviews.rating})::numeric, 1)`,
        totalReviews: sql<number>`COUNT(*)`,
      })
      .from(reviews)
      .where(eq(reviews.hotelHid, Number(hid)));

    const aggregate = aggregateResult[0] || { averageRating: 0, totalReviews: 0 };

    if (!checkin || !checkout) {
      return NextResponse.json({
        hotel: {
          ...hotel,
          cancellationPolicies: hotel.cancellationPolicies,
          roomsData: hotel.roomsData,
        },
        reviews: hotelReviews,
        aggregate: {
          averageRating: Number(aggregate.averageRating),
          totalReviews: Number(aggregate.totalReviews),
        },
        rates: null,
      });
    }

    const safeTimeout = Math.min(100, Math.max(5, Number.isFinite(timeout) ? timeout : 30));

    const hpResponse = await ostrovokClient.getHotelpage({
      hid: Number(hid),
      checkin,
      checkout,
      guests: [{ adults, children }],
      residency,
      timeout: safeTimeout,
    });

    const hpData = hpResponse?.data?.data || hpResponse?.data || hpResponse;

    const hpDataAny = hpData as any;

    const mealTypes = (() => {
      // @ts-ignore
      return hpDataAny?.meal_types || hotel.roomsData?.mealTypes || null;
    })();

    const bookHash = (() => {
      // @ts-ignore
      return hpDataAny?.book_hash || hpDataAny?.hotels?.[0]?.rates?.[0]?.book_hash || null;
    })();

    const searchHash = (() => {
      // @ts-ignore
      return hpDataAny?.search_hash || hpDataAny?.hotels?.[0]?.rates?.[0]?.search_hash || null;
    })();

    const rates = (() => {
      // @ts-ignore
      return hpDataAny?.rates || hpDataAny?.hotels?.[0]?.rates || null;
    })();

    return NextResponse.json({
      hotel: {
        ...hotel,
        cancellationPolicies: hotel.cancellationPolicies,
        roomsData: hotel.roomsData,
      },
      reviews: hotelReviews,
      aggregate: {
        averageRating: Number(aggregate.averageRating),
        totalReviews: Number(aggregate.totalReviews),
      },
      rates,
      bookHash,
      searchHash,
      mealTypes,
    });
  } catch (error: any) {
    console.error('[HOTEL DETAIL ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch hotel' }, { status: 500 });
  }
}
