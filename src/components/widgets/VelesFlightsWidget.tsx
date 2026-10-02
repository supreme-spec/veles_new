"use client";
import { useEffect, useRef } from 'react';

export default function VelesFlightsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Suppress external tpwgt timeout console.errors that trigger Next.js dev error overlay
    const origError = console.error;
    const consoleErrorFilter = (...args: any[]) => {
      const msg = args
        .map((a) => (typeof a === 'string' ? a : (a && typeof a === 'object' && 'message' in a ? (a as any).message : '')))
        .join(' ');
      if (
        msg.includes('Request timed out') ||
        msg.includes('tpwgt.com') ||
        msg.includes('wl_web')
      ) {
        // Log as warning rather than error to avoid tripping Next.js error overlays on ad-block/slow network
        console.warn('[VelesFlightsWidget Network Info]', ...args);
        return;
      }
      origError.apply(console, args);
    };
    console.error = consoleErrorFilter;

    // Configure Travelpayouts White Label
    (window as any).TPWL_CONFIGURATION = {
      ...((window as any).TPWL_CONFIGURATION || {}),
      resultsURL: "https://fly.veles-voyage.ru"
    };

    let script = document.querySelector('script[src*="tpwgt.com/wl_web/main.js"]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.type = "module";
      script.src = "https://tpwgt.com/wl_web/main.js?wl_id=20834";
      script.setAttribute('nowprocket', '1');
      script.setAttribute('data-noptimize', '1');
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-wpfc-render', 'false');
      script.setAttribute('seraph-accel-crit', '1');
      script.setAttribute('data-no-defer', '1');
      script.onerror = () => {
        console.warn('Travelpayouts flights widget script failed to load or timed out.');
      };
      document.head.appendChild(script);
    }

    const fixFooterLinks = () => {
      const container = containerRef.current || document.getElementById('tpwl-search');
      if (!container) return;

      const links = container.querySelectorAll(
        'a[href*="veles-voyage.ru/terms"], a[href*="veles-voyage.ru/privacy"], a[href*="veles-voyage.ru/cookie-policy"]'
      );
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.includes('https://veles-voyage.ru/')) {
          link.setAttribute('href', href.replace('https://veles-voyage.ru/', 'https://veles-voyage.ru/'));
        }
      });
    };

    const observer = new MutationObserver(() => {
      fixFooterLinks();
    });

    const target = containerRef.current || document.getElementById('tpwl-search');
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
      fixFooterLinks();
    }

    return () => {
      observer.disconnect();
      console.error = origError;
    };
  }, []);

  return <div id="tpwl-search" ref={containerRef} />;
}
