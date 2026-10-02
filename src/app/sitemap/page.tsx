import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: 'Карта сайта — Велес Вояж',
  description: 'Полная карта сайта Велес Вояж: все разделы, страницы и сервисы турагентства.',
  alternates: {
    canonical: `${SITE_URL}/sitemap`,
    languages: {
      ru: `${SITE_URL}/sitemap`,
      'x-default': `${SITE_URL}/sitemap`,
    },
  },
};

export default function SitemapPage() {
  const sections = [
    { title: 'Главная', href: '/' },
    { title: 'Туры', href: '/tours' },
    { title: 'Отели', href: '/hotels' },
    { title: 'Круизы', href: '/cruises' },
    { title: 'О компании', href: '/about' },
    { title: 'Контакты', href: '/contacts' },
    { title: 'Энциклопедия', href: '/wiki' },
    { title: 'Страны', href: '/wiki/countries' },
    { title: 'Блог', href: '/blog' },
    { title: 'Частые вопросы', href: '/faq' },
    { title: 'Образование', href: '/education' },
    { title: 'Авиабилеты', href: '/flights' },
    { title: 'Новости', href: '/news' },
    { title: 'Отзывы', href: '/reviews' },
    { title: 'Партнёры', href: '/partners' },
    { title: 'Миссия', href: '/mission' },
    { title: 'Ценности', href: '/values' },
    { title: 'Команда', href: '/team' },
    { title: 'Реквизиты', href: '/requisites' },
    { title: 'Поддержка', href: '/support' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Карта сайта</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 no-underline"
            >
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                {section.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
