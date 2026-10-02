import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/SEO/StructuredData';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: 'Новости туризма 2026: акции и направления',
  description: 'Новости туризма 2026 от Велес Вояж: новые направления, акции, изменения в правилах въезда и эксклюзивные предложения для путешественников.',
  alternates: {
    canonical: `${SITE_URL}/news`,
    languages: {
      ru: `${SITE_URL}/news`,
      'x-default': `${SITE_URL}/news`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewsPage() {
  const newsItems = [
    {
      date: '15 июля 2026',
      title: 'Новые туры 2026: Экзотические направления от Велес Вояж',
      excerpt: 'Расширяем список направлений — теперь доступны индивидуальные туры в Африку, Океанию и Южную Америку.',
    },
    {
      date: '1 июля 2026',
      title: 'Рождественские скидки на туры: до 40% на экзотические направления',
      excerpt: 'Специальные предложения на праздничный сезон: Турция, Египет, ОАЭ, Таиланд и Мальдивы.',
    },
    {
      date: '10 июня 2026',
      title: 'Расширение безвизового туризма: Новые страны без визы для россиян',
      excerpt: 'Обновленный список стран с безвизовым режимом для граждан РФ.',
    },
    {
      date: '20 мая 2026',
      title: 'Сезон круизов 2026: Новые маршруты и специальные предложения',
      excerpt: 'Морские круизы по Средиземному морю, Карибам, Балтике и Аляске.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Как подписаться на новости Велес Вояж?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Подпишитесь на наш Telegram-канал @veles_voyage или группу ВКонтакте vk.com/veles__voyage, чтобы получать эксклюзивные предложения и новости о путешествиях.'
        }
      },
      {
        '@type': 'Question',
        name: 'Где можно посмотреть актуальные акции на туры?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Все актуальные акции и спецпредложения публикуются в разделе Новости и в наших социальных сетях.'
        }
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Новости турагентства Велес Вояж | Туризм 2026',
    description: 'Новости туризма 2026 от Велес Вояж: новые направления, акции, изменения в правилах въезда.',
    image: `${SITE_URL}/images/og-default.jpg`,
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
    author: [
      { '@type': 'Organization', name: 'Велес Вояж | Экспертная редакция' },
      { '@type': 'Organization', name: 'Велес Вояж' }
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Велес Вояж',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/news`
    },
    articleSection: 'Новости',
    keywords: 'туры 2026, новости туризма, акции, путешествия, Велес Вояж',
    wordCount: 2000,
    inLanguage: 'ru-RU',
    temporalCoverage: '2026',
    contentReferenceTime: '2026-07-15'
  };

  return (
    <>
      <StructuredData schemas={[articleSchema, faqSchema]} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📰 Новости турагентства Велес Вояж
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Актуальные новости туризма 2026, акции, новые направления и полезные советы для путешественников.
            </p>
          </header>

          <div className="grid gap-8 max-w-4xl mx-auto">
            {newsItems.map((item, index) => (
              <article key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">{item.date}</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.excerpt}</p>
                <Link href="/tours" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Подобрать тур →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/tours" className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
              Смотреть все туры →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
