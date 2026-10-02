// Экспорт данных из MDX файлов для wiki страниц
// Использует Velite для типобезопасного доступа к данным

import { countries } from '@lib/velite-data';
import { countryNamesDictionary, COUNTRY_NAMES_PREPOSITIONAL } from './country-names-dictionary';
import { normalizeContinentKey } from '@/shared/constants/continents';

interface WikiPage {
  id: string;
  title: string;
  description?: string;
  content: string;
  lastModified: string;
  tags?: string[];
  continent?: string;
  politicalStatus?: string | null;
}

let cachedWikiPages: Record<string, WikiPage> = {};
let isInitialized = false;

async function initializeWikiData() {
  if (isInitialized) {
    return;
  }

  console.log('[WikiPages] Initializing wiki data...');

  try {
    countries.forEach(c => {
      const slug = c.slug ?? '';
      if (!slug) return;
      cachedWikiPages[slug] = {
        id: slug,
        title: c.title || slug,
        description: c.description || `Путеводитель по ${COUNTRY_NAMES_PREPOSITIONAL[slug] || countryNamesDictionary[slug] || slug}`,
        content: c.body ?? '',
        lastModified: new Date().toISOString(),
        tags: Array.isArray(c.keywords)
          ? c.keywords.filter((k): k is string => typeof k === 'string')
          : [],
        continent: typeof c.continent === 'string' ? c.continent : 'other',
        politicalStatus: typeof c.politicalStatus === 'string' ? c.politicalStatus : null,
      };
    });

    console.log(
      `[WikiPages] Successfully loaded ${Object.keys(cachedWikiPages).length} countries from Velite data.`
    );

    isInitialized = true;
  } catch (error) {
    console.error('[WikiPages] Failed to initialize wiki data:', error);
    cachedWikiPages = {};
    isInitialized = true;
  }
}

export async function getWikiPages(): Promise<Record<string, WikiPage>> {
  await initializeWikiData();
  return { ...cachedWikiPages };
}

export async function getAllCountryIds(): Promise<string[]> {
  await initializeWikiData();
  return Object.keys(cachedWikiPages);
}

export async function getCountryById(id: string): Promise<WikiPage | undefined> {
  await initializeWikiData();
  return cachedWikiPages[id];
}

export async function searchCountries(query: string): Promise<WikiPage[]> {
  await initializeWikiData();

  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const allPages = Object.values(cachedWikiPages);

  const results = allPages.filter(page => {
    const titleMatch = page.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = page.description?.toLowerCase().includes(searchTerm);
    const tagMatch = page.tags?.some(tag => tag.toLowerCase().includes(searchTerm));

    return titleMatch || descriptionMatch || tagMatch;
  });

  return results;
}

export async function getCountriesByContinent(
  _continent: string
): Promise<Record<string, WikiPage>> {
  await initializeWikiData();
  return cachedWikiPages;
}

export async function getContinentStats() {
  await initializeWikiData();

  const stats = {
    europe: 0,
    asia: 0,
    northAmerica: 0,
    southAmerica: 0,
    africa: 0,
    oceania: 0,
    total: 0,
  };

  const pages = Object.values(cachedWikiPages);
  stats.total = pages.length;

  pages.forEach(page => {
    const normalized = normalizeContinentKey(page.continent || 'other');
    switch (normalized) {
      case 'europe':
        stats.europe++;
        break;
      case 'asia':
        stats.asia++;
        break;
      case 'north-america':
        stats.northAmerica++;
        break;
      case 'south-america':
        stats.southAmerica++;
        break;
      case 'africa':
        stats.africa++;
        break;
      case 'oceania':
        stats.oceania++;
        break;
      default:
        break;
    }
  });

  return stats;
}

export async function getReadyArticlesCount(): Promise<number> {
  await initializeWikiData();
  return Object.keys(cachedWikiPages).length;
}

// Экспорт для обратной совместимости
export { getWikiPages as wikiPages };
export { getAllCountryIds as allCountryIds };
