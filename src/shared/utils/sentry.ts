/**
 * Sentry configuration for error monitoring
 * 
 * Для использования:
 * 1. Установите @sentry/nextjs: npm install @sentry/nextjs
 * 2. Добавьте SENTRY_DSN в переменные окружения
 * 3. Инициализируйте в next.config.js или sentry.client.config.ts
 */

// Проверяем наличие Sentry DSN
const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENABLED = process.env.NODE_ENV === 'production' && !!SENTRY_DSN;

/**
 * Инициализация Sentry (вызывается в sentry.client.config.ts и sentry.server.config.ts)
 */
export function initSentry() {
  if (!SENTRY_ENABLED) {
    console.log('[Sentry] Disabled - not in production or DSN not set');
    return;
  }

  // Инициализация будет выполнена в sentry.client.config.ts и sentry.server.config.ts
  console.log('[Sentry] Initialized');
}

/**
 * Логирование ошибок в Sentry (fallback если Sentry не установлен)
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
  if (!SENTRY_ENABLED) {
    console.error('[Error]', error, context);
    return;
  }

  // Если Sentry установлен, используем его API
  try {
    if (typeof window !== 'undefined') {
      const windowSentry = (window as { Sentry?: { captureException: (error: Error, context?: Record<string, unknown>) => void } }).Sentry;
      if (windowSentry) {
        windowSentry.captureException(error, context);
        return;
      }
    }
    // Для сервера
    // @ts-ignore - dynamic require
    const Sentry = require('@sentry/nextjs');
    if (Sentry && Sentry.captureException) {
      Sentry.captureException(error, context);
      return;
    }
  } catch {
    // Sentry не установлен или не доступен
  }
  
  console.error('[Error] Sentry not available, logging to console:', error, context);
}

/**
 * Логирование сообщений в Sentry
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (!SENTRY_ENABLED) {
    console.log(`[${level.toUpperCase()}]`, message);
    return;
  }

  try {
    if (typeof window !== 'undefined') {
      const windowSentry = (window as { Sentry?: { captureMessage: (message: string, level: string) => void } }).Sentry;
      if (windowSentry) {
        windowSentry.captureMessage(message, level);
        return;
      }
    }
    // Для сервера
    // @ts-ignore - dynamic require
    const Sentry = require('@sentry/nextjs');
    if (Sentry && Sentry.captureMessage) {
      Sentry.captureMessage(message, level);
      return;
    }
  } catch {
    // Sentry не установлен или не доступен
  }
  
  console.log(`[${level.toUpperCase()}]`, message);
}

/**
 * Установка контекста пользователя
 */
export function setUser(user: { id?: string; email?: string; username?: string }) {
  if (!SENTRY_ENABLED) {
    return;
  }

  try {
    if (typeof window !== 'undefined') {
      const windowSentry = (window as { Sentry?: { setUser: (user: Record<string, unknown>) => void } }).Sentry;
      if (windowSentry) {
        windowSentry.setUser(user);
        return;
      }
    }
    // Для сервера
    // @ts-ignore - dynamic require
    const Sentry = require('@sentry/nextjs');
    if (Sentry && Sentry.setUser) {
      Sentry.setUser(user);
      return;
    }
  } catch {
    // Sentry не установлен или не доступен
  }
}

/**
 * Установка тегов
 */
export function setTag(key: string, value: string) {
  if (!SENTRY_ENABLED) {
    return;
  }

  try {
    if (typeof window !== 'undefined') {
      const windowSentry = (window as { Sentry?: { setTag: (key: string, value: string) => void } }).Sentry;
      if (windowSentry) {
        windowSentry.setTag(key, value);
        return;
      }
    }
    // Для сервера
    // @ts-ignore - dynamic require
    const Sentry = require('@sentry/nextjs');
    if (Sentry && Sentry.setTag) {
      Sentry.setTag(key, value);
      return;
    }
  } catch {
    // Sentry не установлен или не доступен
  }
}

