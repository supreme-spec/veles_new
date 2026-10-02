import type { Metadata } from 'next';
import Link from 'next/link';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SchemaScripts } from '@/components/SchemaScripts';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Куда поехать без визы в 2026 году? Список стран для россиян',
  description: 'Полный список стран без визового режима для россиян в 2026 году. Турция, Египет, ОАЭ, Таиланд, Мальдивы и другие направления. Подбор туров от Велес Вояж.',
  url: `${SITE_URL}/voice/visa-free`,
  type: 'article',
  keywords: [
    'куда поехать без визы',
    'безвизовые страны для россиян 2026',
    'туры без визы',
    'отдых без визы',
    'страны без визового режима'
  ],
  faqs: [
    {
      question: 'В какие страны можно поехать без визы в 2026 году?',
      answer: 'В 2026 году россияне могут посетить без визы более 50 стран, включая Турцию (до 60 дней), Египет (виза по прилете), ОАЭ (до 90 дней), Таиланд (до 60 дней), Мальдивы (до 30 дней), Сингапур (до 96 часов транзит) и многие другие.'
    },
    {
      question: 'Нужна ли виза в Турцию для россиян?',
      answer: 'Нет, для граждан РФ действует безвизовый режим на срок до 60 дней (с возможностью продления через выезд и въезд). Въезд возможен по загранпаспорту.'
    },
    {
      question: 'Какие страны самые популярные для безвизового отдыха?',
      answer: 'Самые популярные безвизовые направления: Турция, Египет, ОАЭ, Таиланд, Мальдивы, Вьетнам (до 15 дней), Индонезия (до 30 дней), Сейшелы (до 30 дней).'
    }
  ]
});

export default function VisaFreePage() {
  // Filter countries without visa requirement
  const visaFreeCountries = Object.entries(WORLD_DESTINATIONS_DATA)
    .filter(([_, data]) => data.visaRequired === false)
    .map(([_, data]) => data)
    .sort((a, b) => a.name.localeCompare(b.name));

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Куда поехать без визы в 2026 году?',
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
        name: 'В какие страны можно поехать без визы в 2026 году?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'В 2026 году россияне могут посетить без визы более 50 стран, включая Турцию (до 60 дней), Египет (виза по прилете), ОАЭ (до 90 дней), Таиланд (до 60 дней), Мальдивы (до 30 дней), Вьетнам, Грузию, Кипр, Индонезию, Шри-Ланку.',
        },
      },
      {
        '@type': 'Question',
        name: 'Нужна ли виза в Турцию для россиян?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Нет, для граждан РФ действует безвизовый режим на срок до 60 дней (с возможностью продления через выезд и въезд). Въезд возможен по загранпаспорту.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие страны самые популярные для безвизового отдыха?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Самые популярные безвизовые направления: Турция, Египет, ОАЭ, Таиланд, Мальдивы, Вьетнам, Индонезия, Сейшелы.',
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SchemaScripts schemas={[voiceFaqSchema, speakableSchema]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Куда поехать без визы в 2026 году?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Полный список стран для россиян с безвизовым въездом
        </p>
      </header>

      {/* Цитируемый ответ для голосового поиска */}
      <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          В 2026 году россияне могут посетить без визы более 50 стран. 
          Самые популярные направления: Турция (до 60 дней), Египет (виза по прилете за $25), ОАЭ (до 90 дней), Таиланд (до 60 дней), Мальдивы (до 30 дней).
        </p>
      </blockquote>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Популярные страны без визы
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {visaFreeCountries.map((country) => (
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
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Нужна ли виза в Турцию для россиян?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Нет, для граждан РФ действует безвизовый режим на срок до 60 дней (с возможностью продления через выезд и въезд). Въезд возможен по загранпаспорту.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Нужна ли виза в Египет?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Виза оформляется по прилете в аэропорту за $25 или заранее через электронную визу.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Сколько дней можно находиться в ОАЭ без визы?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Для граждан РФ безвизовый въезд на срок до 90 дней.
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
