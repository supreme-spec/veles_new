// @ts-nocheck - Jest предоставляет глобальные типы во время выполнения
import { checkRateLimit, getClientIP, rateLimitMiddleware } from '@/shared/utils/rateLimit';

// Мокаем хранилище для изоляции тестов
// В реальности это in-memory хранилище, но для тестов нужно очищать
const originalStore = (checkRateLimit as unknown as { __store?: Record<string, unknown> }).__store;

describe('Rate Limit Utils', () => {
  beforeEach(() => {
    // Очищаем хранилище перед каждым тестом
    // Используем уникальные IP для каждого теста, чтобы избежать конфликтов
    jest.clearAllMocks();
  });

  describe('checkRateLimit', () => {
    it('should allow first request', () => {
      // Используем уникальный IP с timestamp для изоляции
      const uniqueIP = `test-ip-1-${Date.now()}`;
      const result = checkRateLimit(uniqueIP);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(99); // max - 1
    });

    it('should track multiple requests from same IP', () => {
      // Используем уникальный IP с timestamp для изоляции
      const ip = `test-ip-2-${Date.now()}`;
      checkRateLimit(ip);
      checkRateLimit(ip);
      const result = checkRateLimit(ip);
      
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(97); // max - 3
    });

    it('should block after exceeding limit', () => {
      // Используем уникальный IP с timestamp для изоляции
      const ip = `test-ip-3-${Date.now()}`;
      const options = { windowMs: 1000, max: 2 };
      
      checkRateLimit(ip, options);
      checkRateLimit(ip, options);
      const result = checkRateLimit(ip, options);
      
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });
  });

  describe('getClientIP', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const request = new Request('http://example.com', {
        headers: {
          'x-forwarded-for': '192.168.1.1, 10.0.0.1',
        },
      });
      
      const ip = getClientIP(request);
      expect(ip).toBe('192.168.1.1');
    });

    it('should extract IP from x-real-ip header', () => {
      const request = new Request('http://example.com', {
        headers: {
          'x-real-ip': '192.168.1.2',
        },
      });
      
      const ip = getClientIP(request);
      expect(ip).toBe('192.168.1.2');
    });

    it('should return unknown if no IP headers', () => {
      const request = new Request('http://example.com');
      const ip = getClientIP(request);
      expect(ip).toBe('unknown');
    });
  });

  describe('rateLimitMiddleware', () => {
    it('should allow request within limit', () => {
      const middleware = rateLimitMiddleware({ windowMs: 1000, max: 10 });
      // Используем уникальный IP с timestamp для изоляции
      const uniqueIP = `192.168.1.1-${Date.now()}`;
      const request = new Request('http://example.com', {
        headers: {
          'x-forwarded-for': uniqueIP,
        },
      });
      
      const result = middleware(request);
      expect(result.allowed).toBe(true);
      expect(result.headers?.get('X-RateLimit-Limit')).toBe('10');
      expect(result.headers?.get('X-RateLimit-Remaining')).toBe('9');
    });

    it('should block request exceeding limit', () => {
      const middleware = rateLimitMiddleware({ windowMs: 1000, max: 2 });
      // Используем уникальный IP с timestamp для изоляции
      const uniqueIP = `192.168.1.2-${Date.now()}`;
      const request = new Request('http://example.com', {
        headers: {
          'x-forwarded-for': uniqueIP,
        },
      });
      
      // Первые два запроса
      middleware(request);
      middleware(request);
      
      // Третий запрос должен быть заблокирован
      const result = middleware(request);
      expect(result.allowed).toBe(false);
      expect(result.headers?.get('Retry-After')).toBeTruthy();
    });
  });
});

