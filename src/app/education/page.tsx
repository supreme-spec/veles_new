import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/SEO/StructuredData';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: 'Обучение туризму: гайды и советы Велес Вояж',
  description: 'Образовательные материалы по туризму от Велес Вояж: путеводители, советы путешественникам, информация о визах, странах и культуре.',
  alternates: {
    canonical: `${SITE_URL}/education`,
    languages: {
      ru: `${SITE_URL}/education`,
      'x-default': `${SITE_URL}/education`,
    },
  },
};

export default function EducationPage() {
  const courses = [
    {
      title: 'Как подготовиться к первому заграничному отдыху',
      description: 'Пошаговая инструкция: от выбора направления до оформления документов.',
      icon: '✈️',
    },
    {
      title: 'Визы и правила въезда 2026',
      description: 'Актуальная информация о безвизовых странах, электронных визах и требованиях для россиян.',
      icon: '🛂',
    },
    {
      title: 'Безопасность в путешествиях',
      description: 'Страхование, правила поведения за границей, экстренные контакты.',
      icon: '🛡️',
    },
    {
      title: 'Как сэкономить на туре',
      description: 'Советы по выбору сезона, сравнению цен и бронированию выгодных туров.',
      icon: '💰',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Где найти информацию о визовых требованиях?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'В разделе Энциклопедия выберите страну и найдите актуальную информацию о визе, правилах въезда и консульских требованиях.'
        }
      },
      {
        '@type': 'Question',
        name: 'Предоставляете ли вы образовательные консультации?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, наши менеджеры бесплатно консультируют по выбору направления, визовым вопросам и подготовке к поездке.'
        }
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Образование и обучение туризму | Велес Вояж',
    description: 'Образовательные материалы по туризму от Велес Вояж: путеводители, советы путешественникам, информация о визах.',
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
      '@id': `${SITE_URL}/education`
    },
    articleSection: 'Обучение',
    keywords: 'обучение туризму, путеводитель, советы путешественникам, визы, подготовка к поездке',
    wordCount: 2500,
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
              🎓 Образовательные материалы по туризму
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Путеводители, советы и актуальная информация для успешного путешествия.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-4xl mb-4">{course.icon}</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{course.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                <Link href="/wiki" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Читать путеводитель →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/wiki" className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
              Перейти в энциклопедию →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
