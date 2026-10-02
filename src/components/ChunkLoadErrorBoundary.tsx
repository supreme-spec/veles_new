'use client';

import { useEffect } from 'react';

export function ChunkLoadErrorBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let reloaded = false;

    const handler = (event: ErrorEvent) => {
      if (reloaded) return;
      const target = event.target as { src?: string; tagName?: string } | null;
      const message = event.message || '';
      const isChunkError =
        message.includes('ChunkLoadError') ||
        message.includes('Loading chunk') ||
        message.includes('Failed to fetch dynamically imported module') ||
        (target?.tagName === 'SCRIPT' && target?.src?.includes('/_next/static/'));

      if (isChunkError) {
        reloaded = true;
        console.warn('[ChunkLoadErrorBoundary] Reloading after chunk load failure');
        window.location.reload();
      }
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      if (reloaded) return;
      const reason = event.reason;
      const message =
        reason && typeof reason === 'object' && 'message' in reason
          ? String((reason as { message?: string }).message || '')
          : String(reason || '');
      if (message.includes('ChunkLoadError') || message.includes('Loading chunk')) {
        reloaded = true;
        console.warn('[ChunkLoadErrorBoundary] Reloading after chunk load failure');
        window.location.reload();
      }
    };

    window.addEventListener('error', handler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', handler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  return <>{children}</>;
}
