import type { Review } from '@/shared/types/schema';

export interface ReviewItem {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue?: string;
}

export function generateReviewSchema(reviews: ReviewItem[]): { '@context': string; '@type': string; name: string; aggregateRating: { '@type': string; ratingValue: string; reviewCount: string }; review: Review[] } {
  const reviewCount = reviews.length;
  const avgRating = reviews.reduce((sum, r) => sum + (parseFloat(r.ratingValue || '5')), 0) / reviewCount || 5;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Путеводитель от Велес Вояж',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviewCount.toString(),
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      datePublished: r.datePublished,
      reviewBody: r.reviewBody,
      ...(r.ratingValue && {
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.ratingValue,
        },
      }),
    })),
  };
}

