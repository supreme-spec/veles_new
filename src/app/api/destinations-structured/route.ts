import { NextResponse } from 'next/server';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';

/**
 * API endpoint for structured destinations data
 * Returns machine-readable JSON with core travel data for AI agents
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const destinations = Object.entries(WORLD_DESTINATIONS_DATA).map(([id, data]: [string, any]) => ({
      id,
      name: data.name,
      slug: data.slug,
      type: data.type,
      description: data.description,
      capital: data.capital,
      currency: data.currency,
      language: data.language,
      bestSeason: data.bestSeason,
      visaRequired: data.visaRequired,
      estimatedCost: data.estimatedCost,
      topAttractions: data.topAttractions,
      popularResorts: data.popularResorts,
      wikipediaUrl: data.wikipediaUrl,
      wikidataId: data.wikidataId,
      geo: data.latitude && data.longitude ? {
        latitude: data.latitude,
        longitude: data.longitude
      } : undefined,
      faqs: data.faq?.slice(0, 5) || []
    }));

    let filtered = destinations;
    if (type !== 'all') {
      filtered = destinations.filter(d => d.type.toLowerCase() === type.toLowerCase());
    }

    const paginated = filtered.slice(0, Math.min(limit, 200));

    return NextResponse.json({
      type: 'DestinationsStructured',
      format: 'application/json',
      version: '1.0',
      generated: new Date().toISOString(),
      total: filtered.length,
      returned: paginated.length,
      destinations: paginated
    });

  } catch (error) {
    console.error('Error generating destinations structured data:', error);
    return NextResponse.json(
      { error: 'Failed to generate destinations data' },
      { status: 500 }
    );
  }
}
