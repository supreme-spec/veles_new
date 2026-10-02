import { NextResponse } from 'next/server';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';

export async function GET() {
  try {
    const countries = Object.entries(WORLD_DESTINATIONS_DATA).map(([id, data]: [string, any]) => ({
      id,
      name: data.name,
      slug: data.slug,
      type: data.type,
      capital: data.capital,
      currency: data.currency,
      language: data.language,
      bestSeason: data.bestSeason,
      visaRequired: data.visaRequired,
      estimatedCost: data.estimatedCost,
      topAttractions: data.topAttractions,
      popularResorts: data.popularResorts,
      keywords: data.keywords,
      wikipediaUrl: data.wikipediaUrl,
      wikidataId: data.wikidataId,
      geo: data.latitude && data.longitude ? {
        latitude: data.latitude,
        longitude: data.longitude
      } : undefined,
    }));

    return NextResponse.json({
      type: 'CountriesList',
      format: 'application/json',
      version: '1.0',
      generated: new Date().toISOString(),
      total: countries.length,
      countries,
    });
  } catch (error) {
    console.error('Error generating countries list:', error);
    return NextResponse.json(
      { error: 'Failed to generate countries list' },
      { status: 500 }
    );
  }
}
