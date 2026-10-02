import { db } from '@/db';
import { hotels } from '@/db/schema';

const TEST_HOTELS = [
  {
    ostrovokHid: 8526976,
    name: 'Гранд-Отель Метрополь',
    slug: 'grand-hotel-metropol',
    country: 'Россия',
    city: 'Москва',
    address: 'Театральный проезд, 2',
    stars: 5,
    amenities: ['Бассейн', 'Спа', 'Wi-Fi', 'Фитнес'],
    images: [],
    description: 'Легендарный отель в центре Москвы с великолепным сервисом и исторической архитектурой.',
  },
  {
    ostrovokHid: 8526977,
    name: 'Велес Вояж Спа & Резорт',
    slug: 'veles-spa-resort',
    country: 'Россия',
    city: 'Сочи',
    address: 'Курортный проспект, 84',
    stars: 5,
    amenities: ['Бассейн', 'Спа', 'All Inclusive', 'Пляж'],
    images: [],
    description: 'Премиум-курорт на берегу Черного моря с полным спектром услуг для отдыха.',
  },
  {
    ostrovokHid: 8526978,
    name: 'Балтийская Жемчужина',
    slug: 'baltiyskaya-zhemchuzhina',
    country: 'Россия',
    city: 'Санкт-Петербург',
    address: 'ул. Большая Морская, 22',
    stars: 4,
    amenities: ['Wi-Fi', 'Завтрак', 'Парковка'],
    images: [],
    description: 'Бутик-отель в историческом центре Санкт-Петербурга рядом с Эрмитажем.',
  },
  {
    ostrovokHid: 8526979,
    name: 'Азов Плаза',
    slug: 'azov-plaza',
    country: 'Россия',
    city: 'Ростов-на-Дону',
    address: 'ул. Набережная, 12',
    stars: 4,
    amenities: ['Бассейн', 'Wi-Fi', 'Конференц-зал'],
    images: [],
    description: 'Современный бизнес-отель с видом на реку Дон.',
  },
];

async function seed() {
  for (const hotel of TEST_HOTELS) {
    try {
      await db.insert(hotels).values({
        ...hotel,
        ostrovokId: String(hotel.ostrovokHid),
        normalizedName: hotel.name.toLowerCase().trim(),
        status: 'ACTIVE',
        source: 'seed',
        lastSyncedAt: new Date(),
        lastSeenAt: new Date(),
      });
      console.log(`Seeded: ${hotel.name}`);
    } catch (error) {
      console.error(`Error seeding ${hotel.name}:`, error);
    }
  }
  console.log('Done');
  process.exit(0);
}

seed();
