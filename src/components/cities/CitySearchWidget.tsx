'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { allCities } from '@/app/cities/all-cities';
import { generateCitySlug } from '@/lib/slugify';

export function CitySearchWidget() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const found = useMemo(() => {
    const normalized = q.trim().toLowerCase();
    if (!normalized) return [];
    return allCities
      .filter((city) => city.toLowerCase().includes(normalized))
      .slice(0, 12);
  }, [q]);

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        placeholder="Введите город, например: Москва"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => {
          if (!containerRef.current?.contains(document.activeElement)) {
            setOpen(false);
          }
        }, 150)}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
        autoComplete="off"
      />
      {open && found.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {found.map((city) => (
            <li key={city}>
              <Link
                href={`/cities/${generateCitySlug(city)}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {city}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {q && found.length === 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          Город не найден. Попробуйте изменить запрос.
        </div>
      )}
    </div>
  );
}
