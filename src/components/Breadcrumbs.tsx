import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6 leading-none" aria-label="Навигация">
      {items.map((item, index) => (
        <div key={index} className="flex items-center leading-none">
          {index > 0 && (
            <ChevronRight className="w-3.5 h-3.5 mx-1 flex-shrink-0" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-none"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium leading-none">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
