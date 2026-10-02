import { z } from 'zod';

/**
 * Zod-схема для валидации MDX frontmatter стран.
 * Предотвращает runtime ошибки из-за опечаток или некорректных данных
 * в frontmatter MDX-файлов.
 */
export const CountryFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Image must be a valid URL').optional(),
  continent: z.enum(['europe', 'asia', 'africa', 'north-america', 'south-america', 'oceania']).optional(),
  capital: z.string().optional(),
  population: z.number().int().positive().optional(),
  faqs: z.string().optional().transform(val =>
    val ? val.split(';;').map(faq => {
      const [question, answer] = faq.split('|');
      return { question: question?.trim(), answer: answer?.trim() };
    }) : []
  ),
  politicalStatus: z.enum(['country', 'territory', 'disputed']).optional(),
  datePublished: z.string().datetime().optional(),
  dateModified: z.string().datetime().optional(),
  author: z.string().optional(),
  keywords: z.union([
    z.string().transform(val => val.split(',').map(k => k.trim())),
    z.array(z.string())
  ]).optional(),
  latitude: z.number().min(-91).max(91).optional(),
  longitude: z.number().min(-181).max(181).optional(),
  wordCount: z.number().int().positive().optional(),
  // GEO/AEO поля для ИИ-поисковиков
  wikidataId: z.string().optional(),
  wikipediaUrl: z.string().url().optional(),
  directAnswer: z.string().optional(),
});

// Тип, выведенный из схемы
export type CountryFrontmatter = z.infer<typeof CountryFrontmatterSchema>;

/**
 * Функция для безопасного парсинга frontmatter с валидацией
 */
export function validateCountryFrontmatter(frontmatter: unknown) {
  return CountryFrontmatterSchema.safeParse(frontmatter);
}
