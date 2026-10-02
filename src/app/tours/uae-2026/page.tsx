import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { FAQSection } from '@/components/FAQSection';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Туры в ОАЭ (Дубай) 2026 из Москвы — виза не требуется, цены от 120 000 ₽ | Велес Вояж',
  description: 'Туры в ОАЭ и Дубай 2026 из Москвы: виза не требуется для россиян, цены от 120 000 ₽, лучшие отели Пальмы Джумейра, Бурдж-Халифа, пустынные сафари. Забронируйте тур с поддержкой 24/7.',
  url: `${SITE_URL}/tours/uae-2026`,
  type: 'article',
  keywords: [
    'туры в оаэ 2026 из москвы',
    'туры в дубай',
    'виза в оаэ для россиян 2026',
    'отдых в дубае цены',
    'эмираты туры',
    'бурдж халифа',
    'пальма джумейра',
  ],
});

const faqs = [
  {
    question: 'Нужна ли виза в ОАЭ для россиян в 2026?',
    answer: 'Нет, виза в ОАЭ для граждан РФ не требуется при въезде через Дубай и Абу-Даби. Безвизовый въезд до 90 дней при наличии загранпаспорта.',
  },
  {
    question: 'Сколько стоит тур в ОАЭ (Дубай) из Москвы на двоих?',
    answer: 'Тур в ОАЭ из Москвы на двоих стоит от 120 000 до 200 000 рублей за 5-7 ночей. Питание обычно не включено.',
  },
  {
    question: 'Что посмотреть в Дубае за 5-7 дней?',
    answer: 'Топ достопримечательности: Бурдж-Халифа, Пальма Джумейра, Дубай-Молл, пустынное сафари, фонтан Дубая, музей будущего.',
  },
  {
    question: 'Какой сезон лучше для поездки в ОАЭ?',
    answer: 'Лучший сезон: ноябрь-март (25-30°C). Летом жарко (45°C+), но цены ниже. Выбирайте зимние месяцы.',
  },
  {
    question: 'Как забронировать тур в ОАЭ через Велес Вояж?',
    answer: 'Позвоните +7 985 063-51-34 или напишите в Telegram @veles_voyage. Менеджер подберёт тур за 15 минут без наценок.',
  },
];

const UAE2026Page = () => {
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
                name: 'ОАЭ 2026',
                item: `${SITE_URL}/tours/uae-2026`,
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
              name: 'Туры в ОАЭ 2026',
              itemListElement: [
                {
                  '@type': 'TouristTrip',
                  name: 'Тур в Дубай из Москвы',
                  description: 'Премиум-туры в ОАЭ: Бурдж-Халифа, Пальма Джумейра, пустынные сафари с поддержкой 24/7',
                  touristType: 'Couples',
                  offers: {
                    '@type': 'Offer',
                    price: '120000',
                    priceCurrency: 'RUB',
                    availability: 'https://schema.org/InStock',
                    validFrom: '2026-11-01',
                    validThrough: '2027-03-31',
                    category: 'TourPackage',
                    url: `${SITE_URL}/tours/uae-2026`,
                    seller: {
                      '@type': 'Organization',
                      name: 'Велес Вояж',
                      url: SITE_URL,
                    },
                    eligibleRegion: {
                      '@type': 'Country',
                      name: 'United Arab Emirates',
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
              <span className="text-gray-800 dark:text-gray-200">ОАЭ 2026</span>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Туры в ОАЭ (Дубай) 2026 из Москвы
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Виза не требуется. Цены от 120 000 ₽ на двоих. Бурдж-Халифа, Пальма Джумейра, пустынные сафари.
            Премиум-отели и шопинг. Поддержка 24/7 от Велес Вояж.
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
        <section className="mb-10 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-purple-100 dark:border-gray-700 speakable-summary">
          <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2 !mt-0">
            <span className="text-3xl">⚡</span> Краткий ответ: туры в ОАЭ 2026
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
            <strong>Цена:</strong> от 120 000 ₽ на двоих за 5-7 ночей. <strong>Виза:</strong> не требуется (до 90 дней).{' '}
            <strong>Лучший сезон:</strong> ноябрь-март. <strong>Популярные города:</strong> Дубай, Абу-Даби.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b border-purple-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Виза</th>
                  <td className="text-gray-900 dark:text-white py-2">Не требуется (до 90 дней)</td>
                </tr>
                <tr className="border-b border-purple-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Валюта</th>
                  <td className="text-gray-900 dark:text-white py-2">Дирхам ОАЭ (AED)</td>
                </tr>
                <tr className="border-b border-purple-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Язык</th>
                  <td className="text-gray-900 dark:text-white py-2">Арабский, английский, русский в отелях</td>
                </tr>
                <tr className="border-b border-purple-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Лучший сезон</th>
                  <td className="text-gray-900 dark:text-white py-2">Ноябрь-март</td>
                </tr>
                <tr>
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">Средний чек</th>
                  <td className="text-gray-900 dark:text-white py-2">от 120 000 ₽ на двоих / 5-7 ночей</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Attractions */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Что посмотреть в Дубае</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏗️ Бурдж-Халифа</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Самое высокое здание в мире (828 м). Вид на весь город с обзорной площадки.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Билеты: от 500 AED</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🌴 Пальма Джумейра</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Искусственный остров в форме пальмы. Люкс-отели, пляжи, аквапарк Aquaventure.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Отели: от 15 000 ₽/ночь</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏬 Дубай-Молл</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Крупнейший торговый центр в мире. 1200 магазинов, аквариум, ледовый каток.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Вход: бесплатно</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏜️ Пустынное сафари</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Джип-тур по песчаным дюнам, ужин в бедуинском лагере, верблюды.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цена: от 300 AED/чел</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">⛲ Фонтан Дубая</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Крупнейший музыкальный фонтан в мире. Шоу каждые 30 минут вечером.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Бесплатно</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏛️ Музей будущего</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Футуристический музей с экспозициями о технологиях будущего.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Билеты: от 149 AED</p>
            </div>
          </div>
        </section>

        {/* Emirates */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Эмираты ОАЭ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏙️ Дубай</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Самый популярный эмират. Небоскрёбы, шопинг, пляжи, ночная жизнь. Идеально для первого знакомства с ОАЭ.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 120 000 ₽/5 ночей</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🕌 Абу-Даби</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Столица ОАЭ. Мечеть шейха Зайда, музей Лувр Абу-Даби, Формула-1. Более спокойная атмосфера.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Цены: от 130 000 ₽/5 ночей</p>
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} title="Вопросы о турах в ОАЭ" schemaId="https://veles-voyage.ru/tours/uae-2026/#faq" />

        <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-purple-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Полезные ссылки</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/wiki/uae" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Путеводитель по ОАЭ
            </Link>
            <Link href="/wiki/dubai" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Дубай
            </Link>
            <Link href="/tours" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Все направления
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UAE2026Page;
