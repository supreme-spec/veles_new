import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Хук для управления CSS Grid макетами
 * Адаптивные макеты с оптимизацией производительности
 */
export function useResponsiveGrid() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [gridConfig, setGridConfig] = useState({
    columns: 3,
    gap: '1rem',
    minItemWidth: '300px',
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
        setGridConfig({
          columns: 1,
          gap: '0.75rem',
          minItemWidth: '100%',
        });
      } else if (width < 1024) {
        setScreenSize('tablet');
        setGridConfig({
          columns: 2,
          gap: '1rem',
          minItemWidth: '250px',
        });
      } else {
        setScreenSize('desktop');
        setGridConfig({
          columns: 3,
          gap: '1.5rem',
          minItemWidth: '300px',
        });
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const getGridStyles = useCallback(
    () => ({
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${gridConfig.minItemWidth}, 1fr))`,
      gap: gridConfig.gap,
      width: '100%',
    }),
    [gridConfig]
  );

  return {
    screenSize,
    gridConfig,
    getGridStyles,
  };
}

/**
 * Хук для создания масонри макета
 * Оптимизированный макет для карточек разной высоты
 */
export function useMasonryGrid(itemCount: number, columnCount?: number) {
  const [columns, setColumns] = useState<number[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateColumns = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const cols = columnCount || Math.floor(containerWidth / 300);
    const newColumns: number[][] = Array.from({ length: cols }, () => []);

    // Распределяем элементы по колонкам
    for (let i = 0; i < itemCount; i++) {
      const shortestColumn = newColumns.reduce((prev, current, index) => {
        const prevCol = newColumns[prev];
        if (!prevCol) return index;
        return current.length < prevCol.length ? index : prev;
      }, 0);
      const column = newColumns[shortestColumn];
      if (column) {
        column.push(i);
      }
    }

    setColumns(newColumns);
  }, [itemCount, columnCount]);

  useEffect(() => {
    calculateColumns();

    const resizeObserver = new ResizeObserver(calculateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [calculateColumns]);

  return { columns, containerRef };
}

/**
 * Хук для виртуализации списков
 * Оптимизирует рендеринг больших списков
 */
export function useVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
}: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
    handleScroll,
  };
}

/**
 * Хук для создания адаптивных CSS Grid областей
 * Управляет сложными макетами с именованными областями
 */
export function useGridAreas() {
  const [gridAreas, _setGridAreas] = useState({
    mobile: `
      "header"
      "main"
      "sidebar"
      "footer"
    `,
    tablet: `
      "header header"
      "main sidebar"
      "footer footer"
    `,
    desktop: `
      "header header header"
      "main main sidebar"
      "footer footer footer"
    `,
  });

  const getGridAreaStyles = useCallback(
    (area: keyof typeof gridAreas) => ({
      display: 'grid',
      gridTemplateAreas: gridAreas[area],
      gridTemplateRows:
        area === 'mobile'
          ? 'auto 1fr auto auto'
          : area === 'tablet'
            ? 'auto 1fr auto'
            : 'auto 1fr auto',
      gridTemplateColumns:
        area === 'mobile' ? '1fr' : area === 'tablet' ? '2fr 1fr' : '2fr 1fr 300px',
      gap: '1rem',
      minHeight: '100vh',
    }),
    [gridAreas]
  );

  return { gridAreas, getGridAreaStyles };
}
