import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { FAQSection } from '@/components/FAQSection';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Туры из Казани 2026 — индивидуальные путешествия из Татарстана | Велес Вояж',
  description: 'Туры из Казани 2026: вылеты из аэропорта Казань. Индивидуальные туры в Турцию, Египет, ОАЭ, круизы. Подбор за 15 минут. Лицензия РТА 0035678.',
  url: `${SITE_URL}/tours/kazan`,
  type: 'website',
  keywords: [
    'туры из казани',
    'турагентство казань',
    'вылет из казани',
    'индивидуальные туры казань',
    'туры из татарстана',
  ],
});

const faqs = [
  {
    question: 'Какой аэропорт Казани используют для вылета?',
    answer: 'Из Казани вылетают из международного аэропорта Казань (KZN). Мы подберём оптимальное время вылета и трансфер.',
  },
  {
    question: 'Как добраться до офиса Велес Вояж из Казани?',
    answer: 'На поезде до станции «Пушкино» или «Голицыно», затем на такси. Также можем организовать онлайн-консультацию.',
  },
  {
    question: 'Какие туры доступны из Казани?',
    answer: 'Из Казани доступны все направления: Турция, Египет, ОАЭ, Абхазия, круизы и индивидуальные туры по всему миру.',
  },
  {
    question: 'Как забронировать тур из Казани?',
    answer: 'Позвоните +7 985 063-51-34 или напишите в Telegram @veles_voyage. Менеджер подберёт тур за 15 минут без наценок.',
  },
];

const KazanPage = () => {
  return (
    <article>
      <StructuredData
        schemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'Велес Вояж',
            license: 'РТА 0035678',
            areaServed: {
              '@type': 'City',
              name: 'Казань',
            },
            availableAtOrFrom: [
              {
                '@type': 'Place',
                name: 'Аэропорт Казань',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Казань',
                  addressCountry: 'RU',
                },
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
            '@type': 'TouristTrip',
            name: 'Туры из Казани 2026',
            description: 'Туры из Казани в Турцию, Египет, ОАЭ, круизы и другие страны с вылетом из аэропорта Казань.',
            touristType: ['CulturalTourism', 'AdventureTourism', 'BeachTourism'],
            offers: {
              '@type': 'Offer',
              priceCurrency: 'RUB',
              price: '95000',
              availability: 'InStock',
              validFrom: '2026-01-01',
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
              <span className="text-gray-800 dark:text-gray-200">Казань</span>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Туры из Казани 2026
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Индивидуальные туры и круизы с вылетом из аэропорта Казань. Подбор за 15 минут,
            поддержка 24/7, лицензия РТА 0035678.
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

        {/* Airport Info */}
        <section className="mb-10 p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-green-100 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 !mt-0">
            <span className="text-3xl">✈️</span> Аэропорт Казань (KZN)
          </h2>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Международный аэропорт Казань</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Международный аэропорт Казань — главный аэропорт Татарстана, обслуживающий рейсы по России и международные направления.
              Современный терминал с удобной транспортной доступностью.
            </p>
          </div>
        </section>

        <FAQSection faqs={faqs} title="Вопросы о турах из Казани" schemaId="https://veles-voyage.ru/tours/kazan/#faq" />

        <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-green-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Популярные направления из Казани</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/tours/turkey-all-inclusive" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Туры в Турцию
            </Link>
            <Link href="/tours/egypt-2026" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Туры в Египет
            </Link>
            <Link href="/tours/uae-2026" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Туры в ОАЭ
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

export default KazanPage;
