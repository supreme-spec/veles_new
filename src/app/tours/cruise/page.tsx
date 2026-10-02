import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { 
  toursCruiseSchemas, 
  toursCruiseDatePublished, 
  toursCruiseDateModified,
  setToursCruiseDates,
} from '@/shared/data/pages/tours-cruise';

// Обновляем даты при каждом рендере
setToursCruiseDates({
  published: new Date().toISOString().substring(0, 10),
  modified: new Date().toISOString().substring(0, 10)
});

// Извлекаем данные из схем для метаданных
const articleSchema = toursCruiseSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursCruiseSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Круизные туры 2026 | Велес Вояж',
  description: articleSchema?.description || 'Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Океанские острова, побережья, круизные лайнеры, порты, комфортное проживание, профессиональные гиды, бронирование онлайн, туризм 2026.',
  url: 'https://veles-voyage.ru/tours/cruise',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursCruiseDatePublished,
  modifiedTime: toursCruiseDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Круизные туры - Видеогид',
    description: 'Видеообзоры круизных туров',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

export default function CruiseToursPage() {
  return (
    <>
      <StructuredData schemas={toursCruiseSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            <span className="mr-2">🚢</span>
            <span className="text-gradient-animated drop-shadow-md">
              Круизные туры
            </span>
          </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Откройте красоты океанских островов
            </p>
            
            {/* Speakable summary for AI/GEO */}
            <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
              <h2 className="text-xl font-bold mb-3 text-blue-900">Круизные туры от Велес Вояж</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Маршруты:</strong> Средиземное море, Карибы, Скандинавия, Аляска, кругосветные</li>
                <li><strong>Продолжительность:</strong> 7-21 дней</li>
                <li><strong>Цены:</strong> от 80 000₽, включая проживание на лайнере</li>
                <li><strong>Сопровождение:</strong> поддержка 24/7, экскурсии на каждом маршруте</li>
              </ul>
            </div>
          </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <MapPinIcon className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">8+ Направлений</h3>
            <p className="text-gray-600 dark:text-gray-400">Мировые круизные маршруты</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <ClockIcon className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">7-21 Дней</h3>
            <p className="text-gray-600 dark:text-gray-400">Различная продолжительность</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <BanknotesIcon className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">От 80 000₽</h3>
            <p className="text-gray-600 dark:text-gray-400">Конкурентные цены</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <StarIcon className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Комфорт</h3>
            <p className="text-gray-600 dark:text-gray-400">Все включено</p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
            <span className="text-gradient-animated drop-shadow-md">
              Откройте для себя круизы
            </span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-6">
              Круизы — это уникальная возможность насладиться морскими пейзажами, культурой разных стран и 
              высоким уровнем сервиса на борту современных лайнеров. От древних цивилизаций Средиземного моря 
              до тропических пляжей Карибского моря, от величественных фьордов Скандинавии до экзотических 
              островов Азиатских вод — каждый маршрут предлагает неповторимый опыт для путешественников.
              В нашем каталоге — лайнеры уровня MSC World Europa, а популярный старт средиземноморского маршрута — порт Барселона.
            </p>

            <p className="mb-6">
              Круиз — это отель, который плывёт за вами: мы подбираем маршруты с оценкой гостей от 4.8, включая полный пансион и портовые сборы.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-3">Средиземное море</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Италия — Рим, Венеция, Неаполь</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Греция — Афины, Миконос, Родос</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Испания — Барселона, Валенсия, Малага</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Франция — Марсель, Ницца, Тулон</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-3">Другие направления</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Карибы — Ямайка, Каймановы острова, Барбадос</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Скандинавия — Норвегия, Швеция, Дания</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Азиатские воды — Таиланд, Вьетнам, Сингапур</span>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Аляска — ледники, дикая природа, уникальные пейзажи</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Что включено в круиз</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <BuildingOfficeIcon className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Проживание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Каюты различных категорий на борту круизного лайнера
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <StarIcon className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Питание</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Все основные приемы пищи, рестораны, бары по системе "все включено"
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <PaperAirplaneIcon className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Трансферы</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Трансферы к порту отправления и из порта прибытия
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Круизные особенности</h3>
            
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <StarIcon className="w-6 h-6 text-teal-600 dark:text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Развлечения на борту</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Современные круизные лайнеры предлагают широкий спектр развлечений: 
                    театры, казино, бассейны, спа-зоны, рестораны мировых кухонь, 
                    спортивные площадки и детские клубы. Каждый день прибытия в порт 
                    сопровождается интересными экскурсиями.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Почему выбирают нас</h3>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span>Индивидуальный подход к каждому клиенту</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span>Гибкие условия бронирования и оплаты</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span>Круглосуточная поддержка во время путешествия</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span>Экспертные знания о круизных направлениях</span>
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span>Эксклюзивные маршруты и уникальные впечатления</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Готовы к морскому приключению?</h2>
            <p className="text-teal-100 mb-6">
              Свяжитесь с нами, чтобы спланировать ваш идеальный круиз
            </p>
            <Link 
              href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20круиз%20с%20Велес%20Вояж."
              target="_blank"
              className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105"
            >
              Забронировать круиз
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
                <InformationCircleIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
                Когда лучше всего ехать в круиз?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Лучшее время для круиза зависит от выбранного направления. 
                В целом, наиболее благоприятные месяцы — май-сентябрь для Средиземного моря, 
                декабрь-апрель для Карибского моря. Избегайте сезонов штормов и ураганов.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
                Нужна ли виза для круиза?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Визовые требования различаются для каждой страны, портов захода. 
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <InformationCircleIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
                Какие документы необходимы для круиза?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Необходим загранпаспорт с действием не менее 6 месяцев после окончания круиза, 
                визы (если требуются), страховка, медицинские справки и прививочные сертификаты 
                (в зависимости от направления).
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}