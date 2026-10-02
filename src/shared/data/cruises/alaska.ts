// --- Динамические даты для SEO ---
export let alaskaDatePublished = new Date().toISOString().split('T')[0];
export let alaskaDateModified = new Date().toISOString().split('T')[0];

export function setAlaskaDates({ published, modified }: { published: string, modified: string }) {
  alaskaDatePublished = published;
  alaskaDateModified = modified;
  alaskaArticleSchema.datePublished = published;
  alaskaArticleSchema.dateModified = modified;
  alaskaArticleSchema.contentReferenceTime = published;
  alaskaReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  alaskaVideoSchema.uploadDate = published;
  alaskaAISchema.datePublished = published;
  alaskaAISchema.dateModified = modified;
  alaskaAISchema.contentReferenceTime = published;
  alaskaSocialSchema.datePublished = published;
}

export const alaskaArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Круизы в Аляску 2026 | Велес Вояж - Путешествие к ледникам и дикой природе",
  "description": "Круизы в Аляску: ледники, дикая природа, киты, медведи, олени, орланы. Юно, Ситка, Кетчикан, Скагуэй. Национальные парки, фьорды, круизные лайнеры, порты, экскурсии, бронирование от 130 000₽.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Круизы в Аляску - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": alaskaDatePublished,
  "dateModified": alaskaDateModified,
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
    "@id": "https://veles-voyage.ru/cruises/alaska"
  },
  "articleSection": "Круизы в Аляску",
  "keywords": ["круизы Аляска", "круизы по Аляске", "круизы в Аляску 2026", "круизы ледники Аляска", "круизы дикая природа Аляска", "круизы Юно", "круизы Ситка", "круизы Кетчикан", "круизы Скагуэй", "круизы Ициас-Бей", "круизы Глендейн", "круизы Ванкувер", "круизы Сиэтл", "круизы Северная Америка", "ледники Аляски", "ледник Менделеев", "ледник Хаббард", "ледник Ламберт", "национальные парки Аляски", "фьорды Тонгасса", "горы Чугач", "дикие животные", "киты", "медведи", "олени", "орланы", "круизные лайнеры", "морские путешествия", "круизные туры", "порты Аляски", "экскурсии в портах", "что посмотреть в Аляске", "лучшие маршруты круизов", "сколько стоит круиз в Аляску", "когда лучше ехать в круиз", "продолжительность круиза", "какие порты посещает круиз", "природные достопримечательности", "наблюдение за дикой природой", "фотосафари", "североамериканские путешествия", "круизы для семей", "романтические круизы", "круизы для пожилых", "круизы для молодых", "бронирование круизов", "цены на круизы", "скидки на круизы", "раннее бронирование", "последняя минута круизы", "морские круизы 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": alaskaDatePublished
};

export const alaskaSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/cruises/alaska",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const alaskaReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Круизы в Аляску от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "48"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Владимир Морозов" },
      "datePublished": alaskaDatePublished,
      "reviewBody": "Невероятный круиз в Аляску! Видели китов, медведей, ледники. Природа потрясающая, особенно ледник Хаббард."
    }
  ]
};

export const alaskaFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие порты посещает круиз в Аляску?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Круизы в Аляску охватывают Юно, Ситка, Кетчикан, Скагуэй, Ициас-Бей, Глендейн и другие порты. Также возможны заходы в Ванкувер и Сиэтл как начальные или конечные пункты."
      }
    },
    {
      "@type": "Question",
      "name": "Какова продолжительность круиза в Аляску?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Продолжительность круизов в Аляску варьируется от 7 до 14 дней, в зависимости от выбранного маршрута. Есть также более короткие варианты на 5 дней и длительные североамериканские путешествия до 21 дня."
      }
    },
    {
      "@type": "Question",
      "name": "Какие природные достопримечательности можно увидеть в круизе по Аляске?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "В круизе по Аляске можно увидеть ледники Менделеева, Хаббард и Ламберт, национальные парки, диких животных (медведи, олени, киты, орланы), фьорды Тонгасса и горы Чугач."
      }
    }
  ]
};

export const alaskaOrganizationSchema = {
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

export const alaskaVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Круизы в Аляску - Видеогид",
  "description": "Видеообзоры круизов в Аляску, ледников и достопримечательностей на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Круизы в Аляску - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": alaskaDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const alaskaBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Круизы", "item": "https://veles-voyage.ru/cruises" },
    { "@type": "ListItem", "position": 3, "name": "Круизы в Аляску", "item": "https://veles-voyage.ru/cruises/alaska" }
  ]
};

export const alaskaWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Круизы в Аляску: Децентрализованный путеводитель Web3",
  "description": "Круизы в Аляску: ледники, дикая природа, киты, медведи, олени, орланы. Юно, Ситка, Кетчикан, Скагуэй, Ициас-Бей, Глендейн, Ванкувер, Сиэтл. Ледники Менделеева, Хаббард, Ламберт, национальные парки, фьорды Тонгасса, горы Чугач.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/alaska", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const alaskaDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Круизы в Аляску: Анонимный путеводитель",
  "description": "Круизы в Аляску: ледники, дикая природа, киты, медведи, олени, орланы. Юно, Ситка, Кетчикан, Скагуэй, Ициас-Бей, Глендейн, Ванкувер, Сиэтл. Ледники Менделеева, Хаббард, Ламберт, национальные парки, фьорды Тонгасса, горы Чугач.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид по Аляске", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/cruises/alaska" }
};

export const alaskaAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Круизы в Аляску: Альтернативная поисковая база",
  "description": "Круизы в Аляску: ледники, дикая природа, киты, медведи, олени, орланы. Юно, Ситка, Кетчикан, Скагуэй, Ициас-Бей, Глендейн, Ванкувер, Сиэтл. Ледники Менделеева, Хаббард, Ламберт, национальные парки, фьорды Тонгасса, горы Чугач.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/alaska.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const alaskaGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Круизы в Аляску", "@language": "ru" },
  "alternateName": [
    { "@value": "Alaska Cruises", "@language": "en" },
    { "@value": "阿拉斯加邮轮", "@language": "zh" },
    { "@value": "Alaska-Kreuzfahrten", "@language": "de" }
  ],
  "description": { "@value": "Круизы к ледникам, дикой природе, китам, медведям Аляски", "@language": "ru" },
  "touristType": ["CruiseTourism", "NatureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const alaskaMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Круизы в Аляску",
  "description": "Круизы в Аляску: ледники, дикая природа, киты, медведи, олени, орланы. Юно, Ситка, Кетчикан, Скагуэй, Ициас-Бей, Глендейн, Ванкувер, Сиэтл. Ледники Менделеева, Хаббард, Ламберт, национальные парки, фьорды Тонгасса, горы Чугач.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник"]
};

export const alaskaSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Круизы в Аляску 2026 | Велес Вояж",
  "text": "Круизы в Аляску: ледники, дикая природа, киты, медведи. Юно, Ситка, Кетчикан, Скагуэй. Национальные парки, фьорды. От 130 000₽. #АляскаКруизы #Круизы2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Круизы в Аляску - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": alaskaDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/cruises/alaska" }
};

export const alaskaAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Круизы в Аляску 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const alaskaAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Круизы в Аляску 2026 | Велес Вояж - Путешествие к ледникам и дикой природе",
  "description": "Круизы в Аляску: ледники, дикая природа, киты, медведи. Юно, Ситка, Кетчикан, Скагуэй. Национальные парки, фьорды. От 130 000₽.",
  "datePublished": alaskaDatePublished,
  "dateModified": alaskaDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/cruises/alaska" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": alaskaDatePublished
};

export const alaskaAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Круизы в Аляску",
  "description": "Мобильный гид по круизам в Аляску с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const alaskaGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Круизы в Аляску", "@language": "ru" },
  "alternateName": [
    { "@value": "Alaska Cruises", "@language": "en" },
    { "@value": "阿拉斯加邮轮", "@language": "zh" }
  ],
  "description": { "@value": "Круизы к ледникам, дикой природе, китам, медведям Аляски", "@language": "ru" },
  "geo": { "@type": "GeoShape", "box": "51.0 -180.0 71.0 -130.0" },
  "location": { "@type": "Place", "geo": { "@type": "GeoCoordinates", "latitude": 64.0, "longitude": -150.0 } },
  "touristType": ["CruiseTourism", "NatureTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const alaskaTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Круизы в Аляску 2026",
  "description": "Путешествие к ледникам и дикой природе последнего рубежа с Велес Вояж",
  "touristType": ["CruiseTourism", "NatureTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "130000",
    "availability": "InStock",
    "validFrom": "2026-09-17"
  }
};

export const alaskaSchemas = [
  alaskaArticleSchema,
  alaskaFAQSchema,
  alaskaOrganizationSchema,
  alaskaBreadcrumbsSchema,
  alaskaSpeakableSchema,
  alaskaReviewSchema,
  alaskaVideoSchema,
  alaskaWeb3Schema,
  alaskaDarkWebSchema,
  alaskaAltSearchSchema,
  alaskaGlobalSearchSchema,
  alaskaMobileSchema,
  alaskaSocialSchema,
  alaskaAccessibilitySchema,
  alaskaAISchema,
  alaskaAEOSchema,
  alaskaGEOEnhancedSchema,
  alaskaTouristTripSchema
];

export const alaskaHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/cruises/alaska" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/cruises/alaska" }
];

