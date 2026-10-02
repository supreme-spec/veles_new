// src/lib/seo/countrySEO.ts
import type { Metadata } from 'next';
import React, { cache } from 'react';
import { countries } from '@lib/velite-data';
import { countryNamesDictionary, COUNTRY_NAMES_ACCUSATIVE, COUNTRY_NAMES_PREPOSITIONAL } from '@/shared/data/country-names-dictionary';
import { generateEnhancedSEOMetadata, SEO_CONFIG, generateDescription } from '@/lib/seo/unifiedSEO';
import { COUNTRY_COORDINATES } from '@/shared/data/countryCoordinates';
import { SITE_URL, SITE_LAST_UPDATED_ISO } from '@/shared/constants/seo';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';

interface CountrySEOMetadataOptions {
  countryId: string;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  includeAI?: boolean;
  includeVideo?: boolean;
}

// Функция для извлечения FAQ из содержимого MDX
function extractFaqsFromContent(content: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];
  
  // Паттерн для извлечения FAQ из MDX
  // Ищем заголовки с вопросами (## или ###) и следующий за ними текст
  const faqPattern = /#{2,3}\s*(.+\?)\s*\n+([\s\S]*?)(?=\n#{2,3}|$)/g;
  
  let match: RegExpExecArray | null;
  while ((match = faqPattern.exec(content)) !== null) {
    const question = match[1]?.trim();
    const answer = match[2]?.trim()
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .substring(0, 500); // Ограничиваем длину ответа
    
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  
  // Также ищем компоненты <FAQ> или <Accordion>
  const componentPattern = /<(?:FAQ|Accordion)[^>]*question="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/(?:FAQ|Accordion)>/gi;
  
  while ((match = componentPattern.exec(content)) !== null) {
    faqs.push({
      question: match[1]?.trim() || '',
      answer: match[2]?.trim().replace(/<[^>]+>/g, '').substring(0, 500) || ''
    });
  }
  
  return faqs;
}

// Приводит FAQ из frontmatter к массиву {question, answer}.
// Поддерживает массив объектов, строку "Вопрос|Ответ;;Вопрос|Ответ"
// и пустое значение (возвращает []).
function normalizeFaqs(faqs: unknown): Array<{ question: string; answer: string }> {
  if (Array.isArray(faqs)) {
    return faqs
      .map((item: any) => ({
        question: typeof item?.question === 'string' ? item.question.trim() : '',
        answer: typeof item?.answer === 'string' ? item.answer.trim() : '',
      }))
      .filter((f: { question: string; answer: string }) => f.question && f.answer);
  }

  if (typeof faqs === 'string' && faqs.trim()) {
    return faqs
      .split(';;')
      .map((pair: string) => {
        const parts = pair.split('|');
        return {
          question: parts[0]?.trim() || '',
          answer: parts[1]?.trim() || '',
        };
      })
      .filter((f: { question: string; answer: string }) => f.question && f.answer);
  }

  return [];
}

function getCountryGeoData(countryId: string, frontmatter: any) {
  const fallback = COUNTRY_COORDINATES[countryId] || {
    latitude: 55.7558, // Москва как дефолт для RU сайта
    longitude: 37.6173,
    countryCode: 'RU'
  };
  
  return {
    latitude: frontmatter?.latitude || fallback.latitude,
    longitude: frontmatter?.longitude || fallback.longitude,
    countryCode: frontmatter?.countryCode || fallback.countryCode
  };
}

// Функция для получения данных из MDX файла страны
interface MdxData {
  frontmatter: any;
  content: string;
}

export const getCountryMdxData = cache(async (countryId: string): Promise<MdxData | null> => {
  try {
    if (!/^[a-z0-9-]+$/.test(countryId)) {
      console.error(`Invalid countryId: ${countryId}`);
      return null;
    }

    const countryData = countries.find(c => c.slug === countryId);
    if (!countryData) {
      console.warn(`No Velite data found for: ${countryId}`);
      return null;
    }

    const normalizedFaqs = normalizeFaqs(countryData.faqs);

    const extractedFaqs = normalizedFaqs.length
      ? normalizedFaqs
      : extractFaqsFromContent(countryData.body ?? '');

    const geoData = getCountryGeoData(countryId, countryData);

    return {
      frontmatter: {
        ...countryData,
        faqs: extractedFaqs,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        countryCode: geoData.countryCode
      },
      content: countryData.body ?? ''
    };
  } catch (error) {
    console.error(`Error reading MDX data for ${countryId}:`, error);
    return null;
  }
});

// Функция для генерации расширенных SEO метаданных для стран на основе MDX
export async function generateCountrySEOMetadata(options: CountrySEOMetadataOptions): Promise<Metadata> {
  const { countryId, url, image, keywords, faqs } = options;

  // Получаем данные из MDX файла
  const mdxData = await getCountryMdxData(countryId);

  // Извлекаем название страны из title или используем countryId
  const countryName = countryNamesDictionary[countryId] || countryId.charAt(0).toUpperCase() + countryId.slice(1);
  const countryNameAccusative = COUNTRY_NAMES_ACCUSATIVE[countryId] || countryName;
  
  // Используем данные из MDX, если они есть, иначе используем переданные параметры
  const mdxImage = mdxData?.frontmatter.image || image;
  
  // Обработка ключевых слов - поддержка как строки, так и массива
  let mdxKeywords: string[] = [];
  if (mdxData?.frontmatter.keywords) {
    if (Array.isArray(mdxData.frontmatter.keywords)) {
      mdxKeywords = mdxData.frontmatter.keywords;
    } else if (typeof mdxData.frontmatter.keywords === 'string') {
      mdxKeywords = mdxData.frontmatter.keywords.split(',').map((k: string) => k.trim());
    }
  } else {
    mdxKeywords = keywords || [];
  }
  
  // Используем FAQ из параметров, frontmatter или пустой массив
  const extractedFaqs = faqs || mdxData?.frontmatter.faqs || [];
  
  // Если в frontmatter есть кастомный title - используем его полностью
  // Иначе генерируем чистый title без дублирования, используя винительный падеж
  const year = new Date().getFullYear();
  const rawTitle = mdxData?.frontmatter.title
    ? mdxData.frontmatter.title.replace(/\d{4}/g, '').trim()
    : '';
  const baseTitle = rawTitle.replace(/\s*\|\s*Велес\s+Вояж\s*$/i, '').trim();
  
  // Генерируем title с минимальной длиной 50-60 символов для SEO
  let chosenTitle = baseTitle
    ? `${baseTitle} ${year} | Велес Вояж`
    : `${countryNameAccusative} ${year}: Путеводитель | Велес Вояж`;
  
  // Если title слишком короткий (< 50 символов), добавляем описательные слова
  if (chosenTitle.length < 50) {
    if (baseTitle) {
      chosenTitle = `Полный путеводитель: ${baseTitle} ${year} | Велес Вояж`;
    } else {
      chosenTitle = `${countryNameAccusative} ${year}: экспертный путеводитель | Велес Вояж`;
    }
  }

  // Генерируем уникальное описание по формуле: [Страна] 2026: виза, цены от [X]₽, лучший сезон, советы. Подбор туров от Велес Вояж.
  const generateFallbackDescription = (country: string, countryId: string, frontmatter: any): string => {
    const year = new Date().getFullYear();
    
    // Пытаемся получить данные из WORLD_DESTINATIONS_DATA
    const destData = WORLD_DESTINATIONS_DATA[Object.keys(WORLD_DESTINATIONS_DATA).find(
      key => WORLD_DESTINATIONS_DATA[key].slug === countryId || 
              WORLD_DESTINATIONS_DATA[key].name.toLowerCase() === country.toLowerCase()
    ) || ''];
    
    const visaInfo = destData?.visaRequired !== false ? 'виза требуется' : 'безвизовый въезд';
    const bestSeason = destData?.bestSeason || frontmatter?.bestSeason || 'круглый год';
    const priceRange = destData?.estimatedCost || frontmatter?.estimatedCost || 50000;
    
    return `${country} ${year}: ${visaInfo}, цены от ${priceRange}₽, лучший сезон: ${bestSeason}. Полный путеводитель, советы и рекомендации. Подбор туров от Велес Вояж.`;
  };

  // Генерируем полные SEO данные через unifiedSEO
  const canonicalUrl = url || `${SITE_URL}/wiki/${countryId}`;

  const editorialDescription = generateDescription(
    mdxData?.frontmatter?.description ||
      options.description ||
      generateFallbackDescription(countryName, countryId, mdxData?.frontmatter)
  );

  const seoMetadata = generateEnhancedSEOMetadata({
    title: chosenTitle,
    description: editorialDescription,
    url: canonicalUrl,
    image: mdxImage,
    type: 'article',
    keywords: mdxKeywords,
    publishedTime: mdxData?.frontmatter.datePublished && mdxData.frontmatter.datePublished !== 'dynamic' ? mdxData.frontmatter.datePublished : SITE_LAST_UPDATED_ISO,
    modifiedTime: mdxData?.frontmatter.dateModified && mdxData.frontmatter.dateModified !== 'dynamic' ? mdxData.frontmatter.dateModified : SITE_LAST_UPDATED_ISO,
    author: mdxData?.frontmatter.author || SEO_CONFIG.organization,
    faqs: extractedFaqs
  });

  return seoMetadata;
}

// Функция для генерации JSON-LD схем для стран на основе MDX
export async function generateCountrySchemas(countryId: string, mode: 'google' | 'voice' | 'ai' | 'safe-all' = 'safe-all') {
  const mdxData = await getCountryMdxData(countryId);
  
  if (!mdxData) {
    // Возвращаем базовые схемы, если нет MDX данных
    return [];
  }

  const countryName = mdxData.frontmatter.title?.replace(/\d{4}/g, '').trim() || countryId;
  const baseUrl = SITE_URL;
  const countryUrl = `${baseUrl}/wiki/${countryId}`;
  const geoData = getCountryGeoData(countryId, mdxData.frontmatter);

  // Core schemas (always safe for Google/Yandex)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${countryUrl}#article`,
    "headline": mdxData.frontmatter.title || `${countryName} - путеводитель`,
    "description": mdxData.frontmatter.description || `Подробный путеводитель по ${countryName}`,
    "image": {
      "@type": "ImageObject",
      "url": mdxData.frontmatter.image || `${baseUrl}/images/logo.png`,
      "caption": `${countryName} - Путеводитель Велес Вояж`
    },
    "datePublished": mdxData.frontmatter.datePublished !== 'dynamic' ? mdxData.frontmatter.datePublished : SITE_LAST_UPDATED_ISO,
    "dateModified": mdxData.frontmatter.dateModified !== 'dynamic' ? mdxData.frontmatter.dateModified : SITE_LAST_UPDATED_ISO,
    "author": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": mdxData.frontmatter.author || "Велес Вояж | Экспертная редакция"
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "Велес Вояж | Экспертная редакция",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.png`,
        "caption": "Логотип Велес Вояж"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": countryUrl
    },
    "articleSection": `Путеводитель по ${COUNTRY_NAMES_PREPOSITIONAL[countryId] || countryName}`,
    "about": {
      "@type": "Place",
      "name": countryName
    },
    "keywords": Array.isArray(mdxData.frontmatter.keywords) 
      ? mdxData.frontmatter.keywords 
      : (typeof mdxData.frontmatter.keywords === 'string' 
        ? mdxData.frontmatter.keywords.split(',').map((k: string) => k.trim()) 
        : [`путеводитель по ${countryName}`, `${countryName}`, `туризм в ${countryName}`]),
    "wordCount": mdxData.frontmatter.wordCount || 8000,
    "inLanguage": mdxData.frontmatter.inLanguage || "ru-RU",
    "temporalCoverage": new Date().getFullYear().toString(),
    "contentReferenceTime": mdxData.frontmatter.datePublished !== 'dynamic' ? mdxData.frontmatter.datePublished : SITE_LAST_UPDATED_ISO
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${countryUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Энциклопедия",
        "item": `${baseUrl}/wiki/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": countryName,
        "item": countryUrl
      }
    ]
  };

  // FAQ схема (валидная для Google) - только если есть FAQ
  const faqItems = Array.isArray(mdxData?.frontmatter.faqs)
    ? mdxData.frontmatter.faqs
    : [];

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${countryUrl}#faq`,
    "mainEntity": faqItems.slice(0, 10).map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const touristDestinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${countryUrl}#destination`,
    "name": countryName,
    "description": mdxData?.frontmatter.description || `Путеводитель по ${COUNTRY_NAMES_PREPOSITIONAL[countryId] || countryName}`,
    "url": countryUrl,
    "containsPlace": [
      {
        "@type": "AdministrativeArea",
        "name": countryName
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geoData.latitude,
      "longitude": geoData.longitude
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": geoData.countryCode
    },
    "touristType": [
      { "@type": "Audience", "audienceType": "Туристы" },
      { "@type": "Audience", "audienceType": "Семьи с детьми" },
      { "@type": "Audience", "audienceType": "Молодожёны" },
      { "@type": "Audience", "audienceType": "Бэкпекеры" }
    ],
    "hasMap": `https://www.google.com/maps/search/${encodeURIComponent(countryName)}`
  };

  // Voice/Assistant schemas
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${countryUrl}#speakable`,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        "article > h1",
        "article > p:first-of-type",
        ".article-title",
        ".article-intro",
        ".summary",
        ".faq-question",
        ".faq-answer"
      ]
    },
    "name": mdxData?.frontmatter.title || `${countryName} - путеводитель`
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${countryUrl}#howto`,
    "name": `Как спланировать поездку в ${countryName}`,
    "description": `Пошаговое руководство по планированию путешествия в ${countryName}`,
    "totalTime": "P7D",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "RUB",
      "value": mdxData?.frontmatter.estimatedCost || 100000
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Проверьте визовые требования",
        "text": `Узнайте, нужна ли виза для посещения ${countryName}. Проверьте сроки действия паспорта.`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Выберите даты и сезон",
        "text": `Определите лучшее время для посещения ${countryName} с учётом погоды и туристического сезона.`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Забронируйте билеты",
        "text": "Найдите и забронируйте авиабилеты заранее для лучших цен."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Забронируйте жильё",
        "text": "Выберите отель, апартаменты или другой тип размещения."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Оформите страховку",
        "text": "Приобретите медицинскую страховку с покрытием не менее 30 000 евро."
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Составьте маршрут",
        "text": `Спланируйте посещение достопримечательностей ${countryName}.`
      }
    ],
    "supply": [
      { "@type": "HowToSupply", "name": "Загранпаспорт" },
      { "@type": "HowToSupply", "name": "Банковская карта" },
      { "@type": "HowToSupply", "name": "Медицинская страховка" }
    ]
  };

  // VideoObject schema (when video is available)
  const videoSchema = mdxData?.frontmatter.video ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${countryUrl}#video`,
    "name": `${countryName} - Видеогид | Велес Вояж`,
    "description": mdxData.frontmatter.description || `Видеообзор ${countryName}`,
    "thumbnailUrl": mdxData.frontmatter.image || `${baseUrl}/images/logo.png`,
    "uploadDate": mdxData.frontmatter.datePublished !== 'dynamic' ? mdxData.frontmatter.datePublished : SITE_LAST_UPDATED_ISO,
    "duration": mdxData.frontmatter.videoDuration || "PT10M",
    "contentUrl": mdxData.frontmatter.videoUrl || `https://rutube.ru/u/velesvoyage/`,
    "embedUrl": mdxData.frontmatter.videoEmbed,
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`
    }
  } : null;

  // AI/LLM schemas
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${countryUrl}#dataset`,
    "name": `Туристические данные: ${countryName}`,
    "description": `Структурированные данные о туризме в ${countryName}`,
    "url": countryUrl,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`
    },
    "dateCreated": mdxData.frontmatter.datePublished !== 'dynamic' ? mdxData.frontmatter.datePublished : SITE_LAST_UPDATED_ISO,
    "dateModified": mdxData.frontmatter.dateModified !== 'dynamic' ? mdxData.frontmatter.dateModified : SITE_LAST_UPDATED_ISO,
    "inLanguage": "ru",
    "keywords": Array.isArray(mdxData.frontmatter.keywords) 
      ? mdxData.frontmatter.keywords 
      : [`туризм`, `путешествия`, countryName],
    "isAccessibleForFree": true
  };

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${countryUrl}#terms`,
    "name": `Туристические термины: ${countryName}`,
    "hasDefinedTerm": (Array.isArray(mdxData.frontmatter.keywords) 
      ? mdxData.frontmatter.keywords 
      : [`туризм`, `путешествия`, countryName]
    ).slice(0, 10).map((term: string) => ({
      "@type": "DefinedTerm",
      "name": term
    }))
  };

  // TravelAction schema for improved travel search indexing
  const travelActionSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    "@id": `${countryUrl}#travel`,
    "name": `Путешествие в ${countryName}`,
    "description": `Планирование поездки в ${countryName}`,
    "toLocation": {
      "@type": "Place",
      "@id": `${countryUrl}#destination`
    },
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`
    }
  };

  // ItemList schema for popular attractions
  const attractionsListSchema = mdxData?.frontmatter.attractions ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${countryUrl}#attractions`,
    "name": `Достопримечательности ${countryName}`,
    "numberOfItems": Array.isArray(mdxData.frontmatter.attractions) ? mdxData.frontmatter.attractions.length : 0,
    "itemListElement": Array.isArray(mdxData.frontmatter.attractions) ? 
      mdxData.frontmatter.attractions.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": item.type || "TouristAttraction",
          "name": item.name,
          "description": item.description,
          "url": item.url
        }
      })) : []
  } : null;

  // Define schema groups
  const coreSchemas = [
    articleSchema,
    faqSchema,
    breadcrumbsSchema,
    touristDestinationSchema,
    videoSchema,
    travelActionSchema
  ].filter(Boolean);

  const voiceSchemas = [
    speakableSchema,
    howToSchema
  ].filter(Boolean);

  const aiSchemas = [
    datasetSchema,
    definedTermSetSchema
  ].filter(Boolean);

  const experimentalSchemas = [
    attractionsListSchema
  ].filter(Boolean);

  // Return schemas based on mode
  switch (mode) {
    case 'google':
      return coreSchemas;
    
    case 'voice':
      return [...coreSchemas, ...voiceSchemas];
    
    case 'ai':
      return [...coreSchemas, ...aiSchemas];
    
    case 'safe-all':
    default:
      return [...coreSchemas, ...voiceSchemas, ...aiSchemas, ...experimentalSchemas];
  }
}

// Экспорт компонента для рендеринга схем
export function CountrySchemaScripts({ schemas }: { schemas: object[] }) {
  if (!schemas.length) return null;
  
  // Создаем массив элементов скриптов
  const scriptElements = [];
  for (let i = 0; i < schemas.length; i++) {
    const schema = schemas[i];
    // Безопасная сериализация JSON для предотвращения XSS
    const jsonStr = JSON.stringify(schema);
    // Экранируем потенциально опасные символы
    const safeJson = jsonStr
      .replace(/</g, '\u003c')
      .replace(/>/g, '\u003e');
    
    scriptElements.push(
      React.createElement("script", {
        key: `schema-${i}`,
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: safeJson }
      })
    );
  }
  
  return React.createElement(React.Fragment, null, ...scriptElements);
}
