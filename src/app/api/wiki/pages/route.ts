import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Импортируем серверную версию только на сервере
    const { getWikiPages, getContinentStats } = await import('@/shared/data/wikiPages-mdx');
    
    const pages = await getWikiPages();
    const stats = await getContinentStats();
    
    return NextResponse.json({
      pages,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to load wiki data' },
      { status: 500 }
    );
  }
}