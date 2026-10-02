/**
 * API route для получения VAPID public key
 * GET /api/push/vapid-public-key
 */

import { NextResponse } from 'next/server';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export const dynamic = 'force-dynamic';

/**
 * GET /api/push/vapid-public-key
 * Возвращает VAPID public key для подписки на push уведомления
 */
export async function GET() {
  if (!VAPID_PUBLIC_KEY) {
    return NextResponse.json(
      { error: 'VAPID public key not configured' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { publicKey: VAPID_PUBLIC_KEY },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}

