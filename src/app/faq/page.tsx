import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { SchemaScripts } from '@/components/SchemaScripts';
import { FAQSection } from '@/components/FAQSection';
import { SITE_URL } from '@/shared/constants/seo';
import { faqItems } from '@/shared/data/faqItems';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export const metadata: Metadata = generateSEOMetadata({
  title: 'Частые вопросы (FAQ) | Велес Вояж — визы, цены, туры 2026',
  description:
    'Ответы на популярные вопросы о турах Велес Вояж: нужна ли виза, сколько стоит тур «всё включено», безопасно ли путешествовать, как забронировать круиз. 50+ вопросов по Турции, Египту, ОАЭ, Таиланду и другим странам.',
  url: `${SITE_URL}/faq`,
  type: 'website',
  keywords: [
    'частые вопросы',
    'FAQ Велес Вояж',
    'нужна ли виза',
    'сколько стоит тур',
    'туры всё включено',
    'морские круизы',
    'вопросы туристов',
    'путешествия 2026',
  ],
  faqs: faqItems.map((item) => ({ question: item.q, answer: item.a })),
});

const FaqPage = () => {
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Частые вопросы | Велес Вояж',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.faq-answer', '#voice-faq'],
    },
  };

  return (
    <article>
      <SchemaScripts schemas={[faqSchema, speakableSchema]} />

      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Частые вопросы
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Собрали ответы на самые популярные вопросы о турах, визах, ценах и круизах
            Велес Вояж. Если не нашли ответ — позвоните{' '}
            <a href="tel:+79850635134" className="text-blue-600 hover:underline">
              +7 985 063-51-34
            </a>{' '}
            или напишите в{' '}
            <a
              href="https://t.me/veles_voyage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Telegram
            </a>
            .
          </p>
        </div>

        <FAQSection
          faqs={faqItems.map((item) => ({ question: item.q, answer: item.a }))}
          title="Вопросы и ответы"
          schemaId="https://veles-voyage.ru/faq/#faq"
        />

        <div className="mt-12 text-center">
          <Link
            href="/wiki/countries"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Посмотреть путеводители по странам
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FaqPage;
