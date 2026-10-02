'use client';

import type { FAQSchema as FAQSchemaType } from '@/shared/types/schema';

interface FAQSchemaProps {
  faqs: FAQSchemaType['mainEntity'];
  id?: string;
}

export function FAQSchema({ faqs, id }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.acceptedAnswer.text,
      },
    })),
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
