import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

let pool: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

const noOp = {
  findMany: async () => [],
  findFirst: async () => null,
  findUnique: async () => null,
  create: async (d: any) => d?.data ?? {},
  update: async (d: any) => d?.data ?? {},
  delete: async () => ({}),
};

const mockDb = new Proxy({} as any, {
  get(_target, prop) {
    if (prop === 'query') {
      return new Proxy({}, { get: () => noOp });
    }
    if (prop === 'select' || prop === 'insert' || prop === 'update' || prop === 'delete') {
      const chain: any = () => chain;
      chain.from = () => chain;
      chain.where = () => chain;
      chain.limit = () => chain;
      chain.offset = () => chain;
      chain.orderBy = () => chain;
      chain.values = () => chain;
      chain.set = () => chain;
      chain.returning = () => Promise.resolve([]);
      chain.execute = () => Promise.resolve([]);
      chain.then = (resolve: any) => Promise.resolve([]).then(resolve);
      return chain;
    }
    return async () => [];
  },
});

function getPool(): Pool | null {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      return null;
    }
    try {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });

      pool.on('error', (err) => {
        console.error('[DB] Unexpected error on idle client', err);
      });
    } catch (err) {
      console.warn('[DB] Failed to create pool — using mock', err);
      return null;
    }
  }
  return pool;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    if (!dbInstance) {
      const activePool = getPool();
      if (!activePool) {
        return (mockDb as any)[prop];
      }
      try {
        dbInstance = drizzle(activePool, { schema });
      } catch (e) {
        console.warn('[DB] Drizzle initialization failed — using mock', e);
        return (mockDb as any)[prop];
      }
    }
    return (dbInstance as any)[prop];
  },
});
