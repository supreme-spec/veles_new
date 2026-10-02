import { useState, useEffect, useRef } from 'react';

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const handlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    handlerRef.current = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    const handler = handlerRef.current;
    window.addEventListener('scroll', handler, { passive: true });
    
    return () => {
      if (handlerRef.current) {
        window.removeEventListener('scroll', handlerRef.current);
      }
    };
  }, []);

  return { scrollY, isScrolled };
};
