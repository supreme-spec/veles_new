import { redis } from '@/lib/redis';

const RATE_LIMIT_PREFIX = 'rate-limit:';

export async function checkRateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const now = Date.now();
  const windowKey = `${RATE_LIMIT_PREFIX}${key}`;

  try {
    const pipeline = redis.pipeline();
    pipeline.zadd(windowKey, now, now);
    pipeline.zremrangebyscore(windowKey, 0, now - windowMs);
    pipeline.zcard(windowKey);
    pipeline.expire(windowKey, Math.ceil(windowMs / 1000));

    const results = await pipeline.exec();
    const count = results?.[2]?.[1] as number | undefined;

    return (count ?? 0) < limit;
  } catch {
    return true;
  }
}

export function getUserKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0]?.trim() || 'anonymous' : 'anonymous';
  return `ip:${ip}`;
}
