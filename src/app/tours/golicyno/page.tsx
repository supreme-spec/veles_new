import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { FAQSection } from '@/components/FAQSection';
import { SITE_URL, SOCIAL_LINKS } from '@/shared/constants/seo';

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: 'Турагентство в Голицыно — туры из Голицыно, вылет из Домодедово/Внуково | Велес Вояж',
    description: 'Турагентство Велес Вояж в Голицыно: офис на пр-т. Керамиков, 103. Туры из Голицыно с вылетом из Домодедово и Внуково. Индивидуальные подборы, поддержка 24/7, лицензия РТА 0035678.',
    url: `${SITE_URL}/tours/golicyno`,
    type: 'website',
    keywords: [
      'турагентство голицыно',
      'туры из голицыно',
      'турфирма голицыно',
      'купить тур в голицыно',
      'вылет из домодедово',
      'вылет из внуково',
      'туры из одинцовского района',
    ],
  }),
  other: {
    'geo.region': 'RU-MOS',
    'geo.placename': 'Голицыно',
    'ICBM': '55.738745, 36.982842',
  },
};

const faqs = [
  {
    question: 'Где находится офис Велес Вояж в Голицыно?',
    answer: 'Офис Велес Вояж в Голицыно находится по адресу пр-т. Керамиков, 103. Работаем Пн-Пт 9:00-21:00, Сб-Вс 10:00-16:00.',
  },
  {
    question: 'Как организован вылет из Голицыно?',
    answer: 'Жителям Голицыно удобно вылетать из Домодедово и Внуково. Мы организуем трансфер до аэропорта и подберём оптимальное время рейса.',
  },
  {
    question: 'Можно ли оформить документы в офисе в Голицыно?',
    answer: 'Да, в нашем офисе на пр-т. Керамиков, 103 вы можете оформить все документы для поездки, проконсультироваться с менеджером и оплатить тур.',
  },
  {
    question: 'Какие туры доступны жителям Голицыно?',
    answer: 'Жителям Голицыно доступны все направления: Турция, Египет, ОАЭ, Абхазия, круизы и индивидуальные туры по всему миру.',
  },
];

const GolicynoPage = () => {
  return (
    <article>
      <StructuredData
        schemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Велес Вояж - Офис в Голицыно',
            description: 'Офис турагентства Велес Вояж в Голицыно. Подбор туров, круизов и индивидуальных путешествий.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'пр-т. Керамиков, 103',
              addressLocality: 'Голицыно',
              addressRegion: 'Московская область',
              postalCode: '143041',
              addressCountry: 'RU',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 55.738745,
              longitude: 36.982842,
            },
            telephone: '+7-985-063-51-34',
            email: 'hello@veles-voyage.ru',
            url: `${SITE_URL}/tours/golicyno`,
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '21:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday'],
                opens: '10:00',
                closes: '16:00',
              },
            ],
            hasMap: 'https://yandex.ru/maps/org/veles_voyazh/129552746144',
            areaServed: {
              '@type': 'City',
              name: 'Голицыно',
            },
            parentOrganization: {
              '@type': 'TravelAgency',
              name: 'Велес Вояж',
              url: SITE_URL,
            },
            sameAs: [
              SOCIAL_LINKS.vk,
              SOCIAL_LINKS.telegram,
              SOCIAL_LINKS.rutube,
              SOCIAL_LINKS.max,
              SOCIAL_LINKS.yandexBusiness,
              SOCIAL_LINKS.gis2,
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: 'Туры из Голицыно 2026',
            description: 'Туры из Голицыно с вылетом из Домодедово и Внуково. Турция, Египет, ОАЭ, Таиланд и другие направления.',
            touristType: ['CulturalTourism', 'AdventureTourism', 'BeachTourism'],
            offers: {
              '@type': 'Offer',
              priceCurrency: 'RUB',
              price: '100000',
              availability: 'InStock',
              validFrom: '2026-01-01',
            },
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
              <span className="text-gray-800 dark:text-gray-200">Голицыно</span>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Турагентство Велес Вояж в Голицыно
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Офис на пр-т. Керамиков, 103. Туры из Голицыно с вылетом из Домодедово и Внуково.
            Индивидуальный подбор, поддержка 24/7, лицензия РТА 0035678.
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

        {/* Office Info */}
        <section className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-blue-100 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 !mt-0">
            <span className="text-3xl">🏢</span> Наш офис в Голицыно
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Адрес</h3>
              <p className="text-gray-700 dark:text-gray-300">пр-т. Керамиков, 103</p>
              <p className="text-gray-700 dark:text-gray-300">Голицыно, 143041</p>
              <p className="text-gray-700 dark:text-gray-300">Россия</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Время работы</h3>
               <p className="text-gray-700 dark:text-gray-300">Пн-Пт: 9:00 - 21:00</p>
               <p className="text-gray-700 dark:text-gray-300">Сб-Вс: 10:00 - 16:00</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Преимущества для жителей Голицыно</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Удобное оформление документов на месте</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Трансфер до аэропорта Домодедово и Внуково</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Персональная консультация с менеджером</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Оптимальное время вылета из ближайших аэропортов</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Map */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 !mt-0">
            <span className="text-3xl">🗺️</span> Как добраться
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=36.982842%2C55.738745&z=16&pt=36.982842,55.738745,pm2rdm"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              title="Карта офиса Велес Вояж в Голицыно"
              className="w-full"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            Офис Велес Вояж в Голицыно: пр-т. Керамиков, 103. Телефон: +7 985 063-51-34
          </p>
        </section>

        <FAQSection faqs={faqs} title="Вопросы жителям Голицыно" schemaId="https://veles-voyage.ru/tours/golicyno/#faq" />

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Популярные направления</h3>
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
            <Link href="/tours" className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition">
              Все направления
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default GolicynoPage;
