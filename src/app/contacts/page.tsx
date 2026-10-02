import Image from 'next/image';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { TelegramButton } from '@/components/TelegramButton';
import { SchemaScripts } from '@/components/SchemaScripts';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Контакты Велес Вояж: телефон и офисы 2026 | Связь',
  description: 'Контакты турагентства: телефон +7 985 063-51-34, email hello@veles-voyage.ru, Telegram. Офисы в Голицыно и Пушкино. Дистанционное обслуживание по всей России.',
  url: `${SITE_URL}/contacts`,
  type: 'website',
  keywords: ['контакты', 'Велес Вояж', 'турагентство', 'телефон', 'email', 'адрес', 'Голицыно', 'Пушкино', 'поддержка', 'связь'],
});

export default function ContactsPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'Велес Вояж',
    'description': 'Туристическое агентство Велес Вояж — эксперты в организации путешествий по России и за рубежом',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'пр-т Керамиков, д. 103',
      'addressLocality': 'Голицыно',
      'addressRegion': 'Московская область',
      'postalCode': '143041',
      'addressCountry': 'RU'
    },
    'telephone': '+7 985 063-51-34',
    'email': 'hello@veles-voyage.ru',
    'url': `${SITE_URL}/contacts`,
    'sameAs': [
      'https://vk.com/veles__voyage',
      'https://t.me/veles_voyage',
      'https://rutube.ru/u/velesvoyage/',
      'https://share.google/sWNqMpS7z0SJiMqO7',
      'https://yandex.com/maps/?text=Велес+Вояж+Голицыно'
    ],
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 55.609955,
      'longitude': 36.965818
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+7-985-063-51-34',
      'contactType': 'customer support',
      'email': 'hello@veles-voyage.ru',
      'availableLanguage': ['Russian', 'English']
    },
    'openingHoursSpecification': [{
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '21:00'
    }, {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Saturday', 'Sunday'],
      'opens': '10:00',
      'closes': '16:00'
    }],
    'hasMap': 'https://yandex.ru/maps/org/veles_voyazh/129552746144',
    'areaServed': [
      { '@type': 'Country', 'name': 'Russia' },
      { '@type': 'Country', 'name': 'Belarus' },
      { '@type': 'Country', 'name': 'Kazakhstan' },
      { '@type': 'Country', 'name': 'Armenia' },
      { '@type': 'Country', 'name': 'Azerbaijan' },
      { '@type': 'Country', 'name': 'Georgia' },
      { '@type': 'Country', 'name': 'Turkey' },
      { '@type': 'Country', 'name': 'Abkhazia' }
    ],
    'availableLanguage': ['Russian', 'English']
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Как связаться с Велес Вояж',
    'description': 'Пошаговая инструкция по связи с турагентством для подбора тура.',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'RUB',
      'value': '0'
    },
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Выберите способ связи',
        'text': 'Используйте телефон +7 985 063-51-34, Telegram @veles_voyage, email или форму обратной связи.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Опишите задачу',
        'text': 'Напишите направление, даты, бюджет и количество туристов.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Получите консультацию',
        'text': 'Менеджер подберёт варианты и ответит в течение 15 минут.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Подтвердите бронирование',
        'text': 'Выберите тур и оформите документы онлайн или в офисе в Голицыно или Пушкино.'
      }
    ]
  };

  const golitsinoSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Велес Вояж - Офис в Голицыно',
    'description': 'Офис турагентства Велес Вояж в Голицыно. Подбор туров, круизов и индивидуальных путешествий.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'пр-т Керамиков, д. 103',
      'addressLocality': 'Голицыно',
      'addressRegion': 'Московская область',
      'postalCode': '143041',
      'addressCountry': 'RU'
    },
    'telephone': '+7 985 063-51-34',
    'email': 'hello@veles-voyage.ru',
    'url': `${SITE_URL}/contacts`,
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 55.609955,
      'longitude': 36.965818
    },
    'openingHoursSpecification': [{
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '21:00'
    }, {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Saturday', 'Sunday'],
      'opens': '10:00',
      'closes': '18:00'
    }],
    'hasMap': 'https://yandex.ru/maps/org/veles_voyazh/129552746144',
    'parentOrganization': {
      '@type': 'TravelAgency',
      'name': 'Велес Вояж',
      'url': SITE_URL
    }
  };

  const pushkinoSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Велес Вояж - Офис в Пушкино',
    'description': 'Офис турагентства Велес Вояж в Пушкино. Подбор туров, круизов и индивидуальных путешествий.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'пр-т Московский, д. 9/2',
      'addressLocality': 'Пушкино',
      'addressRegion': 'Московская область',
      'postalCode': '141200',
      'addressCountry': 'RU'
    },
    'telephone': '+7 985 063-51-34',
    'email': 'hello@veles-voyage.ru',
    'url': `${SITE_URL}/contacts`,
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 56.010503,
      'longitude': 37.847823
    },
    'openingHoursSpecification': [{
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '21:00'
    }, {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Saturday', 'Sunday'],
      'opens': '10:00',
      'closes': '18:00'
    }],
    'hasMap': 'https://yandex.ru/maps/org/veles_voyazh/129552746144',
    'parentOrganization': {
      '@type': 'TravelAgency',
      'name': 'Велес Вояж',
      'url': SITE_URL
    }
  };

  const faqData = [{
    question: 'В какое время лучше звонить?',
    answer: 'По будням с 10:00 до 18:00 наши менеджеры на связи по телефону +7 985 063-51-34. В остальное время пишите в Telegram — отвечаем в течение 30 минут.'
  }, {
    question: 'Отвечаете ли вы в Telegram?',
    answer: 'Да. Мы на связи в Telegram круглосуточно. Это самый быстрый способ получить консультацию, уточнить детали тура и оформить бронирование.'
  }, {
    question: 'Как связаться с Велес Вояж?',
    answer: 'Вы можете связаться с нами по телефону +7 985 063-51-34, электронной почте hello@veles-voyage.ru или через Telegram @veles_voyage.'
  }, {
    question: 'Какие офисы Велес Вояж существуют?',
    answer: 'У нас есть офисы в Голицыно по адресу пр-т. Керамиков, 103 и в Пушкино по адресу пр-т. Московский, 9/2. Также работаем дистанционно по всей России.'
  }, {
    question: 'Какие часы работы у Велес Вояж?',
    answer: 'Мы работаем с 9:00 до 21:00 по будням и с 10:00 до 18:00 по выходным (время московское, UTC+3).'
  }, {
    question: 'Как заказать консультацию?',
    answer: 'Вы можете заказать консультацию через форму на сайте, в Telegram или по телефону. Менеджер подберёт тур под ваши пожелания и бюджет.'
  }];

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Контакты и офисы Велес Вояж',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.voice-snippet', '#contact-us'],
    },
  };

  return (
    <article className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        {/* Заголовок */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="mr-2">📞</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Получите варианты вашего путешествия
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Расскажите о ваших планах — мы поможем подобрать подходящие варианты отдыха
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" aria-labelledby="contact-us">
              <h2 id="contact-us" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                🏢 Как связаться с нами за 5 минут
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Не любите заполнять формы? Напишите менеджеру Анастасии в Telegram — подберём тур за
                15 минут, а не за два дня.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Наши офисы</h3><br />
                    <div className="space-y-4">
                      <div className="mb-6">
                        <p className="font-medium text-gray-900 dark:text-white">Голицыно</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          пр-т Керамиков, д. 103<br />
                          Голицыно, Московская обл., 143041<br />
                          Россия
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Пушкино</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          пр-т Московский, д. 9/2<br />
                          Пушкино, Московская обл., 141207<br />
                          Россия
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Телефон</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +7 985 063-51-34
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      hello@veles-voyage.ru
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Время работы</h3>
                     <p className="text-gray-600 dark:text-gray-300">
                       Пн-Пт: 9:00 - 21:00<br />
                       Сб-Вс: 10:00 - 16:00<br />
                       МСК (UTC+3)
                     </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Регионы обслуживания */}
            <section className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl shadow-lg p-8 border border-emerald-200 dark:border-emerald-700" aria-labelledby="service-area">
              <h2 id="service-area" className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                🌍 Где мы работаем
              </h2>

              <div className="text-center">
                <div className="inline-flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🇷🇺</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Работаем по всей России
                    </h3>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
                      Дистанционное обслуживание
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Независимо от вашего местоположения, мы готовы организовать путешествие мечты с
                  полным сопровождением онлайн.
                </p>
              </div>
            </section>

            {/* Социальные сети */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" aria-labelledby="social">
              <h2 id="social" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                🌐 Мы в социальных сетях
              </h2>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="https://vk.com/veles__voyage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image
                      src="/images/vk.png"
                      alt="VKontakte"
                      width={32}
                      height={32}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-lg">ВКонтакте</span>
                </a>

                <a
                  href="https://t.me/veles_voyage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image
                      src="/images/telegram.png"
                      alt="Telegram"
                      width={32}
                      height={32}
                      className="object-contain rounded-full"
                      unoptimized
                    />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-lg">Telegram</span>
                </a>
              </div>
            </section>

            {/* Карты */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" aria-labelledby="maps">
              <h2 id="maps" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                🗺️ Мы на картах
              </h2>

              <div className="space-y-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Офис в Голицыно</h3>
                   <iframe
                      src="https://yandex.ru/map-widget/v1/?ll=36.965818%2C55.609955&z=16&pt=36.965818,55.609955,pm2rdm"
                      width="100%"
                      height="300"
                      frameBorder="0"
                      className="rounded-lg border border-gray-200 dark:border-gray-700"
                      style={{ height: '300px' }}
                      title="Карта офиса Велес Вояж в Голицыно"
                    />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Офис в Пушкино</h3>
                   <iframe
                      src="https://yandex.ru/map-widget/v1/?ll=37.847823%2C56.010503&z=16&pt=37.847823,56.010503,pm2rdm"
                      width="100%"
                      height="300"
                      frameBorder="0"
                      className="rounded-lg border border-gray-200 dark:border-gray-700"
                      style={{ height: '300px' }}
                      title="Карта офиса Велес Вояж в Пушкино"
                    />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="https://share.google/sWNqMpS7z0SJiMqO7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-lg">Google Карты</span>
                </a>

                <a
                  href="https://yandex.com/maps/?text=Велес+Вояж+Голицыно"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-lg">Яндекс Карты</span>
                </a>
              </div>
            </section>
          </div>

          {/* Форма обратной связи */}
          <ContactForm />
        </div>

        {/* Дополнительная информация */}
        <section className="mt-16" aria-labelledby="requisites">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 id="requisites" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📋 Реквизиты компании
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Общество с ограниченной ответственностью «Велес». Лицензия РТА 0035678 от 21.06.2023.
              Юридический адрес: Московская область, Одинцовский район, Голицыно, пр-т. Керамиков, 103,
              143041. Работаем дистанционно по всей России, несём юридическую ответственность за
              организацию поездки по договору.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🚀 Готовы к новым приключениям?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Наши специалисты готовы помочь спланировать идеальное путешествие и подобрать тур под ваши
              пожелания и бюджет.
            </p>
            <div className="flex justify-center">
              <TelegramButton />
            </div>
      <SchemaScripts schemas={[
        contactSchema,
        golitsinoSchema,
        pushkinoSchema,
        howToSchema,
        speakableSchema,
        {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqData.map((item) => ({
                  "@type": "Question",
                  "name": item.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                  }
                }))
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Велес Вояж",
                "url": SITE_URL,
                "logo": `${SITE_URL}/logo.png`,
                "sameAs": [
                  "https://vk.com/veles__voyage",
                  "https://t.me/veles_voyage",
                  "https://rutube.ru/u/velesvoyage/",
                  "https://share.google/sWNqMpS7z0SJiMqO7",
                  "https://yandex.com/maps/-/CTfJm2lo"
                ],
                "contactPoint": [{
                  "@type": "ContactPoint",
                  "telephone": "+7-985-063-51-34",
                  "contactType": "customer support",
                  "availableLanguage": ["Russian", "English"],
                  "areaServed": "Worldwide"
                }]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Велес Вояж",
                "url": SITE_URL,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": `${SITE_URL}/wiki/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string"
                },
                "inLanguage": "ru",
                "alternateName": [
                  "Veles Voyage",
                  "Travel Agency",
                  "Tourism Guide"
                ]
              }
            ]} />
          </div>
        </section>
      </div>
    </article>
  );
}
