import type { Metadata } from 'next';
import HotelClient from './HotelClient';
import { db } from '@/db';
import { hotels, reviews } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { slugify } from '@/lib/slugify';
import { SchemaScripts } from '@/components/SchemaScripts';
import { generateBreadcrumbSchema } from '@/lib/seo/universalSEO';

const SITE_URL_CONST = 'https://veles-voyage.ru';

export const revalidate = 3600;

interface HotelPageProps {
  params: Promise<{
    country: string;
    city: string;
    hotel: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const activeHotels = await db
      .select()
      .from(hotels)
      .where(eq(hotels.status, 'ACTIVE'))
      .limit(100);

    return activeHotels
      .filter((h) => h.seoSlug && h.city && h.country)
      .map((h) => ({
        country: slugify(h.country!),
        city: slugify(h.city!),
        hotel: h.seoSlug,
      }));
  } catch (error) {
    console.warn('[generateStaticParams] Database unavailable, returning empty params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { country, city, hotel } = await params;
  const cityName = city.replace(/-/g, ' ');
  const hotelName = hotel.replace(/-/g, ' ');

  let description = `Бронирование отеля ${hotelName} в городе ${cityName}. Лучшие цены, мгновенное подтверждение, поддержка 24/7.`;

  try {
    const [hotelData] = await db
      .select({
        description: hotels.description,
      })
      .from(hotels)
      .leftJoin(reviews, eq(reviews.hotelHid, hotels.ostrovokHid))
      .where(eq(hotels.seoSlug, hotel))
      .limit(1);

    if (hotelData?.description) {
      description = hotelData.description.slice(0, 160).replace(/\n/g, ' ');
    }
  } catch (error) {
    console.warn('[generateMetadata] Database unavailable:', error);
  }

  const canonical = `${SITE_URL_CONST}/hotels/${country}/${city}/${hotel}`;

  return {
    title: `${hotelName} - отель в ${cityName} | Велес Вояж`,
    description,
    keywords: ['отели', cityName, 'бронирование', 'туроператор', 'Велес Вояж'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${hotelName} | Велес Вояж`,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Велес Вояж',
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${hotelName} | Велес Вояж`,
      description,
    },
  };
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const { country, city, hotel } = await params;
  const cityName = city.replace(/-/g, ' ');
  const hotelName = hotel.replace(/-/g, ' ');
  const canonical = `${SITE_URL_CONST}/hotels/${country}/${city}/${hotel}`;

  let rating = 0;
  let reviewCount = 0;
  let description = '';
  let address = '';
  let countryName = cityName;

  try {
    const [hotelData] = await db
      .select()
      .from(hotels)
      .where(eq(hotels.seoSlug, hotel))
      .limit(1);

    if (hotelData) {
      description = hotelData.description || `${hotelName} расположен в городе ${cityName}, ${hotelData.country}. Отель предлагает комфортабельные номера, высокий уровень сервиса и удобное расположение.`;
      address = hotelData.address || `${cityName}, ${hotelData.country}`;
      countryName = hotelData.country || cityName;

      const aggregate = await db
        .select({
          averageRating: sql<number>`ROUND(AVG(${reviews.rating})::numeric, 1)`,
          totalReviews: sql<number>`COUNT(*)`,
        })
        .from(reviews)
        .where(eq(reviews.hotelHid, hotelData.ostrovokHid || Number(hotelData.id)));

      if (aggregate[0]) {
        rating = Number(aggregate[0].averageRating) || 0;
        reviewCount = Number(aggregate[0].totalReviews) || 0;
      }
    }
  } catch (error) {
    console.warn('[HotelDetailPage] Database unavailable:', error);
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Главная', item: SITE_URL_CONST },
    { name: 'Отели', item: `${SITE_URL_CONST}/hotels` },
    { name: cityName, item: `${SITE_URL_CONST}/hotels/${country}/${city}` },
    { name: hotelName, item: canonical },
  ]);

  const hotelSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotelName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: cityName,
      addressCountry: countryName,
    },
    ...(rating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount: reviewCount,
        bestRating: 5,
      },
    }),
    description,
    url: canonical,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <SchemaScripts schemas={[breadcrumbs, hotelSchema].filter(Boolean) as object[]} />
      <HotelClient slug={hotel} city={city} country={country} />
    </main>
  );
}
