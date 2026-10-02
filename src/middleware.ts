import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCitySlug } from '@/lib/slugify';
import { countryNamesDictionary } from '@/shared/data/country-names-dictionary';
import { allCities } from '@/app/cities/all-cities';

// Whitelist для ИИ-ботов (GEO/AEO optimization)
const AI_BOT_WHITELIST = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Claude-Web',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'OAI-SearchBot',
  'Amazonbot',
  'FacebookBot',
  'Applebot',
  'Applebot-Extended',
  'cohere-ai',
  'anthropic-ai',
];

const LEGACY_SLUG_MAP: Record<string, string> = {
  'abkhaziya-gid': 'abkhazia',
  'niderlandy-gid': 'netherlands',
  'polsha-gid': 'poland',
  'panama-gid': 'panama',
  'venezuela-gid': 'venezuela',
  'vetnam-gid': 'vietnam',
  'zapadnaya-sahara-gid': 'western-sahara',
  'yemen-gid': 'yemen',
  'north-korea-gid': 'north-korea',
  'horvatiya-gid': 'croatia',
  'vengriya-gid': 'hungary',
  'kosta-rika-ekologicheskaya-respublika-gid': 'costa-rica',
  'palestina-gid': 'palestine',
  'singapur-gid': 'singapore',
  'slovakiya-gid': 'slovakia',
  'sloveniya-gid': 'slovenia',
  'solomonovy-ostrova-melaneziya-gid': 'solomon-islands',
  'yuzhno-afrikanskaya-respublika-gid': 'south-africa',
  'uzhnaia-koreya-gid': 'south-korea',
  'yuzhnaya-osetiya-gid': 'south-ossetia',
  'ispaniya-gid': 'spain',
  'shri-lanka-gid': 'sri-lanka',
  'shveitsariya-gid': 'switzerland',
  'siriya-gid': 'syria',
  'oae-gid': 'uae',
  'velikobritaniya-gid': 'uk',
  'turtsiya-gid': 'turkey',
  'ssha-gid': 'usa',
  'maldivy-gid': 'maldives',
  'malayziya-gid': 'malaysia',
  'avstriya-gid': 'austria',
  'bolgariya-gid': 'bulgaria',
  'kuba-respublika-gid': 'cuba',
  'chekhiya-gid': 'czechia',
  'cyprus-gid': 'cyprus',
  'cambodia-gid': 'cambodia',
  'portugaliya-gid': 'portugal',
  'uzbekistan-gid': 'uzbekistan',
  'vanuatu-gid': 'vanuatu',
  'kitai-gid': 'china',
  'yaponiya-gid': 'japan',
  'tury-iz-dagestan': 'dagestan',
  'tury-iz-liski': 'liski',
  'tury-iz-lipetsk': 'lipetsk',
  'tury-iz-rostov-na-donu': 'rostov-on-don',
};

// Справочники для разрешения битых внутренних ссылок вида /wiki/<тип>/<имя>
const COUNTRY_IDS = new Set(Object.keys(countryNamesDictionary));
const CITY_SLUGS = new Set(allCities.map(generateCitySlug));
const WIKI_STATIC = new Set([
  'countries', 'countries-mdx', 'culture',
  'places', 'travel-tips', 'intro',
]);

// Справочник для разрешения битых slug блога
const BLOG_SLUG_MAP: Record<string, string> = {
  'top-10-oteley-dubaya-2026': 'top-10-oteley-dubaya',
  'top-10-oteley-dubaya-2026-ot-layfstayl-luksa-do-semeynyh-kurortov': 'top-10-oteley-dubaya',
  'skolko-stoit-tur-v-turciyu-2026': 'skolko-stoit-tur-v-turciyu-na-dvoih',
  'skolko-stoit-tur-v-turciyu-na-dvoih-v-2026-razbor-cen-po-sezonam': 'skolko-stoit-tur-v-turciyu-na-dvoih',
  'kuda-poehat-v-fevrale-2026-7-teplyh-napravleniy': 'kuda-poehat-v-fevrale-2026',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // Whitelist для ИИ-ботов (Dynamic Content Rendering / Content Negotiation for LLM Bots)
  const isAIBot = AI_BOT_WHITELIST.some((bot: string) => userAgent.includes(bot));
  const acceptsMarkdown = request.headers.get('accept')?.includes('text/markdown');
  const formatLLM = request.nextUrl.searchParams.get('format') === 'llm';

  // Если запрашивается text/markdown или формат llm — отдаем чистый семантический Markdown напрямую
  if (acceptsMarkdown || formatLLM) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/llm-render';
    url.searchParams.set('path', pathname);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-llm-path', pathname);
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (pathname.startsWith('/wiki/')) {
    const slug = pathname.replace('/wiki/', '').split('/')[0];
    const canonical = LEGACY_SLUG_MAP[slug as keyof typeof LEGACY_SLUG_MAP];
    if (canonical) {
      const newPath = `/wiki/${canonical}${pathname.replace('/wiki/' + slug, '')}`;
      return NextResponse.redirect(new URL(newPath, request.url), 301);
    }

    // Разрешение битых ссылок MDX: /wiki/<тип>/<имя> (hotels, cities, nature, guides, ...)
    // Не трогаем реальные маршруты: /wiki/<country> и /wiki/<country>/<section>,
    // а также статические разделы (/wiki/destinations, /wiki/places, ...).
    const segments = pathname.split('/').filter(Boolean);
    const type = segments[1];
    if (type && !COUNTRY_IDS.has(type) && !WIKI_STATIC.has(type)) {
      const name = segments[2];
      if (!name) {
        return NextResponse.redirect(new URL('/wiki', request.url), 301);
      }
      const countryMatch = [...COUNTRY_IDS].find(
        (id) => name === id || name.startsWith(`${id}-`)
      );
      if (countryMatch) {
        return NextResponse.redirect(new URL(`/wiki/${countryMatch}`, request.url), 301);
      }
      if (CITY_SLUGS.has(name)) {
        return NextResponse.redirect(new URL(`/cities/${name}`, request.url), 301);
      }
      return NextResponse.redirect(new URL('/wiki', request.url), 301);
    }
  }

  // 301-редирект битых slug блога на канонические
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').split('/')[0];
    if (slug) {
      const canonical = BLOG_SLUG_MAP[slug as keyof typeof BLOG_SLUG_MAP];
      if (canonical) {
        return NextResponse.redirect(new URL(`/blog/${canonical}`, request.url), 301);
      }
    }
  }

  // 301-редирект с кириллических URL городов/регионов на латинские слаги
  if (pathname.startsWith('/cities/')) {
    const segments = pathname.split('/');
    const citySeg = segments[2];
    if (citySeg) {
      const canonical = LEGACY_SLUG_MAP[citySeg as keyof typeof LEGACY_SLUG_MAP];
      if (canonical) {
        segments[2] = canonical;
        return NextResponse.redirect(new URL(segments.join('/'), request.url), 301);
      }
      if (/[а-яА-ЯёЁ]/.test(citySeg)) {
        segments[2] = generateCitySlug(decodeURIComponent(citySeg));
        return NextResponse.redirect(new URL(segments.join('/'), request.url), 301);
      }
    }
  }

  // 301-редирект /countries/:path* → /wiki/:path* (сохраняет параметры пути)
  if (pathname.startsWith('/countries/')) {
    const pathSuffix = pathname.replace('/countries/', '');
    if (pathSuffix) {
      return NextResponse.redirect(new URL(`/wiki/${pathSuffix}`, request.url), 301);
    }
    return NextResponse.redirect(new URL('/wiki/countries', request.url), 301);
  }

  const response = NextResponse.next();
  if (isAIBot) {
    response.headers.set('X-AI-Bot-Allowed', 'true');
  }
  response.headers.set(
    'Link',
    `</api/llm-render?path=${encodeURIComponent(pathname)}>; rel="alternate"; type="text/markdown"`
  );
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|favicon).*)'],
};
