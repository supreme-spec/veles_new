import Link from 'next/link';
import type { Metadata } from 'next';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { SchemaScripts } from '@/components/SchemaScripts';
import { countries } from '@lib/velite-data';

export const metadata: Metadata = generateEnhancedSEOMetadata({
  title: 'Голосовой помощник Велес Вояж: справочник по турам и визам',
  description:
    'Голосовой справочник для Алисы, Siri, Google Ассистента и Маруси. Ответы про визы, цены на туры, можно ли без визы, когда ехать, и как выбрать тур.',
  url: `${SITE_URL}/voice`,
  type: 'website',
  keywords: [
    'голосовой помощник туры',
    'Алиса туризм',
    'Siri путешествия',
    'Гугл ассистент туры',
    'Маруся турагентство',
    'сколько стоит тур',
    'нужна ли виза',
    'без визы 2026',
  ],
});

const voiceFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Нужна ли виза в Турцию для россиян?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Нет, для граждан РФ безвизовый въезд до 60 дней. Въезд по загранпаспорту.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит тур в Турцию на двоих?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Тур на двоих на 7 ночей все включено стоит от 100 000 рублей.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие страны доступны без визы в 2026 году?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Без визы: Турция, Египет, ОАЭ, Таиланд, Мальдивы, Вьетнам, Грузия, Кипр, Индонезия, Шри-Ланка.',
      },
    },
    {
      '@type': 'Question',
      name: 'Как добраться до Дубая из России?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Прямые и стыковочные рейсы Emirates, flydubai, Аэрофлота ежедневно. Организуем трансфер.',
      },
    },
    {
      '@type': 'Question',
      name: 'Безопасно ли путешествовать по Египту?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да. Туристические зоны охраняются. Самостоятельно избегайте дальних пустынь и границ.',
      },
    },
    {
      '@type': 'Question',
      name: 'Когда лучше ехать в Таиланд?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'С ноября по февраль. В этот период сухой сезон и комфортная температура для пляжа.',
      },
    },
    {
      '@type': 'Question',
      name: 'Как выбрать круиз?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Выберите маршрут, длительность и класс лайнера. Мы подберём круиз под бюджет.',
      },
    },
  ],
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Голосовой помощник Велес Вояж',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['#voice-content', '.faq-answer'],
  },
};

export default function VoicePage() {
  const voiceLinks = [
    { href: '/voice/tour-prices', title: 'Цены на туры', desc: 'Сколько стоит поездка на двоих.' },
    { href: '/voice/visa-free', title: 'Без визы', desc: 'Какие страны доступны без визы.' },
    { href: '/voice/visa-month', title: 'Визы по месяцам', desc: 'Когда оформлять визу.' },
    { href: '/voice/documents', title: 'Документы', desc: 'Что нужно для поездки.' },
    { href: '/voice/safe-kids', title: 'Безопасность с детьми', desc: 'Поездки с детьми.' },
    { href: '/voice/kids-winter', title: 'Дети в зимний сезон', desc: 'Отдых с детьми зимой.' },
  ];

  // Popular countries for voice pages
  const popularCountries = countries
    .filter(c => c.slug && c.slug !== 'countries')
    .slice(0, 12)
    .map(c => ({
      href: `/voice/${c.slug}`,
      title: c.title || c.slug,
      desc: `Голосовой справочник по ${c.title || c.slug}`,
    }));

  return (
    <div id="voice-content" className="container mx-auto px-4 max-w-4xl py-12">
      <SchemaScripts schemas={[voiceFaqSchema, speakableSchema]} />

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Голосовой помощник
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          Ответы, которые удобно слушать
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Используйте этот раздел вместе с Алисой, Siri, Google Ассистентом или
          Марусой. Здесь собраны короткие ответы на часто спрашиваемые вопросы.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Быстрые ответы
        </h2>
        <div className="space-y-3" id="voice-faq">
          <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Нужна ли виза в Турцию для россиян?
            </summary>
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 faq-answer">
              Нет, для граждан РФ действует безвизовый режим до 60 дней. Въезд по
              загранпаспорту.
            </div>
          </details>

          <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Сколько стоит тур в Турцию на двоих?
            </summary>
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 faq-answer">
              Тур на двоих на 7 ночей все включено стоит от 100 000 рублей.
            </div>
          </details>

          <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Какие страны доступны без визы в 2026 году?
            </summary>
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 faq-answer">
              Без визы: Турция, Египет, ОАЭ, Таиланд, Мальдивы, Вьетнам, Грузия,
              Кипр, Индонезия, Шри-Ланка.
            </div>
          </details>

          <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Как добраться до Дубая из России?
            </summary>
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 faq-answer">
              Прямые и стыковочные рейсы Emirates, flydubai, Аэрофлота ежедневно.
              Организуем трансфер.
            </div>
          </details>

          <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Безопасно ли путешествовать по Египту?
            </summary>
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 faq-answer">
              Да. Туристические зоны охраняются. Самостоятельно избегайте дальних
              пустынь и границ.
            </div>
          </details>

          <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Когда лучше ехать в Таиланд?
            </summary>
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 faq-answer">
              С ноября по февраль. В этот период сухой сезон и комфортная
              температура для пляжа.
            </div>
          </details>

          <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Как выбрать круиз?
            </summary>
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 faq-answer">
              Выберите маршрут, длительность и класс лайнера. Мы подберём круиз
              под бюджет.
            </div>
          </details>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Голосовые разделы
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {voiceLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-5 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Голосовые справочники по странам
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Доступны голосовые справочники для {countries.length} стран с ответами на вопросы о визах, ценах и лучшем времени для поездки.
        </p>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {popularCountries.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 text-sm"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Голосовой справочник
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link 
            href="/wiki/countries"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            Все страны →
          </Link>
        </div>
      </section>

      <section className="text-center">
        <Link
          href="/contacts"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Задать вопрос менеджеру
        </Link>
      </section>
    </div>
  );
}
