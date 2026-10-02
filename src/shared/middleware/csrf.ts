/**
 * Middleware для автоматической проверки CSRF токенов в API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken } from '@/shared/utils/csrf';

/**
 * Проверяет CSRF токен в запросе
 * @param request - Next.js request объект
 * @returns true если токен валиден, false в противном случае
 */
export async function validateRequestCSRF(request: NextRequest): Promise<boolean> {
  // Получаем токен из заголовков (предпочтительный способ)
  const tokenFromHeader = request.headers.get('X-CSRF-Token');
  
  // Также проверяем URL параметры (для GET запросов с формами)
  const tokenFromUrl = request.nextUrl.searchParams.get('csrf_token');

  // Используем токен из заголовка или URL
  // Примечание: чтение body здесь может вызвать проблемы, так как body может быть уже прочитан
  // Поэтому используем только заголовки и URL параметры
  const token = tokenFromHeader || tokenFromUrl;

  if (!token) {
    return false;
  }

  return validateCSRFToken(token);
}

/**
 * Middleware функция для проверки CSRF в API routes
 * @param request - Next.js request объект
 * @returns NextResponse с ошибкой или null если валидно
 */
export async function csrfProtectionMiddleware(
  request: NextRequest
): Promise<NextResponse | null> {
  // Пропускаем GET, HEAD, OPTIONS запросы
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return null;
  }

  // Проверяем CSRF токен
  const isValid = await validateRequestCSRF(request);
  if (!isValid) {
    return NextResponse.json(
      {
        error: 'CSRF token validation failed',
        message: 'Invalid or missing CSRF token',
      },
      { status: 403 }
    );
  }

  return null; // Токен валиден, продолжаем
}

/**
 * Обертка для API route handlers с CSRF защитой
 * @param handler - Функция-обработчик API route
 * @returns Обернутый handler с CSRF защитой
 */
export function withCSRFProtection<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    // Проверяем CSRF
    const csrfError = await csrfProtectionMiddleware(request);
    if (csrfError) {
      return csrfError;
    }

    // Вызываем оригинальный handler
    return handler(request, ...args);
  };
}

