// --- Динамические даты для SEO ---
export let aboutDatePublished = new Date().toISOString().split('T')[0];
export let aboutDateModified = new Date().toISOString().split('T')[0];

export function setAboutDates({ published, modified }: { published: string, modified: string }) {
  aboutDatePublished = published;
  aboutDateModified = modified;
  aboutArticleSchema.datePublished = published;
  aboutArticleSchema.dateModified = modified;
  aboutArticleSchema.contentReferenceTime = published;
  aboutReviewSchema.review.forEach((review: any) => {
    review.datePublished = published;
  });
  aboutVideoSchema.uploadDate = published;
  aboutAISchema.datePublished = published;
  aboutAISchema.dateModified = modified;
  aboutAISchema.contentReferenceTime = published;
  aboutSocialSchema.datePublished = published;
  
  // Update additional schemas
  aboutMetaTags["article:published_time"] = published;
  aboutMetaTags["article:modified_time"] = modified;
  aboutMetaTags["og:updated_time"] = modified;
}

export const aboutArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "О компании Велес Вояж: экспертные путешествия с 2023 года",
  "description": "Велес Вояж — турагентство с лицензией РТА 0035678 с 2023 года. Организуем индивидуальные туры и круизы по России и миру, ведём энциклопедию по 200+ странам, сопровождаем клиентов 24/7.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "О нас - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": aboutDatePublished,
  "dateModified": aboutDateModified,
  "author": [
    {
      "@type": "Person",
      "name": "Свистунов Сергей Григорьевич",
      "jobTitle": "Генеральный директор ООО «Велес»",
      "url": "https://www.finradun.ru/"
    },
    {
      "@type": "Person",
      "name": "Колесникова Анастасия Юрьевна",
      "jobTitle": "Директор ООО «Велес»",
      "url": "https://franglish-original.ru/"
    }
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
    "@id": "https://veles-voyage.ru/about"
  },
  "articleSection": "О нас",
     "keywords": ["Велес Вояж", "турагентство", "лицензия турагентства", "путешествия", "туры", "круизы", "индивидуальные туры", "поддержка 24/7", "русская энциклопедия туризма", "путеводители по странам", "туризм 2026", "организация путешествий", "профессиональные гиды"],
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": aboutDatePublished
};

export const aboutSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/about",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const aboutReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Турагентство Велес Вояж",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "187"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ирина Смирнова" },
      "datePublished": aboutDatePublished,
      "reviewBody": "Профессиональное турагентство с отличной поддержкой. Все организовано на высшем уровне!"
    }
  ]
};

export const aboutFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какая лицензия у турагентства Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Турагентство Велес Вояж имеет официальную лицензию РТА 0035678 от 21.06.2023 г. Мы являемся официальным турагентством с правом организации путешествий по России и миру."
      }
    },
    {
      "@type": "Question",
      "name": "Какие услуги предоставляет Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы предоставляем индивидуальные туры, морские круизы, организацию путешествий по России и миру, поддержку 24/7, консультации по визам и документам, экспертные советы по планированию маршрутов."
      }
    },
    {
      "@type": "Question",
      "name": "Как связаться с турагентством?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Связаться можно по телефону +7 985 063-51-34, email hello@veles-voyage.ru или через Telegram @Anastasiiiiyyaa. Поддержка доступна 24/7."
      }
    },
    {
      "@type": "Question",
      "name": "Как проверить лицензию турагентства Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Проверить статус можно в Реестре турагентств России (РТА): на сайте реестра введите номер РТА 0035678 или название «Велес Вояж». Компания зарегистрирована 21.06.2023 г. ИНН и полные реквизиты указаны в разделе «Реквизиты» на нашем сайте. Это подтверждает, что мы — аккредитованное турагентство, несущее юридическую ответственность за ваши поездки."
      }
    }
  ]
};

export const aboutOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Велес Вояж | Экспертная редакция",
  "url": "https://veles-voyage.ru/",
  "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" },
  "foundingDate": "2023",
  "founder": [
    {
      "@type": "Person",
      "name": "Свистунов Сергей Григорьевич",
      "url": "https://www.finradun.ru/"
    },
    {
      "@type": "Person",
      "name": "Колесникова Анастасия Юрьевна",
      "url": "https://franglish-original.ru/"
    }
  ],
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
    "https://rutube.ru/u/velesvoyage/",
    "https://www.instagram.com/radun.veles/",
    "https://yandex.ru/maps/org/veles_voyazh/129552746144",
    "https://share.google/TBbHMZqo9vhqFPcPv",
    "https://2gis.ru/pushkino/firm/70000001112858240"
  ],
  "priceRange": "₽₽",
  "areaServed": { "@type": "Country", "name": "Russia" }
};

export const aboutPersonSvistunovSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Свистунов Сергей Григорьевич",
  "jobTitle": "Генеральный директор ООО «Велес»",
  "image": "https://veles-voyage.ru/images/svistunov.webp",
  "url": "https://www.finradun.ru/",
  "sameAs": [
    "https://www.finradun.ru/",
    "https://www.instagram.com/radun.veles/"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Велес Вояж",
    "url": "https://veles-voyage.ru"
  },
  "description": "Опытный предприниматель и путешественник с глубокими знаниями туристической индустрии. Основатель турагентства Велес Вояж с лицензией РТА 0035678.",
  "knowsAbout": [
    "Туристический бизнес",
    "Организация путешествий",
    "Международный туризм",
    "Управление турагентством"
  ]
};

export const aboutPersonKolesnikovaSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Колесникова Анастасия Юрьевна",
  "jobTitle": "Директор ООО «Велес»",
  "image": "https://veles-voyage.ru/images/kolesnikova.webp",
  "url": "https://franglish-original.ru/",
  "sameAs": [
    "https://franglish-original.ru/",
    "https://www.instagram.com/anastasia_k._1147/"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Велес Вояж",
    "url": "https://veles-voyage.ru"
  },
  "description": "Эксперт в области туристических услуг и клиентского сопровождения. Директор турагентства Велес Вояж с лицензией РТА 0035678.",
  "knowsAbout": [
    "Туристические услуги",
    "Клиентский сервис",
    "Организация туров",
    "Международный туризм"
  ]
};

export const aboutVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "О нас - Велес Вояж",
  "description": "Видео о турагентстве Велес Вояж на Rutube-канале",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "О нас - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": aboutDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const aboutBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "О нас", "item": "https://veles-voyage.ru/about" }
  ]
};

export const aboutWeb3Schema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "name": "О нас: Децентрализованный путеводитель Web3",
  "description": "Турагентство Велес Вояж - профессиональная организация путешествий по России и миру.",
  "keywords": "Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель",
  "author": { "@type": "Organization", "name": "Велес Вояж DAO" },
  "distribution": { "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/about", "encodingFormat": "application/json-ld" },
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "isAccessibleForFree": true
};

export const aboutDarkWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "О нас: Анонимный путеводитель",
  "description": "Турагентство Велес Вояж - профессиональная организация путешествий по России и миру.",
  "keywords": "анонимный туризм, приватные путешествия, Tor туризм",
  "mainEntity": { "@type": "TravelGuide", "name": "Приватный гид", "about": "Анонимные маршруты, офлайн карты, приватные места" },
  "potentialAction": { "@type": "ReadAction", "target": "https://veles-voyage.ru/about" }
};

export const aboutAltSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "О нас: Альтернативная поисковая база",
  "description": "Турагентство Велес Вояж - профессиональная организация путешествий по России и миру.",
  "keywords": "DuckDuckGo туризм, Startpage путешествия, Searx туризм, Brave search, Ecosia travel, независимый поиск",
  "creator": { "@type": "Organization", "name": "Велес Вояж Независимые Медиа" },
  "distribution": [{ "@type": "DataDownload", "contentUrl": "https://veles-voyage.ru/about.json", "encodingFormat": "application/json" }],
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
};

export const aboutGlobalSearchSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" },
    { "@value": "Veles Reisen", "@language": "de" }
  ],
  "description": { "@value": "Профессиональное турагентство. Организация путешествий по России и миру.", "@language": "ru" }
};

export const aboutMobileSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: О нас",
  "description": "Турагентство Велес Вояж - профессиональная организация путешествий по России и миру.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник"]
};

export const aboutSocialSchema = {
  "@context": "https://schema.org",
  "@type": "SocialMediaPosting",
  "headline": "О нас | Велес Вояж - Официальное турагентство",
  "text": "Турагентство Велес Вояж - профессиональная организация путешествий по России и миру. Индивидуальные туры, круизы, поддержка 24/7. #ВелесВояж #Туризм2026",
  "image": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "О нас - Велес Вояж" },
  "author": { "@type": "Organization", "name": "Велес Вояж", "sameAs": ["https://vk.com/veles__voyage", "https://t.me/veles_voyage", "https://rutube.ru/u/velesvoyage/"] },
  "datePublished": aboutDatePublished,
  "sharedContent": { "@type": "WebPage", "url": "https://veles-voyage.ru/about" }
};

export const aboutAccessibilitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "О нас 2026 | Велес Вояж",
  "accessibilityFeature": ["alternativeText", "captions", "highContrastDisplay", "largePrint", "readingOrder", "structuralNavigation"],
  "accessibilityControl": ["fullKeyboardControl", "fullMouseControl", "fullTouchControl"],
  "accessibilityAPI": ["ARIA"]
};

export const aboutAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "О компании Велес Вояж: экспертные путешествия с 2023 года",
  "description": "Велес Вояж — турагентство с лицензией РТА 0035678 с 2023 года. Организуем индивидуальные туры и круизы по России и миру, ведём энциклопедию по 200+ странам, сопровождаем клиентов 24/7.",
  "datePublished": aboutDatePublished,
  "dateModified": aboutDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция с AI анализом" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/about" },
  "wordCount": 8000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": aboutDatePublished
};

export const aboutAEOSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Велес Вояж: О нас",
  "description": "Мобильное приложение турагентства Велес Вояж с офлайн картами и AI рекомендациями",
  "applicationCategory": "TravelApplication",
  "operatingSystem": ["Android", "iOS", "PWA"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "RUB" },
  "featureList": ["Офлайн карты", "GPS навигация", "Бронирование онлайн", "AI персонализация", "Голосовой помощник", "Офлайн режим"],
  "softwareVersion": "2026.1.0",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1242" },
  "privacyPolicy": "https://veles-voyage.ru/privacy"
};

export const aboutGEOEnhancedSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": { "@value": "Велес Вояж", "@language": "ru" },
  "alternateName": [
    { "@value": "Veles Voyage", "@language": "en" },
    { "@value": "韦莱斯旅行", "@language": "zh" }
  ],
  "description": { "@value": "Профессиональное турагентство. Организация путешествий по России и миру.", "@language": "ru" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "пр-т. Керамиков, 103",
    "addressLocality": "Голицыно",
    "postalCode": "143041",
    "addressCountry": "RU"
  }
};

export const aboutSchemas = [
  aboutArticleSchema,
  aboutFAQSchema,
  aboutOrganizationSchema,
  aboutPersonSvistunovSchema,
  aboutPersonKolesnikovaSchema,
  aboutSpeakableSchema,
  aboutReviewSchema,
  aboutVideoSchema,
  aboutWeb3Schema,
  aboutDarkWebSchema,
  aboutAltSearchSchema,
  aboutGlobalSearchSchema,
  aboutMobileSchema,
  aboutSocialSchema,
  aboutAccessibilitySchema,
  aboutAISchema,
  aboutAEOSchema,
  aboutGEOEnhancedSchema
];

// --- Мета-теги для SEO, соцсетей, Web3, мобильных приложений ---
export const aboutMetaTags = {
  title: "О компании Велес Вояж: экспертные путешествия с 2023 года | Велес Вояж",
  description: "Велес Вояж — турагентство с лицензией РТА 0035678 с 2023 года. Организуем индивидуальные туры и круизы по России и миру, ведём энциклопедию по 200+ странам, сопровождаем клиентов 24/7.",
  keywords: "Велес Вояж, турагентство, лицензия турагентства, путешествия, туры, круизы, индивидуальные туры, поддержка 24/7, русская энциклопедия туризма, путеводители по странам, туризм 2026, организация путешествий, профессиональные гиды",
  "og:title": "О нас | Велес Вояж - Официальное турагентство",
  "og:description": "Турагентство Велес Вояж - профессиональная организация путешествий по России и миру.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - О нас",
  "og:url": "https://veles-voyage.ru/about",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "О нас | Велес Вояж - Официальное турагентство",
  "twitter:description": "Турагентство Велес Вояж - профессиональная организация путешествий по России и миру.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "О нас - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-title": "О нас",
  "theme-color": "#ffffff",
  "geo.region": "RU",
  "geo.placename": "Голицыно",
  "ICBM": "55.6122, 36.9853",
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
  "article:published_time": aboutDatePublished,
  "article:modified_time": aboutDateModified,
  "og:updated_time": aboutDateModified
};

export const aboutHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/about" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/about" }
];

