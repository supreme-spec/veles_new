import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const partnerOrderId =
    url.searchParams.get('partner_order_id') ||
    url.searchParams.get('partnerOrderId') ||
    url.searchParams.get('order');
  const status = url.searchParams.get('status');
  const ostrovokOrderId = url.searchParams.get('ostrovok_order_id');
  const errorCode = url.searchParams.get('error');

  console.log(`[3DS-CALLBACK] order=${partnerOrderId}, status=${status}, error=${errorCode}`);

  if (!partnerOrderId) {
    return NextResponse.redirect(new URL('/booking/error?error=missing_order_id', baseUrl));
  }

  if (status === 'ok' || status === 'confirmed') {
    const successUrl = new URL('/booking/success', baseUrl);
    successUrl.searchParams.set('order', partnerOrderId);
    if (ostrovokOrderId) successUrl.searchParams.set('ostrovok_order', ostrovokOrderId);
    return NextResponse.redirect(successUrl);
  }

  if (status === '3ds' || errorCode === '3ds') {
    const threeDsUrl = new URL('/booking/3ds-failed', baseUrl);
    threeDsUrl.searchParams.set('order', partnerOrderId);
    return NextResponse.redirect(threeDsUrl);
  }

  const errorUrl = new URL('/booking/error', baseUrl);
  errorUrl.searchParams.set('order', partnerOrderId);
  if (status) errorUrl.searchParams.set('status', status);
  if (errorCode) errorUrl.searchParams.set('error', errorCode);
  return NextResponse.redirect(errorUrl);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  return NextResponse.redirect(url, 307);
}
