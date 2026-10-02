/**
 * Утилиты для безопасной работы с датами
 */

/**
 * Безопасное получение даты в формате YYYY-MM-DD
 * @param date - дата для форматирования (по умолчанию текущая дата)
 * @returns строка в формате YYYY-MM-DD
 */
export function getDateString(date: Date = new Date()): string {
  return date.toISOString().substring(0, 10);
}

/**
 * Безопасное получение текущей даты в формате YYYY-MM-DD
 * @param date - дата для форматирования (по умолчанию текущая дата)
 * @returns строка в формате YYYY-MM-DD
 */
export function getCurrentDateString(date?: Date): string {
  return getDateString(date);
}

/**
 * Форматирование даты для метаданных
 * @param date - дата для форматирования
 * @returns объект с отформатированными датами публикации и изменения
 */
export function formatMetadataDates(date: Date = new Date()): {
  published: string;
  modified: string;
} {
  const dateString = getDateString(date);
  return {
    published: dateString,
    modified: dateString,
  };
}

/**
 * Проверка валидности даты
 * @param date - дата для проверки
 * @returns true если дата валидна
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Безопасное создание ISO строки даты
 * @param date - дата для конвертации
 * @returns ISO строка или null если дата невалидна
 */
export function safeToISOString(date: Date): string | null {
  if (!isValidDate(date)) {
    return null;
  }
  return date.toISOString();
}

/**
 * Получение временной метки для файлов и логов
 * @returns строка с текущей временной меткой
 */
export function getTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}
