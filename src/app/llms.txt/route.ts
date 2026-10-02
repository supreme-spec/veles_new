import { readFile } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const content = await readFile(join(process.cwd(), 'public', 'llms.txt'), 'utf-8');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
