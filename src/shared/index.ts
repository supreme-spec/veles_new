// Хуки
export { useScroll } from './hooks/useScroll';
export { useReducedMotion } from './hooks/useReducedMotion';

// Хуки производительности
export { useDebounce, useThrottle } from './hooks/usePerformance';

// Хуки оптимизации
export {
  useIntersectionObserver,
  useLazyImage,
  usePreload,
  useMemoWithTTL,
  useStableCallback
} from './hooks/useOptimization';

// Хуки Grid макетов
export {
  useResponsiveGrid,
  useMasonryGrid,
  useVirtualList,
  useGridAreas
} from './hooks/useGridLayouts';

// Grid компоненты
export {
  ResponsiveGrid,
  GridItem,
  MasonryGrid,
  GridAreaLayout
} from './components/ui/GridLayouts';

// Оптимизированные UI компоненты
export { CountriesGrid } from './components/ui/CountriesGrid';

// Провайдеры
export {
  PerformanceProvider,
  usePerformance,
  withPerformanceOptimization
} from './providers/PerformanceProvider';

// Типы для TypeScript
export interface GridConfig {
  columns: number;
  gap: string;
  minItemWidth: string;
}

export interface PerformanceConfig {
  screenSize: 'mobile' | 'tablet' | 'desktop';
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

export interface LazyImageConfig {
  src: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
}

export interface VirtualListConfig<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}
