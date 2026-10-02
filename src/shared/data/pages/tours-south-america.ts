// --- Динамические даты для SEO ---
export let toursSouthAmericaDatePublished = new Date().toISOString().split('T')[0];
export let toursSouthAmericaDateModified = new Date().toISOString().split('T')[0];

export function setToursSouthAmericaDates({ published, modified }: { published: string; modified: string }) {
  toursSouthAmericaDatePublished = published;
  toursSouthAmericaDateModified = modified;
  if (toursSouthAmericaArticleSchema) {
    toursSouthAmericaArticleSchema.datePublished = published;
    toursSouthAmericaArticleSchema.dateModified = modified;
    toursSouthAmericaArticleSchema.contentReferenceTime = published;
  }
  if (toursSouthAmericaFAQSchema) toursSouthAmericaFAQSchema.dateModified = published;
  if (toursSouthAmericaVideoSchema) toursSouthAmericaVideoSchema.uploadDate = published;
  if (toursSouthAmericaAISchema) {
    toursSouthAmericaAISchema.datePublished = published;
    toursSouthAmericaAISchema.dateModified = modified;
    toursSouthAmericaAISchema.contentReferenceTime = published;
  }
  if (toursSouthAmericaMetaTags) {
    toursSouthAmericaMetaTags["article:published_time"] = published;
    toursSouthAmericaMetaTags["article:modified_time"] = modified;
    toursSouthAmericaMetaTags["og:updated_time"] = modified;
  }
}

export const toursSouthAmericaArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Туры в Южную Америку 2026 | Велес Вояж — Бразилия, Аргентина, Чили, Перу, Колумбия",
  "description": "Туры в Южную Америку: Бразилия, Аргентина, Чили, Перу, Колумбия, Уругвай, Боливия, Эквадор. Рио-де-Жанейро, Буэнос-Айрес, Мачу-Пикчу, Амазония, Патагония, Галапагосы. Индивидуальные маршруты под запрос, комфортное проживание, профессиональные гиды, бронирование онлайн.",
  "image": {
    "@type": "ImageObject",
    "url": "https://veles-voyage.ru/images/logo.png",
    "caption": "Туры в Южную Америку - Велес Вояж",
    "height": 630,
    "width": 1200
  },
  "datePublished": toursSouthAmericaDatePublished,
  "dateModified": toursSouthAmericaDateModified,
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
    "@id": "https://veles-voyage.ru/tours/south-america"
  },
  "articleSection": "Туры в Южную Америку",
  "keywords": ["туры в Южную Америку", "отдых в Южной Америке", "Бразилия туры", "Аргентина туры", "Чили туры", "Перу туры", "Колумбия туры", "Мачу-Пикчу", "Рио-де-Жанейро", "Патагония", "Галапагосы", "индивидуальные маршруты", "туризм 2026"],
  "wordCount": 6000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursSouthAmericaDatePublished
};

export const toursSouthAmericaSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://veles-voyage.ru/tours/south-america",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["/html/body//h1", "/html/body//h2[1]", "/html/body//p[1]"]
  }
};

export const toursSouthAmericaFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": toursSouthAmericaDatePublished,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие страны Южной Америки входят в туры Велес Вояж?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Мы формируем индивидуальные маршруты по Южной Америке под ваш запрос: Бразилия, Аргентина, Чили, Перу, Колумбия, Уругвай, Боливия, Эквадор, Парагвай, Венесуэла, Гайана, Суринам. Прямых пакетных туров в каждую страну может не быть в каталоге — мы собираем маршрут под интересы и бюджет."
      }
    },
    {
      "@type": "Question",
      "name": "Нужна ли виза для поездки в Южную Америку россиянам в 2026 году?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Для въезда в большинство стран Южной Америки гражданам РФ виза не требуется (Бразилия, Аргентина, Перу, Чили, Колумбия, Уругвай, Эквадор, Боливия — безвизовый въезд на срок от 30 до 90 дней). Точные правила меняются, поэтому уточняйте актуальные условия въезда у менеджера при подборе тура."
      }
    },
    {
      "@type": "Question",
      "name": "Когда лучше ехать в Южную Америку?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Южное полушарие живёт в противофазе: для Анд и Патагонии лучше ноябрь–март (лето), для Амазонии и побережья Бразилии — май–сентябрь (сухой сезон). В Перу к Мачу-Пикчу комфортнее с мая по сентябрь."
      }
    },
    {
      "@type": "Question",
      "name": "Сколько стоит тур в Южную Америку?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Индивидуальный маршрут по Южной Америке в 2026 году стартует от €1 800 на человека (перелёты, проживание, трансферы). Точную стоимость рассчитывает менеджер после уточнения стран, дат и состава группы."
      }
    }
  ]
};

export const toursSouthAmericaOrganizationSchema = {
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

export const toursSouthAmericaVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Туры в Южную Америку - Видеогид",
  "description": "Видеообзоры туров в Южную Америку на Rutube-канале Велес Вояж",
  "thumbnailUrl": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Туры в Южную Америку - Велес Вояж", "height": 630, "width": 1200 },
  "uploadDate": toursSouthAmericaDatePublished,
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png", "caption": "Логотип Велес Вояж" } },
  "contentUrl": "https://rutube.ru/u/velesvoyage/",
  "embedUrl": "https://rutube.ru/u/velesvoyage/"
};

export const toursSouthAmericaBreadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://veles-voyage.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Туры", "item": "https://veles-voyage.ru/tours" },
    { "@type": "ListItem", "position": 3, "name": "Туры в Южную Америку", "item": "https://veles-voyage.ru/tours/south-america" }
  ]
};

export const toursSouthAmericaAISchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Туры в Южную Америку 2026 | Велес Вояж — Бразилия, Аргентина, Чили, Перу, Колумбия",
  "description": "Туры в Южную Америку: Бразилия, Аргентина, Чили, Перу, Колумбия, Уругвай, Боливия, Эквадор. Рио-де-Жанейро, Мачу-Пикчу, Амазония, Патагония. Индивидуальные маршруты под запрос с комфортным проживанием и профессиональными гидами.",
  "datePublished": toursSouthAmericaDatePublished,
  "dateModified": toursSouthAmericaDateModified,
  "author": [{ "@type": "Organization", "name": "Велес Вояж | Экспертная редакция" }],
  "publisher": { "@type": "Organization", "name": "Велес Вояж | Экспертная редакция", "logo": { "@type": "ImageObject", "url": "https://veles-voyage.ru/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://veles-voyage.ru/tours/south-america" },
  "wordCount": 6000,
  "inLanguage": "ru-RU",
  "temporalCoverage": "2026",
  "contentReferenceTime": toursSouthAmericaDatePublished
};

export const toursSouthAmericaTouristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Туры в Южную Америку 2026",
  "description": "Индивидуальные маршруты по Южной Америке: Бразилия, Аргентина, Чили, Перу, Колумбия. Подбор под интересы и бюджет, комфортное проживание, профессиональные гиды.",
  "touristType": ["CulturalTourism", "AdventureTourism"],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "RUB",
    "price": "160000",
    "availability": "InStock",
    "validFrom": "2026-01-01"
  }
};

export const toursSouthAmericaSchemas = [
  toursSouthAmericaArticleSchema,
  toursSouthAmericaFAQSchema,
  toursSouthAmericaOrganizationSchema,
  toursSouthAmericaBreadcrumbsSchema,
  toursSouthAmericaSpeakableSchema,
  toursSouthAmericaVideoSchema,
  toursSouthAmericaAISchema,
  toursSouthAmericaTouristTripSchema
];

// --- Мета-теги для SEO ---
export const toursSouthAmericaMetaTags = {
  title: "Туры в Южную Америку 2026 | Велес Вояж — Бразилия, Аргентина, Чили, Перу, Колумбия",
  description: "Туры в Южную Америку: Бразилия, Аргентина, Чили, Перу, Колумбия, Уругвай, Боливия, Эквадор. Рио-де-Жанейро, Мачу-Пикчу, Амазония, Патагония. Индивидуальные маршруты под запрос, комфортное проживание, профессиональные гиды.",
  keywords: "туры в Южную Америку, отдых в Южной Америке, Бразилия туры, Аргентина туры, Чили туры, Перу туры, Колумбия туры, Мачу-Пикчу, Рио-де-Жанейро, Патагония, Галапагосы, индивидуальные маршруты, туризм 2026",
  "og:title": "Туры в Южную Америку 2026 | Велес Вояж",
  "og:description": "Туры в Южную Америку: Бразилия, Аргентина, Чили, Перу, Колумбия. Индивидуальные маршруты под запрос.",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:alt": "Логотип Велес Вояж - Туры в Южную Америку",
  "og:url": "https://veles-voyage.ru/tours/south-america",
  "og:type": "article",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "twitter:card": "summary_large_image",
  "twitter:title": "Туры в Южную Америку 2026 | Велес Вояж",
  "twitter:description": "Туры в Южную Америку: Бразилия, Аргентина, Чили, Перу, Колумбия. Индивидуальные маршруты под запрос.",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:image:alt": "Туры в Южную Америку - Велес Вояж",
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
  "article:published_time": toursSouthAmericaDatePublished,
  "article:modified_time": toursSouthAmericaDateModified,
  "og:updated_time": toursSouthAmericaDateModified
};

export const toursSouthAmericaHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/tours/south-america" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/tours/south-america" }
];
