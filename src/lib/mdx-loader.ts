import { countries } from '@lib/velite-data';

const EXCLUDED_ROUTES = ['countries', 'culture', 'destinations', 'intro', 'places', 'travel-tips'];

export interface CountryFrontmatter {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  datePublished: string | undefined;
  dateModified: string | undefined;
  author: string | undefined;
  wordCount: number | undefined;
  inLanguage: string | undefined;
  [key: string]: unknown;
}

export interface MdxCountryData {
  slug: string;
  frontmatter: CountryFrontmatter;
  content: string;
  filePath: string;
}

const allCountriesCache: MdxCountryData[] = [];

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

export async function loadCountryMdx(slug: string): Promise<MdxCountryData | null> {
  const countryData = countries.find(c => c.slug === slug);
  if (!countryData) {
    return null;
  }

  const frontmatter = buildFrontmatter(countryData as unknown as Record<string, unknown>, slug);

  return {
    slug,
    frontmatter,
    content: countryData.body ?? '',
    filePath: countryData.path ?? '',
  };
}

export async function loadAllCountriesMdx(): Promise<MdxCountryData[]> {
  const validCountries = countries
    .filter(c => !EXCLUDED_ROUTES.includes(c.slug ?? ''))
    .map(c => {
      const slug = c.slug ?? '';
      return {
        slug,
        frontmatter: buildFrontmatter(c as unknown as Record<string, unknown>, slug),
        content: c.body ?? '',
        filePath: c.path ?? '',
      };
    });

  allCountriesCache.length = 0;
  allCountriesCache.push(...validCountries);
  return validCountries;
}

export async function getAllCountrySlugs(): Promise<string[]> {
  return countries
    .filter(c => !EXCLUDED_ROUTES.includes(c.slug ?? ''))
    .map(c => c.slug ?? '');
}

export function extractCountryInfo(countryData: MdxCountryData) {
  const { frontmatter } = countryData;

  let name = frontmatter.title;

  if (name.includes(':')) {
    const namePart = name.split(':')[0];
    if (namePart) {
      name = namePart.trim();
    }
  } else if (name.includes('—')) {
    const namePart = name.split('—')[0];
    if (namePart) {
      name = namePart.trim();
    }
  }

  const cleanName = name.replace(/^[\w\s-]+/, '').trim() || name;

  return {
    id: countryData.slug,
    name: cleanName,
    description: frontmatter.description,
  };
}

export function sortCountriesByName(input: ReturnType<typeof extractCountryInfo>[]) {
  return [...input].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

export function groupCountriesByContinent(input: MdxCountryData[]) {
  const grouped = {
    'Все страны': input.map(extractCountryInfo),
  };

  Object.keys(grouped).forEach(continent => {
    const key = continent as keyof typeof grouped;
    const continentCountries = grouped[key];
    if (continentCountries) {
      grouped[key] = sortCountriesByName(continentCountries);
    }
  });

  return grouped;
}

export function clearCountryCache() {
  allCountriesCache.length = 0;
}
