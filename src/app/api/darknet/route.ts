import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'darknet.txt');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    return new NextResponse(fileContents, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}