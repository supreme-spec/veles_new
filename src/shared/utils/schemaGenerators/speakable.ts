export function generateSpeakableSchema(url: string, title: string, selectors?: string[]): { '@context': string; '@type': string; url: string; name: string; speakable: { '@type': string; cssSelector: string[] } } {
  const defaultSelectors = [
    'h1',
    'h2',
    '.speakable-summary',
    '.voice-answer',
    '.faq-answer',
    '[data-voice="true"]',
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: selectors || defaultSelectors,
    },
  };
}

