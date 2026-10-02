import { CITY_COORDINATES } from './cityCoordinates';
import { DEPARTURE_CITIES_DATA } from './departureCitiesData';
import { FEDERAL_DISTRICTS, getDistrictForRegion } from './cityCoordinates';

export type CityUniqueContent = {
  overview: string;
  highlights: string[];
  flightContext: string;
  nearbyAirports: string[];
};

type CityCoordinates = { latitude: number; longitude: number; region: string };

// Справочник очень большой (~1100 ключей), поэтому обращаемся к нему через
// Record, а не через `keyof typeof` — иначе TypeScript строит непостижимо
// сложное union-выражение и сборка падает на проверке типов.
const CITY_COORDINATES_MAP = CITY_COORDINATES as Record<string, CityCoordinates | undefined>;

function getCityCoords(cityName: string): CityCoordinates | null {
  const key = cityName.toLowerCase();
  const direct = CITY_COORDINATES_MAP[key];
  if (direct) return direct;
  const normalizedKey = key.replace(/\s+/g, '-').replace(/ё/g, 'е');
  return CITY_COORDINATES_MAP[normalizedKey] || null;
}

function getDistrictName(region?: string): string {
  if (!region) return 'Российской Федерации';
  const district = getDistrictForRegion(region);
  return district ? FEDERAL_DISTRICTS[district].name : 'Российской Федерации';
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const DEST_COORDS = {
  turkey: { lat: 36.8969, lon: 30.7133 },
  egypt: { lat: 27.2579, lon: 33.7960 },
  uae: { lat: 25.2048, lon: 55.2708 },
  thailand: { lat: 13.7367, lon: 100.5231 },
} as const;

function estimateFlightHours(coords: { latitude: number; longitude: number }, dest: { lat: number; lon: number }): number | null {
  const d = haversineKm(coords.latitude, coords.longitude, dest.lat, dest.lon);
  if (!d) return null;
  return Math.max(1, Math.round(d / 800 + 1.5));
}

function getNearestAirport(coords: { latitude: number; longitude: number }) {
  const { RUSSIAN_AIRPORTS } = require('@/shared/data/russianAirports');
  const excluded = new Set(['москва', 'жуковский']);
  const majorAirports = (RUSSIAN_AIRPORTS as Array<{ name: string; iata?: string; latitude: number; longitude: number; citySlug: string }>)
    .filter(a => !excluded.has(a.citySlug) && !a.iata?.startsWith('RU-') && a.iata !== '')
    .map((a) => ({
      ...a,
      distanceKm: haversineKm(coords.latitude, coords.longitude, a.latitude, a.longitude)
    }))
    .sort((a: any, b: any) => a.distanceKm - b.distanceKm);
  
  if (majorAirports.length > 0 && (majorAirports[0] as any)?.distanceKm < 300) {
    return majorAirports[0] as any;
  }
  
  const allAirports = (RUSSIAN_AIRPORTS as Array<{ name: string; iata?: string; latitude: number; longitude: number }>)
    .map((a) => ({
      ...a,
      distanceKm: haversineKm(coords.latitude, coords.longitude, a.latitude, a.longitude)
    }))
    .sort((a: any, b: any) => a.distanceKm - b.distanceKm);
  
  return (allAirports[0] as any) || null;
}

export function getCityUniqueContent(cityName: string): CityUniqueContent | null {
  const coords = getCityCoords(cityName);
  if (!coords) return null;

  const region = coords.region;
  const districtName = getDistrictName(region);
  const cityData = DEPARTURE_CITIES_DATA[cityName.toLowerCase()];
  const hasRealAirport = !!cityData?.airport;
  const airportLabel = cityData?.airport || 'ближайшие аэропорты региона';
  const nearestAirport = !hasRealAirport ? getNearestAirport(coords) : null;

  const flightToTurkey = cityData?.flightTimes?.turkey ? `${cityData.flightTimes.turkey} ч.` : estimateFlightHours(coords, DEST_COORDS.turkey) ? `≈${estimateFlightHours(coords, DEST_COORDS.turkey)} ч.` : 'по запросу';
  const flightToEgypt = cityData?.flightTimes?.egypt ? `${cityData.flightTimes.egypt} ч.` : estimateFlightHours(coords, DEST_COORDS.egypt) ? `≈${estimateFlightHours(coords, DEST_COORDS.egypt)} ч.` : 'по запросу';
  const flightToUAE = cityData?.flightTimes?.uae ? `${cityData.flightTimes.uae} ч.` : estimateFlightHours(coords, DEST_COORDS.uae) ? `≈${estimateFlightHours(coords, DEST_COORDS.uae)} ч.` : 'по запросу';
  const flightToThailand = cityData?.flightTimes?.thailand ? `${cityData.flightTimes.thailand} ч.` : estimateFlightHours(coords, DEST_COORDS.thailand) ? `≈${estimateFlightHours(coords, DEST_COORDS.thailand)} ч.` : 'по запросу';

  const overview = `${cityName} — город в ${districtName} федеральном округе, ${region}. ` +
    `Географическое положение определяет удобные маршруты: до Турции ${flightToTurkey}, ` +
    `до Египта ${flightToEgypt}, до ОАЭ ${flightToUAE}, до Таиланда ${flightToThailand}. ` +
    (hasRealAirport
      ? `Прямые чартерные и регулярные рейсы из ${airportLabel} открывают доступ к популярным курортам. `
      : nearestAirport
        ? `Ближайший аэропорт — ${nearestAirport.name} (${Math.round(nearestAirport.distanceKm)} км). Оттуда выполняются чартерные и регулярные рейсы. `
        : `Авиапутешествия организуются из ближайших аэропортов региона. `) +
    `Мы подбираем туры с учётом сезона, цен и удобства трансфера.`;

  const highlights: string[] = [];
  if (hasRealAirport) {
    highlights.push(`Аэропорт ${airportLabel} обеспечивает прямое сообщение с курортами.`);
  } else if (nearestAirport) {
    highlights.push(`Ближайший аэропорт ${nearestAirport.name} — ${Math.round(nearestAirport.distanceKm)} км.`);
  }
  highlights.push(`До Антальи: ${flightToTurkey}.`);
  highlights.push(`До Хургады: ${flightToEgypt}.`);
  highlights.push(`До Дубая: ${flightToUAE}.`);

  const flightContext = `Из ${cityName} оптимально планировать вылеты в зависимости от сезона. ` +
    `Лучшее время для Турции — май–октябрь, для Египта — круглый год, для ОАЭ — ноябрь–апрель, ` +
    `для Таиланда — ноябрь–февраль. Мы учитываем эти особенности при подборе туров.`;

  const nearbyAirports: string[] = [];
  if (hasRealAirport) {
    nearbyAirports.push(airportLabel);
  }
  if (nearestAirport) {
    nearbyAirports.push(`${nearestAirport.name} (${Math.round(nearestAirport.distanceKm)} км)`);
  }

  return { overview, highlights, flightContext, nearbyAirports };
}
