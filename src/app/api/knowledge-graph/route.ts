import { NextResponse } from 'next/server';
import { generateTravelKnowledgeGraph } from '@/lib/seo/knowledgeGraph';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';

/**
 * API endpoint for Knowledge Graph
 * Returns structured entity graph for AI systems and search engines
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');

  try {
    // Get all countries data
    const countries = Object.entries(WORLD_DESTINATIONS_DATA);

    // Transform to CountryEntity format
    const countryEntities = countries.map(([id, data]) => ({
      id,
      slug: data.slug || id,
      name: data.name,
      capital: data.capital,
      continent: data.continent,
      currency: data.currency,
      language: data.language,
      estimatedCost: data.estimatedCost,
      visaRequirements: data.visaRequired,
      bestTimeToVisit: data.bestSeason,
      keywords: data.keywords,
      wikidataId: data.wikidataId,
      wikipediaUrl: data.wikipediaUrl,
      latitude: data.latitude,
      longitude: data.longitude,
    }));

    // If specific country requested
    if (country) {
      const countryEntity = countryEntities.find(c => c.id === country);
      if (!countryEntity) {
        return NextResponse.json({ error: 'Country not found' }, { status: 404 });
      }

      // Return single country entity graph
      const { generateCountryEntityGraph } = await import('@/lib/seo/knowledgeGraph');
      const entityGraph = generateCountryEntityGraph(countryEntity);

      return NextResponse.json({
        type: 'CountryEntityGraph',
        country: country,
        graph: entityGraph,
      });
    }

    // Return full travel knowledge graph
    const knowledgeGraph = generateTravelKnowledgeGraph(countryEntities);

    return NextResponse.json({
      type: 'TravelKnowledgeGraph',
      format: 'schema.org',
      version: '1.0',
      generated: new Date().toISOString(),
      totalCountries: countryEntities.length,
      graph: knowledgeGraph,
    });
  } catch (error) {
    console.error('Error generating knowledge graph:', error);
    return NextResponse.json({ error: 'Failed to generate knowledge graph' }, { status: 500 });
  }
}
