import type { Metadata } from 'next';
import Link from 'next/link';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SchemaScripts } from '@/components/SchemaScripts';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Куда поехать в [месяц] без визы из Москвы? Безвизовые страны по месяцам',
  description: 'Куда поехать без визы из Москвы в январе, феврале, марте и другие месяцы 2026 года. Турция, Египет, ОАЭ, Таиланд — лучшие направления без визы. Подбор туров от Велес Вояж.',
  url: `${SITE_URL}/voice/visa-month`,
  type: 'article',
  keywords: [
    'куда поехать в январе без визы',
    'куда поехать в феврале без визы',
    'куда поехать в марте без визы',
    'безвизовые страны из Москвы',
    'отдых без визы по месяцам'
  ],
  faqs: [
    {
      question: 'Куда поехать в январе без визы из Москвы?',
      answer: 'В январе без визы из Москвы можно поехать в Турцию, Египет, ОАЭ, Таиланд, Мальдивы. В этих странах комфортная погода зимой и есть безвизовый режим для россиян.'
    },
    {
      question: 'Куда поехать в феврале без визы?',
      answer: 'В феврале лучшие безвизовые направления: Турция, Египет, ОАЭ, Таиланд, Индонезия. Погода теплая, цены ниже, чем в январе.'
    },
    {
      question: 'Какие страны без визы подходят для зимнего отдыха?',
      answer: 'Для зимнего отдыха без визы идеально подходят: Турция (Анталья, Стамбул), Египет (Хургада, Шарм-эль-Шейх), ОАЭ (Дубай, Абу-Даби), Таиланд (Пхукет, Самуи), Мальдивы.'
    }
  ]
});

const months = [
  'январе', 'феврале', 'марте', 'апреле', 'мае', 'июне',
  'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'
];

const monthDestinations: Record<string, string[]> = {
  'январе': ['турция', 'египет', 'оаэ', 'таиланд', 'мальдивы'],
  'феврале': ['турция', 'египет', 'оаэ', 'таиланд', 'индонезия'],
  'марте': ['турция', 'египет', 'оаэ', 'таиланд', 'мальдивы'],
  'апреле': ['турция', 'египет', 'оаэ', 'таиланд', 'сейшелы'],
  'мае': ['турция', 'египет', 'оаэ', 'таиланд', 'мальдивы'],
  'июне': ['турция', 'египет', 'оаэ', 'таиланд', 'индонезия'],
  'июле': ['турция', 'египет', 'оаэ', 'таиланд', 'мальдивы'],
  'августе': ['турция', 'египет', 'оаэ', 'таиланд', 'индонезия'],
  'сентябре': ['турция', 'египет', 'оаэ', 'таиланд', 'мальдивы'],
  'октябре': ['турция', 'египет', 'оаэ', 'таиланд', 'сейшелы'],
  'ноябре': ['турция', 'египет', 'оаэ', 'таиланд', 'мальдивы'],
  'декабре': ['турция', 'египет', 'оаэ', 'таиланд', 'мальдивы'],
};

export default function VisaMonthPage() {
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Куда поехать без визы из Москвы по месяцам?',
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
        name: 'Куда поехать в январе без визы из Москвы?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'В январе без визы из Москвы можно поехать в Турцию, Египет, ОАЭ, Таиланд, Мальдивы.',
        },
      },
      {
        '@type': 'Question',
        name: 'Куда поехать в феврале без визы?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'В феврале лучшие безвизовые направления: Турция, Египет, ОАЭ, Таиланд, Индонезия.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие страны без визы подходят для зимнего отдыха?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Для зимнего отдыха без визы идеально подходят: Турция, Египет, ОАЭ, Таиланд, Мальдивы.',
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SchemaScripts schemas={[voiceFaqSchema, speakableSchema]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Куда поехать без визы из Москвы по месяцам?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Безвизовые страны для россиян в каждом месяце 2026 года
        </p>
      </header>

      {/* Цитируемый ответ для голосового поиска */}
      <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          В любой месяц года можно поехать без визы в Турцию, Египет, ОАЭ или Таиланд. 
          Зимой лучше всего Египет и ОАЭ, весной и осенью — Турция, летом — Таиланд и Мальдивы.
        </p>
      </blockquote>

      <section className="mb-12">
        {months.map((month) => {
          const destinations = monthDestinations[month] || [];
          const countries = destinations
            .map(slug => {
              const key = Object.keys(WORLD_DESTINATIONS_DATA).find(k => WORLD_DESTINATIONS_DATA[k].slug === slug);
              return key ? WORLD_DESTINATIONS_DATA[key] : null;
            })
            .filter(Boolean);

          return (
            <div key={month} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
                Куда поехать в {month} без визы
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {countries.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/wiki/${country.slug}`}
                    className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {country.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {country.description}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        Без визы
                      </span>
                      <span className="ml-2">
                        Лучший сезон: {country.bestSeason}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, куда поехать в январе без визы?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              В январе без визы из Москвы можно поехать в Турцию, Египет, ОАЭ, Таиланд, Мальдивы. В этих странах комфортная погода зимой и есть безвизовый режим для россиян.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, куда поехать в феврале без визы?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              В феврале лучшие безвизовые направления: Турция, Египет, ОАЭ, Таиланд, Индонезия. Погода теплая, цены ниже, чем в январе.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Алиса, какие страны без визы подходят для зимнего отдыха?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Для зимнего отдыха без визы идеально подходят: Турция (Анталья, Стамбул), Египет (Хургада, Шарм-эль-Шейх), ОАЭ (Дубай, Абу-Даби), Таиланд (Пхукет, Самуи), Мальдивы.
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
