'use client';

import React from 'react';
import { EnhancedWikiContent } from './EnhancedWikiContent';
import { ContentRenderer } from './ContentRenderer';
import { autoLinkContent } from '@/shared/utils/internalLinking';
import type { WikiPage } from '@/features/wiki/types';

interface WikiPageRendererProps {
  page: WikiPage;
  currentCountryId?: string;
  className?: string;
  showFullContent?: boolean;
  showTOC?: boolean;
}

export function WikiPageRenderer({
  page,
  currentCountryId,
  className = '',
  showFullContent: _showFullContent = true,
  showTOC: _showTOC = true,
}: WikiPageRendererProps) {
  // Function to clean titles from emojis
  const cleanTitle = (title: string): string => {
    let cleanedTitle = title;

    // Split by colon first (for titles like "🏖️ Абхазия: полный гид...")
    if (cleanedTitle.includes(':')) {
      cleanedTitle = cleanedTitle.split(':')[0] || cleanedTitle;
    }
    // Then try em dash (for titles like "Country — description")
    else if (cleanedTitle.includes('—')) {
      cleanedTitle = cleanedTitle.split('—')[0] || cleanedTitle;
    }

    // Extract text with Cyrillic or Latin letters (removes emojis)
    const match = cleanedTitle.match(
      /([\u0410-\u044f\u0041-\u005a\u0061-\u007a][\u0410-\u044f\u0041-\u005a\u0061-\u007a\s]*)/
    );
    if (match && match[1]) {
      cleanedTitle = match[1].trim();
    }

    return cleanedTitle || title.split(' ')[1] || title; // fallback to second word or full title
  };

  // Check if content is JSON array
  let isJsonContent = false;
  let parsedContent;

  try {
    // Try to parse as JSON first
    parsedContent = JSON.parse(page.content);
    isJsonContent = Array.isArray(parsedContent);
  } catch (error) {
    // If parsing fails, content is plain HTML string
    isJsonContent = false;
    parsedContent = null;
  }

  // If content is JSON array, render with ContentRenderer
  if (isJsonContent && parsedContent && Array.isArray(parsedContent)) {
    return (
      <div className={`wiki-page-renderer ${className}`}>
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {cleanTitle(page.title)}
          </h1>

          {page.tags && page.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {page.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <ContentRenderer content={parsedContent} />

        {/* Page Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-1">
                <span className="font-medium">Последнее обновление:</span>{' '}
                {new Date(page.lastModified).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p>
                <span className="font-medium">Автор:</span> {page.creator}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Поделиться:</span>
              <button
                onClick={() =>
                  navigator.share &&
                  navigator.share({
                    title: page.title,
                    url: window.location.href,
                  })
                }
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                📤
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                🖨️
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // If content is plain HTML string, render with EnhancedWikiContent
  const linkedContent = autoLinkContent(page.content.trim(), currentCountryId);
  return (
    <div className={`wiki-page-renderer ${className}`}>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
          {cleanTitle(page.title)}
        </h1>
      </header>
      <EnhancedWikiContent content={linkedContent} />
    </div>
  );
}
