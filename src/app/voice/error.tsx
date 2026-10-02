'use client';

export default function VoiceError({ error, reset }: { error: Error; reset: () => void }) {
  console.error('[voice] Page error:', error);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Страница временно недоступна</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {error.message || 'Произошла ошибка при загрузке страницы'}
      </p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Попробовать снова
      </button>
    </div>
  );
}
