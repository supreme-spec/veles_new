import Image from 'next/image';
import React from 'react';

interface SEOImageProps {
  src: string;
  alt: string;
  title?: string;
  countryName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export const SEOImage: React.FC<SEOImageProps> = ({
  src,
  alt,
  title,
  countryName,
  width = 800,
  height = 600,
  priority = false,
  className = ''
}) => {
  // Generate SEO-optimized alt text
  const optimizedAlt = countryName 
    ? `${alt} - ${countryName} путеводитель | Велес Вояж`
    : `${alt} | Велес Вояж`;

  // Generate title for better accessibility
  const optimizedTitle = title || optimizedAlt;

  return (
    <>
      <Image
        src={src}
        alt={optimizedAlt}
        title={optimizedTitle}
        width={width}
        height={height}
        priority={priority}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Image schema for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": src,
            "caption": optimizedAlt,
            "description": optimizedTitle,
            "width": width,
            "height": height,
            "encodingFormat": "image/jpeg",
            "author": {
              "@type": "Organization",
              "name": "Велес Вояж"
            },
            "copyrightHolder": {
              "@type": "Organization", 
              "name": "Велес Вояж"
            }
          })
        }}
      />
    </>
  );
};