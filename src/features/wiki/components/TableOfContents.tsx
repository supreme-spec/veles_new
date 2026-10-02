import React from 'react';

export interface TOCItem {
  id: string;
  title: string;
  level: number;
  estimatedReadTime?: number;
}

interface TableOfContentsProps {
  items?: TOCItem[];
  content?: string;
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  content,
  className = '',
}) => {
  // Если переданы items, используем их, иначе извлекаем из content
  const tocItems = items || (content ? extractTOCFromHTML(content) : []);

  if (tocItems.length === 0) return null;

  // Функция для создания якорной ссылки из заголовка
  const createAnchor = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^а-яё\w\s-]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Подсчет общего времени чтения
  const totalReadTime = tocItems.reduce((total, item) => total + (item.estimatedReadTime || 0), 0);

  return (
    <nav
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Заголовок */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-lg">📋</span>
          Содержание
        </h3>
        {totalReadTime > 0 && (
          <p className="text-sm text-gray-600 mt-1">⏱️ Время чтения: ~{totalReadTime} мин</p>
        )}
      </div>

      {/* Список разделов */}
      <div className="p-4">
        <ul className="space-y-2">
          {tocItems.map((item, index) => {
            const anchor = createAnchor(item.title);

            return (
              <li
                key={`${item.id}-${index}`}
                className={`
                ${item.level === 1 ? 'ml-0' : ''}
                ${item.level === 2 ? 'ml-4' : ''}
                ${item.level === 3 ? 'ml-8' : ''}
              `}
              >
                <a
                  href={`#${anchor}`}
                  className={`
                    block transition-colors duration-200 group py-1
                    ${item.level === 1 ? 'font-medium text-gray-900 hover:text-blue-600' : ''}
                    ${item.level === 2 ? 'text-gray-700 hover:text-blue-600 text-sm' : ''}
                    ${item.level === 3 ? 'text-gray-600 hover:text-blue-500 text-sm' : ''}
                  `}
                  title={item.title} // Показываем полный текст при наведении
                >
                  <div className="flex items-center justify-between">
                    <span className="group-hover:underline overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2">
                      {item.title}
                    </span>

                    {item.estimatedReadTime && (
                      <span className="text-xs text-gray-400 shrink-0">
                        {item.estimatedReadTime} мин
                      </span>
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Кнопка "Наверх" */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 py-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Наверх
          </button>
        </div>
      </div>
    </nav>
  );
};

// Утилита для извлечения заголовков из HTML контента
export const extractTOCFromHTML = (htmlContent: string): TOCItem[] => {
  const items: TOCItem[] = [];

  // Регулярное выражение для поиска заголовков H2-H4 с ID
  const headerRegex = /<h([2-4])([^>]*)>([^<]+)<\/h[2-4]>/gi;
  let match;

  while ((match = headerRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1] || '2');
    const attributes = match[2] || '';
    const title = (match[3] || '')
      .replace(/(<([^>]+)>)/gi, '') // Убираем HTML теги
      .replace(/[🌍🛂✈️🚗🏨🗺️🍽️🎭💰🚨💡📋⏱️🦁🏔️🏛️🥘🎶]/g, '') // Убираем эмодзи
      .trim();

    if (title) {
      // Простая оценка времени чтения (исходя из длины секции)
      const nextHeaderIndex = htmlContent.indexOf('<h', match.index + match[0].length);
      const sectionContent =
        nextHeaderIndex !== -1
          ? htmlContent.slice(match.index, nextHeaderIndex)
          : htmlContent.slice(match.index);

      const wordCount = sectionContent.split(/\s+/).length;
      const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 слов в минуту

      // Extract ID from attributes
      const idMatch = attributes.match(/id=["']([^"']*)["']/);
      const headerId = idMatch && idMatch[1] ? idMatch[1] : `section-${items.length}`;

      items.push({
        id: headerId,
        title,
        level: level - 1, // H2 становится level 1, H3 -> level 2, и т.д.
        estimatedReadTime,
      });
    }
  }

  return items;
};

export default TableOfContents;
