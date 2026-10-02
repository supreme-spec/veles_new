import React from 'react';
import type { WikiPage } from '@/features/wiki/types';

interface AutoFAQGeneratorProps {
  page: WikiPage;
  countryName: string;
  customFAQs?: Array<{
    question: string;
    answer: string;
  }>;
}

export const AutoFAQGenerator: React.FC<AutoFAQGeneratorProps> = ({
  page,
  countryName,
  customFAQs = [],
}) => {
  // Автогенерация FAQ на основе контента страницы
  const generateAutoFAQs = () => {
    const content = page.content;
    const autoFAQs = [];

    // FAQ 1: Въезд и документы
    if (content.includes('виз') || content.includes('паспорт') || content.includes('документы')) {
      autoFAQs.push({
        question: `Какие документы нужны для поездки в ${countryName}?`,
        answer: extractDocumentInfo(content, countryName),
      });
    }

    // FAQ 2: Лучшее время для посещения
    if (
      content.includes('сезон') ||
      content.includes('климат') ||
      content.includes('температура')
    ) {
      autoFAQs.push({
        question: `Когда лучше ехать в ${countryName}?`,
        answer: extractSeasonInfo(content, countryName),
      });
    }

    // FAQ 3: Цены и бюджет
    if (content.includes('₽') || content.includes('цена') || content.includes('стоимость')) {
      autoFAQs.push({
        question: `Какой бюджет нужен для поездки в ${countryName}?`,
        answer: extractPriceInfo(content, countryName),
      });
    }

    // FAQ 4: Главные достопримечательности
    if (
      content.includes('достопримечательности') ||
      content.includes('ТОП') ||
      content.includes('курорт')
    ) {
      autoFAQs.push({
        question: `Что обязательно посмотреть в ${countryName}?`,
        answer: extractAttractionInfo(content, countryName),
      });
    }

    // FAQ 5: Безопасность
    if (content.includes('безопасность') || content.includes('важно') || content.includes('⚠️')) {
      autoFAQs.push({
        question: `Безопасно ли путешествовать по ${countryName}?`,
        answer: extractSafetyInfo(content, countryName),
      });
    }

    // FAQ 6: Транспорт и передвижение
    if (
      content.includes('транспорт') ||
      content.includes('автопутешествие') ||
      content.includes('км')
    ) {
      autoFAQs.push({
        question: `Как лучше передвигаться по ${countryName}?`,
        answer: extractTransportInfo(content, countryName),
      });
    }

    return autoFAQs;
  };

  // Функции извлечения информации из контента
  const extractDocumentInfo = (content: string, country: string): string => {
    if (content.includes('российский паспорт')) {
      return `Для въезда в ${country} гражданам России нужен только российский паспорт (внутренний или загранпаспорт). Визы не требуется.`;
    }
    return `Для поездки в ${country} необходимы документы согласно актуальным требованиям. Рекомендуем уточнить информацию в консульстве.`;
  };

  const extractSeasonInfo = (content: string, country: string): string => {
    if (content.includes('Май-июнь') && content.includes('сентябрь-октябрь')) {
      return `Лучшее время для посещения ${country} — май-июнь (море прогрелось, нет жары) и сентябрь-октябрь (теплое море, мало туристов). Высокий сезон: июль-август.`;
    }
    return `Планируйте поездку в ${country} в зависимости от ваших предпочтений. Каждый сезон имеет свои особенности.`;
  };

  const extractPriceInfo = (content: string, country: string): string => {
    const priceMatch = content.match(/от (\d+)₽/g);
    if (priceMatch) {
      const minPrice = Math.min(...priceMatch.map(p => parseInt(p.match(/\d+/)?.[0] || '0')));
      return `Бюджет поездки в ${country}: от ${minPrice}₽/сутки за размещение. Экскурсии от 1500₽, питание от 500₽/день на человека.`;
    }
    return `Стоимость поездки в ${country} зависит от сезона, типа размещения и выбранных активностей.`;
  };

  const extractAttractionInfo = (content: string, country: string): string => {
    const attractions = [];
    if (content.includes('Озеро Рица')) attractions.push('Озеро Рица');
    if (content.includes('Новоафонская пещера')) attractions.push('Новоафонская пещера');
    if (content.includes('Новоафонский монастырь')) attractions.push('Новоафонский монастырь');
    if (content.includes('Гагра')) attractions.push('курорт Гагра');
    if (content.includes('Сухум')) attractions.push('столица Сухум');

    if (attractions.length > 0) {
      return `Главные достопримечательности ${country}: ${attractions.slice(0, 3).join(', ')}. Каждое место имеет свою уникальность и историю.`;
    }
    return `${country} богат на достопримечательности. Планируйте маршрут заранее для максимального впечатления.`;
  };

  const extractSafetyInfo = (content: string, country: string): string => {
    if (content.includes('⚠️')) {
      return `При поездке в ${country} следует учитывать особенности региона. Соблюдайте меры предосторожности и следите за актуальной обстановкой.`;
    }
    return `${country} в целом безопасен для туристов. Соблюдайте стандартные меры предосторожности.`;
  };

  const extractTransportInfo = (content: string, country: string): string => {
    if (content.includes('автопутешествие')) {
      return `${country} идеально подходит для автопутешествий. Можно арендовать автомобиль или использовать местный транспорт.`;
    }
    return `В ${country} доступны различные виды транспорта. Выбирайте наиболее удобный для ваших планов.`;
  };

  // Объединяем автогенерированные и кастомные FAQ
  const allFAQs = [...generateAutoFAQs(), ...customFAQs];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema, null, 2) }}
    />
  );
};
