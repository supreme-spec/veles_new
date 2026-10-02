'use client';

import React from 'react';
import { EnhancedWikiContent } from './EnhancedWikiContent';

interface UniversalWikiContentProps {
  content: string;
  title?: string;
  className?: string;
  showTitle?: boolean;
  enableEnhancements?: boolean;
}

/**
 * Универсальный компонент для отображения wiki-контента
 * Может использоваться в любом месте приложения
 */
export function UniversalWikiContent({ 
  content, 
  title,
  className = '',
  showTitle = true,
  enableEnhancements = true
}: UniversalWikiContentProps) {
  
  if (enableEnhancements) {
    return (
      <div className={`universal-wiki-content ${className}`}>
        {showTitle && title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            {title}
          </h2>
        )}
        <EnhancedWikiContent content={content} />
      </div>
    );
  }

  // Fallback для простого отображения без улучшений
  return (
    <div className={`wiki-content ${className}`}>
      {showTitle && title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
