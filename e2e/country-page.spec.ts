import { test, expect } from '@playwright/test';

test.describe('Страница страны (wiki/[country])', () => {
  test('должна загружаться и отображать JSON-LD разметку', async ({ page }) => {
    await page.goto('/wiki/turkey');
    
    // Проверяем заголовок
    await expect(page).toHaveTitle(/Турция/i);
    
    // Проверяем наличие JSON-LD схем
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThan(0);
    
    // Проверяем, что есть TouristTrip или Country схема
    const schemaContents = await jsonLdScripts.allTextContents();
    const hasRelevantSchema = schemaContents.some(content => 
      content.includes('TouristTrip') || content.includes('Country') || content.includes('FAQPage')
    );
    expect(hasRelevantSchema).toBe(true);
  });

  test('должна отображать цену без NaN', async ({ page }) => {
    await page.goto('/wiki/turkey');
    
    // Проверяем, что на странице есть цена и она не NaN
    const priceText = await page.locator('.font-extrabold').first().textContent();
    if (priceText && priceText.includes('₽')) {
      expect(priceText).not.toContain('NaN');
      expect(priceText).toMatch(/\d/);
    }
  });

  test('должна содержать Speakable Schema для voice search', async ({ page }) => {
    await page.goto('/wiki/turkey');
    
    // Проверяем наличие Speakable Specification в JSON-LD
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    
    let hasSpeakable = false;
    for (let i = 0; i < count; i++) {
      const content = await jsonLdScripts.nth(i).textContent();
      if (content?.includes('SpeakableSpecification')) {
        hasSpeakable = true;
        break;
      }
    }
    
    expect(hasSpeakable).toBe(true);
  });
});
