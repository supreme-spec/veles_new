import type { Metadata } from 'next';
import Link from 'next/link';
import { CitySearchWidget } from '@/components/cities/CitySearchWidget';
import { allCities } from './all-cities';
import { generateCitySlug } from '@/lib/slugify';
import { CITY_INDEX, getDistrictForRegion, FEDERAL_DISTRICTS } from '@/shared/data/cityCoordinates';
import { SITE_URL } from '@/shared/constants/seo';

const siteUrl = SITE_URL;

const districtDisplay: Record<string, string> = {};
for (const [key, value] of Object.entries(FEDERAL_DISTRICTS)) {
  districtDisplay[key] = value.name;
}

function groupCitiesByDistrict(cities: string[]) {
  const groups: Record<string, string[]> = {};
  for (const city of cities) {
    const coords = CITY_INDEX[city.toLowerCase()];
    const region = coords?.region || '';
    const district = getDistrictForRegion(region) || 'central';
    const districtName = districtDisplay[district] || district;
    if (!groups[districtName]) groups[districtName] = [];
    groups[districtName].push(city);
  }
  return groups;
}

const cityGroups = groupCitiesByDistrict(allCities);
const sortedDistrictNames = Object.keys(cityGroups).sort();

export const metadata: Metadata = {
  title: 'Города вылета — туры из 700+ городов России | Велес Вояж',
  description:
    'Полный список городов вылета Велес Вояж: туры в Турцию, Египет, ОАЭ и Таиланд из Москвы, Санкт-Петербурга и регионов России. Выберите свой город и подберите тур онлайн.',
  alternates: {
    canonical: `${siteUrl}/cities`,
    languages: {
      ru: `${siteUrl}/cities`,
      'x-default': `${siteUrl}/cities`,
    },
  },
  robots: { index: true, follow: true },
};

export default function CitiesHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-16 pt-20 md:pt-24">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Выберите город вылета
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Найдите свой город — покажем доступные туры, цены и варианты перелёта.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 border border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Поиск города
          </label>
          <CitySearchWidget />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Доступно {allCities.length}+ городов России
          </p>
        </div>

        {/* District grid */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Города по округам
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {sortedDistrictNames.map((districtName) => (
            <div
              key={districtName}
              className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {districtName}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(cityGroups[districtName] || [])
                  .sort((a, b) => a.localeCompare(b, 'ru'))
                  .map((city) => (
                    <Link
                      key={city}
                      href={`/cities/${generateCitySlug(city)}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {city}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Как выбрать город вылета?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Определитесь с ближайшим аэропортом: для Москвы и Санкт-Петербурга доступны
            прямые рейсы, для остальных регионов мы подбираем удобные стыковки. Откройте
            свой федеральный округ в списке выше — там вы увидите актуальные направления,
            примерное время перелёта и стартовые цены на туры.
          </p>
        </section>
      </div>
    </div>
  );
}
