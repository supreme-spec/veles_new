/**
 * Константы для API endpoints
 */

// Rate limiting константы
export const RATE_LIMITS = {
  INDEXING: { windowMs: 60 * 60 * 1000, max: 10 }, // 10 запросов в час
  WIKI_SEARCH: { windowMs: 60 * 1000, max: 30 }, // 30 запросов в минуту
  SUGGESTIONS: { windowMs: 60 * 1000, max: 60 }, // 60 запросов в минуту
  WEB_VITALS: { windowMs: 60 * 1000, max: 100 }, // 100 запросов в минуту
} as const;

// Лимиты для поиска
export const SEARCH_LIMITS = {
  MAX_RESULTS: 50,
  DEFAULT_RESULTS: 15,
  MIN_QUERY_LENGTH: 2,
} as const;

// Таймауты
export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 секунд
  DATABASE_QUERY: 10000, // 10 секунд
} as const;

// Размеры файлов
export const FILE_LIMITS = {
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB
} as const;

