import { NextResponse } from 'next/server';
import { getAllPlacesWithCountries } from '@/shared/utils/getAllPlacesData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const country = searchParams.get('country') || '';
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const places = await getAllPlacesWithCountries();

    let filtered = places;
    if (type !== 'all') {
      filtered = filtered.filter((p) => p.type === type);
    }
    if (country) {
      filtered = filtered.filter((p) => p.countryId === country || p.countryName === country);
    }

    const paginated = filtered.slice(offset, offset + Math.min(limit, 200));

    return NextResponse.json({
      type: 'Places',
      format: 'application/json',
      version: '1.0',
      generated: new Date().toISOString(),
      total: filtered.length,
      returned: paginated.length,
      filters: { type, country, limit, offset },
      places: paginated.map(({ name, lat, lng, type, description, countryId, countryName }) => ({
        name,
        lat,
        lng,
        type,
        description,
        countryId,
        countryName,
      })),
    });
  } catch (error) {
    console.error('Error generating places:', error);
    return NextResponse.json(
      { error: 'Failed to generate places' },
      { status: 500 }
    );
  }
}
