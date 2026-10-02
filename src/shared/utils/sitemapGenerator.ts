import { wikiPages } from '@/shared/data/wikiPages';
import type { WikiPage } from '@/features/wiki/types';
import { SITE_URL } from '@/shared/constants/seo';

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

// Constants for sitemap configuration
interface SitemapConfig {
  baseUrl: string;
  defaultPriority: string;
  defaultChangefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  maxUrlsPerSitemap: number;
  supportedNamespaces: string[];
  getCurrentDate: () => string;
}

const SITEMAP_CONFIG: SitemapConfig = {
  baseUrl: SITE_URL,
  defaultPriority: '0.5',
  defaultChangefreq: 'monthly',
  maxUrlsPerSitemap: 50000, // Sitemap protocol limit
  supportedNamespaces: [
    'http://www.sitemaps.org/schemas/sitemap/0.9',
    'http://www.google.com/schemas/sitemap-image/1.1',
    'http://www.google.com/schemas/sitemap-mobile/1.0'
  ],
  getCurrentDate(): string {
    const dateStr = new Date().toISOString();
    const parts = dateStr.split('T');
    return parts[0] || dateStr.substring(0, 10);
  }
};

// Helper function to safely get last modified date
const getLastModified = (page: WikiPage, currentDate: string): string => {
  try {
    return page.lastModified?.toString() || currentDate;
  } catch {
    return currentDate;
  }
};

// Enhanced sitemap URL generator with better error handling
export const generateSitemapUrls = (): SitemapUrl[] => {
  const baseUrl: string = SITEMAP_CONFIG.baseUrl;
  const currentDate: string = SITEMAP_CONFIG.getCurrentDate();
  
  const urls: SitemapUrl[] = [
    // Главная страница
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    // Основная страница wiki
    {
      url: `${baseUrl}/wiki`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    // Страница со списком стран
    {
      url: `${baseUrl}/wiki/countries`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    // Страница советов путешественникам
    {
      url: `${baseUrl}/wiki/travel-tips`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    }
  ];

  // Добавляем страницы стран с better error handling
  try {
    Object.keys(wikiPages).forEach(countryId => {
      const page = wikiPages[countryId];
      
      if (!page) {
        console.warn(`⚠️  Skipping country ${countryId} - no page data found`);
        return;
      }
      
      const lastMod: string = getLastModified(page, currentDate);
      
      // Основная страница страны
      urls.push({
        url: `${baseUrl}/wiki/${countryId}`,
        lastmod: lastMod,
        changefreq: 'monthly',
        priority: '0.8'
      });

      // Секции страны
      const sections = [
        'geography', 'visa', 'transport', 'accommodation',
        'attractions', 'culture', 'safety', 'budget', 'cuisine'
      ];

      sections.forEach(section => {
        urls.push({
          url: `${baseUrl}/wiki/${countryId}/${section}`,
          lastmod: lastMod,
          changefreq: 'monthly',
          priority: '0.6'
        });
      });
    });
  } catch (error) {
    console.error('❌ Error processing country pages for sitemap:', error);
  }

  return urls;
};

// Генерация XML контента для sitemap
export const generateSitemapXml = (): string => {
  const urls = generateSitemapUrls();
  const baseUrl = SITEMAP_CONFIG.baseUrl;
  
  const urlsXml = urls.map(urlObj => {
    // Generate dynamic image URL based on page type
    let imageUrl = `${baseUrl}/images/hero-bg.svg`;
    let imageTitle = 'Велес Вояж - Туристическое агентство';
    
    // Customize image for wiki pages
    if (urlObj.url.includes('/wiki/')) {
      if (urlObj.url === `${baseUrl}/wiki`) {
        imageTitle = 'Велес Вояж - Энциклопедия путешествий';
      } else if (urlObj.url.includes('/wiki/countries')) {
        imageTitle = 'Велес Вояж - Страны мира';
        imageUrl = `${baseUrl}/images/countries/world-map.jpg`;
      } else if (urlObj.url.includes('/wiki/travel-tips')) {
        imageTitle = 'Велес Вояж - Советы путешественникам';
        imageUrl = `${baseUrl}/images/travel-tips-hero.jpg`;
      } else {
        // Handle country-specific pages
        const countryMatch = urlObj.url.match(/\/wiki\/([\w-]+)/);
        if (countryMatch) {
          const countryId = countryMatch[1];
          imageTitle = `Велес Вояж - ${countryId}`;
          imageUrl = `${baseUrl}/images/countries/${countryId}.jpg`;
        } else {
          imageTitle = 'Велес Вояж - Энциклопедия путешествий';
        }
      }
    }
    
    return `
  <url>
    <loc>${urlObj.url}</loc>
    <lastmod>${urlObj.lastmod}</lastmod>
    <changefreq>${urlObj.changefreq}</changefreq>
    <priority>${urlObj.priority}</priority>
    <mobile:mobile/>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${imageTitle}</image:title>
    </image:image>
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlsXml}
</urlset>`;
};

// Генерация robots.txt с указанием на sitemap
export const generateRobotsTxt = (): string => {
  const timestamp = SITEMAP_CONFIG.getCurrentDate();
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Запрещаем индексацию служебных страниц
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Разрешаем все остальное
Allow: /wiki/
Allow: /privacy/
Allow: /terms/
Allow: /about/
Allow: /contacts/

# Last updated: ${timestamp}`;
};

// Функция для записи sitemap в файл (для использования в build-time)
export const writeSitemapToFile = async (): Promise<void> => {
  try {
    const fs = await import('fs').catch(() => null);
    const path = await import('path').catch(() => null);
    
    if (!fs || !path) {
      console.warn('❌ File system modules not available, skipping sitemap generation');
      return;
    }
    
    const sitemapXml = generateSitemapXml();
    const robotsTxt = generateRobotsTxt();
    
    const publicDir = path.join(process.cwd(), 'public');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Записываем sitemap.xml
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
    
    // Обновляем robots.txt
    const robotsPath = path.join(publicDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    
    console.log('✅ Sitemap and robots.txt generated successfully');
    console.log(`📄 Sitemap: ${sitemapPath}`);
    console.log(`📄 Robots.txt: ${robotsPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    throw new Error(`Sitemap generation failed: ${error}`);
  }
};
