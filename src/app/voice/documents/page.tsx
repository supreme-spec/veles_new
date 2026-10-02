import type { Metadata } from 'next';
import Link from 'next/link';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SchemaScripts } from '@/components/SchemaScripts';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Какие документы нужны для поездки в [страну]? Список документов для туристов',
  description: 'Какие документы нужны для поездки в Турцию, Египет, ОАЭ, Таиланд и другие страны в 2026 году. Загранпаспорт, виза, страховка, билеты. Полный список от Велес Вояж.',
  url: `${SITE_URL}/voice/documents`,
  type: 'article',
  keywords: [
    'какие документы нужны для поездки',
    'документы для поездки в Турцию',
    'документы для поездки в Египет',
    'документы для загранпоездки',
    'список документов для туризма'
  ],
  faqs: [
    {
      question: 'Какие документы нужны для поездки в Турцию?',
      answer: 'Для поездки в Турцию нужен загранпаспорт (действительный минимум 4 месяца после въезда), медицинская страховка, обратные билеты и подтверждение бронирования отеля. Виза не требуется до 60 дней.'
    },
    {
      question: 'Какие документы нужны для поездки в Египет?',
      answer: 'Для Египта нужен загранпаспорт (минимум 6 месяцев), виза (оформляется по прилете за $25 или электронная), медицинская страховка, обратные билеты и бронирование отеля.'
    },
    {
      question: 'Какие документы нужны для поездки в ОАЭ?',
      answer: 'Для ОАЭ нужен загранпаспорт (минимум 6 месяцев), обратные билеты, подтверждение бронирования отеля. Виза не требуется до 90 дней для граждан РФ.'
    }
  ]
});

export default function DocumentsPage() {
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Какие документы нужны для поездки за границу?',
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
        name: 'Какие документы нужны для поездки в Турцию?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Для поездки в Турцию нужен загранпаспорт, медицинская страховка, обратные билеты и подтверждение отеля. Виза не требуется до 60 дней.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие документы нужны для поездки в Египет?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Для Египта нужен загранпаспорт, виза по прилете или электронная, страховка, обратные билеты и бронирование отеля.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие документы нужны для поездки в ОАЭ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Для ОАЭ нужен загранпаспорт, обратные билеты и подтверждение бронирования. Виза не требуется до 90 дней.',
        },
      },
    ],
  };

  const popularCountries = [
    WORLD_DESTINATIONS_DATA['турция'],
    WORLD_DESTINATIONS_DATA['египет'],
    WORLD_DESTINATIONS_DATA['оаэ'],
    WORLD_DESTINATIONS_DATA['таиланд'],
    WORLD_DESTINATIONS_DATA['мальдивы'],
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SchemaScripts schemas={[voiceFaqSchema, speakableSchema]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Какие документы нужны для поездки за границу?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Список документов для популярных туристических направлений
        </p>
      </header>

      {/* Цитируемый ответ для голосового поиска */}
      <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          Для любой поездки за границу нужны: загранпаспорт (действительный минимум 6 месяцев), медицинская страховка, обратные билеты и подтверждение бронирования отеля.
        </p>
      </blockquote>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Обязательные документы для любой поездки
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📄 Загранпаспорт</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Действительный минимум 6 месяцев после возвращения. Для некоторых стран достаточно 4 месяцев.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🏥 Медицинская страховка</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Покрытие не менее 30 000 евро. Обязательна для Шенгена и многих других стран.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">✈️ Обратные билеты</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Подтверждение обратных билетов может потребовать на границе или при получении визы.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🏨 Бронирование отеля</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Подтверждение проживания на весь срок поездки. Требуется для визы и въезда.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Документы по странам
        </h2>
        <div className="space-y-6">
          {popularCountries.map((country) => {
            const visaInfo = country.visaRequired !== false 
              ? 'Виза требуется (оформляется заранее или по прилете)'
              : 'Виза не требуется (безвизовый въезд)';
            
            return (
              <Link
                key={country.slug}
                href={`/wiki/${country.slug}`}
                className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-3">
                  {country.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>• Загранпаспорт (минимум 6 месяцев)</p>
                  <p>• Медицинская страховка</p>
                  <p>• {visaInfo}</p>
                  <p>• Обратные билеты</p>
                  <p>• Бронирование отеля</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, какие документы нужны для поездки в Турцию?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Для поездки в Турцию нужен загранпаспорт (действительный минимум 4 месяца после въезда), медицинская страховка, обратные билеты и подтверждение бронирования отеля. Виза не требуется до 60 дней.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, какие документы нужны для поездки в Египет?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Для Египта нужен загранпаспорт (минимум 6 месяцев), виза (оформляется по прилете за $25 или электронная), медицинская страховка, обратные билеты и бронирование отеля.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, нужна ли страховка для поездки за границу?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Да, медицинская страховка обязательна для большинства стран. Покрытие должно быть не менее 30 000 евро для Шенгена и многих других направлений.
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
