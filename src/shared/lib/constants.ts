export const STORAGE_KEYS = {
  SECRET_MODE: 'velesVoyageSecretMode',
  USER_DATA: 'user',
  THEME: 'theme'
} as const;

export const ROUTES = {
  HOME: '/',
  TOURS: '/tours',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms'
} as const;

export const WALLET_TYPES = {
  TELEGRAM: 'telegram-wallet',
  TON_CONNECT: 'ton-connect'
} as const;
