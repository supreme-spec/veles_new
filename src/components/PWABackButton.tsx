'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { usePWADetection } from '@/hooks/usePWADetection';
import { useState, useEffect } from 'react';

export function PWABackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { isPWA } = usePWADetection();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли история для навигации назад
    if (typeof window !== 'undefined') {
      // В PWA режиме всегда показываем кнопку
      // В обычном режиме показываем только если не на главной странице
      const isNotHomePage = pathname !== '/';
      setCanGoBack(isNotHomePage || isPWA);
    }
  }, [pathname, isPWA]);

  const handleBack = () => {
    // Если на главной странице, ничего не делаем
    if (pathname === '/') {
      return;
    }

    // Пытаемся вернуться назад
    if (window.history.length > 1) {
      router.back();
    } else {
      // Если нет истории, переходим на главную
      router.push('/');
    }
  };

  // Показываем кнопку только если можем вернуться назад
  if (!canGoBack) {
    return null;
  }

  return (
    <button
      onClick={handleBack}
      className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
      title="Назад"
      aria-label="Вернуться назад"
    >
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
}
