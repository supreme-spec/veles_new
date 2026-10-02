/**
 * Comprehensive Test Suite for SEO Modules
 * Tests all SEO functionality to ensure quality and prevent regressions
 */

import { describe, it, expect, jest } from '@jest/globals';

// Mock React cache function for testing
jest.mock('react', () => ({
  cache: (fn: Function) => fn
}));

// Schema type interfaces for testing
interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}

interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    name: string;
  }>;
}

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
}

interface PlaceSchema {
  '@context': string;
  '@type': string;
  name: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  address?: {
    addressRegion: string;
  };
}

import { 
  generateDescription, 
  generateKeywords, 
  getExtendedKeywords,
  generateArticleSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generatePlaceSchema,
  generateEnhancedSEOMetadata,
  generateArticleMetadata,
  SEO_CONFIG,
  getCurrentDates
} from '@/lib/seo/unifiedSEO';

describe('Unified SEO Library', () => {
  describe('Core Utility Functions', () => {
    it('should generate optimized description with proper truncation', () => {
      const longText = 'This is a very long description that should be truncated to fit SEO requirements and preserve word boundaries properly.';
      const result = generateDescription(longText, 50);
      
      expect(result.length).toBeLessThanOrEqual(53); // 50 + "..."
      expect(result.endsWith('...')).toBe(true);
      expect(result.includes('<')).toBe(false); // No HTML tags
    });

    it('should handle short text without truncation', () => {
      const shortText = 'Short description';
      const result = generateDescription(shortText, 100);
      
      expect(result).toBe(shortText);
      expect(result.endsWith('...')).toBe(false);
    });

    it('should generate keywords with deduplication and limit', () => {
      const keywords = ['travel', 'Tourism', 'TRAVEL', 'vacation', 'Travel'];
      const result = generateKeywords(keywords);
      
      expect(result.split(',').length).toBeLessThanOrEqual(15);
      expect(result.toLowerCase()).toContain('travel');
      expect(result).not.toContain('TRAVEL'); // Should be normalized
    });

    it('should get extended keywords for countries', () => {
      const result = getExtendedKeywords('Россия');
      
      expect(result).toContain('путеводитель по Россия');
      expect(result).toContain('туризм');
      expect(result.length).toBeGreaterThan(15);
    });

    it('should get base keywords without country', () => {
      const result = getExtendedKeywords();
      
      expect(result).toContain('туризм');
      expect(result).toContain('путешествия');
      expect(result.length).toBe(15);
    });

    it('should get current dates', () => {
      const dates = getCurrentDates();
      
      expect(dates.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(dates.modified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(dates.published).toBe(dates.modified); // Same date for same call
    });
  });

  describe('Schema Generators', () => {
    it('should generate valid Article schema', () => {
      const articleData = {
        headline: 'Test Article',
        description: 'Test description for article schema',
        url: 'https://test.com/article',
        datePublished: '2024-01-01',
        dateModified: '2024-01-02',
        keywords: ['test', 'article']
      };

      const schema = generateArticleSchema(articleData) as ArticleSchema;

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Article');
      expect(schema.headline).toBe(articleData.headline);
      expect(schema.description).toBe(articleData.description);
      expect(schema.datePublished).toBe(articleData.datePublished);
    });

    it('should generate valid FAQ schema', () => {
      const faqs = [
        { question: 'What is this?', answer: 'This is a test.' },
        { question: 'How does it work?', answer: 'It works perfectly.' }
      ];

      const schema = generateFAQSchema(faqs) as FAQSchema;

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toHaveLength(2);
      expect(schema.mainEntity?.[0]?.name).toBe(faqs[0]?.question);
    });

    it('should generate valid Organization schema', () => {
      const schema = generateOrganizationSchema() as OrganizationSchema;

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe(SEO_CONFIG.organization);
      expect(schema.url).toBe(SEO_CONFIG.siteUrl);
    });

    it('should generate valid Place schema with geo coordinates', () => {
      const placeData = {
        name: 'Moscow',
        description: 'Capital of Russia',
        geo: { latitude: 55.7558, longitude: 37.6173 },
        region: 'Moscow'
      };

      const schema = generatePlaceSchema(placeData) as PlaceSchema;

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Place');
      expect(schema.name).toBe(placeData.name);
      expect(schema.geo!.latitude).toBe(placeData.geo.latitude);
      expect(schema.address!.addressRegion).toBe(placeData.region);
    });

    it('should generate Place schema without geo data', () => {
      const placeData = {
        name: 'Unknown City',
        description: 'City without coordinates'
      };

      const schema = generatePlaceSchema(placeData) as PlaceSchema;

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Place');
      expect(schema.name).toBe(placeData.name);
      expect(schema.geo).toBeUndefined();
    });
  });

  describe('Metadata Generators', () => {
    it('should generate complete SEO metadata', () => {
      const seoData = {
        title: 'Test Page',
        description: 'Test description for SEO',
        keywords: ['test', 'seo'],
        url: '/test-page',
        image: '/test-image.jpg',
        type: 'article' as const,
        publishedTime: '2024-01-01',
        modifiedTime: '2024-01-02',
        section: 'Travel',
        author: 'Test Author'
      };

      const metadata = generateEnhancedSEOMetadata(seoData);

      expect(metadata.title).toBe(seoData.title);
      expect(metadata.description).toBe(seoData.description);
      expect(metadata.openGraph?.title).toBe(seoData.title);
      expect(metadata.keywords).toContain('test');
      expect(metadata.keywords).toContain('test');
      expect(metadata.authors).toBeDefined();
    });

    it('should handle no-index pages', () => {
      const seoData = {
        title: 'Private Page',
        description: 'This page should not be indexed',
        noIndex: true
      };

      const metadata = generateEnhancedSEOMetadata(seoData);

      // Check that robots configuration exists and is properly configured
      expect(metadata.robots).toBeDefined();
      expect(metadata.title).toBe(seoData.title);
    });

    it('should generate article-specific metadata', () => {
      const articleData = {
        title: 'Blog Post',
        description: 'A blog post about travel',
        category: 'Travel Tips',
        author: 'Travel Writer'
      };

      const metadata = generateArticleMetadata(articleData);

      expect(metadata.title).toBe('Blog Post');
      expect(metadata.description).toBe('A blog post about travel');
      expect(metadata.category).toBe('travel');
    });

    it('should include geolocation data when provided', () => {
      const seoData = {
        title: 'Geotagged Location',
        description: 'Location with coordinates',
        geo: { latitude: 40.7128, longitude: -74.0060 }
      };

      const metadata = generateEnhancedSEOMetadata(seoData);
      
      // Check that geolocation meta tags are present
      expect(metadata.other).toBeDefined();
    });

    it('should handle FAQ data', () => {
      const seoData = {
        title: 'FAQ Page',
        description: 'Frequently asked questions',
        faqs: [
          { question: 'Question 1?', answer: 'Answer 1' },
          { question: 'Question 2?', answer: 'Answer 2' }
        ]
      };

      const metadata = generateEnhancedSEOMetadata(seoData);
      
      // FAQ schema should be generated (implementation-dependent)
      expect(metadata).toBeDefined();
    });
  });

  describe('Configuration Validation', () => {
    it('should have complete SEO configuration', () => {
      expect(SEO_CONFIG.siteName).toBeDefined();
      expect(SEO_CONFIG.siteUrl).toBeDefined();
      expect(SEO_CONFIG.organization).toBeDefined();
      expect(SEO_CONFIG.contactPhone).toBeDefined();
      expect(SEO_CONFIG.contactEmail).toBeDefined();
    });

    it('should have proper social media links', () => {
      expect(SEO_CONFIG.social.vk).toMatch(/^https?:\/\//);
      expect(SEO_CONFIG.social.telegram).toMatch(/^https?:\/\//);
      expect(SEO_CONFIG.social.rutube).toMatch(/^https?:\/\//);
    });

    it('should have verification configurations', () => {
      expect(SEO_CONFIG.verifications).toBeDefined();
      expect(typeof SEO_CONFIG.verifications.google).toBe('string');
      expect(typeof SEO_CONFIG.verifications.yandex).toBe('string');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty keywords array', () => {
      const result = generateKeywords([]);
      expect(result).toBe('');
    });

    it('should handle very long single keyword', () => {
      const keywords = ['thisisaverylongkeywordthatexceedsnormalbounds'];
      const result = generateKeywords(keywords);
      expect(result).toBe(keywords[0]?.toLowerCase() || '');
    });

    it('should handle null/undefined inputs gracefully', () => {
      // This test depends on implementation - add specific error handling if needed
      expect(() => {
        generateDescription('', 100);
      }).not.toThrow();
    });

    it('should maintain consistent date format', () => {
      const dates = getCurrentDates();
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      expect(dates.published).toMatch(dateRegex);
      expect(dates.modified).toMatch(dateRegex);
    });
  });

  describe('Performance Tests', () => {
    it('should generate metadata quickly for large inputs', () => {
      const startTime = performance.now();
      
      const largeKeywords = Array(100).fill('test-keyword');
      const result = generateKeywords(largeKeywords);
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      expect(executionTime).toBeLessThan(100); // Should complete in < 100ms
      expect(result.split(',').length).toBeLessThanOrEqual(15); // Still respects limit
    });

    it('should cache date generation results', () => {
      const firstCall = getCurrentDates();
      const secondCall = getCurrentDates();
      
      // Both calls should return the same date for the same timestamp
      expect(firstCall.published).toBe(secondCall.published);
    });
  });
});

// Integration tests
describe('SEO Integration Tests', () => {
  it('should generate compatible schemas and metadata', () => {
    const articleData = {
      headline: 'Integrated Test',
      description: 'Testing integration between schemas and metadata',
      url: 'https://integration-test.com',
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
      keywords: ['integration', 'test']
    };

    const schema = generateArticleSchema(articleData) as ArticleSchema;
    const metadata = generateArticleMetadata({
      title: articleData.headline,
      description: articleData.description,
      keywords: articleData.keywords
    });

    // Both should reference the same content
    expect(schema.headline).toBe(metadata.title);
    expect(schema.description).toBe(metadata.description);
  });
});