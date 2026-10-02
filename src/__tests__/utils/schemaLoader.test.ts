/**
 * @ts-nocheck
 * Тесты для schemaLoader утилиты
 */

import { loadSchemas, preloadCriticalSchemas, type SchemaConfig } from '@/shared/utils/schemaLoader';

describe('schemaLoader', () => {
  beforeEach(() => {
    // Очистка кэша модулей перед каждым тестом
    jest.resetModules();
  });

  describe('loadSchemas', () => {
    it('должен загружать базовые схемы', async () => {
      const config: SchemaConfig = {
        types: ['organization', 'breadcrumb'],
        url: 'https://veles-voyage.ru/test',
        title: 'Test Page',
        description: 'Test Description',
      };

      const schemas = await loadSchemas(config);
      
      expect(schemas).toBeDefined();
      expect(Array.isArray(schemas)).toBe(true);
      expect(schemas.length).toBeGreaterThan(0);
    });

    it('должен загружать все типы схем', async () => {
      const config: SchemaConfig = {
        types: [
          'article',
          'faq',
          'organization',
          'breadcrumb',
          'speakable',
          'review',
          'video',
        ],
        url: 'https://veles-voyage.ru/test',
        title: 'Test Page',
        description: 'Test Description',
      };

      const schemas = await loadSchemas(config);
      
      expect(schemas.length).toBeGreaterThanOrEqual(7);
    });

    it('должен возвращать пустой массив для неизвестных типов', async () => {
      const config: SchemaConfig = {
        types: [],
        url: 'https://veles-voyage.ru/test',
      };

      const schemas = await loadSchemas(config);
      
      expect(schemas).toEqual([]);
    });

    it('должен обрабатывать ошибки загрузки gracefully', async () => {
      const config: SchemaConfig = {
        types: ['organization'],
        url: 'https://veles-voyage.ru/test',
      };

      // Мокаем импорт для проверки обработки ошибок
      jest.mock('@/shared/utils/schemaGenerators/organization', () => {
        throw new Error('Module not found');
      });

      await expect(loadSchemas(config)).rejects.toThrow();
    });
  });

  describe('preloadCriticalSchemas', () => {
    it('должен предзагружать критические схемы в браузере', () => {
      // Мокаем window для тестирования
      global.window = {} as Window & typeof globalThis;
      
      expect(() => preloadCriticalSchemas()).not.toThrow();
    });

    it('не должен выполнять предзагрузку на сервере', () => {
      delete (global as { window?: Window }).window;
      
      expect(() => preloadCriticalSchemas()).not.toThrow();
    });
  });
});

