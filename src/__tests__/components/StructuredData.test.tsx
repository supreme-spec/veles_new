/**
 * @ts-nocheck
 * Тесты для компонента StructuredData
 */

import React from 'react';
import { render } from '@testing-library/react';
import StructuredData from '@/components/SEO/StructuredData';

describe('StructuredData', () => {
  const mockSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Test Article',
    },
  ];

  it('должен рендерить схемы как JSON-LD скрипты', () => {
    const { container } = render(<StructuredData schemas={mockSchemas} />);
    
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(2);
  });

  it('должен правильно сериализовать схемы в JSON', () => {
    const { container } = render(<StructuredData schemas={mockSchemas} />);
    
    const firstScript = container.querySelector('script[type="application/ld+json"]');
    expect(firstScript).toBeTruthy();
    
    const content = firstScript?.textContent;
    expect(content).toContain('schema.org');
    expect(content).toContain('Organization');
  });

  it('должен возвращать null для пустого массива', () => {
    const { container } = render(<StructuredData schemas={[]} />);
    
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(0);
  });

  it('должен фильтровать невалидные схемы', () => {
    const invalidSchemas = [
      null,
      undefined,
      'invalid',
      mockSchemas[0],
    ];
    
    const { container } = render(<StructuredData schemas={invalidSchemas as Array<Record<string, unknown>>} />);
    
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    // Должна остаться только одна валидная схема
    expect(scripts.length).toBe(1);
  });

  it('должен обрабатывать не-массив входных данных', () => {
    const { container } = render(<StructuredData schemas={null as unknown as Array<Record<string, unknown>>} />);
    
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(0);
  });
});

