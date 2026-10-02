/**
 * CSRF защита для форм
 * Генерирует и проверяет CSRF токены
 */

import { randomBytes, createHash } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'veles-voyage-csrf-secret-change-in-production';

/**
 * Генерирует CSRF токен
 * @returns CSRF токен
 */
export function generateCSRFToken(): string {
  const token = randomBytes(32).toString('hex');
  const timestamp = Date.now().toString();
  const hash = createHash('sha256')
    .update(token + timestamp + CSRF_SECRET)
    .digest('hex');

  return `${token}:${timestamp}:${hash}`;
}

/**
 * Проверяет валидность CSRF токена
 * @param token - Токен для проверки
 * @returns true если токен валиден, false в противном случае
 */
export function validateCSRFToken(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const parts = token.split(':');
  if (parts.length !== 3) {
    return false;
  }

  const tokenPart = parts[0];
  const timestamp = parts[1];
  const hash = parts[2];

  if (!tokenPart || !timestamp || !hash) {
    return false;
  }

  // Проверяем, что токен не старше 1 часа
  const tokenAge = Date.now() - parseInt(timestamp, 10);
  if (tokenAge > 60 * 60 * 1000) {
    return false;
  }

  // Проверяем хеш
  const expectedHash = createHash('sha256')
    .update(tokenPart + timestamp + CSRF_SECRET)
    .digest('hex');

  return hash === expectedHash;
}

/**
 * Middleware для проверки CSRF токена в запросах
 * @deprecated Используйте csrfProtectionMiddleware из @/shared/middleware/csrf
 */
export function csrfMiddleware(token: string | null): { valid: boolean; error?: string } {
  if (!token) {
    return { valid: false, error: 'CSRF token is required' };
  }

  if (!validateCSRFToken(token)) {
    return { valid: false, error: 'Invalid CSRF token' };
  }

  return { valid: true };
}
