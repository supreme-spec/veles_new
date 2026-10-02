import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReadableContent = dynamic(
  () => import('@/shared/components/ui/ReadableContentEnhanced').then((m) => m.ReadableContent)
);

export const metadata: Metadata = {
  title: 'Культура народов мира | Традиции и обычаи | Велес Вояж',
  description:
    'Изучите культурные традиции, обычаи, кухню и особенности разных народов мира. Подробные гиды по культурному наследию стран для путешественников 2026.',
  keywords: [
    'культура',
    'традиции',
    'обычаи',
    'кухня',
    'народы мира',
    'культурное наследие',
    'путешествия',
    'Велес Вояж',
    'культура стран',
    'этнография',
    'национальные традиции',
    'религиозные обычаи',
    'праздники народов',
    'этикет разных стран',
    'культурный туризм',
    'туризм 2026',
    'путеводитель по культуре',
    'культурные особенности',
    'межкультурное общение',
  ],
  openGraph: {
    title: 'Культура народов мира',
    description: 'Традиции, обычаи, кухня и культурные особенности разных народов',
    type: 'article',
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4',
    yandex:
      process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 ||
      process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 ||
      '1b9d713dc3f02bed',
    other: {
      'yandex-verification':
        process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 ||
        process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 ||
        '1b9d713dc3f02bed',
      'tg:site_verification':
        process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || 'veles_voyage_official',
    },
  },
};

// Компонент навигации по культурным регионам
const CultureNavigation = ({ currentSection }: { currentSection?: string }) => {
  const sectionGroups = {
    Регионы: [
      { id: 'europe', title: '🏰 Европа', path: `/wiki/culture#europe` },
      { id: 'asia', title: '🏮 Азия', path: `/wiki/culture#asia` },
      { id: 'americas', title: '🦅 Америки', path: `/wiki/culture#americas` },
    ],
    Аспекты: [
      { id: 'traditions', title: '🎯 Традиции', path: `/wiki/culture#traditions` },
      { id: 'cuisine', title: '🍽️ Кухня', path: `/wiki/culture#cuisine` },
      { id: 'etiquette', title: '🤝 Этикет', path: `/wiki/culture#etiquette` },
    ],
  };

  return (
    <nav className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
        🎭 Культурные разделы
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(sectionGroups).map(([groupName, sections]) => (
          <div
            key={groupName}
            className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-4 border border-gray-100 dark:border-gray-600"
          >
            <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3 uppercase tracking-wide">
              {groupName}
            </h4>
            <div className="space-y-2">
              {sections.map(section => (
                <Link
                  key={section.id}
                  href={section.path}
                  className={`
                    block px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200
                    ${
                      currentSection === section.id
                        ? 'bg-purple-600 text-white shadow-md transform scale-105'
                        : 'text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-600/70 hover:text-purple-800 dark:hover:text-white'
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

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/wiki" className="hover:text-blue-600 dark:hover:text-blue-400">
            Википедия
          </Link>
          {' > '}
          <span className="text-gray-900 dark:text-white font-medium">Культура</span>
        </nav>

        {/* Navigation */}
        <CultureNavigation />

        {/* Content with enhanced layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ReadableContent showTOC={false}>
              <article className="prose prose-lg dark:prose-invert max-w-none">
                {/* Заголовок */}
                <header className="mb-8 text-center">
                  <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
                    <span className="mr-2">🎭</span>
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent drop-shadow-md">
                      Культура народов мира
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-200 leading-relaxed">
                    Откройте для себя удивительное разнообразие традиций, обычаев и культурных
                    особенностей народов планеты
                  </p>
                </header>

                {/* Вводная информация */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    🌍 Культурное разнообразие мира
                  </h2>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                    Каждая страна мира обладает уникальным культурным наследием, сформированным
                    тысячелетиями истории. Понимание местной культуры — ключ к незабываемым
                    путешествиям и глубокому погружению в атмосферу каждого уголка нашей планеты.
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-900/70 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      🗺️ Что вы найдете в этом разделе
                    </h3>
                    <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-2 list-none pl-0">
                      <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <span className="text-blue-500 mr-2 font-bold">•</span>
                        <span><strong className="text-gray-900 dark:text-white font-bold">Традиции и обычаи</strong> разных народов</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <span className="text-blue-500 mr-2 font-bold">•</span>
                        <span><strong className="text-gray-900 dark:text-white font-bold">Кулинарные особенности</strong> национальных кухонь</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <span className="text-blue-500 mr-2 font-bold">•</span>
                        <span><strong className="text-gray-900 dark:text-white font-bold">Праздники и фестивали</strong> по всему миру</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <span className="text-blue-500 mr-2 font-bold">•</span>
                        <span><strong className="text-gray-900 dark:text-white font-bold">Этикет и правила поведения</strong> в разных странах</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <span className="text-blue-500 mr-2 font-bold">•</span>
                        <span><strong className="text-gray-900 dark:text-white font-bold">Практические советы</strong> для культурного погружения</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h2 id="europe" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">🏰 Европейская культура</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇮🇹 Средиземноморье
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                      Страстная и экспрессивная культура Италии, Испании, Греции. Семейные ценности,
                      сиеста, долгие застолья и жизнь на площадях.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/italiya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇮🇹
                        </span>
                        <span className="relative z-10">Италия</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/spain"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇪🇸
                        </span>
                        <span className="relative z-10">Испания</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/gretsiya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇬🇷
                        </span>
                        <span className="relative z-10">Греция</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇩🇪 Северная Европа
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                      Пунктуальность, порядок и качество жизни. Hygge в Дании, немецкая
                      организованность, скандинавский минимализм.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/germaniya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇩🇪
                        </span>
                        <span className="relative z-10">Германия</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/denmark"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇩🇰
                        </span>
                        <span className="relative z-10">Дания</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/sweden"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇸🇪
                        </span>
                        <span className="relative z-10">Швеция</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <h2 id="asia" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">🏮 Азиатская культура</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇯🇵 Восточная Азия
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                      Уважение к старшим, коллективизм, дисциплина. Японский минимализм, китайская
                      философия, корейская современность.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/yaponiya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇯🇵
                        </span>
                        <span className="relative z-10">Япония</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/kitai-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇨🇳
                        </span>
                        <span className="relative z-10">Китай</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/uzhnaya-koreya-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇰🇷
                        </span>
                        <span className="relative z-10">Южная Корея</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇹🇭 Юго-Восточная Азия
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                      Буддийские ценности, улыбки, острая кухня. Тайская jai yen, вьетнамская
                      трудолюбивость, индонезийское разнообразие.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/tailand-gid"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇹🇭
                        </span>
                        <span className="relative z-10">Таиланд</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/vietnam"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇻🇳
                        </span>
                        <span className="relative z-10">Вьетнам</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/indonesia"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇮🇩
                        </span>
                        <span className="relative z-10">Индонезия</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <h2 id="americas" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">🦅 Культура Америк</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇺🇸 Северная Америка
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                      Мультикультурное общество, инновации, разнообразие. Американская мечта,
                      канадская терпимость, мексиканская страсть.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/usa"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇺🇸
                        </span>
                        <span className="relative z-10">США</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/canada"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇨🇦
                        </span>
                        <span className="relative z-10">Канада</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/mexico"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇲🇽
                        </span>
                        <span className="relative z-10">Мексика</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🇧🇷 Латинская Америка
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                      Страстность, музыка, танцы. Бразильский карнавал, аргентинское танго,
                      колумбийская кофе-культура.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/wiki/brazil"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇧🇷
                        </span>
                        <span className="relative z-10">Бразилия</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/argentina"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇦🇷
                        </span>
                        <span className="relative z-10">Аргентина</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href="/wiki/peru"
                        prefetch={false}
                        className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/60 shadow-sm"
                      >
                        <span className="text-xl relative z-10 transform group-hover:scale-110 transition-transform">
                          🇵🇪
                        </span>
                        <span className="relative z-10">Перу</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <h2 id="traditions" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">🎯 Народные традиции и обычаи</h2>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border border-purple-200 dark:border-gray-700 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    🎭 Традиционные праздники и обряды
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">
                        Евро-азиатские традиции
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-1.5 list-none pl-0">
                        <li>• <strong className="text-gray-900 dark:text-white">Японские</strong> чайные церемонии</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Испанские</strong> корриды и фланерия</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Индийские</strong> свадебные ритуалы</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Русская</strong> баня и парение</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">
                        Американские обычаи
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-1.5 list-none pl-0">
                        <li>• <strong className="text-gray-900 dark:text-white">Мексиканские</strong> Дни мертвых</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Бразильский</strong> карнавал</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Американский</strong> Тыквенный фестиваль</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Канадский</strong> День благодарения</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 id="cuisine" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">🍽️ Кулинарные традиции</h2>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    🍜 Национальные кухни мира
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Европейская кухня
                      </h4>
                      <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                        Итальянская паста, французские сыры, испанская паэлья, немецкие колбасы
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Азиатская кухня
                      </h4>
                      <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                        Японские суши, китайские димсамы, тайские куриные супы, индийские карри
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Американская кухня
                      </h4>
                      <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                        Мексиканские тако, американские бургеры, бразильские асадо, канадские
                        кленовые сиропы
                      </p>
                    </div>
                  </div>
                </div>

                <h2 id="etiquette" className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">🤝 Этикет и правила поведения</h2>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    🤝 Культурный этикет в разных странах
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Азиатские страны
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-1.5 list-none pl-0">
                        <li>• <strong className="text-gray-900 dark:text-white">Обувь:</strong> Снимайте обувь перед входом в дом</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Жесты:</strong> Не показывайте подошву ноги</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Уважение:</strong> Используйте обе руки при передаче предметов</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Иерархия:</strong> Уважайте возрастную иерархию</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Европейские страны
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-1.5 list-none pl-0">
                        <li>• <strong className="text-gray-900 dark:text-white">Время:</strong> Пунктуальность считается признаком уважения</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Вежливость:</strong> Обслуживайте даму первой</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Жесты:</strong> Не указывайте пальцем на людей</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Такт:</strong> Извиняйтесь за чихание и кашель</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Американские страны
                      </h4>
                      <ul className="text-gray-700 dark:text-gray-200 text-sm space-y-1.5 list-none pl-0">
                        <li>• <strong className="text-gray-900 dark:text-white">Диалог:</strong> Прямое общение ценится как честность</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Дистанция:</strong> Персональное пространство важно</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Дружелюбие:</strong> Улыбайтесь незнакомцам</li>
                        <li>• <strong className="text-gray-900 dark:text-white">Сервис:</strong> Оставляйте чаевые 15-20%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </ReadableContent>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Популярные культуры
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/wiki/japan-culture"
                    className="block text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 font-medium hover:underline transition-colors"
                  >
                    🇯🇵 Японская культура
                  </Link>
                  <Link
                    href="/wiki/italian-culture"
                    className="block text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 font-medium hover:underline transition-colors"
                  >
                    🇮🇹 Итальянская культура
                  </Link>
                  <Link
                    href="/wiki/french-culture"
                    className="block text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 font-medium hover:underline transition-colors"
                  >
                    🇫🇷 Французская культура
                  </Link>
                  <Link
                    href="/wiki/mexican-culture"
                    className="block text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 font-medium hover:underline transition-colors"
                  >
                    🇲🇽 Мексиканская культура
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-purple-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  🌟 Советы путешественникам
                </h3>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2.5 text-sm list-none pl-0">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    <span>Изучайте местные обычаи перед поездкой</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    <span>Уважайте религиозные традиции</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    <span>Наблюдайте за поведением местных жителей</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    <span>Спросите разрешения перед фотографированием</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
