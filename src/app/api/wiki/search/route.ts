import { NextResponse } from 'next/server';
import { searchCountries } from '@/shared/data/wikiPages-mdx';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '20');
  const type = searchParams.get('type') || 'all';

  try {
    // Validate query
    if (!query.trim()) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    if (query.length > 100) {
      return NextResponse.json(
        { error: 'Search query too long' },
        { status: 400 }
      );
    }

    console.log('Search API called with query:', query);
    
    // Perform search using the client-side search function
    const searchResults = await searchCountries(query);
    
    console.log('Search results count:', searchResults.length);
    console.log('First few results:', searchResults.slice(0, 3));

    // Filter by type if specified
    let filteredResults = searchResults;
    if (type !== 'all') {
      filteredResults = searchResults.filter(result => {
        if (type === 'country') {
          return result.tags?.includes('страна') || !result.tags?.includes('город');
        }
        if (type === 'city') {
          return result.tags?.includes('город');
        }
        return true;
      });
    }

    // Limit results
    const limitedResults = filteredResults.slice(0, Math.min(limit, filteredResults.length));

    // Transform to search result format
    const results = limitedResults.map(page => ({
      pageId: page.id,
      title: page.title,
      type: page.tags?.includes('страна') ? 'country' : 
            page.tags?.includes('город') ? 'city' : 'other',
      relevance: calculateRelevance(page, query),
      snippet: page.description || '',
      tags: page.tags || []
    }));

    const response = NextResponse.json({
      results,
      total: results.length,
      query,
      type,
      limit
    });
    
    // Force UTF-8 encoding
    response.headers.set('Content-Type', 'application/json; charset=utf-8');
    
    return response;

  } catch (error) {
    console.error('Wiki search API error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}

// Helper function to calculate relevance score
function calculateRelevance(page: any, query: string): number {
  const queryLower = query.toLowerCase();
  const titleLower = (page.title || '').toLowerCase();
  const descriptionLower = (page.description || '').toLowerCase();
  
  let score = 0;
  
  // Exact match in title (highest score)
  if (titleLower === queryLower) {
    score += 100;
  }
  // Title starts with query
  else if (titleLower.startsWith(queryLower)) {
    score += 75;
  }
  // Query contained in title
  else if (titleLower.includes(queryLower)) {
    score += 50;
  }
  
  // Description matches
  if (descriptionLower.includes(queryLower)) {
    score += 25;
  }
  
  // Tag matches
  if (page.tags && Array.isArray(page.tags)) {
    const tagMatches = page.tags.filter((tag: string) => 
      tag.toLowerCase().includes(queryLower)
    ).length;
    score += tagMatches * 10;
  }
  
  return Math.min(score, 100); // Cap at 100
}