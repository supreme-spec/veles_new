import { test, expect } from '@playwright/test';

test.describe('SEO оптимизация', () => {
  const pages = [
    { path: '/', title: 'Главная' },
    { path: '/tours', title: 'Туры' },
    { path: '/cruises', title: 'Круизы' },
    { path: '/about', title: 'О нас' },
    { path: '/contacts', title: 'Контакты' },
    { path: '/wiki', title: 'Энциклопедия' },
  ];

  for (const pageInfo of pages) {
    test(`${pageInfo.title} страница должна иметь правильные SEO мета-теги`, async ({ page }) => {
      await page.goto(pageInfo.path);
      
      // Проверяем title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      
      // Проверяем meta description
      const metaDescription = page.locator('meta[name="description"]');
      const description = await metaDescription.getAttribute('content');
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);
      
      // Проверяем canonical
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', /.+/);
    });

    test(`${pageInfo.title} страница должна содержать Schema.org разметку`, async ({ page }) => {
      await page.goto(pageInfo.path);
      
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      expect(count).toBeGreaterThan(0);
    });
  }
});

