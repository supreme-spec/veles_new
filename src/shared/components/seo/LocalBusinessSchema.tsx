import React from 'react';
import { SITE_URL, CONTACT_PHONE, CONTACT_EMAIL, ADDRESS } from '@/shared/constants/seo';

interface Office {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
}

const offices: Office[] = [
  {
    name: 'Офис в Голицыно',
    address: {
      streetAddress: ADDRESS.streetAddress,
      addressLocality: ADDRESS.addressLocality,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.addressCountry,
    },
    geo: {
      latitude: 55.609955,
      longitude: 36.965818,
    },
  },
  {
    name: 'Офис в Пушкино',
    address: {
      streetAddress: 'пр-т Московский, 9/2',
      addressLocality: 'Пушкино',
      postalCode: '141207',
      addressCountry: 'RU',
    },
    geo: {
      latitude: 55.7013,
      longitude: 37.8596,
    },
  },
];

interface LocalBusinessSchemaProps {
  includeBusiness?: boolean;
}

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  includeBusiness = true,
}) => {
  if (!includeBusiness) return null;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#business`,
    "name": "Велес Вояж",
    "url": SITE_URL,
    "description": "Туристическое агентство и энциклопедия путешествий с поддержкой Web3 технологий",
    "telephone": CONTACT_PHONE,
    "email": CONTACT_EMAIL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ADDRESS.streetAddress,
      "addressLocality": ADDRESS.addressLocality,
      "addressRegion": "Московская область",
      "postalCode": ADDRESS.postalCode,
      "addressCountry": ADDRESS.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 55.609955,
      "longitude": 36.965818
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      "https://vk.com/veles__voyage",
      "https://t.me/veles_voyage",
      "https://rutube.ru/u/velesvoyage/",
      "https://www.instagram.com/radun.veles/",
      "https://share.google/TBbHMZqo9vhqFPcPv",
      "https://yandex.ru/maps/org/veles_voyazh/129552746144/",
      "https://2gis.ru/pushkino/firm/70000001112858240"
    ],
    "location": offices.map((office) => ({
      "@type": "Place",
      "name": office.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": office.address.streetAddress,
        "addressLocality": office.address.addressLocality,
        "postalCode": office.address.postalCode,
        "addressCountry": office.address.addressCountry,
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": office.geo.latitude,
        "longitude": office.geo.longitude,
      },
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1242",
      "bestRating": "5",
      "worstRating": "1"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 55.7558,
        "longitude": 37.6176
      },
      "geoRadius": "10000000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Туристические услуги",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "TouristTrip",
            "name": "Путеводители по странам мира"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Консультации по путешествиям"
          }
        }
      ]
    },
    "additionalType": [
      "https://schema.org/OnlineBusiness",
      "https://schema.org/WebApplication"
    ],
    "knowsAbout": [
      "Путешествия",
      "Туризм",
      "Страны мира",
      "Визы",
      "Web3 технологии",
      "Блокчейн путешествия"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema, null, 2) }}
    />
  );
};
