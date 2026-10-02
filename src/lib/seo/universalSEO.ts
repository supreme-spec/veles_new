import type { Metadata } from 'next';

// Import from unifiedSEO for consistency and avoid circular dependencies
import {
  SEO_CONFIG,
  generatePlaceSchema,
  generateFAQSchema
} from './unifiedSEO';

// Stable "last updated" date to avoid fake-freshness and hydration mismatches
import { SITE_LAST_UPDATED_ISO } from '@/shared/constants/seo';

// Use centralized configuration
export const UNIVERSAL_SEO_CONFIG = SEO_CONFIG;

// ============================================
// ТИПЫ (улучшенная типизация)
// ============================================

export interface UniversalSEOOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'country' | 'territory' | 'city' | 'attraction' | 'guide' | 'places' | 'tour';
  section?: string;

  // Флаги для различных платформ
  targets?: {
    standardSearch?: boolean;    // Google, Yandex, Bing
    voiceAssistants?: boolean;   // Алиса, Siri, Google Assistant
    aiLLM?: boolean;             // ChatGPT, Claude, Perplexity
    socialMedia?: boolean;       // VK, Telegram
    videoSEO?: boolean;          // RuTube, YouTube, Дзен
  };

  // Дополнительные данные
  geo?: { latitude: number; longitude: number; countryCode?: string };
  faqs?: Array<{ question: string; answer: string }>;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  politicalStatus?: string;
  wikidataId?: string;
  hasParts?: string[];
}

// ============================================
// ГЕНЕРАЦИЯ МЕТАДАННЫХ (очищено от фейковых верификаций)
// ============================================

export async function generateUniversalMetadata(options: UniversalSEOOptions): Promise<Metadata> {
  const {
    title,
    description,
    url,
    image,
    keywords = [],
    type = 'website',
    section,
    publishedTime,
    modifiedTime,
  } = options;

  const fullUrl = url.startsWith('http') ? url : `${UNIVERSAL_SEO_CONFIG.siteUrl}${url}`;
  const fullImage = image || UNIVERSAL_SEO_CONFIG.logoUrl;

  // Оптимизированные ключевые слова (без спама)
  const expandedKeywords = generateExpandedKeywords(keywords, title, type);
  const finalKeywords = Array.from(new Set([
    ...expandedKeywords.slice(0, 10), // Ограничиваем до 10 релевантных слов
    'Велес Вояж',
    'путешествия',
    'туризм'
  ])).join(', ');

  return {
    title,
    description,
    keywords: finalKeywords,
    authors: [{ name: options.author || UNIVERSAL_SEO_CONFIG.organization }],
    creator: UNIVERSAL_SEO_CONFIG.siteName,
    publisher: UNIVERSAL_SEO_CONFIG.siteName,

    // Robots для максимальной индексации
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Верификации ТОЛЬКО для реально существующих сервисов
    verification: {
      google: UNIVERSAL_SEO_CONFIG.verifications.google,
      yandex: UNIVERSAL_SEO_CONFIG.verifications.yandex,
      other: {
        // Standard search engine verifications
        ...(UNIVERSAL_SEO_CONFIG.verifications.bing && {
          'bing-site-verification': UNIVERSAL_SEO_CONFIG.verifications.bing
        }),
        ...(UNIVERSAL_SEO_CONFIG.verifications.baidu && {
          'baidu-site-verification': UNIVERSAL_SEO_CONFIG.verifications.baidu
        }),
        ...(UNIVERSAL_SEO_CONFIG.verifications.naver && {
          'naver-site-verification': UNIVERSAL_SEO_CONFIG.verifications.naver
        }),

        // Telegram channel
        'telegram:channel': '@veles_voyage',
      }
    },

    // Open Graph
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: UNIVERSAL_SEO_CONFIG.siteName,
      locale: 'ru_RU',
      type: ['city', 'country', 'attraction', 'guide', 'article'].includes(type || '') ? 'article' : 'website',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg'
        }
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section })
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@velesvoyage',
      creator: '@velesvoyage',
      title,
      description,
      images: [fullImage]
    },

    // Canonical и альтернативные языки
    alternates: {
      canonical: fullUrl,
      languages: {
        'ru': fullUrl,
        'ru-RU': fullUrl,
        'x-default': fullUrl
      }
    },

    // Мета-база
    metadataBase: new URL(UNIVERSAL_SEO_CONFIG.siteUrl),
    category: 'travel',
    classification: 'tourism',

    // Дополнительные мета-теги
    other: {
      // Социальные сети
      'vk:image': fullImage,
      'telegram:channel': '@veles_voyage',

      // Дзен
      'zen:article:name': title,
      'zen:article:description': description,

      // Геолокация (если есть)
      ...(options.geo && {
        'geo.position': `${options.geo.latitude};${options.geo.longitude}`,
        'geo.placename': title,
        'geo.region': 'RU',
        'ICBM': `${options.geo.latitude}, ${options.geo.longitude}`
      })
    }
  };
}

// ============================================
// ГЕНЕРАЦИЯ РАСШИРЕННЫХ КЛЮЧЕВЫХ СЛОВ (оптимизировано)
// ============================================

function generateExpandedKeywords(
  baseKeywords: string[],
  title: string,
  type?: string
): string[] {
  const expanded = [...baseKeywords.slice(0, 8)]; // Ограничиваем базовые слова

  // Добавляем только релевантные вариации в зависимости от типа контента
  if (type === 'country' || type === 'city') {
    const locationVariations = [
      `что посмотреть в ${title}`,
      `достопримечательности ${title}`,
      `путеводитель по ${title}`,
      `${title} путешествие`
    ];
    expanded.push(...locationVariations);
  } else if (type === 'article') {
    const articleVariations = [
      `${title} советы`,
      `${title} информация`,
      `${title} рекомендации`
    ];
    expanded.push(...articleVariations);
  }

  // Добавляем временные запросы
  const currentYear = new Date().getFullYear();
  expanded.push(`${title} ${currentYear}`);

  return Array.from(new Set(expanded)).slice(0, 15); // Максимум 15 уникальных слов
}

// Make the function available for external use
export { generateExpandedKeywords };

// ============================================
// ГЕНЕРАЦИЯ СХЕМ JSON-LD
// ============================================

/**
 * Generate BreadcrumbList Schema
 *
 * @param items Массив объектов { name: string, item: string (URL) }
 * @param disable Если true — возвращает null. Защита от дублирования JSON-LD
 *   BreadcrumbList, когда крошки уже отрендерены в Layout/родительском компоненте.
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; item: string }>,
  disable: boolean = false
): object | null {
  if (disable || items.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `${UNIVERSAL_SEO_CONFIG.siteUrl}${item.item}`
    }))
  };
}

/**
 * Generate ItemList Schema for collection pages (e.g. /wiki/places)
 */
export function generateItemListSchema(options: {
  title: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    description?: string;
    url?: string;
    geo?: { latitude: number; longitude: number };
    type: 'city' | 'attraction' | 'resort' | 'airport';
    countryName?: string;
  }>;
  maxItems?: number;
}): object {
  const { title, description, url, items, maxItems = 1000 } = options;
  const fullUrl = url.startsWith('http') ? url : `${UNIVERSAL_SEO_CONFIG.siteUrl}${url}`;

  const itemListElement = items.slice(0, maxItems).map((item, index) => {
    const schemaItem: any = {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': item.type === 'city' ? 'City' :
          item.type === 'attraction' ? 'TouristAttraction' :
            item.type === 'resort' ? 'Resort' : 'Airport',
        name: item.name,
        description: item.description,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: item.geo?.latitude ?? 0,
          longitude: item.geo?.longitude ?? 0,
        },
        ...(item.countryName && {
          containedInPlace: {
            '@type': 'Country',
            name: item.countryName,
          }
        }),
        ...(item.url && { url: item.url.startsWith('http') ? item.url : `${UNIVERSAL_SEO_CONFIG.siteUrl}${item.url}` }),
        sameAs: [`https://ru.wikipedia.org/wiki/${encodeURIComponent(item.name)}`],
      },
    };

    if (item.type === 'city') {
      schemaItem.item.additionalType = 'https://schema.org/City';
    } else if (item.type === 'resort') {
      schemaItem.item.additionalType = 'https://schema.org/LodgingBusiness';
    }

    return schemaItem;
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${fullUrl}#itemlist`,
    name: title,
    description,
    numberOfItems: items.length,
    itemListElement,
  };
}

export async function generateUniversalSchemas(options: UniversalSEOOptions): Promise<object[]> {
  const { type, title, geo, url } = options;
  const fullUrl = url.startsWith('http') ? url : `${UNIVERSAL_SEO_CONFIG.siteUrl}${url}`;

  let schemas: any[] = [];

  // Правильная маршрутизация в зависимости от типа контента
  switch (type) {
    case 'country':
      // Для стран используем Article + TouristDestination схемы
      const countryName = typeof title === 'string' ? title.replace(/\s*\|\s*Велес\s+Вояж\s*$/i, '').trim() : title;
      const countryNameClean = typeof countryName === 'string' ? countryName.replace(/\d{4}/g, '').replace(/[—–:-]/g, ' ').replace(/\s+/g, ' ').trim() : countryName;
      schemas = [{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": countryName,
        "description": options.description,
        "url": fullUrl,
        "datePublished": options.publishedTime || SITE_LAST_UPDATED_ISO,
        "dateModified": options.modifiedTime || SITE_LAST_UPDATED_ISO,
        "author": {
          "@type": "Person",
          "name": "Сергей Свистунов",
          "url": `${UNIVERSAL_SEO_CONFIG.siteUrl}/team/sergey-svistunov`,
          "sameAs": [
            "https://finradun.ru",
            "https://vk.com/veles__voyage",
            "https://t.me/veles_voyage",
            "https://www.instagram.com/radun.veles/"
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": UNIVERSAL_SEO_CONFIG.organization,
          "logo": {
            "@type": "ImageObject",
            "url": UNIVERSAL_SEO_CONFIG.logoUrl
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": fullUrl
        },
        "about": {
          "@type": "Country",
          "name": countryNameClean,
          "sameAs": [`https://ru.wikipedia.org/wiki/${encodeURIComponent(countryNameClean)}`]
        }
      }];

      // Добавляем TouristDestination для стран
      schemas.push({
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "name": countryNameClean,
        "description": options.description,
        "url": fullUrl,
        "about": {
          "@type": "Country",
          "name": countryNameClean,
          "sameAs": [`https://ru.wikipedia.org/wiki/${encodeURIComponent(countryNameClean)}`],
          ...(options.wikidataId && {
            "sameAs": [
              `https://ru.wikipedia.org/wiki/${encodeURIComponent(countryNameClean)}`,
              `https://www.wikidata.org/wiki/${options.wikidataId}`
            ]
          }),
          ...(geo && {
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": geo.latitude,
              "longitude": geo.longitude
            }
          })
        },
        ...(options.wikidataId && {
          "mentions": {
            "@type": "Thing",
            "@id": `https://www.wikidata.org/wiki/${options.wikidataId}`,
            "sameAs": [`https://ru.wikipedia.org/wiki/${encodeURIComponent(countryNameClean)}`]
          }
        }),
        ...(options.hasParts && options.hasParts.length > 0 && {
          "hasPart": options.hasParts.map((part: string, index: number) => ({
            "@type": "WebPageElement",
            "name": part,
            "position": index + 1
          }))
        }),
        "touristType": ["Туристы", "Семьи с детьми", "Молодожёны", "Бэкпекеры"],
        ...(options.keywords && options.keywords.length > 0 && {
          "keywords": options.keywords.join(', ')
        })
      });

      // Добавляем хлебные крошки (Home > Wiki > Country)
      const countryBreadcrumb = generateBreadcrumbSchema([
        { name: 'Главная', item: '/' },
        { name: 'Энциклопедия', item: '/wiki' },
        { name: title, item: options.url }
      ]);
      if (countryBreadcrumb) schemas.push(countryBreadcrumb);

      // Добавляем FAQ если есть
      if (options.faqs && options.faqs.length > 0) {
        schemas.push(generateFAQSchema(options.faqs));
      }

      // Speakable schema for voice assistants
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": fullUrl,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            "h1",
            "header > p",
            ".prose h2",
            ".prose h3",
            ".prose p:first-of-type"
          ],
          "xpath": [
            "/html/head/title",
            "/html/body//h1",
            "/html/body//header/p",
            "/html/body//div[contains(@class, 'prose')]/h2[1]",
            "/html/body//div[contains(@class, 'prose')]/p[1]"
          ]
        },
        "name": options.title,
        "description": options.description
      });
      break;

    case 'territory':
      // Спорные / частично признанные территории: семантически корректно использовать
      // "@type": "Place" вместо "Country", чтобы не вводить ИИ-поиск в заблуждение.
      const territoryName = typeof title === 'string' ? title.replace(/\s*\|\s*Велес\s+Вояж\s*$/i, '').trim() : title;
      const territoryNameClean = typeof territoryName === 'string' ? territoryName.replace(/\d{4}/g, '').replace(/[—–:-]/g, ' ').replace(/\s+/g, ' ').trim() : territoryName;
      schemas = [{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": territoryName,
        "description": options.description,
        "url": options.url,
        "datePublished": options.publishedTime || SITE_LAST_UPDATED_ISO,
        "dateModified": options.modifiedTime || SITE_LAST_UPDATED_ISO,
        "author": {
          "@type": "Organization",
          "name": options.author || UNIVERSAL_SEO_CONFIG.organization
        },
        "publisher": {
          "@type": "Organization",
          "name": UNIVERSAL_SEO_CONFIG.organization,
          "logo": {
            "@type": "ImageObject",
            "url": UNIVERSAL_SEO_CONFIG.logoUrl
          }
        },
        "about": {
          "@type": "Place",
          "name": territoryNameClean,
          "additionalType": options.politicalStatus || 'https://schema.org/Place',
          "sameAs": [`https://ru.wikipedia.org/wiki/${encodeURIComponent(territoryNameClean)}`]
        }
      }];

      schemas.push({
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "name": territoryNameClean,
        "description": options.description,
        "url": fullUrl,
        "about": {
          "@type": "Place",
          "name": territoryNameClean,
          "additionalType": options.politicalStatus || 'https://schema.org/Place',
          "sameAs": [`https://ru.wikipedia.org/wiki/${encodeURIComponent(territoryNameClean)}`],
          ...(geo && {
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": geo.latitude,
              "longitude": geo.longitude
            }
          })
        },
        "touristType": "Tourism",
        ...(options.keywords && options.keywords.length > 0 && {
          "keywords": options.keywords.join(', ')
        })
      });

      const territoryBreadcrumb = generateBreadcrumbSchema([
        { name: 'Главная', item: '/' },
        { name: 'Энциклопедия', item: '/wiki' },
        { name: territoryNameClean, item: options.url }
      ]);
      if (territoryBreadcrumb) schemas.push(territoryBreadcrumb);

      if (options.faqs && options.faqs.length > 0) {
        schemas.push(generateFAQSchema(options.faqs));
      }

      // Speakable schema for voice assistants
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": fullUrl,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            "h1",
            "header > p",
            ".prose h2",
            ".prose h3",
            ".prose p:first-of-type"
          ],
          "xpath": [
            "/html/head/title",
            "/html/body//h1",
            "/html/body//header/p",
            "/html/body//div[contains(@class, 'prose')]/h2[1]",
            "/html/body//div[contains(@class, 'prose')]/p[1]"
          ]
        },
        "name": options.title,
        "description": options.description
      });
      break;

    case 'places':
      schemas = [{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${fullUrl}#webpage`,
        "name": title,
        "description": options.description,
        "url": fullUrl,
        "dateModified": options.modifiedTime || SITE_LAST_UPDATED_ISO,
        "mainEntity": {
          "@type": "ItemList",
          "@id": `${fullUrl}#itemlist`,
          "name": 'Ключевые места мира',
          "description": options.description,
        },
        "hasPart": [{
          "@type": "ItemList",
          "@id": `${fullUrl}#itemlist`
        }],
        "author": {
          "@type": "Organization",
          "name": options.author || UNIVERSAL_SEO_CONFIG.organization
        },
        "publisher": {
          "@type": "Organization",
          "name": UNIVERSAL_SEO_CONFIG.organization,
          "logo": {
            "@type": "ImageObject",
            "url": UNIVERSAL_SEO_CONFIG.logoUrl
          }
        }
      }];

      const placesBreadcrumb = generateBreadcrumbSchema([
        { name: 'Главная', item: '/' },
        { name: 'Энциклопедия', item: '/wiki' },
        { name: 'Места', item: '/wiki/places' },
      ]);
      if (placesBreadcrumb) schemas.push(placesBreadcrumb);

      if (options.faqs && options.faqs.length > 0) {
        schemas.push(generateFAQSchema(options.faqs));
      }

      // Speakable schema for voice assistants
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": fullUrl,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            "h1",
            "header > p",
            ".prose h2",
            ".prose h3",
            ".prose p:first-of-type"
          ],
          "xpath": [
            "/html/head/title",
            "/html/body//h1",
            "/html/body//header/p",
            "/html/body//div[contains(@class, 'prose')]/h2[1]",
            "/html/body//div[contains(@class, 'prose')]/p[1]"
          ]
        },
        "name": options.title,
        "description": options.description
      });
      break;

    case 'city':
      // Используем generatePlaceSchema из unifiedSEO
      const placeSchema = generatePlaceSchema({
        name: title,
        description: options.description,
        ...(geo && { geo }),
        region: 'RU' // Можно уточнить регион при необходимости
      });
      schemas = [placeSchema];

      // Speakable schema for voice assistants
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": fullUrl,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            "h1",
            "header > p",
            ".prose h2",
            ".prose h3",
            ".prose p:first-of-type"
          ],
          "xpath": [
            "/html/head/title",
            "/html/body//h1",
            "/html/body//header/p",
            "/html/body//div[contains(@class, 'prose')]/h2[1]",
            "/html/body//div[contains(@class, 'prose')]/p[1]"
          ]
        },
        "name": options.title,
        "description": options.description
      });
      break;

    case 'article':
      // Базовая схема статьи
      schemas = [{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": options.description,
        "image": options.image || UNIVERSAL_SEO_CONFIG.logoUrl,
        "datePublished": options.publishedTime || SITE_LAST_UPDATED_ISO,
        "dateModified": options.modifiedTime || SITE_LAST_UPDATED_ISO,
        "author": {
          "@type": "Organization",
          "name": options.author || UNIVERSAL_SEO_CONFIG.organization
        },
        "publisher": {
          "@type": "Organization",
          "name": UNIVERSAL_SEO_CONFIG.organization,
          "logo": {
            "@type": "ImageObject",
            "url": UNIVERSAL_SEO_CONFIG.logoUrl
          }
        }
      }];

      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${UNIVERSAL_SEO_CONFIG.siteUrl}/#website`,
        "name": UNIVERSAL_SEO_CONFIG.siteName,
        "url": UNIVERSAL_SEO_CONFIG.siteUrl,
        "inLanguage": "ru-RU",
        "publisher": {
          "@type": "Organization",
          "name": UNIVERSAL_SEO_CONFIG.organization,
          "@id": `${UNIVERSAL_SEO_CONFIG.siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${UNIVERSAL_SEO_CONFIG.siteUrl}/wiki/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        "name": UNIVERSAL_SEO_CONFIG.organization,
        "url": options.url,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": UNIVERSAL_SEO_CONFIG.address.streetAddress,
          "addressLocality": UNIVERSAL_SEO_CONFIG.address.addressLocality,
          "postalCode": UNIVERSAL_SEO_CONFIG.address.postalCode,
          "addressCountry": UNIVERSAL_SEO_CONFIG.address.addressCountry
        },
        "touristType": ["Туристы", "Семьи с детьми", "Романтические пары"]
      });

      // Speakable schema for voice assistants
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": fullUrl,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            "h1",
            "header > p",
            ".prose h2",
            ".prose h3",
            ".prose p:first-of-type"
          ],
          "xpath": [
            "/html/head/title",
            "/html/body//h1",
            "/html/body//header/p",
            "/html/body//div[contains(@class, 'prose')]/h2[1]",
            "/html/body//div[contains(@class, 'prose')]/p[1]"
          ]
        },
        "name": options.title,
        "description": options.description
      });

      if (options.faqs && options.faqs.length > 0) {
        schemas.push(generateFAQSchema(options.faqs));
      }

      // Добавляем TouristDestination для статей о направлениях (wiki подстраницы)
      if (options.geo && (options.geo.latitude !== 0 || options.geo.longitude !== 0)) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          "name": title,
          "description": options.description,
          "url": fullUrl,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": options.geo.latitude,
            "longitude": options.geo.longitude
          },
          "touristType": "Tourism"
        });
      }

      const articleBreadcrumb = generateBreadcrumbSchema([
        { name: 'Главная', item: '/' },
        { name: title, item: options.url }
      ]);
      if (articleBreadcrumb) schemas.push(articleBreadcrumb);
      break;

    case 'guide':
      // Страницы сравнения направлений (/compare/*)
      schemas = [{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": options.description,
        "image": options.image || UNIVERSAL_SEO_CONFIG.logoUrl,
        "datePublished": options.publishedTime || SITE_LAST_UPDATED_ISO,
        "dateModified": options.modifiedTime || SITE_LAST_UPDATED_ISO,
        "author": {
          "@type": "Organization",
          "name": options.author || UNIVERSAL_SEO_CONFIG.organization
        },
        "publisher": {
          "@type": "Organization",
          "name": UNIVERSAL_SEO_CONFIG.organization,
          "logo": {
            "@type": "ImageObject",
            "url": UNIVERSAL_SEO_CONFIG.logoUrl
          }
        }
      }];

      schemas.push({
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "name": title,
        "description": options.description,
        "url": fullUrl,
        "touristType": "Tourism"
      });

      if (options.faqs && options.faqs.length > 0) {
        schemas.push(generateFAQSchema(options.faqs));
      }

      // Speakable schema for voice assistants
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": fullUrl,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            "h1",
            "header > p",
            ".prose h2",
            ".prose h3",
            ".prose p:first-of-type"
          ],
          "xpath": [
            "/html/head/title",
            "/html/body//h1",
            "/html/body//header/p",
            "/html/body//div[contains(@class, 'prose')]/h2[1]",
            "/html/body//div[contains(@class, 'prose')]/p[1]"
          ]
        },
        "name": options.title,
        "description": options.description
      });

      const guideBreadcrumb = generateBreadcrumbSchema([
        { name: 'Главная', item: '/' },
        { name: 'Сравнения', item: '/compare' },
        { name: title, item: options.url }
      ]);
      if (guideBreadcrumb) schemas.push(guideBreadcrumb);
      break;

    default:
      // Базовая схема веб-сайта
      schemas = [{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": title,
        "url": options.url,
        "description": options.description
      }];

      // Speakable schema for voice assistants (default case)
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": fullUrl,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            "h1",
            "header > p",
            ".prose h2",
            ".prose h3",
            ".prose p:first-of-type"
          ],
          "xpath": [
            "/html/head/title",
            "/html/body//h1",
            "/html/body//header/p",
            "/html/body//div[contains(@class, 'prose')]/h2[1]",
            "/html/body//div[contains(@class, 'prose')]/p[1]"
          ]
        },
        "name": options.title,
        "description": options.description
      });
  }

  // Фильтрация null/undefined значений и валидных схем
  return schemas.filter(schema => schema !== null && schema !== undefined && schema['@type']) as object[];
}