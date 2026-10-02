export function generateWeb3Schema(name: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: `${name}: Децентрализованный путеводитель Web3`,
    keywords: 'Web3 путешествия, NFT туризм, криптопутешествия, децентрализованный путеводитель',
  };
}

