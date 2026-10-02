import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReadableContent = dynamic(
  () => import('@/shared/components/ui/ReadableContentEnhanced').then((m) => m.ReadableContent)
);

import { WikiStatsDisplay } from '@/components/WikiStatsDisplay';

// Metadata moved to layout.tsx or handled via head

// Компонент навигации по разделам введения
const IntroNavigation = ({ currentSection }: { currentSection?: string }) => {
  const sectionGroups = {
    Основное: [
      { id: 'overview', title: '🏠 Обзор', path: `/wiki/intro` },
      { id: 'features', title: '✨ Возможности', path: `/wiki/intro#features` },
    ],
    'Начало работы': [
      { id: 'how-to-start', title: '🏁 Как начать', path: `/wiki/intro#how-to-start` },
      { id: 'technology', title: '⚡ Технологии', path: `/wiki/intro#technology` },
    ],
    Развитие: [{ id: 'support', title: '💬 Поддержка', path: `/wiki/intro#support` }],
  };

  return (
    <nav className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
        📖 Разделы путеводителя
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(sectionGroups).map(([groupName, sections]) => (
          <div
            key={groupName}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600"
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              {groupName}
            </h4>
            <div className="space-y-2">
              {sections.map(section => (
                <Link
                  key={section.id}
                  href={section.path}
                  className={`
                    block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${
                      currentSection === section.id ||
                      (!currentSection && section.id === 'overview')
                        ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                        : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-600 hover:text-indigo-800 dark:hover:text-indigo-300'
                    }
                  `}
                >
                  {section.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default function WikiIntroPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/wiki" className="hover:text-blue-600 dark:hover:text-blue-400">
            Википедия
          </Link>
          {' > '}
          <span className="text-gray-900 dark:text-white font-medium">Введение</span>
        </nav>

        {/* Navigation */}
        <IntroNavigation />

        {/* Content with enhanced layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Enhanced Content Renderer */}
            <ReadableContent showTOC={false}>
              <article className="prose prose-lg dark:prose-invert max-w-none">
                {/* Заголовок */}
                <header className="mb-8 text-center">
                  <h1 className="text-4xl font-extrabold mb-4">
                    <span className="mr-2">🧭</span>
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
                      Добро пожаловать в Велес Вояж
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Путеводитель нового поколения с инновационными технологиями
                  </p>
                </header>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    🚀 Что такое Велес Вояж?
                  </h2>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                    Велес Вояж — это инновационная платформа для путешественников, которая
                    объединяет традиционные путеводители с современными технологиями. Мы создаем не
                    просто справочник стран, а интерактивную экосистему для планирования и
                    совершения путешествий.
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-800/90 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      🏢 Мы — лицензированное турагентство
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                      Велес Вояж работает как полноценное турагентство с официальной лицензией. Мы
                      не только предоставляем информацию о путешествиях, но и помогаем организовать
                      ваше путешествие от А до Я:
                    </p>
                    <ul className="text-gray-800 dark:text-gray-100 text-sm mt-3 ml-2 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <strong className="text-gray-900 dark:text-white font-semibold">Бронирование отелей</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <strong className="text-gray-900 dark:text-white font-semibold">Покупка авиабилетов</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <strong className="text-gray-900 dark:text-white font-semibold">Туристическое страхование</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <strong className="text-gray-900 dark:text-white font-semibold">Персональные маршруты</strong>
                      </li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mt-3">
                      Наши сертифицированные специалисты обеспечивают профессиональную поддержку на
                      всех этапах вашего путешествия.
                    </p>
                  </div>
                </div>

                <h2 id="features">✨ Ключевые особенности</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🏢 Турагентство полного цикла
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Лицензированное турагентство с полным спектром услуг: бронирование отелей,
                      авиабилеты, визовая поддержка, страхование и персональные маршруты.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      📚 Подробная энциклопедия
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Подробная информация о 195+ странах мира с актуальными данными о визах,
                      транспорте, достопримечательностях и культуре.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      📱 Адаптивный дизайн
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Адаптивный дизайн и PWA поддержка для комфортного использования на любых
                      устройствах, включая офлайн режим.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🎯 Умная навигация
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Интеллектуальная система навигации и поиска, которая помогает быстро находить
                      нужную информацию.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      👨‍💼 Персональные консультации
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Наши сертифицированные специалисты предоставляют индивидуальные консультации и
                      помогают выбрать оптимальное путешествие.
                    </p>
                  </div>
                </div>

                <h2 id="how-to-start">🏁 Как начать использовать</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Изучите энциклопедию стран
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Начните с изучения интересующих вас направлений в разделе{' '}
                        <Link
                          href="/wiki"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Энциклопедия
                        </Link>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Получите консультацию специалиста
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Свяжитесь с нашими экспертами в разделе{' '}
                        <Link
                          href="/contacts"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Контакты
                        </Link>{' '}
                        для персональной консультации и подбора тура.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Планируйте маршрут
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Используйте наш планировщик путешествий для создания идеального маршрута с
                        учетом ваших интересов и бюджета.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 id="technology">⚡ Технологии и инновации</h2>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    🔬 Современные технологии
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        AI-ассистенты
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Искусственный интеллект помогает подбирать маршруты, рекомендовать
                        достопримечательности и оптимизировать бюджет.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Офлайн-режим
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Все данные доступны без интернета, карты и путеводители работают в
                        автономном режиме.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        PWA-приложение
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Установите как приложение на смартфон для максимального удобства
                        использования.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Мультиязычность
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Интерфейс доступен на нескольких языках, автоматический перевод контента.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 id="support">💬 Поддержка и помощь</h2>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    🆘 Нужна помощь?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📞</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        Телефон
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Круглосуточная поддержка
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">💬</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Чат</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Мгновенные ответы</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">📧</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Подробные консультации
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 text-center">
                      Наши специалисты всегда готовы помочь вам с планированием путешествия,
                      решением возникших вопросов и обеспечением комфортного отдыха.
                    </p>
                  </div>
                </div>
              </article>
            </ReadableContent>
          </div>

          {/* Sidebar with stats and quick links */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <WikiStatsDisplay />

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Быстрые ссылки
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/wiki/countries"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline"
                  >
                    🌍 Все страны
                  </Link>
                  <Link
                    href="/wiki/destinations"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline"
                  >
                    🏝️ Популярные направления
                  </Link>
                  <Link
                    href="/wiki/travel-tips"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline"
                  >
                    💡 Советы путешественникам
                  </Link>
                  <Link
                    href="/wiki/culture"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline"
                  >
                    🎭 Культура народов
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
