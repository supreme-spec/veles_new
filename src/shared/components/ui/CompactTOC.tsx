'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Простые SVG иконки
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface TOCItem {
  id: string;
  text: string;
  level: number;
  estimatedReadTime?: number;
}

interface CompactTOCProps {
  className?: string;
}

export function CompactTOC({ className = '' }: CompactTOCProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверяем размер экрана
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Генерируем TOC из заголовков
    const generateTOC = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const tocItems: TOCItem[] = [];

      headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id) {
          heading.id = id;
        }

        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent || '';

        // Фильтруем только основные заголовки (h2 для разделов)
        if (level === 2 && text.length > 0 && heading.id) {
          tocItems.push({
            id,
            text: text.length > 50 ? text.substring(0, 50) + '...' : text,
            level,
          });
        }
      });

      setToc(tocItems.slice(0, 20)); // Максимум 20 пунктов для полного содержания
    };

    // Генерируем TOC после загрузки контента
    setTimeout(generateTOC, 500);

    // Отслеживаем активный заголовок при скролле
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%' }
    );

    // Отслеживаем скролл для sticky позиции
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);

    // Добавляем observer к заголовкам h2 (основные разделы)
    setTimeout(() => {
      const headings = document.querySelectorAll('h2[id]');
      headings.forEach(heading => observer.observe(heading));
    }, 500);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Не показываем на мобильных, если TOC пустой
  if (toc.length === 0 || (isMobile && toc.length > 6)) {
    return null;
  }

  return (
    <motion.div
      className={`compact-toc ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`
          ${isSticky ? 'fixed top-4 right-4 z-50' : 'relative'}
          ${isMobile ? 'w-80' : 'w-72'}
          transition-all duration-300
        `}
      >
        <motion.div
          layout
          className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Заголовок */}
          <div
            className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white cursor-pointer select-none"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">Содержание</h3>
              </div>
              <motion.div
                animate={{ rotate: isCollapsed ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDownIcon className="h-4 w-4" />
              </motion.div>
            </div>
            {!isCollapsed && <div className="mt-2 text-xs opacity-75">{toc.length} разделов</div>}
          </div>

          {/* Содержимое TOC */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
                  <nav>
                    {toc.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => scrollToHeading(item.id)}
                        className={`
                          w-full text-left p-3 rounded-lg text-sm transition-all duration-200
                          font-medium
                          ${
                            activeId === item.id
                              ? 'bg-blue-100 text-blue-700 shadow-sm border-l-4 border-blue-500'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="truncate">{item.text}</span>
                        </div>
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </motion.div>
  );
}
