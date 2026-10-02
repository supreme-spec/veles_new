import LRUCache from 'lru-cache';
import { ostrovokClient } from '@/lib/ostrovok/client';

export interface SearchParams {
  regionId?: number;
  lat?: number;
  lon?: number;
  radius?: number;
  hotelIds?: number[];
  checkin: string;
  checkout: string;
  guests: Array<{ adults: number; children?: number[] }>;
  residency?: string;
}

type CachedEntry = {
  result: any;
  timestamp: number;
};

type PendingRequest = {
  promise: Promise<any>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
};

const TTL_MS = 15 * 60 * 1000;
const MAX_CACHE_SIZE = 10000;

class SearchCoalescer {
  private cache = new LRUCache<string, CachedEntry>({
    max: MAX_CACHE_SIZE,
    ttl: TTL_MS,
  });

  private inFlight = new Map<string, PendingRequest>();

  private buildKey(params: SearchParams): string {
    const normalized = {
      ...params,
      guests: params.guests
        .map(g => ({ adults: g.adults, children: (g.children || []).sort() }))
        .sort((a, b) => a.adults - b.adults),
      residency: params.residency || 'RU',
    };
    return `search:${Buffer.from(JSON.stringify(normalized)).toString('base64')}`;
  }

  private isStale(entry: CachedEntry): boolean {
    return Date.now() - entry.timestamp > TTL_MS;
  }

  private async callOstrovok(params: SearchParams): Promise<any> {
    if (params.hotelIds && params.hotelIds.length > 0) {
      return ostrovokClient.searchByHotelIds({
        hotelIds: params.hotelIds.map(String),
        checkin: params.checkin,
        checkout: params.checkout,
        guests: params.guests,
        residency: params.residency || 'RU',
      });
    }

    if (typeof params.lat === 'number' && typeof params.lon === 'number') {
      return ostrovokClient.searchByGeo({
        lat: params.lat,
        lon: params.lon,
        radius: params.radius || 50,
        checkin: params.checkin,
        checkout: params.checkout,
        guests: params.guests,
        residency: params.residency || 'RU',
      });
    }

    return ostrovokClient.searchByRegion({
      regionId: params.regionId || 0,
      checkin: params.checkin,
      checkout: params.checkout,
      guests: params.guests,
      residency: params.residency || 'RU',
    });
  }

  async search(params: SearchParams) {
    const key = this.buildKey(params);

    const cached = this.cache.get(key);
    if (cached && !this.isStale(cached)) {
      this.refreshInBackground(key, params);
      return { data: cached.result, cached: true, age: Date.now() - cached.timestamp };
    }

    if (this.inFlight.has(key)) {
      const pending = this.inFlight.get(key)!;
      return new Promise((_resolve, reject) => {
        pending.resolve({ data: pending.promise, cached: false, coalesced: true });
        pending.reject = reject;
      });
    }

    const subscribers: Array<(value: any) => void> = [];
    const promise = (async () => {
      try {
        const result = await this.callOstrovok(params);
        const entry = { result, timestamp: Date.now() };
        this.cache.set(key, entry);
        for (const sub of subscribers) sub({ data: result, cached: false, coalesced: false });
        return { data: result, cached: false, coalesced: false };
      } finally {
        this.inFlight.delete(key);
      }
    })();

    const pending: PendingRequest = { promise, resolve: () => {}, reject: () => {} };
    this.inFlight.set(key, pending);

    return new Promise<any>((resolve, reject) => {
      pending.resolve = resolve;
      pending.reject = reject;
      promise.then(resolve, reject);
    });
  }

  private refreshInBackground(key: string, params: SearchParams) {
    setImmediate(async () => {
      try {
        const result = await this.callOstrovok(params);
        this.cache.set(key, { result, timestamp: Date.now() });
      } catch {
        // keep stale cache on background refresh failure
      }
    });
  }
}

export const searchCoalescer = new SearchCoalescer();
