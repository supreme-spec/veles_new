'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWikiContext } from '../context';
import type { WikiPage } from '../types';

interface TagCloudProps {
  onSelectTag?: (tag: string) => void;
}

export function WikiTagCloud({ onSelectTag }: TagCloudProps) {
  const { state } = useWikiContext();
  const [popularTags, setPopularTags] = useState<{ name: string; count: number }[]>([]);
  const [tagCategories, setTagCategories] = useState<{
    [key: string]: { name: string; count: number }[];
  }>({});

  useEffect(() => {
    const allPages: WikiPage[] = Object.values(state.pages);

    // Собираем все теги и считаем их количество
    const tagCounts: Record<string, number> = {};

    allPages.forEach((page: WikiPage) => {
      if (page.tags && page.tags.length > 0) {
        page.tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    // Преобразуем в массив и сортируем по популярности
    const tagArray = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Выделяем 3 самых популярных тега
    setPopularTags(tagArray.slice(0, 3));

    // Определяем категории тегов на основе предопределенных списков
    const predefinedCategories: Record<string, string[]> = {
      'Страны и регионы': [
        'Италия',
        'Афганистан',
        'Азия',
        'Европа',
        'страны',
        'регионы',
        'путеводитель',
      ],
      'Типы туризма': [
        'туризм',
        'экотуризм',
        'устойчивый туризм',
        'приключения',
        'активный отдых',
        'пляжи',
        'курорты',
        'направления',
        'море',
      ],
      Активности: ['экстрим', 'адреналин', 'приключения', 'активный отдых', 'природа', 'экология'],
      'Культура и быт': [
        'культура',
        'традиции',
        'история',
        'искусство',
        'гастрономия',
        'кухня',
        'рестораны',
        'кулинария',
        'еда',
      ],
      'Планирование поездки': [
        'советы',
        'багаж',
        'упаковка',
        'подготовка к путешествию',
        'страховка',
        'безопасность',
        'путеводитель',
        'информация',
      ],
      Общее: [],
    };

    const categories: { [key: string]: { name: string; count: number }[] } = {};

    // Инициализируем категории
    Object.keys(predefinedCategories).forEach(category => {
      categories[category] = [];
    });

    // Распределяем теги по категориям
    tagArray.forEach(tag => {
      let categoryFound = false;

      // Проверяем каждую категорию
      for (const [categoryName, categoryTags] of Object.entries(predefinedCategories)) {
        if (categoryName === 'Общее') continue; // Пропускаем категорию "Общее" на этом этапе

        if (categoryTags.includes(tag.name)) {
          if (categories[categoryName]) {
            categories[categoryName].push(tag);
          }
          categoryFound = true;
          break;
        }
      }

      // Если тег не найден ни в одной категории, помещаем в "Общее"
      if (!categoryFound && categories['Общее']) {
        categories['Общее'].push(tag);
      }
    });

    setTagCategories(categories);
  }, [state.pages]);

  const handleTagClick = (tagName: string) => {
    if (onSelectTag) {
      onSelectTag(tagName);
    }
  };

  return (
    <div className="p-5 border rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-medium mb-4 text-gray-800 border-b pb-2">Навигация по тегам</h3>

      {/* Самые популярные теги - выделены */}
      {popularTags.length > 0 && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
          <h4 className="text-sm font-semibold text-blue-700 mb-3">Популярные категории</h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <button
                key={tag.name}
                onClick={() => handleTagClick(tag.name)}
                className={`px-4 py-2 ${
                  index === 0
                    ? 'bg-blue-600 text-white font-medium shadow-md'
                    : index === 1
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-blue-400 text-white'
                } rounded-full text-sm transition-colors whitespace-nowrap hover:shadow-lg`}
                title={`${tag.name} (${tag.count} статей)`}
              >
                {tag.name} <span className="font-medium ml-1">{tag.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Категории тегов */}
      <div className="space-y-5">
        {Object.entries(tagCategories).map(
          ([category, categoryTags]) =>
            categoryTags.length > 0 && (
              <div key={category} className="border-b pb-4 last:border-b-0">
                <h4 className="text-sm font-medium text-gray-700 mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {categoryTags.map(tag => {
                    const isPopular = popularTags.some(p => p.name === tag.name);
                    return (
                      <button
                        key={tag.name}
                        onClick={() => handleTagClick(tag.name)}
                        className={`px-3 py-1 ${
                          isPopular
                            ? 'bg-blue-100 text-blue-800 font-medium border border-blue-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                        } hover:bg-blue-100 rounded-full text-sm transition-colors whitespace-nowrap`}
                        title={`${tag.name} (${tag.count} статей)`}
                      >
                        {tag.name}{' '}
                        <span className="text-xs text-blue-600 font-medium">({tag.count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

interface BreadcrumbsProps {
  pageId: string | null;
  pageName?: string;
  categoryId?: string;
  categoryName?: string;
}

export function WikiBreadcrumbs({ pageId, pageName, categoryId, categoryName }: BreadcrumbsProps) {
  const { state } = useWikiContext();

  // Если передан pageId, но не передан pageName, пытаемся найти имя страницы
  const currentPageName = pageName || (pageId && state.pages[pageId]?.title) || 'Страница';

  return (
    <nav className="text-sm breadcrumbs p-3 mb-4 bg-gray-50 rounded-lg border border-gray-100">
      <ol className="flex items-center space-x-2 text-gray-600">
        <li>
          <Link
            href="/wiki"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
          >
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Вики
          </Link>
        </li>

        {(categoryId || categoryName) && (
          <>
            <li className="mx-1 text-gray-400">/</li>
            <li>
              {categoryId ? (
                <Link
                  href={`/wiki/category/${categoryId}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
                >
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
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                  {categoryName || 'Категория'}
                </Link>
              ) : (
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                  {categoryName}
                </span>
              )}
            </li>
          </>
        )}

        {pageId && (
          <>
            <li className="mx-1 text-gray-400">/</li>
            <li className="text-gray-900 font-medium flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              {currentPageName}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

interface RelatedPagesProps {
  pageId: string;
  limit?: number;
}

export function WikiRelatedPages({ pageId, limit = 5 }: RelatedPagesProps) {
  const { state } = useWikiContext();
  const [relatedPages, setRelatedPages] = useState<WikiPage[]>([]);

  useEffect(() => {
    const currentPage = state.pages[pageId];
    if (!currentPage || !currentPage.tags || currentPage.tags.length === 0) {
      setRelatedPages([]);
      return;
    }

    // Находим страницы с похожими тегами
    const allPages = Object.values(state.pages);
    const otherPages = allPages.filter(page => page.id !== pageId);

    const pagesWithScore = otherPages.map(page => {
      // Считаем количество общих тегов
      const commonTags = page.tags?.filter(tag => currentPage.tags?.includes(tag)) || [];

      return {
        page,
        score: commonTags.length,
      };
    });

    // Сортируем по количеству общих тегов
    pagesWithScore.sort((a, b) => b.score - a.score);

    // Берем только страницы, у которых есть хотя бы один общий тег
    const related = pagesWithScore
      .filter(item => item.score > 0)
      .map(item => item.page)
      .slice(0, limit);

    setRelatedPages(related);
  }, [pageId, state.pages, limit]);

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t pt-5">
      <h3 className="text-xl font-medium mb-3 text-gray-800">Связанные страницы</h3>
      <ul className="space-y-2 divide-y divide-gray-100">
        {relatedPages.map(page => (
          <li key={page.id} className="pt-2 first:pt-0">
            <Link
              href={`/wiki/${page.id}`}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
