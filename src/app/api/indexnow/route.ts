import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow } from '@/shared/utils/indexing';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results = await submitToIndexNow();
    const allOk = results.every(r => r.status === 200);

    return NextResponse.json({
      ok: allOk,
      results,
      message: allOk
        ? 'URLs submitted to IndexNow successfully'
        : 'Some IndexNow submissions failed',
    }, { status: allOk ? 200 : 502 });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: String(error),
    }, { status: 500 });
  }
}
