'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { type PlaceWithCountry as Place } from '@/shared/types/places';

interface PlacesFilterProps {
  allPlaces: Place[];
  countries: Array<{ id: string; name: string }>;
  pageSize?: number;
}

export function PlacesFilter({ allPlaces, countries, pageSize = 48 }: PlacesFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<Place['type'] | 'all'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [mapProvider, setMapProvider] = useState<'yandex' | 'google' | 'osm'>('yandex');
  const [page, setPage] = useState(0);

  const filteredPlaces = useMemo(() => {
    return allPlaces.filter(place => {
      const matchesSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.countryName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || place.type === selectedType;
      const matchesCountry = selectedCountry === 'all' || place.countryId === selectedCountry;

      return matchesSearch && matchesType && matchesCountry;
    });
  }, [allPlaces, searchQuery, selectedType, selectedCountry]);

  const totalPages = Math.max(1, Math.ceil(filteredPlaces.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const paginatedPlaces = filteredPlaces.slice(safePage * pageSize, (safePage + 1) * pageSize);

  const stats = useMemo(() => {
    const places = filteredPlaces;
    return {
      total: places.length,
      cities: places.filter(p => p.type === 'city').length,
      attractions: places.filter(p => p.type === 'attraction').length,
      resorts: places.filter(p => p.type === 'resort').length,
      airports: places.filter(p => p.type === 'airport').length,
    };
  }, [filteredPlaces]);

  const generateMapUrl = (place: Place) => {
    const { lat, lng, name } = place;
    switch (mapProvider) {
      case 'yandex':
        return `https://yandex.ru/maps/?pt=${lng},${lat}&z=12&l=map&text=${encodeURIComponent(name)}`;
      case 'google':
        return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
      case 'osm':
        return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=12#map=12/${lat}/${lng}`;
      default:
        return `https://yandex.ru/maps/?pt=${lng},${lat}&z=12`;
    }
  };

  const typeLabels = {
    city: '🏙️ Города',
    attraction: '⭐ Достопримечательности',
    resort: '🏖️ Курорты',
    airport: '✈️ Аэропорты',
  };

  const typeColors = {
    city: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800',
    attraction: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-800',
    resort: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800',
    airport: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Всего мест</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-1">{stats.cities}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Городов</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-1">{stats.attractions}</div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Достопримечательностей</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800 p-4 text-center">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-300 mb-1">{stats.resorts}</div>
          <div className="text-sm text-amber-700 dark:text-amber-300">Курортов</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-1">{stats.airports}</div>
          <div className="text-sm text-gray-700 dark:text-gray-400">Аэропортов</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🔍 Поиск</label>
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage(0); }}
              placeholder="Название места, описание или страна..."
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">📍 Тип места</label>
            <select
              value={selectedType}
              onChange={e => { setSelectedType(e.target.value as Place['type'] | 'all'); setPage(0); }}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Все типы</option>
              <option value="city">🏙️ Города</option>
              <option value="attraction">⭐ Достопримечательности</option>
              <option value="resort">🏖️ Курорты</option>
              <option value="airport">✈️ Аэропорты</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🌍 Страна</label>
            <select
              value={selectedCountry}
              onChange={e => { setSelectedCountry(e.target.value); setPage(0); }}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Все страны</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Карта:</span>
          <div className="flex gap-2">
            {(['yandex', 'google', 'osm'] as const).map(provider => (
              <button
                key={provider}
                onClick={() => setMapProvider(provider)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${mapProvider === provider
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {provider === 'yandex'
                  ? '🗺️ Яндекс'
                  : provider === 'google'
                    ? '🗺️ Google'
                    : '🗺️ OSM'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {paginatedPlaces.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPlaces.map((place, index) => (
              <div
                key={`${place.countryId}-${place.name}-${index}`}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{place.name}</h3>
                    <Link
                      href={`/wiki/${place.countryId}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {place.countryName}
                    </Link>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium border ${typeColors[place.type]}`}
                  >
                    {typeLabels[place.type]}
                  </span>
                </div>

                {place.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{place.description}</p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span>
                    📍 {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={generateMapUrl(place)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    🗺️ Открыть на карте
                  </a>
                  <Link
                    href={`/wiki/${place.countryId}`}
                    className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
                  >
                    📖 О стране
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={safePage === 0}
                aria-label="Назад"
                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white border border-transparent rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <span aria-hidden="true">←</span>
                <span>Назад</span>
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Страница {safePage + 1} из {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={safePage >= totalPages - 1}
                aria-label="Вперёд"
                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white border border-transparent rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <span>Вперёд</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Места не найдены</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {allPlaces.length === 0
              ? 'Данные о местах загружаются. Скоро здесь появится интерактивная карта всех ключевых мест мира!'
              : 'Попробуйте изменить параметры поиска или фильтры.'}
          </p>
          {allPlaces.length === 0 && (
            <Link
              href="/wiki/countries"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              🌍 Перейти к странам мира
            </Link>
          )}
        </div>
      )}
    </>
  );
}
