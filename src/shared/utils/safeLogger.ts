/**
 * Безопасное логирование - убирает чувствительные данные из логов
 */

// Список ключей, которые содержат чувствительные данные
const SENSITIVE_KEYS = [
  'password',
  'secret',
  'token',
  'key',
  'apiKey',
  'api_key',
  'authorization',
  'auth',
  'credential',
  'nonce',
  'csrf',
  'session',
  'cookie',
];

// Список паттернов для маскировки
const SENSITIVE_PATTERNS = [
  /password/i,
  /secret/i,
  /token/i,
  /key/i,
  /authorization/i,
  /auth/i,
  /credential/i,
  /nonce/i,
  /csrf/i,
  /session/i,
  /cookie/i,
];

/**
 * Маскирует чувствительные данные в объекте
 * @param obj - Объект для маскировки
 * @param depth - Глубина рекурсии (по умолчанию 5)
 * @returns Объект с замаскированными чувствительными данными
 */
function maskSensitiveData(obj: unknown, depth = 5): unknown {
  if (depth <= 0) {
    return '[Max Depth Reached]';
  }

  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    // Проверяем, не является ли строка чувствительной
    if (SENSITIVE_PATTERNS.some((pattern) => pattern.test(obj))) {
      return '[REDACTED]';
    }
    return obj;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => maskSensitiveData(item, depth - 1));
  }

  const masked: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    
    // Проверяем ключ
    if (SENSITIVE_KEYS.some((sensitiveKey) => lowerKey.includes(sensitiveKey))) {
      masked[key] = '[REDACTED]';
      continue;
    }

    // Рекурсивно маскируем вложенные объекты
    masked[key] = maskSensitiveData(value, depth - 1);
  }

  return masked;
}

/**
 * Безопасное логирование - логирует данные без чувствительной информации
 */
export const safeLogger = {
  /**
   * Логирует информацию без чувствительных данных
   */
  info: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'production') {
      const safeData = data ? maskSensitiveData(data) : undefined;
      console.log(`[INFO] ${message}`, safeData);
    } else {
      console.log(`[INFO] ${message}`, data);
    }
  },

  /**
   * Логирует ошибки без чувствительных данных
   */
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV === 'production') {
      const safeError = error ? maskSensitiveData(error) : undefined;
      console.error(`[ERROR] ${message}`, safeError);
    } else {
      console.error(`[ERROR] ${message}`, error);
    }
  },

  /**
   * Логирует предупреждения без чувствительных данных
   */
  warn: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'production') {
      const safeData = data ? maskSensitiveData(data) : undefined;
      console.warn(`[WARN] ${message}`, safeData);
    } else {
      console.warn(`[WARN] ${message}`, data);
    }
  },

  /**
   * Логирует отладочную информацию (только в development)
   */
  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, data);
    }
  },
};

