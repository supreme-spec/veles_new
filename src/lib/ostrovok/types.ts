export interface GuestParams {
  adults: number;
  children?: number[];
}

export interface SearchParams {
  checkin: string;
  checkout: string;
  guests: GuestParams[];
  residency?: string;
  timeout?: number;
}

export interface SearchByRegionParams extends SearchParams {
  regionId: number;
}

export interface SearchByGeoParams extends SearchParams {
  lat: number;
  lon: number;
  radius: number;
}

export interface SearchByHotelIdsParams extends SearchParams {
  hotelIds: number[];
}

export interface HotelpageParams extends SearchParams {
  hid: number;
}

export interface PrebookParams {
  bookHash: string;
  priceIncreasePercent?: number;
}

export interface RoomGuest {
  firstName: string;
  lastName: string;
  age?: number;
  isChild?: boolean;
}

export interface Room {
  guests: RoomGuest[];
}

export interface CreateBookingParams {
  bookHash: string;
  partnerOrderId: string;
  language?: string;
  rooms: Room[];
  user: {
    email: string;
    phone?: string;
    comment?: string;
  };
  partner: {
    partnerOrderId: string;
    comment?: string;
    amountSellB2b2c?: string;
  };
}

export interface StartBookingParams {
  partnerOrderId: string;
  payUuid: string;
  initUuid: string;
  returnPath: string;
  user: {
    email: string;
    phone?: string;
    comment?: string;
  };
  partner: {
    partnerOrderId: string;
    comment?: string;
  };
  language?: string;
  rooms: Room[];
  paymentType: {
    type: 'now';
    amount: string;
    currencyCode: string;
    payUuid: string;
    initUuid: string;
  };
}

export interface CreditCardTokenParams {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  payUuid: string;
  initUuid: string;
}

export interface OstrovokApiResponse<T = any> {
  status: string;
  error?: string;
  message?: string;
  result?: T;
}

export interface HotelSearchResult {
  hid: number;
  id: string;
  name: string;
  stars?: number;
  address: string;
  latitude: number;
  longitude: number;
  rates: Rate[];
}

export interface Rate {
  match_hash: string;
  search_hash?: string;
  book_hash?: string;
  daily_prices: string[];
  meal: string;
  meal_data: {
    value: string;
    has_breakfast: boolean;
    no_child_meal?: boolean;
  };
  payment_options: {
    payment_types: PaymentType[];
  };
  cancellation_penalties: {
    policies: CancellationPolicy[];
    free_cancellation_before: string | null;
  };
}

export interface PaymentType {
  amount: string;
  show_amount: string;
  currency_code: string;
  show_currency_code: string;
  by: string | null;
  is_need_credit_card_data: boolean;
  is_need_cvc: boolean;
  type: 'now' | 'hotel' | 'deposit';
  vat_data?: any;
  tax_data?: {
    taxes: Tax[];
  };
}

export interface Tax {
  name: string;
  included_by_supplier: boolean;
  amount: string;
  currency_code: string;
}

export interface CancellationPolicy {
  start_at: string | null;
  end_at: string | null;
  amount_charge: string;
  amount_show: string;
  commission_info?: any;
}

export interface PrebookResult {
  book_hash: string;
  price_changed: boolean;
  new_price?: string;
  old_price?: string;
}

export interface CreateBookingResult {
  partner_order_id: string;
  status: 'ok' | 'processing';
}

export interface CheckBookingResult {
  partner_order_id: string;
  status: 'ok' | 'processing' | 'failed';
  ostrovok_order_id?: string;
  error?: string;
}

export interface DumpResponse {
  url: string;
  last_update: string;
}
