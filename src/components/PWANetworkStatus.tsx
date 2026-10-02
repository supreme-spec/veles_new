'use client';

import { useState, useEffect } from 'react';
import { WifiIcon, SignalSlashIcon } from '@heroicons/react/24/outline';

export function PWANetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Проверяем начальное состояние
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setWasOffline(true);
      setShowNotification(true);

      // Скрываем уведомление через 3 секунды
      setTimeout(() => {
        setShowNotification(false);
        setWasOffline(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showNotification && isOnline) {
    return null;
  }

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        showNotification
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm ${
          isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {isOnline ? (
          <>
            <WifiIcon className="w-5 h-5" />
            <span className="text-sm font-medium">
              {wasOffline ? 'Соединение восстановлено' : 'Онлайн'}
            </span>
          </>
        ) : (
          <>
            <SignalSlashIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Нет подключения к интернету</span>
          </>
        )}
      </div>
    </div>
  );
}
