// --- Динамические даты для SEO ---
export let toursAfricaDatePublished = new Date().toISOString().split('T')[0];
export let toursAfricaDateModified = new Date().toISOString().split('T')[0];

export function setToursAfricaDates({ published, modified }: { published: string, modified: string }) {
  toursAfricaDatePublished = published;
  toursAfricaDateModified = modified;
  toursAfricaArticleSchema.datePublished = published;
  toursAfricaArticleSchema.dateModified = modified;
  toursAfricaArticleSchema.contentReferenceTime = published;
  toursAfricaReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  toursAfricaVideoSchema.uploadDate = published;
  toursAfricaAISchema.datePublished = published;
  toursAfricaAISchema.dateModified = modified;
  toursAfricaAISchema.contentReferenceTime = published;
  toursAfricaSocialSchema.datePublished = published;
  
  // Update additional schemas
  toursAfricaMetaTags["article:published_time"] = published;
  toursAfricaMetaTags["article:modified_time"] = modified;
  toursAfricaMetaTags["og:updated_time"] = modified;
}

export const toursAfricaArticleSchema: any = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Африканские туры 2026 | Велес Вояж - Сафари и экзотика Африки",
  "description": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Найроби, Дар-эс-Салам, Кейптаун, Каир, Марракеш, Виндхук, Габороне, Стоун-Таун. Сафари, дикая природа, национальные парки, экзотические пейзажи, комфортное проживание, профессиональные гиды.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Африканские туры - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursAfricaDatePublished,
  "dateModified": toursAfricaDateModified,
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
    "@id": "https://veles-voyage.ru/tours/africa"
  },
  "articleSection": "Африканские туры",
  "keywords": ["африканские туры", "сафари туры", "туры по Африке", "африканские туры 2026", "Кения туры", "Танзания туры", "ЮАР туры", "Египет туры", "Марокко туры", "Кейптаун", "Каир", "Марракеш", "сафари", "дикая природа", "национальные парки", "профессиональные гиды", "туризм 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursAfricaDatePublished
};

export const toursAfricaSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours/africa",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const toursAfricaReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Африканские туры от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "112"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Андрей Петров" },
      "datePublished": toursAfricaDatePublished,
      "reviewBody": "Незабываемое сафари в Кении! Дикая природа, профессиональные гиды, отличная организация тура."
    }
  ]
};

export const toursAfricaFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие страны входят в африканские туры?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предлагаем туры по Кении, Танзании, ЮАР, Египту, Марокко, Намибии, Ботсване, Занзибару и другим африканским странам. Маршруты разрабатываются индивидуально под ваши интересы."
      }
    },
    {
      "@type": "Question",
      "name": "Как выбрать подходящий африканский тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наши специалисты помогут подобрать тур, учитывая ваши интересы, бюджет и предпочтения. Мы предлагаем маршруты различной продолжительности от 7 до 21 дня, разные уровни комфорта."
      }
    },
    {
      "@type": "Question",
      "name": "Какие услуги включены в африканский тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В стоимость тура обычно включены: проживание в лоджах и отелях, сафари с профессиональными гидами, трансферы, питание. Детали уточняются при бронировании."
      }
    },
    {
      "@type": "Question",
      "name": "Нужна ли виза в Египет для россиян?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Для въезда в Египет гражданам РФ нужна виза, которую можно оформить по прилёте в аэропорту или заранее онлайн (e-Visa). Загранпаспорт должен действовать минимум 6 месяцев со дня въезда."
      }
    }
  ]
};

export const toursAfricaOrganizationSchema = {
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

export const toursAfricaVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Африканские туры - Видеогид",
  "description": "Видеообзоры африканских туров на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Африканские туры - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursAfricaDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursAfricaBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" },
    { "@type": "ListItem", "position": 3, "name": "Африканские туры", "item": "https://veles-voyage.ru/tours/africa" }
  ]
};

export const toursAfricaWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Африканские туры: Децентрализованный путеводитель Web3",
  "description": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Сафари, дикая природа, национальные парки.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/africa", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const toursAfricaDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Африканские туры: Анонимный путеводитель",
  "description": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Сафари, дикая природа, национальные парки.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по Африке", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/tours/africa" }
};

export const toursAfricaAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Африканские туры: Альтернативная поисковая база",
  "description": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Сафари, дикая природа, национальные парки.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/africa.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const toursAfricaGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Африканские туры", "@language": "ru" },
  "alternateName": [
    { "@value": "African Tours", "@language": "en" },
    { "@value": "非洲旅游", "@language": "zh" },
    { "@value": "Afrikareisen", "@language": "de" }
  ],
  "description": { "@value": "Туры по Кении, Танзании, ЮАР, Египту, Марокко, Намибии, Ботсване, Занзибару", "@language": "ru" },
  "touristType": ["AdventureTourism", "Ecotourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursAfricaMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Африканские туры",
  "description": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Сафари, дикая природа, национальные парки.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const toursAfricaSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Африканские туры 2026 | Велес Вояж",
  "text": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Сафари, дикая природа, национальные парки, комфортное проживание. #АфриканскиеТуры2026 #Сафари",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Африканские туры - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": toursAfricaDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/tours/africa" }
};

export const toursAfricaAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Африканские туры 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const toursAfricaAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Африканские туры 2026 | Велес Вояж - Сафари и экзотика Африки",
  "description": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Найроби, Дар-эс-Салам, Кейптаун, Каир, Марракеш, Виндхук, Габороне, Стоун-Таун. Сафари, дикая природа, национальные парки, экзотические пейзажи, комфортное проживание, профессиональные гиды.",
  "datePublished": toursAfricaDatePublished,
  "dateModified": toursAfricaDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours/africa" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursAfricaDatePublished
};

export const toursAfricaAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Африканские туры",
  "description": "Мобильный гид по африканским турам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const toursAfricaGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Африканские туры", "@language": "ru" },
  "alternateName": [
    { "@value": "African Tours", "@language": "en" },
    { "@value": "非洲旅游", "@language": "zh" }
  ],
  "description": { "@value": "Туры по Кении, Танзании, ЮАР, Египту, Марокко, Намибии, Ботсване, Занзибару", "@language": "ru" },
  "touristType": ["AdventureTourism", "Ecotourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursAfricaTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Африканские туры 2026",
  "description": "Откройте дикую природу и удивительные пейзажи Африки с Велес Вояж. Отправьтесь в незабываемое сафари-путешествие по лучшим направлениям Африки.",
  "touristType": ["AdventureTourism", "Ecotourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "60000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursAfricaSchemas = [
  toursAfricaArticleSchema,
  toursAfricaFAQSchema,
  toursAfricaOrganizationSchema,
  toursAfricaBreadcrumbsSchema,
  toursAfricaSpeakableSchema,
  toursAfricaReviewSchema,
  toursAfricaVideoSchema,
  toursAfricaWeb3Schema,
  toursAfricaDarkWebSchema,
  toursAfricaAltSearchSchema,
  toursAfricaGlobalSearchSchema,
  toursAfricaMobileSchema,
  toursAfricaSocialSchema,
  toursAfricaAccessibilitySchema,
  toursAfricaAISchema,
  toursAfricaAEOSchema,
  toursAfricaGEOEnhancedSchema,
  toursAfricaTouristTripSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const toursAfricaMetaTags = {
  title: "Африканские туры 2026 | Велес Вояж - Сафари и экзотика Африки",
  description: "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Найроби, Дар-эс-Салам, Кейптаун, Каир, Марракеш, Виндхук, Габороне, Стоун-Таун. Сафари, дикая природа, национальные парки, экзотические пейзажи, комфортное проживание, профессиональные гиды.",
  keywords: "африканские туры, туры по Африке, Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар, Кейптаун, Каир, Марракеш, сафари, дикая природа, национальные парки, профессиональные гиды, туризм 2026",
  "og:title": "Африканские туры 2026 | Велес Вояж",
  "og:description": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Найроби, Дар-эс-Салам, Кейптаун, Каир, Марракеш, Виндхук, Габороне, Стоун-Таун.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Африканские туры",
  "og:url": "https://veles-voyage.ru/tours/africa",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Африканские туры 2026 | Велес Вояж",
  "twitter:description": "Африканские туры: Кения, Танзания, ЮАР, Египет, Марокко, Намибия, Ботсвана, Занзибар. Найроби, Дар-эс-Салам, Кейптаун, Каир, Марракеш, Виндхук, Габороне, Стоун-Таун.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Африканские туры - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Африка Туры",
  "theme-color": "#ffffff",
  "geo.region": "AF",
  "geo.placename": "Африка",
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
  "article:published_time": toursAfricaDatePublished,
  "article:modified_time": toursAfricaDateModified,
  "og:updated_time": toursAfricaDateModified
};

export const toursAfricaHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours/africa" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours/africa" }
];
