/**
 * Script: update-cities.ts
 * Downloads ru-cities CSV and regenerates src/shared/data/cityCoordinates.ts
 * Source: https://github.com/epogrebnyak/ru-cities
 * License: CC-BY-SA 4.0
 */

import fs from 'fs';
import path from 'path';

const CSV_URL = 'https://raw.githubusercontent.com/epogrebnyak/ru-cities/main/assets/towns.csv';
const OUTPUT_FILE = path.join(process.cwd(), 'src/shared/data/cityCoordinates.ts');
const TEMP_CSV = path.join(process.cwd(), 'scripts/towns.csv');

interface CityRow {
  city: string;
  population: string;
  lat: string;
  lon: string;
  region_name: string;
}

function parseCSV(content: string): CityRow[] {
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  const cityIdx = headers.indexOf('city');
  const popIdx = headers.indexOf('population');
  const latIdx = headers.indexOf('lat');
  const lonIdx = headers.indexOf('lon');
  const regionIdx = headers.indexOf('region_name');

  const rows: CityRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length > Math.max(cityIdx, latIdx, lonIdx, regionIdx)) {
      rows.push({
        city: cols[cityIdx]?.trim() || '',
        population: cols[popIdx]?.trim() || '0',
        lat: cols[latIdx]?.trim() || '0',
        lon: cols[lonIdx]?.trim() || '0',
        region_name: cols[regionIdx]?.trim() || '',
      });
    }
  }
  return rows;
}

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/ё/g, 'е');
}

async function main() {
  console.log('Downloading ru-cities CSV...');
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to download CSV: ${response.status} ${response.statusText}`);
  }
  const csvText = await response.text();
  fs.writeFileSync(TEMP_CSV, csvText);
  console.log(`Downloaded ${csvText.split('\n').length - 1} cities`);

  const rows = parseCSV(csvText);
  console.log(`Parsed ${rows.length} cities`);

  // Build new coordinates map
  const newCoords: Record<string, { latitude: number; longitude: number; region: string }> = {};

  for (const row of rows) {
    if (!row.city || !row.lat || !row.lon) continue;
    const lat = parseFloat(row.lat);
    const lon = parseFloat(row.lon);
    if (isNaN(lat) || isNaN(lon)) continue;

    const key = slugify(row.city);
    newCoords[key] = {
      latitude: Math.round(lat * 10000) / 10000,
      longitude: Math.round(lon * 10000) / 10000,
      region: row.region_name || '',
    };
  }

  console.log(`Generated ${Object.keys(newCoords).length} coordinate entries`);

  // Read existing file to preserve manually added entries not in CSV
  let existingContent = '';
  if (fs.existsSync(OUTPUT_FILE)) {
    existingContent = fs.readFileSync(OUTPUT_FILE, 'utf-8');
  }

  // Generate new file content - only the data object, preserve existing helpers
  const entries = Object.entries(newCoords)
    .sort(([a], [b]) => a.localeCompare(b, 'ru'))
    .map(([key, val]) => `  '${key}': { latitude: ${val.latitude}, longitude: ${val.longitude}, region: '${val.region}' }`)
    .join(',\n');

  const fileContent = `// src/shared/data/cityCoordinates.ts
// Карта координат для городов России - автогенерировано из ru-cities
// Источник: https://github.com/epogrebnyak/ru-cities
// Лицензия: CC-BY-SA 4.0
// Обновлено: ${new Date().toISOString().split('T')[0]}

export const CITY_COORDINATES = {
${entries}
} as const;

// Типы
export type CityId = keyof typeof CITY_COORDINATES;

export interface CityData {
  latitude: number;
  longitude: number;
  region: string;
}

export type CityCoordinate = CityData;

export type CityCoordinatesMap = Record<string, CityCoordinate>;

/**
 * Нормализует название города для поиска в базе
 */
const CITY_ALIASES: Record<string, CityId> = {
  'набережные челны': 'набережные-челны',
  'нижний тагил': 'нижний-тагил',
  'великий новгород': 'великий-новгород',
  'комсомольск на амуре': 'комсомольск-на-амуре',
  'ростов на дону': 'ростов-на-дону',
  'горячий ключ': 'горячий-ключ',
  'сергиев посад': 'сергиев-посад',
  'славянск на кубани': 'славянск-на-кубани',
  'марий эл': 'марий-эл',
  'северная осетия': 'северная-осетия',
  'великие луки': 'великие-луки',
  'минеральные воды': 'минеральные-воды',
  'старый оскол': 'старый-оскол',
  'орехово зуево': 'орехово-зуево',
};

/**
 * Нормализует название города для поиска в базе
 */
export function normalizeCityKey(cityName: string): string {
  const normalized = cityName.toLowerCase().trim().replace(/\s+/g, '-');
  return CITY_ALIASES[cityName.toLowerCase().trim()] || normalized;
}

/**
 * Получает данные о городе с поддержкой алиасов
 */
export function getCityData(cityName: string): CityData | null {
  const key = normalizeCityKey(cityName);
  return CITY_COORDINATES[key as CityId] || null;
}

/**
 * Проверяет, есть ли город в базе
 */
export function cityExists(cityName: string): boolean {
  return getCityData(cityName) !== null;
}

/**
 * Получает все города по региону
 */
export function getCitiesByRegion(region: string): Array<{ name: string; data: CityData }> {
  const normalizedRegion = region.toLowerCase();
  return Object.entries(CITY_COORDINATES)
    .filter(([_, data]) => data.region.toLowerCase().includes(normalizedRegion))
    .map(([name, data]) => ({ name, data }));
}

/**
 * Получает общее количество городов в базе
 */
export function getTotalCitiesCount(): number {
  return Object.keys(CITY_COORDINATES).length;
}

/**
 * Генерирует JSON-LD схемы для городов
 */
export function generateCitySchemas(cityName: string): object[] {
  const cityData = getCityData(cityName);
  
  if (!cityData) {
    return [{
      "@context": "https://schema.org",
      "@type": "Place",
      "name": cityName,
      "description": "Informaciya o gorode " + cityName
    }];
  }
  
  return [{
    "@context": "https://schema.org",
    "@type": "Place",
    "name": cityName,
    "description": "Gorod " + cityName + ", " + cityData.region,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cityData.latitude,
      "longitude": cityData.longitude
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": cityData.region,
      "addressCountry": "RU"
    }
  }];
}
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8');
  console.log(`Written to ${OUTPUT_FILE}`);
  console.log(`Total cities: ${Object.keys(newCoords).length}`);
}

main().catch(console.error);
