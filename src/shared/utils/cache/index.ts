/**
 * Централизованный экспорт функций кэширования
 */

export {
  getCache,
  setCache,
  deleteCache,
  clearCache,
  cacheFunction,
} from './redis';

// Константы для TTL (Time To Live)
export const CACHE_TTL = {
  SHORT: 300, // 5 минут
  MEDIUM: 1800, // 30 минут
  LONG: 3600, // 1 час
  VERY_LONG: 86400, // 24 часа
  WEEK: 604800, // 7 дней
} as const;

// Префиксы для разных типов кэша
export const CACHE_PREFIXES = {
  SEO: 'seo:',
  API: 'api:',
  WIKI: 'wiki:',
  COUNTRIES: 'countries:',
  CITIES: 'cities:',
  TOURS: 'tours:',
  CRUISES: 'cruises:',
} as const;

