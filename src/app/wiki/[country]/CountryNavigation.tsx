'use client';

import { useState, useEffect } from 'react';

interface Section {
  id: string;
  title: string;
  anchor: string;
}

interface CountryNavigationProps {
  countryId: string;
  currentSection?: string;
}

export const CountryNavigation = ({
  countryId: _countryId,
  currentSection: _currentSection,
}: CountryNavigationProps) => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%' }
    );

    const headings = document.querySelectorAll('h2[id]');
    headings.forEach(heading => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  // Expanded navigation structure for detailed guide sections
  const expandedSectionGroups: Record<string, Section[]> = {
    Основное: [
      { id: 'overview', title: '🏠 Обзор страны', anchor: 'overview' },
      { id: 'geography', title: '🌍 География', anchor: 'geography' },
      { id: 'culture', title: '🏛️ История и культура', anchor: 'culture' },
      { id: 'seasons', title: '📅 Сезоны', anchor: 'seasons' },
    ],
    'Планирование поездки': [
      { id: 'visa', title: '🎫 Визы и документы', anchor: 'visa' },
      { id: 'transport', title: '✈️ Как добраться', anchor: 'transport' },
      { id: 'accommodation', title: '🏨 Проживание', anchor: 'accommodation' },
      { id: 'budget', title: '💰 Бюджет', anchor: 'budget' },
    ],
    'На месте': [
      { id: 'attractions', title: '🏛️ Достопримечательности', anchor: 'attractions' },
      { id: 'beaches', title: '🌊 Пляжи', anchor: 'beaches' },
      { id: 'prices', title: '💰 Цены', anchor: 'prices' },
      { id: 'activities', title: '🏃 Активный отдых', anchor: 'activities' },
      { id: 'safety', title: '⚠️ Безопасность', anchor: 'safety' },
    ],
    Полезное: [
      { id: 'tips', title: '💡 Полезные советы', anchor: 'tips' },
      { id: 'faq', title: '❓ FAQ', anchor: 'faq' },
      { id: 'maps', title: '🗺️ Интерактивные карты', anchor: 'maps' },
    ],
  };

  return (
    <nav className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        📖 Разделы путеводителя
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(expandedSectionGroups).map(([groupName, sections]) => (
          <div key={groupName} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              {groupName}
            </h4>
            <div className="space-y-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.anchor);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${
                      activeSection === section.anchor
                        ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                        : 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800'
                    }
                  `}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
