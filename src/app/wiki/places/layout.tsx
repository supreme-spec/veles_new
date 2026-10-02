import type { Metadata } from 'next';
import { getPlacesStats } from '@/shared/utils/getAllPlacesData';
import { setPlacesDates, placesMetaTags } from '@/shared/data/seo/places-seo';
import { getCurrentDateString } from '@/shared/utils';
import fs from 'fs/promises';
import path from 'path';

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getPlacesStats();

  // Автоматическое обновление дат из файла
  const filePath = path.join(process.cwd(), 'src/shared/data/seo/places-seo.ts');
  try {
    const stats = await fs.stat(filePath);
    const published = getCurrentDateString(new Date(stats.birthtime));
    const modified = getCurrentDateString(new Date(stats.mtime));
    setPlacesDates({ published, modified });
  } catch (error) {
    // Если файл не найден, используем текущую дату
    const today = getCurrentDateString();
    setPlacesDates({ published: today, modified: today });
  }

  const title =
    placesMetaTags.title ||
    `Ключевые места мира: ${stats.total}+ городов, достопримечательностей и курортов | Велес Вояж`;
  const description =
    placesMetaTags.description ||
    `Интерактивная карта и каталог ${stats.total}+ ключевых мест из всех стран мира: ${stats.cities} городов, ${stats.attractions} достопримечательностей, ${stats.resorts} курортов и ${stats.airports} аэропортов. Координаты, описания и ссылки на путеводители по странам.`;

  return {
    title,
    description,
    keywords: placesMetaTags.keywords || null,
    authors: [{ name: placesMetaTags.author || 'Велес Вояж | Экспертная редакция' }],
    creator: placesMetaTags.creator || null,
    publisher: placesMetaTags.publisher || null,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://veles-voyage.ru/wiki/places',
      languages: {
        ru: 'https://veles-voyage.ru/wiki/places',
        'x-default': 'https://veles-voyage.ru/wiki/places',
      },
    },
    openGraph: {
      title: placesMetaTags['og:title'] || title,
      description: placesMetaTags['og:description'] || description,
      url: placesMetaTags['og:url'] || 'https://veles-voyage.ru/wiki/places',
      siteName: placesMetaTags['og:site_name'] || 'Велес Вояж',
      images: [
        {
          url: placesMetaTags['og:image'] || 'https://veles-voyage.ru/images/logo.png',
          width: parseInt(placesMetaTags['og:image:width'] || '1200'),
          height: parseInt(placesMetaTags['og:image:height'] || '630'),
          alt: 'Ключевые места мира - интерактивная карта и каталог',
        },
      ],
      type: (placesMetaTags['og:type'] as 'website') || 'website',
      locale: placesMetaTags['og:locale'] || 'ru_RU',
    },
    twitter: {
      card: (placesMetaTags['twitter:card'] as 'summary_large_image') || 'summary_large_image',
      title: placesMetaTags['twitter:title'] || title,
      description: placesMetaTags['twitter:description'] || description,
      images: [placesMetaTags['twitter:image'] || 'https://veles-voyage.ru/images/logo.png'],
      site: placesMetaTags['twitter:site'] || '@velesvoyage',
      creator: placesMetaTags['twitter:creator'] || '@velesvoyage',
    },
    other: {
      'geo.region': placesMetaTags['geo.region'] || 'World',
      'geo.placename': placesMetaTags['geo.placename'] || 'World',
      ...(placesMetaTags['yandex-verification'] && {
        'yandex-verification': placesMetaTags['yandex-verification'],
      }),
      ...(placesMetaTags['google-site-verification'] && {
        'google-site-verification': placesMetaTags['google-site-verification'],
      }),
      ...(placesMetaTags['duckduckgo-verify'] && {
        'duckduckgo-verify': placesMetaTags['duckduckgo-verify'],
      }),
      ...(placesMetaTags['startpage-verify'] && {
        'startpage-verify': placesMetaTags['startpage-verify'],
      }),
      ...(placesMetaTags['baidu-site-verification'] && {
        'baidu-site-verification': placesMetaTags['baidu-site-verification'],
      }),
      ...(placesMetaTags['bing-site-verification'] && {
        'bing-site-verification': placesMetaTags['bing-site-verification'],
      }),
      ...(placesMetaTags['naver-site-verification'] && {
        'naver-site-verification': placesMetaTags['naver-site-verification'],
      }),
      ...(placesMetaTags['tg:site_verification'] && {
        'tg:site_verification': placesMetaTags['tg:site_verification'],
      }),
      ...(placesMetaTags['telegram:channel'] && {
        'telegram:channel': placesMetaTags['telegram:channel'],
      }),
      ...(placesMetaTags['og:see_also'] && {
        'og:see_also': placesMetaTags['og:see_also'],
      }),
    },
  };
}

export default function PlacesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
