import { NextResponse } from 'next/server';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { blogPosts } from '@/shared/data/blogPosts';

// Import FAQ schemas from page data files
import { toursFAQSchema } from '@/shared/data/pages/tours';
import { cruisesFAQSchema } from '@/shared/data/pages/cruises';
import { aboutFAQSchema } from '@/shared/data/pages/about';
import { contactsFAQSchema } from '@/shared/data/pages/contacts';
import { reviewsFAQSchema } from '@/shared/data/pages/reviews';
import { supportFAQSchema } from '@/shared/data/pages/support';
import { valuesFAQSchema } from '@/shared/data/pages/values';
import { missionFAQSchema } from '@/shared/data/pages/mission';
import { toursEuropeFAQSchema } from '@/shared/data/pages/tours-europe';
import { toursAsiaFAQSchema } from '@/shared/data/pages/tours-asia';
import { toursAfricaFAQSchema } from '@/shared/data/pages/tours-africa';
import { toursAmericaFAQSchema } from '@/shared/data/pages/tours-america';
import { toursExtremeFAQSchema } from '@/shared/data/pages/tours-extreme';
import { toursOceaniaFAQSchema } from '@/shared/data/pages/tours-oceania';
import { toursSouthAmericaFAQSchema } from '@/shared/data/pages/tours-south-america';
import { toursCruiseFAQSchema } from '@/shared/data/pages/tours-cruise';
import { placesFAQSchema } from '@/shared/data/seo/places-seo';

const PAGE_FAQ_SCHEMAS = [
  toursFAQSchema,
  cruisesFAQSchema,
  aboutFAQSchema,
  contactsFAQSchema,
  reviewsFAQSchema,
  supportFAQSchema,
  valuesFAQSchema,
  missionFAQSchema,
  toursEuropeFAQSchema,
  toursAsiaFAQSchema,
  toursAfricaFAQSchema,
  toursAmericaFAQSchema,
  toursExtremeFAQSchema,
  toursOceaniaFAQSchema,
  toursSouthAmericaFAQSchema,
  toursCruiseFAQSchema,
  placesFAQSchema,
];

function extractFaqsFromSchema(schema: Record<string, any>): Array<{ question: string; answer: string }> {
  const mainEntity = schema?.mainEntity;
  if (!mainEntity) return [];
  
  if (Array.isArray(mainEntity)) {
    return mainEntity
      .filter((item: any) => item['@type'] === 'Question')
      .map((item: any) => ({
        question: item.name || '',
        answer: item.acceptedAnswer?.text || item.acceptedAnswer?.answer || '',
      }))
      .filter((faq: { question: string; answer: string }) => faq.question && faq.answer);
  }
  
  return [];
}

export async function GET() {
  try {
    const faqs: Array<{ question: string; answer: string; source: string }> = [];

    // Extract from page FAQ schemas
    for (const schema of PAGE_FAQ_SCHEMAS) {
      const pageFaqs = extractFaqsFromSchema(schema);
      for (const faq of pageFaqs) {
        faqs.push({
          ...faq,
          source: 'page',
        });
      }
    }

    // Extract from country FAQs
    for (const [id, data] of Object.entries(WORLD_DESTINATIONS_DATA)) {
      const countryFaqs = data.faq || [];
      for (const faq of countryFaqs) {
        faqs.push({
          question: faq.q || faq.question || '',
          answer: faq.a || faq.answer || '',
          source: `country:${id}`,
        });
      }
    }

    // Extract from blog posts
    for (const post of blogPosts) {
      for (const faq of post.faqs || []) {
        faqs.push({
          question: faq.question || '',
          answer: faq.answer || '',
          source: `blog:${post.slug}`,
        });
      }
    }

    // Deduplicate by question
    const seen = new Set<string>();
    const uniqueFaqs = faqs.filter((faq) => {
      const key = faq.question.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return NextResponse.json({
      type: 'FAQs',
      format: 'application/json',
      version: '1.0',
      generated: new Date().toISOString(),
      total: uniqueFaqs.length,
      faqs: uniqueFaqs,
    });
  } catch (error) {
    console.error('Error generating FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to generate FAQs' },
      { status: 500 }
    );
  }
}
