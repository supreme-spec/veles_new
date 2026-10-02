export const formatWalletAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const isValidTonAddress = (address: string): boolean => {
  // Простая проверка TON адреса
  return address.length === 48 && address.startsWith('EQ');
};

export const formatPrice = (price: number, currency = 'TON'): string => {
  return `${price.toLocaleString()} ${currency}`;
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
