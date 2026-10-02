'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Простые SVG иконки
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

interface TOCItem {
  id: string;
  text: string;
  level: number;
  estimatedReadTime?: number;
}

interface InlineTableOfContentsProps {
  content: string;
  className?: string;
  showReadingTime?: boolean;
  maxItems?: number;
  compactMode?: boolean;
}

export function InlineTableOfContents({ 
  content,
  className = '', 
  showReadingTime = true,
  maxItems = 6,
  compactMode = true
}: InlineTableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [totalReadTime, setTotalReadTime] = useState(0);

  // Вычисляемые значения для компактного режима
  const filteredToc = compactMode 
    ? toc.filter(item => item.level <= 2) // Только H1 и H2 в компактном режиме
    : toc;
  
  const visibleItems = showMore 
    ? filteredToc 
    : filteredToc.slice(0, maxItems);
    
  const hasMoreItems = filteredToc.length > maxItems;

  useEffect(() => {
    // Генерируем TOC из заголовков на странице или из переданного контента
    const generateTOC = () => {
      let headings: NodeListOf<Element>;
      
      if (content) {
        // Создаем временный элемент для парсинга контента
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      } else {
        // Используем заголовки с текущей страницы
        headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      }
      
      const tocItems: TOCItem[] = [];
      let wordCount = 0;

      headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id && !content) {
          heading.id = id;
        }
        
        const level = parseInt(heading.tagName.charAt(1));
        let text = heading.textContent || '';
        
        // Обрезаем длинный текст в компактном режиме
        if (compactMode && text.length > 50) {
          text = text.substring(0, 50) + '...';
        }
        
        // В компактном режиме показываем только H1 и H2
        const shouldInclude = compactMode ? level <= 2 : level <= 4;
        
        // Подсчитываем примерное время чтения для каждого раздела
        const nextHeading = headings[index + 1];
        let sectionContent = '';
        let currentElement = heading.nextElementSibling;
        
        while (currentElement && currentElement !== nextHeading) {
          sectionContent += currentElement.textContent || '';
          currentElement = currentElement.nextElementSibling;
        }
        
        const sectionWordCount = sectionContent.split(/\s+/).length;
        const estimatedReadTime = Math.max(1, Math.ceil(sectionWordCount / 200)); // 200 слов в минуту
        wordCount += sectionWordCount;
        
        if (text.length > 0 && shouldInclude) {
          // Сокращаем длинные заголовки
          const shortText = compactMode && text.length > 50 ? text.substring(0, 50) + '...' : text;
          
          tocItems.push({
            id,
            text: shortText,
            level,
            estimatedReadTime
          });
        }
      });

      setToc(tocItems);
      setTotalReadTime(Math.ceil(wordCount / 200));
    };

    // Генерируем TOC после загрузки контента
    setTimeout(generateTOC, 1000);

    // Отслеживаем активный заголовок при скролле
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

    // Добавляем observer к заголовкам
    setTimeout(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading) => observer.observe(heading));
    }, 1000);

    return () => {
      observer.disconnect();
    };
  }, [content, compactMode]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className={`inline-table-of-contents mb-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`
          ${compactMode 
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-200'
          } overflow-hidden shadow-sm
        `}
      >
        {/* Компактный заголовок */}
        <div 
          className={`
            ${compactMode ? 'p-4' : 'p-6'} 
            bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer select-none
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ListIcon className={`${compactMode ? 'h-5 w-5' : 'h-6 w-6'}`} />
              <div>
                <h3 className={`${compactMode ? 'text-base' : 'text-lg'} font-bold`}>
                  📖 Содержание
                </h3>
                {showReadingTime && (
                  <p className={`${compactMode ? 'text-xs' : 'text-sm'} opacity-90 mt-1`}>
                    ⏱️ {totalReadTime} мин • {toc.length} разделов
                  </p>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronDownIcon className="h-4 w-4" />
            </motion.div>
          </div>
        </div>

        {/* Содержимое TOC */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className={`${compactMode ? 'p-4' : 'p-6'}`}>
                <nav className={`grid gap-1 ${compactMode ? 'md:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-1'}`}>
                  {visibleItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => scrollToHeading(item.id)}
                      className={`
                        group flex items-center justify-between w-full text-left transition-all duration-200
                        ${compactMode ? 'p-2 rounded-md' : 'p-3 rounded-lg'}
                        ${item.level === 1 ? 'font-bold' : ''}
                        ${item.level === 2 ? 'font-semibold ml-3' : ''}
                        ${item.level === 3 ? 'font-medium ml-6' : ''}
                        ${item.level >= 4 ? 'font-normal ml-8' : ''}
                        ${
                          activeId === item.id
                            ? 'bg-blue-100 text-blue-700 shadow-sm transform scale-105'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2">
                        {item.level === 1 && <span className={`${compactMode ? 'text-base' : 'text-lg'}`}>📚</span>}
                        {item.level === 2 && <span className={`${compactMode ? 'text-sm' : 'text-base'}`}>📝</span>}
                        {item.level >= 3 && <span className="text-xs">•</span>}
                        <span className={`group-hover:underline ${compactMode ? 'text-sm' : 'text-base'}`}>
                          {item.text}
                        </span>
                      </div>
                      {showReadingTime && item.estimatedReadTime && !compactMode && (
                        <span className="text-xs text-gray-500 ml-2 opacity-75">
                          {item.estimatedReadTime} мин
                        </span>
                      )}
                    </motion.button>
                  ))}
                </nav>
                
                {/* Кнопка "Показать больше" */}
                {hasMoreItems && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowMore(!showMore)}
                    className="mt-3 w-full text-center text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2 px-3 rounded-md transition-colors duration-200"
                  >
                    {showMore ? '↑ Показать меньше' : `↓ Показать еще ${toc.length - maxItems} разделов`}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
