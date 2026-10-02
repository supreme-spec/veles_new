'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import type { WikiPage } from '@/features/wiki/types';

interface RandomCountriesProps {
  count?: number;
  initialCountries?: WikiPage[];
}

interface ApiResponse {
  success: boolean;
  countries: Array<{
    id: string;
    name: string;
    slug: string;
    visits: number;
    trend: string;
    imageUrl: string;
    description: string;
    popularityScore: number;
  }>;
  count: number;
  total: number;
  limit: number;
  sortBy: string;
  timestamp: string;
  source: string;
  error?: string;
}

/**
 * Client Component для отображения популярных стран с загрузкой MDX данных
 */
export function RandomCountries({
  initialCountries: _initialCountries,
}: RandomCountriesProps) {
  const [countries, setCountries] = useState<WikiPage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCountries = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching from /api/wiki/popular-countries');
      
      const startTime = performance.now();
      const response = await fetch('/api/wiki/popular-countries');
      const data: ApiResponse = await response.json();
      const endTime = performance.now();
      
      console.log(`API call took ${Math.round(endTime - startTime)}ms`);
      console.log('API Response:', data);

      if (data.success && data.countries) {
        // Transform API data to WikiPage format
        const transformedCountries: WikiPage[] = data.countries.map(country => ({
          id: country.slug,
          title: country.name,
          description: country.description,
          content: '',
          lastModified: new Date().toISOString(),
          tags: [],
        }));
        setCountries(transformedCountries);
        console.log('Successfully loaded', data.countries.length, 'countries');
      } else {
        console.error('API returned error:', data.error);
        // Fallback to static data
        setFallbackData();
      }
    } catch (error) {
      console.error('Failed to load countries:', error);
      // Fallback to static data
      setFallbackData();
    } finally {
      setLoading(false);
    }
  }, []);

  // Load countries from API on component mount
  useEffect(() => {
    console.log('RandomCountries: Loading countries from API');
    loadCountries();
    
    // Performance monitoring
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      console.log(`RandomCountries component lived for ${Math.round(endTime - startTime)}ms`);
    };
  }, [loadCountries]);

  const setFallbackData = () => {
    const fallbackCountries: WikiPage[] = [
      {
        id: 'syria',
        title: 'Сирия',
        description:
          'Историческая энциклопедия древнейших цивилизаций и предупреждения о безопасности ⚠️',
        content: '',
        lastModified: new Date().toISOString(),
        tags: [],
      },
      {
        id: 'lithuania',
        title: 'Литва',
        description: 'Средневековый Вильнюс, замки и Куршская коса',
        content: '',
        lastModified: new Date().toISOString(),
        tags: [],
      },
      {
        id: 'bangladesh',
        title: 'Бангладеш',
        description: 'Полный путеводитель по дельте Ганга',
        content: '',
        lastModified: new Date().toISOString(),
        tags: [],
      },
      {
        id: 'timor-leste',
        title: 'Тимор-Лешти',
        description: 'Нетронутый рай Юго-Восточной Азии',
        content: '',
        lastModified: new Date().toISOString(),
        tags: [],
      },
      {
        id: 'chad',
        title: 'Чад',
        description: 'Полный путеводитель по сердцу Африки',
        content: '',
        lastModified: new Date().toISOString(),
        tags: [],
      },
      {
        id: 'ecuador',
        title: 'Эквадор',
        description: 'Страна трех миров: Анды, Амазония и Галапагосы',
        content: '',
        lastModified: new Date().toISOString(),
        tags: [],
      },
    ];
    setCountries(fallbackCountries);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 animate-pulse"
          >
            <div className="text-2xl sm:text-3xl mb-2 text-center">🌍</div>
            <div className="h-4 bg-blue-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {countries.slice(0, 5).map(country => (
        <Link
          key={country.id}
          href={`/wiki/${country.id}`}
          prefetch={true}
          className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 transition-all text-center group"
        >
          <div className="text-2xl sm:text-3xl mb-2 text-center">🌍</div>
          <h3 className="font-semibold text-blue-900 group-hover:text-blue-700 text-xs sm:text-sm leading-tight mb-1 truncate">
            {country.title}
          </h3>
          {country.description && (
            <p className="text-[10px] sm:text-xs text-blue-700 opacity-80 line-clamp-2 text-center">{country.description}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
