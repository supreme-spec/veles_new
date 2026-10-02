import { generateCountrySEOMetadata } from '@/shared/utils/generateCountrySEOMetadata';
import { generateUniversalMetadata } from '@/lib/seo/universalSEO';
import { countries } from '@lib/velite-data';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { country: string };
}): Promise<Metadata> {
  try {
    const metadata = await generateCountrySEOMetadata({
      countryId: params.country,
      url: `https://veles-voyage.ru/wiki/${params.country}`,
    });

    return metadata;
  } catch (error) {
    console.error(`Error generating SEO metadata for ${params.country}:`, error);

    const countryData = countries.find(c => c.slug === params.country);
    if (countryData) {
      const seoOptions: {
        title: string;
        description: string;
        url: string;
        type: 'country';
        geo: { latitude: number; longitude: number };
        keywords: string[];
      } = {
        title: countryData.title || `${params.country} - путеводитель | Велес Вояж`,
        description: countryData.description || `Подробный путеводитель по ${params.country}`,
        url: `/wiki/${params.country}`,
        keywords: Array.isArray(countryData.keywords) ? countryData.keywords.filter((k): k is string => typeof k === 'string') : [],
        type: 'country',
        geo: {
          latitude: countryData.latitude ?? 0,
          longitude: countryData.longitude ?? 0,
        },
      };

      const result: Record<string, unknown> = { ...seoOptions };
      if (countryData.image) result.image = countryData.image;
      if (countryData.datePublished && countryData.datePublished !== 'dynamic') result.publishedTime = countryData.datePublished;
      if (countryData.dateModified && countryData.dateModified !== 'dynamic') result.modifiedTime = countryData.dateModified;
      if (countryData.author) result.author = countryData.author;

      return await generateUniversalMetadata(result as unknown as Parameters<typeof generateUniversalMetadata>[0]);
    }

    return await generateUniversalMetadata({
      title: `${params.country} - путеводитель | Велес Вояж`,
      description: `Подробный путеводитель по ${params.country}`,
      url: `/wiki/${params.country}`,
    });
  }
}
