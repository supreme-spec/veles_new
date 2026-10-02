'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HotelImage {
  thumb: string;
  medium: string;
  large: string;
  blurHash?: string;
}

interface HotelGalleryProps {
  images: HotelImage[];
  hotelName: string;
}

export function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">Нет фото</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex]!;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={selectedImage.large}
          alt={`${hotelName} - фото ${selectedIndex + 1}`}
          width={1200}
          height={900}
          className="w-full h-full object-cover"
          priority={selectedIndex === 0}
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden ${
                selectedIndex === index ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Image
                src={image.thumb}
                alt={`${hotelName} - миниатюра ${index + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
