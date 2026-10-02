import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import TourCard from '@/components/TourCard';
import TourSearchForm from '@/components/tour-search/TourSearchForm';
import { 
  toursSchemas, 
  toursDatePublished, 
  toursDateModified,
  setToursDates,
} from '@/shared/data/pages/tours';

// Обновляем даты при каждом рендере
setToursDates({
  published: new Date().toISOString().substring(0, 10),
  modified: new Date().toISOString().substring(0, 10)
});

// Извлекаем данные из схем для метаданных
const articleSchema = toursSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Туры и Путешествия 2026 | Велес Вояж',
  description: articleSchema?.description || 'Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет и интересы. Бронирование онлайн, поддержка 24/7.',
  url: 'https://veles-voyage.ru/tours',
  type: 'article',
  image: 'https://veles-voyage.ru/images/archive/tours/tours-hero.jpg',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursDatePublished,
  modifiedTime: toursDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Туры и Путешествия - Видеогид',
    description: 'Видеообзоры туров и путешествий',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});


// Tour data with image placeholders
const tourData = [
  {
    id: 'europe',
    title: '🏰 Европейские туры',
    description: 'Туры в Европу от 45 000 ₽: Италия, Испания, Греция, Франция. Прямые рейсы, виза Schengen, поддержка 24/7',
    imageAlt: 'Европейские достопримечательности'
  },
  {
    id: 'asia',
    title: '🏯 Азиатские приключения',
    description: 'Туры в Азию от 35 000 ₽: Таиланд, Вьетнам, ОАЭ, Китай. Безвиз или e-visa, трансфер, отели 4-5*',
    imageAlt: 'Азиатские храмы и пейзажи'
  },
  {
    id: 'africa',
    title: '🦁 Африканские сафари',
    description: 'Туры в Африку от 85 000 ₽: Египет, Марокко, Кения, Танзания. Сафари, пирамиды, пляжи Красного моря',
    imageAlt: 'Африканское сафари'
  },
  {
    id: 'america',
    title: '🗽 Американские маршруты',
    description: 'Туры в Америку от 95 000 ₽: США, Мексика, Куба, Бразилия. Американа, Кармен, Ниагарский водопад',
    imageAlt: 'Американские достопримечательности'
  },
  {
    id: 'cruise',
    title: '🚢 Океанские круизы',
    description: 'Морские круизы от 75 000 ₽: Средиземное море, Карибы, Скандинавия. Все включено, русские гиды',
    imageAlt: 'Океанские круизы'
  },
  {
    id: 'extreme',
    title: '⛰️ Экстремальные туры',
    description: 'Экстрим-туры от 55 000 ₽: альпинизм, дайвинг, рафтинг, парашют. Профессиональные инструкторы, страховка',
    imageAlt: 'Экстремальные туры'
  },
  {
    id: 'oceania',
    title: '🏝️ Туры в Океанию',
    description: 'Туры в Океанию от 120 000 ₽: Австралия, Новая Зеландия, Фиджи. Вива пляжи, дайвинг, австралийская природа',
    imageAlt: 'Океания — острова Тихого океана'
  },
  {
    id: 'south-america',
    title: '🌎 Туры в Южную Америку',
    description: 'Туры в Южную Америку от 110 000 ₽: Бразилия, Аргентина, Чили, Перу. Мачу-Пикчу, Амазония, Анды, Рио-де-Жанейро',
    imageAlt: 'Южная Америка — Анды и Амазония'
  }
];

export default async function ToursPage() {
  // TourCard now loads photos dynamically on client side
  
  return (
    <>
      <StructuredData schemas={toursSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-8">
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Туры и круизы', href: '/tours' },
          ]}
        />
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="mr-2">🌍</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Туры и Путешествия
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Откройте для себя уникальные направления и незабываемые приключения
          </p>
          
          {/* Speakable summary for AI/GEO */}
          <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-bold mb-3 text-blue-900">Велес Вояж — туры по всему миру</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Направления:</strong> Европа, Азия, Африка, Америка, круизы, экстремальные туры</li>
              <li><strong>Типы туров:</strong> индивидуальные, групповые, авторские маршруты</li>
              <li><strong>Цены:</strong> от €700, подбор под ваш бюджет</li>
              <li><strong>Сопровождение:</strong> поддержка 24/7, профессиональные гиды</li>
            </ul>
          </div>
        </div>

         {/* Tour Search Form */}
         <TourSearchForm />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourData.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              description={tour.description}
              imageAlt={tour.imageAlt}
            />
          ))}
        </div>

        {/* Featured concrete offers */}
        <div className="my-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            <span className="mr-2">🔥</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Популярные туры 2026: цены и направления
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Турция «всё включено»', price: 'от 90 000 ₽', days: '7 ночей', slug: 'turkey-all-inclusive', tag: 'Хит продаж' },
              { title: 'Египет: Хургада / Шарм', price: 'от 90 000 ₽', days: '7 ночей', slug: 'egypt-2026', tag: 'Безвиз' },
              { title: 'ОАЭ: Дубай', price: 'от 120 000 ₽', days: '5-7 ночей', slug: 'uae-2026', tag: 'Премиум' },
              { title: 'Европа: Шенген', price: 'от 95 000 ₽', days: '7-10 ночей', slug: 'europe', tag: 'Групповые' },
            ].map((offer) => (
              <div key={offer.slug} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-600 flex flex-col">
                <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">{offer.tag}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{offer.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{offer.days}</p>
                <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">{offer.price}</p>
                <Link href={`/tours/${offer.slug}`} className="mt-auto inline-flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Подробнее
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="my-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            <span className="mr-2">🌍</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Туры и Путешествия: Откройте мир с Велес Вояж
            </span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Путешествия — это не просто смена ландшафтов, это возможность расширить границы своего восприятия, 
              познакомиться с новыми культурами и получить незабываемые впечатления. С Велес Вояж вы можете 
              отправиться в увлекательное путешествие по самым интересным уголкам планеты, не беспокоясь о деталях — 
              мы организуем всё от начала до конца.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
               🌍 Туры по всему миру: 8 направлений для вашего отдыха
             </h3>
             
             <p className="text-gray-700 dark:text-gray-300 mb-6">
               Наши туристические туры охватывают 8 направлений по всему миру, от исторических европейских 
               городов до экзотических пляжей Азии и островов Океании:
             </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Европейские туры</strong> — погрузитесь в историю древних цивилизаций, насладитесь архитектурой и кухней Старого Света</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Азиатские приключения</strong> — экзотика, древние храмы, современные мегаполисы и необыкновенная культура Востока</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Африканские сафари</strong> — дикая природа, уникальные животные и незабываемые впечатления от сафари-туров</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Американские маршруты</strong> — от небоскребов Нью-Йорка до величественных национальных парков</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Океанские круизы</strong> — комфортабельные морские путешествия по живописным островам и побережьям</span>
              </li>
               <li className="flex items-start">
                 <span className="text-green-500 mr-2 mt-1">✓</span>
                 <span><strong>Экстремальные туры</strong> — для любителей острых ощущений и необычных приключений</span>
               </li>
               <li className="flex items-start">
                 <span className="text-green-500 mr-2 mt-1">✓</span>
                 <span><strong>Туры в Океанию</strong> — Австралия, Новая Зеландия, Фиджи, Французская Полинезия, индивидуальные маршруты под запрос</span>
               </li>
               <li className="flex items-start">
                 <span className="text-green-500 mr-2 mt-1">✓</span>
                 <span><strong>Туры в Южную Америку</strong> — Бразилия, Аргентина, Чили, Перу, Колумбия, Мачу-Пикчу и Амазония</span>
               </li>
             </ul>
             
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
               ⏰ Продолжительность туров: от короткого уикенда до длительного путешествия
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Мы предлагаем туры различной продолжительности — от 3-дневных мини-туров для тех, кто хочет 
              попробовать путешествие впервые, до 30-дневных экспедиций для настоящих искателей приключений. 
              Независимо от вашего графика и бюджета, мы подберем идеальный вариант.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              💰 Цены на туры: отличное соотношение цены и качества
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Наши цены на туры начинаются от 35 000 рублей, что делает путешествия доступными для широкого круга туристов. 
              Мы сотрудничаем напрямую с туроператорами, что позволяет предлагать конкурентные цены без наценок посредников. 
              Кроме того, регулярные акции и специальные предложения позволяют сэкономить до 40% на бронировании.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              ⭐ 5-звездочный сервис: комфорт и высокий уровень обслуживания
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Все наши туры обеспечивают высокий уровень сервиса, комфортабельное размещение, качественное питание 
              и профессиональное сопровождение. Мы работаем только с проверенными партнерами, которые обеспечивают 
              безопасность и удовольствие от путешествия.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🎯 Почему выбирают Велес Вояж для бронирования туров
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="mr-2 text-indigo-600">💼</span>
                  Профессиональный подход
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Наши специалисты имеют многолетний опыт в организации путешествий и помогут выбрать оптимальный вариант.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-green-100 dark:border-gray-600">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="mr-2 text-green-600">🔒</span>
                  Гарантии и безопасность
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Все бронирования защищены, а наши партнеры имеют международные сертификаты качества и безопасности.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-purple-100 dark:border-gray-600">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="mr-2 text-purple-600">📱</span>
                  Онлайн-сервис
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Удобное бронирование туров онлайн, консультации по WhatsApp и полное сопровождение до и во время путешествия.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-amber-100 dark:border-gray-600">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="mr-2 text-amber-600">💰</span>
                  Выгодные условия
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Специальные предложения, гибкие условия оплаты и возможность бронирования с рассрочкой.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              📋 Как забронировать тур с Велес Вояж
            </h3>
            
            <div className="mb-6">
              <ol className="space-y-4">
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3">1</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Выберите направление</strong> — ознакомьтесь с нашими туристическими маршрутами и выберите подходящий вариант
                  </span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3">2</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Свяжитесь с нами</strong> — получите консультацию по WhatsApp или через форму на сайте
                  </span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3">3</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Подберите тур</strong> — мы поможем выбрать оптимальный тур с учетом ваших предпочтений
                  </span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3">4</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Оформите бронирование</strong> — забронируйте тур онлайн с гарантией сохранности ваших средств
                  </span>
                </li>
              </ol>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mt-8">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="mr-2">🌟</span>
                Начните планировать ваше путешествие уже сегодня!
              </h3>
              <p className="mb-4">
                Туры с Велес Вояж — это гарантия незабываемых впечатлений, высокого уровня сервиса и профессиональной организации. 
                Свяжитесь с нами, чтобы начать планирование вашего идеального путешествия.
              </p>
              <p className="font-medium">
                Откройте для себя мир путешествий вместе с нами!
              </p>
            </div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Готовы к приключению?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Свяжитесь с нами, чтобы спланировать ваше идеальное путешествие
            </p>
            <a 
              href="https://t.me/Anastasiiiiyyaa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium transform hover:scale-105 inline-block no-underline"
            >
              Связаться с нами
            </a>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}