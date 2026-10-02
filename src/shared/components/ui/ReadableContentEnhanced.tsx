'use client';

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Простые SVG иконки вместо @heroicons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

interface ReadableContentProps {
  children: ReactNode;
  showTOC?: boolean;
  className?: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
  estimatedReadTime?: number;
}

export function ReadableContent({ 
  children, 
  showTOC = true, 
  className = '' 
}: ReadableContentProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [tocCollapsed, setTocCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Генерируем TOC из заголовков после небольшой задержки для полного рендеринга
    let observer: IntersectionObserver | null = null;
    let scrollHandler: (() => void) | null = null;

    const generateTOC = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const tocItems: TOCItem[] = [];

      headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id) {
          heading.id = id;
        }
        
        // Подсчитываем примерное время чтения для каждого раздела
        const nextHeading = headings[index + 1];
        let sectionContent = '';
        let currentElement = heading.nextElementSibling;
        
        while (currentElement && currentElement !== nextHeading) {
          sectionContent += currentElement.textContent || '';
          currentElement = currentElement.nextElementSibling;
        }
        
        const wordCount = sectionContent.split(/\s+/).length;
        const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 слов в минуту
        
        tocItems.push({
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1)),
          estimatedReadTime
        });
      });

      setToc(tocItems);

      // Отслеживаем активный заголовок при скролле
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0% -60% 0%' }
      );

      headings.forEach((heading) => observer?.observe(heading));

      // Отслеживаем прогресс чтения
      scrollHandler = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setReadingProgress(progress);
        setIsScrolled(scrollTop > 100);
      };

      window.addEventListener('scroll', scrollHandler);
    };

    // Задержка для обеспечения полного рендеринга контента
    const timeoutId = setTimeout(generateTOC, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [children]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const getTotalReadTime = () => {
    return toc.reduce((total, item) => total + (item.estimatedReadTime || 0), 0);
  };

  const getIconForLevel = (level: number) => {
    switch (level) {
      case 1: return '📚';
      case 2: return '📖';
      case 3: return '📄';
      case 4: return '📝';
      default: return '•';
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Прогресс бар чтения - фиксированный сверху */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Enhanced Table of Contents */}
        {showTOC && toc.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <motion.div
              className={`transition-all duration-300 ${
                isScrolled ? 'sticky top-8' : 'relative'
              }`}
              layout
            >
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden backdrop-blur-sm"
              >
                {/* Заголовок TOC */}
                <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BookOpenIcon className="h-6 w-6" />
                      <h3 className="text-lg font-bold">Содержание</h3>
                    </div>
                    <button
                      onClick={() => setTocCollapsed(!tocCollapsed)}
                      className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: tocCollapsed ? 0 : 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDownIcon className="h-5 w-5" />
                      </motion.div>
                    </button>
                  </div>
                  
                  {/* Статистика чтения */}
                  <div className="mt-4 flex items-center space-x-4 text-sm text-indigo-100">
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="h-4 w-4" />
                      <span>{getTotalReadTime()} мин</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>📊</span>
                      <span>{Math.round(readingProgress)}%</span>
                    </div>
                  </div>
                </div>

                {/* Навигация по разделам */}
                <AnimatePresence>
                  {!tocCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <nav className="p-4 space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
                        {toc.map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => scrollToHeading(item.id)}
                            className={`
                              group relative w-full text-left rounded-xl transition-all duration-300
                              transform hover:scale-[1.02] hover:shadow-md
                              ${item.level === 1 ? 'p-4' : item.level === 2 ? 'p-3 ml-3' : 'p-2 ml-6'}
                              ${activeId === item.id 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105' 
                                : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
                              }
                            `}
                          >
                            {/* Индикатор активности */}
                            {activeId === item.id && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}

                            <div className="flex items-start space-x-3">
                              <span className="text-lg flex-shrink-0 mt-0.5">
                                {getIconForLevel(item.level)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className={`
                                  font-medium leading-tight
                                  ${item.level === 1 ? 'text-base' : 'text-sm'}
                                  ${activeId === item.id ? 'text-white' : 'text-gray-900'}
                                `}>
                                  {item.text}
                                </div>
                                {item.estimatedReadTime && (
                                  <div className={`
                                    text-xs mt-1 opacity-75
                                    ${activeId === item.id ? 'text-white' : 'text-gray-500'}
                                  `}>
                                    📖 {item.estimatedReadTime} мин
                                  </div>
                                )}
                              </div>
                              
                              {/* Стрелочка */}
                              <ChevronRightIcon className={`
                                h-4 w-4 transition-all duration-300 opacity-0 group-hover:opacity-100
                                ${activeId === item.id ? 'text-white' : 'text-indigo-500'}
                              `} />
                            </div>
                          </motion.button>
                        ))}
                      </nav>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Полезные ссылки */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="space-y-2">
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors w-full"
                    >
                      <span>⬆️</span>
                      <span>Наверх</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors w-full"
                    >
                      <span>🖨️</span>
                      <span>Печать</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </aside>
        )}

        {/* Main Content */}
        <main className={`
          ${showTOC && toc.length > 0 ? 'lg:col-span-9 xl:col-span-9' : 'lg:col-span-12'}
        `}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`
              prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-0 dark:prose-h1:text-white
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2 dark:prose-h2:text-white
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 dark:prose-h3:text-white
              prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2 text-gray-900 dark:text-white dark:prose-h4:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-p:leading-8 prose-p:mb-4
              prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
              prose-ul:space-y-2 prose-ul:ml-6
              prose-ol:space-y-2 prose-ol:ml-6
              prose-li:text-gray-700 dark:prose-li:text-gray-200
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-400 
              prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded dark:prose-code:text-gray-200
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-img:rounded-lg prose-img:shadow-lg
              dark:prose-invert
            `}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Мобильное TOC */}
      {showTOC && toc.length > 0 && (
        <div className="lg:hidden fixed bottom-4 right-4 z-40">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTocCollapsed(!tocCollapsed)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg"
          >
            <BookOpenIcon className="h-6 w-6" />
          </motion.button>
          
          <AnimatePresence>
            {!tocCollapsed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border w-80 max-h-96 overflow-y-auto"
              >
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-3">📖 Содержание</h3>
                  <nav className="space-y-1">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          scrollToHeading(item.id);
                          setTocCollapsed(true);
                        }}
                        className={`
                          block w-full text-left text-sm py-2 px-3 rounded-lg transition-colors
                          ${item.level === 2 ? 'ml-4' : ''}
                          ${item.level === 3 ? 'ml-8' : ''}
                          ${activeId === item.id 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >
                        <span className="flex items-center space-x-2">
                          <span>{getIconForLevel(item.level)}</span>
                          <span>{item.text}</span>
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// Компонент для разбивки длинного текста
export function ContentBreaker({ content }: { content: string }) {
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim());
  
  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group"
        >
          <p className="text-lg leading-8 text-gray-700 mb-4 transition-all duration-300 group-hover:text-gray-900">
            {paragraph}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
