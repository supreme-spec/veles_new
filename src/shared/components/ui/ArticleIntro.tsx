import React from 'react';

interface ArticleIntroProps {
  question: string;
  briefAnswer: string;
  detailedAnswer?: React.ReactNode;
  className?: string;
}

export function ArticleIntro({ question, briefAnswer, detailedAnswer, className = '' }: ArticleIntroProps) {
  return (
    <section className={`mb-10 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg ${className}`}>
      <h2 className="text-2xl font-extrabold mb-4 text-gray-900 dark:text-white flex items-center gap-2 !mt-0">
        <span className="text-blue-600">❓</span> {question}
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Краткий ответ</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{briefAnswer}</p>
        </div>
        
        {detailedAnswer && (
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Подробное раскрытие темы</p>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{detailedAnswer}</div>
          </div>
        )}
      </div>
    </section>
  );
}
