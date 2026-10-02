'use client';

import React from 'react';

const PHONE_DISPLAY = '+7 985 063-51-34';
const PHONE_TEL = '+79850635134';

export const TabletContactBar: React.FC = () => {
  return (
    <div className="hidden md:flex lg:hidden fixed bottom-[5.5rem] right-6 z-40 flex-col gap-2">
      <a
        href={`tel:${PHONE_TEL}`}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        aria-label={`Позвонить ${PHONE_DISPLAY}`}
        title="Позвонить"
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
      </a>
    </div>
  );
};

export default TabletContactBar;
