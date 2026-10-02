import type { Metadata } from 'next';
import VelesFlightsWidget from '@/components/widgets/VelesFlightsWidget';

export const metadata: Metadata = {
  title: 'Авиабилеты: поиск и бронирование по миру 2026',
  description: 'Поиск и бронирование авиабилетов у официальных перевозчиков без скрытых комиссий. Сравнение сотен вариантов, удобные стыковки и честные цены на даты вашей поездки.',
  keywords: [
    'авиабилеты',
    'билеты на самолет',
    'поиск авиабилетов',
    'дешевые авиабилеты',
    'бронирование авиабилетов',
    'перелеты по миру',
    'авиабилеты онлайн',
    'прямые рейсы',
    'авиакомпании',
    'билеты за границу',
    'авиабилеты из России',
    'чартерные рейсы'
  ],
  alternates: {
    canonical: 'https://veles-voyage.ru/flights',
    languages: {
      ru: 'https://veles-voyage.ru/flights',
      'x-default': 'https://veles-voyage.ru/flights',
    },
  },
  openGraph: {
    title: 'Авиабилеты по всему миру | Велес Вояж',
    description: 'Поиск и бронирование авиабилетов у официальных перевозчиков по лучшим ценам',
    url: 'https://veles-voyage.ru/flights',
    siteName: 'Велес Вояж',
    locale: 'ru_RU',
    type: 'website',
    images: ['https://veles-voyage.ru/images/archive/flights/flights-hero.jpg'],
  }
};

// Schema.org structured data for voice search, AI, web3 compatibility
const flightsSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAction",
  "name": "Авиабилеты по всему миру",
  "description": "Поиск и бронирование авиабилетов у официальных перевозчиков без скрытых комиссий. Сравнение сотен вариантов, удобные стыковки и честные цены на даты поездки от Велес Вояж.",
  "actionStatus": "PotentialActionStatus",
  "target": "https://veles-voyage.ru/flights",
  "provider": {
    "@type": "Organization",
    "name": "Велес Вояж",
    "url": "https://veles-voyage.ru"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://veles-voyage.ru"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Авиа/Отели",
      "item": "https://veles-voyage.ru/flights"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Как найти самые дешевые авиабилеты?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ищите билеты заранее, сравнивайте даты вылета с гибким окном плюс-минус несколько дней и рассматривайте рейсы с пересадками наравне с прямыми. Подпишитесь на уведомления о снижении цен и бронируйте через проверенных партнеров без скрытых комиссий. Наша система сравнивает сотни вариантов, чтобы предложить честную цену на выбранные даты."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли вернуть авиабилет, если передумал?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Возврат зависит от тарифа: возвратные билеты можно сдать полностью или частично, а невозвратные обычно допускают возврат только при болезни или отмене рейса перевозчиком. Обмен и возврат оформляются в личном кабинете или через службу поддержки 24/7. Точные условия всегда указаны при бронировании до оплаты."
      }
    },
    {
      "@type": "Question",
      "name": "Нужна ли виза при покупке авиабилета?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Сам билет можно купить без визы, но для въезда в страну назначения может потребоваться виза, загранпаспорт со сроком действия не менее 6 месяцев и проездной документ. Наши специалисты помогут проверить визовые требования по направлению и подобрать подходящий маршрут."
      }
    }
  ]
};

// Web3 and voice search optimization schema
const web3Schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Велес Вояж",
  "url": "https://veles-voyage.ru",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://veles-voyage.ru/flights{?q}",
    "query-input": "required name=q"
  },
  "about": {
    "@type": "TravelAgency",
    "name": "Велес Вояж",
    "description": "Онлайн сервис по поиску и бронированию авиабилетов у официальных перевозчиков. Удобные стыковки, честные цены, поддержка 24/7."
  }
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Авиабилеты по всему миру: поиск и бронирование по лучшим ценам",
  "description": "Поиск и бронирование авиабилетов у официальных перевозчиков без скрытых комиссий. Сравнение сотен вариантов, удобные стыковки и честные цены.",
  "image": "https://veles-voyage.ru/images/archive/flights/flights-hero.jpg",
  "datePublished": "2026-07-15",
  "dateModified": "2026-07-15",
  "author": [
    { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция" },
    { "@type": "Organization", "name": "Велес Вояж" }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Велес Вояж",
    "logo": {
      "@type": "ImageObject",
      "url": "https://veles-voyage.ru/images/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://veles-voyage.ru/flights"
  },
  "articleSection": "Авиабилеты",
  "keywords": "авиабилеты, поиск авиабилетов, бронирование, перелеты, авиакомпании",
  "wordCount": 2500,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": "2026-07-15"
};

export default function FlightsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 lg:py-16">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
            <span className="text-gradient-animated drop-shadow-md">
              ✈️ Авиабилеты по всему миру
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
            Поиск и бронирование у официальных перевозчиков по лучшим ценам
          </p>
        </div>

        {/* Search Widget */}
        <section className="mb-12 sm:mb-16" aria-label="Поиск авиабилетов">
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-modern-lg p-4 sm:p-6 md:p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Поиск авиабилетов
            </h2>
            <VelesFlightsWidget />
          </div>
        </section>

        {/* Services Section */}
        <section aria-label="Преимущества" className="py-10 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                <span className="text-gradient-animated drop-shadow-md">
                  Почему выбирают нас
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Мы создаём удобные решения для путешествий
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern pointer-events-none z-0"></div>
                <div className="relative z-10 p-3 sm:p-4 md:p-5 lg:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 animate-float">🌍</div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2">По всему миру</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">Более 200 стран и регионов</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern pointer-events-none z-0"></div>
                <div className="relative z-10 p-3 sm:p-4 md:p-5 lg:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 animate-float">💰</div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2">Лучшие цены</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">Сравнение цен от ведущих авиакомпаний</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern pointer-events-none z-0"></div>
                <div className="relative z-10 p-3 sm:p-4 md:p-5 lg:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 animate-float">⚡</div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2">Мгновенно</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">Бронирование в несколько кликов</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern pointer-events-none z-0"></div>
                <div className="relative z-10 p-3 sm:p-4 md:p-5 lg:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 animate-float">🛡️</div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2">Надежно</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">Гарантия безопасности платежей</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900" aria-label="Преимущества сервиса">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                <span className="text-gradient-animated drop-shadow-md">
                  Индивидуальный подход к каждому рейсу
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Мы помогаем подобрать билеты под ваши задачи, бюджет и график
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-lg mr-4">
                    <div className="text-2xl">🌍</div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Индивидуальный подбор рейсов</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      Наши специалисты помогут подобрать оптимальный рейс, учитывая ваши интересы, бюджет и время поездки. Мы предлагаем перелёты различной продолжительности и направлений по всему миру.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-lg mr-4">
                    <div className="text-2xl">🔍</div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Экспертная консультация</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      Профессиональная помощь в планировании путешествий. Наши менеджеры проконсультируют по всем вопросам, помогут с выбором направления и маршрута.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-lg mr-4">
                    <div className="text-2xl">💳</div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Гибкие условия бронирования</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      Различные варианты оплаты, возможность изменений и отмены бронирования. Прозрачные условия без скрытых комиссий.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-lg mr-4">
                    <div className="text-2xl">📞</div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Сопровождение 24/7</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      Поддержка на всех этапах путешествия — до, во время и после поездки. Помощь в решении любых вопросов.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 sm:py-12 lg:py-16" aria-label="Контакты">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Готовы к путешествию?</h2>
              <p className="text-sm sm:text-base md:text-lg text-indigo-100 mb-6 sm:mb-8">
                Найдите лучшие предложения на авиабилеты через нашу партнёрскую платформу
              </p>
              <a
                href="https://t.me/Anastasiiiiyyaa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg hover:bg-gray-100 transition-colors font-bold text-base sm:text-lg shadow-lg transform hover:scale-105 no-underline"
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 sm:py-12 lg:py-16 bg-white dark:bg-gray-900" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-10 text-center text-gray-900 dark:text-white">
              Часто задаваемые вопросы
            </h2>

            <div className="space-y-6 sm:space-y-8">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Как найти самые дешевые авиабилеты?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Ищите билеты заранее, сравнивайте даты вылета с гибким окном плюс-минус несколько дней и рассматривайте рейсы с пересадками наравне с прямыми. Подпишитесь на уведомления о снижении цен и бронируйте через проверенных партнеров без скрытых комиссий.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Можно ли вернуть авиабилет, если передумал?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Возврат зависит от тарифа: возвратные билеты можно сдать полностью или частично, а невозвратные обычно допускают возврат только при болезни или отмене рейса перевозчиком. Точные условия всегда указаны при бронировании до оплаты.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Нужна ли виза при покупке авиабилета?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Сам билет можно купить без визы, но для въезда в страну назначения может потребоваться виза, загранпаспорт со сроком действия не менее 6 месяцев и проездной документ. Наши специалисты помогут проверить визовые требования.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Structured Data for SEO, voice search, AI and web3 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(flightsSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(web3Schema) }}
        />
      </div>
    </div>
  );
}
