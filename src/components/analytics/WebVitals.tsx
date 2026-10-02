'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import type { Metric } from 'web-vitals';
import { initWebVitals } from '@/app/web-vitals';

/**
 * Web Vitals Tracker Component
 * Tracks Core Web Vitals metrics and sends them to analytics
 * 
 * Metrics tracked:
 * - LCP (Largest Contentful Paint) - Loading performance
 * - CLS (Cumulative Layout Shift) - Visual stability
 * - FCP (First Contentful Paint) - Initial render
 * - TTFB (Time to First Byte) - Server response time
 * - INP (Interaction to Next Paint) - Responsiveness
 */

function sendToAnalytics(metric: Metric) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
        });
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_label: metric.id,
            non_interaction: true,
        });
    }

    // Send to custom analytics endpoint (optional)
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        const body = JSON.stringify({
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
            navigationType: metric.navigationType,
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });

        // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
        if (navigator.sendBeacon) {
            navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, body);
        } else {
            fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
                body,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                keepalive: true,
            }).catch(console.error);
        }
    }
}

export function WebVitals() {
    useEffect(() => {
        // Initialize our enhanced web vitals tracking
        initWebVitals();
        
        // Also manually track for backward compatibility
        onCLS(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
        onINP(sendToAnalytics);
    }, []);

    return null;
}

/**
 * Thresholds for Web Vitals (Google's recommendations)
 * 
 * LCP (Largest Contentful Paint):
 * - Good: <= 2.5s
 * - Needs Improvement: 2.5s - 4.0s
 * - Poor: > 4.0s
 * 
 * CLS (Cumulative Layout Shift):
 * - Good: <= 0.1
 * - Needs Improvement: 0.1 - 0.25
 * - Poor: > 0.25
 * 
 * FCP (First Contentful Paint):
 * - Good: <= 1.8s
 * - Needs Improvement: 1.8s - 3.0s
 * - Poor: > 3.0s
 * 
 * TTFB (Time to First Byte):
 * - Good: <= 800ms
 * - Needs Improvement: 800ms - 1800ms
 * - Poor: > 1800ms
 * 
 * INP (Interaction to Next Paint):
 * - Good: <= 200ms
 * - Needs Improvement: 200ms - 500ms
 * - Poor: > 500ms
 */