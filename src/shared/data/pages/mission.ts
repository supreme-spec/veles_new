// --- Динамические даты для SEO ---
export let missionDatePublished = new Date().toISOString().split('T')[0];
export let missionDateModified = new Date().toISOString().split('T')[0];

export function setMissionDates({ published, modified }: { published: string, modified: string }) {
  missionDatePublished = published;
  missionDateModified = modified;
  missionArticleSchema.datePublished = published;
  missionArticleSchema.dateModified = modified;
  missionArticleSchema.contentReferenceTime = published;
  missionReviewSchema.review.forEach((review) => {
    review.datePublished = published;
  });
  missionVideoSchema.uploadDate = published;
  missionAISchema.datePublished = published;
  missionAISchema.dateModified = modified;
  missionAISchema.contentReferenceTime = published;
  missionSocialSchema.datePublished = published;
  
  // Update additional schemas
  missionMetaTags["article:published_time"] = published;
  missionMetaTags["article:modified_time"] = modified;
  missionMetaTags["og:updated_time"] = modified;
}

export const missionArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Наша миссия 2026 | Велес Вояж - Философия путешествий",
  "description": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм, культурный обмен, образовательные путешествия 2026.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Наша миссия - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": missionDatePublished,
  "dateModified": missionDateModified,
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
    "@id": "https://veles-voyage.ru/mission"
  },
  "articleSection": "Наша миссия",
  "keywords": ["миссия турагентства", "философия путешествий", "индивидуальные туры", "качество услуг", "устойчивый туризм", "путешествия по России", "международные туры", "путешествия 2026", "культурный обмен", "образовательные путешествия", "Велес Вояж", "турагентство", "организация путешествий", "туризм 2026"],
  "wordCount": 7000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": missionDatePublished
};

export const missionSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/mission",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const missionReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Миссия Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "142"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Анна Козлова" },
      "datePublished": missionDatePublished,
      "reviewBody": "Отличная философия и подход к путешествиям! Индивидуальный подход, качественные услуги."
    }
  ]
};

export const missionFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "В чем заключается миссия турагентства Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наша миссия - открывать мир через призму личного опыта, предоставляя индивидуальные туры высокого качества с персональным подходом, поддерживая устойчивый туризм и культурный обмен."
      }
    },
    {
      "@type": "Question",
      "name": "Какие принципы лежат в основе работы Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы руководствуемся принципами индивидуального подхода, качества услуг, устойчивого туризма, культурного обмена, образовательных путешествий и безопасности клиентов."
      }
    },
    {
      "@type": "Question",
      "name": "Как Велес Вояж поддерживает устойчивый туризм?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы поддерживаем устойчивый туризм через экологические программы, уважение к местным культурам, поддержку местных сообществ и образовательные инициативы."
      }
    }
  ]
};

export const missionOrganizationSchema = {
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

export const missionVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Наша миссия - Велес Вояж",
  "description": "Видео о миссии турагентства Велес Вояж на Rutube-канале",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Наша миссия - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": missionDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const missionBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Наша миссия", "item": "https://veles-voyage.ru/mission" }
  ]
};

export const missionWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Наша миссия: Децентрализованный путеводитель Web3",
  "description": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/mission", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const missionDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Наша миссия: Анонимный путеводитель",
  "description": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/mission" }
};

export const missionAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Наша миссия: Альтернативная поисковая база",
  "description": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/mission.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const missionGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" },
    { "@value": "Veles Reisen", "@language": "de" }
  ],
  "description": { "@value": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта.", "@language": "ru" }
};

export const missionMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Наша миссия",
  "description": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const missionSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Наша миссия 2026 | Велес Вояж",
  "text": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм. #ВелесВояж #Миссия2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Наша миссия - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": missionDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/mission" }
};

export const missionAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Наша миссия 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const missionAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Наша миссия 2026 | Велес Вояж - Философия путешествий",
  "description": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм, культурный обмен, образовательные путешествия 2026.",
  "datePublished": missionDatePublished,
  "dateModified": missionDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/mission" },
  "wordCount": 7000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": missionDatePublished
};

export const missionAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Наша миссия",
  "description": "Мобильное приложение с информацией о миссии турагентства Велес Вояж",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const missionGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" }
  ],
  "description": { "@value": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта.", "@language": "ru" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "пр-т. Керамиков, 103",
    "addressLocality": "Голицыно",
    "postalCode": "143041",
    "addressCountry": "RU"
  }
};

export const missionSchemas = [
  missionArticleSchema,
  missionFAQSchema,
  missionOrganizationSchema,
  missionBreadcrumbsSchema,
  missionSpeakableSchema,
  missionReviewSchema,
  missionVideoSchema,
  missionWeb3Schema,
  missionDarkWebSchema,
  missionAltSearchSchema,
  missionGlobalSearchSchema,
  missionMobileSchema,
  missionSocialSchema,
  missionAccessibilitySchema,
  missionAISchema,
  missionAEOSchema,
  missionGEOEnhancedSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const missionMetaTags = {
  title: "Наша миссия 2026 | Велес Вояж - Философия путешествий",
  description: "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм, культурный обмен, образовательные путешествия 2026.",
  keywords: "миссия Велес Вояж, философия путешествий, индивидуальный подход, качество услуг, устойчивый туризм, культурный обмен, образовательные путешествия, путешествия по России, международные туры, туризм 2026, турагентство, организация путешествий",
  "og:title": "Наша миссия 2026 | Велес Вояж",
  "og:description": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Наша миссия",
  "og:url": "https://veles-voyage.ru/mission",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Наша миссия 2026 | Велес Вояж",
  "twitter:description": "Философия турагентства Велес Вояж. Открываем мир через призму личного опыта. Индивидуальный подход, качество услуг, устойчивый туризм.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Наша миссия - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Миссия",
  "theme-color": "#ffffff",
  "geo.region": "RU",
  "geo.placename": "Миссия",
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
  "article:published_time": missionDatePublished,
  "article:modified_time": missionDateModified,
  "og:updated_time": missionDateModified
};

export const missionHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/mission" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/mission" }
];

