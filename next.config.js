// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Позволяет собирать в отдельный каталог (NEXT_DIST_DIR=.next-new),
  // чтобы не трогать рабочий .next во время сборки продакшн-сайта.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Точечный обход type-check только для явного запроса (NEXT_IGNORE_TYPE_ERRORS=true).
  // По умолчанию поведение не меняется: next-build по-прежнему проверяет типы.
  typescript: {
    ignoreBuildErrors: process.env.NEXT_IGNORE_TYPE_ERRORS === 'true',
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  typedRoutes: true,
  experimental: {
    // @ts-ignore
    allowedDevOrigins: [
      'localhost:3000',
      'localhost:8080',
      '127.0.0.1:3000',
      '127.0.0.1:8080',
      '*.run.app',
      '*.google.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.veles-voyage.ru',
          },
        ],
        destination: 'https://veles-voyage.ru/:path*',
        permanent: true,
      },
      {
        source: '/news-sitemap.xml',
        destination: '/api/news-sitemap',
        permanent: true,
      },
      {
        source: '/public/sitemap.xml',
        destination: 'https://veles-voyage.ru/sitemap.xml',
        permanent: true,
      },
      {
        source: '/places/:path*',
        destination: '/wiki/places',
        permanent: true,
      },
      {
        source: '/countries',
        destination: '/wiki/countries',
        permanent: true,
      },
      {
        source: '/countries/:path*',
        destination: '/wiki/countries',
        permanent: true,
      },
      {
        source: '/encyclopedia',
        destination: '/wiki',
        permanent: true,
      },
      {
        source: '/wiki/bolgariya/:path*',
        destination: '/wiki/bulgaria/:path*',
        permanent: true,
      },
      {
        source: '/wiki/bolgariya',
        destination: '/wiki/bulgaria',
        permanent: true,
      },
      {
        source: '/wiki/luhansk/:path*',
        destination: '/wiki/lugansk/:path*',
        permanent: true,
      },
      {
        source: '/wiki/luhansk',
        destination: '/wiki/lugansk',
        permanent: true,
      },
      {
        source: '/wiki/czech/:path*',
        destination: '/wiki/czechia/:path*',
        permanent: true,
      },
      {
        source: '/wiki/czech',
        destination: '/wiki/czechia',
        permanent: true,
      },
      {
        source: '/blog/morskie-ruizy-2026-gid-dlya-nachinayuschih',
        destination: '/blog/morskie-kruizy-2026-gid-dlya-nachinayuschih',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    const path = require('path');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    if (process.env.NODE_ENV === 'development') {
      config.devtool = false;
    }
    if (!isServer) {
      config.output.crossOriginLoading = 'anonymous';
    }
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'veles-voyage.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.veles-voyage.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.ostrovok.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.travelpayouts.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photo.hotellook.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'q-cf.bstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'r-cf.bstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.level.travel',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.travelata.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.maps.yandex.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yastatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.aviakassa.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; child-src 'self' https:; frame-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self';",
  },
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development'
              ? 'no-store, no-cache, must-revalidate'
              : 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/hotels/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: process.env.NODE_ENV === 'development'
              ? 'no-store, no-cache, must-revalidate'
              : 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/search/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=900, stale-while-revalidate=1800' },
        ],
      },
      {
        source: '/api/booking/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "img-src 'self' data: blob: https: " +
                'https://*.maps.yandex.net https://vec01.maps.yandex.net https://core-nmaps.maps.yandex.net ' +
                'https://yastatic.net ' +
                'https://*.ostrovok.ru https://img.ostrovok.ru https://cdn.ostrovok.ru ' +
                'https://*.travelpayouts.com https://photo.hotellook.com https://cdn.travelpayouts.com ' +
                'https://*.level.travel https://*.travelata.ru https://*.bronevik.com ' +
                'https://q-cf.bstatic.com https://r-cf.bstatic.com ' +
                'https://*.aviakassa.com ' +
                'https://images.unsplash.com https://plus.unsplash.com',
              "media-src 'self' https:",
              "font-src 'self' https: data:",
              "style-src 'self' 'unsafe-inline' https: " +
                'https://bitrix.infoflot.com https://widgets.aviakassa.com',
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: " +
                'https://api-maps.yandex.ru https://yastatic.net ' +
                'https://widgets.aviakassa.com https://api4.aviakassa.com',
              "connect-src 'self' wss: https: " +
                'https://bitrix.infoflot.com https://widgets.aviakassa.com https://api4.aviakassa.com ' +
                'https://images.unsplash.com https://plus.unsplash.com https://tiles.openfreemap.org https://demotiles.maplibre.org ' +
                'https://api-maps.yandex.ru https://geocode-maps.yandex.ru https://*.maps.yandex.net ' +
                'https://*.ostrovok.ru https://*.travelpayouts.com https://*.level.travel https://*.bronevik.com',
              "frame-src 'self' https: " +
                'https://bitrix.infoflot.com https://widgets.aviakassa.com https://yandex.ru ' +
                'https://*.ostrovok.ru https://*.travelpayouts.com https://*.level.travel https://*.travelata.ru',
              "worker-src 'self' blob:",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ];
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {any} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      const { build } = require('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

module.exports = nextConfig;
