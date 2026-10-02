'use client';

import React, { useEffect, useRef } from 'react';

interface EnhancedWikiContentProps {
  content: string;
  className?: string;
}

export function EnhancedWikiContent({ content, className = '' }: EnhancedWikiContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const addIconToHeading = (heading: Element, icon: string) => {
    const text = heading.textContent || '';
    if (!text.startsWith(icon)) {
      heading.textContent = `${icon} ${text}`;
    }
  };

  const addIconToListItem = (listItem: Element, icon: string) => {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'list-icon mr-2 text-lg';
    iconSpan.textContent = icon;
    listItem.insertBefore(iconSpan, listItem.firstChild);
  };

  const addHoverEffects = (container: HTMLElement) => {
    // Добавляем hover эффекты к параграфам
    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach((p) => {
      p.classList.add('enhanced-paragraph');
    });

    // Добавляем hover эффекты к спискам
    const lists = container.querySelectorAll('ul, ol');
    lists.forEach((list) => {
      list.classList.add('enhanced-list');
    });
  };

  const addFadeInAnimations = (container: HTMLElement) => {
    const sections = container.querySelectorAll('h2, h3');
    sections.forEach((section, index) => {
      section.classList.add('fade-in-section');
      (section as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  };

  const enhanceFirstParagraph = (container: HTMLElement) => {
    const firstParagraph = container.querySelector('p');
    if (firstParagraph) {
      firstParagraph.classList.add('lead-paragraph');
    }
  };

  const enhanceContent = React.useCallback((container: HTMLElement) => {
    // 1. Добавляем улучшенные иконки к заголовкам (если их еще нет)
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      const text = heading.textContent || '';
      
      // Добавляем соответствующие иконки к заголовкам
      if ((text.includes('виз') || text.includes('Виз')) && !text.includes('🛂')) {
        addIconToHeading(heading, '🛂');
      } else if ((text.includes('транспорт') || text.includes('добраться')) && !text.includes('✈️')) {
        addIconToHeading(heading, '✈️');
      } else if ((text.includes('отель') || text.includes('проживан')) && !text.includes('🏨')) {
        addIconToHeading(heading, '🏨');
      } else if ((text.includes('достопримечательност') || text.includes('Достопримечательност')) && !text.includes('🗺️') && heading.tagName !== 'H1') {
        addIconToHeading(heading, '🗺️');

      } else if ((text.includes('бюджет') || text.includes('Бюджет')) && !text.includes('💰')) {
        addIconToHeading(heading, '💰');
      } else if ((text.includes('безопасност') || text.includes('Безопасност')) && !text.includes('🚨')) {
        addIconToHeading(heading, '🚨');
      } else if ((text.includes('совет') || text.includes('лайфхак')) && !text.includes('💡')) {
        addIconToHeading(heading, '💡');
      }
    });

    // 2. Улучшаем списки с важной информацией
    const strongElements = container.querySelectorAll('strong');
    strongElements.forEach((strong) => {
      const text = strong.textContent || '';
      const listItem = strong.closest('li');
      
      if (listItem && !listItem.querySelector('.list-icon')) {
        // Добавляем иконки к важным пунктам списков
        if (text.includes('Стоимость') || text.includes('стоимость')) {
          addIconToListItem(listItem, '💵');
        } else if (text.includes('Срок') || text.includes('срок')) {
          addIconToListItem(listItem, '⏰');
        } else if (text.includes('Документы') || text.includes('документы')) {
          addIconToListItem(listItem, '📄');
        } else if (text.includes('Авиакомпании') || text.includes('авиакомпании')) {
          addIconToListItem(listItem, '✈️');
        } else if (text.includes('Валюта') || text.includes('валюта')) {
          addIconToListItem(listItem, '💶');
        } else if (text.includes('Главный аэропорт') || text.includes('аэропорт')) {
          addIconToListItem(listItem, '🛫');
        } else if (text.includes('Шенгенская виза') || text.includes('виза')) {
          addIconToListItem(listItem, '🛂');
        }
      }
    });

    // 3. Улучшаем ссылки
    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      link.classList.add('enhanced-wiki-link');
      
      // Добавляем иконки для внешних ссылок
      const href = link.getAttribute('href') || '';
      if (href.startsWith('http')) {
        link.classList.add('external-link');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    // 4. Добавляем эффекты наведения к важным элементам
    addHoverEffects(container);

    // 5. Добавляем плавную анимацию появления
    addFadeInAnimations(container);

    // 6. Улучшаем читаемость первого параграфа
    enhanceFirstParagraph(container);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    // Простая очистка HTML (базовая защита)
    const cleanContent = content.trim().replace(/<script[^>]*>.*?<\/script>/gi, '');
    contentRef.current.innerHTML = cleanContent;

    // Улучшаем внешний вид после загрузки
    enhanceContent(contentRef.current);
  }, [content, enhanceContent]);

  return (
    <div 
      ref={contentRef}
      className={`enhanced-wiki-content wiki-content ${className}`}
    />
  );
}
