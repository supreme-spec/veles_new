'use client';

import { useState, useEffect } from 'react';

export function usePWADetection() {
  const [isPWA, setIsPWA] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Проверка PWA режима
    const checkPWAMode = () => {
      const isPWAMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches ||
        // @ts-ignore
        window.navigator.standalone === true;
      
      setIsPWA(isPWAMode);
    };

    checkPWAMode();

    // Слушаем событие beforeinstallprompt для определения возможности установки
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Слушаем изменения display-mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkPWAMode);
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Проверяем, было ли приложение уже установлено
    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      mediaQuery.removeEventListener('change', checkPWAMode);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA установлено');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return {
    isPWA,
    isInstallable,
    installPWA,
  };
}
