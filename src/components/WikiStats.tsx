'use client';

import { useState, useEffect } from 'react';

// NOTE: This hook was refactored to avoid importing server-side code (fs module).
// It now expects data to be passed via props or context, or fetched via API.
// Use useWikiStatsSimple or pass props directly to components.

/**
 * Хук для получения статистики Wiki
 */
export function useWikiStats(
  initialReadyArticles?: number,
  initialCitiesCount?: number,
  initialAttractionsCount?: number
) {
  const [readyArticles] = useState(initialReadyArticles || 0);
  const [citiesCount] = useState(initialCitiesCount || 0);
  const [attractionsCount] = useState(initialAttractionsCount || 0);
  // Total countries will be fetched/passed properly in the future
  const [totalCountries] = useState(0);

  // We are not using setTotalCountries or re-fetching here anymore to keep it client-safe
  useEffect(() => {
    // If we need to fetch data on client mount, we should adding fetch logic here
  }, []);

  return {
    readyArticles,
    citiesCount,
    attractionsCount,
    totalCountries,
  };
}

/**
 * Хук для получения статистики Wiki (упрощенная версия)
 */
export function useWikiStatsSimple() {
  const [stats, setStats] = useState({
    readyArticles: 0,
    citiesCount: 0,
    attractionsCount: 0,
    totalCountries: 0,
  });

  useEffect(() => {
    // В будущем: fetch('/api/wiki/stats')...
    // Пока возвращаем пустые или статические данные, чтобы не ломать сборку
    setStats({
      readyArticles: 212, // Placeholder
      citiesCount: 212 * 8 + 42,
      attractionsCount: 212 * 14 + 115,
      totalCountries: 212
    });
  }, []);

  return stats;
}
