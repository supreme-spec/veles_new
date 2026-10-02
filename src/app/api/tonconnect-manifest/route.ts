import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Получаем базовый URL из заголовков запроса
  const url = new URL(request.url);
  let baseUrl = `${url.protocol}//${url.host}`;
  
  // Если это localhost, используем альтернативный URL для Telegram
  if (url.host.includes('localhost') || url.host.includes('127.0.0.1')) {
    // Для разработки используем PUBLIC_URL из переменных окружения
    const publicUrl = process.env.PUBLIC_URL;
    if (publicUrl) {
      baseUrl = publicUrl;
    } else {
      // Временное решение - используем example.com для тестов
      // В реальном проекте замените на ваш домен
      baseUrl = 'https://your-domain.com';
    }
  }
  
  const manifest = {
    url: baseUrl,
    name: "Велес Вояж",
    iconUrl: `${baseUrl}/favicon.ico`,
    termsOfUseUrl: `${baseUrl}/terms`,
    privacyPolicyUrl: `${baseUrl}/privacy`
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
