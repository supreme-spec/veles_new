import Link from 'next/link';
import { getWikiPages } from '@/shared/data/wikiPages-mdx';
import { getAllPlacesWithCountries, getPlacesStats, normalizeCountryName } from '@/shared/utils/getAllPlacesData';
import { generateUniversalMetadata, generateUniversalSchemas, generateItemListSchema } from '@/lib/seo/universalSEO';
import { SchemaScripts } from '@/components/SchemaScripts';
import { PlacesFilter } from '@/components/PlacesFilter';
import { SITE_LAST_UPDATED_ISO, SITE_LAST_UPDATED_DISPLAY } from '@/shared/constants/seo';

export async function generateMetadata() {
  const stats = await getPlacesStats();
  const totalPlaces = stats.total;

  return generateUniversalMetadata({
    title: `Ключевые места мира: ${totalPlaces}+ городов, достопримечательностей и курортов | Велес Вояж`,
    description: `Каталог ${totalPlaces}+ ключевых мест из всех стран мира: ${stats.cities} городов, ${stats.attractions} достопримечательностей, ${stats.resorts} курортов и ${stats.airports} аэропортов. Координаты, описания, ссылки на путеводители по странам.`,
    url: '/wiki/places',
    type: 'places',
    keywords: [
      'ключевые места мира',
      'города мира список',
      'достопримечательности всех стран',
      'курорты мира',
      'аэропорты мира',
      'туристические места',
      'путеводитель по местам',
      'карта достопримечательностей',
      'интерактивная карта мест',
    ],
    faqs: [
      {
        question: 'Какие самые красивые места мира для посещения с детьми?',
        answer: 'Самые удобные направления с детьми — это города Западной Европы (Париж, Барселона, Рим), курорты Турции и Египта, а также национальные парки России (Байкал, Алтай, Кавказ). Там развита инфраструктура, есть детские клубы и медицинские учреждения.',
      },
      {
        question: 'Сколько дней нужно для осмотра главных достопримечательностей?',
        answer: 'На осмотр ключевых достопримечательностей одного города обычно требуется 2-4 дня. Для целой страны достаточно 7-14 дней. Если вы едете в первый раз, лучше добавить 1-2 дня на акклиматизацию.',
      },
      {
        question: 'Какая валюта нужна в самых популярных странах?',
        answer: 'В Евросоюзе — евро (EUR), в Турции — турецкая лира (TRY), в Египте — египетский фунт (EGP), в ОАЭ — дирхам (AED), в Таиланде — бат (THB). В России используется рубль (RUB).',
      },
      {
        question: 'Лучшее время для поездки в популярные направления?',
        answer: 'Турция и Египет — с апреля по октябрь, ОАЭ — с ноября по март, Таиланд — с ноября по февраль, Европа — с мая по сентябрь. Для горнолыжных курортов — с декабря по апрель.',
      },
    ],
  });
}

export default async function PlacesPage() {
  const allPlaces = await getAllPlacesWithCountries();
  const stats = await getPlacesStats();
  const wikiPages = await getWikiPages();
  const countries = Object.entries(wikiPages).map(([id, page]) => ({
    id,
    name: normalizeCountryName(page.title),
  })).sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  const baseSchemas = await generateUniversalSchemas({
    title: 'Ключевые места мира',
    description: `Каталог ${stats.total}+ ключевых мест из всех стран мира: города, достопримечательности, курорты и аэропорты.`,
    url: '/wiki/places',
    type: 'places',
    faqs: [
      {
        question: 'Какие самые красивые места мира для посещения с детьми?',
        answer: 'Самые удобные направления с детьми — это города Западной Европы (Париж, Барселона, Рим), курорты Турции и Египта, а также национальные парки России (Байкал, Алтай, Кавказ).',
      },
      {
        question: 'Сколько дней нужно для осмотра главных достопримечательностей?',
        answer: 'На осмотр ключевых достопримечательностей одного города обычно требуется 2-4 дня. Для целой страны достаточно 7-14 дней.',
      },
      {
        question: 'Какая валюта нужна в самых популярных странах?',
        answer: 'В Евросоюзе — евро (EUR), в Турции — турецкая лира (TRY), в Египте — египетский фунт (EGP), в ОАЭ — дирхам (AED).',
      },
      {
        question: 'Лучшее время для поездки в популярные направления?',
        answer: 'Турция и Египет — с апреля по октябрь, ОАЭ — с ноября по март, Таиланд — с ноября по февраль, Европа — с мая по сентябрь.',
      },
    ],
  });

  const itemListSchema = generateItemListSchema({
    title: 'Ключевые места мира',
    description: 'Каталог ключевых мест из всех стран мира: города, достопримечательности, курорты и аэропорты.',
    url: '/wiki/places',
    items: allPlaces.slice(0, 1000).map(place => ({
      name: place.name,
      description: place.description || '',
      url: `/wiki/${place.countryId}`,
      geo: { latitude: place.lat, longitude: place.lng },
      type: place.type,
      countryName: place.countryName,
    })),
    maxItems: 1000,
  });

  const schemas = [...baseSchemas, itemListSchema];

  const topCities = allPlaces.filter(p => p.type === 'city').slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-16 md:pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <SchemaScripts schemas={schemas} />

        {/* Speakable summary for voice assistants */}
        <div className="speakable-summary bg-blue-50 border border-blue-100 dark:bg-gray-800 dark:border-gray-700 rounded-xl p-6 mb-8">
          <p className="text-lg text-blue-900 dark:text-blue-100">
            В каталоге ключевых мест Велес Вояж собрано {stats.total} объектов в {Object.keys(wikiPages).length} странах мира:
            {stats.cities} городов, {stats.attractions} достопримечательностей, {stats.resorts} курортов и {stats.airports} аэропортов.
            Каждое место содержит координаты, описание и ссылку на подробный путеводитель по стране.
          </p>
        </div>

        {/* E-E-A-T блок */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">✍️</div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Экспертная редакция</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Автор и проверка фактов: <strong>Велес Вояж | Экспертный отдел туризма</strong>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Последняя проверка: {new Date(SITE_LAST_UPDATED_ISO).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Информация актуальна на {SITE_LAST_UPDATED_DISPLAY}
              </p>
            </div>
          </div>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Ключевые места мира
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Интерактивный каталог городов, достопримечательностей, курортов и аэропортов
          </p>
        </div>

        {/* Популярные направления (Hub & Spoke) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Популярные направления</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topCities.map((place) => (
              <Link
                key={`${place.countryId}-${place.name}`}
                href={`/wiki/${place.countryId}`}
                className="group block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <h3 className="text-blue-600 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300 text-lg font-semibold transition-colors mb-2">
                  {place.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-200 line-clamp-2 mb-3">
                  {place.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-300 transition-colors font-medium">
                  <span className="mr-1" aria-hidden="true">→</span>
                  <span>Подробный путеводитель</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO-контент */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 prose max-w-none dark:prose-invert">
          <h2>Каталог ключевых мест для путешествий по всему миру</h2>
          <p>
            На этой странице собраны ключевые места из всех стран мира: от крупнейших городов
            и знаменитых достопримечательностей до популярных курортов и международных аэропортов.
            Каждое место содержит подробное описание, географические координаты и ссылку на
            подробный путеводитель по стране.
          </p>
          <p>
            Используйте фильтры для поиска мест по типу (города, достопримечательности, курорты,
            аэропорты) или по стране. Все места отмечены на интерактивной карте и доступны для
            просмотра в Яндекс.Картах, Google Maps или OpenStreetMap.
          </p>
        </div>

        {/* Клиентский фильтр с прогрессивным улучшением */}
        <PlacesFilter allPlaces={allPlaces} countries={countries} />

        {/* Навигация */}
        <div className="mt-12 text-center">
          <Link
            href="/wiki"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <span aria-hidden="true">←</span>
            <span>Вернуться к энциклопедии стран</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
