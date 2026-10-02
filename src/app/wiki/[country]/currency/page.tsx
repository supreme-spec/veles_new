import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWikiPages } from '@/shared/data/wikiPages-mdx';
import { generateUniversalMetadata, generateUniversalSchemas, generateBreadcrumbSchema } from '@/lib/seo/universalSEO';
import { generateFAQSchema } from '@/lib/seo/unifiedSEO';
import { SchemaScripts } from '@/components/SchemaScripts';
import { getCountryMdxData } from '@/shared/utils/generateCountrySEOMetadata';
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
  const mdxData = await getCountryMdxData(country);
  const cleanCountryName = countryName.replace(/\s*\d{4}\s*/g, '').trim();
  const simpleCountryName = cleanCountryName.includes(':') ? (cleanCountryName.split(':')[0] || cleanCountryName).trim() : cleanCountryName;
  const currency = mdxData?.frontmatter?.currency || 'местная валюта';

  return generateUniversalMetadata({
    title: `Валюта ${simpleCountryName}: курс и обмен | Велес Вояж 2026`,
    description: `Национальная валюта ${simpleCountryName} - ${currency}. Курс к рублю, где обменять, использование карт, чаевые и финансовые советы.`,
    url: `/wiki/${country}/currency`,
    type: 'article',
    keywords: [
      `валюта ${cleanCountryName}`,
      `курс ${cleanCountryName} к рублю`,
      `деньги ${cleanCountryName}`,
      `обмен валюты ${cleanCountryName}`,
      `карты в ${cleanCountryName}`,
      `чаевые ${cleanCountryName}`,
      `финансы ${cleanCountryName}`,
    ],
  });
}

const getCurrencyFaqs = (countryName: string, currencyCode?: string) => {
  const cleanCountryName = countryName.replace(/\s*\d{4}\s*/g, '').trim();
  const isRubleCurrency = currencyCode?.toLowerCase().includes('rub') || currencyCode?.toLowerCase().includes('рубл');
  
  return [
    {
      question: `Какая валюта используется в ${countryName}?`,
      answer: `Официальная валюта ${cleanCountryName}: ${currencyCode || 'местная валюта'}.${isRubleCurrency ? '' : ' Рекомендуем обменять валюту в банках или официальных обменниках для получения выгодного курса.'}`
    },
  {
    question: 'Где лучше обменять валюту?',
    answer: 'Лучше обменивать валюту в официальных банках или лицензированных обменниках. Избегайте обмена в аэропортах и отелях — курс обычно невыгодный. Всегда сохраняйте чеки об обмене.'
  },
  {
    question: 'Принимают ли банковские карты?',
    answer: isRubleCurrency
      ? 'В России карты иностранных банков (Visa, Mastercard, American Express) не работают. Используйте карты системы «Мир» или наличные рубли. Карты UnionPay работают ограниченно. Уведомите свой банк о поездке заранее.'
      : 'Карты Visa и Mastercard работают в большинстве мест, но всегда имейте наличные для мелких расходов. Уведомите банк о поездке заранее и проверьте комиссии за международные операции.'
  },
  {
    question: 'Нужно ли оставлять чаевые?',
    answer: 'Чаевые не обязательны, но приветствуются. В ресторанах обычно оставляют 5-10% от счета, в такси — округление до удобной суммы, в гостиницах — 1-2 USD за ночь.'
  }
  ];
};

export default async function CurrencyPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const wikiPages = await getWikiPages();
  if (!wikiPages) return notFound();
  
  const countryData = Object.values(wikiPages).find((p: any) => p.id === country);

  if (!countryData) {
    notFound();
  }

  const countryName = countryData?.title?.split('—')[0]?.trim() || country;
  const mdxData = await getCountryMdxData(country);
  const cleanCountryName = countryName.replace(/\s*\d{4}\s*/g, '').trim();
  const simpleCountryName = cleanCountryName.includes(':') ? (cleanCountryName.split(':')[0] || cleanCountryName).trim() : cleanCountryName;
  const currency = mdxData?.frontmatter?.currency || 'местная валюта';
  const isRubleCurrency = currency.toLowerCase().includes('rub') || currency.toLowerCase().includes('рубл');
  const faqs = getCurrencyFaqs(countryName, currency);
  const coords = COUNTRY_COORDINATES[country] || { latitude: 0, longitude: 0, countryCode: '' };

  const schemas = [
    ...(await generateUniversalSchemas({
      title: `Валюта ${cleanCountryName} 2026 | Велес Вояж`,
      description: `Национальная валюта ${cleanCountryName}, курс к рублю, где обменять, использование карт, чаевые и финансовые советы.`,
      url: `/wiki/${country}/currency`,
      type: 'article',
      keywords: [
        `валюта ${cleanCountryName}`,
        `курс ${cleanCountryName} к рублю`,
        `деньги ${cleanCountryName}`,
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
      { name: 'Валюта', item: `/wiki/${country}/currency` },
    ]) ? [generateBreadcrumbSchema([
      { name: 'Главная', item: '/' },
      { name: 'Энциклопедия', item: '/wiki' },
      { name: countryName, item: `/wiki/${country}` },
      { name: 'Валюта', item: `/wiki/${country}/currency` },
    ])] : []),
    generateFAQSchema(faqs),
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
            <span className="text-gray-800 dark:text-gray-200" aria-current="page">Валюта</span>
          </li>
        </ol>
      </nav>

      <main>
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Валюта {simpleCountryName}: курс и обмен 2026
            </span>
          </h1>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 mb-8">
            <h2 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
              💰 Национальная валюта
            </h2>
            <p className="text-green-800 dark:text-green-200">
              Официальная валюта {countryName}: {currency}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">
              Обмен валюты
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-8">
              {isRubleCurrency ? (
                <>
                  <li>• На территории страны используется российский рубль (RUB) — это местная валюта</li>
                  <li>• Для иностранных туристов: обмен иностранной валюты на рубли в банках или официальных обменниках</li>
                  <li>• Избегайте обмена в аэропортах и отелях (неблагоприятный курс)</li>
                  <li>• Проверяйте актуальный курс перед обменом</li>
                  <li>• Сохраняйте чеки об обмене валюты</li>
                </>
              ) : (
                <>
                  <li>• Обменяйте валюту в банках или официальных обменниках по прибытии</li>
                  <li>• Избегайте обмена в аэропортах и отелях (неблагоприятный курс)</li>
                  <li>• Проверяйте актуальный курс перед обменом</li>
                  <li>• Сохраняйте чеки об обмене валюты</li>
                  <li>• Используйте карты для крупных покупок</li>
                </>
              )}
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Использование банковских карт
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-8">
              {isRubleCurrency ? (
                <>
                  <li>• Карты иностранных банков (Visa, Mastercard, American Express) в России не работают</li>
                  <li>• Используйте карты системы «Мир» или наличные рубли</li>
                  <li>• Карты UnionPay работают ограниченно</li>
                  <li>• Уведомите свой банк о поездке заранее</li>
                  <li>• Имейте наличные для мелких расходов</li>
                </>
              ) : (
                <>
                  <li>• Карты Visa и Mastercard работают в большинстве мест</li>
                  <li>• Уведомите банк о поездке заранее</li>
                  <li>• Имейте наличные для мелких расходов</li>
                  <li>• Проверьте комиссии за международные операции</li>
                  <li>• Используйте карты с бесконтактной оплатой</li>
                </>
              )}
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Чаевые
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-8">
              <li>• Чаевые не обязательны, но приветствуются</li>
              <li>• В ресторанах: 5-10% от счета</li>
              <li>• Такси: округление до удобной суммы</li>
              <li>• Гостиницы: 1-2 USD за ночь</li>
              <li>• Гиды: 5-10 USD за день</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Финансовые советы
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Имейте несколько способов оплаты (карта + наличные)</li>
              <li>• Храните деньги в разных местах</li>
              <li>• Используйте сейф в отеле для хранения ценностей</li>
              <li>• Делайте копии карт и документов</li>
              <li>• Проверьте лимиты на снятие наличных</li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Нужна помощь с планированием бюджета?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Турагентство Велес Вояж поможет рассчитать бюджет поездки в {countryName}.
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
        </article>

        <section id="faq" className="scroll-mt-28 mb-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-3xl font-extrabold mb-8 flex items-center gap-3 !mt-0">
            <span className="text-4xl">❓</span> Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            {faqs.map((faq: { question: string; answer: string }, idx: number) => (
              <div key={idx} className="p-4 bg-white dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="font-bold text-lg mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs">Q</span>
                  {faq.question}
                </div>
                <div className="text-gray-600 dark:text-gray-400 pl-8 text-sm faq-answer" data-speakable="true">{faq.answer}</div>
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
              <a href={`https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=${encodeURIComponent(countryData?.id || '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Курс рубля к {currency}
              </a>
            </li>
            <li>
              <a href={`https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/${encodeURIComponent(countryName)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Государственный департамент США: {countryName}
              </a>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
