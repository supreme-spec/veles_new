import type { OrganizationSchema } from '@/shared/types/schema';
import { SITE_URL, LOGO_URL, SOCIAL_LINKS } from '@/shared/constants/seo';

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Велес Вояж | Экспертная редакция',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+7-985-063-51-34',
      contactType: 'customer service',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@veles-voyage.ru',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Московская область, Одинцовский р-н, Голицыно, Керамиков пр-т, д. 103',
      addressLocality: 'Голицыно',
      postalCode: '143041',
      addressCountry: 'RU',
    },
    sameAs: [
      SOCIAL_LINKS.vk,
      SOCIAL_LINKS.telegram,
      SOCIAL_LINKS.rutube,
      SOCIAL_LINKS.max,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.googleBusiness,
      SOCIAL_LINKS.gis2,
    ],
    priceRange: '₽₽',
    areaServed: { '@type': 'Country', name: 'Russia' },
  };
}

