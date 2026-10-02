export const CACHE_TTL = {
  SEARCH_RESULTS: 15 * 60,
  HOTELPAGE_RATES: 5 * 60,
  SUGGESTIONS: 60 * 60,
  HOTEL_DETAIL: 30 * 60,
  POPULAR_HOTELS: 2 * 60 * 60,
};

export function getCacheKey(type: string, params: Record<string, any>): string {
  const normalized = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      const value = params[key];
      acc[key] = value === undefined || value === null ? '' : value;
      return acc;
    }, {} as Record<string, any>);

  const hash = `${type}:${JSON.stringify(normalized)}`;
  return `cache:${Buffer.from(hash).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 64)}`;
}
