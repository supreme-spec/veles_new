'use client';

import { memo, createContext, useContext, useMemo, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

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
 * Простой провайдер для оптимизации производительности
 */
export const PerformanceProviderSimple = memo<PerformanceProviderProps>(({ children }) => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

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

      return false;
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

PerformanceProviderSimple.displayName = 'PerformanceProviderSimple';

/**
 * Хук для получения информации о производительности
 */
export function usePerformanceSimple() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformanceSimple must be used within a PerformanceProviderSimple');
  }
  return context;
}

export default PerformanceProviderSimple;
