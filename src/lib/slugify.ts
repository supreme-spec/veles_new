/**
 * Утилиты транслитерации русских названий в латинские URL-слаги.
 *
 * Используется для перевода URL городов/регионов с кириллицы на латиницу
 * (Entity-Based URLs) при сохранении стабильных, предсказуемых слагов.
 * Транслитерация выполнена по ГОСТ 7.79-2000 (система B) — это стандартный,
 * ожидаемый поисковиками (Google/Яндекс) вид, например «Москва» → «moskva».
 */

// Карта транслитерации русских букв (строчные)
const RU_TO_LATIN: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
  з: 'z', и: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
  ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e',
  ю: 'yu', я: 'ya',
};

/**
 * Точные переопределения для сущностей, где стандартная транслитерация
 * недостаточно «узнаваема» для связки с глобальной базой знаний.
 * Ключ — название в нижнем регистре, значение — целевой латинский слаг.
 * По умолчанию пусто: транслитерация даёт корректный, ожидаемый вид.
 */
export const CITY_SLUG_OVERRIDES: Record<string, string> = {
  // Основные города — короткие, узнаваемые слаги
  'москва': 'moscow',
  'санкт-петербург': 'sankt-peterburg',
  'новосибирск': 'novosibirsk',
  'екатеринбург': 'ekaterinburg',
  'казань': 'kazan',
  'нижний новгород': 'nizhny-novgorod',
  'красноярск': 'krasnoyarsk',
  'челябинск': 'chelyabinsk',
  'самара': 'samara',
  'уфа': 'ufa',
  'ростов-на-дону': 'rostov-on-don',
  'краснодар': 'krasnodar',
  'омск': 'omsk',
  'воронеж': 'voronezh',
  'пермь': 'perm',
  'волгоград': 'volgograd',
  'саратов': 'saratov',
  'тюмень': 'tyumen',
  'иркутск': 'irkutsk',
  'барнаул': 'barnaul',
  'ульяновск': 'ulyanovsk',
  'владивосток': 'vladivostok',
  'ярославль': 'yaroslavl',
  'йошкар-ола': 'yoshkar-ola',
  'хабаровск': 'khabarovsk',
  'махачкала': 'makhachkala',
  'томск': 'tomsk',
  'оренбург': 'orenburg',
  'кемерово': 'kemerovo',
  'новороссийск': 'novorossiysk',
  'астрахань': 'astrakhan',
  'пенза': 'penza',
  'липецк': 'lipetsk',
  'киров': 'kirov',
  'чебоксары': 'cheboksary',
  'калининград': 'kaliningrad',
  'тверь': 'tver',
  'сочи': 'sochi',
  'ставрополь': 'stavropol',
  'улан-удэ': 'ulan-ude',
  'магнитогорск': 'magnitogorsk',
  'владикавказ': 'vladikavkaz',
  'сургут': 'surgut',
  'вологда': 'vologda',
  'симферополь': 'simferopol',
  'белгород': 'belgorod',
  'новокузнецк': 'novokuznetsk',
  'якутск': 'yakutsk',
  'брянск': 'bryansk',
  'курган': 'kurgan',
  'кострома': 'kostroma',
  'орск': 'orsk',
  'братск': 'bratsk',
  'шахты': 'shakhty',
  'северск': 'seversk',
  'энгельс': 'engels',
  'армавир': 'armavir',
  'королёв': 'korolyov',
  'красногорск': 'krasnogorsk',
  'химки': 'khimki',
  'балашиха': 'balashikha',
  'подольск': 'podolsk',
  'когалым': 'kogalym',
  'нижнекамск': 'nizhnekamsk',
  'анадырь': 'anadyr',
  'петрозаводск': 'petrozavodsk',
  'мурманск': 'murmansk',
  'сыктывкар': 'syktyvkar',
  'абакан': 'abakan',
  'севастополь': 'sevastopol',

  // Республики и регионы — короткие, ИИ-узнаваемые слаги
  'республика марий эл': 'mari-el',
  'республика саха (якутия)': 'saha-yakutiya',
  'красноярский край': 'krasnoyarsk-kray',
  'краснодарский край': 'krasnodar-kray',
  'ставропольский край': 'stavropol-kray',
  'пермский край': 'permskiy-kray',
  'хабаровский край': 'habarovsky-kray',
  'приморский край': 'primorsky-kray',
  'московская область': 'moskovskaya-oblast',
  'ленинградская область': 'leningradskaya-oblast',
  'крым': 'crimea',
  'республика крым': 'respublika-krym',
  'донецк': 'donetsk',
  'луганск': 'luhansk',
  'запорожье': 'zaporozhye',
  'херсон': 'kherson',
  'республика татарстан': 'respublika-tatarstan',
  'республика башкортостан': 'bashkortostan',
  'республика дагестан': 'dagestan',
  'республика ингушетия': 'ingushetia',
  'чеченская республика': 'chechnya',
  'кабардино-балкария': 'kabardino-balkariya',
  'карачаево-черкесия': 'karachay-cherkessiya',
  'северная осетия': 'north-osetia',
  'республика адыгея': 'adygeya',
  'республика калмыкия': 'kalmykiya',
  'республика алтай': 'altay',
  'республика тыва (тува)': 'tyva',
  'республика хакасия': 'hakasiya',
  'республика бурятия': 'buryatiya',
  'республика карелия': 'kareliya',
  'республика коми': 'komi',
  'удмуртская республика': 'udmurtiya',
  'чувашская республика': 'chuvashiya',
  'республика мордовия': 'mordoviya',
  'забайкальский край': 'zabaykalsky-kray',
  'камчатский край': 'kamchatka-kray',
  'амурская область': 'amurskaya-oblast',
  'волгоградская область': 'volgogradskaya-oblast',
  'вологодская область': 'vologodskaya-oblast',
  'воронежская область': 'voronezhskaya-oblast',
  'ивановская область': 'ivanovskaya-oblast',
  'иркутская область': 'irkutskaya-oblast',
  'калужская область': 'kaluzhskaya-oblast',
  'кемеровская область': 'kemerovskaya-oblast',
  'кировская область': 'kirovskaya-oblast',
  'костромская область': 'kostromskaya-oblast',
  'курганская область': 'kurganskaya-oblast',
  'курская область': 'kurskaya-oblast',
  'липецкая область': 'lipetskaya-oblast',
  'магаданская область': 'magadanskaya-oblast',
  'мурманская область': 'murmanskaya-oblast',
  'нижегородская область': 'nizhegorodskaya-oblast',
  'новгородская область': 'novgorodskaya-oblast',
  'новосибирская область': 'novosibirskaya-oblast',
  'омская область': 'omskaya-oblast',
  'оренбургская область': 'orenburgskaya-oblast',
  'орловская область': 'orlovskaya-oblast',
  'пензенская область': 'penzenskaya-oblast',
  'псковская область': 'pskovskaya-oblast',
  'ростовская область': 'rostovskaya-oblast',
  'рязанская область': 'ryazanskaya-oblast',
  'сахалинская область': 'sakhalinskaya-oblast',
  'самарская область': 'samarskaya-oblast',
  'саратовская область': 'saratovskaya-oblast',
  'смоленская область': 'smolenskaya-oblast',
  'свердловская область': 'sverdlovskaya-oblast',
  'тамбовская область': 'tambovskaya-oblast',
  'тверская область': 'tverskaya-oblast',
  'томская область': 'tomskaya-oblast',
  'тульская область': 'tulskaya-oblast',
  'тюменская область': 'tyumenskaya-oblast',
  'ульяновская область': 'ulyanovskaya-oblast',
  'челябинская область': 'chelyabinskaya-oblast',
  'ярославская область': 'yaroslavskaya-oblast',
};

/**
 * Преобразует русское название города/региона в стабильный латинский URL-слаг.
 * Идемпотентно: повторный вызов на уже латинском слаге возвращает его же.
 */
export function generateCitySlug(name: string): string {
  const key = name.toLowerCase().trim();
  if (CITY_SLUG_OVERRIDES[key]) return CITY_SLUG_OVERRIDES[key];

  const transliterated = key
    .split('')
    .map((ch) => RU_TO_LATIN[ch] ?? ch)
    .join('');

  return transliterated
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function slugify(text: string): string {
  const key = text.toLowerCase().trim();
  const transliterated = key
    .split('')
    .map((ch) => RU_TO_LATIN[ch] ?? ch)
    .join('');

  return transliterated
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || text.toLowerCase();
}
