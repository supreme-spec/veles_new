'use client';

import { useState, useEffect } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

interface PWAShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

export function PWAShareButton({ 
  title = 'Велес Вояж',
  text = 'Откройте мир с Велес Вояж',
  url 
}: PWAShareButtonProps) {
  const pathname = usePathname();
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Проверяем поддержку Web Share API
    setIsSupported(
      typeof navigator !== 'undefined' && 
      'share' in navigator
    );
  }, []);

  const handleShare = async () => {
    if (!isSupported) {
      // Fallback: копируем ссылку в буфер обмена
      const shareUrl = url || `${window.location.origin}${pathname}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Ссылка скопирована в буфер обмена!');
      } catch (err) {
        console.error('Ошибка копирования:', err);
      }
      return;
    }

    try {
      const shareData = {
        title,
        text,
        url: url || `${window.location.origin}${pathname}`,
      };

      await navigator.share(shareData);
    } catch (err) {
      // Пользователь отменил шаринг или произошла ошибка
      if ((err as Error).name !== 'AbortError') {
        console.error('Ошибка шаринга:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
      title="Поделиться"
      aria-label="Поделиться страницей"
    >
      <ShareIcon className="w-6 h-6" />
    </button>
  );
}

