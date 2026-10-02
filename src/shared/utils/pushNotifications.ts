/**
 * Утилиты для работы с Push уведомлениями
 */

/**
 * Проверяет, поддерживаются ли Push уведомления в браузере
 */
export function isPushNotificationSupported(): boolean {
  return (
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

/**
 * Проверяет, разрешены ли уведомления
 */
export async function checkNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

/**
 * Запрашивает разрешение на уведомления
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    throw new Error('Notifications are not supported in this browser');
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    throw new Error('Notification permission was previously denied');
  }

  const permission = await Notification.requestPermission();
  return permission;
}

/**
 * Конвертирует VAPID public key в формат для Web Push API
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Подписывается на Push уведомления
 */
export async function subscribeToPushNotifications(
  vapidPublicKey: string
): Promise<PushSubscription | null> {
  if (!isPushNotificationSupported()) {
    throw new Error('Push notifications are not supported');
  }

  // Проверяем разрешение
  const permission = await checkNotificationPermission();
  if (permission !== 'granted') {
    const newPermission = await requestNotificationPermission();
    if (newPermission !== 'granted') {
      throw new Error('Notification permission denied');
    }
  }

  // Получаем регистрацию Service Worker
  const registration = await navigator.serviceWorker.ready;

  // Подписываемся на push
  const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey as BufferSource,
  });

  return subscription;
}

/**
 * Отписывается от Push уведомлений
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  if (!isPushNotificationSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      return true;
    }

    return false;
  } catch (error) {
    console.error('[Push] Error unsubscribing:', error);
    return false;
  }
}

/**
 * Проверяет, подписан ли пользователь на Push уведомления
 */
export async function isSubscribedToPushNotifications(): Promise<boolean> {
  if (!isPushNotificationSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  } catch (error) {
    console.error('[Push] Error checking subscription:', error);
    return false;
  }
}

/**
 * Получает текущую подписку на Push уведомления
 */
export async function getPushSubscription(): Promise<PushSubscription | null> {
  if (!isPushNotificationSupported()) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.error('[Push] Error getting subscription:', error);
    return null;
  }
}

/**
 * Отправляет подписку на сервер
 */
export async function sendSubscriptionToServer(
  subscription: PushSubscription
): Promise<boolean> {
  try {
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    return response.ok;
  } catch (error) {
    console.error('[Push] Error sending subscription to server:', error);
    return false;
  }
}

/**
 * Удаляет подписку с сервера
 */
export async function removeSubscriptionFromServer(): Promise<boolean> {
  try {
    const subscription = await getPushSubscription();
    if (!subscription) {
      return true; // Уже не подписан
    }

    const response = await fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('[Push] Error removing subscription from server:', error);
    return false;
  }
}

