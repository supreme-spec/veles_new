/**
 * @deprecated Этот провайдер не используется в текущей версии приложения.
 * Содержит ErrorBoundary, AuthProvider и PerformanceProvider.
 * 
 * Текущая архитектура использует:
 * - ErrorBoundary из @/shared/components/common (если нужен)
 * - AuthProvider напрямую в layout.tsx
 * - PerformanceProvider не используется глобально
 * 
 * Этот файл можно удалить, если не планируется его использование.
 */
'use client';

import React, {} from 'react';
// import { ThemeProvider } from 'next-themes';
// ...existing code...
import { ErrorBoundary } from '@/shared/components/common';
import { AuthProvider } from '@/features/auth/context';
import { PerformanceProvider } from '@/shared/providers/PerformanceProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ErrorBoundary>
        <AuthProvider>
          <PerformanceProvider>
            {children}
          </PerformanceProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
