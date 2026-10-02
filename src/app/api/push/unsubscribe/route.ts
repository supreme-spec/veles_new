/**
 * API route для отписки от Push уведомлений
 * POST /api/push/unsubscribe
 */

import { NextRequest, NextResponse } from 'next/server';
import { withCSRFProtection } from '@/shared/middleware/csrf';
import { safeLogger } from '@/shared/utils/safeLogger';
import { handleApiError } from '@/shared/utils/apiErrorHandler';

// В продакшене здесь должна быть база данных
// Для примера используем in-memory хранилище
const subscriptions = new Map<string, PushSubscriptionJSON>();

interface UnsubscribeRequest {
  endpoint: string;
}

/**
 * POST /api/push/unsubscribe
 * Удаляет подписку на push уведомления
 */
async function handleUnsubscribe(request: NextRequest) {
  try {
    const body: UnsubscribeRequest = await request.json();

    if (!body.endpoint) {
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      );
    }

    // Удаляем подписку
    // В продакшене здесь должно быть удаление из БД
    subscriptions.delete(body.endpoint);

    safeLogger.info('Push subscription removed', {
      endpoint: body.endpoint.substring(0, 50) + '...',
    });

    return NextResponse.json(
      { success: true, message: 'Subscription removed' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, 'Failed to remove subscription');
  }
}

// Экспортируем с CSRF защитой
export const POST = withCSRFProtection(handleUnsubscribe);

