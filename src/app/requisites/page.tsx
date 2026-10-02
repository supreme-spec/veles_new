import type { Metadata } from 'next';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: 'Реквизиты ООО Велес: турагентство Велес Вояж 2026',
  description: 'Официальные реквизиты ООО «Велес» - туристического агентства Велес Вояж. ИНН, ОГРН, банковские реквизиты, юридический адрес. Лицензия РТА 0035678.',
  keywords: [
    'реквизиты',
    'ООО Велес',
    'ИНН',
    'ОГРН',
    'банковские реквизиты',
    'юридический адрес',
    'туристическое агентство',
    'Велес Вояж',
    'РТА 0035678'
  ],
  alternates: {
    canonical: `${SITE_URL}/requisites`,
    languages: {
      ru: `${SITE_URL}/requisites`,
      'x-default': `${SITE_URL}/requisites`,
    },
  },
  openGraph: {
    title: 'Реквизиты компании | Велес Вояж',
    description: 'Официальные реквизиты ООО «Велес» - туристического агентства Велес Вояж.',
    url: `${SITE_URL}/requisites`,
    siteName: 'Велес Вояж',
    locale: 'ru_RU',
    type: 'website',
  }
};

export default function RequisitesPage() {
  // Structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'ООО «Велес»',
    'alternateName': 'LLC "VELES"',
    'legalName': 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ВЕЛЕС"',
    'url': SITE_URL,
    'taxID': '5032362524',
    'vatID': '503201001',
    'foundingDate': '2023',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'пр-кт Керамиков, д. 103, кв. 40',
      'addressLocality': 'Голицыно',
      'addressRegion': 'Московская область',
      'postalCode': '143041',
      'addressCountry': 'RU'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+7-985-063-51-34',
      'email': 'hello@veles-voyage.ru',
      'contactType': 'customer service'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Реквизиты компании
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              ООО «Велес» — профессиональная деятельность туристического агентства
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            
            {/* Introduction */}
            <section className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <strong>ООО «Велес»</strong> осуществляет деятельность в сфере туристических услуг в соответствии с <strong>ОКВЭД 79.11 «Деятельность туристических агентств»</strong>.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Компания специализируется на подборе, оформлении и сопровождении туристических поездок, предоставляя клиентам полный комплекс услуг для комфортного и безопасного отдыха.
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Мы предоставляем:
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                  <span>подбор туров от ведущих российских и зарубежных туроператоров;</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                  <span>бронирование авиабилетов, гостиниц и трансферов;</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                  <span>консультации по визовым вопросам и оформлению документов;</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                  <span>организацию индивидуальных, семейных и групповых путешествий;</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                  <span>сопровождение клиента на всех этапах поездки.</span>
                </li>
              </ul>
            </section>

            {/* Registry Info */}
            <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>ООО «Велес»</strong> включено в <strong>Единый Федеральный реестр турагентов и субагентов</strong>.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
                Запись в реестре:{' '}
                <a 
                  href="https://ev.economy.gov.ru/lk_exp/registry/ta/b2f9be6b-d62c-4290-bffd-42b171b115f0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-semibold"
                >
                  № РТА 0035678
                </a>.
              </p>
            </section>

            <section className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Компания работает в строгом соответствии с законодательством РФ и установленными стандартами туристической отрасли, гарантируя надежность, высокий уровень сервиса и профессиональный подход к каждому клиенту.
              </p>
            </section>

            {/* Company Details */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «ВЕЛЕС» / LLC "VELES"
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ИНН / КПП</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      5032362524 / 503201001
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ОГРН</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      1235000077685
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Юридический адрес:</p>
                  <p className="text-lg text-gray-900 dark:text-white">
                    143041, МОСКОВСКАЯ ОБЛАСТЬ, г.о. Одинцовский, г Голицыно, пр-кт Керамиков, д. 103, кв. 40
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Основной вид деятельности:</p>
                  <p className="text-lg text-gray-900 dark:text-white">
                    79.11 Деятельность туристических агентств
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Коды видов деятельности в области информационных технологий:</p>
                  <ul className="space-y-1 text-gray-900 dark:text-white">
                    <li>• 62.01 — разработка компьютерного программного обеспечения</li>
                    <li>• 62.02 — деятельность консультативная и работы в области компьютерных технологий</li>
                    <li>• 62.09 — деятельность, связанная с использованием вычислительной техники и информационных технологий, прочая</li>
                    <li>• 63.11 — деятельность по обработке данных, предоставление услуг по размещению информации и связанная с этим деятельность</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bank Details */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Банковские реквизиты:
              </h2>
              
              <div className="space-y-3 text-gray-900 dark:text-white">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Расчетный счет:</p>
                  <p className="text-lg font-mono">40702810340000410807</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Банк:</p>
                  <p className="text-lg">ПАО Сбербанк</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">БИК:</p>
                  <p className="text-lg font-mono">044525225</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Корреспондентский счет:</p>
                  <p className="text-lg font-mono">30101810400000000225</p>
                </div>
              </div>
            </section>

            {/* Management */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="space-y-3 text-gray-900 dark:text-white">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Генеральный директор:</p>
                  <p className="text-lg">Свистунов Сергей Григорьевич</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    действует на основании Устава
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">E-mail:</p>
                  <a 
                    href="mailto:hello@veles-voyage.ru"
                    className="text-lg text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    hello@veles-voyage.ru
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Телефон:</p>
                  <a 
                    href="tel:+79850635134"
                    className="text-lg text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    +7 985 063-51-34
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

