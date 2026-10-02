import { defineConfig, devices } from '@playwright/test';

/**
 * Конфигурация Playwright для E2E тестов
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* Максимальное время выполнения одного теста */
  timeout: 30 * 1000,
  expect: {
    /* Максимальное время ожидания для expect */
    timeout: 5000,
  },
  /* Запускать тесты в параллель */
  fullyParallel: true,
  /* Не запускать тесты в CI, если они помечены как @skipCI */
  forbidOnly: !!process.env.CI,
  /* Повторять тесты только в CI */
  retries: process.env.CI ? 2 : 0,
  /* Оптимальное количество воркеров */
  workers: process.env.CI ? 1 : 4,
  /* Репортер для использования */
  reporter: 'html',
  /* Общие настройки для всех проектов */
  use: {
    /* Базовый URL для использования в действиях типа `await page.goto('/')` */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:9323',
    /* Собирать трейс при повторных попытках */
    trace: 'on-first-retry',
    /* Скриншоты при ошибках */
    screenshot: 'only-on-failure',
  },

  /* Настройки проектов для разных браузеров */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Тестирование мобильных версий */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Запускать dev сервер перед тестами */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:9323',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    env: {
      PORT: '9323',
    },
  },
});

