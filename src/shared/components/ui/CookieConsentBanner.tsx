"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookieConsentBannerProps {
  onAccept?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onAccept
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    if (onAccept) onAccept();
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed z-50 bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:max-w-md bg-gray-800/95 backdrop-blur-md text-white p-4 pr-10 sm:p-5 sm:pr-12 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up">
      <p className="text-sm md:text-base">
        Мы используем файлы cookie и рекомендательные алгоритмы. Продолжая использовать наш сайт, вы даете согласие на обработку персональных данных и принимаете{' '}
        <Link href="/privacy" className="text-blue-300 hover:text-blue-100 underline" target="_blank">политику обработки персональных данных</Link>.
      </p>
      <button onClick={acceptCookies} className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium transition-colors">Принять</button>
      <button onClick={acceptCookies} aria-label="Закрыть баннер cookie" className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">✕</button>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};