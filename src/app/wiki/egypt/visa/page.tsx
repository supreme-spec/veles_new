import Link from 'next/link';
import type { Metadata } from 'next';
import { generateUniversalMetadata, generateUniversalSchemas, generateBreadcrumbSchema } from '@/lib/seo/universalSEO';
import { generateFAQSchema } from '@/lib/seo/unifiedSEO';
import { SchemaScripts } from '@/components/SchemaScripts';
import { getCountryMdxData } from '@/shared/utils/generateCountrySEOMetadata';
import { COUNTRY_COORDINATES } from '@/shared/data/countryCoordinates';

export const revalidate = 3600;

const VISA_FAQS_REQUIRED = [
  {
    question: 'Нужна ли виза для россиян в 2026 году?',
    answer: 'Для въезда в Египет гражданам РФ требуется виза. Оформление возможно через консульство или визовый центр. Точные требования и сроки уточняйте у менеджера Велес Вояж.'
  },
  {
    question: 'Какие документы нужны для оформления визы?',
    answer: 'Загранпаспорт (действителен минимум 6 месяцев после даты въезда), заполненная визовая анкета, фотографии, копия загранпаспорта, медицинская страховка, бронь отеля или приглашение, билеты в обе стороны, справка с работы о доходах.'
  },
  {
    question: 'Сколько времени занимает оформление визы?',
    answer: 'Срок оформления зависит от консульства и типа визы. Стандартно — от 5 до 30 рабочих дней. Рекомендуется подавать документы за 1-2 месяца до поездки.'
  },
  {
    question: 'Можно ли оформить визу самостоятельно или нужен посредник?',
    answer: 'Визу можно оформить самостоятельно через консульство, но мы рекомендуем обратиться в турагентство Велес Вояж для консультации и помощи с оформлением. Это сэкономит вам время и снимет риски отказа.'
  }
];

const VISA_FAQS_NOT_REQUIRED = [
  {
    question: 'Нужна ли виза для россиян в 2026 году?',
    answer: 'Для въезда в Египет гражданам РФ виза не требуется. Достаточно действующего загранпаспорта и обратных билетов. При въезде могут спросить подтверждение достаточного количества средств и бронь отеля.'
  },
  {
    question: 'Сколько можно находиться в стране без визы?',
    answer: 'Срок безвизового пребывания обычно составляет от 30 до 90 дней. Точный лимит и условия уточняйте при планировании поездки.'
  },
  {
    question: 'Какие документы нужны при безвизовом въезде?',
    answer: 'Загранпаспорт (действителен минимум 6 месяцев после даты въезда), обратные билеты, бронь отеля, медицинская страховка. Рекомендуем также иметь при себе подтверждение достаточных средств.'
  },
  {
    question: 'Можно ли продлить пребывание?',
    answer: 'В некоторых странах пребывание можно продлить через местное иммиграционное управление. О возможности и порядке продления уточняйте у менеджеров Велес Вояж.'
  }
];

export async function generateMetadata(): Promise<Metadata> {
  return generateUniversalMetadata({
    title: `Виза в Египет для россиян 2026 | Велес Вояж`,
    description: `Нужна ли виза в Египет для россиян? Требования, документы, сроки оформления, стоимость.`,
    url: `/wiki/egypt/visa`,
    type: 'article',
    keywords: [
      `виза в Египет`,
      `виза Египет для россиян`,
      `безвиз Египет`,
      `документы для визы Египет`,
      `оформить визу Египет`,
      `стоимость визы Египет`,
    ],
  });
}

export default async function EgyptVisaPage() {
  const mdxData = await getCountryMdxData('egypt');
  const visaRequired = mdxData?.frontmatter?.visaRequirements ?? true;
  const faqs = visaRequired ? VISA_FAQS_REQUIRED : VISA_FAQS_NOT_REQUIRED;
  const coords = COUNTRY_COORDINATES['egypt'] || { latitude: 0, longitude: 0, countryCode: '' };

  const schemas = [
    ...(await generateUniversalSchemas({
      title: `Виза в Египет для россиян 2026 | Велес Вояж`,
      description: `Нужна ли виза в Египет для россиян? Требования, документы, сроки оформления, стоимость.`,
      url: `/wiki/egypt/visa`,
      type: 'article',
      keywords: [
        `виза в Египет`,
        `виза Египет для россиян`,
        `безвиз Египет`,
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
      { name: 'Египет', item: '/wiki/egypt' },
      { name: 'Виза', item: '/wiki/egypt/visa' },
    ]) ? [generateBreadcrumbSchema([
      { name: 'Главная', item: '/' },
      { name: 'Энциклопедия', item: '/wiki' },
      { name: 'Египет', item: '/wiki/egypt' },
      { name: 'Виза', item: '/wiki/egypt/visa' },
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
            <Link href="/wiki/egypt" className="hover:text-blue-600">Египет</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1 md:mx-2 text-gray-400">/</span>
            <span className="text-gray-800 dark:text-gray-200" aria-current="page">Виза</span>
          </li>
        </ol>
      </nav>

      <main>
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Виза в Египет для россиян 2026
            </span>
          </h1>

          {visaRequired ? (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 mb-8">
              <h2 className="text-xl font-bold text-red-900 dark:text-red-300 mb-2">
                🛂 Виза требуется
              </h2>
              <p className="text-red-800 dark:text-red-200">
                Для въезда в Египет гражданам РФ требуется виза.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 mb-8">
              <h2 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
                ✅ Безвизовый въезд
              </h2>
              <p className="text-green-800 dark:text-green-200">
                Граждане РФ могут посещать Египет без визы.
              </p>
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-4">
              Требования к загранпаспорту
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Загранпаспорт должен быть действителен минимум 6 месяцев после даты въезда</li>
              <li>• В паспорте должно быть минимум 2 чистые страницы для визовых отметок</li>
              <li>• Паспорт не должен быть поврежден или иметь следы подделки</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Документы для оформления визы
            </h2>
            {visaRequired ? (
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Заполненная визовая анкета</li>
                <li>• Фотографии 3.5x4.5 см (2 шт.)</li>
                <li>• Копия загранпаспорта</li>
                <li>• Медицинская страховка (минимум 30 000 €)</li>
                <li>• Бронь отеля или приглашение</li>
                <li>• Билеты в обе стороны</li>
                <li>• Справка с работы о доходах</li>
              </ul>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                Для безвизового въезда достаточно действующего загранпаспорта и обратных билетов.
              </p>
            )}

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Срок оформления визы
            </h2>
            {visaRequired ? (
              <p className="text-gray-700 dark:text-gray-300">
                Виза в Египет оформляется в среднем 10-15 рабочих дней. Рекомендуется подавать документы за 1-2 месяца до поездки.
              </p>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                При безвизовом въезде разрешённое пребывание обычно составляет до 30-90 дней в зависимости от страны.
              </p>
            )}

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Стоимость визы
            </h2>
            {visaRequired ? (
              <p className="text-gray-700 dark:text-gray-300">
                Для граждан РФ доступна виза по прибытии в аэропорт Египта (стоимость около 25 USD).
                Также доступна возможность оформления электронной визы (e-Visa) заранее онлайн.
                Консульская виза требуется только в нестандартных случаях (длительная учеба или работа).
              </p>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                Виза не требуется, дополнительных расходов на оформление нет.
              </p>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Нужна помощь с оформлением визы?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Турагентство Велес Вояж поможет с оформлением визы и подбором тура в Египет.
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
              href="/wiki/egypt"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Вернуться к путеводителю по Египту
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
              <a href="https://ru.wikipedia.org/wiki/Египет" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Wikipedia: Египет
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps/search/Египет" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google Maps: Египет
              </a>
            </li>
            <li>
              <a href="https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Египет" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Государственный департамент США: Египет
              </a>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
