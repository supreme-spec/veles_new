import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon, GlobeAltIcon, CameraIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { 
  toursAsiaSchemas, 
  toursAsiaDatePublished, 
  toursAsiaDateModified,
  setToursAsiaDates,
} from '@/shared/data/pages/tours-asia';

// Обновляем даты при каждом рендере
setToursAsiaDates({
  published: new Date().toISOString().substring(0, 10),
  modified: new Date().toISOString().substring(0, 10)
});

// Извлекаем данные из схем для метаданных
const articleSchema = toursAsiaSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursAsiaSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Азиатские туры 2026 | Велес Вояж',
  description: articleSchema?.description || 'Азиатские туры: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Филиппины, Япония, Китай, Индия, Шри-Ланка. Экзотические острова, буддийские храмы, тропические пейзажи, комфортное проживание, профессиональные гиды, бронирование онлайн, туризм 2026.',
  url: 'https://veles-voyage.ru/tours/asia',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursAsiaDatePublished,
  modifiedTime: toursAsiaDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Азиатские туры - Видеогид',
    description: 'Видеообзоры азиатских туров',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

export default function AsiaToursPage() {
  return (
    <>
      <StructuredData schemas={toursAsiaSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            <span className="mr-2">🏯</span>
            <span className="text-gradient-animated drop-shadow-md">
              Азиатские туры
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Погрузитесь в древние традиции и современные чудеса Азии
          </p>
          
          {/* Speakable summary for AI/GEO */}
          <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Азиатские туры от Велес Вояж</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Страны:</strong> Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Япония, Китай</li>
              <li><strong>Особенности:</strong> экзотические острова, буддийские храмы, тропические пейзажи</li>
              <li><strong>Цены:</strong> от €700, подбор под бюджет</li>
              <li><strong>Сопровождение:</strong> поддержка 24/7, русские гиды</li>
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <MapPinIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">20+ Стран</h3>
            <p className="text-gray-600 dark:text-gray-400">Экзотические направления</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <ClockIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">5-21 Дней</h3>
            <p className="text-gray-600 dark:text-gray-400">Увлекательные маршруты</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <BanknotesIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">От 65 000₽</h3>
            <p className="text-gray-600 dark:text-gray-400">Конкурентные цены</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <StarIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Экзотика</h3>
            <p className="text-gray-600 dark:text-gray-400">Уникальные впечатления</p>
          </div>
        </div>

        {/* AEO intro with concrete numbers */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="about-asia">
          <h2 id="about-asia" className="text-3xl font-extrabold mb-6 animate-fade-in-up">
            <span className="text-gradient-animated drop-shadow-md">
              Сколько стоит и когда ехать в Азию в 2026
            </span>
          </h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            Средняя стоимость тура по Азии в 2026 году начинается от €700 (примерно от 65 000 ₽) на
            человека при двухместном размещении. Лучшее время для поездки — с ноября по апрель для
            стран Юго-Восточной Азии, когда заканчивается сезон дождей и устанавливается комфортная
            погода. Пляжные курорты Таиланда, Вьетнама и Бали в пик сезона (декабрь–февраль) дороже на
            15–30%, а городские туры по Японии и Китаю выгоднее весной и осенью.
          </p>

            <h3 id="asia-comparison" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Сравнение направлений
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm" aria-labelledby="asia-comparison">
                <caption style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>
                  Сравнение туров по странам Азии: лучший сезон, средняя цена, виза для граждан РФ и сложность поездки
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
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Таиланд</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–апрель</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 65 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 60 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Вьетнам</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–апрель</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 80 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 45 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Шри-Ланка</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">декабрь–март</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 90 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">виза по прилёте / e-Visa</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Индия</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">октябрь–март</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 95 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">e-Visa</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ОАЭ</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">октябрь–апрель</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 110 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Бали (Индонезия)</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">май–октябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 100 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 30 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Мальдивы</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–апрель</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 130 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 30 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Япония</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">март–май, сентябрь–ноябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €1 500</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">нужна виза</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Китай</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">апрель–октябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €1 200</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">нужна виза</td>
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
              Откройте для себя Азию
            </span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-6">
              Азия — это самый большой и населенный континент в мире, предлагающий бесконечное разнообразие 
              культур, традиций, природных красот и кулинарных изысков. От современных мегаполисов Японии 
              до древних храмов Камбоджи, от тропических пляжей Таиланда до снежных вершин Гималаев — 
              каждая страна Азии предлагает уникальный опыт для путешественников.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Восточная Азия</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Япония — Токио, Киото, Осака, горы Фудзияма</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Китай — Великая Китайская стена, Запретный город, Шанхай</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Южная Корея — Сеул, Пусан, культурное наследие</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Монголия — степи, юрты, национальные игры</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Юго-Восточная Азия</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Таиланд — Бангкок, Пхукет, Паттайя, острова Андаманского моря</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Вьетнам — Ханой, Хошимин, бухта Халонг, пещеры</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Сингапур — Гарденс бай зе Бей, Марина-Бей, культурное разнообразие</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Индонезия — Бали, Ява, Комодо, древние храмы</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Филиппины — пляжи, дайвинг, колониальное наследие</span>
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
                  Дегустации местной кухни, мастер-классы от шеф-поваров, посещение традиционных рынков и кулинарных школ.
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <CameraIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Фото-туры</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Профессиональные фотосессии в самых живописных местах Азии с опытными фотографами.
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Языковые программы</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Интенсивные курсы иностранных языков в сочетании с культурной программой в стране изучаемого языка.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Что включено в тур</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <BuildingOfficeIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Проживание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Отели 4-5* в центре городов или живописных курортах
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <StarIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Питание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Завтраки в отелях, дегустационные ужины местной кухни
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <PaperAirplaneIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Трансферы</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Комфортабельные автобусы, внутренние перелеты эконом-класса
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Культурные особенности</h3>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <StarIcon className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Уважение к традициям</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Мы обеспечиваем культурную чувствительность и уважение к местным традициям. 
                    Гиды подробно рассказывают о местных обычаях, религиозных практиках и 
                    правилах поведения, чтобы ваше путешествие было комфортным и уважительным.
                  </p>
                </div>
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
                <span>Экспертные знания о азиатских направлениях</span>
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
            <h2 className="text-3xl font-bold text-white mb-4">Готовы к азиатскому приключению?</h2>
            <p className="text-indigo-100 mb-6">
              Свяжитесь с нами, чтобы спланировать ваш идеальный тур по Азии
            </p>
            <Link 
              href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20тур%20по%20Азии%20с%20Велес%20Вояж."
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
                Когда лучше всего ехать в Азию?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Лучшее время для поездки в Азию зависит от выбранного направления. 
                В целом, наиболее благоприятные месяцы — ноябрь-апрель для Юго-Восточной Азии 
                и апрель-июнь, сентябрь-ноябрь для Восточной Азии. 
                Избегайте сезонов дождей и тайфунов.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Нужна ли виза для поездки в Азию?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Визовые требования различаются для каждой страны. 
                Некоторые страны предлагают безвизовый въезд или визы по прибытии для граждан России. 
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Какие прививки необходимы для поездки в Азию?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Рекомендуемые прививки включают желтую лихорадку, гепатит А и В, бешенство и японский энцефалит 
                (в зависимости от направления). Перед поездкой обязательно проконсультируйтесь с врачом-инфекционистом 
                и ознакомьтесь с актуальными рекомендациями для выбранной страны.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}