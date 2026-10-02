import type { MetadataRoute } from 'next';
import { SITE_URL, SITE_LAST_UPDATED_ISO } from '@/shared/constants/seo';
import { allCities } from './all-cities';
import { generateCitySlug } from '@/lib/slugify';
import { FEDERAL_DISTRICTS } from '@/shared/data/cityCoordinates';

const siteUrl = SITE_URL;
const STATIC_DATE = new Date(SITE_LAST_UPDATED_ISO);

const uniqueCities = Array.from(new Set(allCities.map(generateCitySlug))).sort();

export const HIGH_PRIORITY_CITIES = new Set([
  'moscow',
  'sankt-peterburg',
  'novosibirsk',
  'ekaterinburg',
  'kazan',
  'nizhny-novgorod',
  'krasnoyarsk',
  'chelyabinsk',
  'samara',
  'ufa',
  'rostov-on-don',
  'krasnodar',
  'omsk',
  'voronezh',
  'perm',
  'volgograd',
  'saratov',
  'tyumen',
  'irkutsk',
  'barnaul',
  'ulyanovsk',
  'vladivostok',
  'yaroslavl',
  'izhevsk',
  'khabarovsk',
  'makhachkala',
  'tomsk',
  'orenburg',
  'kemerovo',
  'sochi',
  'stavropol',
  'kaliningrad',
  'tver',
  'ulan-ude',
  'magnitogorsk',
  'vladikavkaz',
  'surgut',
  'vologda',
  'simferopol',
  'belgorod',
  'novokuznetsk',
  'yakutsk',
  'bryansk',
  'kurgan',
  'smolensk',
  'orel',
  'kursk',
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const districts = Object.keys(FEDERAL_DISTRICTS).map((slug) => ({
    url: `${siteUrl}/cities/district/${slug}`,
    lastModified: STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const cityEntries: MetadataRoute.Sitemap = uniqueCities.map((slug) => ({
    url: `${siteUrl}/cities/${slug}`,
    lastModified: STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...districts, ...cityEntries];
}
