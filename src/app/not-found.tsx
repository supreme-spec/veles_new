import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница не найдена — 404 | Велес Вояж',
  description: 'Страница не найдена. Вернитесь на главную или выберите направление для путешествия с Велес Вояж.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="text-9xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Страница не найдена
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Возможно, страница была удалена или вы перешли по неверной ссылке.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            На главную
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors border border-blue-200"
          >
            Выбрать тур
          </Link>
        </div>
      </div>
    </div>
  );
}
