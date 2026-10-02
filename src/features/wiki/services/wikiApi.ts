import type { WikiPage, WikiCategory, WikiSearchResult } from '../types';

// Базовая функция для выполнения API-запросов
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api/wiki${endpoint}`, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Ошибка API: ${response.status}`);
  }
  
  return response.json();
}

// Получение страницы по ID
export async function getWikiPage(pageId: string): Promise<WikiPage> {
  return fetchAPI<WikiPage>(`/page/${pageId}`);
}

// Получение списка всех страниц
export async function getAllWikiPages(): Promise<WikiPage[]> {
  return fetchAPI<WikiPage[]>('/pages');
}

// Создание новой страницы
export async function createWikiPage(page: Omit<WikiPage, 'id' | 'lastModified'>): Promise<WikiPage> {
  return fetchAPI<WikiPage>('/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(page),
  });
}

// Обновление существующей страницы
export async function updateWikiPage(pageId: string, page: Omit<WikiPage, 'id' | 'lastModified'>): Promise<WikiPage> {
  return fetchAPI<WikiPage>(`/page/${pageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(page),
  });
}

// Удаление страницы
export async function deleteWikiPage(pageId: string): Promise<void> {
  return fetchAPI<void>(`/page/${pageId}`, {
    method: 'DELETE',
  });
}

// Поиск по вики
export async function searchWiki(query: string): Promise<WikiSearchResult[]> {
  return fetchAPI<WikiSearchResult[]>(`/search?q=${encodeURIComponent(query)}`);
}

// Получение категории
export async function getWikiCategory(categoryId: string): Promise<WikiCategory> {
  return fetchAPI<WikiCategory>(`/category/${categoryId}`);
}

// Получение всех категорий
export async function getAllWikiCategories(): Promise<WikiCategory[]> {
  return fetchAPI<WikiCategory[]>('/categories');
}

// Создание новой категории
export async function createWikiCategory(category: Omit<WikiCategory, 'id'>): Promise<WikiCategory> {
  return fetchAPI<WikiCategory>('/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
}

// Обновление категории
export async function updateWikiCategory(categoryId: string, category: Omit<WikiCategory, 'id'>): Promise<WikiCategory> {
  return fetchAPI<WikiCategory>(`/category/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
}

// Удаление категории
export async function deleteWikiCategory(categoryId: string): Promise<void> {
  return fetchAPI<void>(`/category/${categoryId}`, {
    method: 'DELETE',
  });
}
