'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { getRussianNameBySlug } from '@/lib/breadcrumb-mapper';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  disableSchema?: boolean;
}

function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `https://veles-voyage.ru${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Breadcrumbs({ items, disableSchema }: BreadcrumbsProps) {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const breadcrumbs: BreadcrumbItem[] = items
    ? items
    : (() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        return pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const name = getRussianNameBySlug(segment);
          return { name, href };
        });
      })();

  const homeItem: BreadcrumbItem = { name: 'Главная', href: '/' };

  const allItems = [homeItem, ...breadcrumbs];

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs mb-6 overflow-x-auto py-2">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap leading-none">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={item.href + index} className="flex items-center leading-none">
                {index > 0 && (
                  <ChevronRightIcon className="h-3.5 w-3.5 mx-1 text-gray-500 flex-shrink-0" />
                )}
                {isLast ? (
                  <span className="font-medium text-gray-900 dark:text-white leading-none" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-none"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {!disableSchema && <BreadcrumbSchema items={allItems} />}
    </>
  );
}

export { Breadcrumbs };
