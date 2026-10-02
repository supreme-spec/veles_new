'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Классический сниппет Яндекс.Метрики для veles-voyage.ru.
 *
 * Рендерится прямо в HTML (а не через next/script), чтобы код счётчика
 * присутствовал в исходном коде страницы — так рекомендует сам Яндекс.
 */
const DEFAULT_METRIKA_ID = '102468849';

type YmWindow = Window & {
  ym?: (...args: unknown[]) => void;
};

function getMetrikaId(): number {
  const raw = (process.env.NEXT_PUBLIC_YANDEX_METRICA_ID ?? '').trim() || DEFAULT_METRIKA_ID;
  return /^\d+$/.test(raw) ? Number(raw) : Number(DEFAULT_METRIKA_ID);
}

const buildSnippet = (metrikaId: number) => `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(${metrikaId}, "init", {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true
});`;

export function YandexMetrika() {
  const pathname = usePathname();
  const metrikaId = getMetrikaId();
  const isFirstRender = useRef(true);

  // App Router не перезагружает страницу при переходах между разделами,
  // поэтому каждый следующий визит нужно досылать в Метрику вручную.
  // Первый хит уже отправляет init, поэтому повторять его на новом URL
  // учимся только после первой реальной смены маршрута.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const w = window as YmWindow;
    if (typeof w.ym !== 'function') return;

    const url = window.location.pathname + window.location.search;
    w.ym(metrikaId, 'hit', url, { referer: document.referrer });
  }, [pathname, metrikaId]);

  return (
    <>
      <script
        id="yandex-metrika"
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: buildSnippet(metrikaId) }} />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${metrikaId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
            width="1"
            height="1" />
        </div>
      </noscript>
    </>
  );
}

export default YandexMetrika;
