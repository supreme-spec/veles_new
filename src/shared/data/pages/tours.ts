// --- Динамические даты для SEO ---
export let toursDatePublished = new Date().toISOString().split('T')[0];
export let toursDateModified = new Date().toISOString().split('T')[0];

export function setToursDates({ published, modified }: { published: string, modified: string }) {
  toursDatePublished = published;
  toursDateModified = modified;
  toursArticleSchema.datePublished = published;
  toursArticleSchema.dateModified = modified;
  toursArticleSchema.contentReferenceTime = published;
  toursReviewSchema.review.forEach((review) => {
    if (review && typeof review === 'object' && 'datePublished' in review) {
      review.datePublished = published;
    }
  });
  toursVideoSchema.uploadDate = published;
  toursAISchema.datePublished = published;
  toursAISchema.dateModified = modified;
  toursAISchema.contentReferenceTime = published;
  toursSocialSchema.datePublished = published;
  
  // Update additional schemas
  toursMetaTags["article:published_time"] = published;
  toursMetaTags["article:modified_time"] = modified;
  toursMetaTags["og:updated_time"] = modified;
}

export const toursArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Туры и Путешествия 2026 | Велес Вояж - Онлайн Турагентство",
  "description": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет. Бронирование онлайн, поддержка 24/7, профессиональные гиды.",
  "image": {
    "@type": "ImageObject",
    "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop",
    "caption": "Туры и Путешествия - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursDatePublished,
  "dateModified": toursDateModified,
  "author": [
    { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция" }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Велес Вояж | Экспертная редакция",
    "logo": {
      "@type": "ImageObject",
      "url": "https://veles-voyage.ru/images/logo.png",
      "caption": "Логотип Велес Вояж"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://veles-voyage.ru/tours"
  },
  "articleSection": "Туры и Путешествия",
  "keywords": ["туры", "путешествия", "турагентство онлайн", "бронирование туров", "европейские туры", "азиатские туры", "африканские сафари", "американские туры", "круизы", "экстремальные туры", "индивидуальные туры", "туры 2026", "профессиональные гиды", "поддержка 24/7", "туристические услуги", "туризм 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursDatePublished
};

export const toursSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "#speakable-summary"]
  }
};

export const toursReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Туры и Путешествия от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "156"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Елена Соколова" },
      "datePublished": toursDatePublished,
      "reviewBody": "Отличная организация туров! Профессиональные гиды, комфортное проживание, незабываемые впечатления."
    }
  ]
};

export const toursFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие направления доступны для туров?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предлагаем туры по Европе, Азии, Африке, Америке, круизы и экстремальные туры. Все маршруты разрабатываются индивидуально под ваши интересы и бюджет."
      }
    },
    {
      "@type": "Question",
      "name": "Как забронировать тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Бронирование туров доступно онлайн на нашем сайте. Вы можете выбрать направление, даты и связаться с нами для уточнения деталей. Также доступна поддержка 24/7."
      }
    },
    {
      "@type": "Question",
      "name": "Какие услуги включены в тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В стоимость тура обычно включены: проживание, экскурсии с профессиональными гидами, трансферы, завтраки. Детали уточняются при бронировании."
      }
    }
  ]
};

export const toursOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Велес Вояж | Экспертная редакция",
  "url": "https://veles-voyage.ru/",
  "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" },
  "foundingDate": "2023",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "89850635134",
    "contactType": "customer service",
    "email": "hello@veles-voyage.ru"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "пр-т. Керамиков, 103",
    "addressLocality": "Голицыно",
    "postalCode": "143041",
    "addressCountry": "RU"
  },
  "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"],
  "priceRange": "₽₽",
  "areaServed": { "@type": "Country", "name": "Russia" }
};

export const toursVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Туры и Путешествия - Видеогид",
  "description": "Видеообзоры туров и путешествий на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Туры и Путешествия - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" }
  ]
};

export const toursWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Туры и Путешествия: Децентрализованный путеводитель Web3",
  "description": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет и интересы.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const toursDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Туры и Путешествия: Анонимный путеводитель",
  "description": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет и интересы.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по турам", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/tours" }
};

export const toursAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Туры и Путешествия: Альтернативная поисковая база",
  "description": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет и интересы.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const toursGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Туры и Путешествия", "@language": "ru" },
  "alternateName": [
    { "@value": "Tours and Travel", "@language": "en" },
    { "@value": "旅游和旅行", "@language": "zh" },
    { "@value": "Touren und Reisen", "@language": "de" }
  ],
  "description": { "@value": "Туры по Европе, Азии, Африке, Америке, круизы, экстремальные туры", "@language": "ru" },
  "touristType": ["CulturalTourism", "AdventureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Туры и Путешествия",
  "description": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет и интересы.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const toursSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Туры и Путешествия 2026 | Велес Вояж",
  "text": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет и интересы. Бронирование онлайн, поддержка 24/7. #Туры2026 #Путешествия",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Туры и Путешествия - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": toursDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/tours" }
};

export const toursAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Туры и Путешествия 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const toursAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Туры и Путешествия 2026 | Велес Вояж - Онлайн Турагентство",
  "description": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет. Бронирование онлайн, поддержка 24/7, профессиональные гиды.",
  "datePublished": toursDatePublished,
  "dateModified": toursDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursDatePublished
};

export const toursAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Туры и Путешествия",
  "description": "Мобильный гид по турам и путешествиям с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const toursGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Туры и Путешествия", "@language": "ru" },
  "alternateName": [
    { "@value": "Tours and Travel", "@language": "en" },
    { "@value": "旅游和旅行", "@language": "zh" }
  ],
  "description": { "@value": "Туры по Европе, Азии, Африке, Америке, круизы, экстремальные туры", "@language": "ru" },
  "touristType": ["CulturalTourism", "AdventureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Туры и Путешествия 2026",
  "description": "Откройте для себя уникальные направления: Европа, Азия, Африка, Америка, круизы и экстремальные туры с Велес Вояж",
  "touristType": ["CulturalTourism", "AdventureTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "50000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Как забронировать тур с Велес Вояж",
  "description": "Пошаговая инструкция по поиску и бронированию туров по всему миру онлайн.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Выберите направление",
      "text": "Ознакомьтесь с нашими туристическими маршрутами и выберите подходящий вариант."
    },
    {
      "@type": "HowToStep",
      "name": "Свяжитесь с нами",
      "text": "Получите консультацию по телефону, Telegram или через форму на сайте."
    },
    {
      "@type": "HowToStep",
      "name": "Подберите тур",
      "text": "Мы поможем выбрать оптимальный тур с учетом ваших предпочтений и бюджета."
    },
    {
      "@type": "HowToStep",
      "name": "Оформите бронирование",
      "text": "Забронируйте тур онлайн с гарантией сохранности ваших средств."
    }
  ]
};

export const toursSchemas = [
  toursArticleSchema,
  toursFAQSchema,
  toursOrganizationSchema,
  toursBreadcrumbsSchema,
  toursSpeakableSchema,
  toursReviewSchema,
  toursVideoSchema,
  toursWeb3Schema,
  toursDarkWebSchema,
  toursAltSearchSchema,
  toursGlobalSearchSchema,
  toursMobileSchema,
  toursSocialSchema,
  toursAccessibilitySchema,
  toursAISchema,
  toursAEOSchema,
  toursGEOEnhancedSchema,
  toursTouristTripSchema,
  toursHowToSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const toursMetaTags = {
  title: "Туры и Путешествия 2026 | Велес Вояж - Онлайн Турагентство",
  description: "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет. Бронирование онлайн, поддержка 24/7, профессиональные гиды.",
  keywords: "туры, путешествия, турагентство онлайн, бронирование туров, европейские туры, азиатские туры, африканские сафари, американские туры, круизы, экстремальные туры, индивидуальные туры, туры 2026, профессиональные гиды, поддержка 24/7, туристические услуги",
  "og:title": "Туры и Путешествия 2026 | Велес Вояж",
  "og:description": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет и интересы.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Туры и Путешествия",
  "og:url": "https://veles-voyage.ru/tours",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Туры и Путешествия 2026 | Велес Вояж",
  "twitter:description": "Туры и путешествия: Европа, Азия, Африка, Америка, круизы, экстремальные туры. Индивидуальные маршруты под ваш бюджет и интересы.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Туры и Путешествия - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Туры Гид",
  "theme-color": "#ffffff",
  "geo.region": "World",
  "geo.placename": "Туры и Путешествия",
  "content-language": "ru",
  "charset": "utf-8",
  "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  "googlebot": "index, follow",
  "bingbot": "index, follow",
  "yandexbot": "index, follow",
  "duckduckbot": "index, follow",
  "baiduspider": "index, follow",
  "cache-control": "public, max-age=31536000",
  "expires": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString(),
  "article:published_time": toursDatePublished,
  "article:modified_time": toursDateModified,
  "og:updated_time": toursDateModified
};

export const toursHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours" }
];

