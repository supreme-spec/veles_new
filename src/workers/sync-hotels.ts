import { ostrovokClient } from '@/lib/ostrovok/client';

async function main() {
  console.log('🧪 Тестируем соединение с API Велес Вояж...');

  const test = await ostrovokClient.testConnection();

  if (test.success) {
    console.log('✅ API Велес Вояж доступен!');
    console.log('');
    console.log('🎯 Новая архитектура LAZY SYNC:');
    console.log('   • Отели загружаются по запросу пользователей');
    console.log('   • Когда юзер ищет → Велес Вояж возвращает → сохраняем в БД');
    console.log('   • Когда юзер открывает карточку → подтягиваем детали');
    console.log('   • Популярные отели обновляются в фоне');
    console.log('');
    console.log('📝 Следующие шаги:');
    console.log('   1. Запустите dev server: npm run dev');
    console.log('   2. Откройте /hotels');
    console.log('   3. Введите город (например: Москва)');
    console.log('   4. Система автоматически загрузит отели из Велес Вояж');
    console.log('');
    console.log('🚀 Готово к работе!');
  } else {
    console.error('❌ API Велес Вояж недоступен:', test.error);
    console.error('   Статус:', test.status);
    console.error('');
    console.error('🔧 Проверьте:');
    console.error('   1. .env.local содержит OSTROVOK_API_KEY и OSTROVOK_D_KEY');
    console.error('   2. Ключи правильные (без пробелов)');
    console.error('   3. IP вашего сервера в whitelist Велес Вояж');
  }

  process.exit(test.success ? 0 : 1);
}

main();
