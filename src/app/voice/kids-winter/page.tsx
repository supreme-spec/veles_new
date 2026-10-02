import type { Metadata } from 'next';
import Link from 'next/link';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SchemaScripts } from '@/components/SchemaScripts';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Куда поехать с детьми зимой 2026? Лучшие направления для семейного отдыха',
  description: 'Топ направлений для семейного отдыха с детьми зимой: ОАЭ, Египет, Таиланд, Сингапур, Индонезия. Теплое море, развлечения, безопасность. Подбор туров от Велес Вояж.',
  url: `${SITE_URL}/voice/kids-winter`,
  type: 'article',
  keywords: [
    'куда поехать с детьми зимой',
    'семейный отдых зимой',
    'отдых с детьми в декабре',
    'отдых с детьми в январе',
    'теплые страны зимой с детьми'
  ],
  faqs: [
    {
      question: 'Куда поехать с детьми зимой 2026?',
      answer: 'Лучшие направления для семейного отдыха зимой: ОАЭ (Дубай, Абу-Даби с парками развлечений), Египет (Хургада, Шарм-эль-Шейх с отелями all inclusive), Таиланд (Пхукет, Самуи с пляжами и экскурсиями), Сингапур (много аттракций для детей), Индонезия (Бали с культурными программами).'
    },
    {
      question: 'Безопасно ли ехать с детьми в Египет зимой?',
      answer: 'Да, Египет зимой безопасен для семейного отдыха. Лучшие курорты Хургада и Шарм-эль-Шейх предлагают отели с детскими клубами, анимацией и безопасными пляжами.'
    },
    {
      question: 'Какое лучшее время для поездки в ОАЭ с детьми?',
      answer: 'Зима (ноябрь-март) — идеальное время для ОАЭ. Комфортная температура 20-30°C, много развлечений: парки, аквапарки, зоопарки, океанариумы.'
    }
  ]
});

export default function KidsWinterPage() {
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Куда поехать с детьми зимой 2026?',
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
        name: 'Куда поехать с детьми зимой 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Лучшие направления для семейного отдыха зимой: ОАЭ, Египет, Таиланд, Сингапур, Индонезия.',
        },
      },
      {
        '@type': 'Question',
        name: 'Безопасно ли ехать с детьми в Египет зимой?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, Египет зимой безопасен для семейного отдыха. Лучшие курорты Хургада и Шарм-эль-Шейх.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какое лучшее время для поездки в ОАЭ с детьми?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Зима, с ноября по март, идеальна для ОАЭ. Комфортная температура 20-30 градусов.',
        },
      },
    ],
  };

  // Countries good for winter with kids
  const kidsWinterCountries = [
    WORLD_DESTINATIONS_DATA['оаэ'],
    WORLD_DESTINATIONS_DATA['египет'],
    WORLD_DESTINATIONS_DATA['таиланд'],
    WORLD_DESTINATIONS_DATA['сингапур'],
    WORLD_DESTINATIONS_DATA['индонезия'],
    WORLD_DESTINATIONS_DATA['мальдивы'],
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SchemaScripts schemas={[voiceFaqSchema, speakableSchema]} />
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Куда поехать с детьми зимой 2026?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Лучшие направления для семейного отдыха с детьми в зимний сезон
        </p>
      </header>

      {/* Цитируемый ответ для голосового поиска */}
      <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          Лучшие направления для семейного отдыха зимой: ОАЭ (Дубай с парками развлечений), Египет (отели all inclusive с детскими клубами), Таиланд (Пхукет с безопасными пляжами), Сингапур (много аттракций для детей).
        </p>
      </blockquote>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Топ направлений для семейного отдыха зимой
        </h2>
        <div className="grid gap-6">
          {kidsWinterCountries.map((country) => (
            <Link
              key={country.slug}
              href={`/wiki/${country.slug}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">
                {country.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {country.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  Лучший сезон: {country.bestSeason}
                </span>
                <span className="ml-2">
                  Полет из Москвы: {country.flightTimeFromMoscow}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Почему эти страны подходят для детей зимой?
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              ОАЭ (Дубай, Абу-Даби)
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Много парков развлечений: Legoland, Ferrari World, Aquaventure. Безопасные пляжи, отели с детскими клубами, анимация.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Египет (Хургада, Шарм-эль-Шейх)
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Отели all inclusive с детскими бассейнами, мини-клубами, анимацией. Теплое море, безопасные пляжи, экскурсии.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Таиланд (Пхукет, Самуи)
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Экзотика, безопасные пляжи, детская кухня, экскурсии на слонах, в зоопарках. Доступные цены.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Сингапур
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Один из самых безопасных городов мира. Oceanarium, Bird Park, Night Safari, Universal Studios. Идеально для детей.
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
