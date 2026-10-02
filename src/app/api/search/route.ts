import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { db } from '@/db';
import { hotels } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { getCached, setCached } from '@/lib/redis';
import { CACHE_TTL, getCacheKey } from '@/lib/cache-strategy';
import { measure } from '@/lib/performance-monitor';
import { searchQuerySchema } from '@/lib/validation';

export const runtime = 'nodejs';

const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  'москва': { lat: 55.7558, lon: 37.6173 },
  'санкт-петербург': { lat: 59.9343, lon: 30.3351 },
  'сочи': { lat: 43.6028, lon: 39.7342 },
  'казань': { lat: 55.7887, lon: 49.1221 },
  'дубай': { lat: 25.2048, lon: 55.2708 },
  'стамбул': { lat: 41.0082, lon: 28.9784 },
  'бангкок': { lat: 13.7563, lon: 100.5018 },
  'анталья': { lat: 36.8969, lon: 30.7133 },
  'шарм-эль-шейх': { lat: 27.9158, lon: 34.3299 },
  'пхукет': { lat: 7.8804, lon: 98.3923 },
};

const TEST_HOTEL_HID = 8526976;
const TEST_HOTEL_FALLBACK = {
  hid: TEST_HOTEL_HID,
  id: 'test_hotel',
  name: 'Тестовый отель Велес Вояж',
  region: { name: 'Белогорск', country_code: 'RU' },
  address: 'улица Московская 123, Белогорск',
  star_rating: 0,
  images: [],
  serp_filters: [],
};

function toTestHotelResult(h: any) {
  if (!h?.hid) return null;

  return {
    id: String(h.id || h.hid),
    ostrovokHid: h.hid,
    name: h.name || `Отель ${h.hid}`,
    slug: `hotel-${h.hid}`,
    city: h.region?.name || 'Неизвестно',
    country: h.region?.country_code || 'RU',
    address: h.address || null,
    stars: Number(h.star_rating || 0),
    geo: h.latitude != null && h.longitude != null
      ? [Number(h.longitude), Number(h.latitude)] as [number, number]
      : null,
    images: Array.isArray(h.images) ? h.images.map((url: string) => ({ medium: url.replace('{size}', '1024x768') })) : [],
    amenities: Array.isArray(h.serp_filters) ? h.serp_filters : [],
    description: (h.description_struct?.[0]?.paragraphs || []).join('\n') || null,
    minPrice: null,
    taxesIncluded: null,
      mealType: null,
      availability: false,
      paymentOptions: null,
      taxData: null,
      roomDataTrans: null,
      rgExt: null,
    };
}

async function upsertHotel(h: any) {
  if (!h?.hid) return null;
  try {
    const slug = `hotel-${h.hid}`;
    const payload = {
      ostrovokHid: h.hid,
      ostrovokId: String(h.hid),
      name: h.name || `Отель ${h.hid}`,
      normalizedName: String(h.name || '').toLowerCase().trim(),
      slug,
      seoSlug: slug,
      country: h.country?.name || 'Неизвестно',
      region: h.region?.name || null,
      city: h.city?.name || 'Неизвестно',
      district: h.district?.name || null,
      address: h.address || null,
      geo: h.latitude != null && h.longitude != null
        ? [Number(h.longitude), Number(h.latitude)] as [number, number]
        : null,
      stars: Number(h.stars || 0),
      propertyType: h.kind || 'Hotel',
      description: (h.description_struct?.[0]?.paragraphs || []).join('\n') || null,
      amenities: Array.isArray(h.amenities) ? h.amenities : [],
      contacts: h.contacts || {},
      images: Array.isArray(h.images) ? h.images : [],
      cancellationPolicies: h.metapolicy_struct?.cancellation_penalties || null,
      roomsData: h.metapolicy_struct?.meal ? { mealTypes: h.metapolicy_struct.meal, taxes: h.metapolicy_struct.tax_data?.taxes || [] } : null,
      minPrice: h.min_price != null ? String(h.min_price) : null,
      taxesIncluded: Boolean(h.taxes_included || h.included_by_supplier),
      mealType: h.meal_types?.[0] || h.metapolicy_struct?.meal?.[0] || null,
      freeCancellationBefore: h.free_cancellation_before ? new Date(h.free_cancellation_before) : null,
      status: 'ACTIVE' as const,
      source: 'veles-voyage',
      lastSyncedAt: new Date(),
      lastSeenAt: new Date(),
    };

    const existing = await db.select().from(hotels).where(eq(hotels.ostrovokHid, h.hid)).limit(1);
    if (existing.length > 0) {
      await db.update(hotels).set({ ...payload, updatedAt: new Date() }).where(eq(hotels.ostrovokHid, h.hid));
      return { ...existing[0], ...payload };
    }
    const created = await db.insert(hotels).values(payload).returning();
    return created[0];
  } catch (e) {
    console.error(`[UPSERT HOTEL ERROR] hid=${h?.hid}:`, e);
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log('Received search params:', Object.fromEntries(searchParams.entries()));
  const parsed = searchQuerySchema.safeParse({
    q: searchParams.get('q'),
    checkin: searchParams.get('checkin'),
    checkout: searchParams.get('checkout'),
    adults: searchParams.get('adults'),
    children: searchParams.get('children') ?? '[]',
    residency: searchParams.get('residency'),
    testMode: searchParams.get('testMode') ?? undefined,
    hotelId: searchParams.get('hotelId') ?? undefined,
  });

  if (!parsed.success) {
    console.error('Validation error:', parsed.error.flatten());
    return NextResponse.json(
      { error: 'Invalid search params', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { q: query, checkin, checkout, adults, children, residency, testMode, hotelId } = parsed.data;

  try {
    if (!query) {
      const popularHotels = await db
        .select({
          id: hotels.id,
          ostrovokHid: hotels.ostrovokHid,
          name: hotels.name,
          slug: hotels.slug,
          city: hotels.city,
          country: hotels.country,
          address: hotels.address,
          stars: hotels.stars,
          images: hotels.images,
          amenities: hotels.amenities,
          description: hotels.description,
          cancellationPolicies: hotels.cancellationPolicies,
          roomsData: hotels.roomsData,
          minPrice: hotels.minPrice,
          taxesIncluded: hotels.taxesIncluded,
          mealType: hotels.mealType,
          freeCancellationBefore: hotels.freeCancellationBefore,
          paymentOptions: hotels.paymentOptions,
          taxData: hotels.taxData,
          roomDataTrans: hotels.roomDataTrans,
          rgExt: hotels.rgExt,
          geo: hotels.geo,
        })
        .from(hotels)
        .where(eq(hotels.status, 'ACTIVE'))
        .orderBy(sql`${hotels.stars} DESC NULLS LAST, ${hotels.name}`)
        .limit(20);

      return NextResponse.json({
        results: popularHotels,
        source: 'popular',
        cached: false,
      });
    }

    const lowerQuery = query.toLowerCase().trim();
    const cacheKey = getCacheKey('search', {
      q: lowerQuery,
      checkin,
      checkout,
      adults,
      children,
      residency,
      testMode,
      hotelId,
    });

    if (testMode !== '1') {
      try {
        const cached = await getCached<any>(cacheKey);
        if (cached) {
          return NextResponse.json({ ...cached, cached: true });
        }
      } catch (e) {
        console.warn('[SEARCH] Cache read failed, continuing without cache:', e);
      }
    }

    if (testMode === '1') {
      if (hotelId !== TEST_HOTEL_HID) {
        return NextResponse.json(
          { error: `В тестовом режиме доступен только HID ${TEST_HOTEL_HID}` },
          { status: 400 }
        );
      }

      const guestBase = { adults };
      let searchResult: any = null;
      try {
        searchResult = await ostrovokClient.searchByHotelIds({
          hotelIds: [String(TEST_HOTEL_HID)],
          checkin,
          checkout,
          guests: children.length > 0 ? [{ ...guestBase, children }] : [guestBase],
          residency,
          timeout: 15000,
        });
      } catch (error) {
        console.warn('[SEARCH TEST] Availability request failed, loading hotel content:', error);
      }

      if (searchResult?.status === 'ok' && Array.isArray(searchResult.data?.hotels)) {
        const saved = await Promise.allSettled(searchResult.data.hotels.map(upsertHotel));
        const results = saved
          .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
          .map((r) => r.value)
          .filter(Boolean);
        if (results.length > 0) {
          return NextResponse.json({ results, source: 'veles-voyage-test', cached: false });
        }
      }

      let hotelInfo: any = null;
      try {
        hotelInfo = await ostrovokClient.getHotelContent(TEST_HOTEL_HID, 10000);
      } catch (error) {
        console.warn('[SEARCH TEST] Hotel content request failed, using fallback:', error);
      }
      const testHotel = toTestHotelResult(
        hotelInfo?.data?.data || hotelInfo?.data || TEST_HOTEL_FALLBACK
      );

      return NextResponse.json({
        results: testHotel ? [testHotel] : [],
        source: 'veles-voyage-test',
        cached: false,
        availabilityMessage: 'Для выбранных дат доступных тарифов нет. Карточка отеля загружена для проверки интеграции.',
      });
    }

    if (checkin && checkout) {
      const coords = CITY_COORDS[lowerQuery];

      try {
        const guestBase = { adults };
        const searchResult = await measure(
          'search',
          async () =>
            coords
              ? await ostrovokClient.searchByGeo({
                  lat: coords.lat,
                  lon: coords.lon,
                  radius: 20,
                  checkin,
                  checkout,
                  guests: children.length > 0 ? [{ ...guestBase, children }] : [guestBase],
                  residency,
                  timeout: 30000,
                })
              : await ostrovokClient.searchByGeo({
                  lat: 55.7558,
                  lon: 37.6173,
                  radius: 50,
                  checkin,
                  checkout,
                  guests: children.length > 0 ? [{ ...guestBase, children }] : [guestBase],
                  residency,
                  timeout: 30000,
                }),
          () => ({ status: 'error' as const, data: { hotels: [] } })
        );

        if (searchResult?.status === 'ok' && Array.isArray(searchResult.data?.hotels)) {
          const saved = await Promise.allSettled(
            searchResult.data.hotels.slice(0, 20).map(upsertHotel)
          );

          const results = saved
            .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
            .map((r) => r.value)
            .filter(Boolean);

          const payload = { results, source: 'veles-voyage', cached: false };

          try {
            await setCached(cacheKey, payload, CACHE_TTL.SEARCH_RESULTS);
          } catch (e) {
            console.warn('[SEARCH] Cache write failed:', e);
          }

          return NextResponse.json(payload);
        }
      } catch (error) {
        console.error('[SEARCH OSTROVOK ERROR]:', error);
      }
    }

    const localResults = await db
      .select({
        id: hotels.id,
        ostrovokHid: hotels.ostrovokHid,
        name: hotels.name,
        slug: hotels.slug,
        city: hotels.city,
        country: hotels.country,
        address: hotels.address,
        stars: hotels.stars,
        images: hotels.images,
        amenities: hotels.amenities,
        description: hotels.description,
        cancellationPolicies: hotels.cancellationPolicies,
        roomsData: hotels.roomsData,
        minPrice: hotels.minPrice,
        taxesIncluded: hotels.taxesIncluded,
        mealType: hotels.mealType,
        freeCancellationBefore: hotels.freeCancellationBefore,
        paymentOptions: hotels.paymentOptions,
        taxData: hotels.taxData,
        roomDataTrans: hotels.roomDataTrans,
        rgExt: hotels.rgExt,
        geo: hotels.geo,
      })
      .from(hotels)
      .where(sql`${hotels.name} ILIKE ${`%${query}%`} OR ${hotels.city} ILIKE ${`%${query}%`} OR ${hotels.country} ILIKE ${`%${query}%`}`)
      .limit(20);

    const localPayload = { results: localResults, source: 'local', cached: false };

    try {
      await setCached(cacheKey, localPayload, CACHE_TTL.SEARCH_RESULTS);
    } catch (e) {
      // ignore cache write errors
    }

    return NextResponse.json(localPayload);
  } catch (error: any) {
    console.error('[SEARCH ERROR]:', error);
    return NextResponse.json(
      { error: error.message || 'Search failed', results: [] },
      { status: 500 }
    );
  }
}
