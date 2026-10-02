'use client';

import { useState, useEffect } from 'react';
import { getServicePhotoWithCache, getWeeklyServicePhoto, type ServicePhoto } from '@/shared/utils/servicePhotos';
import Image from 'next/image';

interface WeeklyServicePhotoProps {
  serviceType: 'tours' | 'cruises' | 'support';
  cruiseType?: 'mediterranean' | 'caribbean' | 'scandinavian' | 'asian' | 'alaska' | 'world';
  alt: string;
  className?: string;
}

export const WeeklyServicePhoto: React.FC<WeeklyServicePhotoProps> = ({
  serviceType,
  cruiseType,
  alt,
  className = '',
}) => {
  // Use synchronous local fallback so the image is available immediately on SSR and client
  const [photo, setPhoto] = useState<ServicePhoto>(() => getWeeklyServicePhoto(serviceType));
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setImageError(false);

    getServicePhotoWithCache(serviceType, cruiseType)
      .then((loaded) => {
        if (isMounted && loaded && loaded.url) {
          setPhoto(loaded);
        }
      })
      .catch((err) => {
        console.error(`Error loading ${serviceType} photo:`, err);
      });

    return () => {
      isMounted = false;
    };
  }, [serviceType, cruiseType]);

  const getGradientClass = () => {
    if (serviceType === 'cruises') return 'bg-gradient-to-r from-teal-500 to-blue-600';
    if (serviceType === 'tours') return 'bg-gradient-to-r from-emerald-500 to-teal-600';
    return 'bg-gradient-to-r from-purple-500 to-pink-600';
  };

  if (!photo?.url || imageError) {
    return (
      <div
        className={`relative w-full h-full ${getGradientClass()} ${className}`}
        style={{ minHeight: '100%', minWidth: '100%' }}
      />
    );
  }

  const isLocal = photo.url.startsWith('/');

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ minHeight: '100%', minWidth: '100%' }}
    >
      <Image
        src={photo.url}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={isLocal}
        onError={() => {
          console.error(`Failed to load image for ${serviceType}:`, photo.url);
          setImageError(true);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
