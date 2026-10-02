import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hotels, reviews } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { ostrovokClient } from '@/lib/ostrovok/client';

export const runtime = 'nodejs';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const [hotel] = await db
      .select()
      .from(hotels)
      .where(sql`${hotels.seoSlug} = ${slug} OR ${hotels.slug} = ${slug}`)
      .limit(1);

    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    const hotelReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.hotelHid, hotel.ostrovokHid))
      .orderBy(desc(reviews.createdAt))
      .limit(10);

    const aggregateResult = await db
      .select({
        averageRating: sql<number>`ROUND(AVG(${reviews.rating})::numeric, 1)`,
        totalReviews: sql<number>`COUNT(*)`,
      })
      .from(reviews)
      .where(eq(reviews.hotelHid, hotel.ostrovokHid));

    const aggregate = aggregateResult[0] || { averageRating: 0, totalReviews: 0 };

    const response: any = {
      hotel,
      reviews: hotelReviews,
      aggregate: {
        averageRating: Number(aggregate.averageRating),
        totalReviews: Number(aggregate.totalReviews),
      },
    };

    const url = new URL(_req.url);
    const checkin = url.searchParams.get('checkin');
    const checkout = url.searchParams.get('checkout');
    const adults = Number(url.searchParams.get('adults') || '2');
    const childrenParam = url.searchParams.get('children');
    const residency = url.searchParams.get('residency') || 'RU';

    if (checkin && checkout) {
      let children: number[] = [];
      if (childrenParam) {
        try {
          const parsed = JSON.parse(childrenParam);
          if (Array.isArray(parsed)) {
            children = parsed.filter((age: any) => typeof age === 'number' && age >= 0 && age <= 17);
          }
        } catch {
          children = [];
        }
      }

      try {
        const hotelpage = await ostrovokClient.getHotelpage({
          hid: hotel.ostrovokHid,
          checkin,
          checkout,
          guests: [{ adults, children }],
          residency,
        });

        if (hotelpage.status === 'ok') {
          response.rates = hotelpage.result?.results || [];
          response.cancellationPolicies = hotelpage.result?.cancellation_penalties || null;
          response.taxes = hotelpage.result?.tax_data?.taxes || [];
        }
      } catch (error) {
        console.error('[HOTELPAGE LIVE ERROR]:', error);
      }
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('[HOTEL DETAIL ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch hotel' }, { status: 500 });
  }
}
