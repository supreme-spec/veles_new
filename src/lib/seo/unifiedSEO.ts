/**
 * Unified SEO Library
 * Consolidated SEO utilities to eliminate code duplication
 * 
 * @module unifiedSEO
 */

import type { Metadata } from 'next';
import { cache } from 'react';
import type { FAQSchema } from '@/shared/types/schema';

// Fallback for test environments where cache might not be available
const safeCache = typeof cache === 'function' ? cache : <T>(fn: () => T) => fn;

// Import shared constants
import {
  SITE_URL,
  LOGO_URL,
  ORGANIZATION_NAME,
  SITE_NAME,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  ADDRESS,
  SOCIAL_LINKS,
  VERIFICATIONS,
   SEO_DESCRIPTION_MAX_LENGTH,
  DEFAULT_LOCALE,
  PRICE_RANGE,
  FOUNDING_YEAR,
  EXPERT_AUTHOR,
  DEFAULT_RATING
} from '@/shared/constants/seo';

// ============================================
// UNIFIED CONFIGURATION
// ============================================

export const SEO_CONFIG = {
  // Site configuration
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  logoUrl: LOGO_URL,
  organization: ORGANIZATION_NAME,
  
  // Contact information
  contactPhone: CONTACT_PHONE,
  contactEmail: CONTACT_EMAIL,
  address: ADDRESS,
  
  // Social media
  social: SOCIAL_LINKS,
  
  // Verifications
  verifications: VERIFICATIONS,
  
  // Technical settings
  defaultLocale: DEFAULT_LOCALE,
  priceRange: PRICE_RANGE,
  foundingYear: FOUNDING_YEAR,

  // E-E-A-T: эксперт-автор (Person). Если null — используется только Organization.
  expertAuthor: EXPERT_AUTHOR,
  
  // Image defaults
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@velesvoyage',
  telegramChannel: '@veles_voyage',
  themeColor: '#4F46E5',
  
  // Additional platform support
  voiceAssistants: {
    alisa: 'yandex-alice',
    siri: 'apple-siri',
    googleAssistant: 'google-assistant',
    alexa: 'amazon-alexa',
    marusya: 'vk-marusya',
    salut: 'sber-salut'
  },
  
  aiSystems: {
    chatgpt: true,
    claude: true,
    gemini: true,
    yandexGPT: true,
    gigachat: true,
    perplexity: true,
    copilot: true
  }
} as const;

// ============================================
// TYPES
// ============================================

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'country' | 'city' | 'attraction' | 'guide' | 'places';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  author?: string;
  includeVerifications?: boolean;
  geo?: { latitude: number; longitude: number };
  faqs?: Array<{ question: string; answer: string }>;
}

export interface ArticleSchemaData {
  headline: string;
  description: string;
  url?: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  wordCount?: number;
  section?: string;
}

// ============================================
// CORE UTILITY FUNCTIONS
// ============================================

/**
 * Generate optimized description for SEO
 * Truncates text to specified length while preserving word integrity
 */
export function generateDescription(text: string, maxLength: number = SEO_DESCRIPTION_MAX_LENGTH): string {
  // Remove HTML tags and extra spaces
  const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (cleanText.length <= maxLength) return cleanText;
  
  // Truncate at last complete word
  const truncated = cleanText.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated).trim() + '...';
}

/**
 * Generate optimized keywords (limited to avoid spam)
 */
export function generateKeywords(baseKeywords: string[]): string {
  // Remove duplicates and normalize
  const uniqueKeywords = Array.from(new Set(baseKeywords.map(k => k.toLowerCase().trim())));
  // Limit to 15 most relevant words (Google recommends < 10)
  return uniqueKeywords.slice(0, 15).join(', ');
}

/**
 * Get extended keywords for maximum SEO coverage
 */
export function getExtendedKeywords(countryName?: string): string[] {
  const base = [
    // Core tourism terms (limited to 15)
    'путеводитель', 'отдых', 'достопримечательности', 'туризм', 'путешествия',
    'экскурсии', 'курорты', 'отели', 'рестораны', 'культура', 'кухня',
    'виза', 'безопасность', 'климат', 'валюта'
  ];
  
  if (countryName) {
    // Country-specific phrases (limited)
    const countrySpecific = [
      `путеводитель по ${countryName}`, `отдых в ${countryName}`,
      `достопримечательности ${countryName}`, `туризм в ${countryName}`,
      `культура ${countryName}`, `кухня ${countryName}`,
      `${countryName} города`, `${countryName} пляжи`,
      `что посмотреть в ${countryName}`
    ];
    return [...countrySpecific, ...base];
  }
  return base;
}

/**
 * Get current dates for SEO metadata
 */
export const getCurrentDates = safeCache(() => {
  const now = new Date();
  return {
    published: now.toISOString().split('T')[0],
    modified: now.toISOString().split('T')[0]
  };
});

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * Generate Article Schema
 */
export function generateArticleSchema(data: ArticleSchemaData & { wikidataId?: string; mentions?: Array<{ name: string; wikidataId: string }> }): object {
  const optimizedDescription = generateDescription(data.description, 160);
  const optimizedKeywords = generateKeywords(data.keywords);

  const sameAs: string[] = [];
  if (data.wikidataId) {
    sameAs.push(`https://www.wikidata.org/wiki/${data.wikidataId}`);
  }

  const mentions = data.mentions?.map(m => ({
    "@type": "Thing",
    "name": m.name,
    "sameAs": `https://www.wikidata.org/wiki/${m.wikidataId}`
  }));

  const hasPart = data.mentions?.map(m => ({
    "@type": "Thing",
    "name": m.name,
    "sameAs": `https://www.wikidata.org/wiki/${m.wikidataId}`
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "description": optimizedDescription,
    "image": {
      "@type": "ImageObject",
      "url": data.image || SEO_CONFIG.logoUrl,
      "caption": data.headline,
      "height": 630,
      "width": 1200
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified,
    "author": [
      ...(SEO_CONFIG.expertAuthor
        ? [{
            "@type": "Person",
            "name": SEO_CONFIG.expertAuthor.name,
            "url": `${SEO_CONFIG.siteUrl}${SEO_CONFIG.expertAuthor.url}`
          }]
        : []),
      { "@type": "Organization", "name": SEO_CONFIG.organization }
    ],
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.organization,
      "logo": {
        "@type": "ImageObject",
        "url": SEO_CONFIG.logoUrl,
        "caption": "Логотип Велес Вояж"
      }
    },
    "mainEntityOfPage": data.url ? {
      "@type": "WebPage",
      "@id": data.url
    } : undefined,
    "articleSection": data.section || "Путеводитель",
    "keywords": optimizedKeywords,
    "wordCount": data.wordCount || 5000,
    "inLanguage": "ru-RU",
    "temporalCoverage": "2026",
    "contentReferenceTime": data.datePublished,
    ...(sameAs.length > 0 && { sameAs }),
    ...(mentions && mentions.length > 0 && { mentions }),
    ...(hasPart && hasPart.length > 0 && { hasPart })
  };
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate HowTo Schema (for voice search / AEO "how-to" queries)
 */
export interface HowToStepData {
  name: string;
  text: string;
  url?: string;
}

export function generateHowToSchema(data: {
  name: string;
  description?: string;
  totalTime?: string;
  step: HowToStepData[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.name,
    ...(data.description && { "description": data.description }),
    ...(data.totalTime && { "totalTime": data.totalTime }),
    "step": data.step.map((s, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": s.name,
      "text": s.text,
      ...(s.url && { "url": s.url })
    }))
  };
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SEO_CONFIG.organization,
    "url": SEO_CONFIG.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": SEO_CONFIG.logoUrl
    },
    "foundingDate": SEO_CONFIG.foundingYear.toString(),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SEO_CONFIG.contactPhone.replace(/-/g, ''),
      "contactType": "customer service",
      "email": SEO_CONFIG.contactEmail
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SEO_CONFIG.address.streetAddress,
      "addressLocality": SEO_CONFIG.address.addressLocality,
      "postalCode": SEO_CONFIG.address.postalCode,
      "addressCountry": SEO_CONFIG.address.addressCountry
    },
    "sameAs": [
      SEO_CONFIG.social.vk,
      SEO_CONFIG.social.telegram,
      SEO_CONFIG.social.rutube,
      "https://github.com/veles-voyage"
    ],
    "priceRange": SEO_CONFIG.priceRange,
    "areaServed": { "@type": "Country", "name": "Russia" }
  };
}

/**
 * Generate Place Schema for cities
 */
export function generatePlaceSchema(data: {
  name: string;
  description: string;
  geo?: { latitude: number; longitude: number };
  region?: string;
  wikidataId?: string;
}): object {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": data.name,
    "description": data.description
  };

  // Внешние якоря сущности для Knowledge Graph / GEO (Wikidata + Википедия)
  const sameAs: string[] = [`https://ru.wikipedia.org/wiki/${encodeURIComponent(data.name)}`];
  if (data.wikidataId) {
    sameAs.push(`https://www.wikidata.org/wiki/${data.wikidataId}`);
  }
  schema.sameAs = sameAs;

  if (data.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": data.geo.latitude,
      "longitude": data.geo.longitude
    };
  }

  if (data.region) {
    schema.address = {
      "@type": "PostalAddress",
      "addressRegion": data.region,
      "addressCountry": "RU"
    };
  }

  return schema;
}

/**
 * Generate SpeakableSpecification for voice search (AEO)
 */
export function generateSpeakableSchema(cssSelectors: string[] = [".voice-snippet", ".faq-answer", ".article-summary"]): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors
    }
  };
}

// ============================================
// METADATA GENERATORS
// ============================================

/**
 * Generate comprehensive SEO metadata
 */
export function generateEnhancedSEOMetadata(data: SEOData): Metadata {
  const {
    title,
    description,
    url = '',
    image = SEO_CONFIG.defaultImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    noIndex = false,
    author = SEO_CONFIG.siteName,
    includeVerifications = true,
    geo,
  } = data;

  const fullUrl = url 
    ? (url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`)
    : SEO_CONFIG.siteUrl;
  
  const fullImageUrl = image.startsWith('http') 
    ? image 
    : `${SEO_CONFIG.siteUrl}${image}`;

  const metadata: Metadata = {
    // Base metadata
    title,
    description,
    
    // Authorship
    authors: [{ name: author }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    
    // Open Graph
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.defaultLocale,
      type: type === 'city' || type === 'country' || type === 'attraction' || type === 'guide' || type === 'places' ? 'article' : type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags: tags.slice(0, 10) }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle,
    },

    // Robots
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: fullUrl,
      languages: {
        'ru': fullUrl,
        'x-default': fullUrl,
      },
    },

    // Metadata base
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    category: 'travel',
    
    // Additional meta tags
    other: {
      // Telegram
      'telegram:channel': SEO_CONFIG.telegramChannel,
      
      // VK (important for Russian audience!)
      'vk:image': fullImageUrl,

      // Geolocation
      ...(geo && {
        'geo.position': `${geo.latitude};${geo.longitude}`,
        'geo.placename': title,
        'geo.region': 'RU',
        'ICBM': `${geo.latitude}, ${geo.longitude}`,
      }),
    },
  };

  // Add verifications if requested and available
  if (includeVerifications && (SEO_CONFIG.verifications.google || SEO_CONFIG.verifications.yandex)) {
    (metadata as any).verification = {
      ...(SEO_CONFIG.verifications.google && { google: SEO_CONFIG.verifications.google }),
      ...(SEO_CONFIG.verifications.yandex && { yandex: SEO_CONFIG.verifications.yandex }),
      other: {
        ...(SEO_CONFIG.verifications.yandex2 && { 'yandex-verification': SEO_CONFIG.verifications.yandex2 }),
      }
    };
  }

  return metadata;
}

/**
 * Generate metadata for articles/blog posts
 */
export function generateArticleMetadata(data: SEOData & {
  author?: string;
  category?: string;
}): Metadata {
  const enhancedData: SEOData = {
    ...data,
    type: 'article',
    tags: data.keywords || [],
    ...(data.category && { section: data.category })
  };
  
  return generateEnhancedSEOMetadata(enhancedData);
}

/**
 * Generate metadata for no-index pages
 */
export function generateNoIndexMetadata(title: string, description: string): Metadata {
  return generateEnhancedSEOMetadata({
    title,
    description,
    noIndex: true
  });
}

export interface PageBreadcrumbsResult {
  items: Array<{ name: string; href: string }>;
  schema: {
    '@context': 'https://schema.org';
    '@type': 'BreadcrumbList';
    itemListElement: Array<{
      '@type': 'ListItem';
      position: number;
      name: string;
      item: string;
    }>;
  };
}

export function generatePageBreadcrumbs(pathname: string, currentEntityName: string): PageBreadcrumbsResult {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);

  const items: Array<{ name: string; href: string }> = [
    { name: 'Главная', href: '/' },
  ];

  const prefixMap: Record<string, string> = {
    cities: 'Города',
    countries: 'Страны',
    tours: 'Туры',
    cruises: 'Круизы',
    destinations: 'Направления',
    places: 'Места',
    wiki: 'Энциклопедия',
  };

  let hrefAccum = '';
  for (const segment of segments) {
    hrefAccum += `/${segment}`;
    const isLast = hrefAccum === cleanPath;
    const name = isLast ? currentEntityName : (prefixMap[segment] || segment);
    items.push({ name, href: hrefAccum });
  }

  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'BreadcrumbList' as const,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${SEO_CONFIG.siteUrl}${item.href}`,
    })),
  };

  return { items, schema };
}

// ============================================
// PERSON SCHEMA GENERATION (E-E-A-T)
// ============================================

/**
 * Generate AggregateRating Schema (E-E-A-T)
 * Use this instead of hardcoded rating values across the codebase
 */
export function generateAggregateRatingSchema(overrides?: Partial<typeof DEFAULT_RATING>): object {
  const rating = { ...DEFAULT_RATING, ...overrides };
  return {
    "@type": "AggregateRating",
    "ratingValue": rating.ratingValue,
    "reviewCount": rating.reviewCount,
    "bestRating": rating.bestRating,
    "worstRating": rating.worstRating,
  };
}

export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  image: string;
  sameAs: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "image": person.image,
    "sameAs": person.sameAs,
    "worksFor": {
      "@type": "Organization",
      "name": SEO_CONFIG.organization,
      "@id": `${SEO_CONFIG.siteUrl}#organization`
    }
  };
}

// ============================================
// DEPRECATED EXPORTS FOR BACKWARD COMPATIBILITY
// ============================================

// ============================================
// BACKWARD COMPATIBILITY FUNCTIONS
// ============================================

/**
 * Generate meta tags for backward compatibility
 */
export function generateMetaTags(title: string, description: string, url: string, image?: string) {
  const fullUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`;
  const fullImageUrl = image ? 
    (image.startsWith('http') ? image : `${SEO_CONFIG.siteUrl}${image}`) : 
    SEO_CONFIG.defaultImage;
  
  return {
    title,
    description,
    authors: [{ name: SEO_CONFIG.organization }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    alternates: {
      canonical: fullUrl
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.defaultLocale,
      type: 'website',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl]
    }
  };
}

/**
 * Generate hreflang tags for backward compatibility
 */
export function generateHreflangTags(url: string) {
  const fullUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`;
  
  return [
    { rel: 'alternate', hreflang: 'ru', href: fullUrl },
    { rel: 'alternate', hreflang: 'x-default', href: fullUrl }
  ];
}

/**
 * Generate Web3 metadata for backward compatibility
 */
export function generateWeb3Metadata(url: string) {
  const fullUrl = url.startsWith('http') ? url : `${SEO_CONFIG.siteUrl}${url}`;
  
  return {
    ipfs: '',
    web3: '',
    darknet: '',
    blockchain: '',
    wallet: '',
    // Include the processed URL for reference
    canonicalUrl: fullUrl
  };
}

// Deprecated exports with warnings - simplified signatures
export const generateCountrySchemas = async () => {
  console.warn('generateCountrySchemas is deprecated. Use unifiedSEO functions instead.');
  return [];
};

export const generateCitySchemas = () => {
  console.warn('generateCitySchemas is deprecated. Use generatePlaceSchema instead.');
  return [];
};

// Utility functions for SEO metadata generation
// (Using centralized functions above)

