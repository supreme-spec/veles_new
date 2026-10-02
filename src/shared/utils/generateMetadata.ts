import type { Metadata } from 'next';
import { SEO_CONFIG, generateCompleteSEO } from './comprehensiveSEO';

interface MetadataOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  section?: string;
  wordCount?: number;
  publishedTime?: string | undefined;
  modifiedTime?: string | undefined;
  includeWeb3?: boolean;
  includeDarkWeb?: boolean;
  includeAI?: boolean;
  includeVideo?: boolean;
  videoData?: {
    name: string;
    description: string;
    contentUrl?: string;
    embedUrl?: string;
  };
  reviewData?: {
    name: string;
    rating: string;
    reviewCount: string;
    reviews: Array<{ author: string; body: string; date: string }>;
  };
}

export function generateMetadata(options: MetadataOptions): Metadata {
  const seo = generateCompleteSEO(options);
  const fullUrl = options.url.startsWith('http')
    ? options.url
    : `${SEO_CONFIG.siteUrl}${options.url}`;
  const fullImageUrl = options.image
    ? options.image.startsWith('http')
      ? options.image
      : `${SEO_CONFIG.siteUrl}${options.image}`
    : SEO_CONFIG.logoUrl;

  return {
    title: options.title,
    description: seo.metaTags.description,
    keywords: seo.metaTags.keywords,
    authors: [{ name: SEO_CONFIG.organization }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,

    // Robots
    robots: {
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

    // Verification
    verification: {
      yandex:
        process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 ||
        process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 ||
        SEO_CONFIG.verifications.yandex,
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || SEO_CONFIG.verifications.google,
      other: {
        'yandex-verification':
          process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 ||
          process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 ||
          SEO_CONFIG.verifications.yandex2,
        'baidu-site-verification':
          process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || SEO_CONFIG.verifications.baidu,
        'bing-site-verification':
          process.env.NEXT_PUBLIC_BING_VERIFICATION || SEO_CONFIG.verifications.bing,
        'naver-site-verification':
          process.env.NEXT_PUBLIC_NAVER_VERIFICATION || SEO_CONFIG.verifications.naver,
        'tg:site_verification':
          process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION ||
          SEO_CONFIG.verifications.telegram ||
          'veles_voyage_official',
      },
    },

    // Open Graph
    openGraph: {
      title: options.title,
      description: seo.metaTags.description,
      url: fullUrl,
      siteName: SEO_CONFIG.siteName,
      locale: 'ru_RU',
      type: options.type || 'website',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@velesvoyage',
      creator: '@velesvoyage',
      title: options.title,
      description: seo.metaTags.description,
      images: [fullImageUrl],
    },

    // Canonical & Hreflang
    alternates: {
      canonical: fullUrl,
      languages: {
        ru: fullUrl,
        'x-default': fullUrl,
      },
    },

    // Additional metadata
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    category: 'travel',
    classification: 'tourism',

    // Other meta tags
    other: {
      'telegram:channel': SEO_CONFIG.social.telegram.replace('https://t.me/', '@'),
      'og:see_also': SEO_CONFIG.social.telegram,
      'twitter:site': '@velesvoyage',
      'twitter:creator': '@velesvoyage',
    },
  };
}

// Helper to generate structured data scripts
// Note: This function returns data for use in React components, not JSX directly
// Use StructuredData component from '@/components/SEO/StructuredData' instead
export function generateStructuredDataScripts(schemas: any[]) {
  // This function is kept for compatibility but should use StructuredData component
  // Return schemas array for StructuredData component
  return schemas;
}
