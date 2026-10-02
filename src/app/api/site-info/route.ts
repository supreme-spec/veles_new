import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    // Информация о сайте для поисковых систем
    const siteInfo = {
      name: "Велес Вояж",
      description: "Энциклопедия путешествий и Web3 туристическое агентство",
      url: "https://veles-voyage.ru",
      sitemap: "https://veles-voyage.ru/sitemap.xml",
      robots: "https://veles-voyage.ru/robots.txt",
      manifest: "https://veles-voyage.ru/manifest.json",
      
      // Web3 информация
      web3: {
        enabled: true,
        blockchain: "TON",
        walletSupport: ["TonConnect", "TonKeeper"],
        dappInfo: "https://veles-voyage.ru/dapp.json"
      },
      
      // SEO информация
      seo: {
        pages: "200+",
        countries: "195+",
        languages: ["ru"],
        structured_data: "Schema.org",
        social_media: {
          telegram: "@veles_voyage",
          twitter: "@veles_voyage"
        }
      },

      // Технические детали
      technical: {
        framework: "Next.js 14",
        pwa: true,
        responsive: true,
        https: true,
        mobile_friendly: true
      },

      // Статус индексации
      indexing: {
        google: "active",
        yandex: "active", 
        bing: "active",
        web3_crawlers: "supported"
      }
    };

    return NextResponse.json(siteInfo, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'index, follow',
      },
    });

  } catch (error) {
    console.error('Error in site-info API:', error);
    return NextResponse.json(
      { error: 'Failed to get site information' },
      { status: 500 }
    );
  }
}

// Добавляем HEAD метод для проверки доступности
export async function HEAD(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'X-Robots-Tag': 'index, follow',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
