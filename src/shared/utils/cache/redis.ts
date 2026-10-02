/**
 * Redis кэширование для серверных запросов
 * Поддерживает fallback на in-memory кэш, если Redis недоступен
 */

interface CacheOptions {
  ttl?: number; // Time to live в секундах
  prefix?: string; // Префикс для ключей
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

// In-memory fallback кэш (используется, если Redis недоступен)
const memoryCache = new Map<string, CacheEntry<unknown>>();

// Очистка устаревших записей из памяти каждые 5 минут
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryCache.entries()) {
      if (entry.expiresAt < now) {
        memoryCache.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Проверяет доступность Redis
 */
async function isRedisAvailable(): Promise<boolean> {
  // В продакшене проверяем наличие REDIS_URL
  if (process.env.REDIS_URL) {
    try {
      // Здесь можно добавить ping к Redis
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Получает значение из кэша
 * @param key - Ключ кэша
 * @returns Значение или null, если не найдено или истекло
 */
export async function getCache<T>(key: string): Promise<T | null> {
  const cacheKey = `veles:${key}`;

  // Пытаемся использовать Redis, если доступен
  if (await isRedisAvailable() && process.env.REDIS_URL) {
    try {
      // В продакшене здесь будет реальный Redis клиент
      // const redis = new Redis(process.env.REDIS_URL);
      // const value = await redis.get(cacheKey);
      // return value ? JSON.parse(value) : null;
      
      // Пока используем fallback
      return getFromMemoryCache<T>(cacheKey);
    } catch (error) {
      console.warn('Redis error, falling back to memory cache:', error);
      return getFromMemoryCache<T>(cacheKey);
    }
  }

  // Fallback на in-memory кэш
  return getFromMemoryCache<T>(cacheKey);
}

/**
 * Сохраняет значение в кэш
 * @param key - Ключ кэша
 * @param value - Значение для кэширования
 * @param options - Опции кэширования
 */
export async function setCache<T>(
  key: string,
  value: T,
  options: CacheOptions = {}
): Promise<void> {
  const cacheKey = `veles:${options.prefix || ''}${key}`;
  const ttl = options.ttl || 3600; // По умолчанию 1 час
  const expiresAt = Date.now() + ttl * 1000;

  // Пытаемся использовать Redis, если доступен
  if (await isRedisAvailable() && process.env.REDIS_URL) {
    try {
      // В продакшене здесь будет реальный Redis клиент
      // const redis = new Redis(process.env.REDIS_URL);
      // await redis.setex(cacheKey, ttl, JSON.stringify(value));
      
      // Пока используем fallback
      setToMemoryCache(cacheKey, value, expiresAt);
    } catch (error) {
      console.warn('Redis error, falling back to memory cache:', error);
      setToMemoryCache(cacheKey, value, expiresAt);
    }
  } else {
    // Fallback на in-memory кэш
    setToMemoryCache(cacheKey, value, expiresAt);
  }
}

/**
 * Удаляет значение из кэша
 * @param key - Ключ кэша
 */
export async function deleteCache(key: string): Promise<void> {
  const cacheKey = `veles:${key}`;

  if (await isRedisAvailable() && process.env.REDIS_URL) {
    try {
      // const redis = new Redis(process.env.REDIS_URL);
      // await redis.del(cacheKey);
      memoryCache.delete(cacheKey);
    } catch (error) {
      console.warn('Redis error, falling back to memory cache:', error);
      memoryCache.delete(cacheKey);
    }
  } else {
    memoryCache.delete(cacheKey);
  }
}

/**
 * Очищает весь кэш (или по префиксу)
 * @param prefix - Опциональный префикс для очистки
 */
export async function clearCache(prefix?: string): Promise<void> {
  if (await isRedisAvailable() && process.env.REDIS_URL) {
    try {
      // const redis = new Redis(process.env.REDIS_URL);
      // if (prefix) {
      //   const keys = await redis.keys(`veles:${prefix}*`);
      //   if (keys.length > 0) await redis.del(...keys);
      // } else {
      //   await redis.flushdb();
      // }
      
      // Пока используем fallback
      clearMemoryCache(prefix);
    } catch (error) {
      console.warn('Redis error, falling back to memory cache:', error);
      clearMemoryCache(prefix);
    }
  } else {
    clearMemoryCache(prefix);
  }
}

// In-memory кэш функции (fallback)

function getFromMemoryCache<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;

  if (entry.expiresAt < Date.now()) {
    memoryCache.delete(key);
    return null;
  }

  return entry.data as T;
}

function setToMemoryCache<T>(key: string, value: T, expiresAt: number): void {
  memoryCache.set(key, { data: value, expiresAt });
}

function clearMemoryCache(prefix?: string): void {
  if (prefix) {
    for (const key of memoryCache.keys()) {
      if (key.startsWith(`veles:${prefix}`)) {
        memoryCache.delete(key);
      }
    }
  } else {
    memoryCache.clear();
  }
}

/**
 * Кэширует результат функции
 * @param fn - Функция для кэширования
 * @param key - Ключ кэша
 * @param options - Опции кэширования
 */
export async function cacheFunction<T>(
  fn: () => Promise<T>,
  key: string,
  options: CacheOptions = {}
): Promise<T> {
  const cached = await getCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  const result = await fn();
  await setCache(key, result, options);
  return result;
}

