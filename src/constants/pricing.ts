export const TOUR_PRICES_2026 = {
  egypt: {
    minPrice: 90000,
    currency: 'RUB',
    duration: '7 ночей',
    description: 'на двоих, всё включено',
    visaOnArrival: '$25',
  },
  turkey: {
    minPrice: 90000,
    currency: 'RUB',
    duration: '7 ночей',
    description: 'на двоих, всё включено',
    visaRequired: false,
  },
  uae: {
    minPrice: 120000,
    currency: 'RUB',
    duration: '5-7 ночей',
    description: 'на двоих, всё включено',
    visaRequired: false,
  },
  thailand: {
    minPrice: 65000,
    currency: 'RUB',
    duration: '7 ночей',
    description: 'на двоих, всё включено',
    visaRequired: false,
  },
  maldives: {
    minPrice: 140000,
    currency: 'RUB',
    duration: '7 ночей',
    description: 'на двоих, всё включено',
    visaRequired: false,
  },
} as const;

export type CountryCode = keyof typeof TOUR_PRICES_2026;
