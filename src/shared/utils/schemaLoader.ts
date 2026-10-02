/**
 * Утилита для динамической загрузки Schema.org схем
 * Позволяет разделить код и загружать схемы только когда они нужны
 */

export type SchemaType =
  | 'article'
  | 'faq'
  | 'organization'
  | 'breadcrumb'
  | 'speakable'
  | 'review'
  | 'video'
  | 'web3'
  | 'darkweb'
  | 'altsearch'
  | 'ai'
  | 'globalsearch'
  | 'social'
  | 'localbusiness';

export interface SchemaConfig {
  types: SchemaType[];
  url?: string;
  title?: string;
  description?: string;
}

/**
 * Динамически загружает схемы на основе конфигурации
 * Использует code splitting для уменьшения начального размера бандла
 */
export async function loadSchemas(config: SchemaConfig): Promise<Array<Record<string, unknown>>> {
  // Загружаем только необходимые схемы
  const schemaPromises = config.types.map(async type => {
    switch (type) {
      case 'article':
        const { generateArticleSchema } = await import('@/shared/utils/schemaGenerators/article');
        return generateArticleSchema({
          title: config.title || '',
          description: config.description || '',
          url: config.url || '',
        });

      case 'faq':
        const { generateFAQSchema } = await import('@/shared/utils/schemaGenerators/faq');
        return generateFAQSchema([]);

      case 'organization':
        const { generateOrganizationSchema } =
          await import('@/shared/utils/schemaGenerators/organization');
        return generateOrganizationSchema();

      case 'breadcrumb':
        const { generateBreadcrumbSchema } =
          await import('@/shared/utils/schemaGenerators/breadcrumb');
        return generateBreadcrumbSchema(config.url || '');

      case 'speakable':
        const { generateSpeakableSchema } =
          await import('@/shared/utils/schemaGenerators/speakable');
        return generateSpeakableSchema(config.url || '', config.title || '');

      case 'review':
        const { generateReviewSchema } = await import('@/shared/utils/schemaGenerators/review');
        return generateReviewSchema([]);

      case 'video':
        const { generateVideoSchema } = await import('@/shared/utils/schemaGenerators/video');
        return generateVideoSchema({
          title: config.title || '',
          description: config.description || '',
        });

      case 'web3':
        const { generateWeb3Schema } = await import('@/shared/utils/schemaGenerators/web3');
        return generateWeb3Schema(config.title || '');

      case 'darkweb':
        const { generateDarkWebSchema } = await import('@/shared/utils/schemaGenerators/darkweb');
        return generateDarkWebSchema(config.title || '');

      case 'altsearch':
        const { generateAltSearchSchema } =
          await import('@/shared/utils/schemaGenerators/altsearch');
        return generateAltSearchSchema(config.title || '');

      case 'ai':
        const { generateAISchema } = await import('@/shared/utils/schemaGenerators/ai');
        return generateAISchema({
          title: config.title || '',
          description: config.description || '',
        });

      case 'globalsearch':
        const { generateGlobalSearchSchema } =
          await import('@/shared/utils/schemaGenerators/globalsearch');
        return generateGlobalSearchSchema(config.title || '');

      case 'social':
        const { generateSocialSchema } = await import('@/shared/utils/schemaGenerators/social');
        return generateSocialSchema(config.url || '');

      case 'localbusiness':
        const { generateLocalBusinessSchema } =
          await import('@/shared/utils/schemaGenerators/localbusiness');
        return generateLocalBusinessSchema();

      default:
        return null;
    }
  });

  const loadedSchemas = await Promise.all(schemaPromises);
  return loadedSchemas.filter(
    (schema): schema is Record<string, unknown> => schema !== null
  ) as Array<Record<string, unknown>>;
}

/**
 * Предзагружает критические схемы (Organization, Breadcrumb)
 * для улучшения SEO без блокировки рендеринга
 */
export function preloadCriticalSchemas(): void {
  if (typeof window !== 'undefined') {
    // Предзагружаем только в браузере
    import('@/shared/utils/schemaGenerators/organization').catch(() => {});
    import('@/shared/utils/schemaGenerators/breadcrumb').catch(() => {});
  }
}
