import type { Metadata } from 'next';
import Link from 'next/link';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Туры из Екатеринбурга 2026: Турция, Египет, ОАЭ, Таиланд | Велес Вояж',
  description: 'Туры из Екатеринбурга в Турцию, Египет, ОАЭ, Таиланд и другие страны 2026. Вылет из Кольцово. Горящие туры, все включено. Подбор туров от Велес Вояж.',
  url: `${SITE_URL}/tours/from-ekaterinburg`,
  type: 'article',
  keywords: [
    'туры из Екатеринбурга',
    'туры из Екатеринбурга в Турцию',
    'туры из Екатеринбурга в Египет',
    'туры из Екатеринбурга в ОАЭ',
    'туры из Екатеринбурга в Таиланд',
    'горящие туры из Екатеринбурга',
    'вылет из Кольцово'
  ],
  faqs: [
    {
      question: 'Какие туры из Екатеринбурга самые популярные?',
      answer: 'Самые популярные туры из Екатеринбурга: Турция (Анталья, Стамбул), Египет (Хургада, Шарм-эль-Шейх), ОАЭ (Дубай), Таиланд (Пхукет). Вылеты из аэропорта Кольцово.'
    },
    {
      question: 'Сколько стоят туры из Екатеринбурга?',
      answer: 'Туры из Екатеринбурга на двоих на 7 ночей: Турция от 115 000 ₽, Египет от 135 000 ₽, ОАЭ от 165 000 ₽, Таиланд от 195 000 ₽. Цены зависят от сезона и отеля.'
    },
    {
      question: 'Какой аэропорт вылета из Екатеринбурга?',
      answer: 'Вылеты из Екатеринбурга: аэропорт Кольцово (SVX). Рейсы Turkish Airlines, Аэрофлот, Ural Airlines, Nordwind в Турцию, Египет, ОАЭ, Таиланд.'
    }
  ]
});

const fromEkaterinburgTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Туры из Екатеринбурга 2026",
  "description": "Туры из Екатеринбурга в Турцию, Египет, ОАЭ, Таиланд и другие страны с вылетом из аэропорта Кольцово.",
  "touristType": ["CulturalTourism", "AdventureTourism", "BeachTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "115000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

const fromEkaterinburgFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие туры из Екатеринбурга самые популярные?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Самые популярные туры из Екатеринбурга: Турция (Анталья, Стамбул), Египет (Хургада, Шарм-эль-Шейх), ОАЭ (Дубай), Таиланд (Пхукет). Вылеты из аэропорта Кольцово."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоят туры из Екатеринбурга?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Туры из Екатеринбурга на двоих на 7 ночей: Турция от 115 000 ₽, Египет от 135 000 ₽, ОАЭ от 165 000 ₽, Таиланд от 195 000 ₽. Цены зависят от сезона и отеля."
      }
    },
    {
      "@type": "Question",
      "name": "Какой аэропорт вылета из Екатеринбурга?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Вылеты из Екатеринбурга: аэропорт Кольцово (SVX). Рейсы Turkish Airlines, Аэрофлот, Ural Airlines, Nordwind в Турцию, Египет, ОАЭ, Таиланд."
      }
    }
  ]
};

export default function ToursFromEkaterinburgPage() {
  const popularDestinations = [
    WORLD_DESTINATIONS_DATA['турция'],
    WORLD_DESTINATIONS_DATA['египет'],
    WORLD_DESTINATIONS_DATA['оаэ'],
    WORLD_DESTINATIONS_DATA['таиланд'],
    WORLD_DESTINATIONS_DATA['мальдивы'],
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <StructuredData schemas={[fromEkaterinburgTouristTripSchema, fromEkaterinburgFAQSchema]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Туры из Екатеринбурга 2026
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Вылеты из аэропорта Кольцово. Горящие туры в Турцию, Египет, ОАЭ и другие страны.
        </p>
      </header>

      {/* Цитируемый ответ для голосового поиска */}
      <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          Самые популярные туры из Екатеринбурга: Турция от 115 000 ₽, Египет от 135 000 ₽, ОАЭ от 165 000 ₽. 
          Вылеты из аэропорта Кольцово. Рекомендуем бронировать заранее для лучших цен.
        </p>
      </blockquote>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Популярные направления из Екатеринбурга
        </h2>
        <div className="space-y-6">
          {popularDestinations.map((country) => {
            const price = country.estimatedCost || '115 000';
            const flightTime = country.flightTimeFromMoscow || '4-5 часов';
            
            return (
              <Link
                key={country.slug}
                href={`/wiki/${country.slug}`}
                className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                    {country.name}
                  </h3>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    от {price} ₽
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {country.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    Полет: {flightTime}
                  </span>
                  <span className="ml-2">
                    {country.visaRequired === false ? 'Без визы' : 'Виза требуется'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Аэропорт вылета из Екатеринбурга
        </h2>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Кольцово (SVX)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Международный аэропорт Екатеринбурга. Рейсы Turkish Airlines, Аэрофлот, Ural Airlines, Nordwind в Турцию, Египет, ОАЭ, Таиланд.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, какие туры из Екатеринбурга самые популярные?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Самые популярные туры из Екатеринбурга: Турция (Анталья, Стамбул), Египет (Хургада, Шарм-эль-Шейх), ОАЭ (Дубай), Таиланд (Пхукет). Вылеты из аэропорта Кольцово.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, сколько стоят туры из Екатеринбурга?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Туры из Екатеринбурга на двоих на 7 ночей: Турция от 115 000 ₽, Египет от 135 000 ₽, ОАЭ от 165 000 ₽, Таиланд от 195 000 ₽. Цены зависят от сезона и отеля.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <Link
          href="/wiki"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Смотреть все страны →
        </Link>
      </section>
    </div>
  );
}
