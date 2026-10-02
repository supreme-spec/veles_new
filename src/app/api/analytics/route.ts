import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('[ANALYTICS]', payload.event, payload.params, { url: payload.url, timestamp: payload.timestamp });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[ANALYTICS ERROR]:', error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
