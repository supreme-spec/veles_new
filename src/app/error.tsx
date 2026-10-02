'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);

    const message = error?.message || '';
    if (
      message.includes('ChunkLoadError') ||
      message.includes('Loading chunk') ||
      message.includes('Failed to fetch dynamically imported module')
    ) {
      console.warn('[GlobalError] Reloading after chunk load failure');
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Что-то пошло не так!</h1>
        <p className="text-gray-700 mb-6">
          Произошла непредвиденная ошибка. Наши специалисты уже работают над решением проблемы.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Попробовать снова
        </button>
        <div className="mt-6">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Вернуться на главную страницу
          </Link>
        </div>
      </div>
    </div>
  );
}