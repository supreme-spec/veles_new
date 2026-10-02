import { NextResponse } from 'next/server';

// Popular countries data from local archive
const POPULAR_COUNTRIES = [
  {
    id: 'thailand',
    name: 'Таиланд',
    slug: 'thailand',
    visits: 15420,
    trend: 'rising',
    imageUrl: '/images/archive/countries/thailand.jpg',
    description: 'Экзотические пляжи, буддийские храмы и вкусная кухня',
    popularityScore: 95
  },
  {
    id: 'turkey',
    name: 'Турция',
    slug: 'turkey',
    visits: 12890,
    trend: 'stable',
    imageUrl: '/images/archive/countries/turkey.jpg',
    description: 'Исторические достопримечательности и курорты',
    popularityScore: 88
  },
  {
    id: 'egypt',
    name: 'Египет',
    slug: 'egypt',
    visits: 11560,
    trend: 'rising',
    imageUrl: '/images/archive/countries/egypt.jpg',
    description: 'Пирамиды, Нил и курорты Красного моря',
    popularityScore: 85
  },
  {
    id: 'greece',
    name: 'Греция',
    slug: 'greece',
    visits: 9870,
    trend: 'stable',
    imageUrl: '/images/archive/countries/greece.jpg',
    description: 'Острова, античная история и средиземноморье',
    popularityScore: 82
  },
  {
    id: 'spain',
    name: 'Испания',
    slug: 'spain',
    visits: 8920,
    trend: 'declining',
    imageUrl: '/images/archive/countries/spain.jpg',
    description: 'Пляжи, культура и архитектура',
    popularityScore: 78
  },
  {
    id: 'italy',
    name: 'Италия',
    slug: 'italy',
    visits: 8450,
    trend: 'stable',
    imageUrl: '/images/archive/countries/italy.jpg',
    description: 'Искусство, кухня и исторические города',
    popularityScore: 80
  },
  {
    id: 'cyprus',
    name: 'Кипр',
    slug: 'cyprus',
    visits: 7630,
    trend: 'rising',
    imageUrl: '/images/archive/countries/greece.jpg',
    description: 'Солнце, море и древняя культура',
    popularityScore: 75
  },
  {
    id: 'uae',
    name: 'ОАЭ',
    slug: 'uae',
    visits: 7210,
    trend: 'rising',
    imageUrl: '/images/archive/countries/uae.jpg',
    description: 'Роскошные курорты и современные мегаполисы',
    popularityScore: 72
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '8');
  const sortBy = searchParams.get('sortBy') || 'visits'; // visits, popularityScore, name

  try {
    // Sort countries based on parameter
    let sortedCountries = [...POPULAR_COUNTRIES];
    
    switch (sortBy) {
      case 'popularityScore':
        sortedCountries.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'name':
        sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'visits':
      default:
        sortedCountries.sort((a, b) => b.visits - a.visits);
        break;
    }

    // Apply limit
    const result = sortedCountries.slice(0, Math.min(limit, sortedCountries.length));

    return new NextResponse(
      JSON.stringify({
        success: true,
        countries: result,
        count: result.length,
        total: POPULAR_COUNTRIES.length,
        limit: Math.min(limit, POPULAR_COUNTRIES.length),
        sortBy,
        timestamp: new Date().toISOString(),
        source: 'analytics-mock'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );

  } catch (error) {
    console.error('Popular countries API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular countries' },
      { status: 500 }
    );
  }
}

// POST endpoint to update popularity data (protected)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In production, add authentication check here
    if (!body.adminToken || body.adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate data structure
    if (!Array.isArray(body.countries) || body.countries.length === 0) {
      return NextResponse.json(
        { error: 'Invalid countries data' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Popular countries data updated successfully',
      updatedCount: body.countries.length
    });

  } catch (error) {
    console.error('Popular countries update error:', error);
    return NextResponse.json(
      { error: 'Failed to update popular countries data' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}