import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

/**
 * 🚀 Destinations API for AI Agents
 * Provides structured destination data for LLM systems and AI search engines
 * Version: 2.0
 */
export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'src', 'content', 'countries');
    
    const files = fs.readdirSync(contentDir).filter((f: string) => f.endsWith('.mdx'));
    
    const destinations = files.map((file: string) => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      
      return {
        id: file.replace('.mdx', ''),
        name: frontmatter.title || file.replace('.mdx', ''),
        description: frontmatter.description,
        capital: frontmatter.capital,
        continent: frontmatter.continent,
        currency: frontmatter.currency,
        language: frontmatter.language,
        bestTimeToVisit: frontmatter.bestTimeToVisit,
        estimatedCost: frontmatter.estimatedCost,
        visaRequirements: frontmatter.visaRequirements,
        wikidataId: frontmatter.wikidata,
        coordinates: {
          latitude: frontmatter.latitude,
          longitude: frontmatter.longitude
        },
        url: `https://www.veles-voyage.ru/wiki/${file.replace('.mdx', '')}`
      };
    }).sort((a: any, b: any) => a.name.localeCompare(b.name, 'ru'));

    return NextResponse.json({
      metadata: {
        version: '2.0',
        generated: new Date().toISOString(),
        provider: 'ООО «Велес» (РТА 0035678)',
        count: destinations.length
      },
      destinations
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Content-Type-Options': 'nosniff',
      }
    });

  } catch (error) {
    console.error('Error generating destinations API:', error);
    return NextResponse.json(
      { error: 'Failed to generate destinations data' },
      { status: 500 }
    );
  }
}
