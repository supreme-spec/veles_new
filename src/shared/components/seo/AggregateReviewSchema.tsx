'use client';

interface AggregateReviewSchemaProps {
  ratingValue: number;
  reviewCount: number;
  itemName: string;
  itemType?: 'TravelAgency' | 'LocalBusiness' | 'Product' | 'Service';
}

export function AggregateReviewSchema({
  ratingValue,
  reviewCount,
  itemName,
  itemType = 'TravelAgency',
}: AggregateReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': itemType,
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
