import type { Hotel, Review } from '@/db/schema';

interface HotelJsonLdProps {
  hotel: Hotel;
  reviews: Review[];
}

export function HotelJsonLd({ hotel, reviews }: HotelJsonLdProps) {
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    description: hotel.description || undefined,
    image: (hotel.images as any)?.map((img: any) => img.large) || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotel.address || undefined,
      addressLocality: hotel.city || undefined,
      addressCountry: hotel.country || undefined,
    },
    ...(hotel.stars && {
      starRating: {
        '@type': 'Rating',
        ratingValue: hotel.stars,
      },
    }),
    ...(avgRating && reviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: reviews.length,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
