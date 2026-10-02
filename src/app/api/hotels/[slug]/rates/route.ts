import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { checkRateLimit, getUserKey } from '@/lib/rate-limiter';
import { ratesRequestSchema } from '@/lib/validation';

export const runtime = 'nodejs';

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const userKey = getUserKey(req);
  if (!(await checkRateLimit(`hotelpage:${userKey}`, 15, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { slug } = await params;
    const body = await req.json();
    const parsed = ratesRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid rates request params', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { checkin, checkout, guests, residency, timeout } = parsed.data;

    if (!checkin || !checkout) {
      return NextResponse.json({ error: 'checkin and checkout are required' }, { status: 400 });
    }

    if (!slug || isNaN(Number(slug))) {
      return NextResponse.json({ error: 'Invalid hid' }, { status: 400 });
    }

    const result = await ostrovokClient.getHotelpage({
      hid: Number(slug),
      checkin,
      checkout,
      guests: (guests || [{ adults: 2 }]).map((g: any) => ({
        adults: g.adults || 2,
        ...(g.children ? { children: g.children } : {}),
      })),
      residency,
      timeout,
    });

    if (result.status !== 'ok') {
      return NextResponse.json({
        success: false,
        error: result.error || 'Hotelpage failed',
      }, { status: 500 });
    }

    const hotelData = result.data?.hotels?.[0] || null;
    const payload = {
      success: true,
      hotel: hotelData,
      rates: hotelData?.rates || [],
      cached: false,
    };

    return NextResponse.json(payload);
  } catch (error: any) {
    console.error('[HOTELPAGE RATES ERROR]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
