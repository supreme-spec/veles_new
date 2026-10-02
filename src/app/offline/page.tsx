'use client';

import Link from 'next/link';
import { 
  SignalSlashIcon, 
  ArrowPathIcon,
  HomeIcon 
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      // Перенаправляем на главную при восстановлении соединения
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <SignalSlashIcon className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Нет подключения к интернету
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Похоже, вы не подключены к интернету. Проверьте подключение и попробуйте снова.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Обновить страницу
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            На главную
          </Link>
        </div>

        {isOnline && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              ✓ Соединение восстановлено! Перенаправляем...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

