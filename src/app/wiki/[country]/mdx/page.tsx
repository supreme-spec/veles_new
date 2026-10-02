import type { Metadata } from 'next';
import { countries } from '@lib/velite-data';
import { COUNTRY_COORDINATES } from '@/shared/data/countryCoordinates';
import { redirect } from 'next/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const { country } = await params;
  const countryData = countries.find(c => c.slug === country);

  if (!countryData) {
    return {
      title: 'Страна не найдена',
      description: 'Путеводитель временно недоступен',
    };
  }

  const countryTitle = countryData.title || `${country} - Путеводитель`;
  const description = countryData.description || `Гид по стране ${country}`;
  const url = `https://veles-voyage.ru/wiki/${country}/mdx`;
  const image = countryData.image || 'https://veles-voyage.ru/images/logo.png';

  const coords = COUNTRY_COORDINATES[country] || { latitude: 0, longitude: 0, countryCode: 'XX' };

  return {
    title: countryTitle,
    description: description,
    keywords: countryData.keywords,
    authors: [{ name: countryData.author || 'Велес Вояж' }],
    openGraph: {
      title: countryTitle,
      description: description,
      url: url,
      images: [{ url: image }],
      type: 'article',
      siteName: 'Велес Вояж',
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title: countryTitle,
      description: description,
      images: [image],
      site: '@velesvoyage',
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 ? ([process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1, process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2].filter(Boolean) as string[]) : [],
      other: {
        'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || '',
        'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
        'bing-site-verification': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      },
    },
    other: {
      'article:published_time': String(countryData.datePublished === 'dynamic' ? new Date().toISOString().split('T')[0] : (countryData.datePublished ?? '')),
      'article:modified_time': String(countryData.dateModified === 'dynamic' ? new Date().toISOString().split('T')[0] : (countryData.dateModified ?? '')),
      'og:updated_time': String(countryData.dateModified === 'dynamic' ? new Date().toISOString().split('T')[0] : (countryData.dateModified ?? '')),
      'geo.region': coords.countryCode !== 'XX' ? coords.countryCode : 'Global',
      'geo.placename': countryData.title || country,
      'ICBM': `${coords.latitude}, ${coords.longitude}`,
      'geo.position': `${coords.latitude};${coords.longitude}`,
      'content-language': 'ru',
      'apple-mobile-web-app-title': countryTitle,
      'theme-color': '#ffffff',
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'googlebot': 'index, follow',
      'bingbot': 'index, follow',
      'yandexbot': 'index, follow',
    },
  };
}

export async function generateStaticParams() {
  return countries
    .filter(c => !['countries', 'culture', 'destinations', 'intro', 'places', 'travel-tips'].includes(c.slug ?? ''))
    .map(c => ({
      country: c.slug ?? '',
    }));
}

export default async function MdxCountryPage({ params }: { params: { country: string } }) {
  const { country } = await params;
  redirect(`/wiki/${country}`);
}
