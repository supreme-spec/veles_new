// --- Динамические даты для SEO ---
export let reviewsDatePublished = new Date().toISOString().split('T')[0];
export let reviewsDateModified = new Date().toISOString().split('T')[0];

export function setReviewsDates({ published, modified }: { published: string, modified: string }) {
  reviewsDatePublished = published;
  reviewsDateModified = modified;
  reviewsArticleSchema.datePublished = published;
  reviewsArticleSchema.dateModified = modified;
  reviewsArticleSchema.contentReferenceTime = published;
  reviewsReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  reviewsVideoSchema.uploadDate = published;
  reviewsAISchema.datePublished = published;
  reviewsAISchema.dateModified = modified;
  reviewsAISchema.contentReferenceTime = published;
  reviewsSocialSchema.datePublished = published;
  
  // Update additional schemas
  reviewsMetaTags["article:published_time"] = published;
  reviewsMetaTags["article:modified_time"] = modified;
  reviewsMetaTags["og:updated_time"] = modified;
}

export const reviewsArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Реальные отзывы путешественников о Велес Вояж",
  "description": "Реальные отзывы путешественников о Велес Вояж. Более 500 гостей поделились впечатлениями о турах в Турцию, Дубай, Египет и Абхазию. Публикуем отзывы без цензуры, сохраняя авторский стиль и конструктивную критику. Оценка 4.9 из 5.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Отзывы клиентов - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": reviewsDatePublished,
  "dateModified": reviewsDateModified,
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
    "@id": "https://veles-voyage.ru/reviews"
  },
  "articleSection": "Отзывы клиентов",
  "keywords": ["отзывы клиентов", "отзывы туристов", "отзывы о путешествиях", "отзывы о турах", "отзывы Велес Вояж", "отзывы турагентства", "рекомендации туристов", "качество услуг", "отзывы о Турции", "отзывы о Дубае", "отзывы о Египте", "туризм 2026", "рейтинг турагентства", "профессиональные гиды"],
  "wordCount": 6000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": reviewsDatePublished
};

export const reviewsSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/reviews",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const reviewsReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Турагентство Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "187",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Елена Соколова" },
      "datePublished": reviewsDatePublished,
      "reviewBody": "Отличная организация туров! Профессиональные гиды, комфортное проживание, незабываемые впечатления. Рекомендую!",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Александр Петров" },
      "datePublished": reviewsDatePublished,
      "reviewBody": "Потрясающий круиз по Средиземному морю! Все было организовано на высшем уровне. Спасибо Велес Вояж!",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }
  ]
};

export const reviewsFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Где можно посмотреть отзывы о турагентстве Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Отзывы клиентов можно посмотреть на этой странице, а также в группе ВКонтакте https://vk.com/topic-221452803_49400765. Все отзывы реальные и проверенные."
      }
    },
    {
      "@type": "Question",
      "name": "Какие направления наиболее популярны по отзывам?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "По отзывам клиентов наиболее популярны туры в Турцию, Дубай, Египет, Абхазию, а также морские круизы по Средиземному морю и Карибам."
      }
    },
    {
      "@type": "Question",
      "name": "Как оставить свой отзыв?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Вы можете оставить отзыв в группе ВКонтакте, написать нам на email или связаться через Telegram. Мы ценим обратную связь от наших клиентов!"
      }
    }
  ]
};

export const reviewsOrganizationSchema = {
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

export const reviewsVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Отзывы клиентов - Велес Вояж",
  "description": "Видеоотзывы туристов о путешествиях с Велес Вояж на Rutube-канале",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Отзывы клиентов - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": reviewsDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const reviewsBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Отзывы", "item": "https://veles-voyage.ru/reviews" }
  ]
};

export const reviewsWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Отзывы клиентов: Децентрализованный путеводитель Web3",
  "description": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж. Отзывы клиентов из Турции, Дубая, Египта, Абхазии и других направлений.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/reviews", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const reviewsDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Отзывы клиентов: Анонимный путеводитель",
  "description": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж. Отзывы клиентов из Турции, Дубая, Египта, Абхазии и других направлений.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/reviews" }
};

export const reviewsAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Отзывы клиентов: Альтернативная поисковая база",
  "description": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж. Отзывы клиентов из Турции, Дубая, Египта, Абхазии и других направлений.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/reviews.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const reviewsGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": { "@value": "Турагентство Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage Travel Agency", "@language": "en" },
    { "@value": "韦莱斯旅行旅行社", "@language": "zh" },
    { "@value": "Veles Reisen Reisebüro", "@language": "de" }
  ],
  "description": { "@value": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж", "@language": "ru" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "187"
  }
};

export const reviewsMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Отзывы",
  "description": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж. Отзывы клиентов из Турции, Дубая, Египта, Абхазии и других направлений.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const reviewsSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Реальные отзывы клиентов 2026 | Велес Вояж",
  "text": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж. Отзывы клиентов из Турции, Дубая, Египта, Абхазии и других направлений. Оценки, рекомендации, впечатления. #ВелесВояж #Отзывы2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Отзывы клиентов - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": reviewsDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/reviews" }
};

export const reviewsAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Отзывы клиентов 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const reviewsAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Реальные отзывы путешественников о Велес Вояж | Велес Вояж",
  "description": "Реальные отзывы путешественников о Велес Вояж. Более 500 гостей поделились впечатлениями о турах в Турцию, Дубай, Египет и Абхазию. Публикуем отзывы без цензуры, сохраняя авторский стиль и конструктивную критику. Оценка 4.9 из 5.",
  "datePublished": reviewsDatePublished,
  "dateModified": reviewsDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/reviews" },
  "wordCount": 6000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": reviewsDatePublished
};

export const reviewsAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Отзывы",
  "description": "Мобильное приложение с отзывами клиентов турагентства Велес Вояж",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const reviewsGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": { "@value": "Турагентство Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage Travel Agency", "@language": "en" },
    { "@value": "韦莱斯旅行旅行社", "@language": "zh" }
  ],
  "description": { "@value": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж", "@language": "ru" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "187"
  }
};

export const reviewsSchemas = [
  reviewsArticleSchema,
  reviewsFAQSchema,
  reviewsOrganizationSchema,
  reviewsSpeakableSchema,
  reviewsReviewSchema,
  reviewsVideoSchema,
  reviewsWeb3Schema,
  reviewsDarkWebSchema,
  reviewsAltSearchSchema,
  reviewsGlobalSearchSchema,
  reviewsMobileSchema,
  reviewsSocialSchema,
  reviewsAccessibilitySchema,
  reviewsAISchema,
  reviewsAEOSchema,
  reviewsGEOEnhancedSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const reviewsMetaTags = {
  title: "Реальные отзывы путешественников о Велес Вояж | Велес Вояж",
  description: "Реальные отзывы путешественников о Велес Вояж. Более 500 гостей поделились впечатлениями о турах в Турцию, Дубай, Египет и Абхазию. Публикуем отзывы без цензуры, сохраняя авторский стиль и конструктивную критику. Оценка 4.9 из 5.",
  keywords: "отзывы клиентов, отзывы туристов, отзывы о путешествиях, отзывы о турах, отзывы Велес Вояж, отзывы турагентства, рекомендации туристов, качество услуг, поддержка туристов, отзывы о Турции, отзывы о Дубае, отзывы о Египте, туризм 2026, рейтинг турагентства",
  "og:title": "Реальные отзывы клиентов 2026 | Велес Вояж",
  "og:description": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж. Отзывы клиентов из Турции, Дубая, Египта, Абхазии и других направлений.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Отзывы клиентов",
  "og:url": "https://veles-voyage.ru/reviews",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Реальные отзывы клиентов 2026 | Велес Вояж",
  "twitter:description": "Реальные отзывы туристов о путешествиях с турагентством Велес Вояж. Отзывы клиентов из Турции, Дубая, Египта, Абхазии и других направлений.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Отзывы клиентов - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Отзывы",
  "theme-color": "#ffffff",
  "geo.region": "RU",
  "geo.placename": "Отзывы клиентов",
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
  "article:published_time": reviewsDatePublished,
  "article:modified_time": reviewsDateModified,
  "og:updated_time": reviewsDateModified
};

export const reviewsHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/reviews" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/reviews" }
];

