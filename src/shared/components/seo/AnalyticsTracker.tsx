import Script from 'next/script';
import React from 'react';

interface AnalyticsTrackerProps {
  gtmId?: string;
  yandexMetricaId?: string;
  enableWebVitals?: boolean;
}

export const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({
  gtmId: _gtmId,
  yandexMetricaId: _yandexMetricaId,
  enableWebVitals = true,
}) => {
  return (
    <>
      {/* Web Vitals tracking */}
      {enableWebVitals && (
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            function sendToAnalytics(metric) {
              console.log('Web Vital:', metric.name, metric.value);
            }

            if (typeof window !== 'undefined') {
              import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(sendToAnalytics);
                getFID(sendToAnalytics);
                getFCP(sendToAnalytics);
                getLCP(sendToAnalytics);
                getTTFB(sendToAnalytics);
              }).catch(() => {
                console.log('Web Vitals library failed to load');
              });
            }
          `}
        </Script>
      )}
    </>
  );
};
