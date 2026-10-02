import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { 
  toursAfricaSchemas, 
  toursAfricaDatePublished, 
  toursAfricaDateModified,
  setToursAfricaDates,
} from '@/shared/data/pages/tours-africa';

// Обновляем даты при каждом рендере
setToursAfricaDates({
  published: new Date().toISOString().substring(0, 10),
  modified: new Date().toISOString().substring(0, 10)
});

// Извлекаем данные из схем для метаданных
const articleSchema = toursAfricaSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursAfricaSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Африканские туры 2026 | Велес Вояж',
  description: articleSchema?.description || 'Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Сафари, дикая природа, национальные парки, экзотические пейзажи, комфортное проживание, профессиональные гиды, бронирование онлайн, туризм 2026.',
  url: 'https://veles-voyage.ru/tours/africa',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursAfricaDatePublished,
  modifiedTime: toursAfricaDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Африканские туры - Видеогид',
    description: 'Видеообзоры африканских туров',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

export default function AfricaToursPage() {
  return (
    <>
      <StructuredData schemas={toursAfricaSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            <span className="mr-2">🦁</span>
            <span className="text-gradient-animated drop-shadow-md">
              Африканские туры
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Откройте дикую природу и удивительные пейзажи Африки
          </p>
          
          {/* Speakable summary for AI/GEO */}
          <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Африканские туры и сафари от Велес Вояж</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Страны:</strong> Кения, Танзания, ЮАР, Египет, Марокко, Занзибар</li>
              <li><strong>Особенности:</strong> сафари, национальные парки, дикая природа, экзотические пейзажи</li>
              <li><strong>Цены:</strong> от €700, групповые и индивидуальные туры</li>
              <li><strong>Сопровождение:</strong> поддержка 24/7, опытные гиды</li>
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <MapPinIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">12+ Стран</h3>
            <p className="text-gray-600 dark:text-gray-400">Лучшие сафари-направления</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <ClockIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">10-21 Дней</h3>
            <p className="text-gray-600 dark:text-gray-400">Увлекательные маршруты</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <BanknotesIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">От 120 000₽</h3>
            <p className="text-gray-600 dark:text-gray-400">Конкурентные цены</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <StarIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Экзотика</h3>
            <p className="text-gray-600 dark:text-gray-400">Незабываемые впечатления</p>
          </div>
        </div>

        {/* AEO intro with concrete numbers */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16" aria-labelledby="about-africa">
          <h2 id="about-africa" className="text-3xl font-extrabold mb-6 animate-fade-in-up">
            <span className="text-gradient-animated drop-shadow-md">
              Сколько стоит и когда ехать в Африку в 2026
            </span>
          </h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            Средняя стоимость сафари-тура по Африке в 2026 году начинается от 120 000 ₽ на человека при
            групповом размещении. Лучшее время для сафари в Восточной Африке — с июня по октябрь
            (великая миграция в Серенгети), а для пляжного отдыха в Египте и на Занзибаре — с октября
            по апрель. Пик сезона зимой дороже на 20–40%, а летние месяцы в Южной Африке — более
            бюджетный вариант.
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
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Египет</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">октябрь–апрель</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 70 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">виза по прилёте</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Марокко</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">март–май, сентябрь–ноябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 110 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Тунис</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">апрель–июнь, сентябрь–октябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 90 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Кения</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">июль–октябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 180 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">e-Visa</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Танзания</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">июнь–октябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 200 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">виза по прилёте / e-Visa</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ЮАР</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–март</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 150 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Сейшелы</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">апрель–май, октябрь–ноябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 160 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 30 дней</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">низкая</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Занзибар</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">июнь–октябрь</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 120 000 ₽</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">виза по прилёте</td>
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
              Откройте для себя Африку
            </span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-6">
              Африка — это континент дикой природы, величественных пейзажей и уникальных культур. От знаменитых сафари-парков Кении и Танзании 
              до живописных пустынь Намибии, от побережья ЮАР до горных вершин Руанды — каждая страна Африки предлагает неповторимый опыт 
              для путешественников, ищущих приключений и подлинной экзотики.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3">Восточная Африка</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Кения — Маасай-Мара, озеро Найваша, Найроби</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Танзания — Серенгети, Нгоронгоро, Занзибар</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Руанда — горные гориллы, Кигали, озеро Киву</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3">Южная Африка</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                    <span>ЮАР — Кейптаун, Крюгер, Гарден-Роут</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Ботсвана — Дельта реки Окаванго, Чобе, пустыня Калахари</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Намибия — пустыня Намиб, Этово, Свакопмунд</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Замбия — Виктория, Ливингстон, река Замбези</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Что включено в тур</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
                <BuildingOfficeIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Проживание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Лоджи и отели 4-5* в сафари-парках и живописных местах
                </p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
                <StarIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Питание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Полный пансион с аутентичной африканской кухней
                </p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
                <PaperAirplaneIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Трансферы</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Комфортабельные 4WD-трансферы для сафари-поездок
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Сафари-особенности</h3>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <StarIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Экспертные гиды</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Наши гиды с многолетним опытом проведут вас по самым живописным маршрутам Африки, 
                    поделясь знаниями о фауне, флоре и культуре местных народов. 
                    Они знают тонкости поведения животных и лучшие точки для наблюдения.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Почему выбирают нас</h3>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                <span>Индивидуальный подход к каждому клиенту</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                <span>Гибкие условия бронирования и оплаты</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                <span>Круглосуточная поддержка во время путешествия</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                <span>Экспертные знания о африканских направлениях</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                <span>Эксклюзивные маршруты и уникальные впечатления</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Готовы к африканскому приключению?</h2>
            <p className="text-orange-100 mb-6">
              Свяжитесь с нами, чтобы спланировать ваш идеальный сафари-тур
            </p>
            <Link 
              href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20сафари-тур%20по%20Африке%20с%20Велес%20Вояж."
              target="_blank"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105"
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
                <InformationCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                Когда лучше всего ехать в Африку?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Лучшее время для поездки в Африку зависит от выбранного направления. 
                В целом, наиболее благоприятные месяцы — июнь-октябрь для Восточной Африки 
                и ноябрь-март для Южной Африки. Избегайте сезонов дождей и миграций животных.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                Нужна ли виза для поездки в Африку?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Визовые требования различаются для каждой страны. 
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                Какие прививки необходимы для поездки в Африку?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Обязательные прививки включают желтую лихорадку, полиомиелит, дифтерию и столбняк. 
                Рекомендуемые — против малярии, гепатита А и В. 
                Перед поездкой обязательно проконсультируйтесь с врачом-инфекционистом.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}