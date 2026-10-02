'use client';

import React, { useState } from 'react';
import type { WikiPage } from '../types';
import { useWikiContext } from '../context/WikiContext';

interface WikiPageViewerProps {
  pageId: string;
}

export function WikiPageViewer({ pageId }: WikiPageViewerProps) {
  const { state } = useWikiContext();
  const page = state.pages[pageId];

  if (!page) {
    return <div className="p-4 text-center">Страница не найдена</div>;
  }

  return (
    <div className="wiki-page bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{page.title}</h1>
      </div>

      <div className="text-sm text-gray-500 mb-6 flex items-center">
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        Последнее изменение: {new Date(page.lastModified).toLocaleDateString('ru-RU')}
        {page.creator && (
          <span className="flex items-center ml-3">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            Автор: {page.creator}
          </span>
        )}
      </div>

      {page.tags && page.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b">
          {page.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full border border-blue-200 hover:bg-blue-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="wiki-content prose prose-blue max-w-none prose-headings:font-semibold prose-a:text-blue-600"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}

interface WikiPageEditorProps {
  pageId?: string;
  onSave: (page: Omit<WikiPage, 'id' | 'lastModified'>) => void;
  onCancel: () => void;
}

export function WikiPageEditor({ pageId, onSave, onCancel }: WikiPageEditorProps) {
  const { state } = useWikiContext();
  const existingPage = pageId ? state.pages[pageId] : null;

  const [title, setTitle] = useState(existingPage?.title || '');
  const [content, setContent] = useState(existingPage?.content || '');
  const [tags, setTags] = useState(existingPage?.tags?.join(', ') || '');

  const handleSave = () => {
    onSave({
      title,
      content,
      tags: tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
      creator: existingPage?.creator || 'Текущий пользователь', // Здесь должно быть имя авторизованного пользователя
    });
  };

  return (
    <div className="wiki-editor p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b">
        {pageId ? 'Редактирование страницы' : 'Создание новой страницы'}
      </h2>

      <div className="mb-5">
        <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-700">
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Введите заголовок статьи"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-700">
          Содержание
        </label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg min-h-[400px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Введите содержание статьи (поддерживается HTML)"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Поддерживается HTML-форматирование для создания структурированных статей.
        </p>
      </div>

      <div className="mb-6">
        <label htmlFor="tags" className="block text-sm font-medium mb-2 text-gray-700">
          Теги
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Введите теги через запятую (например: Италия, Европа, путеводитель)"
        />
        <p className="mt-1 text-xs text-gray-500">
          Разделяйте теги запятыми. Теги помогают группировать и находить похожие статьи.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t">
        <button
          onClick={onCancel}
          className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
        >
          Отмена
        </button>
        <button
          onClick={handleSave}
          disabled={!title || !content}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {pageId ? 'Обновить' : 'Создать'}
        </button>
      </div>
    </div>
  );
}
