import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { 
  missionSchemas, 
  missionDatePublished, 
  missionDateModified,
  setMissionDates
} from '@/shared/data/pages/mission';

// Обновляем даты при каждом рендере
const currentDate = new Date().toISOString().split('T')[0] || new Date().toISOString();
setMissionDates({
  published: currentDate,
  modified: currentDate
});

// Извлекаем данные из схем для метаданных
const articleSchema = missionSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = missionSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: 'Наша миссия: философия Велес Вояж 2026 | Путешествия',
  description: 'Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм, культурный обмен.',
  url: 'https://veles-voyage.ru/mission',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: missionDatePublished || currentDate,
  modifiedTime: missionDateModified || currentDate,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Наша миссия - Велес Вояж',
    description: 'Видео о миссии турагентства Велес Вояж',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

const MissionPage = () => {
  return (
    <>
      <StructuredData schemas={missionSchemas} />
      
      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">
        <nav className="flex mb-6 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="text-indigo-600 hover:underline dark:text-indigo-400">
                Главная
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <Link href="/about" className="text-indigo-600 hover:underline dark:text-indigo-400">
                  О нас
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">Наша миссия</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 relative animate-fade-in-up">
              <span className="mr-2">🛡️</span>
              <span className="text-gradient-animated drop-shadow-md">
                Философия турагентства "Велес Вояж"
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto relative">
              Наша миссия: Открывать мир через призму личного опыта
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="relative mb-10">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-500 rounded-full opacity-10 blur-2xl"></div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 relative">
                    Наша миссия: Открывать мир через призму личного опыта
                  </h2>
                </div>
                
                <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  В турагентстве "Велес Вояж" мы верим, что каждое путешествие — это не просто перемещение в пространстве, а трансформация души, расширение горизонтов сознания и обогащение жизненного опыта. Наша философия основана на глубоком понимании того, что туризм и путешествия способны изменить человека к лучшему, открыть новые грани его личности и подарить незабываемые впечатления на всю жизнь.
                </p>
                
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 my-10 border-l-4 border-indigo-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-5 -translate-y-16 translate-x-16"></div>
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-6 flex items-center">
                      <span className="mr-3 text-2xl">🛡️</span>
                      Велес — покровитель путешественников
                    </h3>
                    
                    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Имя нашего агентства не случайно. Велес — древнеславянский бог-покровитель путешественников, торговцев и странников. Он олицетворяет мудрость, накопленную через познание мира, и защищает тех, кто отважился покинуть привычное окружение ради новых открытий. Как и наш небесный покровитель, мы сопровождаем каждого клиента в его путешествии, обеспечивая безопасность, комфорт и максимальное погружение в культуру посещаемых стран.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-10">
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-indigo-600">🎯</span>
                      Индивидуальный подход — основа нашей работы
                    </h3>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4 flex items-center">
                      <span className="mr-2 text-indigo-500">📋</span>
                      Персонализированные туры и экскурсии
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Мы понимаем, что каждый путешественник уникален. Кто-то стремится к активному отдыху и приключениям, кто-то предпочитает спокойный пляжный отдых, а кто-то жаждет культурного обогащения через посещение музеев, галерей и исторических памятников. Наши опытные менеджеры по туризму тщательно изучают потребности, интересы и финансовые возможности каждого клиента, чтобы создать идеальный маршрут путешествия.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-indigo-500">🧠</span>
                      Экспертное знание направлений
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Наша команда состоит из профессионалов туристической индустрии, которые не только обладают глубокими теоретическими знаниями о различных странах и регионах мира, но и лично посетили многие из предлагаемых направлений. Это позволяет нам давать честные рекомендации, делиться инсайдерской информацией и предостерегать от возможных неприятностей.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-green-600">✨</span>
                      Качество услуг — наш приоритет
                    </h3>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4 flex items-center">
                      <span className="mr-2 text-green-500">🤝</span>
                      Тщательный отбор партнеров
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      "Велес Вояж" сотрудничает только с проверенными и надежными туроператорами, которые гарантируют качественное обслуживание и безопасность путешествий. Мы регулярно мониторим качество услуг наших партнеров, изучаем отзывы туристов и при необходимости корректируем список рекомендуемых операторов. Наша репутация напрямую зависит от качества каждого элемента путешествия, поэтому мы не идем на компромиссы.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-green-500">🛂</span>
                      Полное сопровождение
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Наше участие в вашем путешествии не заканчивается продажей тура. Мы обеспечиваем круглосуточную поддержку клиентов, помогаем решать любые возникающие вопросы и проблемы, предоставляем актуальную информацию о погодных условиях, местных особенностях и изменениях в программе тура.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-blue-600">🚀</span>
                      Развитие и инновации в туризме
                    </h3>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4 flex items-center">
                      <span className="mr-2 text-blue-500">💻</span>
                      Использование современных технологий
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Туристическая индустрия стремительно развивается, и мы идем в ногу со временем. "Велес Вояж" стремится использовать современные технологии для улучшения качества обслуживания клиентов. Мы постоянно развиваемся и внедряем новые решения, которые делают процесс планирования и бронирования путешествий более удобным и эффективным.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-blue-500">🌿</span>
                      Устойчивый туризм
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Мы понимаем важность ответственного подхода к туризму и стремимся предлагать нашим клиентам варианты отдыха, которые позволяют с уважением относиться к природе и культуре посещаемых регионов.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-purple-600">🎓</span>
                      Образовательный туризм и культурный обмен
                    </h3>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4 flex items-center">
                      <span className="mr-2 text-purple-500">📚</span>
                      Путешествия как источник знаний
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      "Велес Вояж" рассматривает туризм не только как форму отдыха, но и как мощный инструмент личностного развития. Путешествия расширяют кругозор, развивают толерантность, способствуют изучению иностранных языков и помогают лучше понять многообразие мировых культур. Каждая поездка становится возможностью для саморазвития и приобретения новых навыков.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-purple-500">🌏</span>
                      Культурное погружение
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Современные путешественники стремятся к аутентичным впечатлениям и глубокому знакомству с культурой посещаемых стран. Туризм способствует межкультурному диалогу, разрушает стереотипы и предрассудки, помогает людям находить общий язык независимо от национальности и вероисповедания. Путешествия учат нас ценить разнообразие мира и находить красоту в различиях между культурами.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-yellow-600">💖</span>
                      Клиентоориентированность и сервис
                    </h3>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4 flex items-center">
                      <span className="mr-2 text-yellow-500">🤝</span>
                      Построение долгосрочных отношений
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Наша цель — не просто продать тур, а построить долгосрочные доверительные отношения с каждым клиентом. Многие наши клиенты становятся постоянными партнерами, обращаясь к нам за организацией семейных отпусков, деловых поездок, романтических путешествий и приключенческих экспедиций на протяжении многих лет.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-yellow-500">🔄</span>
                      Гибкость и адаптивность
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Мы понимаем, что планы могут меняться, и стараемся максимально гибко подходить к изменению бронирований в рамках условий туроператоров. Будь то перенос дат поездки или изменение категории размещения — наша команда всегда готова найти оптимальное решение среди доступных вариантов.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-yellow-500">🛎️</span>
                      Удобство и комфорт сервиса
                    </h4>
                    
                    <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3 flex items-center">
                      <span className="mr-2 text-yellow-400">📱</span>
                      Современные технологии обслуживания
                    </h5>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      "Велес Вояж" идет в ногу со временем, предлагая клиентам максимально удобные способы взаимодействия. Мы предоставляем возможность онлайн-консультаций, что позволяет получить профессиональную помощь в выборе тура, не выходя из дома. Наши менеджеры готовы ответить на все вопросы через мессенджеры, электронную почту или видеосвязь в удобное для вас время.
                    </p>
                    
                    <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-3 flex items-center">
                      <span className="mr-2 text-yellow-400">🕘</span>
                      Гибкий подход к обслуживанию
                    </h5>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Понимая современный ритм жизни наших клиентов, мы организовали работу таким образом, чтобы планирование путешествия не становилось дополнительным стрессом. Наш гибкий график работы позволяет получить консультацию и забронировать тур в вечернее время и в выходные дни. Мы адаптируемся под ваше расписание, а не наоборот.
                    </p>
                    
                    <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-3 flex items-center">
                      <span className="mr-2 text-yellow-400">💳</span>
                      Удобные способы оплаты
                    </h5>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      "Велес Вояж" предлагает различные варианты оплаты туристических услуг, чтобы каждый клиент мог выбрать наиболее подходящий способ. Мы принимаем наличные расчеты, банковские карты, осуществляем переводы и работаем с рассрочкой платежей там, где это возможно. Наша цель — сделать процесс бронирования и оплаты максимально простым и безопасным.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-red-600">🔒</span>
                      Безопасность и комфорт
                    </h3>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4 flex items-center">
                      <span className="mr-2 text-red-500">🛡️</span>
                      Комплексная страховая защита
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Безопасность наших клиентов — абсолютный приоритет. Мы предлагаем расширенные страховые программы, покрывающие медицинские расходы, отмену поездки, потерю багажа и другие непредвиденные обстоятельства. Наши менеджеры подробно консультируют клиентов о всех аспектах страхования и помогают выбрать оптимальную программу.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-red-500">📡</span>
                      Мониторинг ситуации в регионах
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Наша служба безопасности постоянно отслеживает политическую, эпидемиологическую и криминогенную обстановку в различных странах и регионах. При возникновении потенциальных угроз мы оперативно информируем клиентов и предлагаем альтернативные варианты отдыха.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-teal-600">🏢</span>
                      Корпоративный туризм и деловые поездки
                    </h3>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4 flex items-center">
                      <span className="mr-2 text-teal-500">💰</span>
                      Честные цены и прозрачность сотрудничества
                    </h4>
                    
                    <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3 flex items-center">
                      <span className="mr-2 text-teal-400">🆓</span>
                      Доступные путешествия без переплат
                    </h5>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Одним из ключевых принципов работы "Велес Вояж" является обеспечение максимальной доступности путешествий для наших клиентов. Мы предлагаем туры по ценам туроператоров без скрытых комиссий, дополнительных наценок и неожиданных доплат. Наша цель — сделать качественный отдых доступным для людей с различным уровнем дохода.
                    </p>
                    
                    <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-3 flex items-center">
                      <span className="mr-2 text-teal-400">🔍</span>
                      Прозрачность ценообразования
                    </h5>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      В "Велес Вояж" вы всегда знаете, за что платите. Мы предоставляем детальную информацию о стоимости каждого компонента тура, объясняем, что входит в цену, а за что может потребоваться доплата. Никаких сюрпризов на этапе бронирования или во время путешествия — только честные и понятные условия сотрудничества.
                    </p>
                    
                    <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-3 flex items-center">
                      <span className="mr-2 text-teal-400">🎁</span>
                      Поиск лучших предложений
                    </h5>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Наши менеджеры постоянно мониторят рынок туристических услуг, отслеживают акции и специальные предложения туроператоров, чтобы предложить клиентам максимально выгодные варианты отдыха. Мы считаем, что путешествия должны приносить радость, а не становиться непосильной финансовой нагрузкой.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-orange-600">🗺️</span>
                      Широкий выбор направлений и программ
                    </h3>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4 flex items-center">
                      <span className="mr-2 text-orange-500">🌍</span>
                      Разнообразие туристических предложений
                    </h4>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Работая с ведущими туроператорами России и мира, "Велес Вояж" предлагает клиентам доступ к широчайшему спектру туристических направлений. От популярных курортов до экзотических стран — мы поможем найти идеальный вариант отдыха в любой точке мира, где работают наши партнеры-туроператоры.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-orange-500">👨‍👩‍👧‍👦</span>
                      Семейный туризм и детские программы
                    </h4>
                    
                    <p className="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Путешествия для всей семьи
                    </p>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Семейный отдых требует особого внимания к деталям и понимания потребностей путешественников разных возрастов. Мы предлагаем семейные туры от проверенных туроператоров, включающие развлекательные программы для детей, комфортабельные отели с детской инфраструктурой и безопасные курорты, подходящие для отдыха с малышами.
                    </p>
                    
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center">
                      <span className="mr-2 text-orange-500">💪</span>
                      Оздоровительный отдых и активные туры
                    </h4>
                    
                    <p className="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Отдых для здоровья и активности
                    </p>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Среди предложений наших партнеров-туроператоров особое место занимают оздоровительные и активные туры. Мы поможем подобрать курорты с термальными источниками, SPA-центры, а также туры для любителей активного отдыха — от горнолыжных курортов до пляжных направлений с богатой программой водных видов спорта.
                    </p>
                  </section>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white my-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full opacity-10 -translate-y-24 translate-x-24"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full opacity-10 translate-y-16 -translate-x-16"></div>
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <span className="mr-3">🏁</span>
                      Заключение: Ваше путешествие — наша ответственность
                    </h3>
                    
                    <p className="mb-6 text-lg leading-relaxed">
                      В турагентстве "Велес Вояж" мы рассматриваем каждое путешествие как уникальную возможность подарить человеку новые эмоции, расширить его кругозор и создать воспоминания, которые останутся на всю жизнь. Наша команда профессионалов работает с полной отдачей, чтобы превратить вашу мечту о идеальном отдыхе в реальность.
                    </p>
                    
                    <p className="mb-6 text-lg leading-relaxed">
                      Мы продолжаем развиваться, изучать новые направления, внедрять инновационные технологии и повышать качество наших услуг. Доверяя нам организацию своего путешествия, вы можете быть уверены в том, что получите не просто стандартный туристический продукт, а индивидуально созданное приключение, учитывающее все ваши пожелания и превосходящее ожидания.
                    </p>
                    
                    <p className="mb-0 text-xl font-semibold leading-relaxed">
                      Добро пожаловать в мир незабываемых путешествий с "Велес Вояж" — вашим надежным проводником в удивительную вселенную туризма и открытий!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-blue-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2 text-xl">🧭</span> Наш подход
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span>Индивидуальные маршруты под ваши интересы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span>Экспертное знание направлений</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span>Полное сопровождение 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span>Безопасность и комфорт</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                    <span>Современные технологии</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-green-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2 text-xl">🌟</span> Наши ценности
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0">•</span>
                    <span>Аутентичные впечатления</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0">•</span>
                    <span>Устойчивый туризм</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0">•</span>
                    <span>Качество услуг</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0">•</span>
                    <span>Персональный подход</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link 
                    href="/values" 
                    className="inline-block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    Подробнее о наших ценностях
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-purple-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2 text-xl">🎯</span> Преимущества
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">→</span>
                    <span>Широкий выбор направлений</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">→</span>
                    <span>Гибкие условия бронирования</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">→</span>
                    <span>Профессиональная команда</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">→</span>
                    <span>Комплексная страховка</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-amber-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2 text-xl">💡</span> Почему выбирают нас
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">⭐</span>
                    <span>Лицензия РТА 0035678</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">⭐</span>
                    <span>Индивидуальный подход</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">⭐</span>
                    <span>Работаем с ведущими туроператорами</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">⭐</span>
                    <span>Круглосуточная поддержка клиентов</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">⭐</span>
                    <span>Безупречная репутация на рынке с 2023 года</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16 mb-12">
            <Link 
              href="/about" 
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              Вернуться к информации о нас
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MissionPage;