/**
 * Константы для SEO конфигурации
 * Вынесены из comprehensiveSEO.ts для лучшей организации кода
 */

// Максимальная длина описания для SEO (150-160 символов)
export const SEO_DESCRIPTION_MAX_LENGTH = 160;
export const SEO_DESCRIPTION_MIN_LENGTH = 150;

// Максимальная длина заголовка
export const SEO_TITLE_MAX_LENGTH = 60;

// Базовые URL
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://veles-voyage.ru';
export const LOGO_URL = `${SITE_URL}/images/logo.png`;

// Организация
export const ORGANIZATION_NAME = 'Велес Вояж | Экспертная редакция';
export const SITE_NAME = 'Велес Вояж';

// Контакты
export const CONTACT_PHONE = '+7-985-063-51-34';
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@veles-voyage.ru';

// Адрес
export const ADDRESS = {
  streetAddress: 'пр-т. Керамиков, 103',
  addressLocality: 'Голицыно',
  postalCode: '143041',
  addressCountry: 'RU',
} as const;

// Социальные сети
export const SOCIAL_LINKS = {
  vk: 'https://vk.com/veles__voyage',
  telegram: 'https://t.me/veles_voyage',
  rutube: 'https://rutube.ru/u/velesvoyage/',
  instagram: 'https://www.instagram.com/radun.veles/',
  twitter: '@veles_voyage',
  max: 'https://max.ru/id5032362524_biz',
  yandexBusiness: 'https://yandex.ru/maps/org/veles_voyazh/129552746144',
  googleBusiness: 'https://share.google/TBbHMZqo9vhqFPcPv',
  gis2: 'https://2gis.ru/pushkino/firm/70000001112858240',
} as const;

// Верификации поисковых систем (из переменных окружения)
export const VERIFICATIONS = {
  yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
  google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  yandex2: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || '',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || '',
  baidu: process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
  bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
  naver: process.env.NEXT_PUBLIC_NAVER_VERIFICATION || '',
} as const;

// Локализация
export const DEFAULT_LOCALE = 'ru_RU';
export const SUPPORTED_LOCALES = ['ru'] as const;

// Ценовой диапазон
export const PRICE_RANGE = '₽₽';

// Год основания
export const FOUNDING_YEAR = '2023';

// Дата последнего обновления контента (стабильная, без «фейковой свежести»).
// Обновляйте вручную при актуализации данных каталога.
export const SITE_LAST_UPDATED_ISO = '2026-07-15';
export const SITE_LAST_UPDATED_DISPLAY = 'июль 2026';

// Эксперт-автор для E-E-A-T (Person в схеме Article).
// Реальный эксперт: Сергей Свистунов, автор finradun.ru
export const EXPERT_AUTHOR = {
  name: 'Сергей Свистунов',
  role: 'Главный редактор, эксперт по международному туризму',
  url: `${SITE_URL}/team/sergey-svistunov`,
  sameAs: ['https://finradun.ru', SOCIAL_LINKS.vk, SOCIAL_LINKS.telegram, SOCIAL_LINKS.instagram],
} as const;

// Типы для повторного использования
export type SocialLinks = typeof SOCIAL_LINKS;
export type Address = typeof ADDRESS;
export type Verifications = typeof VERIFICATIONS;

// Экспорт всех констант вместе
export const SEO_CONSTANTS = {
  SITE_URL,
  LOGO_URL,
  ORGANIZATION_NAME,
  SITE_NAME,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  ADDRESS,
  SOCIAL_LINKS,
  VERIFICATIONS,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  PRICE_RANGE,
  FOUNDING_YEAR,
  SITE_LAST_UPDATED_ISO,
  SITE_LAST_UPDATED_DISPLAY,
  EXPERT_AUTHOR,
  SEO_DESCRIPTION_MAX_LENGTH,
  SEO_DESCRIPTION_MIN_LENGTH,
  SEO_TITLE_MAX_LENGTH,
} as const;

export const DEFAULT_RATING = {
  ratingValue: '4.9',
  reviewCount: '1242',
  bestRating: '5',
  worstRating: '1',
} as const;
