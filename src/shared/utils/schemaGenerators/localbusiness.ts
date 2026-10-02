import { SITE_URL } from '@/shared/constants/seo';

export function generateLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Велес Вояж',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'пр-т. Керамиков, 103',
      addressLocality: 'Голицыно',
      postalCode: '143041',
      addressCountry: 'RU',
    },
    telephone: '+79850635134',
    email: 'hello@veles-voyage.ru',
    url: SITE_URL,
    image: `${SITE_URL}/images/logo.png`,
    priceRange: '₽₽',
    hasMap: 'https://yandex.ru/maps/-/CDqf4U2B',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
  };
}

