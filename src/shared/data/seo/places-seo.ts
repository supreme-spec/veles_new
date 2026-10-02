// --- SEO схемы для страницы /wiki/places ---
// --- Исправленные SEO схемы для страницы /wiki/places ---
// Очищено от спама, фейковых тегов и нестандартных элементов

import { cache } from 'react';

// Даты публикации и обновления — для динамической подстановки из server component
let placesDatePublished = new Date().toISOString().split('T')[0];
let placesDateModified = new Date().toISOString().split('T')[0];

// Кэшированная функция для получения дат (оптимизация серверных компонентов)
export const getPlacesDates = cache(() => ({
  published: placesDatePublished,
  modified: placesDateModified
}));

export function setPlacesDates({ published, modified }: { published: string, modified: string }) {
  placesDatePublished = published;
  placesDateModified = modified;
  
  // Update the schemas with new dates
  placesArticleSchema.datePublished = published;
  placesArticleSchema.dateModified = modified;
  
  placesFAQSchema.mainEntity.forEach((faq: any) => {
    if (faq.acceptedAnswer) {
      faq.acceptedAnswer.datePublished = published;
    }
  });
  
  if (placesBreadcrumbsSchema.itemListElement && placesBreadcrumbsSchema.itemListElement[2]) {
    placesBreadcrumbsSchema.itemListElement[2].dateModified = modified;
  }
}

// Article Schema (очищено от спама) с явной типизацией
export const placesArticleSchema: Record<string, any> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Ключевые места мира: интерактивная карта городов, достопримечательностей и курортов",
  "description": "Интерактивная карта и каталог ключевых мест из всех стран мира: города, достопримечательности, курорты и аэропорты. Координаты, описания, путеводители. Велес Вояж.",
  "url": "https://veles-voyage.ru/wiki/places",
  "datePublished": getPlacesDates().published,
  "dateModified": getPlacesDates().modified,
  "inLanguage": "ru-RU",
  "author": {
    "@type": "Organization",
    "name": "Велес Вояж | Экспертная редакция",
    "url": "https://veles-voyage.ru/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Велес Вояж | Экспертная редакция",
    "logo": {
      "@type": "ImageObject",
      "url": "https://veles-voyage.ru/images/logo.png"
    }
  },
  "mainEntity": {
    "@type": "Dataset",
    "name": "База данных ключевых мест мира",
    "description": "Координаты и описания городов и достопримечательностей",
    "creator": {
      "@type": "Organization",
      "name": "Велес Вояж"
    }
  }
};

// FAQ schema (очищено и упрощено) с явной типизацией
export const placesFAQSchema: Record<string, any> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какие места представлены на карте?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "На карте отмечены ключевые города, популярные курорты, главные достопримечательности и аэропорты в 200+ странах мира."
      }
    },
    {
      "@type": "Question",
      "name": "Как искать места в каталоге?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Вы можете использовать поиск по названию, фильтровать места по типу (города, достопримечательности, курорты, аэропорты) или по стране."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли использовать карту офлайн?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, основные данные кэшируются в браузере для быстрого доступа."
      }
    }
  ]
};

// BreadcrumbList с явной типизацией
export const placesBreadcrumbsSchema: Record<string, any> = {
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
      "name": "Путеводитель по странам",
      "item": "https://veles-voyage.ru/wiki/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Ключевые места мира",
      "item": "https://veles-voyage.ru/wiki/places",
      "dateModified": getPlacesDates().modified
    }
  ]
};

// Organization schema (без изменений - корректный) с явной типизацией
export const placesOrganizationSchema: Record<string, any> = {
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
    "telephone": "+79850635134",
    "contactType": "customer service",
    "email": "hello@veles-voyage.ru"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Московская область, Одинцовский р-н, Голицыно, Керамиков пр-т, д. 103",
    "addressLocality": "Голицыно",
    "postalCode": "143041",
    "addressCountry": "RU"
  },
  "sameAs": [
    "https://vk.com/veles__voyage",
    "https://t.me/veles_voyage"
  ],
  "priceRange": "₽₽"
};

// Мета-теги (очищены от фейковых верификаций)
export const placesMetaTags: Record<string, string> = {
  "title": "Ключевые места мира: интерактивная карта городов, достопримечательностей и курортов | Велес Вояж",
  "description": "Интерактивная карта ключевых мест мира: города, достопримечательности, курорты, аэропорты. Координаты и путеводители по всем странам. Велес Вояж.",
  "keywords": "ключевые места мира, достопримечательности всех стран, города мира список, курорты мира, аэропорты мира, туристические места, путеводитель по местам, карта достопримечательностей, интерактивная карта мест",
  "author": "Велес Вояж | Экспертная редакция",
  "creator": "Велес Вояж",
  "publisher": "Велес Вояж",
  "robots": "index, follow",
  "googlebot": "index, follow",
  "yandex": "index, follow",
  "geo.region": "World",
  "geo.placename": "World",
  "article:published_time": getPlacesDates().published || new Date().toISOString(),
  "article:modified_time": getPlacesDates().modified || new Date().toISOString(),
  "og:title": "Ключевые места мира: интерактивная карта | Велес Вояж",
  "og:description": "Интерактивная карта ключевых мест мира: города, достопримечательности, курорты, аэропорты. Координаты и путеводители",
  "og:url": "https://veles-voyage.ru/wiki/places",
  "og:type": "website",
  "og:image": "https://veles-voyage.ru/images/logo.png",
  "og:image:width": "1200",
  "og:image:height": "630",
  "og:site_name": "Велес Вояж",
  "og:locale": "ru_RU",
  "og:updated_time": getPlacesDates().modified || new Date().toISOString(),
  "twitter:card": "summary_large_image",
  "twitter:title": "Ключевые места мира: интерактивная карта | Велес Вояж",
  "twitter:description": "Интерактивная карта ключевых мест мира: города, достопримечательности, курорты, аэропорты",
  "twitter:image": "https://veles-voyage.ru/images/logo.png",
  "twitter:site": "@velesvoyage",
  "twitter:creator": "@velesvoyage",
  // Только реальные верификации
  "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || "",
  "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  "baidu-site-verification": process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || "",
  "bing-site-verification": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
  "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_VERIFICATION || ""
};

// Hreflang
export const placesHreflang = [
  { rel: "alternate", hreflang: "ru", href: "https://veles-voyage.ru/wiki/places" },
  { rel: "alternate", hreflang: "x-default", href: "https://veles-voyage.ru/wiki/places" }
];

// Единый массив для JSON-LD (только валидные схемы)
export const placesSchemas = [
  placesArticleSchema,
  placesFAQSchema,
  placesOrganizationSchema,
  placesBreadcrumbsSchema
];
