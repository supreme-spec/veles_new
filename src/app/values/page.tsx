import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { 
  valuesSchemas, 
  valuesDatePublished, 
  valuesDateModified,
  setValuesDates,
} from '@/shared/data/pages/values';

// Обновляем даты при каждом рендере
const today = new Date().toISOString().substring(0, 10);
setValuesDates({
  published: today,
  modified: today
});

// Извлекаем данные из схем для метаданных
const articleSchema = valuesSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = valuesSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Наши ценности 2026 | Велес Вояж',
  description: articleSchema?.description || 'Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников, этичный туризм, качество туристических услуг, путешествия с заботой, туризм 2026.',
  url: 'https://veles-voyage.ru/values',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: valuesDatePublished,
  modifiedTime: valuesDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Наши ценности - Велес Вояж',
    description: 'Видео о ценностях турагентства Велес Вояж',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

const ValuesPage = () => {
  return (
    <>
      <StructuredData schemas={valuesSchemas} />
      
      <div className="container mx-auto px-4 pb-8 pt-12">
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
                <span className="ml-1 text-gray-500 dark:text-gray-400">Наши ценности</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 relative animate-fade-in-up">
              <span className="mr-2">🌟</span>
              <span className="text-gradient-animated drop-shadow-md">
                Ценности турагентства "Велес Вояж"
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto relative">
              Основные принципы, на которых строится наша работа
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="relative mb-10">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-500 rounded-full opacity-10 blur-2xl"></div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 relative">
                    Наши ценности — основа работы, гарантия качества и забота о каждом клиенте
                  </h2>
                </div>
                
                <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  В турагентстве «Велес Вояж» мы верим, что путешествия способны менять жизнь, расширять горизонты и дарить людям настоящие эмоции. 
                  Каждый наш тур — это не просто поездка, а уникальный опыт, наполненный открытиями и впечатлениями. 
                  Наша команда стремится к тому, чтобы отдых для каждого клиента был безопасным, комфортным и запоминающимся.
                </p>
                
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 my-10 border-l-4 border-indigo-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-5 -translate-y-16 translate-x-16"></div>
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-6 flex items-center">
                      <span className="mr-3 text-2xl">🌟</span>
                      Наши ценности
                    </h3>
                    
                    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Ценности «Велес Вояж» — это фундамент, на котором строится вся наша деятельность. 
                      Они определяют наше отношение к клиентам, партнёрам и самому процессу организации путешествий.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-10">
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-green-600">✓</span>
                      Аутентичные и уникальные впечатления
                    </h3>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Мы подбираем туры так, чтобы каждый путешественник смог прикоснуться к культуре страны, почувствовать её атмосферу и открыть для себя что-то новое. 
                      Наше турагентство сотрудничает с надежными туроператорами, предлагая путешествия в Грузию, Армению, Азербайджан и другие направления. 
                      Мы верим, что лучшие воспоминания рождаются там, где турист чувствует аутентичность и живое очарование места.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-blue-600">✓</span>
                      Устойчивый и ответственный туризм
                    </h3>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      «Велес Вояж» поддерживает принципы ответственного туризма. 
                      Мы предлагаем маршруты и программы, которые уважают традиции стран, сохраняют природу и поддерживают местные сообщества. 
                      Каждый наш клиент становится частью осознанного путешествия, которое помогает не только отдыхать, но и вносить позитивный вклад.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-purple-600">✓</span>
                      Современные технологии в путешествиях
                    </h3>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Мы используем современные цифровые решения, чтобы процесс выбора и бронирования тура был максимально удобным. 
                      На сайте доступна актуальная информация о направлениях, спецпредложениях и туроператорах. 
                      Поддержка клиентов осуществляется в режиме онлайн: по телефону, электронной почте и в мессенджерах (Telegram, WhatsApp).
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-indigo-600">✓</span>
                      Персональный подход к каждому клиенту
                    </h3>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Мы знаем, что каждый путешественник уникален. 
                      Кому-то важен пляжный отдых, кому-то экскурсионные маршруты, а кто-то мечтает о круизе или нестандартном туре. 
                      Наши менеджеры подбирают варианты, учитывая индивидуальные предпочтения, бюджет и пожелания клиентов.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                      <span className="mr-3 text-red-600">✓</span>
                      Безопасность и комфорт путешественников
                    </h3>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      Мы понимаем, что отдых должен быть спокойным и надёжным. 
                      Поэтому работаем только с проверенными туроператорами, предлагаем страховку и всегда остаёмся на связи с клиентами во время их поездки. 
                      Ваша безопасность и комфорт — наш главный приоритет.
                    </p>
                  </section>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white my-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full opacity-10 -translate-y-24 translate-x-24"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full opacity-10 translate-y-16 -translate-x-16"></div>
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <span className="mr-3">✨</span>
                      Почему выбирают «Велес Вояж»
                    </h3>
                    
                    <ul className="mb-6 space-y-3">
                      <li className="flex items-start">
                        <span className="text-yellow-300 mr-3 mt-1">•</span>
                        <span>официальная регистрация в реестре турагентств: № РТА 0035678 от 21.06.2023 г.;</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-300 mr-3 mt-1">•</span>
                        <span>надежные партнёры и лучшие туроператоры;</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-300 mr-3 mt-1">•</span>
                        <span>удобные способы связи: телефон, почта, Telegram;</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-300 mr-3 mt-1">•</span>
                        <span>индивидуальные предложения и постоянная поддержка;</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-300 mr-3 mt-1">•</span>
                        <span>выгодные цены и акции от ведущих операторов.</span>
                      </li>
                    </ul>
                    
                    <p className="mb-0 text-xl font-semibold leading-relaxed">
                      В турагентстве «Велес Вояж» мы создаём путешествия, которые оставляют воспоминания на всю жизнь. 
                      Наши ценности — это основа работы, гарантия качества и забота о каждом клиенте.
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
                  <span className="mr-2 text-xl">🎯</span> Наши принципы
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0">•</span>
                    <span>Качество услуг</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0">•</span>
                    <span>Ответственность</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0">•</span>
                    <span>Профессионализм</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0">•</span>
                    <span>Инновации</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-purple-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2 text-xl">🌟</span> Преимущества
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
                  <span className="mr-2 text-xl">💡</span> Наши достижения
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

export default ValuesPage;