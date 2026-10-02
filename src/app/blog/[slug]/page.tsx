import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { FAQSection } from '@/components/FAQSection';
import { SITE_URL } from '@/shared/constants/seo';
import { blogPosts } from '@/shared/data/blogPosts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return generateSEOMetadata({
      title: 'Статья не найдена | Велес Вояж',
      description: 'Запрошенная статья не найдена.',
      url: `${SITE_URL}/blog`,
    });
  }
  return generateSEOMetadata({
    title: `${post.title} | Велес Вояж`,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    keywords: ['блог', 'путешествия', post.category, 'Велес Вояж 2026'],
  });
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Статья не найдена</h1>
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Вернуться в блог
        </Link>
      </div>
    );
  }

  return (
    <article>
      <StructuredData
        schemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            author: { '@type': 'Organization', name: post.author },
            publisher: {
              '@type': 'Organization',
              name: 'Велес Вояж',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: post.title,
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['.voice-snippet', 'article'],
            },
          },
        ]}
      />

      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24 max-w-3xl">
        <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide mb-2">
          {post.category} · {post.readingTime}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          {new Date(post.datePublished).toLocaleDateString('ru-RU')} · {post.author}
        </p>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {post.content.map((p, i) => (
            <p key={i} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <FAQSection faqs={post.faqs} title="Полезные вопросы" schemaId={`https://veles-voyage.ru/blog/${post.slug}/#faq`} />

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+79850635134"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Подобрать тур +7 985 063-51-34
          </a>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Все статьи
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
