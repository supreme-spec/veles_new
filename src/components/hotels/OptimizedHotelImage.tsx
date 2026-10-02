import Image from 'next/image';
import { useState } from 'react';

interface OptimizedHotelImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  onError?: () => void;
}

export function OptimizedHotelImage({ src, alt, priority, className, onError }: OptimizedHotelImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative bg-slate-100 overflow-hidden ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={onError}
        priority={priority ?? false}
        unoptimized={src.includes('unsplash.com')}
      />
    </div>
  );
}
