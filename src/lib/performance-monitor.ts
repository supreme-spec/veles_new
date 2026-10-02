type MetricName = 'search' | 'hotelpage' | 'booking' | 'suggestions';

interface Metric {
  endpoint: MetricName;
  duration: number;
  status: 'success' | 'error';
  timestamp: number;
}

const HISTORY_MAX = 1000;
const metrics: Metric[] = [];

function recordMetric(metric: Metric) {
  metrics.push(metric);
  if (metrics.length > HISTORY_MAX) {
    metrics.splice(0, metrics.length - HISTORY_MAX);
  }
}

export function getP99(endpoint: MetricName): number {
  const durations = metrics
    .filter((m) => m.endpoint === endpoint && m.status === 'success')
    .map((m) => m.duration)
    .sort((a, b) => a - b);

  if (!durations.length) return 0;
  const index = Math.floor(durations.length * 0.99);
  return durations[Math.min(index, durations.length - 1)] ?? 0;
}

export function getMetricsSnapshot() {
  const now = Date.now();
  const last5Min = metrics.filter((m) => now - m.timestamp < 5 * 60 * 1000);

  return {
    total: metrics.length,
    last5Min: last5Min.length,
    p99: {
      search: getP99('search'),
      hotelpage: getP99('hotelpage'),
      booking: getP99('booking'),
      suggestions: getP99('suggestions'),
    },
    errorRate: last5Min.length ? last5Min.filter((m) => m.status === 'error').length / last5Min.length : 0,
  };
}

export async function measure<T>(
  endpoint: MetricName,
  operation: () => Promise<T>,
  fallback?: () => T
): Promise<T> {
  const start = performance.now();
  try {
    const result = await operation();
    const duration = performance.now() - start;
    recordMetric({ endpoint, duration, status: 'success', timestamp: Date.now() });
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    recordMetric({ endpoint, duration, status: 'error', timestamp: Date.now() });
    if (fallback) {
      return fallback();
    }
    throw error;
  }
}
