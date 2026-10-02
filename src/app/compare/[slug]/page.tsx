import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCountryMdxData } from '@/shared/utils/generateCountrySEOMetadata';
import { getCompareGuideBySlug, getAllCompareSlugs } from '@/shared/data/compareGuides';
import { countryNamesDictionary } from '@/shared/data/country-names-dictionary';
import { generateUniversalMetadata, generateUniversalSchemas, generateBreadcrumbSchema } from '@/lib/seo/universalSEO';
import { SchemaScripts } from '@/components/SchemaScripts';
import { ArticleIntro } from '@/shared/components/ui/ArticleIntro';

export async function generateStaticParams() {
  return getAllCompareSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getCompareGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Сравнение направлений | Велес Вояж',
      description: 'Сравнительные гайды по туристическим направлениям от Велес Вояж.',
    };
  }

  return generateUniversalMetadata({
    title: guide.title,
    description: guide.description,
    url: `/compare/${slug}`,
    type: 'guide',
    keywords: [
      guide.countryA,
      guide.countryB,
      `сравнение ${guide.countryA} и ${guide.countryB}`,
      `туры ${guide.countryA}`,
      `туры ${guide.countryB}`,
      `отдых 2026`,
      'Велес Вояж',
      `куда поехать ${guide.countryA} или ${guide.countryB}`,
      `отдых с детьми ${guide.countryA}`,
      `отдых с детьми ${guide.countryB}`,
      `туры для семьи 2026`,
      `сравнение направлений 2026`,
      `что выбрать для отпуска`,
      `виза ${guide.countryA} 2026`,
      `виза ${guide.countryB} 2026`,
    ],
    publishedTime: guide.updatedAt,
    modifiedTime: guide.updatedAt,
    author: 'Велес Вояж | Экспертная редакция',
    faqs: guide.faqs,
  });
}

const ComparePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const guide = getCompareGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const [dataA, dataB] = await Promise.all([
    getCountryMdxData(guide.countryA),
    getCountryMdxData(guide.countryB),
  ]);

  const fmA = dataA?.frontmatter || {};
  const fmB = dataB?.frontmatter || {};

  const nameA = countryNamesDictionary[guide.countryA] || guide.countryA;
  const nameB = countryNamesDictionary[guide.countryB] || guide.countryB;

  const rows = [
    { label: 'Столица', a: fmA.capital || '—', b: fmB.capital || '—' },
    { label: 'Виза', a: typeof fmA.visaRequirements === 'boolean' ? (fmA.visaRequirements ? 'Требуется' : 'Не требуется') : 'Уточняйте', b: typeof fmB.visaRequirements === 'boolean' ? (fmB.visaRequirements ? 'Требуется' : 'Не требуется') : 'Уточняйте' },
    { label: 'Валюта', a: fmA.currency || '—', b: fmB.currency || '—' },
    { label: 'Язык', a: fmA.language || '—', b: fmB.language || '—' },
    { label: 'Лучший сезон', a: fmA.bestTimeToVisit || '—', b: fmB.bestTimeToVisit || '—' },
    { label: 'Средний чек', a: fmA.estimatedCost ? `${fmA.estimatedCost.toLocaleString('ru-RU')} ₽` : 'по запросу', b: fmB.estimatedCost ? `${fmB.estimatedCost.toLocaleString('ru-RU')} ₽` : 'по запросу' },
  ];

  const schemas = [
    ...(await generateUniversalSchemas({
      title: guide.title,
      description: guide.description,
      url: `/compare/${slug}`,
    type: 'guide',
      keywords: [
        guide.countryA,
        guide.countryB,
        `сравнение ${guide.countryA} и ${guide.countryB}`,
        `туры ${guide.countryA}`,
        `туры ${guide.countryB}`,
      ],
      publishedTime: guide.updatedAt,
      modifiedTime: guide.updatedAt,
      author: 'Велес Вояж | Экспертная редакция',
      faqs: guide.faqs,
    })),
    generateBreadcrumbSchema([
      { name: 'Главная', item: '/' },
      { name: 'Сравнения', item: '/compare' },
      { name: guide.title, item: `/compare/${slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "Велес Вояж",
      "description": "Туристическое агентство Велес Вояж — эксперты в организации индивидуальных туров, морских круизов и путешествий по России и миру.",
      "url": `https://veles-voyage.ru/compare/${slug}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Керамиков пр-т, д. 103",
        "addressLocality": "Голицыно",
        "addressRegion": "Московская область",
        "postalCode": "143041",
        "addressCountry": "RU"
      },
      "touristType": ["Туристы", "Семьи с детьми", "Романтические пары"]
    }
  ].filter((schema): schema is object => schema !== null);

  return (
    <div className="container mx-auto px-4 py-8 pt-20 md:pt-24 max-w-5xl">
      <SchemaScripts schemas={schemas} />

      <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-600">Главная</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <Link href="/compare" className="hover:text-blue-600">Сравнения</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <span className="text-gray-800 dark:text-gray-200" aria-current="page">{nameA} vs {nameB}</span>
          </li>
        </ol>
      </nav>

      <main>
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              {guide.title}
            </span>
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {guide.description}
          </p>

          <ArticleIntro
            question={`Что выбрать в 2026: ${nameA} или ${nameB}?`}
            briefAnswer={`Сравниваем ${nameA} и ${nameB}: виза, цены, погода, пляжи, еду и безопасность. Оба направления отлично подходят для отдыха, но есть различия в стоимости, сервисе и инфраструктуре.`}
            detailedAnswer={
              <div className="space-y-3">
                <p>
                  Выбор между {nameA} и {nameB} зависит от ваших приоритетов: бюджета, типа отдыха, компании и сезона. 
                  Ниже — объективное сравнение по ключевым параметрам, чтобы вы могли принять взвешенное решение.
                </p>
                <p>
                  Мы обновили данные за 2026 год: актуальные цены, визовые правила, погодные условия и рекомендации туристов.
                  Используйте таблицу и блоки выводов для быстрого анализа.
                </p>
              </div>
            }
          />

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="text-left font-semibold text-gray-600 dark:text-gray-300 py-3 px-4">Параметр</th>
                  <th className="text-left font-semibold text-blue-700 dark:text-blue-300 py-3 px-4">{nameA}</th>
                  <th className="text-left font-semibold text-purple-700 dark:text-purple-300 py-3 px-4">{nameB}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{row.label}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.a}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">{nameA}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{fmA.description || 'Путеводитель по стране.'}</p>
              <Link href={`/wiki/${guide.countryA}`} className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                Подробнее →
              </Link>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
              <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">{nameB}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{fmB.description || 'Путеводитель по стране.'}</p>
              <Link href={`/wiki/${guide.countryB}`} className="text-purple-600 hover:underline text-sm mt-2 inline-block">
                Подробнее →
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+79850635134" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              📞 +7 985 063-51-34
            </a>
            <a href="https://t.me/veles_voyage" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              ✈️ Написать в Telegram
            </a>
          </div>
        </article>

        <section id="faq" className="scroll-mt-28 mb-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-3xl font-extrabold mb-8 flex items-center gap-3 !mt-0">
            <span className="text-4xl">❓</span> Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            {guide.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="font-bold text-lg mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">Q</span>
                  {faq.question}
                </div>
                <div className="text-gray-600 dark:text-gray-400 pl-8 text-sm">{faq.answer}</div>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 p-6" aria-label="Источники и ссылки">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 Полезные ссылки</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/wiki/${guide.countryA}`} className="text-blue-600 hover:underline">
                Путеводитель по {nameA}
              </Link>
            </li>
            <li>
              <Link href={`/wiki/${guide.countryB}`} className="text-blue-600 hover:underline">
                Путеводитель по {nameB}
              </Link>
            </li>
            <li>
              <Link href="/tours" className="text-blue-600 hover:underline">
                Все туры и направления
              </Link>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default ComparePage;
