"use client";
import { useEffect } from 'react';

const INFOFLOT_KEY = 'YTo0OntzOjI6IklEIjtzOjQ6IjQxMjkiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6Ino0OXFpem1sIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=';

export default function InfoflotCruises() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initWidget = () => {
      if (typeof window !== 'undefined' && (window as any).createInfoflotWidget) {
        (window as any).createInfoflotWidget('https://bitrix.infoflot.com/rest/api/search.filter/', {
          key: INFOFLOT_KEY,
          referer: encodeURIComponent(window.location.href)
        });
      }
    };

    const scriptSrc = 'https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      if ((window as any).createInfoflotWidget) {
        initWidget();
      } else {
        existingScript.addEventListener('load', initWidget);
      }
    } else {
      const h = document.getElementsByTagName('script')[0];
      const s = document.createElement('script');
      s.src = scriptSrc;
      s.async = true;
      s.onload = initWidget;

      if (h && h.parentNode) {
        h.parentNode.insertBefore(s, h);
      } else {
        document.head.appendChild(s);
      }
    }
  }, []);

  return (
    <div
      className="infoflotWidget"
      data-id={INFOFLOT_KEY}
      data-index="1"
      style={{ minHeight: '600px', width: '100%' }}
    />
  );
}
