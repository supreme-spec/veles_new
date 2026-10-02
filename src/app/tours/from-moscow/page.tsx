import type { Metadata } from 'next';
import Link from 'next/link';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Туры из Москвы 2026: Турция, Египет, ОАЭ, Таиланд | Велес Вояж',
  description: 'Туры из Москвы в Турцию, Египет, ОАЭ, Таиланд и другие страны 2026. Вылет из Шереметьево, Домодедово, Внуково. Горящие туры, все включено. Подбор туров от Велес Вояж.',
  url: `${SITE_URL}/tours/from-moscow`,
  type: 'article',
  keywords: [
    'туры из Москвы',
    'туры из Москвы в Турцию',
    'туры из Москвы в Египет',
    'туры из Москвы в ОАЭ',
    'туры из Москвы в Таиланд',
    'горящие туры из Москвы',
    'вылет из Шереметьево'
  ],
  faqs: [
    {
      question: 'Какие туры из Москвы самые популярные?',
      answer: 'Самые популярные туры из Москвы: Турция (Анталья, Стамбул), Египет (Хургада, Шарм-эль-Шейх), ОАЭ (Дубай), Таиланд (Пхукет). Вылеты из Шереметьево, Домодедово, Внуково.'
    },
    {
      question: 'Сколько стоят туры из Москвы?',
      answer: 'Туры из Москвы на двоих на 7 ночей: Турция от 100 000 ₽, Египет от 120 000 ₽, ОАЭ от 150 000 ₽, Таиланд от 180 000 ₽. Цены зависят от сезона и отеля.'
    },
    {
      question: 'Какие аэропорты вылетов из Москвы?',
      answer: 'Вылеты из Москвы: Шереметьево (SVO), Домодедово (DME), Внуково (VKO). Рейсы Turkish Airlines, Аэрофлот, Pegasus, S7 и других авиакомпаний.'
    }
  ]
});

const fromMoscowTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Туры из Москвы 2026",
  "description": "Туры из Москвы в Турцию, Египет, ОАЭ, Таиланд и другие страны с вылетом из Шереметьево, Домодедово, Внуково.",
  "touristType": ["CulturalTourism", "AdventureTourism", "BeachTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "100000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

const fromMoscowFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие туры из Москвы самые популярные?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Самые популярные туры из Москвы: Турция (Анталья, Стамбул), Египет (Хургада, Шарм-эль-Шейх), ОАЭ (Дубай), Таиланд (Пхукет). Вылеты из Шереметьево, Домодедово, Внуково."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоят туры из Москвы?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Туры из Москвы на двоих на 7 ночей: Турция от 100 000 ₽, Египет от 120 000 ₽, ОАЭ от 150 000 ₽, Таиланд от 180 000 ₽. Цены зависят от сезона и отеля."
      }
    },
    {
      "@type": "Question",
      "name": "Какие аэропорты вылетов из Москвы?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Вылеты из Москвы: Шереметьево (SVO), Домодедово (DME), Внуково (VKO). Рейсы Turkish Airlines, Аэрофлот, Pegasus, S7 и других авиакомпаний."
      }
    }
  ]
};

export default function ToursFromMoscowPage() {
  const popularDestinations = [
    WORLD_DESTINATIONS_DATA['турция'],
    WORLD_DESTINATIONS_DATA['египет'],
    WORLD_DESTINATIONS_DATA['оаэ'],
    WORLD_DESTINATIONS_DATA['таиланд'],
    WORLD_DESTINATIONS_DATA['мальдивы'],
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <StructuredData schemas={[fromMoscowTouristTripSchema, fromMoscowFAQSchema]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Туры из Москвы 2026
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Вылеты из Шереметьево, Домодедово, Внуково. Горящие туры в Турцию, Египет, ОАЭ и другие страны.
        </p>
      </header>

      {/* Цитируемый ответ для голосового поиска */}
      <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          Самые популярные туры из Москвы: Турция от 100 000 ₽, Египет от 120 000 ₽, ОАЭ от 150 000 ₽. 
          Вылеты из Шереметьево, Домодедово, Внуково. Рекомендуем бронировать заранее для лучших цен.
        </p>
      </blockquote>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Популярные направления из Москвы
        </h2>
        <div className="space-y-6">
          {popularDestinations.map((country) => {
            const price = country.estimatedCost || '100 000';
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
          Аэропорты вылета из Москвы
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Шереметьево (SVO)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Международный аэропорт, рейсы Turkish Airlines, Аэрофлот, Emirates.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Домодедово (DME)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Крупный хаб, рейсы Pegasus, S7, EgyptAir.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Внуково (VKO)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Рейсы в Турцию, Египет, ОАЭ. Удобная парковка.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, какие туры из Москвы самые популярные?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Самые популярные туры из Москвы: Турция (Анталья, Стамбул), Египет (Хургада, Шарм-эль-Шейх), ОАЭ (Дубай), Таиланд (Пхукет). Вылеты из Шереметьево, Домодедово, Внуково.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, сколько стоят туры из Москвы?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Туры из Москвы на двоих на 7 ночей: Турция от 100 000 ₽, Египет от 120 000 ₽, ОАЭ от 150 000 ₽, Таиланд от 180 000 ₽. Цены зависят от сезона и отеля.
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
