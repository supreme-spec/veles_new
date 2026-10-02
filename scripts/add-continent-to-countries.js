const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|\r|$)/;

// Карта стран по континентам
const countryToContinent = {
  // Европа
  'albania': 'europe',
  'andorra': 'europe',
  'austria': 'europe',
  'belarus': 'europe',
  'belgium': 'europe',
  'bosnia-herzegovina': 'europe',
  'bulgaria': 'europe',
  'croatia': 'europe',
  'cyprus': 'europe',
  'czech': 'europe',
  'czechia': 'europe',
  'denmark': 'europe',
  'estonia': 'europe',
  'finland': 'europe',
  'france': 'europe',
  'germany': 'europe',
  'greece': 'europe',
  'hungary': 'europe',
  'iceland': 'europe',
  'ireland': 'europe',
  'italy': 'europe',
  'kosovo': 'europe',
  'latvia': 'europe',
  'liechtenstein': 'europe',
  'lithuania': 'europe',
  'luxembourg': 'europe',
  'malta': 'europe',
  'moldova': 'europe',
  'monaco': 'europe',
  'montenegro': 'europe',
  'netherlands': 'europe',
  'north-macedonia': 'europe',
  'norway': 'europe',
  'poland': 'europe',
  'portugal': 'europe',
  'romania': 'europe',
  'russia': 'europe',
  'san-marino': 'europe',
  'serbia': 'europe',
  'slovakia': 'europe',
  'slovenia': 'europe',
  'spain': 'europe',
  'sweden': 'europe',
  'switzerland': 'europe',
  'uk': 'europe',
  'ukraine': 'europe',
  'vatican': 'europe',

  // Азия
  'afghanistan': 'asia',
  'armenia': 'asia',
  'azerbaijan': 'asia',
  'bahrain': 'asia',
  'bangladesh': 'asia',
  'bhutan': 'asia',
  'brunei': 'asia',
  'cambodia': 'asia',
  'china': 'asia',
  'georgia': 'asia',
  'india': 'asia',
  'indonesia': 'asia',
  'iran': 'asia',
  'iraq': 'asia',
  'israel': 'asia',
  'japan': 'asia',
  'jordan': 'asia',
  'kazakhstan': 'asia',
  'kuwait': 'asia',
  'kyrgyzstan': 'asia',
  'laos': 'asia',
  'lebanon': 'asia',
  'malaysia': 'asia',
  'maldives': 'asia',
  'mongolia': 'asia',
  'myanmar': 'asia',
  'nepal': 'asia',
  'north-korea': 'asia',
  'oman': 'asia',
  'pakistan': 'asia',
  'palestine': 'asia',
  'philippines': 'asia',
  'qatar': 'asia',
  'saudi-arabia': 'asia',
  'singapore': 'asia',
  'south-korea': 'asia',
  'sri-lanka': 'asia',
  'syria': 'asia',
  'taiwan': 'asia',
  'tajikistan': 'asia',
  'thailand': 'asia',
  'timor-leste': 'asia',
  'turkey': 'asia',
  'turkmenistan': 'asia',
  'uae': 'asia',
  'uzbekistan': 'asia',
  'vietnam': 'asia',
  'yemen': 'asia',

  // Северная Америка
  'canada': 'northAmerica',
  'mexico': 'northAmerica',
  'usa': 'northAmerica',
  'bahamas': 'northAmerica',
  'barbados': 'northAmerica',
  'belize': 'northAmerica',
  'costa-rica': 'northAmerica',
  'cuba': 'northAmerica',
  'dominica': 'northAmerica',
  'dominican-republic': 'northAmerica',
  'el-salvador': 'northAmerica',
  'grenada': 'northAmerica',
  'guatemala': 'northAmerica',
  'haiti': 'northAmerica',
  'honduras': 'northAmerica',
  'jamaica': 'northAmerica',
  'nicaragua': 'northAmerica',
  'panama': 'northAmerica',
  'saint-kitts-and-nevis': 'northAmerica',
  'saint-lucia': 'northAmerica',
  'saint-vincent-and-the-grenadines': 'northAmerica',
  'trinidad-and-tobago': 'northAmerica',

  // Южная Америка
  'argentina': 'southAmerica',
  'bolivia': 'southAmerica',
  'brazil': 'southAmerica',
  'chile': 'southAmerica',
  'colombia': 'southAmerica',
  'ecuador': 'southAmerica',
  'guyana': 'southAmerica',
  'paraguay': 'southAmerica',
  'peru': 'southAmerica',
  'suriname': 'southAmerica',
  'uruguay': 'southAmerica',
  'venezuela': 'southAmerica',

  // Африка
  'algeria': 'africa',
  'angola': 'africa',
  'benin': 'africa',
  'botswana': 'africa',
  'burkina-faso': 'africa',
  'burundi': 'africa',
  'cabo-verde': 'africa',
  'cameroon': 'africa',
  'central-african-republic': 'africa',
  'chad': 'africa',
  'comoros': 'africa',
  'congo': 'africa',
  'cote-divoire': 'africa',
  'djibouti': 'africa',
  'egypt': 'africa',
  'equatorial-guinea': 'africa',
  'eritrea': 'africa',
  'eswatini': 'africa',
  'ethiopia': 'africa',
  'gabon': 'africa',
  'gambia': 'africa',
  'ghana': 'africa',
  'guinea': 'africa',
  'guinea-bissau': 'africa',
  'kenya': 'africa',
  'lesotho': 'africa',
  'liberia': 'africa',
  'libya': 'africa',
  'madagascar': 'africa',
  'malawi': 'africa',
  'mali': 'africa',
  'mauritania': 'africa',
  'mauritius': 'africa',
  'morocco': 'africa',
  'mozambique': 'africa',
  'namibia': 'africa',
  'niger': 'africa',
  'nigeria': 'africa',
  'rwanda': 'africa',
  'sao-tome-and-principe': 'africa',
  'senegal': 'africa',
  'seychelles': 'africa',
  'sierra-leone': 'africa',
  'somalia': 'africa',
  'south-africa': 'africa',
  'south-sudan': 'africa',
  'sudan': 'africa',
  'tanzania': 'africa',
  'togo': 'africa',
  'tunisia': 'africa',
  'uganda': 'africa',
  'western-sahara': 'africa',
  'zambia': 'africa',
  'zimbabwe': 'africa',

  // Океания
  'australia': 'oceania',
  'fiji': 'oceania',
  'kiribati': 'oceania',
  'marshall-islands': 'oceania',
  'micronesia': 'oceania',
  'nauru': 'oceania',
  'new-zealand': 'oceania',
  'palau': 'oceania',
  'papua-new-guinea': 'oceania',
  'samoa': 'oceania',
  'solomon-islands': 'oceania',
  'tonga': 'oceania',
  'tuvalu': 'oceania',
  'vanuatu': 'oceania',
};

// Путь к директории с файлами стран
const countriesDir = path.join(__dirname, '..', 'src', 'content', 'countries');

// Получаем список всех MDX файлов
const mdxFiles = fs.readdirSync(countriesDir).filter(file => file.endsWith('.mdx'));

console.log(`Найдено ${mdxFiles.length} файлов стран`);

let updatedCount = 0;

mdxFiles.forEach(filename => {
  const filePath = path.join(countriesDir, filename);
  const countryId = filename.replace('.mdx', '');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const match = fileContent.trim().match(FRONTMATTER_RE);
    const data = match ? yaml.load(match[1]) : {};
    const content = match ? fileContent.slice(match[0].length).trim() : fileContent;

    // Проверяем, есть ли уже поле continent
    const placeholderContinents = ['Континент', 'Европа', 'Азия', 'Северная Америка', 'Южная Америка', 'Африка', 'Океания'];
    if (!data.continent || placeholderContinents.includes(data.continent)) {
      const continent = countryToContinent[countryId] || 'other';

      // Добавляем поле continent в frontmatter
      data.continent = continent;

      // Формируем новый контент с обновленным frontmatter
      const yamlContent = yaml.stringify(data);
      const newData = `---\n${yamlContent}---\n${content}`;

      // Записываем обновленный файл
      fs.writeFileSync(filePath, newData, 'utf8');

      console.log(`✓ Обновлен: ${countryId} -> ${continent}`);
      updatedCount++;
    } else {
      console.log(`• Уже есть: ${countryId} (${data.continent})`);
    }
  } catch (error) {
    console.error(`✗ Ошибка при обработке ${filename}:`, error.message);
  }
});

console.log(`\n✅ Обновлено ${updatedCount} файлов из ${mdxFiles.length}`);
