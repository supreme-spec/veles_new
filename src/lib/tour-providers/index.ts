import type { TourProvider, TourSearchParams, TourResult, DictionaryData } from './types';
import { aleanProvider } from './alean';

const providers: TourProvider[] = [aleanProvider];

export async function getDictionaries(): Promise<DictionaryData> {
  const activeProviders = providers.filter((p) => p.isActive);
  if (activeProviders.length === 0) {
    return {
      departureCities: [{ cid: 'moskva', name: 'Москва' }],
      destinations: [{ cid: 'anapa_test_turpaket', name: 'Анапа' }],
    };
  }
  return await activeProviders[0]!.getDictionaries();
}

export async function searchTours(params: TourSearchParams): Promise<TourResult[]> {
  const activeProviders = providers.filter((p) => p.isActive);

  const promises = activeProviders.map(async (provider) => {
    try {
      return await provider.searchTours(params);
    } catch (error) {
      console.error(`Ошибка провайдера ${provider.name}:`, error);
      return [];
    }
  });

  const resultsArray = await Promise.all(promises);

  return resultsArray.flat().sort((a, b) => a.price - b.price);
}

export { providers };
