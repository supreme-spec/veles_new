import type { ArticleSchema } from '@/shared/types/schema';
import { LOGO_URL } from '@/shared/constants/seo';

export interface ArticleSchemaConfig {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function generateArticleSchema(config: ArticleSchemaConfig): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    image: config.image || LOGO_URL,
    datePublished: config.datePublished || new Date().toISOString(),
    dateModified: config.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: config.author || 'Велес Вояж | Экспертная редакция',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Велес Вояж | Экспертная редакция',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.url,
    },
    inLanguage: 'ru-RU',
  };
}

