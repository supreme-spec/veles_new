// --- Динамические даты для SEO ---
export let contactsDatePublished = new Date().toISOString().split('T')[0];
export let contactsDateModified = new Date().toISOString().split('T')[0];

export function setContactsDates({ published, modified }: { published: string, modified: string }) {
  contactsDatePublished = published;
  contactsDateModified = modified;
  contactsArticleSchema.datePublished = published;
  contactsArticleSchema.dateModified = modified;
  contactsArticleSchema.contentReferenceTime = published;
  contactsReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  contactsVideoSchema.uploadDate = published;
  contactsAISchema.datePublished = published;
  contactsAISchema.dateModified = modified;
  contactsAISchema.contentReferenceTime = published;
  contactsSocialSchema.datePublished = published;
  
  // Update additional schemas
  contactsMetaTags["article:published_time"] = published;
  contactsMetaTags["article:modified_time"] = modified;
  contactsMetaTags["og:updated_time"] = modified;
}

export const contactsArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Контакты | Велес Вояж - Свяжитесь с нами",
  "description": "Контакты турагентства Велес Вояж: телефон +7 985 063-51-34, email hello@veles-voyage.ru, Telegram @Anastasiiiiyyaa. Голицыно, пр-т. Керамиков, 103. Поддержка 24/7, консультации, бронирование.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Контакты - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": contactsDatePublished,
  "dateModified": contactsDateModified,
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
    "@id": "https://veles-voyage.ru/contacts"
  },
  "articleSection": "Контакты",
  "keywords": ["контакты Велес Вояж", "связаться с турагентством", "телефон турагентства", "email турагентства", "адрес турагентства", "Голицыно", "поддержка 24/7", "консультации по турам", "бронирование туров", "путешествия 2026", "турагентство контакты", "связь с турагентством"],
  "wordCount": 5000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": contactsDatePublished
};

export const contactsSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/contacts",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const contactsReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Контакты Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "156"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Дмитрий Козлов" },
      "datePublished": contactsDatePublished,
      "reviewBody": "Отличная поддержка клиентов! Быстро отвечают на все вопросы, профессиональные консультации."
    }
  ]
};

export const contactsFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Как связаться с турагентством Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Связаться можно по телефону +7 985 063-51-34, email hello@veles-voyage.ru или через Telegram @Anastasiiiiyyaa. Поддержка доступна 24/7."
      }
    },
    {
      "@type": "Question",
      "name": "Где находится офис турагентства?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Офис находится по адресу: Московская область, Одинцовский район, Голицыно, пр-т. Керамиков, 103, индекс 143041."
      }
    },
    {
      "@type": "Question",
      "name": "Какие услуги можно заказать?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предоставляем консультации по турам, бронирование, помощь в оформлении виз и документов, планирование индивидуальных маршрутов, организацию круизов и путешествий."
      }
    }
  ]
};

export const contactsOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Велес Вояж",
  "description": "Туристическое агентство Велес Вояж - эксперты в организации путешествий по России и за рубежом",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "пр-т. Керамиков, 103",
    "addressLocality": "Голицыно",
    "postalCode": "143041",
    "addressCountry": "RU"
  },
  "url": "https://veles-voyage.ru/contacts",
  "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 55.738745,
    "longitude": 36.982842
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "priceRange": "₽₽"
};

export const contactsVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Контакты - Велес Вояж",
  "description": "Видео о контактах турагентства Велес Вояж на Rutube-канале",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Контакты - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": contactsDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const contactsBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Контакты", "item": "https://veles-voyage.ru/contacts" }
  ]
};

export const contactsWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Контакты: Децентрализованный путеводитель Web3",
  "description": "Контакты турагентства Велес Вояж: телефон, email, адрес, поддержка 24/7.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/contacts", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const contactsDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Контакты: Анонимный путеводитель",
  "description": "Контакты турагентства Велес Вояж: телефон, email, адрес, поддержка 24/7.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/contacts" }
};

export const contactsAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Контакты: Альтернативная поисковая база",
  "description": "Контакты турагентства Велес Вояж: телефон, email, адрес, поддержка 24/7.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/contacts.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const contactsGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" },
    { "@value": "Veles Reisen", "@language": "de" }
  ],
  "description": { "@value": "Туристическое агентство - эксперты в организации путешествий", "@language": "ru" }
};

export const contactsMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Контакты",
  "description": "Контакты турагентства Велес Вояж: телефон, email, адрес, поддержка 24/7.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const contactsSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Контакты | Велес Вояж - Свяжитесь с нами",
  "text": "Контакты турагентства Велес Вояж: телефон +7 985 063-51-34, email hello@veles-voyage.ru, Telegram @Anastasiiiiyyaa. Поддержка 24/7. #ВелесВояж #Контакты",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Контакты - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": contactsDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/contacts" }
};

export const contactsAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Контакты 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const contactsAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Контакты | Велес Вояж - Свяжитесь с нами",
  "description": "Контакты турагентства Велес Вояж: телефон +7 985 063-51-34, email hello@veles-voyage.ru, Telegram @Anastasiiiiyyaa. Голицыно, пр-т. Керамиков, 103. Поддержка 24/7, консультации, бронирование.",
  "datePublished": contactsDatePublished,
  "dateModified": contactsDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/contacts" },
  "wordCount": 5000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": contactsDatePublished
};

export const contactsAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Контакты",
  "description": "Мобильное приложение с контактами турагентства Велес Вояж",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const contactsGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" }
  ],
  "description": { "@value": "Туристическое агентство - эксперты в организации путешествий", "@language": "ru" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "пр-т. Керамиков, 103",
    "addressLocality": "Голицыно",
    "postalCode": "143041",
    "addressCountry": "RU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 55.738745,
    "longitude": 36.982842
  }
};

export const contactsSchemas = [
  contactsArticleSchema,
  contactsFAQSchema,
  contactsOrganizationSchema,
  contactsBreadcrumbsSchema,
  contactsSpeakableSchema,
  contactsReviewSchema,
  contactsVideoSchema,
  contactsWeb3Schema,
  contactsDarkWebSchema,
  contactsAltSearchSchema,
  contactsGlobalSearchSchema,
  contactsMobileSchema,
  contactsSocialSchema,
  contactsAccessibilitySchema,
  contactsAISchema,
  contactsAEOSchema,
  contactsGEOEnhancedSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const contactsMetaTags = {
  title: "Контакты | Велес Вояж - Свяжитесь с нами",
  description: "Контакты турагентства Велес Вояж: телефон +7 985 063-51-34, email hello@veles-voyage.ru, Telegram @Anastasiiiiyyaa. Голицыно, пр-т. Керамиков, 103. Поддержка 24/7, консультации, бронирование.",
  keywords: "контакты Велес Вояж, телефон турагентства, email турагентства, адрес турагентства, связь с турагентством, поддержка 24/7, консультации по турам, бронирование туров, турагентство Голицыно, турагентство Москва, турагентство Россия, путешествия 2026",
  "og:title": "Контакты | Велес Вояж - Свяжитесь с нами",
  "og:description": "Контакты турагентства Велес Вояж: телефон +7 985 063-51-34, email hello@veles-voyage.ru, Telegram @Anastasiiiiyyaa. Адрес: Голицыно, пр-т. Керамиков, 103.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Контакты",
  "og:url": "https://veles-voyage.ru/contacts",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Контакты | Велес Вояж - Свяжитесь с нами",
  "twitter:description": "Контакты турагентства Велес Вояж: телефон +7 985 063-51-34, email hello@veles-voyage.ru, Telegram @Anastasiiiiyyaa.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Контакты - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Контакты",
  "theme-color": "#ffffff",
  "geo.region": "RU",
  "geo.placename": "Голицыно",
  "ICBM": "55.6122, 36.9853",
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
  "article:published_time": contactsDatePublished,
  "article:modified_time": contactsDateModified,
  "og:updated_time": contactsDateModified
};

export const contactsHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/contacts" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/contacts" }
];

