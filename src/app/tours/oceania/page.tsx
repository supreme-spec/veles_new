import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import {
  toursOceaniaSchemas,
  toursOceaniaDatePublished,
  toursOceaniaDateModified,
  setToursOceaniaDates,
} from '@/shared/data/pages/tours-oceania';

// Обновляем даты при каждом рендере
setToursOceaniaDates({
  published: new Date().toISOString().substring(0, 10),
  modified: new Date().toISOString().substring(0, 10)
});

// Извлекаем данные из схем для метаданных
const articleSchema = toursOceaniaSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursOceaniaSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Туры в Океанию 2026 | Велес Вояж',
  description: articleSchema?.description || 'Туры в Океанию: Австралия, Новая Зеландия, Фиджи, Французская Полинезия, Самоа, Вануату. Индивидуальные маршруты под запрос, комфортное проживание, профессиональные гиды, бронирование онлайн.',
  url: 'https://veles-voyage.ru/tours/oceania',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursOceaniaDatePublished,
  modifiedTime: toursOceaniaDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Туры в Океанию - Видеогид',
    description: 'Видеообзоры туров в Океанию',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

export default function OceaniaToursPage() {
  return (
    <>
      <StructuredData schemas={toursOceaniaSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            <span className="mr-2">🏝️</span>
            <span className="text-gradient-animated drop-shadow-md">
              Туры в Океанию
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Австралия, Новая Зеландия, Фиджи, Французская Полинезия — индивидуальные маршруты под ваш запрос
          </p>

          {/* Speakable summary for AI/GEO */}
          <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Туры в Океанию от Велес Вояж</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Направления:</strong> Австралия, Новая Зеландия, Фиджи, Французская Полинезия (Бора-Бора, Таити), Самоа, Вануату</li>
              <li><strong>Формат:</strong> индивидуальные маршруты под запрос — прямых пакетных туров может не быть, мы собираем программу под вас</li>
              <li><strong>Цены:</strong> от €2 500, подбор под бюджет</li>
              <li><strong>Сопровождение:</strong> поддержка 24/7, русские гиды</li>
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <MapPinIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">14+ островных стран</h3>
            <p className="text-gray-600 dark:text-gray-400">От Австралии до Тувалу</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <ClockIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">12-25 Дней</h3>
            <p className="text-gray-600 dark:text-gray-400">Маршруты под запрос</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <BanknotesIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">От €2 500</h3>
            <p className="text-gray-600 dark:text-gray-400">Индивидуальный расчёт</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <StarIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Под запрос</h3>
            <p className="text-gray-600 dark:text-gray-400">Уникальные впечатления</p>
          </div>
        </div>

        {/* AEO intro */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="about-oceania">
          <h2 id="about-oceania" className="text-3xl font-extrabold mb-6 animate-fade-in-up">
            <span className="text-gradient-animated drop-shadow-md">
              Сколько стоит и когда ехать в Океанию в 2026
            </span>
          </h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            Океания — регион из десятков островных государств и двух материковых стран (Австралия и
            Новая Зеландия). Прямых рейсов из России нет, поэтому маршруты строятся через стыковки в
            Азии или на Ближнем Востоке. Средняя стоимость индивидуального тура в 2026 году стартует от
            €2 500 на человека при двухместном размещении. Лучшее время: для Австралии и Новой Зеландии —
            сентябрь–ноябрь и март–май, для островной Полинезии и Фиджи — май–октябрь (сухой сезон).
            Новогодний пик в Океании — самый дорогой период.
          </p>

          <h3 id="oceania-directions" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Популярные направления
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm" aria-labelledby="oceania-directions">
              <caption style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>
                Направления Океании: лучший сезон, средняя цена, виза для граждан РФ и сложность поездки
              </caption>
              <thead>
                <tr className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-200">
                  <th scope="col" className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Направление</th>
                  <th scope="col" className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Лучший сезон</th>
                  <th scope="col" className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Средняя цена (от)</th>
                  <th scope="col" className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Виза для РФ</th>
                  <th scope="col" className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Сложность</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Австралия</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">сентябрь–ноябрь, март–май</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €2 800</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">e-Visa</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Новая Зеландия</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">декабрь–февраль</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €3 000</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">NZeTA (эл. разрешение)</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Фиджи</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–октябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €2 200</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">по прилёте (4 мес.)</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Французская Полинезия</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–октябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €3 500</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">безвизовый до 90 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
            <span className="text-gradient-animated drop-shadow-md">
              Откройте для себя Океанию
            </span>
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-6">
              Океания — это самый разбросанный в мире регион: тысячи островов Тихого океана, два
              материковых государства и уникальная природа, которую невозможно повторить в другом
              месте. От оперного театра Сиднея и фьордов Новой Зеландии до бирюзовой лагуны Бора-Бора и
              джунглей Фиджи — каждая страна Океании предлагает свой, ни на что не похожий опыт.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Материковая Океания</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Австралия — Сидней, Мельбурн, Большой Барьерный риф, Красная пустыня</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Новая Зеландия — Окленд, Крайстчерч, фьорды, Патагония Южного полушария</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Островная Полинезия и Меланезия</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Французская Полинезия — Бора-Бора, Таити, лагуны и курорты премиум-класса</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Фиджи, Самоа, Вануату — острова с чистейшими пляжами и дайвингом</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Соломоновы острова, Тонга, Тувалу — экзотика для опытных путешественников</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Индивидуальные маршруты под запрос</h3>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <InformationCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Как мы формируем тур в Океанию</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Прямых пакетных туров в каждую страну Океании может не быть в каталоге. Мы собираем
                    индивидуальный маршрут под ваши интересы: даты, состав группы, бюджет и желаемые
                    острова. Оставьте заявку — менеджер рассчитает стоимость и предложит оптимальную
                    стыковку перелёта.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Что включено в тур</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <BuildingOfficeIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Проживание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Отели 4-5* в городах и бутик-курорты на островах
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <StarIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Питание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Завтраки в отелях, дегустации местной кухни островов
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <PaperAirplaneIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Трансферы</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Внутренние перелёты между островами, трансферы комфорт-класса
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Почему выбирают нас</h3>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <span>Индивидуальный подход к каждому клиенту</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <span>Гибкие условия бронирования и оплаты</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <span>Круглосуточная поддержка во время путешествия</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <span>Экспертные знания о направлениях Океании</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <span>Эксклюзивные маршруты и уникальные впечатления</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Готовы к путешествию в Океанию?</h2>
            <p className="text-indigo-100 mb-6">
              Оставьте заявку — мы рассчитаем индивидуальный маршрут под ваш запрос
            </p>
            <Link
              href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20тур%20в%20Океанию%20(Австралия%2C%20Новая%20Зеландия%2C%20Фиджи)%20с%20Велес%20Вояж."
              target="_blank"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105"
            >
              Забронировать тур
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-extrabold mb-6 text-center animate-fade-in-up">
            <span className="text-gradient-animated drop-shadow-md">
              Часто задаваемые вопросы
            </span>
          </h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Есть ли готовые пакетные туры в Океанию?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Прямых пакетных туров в каждую страну Океании может не быть в каталоге. Мы формируем
                индивидуальные маршруты под запрос: подбираем рейсы со стыковкой, проживание и
                экскурсии. Это даёт гибкость и точный расчёт стоимости.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Нужна ли виза для поездки в Океанию?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Для большинства стран Океании гражданам РФ требуется виза (Австралия и Новая Зеландия —
                электронные, Фиджи — по прилёте). Правила меняются, поэтому уточняйте актуальные условия
                въезда у менеджера при подборе тура.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Какое время года лучше для Океании?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Для Австралии и Новой Зеландии комфортнее сентябрь–ноябрь и март–май; для островной
                Полинезии и Фиджи — май–октябрь (сухой сезон). Новогодний пик в Океании самый дорогой.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
