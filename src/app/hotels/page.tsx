import type { Metadata } from 'next';
import Image from 'next/image';
import { HotelSearch } from './HotelSearch';

const HERO_IMAGE = '/images/archive/hotels/hotels-hero.jpg';

export const metadata: Metadata = {
  title: 'Поиск отелей - Велес Вояж',
  description: 'Найдите идеальный отель для вашего путешествия. Лучшие цены, мгновенное подтверждение, поддержка 24/7.',
};

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
        <header className="text-center mb-16">
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <Image
              src={HERO_IMAGE}
              alt="Поиск и бронирование отелей по всему миру онлайн через Велес Вояж"
              width={1200}
              height={630}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                🏨 Отели по всему миру
              </h1>
              <p className="text-white/90 mt-2 text-lg">Поиск и бронирование отелей онлайн</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto mb-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-blue-500/10 dark:from-amber-500/20 dark:to-blue-500/20 border border-amber-200/80 dark:border-amber-800/60 p-5 md:p-6 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
              <div>
                <div className="inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 mb-1">
                  Модуль в разработке
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Онлайн-поисковик отелей обновляется
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Подключаем весенне-летние базы и квоты 2026. Бронирование любого отеля доступно через персонального менеджера 24/7.
                </p>
              </div>
            </div>
            <a
              href="https://t.me/Anastasiiiiyyaa?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B4%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D1%8C%20%D0%B8%20%D0%B7%D0%B0%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BE%D1%82%D0%B5%D0%BB%D1%8C"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center shrink-0 w-full sm:w-auto min-w-fit px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all text-center whitespace-nowrap active:scale-95"
            >
              Забронировать через менеджера 24/7
            </a>
          </div>
        </div>

        <HotelSearch />

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 mt-16">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
            Поиск и бронирование отелей по всему миру с Велес Вояж
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-6">
              Велес Вояж — это современное турагентство с прямой интеграцией с отельными системами, которое помогает находить и бронировать отели по всему миру онлайн. Мы объединили сотни проверенных партнеров, чтобы предложить вам максимально широкий выбор размещения: от бюджетных хостелов и гостиниц до премиум-отелей 5* и люксовых курортов.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
