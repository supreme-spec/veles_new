'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getWeeklyPhoto, type WeeklyPhoto } from '@/shared/utils/weeklyPhoto';

interface WeeklyHeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const WeeklyHeroBackground: React.FC<WeeklyHeroBackgroundProps> = ({
  children,
  className = ''
}) => {
  const [photo, setPhoto] = useState<WeeklyPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const currentPhoto = getWeeklyPhoto();
      setPhoto(currentPhoto);
    } catch (err) {
      console.error('Error loading weekly photo from archive:', err);
      setError('Не удалось загрузить фоновое изображение');
    }
  }, []);

  return (
    <section
      className={`relative w-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center ${className}`}
      style={{ position: 'relative' }}
    >
      {photo && (
        <div className="absolute inset-0 z-0" style={{ position: 'absolute' }}>
          <Image
            src={photo.url}
            alt={photo.description}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
            onError={() => {
              console.error('Image failed to load:', photo.url);
              setError('Не удалось загрузить фоновое изображение');
            }}
          />
          <div className="absolute inset-0 bg-black/40" style={{ position: 'absolute' }} />
        </div>
      )}

      {(!photo || error) && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 to-purple-700" style={{ position: 'absolute' }} />
      )}

      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800" style={{ position: 'absolute' }}>
          <div className="text-gray-600 dark:text-gray-300">
            {photo ? 'Загружаем фото недели...' : 'Загрузка...'}
          </div>
        </div>
      )}

      {photo && !isLoading && (
        <div className="absolute bottom-4 left-4 right-4 z-20 text-white text-xs md:text-sm bg-black/50 backdrop-blur-sm rounded-lg p-2 md:p-3" style={{ position: 'absolute' }}>
          <p className="font-semibold">{photo.description}</p>
          <p className="opacity-90">
            📍 {photo.location} | 📷 {photo.photographer}
          </p>
        </div>
      )}

      {error && (
        <div className="absolute top-4 right-4 z-20" style={{ position: 'absolute' }}>
          <div className="bg-red-500 bg-opacity-90 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
            <div className="font-medium">⚠️ Ошибка загрузки</div>
            <div className="text-xs mt-1 opacity-90">{error}</div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full h-full flex items-center justify-center" style={{ position: 'relative' }}>
        {children}
      </div>
    </section>
  );
};
