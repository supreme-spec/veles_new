// --- Динамические даты для SEO ---
export let mediterraneanDatePublished = new Date().toISOString().split('T')[0];
export let mediterraneanDateModified = new Date().toISOString().split('T')[0];

// Функция для динамического обновления дат
export function setMediterraneanDates({ published, modified }: { published: string, modified: string }) {
  mediterraneanDatePublished = published;
  mediterraneanDateModified = modified;
  
  mediterraneanArticleSchema.datePublished = published;
  mediterraneanArticleSchema.dateModified = modified;
  mediterraneanArticleSchema.contentReferenceTime = published;
  
  mediterraneanReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  
  mediterraneanVideoSchema.uploadDate = published;
  mediterraneanAISchema.datePublished = published;
  mediterraneanAISchema.dateModified = modified;
  mediterraneanAISchema.contentReferenceTime = published;
  mediterraneanSocialSchema.datePublished = published;
}

// Article Schema
export const mediterraneanArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Средиземноморские круизы 2026 | Велес Вояж - Круизы по Средиземному морю",
  "description": "Средиземноморские круизы: Греция, Италия, Испания, Франция, Хорватия, Турция. Лучшие маршруты, порты, достопримечательности. Бронирование онлайн от 85 000₽.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Средиземноморские круизы - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": mediterraneanDatePublished,
  "dateModified": mediterraneanDateModified,
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
    "@id": "https://veles-voyage.ru/cruises/mediterranean"
  },
  "articleSection": "Круизы по Средиземному морю",
  "keywords": ["средиземноморские круизы", "круизы по средиземному морю", "средиземноморские круизы 2026", "круизы по Средиземному морю", "круизы Греция", "круизы Италия", "круизы Испания", "круизы Франция", "круизы Хорватия", "круизы Турция", "греческие острова круиз", "итальянские порты круиз", "испанские побережья круиз", "французская ривьера круиз", "турецкие берега круиз", "хорватское побережье круиз", "Афины круиз", "Рим круиз", "Венеция круиз", "Барселона круиз", "Ницца круиз", "Стамбул круиз", "Дубровник круиз", "Санторини круиз", "Миконос круиз", "Крит круиз", "Пирей порт", "Чивитавеккья порт", "Венеция порт", "Барселона порт", "Ницца порт", "Стамбул порт", "Дубровник порт", "древние цивилизации", "исторические достопримечательности", "средиземноморская кухня", "круизные лайнеры", "морские путешествия", "круизные туры", "средиземноморские порты", "экскурсии в портах", "что посмотреть в Средиземноморье", "лучшие маршруты круизов", "сколько стоит круиз по Средиземному морю", "когда лучше ехать в круиз", "продолжительность круиза", "какие страны посещает круиз", "палубные зоны", "развлечения на лайнере", "рестораны на круизном лайнере", "спа-зоны на круизе", "детские клубы на круизе", "круизы для семей", "романтические круизы", "круизы для пожилых", "круизы для молодых", "бронирование круизов", "цены на круизы", "скидки на круизы", "раннее бронирование", "последняя минута круизы", "морские круизы 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": mediterraneanDatePublished
};

// Speakable schema
export const mediterraneanSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/cruises/mediterranean",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": [
      "/html/body//h1",
      "/html/body//h2[1]",
      "/html/body//p[1]"
    ]
  }
};

// Review Schema
export const mediterraneanReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Средиземноморские круизы от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "45"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Елена Смирнова" },
      "datePublished": mediterraneanDatePublished,
      "reviewBody": "Отличный круиз по Средиземному морю! Посетили Грецию, Италию и Испанию. Все было организовано на высшем уровне."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Дмитрий Козлов" },
      "datePublished": mediterraneanDatePublished,
      "reviewBody": "Незабываемое путешествие! Особенно понравились экскурсии в Венецию и Барселону. Рекомендую!"
    }
  ]
};

// FAQ Schema
export const mediterraneanFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие страны посещает средиземноморский круиз?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Средиземноморские круизы охватывают Грецию, Италию, Испанию, Францию, Хорватию, Турцию и другие страны региона. Популярные порты включают Афины, Рим, Венецию, Барселону, Ниццу и Стамбул."
      }
    },
    {
      "@type": "Question",
      "name": "Какова продолжительность средиземноморского круиза?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Продолжительность средиземноморских круизов варьируется от 7 до 14 дней, в зависимости от выбранного маршрута. Есть также более короткие варианты на 3-5 дней и длительные кругосветные путешествия до 21 дня."
      }
    },
    {
      "@type": "Question",
      "name": "Какие палубные зоны доступны на круизных лайнерах?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Современные круизные лайнеры предлагают бассейны, спа-зоны, рестораны мировых кухонь, театры, казино, фитнес-центры, детские клубы и зоны отдыха на палубах с панорамными видами на море."
      }
    }
  ]
};

// Organization Schema
export const mediterraneanOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Велес Вояж | Экспертная редакция",
  "url": "https://veles-voyage.ru/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png"
  },
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
  "sameAs": [
    "https://vk.com/veles__voyage",
    "https://t.me/veles_voyage",
    "https://rutube.ru/u/velesvoyage/"
  ],
  "priceRange": "₽₽",
  "areaServed": { "@type": "Country", "name": "Russia" }
};

// VideoObject Schema
export const mediterraneanVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Средиземноморские круизы - Видеогид",
  "description": "Видеообзоры средиземноморских круизов, портов и достопримечательностей на Rutube-канале Велес Вояж",
  "thumbnailUrl": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Средиземноморские круизы - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "uploadDate": mediterraneanDatePublished,
  "publisher": {
    "@type": "Organization",
    "name": "Велес Вояж | Экспертная редакция",
    "logo": {
      "@type": "ImageObject",
      "url": "https://veles-voyage.ru/images/logo.png",
      "caption": "Логотип Велес Вояж"
    }
  },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

// BreadcrumbList Schema
export const mediterraneanBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://veles-voyage.ru/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Круизы",
      "item": "https://veles-voyage.ru/cruises"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Средиземноморские круизы",
      "item": "https://veles-voyage.ru/cruises/mediterranean"
    }
  ]
};

// Web3 Schema
export const mediterraneanWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Средиземноморские круизы: Децентрализованный путеводитель Web3",
  "description": "Средиземноморские круизы: Греция, Италия, Испания, Франция, Хорватия, Турция. Афины, Рим, Венеция, Барселона, Ницца, Стамбул, Дубровник. Древние цивилизации, солнечные побережья, исторические достопримечательности, средиземноморская кухня.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": {
    "@type": "Organization",
    "name": "Велес Вояж DAO"
  },
  "distribution": {
    "@type": "DataDownload",
    "contentUrl": "https://veles-voyage.ru/cruises/mediterranean",
    "encodingFormat": "application/json-ld"
  },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

// Dark Web Schema
export const mediterraneanDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Средиземноморские круизы: Анонимный путеводитель",
  "description": "Средиземноморские круизы: Греция, Италия, Испания, Франция, Хорватия, Турция. Афины, Рим, Венеция, Барселона, Ницца, Стамбул, Дубровник. Древние цивилизации, солнечные побережья, исторические достопримечательности, средиземноморская кухня.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": {
    "@type": "TravelGuide",
    "name": "Приватный гид по Средиземноморью",
    "about": "Анонимные маршруты, офлайн карты, приватные места"
  },
  "potentialAction": {
    "@type": "ReadAction",
    "target": "https://veles-voyage.ru/cruises/mediterranean"
  }
};

// Alt Search Schema
export const mediterraneanAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Средиземноморские круизы: Альтернативная поисковая база",
  "description": "Средиземноморские круизы: Греция, Италия, Испания, Франция, Хорватия, Турция. Афины, Рим, Венеция, Барселона, Ницца, Стамбул, Дубровник. Древние цивилизации, солнечные побережья, исторические достопримечательности, средиземноморская кухня.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": {
    "@type": "Organization",
    "name": "Велес Вояж Независимые Медиа"
  },
  "distribution": [
    {
      "@type": "DataDownload",
      "contentUrl": "https://veles-voyage.ru/cruises/mediterranean.json",
      "encodingFormat": "application/json"
    }
  ],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

// Global Search Schema
export const mediterraneanGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": {
    "@value": "Средиземноморские круизы",
    "@language": "ru"
  },
  "alternateName": [
    { "@value": "Mediterranean Cruises", "@language": "en" },
    { "@value": "地中海邮轮", "@language": "zh" },
    { "@value": "Mittelmeer-Kreuzfahrten", "@language": "de" }
  ],
  "description": {
    "@value": "Круизы по Греции, Италии, Испании, Франции, Хорватии, Турции",
    "@language": "ru"
  },
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

// Mobile Schema
export const mediterraneanMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Средиземноморские круизы",
  "description": "Средиземноморские круизы: Греция, Италия, Испания, Франция, Хорватия, Турция. Афины, Рим, Венеция, Барселона, Ницца, Стамбул, Дубровник. Древние цивилизации, солнечные побережья, исторические достопримечательности, средиземноморская кухня.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "RUB"
  },
  "featureList": [
    "Офлайн карты",
    "GPS навигация",
    "Маршруты круизов",
    "Порты и достопримечательности",
    "AI персонализация",
    "Голосовой помощник"
  ]
};

// Social Schema
export const mediterraneanSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Средиземноморские круизы 2026 | Велес Вояж",
  "text": "Средиземноморские круизы: Греция, Италия, Испания, Франция, Хорватия, Турция. Лучшие маршруты, порты, достопримечательности. Бронирование онлайн от 85 000₽. #СредиземноморскиеКруизы #Круизы2026",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Средиземноморские круизы - Велес Вояж"
  },
  "author": {
    "@type": "Organization",
    "name": "Велес Вояж",
    "sameAs": [
      "https://vk.com/veles__voyage",
      "https://t.me/veles_voyage",
      "https://rutube.ru/u/velesvoyage/"
    ]
  },
  "datePublished": mediterraneanDatePublished,
  "sharedContent": {
    "@type": "WebPage",
    "url": "https://veles-voyage.ru/cruises/mediterranean"
  }
};

// Accessibility Schema
export const mediterraneanAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Средиземноморские круизы 2026 | Велес Вояж",
  "accessibilityFeature": [
    "alternativeText",
    "captions",
    "highContrastDisplay",
    "largePrint",
    "readingOrder",
    "structuralNavigation"
  ],
  "accessibilityControl": [
    "fullKeyboardControl",
    "fullMouseControl",
    "fullTouchControl"
  ],
  "accessibilityAPI": ["ARIA"]
};

// AI Schema
export const mediterraneanAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Средиземноморские круизы 2026 | Велес Вояж - Круизы по Средиземному морю",
  "description": "Средиземноморские круизы: Греция, Италия, Испания, Франция, Хорватия, Турция. Лучшие маршруты, порты, достопримечательности. Бронирование онлайн от 85 000₽.",
  "datePublished": mediterraneanDatePublished,
  "dateModified": mediterraneanDateModified,
  "author": [
    { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Велес Вояж | Экспертная редакция",
    "logo": {
      "@type": "ImageObject",
      "url": "https://veles-voyage.ru/images/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://veles-voyage.ru/cruises/mediterranean"
  },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": mediterraneanDatePublished
};

// AEO Schema
export const mediterraneanAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Средиземноморские круизы",
  "description": "Мобильный гид по средиземноморским круизам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "RUB"
  },
  "featureList": [
    "Офлайн карты",
    "GPS навигация",
    "Маршруты круизов",
    "Порты и достопримечательности",
    "AI персонализация",
    "Голосовой помощник",
    "Офлайн режим"
  ],
  "softwareVersion": "2026.1.0",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1242"
  },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

// GEO Enhanced Schema
export const mediterraneanGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": {
    "@value": "Средиземноморские круизы",
    "@language": "ru"
  },
  "alternateName": [
    { "@value": "Mediterranean Cruises", "@language": "en" },
    { "@value": "地中海邮轮", "@language": "zh" }
  ],
  "description": {
    "@value": "Круизы по Греции, Италии, Испании, Франции, Хорватии, Турции",
    "@language": "ru"
  },
  "geo": {
    "@type": "GeoShape",
    "box": "30.0 0.0 45.0 40.0"
  },
  "location": {
    "@type": "Place",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.5,
      "longitude": 20.0
    }
  },
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

// TouristTrip Schema (специфичный для круизов)
export const mediterraneanTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Средиземноморские круизы 2026",
  "description": "Исследуйте древние цивилизации и солнечные побережья Средиземного моря с Велес Вояж",
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "85000",
    "availability": "InStock",
    "validFrom": "2026-09-17"
  }
};

// Все схемы в одном массиве
export const mediterraneanSchemas = [
  mediterraneanArticleSchema,
  mediterraneanFAQSchema,
  mediterraneanOrganizationSchema,
  mediterraneanBreadcrumbsSchema,
  mediterraneanSpeakableSchema,
  mediterraneanReviewSchema,
  mediterraneanVideoSchema,
  mediterraneanWeb3Schema,
  mediterraneanDarkWebSchema,
  mediterraneanAltSearchSchema,
  mediterraneanGlobalSearchSchema,
  mediterraneanMobileSchema,
  mediterraneanSocialSchema,
  mediterraneanAccessibilitySchema,
  mediterraneanAISchema,
  mediterraneanAEOSchema,
  mediterraneanGEOEnhancedSchema,
  mediterraneanTouristTripSchema
];

// Hreflang
export const mediterraneanHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/cruises/mediterranean" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/cruises/mediterranean" }
];

