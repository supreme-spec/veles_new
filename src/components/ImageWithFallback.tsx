'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  fallbackSrc = '/images/fallback.jpg',
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.warn(`ImageWithFallback: failed to load image, fallback to ${fallbackSrc}`, src);
    setIsLoading(false);
    setHasError(true);
    setImgSrc(fallbackSrc);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height, position: 'relative' }}>
      <Image
        key={imgSrc}
        src={imgSrc}
        alt={alt}
        fill
        className={`object-cover transition-all duration-500 ${
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        } ${hasError ? 'grayscale' : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        referrerPolicy="no-referrer"
        unoptimized={imgSrc.startsWith('/images/fallback')}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
    </div>
  );
}
