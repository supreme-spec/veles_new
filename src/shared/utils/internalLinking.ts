import { wikiPages } from '@/shared/data/wikiPages';

interface InternalLink {
  text: string;
  url: string;
  relevance: number;
  context: string;
}

// Словарь для поиска релевантных ссылок
const linkDictionary: Record<string, string[]> = {
  // Географические термины
  африка: ['egypt', 'cameroon', 'chad', 'algeria', 'botswana'],
  'северная африка': ['egypt', 'algeria'],
  'центральная африка': ['cameroon', 'chad'],
  'южная африка': ['botswana'],

  // Туристические термины
  пустыня: ['egypt', 'algeria', 'botswana'],
  сафари: ['botswana', 'cameroon'],
  пирамиды: ['egypt'],
  египет: ['egypt'],
  каир: ['egypt'],
  'красное море': ['egypt'],

  // Виза и документы
  виза: Object.keys(wikiPages),
  паспорт: Object.keys(wikiPages),
  документы: Object.keys(wikiPages),

  // Транспорт
  авиабилеты: Object.keys(wikiPages),
  перелет: Object.keys(wikiPages),
  аэропорт: Object.keys(wikiPages),

  // Проживание
  отель: Object.keys(wikiPages),
  жилье: Object.keys(wikiPages),
  гостиница: Object.keys(wikiPages),
};

// Функция для очистки HTML тегов из текста
const stripHtmlTags = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

// Функция для вычисления релевантности ссылки
const calculateRelevance = (
  sourceText: string,
  targetCountry: string,
  _keyword: string
): number => {
  const targetPage = wikiPages[targetCountry];
  if (!targetPage) return 0;

  let relevance = 0;

  // Базовая релевантность по ключевому слову
  relevance += 0.3;

  // Дополнительная релевантность по тегам
  const sourceTags = sourceText.toLowerCase();
  const targetTags = (targetPage.tags || []).map(tag => tag.toLowerCase());

  targetTags.forEach(tag => {
    if (sourceTags.includes(tag)) {
      relevance += 0.2;
    }
  });

  // Релевантность по географической близости (континент)
  if (targetTags.some(tag => ['африка', 'europe', 'asia'].includes(tag))) {
    relevance += 0.1;
  }

  return Math.min(relevance, 1.0);
};

// Функция для генерации безопасного описания страны
const generateSafeCountryDescription = (countryId: string): string => {
  const page = wikiPages[countryId];
  if (!page) return 'Интересное направление для путешествий';

  // Создаем безопасное описание на основе тегов и названия
  const tags = page.tags || [];
  const titlePart = page.title.split(':')[0];
  const countryName = (titlePart || page.title)
    .replace(
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
      ''
    )
    .trim();

  if (tags.includes('Европа')) {
    return countryName + ' - европейское направление с богатой историей и культурой';
  } else if (tags.includes('Азия')) {
    return countryName + ' - азиатская страна с уникальными традициями';
  } else if (tags.includes('Африка')) {
    return countryName + ' - африканское направление для путешествий';
  } else if (tags.includes('Америка')) {
    return countryName + ' - американское направление для туристов';
  } else {
    return countryName + ' - интересное место для посещения';
  }
};

// Основная функция для генерации внутренних ссылок
export const generateInternalLinks = (
  content: string,
  currentCountryId?: string
): InternalLink[] => {
  const links: InternalLink[] = [];
  const cleanContent = stripHtmlTags(content); // Очищенный от HTML контент для context
  const lowerCleanContent = cleanContent.toLowerCase();
  const processedLinks = new Set<string>();

  // Проходим по словарю ключевых слов
  Object.entries(linkDictionary).forEach(([keyword, countries]) => {
    const keywordIndex = lowerCleanContent.indexOf(keyword);

    if (keywordIndex !== -1 && !processedLinks.has(keyword)) {
      countries.forEach(countryId => {
        const countryData = wikiPages[countryId];
        if (countryId !== currentCountryId && countryData) {
          const relevance = calculateRelevance(content, countryId, keyword);

          if (relevance > 0.2) {
            // Минимальный порог релевантности
            // Вместо извлечения потенциально неточного контекста,
            // используем безопасное описание страницы
            const safeContext = generateSafeCountryDescription(countryId);

            links.push({
              text: countryData.title,
              url: `/wiki/${countryId}`,
              relevance,
              context: safeContext,
            });
          }
        }
      });

      processedLinks.add(keyword);
    }
  });

  // Сортируем по релевантности и берем топ-5
  return links.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
};

// Функция для автоматической замены текста ссылками
export const autoLinkContent = (content: string, currentCountryId?: string): string => {
  let processedContent = content.trim();

  // 1. Собираем все страны из базы для "умного линковки"
  const allCountries = Object.entries(wikiPages)
    .map(([id, page]) => {
      const titlePart = page.title.split(':')[0];
      if (!titlePart) return null;
      const name = titlePart
        .replace(
          /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
          ''
        )
        .trim();
      return { id, name };
    })
    .filter((item): item is { id: string; name: string } => item !== null && item.name.length > 0);

  // 2. Сортируем по длине названия (чтобы сначала заменять более длинные фразы)
  allCountries.sort((a, b) => {
    const aLen = a.name?.length ?? 0;
    const bLen = b.name?.length ?? 0;
    return bLen - aLen;
  });

  const replacedCountries = new Set<string>();

  allCountries.forEach(({ id, name }) => {
    if (id !== currentCountryId && name && name.length > 3 && !replacedCountries.has(id)) {
      // Ищем все вхождения названия страны в тексте, если оно не внутри другого тега
      // Сложная регулярка для поиска вне HTML тегов
      const regex = new RegExp(`(?<!<[^>]*>)(${name})`, 'ig'); // Added 'g' flag for global search

      // Only replace if there's at least one match
      if (processedContent.match(regex)) {
        processedContent = processedContent.replace(
          regex,
          `<a href="/wiki/${id}" class="text-blue-600 hover:text-blue-800 underline font-medium" title="Путеводитель по ${name}">$1</a>` // Use $1 to refer to the captured group (the country name)
        );
        replacedCountries.add(id);
      }
    }
  });

  // 3. Добавляем ссылки из основного словаря терминов
  const internalLinks = generateInternalLinks(processedContent, currentCountryId);
  const replacedKeywords = new Set<string>();

  Object.entries(linkDictionary).forEach(([keyword, countries]) => {
    if (!replacedKeywords.has(keyword)) {
      const relevantCountry = countries.find(
        cid => cid !== currentCountryId && internalLinks.some(link => link.url.includes(cid))
      );

      if (relevantCountry && wikiPages[relevantCountry]) {
        const regex = new RegExp(`(?<!<[^>]*)(${keyword})`, 'i');
        const match = processedContent.match(regex);

        if (match) {
          processedContent = processedContent.replace(
            regex,
            `<a href="/wiki/${relevantCountry}" class="text-indigo-600 hover:text-indigo-800 underline" title="Все о ${keyword}">${match[0]}</a>`
          );
          replacedKeywords.add(keyword);
        }
      }
    }
  });

  return processedContent;
};

// Функция для генерации связанного контента
export const generateRelatedContent = (
  countryId: string
): {
  title: string;
  description: string;
  links: InternalLink[];
} => {
  const page = wikiPages[countryId];
  if (!page) {
    return {
      title: 'Связанный контент',
      description: 'Контент не найден',
      links: [],
    };
  }

  const allContent = `${page.content} ${(page.tags || []).join(' ')}`;
  const links = generateInternalLinks(allContent, countryId);

  return {
    title: 'Похожие направления',
    description: `Другие интересные страны и направления, которые могут вас заинтересовать`,
    links: links.slice(0, 3), // Показываем только топ-3
  };
};
