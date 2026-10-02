// --- Динамические даты для SEO ---
export let toursEuropeDatePublished = new Date().toISOString().split('T')[0];
export let toursEuropeDateModified = new Date().toISOString().split('T')[0];

export function setToursEuropeDates({ published, modified }: { published: string, modified: string }) {
  toursEuropeDatePublished = published;
  toursEuropeDateModified = modified;
  toursEuropeArticleSchema.datePublished = published;
  toursEuropeArticleSchema.dateModified = modified;
  toursEuropeArticleSchema.contentReferenceTime = published;
  toursEuropeReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  toursEuropeVideoSchema.uploadDate = published;
  toursEuropeAISchema.datePublished = published;
  toursEuropeAISchema.dateModified = modified;
  toursEuropeAISchema.contentReferenceTime = published;
  toursEuropeSocialSchema.datePublished = published;
  
  // Update additional schemas
  toursEuropeMetaTags["article:published_time"] = published;
  toursEuropeMetaTags["article:modified_time"] = modified;
  toursEuropeMetaTags["og:updated_time"] = modified;
}

export const toursEuropeArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Туры в Европу: актуальные маршруты и цены 2026 | Велес Вояж",
  "description": "Туры в Европу 2026: Франция, Италия, Испания, Германия, Греция, Австрия, Швейцария. Средняя цена от €900 (от 85 000 ₽), сезон май–октябрь, шенгенская виза для граждан РФ, русскоговорящие гиды, поддержка 24/7.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Европейские туры - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursEuropeDatePublished,
  "dateModified": toursEuropeDateModified,
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
    "@id": "https://veles-voyage.ru/tours/europe"
  },
  "articleSection": "Европейские туры",
  "keywords": ["европейские туры", "туры по Европе", "европейские туры 2026", "путешествия по Европе", "Франция туры", "Италия туры", "Испания туры", "Германия туры", "Великобритания туры", "Париж", "Рим", "Барселона", "Лондон", "культурные экскурсии", "исторические достопримечательности", "профессиональные гиды", "туризм 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursEuropeDatePublished
};

export const toursEuropeSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours/europe",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const toursEuropeReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Европейские туры от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "134"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Мария Иванова" },
      "datePublished": toursEuropeDatePublished,
      "reviewBody": "Потрясающий тур по Европе! Отличная организация, комфортные отели, незабываемые экскурсии."
    }
  ]
};

export const toursEuropeFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Нужна ли виза в Европу для граждан РФ в 2026 году?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, для большинства стран Европы (Франция, Италия, Испания, Германия, Греция, Австрия, Швейцария) гражданам РФ нужна шенгенская виза. Срок действия загранпаспорта — минимум 3 месяца после выезда, нужно 2 чистые страницы. Велес Вояж помогает собрать пакет документов и подать заявление."
      }
    },
    {
      "@type": "Question",
      "name": "Когда лучше ехать в Европу?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Лучшее время — с мая по октябрь: тепло, открыты все музеи и национальные парки, комфортно для экскурсий. Пик сезона — июль и август (выше цены и больше туристов). Зимой стоит ехать на рождественские рынки (ноябрь–декабрь) и горнолыжные курорты Альп."
      }
    },
    {
      "@type": "Question",
      "name": "Что включено в тур по Европе от Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В стоимость входят перелёт или трансфер, проживание в отелях 4–5*, завтраки и 3–4 ужина в проверенных ресторанах, экскурсии с гидом-переводчиком, медицинская страховка и поддержка 24/7 во время поездки."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоит тур в Европу в 2026 году?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Средняя стоимость авторского тура начинается от €900 (примерно от 85 000 ₽) на человека при двухместном размещении. Итоговая цена зависит от страны, сезона и длительности маршрута (от 3 до 21 дня)."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли заказать тур с русскоговорящим гидом?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да. Мы собираем и групповые, и авторские маршруты. Гиды владеют русским и английским языками, перевод всех экскурсий включён в стоимость тура."
      }
    }
  ]
};

export const toursEuropeCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Туры в Европу 2026 | Велес Вояж",
  "description": "Актуальные маршруты и цены на туры по Европе: Франция, Италия, Испания, Германия, Греция, Австрия, Швейцария. Средняя стоимость от €900, сезон май–октябрь, шенгенская виза для граждан РФ.",
  "url": "https://veles-voyage.ru/tours/europe",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Велес Вояж",
    "url": "https://veles-voyage.ru"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Франция", "url": "https://veles-voyage.ru/wiki/countries/france" },
      { "@type": "ListItem", "position": 2, "name": "Италия", "url": "https://veles-voyage.ru/wiki/countries/italy" },
      { "@type": "ListItem", "position": 3, "name": "Испания", "url": "https://veles-voyage.ru/wiki/countries/spain" },
      { "@type": "ListItem", "position": 4, "name": "Германия", "url": "https://veles-voyage.ru/wiki/countries/germany" },
      { "@type": "ListItem", "position": 5, "name": "Греция", "url": "https://veles-voyage.ru/wiki/countries/greece" },
      { "@type": "ListItem", "position": 6, "name": "Австрия", "url": "https://veles-voyage.ru/wiki/countries/austria" },
      { "@type": "ListItem", "position": 7, "name": "Швейцария", "url": "https://veles-voyage.ru/wiki/countries/switzerland" }
    ]
  }
};

export const toursEuropeOrganizationSchema = {
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

export const toursEuropeVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Европейские туры - Видеогид",
  "description": "Видеообзоры европейских туров на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Европейские туры - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursEuropeDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursEuropeBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" },
    { "@type": "ListItem", "position": 3, "name": "Европейские туры", "item": "https://veles-voyage.ru/tours/europe" }
  ]
};

export const toursEuropeWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Европейские туры: Децентрализованный путеводитель Web3",
  "description": "Европейские туры: Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция. Культурные экскурсии, исторические достопримечательности.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/europe", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const toursEuropeDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Европейские туры: Анонимный путеводитель",
  "description": "Европейские туры: Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция. Культурные экскурсии, исторические достопримечательности.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по Европе", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/tours/europe" }
};

export const toursEuropeAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Европейские туры: Альтернативная поисковая база",
  "description": "Европейские туры: Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция. Культурные экскурсии, исторические достопримечательности.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/europe.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const toursEuropeGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Европейские туры", "@language": "ru" },
  "alternateName": [
    { "@value": "European Tours", "@language": "en" },
    { "@value": "欧洲旅游", "@language": "zh" },
    { "@value": "Europareisen", "@language": "de" }
  ],
  "description": { "@value": "Туры по Франции, Италии, Испании, Германии, Великобритании, Австрии, Швейцарии, Греции", "@language": "ru" },
  "touristType": ["CulturalTourism", "SightseeingTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursEuropeMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Европейские туры",
  "description": "Европейские туры: Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция. Культурные экскурсии, исторические достопримечательности.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const toursEuropeSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Европейские туры 2026 | Велес Вояж",
  "text": "Европейские туры: Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция. Культурные экскурсии, исторические достопримечательности, комфортное проживание. #ЕвропейскиеТуры2026 #Путешествия",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Европейские туры - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": toursEuropeDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/tours/europe" }
};

export const toursEuropeAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Европейские туры 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const toursEuropeAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Туры в Европу: актуальные маршруты и цены 2026 | Велес Вояж",
  "description": "Туры в Европу 2026: Франция, Италия, Испания, Германия, Греция, Австрия, Швейцария. Средняя цена от €900 (от 85 000 ₽), сезон май–октябрь, шенгенская виза для граждан РФ, русскоговорящие гиды, поддержка 24/7.",
  "datePublished": toursEuropeDatePublished,
  "dateModified": toursEuropeDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours/europe" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursEuropeDatePublished
};

export const toursEuropeAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Европейские туры",
  "description": "Мобильный гид по европейским турам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const toursEuropeGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Европейские туры", "@language": "ru" },
  "alternateName": [
    { "@value": "European Tours", "@language": "en" },
    { "@value": "欧洲旅游", "@language": "zh" }
  ],
  "description": { "@value": "Туры по Франции, Италии, Испании, Германии, Великобритании, Австрии, Швейцарии, Греции", "@language": "ru" },
  "touristType": ["CulturalTourism", "SightseeingTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursEuropeTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Европейские туры 2026",
  "description": "Исследуйте богатую историю и культуру Европы с Велес Вояж. Эксклюзивные туры по лучшим европейским направлениям с комфортным проживанием и профессиональными гидами.",
  "touristType": ["CulturalTourism", "SightseeingTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "50000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursEuropeSchemas = [
  toursEuropeArticleSchema,
  toursEuropeCollectionSchema,
  toursEuropeFAQSchema,
  toursEuropeOrganizationSchema,
  toursEuropeSpeakableSchema,
  toursEuropeReviewSchema,
  toursEuropeVideoSchema,
  toursEuropeWeb3Schema,
  toursEuropeDarkWebSchema,
  toursEuropeAltSearchSchema,
  toursEuropeGlobalSearchSchema,
  toursEuropeMobileSchema,
  toursEuropeSocialSchema,
  toursEuropeAccessibilitySchema,
  toursEuropeAISchema,
  toursEuropeAEOSchema,
  toursEuropeGEOEnhancedSchema,
  toursEuropeTouristTripSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const toursEuropeMetaTags = {
  title: "Туры в Европу: актуальные маршруты и цены 2026 | Велес Вояж",
  description: "Туры в Европу 2026: Франция, Италия, Испания, Германия, Греция, Австрия, Швейцария. Средняя цена от €900 (от 85 000 ₽), сезон май–октябрь, шенгенская виза для граждан РФ, русскоговорящие гиды, поддержка 24/7.",
  keywords: "европейские туры, туры по Европе, Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция, Париж, Рим, Барселона, Лондон, культурные экскурсии, исторические достопримечательности, профессиональные гиды, туризм 2026",
  "og:title": "Европейские туры 2026 | Велес Вояж",
  "og:description": "Европейские туры: Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция. Париж, Рим, Барселона, Лондон, Берлин, Вена, Цюрих, Афины.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Европейские туры",
  "og:url": "https://veles-voyage.ru/tours/europe",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Европейские туры 2026 | Велес Вояж",
  "twitter:description": "Европейские туры: Франция, Италия, Испания, Германия, Великобритания, Австрия, Швейцария, Греция. Париж, Рим, Барселона, Лондон, Берлин, Вена, Цюрих, Афины.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Европейские туры - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Европа Туры",
  "theme-color": "#ffffff",
  "geo.region": "EU",
  "geo.placename": "Европа",
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
  "article:published_time": toursEuropeDatePublished,
  "article:modified_time": toursEuropeDateModified,
  "og:updated_time": toursEuropeDateModified
};

export const toursEuropeHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours/europe" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours/europe" }
];

