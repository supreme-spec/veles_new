/**
 * @ts-nocheck
 * Интеграционные тесты для Web Vitals API
 */

import { POST } from '@/app/api/web-vitals/route';
import { NextRequest } from 'next/server';

// Мокаем rate limiting
jest.mock('@/shared/utils/rateLimit', () => ({
  rateLimitMiddleware: jest.fn(() => () => ({
    allowed: true,
    headers: new Headers(),
  })),
}));

describe('POST /api/web-vitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен принимать валидные данные Web Vitals', async () => {
    const validData = {
      name: 'LCP',
      value: 2500,
      id: 'test-id-123',
      page: 'https://veles-voyage.ru/',
      timestamp: Date.now(),
    };

    const request = new NextRequest('http://localhost:3000/api/web-vitals', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('должен отклонять невалидные данные', async () => {
    const invalidData = {
      name: 'INVALID',
      value: -100,
    };

    const request = new NextRequest('http://localhost:3000/api/web-vitals', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid request data');
    expect(data.details).toBeDefined();
  });

  it('должен обрабатывать rate limiting', async () => {
    const { rateLimitMiddleware } = require('@/shared/utils/rateLimit');
    rateLimitMiddleware.mockReturnValueOnce(() => ({
      allowed: false,
      headers: new Headers({
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '0',
      }),
    }));

    const request = new NextRequest('http://localhost:3000/api/web-vitals', {
      method: 'POST',
      body: JSON.stringify({
        name: 'LCP',
        value: 2500,
        id: 'test-id',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe('Too Many Requests');
  });

  it('должен обрабатывать ошибки парсинга JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/web-vitals', {
      method: 'POST',
      body: 'invalid json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    
    expect(response.status).toBe(500);
  });
});

