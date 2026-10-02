'use client';

import Link from 'next/link';
import { generateRelatedContent } from '@/shared/utils/internalLinking';

interface RelatedContentProps {
  countryId: string;
  className?: string;
}

export const RelatedContent: React.FC<RelatedContentProps> = ({ countryId, className = '' }) => {
  const relatedContent = generateRelatedContent(countryId);

  // Function to clean titles from emojis
  const cleanTitle = (title: string): string => {
    let cleanedTitle = title;

    // Split by colon first (for titles like "🏖️ Абхазия: полный гид...")
    if (cleanedTitle.includes(':')) {
      cleanedTitle = cleanedTitle.split(':')[0] || cleanedTitle;
    }
    // Then try em dash (for titles like "Country — description")
    else if (cleanedTitle.includes('—')) {
      cleanedTitle = cleanedTitle.split('—')[0] || cleanedTitle;
    }

    // Extract text with Cyrillic or Latin letters (removes emojis)
    const match = cleanedTitle.match(/([А-яA-Za-z][А-яA-Za-z\s]*)/);
    if (match && match[1]) {
      cleanedTitle = match[1].trim();
    }

    return cleanedTitle || title.split(' ')[1] || title; // fallback to second word or full title
  };

  // Function to clean text from emojis (for context/descriptions)
  const cleanTextFromEmojis = (text: string): string => {
    // Remove emojis using Unicode ranges
    return text
      .replace(
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
        ''
      )
      .trim();
  };

  if (relatedContent.links.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 ${className}`}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedContent.title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{relatedContent.description}</p>

      <div className="space-y-3">
        {relatedContent.links.map((link, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <Link href={link.url} className="block group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {cleanTitle(link.text)}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {cleanTextFromEmojis(link.context)}
                  </p>
                </div>

                <div className="ml-4 flex items-center space-x-2">
                  {/* Индикатор релевантности */}
                  <div className="flex space-x-1">
                    {[1, 2, 3].map(star => (
                      <div
                        key={star}
                        className={`w-2 h-2 rounded-full ${
                          star <= Math.ceil(link.relevance * 3) ? 'bg-yellow-400' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Стрелка */}
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Дополнительная информация */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-blue-600">
          Рекомендации основаны на анализе контента и предпочтений путешественников
        </p>
      </div>
    </div>
  );
};
