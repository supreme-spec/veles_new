// --- Динамические даты для SEO ---
export let toursExtremeDatePublished = new Date().toISOString().split('T')[0];
export let toursExtremeDateModified = new Date().toISOString().split('T')[0];

export function setToursExtremeDates({ published, modified }: { published: string, modified: string }) {
  toursExtremeDatePublished = published;
  toursExtremeDateModified = modified;
  toursExtremeArticleSchema.datePublished = published;
  toursExtremeArticleSchema.dateModified = modified;
  toursExtremeArticleSchema.contentReferenceTime = published;
  toursExtremeReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  toursExtremeVideoSchema.uploadDate = published;
  toursExtremeAISchema.datePublished = published;
  toursExtremeAISchema.dateModified = modified;
  toursExtremeAISchema.contentReferenceTime = published;
  toursExtremeSocialSchema.datePublished = published;
  
  // Update additional schemas
  toursExtremeMetaTags["article:published_time"] = published;
  toursExtremeMetaTags["article:modified_time"] = modified;
  toursExtremeMetaTags["og:updated_time"] = modified;
}

export const toursExtremeArticleSchema: any = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Экстремальные туры 2026 | Велес Вояж - Приключения для смелых",
  "description": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Эверест, Килиманджаро, Эльбрус, Анды, Альпы, Гималаи. Приключения, экстрим, адреналин, профессиональные инструкторы, бронирование онлайн.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Экстремальные туры - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursExtremeDatePublished,
  "dateModified": toursExtremeDateModified,
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
    "@id": "https://veles-voyage.ru/tours/extreme"
  },
  "articleSection": "Экстремальные туры",
  "keywords": ["экстремальные туры", "приключения", "экстрим туры", "экстремальные туры 2026", "альпинизм", "рафтинг", "дайвинг", "парашютный спорт", "бейсджампинг", "кайтсерфинг", "сноуборд", "горные лыжи", "Эверест", "Килиманджаро", "Эльбрус", "профессиональные инструкторы", "туризм 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursExtremeDatePublished
};

export const toursExtremeSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours/extreme",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const toursExtremeReviewSchema: any = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Экстремальные туры от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Дмитрий Волков" },
      "datePublished": toursExtremeDatePublished,
      "reviewBody": "Незабываемое восхождение на Эльбрус! Профессиональные инструкторы, отличная организация, максимум адреналина."
    }
  ]
};

export const toursExtremeFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие виды экстремальных туров доступны?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предлагаем альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи и другие экстремальные виды активного отдыха. Маршруты разрабатываются индивидуально под ваш уровень подготовки."
      }
    },
    {
      "@type": "Question",
      "name": "Как выбрать подходящий экстремальный тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наши специалисты помогут подобрать тур, учитывая ваш уровень подготовки, опыт, бюджет и предпочтения. Мы предлагаем программы различной сложности от начального до продвинутого уровня."
      }
    },
    {
      "@type": "Question",
      "name": "Какие услуги включены в экстремальный тур?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В стоимость тура обычно включены: проживание, питание, аренда снаряжения, услуги профессиональных инструкторов, страховка. Детали уточняются при бронировании."
      }
    },
    {
      "@type": "Question",
      "name": "Нужна ли страховка для экстремального тура?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Обязательна расширенная страховка с покрытием активного отдыха и экстремальных видов спорта. Она включена в организацию наших туров и покрывает медицинские расходы, эвакуацию и другие риски."
      }
    }
  ]
};

export const toursExtremeOrganizationSchema = {
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

export const toursExtremeVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Экстремальные туры - Видеогид",
  "description": "Видеообзоры экстремальных туров на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Экстремальные туры - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursExtremeDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursExtremeBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" },
    { "@type": "ListItem", "position": 3, "name": "Экстремальные туры", "item": "https://veles-voyage.ru/tours/extreme" }
  ]
};

export const toursExtremeWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Экстремальные туры: Децентрализованный путеводитель Web3",
  "description": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Приключения, экстрим, адреналин.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/extreme", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const toursExtremeDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Экстремальные туры: Анонимный путеводитель",
  "description": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Приключения, экстрим, адреналин.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по экстриму", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/tours/extreme" }
};

export const toursExtremeAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Экстремальные туры: Альтернативная поисковая база",
  "description": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Приключения, экстрим, адреналин.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/tours/extreme.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const toursExtremeGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Экстремальные туры", "@language": "ru" },
  "alternateName": [
    { "@value": "Extreme Tours", "@language": "en" },
    { "@value": "极限旅游", "@language": "zh" },
    { "@value": "Extremreisen", "@language": "de" }
  ],
  "description": { "@value": "Альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи", "@language": "ru" },
  "touristType": ["AdventureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursExtremeMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Экстремальные туры",
  "description": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Приключения, экстрим, адреналин.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const toursExtremeSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Экстремальные туры 2026 | Велес Вояж",
  "text": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Приключения, экстрим, адреналин, комфортное проживание. #ЭкстремальныеТуры2026 #Экстрим",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Экстремальные туры - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": toursExtremeDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/tours/extreme" }
};

export const toursExtremeAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Экстремальные туры 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const toursExtremeAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Экстремальные туры 2026 | Велес Вояж - Приключения для смелых",
  "description": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Эверест, Килиманджаро, Эльбрус, Анды, Альпы, Гималаи. Приключения, экстрим, адреналин, профессиональные инструкторы, бронирование онлайн.",
  "datePublished": toursExtremeDatePublished,
  "dateModified": toursExtremeDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours/extreme" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursExtremeDatePublished
};

export const toursExtremeAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Экстремальные туры",
  "description": "Мобильный гид по экстремальным турам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты туров", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const toursExtremeGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Экстремальные туры", "@language": "ru" },
  "alternateName": [
    { "@value": "Extreme Tours", "@language": "en" },
    { "@value": "极限旅游", "@language": "zh" }
  ],
  "description": { "@value": "Альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи", "@language": "ru" },
  "touristType": ["AdventureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const toursExtremeTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Экстремальные туры 2026",
  "description": "Для любителей острых ощущений и приключений - экстремальные туры с Велес Вояж. Покоряйте горные вершины, прыгайте с парашютом, исследуйте дикие уголки планеты.",
  "touristType": ["AdventureTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "70000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursExtremeSchemas = [
  toursExtremeArticleSchema,
  toursExtremeFAQSchema,
  toursExtremeOrganizationSchema,
  toursExtremeBreadcrumbsSchema,
  toursExtremeSpeakableSchema,
  toursExtremeReviewSchema,
  toursExtremeVideoSchema,
  toursExtremeWeb3Schema,
  toursExtremeDarkWebSchema,
  toursExtremeAltSearchSchema,
  toursExtremeGlobalSearchSchema,
  toursExtremeMobileSchema,
  toursExtremeSocialSchema,
  toursExtremeAccessibilitySchema,
  toursExtremeAISchema,
  toursExtremeAEOSchema,
  toursExtremeGEOEnhancedSchema,
  toursExtremeTouristTripSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const toursExtremeMetaTags = {
  title: "Экстремальные туры 2026 | Велес Вояж - Приключения для смелых",
  description: "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Эверест, Килиманджаро, Эльбрус, Анды, Альпы, Гималаи. Приключения, экстрим, адреналин, профессиональные инструкторы, бронирование онлайн.",
  keywords: "экстремальные туры, приключения, альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи, Эверест, Килиманджаро, Эльбрус, Анды, Альпы, Гималаи, экстрим, адреналин, профессиональные инструкторы, туризм 2026",
  "og:title": "Экстремальные туры 2026 | Велес Вояж",
  "og:description": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Эверест, Килиманджаро, Эльбрус, Анды, Альпы, Гималаи.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Экстремальные туры",
  "og:url": "https://veles-voyage.ru/tours/extreme",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Экстремальные туры 2026 | Велес Вояж",
  "twitter:description": "Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Эверест, Килиманджаро, Эльбрус, Анды, Альпы, Гималаи.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Экстремальные туры - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "Экстрим Туры",
  "theme-color": "#ffffff",
  "geo.region": "World",
  "geo.placename": "Экстремальные туры",
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
  "article:published_time": toursExtremeDatePublished,
  "article:modified_time": toursExtremeDateModified,
  "og:updated_time": toursExtremeDateModified
};

export const toursExtremeHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours/extreme" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours/extreme" }
];
