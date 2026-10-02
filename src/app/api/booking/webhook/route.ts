import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export const runtime = 'nodejs';

const OSTROVOK_STATIC_IPS = [
  '95.213.146.120/29',
  '5.8.78.64/29'
];

const CF_IPV4 = [
  '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
  '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
  '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
  '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22'
];

const OSTROVOK_IP_RANGES = [...OSTROVOK_STATIC_IPS, ...CF_IPV4];

function isIPInRange(ip: string, cidr: string): boolean {
  try {
    const [range, bitsStr] = cidr.split('/');
    const bits = parseInt(bitsStr || '32');
    if (!range || isNaN(bits)) return false;
    const mask = bits === 0 ? 0 : ~(2 ** (32 - bits) - 1);
    const ipNum = ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
    const rangeNum = range.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
    return ((ipNum & mask) >>> 0) === ((rangeNum & mask) >>> 0);
  } catch {
    return false;
  }
}

function getClientIP(req: Request): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '0.0.0.0'
  );
}

function verifyWebhookSignature(apiKey: string, timestamp: string, token: string, signature: string): boolean {
  const message = `${timestamp}${token}`;
  const expectedSignature = crypto
    .createHmac('sha256', apiKey)
    .update(message)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

export async function POST(req: Request) {
  const ip = getClientIP(req);
  const apiKey = process.env.OSTROVOK_API_KEY || '';

  const isAllowedIP = OSTROVOK_IP_RANGES.some(range => isIPInRange(ip, range));

  try {
    const body = await req.json();
    const signature = body.signature || {};
    const { partner_order_id, status, error } = body.data || body;

    if (!partner_order_id) {
      return NextResponse.json({ error: 'partner_order_id is required' }, { status: 400 });
    }

    const isSignatureValid = !signature.signature || (
      signature.timestamp &&
      signature.token &&
      verifyWebhookSignature(apiKey, String(signature.timestamp), signature.token, signature.signature)
    );

    if (!isAllowedIP && !isSignatureValid) {
      console.warn(`[WEBHOOK] Unauthorized request from IP: ${ip}`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[WEBHOOK] order=${partner_order_id}, status=${status}, ip=${ip}`);

    await db.update(bookings)
      .set({
        status: status || 'unknown',
        errorMessage: error || null,
        updatedAt: new Date(),
      })
      .where(eq(bookings.partnerOrderId, partner_order_id));

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[WEBHOOK ERROR]:', error);
    return NextResponse.json({ received: true });
  }
}
