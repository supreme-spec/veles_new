/**
 * DEPRECATED: This file is deprecated. Use '@/lib/seo/unifiedSEO' instead.
 * 
 * This file contains legacy SEO functions that have been migrated to the unified SEO library.
 * Keeping this file for backward compatibility only.
 * 
 * @deprecated Use unifiedSEO instead
 */

// Re-export core functions from unifiedSEO for backward compatibility
export {
  generateArticleSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generatePlaceSchema,
  generateEnhancedSEOMetadata,
  generateArticleMetadata,
  generateNoIndexMetadata,
  generateDescription,
  generateKeywords,
  getExtendedKeywords,
  getCurrentDates,
  SEO_CONFIG
} from '@/lib/seo/unifiedSEO';

// Export deprecated functions with warnings for backward compatibility
export const generateBreadcrumbSchema = () => {
  console.warn('generateBreadcrumbSchema is deprecated. Use unifiedSEO functions instead.');
  return {};
};

export const generateSpeakableSchema = () => {
  console.warn('generateSpeakableSchema is deprecated. Use unifiedSEO functions instead.');
  return {};
};

export const generateReviewSchema = () => {
  console.warn('generateReviewSchema is deprecated. Use unifiedSEO functions instead.');
  return {};
};

export const generateVideoSchema = () => {
  console.warn('generateVideoSchema is deprecated. Use unifiedSEO functions instead.');
  return {};
};

export const generateAISchema = () => {
  console.warn('generateAISchema is deprecated. Use unifiedSEO functions instead.');
  return {};
};

export const generateGlobalSearchSchema = () => {
  console.warn('generateGlobalSearchSchema is deprecated. Use unifiedSEO functions instead.');
  return {};
};

export const generateHreflang = () => {
  console.warn('generateHreflang is deprecated. Use unifiedSEO.generateHreflangTags instead.');
  return [];
};

export const generateCompleteSEO = (options: any) => {
  console.warn('generateCompleteSEO is deprecated. Use unifiedSEO.generateEnhancedSEOMetadata instead.');
  return {
    schemas: [],
    dates: { published: '', modified: '' },
    hreflang: [],
    metaTags: {
      title: options?.title || '',
      description: options?.description || '',
      url: options?.url || '',
      type: options?.type || 'website',
      keywords: options?.keywords || []
    }
  };
};
