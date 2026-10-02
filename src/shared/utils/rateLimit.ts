/**
 * Простой rate limiting для API routes
 * В продакшене рекомендуется использовать Redis или специализированные сервисы
 */

interface RateLimitOptions {
  windowMs: number; // Время окна в миллисекундах
  max: number; // Максимальное количество запросов
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory хранилище (в продакшене использовать Redis)
const store: RateLimitStore = {};

// Очистка старых записей каждые 5 минут
setInterval(
  () => {
    const now = Date.now();
    Object.keys(store).forEach(key => {
      const record = store[key];
      if (record && record.resetTime < now) {
        delete store[key];
      }
    });
  },
  5 * 60 * 1000
);

/**
 * Проверяет, не превышен ли лимит запросов
 * @param identifier - Уникальный идентификатор (IP, userId, etc.)
 * @param options - Опции rate limiting
 * @returns Объект с информацией о лимите
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 15 * 60 * 1000, max: 100 }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = store[identifier];

  if (!record || record.resetTime < now) {
    // Создаем новую запись
    store[identifier] = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    return {
      allowed: true,
      remaining: options.max - 1,
      resetTime: now + options.windowMs,
    };
  }

  if (record.count >= options.max) {
    // Лимит превышен
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  // Увеличиваем счетчик
  record.count++;
  return {
    allowed: true,
    remaining: options.max - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Получает IP адрес из запроса
 */
export function getClientIP(request: Request): string {
  // Пытаемся получить IP из заголовков (для прокси)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIP = forwarded.split(',')[0];
    if (firstIP) {
      return firstIP.trim();
    }
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback (в реальности это не сработает, но для типизации)
  return 'unknown';
}

/**
 * Middleware для rate limiting в Next.js API routes
 */
export function rateLimitMiddleware(
  options: RateLimitOptions = { windowMs: 15 * 60 * 1000, max: 100 }
) {
  return (request: Request): { allowed: boolean; headers?: Headers } => {
    const ip = getClientIP(request);
    const result = checkRateLimit(ip, options);

    if (!result.allowed) {
      const headers = new Headers();
      headers.set('X-RateLimit-Limit', options.max.toString());
      headers.set('X-RateLimit-Remaining', result.remaining.toString());
      headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString());
      headers.set('Retry-After', Math.ceil((result.resetTime - Date.now()) / 1000).toString());

      return { allowed: false, headers };
    }

    const headers = new Headers();
    headers.set('X-RateLimit-Limit', options.max.toString());
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString());

    return { allowed: true, headers };
  };
}
