'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  cleanlinessRating?: number | null;
  locationRating?: number | null;
  staffRating?: number | null;
  comfortRating?: number | null;
  valueRating?: number | null;
  facilitiesRating?: number | null;
  wifiRating?: number | null;
  title?: string | null;
  content: string;
  photos?: string[];
  verified: boolean;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const StarRating = ({ value, max = 5 }: { value: number; max?: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} className={`text-sm ${i < value ? 'text-amber-500' : 'text-gray-300'}`}>
        ★
      </span>
    ))}
  </div>
);

const categoryLabels: Record<string, string> = {
  cleanlinessRating: 'Чистота',
  locationRating: 'Расположение',
  staffRating: 'Персонал',
  comfortRating: 'Комфорт',
  valueRating: 'Цена/качество',
  facilitiesRating: 'Удобства',
  wifiRating: 'Wi-Fi',
};

export const ReviewList = ({ reviews, averageRating, totalReviews }: ReviewListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
        <p className="text-slate-500">Отзывов пока нет. Будьте первым, кто оставит отзыв!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-900 text-white font-black px-4 py-3 rounded-xl text-2xl shadow-sm">
            {averageRating.toFixed(1)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <StarRating value={Math.round(averageRating)} />
              <span className="font-bold text-slate-900">{totalReviews} отзывов</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Средняя оценка на основе проверенных отзывов</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => {
          const isExpanded = expandedId === review.id;
          const shouldTruncate = review.content.length > 300;

          return (
            <div key={review.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                      {review.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{review.authorName}</p>
                      <div className="flex items-center gap-2">
                        <StarRating value={review.rating} />
                        {review.verified && (
                          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                            ✓ Подтвержденное проживание
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {review.title && <h4 className="font-semibold text-slate-900 mb-2">{review.title}</h4>}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {Object.entries(categoryLabels).map(([key, label]) => {
                      const value = review[key as keyof Review] as number | undefined;
                      if (!value) return null;
                      return (
                        <div key={key} className="bg-slate-50 rounded-lg p-2">
                          <p className="text-xs text-slate-500 mb-1">{label}</p>
                          <StarRating value={value} />
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <p className={`text-slate-700 whitespace-pre-line ${!isExpanded && shouldTruncate ? 'line-clamp-3' : ''}`}>
                      {review.content}
                    </p>
                    {shouldTruncate && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : review.id)}
                        className="text-blue-900 text-sm font-bold mt-2 hover:underline"
                      >
                        {isExpanded ? 'Свернуть' : 'Читать полностью'}
                      </button>
                    )}
                  </div>

                  {review.photos && review.photos.length > 0 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                      {review.photos.map((photo, idx) => (
                        <div key={idx} className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={photo}
                            alt={`Фото отзыва ${idx + 1}`}
                            fill
                            sizes="96px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-slate-400 mt-4">
                    {new Date(review.createdAt).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
