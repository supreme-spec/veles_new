'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function HeroImage({ src, alt, className = '' }: HeroImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`w-full h-64 md:h-80 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center ${className}`}>
        <span className="text-white text-2xl font-bold drop-shadow-lg">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      className={`w-full h-64 md:h-80 object-cover rounded-2xl ${className}`}
      onError={() => setError(true)}
    />
  );
}
