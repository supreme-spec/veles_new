// --- Динамические даты для SEO ---
export let scandinavianDatePublished = new Date().toISOString().split('T')[0];
export let scandinavianDateModified = new Date().toISOString().split('T')[0];

export function setScandinavianDates({ published, modified }: { published: string, modified: string }) {
  scandinavianDatePublished = published;
  scandinavianDateModified = modified;
  scandinavianArticleSchema.datePublished = published;
  scandinavianArticleSchema.dateModified = modified;
  scandinavianArticleSchema.contentReferenceTime = published;
  scandinavianReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  scandinavianVideoSchema.uploadDate = published;
  scandinavianAISchema.datePublished = published;
  scandinavianAISchema.dateModified = modified;
  scandinavianAISchema.contentReferenceTime = published;
  scandinavianSocialSchema.datePublished = published;
}

export const scandinavianArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Скандинавские фьорды 2026 | Велес Вояж - Круизы по Норвегии и Скандинавии",
  "description": "Скандинавские фьорды: Норвегия, Швеция, Дания. Осло, Берген, Ставангер, Гейрангер, Хельсинки, Стокгольм, Копенгаген. Величественные фьорды, дикая природа, северное сияние, скандинавская кухня, бронирование от 120 000₽.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Скандинавские фьорды - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": scandinavianDatePublished,
  "dateModified": scandinavianDateModified,
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
    "@id": "https://veles-voyage.ru/cruises/scandinavian"
  },
  "articleSection": "Круизы по Скандинавии",
  "keywords": ["скандинавские фьорды круиз", "круизы по Норвегии", "скандинавские круизы 2026", "круизы по Скандинавии", "норвежские фьорды круиз", "круизы Гейрангер", "круизы Норвежские фьорды", "круизы Ставангер", "круизы Берген", "круизы Осло", "круизы Хельсинки", "круизы Стокгольм", "круизы Копенгаген", "северное сияние круиз", "норвежские круизы", "шведские круизы", "датские круизы", "финские круизы", "круизы по фьордам", "величественные фьорды", "дикая природа", "северное сияние", "скандинавская кухня", "национальные парки", "круизные лайнеры", "морские путешествия", "круизные туры", "скандинавские порты", "экскурсии в портах", "что посмотреть в Скандинавии", "лучшие маршруты круизов", "сколько стоит круиз по Скандинавии", "когда лучше ехать в круиз", "продолжительность круиза", "какие страны посещает круиз", "когда увидеть северное сияние", "период северного сияния", "северные путешествия", "круизы для семей", "романтические круизы", "круизы для пожилых", "круизы для молодых", "бронирование круизов", "цены на круизы", "скидки на круизы", "раннее бронирование", "последняя минута круизы", "морские круизы 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": scandinavianDatePublished
};

export const scandinavianSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/cruises/scandinavian",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const scandinavianReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Скандинавские фьорды от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "52"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Игорь Новиков" },
      "datePublished": scandinavianDatePublished,
      "reviewBody": "Незабываемый круиз по норвежским фьордам! Природа потрясающая, особенно Гейрангер-фьорд."
    }
  ]
};

export const scandinavianFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие страны посещает круиз по скандинавским фьордам?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Круизы по скандинавским фьордам охватывают Норвегию, Швецию и Данию. Популярные порты включают Осло, Берген, Ставангер, Гейрангер, Хельсинки, Стокгольм и Копенгаген."
      }
    },
    {
      "@type": "Question",
      "name": "Какова продолжительность круиза по скандинавским фьордам?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Продолжительность круизов по скандинавским фьордам варьируется от 7 до 14 дней, в зависимости от выбранного маршрута. Есть также более короткие варианты на 3-5 дней и длительные северные путешествия до 21 дня."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли увидеть северное сияние в круизе по скандинавским фьордам?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, в период с сентября по март есть возможность увидеть северное сияние, особенно в северных регионах Норвегии. Мы предлагаем специальные маршруты для наблюдения за этим природным феноменом."
      }
    }
  ]
};

export const scandinavianOrganizationSchema = {
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

export const scandinavianVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Скандинавские фьорды - Видеогид",
  "description": "Видеообзоры круизов по скандинавским фьордам и достопримечательностей на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Скандинавские фьорды - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": scandinavianDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const scandinavianBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Круизы", "item": "https://veles-voyage.ru/cruises" },
    { "@type": "ListItem", "position": 3, "name": "Скандинавские фьорды", "item": "https://veles-voyage.ru/cruises/scandinavian" }
  ]
};

export const scandinavianWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Скандинавские фьорды: Децентрализованный путеводитель Web3",
  "description": "Скандинавские фьорды: Норвегия, Швеция, Дания. Осло, Берген, Ставангер, Гейрангер, Хельсинки, Стокгольм, Копенгаген. Величественные фьорды, дикая природа, северное сияние, скандинавская кухня, национальные парки.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/scandinavian", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const scandinavianDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Скандинавские фьорды: Анонимный путеводитель",
  "description": "Скандинавские фьорды: Норвегия, Швеция, Дания. Осло, Берген, Ставангер, Гейрангер, Хельсинки, Стокгольм, Копенгаген. Величественные фьорды, дикая природа, северное сияние, скандинавская кухня, национальные парки.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по Скандинавии", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/cruises/scandinavian" }
};

export const scandinavianAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Скандинавские фьорды: Альтернативная поисковая база",
  "description": "Скандинавские фьорды: Норвегия, Швеция, Дания. Осло, Берген, Ставангер, Гейрангер, Хельсинки, Стокгольм, Копенгаген. Величественные фьорды, дикая природа, северное сияние, скандинавская кухня, национальные парки.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/scandinavian.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const scandinavianGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Скандинавские фьорды", "@language": "ru" },
  "alternateName": [
    { "@value": "Scandinavian Fjords", "@language": "en" },
    { "@value": "斯堪的纳维亚峡湾", "@language": "zh" },
    { "@value": "Skandinavische Fjorde", "@language": "de" }
  ],
  "description": { "@value": "Круизы по Норвегии, Швеции, Дании. Фьорды, северное сияние", "@language": "ru" },
  "touristType": ["CruiseTourism", "NatureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const scandinavianMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Скандинавские фьорды",
  "description": "Скандинавские фьорды: Норвегия, Швеция, Дания. Осло, Берген, Ставангер, Гейрангер, Хельсинки, Стокгольм, Копенгаген. Величественные фьорды, дикая природа, северное сияние, скандинавская кухня, национальные парки.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник"]
};

export const scandinavianSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Скандинавские фьорды 2026 | Велес Вояж",
  "text": "Скандинавские фьорды: Норвегия, Швеция, Дания. Величественные фьорды, дикая природа, северное сияние. Круизы от 120 000₽. #СкандинавскиеФьорды #Круизы2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Скандинавские фьорды - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": scandinavianDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/cruises/scandinavian" }
};

export const scandinavianAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Скандинавские фьорды 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const scandinavianAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Скандинавские фьорды 2026 | Велес Вояж - Круизы по Норвегии и Скандинавии",
  "description": "Скандинавские фьорды: Норвегия, Швеция, Дания. Величественные фьорды, дикая природа, северное сияние. Круизы от 120 000₽. Осло, Берген, Ставангер.",
  "datePublished": scandinavianDatePublished,
  "dateModified": scandinavianDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/cruises/scandinavian" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": scandinavianDatePublished
};

export const scandinavianAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Скандинавские фьорды",
  "description": "Мобильный гид по скандинавским фьордам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const scandinavianGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Скандинавские фьорды", "@language": "ru" },
  "alternateName": [
    { "@value": "Scandinavian Fjords", "@language": "en" },
    { "@value": "斯堪的纳维亚峡湾", "@language": "zh" }
  ],
  "description": { "@value": "Круизы по Норвегии, Швеции, Дании. Фьорды, северное сияние", "@language": "ru" },
  "geo": { "@type": "GeoShape", "box": "55.0 5.0 71.0 32.0" },
  "location": { "@type": "Place", "geo": { "@type": "GeoCoordinates", "latitude": 63.0, "longitude": 10.0 } },
  "touristType": ["CruiseTourism", "NatureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const scandinavianTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Скандинавские фьорды 2026",
  "description": "Откройте дикую природу и величественные фьорды Скандинавии с Велес Вояж",
  "touristType": ["CruiseTourism", "NatureTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "120000",
    "availability": "InStock",
    "validFrom": "2026-09-17"
  }
};

export const scandinavianSchemas = [
  scandinavianArticleSchema,
  scandinavianFAQSchema,
  scandinavianOrganizationSchema,
  scandinavianBreadcrumbsSchema,
  scandinavianSpeakableSchema,
  scandinavianReviewSchema,
  scandinavianVideoSchema,
  scandinavianWeb3Schema,
  scandinavianDarkWebSchema,
  scandinavianAltSearchSchema,
  scandinavianGlobalSearchSchema,
  scandinavianMobileSchema,
  scandinavianSocialSchema,
  scandinavianAccessibilitySchema,
  scandinavianAISchema,
  scandinavianAEOSchema,
  scandinavianGEOEnhancedSchema,
  scandinavianTouristTripSchema
];

export const scandinavianHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/cruises/scandinavian" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/cruises/scandinavian" }
];

