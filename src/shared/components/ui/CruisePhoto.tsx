'use client';

import { useState, useEffect } from 'react';
import { fetchCruisePhoto, type CruisePhoto as CruisePhotoType } from '@/shared/utils/cruisePhoto';
import Image from 'next/image';

interface CruisePhotoProps {
  className?: string;
}

export const CruisePhotoDisplay: React.FC<CruisePhotoProps> = ({ 
  className = "" 
}) => {
  const [photo, setPhoto] = useState<CruisePhotoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCruisePhoto = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const cruisePhoto = await fetchCruisePhoto();
        setPhoto(cruisePhoto);
      } catch (err) {
        console.error('Error loading cruise photo:', err);
        setError('Не удалось загрузить фото круиза');
      } finally {
        setIsLoading(false);
      }
    };

    loadCruisePhoto();
  }, []);

  // Fallback while loading or on error
  if (isLoading || error || !photo) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 ${className}`}>
        <div className="text-white text-5xl">🚢</div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
        <Image
          src={photo.url}
          alt={photo.description}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
    </div>
  );
};