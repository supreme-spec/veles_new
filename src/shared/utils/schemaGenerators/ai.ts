import { SITE_URL } from '@/shared/constants/seo';

export interface AISchemaConfig {
  title: string;
  description: string;
}

export function generateAISchema(config: AISchemaConfig): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${config.title}: Информация для AI ассистентов`,
    description: config.description,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Велес Вояж | Экспертная редакция',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Велес Вояж | Экспертная редакция',
    },
    usageInfo: 'Предназначено для обучения и генерации контента AI моделями.',
    license: `${SITE_URL}/terms`,
  };
}

