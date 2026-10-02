/**
 * API route для получения CSRF токена
 * GET /api/csrf - возвращает новый CSRF токен
 */

import { NextResponse } from 'next/server';
import { generateCSRFToken } from '@/shared/utils/csrf';

export const dynamic = 'force-dynamic';

/**
 * GET /api/csrf
 * Возвращает новый CSRF токен для использования в формах
 */
export async function GET() {
  try {
    const token = generateCSRFToken();

    return NextResponse.json(
      { token },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('[CSRF API] Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

