import Redis from 'ioredis';

let redisInstance: Redis | null = null;
let connectionError = false;

const memoryStore = new Map<string, { value: string; expiresAt?: number }>();

function getRedis(): Redis | null {
  if (connectionError) return null;
  if (!redisInstance) {
    if (!process.env.REDIS_URL) {
      connectionError = true;
      return null;
    }
    try {
      redisInstance = new Redis(process.env.REDIS_URL, {
        lazyConnect: true,
        retryStrategy: () => null,
      });

      redisInstance.on('error', (err) => {
        console.warn('[REDIS] Connection error:', err.message);
        connectionError = true;
      });

      redisInstance.on('connect', () => {
        console.log('[REDIS] Connected successfully');
        connectionError = false;
      });
    } catch (err) {
      console.warn('[REDIS] Failed to create client:', err);
      connectionError = true;
      return null;
    }
  }
  return redisInstance;
}

export const redis = new Proxy({} as Redis, {
  get(_target, prop) {
    const instance = getRedis();
    if (!instance) {
      if (prop === 'get') {
        return async (k: string) => {
          const item = memoryStore.get(k);
          if (!item) return null;
          if (item.expiresAt && Date.now() > item.expiresAt) {
            memoryStore.delete(k);
            return null;
          }
          return item.value;
        };
      }
      if (prop === 'set') {
        return async (k: string, v: string) => {
          memoryStore.set(k, { value: v });
          return 'OK';
        };
      }
      if (prop === 'setex') {
        return async (k: string, ttl: number, v: string) => {
          memoryStore.set(k, { value: v, expiresAt: Date.now() + ttl * 1000 });
          return 'OK';
        };
      }
      if (prop === 'del') {
        return async (k: string) => {
          memoryStore.delete(k);
          return 1;
        };
      }
      return () => Promise.resolve(null);
    }
    return (instance as any)[prop];
  },
});

export async function getCached<T>(key: string): Promise<T | null> {
  const instance = getRedis();
  if (!instance) {
    const item = memoryStore.get(key);
    if (!item) return null;
    if (item.expiresAt && Date.now() > item.expiresAt) {
      memoryStore.delete(key);
      return null;
    }
    try {
      return JSON.parse(item.value) as T;
    } catch {
      return null;
    }
  }

  try {
    const value = await instance.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export async function setCached<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  const instance = getRedis();
  if (!instance) {
    memoryStore.set(key, {
      value: JSON.stringify(value),
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
    return;
  }

  try {
    await instance.setex(key, ttlSeconds, JSON.stringify(value));
  } catch {
    // ignore cache write errors
  }
}

export async function invalidateCache(key: string): Promise<void> {
  const instance = getRedis();
  if (!instance) {
    memoryStore.delete(key);
    return;
  }

  try {
    await instance.del(key);
  } catch {
    // ignore cache delete errors
  }
}
