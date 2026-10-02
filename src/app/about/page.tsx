import type { Metadata } from 'next';
import Image from 'next/image';
import { EducationSlider } from '@/components/EducationSlider';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import {
  aboutSchemas,
  aboutDatePublished,
  aboutDateModified,
} from '@/shared/data/pages/about';

// Извлекаем данные из схем для метаданных
const articleSchema = aboutSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = aboutSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: 'О компании Велес Вояж: экспертные путешествия с 2023 года',
  description: 'Турагентство Велес Вояж с лицензией РТА 0035678. Индивидуальные туры и круизы по России и миру, энциклопедия по 200+ странам, круглосуточная поддержка.',
  url: 'https://veles-voyage.ru/about',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: aboutDatePublished,
  modifiedTime: aboutDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'О нас - Велес Вояж',
    description: 'Видео о турагентстве Велес Вояж',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

export default function AboutPage() {
  return (
    <>
      <StructuredData schemas={aboutSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="mr-2">✨</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              О компании Велес Вояж: экспертные путешествия с 2023 года
            </span>
          </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Велес Вояж — турагентство с лицензией РТА 0035678, зарегистрированное в 2023 году. Мы не
              агрегатор: за каждым маршрутом стоит команда экспертов, которые лично проверяют отели,
              перелёты и экскурсии. Организуем туры и круизы по России и миру, ведём энциклопедию по
              200+ странам и сопровождаем клиентов 24/7.
            </p>
        </div>


        {/* Основная информация */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🚀 Наша миссия
            </h2>
            <p className="speakable-summary text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              С 2023 года Велес Вояж — аккредитованное турагентство (РТА 0035678), которое
              организовало 500+ индивидуальных маршрутов. Мы не агрегатор: за каждым путешествием
              стоит команда экспертов, которая несёт юридическую ответственность за вашу поездку.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Мы создаём уникальные возможности для планирования поездок, где каждое путешествие становится частью 
              большого сообщества исследователей мира.
            </p>
            <div className="mt-6">
              <a 
                href="/mission" 
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Наша миссия
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🌟 Наши ценности
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Аутентичные и уникальные впечатления
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Устойчивый и ответственный туризм
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Современные технологии в путешествиях
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Прямые контракты с туроператорами без наценок
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Безопасность и комфорт путешественников
              </li>
            </ul>
            <div className="mt-6">
              <a 
                href="/values" 
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Подробнее о наших ценностях
              </a>
            </div>
          </div>
        </div>

        {/* Что мы предлагаем */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-center">
            <span className="mr-2">🎯</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Что мы предлагаем
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Энциклопедия стран
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Подробная информация о 200+ странах мира
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div className="text-3xl mb-3">🎒</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Персональные туры
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Индивидуальные маршруты под ваши интересы
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Умные решения
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Современные решения для планирования путешествий
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Мобильное приложение
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Ваш спутник в путешествиях всегда под рукой
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div className="text-3xl mb-3">🎧</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Поддержка клиентов
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Круглосуточная помощь в планировании и во время путешествий
              </p>
            </div>
          </div>
        </div>

        {/* Команда */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mb-8">
            <span className="mr-2">👥</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Наша команда
            </span>
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-12">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Мы — команда опытных путешественников, технологов и энтузиастов, 
              которые объединились, чтобы изменить способ планирования и проведения путешествий.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Каждый член нашей команды привносит уникальный опыт и страсть к исследованию мира, 
              что позволяет нам создавать действительно особенные путешествия для наших клиентов.
            </p>
          </div>
          
          {/* Team Members */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Svistunov */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6">
                   <Image 
                     src="/images/svistunov.webp" 
                     alt="Свистунов Сергей Григорьевич - Генеральный директор ООО Велес, турагентство Велес Вояж" 
                     fill
                     sizes="128px"
                     className="object-cover"
                     unoptimized
                   />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Свистунов Сергей Григорьевич
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  Генеральный директор ООО "Велес"
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Опытный предприниматель и путешественник с глубокими знаниями туристической индустрии.
                </p>
                <a 
                  href="https://www.finradun.ru/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Персональный сайт
                </a>
              </div>
            </div>
            
            {/* Kolesnikova */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6">
                   <Image 
                     src="/images/kolesnikova.webp" 
                     alt="Колесникова Анастасия Юрьевна - Директор ООО Велес, турагентство Велес Вояж" 
                     fill
                     sizes="128px"
                     className="object-cover"
                     unoptimized
                   />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Колесникова Анастасия Юрьевна
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  Директор ООО "Велес"
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Эксперт в области туристических услуг и клиентского сопровождения.
                </p>
                <a 
                  href="https://franglish-original.ru/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Персональный сайт
                </a>
              </div>
            </div>
          </div>
          
          {/* Education Slider */}
          <EducationSlider />
        </div>

        {/* SEO Content Section */}
        <div className="my-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            <span className="mr-2">🌍</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Турагентство Велес Вояж: Ваш надежный проводник в мир путешествий
            </span>
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Турагентство "Велес Вояж" — это профессиональная организация путешествий по России и миру, 
              официально зарегистрированная в реестре турагентств России с лицензией РТА 0035678. 
              Мы специализируемся на создании уникальных туристических продуктов, которые сочетают в себе 
              проверенных партнёров и глубокое понимание потребностей современных путешественников.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🎯 Наша миссия и ценности
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              В основе нашей работы лежат фундаментальные ценности, которые мы придерживаемся с момента основания:
            </p>
            
            <ul className="mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">✓ <strong>Аутентичные впечатления</strong> — мы создаем путешествия, которые позволяют по-настоящему прочувствовать атмосферу стран и культур</li>
              <li className="mb-2">✓ <strong>Устойчивый туризм</strong> — наши маршруты уважают традиции стран, сохраняют природу и поддерживают местные сообщества</li>
              <li className="mb-2">✓ <strong>Прозрачная смета</strong> — фиксируем стоимость тура в договоре без скрытых наценок</li>
              <li className="mb-2">✓ <strong>Безопасность и комфорт</strong> — работаем только с проверенными туроператорами и предлагаем комплексную страховку</li>
              <li className="mb-2">✓ <strong>Современные технологии</strong> — используем цифровые решения для удобного планирования и бронирования путешествий</li>
            </ul>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🌟 Преимущества сотрудничества с нами
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Выбирая "Велес Вояж", вы получаете комплексное сопровождение путешествия от идеи до возвращения домой:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Комплексное сопровождение</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  От планирования маршрута до возвращения домой — мы обеспечиваем полную поддержку на всех этапах путешествия
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Широкий выбор направлений</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Предлагаем путешествия по всему миру — от популярных курортов до экзотических направлений
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Круглосуточная поддержка</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Наши специалисты всегда на связи во время вашего путешествия для решения любых вопросов
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Конкурентные цены</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Работаем напрямую с ведущими туроператорами, предлагая выгодные цены без скрытых наценок
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🚀 Инновации в туризме
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Мы постоянно развиваемся и внедряем современные технологии в туристическую индустрию. 
              Наша платформа объединяет традиционные туристические услуги с цифровыми решениями, 
              что позволяет нам предлагать клиентам:
            </p>
            
            <ul className="mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">• Онлайн-консультации и подбор туров через мессенджеры</li>
              <li className="mb-2">• Персонализированные рекомендации на основе ваших предпочтений</li>
              <li className="mb-2">• Актуальную информацию о направлениях и специальных предложениях</li>
              <li className="mb-2">• Удобные способы оплаты и бронирования</li>
              <li className="mb-2">• Энциклопедию стран с детальной информацией о 200+ направлениях</li>
            </ul>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              🏆 Наш опыт и достижения
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              С момента основания в 2023 году мы:
            </p>
            
            <ul className="mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">✓ Организовали индивидуальные путешествия для более чем 500 клиентов</li>
              <li className="mb-2">✓ Зарегистрированы в реестре турагентств России с лицензией РТА 0035678</li>
              <li className="mb-2">✓ Сотрудничаем с ведущими туроператорами России и мира</li>
              <li className="mb-2">✓ Получили положительные отзывы от 95% клиентов (см. раздел «Отзывы»)</li>
              <li className="mb-2">✓ Создали подробные путеводители по 200+ странам мира</li>
            </ul>
            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white my-8">
              <h3 className="text-2xl font-bold mb-4">Доверьте свои путешествия профессионалам</h3>
              <p className="mb-6">
                "Велес Вояж" — это не просто турагентство, а команда единомышленников, 
                которые искренне любят путешествия и хотят делиться этой страстью с вами. 
                Мы понимаем, что каждое путешествие — это важное событие в жизни человека, 
                поэтому подходим к организации отдыха с максимальной ответственностью и вниманием к деталям.
              </p>
              
              <div className="text-center">
                <a 
                  href="https://t.me/Anastasiiiiyyaa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Связаться с нами
                </a>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              📞 Контактная информация
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Мы всегда рады помочь вам в планировании идеального путешествия:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Адрес</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  📍 пр-кт Керамиков, д. 103, Голицыно, 143041, Россия
                </p>
                 <p className="text-gray-700 dark:text-gray-300 mt-4">
                   📍 пр-кт Московский, д. 9/2, Пушкино, 141207, Россия
                 </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Контакты</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  📞 +7-985-063-51-34<br/>
                  ✉️ hello@veles-voyage.ru
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-700 dark:text-gray-300">
                Режим работы: Пн-Пт 09:00-21:00, Сб-Вс 10:00-16:00
              </p>
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl inline-block">
                <p className="text-white font-bold text-lg">
                  🌐 Работаем дистанционно по всей России
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
