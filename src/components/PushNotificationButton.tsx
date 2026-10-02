'use client';

import { useState, useEffect } from 'react';
import {
  isPushNotificationSupported,
  isSubscribedToPushNotifications,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  sendSubscriptionToServer,
  removeSubscriptionFromServer,
  checkNotificationPermission,
} from '@/shared/utils/pushNotifications';

export function PushNotificationButton() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSupport = async () => {
      const supported = isPushNotificationSupported();
      setIsSupported(supported);

      if (supported) {
        const currentPermission = await checkNotificationPermission();
        setPermission(currentPermission);

        const subscribed = await isSubscribedToPushNotifications();
        setIsSubscribed(subscribed);
      }

      setIsLoading(false);
    };

    checkSupport();
  }, []);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Получаем VAPID public key с сервера
      const response = await fetch('/api/push/vapid-public-key');
      if (!response.ok) {
        throw new Error('Failed to get VAPID public key');
      }

      const { publicKey } = await response.json();
      if (!publicKey) {
        throw new Error('VAPID public key not found');
      }

      // Подписываемся на push уведомления
      const subscription = await subscribeToPushNotifications(publicKey);

      if (subscription) {
        // Отправляем подписку на сервер
        const success = await sendSubscriptionToServer(subscription);
        if (success) {
          setIsSubscribed(true);
          setPermission('granted');
        } else {
          throw new Error('Failed to save subscription on server');
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('[PushNotificationButton] Subscribe error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Удаляем подписку с сервера
      await removeSubscriptionFromServer();

      // Отписываемся от push уведомлений
      const success = await unsubscribeFromPushNotifications();
      if (success) {
        setIsSubscribed(false);
      } else {
        throw new Error('Failed to unsubscribe');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('[PushNotificationButton] Unsubscribe error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
      >
        Загрузка...
      </button>
    );
  }

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-500">
        Push уведомления не поддерживаются в вашем браузере
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div className="text-sm text-red-500">
        Разрешение на уведомления было отклонено. Разрешите уведомления в
        настройках браузера.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <div className="p-2 bg-red-50 border border-red-200 text-red-800 rounded text-sm">
          {error}
        </div>
      )}

      {isSubscribed ? (
        <button
          onClick={handleUnsubscribe}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Отписка...' : 'Отписаться от уведомлений'}
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Подписка...' : '🔔 Подписаться на уведомления'}
        </button>
      )}

      <p className="text-xs text-gray-500">
        {isSubscribed
          ? 'Вы подписаны на push уведомления'
          : 'Получайте уведомления о новых турах и акциях'}
      </p>
    </div>
  );
}

