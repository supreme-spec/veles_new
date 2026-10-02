/**
 * Discriminated Unions для JSON-LD схем (защита от невалидных комбинаций полей)
 * 
 * Проблема: разные типы схем (Article, TouristDestination, FAQPage) имеют
 * разные обязательные поля. Обычный interface не запрещает передать headline
 * для FAQPage или забыть acceptedAnswer для Question.
 * 
 * Решение: discriminated union по полю @type гарантирует валидность комбинаций
 * на этапе компиляции.
 */

// Базовый тип с общими полями
interface BaseSchema {
  '@context': string;
  '@id'?: string;
  url?: string;
}

// Discriminated union по полю @type
export interface ArticleSchema extends BaseSchema {
  '@type': 'Article';
  headline: string;
  author: OrganizationSchema | PersonSchema;
  datePublished: string;
  dateModified?: string;
  image?: ImageObjectSchema;
  description?: string;
  mainEntityOfPage?: WebPageSchema;
  articleSection?: string;
  keywords?: string | string[];
  inLanguage?: string;
  temporalCoverage?: string;
  contentReferenceTime?: string;
}

export interface FAQPageSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: QuestionSchema[];
}

export interface QuestionSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: AnswerSchema;
}

export interface AnswerSchema {
  '@type': 'Answer';
  text: string;
}

export interface TouristDestinationSchema extends BaseSchema {
  '@type': 'TouristDestination';
  name: string;
  geo: GeoCoordinatesSchema;
  description?: string;
  containedInPlace?: PlaceSchema;
  touristType?: string[];
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  name: string;
  url?: string;
  logo?: ImageObjectSchema;
  sameAs?: string[];
}

export interface PersonSchema extends BaseSchema {
  '@type': 'Person';
  name: string;
  url?: string;
}

export interface WebPageSchema extends BaseSchema {
  '@type': 'WebPage';
  name?: string;
  url?: string;
  speakable?: SpeakableSpecificationSchema;
  accessibilityFeature?: string[];
  accessibilityControl?: string[];
}

export interface SpeakableSpecificationSchema {
  '@type': 'SpeakableSpecification';
  xpath?: string[];
  cssSelector?: string[];
}

export interface BreadcrumbListSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: ListItemSchema[];
}

export interface ListItemSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface VideoObjectSchema extends BaseSchema {
  '@type': 'VideoObject';
  name: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate: string;
  contentUrl?: string;
  duration?: string; // ISO 8601
}

export interface MobileApplicationSchema extends BaseSchema {
  '@type': 'MobileApplication';
  name: string;
  description?: string;
  operatingSystem?: string[];
  applicationCategory?: string;
  softwareVersion?: string;
  featureList?: string[];
}

export interface ImageObjectSchema extends BaseSchema {
  '@type': 'ImageObject';
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface GeoCoordinatesSchema {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface PlaceSchema extends BaseSchema {
  '@type': 'Place' | 'Country' | 'AdministrativeArea';
  name: string;
}

// Union всех возможных схем
export type SchemaOrg = 
  | ArticleSchema 
  | FAQPageSchema 
  | TouristDestinationSchema 
  | OrganizationSchema
  | PersonSchema
  | WebPageSchema
  | BreadcrumbListSchema
  | VideoObjectSchema
  | MobileApplicationSchema
  | ImageObjectSchema;

// Утилита для создания валидных схем
export function createArticleSchema(data: Omit<ArticleSchema, '@type' | '@context'>): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    ...data
  };
}

export function createFAQPageSchema(data: Omit<FAQPageSchema, '@type' | '@context'>): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...data
  };
}

export function createTouristDestinationSchema(data: Omit<TouristDestinationSchema, '@type' | '@context'>): TouristDestinationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    ...data
  };
}

export function createOrganizationSchema(data: Omit<OrganizationSchema, '@type' | '@context'>): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...data
  };
}

export function createBreadcrumbListSchema(data: Omit<BreadcrumbListSchema, '@type' | '@context'>): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...data
  };
}
