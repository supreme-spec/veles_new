type AnalyticsEvent =
  | { name: 'hotel_search'; params: { query: string; results_count: number; filters_applied: number; search_duration_ms: number } }
  | { name: 'hotel_view'; params: { hotel_id: string; hotel_name: string; city: string; stars: number; min_price?: number } }
  | { name: 'booking_start'; params: { hotel_id: string; rooms_count: number; nights_count: number; total_price: number } }
  | { name: 'booking_complete'; params: { order_id: string; status: 'success' | 'failed'; error?: string } }
  | { name: 'suggestion_click'; params: { query: string; suggestion_type: 'city' | 'hotel'; suggestion_text: string } }
  | { name: 'map_view_toggle'; params: { view: 'list' | 'map'; results_count: number } };

const ENDPOINT = '/api/analytics';

function safeSend(payload: { event: string; params: Record<string, any>; url: string; timestamp: string }) {
  if (typeof navigator === 'undefined' || !('sendBeacon' in navigator)) return;
  try {
    (navigator as any).sendBeacon?.(ENDPOINT, JSON.stringify(payload));
  } catch {
    // ignore analytics errors
  }
}

export const analytics = {
  track<T extends AnalyticsEvent>(event: T) {
    if (typeof window === 'undefined') return;
    safeSend({
      event: event.name,
      params: event.params,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  },
};
