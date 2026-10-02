// Функция для преобразования wiki-разметки в HTML
export function parseWikiMarkup(wikiText: string): string {
  let html = wikiText;

  // Заголовки
  html = html.replace(/={6}(.*?)={6}/g, '<h6>$1</h6>');
  html = html.replace(/={5}(.*?)={5}/g, '<h5>$1</h5>');
  html = html.replace(/={4}(.*?)={4}/g, '<h4>$1</h4>');
  html = html.replace(/={3}(.*?)={3}/g, '<h3>$1</h3>');
  html = html.replace(/={2}(.*?)={2}/g, '<h2>$1</h2>');

  // Жирный шрифт
  html = html.replace(/'''(.*?)'''/g, '<strong>$1</strong>');

  // Курсив
  html = html.replace(/''(.*?)''/g, '<em>$1</em>');

  // Внешние ссылки
  html = html.replace(/\[(\S+)\s+(.*?)\]/g, '<a href="$1" target="_blank" rel="noopener">$2</a>');

  // Внутренние ссылки
  html = html.replace(/\[\[([\w\s]+)\]\]/g, '<a href="/wiki/$1">$1</a>');
  html = html.replace(/\[\[([\w\s]+)\|(.*?)\]\]/g, '<a href="/wiki/$1">$2</a>');

  // Списки
  const lines = html.split('\n');
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    if (!currentLine) continue;

    if (currentLine.startsWith('* ')) {
      if (!inList || listType !== 'ul') {
        lines[i] =
          (inList ? '</' + listType + '>' : '') + '<ul><li>' + currentLine.substring(2) + '</li>';
        inList = true;
        listType = 'ul';
      } else {
        lines[i] = '<li>' + currentLine.substring(2) + '</li>';
      }
    } else if (currentLine.startsWith('# ')) {
      if (!inList || listType !== 'ol') {
        lines[i] =
          (inList ? '</' + listType + '>' : '') + '<ol><li>' + currentLine.substring(2) + '</li>';
        inList = true;
        listType = 'ol';
      } else {
        lines[i] = '<li>' + currentLine.substring(2) + '</li>';
      }
    } else if (inList) {
      lines[i] = '</' + listType + '>' + currentLine;
      inList = false;
    }
  }

  if (inList) {
    lines.push('</' + listType + '>');
  }

  // Параграфы
  html = lines.join('\n');
  html = html.replace(/\n\n+/g, '</p><p>');
  html = '<p>' + html + '</p>';

  return html;
}

// Функция для экранирования HTML-тегов в тексте
export function escapeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Функция для создания slug из заголовка
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\wа-яё\s]/g, '') // оставляем только буквы, цифры и пробелы
    .replace(/\s+/g, '-'); // заменяем пробелы на дефисы
}

// Функция для выделения ключевых слов в тексте для результатов поиска
export function highlightSearchTerms(text: string, searchTerm: string): string {
  if (!searchTerm) return text;

  const escapedTerm = escapeHTML(searchTerm).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedTerm})`, 'gi');

  return text.replace(regex, '<mark>$1</mark>');
}
