import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

/**
 * Web Vitals Reporting
 * 
 * This module implements reporting for Core Web Vitals metrics:
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - INP (Interaction to Next Paint)
 * - LCP (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 * 
 * These metrics help monitor and improve user experience.
 */

// Define the type for our analytics function
type ReportHandler = (metric: {
  name: string;
  value: number;
  id: string;
  navigationType?: string;
  entries: PerformanceEntry[];
}) => void;

// Analytics function to send data to monitoring service
const sendToAnalytics: ReportHandler = ({ name, value, id }) => {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: send to a custom endpoint
    navigator.sendBeacon(
      '/api/web-vitals',
      JSON.stringify({
        name,
        value: Math.round(name === 'CLS' ? value * 10000 : value), // CLS values need to be multiplied by 10000
        id,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    );
  } else {
    // In development, log to console
    console.log(`[Web Vitals] ${name}:`, value);
  }
};

// Initialize web vitals reporting
export function initWebVitals() {
  // Only run on client-side
  if (typeof window !== 'undefined') {
    // Core Web Vitals metrics
    onCLS(sendToAnalytics); // Cumulative Layout Shift
    onFCP(sendToAnalytics); // First Contentful Paint
    onLCP(sendToAnalytics); // Largest Contentful Paint
    
    // Other important metrics
    onTTFB(sendToAnalytics); // Time to First Byte
    onINP(sendToAnalytics); // Interaction to Next Paint (replaces FID)
  }
}

// Export individual metric handlers for custom usage
export { onCLS, onFCP, onINP, onLCP, onTTFB };

/**
 * Core Web Vitals Thresholds (Good ratings):
 * 
 * LCP (Largest Contentful Paint) - Loading performance
 * - Good: <= 2.5 seconds
 * - Needs Improvement: 2.5 - 4.0 seconds
 * - Poor: > 4.0 seconds
 * 
 * INP (Interaction to Next Paint) - Responsiveness (replaces FID)
 * - Good: <= 200 milliseconds
 * - Needs Improvement: 200 - 500 milliseconds
 * - Poor: > 500 milliseconds
 * 
 * CLS (Cumulative Layout Shift) - Visual stability
 * - Good: <= 0.1
 * - Needs Improvement: 0.1 - 0.25
 * - Poor: > 0.25
 * 
 * FCP (First Contentful Paint) - Loading
 * - Good: <= 1.8 seconds
 * - Needs Improvement: 1.8 - 3.0 seconds
 * - Poor: > 3.0 seconds
 * 
 * TTFB (Time to First Byte) - Server response
 * - Good: <= 800 milliseconds
 * - Needs Improvement: 800 - 1800 milliseconds
 * - Poor: > 1800 milliseconds
 */