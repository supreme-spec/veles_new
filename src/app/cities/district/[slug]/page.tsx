import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/SEO/StructuredData';
import { SITE_URL } from '@/shared/constants/seo';
import { CITY_COORDINATES, getDistrictForRegion, FEDERAL_DISTRICTS } from '@/shared/data/cityCoordinates';
import type { FederalDistrict } from '@/shared/data/cityCoordinates';
import { generateCitySlug } from '@/lib/slugify';

const siteUrl = SITE_URL;

function isRegionEntity(name: string): boolean {
  return (
    /край$|область$|автономный округ|федеральный округ| АО$/.test(name) ||
    name.startsWith('Республика ')
  );
}

function getDistrictCities(district: FederalDistrict) {
  const districtCities: Array<{ name: string; region: string }> = [];
  
  for (const [cityName, data] of Object.entries(CITY_COORDINATES)) {
    const cityDistrict = getDistrictForRegion(data.region);
    if (cityDistrict === district && !isRegionEntity(cityName)) {
      districtCities.push({ name: cityName, region: data.region });
    }
  }
  
  return districtCities.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

export async function generateStaticParams() {
  return Object.keys(FEDERAL_DISTRICTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const district = params.slug as FederalDistrict;
  const meta = FEDERAL_DISTRICTS[district];
  
  if (!meta) {
    return {
      title: 'Округ не найден | Велес Вояж',
      robots: { index: false, follow: false },
    };
  }
  
  const cities = getDistrictCities(district);
  
  return {
    title: `${meta.title} | Велес Вояж`,
    description: `Выбор города вылета в ${meta.name} федеральном округе: ${cities.length}+ городов, прямые и стыковочные рейсы в Турцию, Египет, ОАЭ, Таиланд.`,
    alternates: {
      canonical: `${siteUrl}/cities/district/${district}`,
      languages: {
        ru: `${siteUrl}/cities/district/${district}`,
        'x-default': `${siteUrl}/cities/district/${district}`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default function DistrictPage({ params }: { params: { slug: string } }) {
  const district = params.slug as FederalDistrict;
  const meta = FEDERAL_DISTRICTS[district];
  
  if (!meta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-5xl px-4 py-20 pt-24">
          <h1 className="text-3xl font-bold mb-4">Округ не найден</h1>
          <Link href="/cities" className="text-blue-600 hover:underline">← Все города</Link>
        </div>
      </div>
    );
  }
  
  const cities = getDistrictCities(district);
  
  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Города вылета', item: `${siteUrl}/cities` },
      { '@type': 'ListItem', position: 3, name: meta.name, item: `${siteUrl}/cities/district/${district}` },
    ],
  };
  
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: `${cities.length} городов вылета в ${meta.name} федеральном округе.`,
    url: `${siteUrl}/cities/district/${district}`,
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-16 pt-20 md:pt-24">
        <StructuredData schemas={[breadcrumbsSchema, collectionSchema]} />
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600 hover:underline dark:hover:text-blue-400">Главная</Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li>
              <Link href="/cities" className="hover:text-blue-600 hover:underline dark:hover:text-blue-400">Города вылета</Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">{meta.name} округ</li>
          </ol>
        </nav>
        
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
          {meta.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {cities.length} городов вылета в {meta.name} федеральном округе.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {cities.map((city) => {
            const slug = generateCitySlug(city.name);
            return (
              <Link
                key={slug}
                href={`/cities/${slug}`}
                className="block rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {city.name}
              </Link>
            );
          })}
        </div>
        
        <div className="mt-10">
          <Link
            href="/cities"
            className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 border border-gray-300 hover:border-gray-400"
          >
            ← Все округа
          </Link>
        </div>
      </div>
    </div>
  );
}
