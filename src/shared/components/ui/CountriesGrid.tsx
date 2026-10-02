'use client';

import React, { memo, useMemo } from 'react';
import { ResponsiveGrid, GridItem } from '@/shared/components/ui/GridLayouts';
import { useIntersectionObserver, useLazyImage } from '@/shared/hooks/useOptimization';
import { useDebounce } from '@/shared/hooks/usePerformance';
import Image from 'next/image';

interface CountryCardProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  continent: string;
  onClick?: () => void;
}

/**
 * Оптимизированная карточка страны с ленивой загрузкой
 */
const CountryCard = memo<CountryCardProps>(
  ({ id: _id, name, description, image, continent, onClick }) => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: '100px',
    });

    const { imageSrc, imageRef } = useLazyImage(
      image || '/images/placeholder-country.jpg',
      '/images/placeholder.svg'
    );

    // Дебаунс для клика
    const debouncedOnClick = useDebounce(onClick || (() => {}), 150);

    const cardStyles = useMemo(
      () => ({
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
      }),
      [onClick]
    );

    if (!isVisible) {
      return (
        <div
          ref={ref}
          className="country-card-skeleton animate-pulse bg-gray-200 rounded-lg h-64"
          style={{ minHeight: '256px' }}
        />
      );
    }

    return (
      <div
        ref={ref}
        className="country-card grid-item-transition"
        style={cardStyles}
        onClick={debouncedOnClick}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div className="relative overflow-hidden h-48">
          <Image
            ref={imageRef}
            src={imageSrc}
            alt={`Флаг ${name}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white bg-opacity-90 text-sm font-medium text-gray-700 rounded-full">
              {continent}
            </span>
          </div>
        </div>

        <div className="p-6 text-white">
          <h3 className="text-xl font-bold mb-2 truncate">{name}</h3>
          <p className="text-white text-opacity-90 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    );
  }
);

CountryCard.displayName = 'CountryCard';

interface CountriesGridProps {
  countries: Array<{
    id: string;
    name: string;
    description: string;
    image?: string;
    continent: string;
  }>;
  onCountryClick?: (countryId: string) => void;
  className?: string;
  searchTerm?: string;
}

/**
 * Оптимизированная сетка стран с виртуализацией и поиском
 */
export const CountriesGrid = memo<CountriesGridProps>(
  ({ countries, onCountryClick, className = '', searchTerm = '' }) => {
    // Дебаунс поискового запроса
    const debouncedSearchTerm = useDebounce(searchTerm.toLowerCase(), 300);

    // Фильтрация стран с мемоизацией
    const filteredCountries = useMemo(() => {
      if (!debouncedSearchTerm) return countries;

      return countries.filter(
        country =>
          country.name.toLowerCase().includes(debouncedSearchTerm) ||
          country.description.toLowerCase().includes(debouncedSearchTerm) ||
          country.continent.toLowerCase().includes(debouncedSearchTerm)
      );
    }, [countries, debouncedSearchTerm]);

    // Мемоизированный обработчик клика
    const handleCountryClick = useMemo(() => {
      if (!onCountryClick) return undefined;

      return (countryId: string) => {
        onCountryClick(countryId);
      };
    }, [onCountryClick]);

    if (filteredCountries.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Страны не найдены</h3>
          <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
        </div>
      );
    }

    return (
      <div className={`countries-grid-container ${className}`}>
        <ResponsiveGrid
          className="country-grid"
          minItemWidth="280px"
          gap="1.5rem"
          columns={{
            mobile: 1,
            tablet: 2,
            desktop: 3,
          }}
        >
          {filteredCountries.map(country => {
            const clickHandler = handleCountryClick
              ? () => handleCountryClick(country.id)
              : undefined;
            return (
              <GridItem key={country.id}>
                <CountryCard {...country} {...(clickHandler && { onClick: clickHandler })} />
              </GridItem>
            );
          })}
        </ResponsiveGrid>
      </div>
    );
  }
);

CountriesGrid.displayName = 'CountriesGrid';

export default CountriesGrid;
