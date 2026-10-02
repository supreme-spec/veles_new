import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { FAQSection } from '@/components/FAQSection';
import { SITE_URL } from '@/shared/constants/seo';
import { getCountryMdxData } from '@/shared/utils/generateCountrySEOMetadata';
import { countryNamesDictionary, getCountryAccusative } from '@/shared/data/country-names-dictionary';

interface PageProps {
  params: Promise<{ country: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const name = countryNamesDictionary[country] || country;
  const accusativeName = getCountryAccusative(country);
  const title = `Туры в ${accusativeName} 2026 из Москвы — цены, виза, «всё включено» | Велес Вояж`;
  const description = `Туры в ${accusativeName} 2026: актуальные цены, нужна ли виза, лучший сезон и курорты. Индивидуальные туры и «всё включено» из Москвы с поддержкой 24/7 от Велес Вояж.`;
  return generateSEOMetadata({
    title,
    description,
    url: `${SITE_URL}/tours/${country}`,
    type: 'article',
    keywords: [
      `туры в ${accusativeName}`,
      `отдых в ${name} 2026`,
      `${name} всё включено`,
      `цены туры ${name}`,
      `виза в ${accusativeName}`,
      `путешествия 2026`,
    ],
  });
}

const TourCountryPage = async ({ params }: PageProps) => {
  const { country } = await params;
  const name = countryNamesDictionary[country] || country;
  const accusativeName = getCountryAccusative(country);
  const data = await getCountryMdxData(country);
  const fm = data?.frontmatter || {};

  const visa =
    typeof fm.visaRequirements === 'boolean'
      ? fm.visaRequirements
        ? 'Требуется'
        : 'Не требуется'
      : 'Уточняйте в консульстве';
  const price = fm.estimatedCost
    ? `${fm.estimatedCost.toLocaleString('ru-RU')} ₽`
    : 'по запросу';
  const updateDate = '30.07.2026';

  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `Туры в ${accusativeName} 2026`,
    description: `Пляжный отдых, ${fm.bestTimeToVisit || 'круглый год'}, лучшие курорты ${name}.`,
    touristType: 'Пляжный отдых',
    offers: {
      '@type': 'Offer',
      price: fm.estimatedCost ? String(fm.estimatedCost) : '70000',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/tours/${country}`,
    },
  };

  const faqs = [
    {
      question: `Нужна ли виза в ${name} для россиян?`,
      answer:
        typeof fm.visaRequirements === 'boolean'
          ? fm.visaRequirements
            ? `Для въезда в ${name} гражданам РФ требуется виза. Точные условия и список документов уточняйте у менеджера Велес Вояж.`
            : `Для поездки в ${name} гражданам России виза не требуется (безвизовый въезд или по прибытии).`
          : `Актуальные требования к визе в ${name} уточняйте у менеджера Велес Вояж.`,
    },
    {
      question: `Сколько стоит тур в ${name} «всё включено»?`,
      answer: `Ориентировочный бюджет на поездку в ${name} — от ${price}. Итоговая цена зависит от сезона, отеля и типа размещения. Менеджер Велес Вояж подберёт вариант под ваш бюджет.`,
    },
    {
      question: `Когда лучше ехать в ${name}?`,
      answer: fm.bestTimeToVisit
        ? `Лучший сезон для поездки в ${name}: ${fm.bestTimeToVisit}.`
        : `Сезонность поездки в ${name} зависит от ваших предпочтений. Менеджер подскажет оптимальные даты.`,
    },
    {
      question: `Как забронировать тур в ${name}?`,
      answer: `Позвоните +7 985 063-51-34 или напишите в Telegram @veles_voyage. Менеджер подберёт тур «всё включено» из Москвы за 15 минут.`,
    },
  ];

  return (
    <article>
      <StructuredData
        schemas={[
          touristTripSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]}
      />

      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">
        {/* Visa and Entry Rules */}
        <section
          aria-label="Виза и правила въезда"
          className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-blue-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2 !mt-0">
            <span className="text-3xl">🛂</span> Виза и правила въезда в {name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            <strong>Статус на {updateDate}:</strong>{' '}
            {typeof fm.visaRequirements === 'boolean'
              ? fm.visaRequirements
                ? `Гражданам РФ виза ${name} требуется. Точные условия и список документов уточняйте у менеджера Велес Вояж.`
                : `Гражданам РФ виза в ${name} не требуется при поездке до 60 дней.`
              : 'Актуальные визовые требования уточняйте у менеджера Велес Вояж.'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            Правила могут меняться. Перед поездкой рекомендуем проверить информацию на сайте МИД РФ
            или консульстве {name}.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            <strong>Дата обновления:</strong> {updateDate}
          </p>
          <p className="mt-3 text-sm">
            Источник:{' '}
            <a href="https://www.mid.ru" rel="nofollow" className="text-blue-600 hover:underline">
              МИД РФ
            </a>
          </p>
        </section>

        {/* Price Block */}
        <section
          aria-label="Цены на туры"
          className="mb-10 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-green-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 !mt-0">
            <span className="text-3xl">💰</span> Цены на туры в {getCountryAccusative(country)}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">🔹</span>
              <span>
                <strong>Эконом:</strong> от {price} за 7 ночей, 2 взрослых, всё включено.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">🔹</span>
              <span>
                <strong>Комфорт:</strong> от {(fm.estimatedCost || 90000) + 20000} ₽ за 7
                ночей.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 dark:text-purple-400 font-bold">🔹</span>
              <span>
                <strong>Премиум:</strong> от {(fm.estimatedCost || 90000) + 60000} ₽ за 7
                ночей.
              </span>
            </li>
          </ul>
        </section>

        {/* Best Time and Resorts */}
        <section
          aria-label="Когда лучше ехать"
          className="mb-10 p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-amber-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 !mt-0">
            <span className="text-3xl">📅</span> Когда лучше ехать в {name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {fm.bestTimeToVisit
              ? `Лучший сезон для поездки в ${name}: ${fm.bestTimeToVisit}.`
              : 'Сезонность поездки в Турцию зависит от ваших предпочтений. Менеджер подскажет оптимальные даты.'}
          </p>
          {fm.topAttractions && (
            <>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Лучшие курорты
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                {(Array.isArray(fm.topAttractions) ? fm.topAttractions : []).map(
                  (attraction: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {attraction}
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </section>

        <nav className="flex mb-6 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Главная
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 md:mx-2 text-gray-400">/</span>
              <Link href="/tours" className="hover:text-blue-600">
                Туры
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1 md:mx-2 text-gray-400">/</span>
              <span className="text-gray-800 dark:text-gray-200">{name}</span>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Туры в {name} 2026
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Индивидуальные туры и пакеты «всё включено» из Москвы. Поддержка 24/7, подбор отеля и
            экскурсий под ваши интересы.
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

        {/* TL;DR + таблица */}
        <section className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-blue-100 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2 !mt-0">
            <span className="text-3xl">⚡</span> Краткий ответ: туры в {getCountryAccusative(country)}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
            Виза: {visa}. Валюта: {fm.currency || 'уточняйте'}. Лучший сезон:{' '}
            {fm.bestTimeToVisit || 'по запросу'}. Средний бюджет: от {price}.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {fm.capital && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Столица
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">{fm.capital}</td>
                  </tr>
                )}
                <tr className="border-b border-blue-100 dark:border-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                    Виза
                  </th>
                  <td className="text-gray-900 dark:text-white py-2">{visa}</td>
                </tr>
                {fm.currency && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Валюта
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">{fm.currency}</td>
                  </tr>
                )}
                {fm.language && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Язык
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">{fm.language}</td>
                  </tr>
                )}
                {fm.bestTimeToVisit && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Лучший сезон
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">{fm.bestTimeToVisit}</td>
                  </tr>
                )}
                <tr>
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                    Средний чек
                  </th>
                  <td className="text-gray-900 dark:text-white py-2">от {price}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <FAQSection
          faqs={faqs}
          title={`Вопросы о турах в ${name}`}
          schemaId={`https://veles-voyage.ru/tours/${country}/#faq`}
        />

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Полезные ссылки</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/wiki/${country}`}
              className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition"
            >
              Путеводитель по {name}
            </Link>
            <Link
              href="/tours"
              className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition"
            >
              Все направления
            </Link>
            <Link
              href="/cruises"
              className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition"
            >
              Морские круизы
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TourCountryPage;
