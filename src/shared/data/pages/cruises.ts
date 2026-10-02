// --- Динамические даты для SEO ---
export let cruisesDatePublished = new Date().toISOString().split('T')[0];
export let cruisesDateModified = new Date().toISOString().split('T')[0];

export function setCruisesDates({ published, modified }: { published: string, modified: string }) {
  cruisesDatePublished = published;
  cruisesDateModified = modified;
  cruisesArticleSchema.datePublished = published;
  cruisesArticleSchema.dateModified = modified;
  cruisesArticleSchema.contentReferenceTime = published;
  cruisesReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  cruisesVideoSchema.uploadDate = published;
  cruisesAISchema.datePublished = published;
  cruisesAISchema.dateModified = modified;
  cruisesAISchema.contentReferenceTime = published;
  cruisesSocialSchema.datePublished = published;
  
  // Update additional schemas
  cruisesMetaTags["article:published_time"] = published;
  cruisesMetaTags["article:modified_time"] = modified;
  cruisesMetaTags["og:updated_time"] = modified;
}

export const cruisesArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Морские круизы 2026 | Велес Вояж - Круизы по всему миру",
  "description": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности. Бронирование онлайн, поддержка 24/7.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Морские круизы - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": cruisesDatePublished,
  "dateModified": cruisesDateModified,
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
    "@id": "https://veles-voyage.ru/cruises"
  },
  "articleSection": "Морские круизы",
  "keywords": ["морские круизы", "круизы", "круизы 2026", "бронирование круизов", "средиземноморские круизы", "карибские круизы", "скандинавские круизы", "азиатские круизы", "круизы в Аляску", "кругосветные круизы", "круизные лайнеры", "порты", "экскурсии в портах", "лучшие маршруты круизов", "туризм 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": cruisesDatePublished
};

export const cruisesSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/cruises",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const cruisesReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Морские круизы от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "142"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Анна Петрова" },
      "datePublished": cruisesDatePublished,
      "reviewBody": "Потрясающий круиз! Отличная организация, комфортные каюты, незабываемые экскурсии."
    }
  ]
};

export const cruisesFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие виды круизов предлагает Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предлагаем широкий выбор круизов: Средиземноморские круизы с посещением древних цивилизаций, Карибские круизы в тропической атмосфере, Скандинавские фьорды для любителей дикой природы, Азиатские воды с экзотическими островами, Круизы в Аляску к ледникам и дикой природе, а также Кругосветные круизы по экзотическим уголкам планеты."
      }
    },
    {
      "@type": "Question",
      "name": "Как выбрать подходящий круиз?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наши специалисты помогут подобрать круиз, учитывая ваши интересы, бюджет и предпочтения. Мы предлагаем маршруты различной продолжительности от 3 до 21 дня, разные уровни комфорта и направления по всему миру."
      }
    },
    {
      "@type": "Question",
      "name": "Как забронировать круиз?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Вы можете забронировать круиз онлайн через наш сайт или связаться с нами по WhatsApp. Наши менеджеры проконсультируют по всем вопросам и помогут оформить бронирование."
      }
    }
  ]
};

export const cruisesOrganizationSchema = {
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

export const cruisesVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Морские круизы - Видеогид",
  "description": "Видеообзоры морских круизов на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Морские круизы - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": cruisesDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const cruisesBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Круизы", "item": "https://veles-voyage.ru/cruises" }
  ]
};

export const cruisesWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Морские круизы: Децентрализованный путеводитель Web3",
  "description": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const cruisesDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Морские круизы: Анонимный путеводитель",
  "description": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по круизам", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/cruises" }
};

export const cruisesAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Морские круизы: Альтернативная поисковая база",
  "description": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const cruisesGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Морские круизы", "@language": "ru" },
  "alternateName": [
    { "@value": "Sea Cruises", "@language": "en" },
    { "@value": "海上邮轮", "@language": "zh" },
    { "@value": "Seereisen", "@language": "de" }
  ],
  "description": { "@value": "Круизы по Средиземному морю, Карибам, Скандинавии, Азии, Аляске, кругосветные путешествия", "@language": "ru" },
  "touristType": ["CruiseTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const cruisesMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Морские круизы",
  "description": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const cruisesSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Морские круизы 2026 | Велес Вояж",
  "text": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности. Бронирование онлайн, поддержка 24/7. #Круизы2026 #МорскиеПутешествия",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Морские круизы - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": cruisesDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/cruises" }
};

export const cruisesAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Морские круизы 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const cruisesAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Морские круизы 2026 | Велес Вояж - Круизы по всему миру",
  "description": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности. Бронирование онлайн, поддержка 24/7.",
  "datePublished": cruisesDatePublished,
  "dateModified": cruisesDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/cruises" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": cruisesDatePublished
};

export const cruisesAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Морские круизы",
  "description": "Мобильный гид по морским круизам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const cruisesGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Морские круизы", "@language": "ru" },
  "alternateName": [
    { "@value": "Sea Cruises", "@language": "en" },
    { "@value": "海上邮轮", "@language": "zh" }
  ],
  "description": { "@value": "Круизы по Средиземному морю, Карибам, Скандинавии, Азии, Аляске, кругосветные путешествия", "@language": "ru" },
  "touristType": ["CruiseTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const cruisesTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Морские круизы 2026",
  "description": "Откройте для себя лучшие морские круизы по всему миру с Велес Вояж",
  "touristType": ["CruiseTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "85000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const cruisesSchemas = [
  cruisesArticleSchema,
  cruisesFAQSchema,
  cruisesOrganizationSchema,
  cruisesBreadcrumbsSchema,
  cruisesSpeakableSchema,
  cruisesReviewSchema,
  cruisesVideoSchema,
  cruisesWeb3Schema,
  cruisesDarkWebSchema,
  cruisesAltSearchSchema,
  cruisesGlobalSearchSchema,
  cruisesMobileSchema,
  cruisesSocialSchema,
  cruisesAccessibilitySchema,
  cruisesAISchema,
  cruisesAEOSchema,
  cruisesGEOEnhancedSchema,
  cruisesTouristTripSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const cruisesMetaTags = {
  title: "Морские круизы 2026 | Велес Вояж - Круизы по всему миру",
  description: "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности. Бронирование онлайн, поддержка 24/7.",
  keywords: "морские круизы, круизы, круизы 2026, бронирование круизов, средиземноморские круизы, карибские круизы, скандинавские круизы, азиатские круизы, круизы в Аляску, кругосветные круизы, круизные лайнеры, порты, экскурсии в портах, лучшие маршруты круизов, поддержка 24/7",
  "og:title": "Морские круизы 2026 | Велес Вояж",
  "og:description": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Морские круизы",
  "og:url": "https://veles-voyage.ru/cruises",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Морские круизы 2026 | Велес Вояж",
  "twitter:description": "Морские круизы: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Лучшие маршруты, порты, достопримечательности.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Морские круизы - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Круизы Гид",
  "theme-color": "#ffffff",
  "geo.region": "World",
  "geo.placename": "Морские круизы",
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
  "article:published_time": cruisesDatePublished,
  "article:modified_time": cruisesDateModified,
  "og:updated_time": cruisesDateModified
};

export const cruisesHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/cruises" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/cruises" }
];

