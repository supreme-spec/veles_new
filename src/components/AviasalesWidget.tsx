'use client';

import Script from 'next/script';

export default function AviasalesWidget() {
  return (
    <div className="w-full">
      <div 
        data-tmpartner="454566"
        data-currency="rub"
        data-locale="ru"
        data-searchUrl="www.aviasales.ru/search"
        data-color_button="#32a8dd"
        data-color_icons="#32a8dd"
        data-dark="#262626"
        data-light="#FFFFFF"
        data-secondary="#FFFFFF"
        data-special="#C4C4C4"
        data-color_focused="#32a8dd"
        data-border_radius="4"
        data-powered_by="true"
        data-show_hotels="true"
        data-combine_promos="101_7873"
        data-trs="243642"
        data-promo_id="7879"
        data-campaign_id="100"
      ></div>
      <Script
        src="https://tp.media/content?currency=rub&trs=243642&shmarker=454566.454566&combine_promos=101_7873&show_hotels=true&powered_by=true&locale=ru&searchUrl=www.aviasales.ru%2Fsearch&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Error loading Aviasales script:', e);
        }}
      />
    </div>
  );
}