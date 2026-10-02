import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { checkRateLimit, getUserKey } from '@/lib/rate-limiter';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const userKey = getUserKey(req);
  if (!(await checkRateLimit(`prebook:${userKey}`, 10, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { bookHash, priceIncreasePercent } = body;

    if (!bookHash) {
      return NextResponse.json({ error: 'bookHash is required' }, { status: 400 });
    }

    const result = await ostrovokClient.prebook({
      bookHash,
      priceIncreasePercent,
    });

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('[PREBOOK ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Prebook failed' }, { status: 500 });
  }
}
