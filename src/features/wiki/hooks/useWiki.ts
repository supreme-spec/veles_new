import React, { useEffect, useState, useCallback } from 'react';
import type { WikiPage, WikiSearchResult } from '../types';
import { useWikiContext } from '../context/WikiContext';
import { normalizeCountryName } from '@/shared/utils/normalization';

export function useWikiPage(pageId: string | null) {
  const { state, dispatch } = useWikiContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pageId) {
      setIsLoading(false);
      setError(null);
      return;
    }

    // Если страница уже загружена, используем ее из состояния
    if (state.pages[pageId]) {
      setIsLoading(false);
      setError(null);
      return;
    }

    // Иначе загружаем страницу
    setIsLoading(true);
    setError(null);

    // Add timeout for API calls
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for page loading

    // Здесь будет API-запрос к вашему серверу
    // Пример:
    fetch(`/api/wiki/page/${pageId}`, { signal: controller.signal })
      .then(response => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error('Не удалось загрузить страницу');
        }
        return response.json();
      })
      .then((page: WikiPage) => {
        if (pageId) {
          // Ensure pageId still exists when response comes
          dispatch({ type: 'ADD_PAGE', payload: page });
        }
        setIsLoading(false);
      })
      .catch(err => {
        clearTimeout(timeoutId);
        if (pageId) {
          // Only set error if pageId still exists
          if (err.name === 'AbortError') {
            setError('Превышено время ожидания загрузки страницы');
          } else {
            setError(err.message);
          }
        }
        setIsLoading(false);
      });
  }, [pageId, state.pages, dispatch]);

  return {
    page: pageId ? state.pages[pageId] : null,
    isLoading,
    error,
  };
}

export function useWikiSearch() {
  const { state } = useWikiContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<WikiSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Cache for search results to avoid repeated API calls
  const searchCache = React.useRef<Map<string, WikiSearchResult[]>>(new Map());

  // Helper function to check if query could be a case form of the title
  const couldBeCaseForm = useCallback((title: string, query: string): boolean => {
    const titleBase = title.toLowerCase().trim();
    const queryLower = query.toLowerCase().trim();

    // Exact match
    if (titleBase === queryLower) return true;

    // For short queries (3-5 chars), prioritize matches that start with same letters
    if (queryLower.length <= 5 && titleBase.length <= 8) {
      // Check if they share first 2-3 characters (e.g., "кубу" and "куба" both start with "ку")
      const minLength = Math.min(queryLower.length, titleBase.length, 3);
      if (minLength >= 2) {
        const titleStart = titleBase.substring(0, minLength);
        const queryStart = queryLower.substring(0, minLength);
        if (titleStart === queryStart) {
          return true;
        }
      }
    }

    // Query starts with title base (e.g., "кубу" starts with "ку" from "куба")
    if (titleBase.length >= 2 && queryLower.startsWith(titleBase.substring(0, 2))) {
      return true;
    }

    // Title starts with query base (e.g., "куба" starts with "ку" from "кубу")
    if (queryLower.length >= 2 && titleBase.startsWith(queryLower.substring(0, 2))) {
      return true;
    }

    return false;
  }, []);

  // Helper function for server-side search
  const performServerSearch = useCallback(async (term: string) => {
    const cacheKey = term.toLowerCase().trim();

    // Check cache first
    if (searchCache.current.has(cacheKey)) {
      return searchCache.current.get(cacheKey)!;
    }

    console.log('Fetching search results from API for term:', term);

    // Add timeout for API calls
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(`/api/wiki/search?q=${encodeURIComponent(term)}`, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Log response details for debugging
      console.log('API Response status:', response.status);
      console.log('API Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error response:', errorText);
        throw new Error(`Ошибка поиска: ${response.status} ${response.statusText}`);
      }

      const serverResponse = await response.json();
      const serverResults = Array.isArray(serverResponse)
        ? serverResponse
        : serverResponse.results || [];
      const limitedResults = serverResults.slice(0, 15);

      // Cache the results
      searchCache.current.set(cacheKey, limitedResults);

      // Limit cache size to prevent memory issues
      if (searchCache.current.size > 50) {
        const firstKey = searchCache.current.keys().next().value;
        if (firstKey) {
          searchCache.current.delete(firstKey);
        }
      }

      return limitedResults;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Превышено время ожидания запроса');
      }
      throw error;
    }
  }, []);

  const performSearch = useCallback(
    async (term: string) => {
      if (!term?.trim()) {
        setResults([]);
        setSearchTerm('');
        return;
      }

      // Prevent multiple simultaneous searches
      if (isSearching) {
        return;
      }

      setIsSearching(true);
      setSearchError(null);
      setSearchTerm(term);

      try {
        const searchLower = term.toLowerCase().trim();

        // Validate search term
        if (searchLower.length < 1 || searchLower.length > 100) {
          setResults([]);
          setIsSearching(false);
          return;
        }

        // Check for potentially harmful characters
        if (/^[\s\x00-\x1F\x7F]*$/.test(term)) {
          setResults([]);
          setIsSearching(false);
          return;
        }

        // Quick check: if query looks like a city/region/country name (short, Cyrillic),
        // go directly to server-side search for faster results
        // For very short queries (3-6 chars), always use server search for instant results
        const isShortQuery = term.length <= 6;
        const isLikelyLocation =
          term.length <= 30 && // Short query
          /[а-яё]/i.test(term) && // Contains Cyrillic letters
          !term.match(/^(страна|страны|туризм|путешествие|гид|путеводитель)/i); // Not a general tourism term

        if (isShortQuery || isLikelyLocation) {
          // Perform server-side search directly
          const serverResults = await performServerSearch(term);
          setResults(serverResults);
          setIsSearching(false);
          return;
        }

        // Otherwise, try client-side search through context state first
        const searchResults: WikiSearchResult[] = [];

        // Normalize search term for better matching (handle different spellings)
        const normalizeText = (text: string) => {
          return text.toLowerCase().replace(/ё/g, 'е').replace(/й/g, 'и').trim();
        };

        // Function to clean titles from emojis - используем единую функцию нормализации
        const cleanTitle = (title: string): string => {
          return normalizeCountryName(title);
        };

        // Function to clean text from emojis (for snippets)
        const cleanTextFromEmojis = (text: string): string => {
          // Remove emojis using Unicode ranges
          return text
            .replace(
              /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
              ''
            )
            .trim();
        };

        const normalizedSearch = normalizeText(searchLower);

        const getTextFromContent = (content: string): string => {
          // First, try to remove HTML tags and extract plain text
          return content
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        };

        Object.values(state.pages).forEach(rawPage => {
          // Cast to WikiPage type and check if page exists
          const page = rawPage as WikiPage;
          if (!page || !page.id || !page.title) return;

          const contentText = getTextFromContent(page.content || '');
          const normalizedContent = normalizeText(contentText);

          // Extract meta-description if available (for better snippets)
          let metaDescription = '';
          if (page.content && typeof page.content === 'string') {
            const metaDescMatch = page.content.match(
              /<div class="meta-description"[^>]*>([^<]+)<\/div>/
            );
            if (metaDescMatch && metaDescMatch[1]) {
              metaDescription = metaDescMatch[1];
            }
          }

          // Use page description or extract first paragraph as snippet
          let defaultSnippet: string = (page.description || metaDescription) ?? '';
          if (!defaultSnippet && contentText) {
            const firstParaMatch = contentText.match(/^([^.!?]{100,300}[.!?])/);
            defaultSnippet = (firstParaMatch?.[1] ?? contentText.substring(0, 150) + '...') || '';
          }

          // Calculate relevance score similar to server-side implementation
          let relevanceScore = 1;
          const exactIdMatch = page.id && searchTerm && page.id === searchTerm;

          // Extract clean title for better matching (remove emojis, colons, etc.)
          const cleanedTitle = cleanTitle(page.title || '').toLowerCase();
          const cleanQuery = searchLower.trim().replace(/\s+/g, ' ');

          // For multi-word queries, check if all words are present (order-independent)
          const queryWords = cleanQuery.split(' ').filter(w => w.length > 0);

          // Helper function to normalize words for flexible matching (handle падежи)
          const normalizeWord = (word: string): string => {
            // Remove common endings for flexible matching
            return word
              .replace(/[ая]$/, '') // южный/южная -> южн
              .replace(/[ыи]$/, '') // суданы/судани -> судан
              .replace(/[ую]$/, '') // судану/судану -> судан
              .replace(/[омем]$/, '') // суданом/суданом -> судан
              .toLowerCase();
          };

          // Check if all query words match in title (flexible matching for падежи)
          const allWordsMatch =
            queryWords.length > 1 &&
            queryWords.every(queryWord => {
              // Direct match in title
              if (cleanedTitle.includes(queryWord)) return true;

              // Normalized match for падежи
              const normalizedQuery = normalizeWord(queryWord);
              if (normalizedQuery.length >= 3) {
                // Check if any word in title matches normalized query
                const titleWords = cleanedTitle.split(' ');
                for (const titleWord of titleWords) {
                  const normalizedTitle = normalizeWord(titleWord);
                  if (
                    normalizedTitle === normalizedQuery ||
                    normalizedTitle.includes(normalizedQuery) ||
                    normalizedQuery.includes(normalizedTitle)
                  ) {
                    return true;
                  }
                }
              }

              return false;
            });

          // Exact match in title (highest priority)
          const exactTitleMatch = cleanedTitle === cleanQuery;
          // Title starts with query (very high priority)
          const titleStartsWithQuery = cleanedTitle.startsWith(cleanQuery);
          // Query starts with title (high priority for partial matches)
          const queryStartsWithTitle = cleanQuery.startsWith(cleanedTitle);
          // Title contains query
          const titleContainsQuery = cleanedTitle.includes(cleanQuery) || allWordsMatch;

          const titleMatch =
            exactTitleMatch || titleStartsWithQuery || queryStartsWithTitle || titleContainsQuery;
          const descriptionMatch =
            page.description &&
            (normalizeText(page.description).includes(normalizedSearch) ||
              page.description.toLowerCase().includes(searchLower));
          const contentMatch =
            page.content &&
            (normalizedContent.includes(normalizedSearch) ||
              contentText.toLowerCase().includes(searchLower));
          const tagMatch =
            page.tags &&
            Array.isArray(page.tags) &&
            page.tags.some(tag => {
              if (typeof tag === 'string') {
                return (
                  normalizeText(tag).includes(normalizedSearch) ||
                  tag.toLowerCase().includes(searchLower)
                );
              }
              return false;
            });

          // Apply relevance scoring with improved logic
          if (exactIdMatch) relevanceScore += 10; // Highest priority for exact ID match

          if (exactTitleMatch) {
            relevanceScore += 25; // Increased from 20 - Exact title match
          } else if (allWordsMatch && queryWords.length > 1) {
            relevanceScore += 22; // Very high priority for all words match (e.g., "южный судан")
          } else if (titleStartsWithQuery) {
            relevanceScore += 18; // Increased from 15 - Title starts with query
          } else if (queryStartsWithTitle) {
            relevanceScore += 15; // Increased from 12 - Query starts with title
          } else if (couldBeCaseForm(cleanedTitle, cleanQuery)) {
            relevanceScore += 20; // Very high priority for case forms (e.g., "кубу" -> "куба")
          } else if (titleContainsQuery) {
            const titleIndex = cleanedTitle.indexOf(cleanQuery);
            if (titleIndex === 0) {
              relevanceScore += 10; // Starts at beginning
            } else if (titleIndex < 5) {
              relevanceScore += 7; // Near beginning
            } else {
              // Strong penalty for matches in the middle/end when query is short
              if (cleanQuery.length <= 5) {
                relevanceScore -= 2; // Negative score for short queries in middle/end
              } else {
                relevanceScore += 3; // Middle or end
              }
            }
          }

          // Bonus for shorter titles (exact matches are usually shorter)
          if (cleanedTitle.length <= cleanQuery.length + 3) {
            relevanceScore += 2;
          }

          // Extra bonus for short queries matching short titles (likely exact match)
          if (
            cleanQuery.length <= 5 &&
            cleanedTitle.length <= 8 &&
            cleanedTitle.startsWith(cleanQuery.substring(0, 2))
          ) {
            relevanceScore += 5;
          }

          if (tagMatch) relevanceScore += 2;
          if (contentMatch) relevanceScore += 1;

          // For tourist destinations, give additional bonus to relevance
          // Countries have priority over cities
          if (page.tags?.includes('страна')) {
            relevanceScore += 8; // Increased from 5 - Countries get very high priority
          } else if (page.tags?.includes('направление') || page.tags?.includes('курорт')) {
            relevanceScore += 0.5;
          }

          // Strong penalty for cities when searching for countries (e.g., "куба" should prefer country over "новокубанск")
          if (page.tags?.includes('город') && !page.tags?.includes('страна')) {
            // If query is short and title is long, it's likely a city with country name in it
            if (cleanQuery.length <= 6 && cleanedTitle.length > cleanQuery.length + 5) {
              relevanceScore -= 5; // Increased penalty from -3
            }
          }

          // Additional penalty for matches in the middle of long city names when query is short
          if (cleanQuery.length <= 5 && cleanedTitle.length > 10) {
            const titleIndex = cleanedTitle.indexOf(cleanQuery);
            if (titleIndex > 3) {
              relevanceScore -= 3; // Penalty for short queries found deep in long names
            }
          }

          // Only add to results if there's a match
          if (exactIdMatch || titleMatch || descriptionMatch || contentMatch || tagMatch) {
            // Determine snippet based on where the match was found
            let snippet = cleanTextFromEmojis(defaultSnippet);
            if (titleMatch) {
              // Use default snippet for title matches
            } else if (descriptionMatch && page.description) {
              const index = page.description.toLowerCase().indexOf(searchLower);
              const start = Math.max(0, index - 50);
              const end = Math.min(page.description.length, index + searchLower.length + 50);
              let descSnippet = page.description.substring(start, end);
              if (start > 0) descSnippet = '...' + descSnippet;
              if (end < page.description.length) descSnippet = descSnippet + '...';
              snippet = cleanTextFromEmojis(descSnippet);
            } else if (contentMatch) {
              const index = contentText.toLowerCase().indexOf(searchLower);
              const start = Math.max(0, index - 75);
              const end = Math.min(contentText.length, index + searchLower.length + 75);
              let contentSnippet = contentText.substring(start, end);
              if (start > 0) contentSnippet = '...' + contentSnippet;
              if (end < contentText.length) contentSnippet = contentSnippet + '...';
              snippet = cleanTextFromEmojis(contentSnippet);
            } else if (tagMatch && page.tags) {
              snippet = cleanTextFromEmojis(`Теги: ${page.tags.join(', ')}`);
            }

            searchResults.push({
              pageId: page.id,
              title: normalizeCountryName(page.title),
              snippet: snippet || '',
              relevanceScore: relevanceScore,
              tags: page.tags || [],
            });
          }
        });

        // If we have results from client-side search, use them
        if (searchResults.length > 0) {
          // Сортируем по релевантности
          searchResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
          setResults(searchResults.slice(0, 15)); // Ограничиваем до 15 результатов
          setIsSearching(false);
        } else {
          // Fallback to server-side search if no client-side results
          const serverResults = await performServerSearch(term);
          setResults(serverResults);
          setIsSearching(false);
        }
      } catch (err) {
        console.error('Search error:', err);
        setSearchError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setResults([]);
        setIsSearching(false);
      }
    },
    [state.pages, isSearching, searchTerm, performServerSearch, couldBeCaseForm]
  );

  return {
    searchTerm,
    setSearchTerm,
    results,
    isSearching,
    searchError,
    performSearch,
  };
}
