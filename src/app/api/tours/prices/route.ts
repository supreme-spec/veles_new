import { NextResponse } from 'next/server';
import { countries } from '@lib/velite-data';

/**
 * 🏷️ Tour Prices API
 * Returns pricing information for tours in JSON format
 * Designed for MCP (Model Context Protocol) integration
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const season = searchParams.get('season');

  // Base pricing data (can be enhanced with real pricing from external APIs)
  const basePrices: Record<string, number> = {
    turkey: 80000,
    egypt: 75000,
    uae: 120000,
    thailand: 90000,
    maldives: 150000,
    vietnam: 85000,
    georgia: 45000,
    cyprus: 95000,
    indonesia: 95000,
    'sri-lanka': 80000,
    greece: 110000,
    spain: 130000,
    italy: 140000,
    france: 150000,
    china: 100000,
    japan: 180000,
    india: 70000,
    brazil: 130000,
    mexico: 120000,
    dominican: 140000,
    cuba: 110000,
    mauritius: 160000,
    seychelles: 170000,
    morocco: 75000,
    tunisia: 65000,
  };

  // Season multipliers
  const seasonMultipliers: Record<string, number> = {
    summer: 1.3,  // High season for most destinations
    winter: 0.9,  // Low season (except ski/winter destinations)
    spring: 1.0,  // Shoulder season
    autumn: 1.0,  // Shoulder season
    'let': 1.3,   // Russian summer
    'zima': 0.9,  // Russian winter
    'vesna': 1.0, // Russian spring
    'osen': 1.0,  // Russian autumn
  };

  // Get country data
  const countryData = country 
    ? countries.find(c => c.slug === country.toLowerCase())
    : null;

  // If specific country requested
  if (country && countryData) {
    const basePrice = basePrices[country] || (countryData.estimatedCost || 80000);

    const multiplier = season && seasonMultipliers[season] 
      ? seasonMultipliers[season] 
      : 1.0;

    const prices = {
      budget: Math.round(basePrice * 0.7 * multiplier),
      standard: Math.round(basePrice * 1.0 * multiplier),
      luxury: Math.round(basePrice * 2.5 * multiplier),
    };

    return NextResponse.json({
      country: countryData.title,
      slug: countryData.slug,
      season: season || 'all-seasons',
      prices: {
        budget: `${prices.budget.toLocaleString('ru-RU')} RUB`,
        standard: `${prices.standard.toLocaleString('ru-RU')} RUB`,
        luxury: `${prices.luxury.toLocaleString('ru-RU')} RUB`,
      },
      prices_numeric: {
        budget: prices.budget,
        standard: prices.standard,
        luxury: prices.luxury,
      },
      duration: '7 nights',
      travelers: '2 people',
      includes: [
        'Flight (optional)',
        'Hotel accommodation',
        'Insurance',
        '24/7 support',
        'Russian-speaking guide (on request)'
      ],
      currency: 'RUB',
      visa_required: countryData.visaRequirements,
      source: 'Велес Вояж (РТА 0035678)',
      updated: new Date().toISOString().split('T')[0],
    });
  }

  // If no country specified, return overview
  const popularDestinations = Object.entries(basePrices).slice(0, 10).map(([slug, price]) => {
    const countryData = countries.find(c => c.slug === slug);
    return {
      slug,
      name: countryData?.title || slug,
      base_price: `${price.toLocaleString('ru-RU')} RUB`,
      visa_required: countryData?.visaRequirements || false,
    };
  });

  return NextResponse.json({
    message: 'Specify country parameter for detailed pricing',
    example: '/api/tours/prices?country=turkey&season=summer',
    popular_destinations: popularDestinations,
    available_seasons: ['summer', 'winter', 'spring', 'autumn'],
    currency: 'RUB',
    duration: '7 nights',
    travelers: '2 people',
    source: 'Велес Вояж (РТА 0035678)',
  });
}