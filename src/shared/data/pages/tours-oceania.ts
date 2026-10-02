// --- Динамические даты для SEO ---
export let toursOceaniaDatePublished = new Date().toISOString().split('T')[0];
export let toursOceaniaDateModified = new Date().toISOString().split('T')[0];

export function setToursOceaniaDates({ published, modified }: { published: string; modified: string }) {
  toursOceaniaDatePublished = published;
  toursOceaniaDateModified = modified;
  if (toursOceaniaArticleSchema) {
    toursOceaniaArticleSchema.datePublished = published;
    toursOceaniaArticleSchema.dateModified = modified;
    toursOceaniaArticleSchema.contentReferenceTime = published;
  }
  if (toursOceaniaFAQSchema) toursOceaniaFAQSchema.dateModified = published;
  if (toursOceaniaVideoSchema) toursOceaniaVideoSchema.uploadDate = published;
  if (toursOceaniaAISchema) {
    toursOceaniaAISchema.datePublished = published;
    toursOceaniaAISchema.dateModified = modified;
    toursOceaniaAISchema.contentReferenceTime = published;
  }
  if (toursOceaniaMetaTags) {
    toursOceaniaMetaTags["article:published_time"] = published;
    toursOceaniaMetaTags["article:modified_time"] = modified;
    toursOceaniaMetaTags["og:updated_time"] = modified;
  }
}

export const toursOceaniaArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Туры в Океанию 2026 | Велес Вояж — Австралия, Фиджи, Новая Зеландия, Полинезия",
  "description": "Туры в Океанию: Австралия, Новая Зеландия, Фиджи, Французская Полинезия, Самоа, Вануату. Сидней, Окленд, остров Бора-Бора, пляжи Тихого океана. Индивидуальные маршруты под запрос, комфортное проживание, профессиональные гиды, бронирование онлайн.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Туры в Океанию - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursOceaniaDatePublished,
  "dateModified": toursOceaniaDateModified,
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
    "@id": "https://veles-voyage.ru/tours/oceania"
  },
  "articleSection": "Туры в Океанию",
  "keywords": ["туры в Океанию", "отдых в Океании", "Австралия туры", "Новая Зеландия туры", "Фиджи туры", "Полинезия туры", "Бора-Бора", "Сидней", "Окленд", "острова Тихого океана", "индивидуальные маршруты", "туризм 2026"],
  "wordCount": 6000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursOceaniaDatePublished
};

export const toursOceaniaSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours/oceania",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const toursOceaniaFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": toursOceaniaDatePublished,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие страны Океании входят в туры Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы формируем индивидуальные маршруты по Океании под ваш запрос: Австралия, Новая Зеландия, Фиджи, Французская Полинезия (Бора-Бора, Таити), Самоа, Вануату, Соломоновы острова, Тонга, Тувалу. Прямых пакетных туров в каждую страну может не быть в каталоге — мы собираем маршрут под интересы и бюджет."
      }
    },
    {
      "@type": "Question",
      "name": "Нужна ли виза для поездки в Океанию россиянам в 2026 году?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Для въезда в страны Океании гражданам РФ, как правило, требуется виза (Австралия, Новая Зеландия — электронная виза, Фиджи — по прилёте). Точные правила меняются, поэтому уточняйте актуальные условия въезда у менеджера при подборе тура."
      }
    },
    {
      "@type": "Question",
      "name": "Когда лучше ехать в Океанию?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Лучшее время зависит от направления. Для Австралии и Новой Зеландии комфортнее сентябрь–ноябрь и март–май; для островной Полинезии и Фиджи — май–октябрь (сухой сезон). Новогодний пик в Океании самый дорогой."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоит тур в Океанию?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Индивидуальный маршрут в Океанию в 2026 году стартует от €2 500 на человека (перелёты через Азию или Ближний Восток, проживание, трансферы). Точную стоимость рассчитывает менеджер после уточнения дат и состава группы."
      }
    }
  ]
};

export const toursOceaniaOrganizationSchema = {
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

export const toursOceaniaVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Туры в Океанию - Видеогид",
  "description": "Видеообзоры туров в Океанию на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Туры в Океанию - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursOceaniaDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursOceaniaBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" },
    { "@type": "ListItem", "position": 3, "name": "Туры в Океанию", "item": "https://veles-voyage.ru/tours/oceania" }
  ]
};

export const toursOceaniaAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Туры в Океанию 2026 | Велес Вояж — Австралия, Фиджи, Новая Зеландия, Полинезия",
  "description": "Туры в Океанию: Австралия, Новая Зеландия, Фиджи, Французская Полинезия, Самоа, Вануату. Индивидуальные маршруты под запрос с комфортным проживанием и профессиональными гидами.",
  "datePublished": toursOceaniaDatePublished,
  "dateModified": toursOceaniaDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours/oceania" },
  "wordCount": 6000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursOceaniaDatePublished
};

export const toursOceaniaTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Туры в Океанию 2026",
  "description": "Индивидуальные маршруты по Океании: Австралия, Новая Зеландия, Фиджи, Полинезия. Подбор под интересы и бюджет, комфортное проживание, профессиональные гиды.",
  "touristType": ["CulturalTourism", "AdventureTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "220000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursOceaniaSchemas = [
  toursOceaniaArticleSchema,
  toursOceaniaFAQSchema,
  toursOceaniaOrganizationSchema,
  toursOceaniaBreadcrumbsSchema,
  toursOceaniaSpeakableSchema,
  toursOceaniaVideoSchema,
  toursOceaniaAISchema,
  toursOceaniaTouristTripSchema
];

// --- Мета-теги для SEO ---
export const toursOceaniaMetaTags = {
  title: "Туры в Океанию 2026 | Велес Вояж — Австралия, Фиджи, Новая Зеландия, Полинезия",
  description: "Туры в Океанию: Австралия, Новая Зеландия, Фиджи, Французская Полинезия, Самоа, Вануату. Сидней, Окленд, Бора-Бора. Индивидуальные маршруты под запрос, комфортное проживание, профессиональные гиды.",
  keywords: "туры в Океанию, отдых в Океании, Австралия туры, Новая Зеландия туры, Фиджи туры, Полинезия туры, Бора-Бора, Сидней, Окленд, острова Тихого океана, индивидуальные маршруты, туризм 2026",
  "og:title": "Туры в Океанию 2026 | Велес Вояж",
  "og:description": "Туры в Океанию: Австралия, Новая Зеландия, Фиджи, Французская Полинезия. Индивидуальные маршруты под запрос.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Туры в Океанию",
  "og:url": "https://veles-voyage.ru/tours/oceania",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Туры в Океанию 2026 | Велес Вояж",
  "twitter:description": "Туры в Океанию: Австралия, Новая Зеландия, Фиджи, Французская Полинезия. Индивидуальные маршруты под запрос.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Туры в Океанию - Велес Вояж",
  "twitter:site": "@velesvoyage",
  "tg:site_verification": process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || "veles_voyage_official",
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "1b9d713dc3f02bed",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4",
  "content-language": "ru",
  "charset": "utf-8",
  "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  "googlebot": "index, follow",
  "bingbot": "index, follow",
  "yandexbot": "index, follow",
  "cache-control": "public, max-age=31536000",
  "expires": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString(),
  "article:published_time": toursOceaniaDatePublished,
  "article:modified_time": toursOceaniaDateModified,
  "og:updated_time": toursOceaniaDateModified
};

export const toursOceaniaHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours/oceania" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours/oceania" }
];
