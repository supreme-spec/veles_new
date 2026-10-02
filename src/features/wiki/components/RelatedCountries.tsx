import React from 'react';
import Link from 'next/link';
import { getRelatedCountries, getReasonIcon, getReasonText } from '@/shared/utils/countryRelations';
import type { RelatedCountry } from '@/shared/utils/countryRelations';

interface RelatedCountriesProps {
  countryId: string;
  limit?: number;
  className?: string;
}

export const RelatedCountries: React.FC<RelatedCountriesProps> = ({
  countryId,
  limit = 6,
  className = '',
}) => {
  const relatedCountries = getRelatedCountries(countryId, limit);

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

  if (relatedCountries.length === 0) {
    return null;
  }

  return (
    <section className={`mt-8 ${className}`}>
      <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          🌍 Похожие направления
          <span className="text-sm font-normal text-gray-600">
            ({relatedCountries.length} стран)
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedCountries.map((country: RelatedCountry) => (
            <Link
              key={country.id}
              href={`/wiki/${country.id}`}
              className="group block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200"
            >
              <div className="flex flex-col h-full">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                  {cleanTitle(country.title)}
                </h4>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="text-base">{getReasonIcon(country.reason)}</span>
                    {getReasonText(country.reason)}
                  </span>

                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                    <span className="text-xs text-gray-400">
                      {Math.round(country.relevanceScore)}%
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/wiki/countries"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Все страны мира
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedCountries;
