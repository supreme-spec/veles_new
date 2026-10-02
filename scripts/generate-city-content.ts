import { allCities } from '../src/app/cities/all-cities';
import { CITY_COORDINATES } from '../src/shared/data/cityCoordinates';
import { DEPARTURE_CITIES_DATA } from '../src/shared/data/departureCitiesData';
import { RUSSIAN_AIRPORTS } from '../src/shared/data/russianAirports';
import fs from 'fs';
import path from 'path';

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestAirport(coords: { latitude: number; longitude: number }) {
  return RUSSIAN_AIRPORTS
    .map((a) => ({
      ...a,
      distanceKm: haversineKm(coords.latitude, coords.longitude, a.latitude, a.longitude)
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)[0] || null;
}

const FEDERAL_DISTRICTS: Record<string, { name: string }> = {
  'central': { name: 'Центральный' },
  'northwestern': { name: 'Северо-Западный' },
  'southern': { name: 'Южный' },
  'north-caucasus': { name: 'Северо-Кавказский' },
  'volgograd': { name: 'Южный' },
  'crimea': { name: 'Южный' },
  'ural': { name: 'Уральский' },
  'siberian': { name: 'Сибирский' },
  'far-eastern': { name: 'Дальневосточный' },
  'kaliningrad': { name: 'Северо-Западный' },
};

function getDistrictForRegion(region: string): string | null {
  const r = region.toLowerCase();
  if (r.includes('москва') || r.includes('московская')) return 'central';
  if (r.includes('санкт-петербург') || r.includes('ленинградская') || r.includes('калининградская') || r.includes('республика карелия') || r.includes('республика коми') || r.includes('архангельская') || r.includes('вологодская') || r.includes('калининград')) return 'northwestern';
  if (r.includes('крым') || r.includes('севастополь') || r.includes('ростовская') || r.includes('волгоградская') || r.includes('астраханская') || r.includes('краснодарский')) return 'southern';
  if (r.includes('дагестан') || r.includes('ингушетия') || r.includes('кабардино') || r.includes('карачаево') || r.includes('северная осетия') || r.includes('чеченская') || r.includes('ставропольский')) return 'north-caucasus';
  if (r.includes('свердловская') || r.includes('челябинская') || r.includes('курганская') || r.includes('тюменская') || r.includes('ханты') || r.includes('ямало') || r.includes('оренбургская')) return 'ural';
  if (r.includes('новосибирская') || r.includes('омская') || r.includes('томская') || r.includes('кемеровская') || r.includes('алтайский') || r.includes('красноярский') || r.includes('республика алтай') || r.includes('республика тыва') || r.includes('республика хакасия') || r.includes('иркутская') || r.includes('забайкальский') || r.includes('сахалинская')) return 'siberian';
  if (r.includes('приморский') || r.includes('хабаровский') || r.includes('камчатский') || r.includes('амурская') || r.includes('республика саха') || r.includes('магаданская') || r.includes('сахалинская') || r.includes('чукотский')) return 'far-eastern';
  return 'central';
}

function getDistrictName(region: string): string {
  const key = getDistrictForRegion(region);
  return key ? FEDERAL_DISTRICTS[key].name : 'Центральный';
}

function estimateFlightHours(coords: { latitude: number; longitude: number }, dest: { lat: number; lon: number }): number | null {
  const d = haversineKm(coords.latitude, coords.longitude, dest.lat, dest.lon);
  if (!d) return null;
  return Math.max(1, Math.round(d / 800 + 1.5));
}

const DEST_COORDS = {
  turkey: { lat: 36.8969, lon: 30.7133 },
  egypt: { lat: 27.2579, lon: 33.7960 },
  uae: { lat: 25.2048, lon: 55.2708 },
  thailand: { lat: 13.7367, lon: 100.5231 },
} as const;

function getLatBand(lat: number): string {
  if (lat > 60) return 'северных широтах';
  if (lat < 50) return 'юге России';
  return 'центральной полосе';
}

interface CityEntry {
  overview: string;
  highlights: string[];
  flightContext: string;
  tips: string[];
}

function generateContent(cityName: string): CityEntry {
  const coords = (CITY_COORDINATES as Record<string, any>)[cityName.toLowerCase()] || null;
  const cityData = DEPARTURE_CITIES_DATA[cityName.toLowerCase()];
  const hasRealAirport = !!cityData?.airport;
  const region = coords?.region || 'России';
  const districtName = getDistrictName(region);
  const latBand = coords ? getLatBand(coords.latitude) : 'территории России';

  let nearestAirport: { name: string; distanceKm: number; iata?: string } | null = null;
  if (!hasRealAirport && coords) {
    const na = findNearestAirport(coords);
    if (na) {
      nearestAirport = {
        name: na.name,
        distanceKm: Math.round(na.distanceKm),
        iata: na.iata
      };
    }
  }

  const airportLabel = hasRealAirport ? cityData.airport : (nearestAirport ? `${nearestAirport.name} (${nearestAirport.distanceKm} км)` : `аэропорт г. ${cityName}`);
  const flightToTurkey = cityData?.flightTimes?.turkey ? `${cityData.flightTimes.turkey} ч.` : coords ? `≈${estimateFlightHours(coords, DEST_COORDS.turkey) || 'по запросу'} ч.` : 'по запросу';
  const flightToEgypt = cityData?.flightTimes?.egypt ? `${cityData.flightTimes.egypt} ч.` : coords ? `≈${estimateFlightHours(coords, DEST_COORDS.egypt) || 'по запросу'} ч.` : 'по запросу';
  const flightToUAE = cityData?.flightTimes?.uae ? `${cityData.flightTimes.uae} ч.` : coords ? `≈${estimateFlightHours(coords, DEST_COORDS.uae) || 'по запросу'} ч.` : 'по запросу';
  const flightToThailand = cityData?.flightTimes?.thailand ? `${cityData.flightTimes.thailand} ч.` : coords ? `≈${estimateFlightHours(coords, DEST_COORDS.thailand) || 'по запросу'} ч.` : 'по запросу';

  const overview = `${cityName} — город в ${districtName} федеральном округе, ${region}. ` +
    `Географическое положение определяет удобные авиамаршруты: до Турции ${flightToTurkey}, ` +
    `до Египта ${flightToEgypt}, до ОАЭ ${flightToUAE}, до Таиланда ${flightToThailand}. ` +
    (hasRealAirport
      ? `Вылеты из ${airportLabel} упрощают доступ к популярным курортам. `
      : nearestAirport
        ? `Ближайший аэропорт — ${nearestAirport.name} (${nearestAirport.distanceKm} км). Оттуда выполняются чартерные и регулярные рейсы. `
        : `Авиапутешествия организуются из ближайших аэропортов региона. `) +
    `Мы подбираем туры с учётом сезона, цен и удобства трансфера.`;

  const highlights: string[] = [];
  if (hasRealAirport) {
    highlights.push(`Аэропорт ${airportLabel} обеспечивает прямое сообщение с курортами.`);
  } else if (nearestAirport) {
    highlights.push(`Ближайший аэропорт ${nearestAirport.name} — ${nearestAirport.distanceKm} км.`);
  }
  highlights.push(`До Антальи: ${flightToTurkey}.`);
  highlights.push(`До Хургады: ${flightToEgypt}.`);
  highlights.push(`До Дубая: ${flightToUAE}.`);
  highlights.push(`До Паттайи: ${flightToThailand}.`);

  const flightContext = `Из ${cityName} оптимально планировать вылеты в зависимости от сезона. ` +
    `Лучшее время для Турции — май–октябрь, для Египта — круглый год, для ОАЭ — ноябрь–апрель, ` +
    `для Таиланда — ноябрь–февраль. Мы учитываем эти особенности при подборе туров.`;

  const tips: string[] = [];
  if (hasRealAirport) {
    tips.push(`Уточняйте расписание прямых рейсов из ${airportLabel} заранее.`);
  } else if (nearestAirport) {
    tips.push(`Бронируйте трансфер до ${nearestAirport.name} за ${Math.round(nearestAirport.distanceKm / 100 * 2) + 2} ч. до вылета.`);
  }
  tips.push(`Для Турции и Египта бронируйте за 2–3 месяца для лучших цен.`);
  tips.push(`В зимний сезон выгоднее ОАЭ и Таиланд, летом — Турция и Египет.`);

  return { overview, highlights, flightContext, tips };
}

const allEntries: Record<string, any> = {};
for (const city of allCities) {
  allEntries[city.toLowerCase()] = generateContent(city);
}

const output = `export type CityManualContent = {
  overview?: string;
  highlights?: string[];
  flightContext?: string;
  tips?: string[];
};

export const CITY_MANUAL_CONTENT: Record<string, CityManualContent> = ${JSON.stringify(allEntries, null, 2)};

export function getCityManualContent(cityName: string): CityManualContent | undefined {
  const normalized = cityName.toLowerCase().trim();
  return CITY_MANUAL_CONTENT[normalized] || CITY_MANUAL_CONTENT[cityName.toLowerCase().trim()];
}
`;

fs.writeFileSync(path.resolve('src/shared/data/cityManualContent.ts'), output, 'utf-8');
console.log(`Wrote manual content for ${Object.keys(allEntries).length} cities`);
console.log(`First few keys: ${Object.keys(allEntries).slice(0, 5).join(', ')}`);
