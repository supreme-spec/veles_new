import { countries } from '@lib/velite-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateEnhancedSEOMetadata } from '@/lib/seo/unifiedSEO';
import { SITE_URL } from '@/shared/constants/seo';
import { SchemaScripts } from '@/components/SchemaScripts';

interface VoiceCountryPageProps {
  params: {
    country: string;
  };
}

export async function generateStaticParams() {
  return countries
    .filter(c => c.slug && c.slug !== 'countries')
    .map((country) => ({
      country: country.slug,
    }));
}

export async function generateMetadata({ params }: VoiceCountryPageProps): Promise<Metadata> {
  const country = countries.find(c => c.slug === params.country);
  
  if (!country) {
    return {
      title: 'Страна не найдена',
    };
  }

  const countryName = country.title || country.slug;
  
  return generateEnhancedSEOMetadata({
    title: `Голосовой справочник: ${countryName} — визы, цены, когда ехать`,
    description: `Короткие ответы для голосовых ассистентов про ${countryName}: нужна ли виза, сколько стоит тур, когда лучше ехать, безопасно ли. Для Алисы, Siri, Google Ассистента.`,
    url: `${SITE_URL}/voice/${country.slug}`,
    type: 'website',
    keywords: [
      `голосовой помощник ${countryName}`,
      `Алиса ${countryName}`,
      `Siri ${countryName}`,
      `виза ${countryName}`,
      `тур ${countryName} цена`,
      `когда ехать в ${countryName}`,
    ],
  });
}

function generateVoiceContent(country: any) {
  const name = country.title || country.slug;
  const visaRequired = country.visaRequirements ? 'Требуется' : 'Не требуется';
  const cost = country.estimatedCost ? `${country.estimatedCost.toLocaleString('ru-RU')} ₽` : 'по запросу';
  const bestTime = country.bestTimeToVisit || 'круглый год';
  const capital = country.capital || 'Столица не указана';
  const currency = country.currency || 'местная валюта';

  // Generate FAQ for voice assistants
  const faqItems = [
    {
      question: `Нужна ли виза в ${name} для россиян?`,
      answer: `${visaRequired}. ${country.visaRequirements ? 'Оформляйте заранее через консульство или электронную визу.' : 'Въезд по загранпаспорту.'}`,
    },
    {
      question: `Сколько стоит тур в ${name} на двоих?`,
      answer: `Тур на двоих на 7 ночей стоит от ${cost}. Цена зависит от сезона и класса отеля.`,
    },
    {
      question: `Когда лучше ехать в ${name}?`,
      answer: `Лучшее время: ${bestTime}. В этот период комфортная погода для прогулок и пляжа.`,
    },
    {
      question: `Какая валюта в ${name}?`,
      answer: `Национальная валюта: ${currency}. Рекомендуем иметь наличные и карту.`,
    },
    {
      question: `Как добраться до ${capital}?`,
      answer: `Прямые рейсы или стыковки через Москву и Санкт-Петербург. Организуем трансфер.`,
    },
    {
      question: `Безопасно ли путешествовать по ${name}?`,
      answer: `Да, туристические зоны безопасны. Соблюдайте базовые правила безопасности и берите страховку.`,
    },
  ];

  return { faqItems, name, visaRequired, cost, bestTime, capital, currency };
}

export default function VoiceCountryPage({ params }: VoiceCountryPageProps) {
  const country = countries.find(c => c.slug === params.country);

  if (!country) {
    notFound();
  }

  const { faqItems, name, visaRequired, cost, bestTime, capital, currency } = generateVoiceContent(country);

  // Generate Schema.org structured data
  const voiceFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Голосовой справочник: ${name}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.voice-snippet', '.faq-answer'],
    },
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <SchemaScripts schemas={[voiceFaqSchema, speakableSchema]} />

      <header className="mb-10">
        <Link 
          href="/voice" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Вернуться к голосовому справочнику
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Голосовой справочник: {name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          Короткие ответы для голосовых ассистентов
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Используйте эти ответы с Алисой, Siri, Google Ассистентом или Марусой.
          Информация актуальна на 2026 год.
        </p>
      </header>

      {/* Quick Facts */}
      <section className="mb-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Быстрые факты
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Виза:</span>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">{visaRequired}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Стоимость тура:</span>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">{cost}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Лучшее время:</span>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">{bestTime}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Столица:</span>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">{capital}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Валюта:</span>
            <span className="ml-2 font-semibold text-gray-900 dark:text-white">{currency}</span>
          </div>
        </div>
      </section>

      {/* Voice FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Ответы для голосовых ассистентов
        </h2>
        <div className="space-y-3" id="voice-faq">
          {faqItems.map((item, index) => (
            <details 
              key={index} 
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <summary className="cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {item.question}
              </summary>
              <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 faq-answer voice-snippet">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Additional Links */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Дополнительная информация
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href={`/wiki/${country.slug}`}
            className="block p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Полный путеводитель по {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Подробная информация об достопримечательностях, отелях и маршрутах
            </p>
          </Link>
          <Link 
            href="/contacts"
            className="block p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Забронировать тур в {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Свяжитесь с нами для консультации и бронирования
            </p>
          </Link>
        </div>
      </section>

      {/* Usage Tips */}
      <section className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Как использовать с голосовыми ассистентами
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li>• <strong>Алиса (Яндекс):</strong> "Яндекс, расскажи про {name}"</li>
          <li>• <strong>Siri (Apple):</strong> "Siri, нужна ли виза в {name}"</li>
          <li>• <strong>Google Ассистент:</strong> "Hey Google, сколько стоит тур в {name}"</li>
          <li>• <strong>Маруся (Сбер):</strong> "Маруся, когда лучше ехать в {name}"</li>
        </ul>
      </section>

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Информация актуальна на 2026 год | Велес Вояж (РТА 0035678)</p>
        <p className="mt-1">
          <Link href="/voice" className="text-blue-600 hover:text-blue-800">
            Все голосовые справочники
          </Link>
        </p>
      </footer>
    </div>
  );
}