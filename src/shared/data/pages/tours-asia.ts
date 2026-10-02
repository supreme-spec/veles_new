// --- Динамические даты для SEO ---
export let toursAsiaDatePublished = new Date().toISOString().split('T')[0];
export let toursAsiaDateModified = new Date().toISOString().split('T')[0];

export function setToursAsiaDates({ published, modified }: { published: string, modified: string }) {
  toursAsiaDatePublished = published;
  toursAsiaDateModified = modified;
  if (toursAsiaArticleSchema) {
    toursAsiaArticleSchema.datePublished = published;
    toursAsiaArticleSchema.dateModified = modified;
    toursAsiaArticleSchema.contentReferenceTime = published;
  }
  if (toursAsiaReviewSchema && toursAsiaReviewSchema.review) {
    toursAsiaReviewSchema.review.forEach((review: any) => {
      review.datePublished = published;
    });
  }
  if (toursAsiaVideoSchema) toursAsiaVideoSchema.uploadDate = published;
  if (toursAsiaAISchema) {
    toursAsiaAISchema.datePublished = published;
    toursAsiaAISchema.dateModified = modified;
    toursAsiaAISchema.contentReferenceTime = published;
  }
  if (toursAsiaSocialSchema) toursAsiaSocialSchema.datePublished = published;
  
  // Update additional schemas
  if (toursAsiaMetaTags) {
    toursAsiaMetaTags["article:published_time"] = published;
    toursAsiaMetaTags["article:modified_time"] = modified;
    toursAsiaMetaTags["og:updated_time"] = modified;
  }
}

export const toursAsiaArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Азиатские туры 2026 | Велес Вояж - Путешествия по Азии с комфортом",
  "description": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Бангкок, Ханой, Токио, Пекин, Дели, Бали, Куала-Лумпур, Сеул, Манила. Экзотические культуры, древние храмы, современные мегаполисы, комфортное проживание, профессиональные гиды.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Азиатские туры - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursAsiaDatePublished,
  "dateModified": toursAsiaDateModified,
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
    "@id": "https://veles-voyage.ru/tours/asia"
  },
  "articleSection": "Азиатские туры",
  "keywords": ["азиатские туры", "туры по Азии", "азиатские туры 2026", "путешествия по Азии", "Таиланд туры", "Вьетнам туры", "Япония туры", "Китай туры", "Индия туры", "Индонезия туры", "Малайзия туры", "Сингапур туры", "Бангкок", "Токио", "Пекин", "Дели", "Бали", "экзотические культуры", "древние храмы", "профессиональные гиды", "туризм 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursAsiaDatePublished
};

export const toursAsiaSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours/asia",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const toursAsiaReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Азиатские туры от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ольга Смирнова" },
      "datePublished": toursAsiaDatePublished,
      "reviewBody": "Незабываемое путешествие по Азии! Экзотические острова, буддийские храмы, отличная организация тура."
    }
  ]
};

export const toursAsiaFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие страны входят в азиатские туры?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предлагаем туры по Таиланду, Вьетнаму, Малайзии, Сингапуру, Индонезии, Филиппинам, Японии, Китаю, Индии, Шри-Ланке и другим азиатским странам. Маршруты разрабатываются индивидуально под ваши интересы."
      }
    },
    {
      "@type": "Question",
      "name": "Как выбрать подходящий азиатский тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наши специалисты помогут подобрать тур, учитывая ваши интересы, бюджет и предпочтения. Мы предлагаем маршруты различной продолжительности от 5 до 21 дня, разные уровни комфорта."
      }
    },
    {
      "@type": "Question",
      "name": "Как выбрать подходящий азиатский тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наши специалисты помогут подобрать тур, учитывая ваши интересы, бюджет и предпочтения. Мы предлагаем маршруты различной продолжительности от 5 до 21 дня, разные уровни комфорта."
      }
    },
    {
      "@type": "Question",
      "name": "Нужен ли загранпаспорт в Таиланд для россиян в 2026 году?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, для въезда в Таиланд нужен действующий загранпаспорт. Для туристических поездок до 60 дней виза гражданам РФ не требуется, достаточно загранпаспорта со сроком действия не менее 6 месяцев."
      }
    }
  ]
};

export const toursAsiaOrganizationSchema = {
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

export const toursAsiaVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Азиатские туры - Видеогид",
  "description": "Видеообзоры азиатских туров на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Азиатские туры - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursAsiaDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursAsiaBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" },
    { "@type": "ListItem", "position": 3, "name": "Азиатские туры", "item": "https://veles-voyage.ru/tours/asia" }
  ]
};

export const toursAsiaWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Азиатские туры: Децентрализованный путеводитель Web3",
  "description": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Экзотические культуры, древние храмы, современные мегаполисы.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/asia", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const toursAsiaDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Азиатские туры: Анонимный путеводитель",
  "description": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Экзотические культуры, древние храмы, современные мегаполисы.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по Азии", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/tours/asia" }
};

export const toursAsiaAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Азиатские туры: Альтернативная поисковая база",
  "description": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Экзотические культуры, древние храмы, современные мегаполисы.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/asia.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const toursAsiaGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Азиатские туры", "@language": "ru" },
  "alternateName": [
    { "@value": "Asian Tours", "@language": "en" },
    { "@value": "亚洲旅游", "@language": "zh" },
    { "@value": "Asienreisen", "@language": "de" }
  ],
  "description": { "@value": "Туры по Таиланду, Вьетнаму, Малайзии, Сингапуру, Индонезии, Филиппинам, Японии, Китаю, Индии, Шри-Ланке", "@language": "ru" },
  "touristType": ["CulturalTourism", "AdventureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursAsiaMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Азиатские туры",
  "description": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Экзотические культуры, древние храмы, современные мегаполисы.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const toursAsiaSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Азиатские туры 2026 | Велес Вояж",
  "text": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Экзотические культуры, древние храмы, современные мегаполисы, комфортное проживание. #АзиатскиеТуры2026 #Путешествия",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Азиатские туры - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": toursAsiaDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/tours/asia" }
};

export const toursAsiaAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Азиатские туры 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const toursAsiaAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Азиатские туры 2026 | Велес Вояж - Путешествия по Азии с комфортом",
  "description": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Бангкок, Ханой, Токио, Пекин, Дели, Бали, Куала-Лумпур, Сеул, Манила. Экзотические культуры, древние храмы, современные мегаполисы, комфортное проживание, профессиональные гиды.",
  "datePublished": toursAsiaDatePublished,
  "dateModified": toursAsiaDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours/asia" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursAsiaDatePublished
};

export const toursAsiaAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Азиатские туры",
  "description": "Мобильный гид по азиатским турам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const toursAsiaGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Азиатские туры", "@language": "ru" },
  "alternateName": [
    { "@value": "Asian Tours", "@language": "en" },
    { "@value": "亚洲旅游", "@language": "zh" }
  ],
  "description": { "@value": "Туры по Таиланду, Вьетнаму, Малайзии, Сингапуру, Индонезии, Филиппинам, Японии, Китаю, Индии, Шри-Ланке", "@language": "ru" },
  "touristType": ["CulturalTourism", "AdventureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursAsiaTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Азиатские туры 2026",
  "description": "Погрузитесь в древние традиции и современные чудеса Азии с Велес Вояж. Эксклюзивные туры по лучшим азиатским направлениям с комфортным проживанием и профессиональными гидами.",
  "touristType": ["CulturalTourism", "AdventureTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "55000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursAsiaSchemas = [
  toursAsiaArticleSchema,
  toursAsiaFAQSchema,
  toursAsiaOrganizationSchema,
  toursAsiaBreadcrumbsSchema,
  toursAsiaSpeakableSchema,
  toursAsiaReviewSchema,
  toursAsiaVideoSchema,
  toursAsiaWeb3Schema,
  toursAsiaDarkWebSchema,
  toursAsiaAltSearchSchema,
  toursAsiaGlobalSearchSchema,
  toursAsiaMobileSchema,
  toursAsiaSocialSchema,
  toursAsiaAccessibilitySchema,
  toursAsiaAISchema,
  toursAsiaAEOSchema,
  toursAsiaGEOEnhancedSchema,
  toursAsiaTouristTripSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const toursAsiaMetaTags = {
  title: "Азиатские туры 2026 | Велес Вояж - Путешествия по Азии с комфортом",
  description: "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Бангкок, Ханой, Токио, Пекин, Дели, Бали, Куала-Лумпур, Сеул, Манила. Экзотические культуры, древние храмы, современные мегаполисы, комфортное проживание, профессиональные гиды.",
  keywords: "азиатские туры, туры по Азии, Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Бангкок, Токио, Пекин, Дели, Бали, экзотические культуры, древние храмы, современные мегаполисы, профессиональные гиды, туризм 2026",
  "og:title": "Азиатские туры 2026 | Велес Вояж",
  "og:description": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Бангкок, Ханой, Токио, Пекин, Дели, Бали, Куала-Лумпур, Сеул, Манила.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Азиатские туры",
  "og:url": "https://veles-voyage.ru/tours/asia",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Азиатские туры 2026 | Велес Вояж",
  "twitter:description": "Азиатские туры: Таиланд, Вьетнам, Япония, Китай, Индия, Индонезия, Малайзия, Сингапур, Южная Корея, Филиппины. Бангкок, Ханой, Токио, Пекин, Дели, Бали, Куала-Лумпур, Сеул, Манила.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Азиатские туры - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Азия Туры",
  "theme-color": "#ffffff",
  "geo.region": "AS",
  "geo.placename": "Азия",
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
  "article:published_time": toursAsiaDatePublished,
  "article:modified_time": toursAsiaDateModified,
  "og:updated_time": toursAsiaDateModified
};

export const toursAsiaHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours/asia" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours/asia" }
];
