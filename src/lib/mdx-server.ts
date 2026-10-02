// Серверные функции для работы с MDX данными
import { countries } from '@lib/velite-data';

interface CountryFrontmatter {
  title: string;
  description: string;
  keywords: string[];
  datePublished: string | undefined;
  dateModified: string | undefined;
  author: string | undefined;
  wordCount: number | undefined;
  inLanguage: string | undefined;
  slug: string;
  [key: string]: unknown;
}

interface MdxCountryData {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  lastModified: string;
  frontmatter: CountryFrontmatter;
  filePath: string;
}

const EXCLUDED_ROUTES = ['countries', 'culture', 'destinations', 'intro', 'places', 'travel-tips'];

function parseKeywords(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((k): k is string => typeof k === 'string');
  }
  if (typeof raw === 'string') {
    return raw.split(',').map((k: string) => k.trim()).filter(Boolean);
  }
  return [];
}

function buildFrontmatter(c: Record<string, unknown>, slug: string): CountryFrontmatter {
  const title = (typeof c.title === 'string' ? c.title : '') || slug;
  const description = typeof c.description === 'string' ? c.description : '';
  const keywords = parseKeywords(c.keywords);

  return {
    slug,
    title,
    description,
    keywords,
    datePublished: c.datePublished as string | undefined,
    dateModified: c.dateModified as string | undefined,
    author: c.author as string | undefined,
    wordCount: c.wordCount as number | undefined,
    inLanguage: c.inLanguage as string | undefined,
    ...c,
  };
}

export async function getAllCountriesServer(): Promise<MdxCountryData[]> {
  const validCountries = countries
    .filter(c => !EXCLUDED_ROUTES.includes(c.slug ?? ''))
    .map(c => {
      const slug = c.slug ?? '';
      let name = c.title ?? slug;
      if (name.includes(':')) {
        name = (name.split(':')[0] ?? '').trim();
      } else if (name.includes('—')) {
        name = (name.split('—')[0] ?? '').trim();
      }

      const tags = parseKeywords(c.keywords);
      const fm = buildFrontmatter(c as unknown as Record<string, unknown>, slug);

      return {
        id: slug,
        slug,
        title: name,
        description: c.description ?? '',
        content: c.body ?? '',
        tags,
        lastModified: c.dateModified ?? new Date().toISOString(),
        frontmatter: fm,
        filePath: c.path ?? '',
      };
    });

  return validCountries.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
}

export async function getCountryBySlugServer(slug: string): Promise<MdxCountryData | null> {
  const countryData = countries.find(c => c.slug === slug);
  if (!countryData) {
    return null;
  }

  const slugValue = countryData.slug ?? slug;
  let name = countryData.title ?? slugValue;
  if (name.includes(':')) {
    name = (name.split(':')[0] ?? '').trim();
  } else if (name.includes('—')) {
    name = (name.split('—')[0] ?? '').trim();
  }

  const tags = parseKeywords(countryData.keywords);
  const fm = buildFrontmatter(countryData as unknown as Record<string, unknown>, slugValue);

  return {
    id: slug,
    slug,
    title: name,
    description: countryData.description ?? '',
    content: countryData.body ?? '',
    tags,
    lastModified: countryData.dateModified ?? new Date().toISOString(),
    frontmatter: fm,
    filePath: countryData.path ?? '',
  };
}
