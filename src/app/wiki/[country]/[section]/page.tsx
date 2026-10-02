'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Функция для извлечения секции из контента
function extractSection(_content: string, _sectionTitles: string[]): string | null {
  // Упрощенная реализация
  return '<p>Контент секции будет добавлен позже</p>';
}

// Маппинг секций к заголовкам
const sectionToContentMapping: Record<string, string[]> = {
  geography: ['География', 'Регионы'],
  history: ['История', 'Культура'],
  visa: ['Визы', 'Правила въезда'],
  transport: ['Транспорт', 'Перелеты'],
  budget: ['Бюджет', 'Цены'],
  food: ['Гастрономия', 'Что пробовать'],
  attractions: ['Достопримечательности', 'Что посмотреть'],
  safety: ['Безопасность', 'Этикет'],
  maps: ['Карты', 'Навигация'],
};

function getSectionTitle(sectionId: string): string {
  const titles: Record<string, string> = {
    geography: '🌍 География и регионы',
    history: '🏛️ История и культура',
    visa: '🛂 Визы и правила въезда',
    transport: '✈️ Транспорт и перемещение',
    budget: '🏨 Бюджет и цены',
    food: '🍽️ Гастрономия',
    attractions: '🗺️ Достопримечательности',
    safety: '🚨 Безопасность и этикет',
    maps: '🗺️ Карты и навигация',
  };
  return titles[sectionId] || sectionId;
}

export default function CountrySectionPage() {
  const params = useParams();
  const countryId = params?.country as string;
  const sectionId = params?.section as string;

  const [wikiPages, setWikiPages] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Заглушка для wiki pages
    setWikiPages({
      [countryId]: {
        title: `${countryId} - путеводитель`,
        content: '',
        tags: [],
        lastModified: new Date().toISOString(),
        creator: 'System',
      },
    });
    setLoading(false);
  }, [countryId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!countryId || !sectionId || !wikiPages[countryId]) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Раздел не найден</h1>
          <p className="text-gray-600 mb-4">Запрашиваемый раздел не существует.</p>
          <Link
            href="/wiki/countries"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Вернуться к списку стран
          </Link>
        </div>
      </div>
    );
  }

  const page = wikiPages[countryId];
  const sectionTitles = sectionToContentMapping[sectionId];

  if (!sectionTitles) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Неизвестный раздел</h1>
          <p className="text-gray-600 mb-4">Раздел "{sectionId}" не поддерживается.</p>
          <Link
            href={`/wiki/${countryId}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Вернуться к обзору страны
          </Link>
        </div>
      </div>
    );
  }

  const sectionContent = extractSection(page.content, sectionTitles);
  const countryName = page.title.split('—')[0].trim() || countryId;

  return (
    <div className="container mx-auto px-4 py-8 pt-20 md:pt-24 max-w-4xl">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link href="/wiki" className="hover:text-blue-600">
          Википедия
        </Link>
        {' > '}
        <Link href="/wiki/countries" className="hover:text-blue-600">
          Страны
        </Link>
        {' > '}
        <Link href={`/wiki/${countryId}`} className="hover:text-blue-600">
          {countryName}
        </Link>
        {' > '}
        <span className="text-gray-900 font-medium">{getSectionTitle(sectionId)}</span>
      </nav>

      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {countryName}: {getSectionTitle(sectionId)}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {page.tags?.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: sectionContent || '<p>Контент раздела будет добавлен позже</p>',
        }}
      />

      {/* Navigation to other sections - Адаптивный дизайн */}
      <section className="mt-12 p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2 justify-center">
            <span className="text-2xl animate-pulse">🧭</span>
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Навигация по разделам</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-6xl mx-auto">
            <Link
              href={`/wiki/${countryId}`}
              className="group relative flex items-center gap-3 p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 hover:border-yellow-300/50 hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <span className="text-xl transition-transform duration-300 group-hover:rotate-12">🏠</span>
              <div>
                <span className="font-semibold text-white group-hover:text-yellow-300 transition-colors block text-sm">
                  Обзор
                </span>
                <span className="text-xs text-white/70 hidden sm:block">Главная страница</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            {[
              { id: 'geography', icon: '🌍', title: 'География', desc: 'Природа и климат' },
              { id: 'history', icon: '🏛️', title: 'История', desc: 'Прошлое страны' },
              { id: 'visa', icon: '🛂', title: 'Визы', desc: 'Въездные правила' },
              { id: 'transport', icon: '🚗', title: 'Транспорт', desc: 'Передвижение' },
              { id: 'budget', icon: '💰', title: 'Бюджет', desc: 'Цены и расходы' },
              { id: 'food', icon: '🍽️', title: 'Еда', desc: 'Кухня и рестораны' },
              { id: 'attractions', icon: '📍', title: 'Достопримечательности', desc: 'Что посмотреть' },
              { id: 'safety', icon: '🛡️', title: 'Безопасность', desc: 'Правила поведения' },
              { id: 'maps', icon: '🗺️', title: 'Карты', desc: 'Навигация' }
            ].map(item => (
              <Link
                key={item.id}
                href={`/wiki/${countryId}/${item.id}`}
                className={`group relative flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                  sectionId === item.id
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-300/50 shadow-inner shadow-yellow-500/20'
                    : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-yellow-300/50 hover:shadow-xl'
                }`}
              >
                <span className="text-xl transition-transform duration-300 group-hover:rotate-12">{item.icon}</span>
                <div>
                  <span className={`font-semibold transition-colors block text-sm ${
                    sectionId === item.id
                      ? 'text-yellow-300'
                      : 'text-white group-hover:text-yellow-300'
                  }`}>
                    {item.title}
                  </span>
                  <span className="text-xs text-white/70 hidden sm:block">{item.desc}</span>
                </div>
                {sectionId === item.id && (
                  <span className="ml-auto text-yellow-300 animate-pulse">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Page Info */}
      <footer className="mt-8 text-sm text-gray-500 border-t pt-4">
        <p>
          Последнее обновление: {new Date(page.lastModified).toLocaleDateString('ru-RU')}| Автор:{' '}
          {page.creator}
        </p>
      </footer>
    </div>
  );
}
