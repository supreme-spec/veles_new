import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Хук для дебаунса значений
 * Оптимизирует производительность при частых обновлениях
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Хук для троттлинга функций
 * Ограничивает частоту вызовов функций
 */
export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  const lastRan = useRef<number>(0);
  const handler = useRef<NodeJS.Timeout | null>(null);
  const funcRef = useRef(func);

  // Обновляем ref при изменении функции
  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFunction = useCallback(function(this: any, ...args: Parameters<T>) {
    if (Date.now() - lastRan.current >= delay) {
      funcRef.current.apply(this, args);
      lastRan.current = Date.now();
    } else {
      if (handler.current) clearTimeout(handler.current);
      handler.current = setTimeout(() => {
        funcRef.current.apply(this, args);
        lastRan.current = Date.now();
      }, delay - (Date.now() - lastRan.current));
    }
  } as T, [delay, funcRef, handler, lastRan]);
  
  return debouncedFunction;
}
