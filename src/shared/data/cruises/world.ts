// --- Динамические даты для SEO ---
export let worldDatePublished = new Date().toISOString().split('T')[0];
export let worldDateModified = new Date().toISOString().split('T')[0];

export function setWorldDates({ published, modified }: { published: string, modified: string }) {
  worldDatePublished = published;
  worldDateModified = modified;
  worldArticleSchema.datePublished = published;
  worldArticleSchema.dateModified = modified;
  worldArticleSchema.contentReferenceTime = published;
  worldReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  worldVideoSchema.uploadDate = published;
  worldAISchema.datePublished = published;
  worldAISchema.dateModified = modified;
  worldAISchema.contentReferenceTime = published;
  worldSocialSchema.datePublished = published;
}

export const worldArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Кругосветные круизы 2026 | Велес Вояж - Уникальное приключение по экзотическим уголкам планеты",
  "description": "Кругосветные круизы: Европа, Азия, Африка, Северная и Южная Америка, Австралия, Океания. Барселона, Дубай, Сингапур, Сидней, Сан-Франциско, Рио-де-Жанейро, Кейптаун. Уникальное приключение по всему миру, все континенты, экзотические уголки планеты, бронирование от 250 000₽.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Кругосветные круизы - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": worldDatePublished,
  "dateModified": worldDateModified,
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
    "@id": "https://veles-voyage.ru/cruises/world"
  },
  "articleSection": "Кругосветные круизы",
  "keywords": ["кругосветные круизы", "круизы по всему миру", "кругосветные круизы 2026", "вокруг света круиз", "экзотические круизы", "длинные круизы", "мировые круизы", "океанские круизы", "круизы вокруг света", "круизы Европа", "круизы Азия", "круизы Африка", "круизы Америка", "круизы Австралия", "круизы Океания", "Барселона круиз", "Дубай круиз", "Сингапур круиз", "Сидней круиз", "Сан-Франциско круиз", "Рио-де-Жанейро круиз", "Кейптаун круиз", "все континенты", "экзотические уголки планеты", "круизные лайнеры", "морские путешествия", "круизные туры", "мировые порты", "экскурсии в портах", "что посмотреть в кругосветном круизе", "лучшие маршруты круизов", "сколько стоит кругосветный круиз", "когда лучше ехать в круиз", "продолжительность круиза", "какие континенты посещает круиз", "удобства на борту", "палубные зоны", "рестораны мировых кухонь", "спа-зоны", "театры", "казино", "фитнес-центры", "детские клубы", "библиотеки", "интернет-кафе", "зоны отдыха", "панорамные виды", "круизы для семей", "романтические круизы", "круизы для пожилых", "круизы для молодых", "бронирование круизов", "цены на круизы", "скидки на круизы", "раннее бронирование", "последняя минута круизы", "морские круизы 2026"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": worldDatePublished
};

export const worldSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/cruises/world",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const worldReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Кругосветные круизы от Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "28"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Сергей Лебедев" },
      "datePublished": worldDatePublished,
      "reviewBody": "Мечта всей жизни сбылась! Кругосветный круиз - это невероятное приключение. Посетили все континенты, увидели столько всего!"
    }
  ]
};

export const worldFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие континенты посещает кругосветный круиз?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Кругосветные круизы охватывают Европу, Азию, Африку, Северную и Южную Америку, Австралию и Океанию. Популярные порты включают Барселону, Дубай, Сингапур, Сидней, Сан-Франциско, Рио-де-Жанейро и Кейптаун."
      }
    },
    {
      "@type": "Question",
      "name": "Какова продолжительность кругосветного круиза?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Продолжительность кругосветных круизов варьируется от 21 до 120 дней, в зависимости от выбранного маршрута. Есть также более короткие варианты на 14-21 день и длительные путешествия до 6 месяцев."
      }
    },
    {
      "@type": "Question",
      "name": "Какие удобства доступны на борту во время кругосветного круиза?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "На борту кругосветных круизов доступны все палубные зоны, рестораны мировых кухонь, спа-зоны, театры, казино, фитнес-центры, детские клубы, библиотеки, интернет-кафе и зоны отдыха с панорамными видами на море."
      }
    }
  ]
};

export const worldOrganizationSchema = {
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

export const worldVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Кругосветные круизы - Видеогид",
  "description": "Видеообзоры кругосветных круизов и достопримечательностей на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Кругосветные круизы - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": worldDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const worldBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Круизы", "item": "https://veles-voyage.ru/cruises" },
    { "@type": "ListItem", "position": 3, "name": "Кругосветные круизы", "item": "https://veles-voyage.ru/cruises/world" }
  ]
};

export const worldWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "Кругосветные круизы: Децентрализованный путеводитель Web3",
  "description": "Кругосветные круизы: Европа, Азия, Африка, Северная и Южная Америка, Австралия, Океания. Барселона, Дубай, Сингапур, Сидней, Сан-Франциско, Рио-де-Жанейро, Кейптаун. Уникальное приключение по всему миру, все континенты, экзотические уголки планеты.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/world", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const worldDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Кругосветные круизы: Анонимный путеводитель",
  "description": "Кругосветные круизы: Европа, Азия, Африка, Северная и Южная Америка, Австралия, Океания. Барселона, Дубай, Сингапур, Сидней, Сан-Франциско, Рио-де-Жанейро, Кейптаун. Уникальное приключение по всему миру, все континенты, экзотические уголки планеты.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид вокруг света", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/cruises/world" }
};

export const worldAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Кругосветные круизы: Альтернативная поисковая база",
  "description": "Кругосветные круизы: Европа, Азия, Африка, Северная и Южная Америка, Австралия, Океания. Барселона, Дубай, Сингапур, Сидней, Сан-Франциско, Рио-де-Жанейро, Кейптаун. Уникальное приключение по всему миру, все континенты, экзотические уголки планеты.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/cruises/world.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const worldGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Кругосветные круизы", "@language": "ru" },
  "alternateName": [
    { "@value": "World Cruises", "@language": "en" },
    { "@value": "环球邮轮", "@language": "zh" },
    { "@value": "Weltreise-Kreuzfahrten", "@language": "de" }
  ],
  "description": { "@value": "Круизы по всем континентам: Европа, Азия, Африка, Америка, Австралия", "@language": "ru" },
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const worldMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Кругосветные круизы",
  "description": "Кругосветные круизы: Европа, Азия, Африка, Северная и Южная Америка, Австралия, Океания. Барселона, Дубай, Сингапур, Сидней, Сан-Франциско, Рио-де-Жанейро, Кейптаун. Уникальное приключение по всему миру, все континенты, экзотические уголки планеты.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник"]
};

export const worldSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "Кругосветные круизы | Велес Вояж",
  "text": "Кругосветные круизы: Европа, Азия, Африка, Америка, Австралия. Уникальное приключение по всему миру. Барселона, Дубай, Сингапур, Сидней. От 250 000₽. #КругосветныеКруизы #Круизы2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Кругосветные круизы - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": worldDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/cruises/world" }
};

export const worldAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Кругосветные круизы | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const worldAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Кругосветные круизы | Велес Вояж - Уникальное приключение по экзотическим уголкам планеты",
  "description": "Кругосветные круизы: Европа, Азия, Африка, Америка, Австралия. Уникальное приключение по всему миру. Барселона, Дубай, Сингапур, Сидней. От 250 000₽.",
  "datePublished": worldDatePublished,
  "dateModified": worldDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/cruises/world" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": worldDatePublished
};

export const worldAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: Кругосветные круизы",
  "description": "Мобильный гид по кругосветным круизам с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Маршруты круизов", "Порты и достопримечательности", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const worldGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": { "@value": "Кругосветные круизы", "@language": "ru" },
  "alternateName": [
    { "@value": "World Cruises", "@language": "en" },
    { "@value": "环球邮轮", "@language": "zh" }
  ],
  "description": { "@value": "Круизы по всем континентам: Европа, Азия, Африка, Америка, Австралия", "@language": "ru" },
  "geo": { "@type": "GeoShape", "box": "-90.0 -180.0 90.0 180.0" },
  "location": { "@type": "Place", "geo": { "@type": "GeoCoordinates", "latitude": 0.0, "longitude": 0.0 } },
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "availableLanguage": [
    { "@type": "Language", "name": "Russian", "alternateName": "ru" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ]
};

export const worldTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Кругосветные круизы 2026",
  "description": "Уникальное приключение по самым экзотическим уголкам планеты с Велес Вояж",
  "touristType": ["CruiseTourism", "CulturalTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "250000",
    "availability": "InStock",
    "validFrom": "2026-09-17"
  }
};

export const worldSchemas = [
  worldArticleSchema,
  worldFAQSchema,
  worldOrganizationSchema,
  worldBreadcrumbsSchema,
  worldSpeakableSchema,
  worldReviewSchema,
  worldVideoSchema,
  worldWeb3Schema,
  worldDarkWebSchema,
  worldAltSearchSchema,
  worldGlobalSearchSchema,
  worldMobileSchema,
  worldSocialSchema,
  worldAccessibilitySchema,
  worldAISchema,
  worldAEOSchema,
  worldGEOEnhancedSchema,
  worldTouristTripSchema
];

export const worldHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/cruises/world" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/cruises/world" }
];

