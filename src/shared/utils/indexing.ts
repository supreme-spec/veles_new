import { generateSitemapUrls } from './sitemapGenerator';
import { SITE_URL } from '@/shared/constants/seo';

const INDEXNOW_KEY = 'veles-voyage-indexnow-key-2026';
const HOST = SITE_URL.replace(/^https?:\/\//, '');
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

/**
 * Submits URLs to IndexNow (Yandex, Bing)
 */
export const submitToIndexNow = async (urls?: string[]) => {
    if (!urls) {
        const sitemapUrls = generateSitemapUrls();
        urls = sitemapUrls.map(u => u.url);
    }

    // IndexNow allows up to 10,000 URLs per batch
    const batches = [];
    while (urls.length > 0) {
        batches.push(urls.splice(0, 10000));
    }

    const results = [];

    for (const batch of batches) {
        const data = {
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: KEY_LOCATION,
            urlList: batch
        };

        try {
            // Submit to Yandex (automatically shared with Bing and others)
            const response = await fetch('https://yandex.com/indexnow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(data),
            });

            results.push({
                engine: 'Yandex/IndexNow',
                status: response.status,
                message: response.status === 200 ? 'OK' : await response.text()
            });

            // Submit to Bing directly as backup
            const responseBing = await fetch('https://api.indexnow.org/indexnow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(data),
            });

            results.push({
                engine: 'Bing/IndexNow',
                status: responseBing.status,
                message: responseBing.status === 200 ? 'OK' : await responseBing.text()
            });

        } catch (error) {
            console.error('IndexNow submission error:', error);
            results.push({ engine: 'IndexNow', status: 500, message: String(error) });
        }
    }

    return results;
};

/**
 * Pings search engines to notify them of sitemap updates
 */
export const pingSearchEngines = async () => {
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;
    const engines = [
        `https://www.google.com/ping?sitemap=${sitemapUrl}`,
        `https://webmaster.yandex.ru/ping?sitemap=${sitemapUrl}`,
        `https://www.bing.com/ping?sitemap=${sitemapUrl}`
    ];

    const results = [];

    for (const url of engines) {
        try {
            const response = await fetch(url);
            results.push({
                url,
                status: response.status,
                ok: response.ok
            });
        } catch (error) {
            console.error(`Ping error for ${url}:`, error);
            results.push({ url, status: 500, error: String(error) });
        }
    }

    return results;
};
