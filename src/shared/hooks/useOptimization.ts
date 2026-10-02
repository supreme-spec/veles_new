import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

/**
 * Хук для отслеживания видимости элемента
 * Оптимизирует загрузку контента при появлении в области видимости
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = {}
): [React.RefObject<T | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [ref, isIntersecting];
}

/**
 * Хук для ленивой загрузки изображений
 * Улучшает производительность страницы
 */
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [imageRef, isVisible] = useIntersectionObserver<HTMLImageElement>({
    threshold: 0.1,
    rootMargin: '50px',
  });

  useEffect(() => {
    if (isVisible && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
      };
      img.src = src;
    }
  }, [isVisible, src]);

  return { imageSrc, imageRef };
}

/**
 * Хук для предзагрузки ресурсов
 * Улучшает воспринимаемую производительность
 */
export function usePreload() {
  const preloadedUrls = useRef(new Set<string>());

  const preloadImage = useCallback((src: string) => {
    if (preloadedUrls.current.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);

    preloadedUrls.current.add(src);
  }, []);

  const preloadScript = useCallback((src: string) => {
    if (preloadedUrls.current.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    document.head.appendChild(link);

    preloadedUrls.current.add(src);
  }, []);

  return { preloadImage, preloadScript };
}

/**
 * Хук для мемоизации дорогих вычислений
 * Кэширует результаты для оптимизации производительности
 */
export function useMemoWithTTL<T>(
  factory: () => T,
  deps: React.DependencyList,
  ttl: number = 5000
): T {
  const cacheRef = useRef<{
    value: T;
    timestamp: number;
    deps: React.DependencyList;
  } | null>(null);

  // Используем useMemo с правильными зависимостями
  return useMemo(() => {
    const now = Date.now();
    const cache = cacheRef.current;

    // Проверяем, есть ли кэш и не истёк ли он
    if (
      cache &&
      now - cache.timestamp < ttl &&
      deps.length === cache.deps.length &&
      deps.every((dep, index) => dep === cache.deps[index])
    ) {
      return cache.value;
    }

    // Вычисляем новое значение
    const value = factory();
    cacheRef.current = {
      value,
      timestamp: now,
      deps: [...deps],
    };

    return value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factory, ttl, ...deps]);
}

/**
 * Хук для оптимизации ре-рендеров
 * Предотвращает ненужные обновления компонентов
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = useCallback(
    function (this: any, ...args: Parameters<T>) {
      return callbackRef.current.apply(this, args);
    } as T,
    [callbackRef]
  );

  return memoizedCallback;
}
