import type { MetadataRoute } from 'next';
import { allCountryIds } from '@/shared/data/wikiPages';
import { countries } from '@lib/velite-data';
import { SITE_URL, SITE_LAST_UPDATED_ISO } from '@/shared/constants/seo';

const STATIC_DATE = new Date(SITE_LAST_UPDATED_ISO);

export default function wikiSitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const wikiUrls: MetadataRoute.Sitemap = allCountryIds.map((id) => ({
    url: `${baseUrl}/wiki/${id}`,
    lastModified: STATIC_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const matrixPages: MetadataRoute.Sitemap = allCountryIds.flatMap((id) => {
    const countryData = countries.find(c => c.slug === id);
    const body = countryData?.body ?? '';
    
    const hasVisaSection = /##?\s*(виз|visa|визовый|виза)/i.test(body);
    const hasWeatherSection = /##?\s*(погод|weather|климат|season|сезон)/i.test(body);
    const hasCurrencySection = /##?\s*(валют|currency|деньг|финанс)/i.test(body);

    const pages: MetadataRoute.Sitemap = [];
    
    if (hasVisaSection) {
      pages.push({
        url: `${baseUrl}/wiki/${id}/visa`,
        lastModified: STATIC_DATE,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
    
    if (hasWeatherSection) {
      pages.push({
        url: `${baseUrl}/wiki/${id}/weather`,
        lastModified: STATIC_DATE,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
    
    if (hasCurrencySection) {
      pages.push({
        url: `${baseUrl}/wiki/${id}/currency`,
        lastModified: STATIC_DATE,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
    
    return pages;
  });

  return [...wikiUrls, ...matrixPages];
}
