// --- Динамические даты для SEO ---
export let toursCruiseDatePublished = new Date().toISOString().split('T')[0];
export let toursCruiseDateModified = new Date().toISOString().split('T')[0];

export function setToursCruiseDates({ published, modified }: { published: string, modified: string }) {
  toursCruiseDatePublished = published;
  toursCruiseDateModified = modified;
  toursCruiseArticleSchema.datePublished = published;
  toursCruiseArticleSchema.dateModified = modified;
  toursCruiseArticleSchema.contentReferenceTime = published;
  toursCruiseReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  toursCruiseVideoSchema.uploadDate = published;
  toursCruiseAISchema.datePublished = published;
  toursCruiseAISchema.dateModified = modified;
  toursCruiseAISchema.contentReferenceTime = published;
  toursCruiseSocialSchema.datePublished = published;
  
  // Update additional schemas
  toursCruiseMetaTags["article:published_time"] = published;
  toursCruiseMetaTags["article:modified_time"] = modified;
  toursCruiseMetaTags["og:updated_time"] = modified;
}

export const toursCruiseArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Круизные туры 2026 | Велес Вояж - Морские путешествия",
  "description": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Барселона, Дубай, Сингапур, Сидней, Осло, Берген, Ставангер. Океанские острова, побережья, круизные лайнеры, порты, комфортное проживание, профессиональные гиды.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Круизные туры - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursCruiseDatePublished,
  "dateModified": toursCruiseDateModified,
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
    "@id": "https://veles-voyage.ru/tours/cruise"
  },
  "articleSection": "Круизные туры",
  "keywords": ["круизные туры", "морские путешествия", "круизы", "круизные туры 2026", "Средиземное море круизы", "Карибы круизы", "Скандинавия круизы", "Азия круизы", "Аляска круизы", "кругосветные круизы", "Барселона", "Дубай", "Сингапур", "круизные лайнеры", "порты", "профессиональные гиды", "туризм 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursCruiseDatePublished
};

export const toursCruiseSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours/cruise",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const toursCruiseReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Круизные туры от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "145"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Елена Соколова" },
      "datePublished": toursCruiseDatePublished,
      "reviewBody": "Потрясающий круиз по Средиземному морю! Отличная организация, комфортные каюты, незабываемые экскурсии."
    }
  ]
};

export const toursCruiseFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие направления доступны в круизных турах?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предлагаем круизы по Средиземному морю, Карибам, Скандинавии, Азии, Аляске, а также кругосветные путешествия. Маршруты разрабатываются индивидуально под ваши интересы."
      }
    },
    {
      "@type": "Question",
      "name": "Как выбрать подходящий круизный тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наши специалисты помогут подобрать круиз, учитывая ваши интересы, бюджет и предпочтения. Мы предлагаем маршруты различной продолжительности от 3 до 21 дня, разные уровни комфорта."
      }
    },
    {
      "@type": "Question",
      "name": "Какие услуги включены в круизный тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В стоимость тура обычно включены: проживание в каютах, питание, развлечения на борту, экскурсии в портах с профессиональными гидами. Детали уточняются при бронировании."
      }
    }
  ]
};

export const toursCruiseOrganizationSchema = {
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

export const toursCruiseVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Круизные туры - Видеогид",
  "description": "Видеообзоры круизных туров на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Круизные туры - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursCruiseDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursCruiseBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" },
    { "@type": "ListItem", "position": 3, "name": "Круизные туры", "item": "https://veles-voyage.ru/tours/cruise" }
  ]
};

export const toursCruiseWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Круизные туры: Децентрализованный путеводитель Web3",
  "description": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Океанские острова, побережья, круизные лайнеры.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/cruise", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const toursCruiseDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Круизные туры: Анонимный путеводитель",
  "description": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Океанские острова, побережья, круизные лайнеры.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по круизам", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/tours/cruise" }
};

export const toursCruiseAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Круизные туры: Альтернативная поисковая база",
  "description": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Океанские острова, побережья, круизные лайнеры.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/cruise.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const toursCruiseGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Круизные туры", "@language": "ru" },
  "alternateName": [
    { "@value": "Cruise Tours", "@language": "en" },
    { "@value": "邮轮旅游", "@language": "zh" },
    { "@value": "Kreuzfahrten", "@language": "de" }
  ],
  "description": { "@value": "Круизы по Средиземному морю, Карибам, Скандинавии, Азии, Аляске, кругосветные путешествия", "@language": "ru" },
  "touristType": ["CruiseTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursCruiseMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Круизные туры",
  "description": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Океанские острова, побережья, круизные лайнеры.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const toursCruiseSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Круизные туры 2026 | Велес Вояж",
  "text": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Океанские острова, побережья, круизные лайнеры, комфортное проживание. #КруизныеТуры2026 #МорскиеПутешествия",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Круизные туры - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": toursCruiseDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/tours/cruise" }
};

export const toursCruiseAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Круизные туры 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const toursCruiseAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Круизные туры 2026 | Велес Вояж - Морские путешествия",
  "description": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Барселона, Дубай, Сингапур, Сидней, Осло, Берген, Ставангер. Океанские острова, побережья, круизные лайнеры, порты, комфортное проживание, профессиональные гиды.",
  "datePublished": toursCruiseDatePublished,
  "dateModified": toursCruiseDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours/cruise" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursCruiseDatePublished
};

export const toursCruiseAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Круизные туры",
  "description": "Мобильный гид по круизным турам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const toursCruiseGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Круизные туры", "@language": "ru" },
  "alternateName": [
    { "@value": "Cruise Tours", "@language": "en" },
    { "@value": "邮轮旅游", "@language": "zh" }
  ],
  "description": { "@value": "Круизы по Средиземному морю, Карибам, Скандинавии, Азии, Аляске, кругосветные путешествия", "@language": "ru" },
  "touristType": ["CruiseTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursCruiseTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Круизные туры 2026",
  "description": "Откройте красоты океанских островов и побережий в круизных турах с Велес Вояж. Исследуйте Средиземное море, Карибы, Скандинавию и другие направления.",
  "touristType": ["CruiseTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "85000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursCruiseSchemas = [
  toursCruiseArticleSchema,
  toursCruiseFAQSchema,
  toursCruiseOrganizationSchema,
  toursCruiseBreadcrumbsSchema,
  toursCruiseSpeakableSchema,
  toursCruiseReviewSchema,
  toursCruiseVideoSchema,
  toursCruiseWeb3Schema,
  toursCruiseDarkWebSchema,
  toursCruiseAltSearchSchema,
  toursCruiseGlobalSearchSchema,
  toursCruiseMobileSchema,
  toursCruiseSocialSchema,
  toursCruiseAccessibilitySchema,
  toursCruiseAISchema,
  toursCruiseAEOSchema,
  toursCruiseGEOEnhancedSchema,
  toursCruiseTouristTripSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const toursCruiseMetaTags = {
  title: "Круизные туры 2026 | Велес Вояж - Морские путешествия",
  description: "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Барселона, Дубай, Сингапур, Сидней, Осло, Берген, Ставангер. Океанские острова, побережья, круизные лайнеры, порты, комфортное проживание, профессиональные гиды.",
  keywords: "круизные туры, морские путешествия, Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия, Барселона, Дубай, Сингапур, Сидней, круизные лайнеры, порты, профессиональные гиды, туризм 2026",
  "og:title": "Круизные туры 2026 | Велес Вояж",
  "og:description": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Барселона, Дубай, Сингапур, Сидней, Осло, Берген, Ставангер.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Круизные туры",
  "og:url": "https://veles-voyage.ru/tours/cruise",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Круизные туры 2026 | Велес Вояж",
  "twitter:description": "Круизные туры: Средиземное море, Карибы, Скандинавия, Азия, Аляска, кругосветные путешествия. Барселона, Дубай, Сингапур, Сидней, Осло, Берген, Ставангер.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Круизные туры - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Круизы Туры",
  "theme-color": "#ffffff",
  "geo.region": "World",
  "geo.placename": "Круизные туры",
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
  "article:published_time": toursCruiseDatePublished,
  "article:modified_time": toursCruiseDateModified,
  "og:updated_time": toursCruiseDateModified
};

export const toursCruiseHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours/cruise" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours/cruise" }
];
