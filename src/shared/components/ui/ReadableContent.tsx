'use client';

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ReadableContentProps {
  children: ReactNode;
  showTOC?: boolean;
  className?: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function ReadableContent({ 
  children, 
  showTOC = true, 
  className = '' 
}: ReadableContentProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Генерируем TOC из заголовков
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocItems: TOCItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      
      tocItems.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      });
    });

    setToc(tocItems);

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

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
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

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Table of Contents */}
        {showTOC && toc.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="sticky top-8 max-w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-lg p-4 border overflow-hidden"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 truncate">
                  📖 Содержание
                </h3>
                <nav className="space-y-1">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      className={`
                        block w-full text-left text-sm py-2 px-3 rounded
                        transition-colors duration-200 break-words hyphens-auto
                        ${item.level === 1 ? 'font-semibold' : ''}
                        ${item.level === 2 ? 'ml-2' : ''}
                        ${item.level === 3 ? 'ml-4' : ''}
                        ${item.level >= 4 ? 'ml-6' : ''}
                        ${activeId === item.id 
                          ? 'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-500' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }
                      `}
                      title={item.text} // Показываем полный текст при наведении
                    >
                      <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.text}
                      </span>
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className={`
          ${showTOC && toc.length > 0 ? 'lg:col-span-9 xl:col-span-10' : 'lg:col-span-12'}
        `}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`
              prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-0
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-4
              prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:space-y-2 prose-ul:ml-6
              prose-ol:space-y-2 prose-ol:ml-6
              prose-li:text-gray-700
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-400 
              prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-img:rounded-lg prose-img:shadow-lg
              dark:prose-invert
            `}
          >
            {children}
          </motion.div>
        </main>
      </div>
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <p className="text-lg leading-8 text-gray-700 mb-4">
            {paragraph}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
