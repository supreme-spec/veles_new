export function generateAltSearchSchema(name: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${name}: Альтернативная поисковая база`,
    description: 'Данные для поиска в DuckDuckGo, Startpage, Searx, Brave Search, Ecosia',
    keywords: 'DuckDuckGo, Startpage, Searx, Brave Search, Ecosia',
  };
}

