import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const newsItems = [
  {
    slug: 'novye-tury-2026-eksoticheskie-napravleniya',
    title: 'Новые туры 2026: Экзотические направления от Велес Вояж',
    date: '2026-07-15',
  },
  {
    slug: 'rozhdestvenskie-skidki-na-tury-do-40',
    title: 'Рождественские скидки на туры: до 40% на экзотические направления',
    date: '2026-07-01',
  },
  {
    slug: 'rasshirenie-bezvizovogo-turizma-2026',
    title: 'Расширение безвизового туризма: Новые страны без визы для россиян',
    date: '2026-06-10',
  },
  {
    slug: 'sezon-kruizov-2026-novye-marshruty',
    title: 'Сезон круизов 2026: Новые маршруты и специальные предложения',
    date: '2026-05-20',
  },
];

export async function GET() {
  const baseUrl = 'https://veles-voyage.ru';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsItems
    .map(
      (item) => `  <url>
    <loc>${baseUrl}/news/${item.slug}</loc>
    <lastmod>${item.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <news:news>
      <news:publication>
        <news:name>Велес Вояж</news:name>
        <news:language>ru</news:language>
      </news:publication>
      <news:publication_date>${item.date}</news:publication_date>
      <news:title>${item.title}</news:title>
    </news:news>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
