import type { Metadata } from 'next';
import Link from 'next/link';
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { formatMetadataDates } from '@/shared/utils';
import StructuredData from '@/components/SEO/StructuredData';
import {
  toursAmericaSchemas,
  toursAmericaDatePublished,
  toursAmericaDateModified,
  setToursAmericaDates,
} from '@/shared/data/pages/tours-america';

// Обновляем даты при каждом рендере
setToursAmericaDates(formatMetadataDates());

// Извлекаем данные из схем для метаданных
const articleSchema = toursAmericaSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursAmericaSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Американские туры 2026 | Велес Вояж',
  description:
    articleSchema?.description ||
    'Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Небоскребы, национальные парки, пляжи, горы, комфортное проживание, профессиональные гиды, бронирование онлайн, туризм 2026.',
  url: 'https://veles-voyage.ru/tours/america',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursAmericaDatePublished,
  modifiedTime: toursAmericaDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Американские туры - Видеогид',
    description: 'Видеообзоры американских туров',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/',
  },
  faqs:
    faqSchema?.mainEntity?.map((item: any) => ({
      question: item.name,
      answer: item.acceptedAnswer.text,
    })) || [],
});

export default function AmericaToursPage() {
  return (
    <>
      <StructuredData schemas={toursAmericaSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
              <span className="mr-2">🗽</span>
              <span className="text-gradient-animated drop-shadow-md">Американские туры</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              От небоскребов до национальных парков
            </p>
            
            {/* Speakable summary for AI/GEO */}
            <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
              <h2 className="text-xl font-bold mb-3 text-blue-900">Американские туры от Велес Вояж</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Страны:</strong> США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика</li>
                <li><strong>Особенности:</strong> небоскребы, национальные парки, пляжи, горы</li>
                <li><strong>Цены:</strong> от €700, подбор под бюджет</li>
                <li><strong>Сопровождение:</strong> поддержка 24/7, русские гиды</li>
              </ul>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <MapPinIcon className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">15+ Городов</h3>
              <p className="text-gray-600 dark:text-gray-400">Лучшие мегаполисы</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <ClockIcon className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">10-21 Дней</h3>
              <p className="text-gray-600 dark:text-gray-400">Увлекательные маршруты</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BanknotesIcon className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">От 90 000₽</h3>
              <p className="text-gray-600 dark:text-gray-400">Конкурентные цены</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <StarIcon className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Разнообразие</h3>
              <p className="text-gray-600 dark:text-gray-400">Города и природа</p>
            </div>
          </div>

          {/* AEO intro with concrete numbers */}
          <section
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16"
            aria-labelledby="about-america"
          >
            <h2
              id="about-america"
              className="text-3xl font-extrabold mb-6 animate-fade-in-up"
            >
              <span className="text-gradient-animated drop-shadow-md">
                Сколько стоит и когда ехать в Америку в 2026
              </span>
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              Средняя стоимость тура по Америке в 2026 году начинается от 90 000 ₽ на человека. Лучшее
              время для поездки в США и Канаду — с мая по сентябрь, когда открыты национальные парки и
              комфортная погода для экскурсий. Карибские направления (Куба, Доминикана) и Мексика
              лучше всего принимают гостей с ноября по апрель, вне сезона ураганов.
            </p>

            <h3 id="america-comparison" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Сравнение направлений
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm" aria-labelledby="america-comparison">
                <caption style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>
                  Сравнение туров по странам Америки: лучший сезон, средняя цена, виза для граждан РФ и сложность поездки
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
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">США</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–сентябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €2 000</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">виза B1/B2</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Куба</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–апрель</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 120 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы (карта туриста)</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Мексика</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–апрель</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 110 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы при наличии США/Канады, иначе электронная</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Бразилия</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">сентябрь–март</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 140 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Аргентина</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">октябрь–март</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 130 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Перу</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–сентябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 120 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 183 дней</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Доминикана</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">декабрь–апрель</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 115 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 30 дней</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Колумбия</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">декабрь–март</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 100 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Откройте для себя Америку
              </span>
            </h2>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6">
                Америка — это континент контрастов, где небоскребы соседствуют с живописными
                национальными парками, а космополитичные мегаполисы — с тихими прибрежными
                городками. От знаменитых достопримечательностей Нью-Йорка и Лос-Анджелеса до
                величественных пейзажей Гранд-Каньона и Йеллоустонского парка — каждая часть Америки
                предлагает уникальный опыт для путешественников.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Популярные направления
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-3">США</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Нью-Йорк — Манхэттен, Бродвей, Центральный парк</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Лос-Анджелес — Голливуд, пляжи, Диснейленд</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Сан-Франциско — Золотые ворота, Алькатрас, винодельни</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Лас-Вегас — казино, шоу, развлечения</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                    Канада и Мексика
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Торонто — CN Tower, Ниагарский водопад</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Ванкувер — горы, океан, культурное разнообразие</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Мексика — курорты Канкуна, археологические памятники</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Национальные парки — Йеллоустон, Гранд-Каньон, Йосемити</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Что включено в тур
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <BuildingOfficeIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Проживание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Отели 4-5* в центре городов или живописных курортах
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <StarIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Питание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Завтраки в отелях, дегустационные ужины местной кухни
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <PaperAirplaneIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Трансферы</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Комфортабельные автобусы, внутренние перелеты эконом-класса
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Культурные особенности
              </h3>

              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <StarIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Разнообразие Америки</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Америка — это мозаика культур, где можно насладиться как мегаполисами с
                      небоскребами, так и живописными природными пейзажами. Каждый регион имеет свои
                      особенности кухни, традиций и образа жизни, что делает путешествие по Америке
                      по-настоящему уникальным.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Почему выбирают нас
              </h3>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Индивидуальный подход к каждому клиенту</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Гибкие условия бронирования и оплаты</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Круглосуточная поддержка во время путешествия</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Экспертные знания о американских направлениях</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Эксклюзивные маршруты и уникальные впечатления</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Готовы к американскому приключению?
              </h2>
              <p className="text-cyan-100 mb-6">
                Свяжитесь с нами, чтобы спланировать ваш идеальный тур по Америке
              </p>
              <Link
                href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20тур%20по%20Америке%20с%20Велес%20Вояж."
                target="_blank"
                className="inline-block bg-white text-cyan-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105"
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
                  <InformationCircleIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mr-2" />
                  Когда лучше всего ехать в Америку?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Лучшее время для поездки в Америку зависит от выбранного направления. В целом,
                  наиболее благоприятные месяцы — май-сентябрь для большинства регионов. Зимой можно
                  насладиться горнолыжными курортами и рождественскими рынками.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mr-2" />
                  Нужна ли виза для поездки в Америку?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Гражданам России необходима виза для посещения США и Канады. Для Мексики
                  достаточно загранпаспорта.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mr-2" />
                  Какие прививки необходимы для поездки в Америку?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Для поездки в Америку обязательных прививок нет, но рекомендуются стандартные
                  вакцинации: против гриппа, дифтерии, столбняка, полиомиелита. Перед поездкой
                  обязательно проконсультируйтесь с врачом.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
