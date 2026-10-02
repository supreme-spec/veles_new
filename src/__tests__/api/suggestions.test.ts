/**
 * @ts-nocheck
 * Интеграционные тесты для Suggestions API
 */

import { GET } from '@/app/api/suggestions/route';
import { NextRequest } from 'next/server';

// Мокаем rate limiting
jest.mock('@/shared/utils/rateLimit', () => ({
  rateLimitMiddleware: jest.fn(() => () => ({
    allowed: true,
    headers: new Headers(),
  })),
}));

// Мокаем данные
jest.mock('@/shared/data/wikiPages', () => ({
  allCountryIds: ['russia', 'belarus', 'ukraine'],
  wikiPages: {
    russia: { title: 'Россия' },
    belarus: { title: 'Беларусь' },
    ukraine: { title: 'Украина' },
  },
}));

jest.mock('@/shared/data', () => ({
  russianCities: ['Москва', 'Санкт-Петербург', 'Новосибирск'],
}));

describe('GET /api/suggestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен возвращать предложения для валидного запроса', async () => {
    const request = new NextRequest('http://localhost:3000/api/suggestions?q=рос', {
      method: 'GET',
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('должен возвращать пустой массив для пустого запроса', async () => {
    const request = new NextRequest('http://localhost:3000/api/suggestions?q=', {
      method: 'GET',
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  it('должен отклонять слишком короткие запросы', async () => {
    const request = new NextRequest('http://localhost:3000/api/suggestions?q=р', {
      method: 'GET',
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid query');
  });

  it('должен обрабатывать rate limiting', async () => {
    const { rateLimitMiddleware } = require('@/shared/utils/rateLimit');
    rateLimitMiddleware.mockReturnValueOnce(() => ({
      allowed: false,
      headers: new Headers(),
    }));

    const request = new NextRequest('http://localhost:3000/api/suggestions?q=россия', {
      method: 'GET',
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe('Too Many Requests');
  });
});

