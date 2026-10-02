declare module 'lru-cache' {
  interface LRUCacheOptions<K, V> {
    max?: number;
    ttl?: number;
    ttlResolution?: number;
    ttlDisposeWhenIdle?: boolean;
    allowStale?: boolean;
    updateAgeOnGet?: boolean;
    updateAgeOnHas?: boolean;
    dispose?: (value: V, key: K, reason: string) => void;
    disposeAfter?: (entry: { key: K; value: V; reason: string }, deleteCount: number) => void;
  }

  class LRUCache<K = any, V = any> implements Iterable<[K, V]> {
    constructor(options?: LRUCacheOptions<K, V>);
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    get size(): number;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    forEach<T>(callback: (value: V, key: K, cache: LRUCache<K, V>) => T | void, thisArg?: T): void;
  }

  export default LRUCache;
}
