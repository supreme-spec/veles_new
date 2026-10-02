'use client';

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://veles-voyage.ru/" />
        <title>Временная ошибка | Велес Вояж</title>
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Произошла ошибка
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Приносим извинения за неудобства. Попробуйте обновить страницу.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
