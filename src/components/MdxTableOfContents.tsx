'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TOCItem {
  id: string;
  title: string;
  level: number;
  estimatedReadTime?: number;
}

interface MdxTableOfContentsProps {
  mdxContent: React.ReactNode;
  className?: string;
  compactMode?: boolean;
  showReadingTime?: boolean;
}

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ListIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

export function MdxTableOfContents({
  mdxContent,
  className = '',
  compactMode = true,
  showReadingTime = true
}: MdxTableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalReadTime, setTotalReadTime] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!isClient) return;

    const extractHeadings = () => {
      setTimeout(() => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocItems: TOCItem[] = [];
        let totalWords = 0;
        const seenIds = new Set<string>();

        headings.forEach((heading, index) => {
          let id = heading.id || `heading-${index}`;
          if (seenIds.has(id)) {
            id = `${id}-${index}`;
          }
          seenIds.add(id);
          heading.id = id;

          const level = parseInt(heading.tagName.charAt(1));
          const title = heading.textContent?.trim() || '';

          const shouldInclude = compactMode ? level >= 2 && level <= 3 : level >= 1 && level <= 4;

          if (title && shouldInclude) {
            const nextHeading = Array.from(headings).find((h, i) =>
              i > index && parseInt(h.tagName.charAt(1)) <= level
            );

            let sectionContent = '';
            let currentElement = heading.nextElementSibling;

            while (currentElement && currentElement !== nextHeading) {
              sectionContent += currentElement.textContent || '';
              currentElement = currentElement.nextElementSibling;
            }

            const wordCount = sectionContent.split(/\s+/).length;
            const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));
            totalWords += wordCount;

            tocItems.push({
              id,
              title: compactMode && title.length > 60 ? title.substring(0, 60) + '...' : title,
              level,
              estimatedReadTime
            });
          }
        });

        setToc(tocItems);
        setTotalReadTime(Math.ceil(totalWords / 200));
      }, 1500);
    };

    extractHeadings();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%' }
    );

    setTimeout(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading) => observer.observe(heading));
    }, 2000);

    return () => {
      observer.disconnect();
    };
  }, [compactMode, mdxContent, isClient]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    }
  };

  if (!isClient || toc.length === 0) {
    return (
      <div className={`mdx-table-of-contents-placeholder ${className}`}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-pulse">
              <ListIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-700">
                📖 Содержание загружается...
              </h3>
              <p className="text-sm text-blue-600 mt-1">
                Подготовка оглавления путеводителя
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-8 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        aria-expanded={isExpanded}
        aria-controls="toc-content"
      >
        <div className="flex items-center gap-2">
          <ListIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-gray-900 dark:text-white text-base">
            📖 Содержание путеводителя
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {showReadingTime && (
            <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:inline">
              ⏱️ {totalReadTime} мин • {toc.length} разделов
            </span>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id="toc-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 text-lg">💡</span>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Нажмите на любой раздел, чтобы быстро перейти к нему
                  </p>
                </div>
              </div>

              <nav className="space-y-1">
                {toc.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group ${
                      activeId === item.id
                        ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-semibold'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 0.75 + 0.75}rem` }}
                  >
                    <span className="text-sm line-clamp-2">{item.title}</span>
                    {item.estimatedReadTime && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                        {item.estimatedReadTime} мин
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {showReadingTime && (
                <div className="sm:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    ⏱️ {totalReadTime} мин чтения • {toc.length} разделов
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}