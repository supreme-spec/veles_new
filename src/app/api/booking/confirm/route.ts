import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { checkRateLimit, getUserKey } from '@/lib/rate-limiter';
import { bookingStartSchema } from '@/lib/validation';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const userKey = getUserKey(req);
  if (!(await checkRateLimit(`booking:confirm:${userKey}`, 10, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = bookingStartSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid booking params', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      partnerOrderId,
      rooms,
      user,
      paymentType,
      supplierData,
      returnPath,
      language,
      ...rest
    } = parsed.data;

    const result = await ostrovokClient.startBookingProcess({
      partner: { partnerOrderId },
      rooms,
      user,
      paymentType,
      supplierData,
      returnPath,
      upsellData: rest.upsellData,
      arrivalDatetime: rest.arrivalDatetime,
      language: language || 'ru',
    });

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('[CONFIRM BOOKING ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Confirm booking failed' }, { status: 500 });
  }
}
