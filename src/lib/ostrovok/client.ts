import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const OSTROVOK_BASE_URL = 'https://api.ostrovok.ru/api';

const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(toSnakeCase);
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      acc[snakeKey] = toSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};

export interface OstrovokConfig {
  apiKey: string;
  dKey: string;
  isTest?: boolean;
}

export class OstrovokClient {
  private client: ReturnType<typeof axios.create>;
  private config: OstrovokConfig;

  constructor(config?: Partial<OstrovokConfig>) {
    this.config = {
      apiKey: config?.apiKey || process.env.OSTROVOK_API_KEY || '',
      dKey: config?.dKey || process.env.OSTROVOK_D_KEY || '',
      isTest: config?.isTest ?? process.env.OSTROVOK_IS_TEST === 'true',
    };

    if (!this.config.apiKey || !this.config.dKey) {
      console.warn('[OSTROVOK] Missing API credentials in .env.local');
    }

    this.client = axios.create({
      baseURL: OSTROVOK_BASE_URL,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'VelesVoyage/1.0 (+https://veles-voyage.ru)',
        'Authorization': `Basic ${Buffer.from(`${this.config.dKey}:${this.config.apiKey}`).toString('base64')}`,
      },
    });

    this.client.interceptors.request.use((config) => {
      if (config.data) {
        config.data = toSnakeCase(config.data);
      }
      return config;
    });
  }

  async testConnection() {
    try {
      const response = await this.client.post('/b2b/v3/hotel/info/', {
        hid: 8526976,
        language: 'ru',
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        status: error.response?.status,
      };
    }
  }

  async getHotelDump() {
    const response = await this.client.post('/b2b/v3/hotel/info/dump/', {
      language: 'ru',
    });
    return response.data;
  }

  async getIncrementalDump() {
    const response = await this.client.post('/b2b/v3/hotel/info/incremental_dump/', {
      language: 'ru',
    });
    return response.data;
  }

  async getRegionsDump() {
    const response = await this.client.post('/b2b/v3/hotel/region/dump/', {
      language: 'ru',
    });
    return response.data;
  }

  async getHotelContent(hid: number, timeout?: number) {
    const response = await this.client.post('/b2b/v3/hotel/info/', {
      hid,
      language: 'ru',
    }, timeout ? { timeout: timeout * 1000 } : undefined);
    return response.data;
  }

  async searchByRegion(params: {
    regionId: number;
    checkin: string;
    checkout: string;
    guests: Array<{ adults: number; children?: number[] }>;
    residency?: string;
    timeout?: number;
  }) {
    const response = await this.client.post('/b2b/v3/search/serp/region/', {
      ...params,
      language: 'ru',
    }, params.timeout ? { timeout: params.timeout * 1000 } : undefined);
    return response.data;
  }

  async searchByGeo(params: {
    lat: number;
    lon: number;
    radius: number;
    checkin: string;
    checkout: string;
    guests: Array<{ adults: number; children?: number[] }>;
    residency?: string;
    timeout?: number;
  }) {
    const response = await this.client.post('/b2b/v3/search/serp/geo/', {
      latitude: params.lat,
      longitude: params.lon,
      radius: params.radius,
      checkin: params.checkin,
      checkout: params.checkout,
      guests: params.guests,
      residency: params.residency,
      language: 'ru',
    }, params.timeout ? { timeout: params.timeout * 1000 } : undefined);
    return response.data;
  }

  async searchByHotelIds(params: {
    hotelIds: string[];
    checkin: string;
    checkout: string;
    guests: Array<{ adults: number; children?: number[] }>;
    residency?: string;
    timeout?: number;
  }) {
    const response = await this.client.post('/b2b/v3/search/serp/hotels/', {
      hids: params.hotelIds.map(id => Number(id)),
      checkin: params.checkin,
      checkout: params.checkout,
      guests: params.guests,
      residency: params.residency,
      language: 'ru',
    }, params.timeout ? { timeout: params.timeout * 1000 } : undefined);
    return response.data;
  }

  async getHotelpage(params: {
    hid: number;
    checkin: string;
    checkout: string;
    guests: Array<{ adults: number; children?: number[] }>;
    residency?: string;
    timeout?: number;
  }) {
    const response = await this.client.post('/b2b/v3/search/hp/', {
      ...params,
      language: 'ru',
    }, params.timeout ? { timeout: Math.min(100_000, Math.max(30_000, params.timeout * 1000)) } : undefined);
    return response.data;
  }

  async getRateInfo(params: { matchHash: string; searchHash?: string }) {
    const response = await this.client.post('/b2b/v3/hotel/rate/info/', {
      ...params,
      language: 'ru',
    });
    return response.data;
  }

  async prebook(params: { bookHash: string; priceIncreasePercent?: number; timeout?: number }) {
    const response = await this.client.post('/b2b/v3/hotel/prebook', {
      hash: params.bookHash,
      price_increase_percent: params.priceIncreasePercent ?? 0,
    }, params.timeout ? { timeout: Math.min(60_000, Math.max(30_000, params.timeout * 1000)) } : undefined);
    return response.data;
  }

  async prebookFromSearch(params: { searchHash: string; priceIncreasePercent?: number; timeout?: number }) {
    const response = await this.client.post('/b2b/v3/serp/prebook/', {
      hash: params.searchHash,
      price_increase_percent: params.priceIncreasePercent ?? 0,
    }, params.timeout ? { timeout: Math.min(60_000, Math.max(30_000, params.timeout * 1000)) } : undefined);
    return response.data;
  }

  async createBookingProcess(params: {
    partnerOrderId: string;
    bookHash: string;
    language?: string;
    userIp?: string;
  }) {
    const payload: any = {
      partner_order_id: params.partnerOrderId,
      book_hash: params.bookHash,
      language: params.language || 'ru',
    };
    if (params.userIp) payload.user_ip = params.userIp;

    const response = await this.client.post('/b2b/v3/hotel/order/booking/form/', payload);
    return response.data;
  }

  async startBookingProcess(params: {
    partner: {
      partnerOrderId: string;
      comment?: string | undefined;
      amountSellB2b2c?: string | undefined;
    };
    language?: string | undefined;
    rooms: Array<{
      guests: Array<{
        firstName: string;
        lastName: string;
        isChild?: boolean | undefined;
        age?: number | undefined;
        gender?: 'male' | 'female' | 'unknown' | undefined;
      }>;
    }>;
    user: {
      email: string;
      phone: string;
      comment?: string | undefined;
    };
    paymentType: {
      type: 'now' | 'hotel' | 'deposit';
      amount?: string | undefined;
      currencyCode?: string | undefined;
      initUuid?: string | undefined;
      payUuid?: string | undefined;
    };
    supplierData: {
      firstNameOriginal: string;
      lastNameOriginal: string;
      email: string;
      phone: string;
    };
    returnPath?: string | undefined;
    upsellData?: Array<{
      name: string;
      uid: string;
      ruleId?: number | undefined;
      attributes?: string | undefined;
      checkinDatetime?: string | undefined;
      checkoutDatetime?: string | undefined;
    }> | undefined;
    arrivalDatetime?: string | undefined;
  }) {
    const payload: any = {
      partner: {
        partner_order_id: params.partner.partnerOrderId,
        comment: params.partner.comment,
        amount_sell_b2b2c: params.partner.amountSellB2b2c,
      },
      language: params.language || 'ru',
      rooms: params.rooms.map((room) => ({
        guests: room.guests.map((guest) => ({
          first_name: guest.firstName,
          last_name: guest.lastName,
          is_child: guest.isChild || false,
          ...(guest.isChild && guest.age !== undefined && { age: guest.age }),
          gender: guest.gender || 'unknown',
        })),
      })),
      user: params.user,
      payment_type: (() => {
        const pt: any = { type: params.paymentType.type };
        if (params.paymentType.amount) pt.amount = params.paymentType.amount;
        if (params.paymentType.currencyCode) pt.currency_code = params.paymentType.currencyCode;
        if (params.paymentType.initUuid) pt.init_uuid = params.paymentType.initUuid;
        if (params.paymentType.payUuid) pt.pay_uuid = params.paymentType.payUuid;
        return pt;
      })(),
      supplier_data: params.supplierData ? {
        first_name_original: params.supplierData.firstNameOriginal,
        last_name_original: params.supplierData.lastNameOriginal,
        email: params.supplierData.email,
        phone: params.supplierData.phone,
      } : undefined,
      return_path: params.returnPath,
      upsell_data: params.upsellData,
      arrival_datetime: params.arrivalDatetime,
    };

    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined)
    );

    const cleanPartner = Object.fromEntries(
      Object.entries(cleanPayload.partner || {}).filter(([, v]) => v !== undefined)
    );
    (cleanPayload as any).partner = cleanPartner;

    const cleanUser = Object.fromEntries(
      Object.entries(cleanPayload.user || {}).filter(([, v]) => v !== undefined)
    );
    (cleanPayload as any).user = cleanUser;

    const response = await this.client.post('/b2b/v3/hotel/order/booking/finish/', cleanPayload);
    return response.data;
  }

  async checkBookingProcess(partnerOrderId: string) {
    const response = await this.client.post('/b2b/v3/hotel/order/booking/finish/status/', {
      partner_order_id: partnerOrderId,
      language: 'ru',
    });
    return response.data;
  }

  async cancelBooking(partnerOrderId: string) {
    const response = await this.client.post('/b2b/v3/hotel/order/cancel/', {
      partnerOrderId,
      language: 'ru',
    });
    return response.data;
  }

  async createCreditCardToken(params: {
    objectId: string;
    payUuid: string;
    initUuid: string;
    userFirstName: string;
    userLastName: string;
    cvc?: string;
    isCvcRequired: boolean;
    creditCardDataCore: {
      year: string;
      cardNumber: string;
      cardHolder: string;
      month: string;
    };
  }) {
    const payload = {
      object_id: params.objectId,
      pay_uuid: params.payUuid,
      init_uuid: params.initUuid,
      user_first_name: params.userFirstName,
      user_last_name: params.userLastName,
      cvc: params.cvc,
      is_cvc_required: params.isCvcRequired,
      credit_card_data_core: {
        year: params.creditCardDataCore.year,
        card_number: params.creditCardDataCore.cardNumber,
        card_holder: params.creditCardDataCore.cardHolder,
        month: params.creditCardDataCore.month,
      },
    };

    const response = await axios.post('https://api.payota.ru/api/public/v1/manage/init_partners', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${this.config.dKey}:${this.config.apiKey}`).toString('base64')}`,
      },
    });
    return response.data;
  }

  async getBookingInfo(partnerOrderId: string) {
    const response = await this.client.post('/b2b/v3/hotel/order/info/', {
      partnerOrderId,
      language: 'ru',
    });
    return response.data;
  }

  getConfig() {
    return { ...this.config };
  }

  getTestHotelHid() {
    return 8526976;
  }
}

export const ostrovokClient = new OstrovokClient();
