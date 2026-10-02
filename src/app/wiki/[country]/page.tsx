import nextDynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { countries } from '@lib/velite-data';
import {
  InfoBlock,
  FeatureGrid,
  FeatureItem,
  Highlight,
  ResponsiveTable,
  PriceList,
  PriceItem,
  SocialLinks,
  StepList,
  StepItem,
  WikiHero,
  MdxImage,
  H1,
  H2,
  H3,
} from '@/components/mdx/MdxComponents';
import { countryNamesDictionary, getCountryAccusative } from '@/shared/data/country-names-dictionary';
import { generateCountrySEOMetadata } from '@/shared/utils/generateCountrySEOMetadata';
import { generateUniversalMetadata, generateUniversalSchemas } from '@/lib/seo/universalSEO';
import {
  isDisputedTerritory,
  getPoliticalStatus,
  getPoliticalStatusNote,
} from '@/shared/constants/disputedTerritories';
import { SchemaScripts } from '@/components/SchemaScripts';
import { ZkpBadge } from '@/components/ZkpTrustBadge';
import { Breadcrumbs } from '@/components/Breadcrumbs';
const MdxTableOfContents = nextDynamic(
  () => import('@/components/MdxTableOfContents').then((m) => m.MdxTableOfContents)
);
import InteractiveMap from '@/components/mdx/InteractiveMap';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SITE_URL } from '@/shared/constants/seo';
import { TOUR_PRICES_2026 } from '@/constants/pricing';

export const revalidate = 3600;

// CountryMap component using InteractiveMap
const CountryMap = ({ countryName }: any) => (
  <div className="my-6">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      <span className="mr-2">🗺️</span>
      Карта {countryName}
    </h3>
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      <InteractiveMap />
    </div>
  </div>
);

// Рендерим страны на запрос (on-demand), а не пререндерим все 217 MDX-гайдов
// на этапе сборки: статическая компиляция next-mdx-remote/rsc для сотен страниц
// переполняет зону компилятора V8 в воркере сборки и обрывает `next build`.
// SEO сохраняется — страницы отдаются сервером и индексируются.
// export const dynamic = 'force-dynamic';

// Translation dictionary removed as it is no longer used for image searching fallbacks.

// Local components removed in favor of shared ones from MdxComponents.tsx

// Компоненты, доступные в MDX
const components = {
  InfoBlock,
  FeatureGrid,
  FeatureItem,
  Highlight,
  ResponsiveTable,
  PriceList,
  PriceItem,
  SocialLinks,
  CountryMap,
  InteractiveMap,
  WikiHero,
  MdxImage,
  StepList,
  StepItem,
  H1,
  H2,
  H3,
  h1: H1,
  h2: H2,
  h3: H3,
  a: (props: any) => <Link {...props} className="text-blue-600 hover:underline" />,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase();

  try {
    // Сначала пробуем использовать существующую функцию генерации метаданных
    const metadata = await generateCountrySEOMetadata({
      countryId: normalizedCountry,
      url: `https://veles-voyage.ru/wiki/${normalizedCountry}`,
    });

    return metadata;
  } catch (error) {
    console.error(`Error generating SEO metadata for ${normalizedCountry}:`, error);

    const countryData = countries.find(c => c.slug === normalizedCountry);
    if (countryData) {
      const seoOptions: {
        title: string;
        description: string;
        url: string;
        type: 'country';
        geo: { latitude: number; longitude: number };
        keywords: string[];
      } = {
        title: countryData.title || `${normalizedCountry} - путеводитель | Велес Вояж`,
        description: countryData.description || `Подробный путеводитель по ${normalizedCountry}`,
        url: `/wiki/${normalizedCountry}`,
        keywords: Array.isArray(countryData.keywords) ? countryData.keywords.filter((k): k is string => typeof k === 'string') : [],
        type: 'country',
        geo: {
          latitude: countryData.latitude ?? 0,
          longitude: countryData.longitude ?? 0,
        },
      };

      const result: Record<string, unknown> = { ...seoOptions };
      if (countryData.image) result.image = countryData.image;
      if (countryData.datePublished && countryData.datePublished !== 'dynamic') result.publishedTime = countryData.datePublished;
      if (countryData.dateModified && countryData.dateModified !== 'dynamic') result.modifiedTime = countryData.dateModified;
      if (countryData.author) result.author = countryData.author;

      return await generateUniversalMetadata(result as unknown as Parameters<typeof generateUniversalMetadata>[0]);
    }

    return await generateUniversalMetadata({
      title: `${normalizedCountry} - путеводитель | Велес Вояж`,
      description: `Подробный путеводитель по ${normalizedCountry}`,
      url: `/wiki/${normalizedCountry}`,
    });
  }
}

export async function generateStaticParams() {
  try {
    const excludedRoutes = ['countries', 'culture', 'destinations', 'intro', 'places', 'travel-tips'];
    return countries
      .filter(c => !excludedRoutes.includes(c.slug ?? ''))
      .map(c => ({ country: c.slug ?? '' }));
  } catch (error) {
    console.error('[Wiki] Error generating static params:', error);
    return [];
  }
}

async function getCountryContent(country: string) {
  const excludedRoutes = ['countries', 'culture', 'destinations', 'intro', 'places', 'travel-tips'];

  const normalizedCountry = country.toLowerCase();

  if (excludedRoutes.includes(normalizedCountry)) {
    return null;
  }

  try {
    const countryData = countries.find(c => c.slug === normalizedCountry);
    if (!countryData) {
      console.warn(`[Wiki] No Velite data found for: ${normalizedCountry}`);
      return null;
    }

    console.log(`[Wiki] Loading content for: ${normalizedCountry}`);

    const rawContent = countryData.body ?? '';

    try {
      const strippedContent = rawContent.replace(/<div id="faq"[\s\S]*?(?=<hr|$)/, '');
      const { content: compiledContent } = await compileMDX({
        source: strippedContent,
        options: {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypeRaw,
                {
                  passThrough: [
                    'mdxjsEsm',
                    'mdxJsxFlowElement',
                    'mdxJsxTextElement',
                    'mdxTextExpression',
                    'mdxFlowExpression',
                  ],
                },
              ],
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
          },
        },
        components: components as any,
      });
      return { frontmatter: countryData, content: compiledContent };
    } catch (compilationError) {
      console.warn(`[Wiki] MDX compilation warning for ${normalizedCountry}:`, compilationError);
      return {
        frontmatter: countryData,
        content: <div dangerouslySetInnerHTML={{ __html: rawContent }} />,
      };
    }
  } catch (error) {
    console.error(`[Wiki] Error loading content for ${normalizedCountry}:`, error);
    return null;
  }
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const normalizedCountry = country.toLowerCase();
  const countryData = await getCountryContent(normalizedCountry);

  // Парсинг FAQ из фронтматтера (формат: Вопрос|Ответ;;Вопрос|Ответ)
    const faqs =
    countryData?.frontmatter?.faqs && typeof countryData.frontmatter.faqs === 'string'
      ? countryData.frontmatter.faqs
          .split(';;')
          .map((pair: string) => {
            const parts = pair.split('|');
            return {
              question: parts[0]?.trim() || '',
              answer: parts[1]?.trim() || '',
            };
          })
          .filter((f: { question: string; answer: string }) => f.question && f.answer)
      : [];

  // Парсинг ключевых слов
  const rawKeywords = countryData?.frontmatter?.keywords;
  const keywords = Array.isArray(rawKeywords)
    ? rawKeywords.filter((k): k is string => typeof k === 'string')
    : [];

  // Определяем, является ли страна спорной/частично признанной территорией.
  // Для таких страниц используем тип 'territory' (в JSON-LD — "@type": "Place", а не "Country"),
  // чтобы семантически корректно и безопасно для E-E-A-T подавать статус ИИ-поисковикам.
  const disputed = isDisputedTerritory(normalizedCountry);
  const politicalStatus =
    countryData?.frontmatter?.politicalStatus ||
    (disputed ? getPoliticalStatus(normalizedCountry) : undefined);

  // Получаем JSON-LD схемы для SEO с использованием универсальной функции
  const schemaOptions: {
    title: string;
    description: string;
    url: string;
    type: 'country' | 'territory';
    geo: { latitude: number; longitude: number };
    keywords: string[];
    faqs: Array<{ question: string; answer: string }>;
  } = {
    title: countryData?.frontmatter?.title || `${normalizedCountry} - путеводитель | Велес Вояж`,
    description: countryData?.frontmatter?.description || `Подробный путеводитель по ${normalizedCountry}`,
    url: `/wiki/${normalizedCountry}`,
    keywords,
    faqs,
    type: disputed ? 'territory' : 'country',
    geo: {
      latitude: countryData?.frontmatter?.latitude || 0,
      longitude: countryData?.frontmatter?.longitude || 0,
    },
  };

  const baseSchemasResult: Record<string, unknown> = { ...schemaOptions };
  if (countryData?.frontmatter?.image) baseSchemasResult.image = countryData.frontmatter.image;
  if (countryData?.frontmatter?.datePublished && countryData.frontmatter.datePublished !== 'dynamic') baseSchemasResult.publishedTime = countryData.frontmatter.datePublished;
  if (countryData?.frontmatter?.dateModified && countryData.frontmatter.dateModified !== 'dynamic') baseSchemasResult.modifiedTime = countryData.frontmatter.dateModified;
  if (countryData?.frontmatter?.author) baseSchemasResult.author = countryData.frontmatter.author;
  if (politicalStatus) baseSchemasResult.politicalStatus = politicalStatus;

  const baseSchemas = await generateUniversalSchemas(baseSchemasResult as unknown as Parameters<typeof generateUniversalSchemas>[0]);

  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `Туры в ${getCountryAccusative(country)} 2026`,
    description: `Пляжный отдых, ${countryData?.frontmatter?.bestTimeToVisit || 'круглый год'}, лучшие курорты ${getCountryAccusative(country)}.`,
    touristType: 'Пляжный отдых',
    offers: {
      '@type': 'Offer',
      price: String(TOUR_PRICES_2026[normalizedCountry as keyof typeof TOUR_PRICES_2026]?.minPrice ?? countryData?.frontmatter?.estimatedCost ?? 70000),
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/wiki/${normalizedCountry}`,
    },
  };

  const schemas = [
    ...baseSchemas,
    touristTripSchema,
  ];

  if (!countryData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
            {countryNamesDictionary[country] || country}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Контент для этой страны временно недоступен
          </p>
          <Link
            href="/wiki/countries"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Вернуться к списку стран
          </Link>
        </div>
      </div>
    );
  }

  const { content: mdxContent } = countryData;

  return (
    <div className="container mx-auto px-4 max-w-4xl mt-20 md:mt-24">
      {/* Структурированные данные для SEO с универсальным скриптом */}
      <SchemaScripts schemas={schemas} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Энциклопедия', href: '/wiki' },
          { label: countryNamesDictionary[country] || country, href: `/wiki/${country}` },
        ]}
      />

      {/* Table of Contents */}
      <MdxTableOfContents mdxContent={null} compactMode={true} showReadingTime={true} />

      {/* H1 заголовок для SEO */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
        {countryData?.frontmatter?.title?.split(' | ')[0] ||
          countryNamesDictionary[country] ||
          country}
      </h1>

      <ZkpBadge
        subjectId={`wiki/${normalizedCountry}`}
        schema="veles-voyage:wiki-editorial-v1"
        contentText={
          typeof countryData?.content === 'string'
            ? countryData.content
            : countryData?.frontmatter?.description ||
              countryData?.frontmatter?.title ||
              normalizedCountry
        }
        claims={{
          reviewedBy: 'editorial',
          contentSource: 'mdx',
          countryId: normalizedCountry,
        }}
      />

      {/* Верхнее прокручивающееся меню - Оптимизированный адаптивный дизайн */}
      <div className="sticky top-16 md:top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-3 mb-8 -mx-4 px-4 z-[50] shadow-xl">
        <div className="max-w-6xl mx-auto relative group">
          {/* Левый градиент-индикатор (только для мобильных) */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <nav className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-x-visible no-scrollbar scroll-smooth md:justify-center py-1 px-2">
            {[
              { id: 'overview', label: 'Обзор', icon: '🏠' },
              { id: 'history', label: 'История', icon: '🎨' },
              { id: 'geography', label: 'География', icon: '🌍' },
              { id: 'seasons', label: 'Сезоны', icon: '📅' },
              { id: 'visa', label: 'Визы', icon: '🎫' },
              { id: 'transport', label: 'Транспорт', icon: '✈️' },
              { id: 'budget', label: 'Бюджет', icon: '💰' },
              { id: 'food', label: 'Еда', icon: '🍽️' },
              { id: 'attractions', label: 'Места', icon: '🏛️' },
              { id: 'safety', label: 'Правила', icon: '⚠️' },
              { id: 'shopping', label: 'Шоппинг', icon: '🛍️' },
              { id: 'faq', label: 'FAQ', icon: '❓' },
              { id: 'maps', label: 'Карты', icon: '🗺️' },
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-xs md:text-sm bg-gray-50/80 dark:bg-gray-800/80 hover:bg-blue-600 dark:hover:bg-blue-600 text-gray-700 dark:text-gray-200 hover:text-white font-bold rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 whitespace-nowrap shadow-sm hover:shadow-md active:scale-95"
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Правый градиент-индикатор (только для мобильных) */}
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none opacity-100 transition-opacity"></div>
        </div>
      </div>

      {/* Контекст политического статуса для спорных/частично признанных территорий (E-E-A-T) */}
      {disputed && politicalStatus && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg">
          <p className="text-sm text-amber-900 dark:text-amber-200">
            <strong>Политический статус:</strong> {politicalStatus}.{' '}
            {getPoliticalStatusNote(normalizedCountry)}
          </p>
        </div>
      )}

      {/* Цитируемый ответ для AI-ботов */}
      {(() => {
        const destData =
          WORLD_DESTINATIONS_DATA[
            Object.keys(WORLD_DESTINATIONS_DATA).find(
              key =>
                WORLD_DESTINATIONS_DATA[key].slug === normalizedCountry ||
                WORLD_DESTINATIONS_DATA[key].name.toLowerCase() ===
                  (countryNamesDictionary[country] || country).toLowerCase()
            ) || ''
          ];

        if (!destData) return null;

        const visaInfo =
          destData.visaRequired !== false ? 'виза требуется' : 'виза не нужна (до 60 дней)';
        const bestSeason = destData.bestSeason || 'круглый год';
        const priceRange = destData.estimatedCost || '100 000';

        return (
          <blockquote className="ai-citable mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-green-500 rounded-r-lg">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              Для поездки в {destData.nameAccusative || destData.name} в 2026 году {visaInfo}.
              Средний бюджет тура «всё включено» из Москвы на двоих — от {priceRange} ₽ за 7 ночей.
              Лучший сезон: {bestSeason}.
            </p>
          </blockquote>
        );
      })()}

      {/* Быстрый голосовой ответ */}
      {(() => {
        const destData =
          WORLD_DESTINATIONS_DATA[
            Object.keys(WORLD_DESTINATIONS_DATA).find(
              key =>
                WORLD_DESTINATIONS_DATA[key].slug === normalizedCountry ||
                WORLD_DESTINATIONS_DATA[key].name.toLowerCase() ===
                  (countryNamesDictionary[country] || country).toLowerCase()
            ) || ''
          ];

        if (!destData) return null;

        const visaInfo =
          destData.visaRequired !== false
            ? `Для поездки в ${destData.nameAccusative || destData.name} россиянам нужна виза.`
            : `Для поездки в ${destData.nameAccusative || destData.name} виза россиянам не нужна. Вы можете находиться в стране до 60 дней без визы.`;
        const bestSeason = destData.bestSeason || 'круглый год';

        return (
          <div className="voice-answer mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-purple-500 rounded-r-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎙️</span>
              <h3 className="font-semibold text-gray-900 dark:text-white">Голосовой ответ:</h3>
            </div>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {visaInfo} Лучший сезон для посещения: {bestSeason}. Рекомендуем бронировать тур
              заранее для лучших цен.
            </p>
          </div>
        );
      })()}

      {/* TL;DR + сводная таблица (AEO/SEO: структурированный ответ для сниппетов) */}
      <section
        id="tldr"
        className="direct-answer mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-blue-100 dark:border-gray-700"
      >
        <div id="speakable-summary">
          <h2 className="text-2xl font-extrabold mb-3 flex items-center gap-2 !mt-0">
            <span className="text-3xl">⚡</span> Краткий ответ:{' '}
            {countryData?.frontmatter?.title?.split(' | ')[0] ||
              countryNamesDictionary[country] ||
              country}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
            {typeof countryData?.frontmatter?.visaRequirements === 'boolean'
              ? countryData.frontmatter.visaRequirements
                ? 'Виза требуется. '
                : 'Виза не требуется (по прибытии или безвизовый въезд). '
              : ''}
            {countryData?.frontmatter?.currency
              ? `Валюта — ${countryData.frontmatter.currency}. `
              : ''}
            {countryData?.frontmatter?.bestTimeToVisit
              ? `Лучший сезон: ${countryData.frontmatter.bestTimeToVisit}. `
              : ''}
            {countryData?.frontmatter?.estimatedCost
              ? (() => {
                  const price = countryData.frontmatter.estimatedCost;
                  return !price
                    ? 'Средний чек: по запросу. '
                    : `Средний чек: от ${price.toLocaleString('ru-RU')} ₽. `;
                })()
              : ''}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {(countryData?.frontmatter?.capital && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Столица
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">
                      {countryData.frontmatter.capital}
                    </td>
                  </tr>
                )) ||
                  null}
                {(typeof countryData?.frontmatter?.visaRequirements === 'boolean' && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Виза
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">
                      {countryData.frontmatter.visaRequirements ? 'Требуется' : 'Не требуется'}
                    </td>
                  </tr>
                )) ||
                  null}
                {(countryData?.frontmatter?.currency && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Валюта
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">
                      {countryData.frontmatter.currency}
                    </td>
                  </tr>
                )) ||
                  null}
                {(countryData?.frontmatter?.language && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Язык
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">
                      {countryData.frontmatter.language}
                    </td>
                  </tr>
                )) ||
                  null}
                {(countryData?.frontmatter?.bestTimeToVisit && (
                  <tr className="border-b border-blue-100 dark:border-gray-700">
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Лучший сезон
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">
                      {countryData.frontmatter.bestTimeToVisit}
                    </td>
                  </tr>
                )) ||
                  null}
                {(countryData?.frontmatter?.estimatedCost && (
                  <tr>
                    <th className="text-left font-semibold text-gray-600 dark:text-gray-400 py-2 pr-4 whitespace-nowrap">
                      Средний чек
                    </th>
                    <td className="text-gray-900 dark:text-white py-2">
                      {(() => {
                        const price = countryData.frontmatter.estimatedCost;
                        return !price
                          ? 'По запросу'
                          : `от ${price.toLocaleString('ru-RU')} ₽`;
                      })()}
                    </td>
                  </tr>
                )) ||
                  null}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* E-E-A-T: автор и дата обновления */}
      {(countryData?.frontmatter?.author || countryData?.frontmatter?.dateModified) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
          {countryData?.frontmatter?.author && (
            <span>
              ✍️ Автор:{' '}
              <strong className="text-gray-700 dark:text-gray-200">
                {countryData.frontmatter.author}
              </strong>
            </span>
          )}
          {countryData?.frontmatter?.dateModified &&
            countryData.frontmatter.dateModified !== 'dynamic' && (
              <span>🕒 Обновлено: {countryData.frontmatter.dateModified}</span>
            )}
          {countryData?.frontmatter?.datePublished &&
            countryData.frontmatter.datePublished !== 'dynamic' && (
              <span>📅 Опубликовано: {countryData.frontmatter.datePublished}</span>
            )}
        </div>
      )}

      {/* Основной контент с MDX */}
      <article className="prose prose-lg max-w-none dark:prose-invert">{mdxContent}</article>

      {/* People Also Ask (PAA) — AEO-блок вопросов-связок */}
      {faqs.length > 0 && (
        <section id="paa" className="scroll-mt-28 mb-12">
          <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-3 !mt-0">
            <span className="text-3xl">🔎</span> Люди также спрашивают
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {faqs.map((faq: { question: string; answer: string }, idx: number) => (
              <li key={idx}>
                <details open={false} className="group bg-white dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-3">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-gray-900 dark:text-white font-medium">
                    <span>{faq.question}</span>
                    <span className="ml-3 text-blue-600 dark:text-blue-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm faq-answer" data-speakable="true">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Внутренняя перелинковка — Hub & Spoke */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🔗 Связанные разделы
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/wiki/places"
            className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition"
          >
            Ключевые места мира
          </Link>
          <Link
            href="/cities"
            className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition"
          >
            Города вылета
          </Link>
          <Link
            href="/wiki/countries"
            className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition"
          >
            Все страны
          </Link>
          <Link
            href="/tours"
            className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition"
          >
            Туры и направления
          </Link>
        </div>
      </div>

      {/* Связанные страны для Internal Linking */}
      {countryData?.frontmatter?.relatedCountries &&
        countryData.frontmatter.relatedCountries.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-green-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🌍 Похожие страны
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {countryData.frontmatter.relatedCountries.map((relatedCountry: string) => (
                <Link
                  key={relatedCountry}
                  href={`/wiki/${relatedCountry.toLowerCase()}`}
                  className="px-4 py-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-green-400 hover:shadow-md transition text-center"
                >
                  {relatedCountry}
                </Link>
              ))}
            </div>
          </div>
        )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/wiki/countries"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Вернуться к списку стран
        </Link>
      </div>

      {/* CTA: Подобрать тур */}
      <section className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-white mb-3">
          Подберём тур в {getCountryAccusative(country)} под ваш бюджет
        </h3>
        <p className="text-blue-100 mb-4">
          Оставьте заявку и наш менеджер свяжется с вами в течение 15 минут
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Посмотреть туры
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center bg-transparent hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors border-2 border-white"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
}
