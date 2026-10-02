import { NextResponse } from 'next/server';
import { SITE_URL } from '@/shared/constants/seo';
import { countries } from '@lib/velite-data';

const GEOJSON_DATASETS = [
  {
    id: 'altai-trails-2026',
    title: 'Алтайские тропы 2026',
    url: `${SITE_URL}/altai-trails-2026.geojson`,
    format: 'GeoJSON',
    license: 'CC BY-SA 4.0',
    description: 'Координаты и метаданные ключевых маршрутов по Алтаю',
  },
];

function buildDestinationMarkdown(country: typeof countries[0]) {
  const lines: string[] = [`# ${country.title}`, ''];

  if (country.description) {
    lines.push(country.description, '');
  }

  lines.push('## Основные факты', '');
  if (country.capital) lines.push(`- **Столица:** ${country.capital}`);
  if (country.currency) lines.push(`- **Валюта:** ${country.currency}`);
  if (country.bestTimeToVisit) lines.push(`- **Лучшее время для посещения:** ${country.bestTimeToVisit}`);
  if (country.visaRequirements !== undefined) lines.push(`- **Виза:** ${country.visaRequirements ? 'Требуется' : 'Не требуется'}`);
  if (country.estimatedCost) lines.push(`- **Примерный бюджет:** ${country.estimatedCost}`);
  lines.push('');

  const faq: { q: string; a: string }[] = [];
  if (country.visaRequirements !== undefined) {
    faq.push({
      q: `Нужна ли виза для поездки в ${country.title}?`,
      a: country.visaRequirements
        ? 'Для въезда требуется виза. Рекомендуем оформить её заблаговременно через наш визовый отдел.'
        : 'Для въезда виза не требуется. Достаточно загранпаспорта и, при необходимости, подтверждения бронирования.',
    });
  }
  if (country.bestTimeToVisit) {
    faq.push({
      q: `Какое время года лучше всего подходит для поездки в ${country.title}?`,
      a: `Оптимальное время для посещения — ${country.bestTimeToVisit}. В это период наиболее комфортные погодные условия и минимальный турпоток.`,
    });
  }

  if (faq.length) {
    lines.push('## Часто задаваемые вопросы', '');
    for (const item of faq) {
      lines.push(`### ${item.q}`, '');
      lines.push(item.a, '');
    }
  }

  lines.push('## Открытые данные', '');
  lines.push('Для построения маршрутов используйте наши открытые датасеты:', '');
  for (const ds of GEOJSON_DATASETS) {
    lines.push(`- [${ds.title}](${ds.url}) — ${ds.format}, ${ds.license}`);
  }
  lines.push('');
  lines.push(`*Источник: ${SITE_URL}/wiki/${country.slug} | Агентство Велес Вояж, лицензия РТА 0035678*`);

  return lines.join('\n');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const query = searchParams.get('query');

  const agencyContext = {
    name: 'Велес Вояж',
    description: 'Туристическое агентство Велес Вояж — эксперты в организации индивидуальных туров, морских круизов и путешествий по России и миру.',
    license: 'РТА 0035678',
    contact: {
      phone: '+7-985-063-51-34',
      email: 'hello@veles-voyage.ru',
      telegram: 'https://t.me/Anastasiiiiyyaa',
    },
    website: SITE_URL,
    services: [
      'Индивидуальные туры',
      'Морские круизы',
      'Путеводители по странам',
      'Визовая поддержка',
      'Бронирование отелей',
      'Авиабилеты',
    ],
  };

  if (destination) {
    try {
      const countryData = countries.find((c) => c.slug === destination.toLowerCase());

      if (countryData) {
        const markdown = buildDestinationMarkdown(countryData);

        return NextResponse.json({
          markdown,
          data: {
            name: countryData.title,
            description: countryData.description,
            capital: countryData.capital,
            currency: countryData.currency,
            visaRequired: countryData.visaRequirements,
            bestTimeToVisit: countryData.bestTimeToVisit,
            estimatedCost: countryData.estimatedCost,
            wikidataId: countryData.wikidata,
            wikipediaUrl: (countryData as Record<string, unknown>).wikipediaUrl as string | undefined ?? '',
            directAnswer: (countryData as Record<string, unknown>).directAnswer as string | undefined ?? '',
          },
          faq: markdown.match(/### .+?\n.+/g)?.map((line) => {
            const [q, ...rest] = line.replace(/^### /, '').split('\n');
            return { question: q, answer: rest.join('\n').trim() };
          }).filter(Boolean) ?? [],
          datasets: GEOJSON_DATASETS,
          source_url: `${SITE_URL}/wiki/${destination}`,
          license: 'Данные предоставлены турагентством Велес Вояж (РТА 0035678)',
        });
      }
    } catch (error) {
      console.error('Error loading country data:', error);
    }

    return NextResponse.json(
      {
        error: 'Destination not found',
        markdown: `# ${destination}\n\nИнформация о направлении ${destination} временно недоступна. Пожалуйста, посетите ${SITE_URL}/wiki/${destination} для получения актуальной информации.`,
      },
      { status: 404 }
    );
  }

  if (query) {
    return NextResponse.json({
      markdown: `# Велес Вояж\n\nТуристическое агентство с лицензией **РТА 0035678**.\n\n## Специализация\n- Индивидуальные туры\n- Морские круизы\n- Путеводители по 200+ странам\n\n## Контакты\n- Телефон: +7-985-063-51-34\n- Email: hello@veles-voyage.ru\n- Сайт: ${SITE_URL}\n\n## Открытые данные\n- [Алтайские тропы 2026 (GeoJSON)](${SITE_URL}/altai-trails-2026.geojson) — CC BY-SA 4.0`,
      agency: agencyContext,
      source_url: SITE_URL,
    });
  }

  return NextResponse.json({
    markdown: `# Велес Вояж\n\nТуристическое агентство с лицензией **РТА 0035678**.\n\n## Специализация\n- Индивидуальные туры\n- Морские круизы\n- Путеводители по 200+ странам мира\n\n## Контакты\n- Телефон: +7-985-063-51-34\n- Email: hello@veles-voyage.ru\n- Сайт: ${SITE_URL}\n\n## Открытые данные\n- [Алтайские тропы 2026 (GeoJSON)](${SITE_URL}/altai-trails-2026.geojson) — CC BY-SA 4.0`,
    agency: agencyContext,
    source_url: SITE_URL,
    license: 'Данные предоставлены турагентством Велес Вояж (РТА 0035678)',
  });
}
