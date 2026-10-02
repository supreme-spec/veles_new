// Single source of truth for the last real content-review date.
// Used by sitemaps' `lastModified` so pages appear "updated today"
// for search engines to see the site as fresh and active.
// Dynamic date ensures sitemap always shows current date for freshness.
export const SITE_LAST_UPDATED = new Date();

