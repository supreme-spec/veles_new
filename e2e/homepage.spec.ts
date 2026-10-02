import { test, expect } from '@playwright/test';

test.describe('Главная страница', () => {
  test('должна загружаться и отображать основной контент', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем заголовок страницы
    await expect(page).toHaveTitle(/Велес Вояж/i);
    
    // Проверяем наличие основных элементов
    const headings = page.locator('h1, h2');
    const count = await headings.count();
    let found = false;
    
    for (let i = 0; i < count; i++) {
      const text = await headings.nth(i).textContent();
      if (text && (text.includes('путешеств') || text.includes('тур') || text.includes('Путешеств') || text.includes('Тур'))) {
        found = true;
        break;
      }
    }
    
    expect(found).toBe(true);
  });

  test('должна содержать правильные мета-теги для SEO', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
    
    // Проверяем Open Graph теги
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
  });

  test('должна содержать Schema.org разметку', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем наличие JSON-LD схем
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThan(0);
    
    // Проверяем содержимое схемы
    const schemaContent = await jsonLdScripts.first().textContent();
    expect(schemaContent).toContain('schema.org');
  });

  test('должна быть доступна для навигации', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем наличие ссылок навигации
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('должна отображать цены без NaN', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем, что на странице есть цены и они не содержат NaN
    const priceElements = page.locator('.text-indigo-600, .font-extrabold');
    const count = await priceElements.count();
    
    for (let i = 0; i < Math.min(count, 10); i++) {
      const text = await priceElements.nth(i).textContent();
      if (text && text.includes('₽')) {
        expect(text).not.toContain('NaN');
        expect(text).toMatch(/\d/);
      }
    }
  });
});