/**
 * API route для отправки Push уведомлений
 * POST /api/push/send
 * Требует аутентификации администратора
 */

import { NextRequest, NextResponse } from 'next/server';
import { safeLogger } from '@/shared/utils/safeLogger';
import { handleApiError } from '@/shared/utils/apiErrorHandler';

// web-push будет установлен отдельно
// Для TypeScript типов: npm install --save-dev @types/web-push
// @ts-ignore - dynamic import
let webpush: any = null;

// Динамический импорт web-push (опционально)
// Используем ленивую загрузку, чтобы не падать при старте, если библиотека не установлена
function getWebPush() {
  if (webpush !== null) {
    return webpush;
  }
  
  try {
    // В продакшене web-push должен быть установлен
    // @ts-ignore - dynamic require
    webpush = require('web-push');
    return webpush;
  } catch (error) {
    // web-push не установлен, будет использоваться fallback
    console.warn('[Push] web-push not installed. Install with: npm install web-push');
    return null;
  }
}

// В продакшене здесь должна быть база данных
// Для примера используем in-memory хранилище
const subscriptions = new Map<string, PushSubscriptionJSON>();

// Инициализация web-push с VAPID ключами
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:hello@veles-voyage.ru';

// Инициализация VAPID ключей будет выполнена при первом использовании

interface SendNotificationRequest {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
  requireInteraction?: boolean;
}

/**
 * POST /api/push/send
 * Отправляет push уведомление всем подписчикам
 * Требует аутентификации (проверка через ADMIN_SECRET_KEY)
 */
export async function POST(request: NextRequest) {
  try {
    // Проверка аутентификации
    const authHeader = request.headers.get('Authorization');
    const adminSecret = process.env.ADMIN_SECRET_KEY;

    if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const webpushInstance = getWebPush();
    
    if (!webpushInstance) {
      return NextResponse.json(
        { error: 'web-push library not installed. Install with: npm install web-push' },
        { status: 500 }
      );
    }

    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'VAPID keys not configured' },
        { status: 500 }
      );
    }

    // Инициализируем VAPID ключи при первом использовании
    try {
      webpushInstance.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    } catch (error) {
      // Игнорируем ошибки, если уже инициализировано
    }

    const notificationData: SendNotificationRequest = await request.json();

    if (!notificationData.title || !notificationData.body) {
      return NextResponse.json(
        { error: 'Title and body are required' },
        { status: 400 }
      );
    }

    // Подготавливаем payload для уведомления
    const payload = JSON.stringify({
      title: notificationData.title,
      body: notificationData.body,
      icon: notificationData.icon || '/favicon-192x192.png',
      badge: notificationData.badge || '/favicon-96x96.png',
      tag: notificationData.tag || 'veles-voyage-notification',
      requireInteraction: notificationData.requireInteraction || false,
      data: {
        url: notificationData.url || '/',
      },
    });

    // Отправляем уведомление всем подписчикам
    const results = await Promise.allSettled(
      Array.from(subscriptions.values()).map(async (subscription) => {
        try {
          const webpushInstance = getWebPush();
          if (!webpushInstance) {
            throw new Error('web-push not available');
          }
          await webpushInstance.sendNotification(
            subscription as Parameters<typeof webpushInstance.sendNotification>[0],
            payload
          );
          return { success: true, endpoint: subscription.endpoint };
        } catch (error) {
          // Если подписка невалидна, удаляем её
          if (error instanceof Error && 'statusCode' in error) {
            const statusCode = (error as { statusCode: number }).statusCode;
            if (statusCode === 410 || statusCode === 404) {
              if (subscription.endpoint) {
                subscriptions.delete(subscription.endpoint);
              }
            }
          }
          throw error;
        }
      })
    );

    const successful = results.filter(
      (r) => r.status === 'fulfilled'
    ).length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    safeLogger.info('Push notifications sent', {
      total: subscriptions.size,
      successful,
      failed,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Notifications sent',
        sent: successful,
        failed,
        total: subscriptions.size,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, 'Failed to send notifications');
  }
}

