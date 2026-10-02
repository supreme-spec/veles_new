/**
 * Утилиты для валидации JSON-LD схем
 */

import type { SchemaTypeUnion } from '@/shared/types/schema';

/**
 * Валидирует базовую структуру JSON-LD схемы
 * @param schema - Схема для валидации
 * @returns true если схема валидна, false в противном случае
 */
export function validateJSONLDSchema(schema: unknown): schema is SchemaTypeUnion {
  if (!schema || typeof schema !== 'object') {
    return false;
  }

  const obj = schema as Record<string, unknown>;

  // Проверяем обязательные поля
  if (obj['@context'] !== 'https://schema.org') {
    return false;
  }

  if (!obj['@type'] || typeof obj['@type'] !== 'string') {
    return false;
  }

  return true;
}

/**
 * Валидирует массив JSON-LD схем
 * @param schemas - Массив схем для валидации
 * @returns Массив валидных схем
 */
export function validateJSONLDSchemas(
  schemas: unknown[]
): Array<Record<string, unknown>> {
  return schemas.filter((schema): schema is Record<string, unknown> => {
    return validateJSONLDSchema(schema);
  });
}

/**
 * Проверяет наличие обязательных полей для Article схемы
 * @param schema - Схема для проверки
 * @returns true если все обязательные поля присутствуют
 */
export function validateArticleSchema(schema: unknown): boolean {
  if (!validateJSONLDSchema(schema)) {
    return false;
  }

  const obj = schema as Record<string, unknown>;
  if (obj['@type'] !== 'Article') {
    return false;
  }

  const requiredFields = ['headline', 'description', 'datePublished', 'author'];
  return requiredFields.every((field) => obj[field] !== undefined);
}

/**
 * Проверяет наличие обязательных полей для Organization схемы
 * @param schema - Схема для проверки
 * @returns true если все обязательные поля присутствуют
 */
export function validateOrganizationSchema(schema: unknown): boolean {
  if (!validateJSONLDSchema(schema)) {
    return false;
  }

  const obj = schema as Record<string, unknown>;
  if (obj['@type'] !== 'Organization') {
    return false;
  }

  const requiredFields = ['name', 'url'];
  return requiredFields.every((field) => obj[field] !== undefined);
}

/**
 * Проверяет наличие обязательных полей для FAQ схемы
 * @param schema - Схема для проверки
 * @returns true если все обязательные поля присутствуют
 */
export function validateFAQSchema(schema: unknown): boolean {
  if (!validateJSONLDSchema(schema)) {
    return false;
  }

  const obj = schema as Record<string, unknown>;
  if (obj['@type'] !== 'FAQPage') {
    return false;
  }

  if (!Array.isArray(obj.mainEntity)) {
    return false;
  }

  return obj.mainEntity.length > 0;
}

