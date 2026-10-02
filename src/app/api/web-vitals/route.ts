import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, value, id, label } = body;

    // Log web vitals for monitoring
    console.log('Web Vitals:', {
      name,
      value,
      id,
      label,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      url: request.headers.get('referer')
    });

    // In a real application, you would store this data in a database
    // or send it to an analytics service like Google Analytics, Vercel Analytics, etc.

    return NextResponse.json({
      success: true,
      message: 'Web vitals recorded successfully'
    });
  } catch (error) {
    console.error('Web Vitals API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
