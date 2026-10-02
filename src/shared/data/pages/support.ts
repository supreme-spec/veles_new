// --- Динамические даты для SEO ---
export let supportDatePublished = new Date().toISOString().split('T')[0];
export let supportDateModified = new Date().toISOString().split('T')[0];

export function setSupportDates({ published, modified }: { published: string, modified: string }) {
  supportDatePublished = published;
  supportDateModified = modified;
  supportArticleSchema.datePublished = published;
  supportArticleSchema.dateModified = modified;
  supportArticleSchema.contentReferenceTime = published;
  supportReviewSchema.review.forEach((review) => {
    review.datePublished = published;
  });
  supportVideoSchema.uploadDate = published;
  supportAISchema.datePublished = published;
  supportAISchema.dateModified = modified;
  supportAISchema.contentReferenceTime = published;
  supportSocialSchema.datePublished = published;
  
  // Update additional schemas
  supportMetaTags["article:published_time"] = published;
  supportMetaTags["article:modified_time"] = modified;
  supportMetaTags["og:updated_time"] = modified;
}

export const supportArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Поддержка клиентов 2026 | Велес Вояж - Помощь и консультации",
  "description": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии, бронирование, круглосуточная поддержка.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Поддержка клиентов - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": supportDatePublished,
  "dateModified": supportDateModified,
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
    "@id": "https://veles-voyage.ru/support"
  },
  "articleSection": "Поддержка клиентов",
  "keywords": ["поддержка клиентов", "консультации по турам", "помощь в выборе туров", "сопровождение во время путешествий", "визы", "страховка", "трансфер", "экскурсии", "бронирование", "круглосуточная поддержка", "Велес Вояж", "турагентство", "туризм 2026"],
  "wordCount": 6000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": supportDatePublished
};

export const supportSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/support",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const supportReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Поддержка клиентов Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "165"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Татьяна Морозова" },
      "datePublished": supportDatePublished,
      "reviewBody": "Отличная поддержка! Быстро отвечают на вопросы, помогают с выбором туров, профессиональные консультации."
    }
  ]
};

export const supportFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие услуги поддержки предоставляет Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предоставляем консультации по выбору туров, помощь в оформлении виз и страховки, организацию трансферов и экскурсий, бронирование, сопровождение во время путешествий и круглосуточную поддержку."
      }
    },
    {
      "@type": "Question",
      "name": "Как связаться со службой поддержки?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Связаться можно по телефону +7 985 063-51-34, email hello@veles-voyage.ru или через Telegram @Anastasiiiiyyaa. Поддержка доступна 24/7."
      }
    },
    {
      "@type": "Question",
      "name": "Предоставляется ли поддержка во время путешествия?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, мы предоставляем круглосуточную поддержку во время путешествия. Наши специалисты готовы помочь в любой ситуации, включая экстренные случаи."
      }
    }
  ]
};

export const supportOrganizationSchema = {
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
    "email": "hello@veles-voyage.ru",
    "availableLanguage": ["Russian", "English"],
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
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

export const supportVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Поддержка клиентов - Велес Вояж",
  "description": "Видео о поддержке клиентов турагентства Велес Вояж на Rutube-канале",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Поддержка клиентов - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": supportDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const supportBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Поддержка клиентов", "item": "https://veles-voyage.ru/support" }
  ]
};

export const supportWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Поддержка клиентов: Децентрализованный путеводитель Web3",
  "description": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/support", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const supportDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Поддержка клиентов: Анонимный путеводитель",
  "description": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/support" }
};

export const supportAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Поддержка клиентов: Альтернативная поисковая база",
  "description": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/support.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const supportGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" },
    { "@value": "Veles Reisen", "@language": "de" }
  ],
  "description": { "@value": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий.", "@language": "ru" }
};

export const supportMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Поддержка клиентов",
  "description": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Чат поддержки"]
};

export const supportSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Поддержка клиентов 2026 | Велес Вояж",
  "text": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии, круглосуточная поддержка. #ВелесВояж #Поддержка2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Поддержка клиентов - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": supportDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/support" }
};

export const supportAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Поддержка клиентов 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const supportAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Поддержка клиентов 2026 | Велес Вояж - Помощь и консультации",
  "description": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии, бронирование, круглосуточная поддержка.",
  "datePublished": supportDatePublished,
  "dateModified": supportDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/support" },
  "wordCount": 6000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": supportDatePublished
};

export const supportAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Поддержка клиентов",
  "description": "Мобильное приложение с поддержкой клиентов турагентства Велес Вояж",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим", "Чат поддержки"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const supportGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" }
  ],
  "description": { "@value": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий.", "@language": "ru" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "пр-т. Керамиков, 103",
    "addressLocality": "Голицыно",
    "postalCode": "143041",
    "addressCountry": "RU"
  }
};

export const supportSchemas = [
  supportArticleSchema,
  supportFAQSchema,
  supportOrganizationSchema,
  supportBreadcrumbsSchema,
  supportSpeakableSchema,
  supportReviewSchema,
  supportVideoSchema,
  supportWeb3Schema,
  supportDarkWebSchema,
  supportAltSearchSchema,
  supportGlobalSearchSchema,
  supportMobileSchema,
  supportSocialSchema,
  supportAccessibilitySchema,
  supportAISchema,
  supportAEOSchema,
  supportGEOEnhancedSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const supportMetaTags = {
  title: "Поддержка клиентов 2026 | Велес Вояж - Помощь и консультации",
  description: "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии, бронирование, круглосуточная поддержка.",
  keywords: "поддержка клиентов, помощь туристам, консультации по турам, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии, бронирование, круглосуточная поддержка, туризм 2026, турагентство, организация путешествий",
  "og:title": "Поддержка клиентов 2026 | Велес Вояж",
  "og:description": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии, бронирование, круглосуточная поддержка.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Поддержка клиентов",
  "og:url": "https://veles-voyage.ru/support",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Поддержка клиентов 2026 | Велес Вояж",
  "twitter:description": "Поддержка клиентов турагентства Велес Вояж. Консультации, помощь в выборе туров, сопровождение во время путешествий, визы, страховка, трансфер, экскурсии, бронирование, круглосуточная поддержка.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Поддержка клиентов - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Поддержка",
  "theme-color": "#ffffff",
  "geo.region": "RU",
  "geo.placename": "Поддержка клиентов",
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
  "article:published_time": supportDatePublished,
  "article:modified_time": supportDateModified,
  "og:updated_time": supportDateModified
};

export const supportHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/support" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/support" }
];

