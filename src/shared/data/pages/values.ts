// --- Динамические даты для SEO ---
export let valuesDatePublished = new Date().toISOString().split('T')[0];
export let valuesDateModified = new Date().toISOString().split('T')[0];

export function setValuesDates({ published, modified }: { published: string, modified: string }) {
  valuesDatePublished = published;
  valuesDateModified = modified;
  valuesArticleSchema.datePublished = published;
  valuesArticleSchema.dateModified = modified;
  valuesArticleSchema.contentReferenceTime = published;
  valuesReviewSchema.review.forEach((review) => {
    review.datePublished = published;
  });
  valuesVideoSchema.uploadDate = published;
  valuesAISchema.datePublished = published;
  valuesAISchema.dateModified = modified;
  valuesAISchema.contentReferenceTime = published;
  valuesSocialSchema.datePublished = published;
  
  // Update additional schemas
  valuesMetaTags["article:published_time"] = published;
  valuesMetaTags["article:modified_time"] = modified;
  valuesMetaTags["og:updated_time"] = modified;
}

export const valuesArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Наши ценности 2026 | Велес Вояж - Принципы работы",
  "description": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников, этичный туризм, качество услуг 2026.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Наши ценности - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": valuesDatePublished,
  "dateModified": valuesDateModified,
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
    "@id": "https://veles-voyage.ru/values"
  },
  "articleSection": "Наши ценности",
  "keywords": ["ценности турагентства", "аутентичные впечатления", "устойчивый туризм", "современные технологии", "персональный подход", "безопасность путешественников", "этичный туризм", "качество услуг", "Велес Вояж", "турагентство", "организация путешествий", "туризм 2026"],
  "wordCount": 7000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": valuesDatePublished
};

export const valuesSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/values",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const valuesReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ценности Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "138"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Игорь Соколов" },
      "datePublished": valuesDatePublished,
      "reviewBody": "Отличные ценности и принципы работы! Аутентичные впечатления, персональный подход, безопасность."
    }
  ]
};

export const valuesFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие ценности лежат в основе работы Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наши основные ценности: аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников, этичный туризм и качество услуг."
      }
    },
    {
      "@type": "Question",
      "name": "Как Велес Вояж обеспечивает безопасность путешественников?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы обеспечиваем безопасность через тщательный отбор партнеров, страховое покрытие, круглосуточную поддержку, консультации по безопасности и оперативную помощь в экстренных ситуациях."
      }
    },
    {
      "@type": "Question",
      "name": "Что означает персональный подход в туризме?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Персональный подход означает индивидуальную разработку маршрутов с учетом ваших интересов, бюджета и предпочтений, персонального менеджера и гибкость в планировании."
      }
    }
  ]
};

export const valuesOrganizationSchema = {
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

export const valuesVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Наши ценности - Велес Вояж",
  "description": "Видео о ценностях турагентства Велес Вояж на Rutube-канале",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Наши ценности - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": valuesDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const valuesBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Наши ценности", "item": "https://veles-voyage.ru/values" }
  ]
};

export const valuesWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Наши ценности: Децентрализованный путеводитель Web3",
  "description": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/values", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const valuesDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Наши ценности: Анонимный путеводитель",
  "description": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/values" }
};

export const valuesAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Наши ценности: Альтернативная поисковая база",
  "description": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/values.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const valuesGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" },
    { "@value": "Veles Reisen", "@language": "de" }
  ],
  "description": { "@value": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход.", "@language": "ru" }
};

export const valuesMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Наши ценности",
  "description": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const valuesSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Наши ценности 2026 | Велес Вояж",
  "text": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников. #ВелесВояж #Ценности2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Наши ценности - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": valuesDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/values" }
};

export const valuesAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Наши ценности 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const valuesAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Наши ценности 2026 | Велес Вояж - Принципы работы",
  "description": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников, этичный туризм, качество услуг 2026.",
  "datePublished": valuesDatePublished,
  "dateModified": valuesDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/values" },
  "wordCount": 7000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": valuesDatePublished
};

export const valuesAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Наши ценности",
  "description": "Мобильное приложение с информацией о ценностях турагентства Велес Вояж",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const valuesGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" }
  ],
  "description": { "@value": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход.", "@language": "ru" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "пр-т. Керамиков, 103",
    "addressLocality": "Голицыно",
    "postalCode": "143041",
    "addressCountry": "RU"
  }
};

export const valuesSchemas = [
  valuesArticleSchema,
  valuesFAQSchema,
  valuesOrganizationSchema,
  valuesBreadcrumbsSchema,
  valuesSpeakableSchema,
  valuesReviewSchema,
  valuesVideoSchema,
  valuesWeb3Schema,
  valuesDarkWebSchema,
  valuesAltSearchSchema,
  valuesGlobalSearchSchema,
  valuesMobileSchema,
  valuesSocialSchema,
  valuesAccessibilitySchema,
  valuesAISchema,
  valuesAEOSchema,
  valuesGEOEnhancedSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const valuesMetaTags = {
  title: "Наши ценности 2026 | Велес Вояж - Принципы работы",
  description: "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников, этичный туризм, качество услуг 2026.",
  keywords: "ценности Велес Вояж, принципы работы, аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников, этичный туризм, качество услуг, путешествия с заботой, туризм 2026, турагентство",
  "og:title": "Наши ценности 2026 | Велес Вояж",
  "og:description": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Наши ценности",
  "og:url": "https://veles-voyage.ru/values",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Наши ценности 2026 | Велес Вояж",
  "twitter:description": "Ценности турагентства Велес Вояж. Аутентичные впечатления, устойчивый туризм, современные технологии, персональный подход, безопасность путешественников.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Наши ценности - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Ценности",
  "theme-color": "#ffffff",
  "geo.region": "RU",
  "geo.placename": "Ценности",
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
  "article:published_time": valuesDatePublished,
  "article:modified_time": valuesDateModified,
  "og:updated_time": valuesDateModified
};

export const valuesHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/values" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/values" }
];

