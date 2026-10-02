/**
 * Zod схемы для валидации входных данных API
 */

import { z } from 'zod';

// Схема для Web Vitals
export const webVitalsSchema = z.object({
  name: z.enum(['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP']),
  value: z.number().min(0),
  id: z.string().min(1),
  page: z.string().url().optional(),
  timestamp: z.number().int().positive().optional(),
});

// Схема для Wiki страницы
export const wikiPageSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  creator: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Схема для поиска
export const searchQuerySchema = z.object({
  q: z.string().min(1).max(100),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  adults: z.string().optional(),
  children: z.string().optional(),
  residency: z.string().optional(),
  limit: z.number().int().min(1).max(50).optional(),
  offset: z.number().int().min(0).optional(),
});

// Схема для индексации
export const indexingKeySchema = z.object({
  key: z.string().min(1),
});

// Схема для предложений
export const suggestionsQuerySchema = z.object({
  q: z.string().min(1).max(100),
});

// Схема для FAQ
export const faqSchema = z.object({
  question: z.string().min(5).max(200),
  answer: z.string().min(10).max(1000),
});

// Схема для отзыва
export const reviewSchema = z.object({
  author: z.string().min(1).max(100),
  reviewBody: z.string().min(10).max(1000),
  ratingValue: z.string().regex(/^[1-5](\.\d+)?$/).optional(),
  datePublished: z.string().datetime().optional(),
});

// Типы для использования в API routes
export type WebVitalsInput = z.infer<typeof webVitalsSchema>;
export type WikiPageInput = z.infer<typeof wikiPageSchema>;
export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type IndexingKeyInput = z.infer<typeof indexingKeySchema>;
export type SuggestionsQueryInput = z.infer<typeof suggestionsQuerySchema>;
export type FAQInput = z.infer<typeof faqSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;

