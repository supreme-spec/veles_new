import type { WikiPage } from '@/features/wiki/types';

// Функция для получения связанных стран по тегам и региону
export const getRelatedCountries = (
  currentCountryId: string,
  currentCountry: WikiPage,
  allCountries: Record<string, WikiPage>,
  maxResults: number = 5
): WikiPage[] => {
  if (!currentCountry.tags) return [];

  const relatedCountries: { country: WikiPage; score: number }[] = [];

  Object.values(allCountries).forEach(country => {
    if (country.id === currentCountryId || !country.tags) return;

    let score = 0;

    // Подсчет совпадающих тегов
    const commonTags = currentCountry.tags!.filter(tag =>
      country.tags!.some(countryTag => countryTag.toLowerCase() === tag.toLowerCase())
    );
    score += commonTags.length * 10;

    // Бонус за соседние страны (по континентам)
    const currentRegionTags = [
      'Европа',
      'Азия',
      'Африка',
      'Северная Америка',
      'Южная Америка',
      'Океания',
    ];
    const currentContinent = currentCountry.tags!.find(tag => currentRegionTags.includes(tag));
    const countryContinent = country.tags!.find(tag => currentRegionTags.includes(tag));

    if (currentContinent && countryContinent && currentContinent === countryContinent) {
      score += 5;
    }

    // Бонус за похожие характеристики
    const similarityTags = ['безвиз', 'UNESCO', 'море', 'горы', 'острова', 'пустыня'];
    similarityTags.forEach(tag => {
      if (
        currentCountry.tags!.some(t => t.toLowerCase().includes(tag.toLowerCase())) &&
        country.tags!.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      ) {
        score += 3;
      }
    });

    if (score > 0) {
      relatedCountries.push({ country, score });
    }
  });

  // Сортируем по релевантности и возвращаем топ результатов
  return relatedCountries
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.country);
};

// Утилита для создания HTML ссылок на связанные страны
export const generateRelatedLinksHTML = (
  currentCountryId: string,
  currentCountry: WikiPage,
  allCountries: Record<string, WikiPage>
): string => {
  const relatedCountries = getRelatedCountries(currentCountryId, currentCountry, allCountries);

  if (relatedCountries.length === 0) return '';

  const linksHTML = relatedCountries
    .map(
      country =>
        `<a href="/wiki/${country.id}">${(country.title.split('—')[0] || country.title).trim()}</a>`
    )
    .join(' | ');

  const staticLinks = [
    '<a href="/wiki/countries">Все страны мира</a>',
    '<a href="/wiki/travel-tips">Советы путешественникам</a>',
  ].join(' | ');

  return `<p><strong>Связанные статьи:</strong> ${linksHTML} | ${staticLinks}</p>`;
};
