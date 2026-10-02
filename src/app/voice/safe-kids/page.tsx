import type { Metadata } from 'next';
import Link from 'next/link';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SchemaScripts } from '@/components/SchemaScripts';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Безопасно ли ехать с детьми в [страну]? Безопасные страны для семейного отдыха',
  description: 'Безопасно ли ехать с детьми в Турцию, Египет, ОАЭ, Таиланд и другие страны в 2026 году. Рейтинг безопасности, медицинские услуги, отели с детскими клубами. От Велес Вояж.',
  url: `${SITE_URL}/voice/safe-kids`,
  type: 'article',
  keywords: [
    'безопасно ли ехать с детьми',
    'безопасные страны для детей',
    'семейный отдых безопасность',
    'отдых с детьми безопасность',
    'рейтинг безопасности стран'
  ],
  faqs: [
    {
      question: 'Безопасно ли ехать с детьми в Турцию?',
      answer: 'Да, Турция безопасна для семейного отдыха. Отели имеют детские клубы, анимацию, безопасные пляжи. Медицинские услуги доступны, многие врачи говорят по-русски.'
    },
    {
      question: 'Безопасно ли ехать с детьми в Египет?',
      answer: 'Египет безопасен для семейного отдыха в курортных зонах Хургада и Шарм-эль-Шейх. Отели предлагают all inclusive с детскими бассейнами и анимацией. Рекомендуется пить только бутилированную воду.'
    },
    {
      question: 'Какие страны самые безопасные для детей?',
      answer: 'Самые безопасные страны для детей: ОАЭ (Дубай), Сингапур, Мальдивы, Турция (курорты), Таиланд (Пхукет). Высокий уровень безопасности, хорошая медицина, много развлечений.'
    }
  ]
});

const safetyRatings: Record<string, { rating: string; description: string }> = {
  'турция': { rating: 'Высокий', description: 'Курорты безопасны, есть детская медицина, отели с анимацией' },
  'египет': { rating: 'Средний', description: 'Безопасно в курортных зонах, пить только бутилированную воду' },
  'оаэ': { rating: 'Очень высокий', description: 'Один из самых безопасных регионов, отличная медицина' },
  'таиланд': { rating: 'Высокий', description: 'Безопасно на курортах, хорошие клиники, экзотика для детей' },
  'мальдивы': { rating: 'Очень высокий', description: 'Изолированные острова, высокий уровень сервиса, безопасно' },
  'сингапур': { rating: 'Очень высокий', description: 'Один из самых безопасных городов мира, идеален для детей' },
};

export default function SafeKidsPage() {
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Безопасно ли ехать с детьми за границу?',
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
        name: 'Безопасно ли ехать с детьми в Турцию?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, Турция безопасна для семейного отдыха. Отели имеют детские клубы, анимацию, безопасные пляжи.',
        },
      },
      {
        '@type': 'Question',
        name: 'Безопасно ли ехать с детьми в Египет?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Египет безопасен в курортных зонах Хургада и Шарм-эль-Шейх. Отели предлагают all inclusive с детскими бассейнами.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие страны самые безопасные для детей?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Самые безопасные страны для детей: ОАЭ, Сингапур, Мальдивы. Турция и Таиланд также безопасны на курортах.',
        },
      },
    ],
  };

  const safeCountries = [
    WORLD_DESTINATIONS_DATA['оаэ'],
    WORLD_DESTINATIONS_DATA['сингапур'],
    WORLD_DESTINATIONS_DATA['мальдивы'],
    WORLD_DESTINATIONS_DATA['турция'],
    WORLD_DESTINATIONS_DATA['таиланд'],
    WORLD_DESTINATIONS_DATA['египет'],
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SchemaScripts schemas={[voiceFaqSchema, speakableSchema]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Безопасно ли ехать с детьми за границу?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Рейтинг безопасности популярных стран для семейного отдыха
        </p>
      </header>

      {/* Цитируемый ответ для голосового поиска */}
      <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          Самые безопасные страны для детей: ОАЭ, Сингапур, Мальдивы. 
          Турция и Таиланд также безопасны на курортах. Египет безопасен в курортных зонах Хургада и Шарм-эль-Шейх.
        </p>
      </blockquote>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Рейтинг безопасности для детей
        </h2>
        <div className="space-y-4">
          {safeCountries.map((country) => {
            const safety = safetyRatings[country.slug] || { rating: 'Средний', description: 'Общая информация' };
            const ratingColor = safety.rating.includes('Очень') ? 'text-green-600' : safety.rating === 'Высокий' ? 'text-blue-600' : 'text-yellow-600';
            
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
                  <span className={`font-bold ${ratingColor}`}>
                    {safety.rating}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {safety.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    Лучший сезон: {country.bestSeason}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Критерии безопасности для детей
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Медицинские услуги
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Наличие клиник с русскоговорящими врачами, качество медицины, доступность экстренной помощи.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Безопасность курортов
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Уровень преступности, безопасность на пляжах, охрана в отелях, контроль воды и еды.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Детская инфраструктура
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Наличие детских клубов, анимации, детских бассейнов, развлечений для разных возрастов.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Санитарные условия
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Качество воды, гигиена в отелях, безопасность еды, контроль инфекций.
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
              Алиса, безопасно ли ехать с детьми в Турцию?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Да, Турция безопасна для семейного отдыха. Отели имеют детские клубы, анимацию, безопасные пляжи. Медицинские услуги доступны, многие врачи говорят по-русски.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, безопасно ли ехать с детьми в Египет?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Египет безопасен для семейного отдыха в курортных зонах Хургада и Шарм-эль-Шейх. Отели предлагают all inclusive с детскими бассейнами и анимацией. Рекомендуется пить только бутилированную воду.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, какие страны самые безопасные для детей?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Самые безопасные страны для детей: ОАЭ (Дубай), Сингапур, Мальдивы, Турция (курорты), Таиланд (Пхукет). Высокий уровень безопасности, хорошая медицина, много развлечений.
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
