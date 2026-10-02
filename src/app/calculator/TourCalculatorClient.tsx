'use client';

import React, { useState } from 'react';

const TourCalculatorClient = () => {
  const [destination, setDestination] = useState('turkey');
  const [people, setPeople] = useState(2);
  const [nights, setNights] = useState(7);
  const [hotelClass, setHotelClass] = useState('4');
  const [season, setSeason] = useState('medium');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  // Базовые цены за ночь на человека (в рублях)
  const basePrices: Record<string, Record<string, number>> = {
    turkey: {
      '3': 3000,
      '4': 4500,
      '5': 8000,
    },
    egypt: {
      '3': 3500,
      '4': 5000,
      '5': 9000,
    },
    uae: {
      '4': 7000,
      '5': 12000,
    },
    thailand: {
      '3': 4000,
      '4': 6000,
      '5': 10000,
    },
    vietnam: {
      '3': 3500,
      '4': 5000,
      '5': 8500,
    },
  };

  // Коэффициенты сезона
  const seasonMultipliers: Record<string, number> = {
    low: 0.7,
    medium: 1.0,
    high: 1.4,
  };

  // Названия направлений
  const destinationNames: Record<string, string> = {
    turkey: 'Турция',
    egypt: 'Египет',
    uae: 'ОАЭ',
    thailand: 'Таиланд',
    vietnam: 'Вьетнам',
  };

  // Названия сезонов
  const seasonNames: Record<string, string> = {
    low: 'Низкий сезон',
    medium: 'Средний сезон',
    high: 'Высокий сезон',
  };

  const calculatePrice = () => {
    const basePrice = basePrices[destination]?.[hotelClass] || 5000;
    const multiplier = seasonMultipliers[season] || 1;
    const price = basePrice * people * nights * multiplier;
    setCalculatedPrice(Math.round(price));
  };

  const resetCalculator = () => {
    setDestination('turkey');
    setPeople(2);
    setNights(7);
    setHotelClass('4');
    setSeason('medium');
    setCalculatedPrice(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12 pt-20 md:pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="mr-2">🧮</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Калькулятор стоимости тура
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Рассчитайте примерную стоимость путешествия. Точную цену уточняйте у менеджера Велес Вояж.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🌍 Направление
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="turkey">Турция</option>
                <option value="egypt">Египет</option>
                <option value="uae">ОАЭ</option>
                <option value="thailand">Таиланд</option>
                <option value="vietnam">Вьетнам</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                👥 Количество человек
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📅 Количество ночей
              </label>
              <input
                type="number"
                min="3"
                max="21"
                value={nights}
                onChange={(e) => setNights(parseInt(e.target.value) || 7)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ⭐ Класс отеля
              </label>
              <select
                value={hotelClass}
                onChange={(e) => setHotelClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="3">3 звезды</option>
                <option value="4">4 звезды</option>
                <option value="5">5 звезд</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📊 Сезон
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="low">Низкий сезон (самые низкие цены)</option>
                <option value="medium">Средний сезон</option>
                <option value="high">Высокий сезон (пиковые цены)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculatePrice}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium text-lg"
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={resetCalculator}
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-lg"
            >
              Сбросить
            </button>
          </div>
        </div>

        {calculatedPrice !== null && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📊 Результат расчёта
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Направление:</strong> {destinationNames[destination]}
              </p>
              <p>
                <strong>Количество человек:</strong> {people}
              </p>
              <p>
                <strong>Количество ночей:</strong> {nights}
              </p>
              <p>
                <strong>Класс отеля:</strong> {hotelClass} звезды
              </p>
              <p>
                <strong>Сезон:</strong> {seasonNames[season]}
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  Примерная стоимость: {calculatedPrice.toLocaleString('ru-RU')} ₽
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  * Это приблизительный расчёт. Точная цена зависит от конкретного отеля, авиакомпании и текущих предложений.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📞 Хотите точный расчёт?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Свяжитесь с нами, и менеджер подберёт оптимальный тур под ваш бюджет и предпочтения за 15 минут.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+79850635134"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              📞 +7 985 063-51-34
            </a>
            <a
              href="https://t.me/veles_voyage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              ✈️ Написать в Telegram
            </a>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-gray-700 rounded-2xl p-6 border border-yellow-200 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            ⚠️ Важная информация
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Расчёт является приблизительным и не является публичной офертой</li>
            <li>• Финальная цена зависит от конкретного отеля, авиакомпании и даты вылета</li>
            <li>• Цены могут меняться в зависимости от текущих акций и спецпредложений</li>
            <li>• Для точного расчёта свяжитесь с менеджером Велес Вояж</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourCalculatorClient;
