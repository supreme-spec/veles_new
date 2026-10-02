import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { SITE_URL } from '@/shared/constants/seo';
import { blogPosts } from '@/shared/data/blogPosts';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Блог Велес Вояж — гайды, цены и советы по путешествиям 2026',
  description:
    'Экспертные статьи о турах: куда поехать в феврале 2026, топ отелей Дубая, сколько стоит тур в Турцию. Практические гайды от Велес Вояж.',
  url: `${SITE_URL}/blog`,
  type: 'website',
  keywords: ['блог путешествий', 'гайды по турам', 'советы туристам', 'цены на туры 2026', 'куда поехать'],
});

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Блог Велес Вояж
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Гайды, цены и практические советы по путешествиям от экспертной редакции.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow p-6"
          >
            <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide mb-2">
              {post.category} · {post.readingTime}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-3">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">{post.description}</p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.datePublished).toLocaleDateString('ru-RU')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
