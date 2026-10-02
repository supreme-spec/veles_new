import { wikiPages } from '@/shared/data/wikiPages';

export interface RelatedCountry {
  id: string;
  title: string;
  relevanceScore: number;
  reason: 'continent' | 'tourism' | 'culture' | 'geography';
}

// Получить связанные страны для текущей страны
export const getRelatedCountries = (countryId: string, limit: number = 6): RelatedCountry[] => {
  const currentCountry = wikiPages[countryId];
  if (!currentCountry) return [];

  const relatedCountries: RelatedCountry[] = [];

  Object.entries(wikiPages).forEach(([id, page]) => {
    // Проверяем, что страница существует
    if (!page || id === countryId) return; // Исключаем саму страну

    let relevanceScore = 0;
    let reason: RelatedCountry['reason'] = 'geography';

    // Анализ тегов для определения связанности
    const currentTags = currentCountry.tags || [];
    const pageTags = page.tags || [];

    // Связь по континенту (высокий приоритет)
    const continents = ['Европа', 'Азия', 'Африка', 'Америка', 'Океания'];
    const currentContinent = currentTags.find(tag => continents.includes(tag));
    const pageContinent = pageTags.find(tag => continents.includes(tag));

    if (currentContinent && pageContinent && currentContinent === pageContinent) {
      relevanceScore += 30;
      reason = 'continent';
    }

    // Связь по типу туризма
    const tourismTypes = ['пляжи', 'сафари', 'культура', 'история', 'горы', 'экотуризм', 'дайвинг'];
    const commonTourismTypes = currentTags.filter(
      tag => tourismTypes.includes(tag) && pageTags.includes(tag)
    );
    if (commonTourismTypes.length > 0) {
      relevanceScore += commonTourismTypes.length * 15;
      reason = 'tourism';
    }

    // Связь по безвизовому режиму
    if (currentTags.includes('без визы') && pageTags.includes('без визы')) {
      relevanceScore += 10;
    }
    if (currentTags.includes('виза по прибытии') && pageTags.includes('виза по прибытии')) {
      relevanceScore += 10;
    }

    // Связь по культуре/религии
    const culturalTags = [
      'ислам',
      'христианство',
      'буддизм',
      'европейская культура',
      'арабская культура',
    ];
    const commonCultural = currentTags.filter(
      tag => culturalTags.includes(tag) && pageTags.includes(tag)
    );
    if (commonCultural.length > 0) {
      relevanceScore += commonCultural.length * 12;
      reason = 'culture';
    }

    // Географическая близость (соседние страны)
    const currentTitle = currentCountry.title.toLowerCase();
    const pageTitle = page.title.toLowerCase();

    // Проверка упоминания в контенте друг друга
    const pageTitlePart = pageTitle.split('—')[0]?.trim();
    const currentTitlePart = currentTitle.split('—')[0]?.trim();
    if (
      (pageTitlePart && currentCountry.content?.toLowerCase().includes(pageTitlePart)) ||
      (currentTitlePart && page.content?.toLowerCase().includes(currentTitlePart))
    ) {
      relevanceScore += 20;
      reason = 'geography';
    }

    if (relevanceScore > 0) {
      relatedCountries.push({
        id,
        title: page.title,
        relevanceScore,
        reason,
      });
    }
  });

  // Сортируем по релевантности и возвращаем топ
  return relatedCountries.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
};

// Получить причину связанности на русском
export const getReasonText = (reason: RelatedCountry['reason']): string => {
  const reasons = {
    continent: 'Тот же континент',
    tourism: 'Похожий туризм',
    culture: 'Общая культура',
    geography: 'Географическая близость',
  };
  return reasons[reason];
};

// Получить иконку для причины связанности
export const getReasonIcon = (reason: RelatedCountry['reason']): string => {
  const icons = {
    continent: '🌍',
    tourism: '🎯',
    culture: '🎭',
    geography: '🗺️',
  };
  return icons[reason];
};

// Генерация HTML для связанных стран (для вставки в контент)
export const generateRelatedCountriesHTML = (countryId: string): string => {
  const relatedCountries = getRelatedCountries(countryId, 4);

  if (relatedCountries.length === 0) return '';

  return `
    <div class="related-countries-section mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
      <h3 class="text-xl font-semibold mb-4 text-gray-800">🌍 Похожие направления:</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${relatedCountries
          .map(
            country => `
          <a href="/wiki/${country.id}" class="group block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                ${(country.title.split('—')[0] || country.title).trim()}
              </h4>
              <span class="text-sm text-gray-500 flex items-center gap-1">
                ${getReasonIcon(country.reason)}
                ${getReasonText(country.reason)}
              </span>
            </div>
          </a>
        `
          )
          .join('')}
      </div>
    </div>
  `;
};
