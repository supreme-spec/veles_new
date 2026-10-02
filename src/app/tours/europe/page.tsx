import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon, GlobeAltIcon, CameraIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import {
  toursEuropeSchemas,
  toursEuropeDatePublished,
  toursEuropeDateModified,
} from '@/shared/data/pages/tours-europe';

// Извлекаем данные из схем для метаданных
const articleSchema = toursEuropeSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursEuropeSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Туры в Европу 2026 | Велес Вояж',
  description: articleSchema?.description || 'Туры в Европу: Франция, Италия, Испания, Германия, Греция, Австрия, Швейцария. Актуальные маршруты и цены 2026, шенгенская виза для граждан РФ, русскоговорящие гиды, поддержка 24/7.',
  url: 'https://veles-voyage.ru/tours/europe',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursEuropeDatePublished,
  modifiedTime: toursEuropeDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Европейские туры - Видеогид',
    description: 'Видеообзоры европейских туров',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

export default function EuropeToursPage() {
  return (
    <>
      <StructuredData schemas={toursEuropeSchemas} />
      <article className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
              <span className="mr-2">🏰</span>
              <span className="text-gradient-animated drop-shadow-md">
                Туры в Европу: актуальные маршруты и цены 2026
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Авторские и групповые туры по Франции, Италии, Испании, Германии, Греции, Австрии и
              Швейцарии с русскоговорящими гидами и поддержкой 24/7.
            </p>

            {/* Speakable summary for AI/GEO */}
            <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
              <h2 className="text-xl font-bold mb-3 text-blue-900">Туры в Европу от Велес Вояж</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Страны:</strong> Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция</li>
                <li><strong>Продолжительность:</strong> 3–21 дней, гибкий график</li>
                <li><strong>Цены:</strong> от €900 (≈ от 85 000 ₽) на человека</li>
                <li><strong>Сопровождение:</strong> гиды с опытом от 7 лет, поддержка 24/7</li>
                <li><strong>Оценка гостей:</strong> 4.9 из 5 на основе 134 отзывов</li>
              </ul>
            </div>
          </header>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <MapPinIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">25+ Стран</h3>
              <p className="text-gray-600 dark:text-gray-400">Широкий выбор направлений</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <ClockIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">3–21 Дней</h3>
              <p className="text-gray-600 dark:text-gray-400">Гибкая продолжительность</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BanknotesIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">От €900</h3>
              <p className="text-gray-600 dark:text-gray-400">Цена от 85 000 ₽ на человека</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <StarIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">4.9 / 5</h3>
              <p className="text-gray-600 dark:text-gray-400">По 134 отзывам гостей</p>
            </div>
          </div>

          {/* AEO intro with concrete numbers */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="about-europe">
            <h2 id="about-europe" className="text-3xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Сколько стоит и когда ехать в Европу в 2026
              </span>
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              Средняя стоимость авторского тура в Европу в 2026 году начинается от €900 (примерно от
              85 000 ₽) на человека при двухместном размещении. Лучшее время для поездки — с мая по
              октябрь, когда открыты все национальные парки и музеи, а дневная температура комфортна
              для пеших экскурсий. Пик сезона (июль–август) дороже на 20–35% и загруженнее; зимой
              выгодны рождественские ярмарки и лыжные курорты Альп.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Сравнение направлений
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-200">
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Направление</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Лучший сезон</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Средняя цена (от)</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Виза для РФ</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Сложность</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Франция</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">апрель–октябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">€1 100</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Шенген</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Италия</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">апрель–октябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">€950</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Шенген</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Испания</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–октябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">€900</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Шенген</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Германия</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–сентябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">€1 000</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Шенген</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Греция</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–октябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">€850</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Шенген</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Австрия</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">июнь–сентябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">€1 150</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Шенген</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Швейцария</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">июнь–сентябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">€1 400</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Шенген</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">высокая</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Откройте для себя Европу
              </span>
            </h2>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6">
                Европа — это континент, наполненный тысячелетней историей, культурными сокровищами и
                потрясающими пейзажами. От величественных замков Баварии до романтических улочек
                Парижа, от живописных каналов Венеции до современных небоскребов Лондона — каждая
                страна предлагает уникальный опыт для путешественников.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Западная Европа</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Франция — Лувр, Эйфелева башня, Лазурный берег</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Италия — Колизей, Венеция, Флоренция, Пизанская башня</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Испания — Барселона, Мадрид, Ла-Рамбла, архитектура Гауди</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Германия — Берлин, Мюнхен, Бранденбургские ворота, Нойшванштайн</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Нидерланды — Амстердам, тюльпаны, ветряные мельницы</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Центральная и Восточная Европа</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Австрия — Вена, Хофбург, Шёнбрунн, Альпы</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Чехия — Прага, Пражский Град, Карлов мост</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Венгрия — Будапешт, Дунай, термальные источники</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Польша — Краков, Варшава, соляные шахты Величка</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Словакия — Высокие Татры, замки, пещеры</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Уникальные культурные опыты</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <GlobeAltIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Кулинарные туры</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Дегустации местной кухни, мастер-классы от шеф-поваров, винные туры по лучшим
                    винодельням Европы.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <CameraIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Фото-туры</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Профессиональные фотосессии в самых живописных местах Европы с опытными
                    фотографами.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Языковые программы</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Курсы иностранных языков в сочетании с культурной программой в стране изучаемого
                    языка.
                  </p>
                </div>
              </div>

              <h3 id="included" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Что включено в наши туры в Европу?
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <BuildingOfficeIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Проживание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Отели 4–5* в центре городов или живописных районах, подтверждение брони за 48 часов
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <StarIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Питание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Завтраки в отелях и 3–4 ужина в проверенных ресторанах местной кухни
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <PaperAirplaneIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Трансферы</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Комфортабельные автобусы с профессиональным водителем и встреча в аэропорту
                  </p>
                </div>
              </div>

              <h3 id="visa" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Визовые требования для граждан РФ
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Для большинства стран Европы гражданам РФ нужна шенгенская виза. Загранпаспорт должен
                действовать минимум 3 месяца после выезда и иметь 2 чистые страницы. Мы готовим пакет
                документов, записываем на подачу и проверяем полис страховки с покрытием от 30 000 €.
                Срок оформления — от 5 рабочих дней в визовых центрах, в пик сезона планируйте подачу
                за 3–4 недели.
              </p>

              <h3 id="reviews" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Отзывы о поездках в Европу
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Средняя оценка наших европейских маршрутов — <strong>4.9 из 5</strong> на основе 134
                отзывов гостей. Мы публикуем реальные истории без цензуры, сохраняя авторский стиль,
                включая конструктивную критику.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Почему выбирают нас</h3>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Гиды-переводчики с опытом от 7 лет и лицензией РТА, перевод экскурсий включён</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Прямые контракты с отелями 4–5*: без наценок посредников</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Помощь с оформлением шенгенской визы и страховки от 30 000 €</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Круглосуточная поддержка 24/7 на русском языке во время поездки</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Эксклюзивные маршруты: закрытые музеи по вечерам, частные винные дегустации</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Гибкая оплата: рассрочка без переплаты до 6 месяцев</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Готовы к европейскому приключению?</h2>
              <p className="text-indigo-100 mb-6">
                Свяжитесь с нами, чтобы спланировать ваш идеальный тур по Европе
              </p>
              <Link
                href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20тур%20по%20Европе%20с%20Велес%20Вояж."
                target="_blank"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105"
              >
                Забронировать тур
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8" aria-labelledby="faq-europe">
            <h2 id="faq-europe" className="text-3xl font-extrabold mb-6 text-center animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Часто задаваемые вопросы
              </span>
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  Нужна ли виза в Европу для граждан РФ в 2026 году?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Да, для большинства стран Европы (Франция, Италия, Испания, Германия, Греция, Австрия,
                  Швейцария) гражданам РФ нужна шенгенская виза. Срок действия загранпаспорта — минимум
                  3 месяца после выезда, нужно 2 чистые страницы. Велес Вояж помогает собрать пакет
                  документов и подать заявление.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  Когда лучше всего ехать в Европу?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Лучшее время для поездки в Европу — весна (апрель–июнь) и осень (сентябрь–октябрь),
                  когда погода комфортная, туристов меньше, а цены на проживание более выгодные.
                  Лето — пик сезона с большим количеством туристов и высокими ценами. Зимой можно
                  насладиться рождественскими рынками и горнолыжными курортами.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  Что включено в тур по Европе от Велес Вояж?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  В стоимость входят перелёт или трансфер, проживание в отелях 4–5*, завтраки и 3–4 ужина
                  в проверенных ресторанах, экскурсии с гидом-переводчиком, медицинская страховка и
                  поддержка 24/7 во время поездки.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  Сколько стоит тур в Европу в 2026 году?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Средняя стоимость авторского тура начинается от €900 (примерно от 85 000 ₽) на
                  человека при двухместном размещении. Итоговая цена зависит от страны, сезона и
                  длительности маршрута (от 3 до 21 дня).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  Можно ли заказать тур с русскоговорящим гидом?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Да. Мы собираем и групповые, и авторские маршруты. Гиды владеют русским и английским
                  языками, перевод всех экскурсий включён в стоимость тура.
                </p>
              </div>
            </div>
          </section>

        </div>
      </article>
    </>
  );
}
