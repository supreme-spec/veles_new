'use client';

import { memo, createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useResponsiveGrid } from '@/shared/hooks/useGridLayouts';

interface PerformanceContextValue {
  screenSize: 'mobile' | 'tablet' | 'desktop';
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

const PerformanceContext = createContext<PerformanceContextValue | undefined>(undefined);

interface PerformanceProviderProps {
  children: ReactNode;
}

/**
 * Провайдер для оптимизации производительности
 * Определяет возможности устройства и подключения
 */
export const PerformanceProvider = memo<PerformanceProviderProps>(({ children }) => {
  const { screenSize } = useResponsiveGrid();

  const contextValue = useMemo(() => {
    // Определяем низкопроизводительное устройство
    const isLowEndDevice = (() => {
      if (typeof window === 'undefined') return false;
      
      // Проверяем количество ядер процессора
      const cores = (navigator as any).hardwareConcurrency || 4;
      if (cores <= 2) return true;

      // Проверяем объем памяти
      const memory = (navigator as any).deviceMemory;
      if (memory && memory <= 2) return true;

      // Проверяем поддержку современных API
      const hasModernAPIs = 'IntersectionObserver' in window && 
                           'ResizeObserver' in window &&
                           'requestIdleCallback' in window;
      
      return !hasModernAPIs;
    })();

    // Определяем предпочтение пользователя к сокращенной анимации
    const prefersReducedMotion = (() => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    })();

    // Определяем скорость подключения
    const connectionSpeed = (() => {
      if (typeof navigator === 'undefined' || !('connection' in navigator)) {
        return 'unknown' as const;
      }

      const connection = (navigator as any).connection;
      if (!connection) return 'unknown' as const;

      const effectiveType = connection.effectiveType;
      if (effectiveType === '4g' || effectiveType === '3g') {
        return 'fast' as const;
      }
      
      return 'slow' as const;
    })();

    return {
      screenSize,
      isLowEndDevice,
      prefersReducedMotion,
      connectionSpeed,
    };
  }, [screenSize]);

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
});

PerformanceProvider.displayName = 'PerformanceProvider';

/**
 * Хук для получения информации о производительности
 */
export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}

/**
 * HOC для оптимизации компонентов на основе производительности
 */
export function withPerformanceOptimization<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    skipOnLowEnd?: boolean;
    fallback?: React.ComponentType<P>;
    preload?: boolean;
  } = {}
) {
  const OptimizedComponent = memo<P>((props) => {
    const { isLowEndDevice, connectionSpeed } = usePerformance();
    
    // Если устройство слабое и компонент помечен для пропуска
    if (options.skipOnLowEnd && isLowEndDevice) {
      return options.fallback ? <options.fallback {...props} /> : null;
    }

    // Если медленное соединение, используем fallback
    if (connectionSpeed === 'slow' && options.fallback) {
      return <options.fallback {...props} />;
    }

    return <Component {...props} />;
  });

  OptimizedComponent.displayName = `withPerformanceOptimization(${Component.displayName || Component.name})`;
  
  return OptimizedComponent;
}

export default PerformanceProvider;
