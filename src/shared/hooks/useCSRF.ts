/**
 * React hook для работы с CSRF токенами
 */

import { useState, useEffect } from 'react';

/**
 * Хук для получения и управления CSRF токеном
 * @returns CSRF токен и функция для обновления
 */
export function useCSRF() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Загружает новый CSRF токен с сервера
   */
  const fetchToken = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/csrf', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const data = await response.json();
      setToken(data.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('[useCSRF] Error fetching token:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем токен при монтировании компонента
  useEffect(() => {
    fetchToken();
  }, []);

  return {
    token,
    isLoading,
    error,
    refreshToken: fetchToken,
  };
}

/**
 * Хук для получения CSRF токена для использования в формах
 * @returns CSRF токен (может быть null во время загрузки)
 */
export function useCSRFToken(): string | null {
  const { token } = useCSRF();
  return token;
}

