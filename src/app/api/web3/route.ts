import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'web3.txt');
    
    // Проверяем существование файла
    if (!fs.existsSync(filePath)) {
      // Возвращаем базовое содержимое если файл не найден
      const defaultContent = `# Web3 Discovery File for Veles Voyage
# This file helps Web3 search engines discover our content

Sitemap: https://veles-voyage.ru/sitemap.xml
Main Page: https://veles-voyage.ru
Wiki: https://veles-voyage.ru/wiki
Countries: https://veles-voyage.ru/wiki/countries
`;
      return new NextResponse(defaultContent, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    return new NextResponse(fileContents, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    // Возвращаем базовое содержимое при любой ошибке
    const defaultContent = `# Web3 Discovery File for Veles Voyage
Sitemap: https://veles-voyage.ru/sitemap.xml
Main Page: https://veles-voyage.ru
`;
    return new NextResponse(defaultContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}