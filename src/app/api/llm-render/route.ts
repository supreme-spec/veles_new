import { NextRequest, NextResponse } from 'next/server';
import { generateLLMContentForPath } from '@/lib/seo/llmContentGenerator';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const path =
    request.headers.get('x-llm-path') ||
    request.nextUrl.searchParams.get('path') ||
    '/';
  const doc = generateLLMContentForPath(path);

  return new NextResponse(doc.markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'X-Robots-Tag': 'all',
      'X-Content-Type-Options': 'nosniff',
      'Link': `<${doc.canonicalUrl}>; rel="canonical"`,
    },
  });
}
