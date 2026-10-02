import type { BreadcrumbListSchema } from '@/shared/types/schema';
import { SITE_URL } from '@/shared/constants/seo';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(currentUrl: string, items?: BreadcrumbItem[]): BreadcrumbListSchema {
  const defaultItems: BreadcrumbItem[] = items || [
    { name: 'Главная', url: `${SITE_URL}/` },
  ];

  // Добавляем текущую страницу, если её нет в списке
  if (!defaultItems.some(item => item.url === currentUrl)) {
    defaultItems.push({
      name: 'Текущая страница',
      url: currentUrl,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: defaultItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

