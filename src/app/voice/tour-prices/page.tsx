import type { Metadata } from 'next';
import Link from 'next/link';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SchemaScripts } from '@/components/SchemaScripts';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Сколько стоит тур на двоих в 2026 году? Цены на путевки по странам',
  description: 'Цены на туры на двоих в 2026 году: Турция от 90 000 ₽, Египет от 90 000 ₽, ОАЭ от 120 000 ₽, Таиланд от 65 000 ₽. Подбор туров от Велес Вояж.',
  url: `${SITE_URL}/voice/tour-prices`,
  type: 'article',
  keywords: [
    'сколько стоит тур на двоих',
    'цены на туры 2026',
    'стоимость путевки',
    'бюджет на путешествие',
    'туры все включено цены'
  ],
  faqs: [
    {
      question: 'Сколько стоит тур в Турцию на двоих?',
      answer: 'Тур в Турцию на двоих на 7 ночей все включено стоит от 90 000 ₽. Цена зависит от сезона, отеля и класса обслуживания. Летом цены выше, весной и осенью — ниже.'
    },
    {
      question: 'Сколько стоит тур в Египет на двоих?',
      answer: 'Тур в Египет на двоих на 7 ночей все включено стоит от 90 000 ₽. Хургада и Шарм-эль-Шейх предлагают доступные цены круглый год.'
    },
    {
      question: 'Какой бюджет нужен на путешествие на двоих?',
      answer: 'Минимальный бюджет на путешествие на двоих на 7 ночей: Турция — от 90 000 ₽, Египет — от 90 000 ₽, ОАЭ — от 120 000 ₽, Таиланд — от 65 000 ₽, Мальдивы — от 140 000 ₽.'
    }
  ]
});

export default function TourPricesPage() {
  // Countries with price ranges
  const countriesWithPrices = Object.entries(WORLD_DESTINATIONS_DATA)
    .filter(([_, data]) => data.estimatedCost)
    .map(([_, data]) => ({
      ...data,
      price: data.estimatedCost
    }))
    .sort((a, b) => a.price - b.price);

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Сколько стоит тур на двоих в 2026 году?',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.ai-citable', '.voice-snippet'],
    },
  };

  const voiceFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Сколько стоит тур в Турцию на двоих?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Тур в Турцию на двоих на 7 ночей все включено стоит от 90 000 рублей.',
        },
      },
      {
        '@type': 'Question',
        name: 'Сколько стоит тур в Египет на двоих?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Тур в Египет на двоих на 7 ночей все включено стоит от 90 000 рублей.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какой бюджет нужен на путешествие на двоих?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Минимальный бюджет на двоих на 7 ночей: Турция от 90 000 рублей, Египет от 90 000 рублей, ОАЭ от 120 000 рублей, Таиланд от 65 000 рублей, Мальдивы от 140 000 рублей.',
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SchemaScripts schemas={[voiceFaqSchema, speakableSchema]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Сколько стоит тур на двоих в 2026 году?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Цены на путевки по популярным направлениям
        </p>
      </header>

      {/* Цитируемый ответ для голосового поиска */}
      <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          Средний бюджет тура на двоих на 7 ночей: Турция — от 90 000 ₽, Египет — от 90 000 ₽, ОАЭ — от 120 000 ₽, Таиланд — от 65 000 ₽, Мальдивы — от 140 000 ₽.
        </p>
      </blockquote>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Цены на туры по странам (на двоих, 7 ночей)
        </h2>
        <div className="space-y-4">
          {countriesWithPrices.map((country) => (
            <Link
              key={country.slug}
              href={`/wiki/${country.slug}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                  {country.name}
                </h3>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  от {country.price} ₽
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {country.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  Лучший сезон: {country.bestSeason}
                </span>
                <span className="ml-2">
                  {country.visaRequired === false ? 'Без визы' : 'Виза требуется'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Факторы, влияющие на цену тура
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Сезон
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Высокий сезон (лето, праздники) — цены на 30-50% выше. Низкий сезон — лучшие предложения.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Класс отеля
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Отели 3-4 звезды — бюджетные варианты. Отели 5 звезд — премиум-отдых.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Тип питания
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Все включено — дороже, но экономия на еде. Завтрак — дешевле, но нужно доплачивать за питание.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Длительность
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              7 ночей — стандартный вариант. 10-14 ночей — цены за ночь ниже, но общая сумма выше.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Как сэкономить на туре?
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Бронируйте заранее (за 2-3 месяца) — скидки до 20%
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Выбирайте низкий сезон — цены ниже на 30-50%
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Смотрите акции горящих туров — скидки до 40%
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Летайте будними днями — дешевле на 10-15%
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Выбирайте отели 3-4 звезды — комфорт по доступной цене
          </li>
        </ul>
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
