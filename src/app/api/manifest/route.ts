import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Определяем хост из запроса или используем localhost:3000 по умолчанию
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  
  // Создаем манифест с динамическими URL-ами
  const manifest = {
    url: `${protocol}://${host}`,
    name: "Велес Вояж",
    iconUrl: `${protocol}://${host}/favicon.ico`,
    termsOfUseUrl: `${protocol}://${host}/terms`,
    privacyPolicyUrl: `${protocol}://${host}/privacy`,
    redirectUrl: `${protocol}://${host}`,
    preferredWallets: ["telegram-wallet"]
  };
  
  return NextResponse.json(manifest, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
}
