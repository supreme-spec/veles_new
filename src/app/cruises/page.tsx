import type { Metadata } from 'next';
import Link from 'next/link';
import CruiseCard from '@/components/CruiseCard';
import InfoflotCruises from '@/components/widgets/InfoflotCruises';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { 
  cruisesSchemas, 
  cruisesDatePublished, 
  cruisesDateModified,
  setCruisesDates
} from '@/shared/data/pages/cruises';

// Обновляем даты при каждом рендере
const today = new Date().toISOString().split('T')[0] || new Date().toISOString();
setCruisesDates({
  published: today,
  modified: today
});

// Извлекаем данные из схем для метаданных
const articleSchema = cruisesSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = cruisesSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Морские круизы: маршруты и цены 2026',
  description: articleSchema?.description || 'Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности. Бронирование онлайн, поддержка 24/7.',
  url: 'https://veles-voyage.ru/cruises',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: cruisesDatePublished || today,
  modifiedTime: cruisesDateModified || today,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Морские круизы - Видеогид',
    description: 'Видеообзоры морских круизов',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

const cruiseData = [
  {
    id: 'mediterranean',
    emoji: '🌊',
    title: 'Средиземноморские круизы',
    description: 'Круизы от 75 000 ₽: Италия, Греция, Испания, Хорватия. Все включено, русские гиды, бесплатные shore-excursions для детей',
    cruiseType: 'mediterranean' as const
  },
  {
    id: 'caribbean',
    emoji: '🌴',
    title: 'Карибские круизы',
    description: 'Круизы от 95 000 ₽: Мексика, Куба, Доминикана, Барбадос. Пляжи, дайвинг, все включено',
    cruiseType: 'caribbean' as const
  },
  {
    id: 'scandinavian',
    emoji: '⛷️',
    title: 'Скандинавские фьорды',
    description: 'Круизы от 85 000 ₽: Норвегия, Исландия, Шпицберген. Фьорды, северное сияние, викинги',
    cruiseType: 'scandinavian' as const
  },
  {
    id: 'asian',
    emoji: '🏯',
    title: 'Азиатские воды',
    description: 'Круизы от 65 000 ₽: Сингапур, Таиланд, Вьетнам, ОАЭ. Храмы, пляжи, шоппинг',
    cruiseType: 'asian' as const
  },
  {
    id: 'alaska',
    emoji: '🏔️',
    title: 'Круизы в Аляску',
    description: 'Круизы от 110 000 ₽: ледники, медведи, фьорды. Лучший сезон май-сентябрь',
    cruiseType: 'alaska' as const
  },
  {
    id: 'world',
    emoji: '🌍',
    title: 'Кругосветные круизы',
    description: 'Круизы от 250 000 ₽: 60+ стран за 90+ дней. Кругосветка на лайнерах MSC, Royal Caribbean',
    cruiseType: 'world' as const
  }
];

export default async function CruisesPage() {
  // CruiseCard now loads photos dynamically on client side
  
  return (
    <>
      <StructuredData schemas={cruisesSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="mr-2">🚢</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Морские круизы и Путешествия
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Маршруты под ваши интересы и бюджет
          </p>
        </div>

        {/* Search Module */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Поиск круизов
            </h2>
            <InfoflotCruises />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cruiseData.map((cruise) => (
            <CruiseCard
              key={cruise.id}
              id={cruise.id}
              emoji={cruise.emoji}
              title={cruise.title}
              description={cruise.description}
              cruiseType={cruise.cruiseType}
            />
          ))}
        </div>

        {/* Featured concrete offers */}
        <div className="my-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            <span className="mr-2">🔥</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Популярные круизы 2026: цены и маршруты
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Средиземное море', price: 'от 75 000 ₽', days: '7-14 ночей', cruiseType: 'mediterranean', tag: 'Европа' },
              { title: 'Карибский бассейн', price: 'от 95 000 ₽', days: '7-10 ночей', cruiseType: 'caribbean', tag: 'Пляжи' },
              { title: 'Скандинавские фьорды', price: 'от 85 000 ₽', days: '7-12 ночей', cruiseType: 'scandinavian', tag: 'Север' },
              { title: 'Азиатские воды', price: 'от 65 000 ₽', days: '5-10 ночей', cruiseType: 'asian', tag: 'Экзотика' },
              { title: 'Аляска и ледники', price: 'от 110 000 ₽', days: '10-14 ночей', cruiseType: 'alaska', tag: 'Природа' },
              { title: 'Кругосветка', price: 'от 250 000 ₽', days: '90+ дней', cruiseType: 'world', tag: 'Мечты' },
            ].map((offer) => (
              <div key={offer.cruiseType} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-600 flex flex-col">
                <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">{offer.tag}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{offer.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{offer.days}</p>
                <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">{offer.price}</p>
                <Link href={`/cruises#${offer.cruiseType}`} className="mt-auto inline-flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Подробнее
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="my-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            <span className="mr-2">🌊</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Морские круизы: отдых мечты с Велес Вояж
            </span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Морские круизы — это уникальная возможность насладиться отдыхом, совмещающим комфорт, разнообразие и непревзойденную атмосферу. 
              С Велес Вояж вы можете отправиться в незабываемое морское путешествие по самым живописным уголкам планеты, не беспокоясь о деталях — 
              мы организуем всё от начала до конца.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Круиз — это отель, который плывёт за вами: мы подбираем маршруты с оценкой гостей от 4.8, включая полный пансион и портовые сборы.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🌍 Круизы по всему миру: выбор направлений
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Наши круизные туры охватывают более 6 направлений по всему миру, от Средиземного моря до экзотических островов Азии:
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Средиземноморские круизы</strong> — погрузитесь в историю древних цивилизаций, насладитесь архитектурой и кухней Старого Света</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Карибские круизы</strong> — белоснежные пляжи, тропическая природа и кристально чистая вода</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Скандинавские фьорды</strong> — величественные ландшафты, дикая природа и чистый северный воздух</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Азиатские воды</strong> — экзотика, древние храмы и необыкновенная культура Востока</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Круизы в Аляску</strong> — ледники, дикая природа и уникальные природные явления</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Кругосветные круизы</strong> — путешествие всей жизни с посещением самых экзотических мест планеты</span>
              </li>
            </ul>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              ⏰ Продолжительность круизов: от короткого уикенда до длительного путешествия
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Мы предлагаем круизы различной продолжительности — от 3-дневных мини-круизов для тех, кто хочет попробовать 
              морское путешествие впервые, до 21-дневных кругосветных туров для настоящих искателей приключений. 
              Независимо от вашего графика и бюджета, мы подберем идеальный вариант.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              💰 Цены на круизы: отличное соотношение цены и качества
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Наши цены на круизы начинаются от 75 000 рублей, что делает морские путешествия доступными для широкого круга туристов. 
              Мы сотрудничаем напрямую с круизными линиями, что позволяет предлагать конкурентные цены без наценок посредников. 
              Кроме того, регулярные акции и специальные предложения позволяют сэкономить до 30% на бронировании.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              ⭐ 5-звездочные лайнеры: комфорт и высокий уровень сервиса
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Все наши круизы осуществляются на 5-звездочных лайнерах мирового уровня. Вы получите высокий уровень сервиса, 
              комфортабельные каюты, разнообразное питание, развлекательные программы и доступ к спа-зонам. 
              На борту каждого лайнера работают профессиональные команды, обеспечивающие безопасность и удовольствие от путешествия.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🎯 Почему выбирают Велес Вояж для бронирования круизов
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="mr-2 text-indigo-600">💼</span>
                  Профессиональный подход
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Наши специалисты имеют многолетний опыт в организации круизных путешествий и помогут выбрать оптимальный вариант.
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
                  Удобное бронирование круизов онлайн, консультации по WhatsApp и полное сопровождение до и во время путешествия.
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
              📋 Как забронировать круиз с Велес Вояж
            </h3>
            
            <div className="mb-6">
              <ol className="space-y-4">
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3">1</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Выберите направление</strong> — ознакомьтесь с нашими круизными маршрутами и выберите подходящий вариант
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
                    <strong>Подберите тур</strong> — мы поможем выбрать оптимальный круиз с учетом ваших предпочтений
                  </span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3">4</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Оформите бронирование</strong> — забронируйте круиз онлайн с гарантией сохранности ваших средств
                  </span>
                </li>
              </ol>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mt-8">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="mr-2">🌟</span>
                Начните планировать ваш морской отдых уже сегодня!
              </h3>
              <p className="mb-4">
                Морские круизы с Велес Вояж — это гарантия незабываемых впечатлений, высокого уровня сервиса и профессиональной организации. 
                Свяжитесь с нами, чтобы начать планирование вашего идеального морского путешествия.
              </p>
              <p className="font-medium">
                Откройте для себя мир морских круизов вместе с нами!
              </p>
            </div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Готовы к морскому приключению?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Свяжитесь с нами, чтобы спланировать ваш идеальный морской отдых
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
