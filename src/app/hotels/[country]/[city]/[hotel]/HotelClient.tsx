'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BookingForm } from '@/components/BookingForm';
import { CertificationTestCases } from '@/components/CertificationTestCases';
import { ReviewList } from '@/components/ReviewList';
import { ReviewForm } from '@/components/ReviewForm';

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  stars: number;
  description: string;
  amenities: string[];
  images?: any[];
  ostrovokHid?: number;
  cancellationPolicies?: any;
  roomsData?: any;
}

interface Review {
  id: string;
  authorName: string;
  rating: number;
  content: string;
  createdAt: string;
  verified: boolean;
}

interface HotelClientProps {
  slug: string;
  city: string;
  country: string;
}

export default function HotelClient({ slug, city, country }: HotelClientProps) {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHotel() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/hotels/${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (data.hotel) {
          setHotel(data.hotel);
          await loadReviews(data.hotel.ostrovokHid || Number(data.hotel.id));
        } else {
          setError('Отель не найден');
        }
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    }

    loadHotel();
  }, [slug]);

  const loadReviews = async (hotelHid: number) => {
    try {
      const res = await fetch(`/api/reviews?hotelHid=${hotelHid}`);
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
        setAverageRating(data.aggregate?.averageRating || 0);
        setReviewsCount(data.aggregate?.totalReviews || 0);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const handleReviewSubmitted = () => {
    if (hotel) {
      loadReviews(hotel.ostrovokHid || Number(hotel.id));
    }
  };

  const cityName = city.replace(/-/g, ' ');
  const countryName = country.replace(/-/g, ' ');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900" />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-lg">{error || 'Отель не найден'}</p>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: hotel.city,
      addressCountry: hotel.country,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating || 4.5,
      reviewCount: reviewsCount || 0,
      bestRating: 5,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs text-slate-400 flex gap-2 mb-4">
        <span>Главная</span>
        <span>/</span>
        <span>Отели</span>
        <span>/</span>
        <span>{countryName}</span>
        <span>/</span>
        <span>{cityName}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">{hotel.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotel.images?.slice(0, 4).map((img, idx) => (
              <div key={idx} className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-100">
                <Image src={img.medium || img.small || img.url} alt={`${hotel.name} ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Об отеле</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {hotel.description || `${hotel.name} расположен в городе ${hotel.city}, ${hotel.country}. Отель предлагает комфортабельные номера, высокий уровень сервиса и удобное расположение.`}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Удобства</h2>
            <div className="flex flex-wrap gap-2">
              {(hotel.amenities?.length ? hotel.amenities : ['Wi-Fi', 'Парковка', 'Бассейн']).map((amenity) => (
                <span key={amenity} className="bg-slate-50 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Отзывы гостей</h2>
            <ReviewList
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={reviewsCount}
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Оставить отзыв</h2>
            <ReviewForm
              hotelHid={hotel.ostrovokHid || Number(hotel.id)}
              onReviewSubmitted={handleReviewSubmitted}
            />
          </div>
        </div>

        <div className="w-full lg:w-96 space-y-6">
          <BookingForm 
            hotelHid={hotel.ostrovokHid || Number(hotel.id)} 
            hotelName={hotel.name}
            cancellationPolicies={hotel.cancellationPolicies}
            taxes={hotel.roomsData?.taxes || []}
          />
          <CertificationTestCases 
            hotelHid={hotel.ostrovokHid || Number(hotel.id)} 
            hotelName={hotel.name}
          />
        </div>
      </div>
    </>
  );
}
