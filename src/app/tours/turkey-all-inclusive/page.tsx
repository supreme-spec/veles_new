import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { FAQSection } from '@/components/FAQSection';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Туры в Турцию из Москвы всё включено 2026 — цены от 90 000 ₽ | Велес Вояж',
  description: 'Туры в Турцию «всё включено» из Москвы 2026: актуальные цены от 90 000 ₽ на двоих, виза не требуется, лучшие отели Антальи, Мармариса, Алании. Забронируйте тур с поддержкой 24/7.',
  url: `${SITE_URL}/tours/turkey-all-inclusive`,
  type: 'article',
  keywords: [
    'туры в турцию всё включено 2026',
    'туры в турцию из москвы',
    'цены туры турция всё включено',
    'горящие туры в турцию',
    'отдых в турции 2026',
    'виза в турцию',
    'отели анталии 5 звезд',
    'турция мармарис',
  ],
});

const faqs = [
  {
    question: 'Сколько стоит тур в Турцию «всё включено» из Москвы на двоих?',
    answer: 'Тур в Турцию «всё включено» из Москвы на двоих стоит от 90 000 до 160 000 рублей за 7 ночей. Цена зависит от отеля и сезона.',
  },
  {
    question: 'Нужна ли виза в Турцию для россиян в 2026?',
    answer: 'Нет, виза в Турцию для граждан РФ не требуется. Безвизовый въезд действует до 90 дней при наличии загранпаспорта.',
  },
  {
    question: 'Где лучше отдохнуть в Турции в 2026?',
    answer: 'Лучшие курорты: Анталья для семей, Мармарис для молодёжи, Аланья для бюджета, Кемер для элиты, Белек для гольфа.',
  },
  {
    question: 'Что входит в тур «всё включено» в Турции?',
    answer: 'Тур «всё включено» включает проживание, питание, местные напитки, анимацию, бассейны и пляж. Авиабилеты отдельно.',
  },
  {
    question: 'Как забронировать тур в Турцию через Велес Вояж?',
    answer: 'Позвоните +7 985 063-51-34 или напишите в Telegram @veles_voyage. Менеджер подберёт тур за 15 минут без наценок.',
  },
];

const TurkeyAllInclusivePage = () => {
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
                name: 'Турция всё включено',
                item: `${SITE_URL}/tours/turkey-all-inclusive`,
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
              name: 'Туры в Турцию 2026',
              itemListElement: [
                {
                  '@type': 'TouristTrip',
                  name: 'Тур в Турцию всё включено из Москвы',
                  description: 'Индивидуальные туры и пакеты «всё включено» из Москвы в Турцию с поддержкой 24/7',
                  touristType: 'Couples',
                  offers: {
                    '@type': 'Offer',
                    price: '90000',
                    priceCurrency: 'RUB',
                    availability: 'https://schema.org/InStock',
                    validFrom: '2026-05-01',
                    validThrough: '2026-10-31',
                    category: 'TourPackage',
                    url: `${SITE_URL}/tours/turkey-all-inclusive`,
                    seller: {
                      '@type': 'Organization',
                      name: 'Велес Вояж',
                      url: SITE_URL,
                    },
                    eligibleRegion: {
                      '@type': 'Country',
                      name: 'Turkey',
                    },
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '500',
                    bestRating: '5',
                    worstRating: '1',
                  },
                },
              ],
            },
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
              <span className="text-gray-800 dark:text-gray-200">Турция всё включено</span>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Туры в Турцию из Москвы «всё включено» 2026
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Цены от 90 000 ₽ на двоих. Виза не требуется. Лучшие отели Антальи, Мармариса, Алании.
            Поддержка 24/7 от Велес Вояж.
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
        <section className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-blue-100 dark:border-gray-700 speakable-summary">
          <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2 !mt-0">
            <span className="text-3xl">⚡</span> Краткий ответ: туры в Турцию 2026
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
            <strong>Цена:</strong> от 90 000 ₽ на двоих за 7 ночей. <strong>Виза:</strong> не требуется (до 90 дней).{' '}
            <strong>Лучший сезон:</strong> май-октябрь. <strong>Популярные курорты:</strong> Анталья, Мармарис, Аланья, Кемер, Белек.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Виза</th>
                  <td className="text-gray-900 dark:text-white py-2">Не требуется (до 90 дней)</td>
                </tr>
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Валюта</th>
                  <td className="text-gray-900 dark:text-white py-2">Турецкая лира (TRY)</td>
                </tr>
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Язык</th>
                  <td className="text-gray-900 dark:text-white py-2">Турецкий, английский, русский в отелях</td>
                </tr>
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Лучший сезон</th>
                  <td className="text-gray-900 dark:text-white py-2">Май-октябрь</td>
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
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Популярные курорты Турции</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏖️ Анталья</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Идеально для семей с детьми. Много пляжей, отелей 3-5 звёзд, аквапарков.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 95 000 ₽/7 ночей</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🌊 Мармарис</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Для молодёжи и активного отдыха. Ночная жизнь, бары, дискотеки, яхт-клубы.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 110 000 ₽/7 ночей</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏰 Аланья</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Компромисс цены и качества. Длинные пляжи, исторические достопримечательности.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 100 000 ₽/7 ночей</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🌲 Кемер</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Элитные отели, природа, горы и море. Идеально для спокойного отдыха.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 130 000 ₽/7 ночей</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">⛳ Белек</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Люкс и гольф. Премиум-отели, спа, поля для гольфа мирового уровня.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 150 000 ₽/7 ночей</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏛️ Сиде</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">История и пляжи. Древние руины рядом с отелями, песчаные пляжи.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 105 000 ₽/7 ночей</p>
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} title="Вопросы о турах в Турцию" schemaId="https://veles-voyage.ru/tours/turkey-all-inclusive/#faq" />

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Полезные ссылки</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/wiki/turkey" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Путеводитель по Турции
            </Link>
            <Link href="/tours" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Все направления
            </Link>
            <Link href="/cruises" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Морские круизы
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TurkeyAllInclusivePage;
