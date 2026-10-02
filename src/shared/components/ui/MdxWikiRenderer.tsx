'use client';

import React from 'react';
import type { WikiPage } from '@/features/wiki/types';
import { MdxContentRenderer } from './MdxContentRenderer';

interface MdxWikiRendererProps {
  page: WikiPage;
}

/**
 * Компонент для рендеринга MDX странничных статей
 * Использует специализированный рендерер для обработки MDX компонентов
 */
export function MdxWikiRenderer({ page }: MdxWikiRendererProps) {
  const currentCountryId: string | undefined =
    typeof window !== 'undefined'
      ? window.location.pathname.split('/').pop()?.toLowerCase()
      : undefined;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {/* Заголовок */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{page.title}</h1>

        {/* Основной контент с поддержкой MDX компонентов */}
        <MdxContentRenderer content={page.content || ''} currentCountryId={currentCountryId} />

        {/* Футер страницы */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Последнее обновление: {new Date(page.lastModified).toLocaleDateString('ru-RU')}
          </div>
        </footer>
      </div>
    </article>
  );
}
