export function generateSocialSchema(url: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Велес Вояж в соцсетях',
    url,
    datePublished: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'Велес Вояж | Экспертная редакция',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    potentialAction: [
      {
        '@type': 'ListenAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://t.me/veles_voyage',
        },
        expectsAcceptanceOf: {
          '@type': 'Offer',
          name: 'Telegram Channel',
        },
      },
      {
        '@type': 'FollowAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://vk.com/veles__voyage',
        },
        expectsAcceptanceOf: {
          '@type': 'Offer',
          name: 'VKontakte Page',
        },
      },
    ],
  };
}

