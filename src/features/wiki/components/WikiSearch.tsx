'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWikiSearch } from '../hooks/useWiki';
import type { WikiSearchResult } from '../types';

interface WikiSearchProps {
  onSelectResult?: (pageId: string) => void;
  initialSearch?: string; // Добавляем параметр initialSearch
}

export function WikiSearch({ onSelectResult, initialSearch = '' }: WikiSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search params from URL
  const { searchTerm, setSearchTerm, results, isSearching, searchError, performSearch } =
    useWikiSearch();

  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Handle search parameter from URL (for voice search integration)
  useEffect(() => {
    const urlSearch = searchParams?.get('search') || '';
    console.log('URL Search Parameter:', urlSearch); // Debug log
    if (urlSearch) {
      setSearchTerm(urlSearch);
      setDebouncedTerm(urlSearch);
      setShowResults(true);
    } else if (initialSearch) {
      setSearchTerm(initialSearch);
      setDebouncedTerm(initialSearch);
      setShowResults(true);
    }
  }, [searchParams, initialSearch, setSearchTerm]);

  // Debounce search term - reduced delay for faster response
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 150); // Reduced from 300ms to 150ms for faster search
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Perform search when debounced term changes
  useEffect(() => {
    console.log('Performing search for:', debouncedTerm); // Debug log
    if (debouncedTerm.trim()) {
      performSearch(debouncedTerm);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm]); // performSearch is memoized with useCallback, so we can safely omit it

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          const selectedResult = results[selectedIndex];
          if (selectedResult) {
            handleResultClick(selectedResult);
          }
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Корректная обработка перехода по результату поиска
  const handleResultClick = (result: WikiSearchResult) => {
    if (typeof onSelectResult === 'function') {
      onSelectResult(result.pageId);
    }

    // Если это город (pageId начинается с "city-"), перенаправляем на /cities/
    if (result.pageId.startsWith('city-')) {
      const citySlug = result.pageId.replace(/^city-/, '');
      router.push(`/cities/${citySlug}`);
    } else {
      router.push(`/wiki/${result.pageId}`);
    }

    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="wiki-search w-full relative">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Поиск по вики..."
          className="w-full px-4 py-2 border rounded-lg pl-10 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isSearching && (
        <div className="mt-2 text-center">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-gray-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Поиск...</span>
        </div>
      )}

      {searchError && <div className="mt-2 text-red-500">{searchError}</div>}

      {!isSearching && showResults && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full border rounded-lg divide-y max-h-96 overflow-y-auto bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {results.map((result, index) => (
            <div
              key={result.pageId}
              className={`p-3 cursor-pointer transition-colors ${
                index === selectedIndex
                  ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleResultClick(result)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="font-medium text-gray-900 dark:text-white">{result.title}</div>
              <div
                className="text-sm text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: result.snippet }}
              />
            </div>
          ))}
        </div>
      )}

      {!isSearching && showResults && searchTerm && results.length === 0 && !searchError && (
        <div className="absolute z-50 mt-2 w-full text-center text-gray-500 p-3 border rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
          Ничего не найдено
        </div>
      )}
    </div>
  );
}
