// --- Динамические даты для SEO ---
export let caribbeanDatePublished = new Date().toISOString().split('T')[0];
export let caribbeanDateModified = new Date().toISOString().split('T')[0];

export function setCaribbeanDates({ published, modified }: { published: string, modified: string }) {
  caribbeanDatePublished = published;
  caribbeanDateModified = modified;
  caribbeanArticleSchema.datePublished = published;
  caribbeanArticleSchema.dateModified = modified;
  caribbeanArticleSchema.contentReferenceTime = published;
  caribbeanReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  caribbeanVideoSchema.uploadDate = published;
  caribbeanAISchema.datePublished = published;
  caribbeanAISchema.dateModified = modified;
  caribbeanAISchema.contentReferenceTime = published;
  caribbeanSocialSchema.datePublished = published;
}

export const caribbeanArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Карибские круизы 2026 | Велес Вояж - Тропические круизы по Карибам",
  "description": "Карибские круизы: Ямайка, Багамы, Куба, Доминикана, Пунта-Кана, Аруба, Кюрасао, Сент-Мартен, Гренада. Монтего-Бей, Нассау, Варадеро, Виллемстад. Тропические острова, белоснежные пляжи, коралловые рифы, дайвинг, сноркелинг, карибская кухня, бронирование от 95 000₽.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Карибские круизы - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": caribbeanDatePublished,
  "dateModified": caribbeanDateModified,
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
    "@id": "https://veles-voyage.ru/cruises/caribbean"
  },
  "articleSection": "Карибские круизы",
  "keywords": ["карибские круизы", "круизы по карибам", "карибские круизы 2026", "круизы по Карибскому морю", "круизы по карибским островам", "тропические круизы", "круизы Ямайка", "круизы Багамы", "круизы Куба", "круизы Доминикана", "круизы Пунта-Кана", "круизы Аруба", "круизы Кюрасао", "круизы Сент-Мартен", "круизы Гренада", "Монтего-Бей круиз", "Нассау круиз", "Варадеро круиз", "Виллемстад круиз", "Филипсибург круиз", "карибские острова", "тропический отдых", "белоснежные пляжи", "коралловые рифы", "дайвинг в Карибах", "сноркелинг в Карибах", "карибская кухня", "круизные лайнеры", "морские путешествия", "круизные туры", "карибские порты", "экскурсии на островах", "что посмотреть в Карибах", "лучшие маршруты круизов", "сколько стоит круиз по Карибам", "когда лучше ехать в круиз", "продолжительность круиза", "какие острова посещает круиз", "активности на островах", "водные виды спорта", "виндсерфинг", "водные лыжи", "пешие экскурсии", "национальные парки", "культурные туры", "релаксация на пляже", "круизы для семей", "романтические круизы", "круизы для пожилых", "круизы для молодых", "бронирование круизов", "цены на круизы", "скидки на круизы", "раннее бронирование", "последняя минута круизы", "морские круизы 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": caribbeanDatePublished
};

export const caribbeanSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/cruises/caribbean",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const caribbeanReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Карибские круизы от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "38"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Анна Волкова" },
      "datePublished": caribbeanDatePublished,
      "reviewBody": "Потрясающий круиз по Карибам! Острова просто райские, особенно понравились Багамы и Ямайка."
    }
  ]
};

export const caribbeanFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие острова посещает карибский круиз?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Карибские круизы охватывают Ямайку, Багамы, Кубу, Доминикану, Пунта-Кану, Арубу, Кюрасао, Сент-Мартен, Гренаду и другие острова. Популярные порты включают Монтего-Бей, Нассау, Варадеро, Виллемстад и Филипсибург."
      }
    },
    {
      "@type": "Question",
      "name": "Какова продолжительность карибского круиза?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Продолжительность карибских круизов варьируется от 5 до 14 дней, в зависимости от выбранного маршрута. Есть также более короткие варианты на 3-4 дня и длительные кругосветные путешествия до 18 дней."
      }
    },
    {
      "@type": "Question",
      "name": "Какие активности доступны на карибских островах?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "На карибских островах доступны сноркелинг, дайвинг, водные лыжи, виндсерфинг, пешие экскурсии, исследование коралловых рифов, посещение национальных парков, культурные туры и релаксация на пляже."
      }
    }
  ]
};

export const caribbeanOrganizationSchema = {
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

export const caribbeanVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Карибские круизы - Видеогид",
  "description": "Видеообзоры карибских круизов, островов и достопримечательностей на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Карибские круизы - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": caribbeanDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const caribbeanBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Круизы", "item": "https://veles-voyage.ru/cruises" },
    { "@type": "ListItem", "position": 3, "name": "Карибские круизы", "item": "https://veles-voyage.ru/cruises/caribbean" }
  ]
};

export const caribbeanWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Карибские круизы: Децентрализованный путеводитель Web3",
  "description": "Карибские круизы: Ямайка, Багамы, Куба, Доминикана, Пунта-Кана, Аруба, Кюрасао, Сент-Мартен, Гренада. Монтего-Бей, Нассау, Варадеро, Виллемстад, Филипсибург. Тропические острова, белоснежные пляжи, коралловые рифы, дайвинг, сноркелинг, карибская кухня.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/caribbean", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const caribbeanDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Карибские круизы: Анонимный путеводитель",
  "description": "Карибские круизы: Ямайка, Багамы, Куба, Доминикана, Пунта-Кана, Аруба, Кюрасао, Сент-Мартен, Гренада. Монтего-Бей, Нассау, Варадеро, Виллемстад, Филипсибург. Тропические острова, белоснежные пляжи, коралловые рифы, дайвинг, сноркелинг, карибская кухня.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по Карибам", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/cruises/caribbean" }
};

export const caribbeanAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Карибские круизы: Альтернативная поисковая база",
  "description": "Карибские круизы: Ямайка, Багамы, Куба, Доминикана, Пунта-Кана, Аруба, Кюрасао, Сент-Мартен, Гренада. Монтего-Бей, Нассау, Варадеро, Виллемстад, Филипсибург. Тропические острова, белоснежные пляжи, коралловые рифы, дайвинг, сноркелинг, карибская кухня.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/caribbean.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const caribbeanGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Карибские круизы", "@language": "ru" },
  "alternateName": [
    { "@value": "Caribbean Cruises", "@language": "en" },
    { "@value": "加勒比海邮轮", "@language": "zh" },
    { "@value": "Karibik-Kreuzfahrten", "@language": "de" }
  ],
  "description": { "@value": "Круизы по Ямайке, Багамам, Кубе, Доминикане, Пунта-Кане", "@language": "ru" },
  "touristType": ["CruiseTourism", "BeachTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const caribbeanMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Карибские круизы",
  "description": "Карибские круизы: Ямайка, Багамы, Куба, Доминикана, Пунта-Кана, Аруба, Кюрасао, Сент-Мартен, Гренада. Монтего-Бей, Нассау, Варадеро, Виллемстад, Филипсибург. Тропические острова, белоснежные пляжи, коралловые рифы, дайвинг, сноркелинг, карибская кухня.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник"]
};

export const caribbeanSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Карибские круизы 2026 | Велес Вояж",
  "text": "Карибские круизы: Ямайка, Багамы, Куба, Доминикана, Пунта-Кана. Тропические острова, белоснежные пляжи, дайвинг. Бронирование от 95 000₽. #КарибскиеКруизы #Круизы2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Карибские круизы - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": caribbeanDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/cruises/caribbean" }
};

export const caribbeanAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Карибские круизы 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const caribbeanAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Карибские круизы 2026 | Велес Вояж - Тропические круизы по Карибам",
  "description": "Карибские круизы: Ямайка, Багамы, Куба, Доминикана, Пунта-Кана. Тропические острова, белоснежные пляжи, дайвинг. Бронирование от 95 000₽.",
  "datePublished": caribbeanDatePublished,
  "dateModified": caribbeanDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/cruises/caribbean" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": caribbeanDatePublished
};

export const caribbeanAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Карибские круизы",
  "description": "Мобильный гид по карибским круизам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const caribbeanGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Карибские круизы", "@language": "ru" },
  "alternateName": [
    { "@value": "Caribbean Cruises", "@language": "en" },
    { "@value": "加勒比海邮轮", "@language": "zh" }
  ],
  "description": { "@value": "Круизы по Ямайке, Багамам, Кубе, Доминикане, Пунта-Кане", "@language": "ru" },
  "geo": { "@type": "GeoShape", "box": "10.0 -85.0 27.0 -60.0" },
  "location": { "@type": "Place", "geo": { "@type": "GeoCoordinates", "latitude": 18.5, "longitude": -72.5 } },
  "touristType": ["CruiseTourism", "BeachTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const caribbeanTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Карибские круизы 2026",
  "description": "Погрузитесь в тропическую атмосферу белоснежных пляжей и пальм Карибского моря с Велес Вояж",
  "touristType": ["CruiseTourism", "BeachTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "95000",
    "availability": "InStock",
    "validFrom": "2026-09-17"
  }
};

export const caribbeanSchemas = [
  caribbeanArticleSchema,
  caribbeanFAQSchema,
  caribbeanOrganizationSchema,
  caribbeanBreadcrumbsSchema,
  caribbeanSpeakableSchema,
  caribbeanReviewSchema,
  caribbeanVideoSchema,
  caribbeanWeb3Schema,
  caribbeanDarkWebSchema,
  caribbeanAltSearchSchema,
  caribbeanGlobalSearchSchema,
  caribbeanMobileSchema,
  caribbeanSocialSchema,
  caribbeanAccessibilitySchema,
  caribbeanAISchema,
  caribbeanAEOSchema,
  caribbeanGEOEnhancedSchema,
  caribbeanTouristTripSchema
];

export const caribbeanHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/cruises/caribbean" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/cruises/caribbean" }
];

