export function generateDarkWebSchema(name: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${name}: Анонимный путеводитель`,
    keywords: 'анонимный туризм, приватные путешествия, Tor туризм, Dark Web',
  };
}

