import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/constants/seo';
import citiesSitemap from './cities/sitemap';
import wikiSitemap from './wiki/sitemap';
import { blogPosts } from '@/shared/data/blogPosts';

const LASTMOD = {
  home: '2026-07-26',
  tours: '2026-07-26',
  blog: '2026-07-26',
  cruises: '2026-07-15',
  about: '2026-06-20',
  contacts: '2026-06-20',
  mission: '2026-05-01',
  privacy: '2026-04-15',
  terms: '2026-04-15',
  support: '2026-06-20',
  voice: '2026-08-03',
  values: '2026-05-15',
  wiki: '2026-07-15',
  cities: '2026-07-15',
  wikiPlaces: '2026-07-15',
  destination: '2026-07-15',
  education: '2026-05-01',
  flights: '2026-06-01',
  hotels: '2026-06-01',
  partners: '2026-03-01',
};

function lastmod(key: keyof typeof LASTMOD): Date {
  return new Date(LASTMOD[key] + 'T00:00:00.000Z');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const mainUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastmod('home'),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastmod('about'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: lastmod('contacts'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mission`,
      lastModified: lastmod('mission'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastmod('privacy'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastmod('terms'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: lastmod('support'),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/values`,
      lastModified: lastmod('values'),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/voice`,
      lastModified: lastmod('voice'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/voice/tour-prices`,
      lastModified: lastmod('voice'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/voice/visa-free`,
      lastModified: lastmod('voice'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/voice/visa-month`,
      lastModified: lastmod('voice'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/voice/kids-winter`,
      lastModified: lastmod('voice'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/voice/safe-kids`,
      lastModified: lastmod('voice'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/voice/documents`,
      lastModified: lastmod('voice'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: lastmod('wiki'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cities`,
      lastModified: lastmod('cities'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wiki/places`,
      lastModified: lastmod('wikiPlaces'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: lastmod('tours'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/oceania`,
      lastModified: lastmod('tours'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tours/south-america`,
      lastModified: lastmod('tours'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cruises`,
      lastModified: lastmod('cruises'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastmod('blog'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/education`,
      lastModified: lastmod('education'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/flights`,
      lastModified: lastmod('flights'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: lastmod('hotels'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: lastmod('blog'),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: lastmod('partners'),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const noindexPatterns = [/\/api\//, /\/_next\//, /\/private\//, /\/admin\//, /\/search\?/];

  let cities: MetadataRoute.Sitemap = [];
  let wiki: MetadataRoute.Sitemap = [];
  try {
    cities = citiesSitemap();
  } catch (e) {
    console.error('citiesSitemap error:', e);
  }
  try {
    wiki = wikiSitemap();
  } catch (e) {
    console.error('wikiSitemap error:', e);
  }

  const filtered = [
    ...mainUrls,
    ...wiki,
    ...cities,
  ].filter((entry) => {
    if (!entry.url || typeof entry.url !== 'string') return false;
    if (entry.url.includes('[object')) return false;
    return !noindexPatterns.some((re) => re.test(entry.url));
  });

  // Deduplicate URLs
  const seen = new Set<string>();
  const deduped = filtered.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });

  return deduped as MetadataRoute.Sitemap;
}
