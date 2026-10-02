/**
 * Branded Types для семантической типизации строковых и числовых значений.
 * 
 * Проблема: в проекте много строк — slug страны, url, latitude, longitude.
 * Все они имеют тип string/number, но семантически разные.
 * Легко случайно передать slug вместо url или перепутать latitude и longitude.
 * 
 * Решение: брендированные типы предотвращают такие ошибки на этапе компиляции.
 */

// Базовый branded type
type Brand<T, B extends string> = T & { __brand: B };

// Брендируем типы для SEO и GEO данных
export type Slug = Brand<string, 'Slug'>;
export type AbsoluteUrl = Brand<string, 'AbsoluteUrl'>;
export type RelativeUrl = Brand<string, 'RelativeUrl'>;
export type Latitude = Brand<number, 'Latitude'>;
export type Longitude = Brand<number, 'Longitude'>;
export type CountryCode = Brand<string, 'CountryCode'>; // ISO 3166-1 alpha-2

// Фабрики для создания брендируемых значений с runtime-валидацией
export const createSlug = (value: string): Slug => {
  const normalized = value.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  return normalized as Slug;
};

export const createUrl = (value: string): AbsoluteUrl => {
  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    throw new Error(`Invalid absolute URL: ${value}`);
  }
  return value as AbsoluteUrl;
};

export const createRelativeUrl = (value: string): RelativeUrl => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    throw new Error(`Expected relative URL, got absolute: ${value}`);
  }
  return value as RelativeUrl;
};

export const createLatitude = (value: number): Latitude => {
  if (value < -90 || value > 90) {
    throw new Error(`Invalid latitude: ${value}. Must be between -90 and 90.`);
  }
  return value as Latitude;
};

export const createLongitude = (value: number): Longitude => {
  if (value < -180 || value > 180) {
    throw new Error(`Invalid longitude: ${value}. Must be between -180 and 180.`);
  }
  return value as Longitude;
};

export const createCountryCode = (value: string): CountryCode => {
  if (!/^[A-Z]{2}$/.test(value)) {
    throw new Error(`Invalid country code: ${value}. Must be ISO 3166-1 alpha-2 (e.g., RU, US).`);
  }
  return value as CountryCode;
};

// Утилиты для безопасного приведения типов (без runtime-валидации)
export const asSlug = (value: string): Slug => value as Slug;
export const asAbsoluteUrl = (value: string): AbsoluteUrl => value as AbsoluteUrl;
export const asRelativeUrl = (value: string): RelativeUrl => value as RelativeUrl;
export const asLatitude = (value: number): Latitude => value as Latitude;
export const asLongitude = (value: number): Longitude => value as Longitude;
export const asCountryCode = (value: string): CountryCode => value as CountryCode;

// Примеры использования в функциях
export function getCountryUrl(slug: Slug): RelativeUrl {
  return createRelativeUrl(`/wiki/${slug}`);
}

export function getGeoCoordinates(lat: Latitude, lng: Longitude): string {
  return `${lat},${lng}`;
}
