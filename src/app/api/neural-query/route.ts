import { NextResponse } from 'next/server';
import { getWikiPages } from '@/shared/data/wikiPages-mdx';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';

/**
 * Neural Query API Endpoint
 * Accepts text query and returns embeddings for tours/destinations
 * Optimized for AI search engines and neural ranking systems
 */

interface NeuralQueryRequest {
  query?: string;
  embedding?: number[];
  limit?: number;
  threshold?: number;
}

interface TourEmbedding {
  id: string;
  name: string;
  type: 'country' | 'tour' | 'destination';
  embedding: number[];
  metadata: {
    description: string;
    keywords: string[];
    continent?: string;
    bestSeason?: string;
    visaRequired?: boolean;
    estimatedCost?: number;
  };
}

// Simple text embedding using TF-IDF-like approach
function generateTextEmbedding(text: string): number[] {
  const words = text.toLowerCase()
    .replace(/[^\w\sа-яё]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);
  
  // Create 128-dimensional embedding
  const embedding = new Array(128).fill(0);
  
  words.forEach((word, index) => {
    for (let i = 0; i < word.length; i++) {
      const charCode = word.charCodeAt(i);
      const position = (charCode + i * 7 + index * 13) % 128;
      embedding[position] += (charCode * 0.1) / (i + 1);
    }
  });
  
  // Normalize
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
}

// Calculate cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  const dotProduct = a.reduce((sum, val, i) => sum + val * (b[i] ?? 0), 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

// Generate embeddings for all destinations
async function generateTourEmbeddings(): Promise<TourEmbedding[]> {
  const embeddings: TourEmbedding[] = [];
  
  // Process wiki countries
  const wikiPages = await getWikiPages();
  if (wikiPages) {
    Object.entries(wikiPages).forEach(([id, data]: [string, any]) => {
      const text = `${data.title} ${data.description} ${(data.keywords || []).join(' ')}`;
      const embedding = generateTextEmbedding(text);
      
      embeddings.push({
        id,
        name: data.title?.split('—')[0]?.trim() || id,
        type: 'country',
        embedding,
        metadata: {
          description: data.description || '',
          keywords: data.keywords || [],
          continent: data.continent,
          bestSeason: data.bestTimeToVisit,
          visaRequired: data.visaRequirements,
          estimatedCost: data.estimatedCost
        }
      });
    });
  }
  
  // Process world destinations
  Object.entries(WORLD_DESTINATIONS_DATA).forEach(([id, data]) => {
    const text = `${data.name} ${data.description} ${(data.keywords || []).join(' ')} ${(data.topAttractions || []).join(' ')}`;
    const embedding = generateTextEmbedding(text);
    
    embeddings.push({
      id: data.slug || id,
      name: data.name,
      type: 'destination',
      embedding,
      metadata: {
        description: data.description || '',
        keywords: data.keywords || [],
        continent: data.continent,
        bestSeason: data.bestSeason,
        visaRequired: data.visaRequired,
        estimatedCost: data.estimatedCost
      }
    });
  });
  
  return embeddings;
}

// Cache embeddings
let cachedEmbeddings: TourEmbedding[] | null = null;
let embeddingsGeneratedAt: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedEmbeddings(): Promise<TourEmbedding[]> {
  const now = Date.now();
  if (!cachedEmbeddings || now - embeddingsGeneratedAt > CACHE_TTL) {
    cachedEmbeddings = await generateTourEmbeddings();
    embeddingsGeneratedAt = now;
  }
  return cachedEmbeddings;
}

export async function POST(request: Request) {
  try {
    const body: NeuralQueryRequest = await request.json();
    const { query, embedding, limit = 10, threshold = 0.3 } = body;
    
    if (!query && !embedding) {
      return NextResponse.json(
        { error: 'Either query or embedding is required' },
        { status: 400 }
      );
    }
    
    // Get cached embeddings
    const tourEmbeddings = await getCachedEmbeddings();
    
    // Generate query embedding if not provided
    const queryEmbedding = embedding || generateTextEmbedding(query!);
    
    // Calculate similarities
    const similarities = tourEmbeddings.map(tour => ({
      ...tour,
      similarity: cosineSimilarity(queryEmbedding, tour.embedding)
    }));
    
    // Filter by threshold and sort by similarity
    const filtered = similarities
      .filter(s => s.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
    
    return NextResponse.json({
      type: 'NeuralQueryResponse',
      query: query || 'embedding-provided',
      queryEmbedding: queryEmbedding.slice(0, 10), // Return first 10 dimensions for reference
      results: filtered.map(({ embedding, ...rest }) => rest),
      totalResults: filtered.length,
      threshold,
      generated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in neural query:', error);
    return NextResponse.json(
      { error: 'Failed to process neural query' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const limit = parseInt(searchParams.get('limit') || '10');
  const threshold = parseFloat(searchParams.get('threshold') || '0.3');
  
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }
  
  // Reuse POST logic
  const mockRequest = new Request(request.url, {
    method: 'POST',
    body: JSON.stringify({ query, limit, threshold })
  });
  
  return POST(mockRequest);
}
