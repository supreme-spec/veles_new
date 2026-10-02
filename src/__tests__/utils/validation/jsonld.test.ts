/**
 * @ts-nocheck
 * Тесты для валидации JSON-LD схем
 */

import {
  validateJSONLDSchema,
  validateJSONLDSchemas,
  validateArticleSchema,
  validateOrganizationSchema,
  validateFAQSchema,
} from '@/shared/utils/validation/jsonld';

describe('JSON-LD Validation', () => {
  describe('validateJSONLDSchema', () => {
    it('должен валидировать правильную схему', () => {
      const validSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test Article',
      };

      expect(validateJSONLDSchema(validSchema)).toBe(true);
    });

    it('должен отклонять схему без @context', () => {
      const invalidSchema = {
        '@type': 'Article',
        headline: 'Test Article',
      };

      expect(validateJSONLDSchema(invalidSchema)).toBe(false);
    });

    it('должен отклонять схему без @type', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        headline: 'Test Article',
      };

      expect(validateJSONLDSchema(invalidSchema)).toBe(false);
    });

    it('должен отклонять null или undefined', () => {
      expect(validateJSONLDSchema(null)).toBe(false);
      expect(validateJSONLDSchema(undefined)).toBe(false);
    });

    it('должен отклонять не-объекты', () => {
      expect(validateJSONLDSchema('string')).toBe(false);
      expect(validateJSONLDSchema(123)).toBe(false);
      expect(validateJSONLDSchema([])).toBe(false);
    });
  });

  describe('validateJSONLDSchemas', () => {
    it('должен фильтровать валидные схемы', () => {
      const schemas = [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Test',
        },
        null,
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Test Org',
        },
        'invalid',
      ];

      const validSchemas = validateJSONLDSchemas(schemas);

      expect(validSchemas.length).toBe(2);
      expect(validSchemas[0]?.['@type']).toBe('Article');
      expect(validSchemas[1]?.['@type']).toBe('Organization');
    });

    it('должен возвращать пустой массив для невалидных схем', () => {
      const schemas = [null, undefined, 'invalid', 123];

      const validSchemas = validateJSONLDSchemas(schemas);

      expect(validSchemas.length).toBe(0);
    });
  });

  describe('validateArticleSchema', () => {
    it('должен валидировать правильную Article схему', () => {
      const validSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test Article',
        description: 'Test Description',
        datePublished: '2026-01-01',
        author: { '@type': 'Person', name: 'Test Author' },
      };

      expect(validateArticleSchema(validSchema)).toBe(true);
    });

    it('должен отклонять схему без обязательных полей', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test Article',
        // Отсутствует description, datePublished, author
      };

      expect(validateArticleSchema(invalidSchema)).toBe(false);
    });

    it('должен отклонять схему неправильного типа', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test Org',
      };

      expect(validateArticleSchema(invalidSchema)).toBe(false);
    });
  });

  describe('validateOrganizationSchema', () => {
    it('должен валидировать правильную Organization схему', () => {
      const validSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test Organization',
        url: 'https://example.com',
      };

      expect(validateOrganizationSchema(validSchema)).toBe(true);
    });

    it('должен отклонять схему без обязательных полей', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test Organization',
        // Отсутствует url
      };

      expect(validateOrganizationSchema(invalidSchema)).toBe(false);
    });
  });

  describe('validateFAQSchema', () => {
    it('должен валидировать правильную FAQ схему', () => {
      const validSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Test Question',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Test Answer',
            },
          },
        ],
      };

      expect(validateFAQSchema(validSchema)).toBe(true);
    });

    it('должен отклонять схему без вопросов', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [],
      };

      expect(validateFAQSchema(invalidSchema)).toBe(false);
    });

    it('должен отклонять схему с не-массивом mainEntity', () => {
      const invalidSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: 'not an array',
      };

      expect(validateFAQSchema(invalidSchema)).toBe(false);
    });
  });
});
