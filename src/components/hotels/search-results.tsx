'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  tag?: string;
  description: string;
  latitude: number;
  longitude: number;
  propertyType: string;
}

interface RoomOption {
  id: string;
  name: string;
  capacity: number;
  size: string;
  beds: string;
  meal: string;
  cancellation: string;
  price: number;
  refundable: boolean;
}

const MOCK_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Гранд-Отель Метрополь',
    address: 'Театральный проезд, 2',
    city: 'Москва',
    country: 'Россия',
    stars: 5,
    rating: 9.4,
    reviewsCount: 1420,
    pricePerNight: 12500,
    image: '/images/archive/hotels/hotel-1.jpg',
    amenities: ['Бассейн', 'Спа', 'Завтрак', 'Wi-Fi', 'Фитнес'],
    tag: 'Выбор путешественников',
    description: 'Легендарный отель в центре Москвы с великолепным сервисом и исторической архитектурой.',
    latitude: 55.7576,
    longitude: 37.6184,
    propertyType: 'Hotel'
  },
  {
    id: '2',
    name: 'Велес Вояж Спа & Резорт',
    address: 'Курортный проспект, 84',
    city: 'Сочи',
    country: 'Россия',
    stars: 5,
    rating: 9.8,
    reviewsCount: 840,
    pricePerNight: 18900,
    image: '/images/archive/hotels/hotel-2.jpg',
    amenities: ['Первая линия', 'Бассейн', 'Спа', 'All Inclusive', 'Пляж'],
    tag: 'Эксклюзив бренда',
    description: 'Премиум-курорт на берегу Черного моря с полным спектром услуг для отдыха.',
    latitude: 43.5853,
    longitude: 39.7231,
    propertyType: 'Resort'
  },
  {
    id: '3',
    name: 'Балтийская Жемчужина',
    address: 'ул. Большая Морская, 22',
    city: 'Санкт-Петербург',
    country: 'Россия',
    stars: 4,
    rating: 9.1,
    reviewsCount: 980,
    pricePerNight: 8900,
    image: '/images/archive/hotels/hotel-3.jpg',
    amenities: ['Wi-Fi', 'Завтрак', 'Парковка', 'Ресторан'],
    description: 'Бутик-отель в историческом центре Санкт-Петербурга рядом с Эрмитажем.',
    latitude: 59.9343,
    longitude: 30.3351,
    propertyType: 'Boutique'
  },
  {
    id: '4',
    name: 'Азов Плаза',
    address: 'ул. Набережная, 12',
    city: 'Ростов-на-Дону',
    country: 'Россия',
    stars: 4,
    rating: 8.7,
    reviewsCount: 650,
    pricePerNight: 6500,
    image: '/images/archive/hotels/hotel-4.jpg',
    amenities: ['Бассейн', 'Wi-Fi', 'Трансфер', 'Конференц-зал'],
    description: 'Современный бизнес-отель с видом на реку Дон.',
    latitude: 47.2357,
    longitude: 39.7015,
    propertyType: 'Business'
  },
  {
    id: '5',
    name: 'Алтайский Утес',
    address: 'ул. Горная, 45',
    city: 'Горно-Алтайск',
    country: 'Россия',
    stars: 3,
    rating: 8.9,
    reviewsCount: 320,
    pricePerNight: 4200,
    image: '/images/archive/hotels/hotel-5.jpg',
    amenities: ['Усадьба', 'Хамам', 'Экскурсии', 'Wi-Fi'],
    description: 'Уютный горный отель с панорамными видами на Алтай.',
    latitude: 51.9581,
    longitude: 85.9603,
    propertyType: 'Lodge'
  },
  {
    id: '6',
    name: 'Крымская Звезда',
    address: 'Набережная им. 60-летия СССР, 8',
    city: 'Ялта',
    country: 'Россия',
    stars: 5,
    rating: 9.3,
    reviewsCount: 1100,
    pricePerNight: 15600,
    image: '/images/archive/hotels/hotel-6.jpg',
    amenities: ['Пляж', 'Бассейн', 'Спа', 'Анимация', 'All Inclusive'],
    tag: 'Популярный',
    description: 'Гостиница высокого класса на набережной Ялты с собственным пляжем.',
    latitude: 44.4952,
    longitude: 34.1663,
    propertyType: 'Resort'
  }
];

const MOCK_ROOMS: Record<string, RoomOption[]> = {
  '1': [
    {
      id: 'opt_1_1',
      name: 'Улучшенный двухместный номер (Superior Room)',
      capacity: 2,
      size: '32 м²',
      beds: '1 большая двуспальная кровать',
      meal: 'Завтрак «Шведский стол» включен',
      cancellation: 'Бесплатная отмена до 18:00 дня заезда',
      price: 14200,
      refundable: true
    },
    {
      id: 'opt_1_2',
      name: 'Стандартный двухместный номер',
      capacity: 2,
      size: '24 м²',
      beds: '2 отдельные кровати',
      meal: 'Без питания',
      cancellation: 'Невозвратный тариф',
      price: 11900,
      refundable: false
    }
  ],
  '2': [
    {
      id: 'opt_2_1',
      name: 'Номер Делюкс с видом на море',
      capacity: 2,
      size: '45 м²',
      beds: '1 king-size кровать',
      meal: 'All Inclusive',
      cancellation: 'Бесплатная отмена за 7 дней',
      price: 25000,
      refundable: true
    }
  ]
};

interface SearchFilters {
  query: string;
  stars: number[];
  amenities: string[];
  priceRange: [number, number];
}

interface HotelSearchSERPProps {
  filters: SearchFilters;
}

export const HotelSearchSERP = ({ filters }: HotelSearchSERPProps) => {
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  const filteredHotels = useMemo(() => {
    let results = [...MOCK_HOTELS];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(
        h =>
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.country.toLowerCase().includes(q)
      );
    }

    if (filters.stars.length > 0) {
      results = results.filter(h => filters.stars.includes(h.stars));
    }

    if (filters.amenities.length > 0) {
      results = results.filter(h =>
        filters.amenities.every(a => h.amenities.includes(a))
      );
    }

    results = results.filter(h => h.pricePerNight >= filters.priceRange[0] && h.pricePerNight <= filters.priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price-desc':
        results.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return results;
  }, [filters, sortBy]);

  const selectedRooms: RoomOption[] = selectedHotelId ? MOCK_ROOMS[selectedHotelId] || [] : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="text-xs text-slate-400 flex gap-2 mb-2">
            <span>Главная</span>
            <span>/</span>
            <span>Отели</span>
            <span>/</span>
            <span className="text-slate-600">Результаты поиска</span>
          </nav>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Найдено {filteredHotels.length} отелей
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4">Количество звезд</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((star) => (
                  <label key={star} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="rounded border-slate-200 text-blue-900 focus:ring-blue-900 h-4 w-4"
                      checked={filters.stars.includes(star)}
                      onChange={() => {}}
                    />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 flex items-center gap-1">
                      {star} ★
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4">Популярные удобства</h3>
              <div className="space-y-2">
                {['Бассейн', 'Спа-комплекс', 'Завтрак включен', 'Пляж', 'Wi-Fi', 'Парковка'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-200 text-blue-900 focus:ring-blue-900 h-4 w-4" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center text-sm">
              <span className="text-slate-500">Сортировка:</span>
              <div className="flex gap-4">
                <button
                  onClick={() => setSortBy('popular')}
                  className={`font-bold pb-1 border-b-2 transition ${sortBy === 'popular' ? 'text-blue-900 border-blue-900' : 'text-slate-500 hover:text-slate-900 border-transparent'}`}
                >
                  Сначала популярные
                </button>
                <button
                  onClick={() => setSortBy('price-asc')}
                  className={`font-bold pb-1 border-b-2 transition ${sortBy === 'price-asc' ? 'text-blue-900 border-blue-900' : 'text-slate-500 hover:text-slate-900 border-transparent'}`}
                >
                  Низкая цена вначале
                </button>
                <button
                  onClick={() => setSortBy('rating')}
                  className={`font-bold pb-1 border-b-2 transition ${sortBy === 'rating' ? 'text-blue-900 border-blue-900' : 'text-slate-500 hover:text-slate-900 border-transparent'}`}
                >
                  Высокий рейтинг
                </button>
              </div>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm text-center">
                <p className="text-slate-500 text-lg">Отели не найдены. Попробуйте изменить параметры поиска.</p>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="relative w-full md:w-80 h-64 md:h-auto min-h-[240px] bg-slate-100 overflow-hidden group">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {hotel.tag && (
                      <span className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                        {hotel.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex gap-0.5 mb-1.5">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <span key={i} className="text-amber-500 text-sm">★</span>
                            ))}
                          </div>
                          <h2 className="text-xl font-extrabold text-slate-900 hover:text-blue-900 transition-colors cursor-pointer">
                            {hotel.name}
                          </h2>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            📍 {hotel.address}, {hotel.city}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <div>
                            <p className="font-extrabold text-sm text-slate-900">Превосходно</p>
                            <p className="text-xs text-slate-400">{hotel.reviewsCount} отзывов</p>
                          </div>
                          <div className="bg-blue-900 text-white font-black px-3 py-2 rounded-xl text-lg shadow-sm">
                            {hotel.rating}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {hotel.amenities.map((item, idx) => (
                          <span key={idx} className="bg-slate-50 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-end">
                      <div>
                        <span className="text-xs text-slate-400 block">Цена за 1 ночь</span>
                        <span className="text-2xl font-black text-slate-900">{hotel.pricePerNight.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <button
                        onClick={() => setSelectedHotelId(selectedHotelId === hotel.id ? null : hotel.id)}
                        className="bg-slate-900 hover:bg-blue-900 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all duration-300"
                      >
                        {selectedHotelId === hotel.id ? 'Скрыть номера' : 'Выбрать номер'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {selectedHotelId && selectedRooms.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-8">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-6">Доступные категории номеров</h2>
                <div className="border border-slate-150 rounded-xl overflow-hidden">
                  {selectedRooms.map((room) => (
                    <div key={room.id} className="grid grid-cols-1 md:grid-cols-4 border-b last:border-0 border-slate-150 p-4 md:p-6 gap-4 md:gap-0 items-start">
                      <div className="space-y-2 pr-4">
                        <h3 className="font-extrabold text-base text-slate-900">{room.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">📐 {room.size} | 👤 Вместимость: {room.capacity}</p>
                        <p className="text-xs text-slate-600">🛏 {room.beds}</p>
                      </div>
                      <div className="md:col-span-3 space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center border-t md:border-t-0 pt-4 md:pt-0 first:pt-0 first:border-0 border-slate-100">
                          <div className="text-sm font-semibold text-slate-700">
                            <span className="flex items-center gap-1.5 text-emerald-600">
                              🍳 {room.meal}
                            </span>
                          </div>
                          <div className="text-xs">
                            {room.refundable ? (
                              <span className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                                ✓ {room.cancellation}
                              </span>
                            ) : (
                              <span className="bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-full">
                                ✕ {room.cancellation}
                              </span>
                            )}
                          </div>
                          <div className="text-right flex md:flex-col justify-between md:justify-center items-center md:items-end gap-2 md:gap-0">
                            <div>
                              <span className="text-2xl font-black text-slate-900">{room.price.toLocaleString('ru-RU')} ₽</span>
                              <span className="text-xs text-slate-400 block">за ночь</span>
                            </div>
                            <button className="bg-blue-900 hover:bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm hover:shadow transition-all duration-300 uppercase tracking-wider">
                              Забронировать
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
