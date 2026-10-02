import { wikiPages } from '@/shared/data/wikiPages';

export interface Place {
  name: string;
  lat: number;
  lng: number;
  type: 'city' | 'attraction' | 'resort' | 'airport';
  description?: string;
  countryId: string;
  countryName: string;
}

// Функция для получения мест из CountryMapIntegration
// Это упрощенная версия - в реальности нужно импортировать getDefaultPlaces из компонента
// Но так как это client component, создадим отдельную функцию
const getPlacesForCountry = (countryId: string): Place[] => {
  const country = wikiPages[countryId];
  if (!country) return [];

  // Здесь мы будем использовать данные из CountryMapIntegration
  // Для упрощения создадим базовый набор мест на основе известных стран
  const placesMap: Record<string, Place[]> = {
    'abkhaziya-gid': [
      {
        name: 'Сухум',
        lat: 42.9849,
        lng: 41.0201,
        type: 'city' as const,
        description: 'Столица Абхазии',
        countryId,
        countryName: country.title,
      },
      {
        name: 'Гагра',
        lat: 43.2756,
        lng: 40.2697,
        type: 'resort' as const,
        description: 'Популярный курорт',
        countryId,
        countryName: country.title,
      },
      {
        name: 'Новый Афон',
        lat: 43.0864,
        lng: 40.0989,
        type: 'attraction' as const,
        description: 'Монастырь и пещера',
        countryId,
        countryName: country.title,
      },
      {
        name: 'Озеро Рица',
        lat: 43.4803,
        lng: 40.5183,
        type: 'attraction' as const,
        description: 'Горное озеро',
        countryId,
        countryName: country.title,
      },
    ],
    russia: [
      {
        name: 'Москва',
        lat: 55.7558,
        lng: 37.6176,
        type: 'city' as const,
        description: 'Столица России',
        countryId,
        countryName: country.title,
      },
      {
        name: 'Санкт-Петербург',
        lat: 59.9311,
        lng: 30.3609,
        type: 'city' as const,
        description: 'Северная столица',
        countryId,
        countryName: country.title,
      },
      {
        name: 'Озеро Байкал',
        lat: 53.5587,
        lng: 108.165,
        type: 'attraction' as const,
        description: 'Самое глубокое озеро мира',
        countryId,
        countryName: country.title,
      },
    ],
  };

  return placesMap[countryId] || [];
};

export const getAllPlaces = (): Place[] => {
  const allPlaces: Place[] = [];

  // Проходим по всем странам и собираем места
  Object.keys(wikiPages).forEach(countryId => {
    const places = getPlacesForCountry(countryId);
    allPlaces.push(...places);
  });

  return allPlaces;
};

export const getPlacesByType = (type: Place['type']): Place[] => {
  return getAllPlaces().filter(place => place.type === type);
};

export const getPlacesByCountry = (countryId: string): Place[] => {
  return getAllPlaces().filter(place => place.countryId === countryId);
};

export const getPlacesStats = () => {
  const places = getAllPlaces();
  return {
    total: places.length,
    cities: places.filter(p => p.type === 'city').length,
    attractions: places.filter(p => p.type === 'attraction').length,
    resorts: places.filter(p => p.type === 'resort').length,
    airports: places.filter(p => p.type === 'airport').length,
  };
};
