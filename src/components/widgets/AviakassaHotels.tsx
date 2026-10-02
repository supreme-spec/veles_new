"use client";
import Script from 'next/script';

export default function AviakassaHotels() {
  return (
    <>
      <div id="ak-app-9878" style={{ minHeight: '500px', width: '100%' }} />
      <Script
        src="https://widgets.aviakassa.com/partner.js"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window !== 'undefined' && (window as any).Aviakassa?.Partner) {
            new (window as any).Aviakassa.Partner("ak-app-9878", {
              showAvia: false,
              showRail: true,
              showHotel: true,
              showAviaTitle: false,
              showRailTitle: false,
              showHotelTitle: false,
              aviaTitle: "Поиск дешевых авиабилетов",
              showAviakassaLogo: false,
              showLocaleSelect: true,
              aviaShowComplexRoute: true,
              showAviaAirlinesPrefilter: true,
              channelToken: "4da1c0bd1b87e6a72d79478ca5686792ff58108b",
              id: 9878
            });
          }
        }}
      />
    </>
  );
}
