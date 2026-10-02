// Utility functions for generating unique metadata for different location types
import { toPrepositional, toGenitive, toDative } from '@/shared/utils/ruCase';

// Character limits for SEO metadata
const METADATA_LIMITS = {
  title: 60,
  description: 160,
  keywords: 255
};

// Location type identifiers
type LocationType = 'city' | 'region' | 'district' | 'federalDistrict' | 'republic' | 'territory' | 'autonomousRegion';

// Get location type based on name patterns
export function getLocationType(name: string): LocationType {
  if (name.includes('федеральный округ')) return 'federalDistrict';
  if (name.includes('Республика') || name.includes('республика')) return 'republic';
  if (name.includes('край')) return 'territory';
  if (name.includes('область')) return 'region';
  if (name.includes('автоном')) return 'autonomousRegion';
  return 'city'; // default to city
}

// Generate unique title based on location type
export function generateTitle(name: string, type: LocationType): string {
  const titles: Record<LocationType, string> = {
    city: `Турагентство Велес Вояж в ${toPrepositional(name)} | Онлайн-бронирование туров`,
    region: `Туры в ${toPrepositional(name)} | Велес Вояж турагентство`,
    district: `Туристические услуги в ${toPrepositional(name)} | Велес Вояж`,
    federalDistrict: `Турфирма в ${toPrepositional(name)} | Велес Вояж туры`,
    republic: `Путешествия по ${toDative(name)} | Велес Вояж`,
    territory: `Отдых в ${toPrepositional(name)} | Велес Вояж турагентство`,
    autonomousRegion: `Туры в ${toPrepositional(name)} | Велес Вояж`
  };

  let title = titles[type];
  
  // Ensure title fits within character limit
  if (title.length > METADATA_LIMITS.title) {
    // Truncate and add ellipsis if needed
    title = title.substring(0, METADATA_LIMITS.title - 3) + '...';
  }
  
  return title;
}

// Generate unique description based on location type
export function generateDescription(name: string, type: LocationType): string {
  const descriptions: Record<LocationType, string> = {
    city: `Официальное турагентство Велес Вояж в ${toPrepositional(name)}. Дистанционные услуги: подбор туров, консультации, оформление путевок онлайн. Не нужно приезжать в офис!`,
    region: `Турфирма Велес Вояж предлагает туры в ${toPrepositional(name)}. Онлайн-подбор путешествий, консультации, бронирование без посещения офиса для жителей ${toGenitive(name)}.`,
    district: `Туристические услуги в ${toPrepositional(name)} от Велес Вояж. Подбор индивидуальных туров, оформление путевок онлайн для жителей ${toGenitive(name)} и районов.`,
    federalDistrict: `Турфирма Велес Вояж работает в ${toPrepositional(name)}. Дистанционные туристические услуги: подбор туров, бронирование, оформление путевок для жителей ${toGenitive(name)}.`,
    republic: `Путешествия по ${toDative(name)} с турагентством Велес Вояж. Онлайн-сервис подбора туров, консультации, оформление путевок для жителей ${toGenitive(name)}.`,
    territory: `Отдых в ${toPrepositional(name)} с турагентством Велес Вояж. Полный спектр туристических услуг онлайн: подбор туров, бронирование, оформление путевок для жителей ${toGenitive(name)}.`,
    autonomousRegion: `Туры в ${toPrepositional(name)} от Велес Вояж. Дистанционные туристические услуги: подбор индивидуальных путешествий, консультации, оформление путевок онлайн.`
  };

  let description = descriptions[type];
  
  // Ensure description fits within character limit
  if (description.length > METADATA_LIMITS.description) {
    // Truncate and add ellipsis if needed
    description = description.substring(0, METADATA_LIMITS.description - 3) + '...';
  }
  
  return description;
}

// Generate unique keywords based on location type
export function generateKeywords(name: string, type: LocationType): string[] {
  const baseKeywords = [
    'турагентство',
    'бронирование туров',
    'путешествия',
    'оформить тур',
    'подбор туров',
    'дистанционное турагентство',
    'туры онлайн'
  ];

  const locationKeywords: Record<LocationType, string[]> = {
    city: [
      `турагентство ${name}`,
      `турагентство в ${toPrepositional(name)}`,
      `бронирование туров ${name}`,
      `путешествия из ${name}`,
      `оформить тур ${name}`,
      `подбор туров ${name}`,
      `дистанционное турагентство ${name}`,
      `туры для жителей ${toGenitive(name)}`
    ],
    region: [
      `туры в ${toPrepositional(name)}`,
      `путешествия по ${toDative(name)}`,
      `отдых в ${toPrepositional(name)}`,
      `турагентство в ${toPrepositional(name)}`,
      `бронирование туров в ${toPrepositional(name)}`,
      `путевки в ${toPrepositional(name)}`,
      `туристические услуги в ${toPrepositional(name)}`
    ],
    district: [
      `туристические услуги в ${toPrepositional(name)}`,
      `туры в ${toPrepositional(name)}`,
      `отдых в ${toPrepositional(name)}`,
      `путешествия по ${toDative(name)}`,
      `турагентство в ${toPrepositional(name)}`,
      `бронирование туров в ${toPrepositional(name)}`
    ],
    federalDistrict: [
      `турфирма в ${toPrepositional(name)}`,
      `туры в ${toPrepositional(name)}`,
      `путешествия по ${toDative(name)}`,
      `отдых в ${toPrepositional(name)}`,
      `туристические услуги в ${toPrepositional(name)}`
    ],
    republic: [
      `путешествия по ${toDative(name)}`,
      `туры в ${toPrepositional(name)}`,
      `отдых в ${toPrepositional(name)}`,
      `путевки в ${toPrepositional(name)}`,
      `турагентство в ${toPrepositional(name)}`
    ],
    territory: [
      `отдых в ${toPrepositional(name)}`,
      `туры в ${toPrepositional(name)}`,
      `путешествия по ${toDative(name)}`,
      `турагентство в ${toPrepositional(name)}`,
      `бронирование туров в ${toPrepositional(name)}`
    ],
    autonomousRegion: [
      `туры в ${toPrepositional(name)}`,
      `отдых в ${toPrepositional(name)}`,
      `путешествия по ${toDative(name)}`,
      `турагентство в ${toPrepositional(name)}`
    ]
  };

  // Combine base keywords with location-specific keywords
  const keywords = [...baseKeywords, ...locationKeywords[type]];
  
  // Join and ensure within character limit
  let keywordsString = keywords.join(', ');
  if (keywordsString.length > METADATA_LIMITS.keywords) {
    // Truncate to fit within limit
    keywordsString = keywordsString.substring(0, METADATA_LIMITS.keywords);
    // Remove any partial keywords at the end
    const lastComma = keywordsString.lastIndexOf(',');
    if (lastComma > 0) {
      keywordsString = keywordsString.substring(0, lastComma);
    }
  }
  
  return keywordsString.split(', ').filter(k => k.length > 0);
}

// Generate complete metadata object
export function generateLocationMetadata(name: string) {
  const type = getLocationType(name);
  const title = generateTitle(name, type);
  const description = generateDescription(name, type);
  const keywords = generateKeywords(name, type);
  
  return {
    title,
    description,
    keywords
  };
}