import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { SITE_URL } from '@/shared/constants/seo';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Партнёры Велес Вояж — надежные компании и сервисы',
  description:
    'Наши проверенные партнёры: Franglish (языковые курсы), Музыкальные Жабы (технический продакшн мероприятий), Небольшие (билингвальный детский сад в Москве).',
  url: `${SITE_URL}/partners`,
  type: 'website',
  keywords: [
    'партнёры Велес Вояж',
    'репетитор английского',
    'репетитор французского',
    'Franglish',
    'технический продакшн мероприятий',
    'Музыкальные Жабы',
    'Тимур Жабский',
    'детский сад Небольшие',
    'билингвальный детский сад',
  ],
});

const breadcrumbsSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Партнёры', item: `${SITE_URL}/partners` },
  ],
};

const franglishSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Franglish',
  alternateName: 'Колесникова Анастасия Юрьевна',
  url: 'https://franglish-original.ru/',
  telephone: '+7-985-063-51-34',
  logo: 'https://franglish-original.ru/photo.webp',
  image: 'https://franglish-original.ru/photo.webp',
  description:
    'Персональный репетитор английского и французского языков с 18-летним опытом работы. Индивидуальный подход, современные методики и гарантированный результат.',
  foundingDate: '2006',
  sameAs: [
    'https://t.me/anastasia_franglish',
    'https://wa.me/79850635134',
    'https://franglish-original.ru/'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-985-063-51-34',
    contactType: 'customer service',
    availableLanguage: ['Russian', 'English', 'French']
  },
  knowsAbout: [
    'Английский язык',
    'Французский язык',
    'Подготовка к ЕГЭ',
    'Подготовка к ОГЭ',
    'CAE',
    'TKT',
    'PTE',
    'Разговорные курсы'
  ]
};

const zhabitSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Музыкальные Жабы',
  alternateName: 'Тимур Жабский',
  url: 'https://zhabit.ru/',
  telephone: '+7-977-887-17-42',
  logo: `${SITE_URL}/images/partners/logo-zhabit.jpg`,
  image: `${SITE_URL}/images/partners/logo-zhabit.jpg`,
  description:
    'Комплексный технический продакшн от Тимура Жабского: аренда сцены Layher, профессиональный звук L-Acoustics, свет grandMA3, LED-экраны, генераторы ДГУ N+1 и еврофуры. 20 лет опыта в техническом обеспечении мероприятий.',
  foundingDate: '2006',
  sameAs: ['https://zhabit.ru/'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-977-887-17-42',
    contactType: 'customer service',
    availableLanguage: ['Russian']
  },
  knowsAbout: [
    'Техническое оснащение мероприятий',
    'Аренда сцены Layher',
    'Звуковое оборудование L-Acoustics',
    'Световое шоу grandMA3',
    'LED экраны',
    'Генераторы ДГУ N+1'
  ]
};

const nebolshieSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Небольшие',
  url: 'https://nebolshie.ru/',
  telephone: '+7-985-529-55-53',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Народного ополчения, д. 11',
    addressLocality: 'Москва',
    addressCountry: 'RU'
  },
  logo: `${SITE_URL}/images/partners/logo-nebolshie.png`,
  image: `${SITE_URL}/images/partners/logo-nebolshie.png`,
  description:
    'Частный билингвальный детский сад в Москве: бережная адаптация, билингвальная среда, небольшие группы, сбалансированное пятиразовое питание и гармоничное развитие ребенка.',
  sameAs: ['https://nebolshie.ru/'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-985-529-55-53',
    contactType: 'customer service',
    availableLanguage: ['Russian', 'English']
  },
  knowsAbout: [
    'Дошкольное образование',
    'Билингвальная среда',
    'Детский сад',
    'Раннее развитие',
    'Подготовка к школе'
  ]
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Партнёры Велес Вояж',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.partner-speakable']
  }
};

export default function PartnersPage() {
  const partners = [
    {
      id: 'franglish',
      name: 'Franglish',
      description: 'Английский и французский языки',
      fullDescription:
        'Персональный репетитор английского и французского языков с 18-летним опытом работы. Индивидуальный подход, современные методики и гарантированный результат. Подготовка к ЕГЭ и ОГЭ, разговорные курсы, международные экзамены CAE, TKT, PTE.',
      logo: '/images/partners/logo-franglish.webp',
      alt: 'Franglish — репетитор английского и французского',
      url: 'https://franglish-original.ru/',
      benefits: ['18+ лет опыта', 'Сертифицированный эксперт ЕГЭ', 'Индивидуальный подход', 'Онлайн-занятия'],
    },
    {
      id: 'zhabit',
      name: 'Тимур Жабский / Музыкальные Жабы',
      description: 'Техническое оснащение мероприятий',
      fullDescription:
        'Комплексный технический продакшн от Тимура Жабского: аренда сцены Layher, звук мирового уровня L-Acoustics, интеллектуальный свет grandMA3, LED-экраны, дизель-генераторы ДГУ N+1 и собственный автопарк. 20 лет опыта в техническом обеспечении фестивалей и концертов.',
      logo: '/images/partners/logo-zhabit.jpg',
      alt: 'Музыкальные Жабы — технический продакшн Тимура Жабского',
      url: 'https://zhabit.ru/',
      benefits: ['20 лет опыта', 'Звук L-Acoustics', 'Сцены Layher', 'Свет grandMA3', 'Энергокомплекс N+1'],
    },
    {
      id: 'nebolshie',
      name: 'Небольшие',
      description: 'Билингвальный детский сад в Москве',
      fullDescription:
        'Частный билингвальный детский сад в Москве: бережная адаптация, погружение в языковую среду с ранних лет, мини-группы, сбалансированное пятиразовое питание и всестороннее развитие творческого потенциала ребенка.',
      logo: '/images/partners/logo-nebolshie.png',
      alt: 'Небольшие — частный билингвальный детский сад в Москве',
      url: 'https://nebolshie.ru/',
      benefits: ['Билингвальная среда', 'Маленькие группы', 'Индивидуальный подход', '5-разовое питание', 'ул. Народного Ополчения, 11'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-20 pt-20 md:pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Наши партнёры
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Мы сотрудничаем с проверенными профессионалами, чтобы сделать ваше путешествие и подготовку к нему комфортными и надёжными.
          </p>
        </div>

        <StructuredData schemas={[breadcrumbsSchema, franglishSchema, zhabitSchema, nebolshieSchema, speakableSchema]} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex-shrink-0 shadow-sm">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{partner.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{partner.description}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 partner-speakable" dangerouslySetInnerHTML={{ __html: partner.fullDescription }} />
              <div className="flex flex-wrap gap-2 mb-4">
                {partner.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="inline-block bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                Перейти на сайт партнёра
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
