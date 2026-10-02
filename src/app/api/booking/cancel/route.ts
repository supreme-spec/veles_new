import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { checkRateLimit, getUserKey } from '@/lib/rate-limiter';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { db } from '@/db';
import { bookings } from '@/db/schema';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const userKey = getUserKey(req);
  if (!(await checkRateLimit(`booking:cancel:${userKey}`, 5, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { partnerOrderId } = await req.json();
    if (!partnerOrderId || typeof partnerOrderId !== 'string') {
      return NextResponse.json({ error: 'partnerOrderId is required' }, { status: 400 });
    }

    const result = await ostrovokClient.cancelBooking(partnerOrderId);
    const status = result?.status || result?.result?.status;

    if (status === 'ok' || status === 'cancelled') {
      await db.update(bookings)
        .set({ status: 'CANCELLED', updatedAt: new Date() })
        .where(eq(bookings.partnerOrderId, partnerOrderId));
    }

    return NextResponse.json({ result, partnerOrderId });
  } catch (error: any) {
    console.error('[CANCEL BOOKING ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Cancel booking failed' }, { status: 500 });
  }
}
