'use client';

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

/**
 * Универсальный ErrorBoundary компонент для обработки ошибок React
 *
 * Особенности:
 * - Игнорирует ошибки TON Connect SDK (известные проблемы библиотеки)
 * - Предоставляет fallback UI при ошибках
 * - Логирует ошибки для отладки
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Игнорируем известные ошибки TON Connect SDK
    // Эти ошибки не критичны и не должны ломать приложение
    const isTONConnectError =
      error.message?.includes('TON_CONNECT_SDK_ERROR') ||
      error.message?.includes('Operation aborted');

    if (isTONConnectError) {
      // В продакшене не логируем эти ошибки
      if (process.env.NODE_ENV === 'development') {
        console.log('TON Connect ошибка перехвачена ErrorBoundary:', error.message);
      }
      return { hasError: false };
    }

    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Вызываем пользовательский обработчик, если предоставлен
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Логируем только реальные ошибки, не TON Connect
    const isTONConnectError =
      error.message?.includes('TON_CONNECT_SDK_ERROR') ||
      error.message?.includes('Operation aborted');

    if (!isTONConnectError) {
      // В продакшене логируем только критические ошибки
      if (process.env.NODE_ENV === 'production') {
        // Здесь можно отправить в систему мониторинга (Sentry, etc.)
        console.error('ErrorBoundary caught an error:', error.name, error.message);
      } else {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
      }
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Используем пользовательский fallback, если предоставлен
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Стандартный fallback UI
      return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
              Что-то пошло не так
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Произошла ошибка при загрузке компонента. Пожалуйста, попробуйте обновить страницу.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Попробовать снова
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Обновить страницу
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  Детали ошибки (только в dev режиме)
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
