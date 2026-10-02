// --- Динамические даты для SEO ---
export let asianDatePublished = new Date().toISOString().split('T')[0];
export let asianDateModified = new Date().toISOString().split('T')[0];

export function setAsianDates({ published, modified }: { published: string, modified: string }) {
  asianDatePublished = published;
  asianDateModified = modified;
  asianArticleSchema.datePublished = published;
  asianArticleSchema.dateModified = modified;
  asianArticleSchema.contentReferenceTime = published;
  asianReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  asianVideoSchema.uploadDate = published;
  asianAISchema.datePublished = published;
  asianAISchema.dateModified = modified;
  asianAISchema.contentReferenceTime = published;
  asianSocialSchema.datePublished = published;
}

export const asianArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Азиатские воды 2026 | Велес Вояж - Круизы по Юго-Восточной Азии",
  "description": "Азиатские круизы: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Филиппины, Камбоджа. Бангкок, Хошимин, Куала-Лумпур, Бали, Манила, Сием-Риеп. Экзотические острова, буддийские храмы, древние храмы Ангкор-Ват, азиатская кухня, тропики, бронирование от 110 000₽.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Азиатские воды - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": asianDatePublished,
  "dateModified": asianDateModified,
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
    "@id": "https://veles-voyage.ru/cruises/asian"
  },
  "articleSection": "Круизы по Азии",
  "keywords": ["азиатские воды круиз", "круизы по Юго-Восточной Азии", "азиатские круизы 2026", "круизы Таиланд", "круизы Вьетнам", "круизы Малайзия", "круизы Сингапур", "круизы Индонезия", "круизы Филиппины", "круизы Камбоджа", "Бангкок круиз", "Хошимин круиз", "Куала-Лумпур круиз", "Сингапур круиз", "Бали круиз", "Манила круиз", "Сием-Риеп круиз", "экзотические круизы Азия", "круизы по Азии", "Юго-Восточная Азия", "экзотические острова", "буддийские храмы", "рисовые террасы", "древние храмы Ангкор-Ват", "колониальная архитектура", "азиатская кухня", "тропики", "круизные лайнеры", "морские путешествия", "круизные туры", "азиатские порты", "экскурсии в портах", "что посмотреть в Азии", "лучшие маршруты круизов", "сколько стоит круиз по Азии", "когда лучше ехать в круиз", "продолжительность круиза", "какие страны посещает круиз", "культурные особенности", "традиционные рынки", "местная кухня", "экзотические специи", "круизы для семей", "романтические круизы", "круизы для пожилых", "круизы для молодых", "бронирование круизов", "цены на круизы", "скидки на круизы", "раннее бронирование", "последняя минута круизы", "морские круизы 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": asianDatePublished
};

export const asianSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/cruises/asian",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const asianReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Азиатские круизы от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "41"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ольга Соколова" },
      "datePublished": asianDatePublished,
      "reviewBody": "Потрясающий круиз по Азии! Посетили Таиланд, Сингапур и Бали. Культура и природа невероятные."
    }
  ]
};

export const asianFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие страны посещает круиз по азиатским водам?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Круизы по азиатским водам охватывают Таиланд, Вьетнам, Малайзию, Сингапур, Индонезию, Филиппины и Камбоджу. Популярные порты включают Бангкок, Хошимин, Куала-Лумпур, Сингапур, Бали, Манилу и Сием-Риеп."
      }
    },
    {
      "@type": "Question",
      "name": "Какова продолжительность круиза по азиатским водам?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Продолжительность круизов по азиатским водам варьируется от 7 до 14 дней, в зависимости от выбранного маршрута. Есть также более короткие варианты на 3-5 дней и длительные азиатские путешествия до 21 дня."
      }
    },
    {
      "@type": "Question",
      "name": "Какие культурные особенности можно увидеть в азиатских круизах?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Азиатские круизы предлагают уникальные культурные впечатления: буддийские храмы, традиционные рынки, рисовые террасы, древние храмы Ангкор-Ват, колониальную архитектуру и местную кухню с экзотическими специями."
      }
    }
  ]
};

export const asianOrganizationSchema = {
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

export const asianVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Азиатские воды - Видеогид",
  "description": "Видеообзоры круизов по азиатским водам и достопримечательностей на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Азиатские воды - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": asianDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const asianBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Круизы", "item": "https://veles-voyage.ru/cruises" },
    { "@type": "ListItem", "position": 3, "name": "Азиатские воды", "item": "https://veles-voyage.ru/cruises/asian" }
  ]
};

export const asianWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Азиатские воды: Децентрализованный путеводитель Web3",
  "description": "Азиатские круизы: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Филиппины, Камбоджа. Бангкок, Хошимин, Куала-Лумпур, Сингапур, Бали, Манила, Сием-Риеп. Экзотические острова, буддийские храмы, рисовые террасы, древние храмы Ангкор-Ват, колониальная архитектура, азиатская кухня, тропики.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/asian", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const asianDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Азиатские воды: Анонимный путеводитель",
  "description": "Азиатские круизы: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Филиппины, Камбоджа. Бангкок, Хошимин, Куала-Лумпур, Сингапур, Бали, Манила, Сием-Риеп. Экзотические острова, буддийские храмы, рисовые террасы, древние храмы Ангкор-Ват, колониальная архитектура, азиатская кухня, тропики.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по Азии", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/cruises/asian" }
};

export const asianAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Азиатские воды: Альтернативная поисковая база",
  "description": "Азиатские круизы: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Филиппины, Камбоджа. Бангкок, Хошимин, Куала-Лумпур, Сингапур, Бали, Манила, Сием-Риеп. Экзотические острова, буддийские храмы, рисовые террасы, древние храмы Ангкор-Ват, колониальная архитектура, азиатская кухня, тропики.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/asian.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const asianGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Азиатские воды", "@language": "ru" },
  "alternateName": [
    { "@value": "Asian Waters Cruises", "@language": "en" },
    { "@value": "亚洲水域邮轮", "@language": "zh" },
    { "@value": "Asiatische Gewässer Kreuzfahrten", "@language": "de" }
  ],
  "description": { "@value": "Круизы по Таиланду, Вьетнаму, Малайзии, Сингапуру, Индонезии, Филиппинам", "@language": "ru" },
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const asianMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Азиатские воды",
  "description": "Азиатские круизы: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Филиппины, Камбоджа. Бангкок, Хошимин, Куала-Лумпур, Сингапур, Бали, Манила, Сием-Риеп. Экзотические острова, буддийские храмы, рисовые террасы, древние храмы Ангкор-Ват, колониальная архитектура, азиатская кухня, тропики.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник"]
};

export const asianSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Азиатские воды 2026 | Велес Вояж",
  "text": "Азиатские круизы: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Филиппины. Экзотические острова, буддийские храмы, тропики. От 110 000₽. #АзиатскиеКруизы #Круизы2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Азиатские воды - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": asianDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/cruises/asian" }
};

export const asianAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Азиатские воды 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const asianAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Азиатские воды 2026 | Велес Вояж - Круизы по Юго-Восточной Азии",
  "description": "Азиатские круизы: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия, Филиппины. Экзотические острова, буддийские храмы, тропики. От 110 000₽.",
  "datePublished": asianDatePublished,
  "dateModified": asianDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/cruises/asian" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": asianDatePublished
};

export const asianAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Азиатские воды",
  "description": "Мобильный гид по азиатским круизам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const asianGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Азиатские воды", "@language": "ru" },
  "alternateName": [
    { "@value": "Asian Waters Cruises", "@language": "en" },
    { "@value": "亚洲水域邮轮", "@language": "zh" }
  ],
  "description": { "@value": "Круизы по Таиланду, Вьетнаму, Малайзии, Сингапуру, Индонезии, Филиппинам", "@language": "ru" },
  "geo": { "@type": "GeoShape", "box": "-10.0 95.0 30.0 145.0" },
  "location": { "@type": "Place", "geo": { "@type": "GeoCoordinates", "latitude": 10.0, "longitude": 120.0 } },
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const asianTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Азиатские воды 2026",
  "description": "Исследуйте экзотические острова и богатую культуру Юго-Восточной Азии с Велес Вояж",
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "110000",
    "availability": "InStock",
    "validFrom": "2026-09-17"
  }
};

export const asianSchemas = [
  asianArticleSchema,
  asianFAQSchema,
  asianOrganizationSchema,
  asianBreadcrumbsSchema,
  asianSpeakableSchema,
  asianReviewSchema,
  asianVideoSchema,
  asianWeb3Schema,
  asianDarkWebSchema,
  asianAltSearchSchema,
  asianGlobalSearchSchema,
  asianMobileSchema,
  asianSocialSchema,
  asianAccessibilitySchema,
  asianAISchema,
  asianAEOSchema,
  asianGEOEnhancedSchema,
  asianTouristTripSchema
];

export const asianHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/cruises/asian" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/cruises/asian" }
];

