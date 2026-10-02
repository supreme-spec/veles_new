/**
 * Единый источник правды (Single Source of Truth) для континентов.
 *
 * Проблема, которую решает этот файл: в кодовой базе континенты хранились
 * в двух форматах ключей одновременно — kebab-case ('north-america') и
 * camelCase ('northAmerica'). Это приводило к «сиротским» группировкам и
 * дублирующимся сущностям (например, «Прочее» в вики-странах).
 *
 * Здесь зафиксирован единственный канонический kebab-case ключ для каждого
 * континента. Любой camelCase/underscore-вариант нормализуется через
 * `normalizeContinentKey`, чтобы на выходе всегда был kebab-case.
 */
export const CONTINENTS = {
  EUROPE: 'europe',
  ASIA: 'asia',
  AFRICA: 'africa',
  NORTH_AMERICA: 'north-america',
  SOUTH_AMERICA: 'south-america',
  OCEANIA: 'oceania',
} as const;

export type ContinentSlug = (typeof CONTINENTS)[keyof typeof CONTINENTS];

export const CONTINENT_LABELS = {
  [CONTINENTS.EUROPE]: 'Европа',
  [CONTINENTS.ASIA]: 'Азия',
  [CONTINENTS.AFRICA]: 'Африка',
  [CONTINENTS.NORTH_AMERICA]: 'Северная Америка',
  [CONTINENTS.SOUTH_AMERICA]: 'Южная Америка',
  [CONTINENTS.OCEANIA]: 'Океания',
} satisfies Record<ContinentSlug, string>;

export const CONTINENT_ICONS = {
  [CONTINENTS.EUROPE]: '🇪🇺',
  [CONTINENTS.ASIA]: '🌏',
  [CONTINENTS.AFRICA]: '🌍',
  [CONTINENTS.NORTH_AMERICA]: '🌎',
  [CONTINENTS.SOUTH_AMERICA]: '🌎',
  [CONTINENTS.OCEANIA]: '🏝️',
} satisfies Record<ContinentSlug, string>;

/** Обратная карта: русское название → kebab-case ключ. */
export const CONTINENT_LABEL_TO_SLUG: Record<string, ContinentSlug> = Object.entries(
  CONTINENT_LABELS
).reduce((acc, [slug, label]) => {
  acc[label] = slug as ContinentSlug;
  return acc;
}, {} as Record<string, ContinentSlug>);

/**
 * Приводит любой вариант написания континента к каноническому kebab-case ключу.
 * Поддерживает: 'northAmerica' → 'north-america', 'north_america' → 'north-america',
 * 'australia-oceania' → 'oceania', неизвестные/пустые → 'other'.
 */
export function normalizeContinentKey(input?: string | null): ContinentSlug | 'other' {
  if (!input) return 'other';
  const slug = input.trim().toLowerCase();
  switch (slug) {
    case 'europe':
    case 'европа':
      return CONTINENTS.EUROPE;
    case 'asia':
    case 'азия':
      return CONTINENTS.ASIA;
    case 'africa':
    case 'африка':
      return CONTINENTS.AFRICA;
    case 'north-america':
    case 'north_america':
    case 'northamerica':
    case 'north america':
    case 'северная америка':
      return CONTINENTS.NORTH_AMERICA;
    case 'south-america':
    case 'south_america':
    case 'southamerica':
    case 'south america':
    case 'южная америка':
      return CONTINENTS.SOUTH_AMERICA;
    case 'oceania':
    case 'australia-oceania':
    case 'океания':
      return CONTINENTS.OCEANIA;
    default:
      return 'other';
  }
}

/** Безопасное получение русского названия континента по любому ключу. */
export function getContinentLabel(input?: string | null): string {
  const slug = normalizeContinentKey(input);
  return slug === 'other' ? 'Прочее' : (CONTINENT_LABELS[slug] || 'Прочее');
}

/** Безопасное получение иконки континента по любому ключу. */
export function getContinentIcon(input?: string | null): string {
  const slug = normalizeContinentKey(input);
  return slug === 'other' ? '🌐' : (CONTINENT_ICONS[slug] || '🌐');
}

/** Стабильный порядок континентов для сортировки в UI. */
export const CONTINENT_ORDER = [
  CONTINENTS.EUROPE,
  CONTINENTS.ASIA,
  CONTINENTS.AFRICA,
  CONTINENTS.NORTH_AMERICA,
  CONTINENTS.SOUTH_AMERICA,
  CONTINENTS.OCEANIA,
] satisfies ContinentSlug[];
