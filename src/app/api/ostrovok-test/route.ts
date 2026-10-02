import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'hotel-dump': {
        const dump = await ostrovokClient.getHotelDump();
        return NextResponse.json({ dump });
      }
      case 'test-hotel': {
        const hid = ostrovokClient.getTestHotelHid();
        const hotel = await ostrovokClient.getHotelContent(hid);
        return NextResponse.json({ hid, hotel });
      }
      case 'search-test': {
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        const search = await ostrovokClient.searchByHotelIds({
          hotelIds: [String(ostrovokClient.getTestHotelHid())],
          checkin: today.toISOString().split('T')[0]!,
          checkout: tomorrow.toISOString().split('T')[0]!,
          guests: [{ adults: 2 }],
          residency: 'RU',
        });
        return NextResponse.json({ search });
      }
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('[VELES VOYAGE TEST ERROR]:', error);
    return NextResponse.json({ error: error.message || 'API Велес Вояж error' }, { status: 500 });
  }
}
