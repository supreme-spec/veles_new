'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { SearchFilters, type Filters } from '@/components/hotels/SearchFilters';
import { HotelMap, type HotelMapPoint } from '@/components/hotels/HotelMap';
import { OptimizedHotelImage } from '@/components/hotels/OptimizedHotelImage';
import { BookingForm } from '@/components/BookingForm';
import { formatPrice, getMealTypeLabel, formatCancellationDate } from '@/lib/price-helpers';
import { analytics } from '@/lib/analytics';

interface Suggestion {
  text: string;
  city?: string;
  country?: string;
  hotelSlug?: string;
  type: 'city' | 'hotel';
  source?: string;
}

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  stars?: number | null;
  images?: any[];
  ostrovokHid?: number;
  slug?: string;
  minPrice?: number | null;
  taxesIncluded?: boolean | null;
  mealType?: string | null;
  freeCancellationBefore?: string | Date | null;
  amenities?: string[];
  availability?: boolean;
}

interface HotelRate {
  book_hash?: string;
  match_hash?: string;
  meal?: string;
  room_name?: string;
  daily_prices?: string[];
  payment_options?: { payment_types?: Array<{ show_amount?: string; show_currency_code?: string; tax_data?: { taxes?: any[] } }> };
  cancellation_penalties?: any;
}

function getDefaultCheckDates() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 4);
  return {
    checkin: tomorrow.toISOString().split('T')[0],
    checkout: dayAfter.toISOString().split('T')[0],
  };
}

const defaultDates = getDefaultCheckDates();

const CITIES = [
  { name: 'Москва', country: 'Россия', slug: 'moscow', countrySlug: 'russia' },
  { name: 'Санкт-Петербург', country: 'Россия', slug: 'saint-petersburg', countrySlug: 'russia' },
  { name: 'Сочи', country: 'Россия', slug: 'sochi', countrySlug: 'russia' },
  { name: 'Казань', country: 'Россия', slug: 'kazan', countrySlug: 'russia' },
  { name: 'Дубай', country: 'ОАЭ', slug: 'dubai', countrySlug: 'uae' },
  { name: 'Стамбул', country: 'Турция', slug: 'istanbul', countrySlug: 'turkey' },
  { name: 'Бангкок', country: 'Таиланд', slug: 'bangkok', countrySlug: 'thailand' },
];

export function HotelSearch() {
  const [query, setQuery] = useState('');
  const [checkin, setCheckin] = useState(defaultDates.checkin);
  const [checkout, setCheckout] = useState(defaultDates.checkout);
  const [adults, setAdults] = useState('2');
  const [childrenCount, setChildrenCount] = useState('0');
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [residency, setResidency] = useState('RU');
  const [productMode, setProductMode] = useState<'hotels' | 'housing'>('hotels');
  const [results, setResults] = useState<Hotel[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 200000],
    stars: [],
    amenities: [],
    freeCancellation: false,
  });
  const [view, setView] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'stars' | 'name'>('price_asc');
  const [selectedRate, setSelectedRate] = useState<{ hotel: Hotel; rate: HotelRate } | null>(null);
  const [ratesByHotel, setRatesByHotel] = useState<Record<string, HotelRate[]>>({});
  const [ratesLoading, setRatesLoading] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}&limit=10`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
          setShowSuggestions(query.length > 0 || (data.suggestions && data.suggestions.length > 0));
        }
      } catch (e) {
        console.error('[SUGGESTIONS FETCH ERROR]:', e);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (suggestion.type === 'city') {
      setQuery(suggestion.city || suggestion.text);
    } else if (suggestion.type === 'hotel') {
      setQuery(suggestion.text);
    }
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

   const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    setError(null);
    setShowSuggestions(false);

    const startTime = Date.now();

    try {
      const url = new URL('/api/search', window.location.origin);
      url.searchParams.set('q', query);
      if (checkin) url.searchParams.set('checkin', checkin);
      if (checkout) url.searchParams.set('checkout', checkout);
      url.searchParams.set('adults', adults);
      url.searchParams.set('residency', residency);
      if (childrenCount !== '0' && childrenAges.length > 0) {
        url.searchParams.set('children', JSON.stringify(childrenAges));
      }

      const res = await fetch(url.toString());
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка поиска');
        setResults([]);
        return;
      }

      if (data.results && Array.isArray(data.results)) {
        setResults(data.results);
        analytics.track({
          name: 'hotel_search',
          params: {
            query,
            results_count: data.results.length,
            filters_applied: Object.values(filters).filter((v) => Array.isArray(v) ? v.length > 0 : v).length,
            search_duration_ms: Date.now() - startTime,
          },
        });
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка соединения с сервером');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChildrenCountChange = (count: string) => {
    setChildrenCount(count);
    const numCount = parseInt(count);
    setChildrenAges(Array(numCount).fill(5));
  };

  const handleChildAgeChange = (index: number, age: number) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  const handleCityClick = (city: { name: string; slug: string; countrySlug: string }) => {
    setQuery(city.name);
    setShowSuggestions(false);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    setCheckin(tomorrow.toISOString().split('T')[0]!);
    setCheckout(dayAfter.toISOString().split('T')[0]!);
    setAdults('2');
    setSearched(false);
    setResults([]);
    setError(null);
    
    // Set residency based on country
    const residencyMap: Record<string, string> = {
      'russia': 'RU',
      'kazakhstan': 'KZ',
      'uzbekistan': 'UZ',
      'belarus': 'BY',
      'ukraine': 'UA',
      'kyrgyzstan': 'KG',
      'tajikistan': 'TJ',
      'armenia': 'AM',
      'azerbaijan': 'AZ',
      'georgia': 'GE',
      'turkey': 'TR',
      'uae': 'AE',
      'thailand': 'TH',
      'vietnam': 'VN',
      'china': 'CN',
      'india': 'IN',
    };
    setResidency(residencyMap[city.countrySlug] || 'RU');
  };

  const filteredResults = useMemo(() => {
    const filtered = results.filter((hotel) => {
      if (filters.stars.length > 0 && !filters.stars.includes(hotel.stars || 0)) {
        return false;
      }
      if (hotel.minPrice != null) {
        if (hotel.minPrice < filters.priceRange[0] || hotel.minPrice > filters.priceRange[1]) {
          return false;
        }
      }
      if (filters.freeCancellation && !hotel.freeCancellationBefore) {
        return false;
      }
      if (filters.amenities.length > 0) {
        const hotelAmenities = (hotel.amenities || []).map((a) => String(a));
        const hasAll = filters.amenities.every((a) => hotelAmenities.includes(a));
        if (!hasAll) return false;
      }
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return (a.minPrice ?? Infinity) - (b.minPrice ?? Infinity);
        case 'price_desc':
          return (b.minPrice ?? -Infinity) - (a.minPrice ?? -Infinity);
        case 'stars':
          return (b.stars || 0) - (a.stars || 0);
        case 'name':
          return a.name.localeCompare(b.name, 'ru');
        default:
          return 0;
      }
    });

    return sorted;
  }, [results, filters, sortBy]);

  const loadHotelRates = async (hotel: Hotel) => {
    if (!hotel.ostrovokHid) return;
    const key = String(hotel.ostrovokHid);
    if (ratesByHotel[key]) return;
    setRatesLoading(key);
    setError(null);
    try {
      const response = await fetch(`/api/hotels/${hotel.ostrovokHid}/rates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkin,
          checkout,
          guests: [{ adults: Number(adults), children: childrenAges }],
          residency,
          timeout: 30,
        }),
      });
      const data = await response.json();
      if (!response.ok || !Array.isArray(data.rates)) {
        throw new Error(data.error || 'Не удалось загрузить тарифы');
      }
      setRatesByHotel((current) => ({ ...current, [key]: data.rates }));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Не удалось загрузить тарифы');
    } finally {
      setRatesLoading(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12" suppressHydrationWarning>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4" suppressHydrationWarning>
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-700 p-1" role="tablist" aria-label="Тип размещения">
                <button
                  type="button"
                  role="tab"
                  aria-selected={productMode === 'hotels'}
                  onClick={() => setProductMode('hotels')}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                    productMode === 'hotels'
                      ? 'bg-white text-blue-900 shadow-sm dark:bg-slate-900 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  Отели
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={productMode === 'housing'}
                  onClick={() => setProductMode('housing')}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                    productMode === 'housing'
                      ? 'bg-white text-blue-900 shadow-sm dark:bg-slate-900 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  Жильё
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder={productMode === 'housing' ? 'Город, квартира или апартаменты' : 'Город, отель или страна'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete="off"
              />

              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
                >
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <span className="text-2xl">
                        {suggestion.type === 'city' ? '🏙️' : '🏨'}
                      </span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{suggestion.text}</div>
                        {suggestion.type === 'hotel' && suggestion.city && (
                          <div className="text-xs text-gray-500">{suggestion.city}</div>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 uppercase">
                        {suggestion.type === 'city' ? 'Город' : 'Отель'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Заезд</label>
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Выезд</label>
                <input
                  type="date"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Взрослые</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  suppressHydrationWarning
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1">Дети</label>
              <select
                value={childrenCount}
                onChange={(e) => handleChildrenCountChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                suppressHydrationWarning
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {childrenCount !== '0' && childrenAges.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {childrenAges.map((age, index) => (
                  <div key={index}>
                    <label className="block text-xs text-slate-500 mb-1">Возраст ребёнка {index + 1}</label>
                    <select
                      value={age}
                      onChange={(e) => handleChildAgeChange(index, parseInt(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {Array.from({ length: 18 }, (_, i) => i).map((a) => (
                        <option key={a} value={a}>
                          {a} {a === 0 ? '(до года)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-500 mb-1">Гражданство</label>
              <select
                value={residency}
                onChange={(e) => setResidency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                suppressHydrationWarning
              >
                <option value="RU">Россия</option>
                <option value="KZ">Казахстан</option>
                <option value="UZ">Узбекистан</option>
                <option value="BY">Беларусь</option>
                <option value="UA">Украина</option>
                <option value="KG">Кыргызстан</option>
                <option value="TJ">Таджикистан</option>
                <option value="AM">Армения</option>
                <option value="AZ">Азербайджан</option>
                <option value="GE">Грузия</option>
                <option value="TR">Турция</option>
                <option value="AE">ОАЭ</option>
                <option value="TH">Таиланд</option>
                <option value="VN">Вьетнам</option>
                <option value="CN">Китай</option>
                <option value="IN">Индия</option>
                <option value="DE">Германия</option>
                <option value="IT">Италия</option>
                <option value="ES">Испания</option>
                <option value="FR">Франция</option>
                <option value="GB">Великобритания</option>
                <option value="US">США</option>
              </select>
            </div>

            <div className="lg:w-80 lg:ml-auto rounded-xl border border-indigo-200 bg-indigo-50/70 p-3.5 dark:border-indigo-900 dark:bg-indigo-950/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 dark:text-indigo-200 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Шлюз отелей обновляется
              </div>
              <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed">
                Подключаем сезонные квоты 2026. Бронирование любого отеля доступно через персонального менеджера 24/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                disabled
                title="Поисковик отелей находится на плановом обновлении шлюзов"
                className="bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold text-base px-6 py-3 rounded-xl cursor-not-allowed transition-all opacity-80"
              >
                Поиск в разработке
              </button>
              <a
                href="https://t.me/Anastasiiiiyyaa?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B4%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D1%8C%20%D0%B8%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BE%D1%82%D0%B5%D0%BB%D1%8C"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                Подобрать отель через менеджера
              </a>
            </div>
          </div>
        </div>
      </form>

      <div className="max-w-3xl mx-auto mb-8">
        <p className="text-xs text-slate-500 mb-2">Популярные направления:</p>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((city) => (
            <button
              key={city.slug}
              type="button"
              onClick={() => handleCityClick(city)}
              className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl">
          {error}
        </div>
      )}

      {searched && results.length === 0 && !loading && !error && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
          <p className="text-slate-500 text-lg">Отели не найдены. Попробуйте изменить запрос.</p>
        </div>
      )}

      {searched && results.length > 0 && filteredResults.length === 0 && !loading && !error && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
          <p className="text-slate-500 text-lg">По выбранным фильтрам ничего не найдено. Попробуйте изменить параметры.</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="flex items-center justify-between max-w-7xl mx-auto mb-4">
            <p className="text-sm text-slate-500">Найдено: {filteredResults.length}</p>
            <div className="flex gap-2 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-lg text-sm border border-slate-200 bg-white text-slate-700"
              >
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="stars">Звёзды</option>
                <option value="name">Название</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  const next = view === 'list' ? 'map' : 'list';
                  setView(next);
                  analytics.track({ name: 'map_view_toggle', params: { view: next, results_count: filteredResults.length } });
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  view === 'list' ? 'bg-blue-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                Список
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = view === 'map' ? 'list' : 'map';
                  setView(next);
                  analytics.track({ name: 'map_view_toggle', params: { view: next, results_count: filteredResults.length } });
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  view === 'map' ? 'bg-blue-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                Карта
              </button>
            </div>
          </div>

          {view === 'map' ? (
            (() => {
              const mapHotels = filteredResults
                .map((hotel) => {
                  const geo = (hotel as any).geo as [number, number] | undefined;
                  if (!geo || (geo[0] === 0 && geo[1] === 0)) return null;
                  return {
                    id: hotel.id,
                    name: hotel.name,
                    city: hotel.city,
                    country: hotel.country,
                    stars: hotel.stars ?? null,
                    minPrice: hotel.minPrice ?? null,
                    lng: geo[0],
                    lat: geo[1],
                  } satisfies HotelMapPoint;
                })
                .filter(Boolean) as HotelMapPoint[];

              return mapHotels.length > 0 ? (
                <HotelMap hotels={mapHotels} />
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                  <p className="text-lg font-semibold text-slate-900">Для найденного отеля нет координат карты</p>
                  <p className="mt-2 text-sm text-slate-600">Откройте список, чтобы увидеть карточку и ссылку бронирования.</p>
                  <button
                    type="button"
                    onClick={() => setView('list')}
                    className="mt-5 rounded-xl bg-blue-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
                  >
                    Открыть список
                  </button>
                </div>
              );
            })()
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <aside className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 shadow-sm p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Фильтры</h3>
                  <SearchFilters filters={filters} onChange={setFilters} />
                </div>
              </aside>
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                    <div className="relative w-full h-64 bg-slate-100 overflow-hidden">
                      <OptimizedHotelImage
                        src={hotel.images?.[0]?.medium}
                        alt={hotel.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex gap-0.5 mb-1.5">
                        {Array.from({ length: hotel.stars || 0 }).map((_, i) => (
                          <span key={i} className="text-amber-500 text-sm">★</span>
                        ))}
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900">{hotel.name}</h2>
                      <p className="text-xs text-slate-400 mt-1">{hotel.city}, {hotel.country}</p>
                      <div className="mt-3 space-y-1">
                        {hotel.minPrice != null && (
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-slate-900">{formatPrice(hotel.minPrice)}</span>
                            {!hotel.taxesIncluded && (
                              <span className="text-xs text-orange-600">+налоги</span>
                            )}
                          </div>
                        )}
                        {hotel.mealType && (
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <span>🍽️</span>
                            <span>{getMealTypeLabel(hotel.mealType)}</span>
                          </div>
                        )}
                        {hotel.freeCancellationBefore && (
                          <div className="flex items-center gap-1 text-sm text-green-600">
                            <span>✓</span>
                            <span>Бесплатная отмена до {formatCancellationDate(hotel.freeCancellationBefore)}</span>
                          </div>
                        )}
                        {hotel.availability === false && (
                          <div className="text-sm text-amber-700">
                            Нет доступных тарифов на выбранные даты
                          </div>
                        )}
                      </div>
                      {hotel.availability === false ? (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <span className="bg-slate-100 text-slate-600 font-bold text-sm px-3 py-2.5 rounded-xl text-center">
                            Нет тарифов
                          </span>
                          <button
                            type="button"
                            onClick={() => loadHotelRates(hotel)}
                            disabled={ratesLoading === String(hotel.ostrovokHid)}
                            className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm px-3 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                          >
                            {ratesLoading === String(hotel.ostrovokHid) ? 'Проверка...' : 'Проверить тарифы'}
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => loadHotelRates(hotel)}
                          disabled={ratesLoading === String(hotel.ostrovokHid)}
                          className="mt-4 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors text-center disabled:opacity-60"
                        >
                          {ratesLoading === String(hotel.ostrovokHid) ? 'Загрузка тарифов...' : 'Показать тарифы'}
                        </button>
                      )}
                      {ratesByHotel[String(hotel.ostrovokHid)]?.map((rate, index) => (
                        <button
                          key={rate.book_hash || rate.match_hash || index}
                          type="button"
                          onClick={() => setSelectedRate({ hotel, rate })}
                          className="mt-2 w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-left text-sm text-blue-950 hover:bg-blue-100"
                        >
                          <span className="font-semibold">{rate.room_name || 'Доступный номер'}</span>
                          {rate.meal && <span className="ml-2 text-blue-800">{rate.meal}</span>}
                          {rate.payment_options?.payment_types?.[0]?.show_amount && (
                            <span className="float-right font-bold">
                              {rate.payment_options.payment_types[0].show_amount} {rate.payment_options.payment_types[0].show_currency_code || ''}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {selectedRate?.rate.book_hash && (
        <div className="mx-auto mt-8 max-w-3xl">
          <BookingForm
            hotelHid={selectedRate.hotel.ostrovokHid || 0}
            hotelName={selectedRate.hotel.name}
            initialBookHash={selectedRate.rate.book_hash}
            initialCheckin={checkin}
            initialCheckout={checkout}
            cancellationPolicies={selectedRate.rate.cancellation_penalties}
            taxes={selectedRate.rate.payment_options?.payment_types?.[0]?.tax_data?.taxes}
          />
        </div>
      )}
    </>
  );
}