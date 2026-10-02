import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import {
  toursSouthAmericaSchemas,
  toursSouthAmericaDatePublished,
  toursSouthAmericaDateModified,
  setToursSouthAmericaDates,
} from '@/shared/data/pages/tours-south-america';

// Обновляем даты при каждом рендере
setToursSouthAmericaDates({
  published: new Date().toISOString().substring(0, 10),
  modified: new Date().toISOString().substring(0, 10)
});

// Извлекаем данные из схем для метаданных
const articleSchema = toursSouthAmericaSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursSouthAmericaSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Туры в Южную Америку 2026 | Велес Вояж',
  description: articleSchema?.description || 'Туры в Южную Америку: Бразилия, Аргентина, Чили, Перу, Колумбия, Уругвай, Боливия, Эквадор. Рио-де-Жанейро, Мачу-Пикчу, Амазония, Патагония. Индивидуальные маршруты под запрос, комфортное проживание, профессиональные гиды, бронирование онлайн.',
  url: 'https://veles-voyage.ru/tours/south-america',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursSouthAmericaDatePublished,
  modifiedTime: toursSouthAmericaDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Туры в Южную Америку - Видеогид',
    description: 'Видеообзоры туров в Южную Америку',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

export default function SouthAmericaToursPage() {
  return (
    <>
      <StructuredData schemas={toursSouthAmericaSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            <span className="mr-2">🌎</span>
            <span className="text-gradient-animated drop-shadow-md">
              Туры в Южную Америку
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Бразилия, Аргентина, Чили, Перу, Колумбия — индивидуальные маршруты под ваш запрос
          </p>

          {/* Speakable summary for AI/GEO */}
          <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Туры в Южную Америку от Велес Вояж</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Направления:</strong> Бразилия, Аргентина, Чили, Перу, Колумбия, Уругвай, Боливия, Эквадор</li>
              <li><strong>Формат:</strong> индивидуальные маршруты под запрос — прямых пакетных туров может не быть, мы собираем программу под вас</li>
              <li><strong>Цены:</strong> от €1 800, подбор под бюджет</li>
              <li><strong>Сопровождение:</strong> поддержка 24/7, русские гиды</li>
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <MapPinIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">12+ стран</h3>
            <p className="text-gray-600 dark:text-gray-400">От Анд до Амазонии</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <ClockIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">10-25 Дней</h3>
            <p className="text-gray-600 dark:text-gray-400">Маршруты под запрос</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <BanknotesIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">От €1 800</h3>
            <p className="text-gray-600 dark:text-gray-400">Индивидуальный расчёт</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <StarIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Под запрос</h3>
            <p className="text-gray-600 dark:text-gray-400">Уникальные впечатления</p>
          </div>
        </div>

        {/* AEO intro */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="about-south-america">
          <h2 id="about-south-america" className="text-3xl font-extrabold mb-6 animate-fade-in-up">
            <span className="text-gradient-animated drop-shadow-md">
              Сколько стоит и когда ехать в Южную Америку в 2026
            </span>
          </h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            Южная Америка — континент контрастов: Анды и Патагония на юге, Амазония в центре, пляжи
            Атлантики на востоке. Для граждан РФ большинство стран региона — безвизовые, что упрощает
            планирование. Средняя стоимость индивидуального тура в 2026 году стартует от €1 800 на
            человека при двухместном размещении. Южное полушарие живёт в противофазе: для Анд и
            Патагонии лучше ноябрь–март (лето), для Амазонии и побережья Бразилии — май–сентябрь (сухой
            сезон).
          </p>

          <h3 id="south-america-directions" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Популярные направления
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm" aria-labelledby="south-america-directions">
              <caption style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>
                Направления Южной Америки: лучший сезон, средняя цена, виза для граждан РФ и сложность поездки
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
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Бразилия</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–сентябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €1 600</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Аргентина</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–март</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €1 900</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Чили</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–март</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €2 100</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Перу</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–сентябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €1 800</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 183 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Колумбия</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">декабрь–март</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €1 700</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
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
              Откройте для себя Южную Америку
            </span>
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-6">
              Южная Америка объединяет древние цивилизации инков, колониальные города, самую длинную
              горную цепь планеты и самый большой влажный тропический лес. От пляжей Рио-де-Жанейро и
              ледников Патагонии до загадочного Мачу-Пикчу и Галапагосских островов — каждая страна
              региона предлагает свой, ни на что не похожий опыт.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Анды и юг</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Перу — Лима, Куско, Мачу-Пикчу, долина Священной реки</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Чили — Сантьяго, Атакама, Патагония, остров Пасхи</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Аргентина — Буэнос-Айрес, Мендоса, ледник Перито-Морено</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Боливия — Салар де Уюни, Ла-Пас, озеро Титикака</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Восток и север</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Бразилия — Рио-де-Жанейро, Игуасу, Амазония, Салвадор</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Колумбия — Богота, Картахена, Кофейный треугольник</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Эквадор — Галапагосы, Кито, вулканические треки</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Уругвай — Монтевидео, Колония-дель-Сакраменто, пляжи</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Индивидуальные маршруты под запрос</h3>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <InformationCircleIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Как мы формируем тур в Южную Америку</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Прямых пакетных туров в каждую страну региона может не быть в каталоге. Мы собираем
                    индивидуальный маршрут под ваши интересы: даты, состав группы, бюджет и желаемые
                    страны. Оставьте заявку — менеджер рассчитает стоимость и предложит оптимальную
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
                  Отели 4-5* в столицах и бутик-лоджи у природных достопримечательностей
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <StarIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Питание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Завтраки в отелях, дегустации местной кухни (асадо, эвкалиптовый кофе)
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <PaperAirplaneIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Трансферы</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Внутренние перелёты между странами, трансферы комфорт-класса
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
                <span>Экспертные знания о направлениях Южной Америки</span>
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
            <h2 className="text-3xl font-bold text-white mb-4">Готовы к путешествию в Южную Америку?</h2>
            <p className="text-indigo-100 mb-6">
              Оставьте заявку — мы рассчитаем индивидуальный маршрут под ваш запрос
            </p>
            <Link
              href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20тур%20в%20Южную%20Америку%20(Бразилия%2C%20Аргентина%2C%20Перу)%20с%20Велес%20Вояж."
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
                Есть ли готовые пакетные туры в Южную Америку?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Прямых пакетных туров в каждую страну региона может не быть в каталоге. Мы формируем
                индивидуальные маршруты под запрос: подбираем рейсы, проживание и экскурсии. Это даёт
                гибкость и точный расчёт стоимости.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Нужна ли виза для поездки в Южную Америку?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Для большинства стран региона гражданам РФ виза не требуется (Бразилия, Аргентина, Перу,
                Чили, Колумбия, Уругвай, Эквадор, Боливия — безвизовый въезд на срок от 30 до 90 дней).
                Правила меняются, поэтому уточняйте актуальные условия въезда у менеджера при подборе тура.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Какое время года лучше для Южной Америки?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Южное полушарие живёт в противофазе: для Анд и Патагонии лучше ноябрь–март (лето), для
                Амазонии и побережья Бразилии — май–сентябрь (сухой сезон). В Перу к Мачу-Пикчу
                комфортнее с мая по сентябрь.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
