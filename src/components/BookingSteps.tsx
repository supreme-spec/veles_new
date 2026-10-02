import React from 'react';

interface Step {
  name: string;
  text: string;
  phone?: string;
  telegram?: string;
}

const STEPS: Step[] = [
  {
    name: 'Оставьте заявку',
    text: 'Позвоните +7 985 063-51-34 или напишите в Telegram @veles_voyage. Опишите желаемое направление, даты и бюджет.',
    phone: '+79850635134',
    telegram: 'https://t.me/veles_voyage',
  },
  {
    name: 'Подбор маршрута',
    text: 'Менеджер предложит 2–3 варианта тура «всё включено» или круиза под ваши интересы в течение 15 минут.',
  },
  {
    name: 'Бронирование и оплата',
    text: 'Фиксируем цену, бронируем отель и перелёт. Оплата удобным способом, есть рассрочка.',
  },
  {
    name: 'Подготовка документов',
    text: 'Помогаем с визой (если нужна), страховкой и памяткой по стране. Проверяем срок действия загранпаспорта.',
  },
  {
    name: 'Поддержка 24/7 в поездке',
    text: 'Сопровождаем на всех этапах путешествия: трансфер, заселение, экскурсии и любые вопросы на русском языке.',
  },
];

export const BookingSteps: React.FC = () => {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Как забронировать тур в Велес Вояж в 5 шагов',
    description:
      'Пошаговая инструкция бронирования индивидуального тура или морского круиза с Велес Вояж: от заявки до поддержки 24/7.',
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'RUB',
      value: '50000',
      minValue: '30000',
      maxValue: '500000'
    },
    step: STEPS.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Как забронировать тур в 5 шагов
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Простая и прозрачная процедура бронирования с поддержкой 24/7.
        </p>
        <ol className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {STEPS.map((step, i) => (
            <li
              key={i}
              className="h-full flex gap-4 items-start bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{step.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {step.phone ? (
                    <>
                      Позвоните <a href={`tel:${step.phone}`} className="text-blue-600 hover:text-blue-800 underline font-medium">+7 985 063-51-34</a> или напишите в <a href={step.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">Telegram @veles_voyage</a>. Опишите желаемое направление, даты и бюджет.
                    </>
                  ) : (
                    step.text
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </div>
    </section>
  );
};

export default BookingSteps;
