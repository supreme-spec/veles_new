import { NextResponse } from 'next/server';
import { getDictionaries } from '@/lib/tour-providers';

export async function GET() {
  try {
    const data = await getDictionaries();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
