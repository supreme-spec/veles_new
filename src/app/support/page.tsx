import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { 
  supportSchemas, 
  supportDatePublished, 
  supportDateModified,
  setSupportDates,
} from '@/shared/data/pages/support';

// Обновляем даты при каждом рендере
const today = new Date().toISOString().substring(0, 10);
setSupportDates({
  published: today,
  modified: today
});

// Извлекаем данные из схем для метаданных
const articleSchema = supportSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = supportSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Поддержка клиентов 2026 | Велес Вояж',
  description: articleSchema?.description || 'Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии, бронирование, круглосуточная поддержка, туризм 2026.',
  url: 'https://veles-voyage.ru/support',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: supportDatePublished,
  modifiedTime: supportDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Поддержка клиентов - Велес Вояж',
    description: 'Видео о поддержке клиентов турагентства Велес Вояж',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

export default function SupportPage() {
  return (
    <>
      <StructuredData schemas={supportSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Главная
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-indigo-600 dark:text-indigo-400 font-medium">Поддержка</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in-up">
            <span className="mr-2">🎧</span>
            <span className="text-gradient-animated drop-shadow-md">
              Поддержка клиентов турагентства «Велес Вояж»
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Наша главная задача — чтобы ваш отдых был максимально комфортным и безопасным.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Main Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Мы не просто подбираем туры, а сопровождаем клиентов на каждом этапе путешествия: 
                от выбора направления до возвращения домой.
              </p>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Зачем нужна поддержка турагентства
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Путешествие — это эмоции, новые впечатления и открытия. Но при организации поездки часто возникают вопросы:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>какой туроператор надёжнее;</li>
                  <li>какие документы нужны для поездки в выбранную страну;</li>
                  <li>что делать при задержке рейса или изменении маршрута;</li>
                  <li>куда обращаться, если возникнут сложности на месте отдыха.</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Мы берём все эти вопросы на себя. Поддержка от турагентства «Велес Вояж» — это ваша уверенность, 
                  что поездка пройдёт без лишних забот.
                </p>
              </div>

              <h2 className="text-3xl font-extrabold mb-8 text-center animate-fade-in-up">
                <span className="text-gradient-animated drop-shadow-md">
                  В чём заключается наша поддержка
                </span>
              </h2>

              {/* Support Stages */}
              <div className="space-y-12">
                {/* Before Travel */}
                <div className="border-l-4 border-indigo-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    1. Перед поездкой
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Консультации по выбору страны, отеля и формата отдыха</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Подбор туров у проверенных туроператоров</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Помощь в оформлении документов и страховки</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Информирование о правилах въезда, визах и необходимых прививках</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Подбор оптимальных опций: трансфер, экскурсии, доп. сервисы</span>
                    </li>
                  </ul>
                </div>

                {/* During Travel */}
                <div className="border-l-4 border-green-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    2. Во время путешествия
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Круглосуточная связь с агентством</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Помощь при задержках или отменах рейсов</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Сопровождение при вопросах по заселению, трансферу и экскурсиям</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Экстренная помощь и рекомендации на месте</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Связь с представителями туроператоров и партнёров</span>
                    </li>
                  </ul>
                </div>

                {/* After Travel */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    3. После возвращения
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Решение возможных вопросов и претензий с туроператором</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Обратная связь и анализ поездки</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mt-1 mr-3">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Индивидуальные предложения и скидки для постоянных клиентов</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white mb-12">
              <h2 className="text-3xl font-extrabold mb-6 text-center animate-fade-in-up">
                <span className="text-gradient-animated drop-shadow-md">
                  Почему выбирают нас
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">✅ Надёжные партнёры</h3>
                  <p>Работаем только с надёжными туроператорами и проверенными партнёрами.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">✅ Официальная регистрация</h3>
                  <p>Имеем официальную регистрацию в реестре турагентств — № РТА 0035678 от 21.06.2023 г., что подтверждает нашу легальность и ответственность.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">✅ Персональный подход</h3>
                  <p>Каждому клиенту — персональный менеджер и оперативная поддержка.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">✅ Разнообразие услуг</h3>
                  <p>Сопровождаем как стандартные пакеты, так и индивидуальные туры и круизы.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Контакты поддержки
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Телефон</h3>
                    <a href="tel:+79850635134" className="text-blue-600 dark:text-blue-400 hover:underline">
                      +7 (985) 063-51-34
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                    <a href="mailto:hello@veles-voyage.ru" className="text-blue-600 dark:text-blue-400 hover:underline">
                      hello@veles-voyage.ru
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Telegram</h3>
                    <a href="https://t.me/Anastasiiiiyyaa" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      @Anastasiiiiyyaa
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-center">
                <h3 className="text-xl font-bold mb-2">Мы всегда на связи</h3>
                <p className="mb-4">Готовы помочь вам в любой ситуации, связанной с вашим путешествием.</p>
                <p className="text-sm opacity-90">Круглосуточная поддержка</p>
              </div>
            </div>
            
            {/* Registry Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Реестровый номер турагента
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ООО «Велес» включено в Единый Федеральный реестр турагентов, субагентов.
              </p>
              <a 
                href="https://ev.economy.gov.ru/lk_exp/registry/ta/b2f9be6b-d62c-4290-bffd-42b171b115f0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Запись в реестре № РТА 0035678 от 21.06.2023 г.
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}