import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/features/auth/context/AuthContext.simple';
import ClientProviders from './ClientProviders';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StickyMobileBar } from '@/components/StickyMobileBar';
import { TabletContactBar } from '@/components/TabletContactBar';
import { PWABackButton } from '@/components/PWABackButton';
import { PWANetworkStatus } from '@/components/PWANetworkStatus';
import { WebVitals } from '@/components/analytics/WebVitals';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';
import { ChunkLoadErrorBoundary } from '@/components/ChunkLoadErrorBoundary';
import { SITE_URL } from '@/shared/constants/seo';
import { SOCIAL_LINKS } from '@/shared/constants/seo';
import { SiteReviewSchema } from '@/shared/components/seo/SiteReviewSchema';

// Optimized font loading for Core Web Vitals (LCP/CLS)
const mainFont = Inter({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  preload: true,
  variable: '--font-main',
});

const siteUrl = SITE_URL;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'TravelAgency', 'LocalBusiness'],
      '@id': `${siteUrl}#organization`,
      name: 'Велес Вояж',
      alternateName: 'Veles Voyage',
      url: siteUrl,
      telephone: '+7-985-063-51-34',
      email: 'hello@veles-voyage.ru',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
        width: 512,
        height: 512,
        caption: 'Логотип турагентства Велес Вояж',
      },
      image: [
        {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`,
          width: 512,
          height: 512,
          caption: 'Логотип турагентства Велес Вояж',
        },
        {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/svistunov.webp`,
          width: 128,
          height: 128,
          caption:
            'Свистунов Сергей Григорьевич - Генеральный директор ООО Велес, турагентство Велес Вояж',
        },
        {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/kolesnikova.webp`,
          width: 128,
          height: 128,
          caption: 'Колесникова Анастасия Юрьевна - Директор ООО Велес, турагентство Велес Вояж',
        },
      ],
      description:
        'Туристическое агентство Велес Вояж — эксперты в организации индивидуальных туров, морских круизов и путешествий по России и миру.',
      foundingDate: '2023',
      priceRange: '₽₽',
      legalName: 'ООО «Велес»',
      license: 'РТА 0035678',
      sameAs: [
        SOCIAL_LINKS.telegram,
        SOCIAL_LINKS.vk,
        SOCIAL_LINKS.rutube,
        SOCIAL_LINKS.max,
        'https://www.rata.ru/agent/0035678',
        ...(SOCIAL_LINKS.yandexBusiness ? [SOCIAL_LINKS.yandexBusiness] : []),
        ...(SOCIAL_LINKS.gis2 ? [SOCIAL_LINKS.gis2] : []),
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+7-985-063-51-34',
          contactType: 'customer service',
          email: 'hello@veles-voyage.ru',
          areaServed: 'RU',
          availableLanguage: ['Russian', 'English'],
          availableChannel: ['Phone', 'Email', 'Telegram'],
        },
      ],
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'пр-т Керамиков, д. 103',
          addressLocality: 'Голицыно',
          addressRegion: 'Московская область',
          postalCode: '143041',
          addressCountry: 'RU',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'пр-т Московский, д. 9/2',
          addressLocality: 'Пушкино',
          addressRegion: 'Московская область',
          postalCode: '141207',
          addressCountry: 'RU',
        },
      ],
      location: [
        {
          '@type': 'Place',
          name: 'Офис в Голицыно',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'пр-т Керамиков, д. 103',
            addressLocality: 'Голицыно',
            addressRegion: 'Московская область',
            postalCode: '143041',
            addressCountry: 'RU',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 55.609955,
            longitude: 36.965818,
          }
        },
        {
          '@type': 'Place',
          name: 'Офис в Пушкино',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'пр-т Московский, д. 9/2',
            addressLocality: 'Пушкино',
            addressRegion: 'Московская область',
            postalCode: '141207',
            addressCountry: 'RU',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 56.010503,
            longitude: 37.847823,
          }
        }
      ],
      areaServed: [
        { '@type': 'Country', name: 'Russia' },
        { '@type': 'Country', name: 'Kazakhstan' },
        { '@type': 'Country', name: 'Belarus' },
        { '@type': 'Country', name: 'Armenia' },
        { '@type': 'Country', name: 'Azerbaijan' },
        { '@type': 'Country', name: 'Georgia' },
        { '@type': 'Country', name: 'Turkey' },
        { '@type': 'Country', name: 'Abkhazia' },
        { '@type': 'Country', name: 'Worldwide' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '21:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday'],
          opens: '10:00',
          closes: '16:00',
        },
      ],
      containsPlace: [
        {
          '@type': 'TravelAgency',
          name: 'Велес Вояж Голицыно',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'пр-т Керамиков, д. 103',
            addressLocality: 'Голицыно',
            addressRegion: 'Московская обл.',
            postalCode: '143041',
            addressCountry: 'RU',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 55.609955,
            longitude: 36.965818,
          },
        },
        {
          '@type': 'TravelAgency',
          name: 'Велес Вояж Пушкино',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'пр-т Московский, д. 9/2',
            addressLocality: 'Пушкино',
            addressRegion: 'Московская обл.',
            postalCode: '141207',
            addressCountry: 'RU',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 56.010503,
            longitude: 37.847823,
          },
        },
      ],
      hasMap: 'https://yandex.ru/maps/org/veles_voyazh/129552746144',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Туристические услуги',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Индивидуальные туры',
              description: 'Персональные маршруты под ваши интересы и бюджет',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Морские круизы',
              description: 'Круизы по Средиземному морю, Карибам и Балтике',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Путеводители по странам',
              description: 'Подробные гиды по 200+ странам мира',
            },
          },
        ],
      },
      knowsAbout: [
        'Туризм',
        'Путешествия',
        'Морские круизы',
        'Индивидуальные туры',
        'Визовая поддержка',
        'Бронирование отелей',
        'Авиабилеты',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'Велес Вояж',
      description: 'Энциклопедия путешествий и туристическое агентство',
      inLanguage: 'ru-RU',
      publisher: { '@id': `${siteUrl}#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/wiki/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: siteUrl,
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}#person/svistunov`,
      name: 'Свистунов Сергей Григорьевич',
      jobTitle: 'Генеральный директор, финансовый советник',
      image: `${siteUrl}/images/svistunov.webp`,
      sameAs: [
        'https://finradun.ru',
        SOCIAL_LINKS.vk,
        SOCIAL_LINKS.telegram,
        `${siteUrl}/about#team`,
      ],
      worksFor: { '@id': `${siteUrl}#organization` },
      knowsAbout: [
        'Финансовое консультирование',
        'Инвестиции',
        'Международный туризм',
        'Управление капиталом',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}#person/kolesnikova`,
      name: 'Колесникова Анастасия Юрьевна',
      jobTitle: 'Директор, эксперт по туризму',
      image: `${siteUrl}/images/kolesnikova.webp`,
      sameAs: [
        'https://franglish-original.ru',
        SOCIAL_LINKS.vk,
        SOCIAL_LINKS.telegram,
        `${siteUrl}/about#team`,
      ],
      worksFor: { '@id': `${siteUrl}#organization` },
      knowsAbout: [
        'Международный туризм',
        'Организация туров',
        'Визовая поддержка',
        'Круизные путешествия',
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Велес Вояж — туры и путешествия 2026',
    template: '%s | Велес Вояж',
  },
  description:
    'Турагентство Велес Вояж: индивидуальные туры, круизы, путеводители по 200+ странам. Поддержка 24/7, лицензия РТА 0035678. Забронируйте тур онлайн!',
  // Авторство
  authors: [{ name: 'Велес Вояж' }],
  creator: 'Велес Вояж',
  publisher: 'Велес Вояж',

  // Верификации (только реальные!)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || '',
    other: {
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || '',
      'bing-site-verification': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical
  alternates: {
    canonical: siteUrl,
    languages: {
      ru: siteUrl,
      'x-default': siteUrl,
    },
  },

  // Open Graph
  openGraph: {
    title: 'Велес Вояж — Официальное турагентство',
    description:
      'Профессиональная организация путешествий по России и миру. Полностью дистанционные услуги.',
    url: siteUrl,
    siteName: 'Велес Вояж',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Велес Вояж — Турагентство',
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Велес Вояж — Официальное турагентство',
    description: 'Профессиональная организация путешествий по России и миру.',
    images: [`${siteUrl}/images/og-default.jpg`],
    creator: '@veles_voyage',
    site: '@veles_voyage',
  },

  // Дополнительные метатеги
  other: {
    'telegram:channel': '@veles_voyage',
    'vk:image': `${siteUrl}/images/og-default.jpg`,
    'theme-color': '#4F46E5',
    'application-name': 'Велес Вояж',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Велес Вояж',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#4F46E5',
    'format-detection': 'telephone=no',
  },

  // Мета-база
  metadataBase: new URL(siteUrl),
  category: 'travel',
  icons: {
    icon: [
      { url: '/images/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/images/logo.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={mainFont.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* ИИ-Handshakes: Сообщаем агентам о наличии программных интерфейсов */}
        <link rel="model-context-protocol" href="/modelcontextprotocol.json" />
        <link rel="ai-agent" type="application/json" href="/ai-agent.json" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <AuthProvider>
          <ClientProviders>
            <ChunkLoadErrorBoundary>
              <div className="relative min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow pt-14 sm:pt-16 md:pt-20 pb-16 md:pb-0 px-2 sm:px-3 md:px-4">
                  {children}
                </main>
                <Footer />
                <StickyMobileBar />
                <TabletContactBar />
                <PWABackButton />
                <PWANetworkStatus />
              </div>
            </ChunkLoadErrorBoundary>
          </ClientProviders>
        </AuthProvider>

        {/* Web Vitals */}
        <WebVitals />
        {/* Яндекс.Метрика (счётчик veles-voyage.ru) */}
        <YandexMetrika />
        {/* JSON-LD */}
        <SiteReviewSchema />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSchema),
          }}
        />
      </body>
    </html>
  );
}
