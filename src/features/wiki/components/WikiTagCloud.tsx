'use client';

import React from 'react';
import { useWikiContext } from '../context/WikiContext';

interface WikiTagCloudProps {
  onTagClick?: (tag: string) => void;
  maxTags?: number;
}

export function WikiTagCloud({ onTagClick, maxTags = 20 }: WikiTagCloudProps) {
  const { state } = useWikiContext();
  
  // Собираем все теги со страниц и подсчитываем их частоту
  const tagCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    
    Object.values(state.pages).forEach(page => {
      page.tags?.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxTags);
  }, [state.pages, maxTags]);

  if (tagCounts.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Теги</h3>
        <p className="text-gray-500 text-sm">Теги не найдены</p>
      </div>
    );
  }

  const maxCount = Math.max(...tagCounts.map(([, count]) => count));

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Популярные теги</h3>
      <div className="flex flex-wrap gap-2">
        {tagCounts.map(([tag, count]) => {
          const size = Math.max(0.8, count / maxCount);
          const opacity = Math.max(0.6, count / maxCount);
          
          return (
            <button
              key={tag}
              onClick={() => onTagClick?.(tag)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-200 transition-colors"
              style={{
                fontSize: `${0.75 + size * 0.25}rem`,
                opacity
              }}
              title={`${count} ${count === 1 ? 'статья' : count < 5 ? 'статьи' : 'статей'}`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
