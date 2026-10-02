// --- Динамические даты для SEO ---
export let toursAmericaDatePublished = new Date().toISOString().split('T')[0];
export let toursAmericaDateModified = new Date().toISOString().split('T')[0];

export function setToursAmericaDates({ published, modified }: { published: string, modified: string }) {
  toursAmericaDatePublished = published;
  toursAmericaDateModified = modified;
  toursAmericaArticleSchema.datePublished = published;
  toursAmericaArticleSchema.dateModified = modified;
  toursAmericaArticleSchema.contentReferenceTime = published;
  toursAmericaReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  toursAmericaVideoSchema.uploadDate = published;
  toursAmericaAISchema.datePublished = published;
  toursAmericaAISchema.dateModified = modified;
  toursAmericaAISchema.contentReferenceTime = published;
  toursAmericaSocialSchema.datePublished = published;
  
  // Update additional schemas
  toursAmericaMetaTags["article:published_time"] = published;
  toursAmericaMetaTags["article:modified_time"] = modified;
  toursAmericaMetaTags["og:updated_time"] = modified;
}

export const toursAmericaArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Американские туры 2026 | Велес Вояж - Откройте Америку",
  "description": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Нью-Йорк, Лос-Анджелес, Торонто, Мехико, Рио-де-Жанейро, Буэнос-Айрес, Сантьяго, Лима, Сан-Хосе. Небоскребы, национальные парки, пляжи, горы, комфортное проживание, профессиональные гиды.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Американские туры - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursAmericaDatePublished,
  "dateModified": toursAmericaDateModified,
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
    "@id": "https://veles-voyage.ru/tours/america"
  },
  "articleSection": "Американские туры",
  "keywords": ["американские туры", "туры по Америке", "американские туры 2026", "путешествия по Америке", "США туры", "Канада туры", "Мексика туры", "Бразилия туры", "Аргентина туры", "Нью-Йорк", "Лос-Анджелес", "Торонто", "Рио-де-Жанейро", "небоскребы", "национальные парки", "профессиональные гиды", "туризм 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursAmericaDatePublished
};

export const toursAmericaSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours/america",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const toursAmericaReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Американские туры от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "98"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Сергей Козлов" },
      "datePublished": toursAmericaDatePublished,
      "reviewBody": "Потрясающее путешествие по США! Небоскребы, национальные парки, отличная организация тура."
    }
  ]
};

export const toursAmericaFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие страны входят в американские туры?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предлагаем туры по США, Канаде, Мексике, Бразилии, Аргентине, Чили, Перу, Коста-Рике и другим американским странам. Маршруты разрабатываются индивидуально под ваши интересы."
      }
    },
    {
      "@type": "Question",
      "name": "Как выбрать подходящий американский тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наши специалисты помогут подобрать тур, учитывая ваши интересы, бюджет и предпочтения. Мы предлагаем маршруты различной продолжительности от 5 до 21 дня, разные уровни комфорта."
      }
    },
    {
      "@type": "Question",
      "name": "Какие услуги включены в американский тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В стоимость тура обычно включены: проживание в отелях, экскурсии с профессиональными гидами, трансферы, завтраки. Детали уточняются при бронировании."
      }
    },
    {
      "@type": "Question",
      "name": "Нужна ли виза в США для россиян?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, для въезда в США гражданам РФ нужна виза категории B1/B2, которую оформляют по результатам собеседования в посольстве или консульстве. Загранпаспорт должен действовать минимум 6 месяцев, рекомендуем подавать заявление заблаговременно."
      }
    }
  ]
};

export const toursAmericaOrganizationSchema = {
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

export const toursAmericaVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Американские туры - Видеогид",
  "description": "Видеообзоры американских туров на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Американские туры - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursAmericaDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursAmericaBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" },
    { "@type": "ListItem", "position": 3, "name": "Американские туры", "item": "https://veles-voyage.ru/tours/america" }
  ]
};

export const toursAmericaWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Американские туры: Децентрализованный путеводитель Web3",
  "description": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Небоскребы, национальные парки, пляжи, горы.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/america", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const toursAmericaDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Американские туры: Анонимный путеводитель",
  "description": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Небоскребы, национальные парки, пляжи, горы.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по Америке", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/tours/america" }
};

export const toursAmericaAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Американские туры: Альтернативная поисковая база",
  "description": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Небоскребы, национальные парки, пляжи, горы.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/america.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const toursAmericaGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Американские туры", "@language": "ru" },
  "alternateName": [
    { "@value": "American Tours", "@language": "en" },
    { "@value": "美洲旅游", "@language": "zh" },
    { "@value": "Amerikareisen", "@language": "de" }
  ],
  "description": { "@value": "Туры по США, Канаде, Мексике, Бразилии, Аргентине, Чили, Перу, Коста-Рике", "@language": "ru" },
  "touristType": ["AdventureTourism", "SightseeingTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursAmericaMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Американские туры",
  "description": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Небоскребы, национальные парки, пляжи, горы.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const toursAmericaSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Американские туры 2026 | Велес Вояж",
  "text": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Небоскребы, национальные парки, пляжи, горы, комфортное проживание. #АмериканскиеТуры2026 #Путешествия",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Американские туры - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": toursAmericaDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/tours/america" }
};

export const toursAmericaAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Американские туры 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const toursAmericaAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Американские туры 2026 | Велес Вояж - Откройте Америку",
  "description": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Нью-Йорк, Лос-Анджелес, Торонто, Мехико, Рио-де-Жанейро, Буэнос-Айрес, Сантьяго, Лима, Сан-Хосе. Небоскребы, национальные парки, пляжи, горы, комфортное проживание, профессиональные гиды.",
  "datePublished": toursAmericaDatePublished,
  "dateModified": toursAmericaDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours/america" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursAmericaDatePublished
};

export const toursAmericaAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Американские туры",
  "description": "Мобильный гид по американским турам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const toursAmericaGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Американские туры", "@language": "ru" },
  "alternateName": [
    { "@value": "American Tours", "@language": "en" },
    { "@value": "美洲旅游", "@language": "zh" }
  ],
  "description": { "@value": "Туры по США, Канаде, Мексике, Бразилии, Аргентине, Чили, Перу, Коста-Рике", "@language": "ru" },
  "touristType": ["AdventureTourism", "SightseeingTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursAmericaTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Американские туры 2026",
  "description": "От небоскребов до национальных парков - исследуйте лучшие направления Америки с Велес Вояж. Планируйте идеальное путешествие по США, Канаде и Мексике.",
  "touristType": ["AdventureTourism", "SightseeingTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "55000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursAmericaSchemas = [
  toursAmericaArticleSchema,
  toursAmericaFAQSchema,
  toursAmericaOrganizationSchema,
  toursAmericaBreadcrumbsSchema,
  toursAmericaSpeakableSchema,
  toursAmericaReviewSchema,
  toursAmericaVideoSchema,
  toursAmericaWeb3Schema,
  toursAmericaDarkWebSchema,
  toursAmericaAltSearchSchema,
  toursAmericaGlobalSearchSchema,
  toursAmericaMobileSchema,
  toursAmericaSocialSchema,
  toursAmericaAccessibilitySchema,
  toursAmericaAISchema,
  toursAmericaAEOSchema,
  toursAmericaGEOEnhancedSchema,
  toursAmericaTouristTripSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const toursAmericaMetaTags = {
  title: "Американские туры 2026 | Велес Вояж - Откройте Америку",
  description: "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Нью-Йорк, Лос-Анджелес, Торонто, Мехико, Рио-де-Жанейро, Буэнос-Айрес, Сантьяго, Лима, Сан-Хосе. Небоскребы, национальные парки, пляжи, горы, комфортное проживание, профессиональные гиды.",
  keywords: "американские туры, туры по Америке, США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Нью-Йорк, Лос-Анджелес, Торонто, Рио-де-Жанейро, небоскребы, национальные парки, пляжи, горы, профессиональные гиды, туризм 2026",
  "og:title": "Американские туры 2026 | Велес Вояж",
  "og:description": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Нью-Йорк, Лос-Анджелес, Торонто, Мехико, Рио-де-Жанейро, Буэнос-Айрес, Сантьяго, Лима, Сан-Хосе.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Американские туры",
  "og:url": "https://veles-voyage.ru/tours/america",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Американские туры 2026 | Велес Вояж",
  "twitter:description": "Американские туры: США, Канада, Мексика, Бразилия, Аргентина, Чили, Перу, Коста-Рика. Нью-Йорк, Лос-Анджелес, Торонто, Мехико, Рио-де-Жанейро, Буэнос-Айрес, Сантьяго, Лима, Сан-Хосе.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Американские туры - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Америка Туры",
  "theme-color": "#ffffff",
  "geo.region": "AM",
  "geo.placename": "Америка",
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
  "article:published_time": toursAmericaDatePublished,
  "article:modified_time": toursAmericaDateModified,
  "og:updated_time": toursAmericaDateModified
};

export const toursAmericaHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours/america" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours/america" }
];
