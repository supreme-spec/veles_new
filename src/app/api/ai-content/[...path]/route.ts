import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const AI_BOT_WHITELIST = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Claude-Web',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'OAI-SearchBot',
  'Amazonbot',
  'FacebookBot',
  'Applebot',
  'Applebot-Extended',
  'cohere-ai',
  'anthropic-ai',
  'Bytespider',
  'Yandex-Neuro',
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://veles-voyage.ru';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function isAIBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return AI_BOT_WHITELIST.some((bot) => userAgent.includes(bot));
}

function detectFormat(request: NextRequest): 'json-ld' | 'markdown' | 'html' {
  const accept = request.headers.get('accept') || '';
  const userAgent = request.headers.get('user-agent') || '';

  if (accept.includes('application/ld+json') || accept.includes('application/llm+json')) {
    return 'json-ld';
  }

  if (accept.includes('text/markdown') || accept.includes('application/x-markdown')) {
    return 'markdown';
  }

  if (isAIBot(userAgent)) {
    return 'json-ld';
  }

  return 'html';
}

async function servePublicFile(cleanPath: string): Promise<{ title: string; description: string; content: string; type: string } | null> {
  const filePath = path.join(PUBLIC_DIR, cleanPath);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const ext = path.extname(cleanPath).toLowerCase();
    const baseName = path.basename(filePath, ext);

    return {
      title: baseName,
      description: content.slice(0, 200),
      content: content.slice(0, 10000),
      type: ext.replace('.', '') || 'text',
    };
  } catch {
    return null;
  }
}

async function getPageContent(path: string): Promise<{ title: string; description: string; content: string; type: string } | null> {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');

  if (!cleanPath) {
    return {
      title: 'Велес Вояж — туры и путешествия 2026',
      description: 'Официальное турагентство Велес Вояж. Подбор туров в Турцию, Египет, ОАЭ и морских круизов.',
      content: 'Велес Вояж — турагентство с лицензией РТА 0035678. Индивидуальные туры и круизы по России и миру, энциклопедия по 200+ странам.',
      type: 'homepage',
    };
  }

  if (cleanPath === 'voice' || cleanPath.startsWith('voice/')) {
    return {
      title: 'Голосовой помощник Велес Вояж',
      description: 'Голосовой справочник для Алисы, Siri, Google Ассистента и Маруси. Ответы про визы, цены на туры, можно ли без визы, когда ехать.',
      content: 'Частые вопросы: нужна ли виза в Турцию, сколько стоит тур на двоих, какие страны без визы, как добраться до Дубая, безопасно ли в Египте, когда лучше ехать в Таиланд, как выбрать круиз.',
      type: 'voice',
    };
  }

  if (cleanPath === 'tours' || cleanPath.startsWith('tours/')) {
    return {
      title: 'Туры от Велес Вояж 2026',
      description: 'Подбор туров в Турцию, Египет, ОАЭ, Таиланд и другие страны. Индивидуальные маршруты, лучшие цены.',
      content: 'Велес Вояж предлагает индивидуальные туры и пакетные путевки. Прямые чартерные рейсы, трансфер, страховка, поддержка 24/7.',
      type: 'tour',
    };
  }

  if (cleanPath === 'cruises' || cleanPath.startsWith('cruises/')) {
    return {
      title: 'Морские круизы 2026 | Велес Вояж',
      description: 'Круизы по Средиземному морю, Карибам, Балтике и другим направлениям. Лучшие предложения 2026.',
      content: 'Морские круизы от Велес Вояж: Средиземное море, Карибы, Балтика, Норвежские фьорды. Подбор маршрута и бронирование.',
      type: 'cruise',
    };
  }

  if (cleanPath.startsWith('wiki/')) {
    const countrySlug = cleanPath.replace(/^wiki\//, '').split('/')[0];
    return {
      title: `Путеводитель по ${countrySlug} | Велес Вояж`,
      description: `Подробный путеводитель по ${countrySlug}: виза, погода, валюта, достопримечательности, советы туристам 2026.`,
      content: `Путеводитель по ${countrySlug} от Велес Вояж. Актуальная информация для туристов: визовые требования, климат, курсы валют, топ достопримечательностей, транспорт, бюджет, безопасность.`,
      type: 'country-guide',
    };
  }

  if (cleanPath.startsWith('cities/')) {
    const citySlug = cleanPath.replace(/^cities\//, '').split('/')[0];
    return {
      title: `Туры из ${citySlug} | Велес Вояж`,
      description: `Подбор туров из ${citySlug}. Вылеты из ближайших аэропортов, прямые и стыковочные рейсы.`,
      content: `Туры из ${citySlug} с вылетом из ближайшего аэропорта. Прямые чартерные и регулярные рейсы, проверенные отели, трансфер и страховка.`,
      type: 'city-departure',
    };
  }

  if (cleanPath === 'faq') {
    return {
      title: 'Частые вопросы | Велес Вояж',
      description: 'FAQ: визы, цены на туры, безопасность, курорты, документы. Короткие ответы для голосовых ассистентов.',
      content: 'Частые вопросы: нужна ли виза в Турцию, сколько стоит тур в Египет, какие страны доступны без визы, безопасно ли путешествовать, лучший сезон для отдыха.',
      type: 'faq',
    };
  }

  if (cleanPath === 'contacts') {
    return {
      title: 'Контакты и офисы Велес Вояж',
      description: 'Телефон +7 985 063-51-34, email hello@veles-voyage.ru, офисы в Голицыно и Пушкино. Поддержка 24/7.',
      content: 'Свяжитесь с нами: телефон +7 985 063-51-34, Telegram @veles_voyage, email hello@veles-voyage.ru. Офисы: Голицыно, пр-т. Керамиков, 103; Пушкино, пр-т. Московский, 9/2.',
      type: 'contacts',
    };
  }

  if (cleanPath === 'hotels') {
    return {
      title: 'Отели по всему миру | Велес Вояж',
      description: 'Поиск и бронирование отелей по всему миру. Удобный поиск, выгодные цены, мгновенное подтверждение.',
      content: 'Бронирование отелей в более чем 200 странах мира. От бюджетных гостиниц до люксовых курортов. Поддержка 24/7.',
      type: 'hotels',
    };
  }

  const fileResult = await servePublicFile(cleanPath);
  if (fileResult) {
    return fileResult;
  }

  return null;
}

export async function GET(
  request: NextRequest,
  // Next 15 (typedRoutes) требует, чтобы context.params был Promise.
  // Поведение не меняется: await корректно работает и с обычным объектом,
  // а строковая конкатенация catch-all параметров остаётся прежней.
  { params }: { params: Promise<{ path: string[] }> },
) {
  const url = new URL(request.url);
  const { path: pathSegments } = await params;
  const requestedPath = pathSegments ? '/' + pathSegments : '/';
  const format = detectFormat(request);

  const page = await getPageContent(requestedPath);
  if (!page) {
    return NextResponse.json({ error: 'Not found', path: requestedPath }, { status: 404 });
  }

  if (format === 'json-ld') {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      '@id': `${SITE_URL}/#travelagency`,
      name: 'Велес Вояж',
      description: page.description,
      url: `${SITE_URL}${requestedPath}`,
      telephone: '+7-985-063-51-34',
      email: 'hello@veles-voyage.ru',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Керамиков пр-т, д. 103',
        addressLocality: 'Голицыно',
        addressRegion: 'Московская область',
        postalCode: '143041',
        addressCountry: 'RU',
      },
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
      foundingDate: '2023',
      priceRange: '₽₽',
      license: 'РТА 0035678',
      sameAs: [
        'https://vk.com/veles__voyage',
        'https://t.me/veles_voyage',
        'https://rutube.ru/u/velesvoyage/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+7-985-063-51-34',
        contactType: 'customer service',
        email: 'hello@veles-voyage.ru',
        availableLanguage: ['Russian'],
      },
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: page.title,
            description: page.description,
          },
        },
      ],
    };

    if (page.type === 'voice') {
      schema['@type'] = 'WebPage';
      schema.speakable = {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.voice-snippet', '.faq-answer'],
      };
    }

    if (page.type === 'faq') {
      schema['@type'] = 'FAQPage';
      schema.mainEntity = [
        {
          '@type': 'Question',
          name: 'Нужна ли виза в Турцию для россиян?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет, для граждан РФ действует безвизовый режим до 60 дней. Въезд по загранпаспорту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько стоит тур в Турцию на двоих?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тур на двоих на 7 ночей все включено стоит от 100 000 рублей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие страны доступны без визы в 2026 году?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Без визы: Турция, Египет, ОАЭ, Таиланд, Мальдивы, Вьетнам, Грузия, Кипр, Индонезия, Шри-Ланка.',
          },
        },
      ];
    }

    const response = NextResponse.json(schema);
    response.headers.set('Content-Type', 'application/ld+json; charset=utf-8');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-AI-Bot-Allowed', 'true');
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    return response;
  }

  if (format === 'markdown') {
    const markdown = `# ${page.title}\n\n${page.description}\n\n## About\n\n${page.content}\n\n## Contact\n\n- Phone: +7 985 063-51-34\n- Email: hello@veles-voyage.ru\n- Website: ${SITE_URL}${requestedPath}\n`;
    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'X-AI-Bot-Allowed': 'true',
        'Cache-Control': 'public, max-age=300, s-maxage=600',
      },
    });
  }

  return NextResponse.redirect(new URL(requestedPath, url.origin), 302);
}
