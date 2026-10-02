import Link from 'next/link';
import Image from 'next/image';
import type { Hotel } from '@/db/schema';
import { slugify } from '@/lib/slugify';
import { formatPrice, getMealTypeLabel, formatCancellationDate } from '@/lib/price-helpers';

interface HotelCardProps {
  hotel: Hotel & {
    avgRating?: number;
    reviewCount?: number;
  };
}

export function HotelCard({ hotel }: HotelCardProps) {
  const mainImage = (hotel.images as any)?.[0];
  const countrySlug = slugify(hotel.country || '');
  const citySlug = slugify(hotel.city || '');
  const hotelSlug = slugify(hotel.name || '');
  const href = `/hotels/${countrySlug}/${citySlug}/${hotelSlug}`;

  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-[4/3] bg-gray-100">
          {mainImage?.medium ? (
            <Image
              src={mainImage.medium}
              alt={hotel.name}
              width={800}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Нет фото
            </div>
          )}
          {hotel.stars && (
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-semibold">
              {'⭐'.repeat(hotel.stars)}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{hotel.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {hotel.city}, {hotel.country}
          </p>
          {(hotel.minPrice != null || hotel.freeCancellationBefore || hotel.mealType) && (
            <div className="mt-3 space-y-1">
              {hotel.minPrice != null && (
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-slate-900">
                    {formatPrice(hotel.minPrice)}
                  </span>
                  {!hotel.taxesIncluded && (
                    <span className="text-xs text-orange-600">+налоги</span>
                  )}
                </div>
              )}
              {hotel.mealType && (
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <span>🍽️</span>
                  <span>{getMealTypeLabel(hotel.mealType)}</span>
                </div>
              )}
              {hotel.freeCancellationBefore && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <span>✓</span>
                  <span>Бесплатная отмена до {formatCancellationDate(hotel.freeCancellationBefore)}</span>
                </div>
              )}
            </div>
          )}
          {hotel.avgRating && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{Number(hotel.avgRating).toFixed(1)}</span>
              <span className="text-sm text-gray-500">
                ({hotel.reviewCount || 0} отзывов)
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
