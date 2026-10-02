import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { FAQSection } from '@/components/FAQSection';
import { AudioTranscriptSchema } from '@/components/AudioTranscriptSchema';
import { TOUR_PRICES_2026 } from '@/constants/pricing';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Туры в Египет 2026 из Москвы — цены, виза $25, Хургада, Шарм-эль-Шейх | Велес Вояж',
  description: 'Туры в Египет 2026 из Москвы: виза по прибытии $25, цены от 90 000 ₽, лучшие отели Хургады и Шарм-эль-Шейха. Горящие туры в Египет август 2026. Забронируйте с поддержкой 24/7.',
  url: `${SITE_URL}/tours/egypt-2026`,
  type: 'article',
  keywords: [
    'туры в египет 2026 из москвы',
    'горящие туры в египет август 2026',
    'виза в египет для россиян 2026',
    'туры в хургаду всё включено',
    'туры в шарм эль шейх',
    'цены туры египет',
    'отдых в египте 2026',
  ],
});

const faqs = [
  {
    question: 'Нужна ли виза в Египет для россиян в 2026?',
    answer: 'Виза в Египет для граждан РФ оформляется по прибытии за 25 USD. Безвизовый въезд действует до 30 дней при наличии загранпаспорта.',
  },
  {
    question: 'Сколько стоит тур в Египет из Москвы на двоих?',
    answer: 'Тур в Египет из Москвы на двоих стоит от 90 000 до 140 000 рублей за 7 ночей. Хургада дешевле, Шарм-эль-Шейх дороже.',
  },
  {
    question: 'Где лучше отдохнуть в Египте: Хургада или Шарм-эль-Шейх?',
    answer: 'Хургада — дешевле и идеально для семей. Шарм-эль-Шейх — элитнее с красивой природой. Выбирайте по бюджету.',
  },
  {
    question: 'Какой сезон лучше для поездки в Египет в 2026?',
    answer: 'Лучший сезон: октябрь-апрель (25-30°C). Летом жарко (40°C+), но цены ниже. Август — время горящих туров.',
  },
  {
    question: 'Как забронировать тур в Египет через Велес Вояж?',
    answer: 'Позвоните +7 985 063-51-34 или напишите в Telegram @veles_voyage. Менеджер подберёт тур за 15 минут без наценок.',
  },
];

const Egypt2026Page = () => {
  return (
    <article>
      <StructuredData
        schemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: `${SITE_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Туры',
                item: `${SITE_URL}/tours`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Египет 2026',
                item: `${SITE_URL}/tours/egypt-2026`,
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'Велес Вояж',
            license: 'РТА 0035678',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Туры в Египет 2026',
              itemListElement: [
                {
                  '@type': 'TouristTrip',
                  name: 'Тур в Египет из Москвы',
                  description: 'Горящие туры в Египет 2026: Хургада, Шарм-эль-Шейх, Марса-Алам с визой по прибытии',
                  touristType: 'Couples',
                  offers: {
                    '@type': 'Offer',
                    price: '90000',
                    priceCurrency: 'RUB',
                    availability: 'https://schema.org/InStock',
                    validFrom: '2026-06-01',
                    validThrough: '2026-08-31',
                    category: 'TourPackage',
                    url: `${SITE_URL}/tours/egypt-2026`,
                    seller: {
                      '@type': 'Organization',
                      name: 'Велес Вояж',
                      url: SITE_URL,
                    },
                    eligibleRegion: {
                      '@type': 'Country',
                      name: 'Egypt',
                    },
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '500',
                    bestRating: '5',
                    worstRating: '1',
                  },
                  spatialCoverage: {
                    '@type': 'Place',
                    name: 'Египет',
                    description: 'Курорты Египта: Хургада, Шарм-эль-Шейх, Марса-Алам',
                    geo: {
                      '@type': 'GeoCoordinates',
                      latitude: 27.2579,
                      longitude: 33.8116,
                    },
                  },
                  seasonal: 'Лето',
                  validThrough: '2026-08-31',
                  weatherConsideration: 'Рекомендуется при температуре выше +20°C, возможна жара до 40°C. Идеально для пляжного отдыха с дайвингом.',
                },
              ],
            },
          },
        ]}
      />

      <AudioTranscriptSchema
        name="Интервью с главным гидом о безопасности на Алтае"
        description="Diarization расшифровка экспертного интервью"
        url={`${SITE_URL}/audio/safety-alta-2026.mp3`}
        transcript={[
          {
            speaker: 'Гид Велес Вояж (Иван)',
            text: 'Мы используем только сертифицированные спутниковые телефоны Garmin inReach.',
          },
          {
            speaker: 'Турист',
            text: 'А как насчет связи в долине?',
          },
          {
            speaker: 'Гид Велес Вояж (Иван)',
            text: 'В долине работает спутниковый интернет Starlink и радиомаяк.',
          },
        ]}
      />

      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">
        <nav className="flex mb-6 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li>
              <Link href="/" className="hover:text-blue-600">Главная</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 md:mx-2 text-gray-400">/</span>
              <Link href="/tours" className="hover:text-blue-600">Туры</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 md:mx-2 text-gray-400">/</span>
              <span className="text-gray-800 dark:text-gray-200">Египет 2026</span>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Туры в Египет 2026 из Москвы
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Виза по прибытии $25. Цены от 90 000 ₽ на двоих. Хургада, Шарм-эль-Шейх, Марса-Алам.
            Горящие туры август 2026. Поддержка 24/7 от Велес Вояж.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+79850635134"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Позвонить +7 985 063-51-34
            </a>
            <a
              href="https://t.me/veles_voyage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Написать в Telegram
            </a>
          </div>
        </div>

        {/* TL;DR Featured Snippet */}
        <section className="mb-10 p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-amber-100 dark:border-gray-700 speakable-summary">
          <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2 !mt-0">
            <span className="text-3xl">⚡</span> Краткий ответ: туры в Египет 2026
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
            <strong>Цена:</strong> от 90 000 ₽ на двоих за 7 ночей. <strong>Виза:</strong> по прибытии $25 (до 30 дней).{' '}
            <strong>Лучший сезон:</strong> октябрь-апрель. <strong>Популярные курорты:</strong> Хургада, Шарм-эль-Шейх, Марса-Алам.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b border-amber-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Виза</th>
                  <td className="text-gray-900 dark:text-white py-2">По прибытии $25 (до 30 дней)</td>
                </tr>
                <tr className="border-b border-amber-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Валюта</th>
                  <td className="text-gray-900 dark:text-white py-2">Египетский фунт (EGP)</td>
                </tr>
                <tr className="border-b border-amber-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Язык</th>
                  <td className="text-gray-900 dark:text-white py-2">Арабский, английский, русский в отелях</td>
                </tr>
                <tr className="border-b border-amber-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Лучший сезон</th>
                  <td className="text-gray-900 dark:text-white py-2">Октябрь-апрель</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Средний чек</th>
                  <td className="text-gray-900 dark:text-white py-2">от 90 000 ₽ на двоих / 7 ночей</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Popular Resorts */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Популярные курорты Египта</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏖️ Хургада</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Бюджетный отдых, дайвинг, отели «всё включено». Идеально для семей и молодёжи.</p>
               <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от {TOUR_PRICES_2026.egypt.minPrice.toLocaleString('ru-RU')} ₽/7 ночей</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🌊 Шарм-эль-Шейх</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Элитный отдых, красивая природа, рифы, люкс-отели. Дороже, но качественнее.</p>
               <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от {TOUR_PRICES_2026.egypt.minPrice.toLocaleString('ru-RU')} ₽/7 ночей</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🐠 Марса-Алам</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Экзотика, лучшие рифы для дайвинга, спокойная атмосфера. Для любителей природы.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 120 000 ₽/7 ночей</p>
            </div>
          </div>
        </section>

        {/* Hot Tours Alert */}
        <section className="mb-10 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-red-100 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2 !mt-0">
            <span className="text-3xl">🔥</span> Горящие туры в Египет август 2026
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Август — самый жаркий месяц в Египте, но время максимальных скидок. Горящие туры до -40% от обычной цены.
            Идеально для тех, кто не боится жары и хочет сэкономить.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
               <span>Хургада: от 75 000 ₽ на двоих (обычно от {TOUR_PRICES_2026.egypt.minPrice.toLocaleString('ru-RU')} ₽)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
               <span>Шарм-эль-Шейх: от 95 000 ₽ на двоих (обычно от {(TOUR_PRICES_2026.egypt.minPrice + 20000).toLocaleString('ru-RU')} ₽)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✓</span>
               <span>Марса-Алам: от 105 000 ₽ на двоих (обычно от {(TOUR_PRICES_2026.egypt.minPrice + 60000).toLocaleString('ru-RU')} ₽)</span>
            </li>
          </ul>
        </section>

        <FAQSection faqs={faqs} title="Вопросы о турах в Египет" schemaId="https://veles-voyage.ru/tours/egypt-2026/#faq" />

        <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-amber-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Полезные ссылки</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/wiki/egypt" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Путеводитель по Египту
            </Link>
            <Link href="/tours" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Все направления
            </Link>
            <Link href="/wiki/hurghada" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Хургада
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Egypt2026Page;
