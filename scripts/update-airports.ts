/**
 * Script: update-airports.ts
 * Downloads OurAirports CSV and regenerates src/shared/data/russianAirports.ts
 * Source: https://ourairports.com/data/
 * License: Public Domain
 */

import fs from 'fs';
import path from 'path';

const CSV_URL = 'https://ourairports.com/data/airports.csv';
const OUTPUT_FILE = path.join(process.cwd(), 'src/shared/data/russianAirports.ts');
const TEMP_CSV = path.join(process.cwd(), 'scripts/airports.csv');

interface AirportRow {
  ident: string;
  name: string;
  latitude_deg: string;
  longitude_deg: string;
  iso_country: string;
  scheduled_service: string;
  iata_code: string;
  municipality: string;
  type: string;
}

function parseCSV(content: string): AirportRow[] {
  const lines = content.split('\n').filter(line => line.trim());
  const headers = parseCSVLine(lines[0]);
  const rows: AirportRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length !== headers.length) continue;

    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = cols[j]?.trim() || '';
    }

    if (row.iso_country !== 'RU') continue;
    if (row.scheduled_service !== 'yes' && row.type === 'small_airport') continue;

    rows.push({
      ident: row.ident || '',
      name: row.name || '',
      latitude_deg: row.latitude_deg || '0',
      longitude_deg: row.longitude_deg || '0',
      iso_country: row.iso_country || '',
      scheduled_service: row.scheduled_service || '',
      iata_code: row.iata_code || '',
      municipality: row.municipality || '',
      type: row.type || '',
    });
  }
  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/ё/g, 'е');
}

// Mapping from airport name patterns to city slugs
// Supports both Cyrillic and Latin airport names from OurAirports CSV
const AIRPORT_CITY_MAP: Array<{ pattern: string; slug: string }> = [
  { pattern: 'шереметьево', slug: 'москва' },
  { pattern: 'sheremetyevo', slug: 'москва' },
  { pattern: 'домодедово', slug: 'москва' },
  { pattern: 'domodedovo', slug: 'москва' },
  { pattern: 'внуково', slug: 'москва' },
  { pattern: 'vnukovo', slug: 'москва' },
  { pattern: 'быково', slug: 'москва' },
  { pattern: 'bykovo', slug: 'москва' },
  { pattern: 'пулково', slug: 'санкт-петербург' },
  { pattern: 'pulkovo', slug: 'санкт-петербург' },
  { pattern: 'кольцово', slug: 'екатеринбург' },
  { pattern: 'koltsovo', slug: 'екатеринбург' },
  { pattern: 'толмачёво', slug: 'новосибирск' },
  { pattern: 'tolmachevo', slug: 'новосибирск' },
  { pattern: 'казань', slug: 'казань' },
  { pattern: 'kazan', slug: 'казань' },
  { pattern: 'уфа', slug: 'уфа' },
  { pattern: 'ufa', slug: 'уфа' },
  { pattern: 'курумоч', slug: 'самара' },
  { pattern: 'kurumoch', slug: 'самара' },
  { pattern: 'минино', slug: 'нижний-новгород' },
  { pattern: 'strigino', slug: 'нижний-новгород' },
  { pattern: 'платов', slug: 'ростов-на-дону' },
  { pattern: 'platov', slug: 'ростов-на-дону' },
  { pattern: 'сочи', slug: 'сочи' },
  { pattern: 'sochi', slug: 'сочи' },
  { pattern: 'краснодар', slug: 'краснодар' },
  { pattern: 'krasnodar', slug: 'краснодар' },
  { pattern: 'ставрополь', slug: 'ставрополь' },
  { pattern: 'stavropol', slug: 'ставрополь' },
  { pattern: 'махачкала', slug: 'махачкала' },
  { pattern: 'makhachkala', slug: 'махачкала' },
  { pattern: 'нальчик', slug: 'нальчик' },
  { pattern: 'nalchik', slug: 'нальчик' },
  { pattern: 'якутск', slug: 'якутск' },
  { pattern: 'yakutsk', slug: 'якутск' },
  { pattern: 'хабаровск', slug: 'хабаровск' },
  { pattern: 'khabarovsk', slug: 'хабаровск' },
  { pattern: 'владивосток', slug: 'владивосток' },
  { pattern: 'vladivostok', slug: 'владивосток' },
  { pattern: 'иркутск', slug: 'иркутск' },
  { pattern: 'irkutsk', slug: 'иркутск' },
  { pattern: 'новый', slug: 'кемерово' },
  { pattern: 'novy', slug: 'кемерово' },
  { pattern: 'трансаэро', slug: 'томск' },
  { pattern: 'багашево', slug: 'томск' },
  { pattern: 'омск', slug: 'омск' },
  { pattern: 'omsk', slug: 'омск' },
  { pattern: 'симферополь', slug: 'симферополь' },
  { pattern: 'simferopol', slug: 'симферополь' },
  { pattern: 'грозный', slug: 'грозный' },
  { pattern: 'grozny', slug: 'грозный' },
  { pattern: 'владикавказ', slug: 'владикавказ' },
  { pattern: 'vladikavkaz', slug: 'владикавказ' },
  { pattern: 'елизово', slug: 'петропавловск-камчатский' },
  { pattern: 'yelizovo', slug: 'петропавловск-камчатский' },
  { pattern: 'южно-сахалинск', slug: 'южно-сахалинск' },
  { pattern: 'yuzhno-sakhalinsk', slug: 'южно-сахалинск' },
  { pattern: 'благовещенск', slug: 'благовещенск' },
  { pattern: 'blagoveshchensk', slug: 'благовещенск' },
  { pattern: 'чита', slug: 'чита' },
  { pattern: 'chita', slug: 'чита' },
  { pattern: 'брянск', slug: 'брянск' },
  { pattern: 'bryansk', slug: 'брянск' },
  { pattern: 'воронеж', slug: 'воронеж' },
  { pattern: 'voronezh', slug: 'воронеж' },
  { pattern: 'белгород', slug: 'белгород' },
  { pattern: 'belgorod', slug: 'белгород' },
  { pattern: 'курск', slug: 'курск' },
  { pattern: 'kursk', slug: 'курск' },
  { pattern: 'липецк', slug: 'липецк' },
  { pattern: 'lipetsk', slug: 'липецк' },
  { pattern: 'тамбов', slug: 'тамбов' },
  { pattern: 'tambov', slug: 'тамбов' },
  { pattern: 'пенза', slug: 'пенза' },
  { pattern: 'penza', slug: 'пенза' },
  { pattern: 'саранск', slug: 'саранск' },
  { pattern: 'saransk', slug: 'саранск' },
  { pattern: 'чебоксары', slug: 'чебоксары' },
  { pattern: 'cheboksary', slug: 'чебоксары' },
  { pattern: 'йошкар-ола', slug: 'йошкар-ола' },
  { pattern: 'yoshkar-ola', slug: 'йошкар-ола' },
  { pattern: 'ульяновск', slug: 'ульяновск' },
  { pattern: 'ulyanovsk', slug: 'ульяновск' },
  { pattern: 'саратов', slug: 'саратов' },
  { pattern: 'saratov', slug: 'саратов' },
  { pattern: 'волгоград', slug: 'волгоград' },
  { pattern: 'volgograd', slug: 'волгоград' },
  { pattern: 'астрахань', slug: 'астрахань' },
  { pattern: 'astrakhan', slug: 'астрахань' },
  { pattern: 'элиста', slug: 'элиста' },
  { pattern: 'elista', slug: 'элиста' },
  { pattern: 'геленджик', slug: 'геленджик' },
  { pattern: 'gelendzhik', slug: 'геленджик' },
  { pattern: 'анапа', slug: 'анапа' },
  { pattern: 'anapa', slug: 'анапа' },
  { pattern: 'керчь', slug: 'керчь' },
  { pattern: 'kerch', slug: 'керчь' },
  { pattern: 'евпатория', slug: 'евпатория' },
  { pattern: 'evpatoriya', slug: 'евпатория' },
  { pattern: 'ялта', slug: 'ялта' },
  { pattern: 'yalta', slug: 'ялта' },
  { pattern: 'севастополь', slug: 'севастополь' },
  { pattern: 'sevastopol', slug: 'севастополь' },
  { pattern: 'мурманск', slug: 'мурманск' },
  { pattern: 'murmansk', slug: 'мурманск' },
  { pattern: 'петрозаводск', slug: 'петрозаводск' },
  { pattern: 'petrozavodsk', slug: 'петрозаводск' },
  { pattern: 'сыктывкар', slug: 'сыктывкар' },
  { pattern: 'syktyvkar', slug: 'сыктывкар' },
  { pattern: 'архангельск', slug: 'архангельск' },
  { pattern: 'arkhangelsk', slug: 'архангельск' },
  { pattern: 'нарьян-мар', slug: 'нарьян-мар' },
  { pattern: 'naryan-mar', slug: 'нарьян-мар' },
  { pattern: 'салехард', slug: 'салехард' },
  { pattern: 'salekhard', slug: 'салехард' },
  { pattern: 'ноябрьск', slug: 'ноябрьск' },
  { pattern: 'noyabrsk', slug: 'ноябрьск' },
  { pattern: 'новый урengой', slug: 'новый-уренгой' },
  { pattern: 'novy urengoy', slug: 'новый-уренгой' },
  { pattern: 'сургут', slug: 'сургут' },
  { pattern: 'surgut', slug: 'сургут' },
  { pattern: 'нижневартовск', slug: 'нижневартовск' },
  { pattern: 'nizhnevartovsk', slug: 'нижневартовск' },
  { pattern: 'ханты-мансийск', slug: 'ханты-мансийск' },
  { pattern: 'khanty-mansiysk', slug: 'ханты-мансийск' },
  { pattern: 'когалым', slug: 'когалым' },
  { pattern: 'kogalym', slug: 'когалым' },
  { pattern: 'лангепас', slug: 'лангепас' },
  { pattern: 'langepas', slug: 'лангепас' },
  { pattern: 'урай', slug: 'урай' },
  { pattern: 'uray', slug: 'урай' },
  { pattern: 'радужный', slug: 'радужный' },
  { pattern: 'raduzhny', slug: 'радужный' },
  { pattern: 'пыть-ях', slug: 'пыть-ях' },
  { pattern: 'pyt-yakh', slug: 'пыть-ях' },
  { pattern: 'тарко-сале', slug: 'тарко-сале' },
  { pattern: 'tarko-sale', slug: 'тарко-сале' },
  { pattern: 'надым', slug: 'надым' },
  { pattern: 'nadym', slug: 'надым' },
  { pattern: 'тобольск', slug: 'тобольск' },
  { pattern: 'tobolsk', slug: 'тобольск' },
  { pattern: 'тюмень', slug: 'тюмень' },
  { pattern: 'tyumen', slug: 'тюмень' },
  { pattern: 'ишим', slug: 'ишим' },
  { pattern: 'ishim', slug: 'ишим' },
  { pattern: 'ялуторовск', slug: 'ялуторовск' },
  { pattern: 'yalutorovsk', slug: 'ялуторовск' },
  { pattern: 'заводоуковск', slug: 'заводоуковск' },
  { pattern: 'zavodoukovsk', slug: 'заводоуковск' },
  { pattern: 'курган', slug: 'курган' },
  { pattern: 'kurgan', slug: 'курган' },
  { pattern: 'челябинск', slug: 'челябинск' },
  { pattern: 'chelyabinsk', slug: 'челябинск' },
  { pattern: 'магнитогорск', slug: 'магнитогорск' },
  { pattern: 'magnitogorsk', slug: 'магнитогорск' },
  { pattern: 'миасс', slug: 'миасс' },
  { pattern: 'miass', slug: 'миасс' },
  { pattern: 'златоуст', slug: 'златоуст' },
  { pattern: 'zlatoust', slug: 'златоуст' },
  { pattern: 'копейск', slug: 'копейск' },
  { pattern: 'kopeysk', slug: 'копейск' },
  { pattern: 'орск', slug: 'орск' },
  { pattern: 'orsk', slug: 'орск' },
  { pattern: 'оренбург', slug: 'оренбург' },
  { pattern: 'orenburg', slug: 'оренбург' },
  { pattern: 'калуга', slug: 'калуга' },
  { pattern: 'kaluga', slug: 'калуга' },
  { pattern: 'смоленск', slug: 'смоленск' },
  { pattern: 'smolensk', slug: 'смоленск' },
  { pattern: 'владимир', slug: 'владимир' },
  { pattern: 'vladimir', slug: 'владимир' },
  { pattern: 'иваново', slug: 'иваново' },
  { pattern: 'ivanovo', slug: 'иваново' },
  { pattern: 'кострома', slug: 'кострома' },
  { pattern: 'kostroma', slug: 'кострома' },
  { pattern: 'вологда', slug: 'вологда' },
  { pattern: 'vologda', slug: 'вологда' },
  { pattern: 'гатчина', slug: 'гатчина' },
  { pattern: 'gatchina', slug: 'гатчина' },
  { pattern: 'тверь', slug: 'тверь' },
  { pattern: 'tver', slug: 'тверь' },
  { pattern: 'калининград', slug: 'калининград' },
  { pattern: 'kaliningrad', slug: 'калининград' },
  { pattern: 'абакан', slug: 'абакан' },
  { pattern: 'abakan', slug: 'абакан' },
  { pattern: 'барнаул', slug: 'барнаул' },
  { pattern: 'barnaul', slug: 'барнаул' },
  { pattern: 'красноярск', slug: 'красноярск' },
  { pattern: 'krasnoyarsk', slug: 'красноярск' },
  { pattern: 'улан-удэ', slug: 'улан-удэ' },
  { pattern: 'ulan-ude', slug: 'улан-удэ' },
  { pattern: 'петропавловск-камчатский', slug: 'петропавловск-камчатский' },
  { pattern: 'petropavlovsk-kamchatsky', slug: 'петропавловск-камчатский' },
  { pattern: 'анадырь', slug: 'анадырь' },
  { pattern: 'anadyr', slug: 'анадырь' },
  { pattern: 'магадан', slug: 'магадан' },
  { pattern: 'magadan', slug: 'магадан' },
  { pattern: 'норильск', slug: 'норильск' },
  { pattern: 'norilsk', slug: 'норильск' },
  { pattern: 'кемерово', slug: 'кемерово' },
  { pattern: 'kemerovo', slug: 'кемерово' },
  { pattern: 'томск', slug: 'томск' },
  { pattern: 'tomsk', slug: 'томск' },
  { pattern: 'омск', slug: 'омск' },
  { pattern: 'omsk', slug: 'омск' },
  { pattern: 'новосибирск', slug: 'новосибирск' },
  { pattern: 'novosibirsk', slug: 'новосибирск' },
];

function getCitySlug(airportName: string, municipality: string): string | null {
  const nameLower = airportName.toLowerCase().replace(/[^а-яёa-z0-9\s-]/g, ' ').trim();
  const munLower = municipality.toLowerCase().trim();
  
  // Check municipality first (more reliable)
  for (const entry of AIRPORT_CITY_MAP) {
    if (munLower === entry.pattern || munLower.includes(entry.pattern)) {
      return entry.slug;
    }
  }
  
  // Check airport name
  for (const entry of AIRPORT_CITY_MAP) {
    if (nameLower === entry.pattern || nameLower.startsWith(entry.pattern)) {
      return entry.slug;
    }
  }
  
  return null;
}

async function main() {
  console.log('Downloading OurAirports CSV...');
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to download CSV: ${response.status} ${response.statusText}`);
  }
  const csvText = await response.text();
  fs.writeFileSync(TEMP_CSV, csvText);
  console.log(`Downloaded ${(csvText.length / 1024 / 1024).toFixed(1)} MB`);

  const rows = parseCSV(csvText);
  console.log(`Found ${rows.length} Russian airports with scheduled service`);

  const newAirports: Array<{
    name: string;
    iata: string;
    citySlug: string;
    latitude: number;
    longitude: number;
  }> = [];

  const seen = new Set<string>();

  for (const row of rows) {
    const lat = parseFloat(row.latitude_deg);
    const lon = parseFloat(row.longitude_deg);
    if (isNaN(lat) || isNaN(lon)) continue;
    if (lat === 0 && lon === 0) continue;

    const citySlug = getCitySlug(row.name, row.municipality);
    if (!citySlug || seen.has(citySlug)) continue;

    seen.add(citySlug);

    newAirports.push({
      name: row.name.replace(/'/g, "\\'"),
      iata: row.iata_code || row.ident || '',
      citySlug,
      latitude: Math.round(lat * 10000) / 10000,
      longitude: Math.round(lon * 10000) / 10000,
    });
  }

  console.log(`Generated ${newAirports.length} airport entries`);

  const entries = newAirports
    .sort((a, b) => a.citySlug.localeCompare(b.citySlug, 'ru'))
    .map(a => `  { name: '${a.name}', iata: '${a.iata}', citySlug: '${a.citySlug}', latitude: ${a.latitude}, longitude: ${a.longitude} }`)
    .join(',\n');

  const fileContent = `// src/shared/data/russianAirports.ts
// Гражданские аэропорты РФ с координатами и IATA-кодами.
// Источник: OurAirports (https://ourairports.com/data/)
// Лицензия: Public Domain
// Обновлено: ${new Date().toISOString().split('T')[0]}

export interface RussianAirport {
  name: string;
  iata: string;
  citySlug: string;
  latitude: number;
  longitude: number;
}

export const RUSSIAN_AIRPORTS: RussianAirport[] = [
${entries}
];
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8');
  console.log(`Written to ${OUTPUT_FILE}`);
}

main().catch(console.error);
