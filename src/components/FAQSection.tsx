import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
  schemaId?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = 'Часто задаваемые вопросы',
  className = '',
  schemaId,
}) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = schemaId ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': schemaId,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <section className={`py-12 md:py-16 bg-gray-50 dark:bg-gray-800 ${className}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {title}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none px-5 py-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <span>{faq.question}</span>
                  <span className="ml-4 text-blue-600 dark:text-blue-400 text-xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed faq-answer">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
