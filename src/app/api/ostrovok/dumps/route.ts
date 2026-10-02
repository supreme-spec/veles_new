import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  try {
    switch (type) {
      case 'hotel': {
        const dump = await ostrovokClient.getHotelDump();
        return NextResponse.json(dump);
      }
      case 'incremental': {
        const dump = await ostrovokClient.getIncrementalDump();
        return NextResponse.json(dump);
      }
      case 'regions': {
        const dump = await ostrovokClient.getRegionsDump();
        return NextResponse.json(dump);
      }
      default:
        return NextResponse.json({ error: 'Unknown dump type' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('[DUMP ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Dump failed' }, { status: 500 });
  }
}
