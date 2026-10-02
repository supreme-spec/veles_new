import { SITE_URL, LOGO_URL } from '@/shared/constants/seo';

export interface VideoSchemaConfig {
  title: string;
  description: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  embedUrl?: string;
}

export function generateVideoSchema(config: VideoSchemaConfig): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: config.title,
    description: config.description,
    thumbnailUrl: config.thumbnailUrl || LOGO_URL,
    uploadDate: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'Велес Вояж | Экспертная редакция',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    contentUrl: config.contentUrl || `${SITE_URL}/videos/`,
    embedUrl: config.embedUrl || `${SITE_URL}/videos/`,
  };
}

