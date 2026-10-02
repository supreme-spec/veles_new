import React from 'react';

const reviews = [
  {
    author: 'Анна Петрова',
    datePublished: '2026-08-13',
    reviewBody: 'Потрясающий круиз! Отличная организация, комфортные каюты, незабываемые экскурсии.',
    reviewRating: 5,
  },
  {
    author: 'Дмитрий Козлов',
    datePublished: '2026-07-22',
    reviewBody: 'Тур в Турцию превзошёл ожидания. Всё было организовано на высшем уровне.',
    reviewRating: 5,
  },
  {
    author: 'Елена Смирнова',
    datePublished: '2026-06-10',
    reviewBody: 'Спасибо за помощь с визой и подбором отеля. Очень профессиональная команда.',
    reviewRating: 5,
  },
  {
    author: 'Алексей Морозов',
    datePublished: '2026-05-04',
    reviewBody: 'Круиз по Средиземному морю — мечта сбылась. Рекомендую Велес Вояж.',
    reviewRating: 5,
  },
  {
    author: 'Ольга Новикова',
    datePublished: '2026-04-18',
    reviewBody: 'Бронирование прошло быстро, поддержка 24/7 во время поездки. Спасибо!',
    reviewRating: 5,
  },
];

export const SiteReviewSchema: React.FC = () => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Велес Вояж",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.reviewRating.toString(),
        "bestRating": "5"
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema, null, 2) }}
    />
  );
};
