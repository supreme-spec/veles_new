'use client';

import React from 'react';
import Link from 'next/link';
import { useWikiContext } from '../context/WikiContext';
import type { WikiPage } from '../types';

interface WikiRelatedPagesProps {
  currentPageId: string;
  maxPages?: number;
}

export function WikiRelatedPages({ currentPageId, maxPages = 5 }: WikiRelatedPagesProps) {
  const { state } = useWikiContext();
  const currentPage = state.pages[currentPageId];
  
  const relatedPages = React.useMemo(() => {
    if (!currentPage || !currentPage.tags) return [];
    
    const allPages = Object.values(state.pages);
    const scored: Array<{ page: WikiPage; score: number }> = [];
    
    allPages.forEach(page => {
      if (page.id === currentPageId || !page.tags) return;
      
      // Подсчитываем количество общих тегов
      const commonTags = page.tags.filter(tag => 
        currentPage.tags!.includes(tag)
      );
      
      if (commonTags.length > 0) {
        scored.push({
          page,
          score: commonTags.length
        });
      }
    });
    
    // Сортируем по количеству общих тегов и берём топ
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, maxPages)
      .map(item => item.page);
  }, [state.pages, currentPageId, currentPage, maxPages]);

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        Похожие статьи
      </h3>
      <div className="space-y-3">
        {relatedPages.map(page => (
          <Link 
            key={page.id}
            href={`/wiki/${page.id}`}
            className="block p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
          >
            <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
              {page.title}
            </h4>
            {page.tags && page.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {page.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {page.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-400">
                    +{page.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
