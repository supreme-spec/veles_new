export interface TourSearchParams {
  departureTownCID: string;
  tourCID: string;
  dateFrom: string;
  dateTo: string;
  adults: number;
  children: number;
}

export interface TourResult {
  id: string;
  providerId: string;
  hotelName: string;
  roomCategory: string;
  nights: number;
  price: number;
  currency: string;
  rawBookingData: any;
}

export interface DictionaryData {
  departureCities: { cid: string; name: string }[];
  destinations: { cid: string; name: string }[];
}

export interface TourProvider {
  id: string;
  name: string;
  isActive: boolean;
  getDictionaries(): Promise<DictionaryData>;
  searchTours(params: TourSearchParams): Promise<TourResult[]>;
}
