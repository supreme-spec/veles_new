/**
 * Knowledge Graph Generator for SEO and AI integration
 * Creates structured entity graphs for countries and travel destinations
 */

import { SITE_URL } from '@/shared/constants/seo';

export interface CountryEntity {
  id: string;
  slug?: string;
  name: string;
  wikidataId?: string;
  wikipediaUrl?: string;
  capital?: string;
  continent?: string;
  currency?: string;
  language?: string;
  population?: number;
  latitude?: number;
  longitude?: number;
  visaRequirements?: boolean;
  bestTimeToVisit?: string;
  estimatedCost?: number;
  keywords?: string[];
  relatedCountries?: string[];
}

/**
 * Generate Country Entity Graph (Schema.org Knowledge Graph)
 * This creates a structured representation of country entities for AI systems
 */
export function generateCountryEntityGraph(country: CountryEntity): object {
  const entityId = `${SITE_URL}/entity/country/${country.slug || country.id}`;

  const graph: object[] = [
    {
      '@type': 'Country',
      '@id': entityId,
      name: country.name,
      ...(country.wikidataId && {
        sameAs: [
          `https://www.wikidata.org/wiki/${country.wikidataId}`,
          ...(country.wikipediaUrl ? [country.wikipediaUrl] : []),
        ],
      }),
      ...(country.capital && {
        capital: {
          '@type': 'City',
          name: country.capital,
        },
      }),
      ...(country.continent && {
        isPartOf: {
          '@type': 'Continent',
          name: country.continent,
        },
      }),
      ...(country.currency && {
        currency: country.currency,
      }),
      ...(country.language && {
        language: country.language,
      }),
      ...(country.population && {
        population: country.population,
      }),
      ...(country.latitude &&
        country.longitude && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: country.latitude,
            longitude: country.longitude,
          },
        }),
      ...(country.keywords && {
        keywords: country.keywords.join(', '),
      }),
    },
    {
      '@type': 'TouristDestination',
      '@id': `${entityId}#tourist`,
      name: country.name,
      description: `Путеводитель по ${country.name}`,
      url: `${SITE_URL}/wiki/${country.slug || country.id}`,
      about: {
        '@id': entityId,
      },
      ...(country.visaRequirements !== undefined && {
        touristType: country.visaRequirements ? 'Visa Required' : 'Visa Free',
      }),
      ...(country.bestTimeToVisit && {
        bestSeason: country.bestTimeToVisit,
      }),
      ...(country.estimatedCost && {
        priceRange: `от ${country.estimatedCost.toLocaleString('ru-RU')} ₽`,
      }),
    },
  ];

  // Add related countries as connections
  if (country.relatedCountries && country.relatedCountries.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${entityId}#related`,
      name: 'Связанные страны',
      itemListElement: country.relatedCountries.map((relatedId, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Country',
          '@id': `${SITE_URL}/entity/country/${relatedId}`,
          name: relatedId,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Generate Travel Knowledge Graph
 * Connects all countries and travel entities into a unified graph
 */
export function generateTravelKnowledgeGraph(countries: CountryEntity[]): object {
  const graph: object[] = [
    {
      '@type': 'TravelAgency',
      '@id': `${SITE_URL}#organization`,
      name: 'Велес Вояж',
      url: SITE_URL,
      description:
        'Туристическое агентство Велес Вояж — эксперты в организации индивидуальных туров, морских круизов и путешествий по России и миру.',
      knowsAbout: countries.map(country => ({
        '@type': 'Country',
        '@id': `${SITE_URL}/entity/country/${country.slug || country.id}`,
        name: country.name,
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}#knowledge-graph`,
      name: 'Travel Knowledge Graph',
      description: 'Структурированная база знаний о странах и направлениях путешествий',
      itemListElement: countries.map((country, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Country',
          '@id': `${SITE_URL}/entity/country/${country.slug || country.id}`,
          name: country.name,
          url: `${SITE_URL}/wiki/${country.slug || country.id}`,
          ...(country.continent && {
            isPartOf: {
              '@type': 'Continent',
              name: country.continent,
            },
          }),
        },
      })),
    },
  ];

  // Group by continent for better structure
  const continentGroups = countries.reduce(
    (groups, country) => {
      if (country.continent) {
        if (!groups[country.continent]) {
          groups[country.continent] = [];
        }
        groups[country.continent]!.push(country);
      }
      return groups;
    },
    {} as Record<string, CountryEntity[]>
  );

  // Add continent groups to graph
  Object.entries(continentGroups).forEach(([continent, continentCountries]) => {
    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_URL}#continent/${continent.toLowerCase()}`,
      name: `Страны ${continent}`,
      description: `Список стран в ${continent}`,
      itemListElement: continentCountries.map((country, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Country',
          '@id': `${SITE_URL}/entity/country/${country.slug || country.id}`,
          name: country.name,
          url: `${SITE_URL}/wiki/${country.slug || country.id}`,
        },
      })),
    });
  });

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Generate Entity-Relationship connections for AI systems
 * Creates explicit relationships between entities
 */
export function generateEntityRelationships(
  country: CountryEntity,
  allCountries: CountryEntity[]
): object {
  const relationships: object[] = [];

  const entityId = `${SITE_URL}/entity/country/${country.slug || country.id}`;

  // Same continent countries
  if (country.continent) {
    const sameContinentCountries = allCountries
      .filter(c => c.continent === country.continent && c.id !== country.id)
      .slice(0, 5); // Limit to 5 for performance

    if (sameContinentCountries.length > 0) {
      relationships.push({
        '@type': 'ItemList',
        '@id': `${entityId}#same-continent`,
        name: 'Страны того же континента',
        itemListElement: sameContinentCountries.map((c, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Country',
            '@id': `${SITE_URL}/entity/country/${c.slug || c.id}`,
            name: c.name,
            url: `${SITE_URL}/wiki/${c.slug || c.id}`,
          },
        })),
      });
    }
  }

  // Similar visa requirements
  if (country.visaRequirements !== undefined) {
    const similarVisaCountries = allCountries
      .filter(c => c.visaRequirements === country.visaRequirements && c.id !== country.id)
      .slice(0, 5);

    if (similarVisaCountries.length > 0) {
      relationships.push({
        '@type': 'ItemList',
        '@id': `${entityId}#similar-visa`,
        name: country.visaRequirements ? 'Страны с визой' : 'Безвизовые страны',
        itemListElement: similarVisaCountries.map((c, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Country',
            '@id': `${SITE_URL}/entity/country/${c.slug || c.id}`,
            name: c.name,
            url: `${SITE_URL}/wiki/${c.slug || c.id}`,
          },
        })),
      });
    }
  }

  // Similar price range
  if (country.estimatedCost) {
    const similarPriceCountries = allCountries
      .filter(c => {
        if (!c.estimatedCost) return false;
        const priceDiff = Math.abs(c.estimatedCost - country.estimatedCost!);
        return priceDiff < country.estimatedCost! * 0.3 && c.id !== country.id; // Within 30% price range
      })
      .slice(0, 5);

    if (similarPriceCountries.length > 0) {
      relationships.push({
        '@type': 'ItemList',
        '@id': `${entityId}#similar-price`,
        name: 'Страны с похожим бюджетом',
        itemListElement: similarPriceCountries.map((c, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Country',
            '@id': `${SITE_URL}/entity/country/${c.slug || c.id}`,
            name: c.name,
            url: `${SITE_URL}/wiki/${c.slug || c.id}`,
            estimatedCost: c.estimatedCost,
          },
        })),
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': relationships,
  };
}
