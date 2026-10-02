import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { getWikiPages } from '@/shared/data/wikiPages-mdx';
import { generateUniversalSchemas, generateBreadcrumbSchema } from '@/lib/seo/universalSEO';
import { generateFAQSchema } from '@/lib/seo/unifiedSEO';
import { SchemaScripts } from '@/components/SchemaScripts';
import { COUNTRY_COORDINATES } from '@/shared/data/countryCoordinates';

export const revalidate = 3600;

export async function generateStaticParams() {
  const wikiPages = await getWikiPages();
  if (!wikiPages) return [];
  return Object.values(wikiPages).map((page: any) => ({
    country: page.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const wikiPages = await getWikiPages();
  if (!wikiPages) return { title: 'Страница не найдена' };
  
  const countryData = Object.values(wikiPages).find((p: any) => p.id === country);

  if (!countryData) {
    return {
      title: 'Страница не найдена',
    };
  }

  const countryName = countryData?.title?.split('—')[0]?.trim() || country;
  const cleanCountryName = countryName.replace(/\s*\d{4}\s*/g, '').trim();

  return generateSEOMetadata({
    title: `Погода в ${cleanCountryName} 2026 | Велес Вояж`,
    description: `Климат ${cleanCountryName}, температура по месяцам, лучшее время для посещения. Сезонность и рекомендации.`,
    url: `/wiki/${country}/weather`,
    type: 'article',
    keywords: [
      `погода в ${cleanCountryName}`,
      `климат ${cleanCountryName}`,
      `температура ${cleanCountryName}`,
      `лучшее время для поездки в ${cleanCountryName}`,
      `сезоны ${cleanCountryName}`,
      `погода ${cleanCountryName} по месяцам`,
    ],
  });
}

export default async function WeatherPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const wikiPages = await getWikiPages();
  if (!wikiPages) return notFound();
  
  const countryData = Object.values(wikiPages).find((p: any) => p.id === country);

  if (!countryData) {
    notFound();
  }

  const countryName = countryData?.title?.split('—')[0]?.trim() || country;
  const cleanCountryName = countryName.replace(/\s*\d{4}\s*/g, '').trim();
  const bestTime = countryData?.description || 'круглый год';
  const seasons = {};
  const coords = COUNTRY_COORDINATES[country] || { latitude: 0, longitude: 0, countryCode: '' };

  const weatherFaqs = [
    {
      question: `Какое лучшее время для поездки в ${cleanCountryName}?`,
      answer: `Оптимальное время для поездки в ${countryName}: ${bestTime}. Рекомендуем учитывать сезонные особенности и погодные условия при планировании.`
    },
    {
      question: 'Какая погода в разные сезоны?',
      answer: 'Климат меняется в зависимости от сезона. Рекомендуем проверять прогноз погоды перед выездом и брать одежду для разных погодных условий.'
    },
    {
      question: 'Нужно ли учитывать климат при планировании?',
      answer: 'Да, климатические особенности важны для комфортного путешествия. Учитывайте сезонные осадки, температурные режимы и местные особенности.'
    },
    {
      question: 'Как защититься от солнца и осадков?',
      answer: 'В летний период используйте солнцезащитный крем и головной убор. В сезон дождей имейте зонт или водонепроницаемую одежду.'
    }
  ];

  const schemas = [
    ...(await generateUniversalSchemas({
      title: `Погода в ${cleanCountryName} 2026 | Велес Вояж`,
      description: `Климат ${cleanCountryName}, температура по месяцам, лучшее время для посещения. Сезонность и рекомендации.`,
      url: `/wiki/${country}/weather`,
      type: 'article',
      keywords: [
        `погода в ${cleanCountryName}`,
        `климат ${cleanCountryName}`,
        `температура ${cleanCountryName}`,
      ],
      geo: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        countryCode: coords.countryCode,
      },
    })),
    ...(generateBreadcrumbSchema([
      { name: 'Главная', item: '/' },
      { name: 'Энциклопедия', item: '/wiki' },
      { name: countryName, item: `/wiki/${country}` },
      { name: 'Погода', item: `/wiki/${country}/weather` },
    ]) ? [generateBreadcrumbSchema([
      { name: 'Главная', item: '/' },
      { name: 'Энциклопедия', item: '/wiki' },
      { name: countryName, item: `/wiki/${country}` },
      { name: 'Погода', item: `/wiki/${country}/weather` },
    ])] : []),
    generateFAQSchema(weatherFaqs),
  ].filter((schema): schema is object => schema !== null);

  return (
    <div className="container mx-auto px-4 py-8 pt-20 md:pt-24 max-w-4xl">
      <SchemaScripts schemas={schemas} />

      <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <Link href="/wiki" className="hover:text-blue-600">Энциклопедия</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <Link href={`/wiki/${country}`} className="hover:text-blue-600">{countryName}</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <span className="text-gray-800 dark:text-gray-200">Погода</span>
          </li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Погода в {countryName} по месяцам 2026
          </span>
        </h1>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-2">
            🌤️ Лучшее время для посещения
          </h2>
          <p className="text-blue-800 dark:text-blue-200">
            Оптимальное время для поездки в {countryName}: {bestTime}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">
            Сезоны года
          </h2>
          {Object.keys(seasons).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(seasons).map(([season, months]) => (
                <div key={season} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 capitalize">
                    {season}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{months as string}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Информация о сезонах временно недоступна.
            </p>
          )}

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Общий климат
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Климат {countryName} формируется под влиянием географического положения страны.
            Рекомендуем учитывать местные особенности при планировании поездки.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Рекомендации для туристов
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Проверяйте прогноз погоды перед выездом</li>
            <li>• Берите одежду для разных погодных условий</li>
            <li>• Учитывайте сезонные особенности региона</li>
            <li>• Защищайтесь от солнца в летний период</li>
            <li>• Подготовьтесь к возможным осадкам</li>
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Нужна помощь с планированием поездки?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Турагентство Велес Вояж поможет подобрать оптимальное время для поездки в {countryName}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+79850635134"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              📞 +7 985 063-51-34
            </a>
            <a
              href="https://t.me/veles_voyage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              ✈️ Написать в Telegram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={`/wiki/${country}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Вернуться к путеводителю по {countryName}
          </Link>
        </div>
      </div>

      <aside className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 p-6 mb-12" aria-label="Источники и ссылки">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 Полезные ссылки</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href={`https://ru.wikipedia.org/wiki/${encodeURIComponent(countryName)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Wikipedia: {countryName}
            </a>
          </li>
          <li>
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(countryName)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Google Maps: {countryName}
            </a>
          </li>
          <li>
            <a href={`https://www.accuweather.com/ru/${country}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              AccuWeather: Прогноз погоды
            </a>
          </li>
        </ul>
      </aside>

      <section id="faq" className="scroll-mt-28 mb-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-3xl font-extrabold mb-8 flex items-center gap-3 !mt-0">
          <span className="text-4xl">❓</span> Часто задаваемые вопросы
        </h2>
        <div className="space-y-4">
          {weatherFaqs.map((faq: { question: string; answer: string }, idx: number) => (
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
            <a href={`https://ru.wikipedia.org/wiki/${encodeURIComponent(countryName)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Wikipedia: {countryName}
            </a>
          </li>
          <li>
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(countryName)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Google Maps: {countryName}
            </a>
          </li>
          <li>
            <a href={`https://www.timeanddate.com/weather/${encodeURIComponent(countryData?.id || '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Погода в {countryName} (TimeandDate)
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
