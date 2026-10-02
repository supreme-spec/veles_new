'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WikiPage } from '@/features/wiki/types';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQDisplayProps {
  page: WikiPage;
  countryName: string;
  customFAQs?: FAQItem[];
}

export const FAQDisplay: React.FC<FAQDisplayProps> = ({ page, countryName, customFAQs = [] }) => {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

  // Автогенерация FAQ на основе контента страницы
  const generateAutoFAQs = (): FAQItem[] => {
    const content = page.content;
    const autoFAQs: FAQItem[] = [];

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

  // Функции извлечения информации (упрощенные версии)
  const extractDocumentInfo = (content: string, country: string): string => {
    if (content.includes('безвизовый')) {
      return `Для граждан России въезд в ${country} безвизовый. Необходим действующий загранпаспорт.`;
    }
    return `Для поездки в ${country} уточните актуальные визовые требования в консульстве или на официальных сайтах.`;
  };

  const extractSeasonInfo = (content: string, country: string): string => {
    if (content.includes('круглый год')) {
      return `${country} можно посещать круглый год. Выбирайте время в зависимости от ваших предпочтений.`;
    }
    return `Лучшее время для посещения ${country} зависит от климатических условий и целей поездки.`;
  };

  const extractPriceInfo = (_content: string, country: string): string => {
    return `Бюджет поездки в ${country} зависит от уровня комфорта. Планируйте расходы на проживание, питание, транспорт и развлечения.`;
  };

  const extractAttractionInfo = (_content: string, country: string): string => {
    return `${country} богат достопримечательностями. Рекомендуем планировать маршрут заранее для максимального впечатления.`;
  };

  const extractSafetyInfo = (content: string, country: string): string => {
    if (content.includes('⚠️')) {
      return `При поездке в ${country} следует соблюдать меры предосторожности. Изучите актуальную информацию о безопасности.`;
    }
    return `${country} в целом безопасен для туристов. Соблюдайте стандартные меры предосторожности.`;
  };

  const extractTransportInfo = (content: string, country: string): string => {
    if (content.includes('автопутешествие')) {
      return `${country} подходит для автопутешествий. Можно арендовать автомобиль или использовать местный транспорт.`;
    }
    return `В ${country} доступны различные виды транспорта. Выбирайте наиболее удобный для ваших планов.`;
  };

  // Объединяем автогенерированные и кастомные FAQ
  const allFAQs = [...generateAutoFAQs(), ...customFAQs];

  const toggleQuestion = (index: number) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(index)) {
      newOpenQuestions.delete(index);
    } else {
      newOpenQuestions.add(index);
    }
    setOpenQuestions(newOpenQuestions);
  };

  if (allFAQs.length === 0) return null;

  return (
    <section id="faq" className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          ❓ Часто задаваемые вопросы
        </h2>
        <p className="text-gray-600">Ответы на популярные вопросы о путешествии в {countryName}</p>
      </div>

      <div className="space-y-4">
        {allFAQs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <section itemScope itemType="https://schema.org/Question" className="faq-question">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between group"
              >
                <span className="font-medium text-gray-900 pr-4" itemProp="name">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openQuestions.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-500 group-hover:text-gray-700 flex-shrink-0"
                >
                  ↓
                </motion.span>
              </button>

              <AnimatePresence>
                {openQuestions.has(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                        <p className="text-gray-700 leading-relaxed faq-answer" itemProp="text">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        ))}
      </div>

      {/* Дополнительная информация */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <span className="text-blue-500 mr-2 mt-0.5">ℹ️</span>
          <div className="text-sm text-blue-700">
            <p className="font-medium">Не нашли ответ на свой вопрос?</p>
            <p>
              Свяжитесь с нами через раздел контактов или изучите подробную информацию в
              соответствующих разделах путеводителя.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
