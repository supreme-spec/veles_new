import { NextRequest, NextResponse } from 'next/server';
import { searchTours } from '@/lib/tour-providers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.departureTownCID || !body.tourCID || !body.dateFrom || !body.dateTo) {
      return NextResponse.json(
        { success: false, error: 'Пожалуйста, заполните все поля поиска' },
        { status: 400 }
      );
    }

    const results = await searchTours({
      departureTownCID: body.departureTownCID,
      tourCID: body.tourCID,
      dateFrom: body.dateFrom,
      dateTo: body.dateTo,
      adults: body.adults || 2,
      children: body.children || 0,
    });

    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    console.error('API Tours Search Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Временно нет доступных предложений. Попробуйте изменить даты или направление.',
      },
      { status: 500 }
    );
  }
}
