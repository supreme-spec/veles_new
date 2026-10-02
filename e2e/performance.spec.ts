import { test, expect } from '@playwright/test';

test.describe('Производительность', () => {
  test('главная страница должна загружаться быстро', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Проверяем, что страница загрузилась менее чем за 3 секунды
    expect(loadTime).toBeLessThan(3000);
  });

  test('должна иметь правильные размеры ресурсов', async ({ page }) => {
    const responses: Array<{ url: string; size: number }> = [];
    
    page.on('response', (response) => {
      const size = response.headers()['content-length'];
      if (size) {
        responses.push({
          url: response.url(),
          size: parseInt(size, 10),
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что основные ресурсы не слишком большие
    const totalSize = responses.reduce((sum, r) => sum + r.size, 0);
    const totalSizeMB = totalSize / (1024 * 1024);
    
    // Общий размер не должен превышать 5MB
    expect(totalSizeMB).toBeLessThan(5);
  });

  test('должна использовать code splitting', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем наличие динамических импортов через network requests
    const jsRequests = [];
    page.on('request', (request) => {
      if (request.url().endsWith('.js') && request.url().includes('_next/static')) {
        jsRequests.push(request.url());
      }
    });
    
    await page.waitForLoadState('networkidle');
    
    // Должно быть несколько JS chunks (признак code splitting)
    expect(jsRequests.length).toBeGreaterThan(1);
  });
});

