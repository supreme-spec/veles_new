/**
 * Утилита для обработки ошибок в API routes
 */

import { NextResponse } from 'next/server';
import { safeLogger } from './safeLogger';
import { ZodError } from 'zod';

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Обрабатывает ошибки и возвращает соответствующий HTTP ответ
 * @param error - Ошибка для обработки
 * @param context - Контекст ошибки (название API endpoint)
 * @returns NextResponse с информацией об ошибке
 */
export function handleApiError(error: unknown, context = 'API'): NextResponse {
  // Логируем ошибку безопасно
  safeLogger.error(`${context} Error:`, error);

  // Обрабатываем Zod ошибки валидации
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        message: 'Invalid request data',
        details: (error as any).issues?.map((err: any) => ({
          path: err.path?.join('.') || '',
          message: err.message,
        })) || [],
      },
      { status: 400 }
    );
  }

  // Обрабатываем стандартные ошибки
  if (error instanceof Error) {
    // В продакшене не раскрываем детали ошибок
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: 'An error occurred while processing your request',
        },
        { status: 500 }
      );
    }

    // В development показываем детали
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }

  // Обрабатываем неизвестные ошибки
  return NextResponse.json(
    {
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    },
    { status: 500 }
  );
}

/**
 * Обертка для API handlers с обработкой ошибок
 * @param handler - Функция-обработчик API route
 * @param context - Контекст для логирования
 * @returns Обернутый handler с обработкой ошибок
 */
export function withErrorHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>,
  context = 'API'
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error, context);
    }
  };
}

