'use client';

import React, { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { WikiPage, WikiCategory, WikiState } from '../types';

// Определение типов действий
type WikiAction =
  | { type: 'FETCH_PAGES_START' }
  | { type: 'FETCH_PAGES_SUCCESS'; payload: Record<string, WikiPage> }
  | { type: 'FETCH_PAGES_ERROR'; payload: string }
  | { type: 'ADD_PAGE'; payload: WikiPage }
  | { type: 'UPDATE_PAGE'; payload: WikiPage }
  | { type: 'DELETE_PAGE'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: WikiCategory }
  | { type: 'UPDATE_CATEGORY'; payload: WikiCategory }
  | { type: 'DELETE_CATEGORY'; payload: string };

// Начальное состояние
const initialState: WikiState = {
  pages: {},
  categories: {},
  isLoading: false,
  error: null,
};

// Редуктор для обработки действий
function wikiReducer(state: WikiState, action: WikiAction): WikiState {
  switch (action.type) {
    case 'FETCH_PAGES_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_PAGES_SUCCESS':
      return { ...state, pages: action.payload, isLoading: false };
    case 'FETCH_PAGES_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'ADD_PAGE':
      return {
        ...state,
        pages: { ...state.pages, [action.payload.id]: action.payload },
      };
    case 'UPDATE_PAGE':
      return {
        ...state,
        pages: { ...state.pages, [action.payload.id]: action.payload },
      };
    case 'DELETE_PAGE': {
      const newPages = { ...state.pages };
      delete newPages[action.payload];
      return { ...state, pages: newPages };
    }
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: { ...state.categories, [action.payload.id]: action.payload },
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: { ...state.categories, [action.payload.id]: action.payload },
      };
    case 'DELETE_CATEGORY': {
      const newCategories = { ...state.categories };
      delete newCategories[action.payload];
      return { ...state, categories: newCategories };
    }
    default:
      return state;
  }
}

// Создание контекста
interface WikiContextType {
  state: WikiState;
  dispatch: React.Dispatch<WikiAction>;
}

const WikiContext = createContext<WikiContextType | undefined>(undefined);

// Провайдер контекста
interface WikiProviderProps {
  children: ReactNode;
}

export function WikiProvider({ children }: WikiProviderProps) {
  const [state, dispatch] = useReducer(wikiReducer, initialState);

  // Загружаем страницы Wiki при инициализации
  React.useEffect(() => {
    // Импортируем статические страницы
    import('@/shared/data/wikiPages').then((mod) => {
      if (mod.wikiPages) {
        dispatch({ type: 'FETCH_PAGES_SUCCESS', payload: mod.wikiPages });
      }
    });
  }, []);

  return (
    <WikiContext.Provider value={{ state, dispatch }}>
      {children}
    </WikiContext.Provider>
  );
}

// Хук для использования контекста
export function useWikiContext() {
  const context = useContext(WikiContext);
  if (context === undefined) {
    throw new Error('useWikiContext должен использоваться внутри WikiProvider');
  }
  return context;
}
