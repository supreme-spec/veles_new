import Head from 'next/head';
import React from 'react';

interface PerformanceOptimizerProps {
  enablePreload?: boolean;
  enablePrefetch?: boolean;
}

export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  enablePreload = true,
  enablePrefetch = true
}) => {
  return (
    <Head>
      {/* Critical resource hints */}
      {enablePreload && (
        <>
          <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/images/hero-bg.svg" as="image" />
          {/* Preload common hero images */}
          <link rel="preload" href="https://images.unsplash.com/photo-1501555088652-021faa106b9b" as="image" crossOrigin="anonymous" />
          <link rel="preload" href="https://images.unsplash.com/photo-1530521954074-e64f6810b32d" as="image" crossOrigin="anonymous" />
        </>
      )}
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      
      {/* Preconnect to critical third-party origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Prefetch next likely pages */}
      {enablePrefetch && (
        <>
          <link rel="prefetch" href="/wiki/countries" />
          <link rel="prefetch" href="/tours" />
        </>
      )}
      
      {/* Resource hints for better loading */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      
      {/* PWA performance hints */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Optimize for Core Web Vitals */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      
      {/* Security headers via meta tags */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
    </Head>
  );
};