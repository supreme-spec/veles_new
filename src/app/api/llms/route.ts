import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * 🚀 Professional LLM Knowledge API
 * Version: 2.0
 * Provides structured knowledge base data for AI/LLM systems
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';

  try {
    const publicDir = path.join(process.cwd(), 'public');
    
    // Map formats to files
    const formatMap: Record<string, string> = {
      'json': 'llms-full.json',
      'txt': 'llms-full.txt',
      'md': 'llms-full.md',
      'markdown': 'llms-full.md'
    };

    const filename = formatMap[format] || 'llms-full.json';
    const filePath = path.join(publicDir, filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Knowledge base file not found. Run generate-llms-full.ts first.' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Set appropriate content type
    const contentTypeMap: Record<string, string> = {
      'json': 'application/json',
      'txt': 'text/plain; charset=utf-8',
      'md': 'text/markdown; charset=utf-8',
      'markdown': 'text/markdown; charset=utf-8'
    };

    const contentType = contentTypeMap[format] || 'application/json';

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Knowledge-Base-Version': '2.0',
        'X-Provider': 'Veles LLC (RTA 0035678)',
      },
    });

  } catch (error) {
    console.error('Error serving LLM knowledge base:', error);
    return NextResponse.json(
      { error: 'Failed to serve knowledge base' },
      { status: 500 }
    );
  }
}
