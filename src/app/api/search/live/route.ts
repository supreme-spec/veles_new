import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { getCached, setCached } from '@/lib/redis';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { regionId, checkin, checkout, guests, residency, hotelIds } = body;

    if (!checkin || !checkout) {
      return NextResponse.json({ error: 'checkin and checkout are required' }, { status: 400 });
    }

    const cacheKey = `live-search:${regionId || 'geo'}:${checkin}:${checkout}:${JSON.stringify(guests || [])}:${residency || 'RU'}:${JSON.stringify(hotelIds || [])}`;
    const cached = await getCached<any>(cacheKey);
    if (cached) {
      return NextResponse.json({ ...cached, cached: true });
    }

    let result: any;

    if (hotelIds && Array.isArray(hotelIds) && hotelIds.length > 0) {
      result = await ostrovokClient.searchByHotelIds({
        hotelIds: hotelIds.map(String),
        checkin,
        checkout,
        guests: guests || [{ adults: 2 }],
        residency: residency || 'RU',
      });
    } else if (regionId) {
      result = await ostrovokClient.searchByRegion({
        regionId: Number(regionId),
        checkin,
        checkout,
        guests: guests || [{ adults: 2 }],
        residency: residency || 'RU',
      });
    } else {
      return NextResponse.json({ error: 'regionId or hotelIds are required' }, { status: 400 });
    }

    const payload = { ...result, cached: false };
    await setCached(cacheKey, payload, 900);
    return NextResponse.json(payload);
  } catch (error: any) {
    console.error('[LIVE SEARCH ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Live search failed' }, { status: 500 });
  }
}
