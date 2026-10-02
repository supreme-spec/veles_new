import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const slug = request.nextUrl.searchParams.get('slug');
  const path = request.nextUrl.searchParams.get('path');

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    if (slug) {
      const { revalidatePath } = await import('next/cache');
      revalidatePath(`/hotels/*/*/${slug}`);
    }

    if (path) {
      const { revalidatePath } = await import('next/cache');
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Revalidation failed' }, { status: 500 });
  }
}
