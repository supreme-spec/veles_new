import { createElement, Fragment } from 'react';
import { cache } from 'react';
import { getCityData } from '../../data/cityCoordinates';
import { SITE_URL } from '@/shared/constants/seo';
import { generateCitySlug } from '@/lib/slugify';

// Валидация имени города - улучшенная с полной поддержкой кириллицы
function validateCityName(cityName: string): boolean {
  // Кириллица + латиница + пробелы + дефисы
  return (
    /^[\u0400-\u04FFa-zA-Z\s\-]+$/i.test(cityName) && cityName.length >= 2 && cityName.length <= 100
  );
}

// Нормализация имени города в латинский URL-слаг
function normalizeCityName(cityName: string): string {
  return generateCitySlug(cityName);
}

// Получение координат города с поддержкой алиасов
function getCityGeoData(cityName: string) {
  // Используем вспомогательную функцию из cityCoordinates.ts
  const cityData = getCityData(cityName);
  if (cityData) {
    return {
      latitude: cityData.latitude,
      longitude: cityData.longitude,
      region: cityData.region,
    };
  }

  // Fallback если город не найден
  return {
    latitude: 55.7558,
    longitude: 37.6173,
    region: 'Россия',
  };
}

// Генерация релевантных ключевых слов (без спама!)
function generateCityKeywords(cityName: string): string[] {
  return [
    `турагентство ${cityName}`,
    `турагентство в ${cityName}`,
    `туры из ${cityName}`,
    `путешествия из ${cityName}`,
    `бронирование туров ${cityName}`,
    `подбор туров ${cityName}`,
    `отдых для жителей ${cityName}`,
    `горящие туры ${cityName}`,
    `турагентство ${cityName}`,
    `отпуск ${cityName}`,
  ];
}

// Обернутая в cache функция для оптимизации React Server Components
export const generateCitySchemas = cache(
  (
    cityName: string,
    _cityType: 'city' | 'region' | 'district' = 'city',
    mode: 'google' | 'voice' | 'ai' | 'safe-all' = 'safe-all'
  ) => {
    // Валидация
    if (!validateCityName(cityName)) {
      console.error(`Invalid cityName: ${cityName}`);
      return [];
    }

    const normalizedCity = normalizeCityName(cityName);
    const geoData = getCityGeoData(cityName);
    const baseUrl = SITE_URL;
    const cityUrl = `${baseUrl}/cities/${encodeURIComponent(normalizedCity)}`;
    const dateNow = new Date().toISOString().split('T')[0];

    // Релевантные ключевые слова (без спама!)
    const keywords = generateCityKeywords(cityName);

    // Core schemas (always safe for Google/Yandex)
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${cityUrl}#article`,
      headline: `Турагентство Велес Вояж в ${cityName}`,
      description: `Турагентство Велес Вояж в ${cityName}. Дистанционный подбор туров, бронирование, консультации для жителей ${cityName}.`,
      image: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 1200,
        height: 630,
      },
      datePublished: dateNow,
      dateModified: dateNow,
      author: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': cityUrl,
      },
      keywords: keywords,
      inLanguage: 'ru-RU',
    };

    // Organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'Велес Вояж',
      alternateName: 'Veles Voyage',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+7-985-063-51-34',
        contactType: 'customer service',
        email: 'hello@veles-voyage.ru',
        availableLanguage: ['Russian'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Керамиков пр-т, д. 103',
        addressLocality: 'Голицыно',
        addressRegion: 'Московская область',
        postalCode: '143041',
        addressCountry: 'RU',
      },
      sameAs: [
        'https://vk.com/veles__voyage',
        'https://t.me/veles_voyage',
        'https://rutube.ru/u/velesvoyage/',
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Россия',
      },
    };

    // BreadcrumbList (хлебные крошки)
    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${cityUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Города',
          item: `${baseUrl}/cities`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: cityName,
          item: cityUrl,
        },
      ],
    };

    // FAQ schema (на основе реальных вопросов из контента)
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${cityUrl}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: `Какие услуги предоставляет Велес Вояж в ${cityName}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Турагентство Велес Вояж предлагает жителям ${cityName} дистанционный подбор туров, онлайн-консультации, бронирование отелей и оформление путевок без посещения офиса.`,
          },
        },
        {
          '@type': 'Question',
          name: `Как связаться с турагентством в ${cityName}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Позвоните +7-985-063-51-34, напишите в Telegram @veles_voyage или на email hello@veles-voyage.ru. Мы работаем дистанционно для всех городов России.`,
          },
        },
        {
          '@type': 'Question',
          name: `Какие туры популярны у жителей ${cityName}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Жители ${cityName} чаще всего выбирают Турцию, Египет, ОАЭ, Таиланд и российские курорты. Мы подберём тур под ваш бюджет и пожелания.`,
          },
        },
      ],
    };

    // Локальный бизнес с правильными координатами
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      '@id': `${cityUrl}#business`,
      name: `Велес Вояж — ${cityName}`,
      description: `Дистанционное турагентство для жителей ${cityName}`,
      url: cityUrl,
      telephone: '+7-985-063-51-34',
      email: 'hello@veles-voyage.ru',
      areaServed: {
        '@type': 'City',
        name: cityName,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geoData.latitude,
          longitude: geoData.longitude,
        },
      },
      priceRange: '₽₽',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
    };

    // VideoObject schema (пример)
    const videoSchema = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      '@id': `${cityUrl}#video`,
      name: `Видеогид по ${cityName} — Велес Вояж`,
      description: `Видеообзоры, советы и информация о ${cityName} на Rutube-канале Велес Вояж.`,
      thumbnailUrl: `${baseUrl}/images/logo.png`,
      uploadDate: dateNow,
      duration: 'PT10M',
      contentUrl: 'https://rutube.ru/u/velesvoyage/',
      embedUrl: 'https://rutube.ru/u/velesvoyage/',
      publisher: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
      },
    };

    // Voice/Assistant schemas
    const speakableSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${cityUrl}#speakable`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.intro', '.summary', '.faq-answer'],
      },
      name: `Турагентство Велес Вояж в ${cityName}`,
    };

    // HowTo schema for improved travel search indexing
    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${cityUrl}#howto`,
      name: `Как заказать тур из ${cityName}`,
      description: `Пошаговая инструкция для жителей ${cityName}`,
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Свяжитесь с нами',
          text: 'Позвоните, напишите в Telegram или на email',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Расскажите о пожеланиях',
          text: 'Даты, бюджет, направление, состав группы',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Получите подборку',
          text: 'Мы подберём лучшие варианты под ваши критерии',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Оформите бронь',
          text: 'Подпишем договор, забронируем и оплатим тур',
        },
      ],
      supply: [
        { '@type': 'HowToSupply', name: 'Паспорт' },
        { '@type': 'HowToSupply', name: 'Виза' },
        { '@type': 'HowToSupply', name: 'Медицинская страховка' },
      ],
    };

    // AI/LLM schemas
    const datasetSchema = {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      '@id': `${cityUrl}#dataset`,
      name: `Туристические данные: ${cityName}`,
      description: `Структурированные данные о туризме в ${cityName}`,
      url: cityUrl,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      creator: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
      },
      dateCreated: dateNow,
      dateModified: dateNow,
      inLanguage: 'ru',
      keywords: [`туризм`, `путешествия`, cityName],
      isAccessibleForFree: true,
    };

    const definedTermSetSchema = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${cityUrl}#terms`,
      name: `Туристические термины: ${cityName}`,
      hasDefinedTerm: [
        `туризм`,
        `путешествия`,
        cityName,
        `турагентство ${cityName}`,
        `дистанционное обслуживание`,
      ]
        .slice(0, 10)
        .map((term: string) => ({
          '@type': 'DefinedTerm',
          name: term,
        })),
    };

    // TravelAction schema for improved travel search indexing
    const travelActionSchema = {
      '@context': 'https://schema.org',
      '@type': 'TravelAction',
      '@id': `${cityUrl}#travel`,
      name: `Путешествие в ${cityName}`,
      description: `Планирование поездки в ${cityName}`,
      toLocation: {
        '@type': 'Place',
        '@id': `${cityUrl}#destination`,
      },
      provider: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
      },
    };

    // Define schema groups
    const coreSchemas = [
      articleSchema,
      organizationSchema,
      breadcrumbsSchema,
      faqSchema,
      localBusinessSchema,
      videoSchema,
      travelActionSchema,
    ].filter(Boolean);

    const voiceSchemas = [speakableSchema, howToSchema].filter(Boolean);

    const aiSchemas = [datasetSchema, definedTermSetSchema].filter(Boolean);

    const experimentalSchemas: object[] = [];

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
);

// Hreflang для интернационального SEO
export function generateHreflang(cityName: string) {
  const normalizedCityName = generateCitySlug(cityName);

  return [
    {
      rel: 'alternate',
      hreflang: 'ru',
      href: `${SITE_URL}/cities/${normalizedCityName}`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${SITE_URL}/cities/${normalizedCityName}`,
    },
  ];
}

// Экспорт компонента для рендеринга схем
export function CitySchemaScripts({ schemas }: { schemas: object[] }) {
  if (!schemas.length) return null;

  // Создаем массив элементов скриптов
  const scriptElements = [];
  for (let i = 0; i < schemas.length; i++) {
    const schema = schemas[i];
    // Безопасная сериализация JSON для предотвращения XSS
    const jsonStr = JSON.stringify(schema);
    // Экранируем потенциально опасные символы
    const safeJson = jsonStr.replace(/</g, '\u003c').replace(/>/g, '\u003e');

    scriptElements.push(
      createElement('script', {
        key: `schema-${i}`,
        type: 'application/ld+json',
        dangerouslySetInnerHTML: { __html: safeJson },
      })
    );
  }

  return createElement(Fragment, null, ...scriptElements);
}
