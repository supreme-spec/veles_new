'use client';

import Image from 'next/image';

interface DestinationImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function DestinationImage({
  src,
  alt,
  className = '',
  priority = false,
}: DestinationImageProps) {
  if (!src) {
    return (
      <div className="relative w-full aspect-[3/2] bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-sm">Нет изображения</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg" style={{ position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover ${className}`}
        priority={priority}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}