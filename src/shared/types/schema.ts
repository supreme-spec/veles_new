/**
 * TypeScript типы для Schema.org структурированных данных
 * Заменяют использование 'any' в схемах
 */

// Базовые типы Schema.org
export interface SchemaContext {
  '@context': 'https://schema.org';
}

export interface SchemaType {
  '@type': string;
}

// Article Schema
export interface ArticleSchema extends SchemaContext, SchemaType {
  '@type': 'Article';
  headline: string;
  description: string;
  image: string | ImageObject;
  datePublished: string;
  dateModified: string;
  author: Author | Author[];
  publisher: Organization;
  mainEntityOfPage?: WebPage;
  articleSection?: string;
  about?: Place;
  keywords?: string | string[];
  wordCount?: number;
  inLanguage?: string;
  temporalCoverage?: string;
  contentReferenceTime?: string;
}

// Organization Schema
export interface OrganizationSchema extends SchemaContext, SchemaType {
  '@type': 'Organization';
  '@id'?: string;
  name: string;
  url: string;
  logo: string | ImageObject;
  foundingDate?: string;
  contactPoint?: ContactPoint;
  address?: PostalAddress;
  sameAs?: string[];
  priceRange?: string;
  areaServed?: Country | Country[];
}

// FAQ Schema
export interface FAQSchema extends SchemaContext, SchemaType {
  '@type': 'FAQPage';
  mainEntity: Question[];
}

// BreadcrumbList Schema
export interface BreadcrumbListSchema extends SchemaContext, SchemaType {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

// Review Schema
export interface ReviewSchema extends SchemaContext, SchemaType {
  '@type': 'Product' | 'Service';
  name: string;
  aggregateRating?: AggregateRating;
  review?: Review[];
}

// VideoObject Schema
export interface VideoObjectSchema extends SchemaContext, SchemaType {
  '@type': 'VideoObject';
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  publisher: Organization;
  contentUrl?: string;
  embedUrl?: string;
}

// Speakable Schema
export interface SpeakableSchema extends SchemaContext, SchemaType {
  '@type': 'WebPage';
  url: string;
  speakable: SpeakableSpecification;
}

// Web3 Schema
export interface Web3Schema extends SchemaContext, SchemaType {
  '@type': 'DigitalDocument';
  name: string;
  keywords?: string;
}

// Dark Web Schema
export interface DarkWebSchema extends SchemaContext, SchemaType {
  '@type': 'WebPage';
  name: string;
  keywords?: string;
}

// Alternative Search Schema
export interface AltSearchSchema extends SchemaContext, SchemaType {
  '@type': 'Dataset';
  name: string;
}

// Global Search Schema
export interface GlobalSearchSchema extends SchemaContext, SchemaType {
  '@type': 'TouristDestination';
  name: string;
  alternateName?: AlternateName[];
}

// AI Schema
export interface AISchema extends SchemaContext, SchemaType {
  '@type': 'WebPage' | 'Article';
  name: string;
  description?: string;
  keywords?: string;
}

// Вспомогательные типы
export interface ImageObject {
  '@type': 'ImageObject';
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface Author {
  '@type': 'Person' | 'Organization';
  name: string;
}

export interface Organization {
  '@type': 'Organization';
  name: string;
  logo?: ImageObject;
  url?: string;
}

export interface WebPage {
  '@type': 'WebPage';
  '@id': string;
}

export interface Place {
  '@type': 'Place';
  name: string;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone?: string;
  contactType?: string;
  email?: string;
  availableLanguage?: string[];
  areaServed?: string;
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface Country {
  '@type': 'Country';
  name: string;
}

export interface Question {
  '@type': 'Question';
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer {
  '@type': 'Answer';
  text: string;
}

export interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
}

export interface Review {
  '@type': 'Review';
  author: Author;
  datePublished: string;
  reviewBody: string;
  reviewRating?: ReviewRating;
}

export interface ReviewRating {
  '@type': 'Rating';
  ratingValue: string;
  bestRating?: string;
  worstRating?: string;
}

export interface SpeakableSpecification {
  '@type': 'SpeakableSpecification';
  xpath: string[];
}

export interface AlternateName {
  '@value': string;
  '@language': string;
}

// Union тип для всех схем
export type SchemaTypeUnion =
  | ArticleSchema
  | OrganizationSchema
  | FAQSchema
  | BreadcrumbListSchema
  | ReviewSchema
  | VideoObjectSchema
  | SpeakableSchema
  | Web3Schema
  | DarkWebSchema
  | AltSearchSchema
  | GlobalSearchSchema
  | AISchema
  | Record<string, unknown>; // Для других типов схем

