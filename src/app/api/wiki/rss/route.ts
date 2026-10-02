import { NextRequest, NextResponse } from 'next/server';
import type { WikiPage } from '@/features/wiki/types';

// Временное хранилище для страниц (в реальном приложении здесь должна быть база данных)
const pages: Record<string, WikiPage> = {
  'intro': {
    id: 'intro',
    title: 'Добро пожаловать в вики',
    content: '<p>Это ваша новая вики-система. Вы можете создавать и редактировать страницы.</p><p>Используйте поиск, чтобы найти нужную информацию.</p>',
    lastModified: new Date().toISOString(),
    creator: 'Система',
    tags: ['информация', 'помощь']
  },
  'guide': {
    id: 'guide',
    title: 'Руководство по использованию',
    content: '<h2>Как создать страницу</h2><p>Нажмите кнопку "Создать страницу" и заполните форму.</p><h2>Как редактировать</h2><p>Откройте страницу и нажмите кнопку "Редактировать".</p>',
    lastModified: new Date().toISOString(),
    creator: 'Система',
    tags: ['руководство', 'помощь']
  }
};

// Функция для экранирования XML
function escapeXML(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Создание XML для RSS
function generateRSS(baseUrl: string): string {
  const items = Object.values(pages)
    .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
    .map(page => {
      const url = `${baseUrl}/wiki/${page.id}`;
      const title = escapeXML(page.title);
      const description = escapeXML(page.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...');
      const pubDate = new Date(page.lastModified).toUTCString();
      
      return `
      <item>
        <title>${title}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${pubDate}</pubDate>
        <description>${description}</description>
      </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
            <title>Велес Вояж Wiki</title>
        <link>${baseUrl}/wiki</link>
        <description>Последние обновления Wiki на Велес Вояж</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/wiki/rss" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

export async function GET(request: NextRequest) {
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  const host = request.headers.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;
  
  const rss = generateRSS(baseUrl);
  
  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
