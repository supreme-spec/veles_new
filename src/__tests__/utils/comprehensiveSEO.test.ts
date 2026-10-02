// @ts-nocheck - Jest предоставляет глобальные типы во время выполнения
import { generateCompleteSEO } from '@/shared/utils/comprehensiveSEO';

describe('generateCompleteSEO', () => {
  const baseConfig = {
    title: 'Test Page',
    description: 'Test description',
    url: 'https://veles-voyage.ru/test',
    type: 'article' as const,
    image: 'https://veles-voyage.ru/images/logo.png',
    keywords: ['test', 'keywords'],
  };

  it('should generate basic SEO data', () => {
    const seoData = generateCompleteSEO(baseConfig);
    
    expect(seoData.metaTags.title).toBe('Test Page');
    expect(seoData.metaTags.description).toBe('Test description');
    expect(seoData.metaTags.url).toBe('https://veles-voyage.ru/test');
    expect(seoData.metaTags.type).toBe('article');
  });

  it('should include breadcrumbs when provided', () => {
    const seoData = generateCompleteSEO({
      ...baseConfig,
      breadcrumbs: [
        { name: 'Home', url: 'https://veles-voyage.ru' },
        { name: 'Test', url: 'https://veles-voyage.ru/test' },
      ],
    });
    
    expect(seoData.schemas.some(s => s['@type'] === 'BreadcrumbList')).toBe(true);
    expect(seoData.schemas.some(s => s['@type'] === 'BreadcrumbList')).toBe(true);
  });

  it('should include FAQ schema when FAQs provided', () => {
    const seoData = generateCompleteSEO({
      ...baseConfig,
      faqs: [
        { question: 'Test question?', answer: 'Test answer' },
      ],
    });
    
    expect(seoData.schemas.some(s => s['@type'] === 'FAQPage')).toBe(true);
    expect(seoData.schemas.some(s => s['@type'] === 'FAQPage')).toBe(true);
  });

  it('should include Web3 schema when includeWeb3 is true', () => {
    const seoData = generateCompleteSEO({
      ...baseConfig,
      includeWeb3: true,
    });
    
    // Проверяем наличие Web3 схемы
    expect(seoData.schemas.some(s => s['@type'] === 'DigitalDocument')).toBe(true);
  });

  it('should include AI schema when includeAI is true', () => {
    const seoData = generateCompleteSEO({
      ...baseConfig,
      includeAI: true,
    });
    
    // Проверяем наличие AI схемы
    expect(seoData.schemas.some(s => s['@type'] === 'WebPage' || s['@type'] === 'Article')).toBe(true);
  });

  it('should generate dates', () => {
    const seoData = generateCompleteSEO(baseConfig);
    
    expect(seoData.dates.published).toBeTruthy();
    expect(seoData.dates.modified).toBeTruthy();
    expect(seoData.dates.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

