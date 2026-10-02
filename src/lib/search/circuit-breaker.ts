import { getCached, setCached } from '@/lib/redis';

export interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeout: number;
}

export class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(private options: CircuitBreakerOptions) {}

  async execute<T>(fn: () => Promise<T>, fallback?: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure > this.options.resetTimeout) {
        this.state = 'half-open';
      } else if (fallback) {
        return fallback();
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      if (fallback && this.failures >= this.options.failureThreshold) {
        return fallback();
      }
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure() {
    this.failures += 1;
    this.lastFailure = Date.now();
    if (this.failures >= this.options.failureThreshold) {
      this.state = 'open';
    }
  }

  getStatus() {
    return {
      state: this.state,
      failures: this.failures,
      lastFailure: this.lastFailure,
    };
  }
}

export const searchCircuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 60_000,
});

export async function getStaleSearchCache(params: {
  regionId?: number;
  hotelIds?: number[];
  checkin: string;
  checkout: string;
  adults: number;
  residency: string;
}) {
  const key = buildStaleKey(params);
  return getCached<any>(key);
}

export async function setStaleSearchCache(
  params: {
    regionId?: number;
    hotelIds?: number[];
    checkin: string;
    checkout: string;
    adults: number;
    residency: string;
  },
  data: any,
  ttlSeconds = 60 * 60
) {
  const key = buildStaleKey(params);
  await setCached(key, data, ttlSeconds);
}

function buildStaleKey(params: {
  regionId?: number;
  hotelIds?: number[];
  checkin: string;
  checkout: string;
  adults: number;
  residency: string;
}) {
  const base = {
    ...params,
    guests: [{ adults: params.adults }],
  };
  return `search:stale:${Buffer.from(JSON.stringify(base)).toString('base64')}`;
}
