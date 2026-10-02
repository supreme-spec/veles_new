'use client';

import React, { useMemo } from 'react';
import { useResponsiveGrid, useMasonryGrid } from '@/shared/hooks/useGridLayouts';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  minItemWidth?: string;
  gap?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * Адаптивный Grid компонент
 * Автоматически подстраивается под размер экрана
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  minItemWidth,
  gap,
  columns,
}) => {
  const { screenSize, getGridStyles } = useResponsiveGrid();

  const gridStyles = useMemo(() => {
    const baseStyles = getGridStyles();
    
    // Переопределяем стили если переданы кастомные значения
    if (minItemWidth) {
      baseStyles.gridTemplateColumns = `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`;
    }
    
    if (gap) {
      baseStyles.gap = gap;
    }

    // Если заданы конкретные колонки для разных экранов
    if (columns) {
      const columnCount = columns[screenSize] || columns.desktop || 3;
      baseStyles.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    }

    return baseStyles;
  }, [getGridStyles, minItemWidth, gap, columns, screenSize]);

  return (
    <div 
      className={`responsive-grid ${className}`}
      style={gridStyles}
    >
      {children}
    </div>
  );
};

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  area?: string;
}

/**
 * Grid элемент с адаптивными span значениями
 */
export const GridItem: React.FC<GridItemProps> = ({
  children,
  className = '',
  span,
  area,
}) => {
  const { screenSize } = useResponsiveGrid();

  const itemStyles = useMemo(() => {
    const styles: React.CSSProperties = {};

    if (area) {
      styles.gridArea = area;
    }

    if (span) {
      const spanValue = span[screenSize] || span.desktop || 1;
      styles.gridColumn = `span ${spanValue}`;
    }

    return styles;
  }, [screenSize, span, area]);

  return (
    <div 
      className={`grid-item ${className}`}
      style={itemStyles}
    >
      {children}
    </div>
  );
};

interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
  columnCount?: number;
  gap?: string;
}

/**
 * Масонри Grid для элементов разной высоты
 */
export const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  className = '',
  columnCount,
  gap = '1rem',
}) => {
  const childrenArray = React.Children.toArray(children);
  const { columns, containerRef } = useMasonryGrid(childrenArray.length, columnCount);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    gap: gap,
    alignItems: 'flex-start',
  };

  const columnStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: gap,
    flex: 1,
  };

  return (
    <div 
      ref={containerRef}
      className={`masonry-grid ${className}`}
      style={containerStyles}
    >
      {columns.map((column: number[], columnIndex: number) => (
        <div key={columnIndex} style={columnStyles}>
          {column.map((itemIndex: number) => (
            <div key={itemIndex}>
              {childrenArray[itemIndex]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

interface GridAreaLayoutProps {
  children: React.ReactNode;
  className?: string;
  areas?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  rows?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  columns?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

/**
 * Grid Layout с именованными областями
 */
export const GridAreaLayout: React.FC<GridAreaLayoutProps> = ({
  children,
  className = '',
  areas,
  rows,
  columns,
}) => {
  const { screenSize } = useResponsiveGrid();

  const layoutStyles = useMemo(() => {
    const styles: React.CSSProperties = {
      display: 'grid',
      gap: '1rem',
      minHeight: '100vh',
    };

    if (areas) {
      styles.gridTemplateAreas = areas[screenSize] || areas.desktop;
    }

    if (rows) {
      styles.gridTemplateRows = rows[screenSize] || rows.desktop;
    }

    if (columns) {
      styles.gridTemplateColumns = columns[screenSize] || columns.desktop;
    }

    return styles;
  }, [screenSize, areas, rows, columns]);

  return (
    <div 
      className={`grid-area-layout ${className}`}
      style={layoutStyles}
    >
      {children}
    </div>
  );
};

// Экспорт хука для использования в других компонентах
export { useResponsiveGrid, useMasonryGrid } from '@/shared/hooks/useGridLayouts';
