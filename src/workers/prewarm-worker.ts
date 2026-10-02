
import { searchCoalescer } from '@/lib/search/coalescer';

export interface PrewarmRoute {
  regionId: number;
  city: string;
  weight: number;
}

export const POPULAR_ROUTES: PrewarmRoute[] = [
  { regionId: 123, city: 'Стамбул', weight: 100 },
  { regionId: 456, city: 'Дубай', weight: 80 },
  { regionId: 789, city: 'Бангкок', weight: 70 },
];

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0] || '';
}

export async function prewarmPopularRoutes() {
  const today = new Date();
  const checkins: string[] = [addDays(today, 7), addDays(today, 14), addDays(today, 30)].map(formatDate);
  const durations = [3, 5, 7, 14];

  const jobs: Array<{
    regionId: number;
    checkin: string;
    checkout: string;
    guests: Array<{ adults: number }>;
    residency: string;
  }> = [];

  for (const route of POPULAR_ROUTES.slice(0, 50)) {
    for (const checkin of checkins) {
      for (const duration of durations) {
        jobs.push({
          regionId: route.regionId,
          checkin,
          checkout: formatDate(addDays(new Date(checkin), duration)),
          guests: [{ adults: 2 }],
          residency: 'RU',
        });
      }
    }
  }

  console.log(`[PREWARM] Starting pre-warming for ${jobs.length} searches...`);

  for (let i = 0; i < jobs.length; i += 5) {
    const batch = jobs.slice(i, i + 5);
    await Promise.allSettled(
      batch.map(job =>
        searchCoalescer.search(job).catch(e => {
          console.error(`[PREWARM] Failed for region ${job.regionId}:`, e.message);
        })
      )
    );
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`[PREWARM] Completed ${jobs.length} pre-warm jobs`);
}
