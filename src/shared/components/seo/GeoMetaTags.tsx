import Head from 'next/head';
import React from 'react';

interface GeoMetaTagsProps {
  countryName: string;
  latitude?: number;
  longitude?: number;
  region?: string;
  countryCode?: string;
}

export const GeoMetaTags: React.FC<GeoMetaTagsProps> = ({
  countryName,
  latitude,
  longitude,
  region,
  countryCode
}) => {
  return (
    <Head>
      {/* Geographic meta tags */}
      <meta name="geo.region" content={region || 'Unknown'} />
      <meta name="geo.placename" content={countryName} />
      {latitude && longitude && (
        <>
          <meta name="geo.position" content={`${latitude};${longitude}`} />
          <meta name="ICBM" content={`${latitude}, ${longitude}`} />
        </>
      )}
      {countryCode && <meta name="geo.country" content={countryCode} />}
      
      {/* Additional travel-specific meta tags */}
      <meta name="travel.destination" content={countryName} />
      <meta name="travel.type" content="country-guide" />
      <meta name="content.category" content="travel-guide" />
      <meta name="audience" content="travelers,tourists" />
      
      {/* Enhanced robots directives */}
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="bingbot" content="index,follow" />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="//veles-voyage.ru" />
      <link rel="preconnect" href="https://veles-voyage.ru" />
    </Head>
  );
};