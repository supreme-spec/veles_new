'use client';

import React, { useState } from 'react';

const PHONE_DISPLAY = '+7 985 063-51-34';
const PHONE_TEL = '+79850635134';
const TELEGRAM_URL = 'https://t.me/veles_voyage';

export const StickyMobileBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden lg:hidden">
      {/* Collapsed state - minimal bar */}
      {!isExpanded && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_12px_rgba(0,0,0,0.12)]">
          <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center justify-center gap-1.5 py-3 text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              aria-label={`Позвонить ${PHONE_DISPLAY}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.24 1.02l-2.2 2.2z" />
              </svg>
              <span className="text-xs sm:text-sm">Позвонить</span>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 text-sky-500 dark:text-sky-400 font-semibold bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors"
              aria-label="Написать в Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l9.27-3.58c.81-.32 1.55.21 1.22 1.33l-1.92 8.83c-.26 1.2-.98 1.5-1.64.94l-2.2-1.62-1.02 1.02z" />
              </svg>
              <span className="text-xs sm:text-sm">Telegram</span>
            </a>
          </div>
        </div>
      )}

      {/* Expanded state - full info */}
      {isExpanded && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_12px_rgba(0,0,0,0.12)] p-4">
          <div className="text-center mb-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">Свяжитесь с нами</p>
          </div>
          <div className="space-y-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center justify-center gap-3 py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors shadow-md"
              aria-label={`Позвонить ${PHONE_DISPLAY}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.24 1.02l-2.2 2.2z" />
              </svg>
              <span className="text-base">{PHONE_DISPLAY}</span>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-colors shadow-md"
              aria-label="Написать в Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l9.27-3.58c.81-.32 1.55.21 1.22 1.33l-1.92 8.83c-.26 1.2-.98 1.5-1.64.94l-2.2-1.62-1.02 1.02z" />
              </svg>
              <span className="text-base">Написать в Telegram</span>
            </a>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-3 w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Свернуть
          </button>
        </div>
      )}

      {/* Toggle button removed */}
    </div>
  );
};

export default StickyMobileBar;
