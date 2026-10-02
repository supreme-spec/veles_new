const fs = require('fs');
const path = require('path');

function readFile(resourcePath) {
  return fs.readFileSync(path.join(__dirname, '..', resourcePath), 'utf8');
}

function extractArray(fileContent, varName) {
  const match = fileContent.match(new RegExp(`const\\s+${varName}\\s*=\\s*Array\\.from\\(new Set\\(\\[([\\s\\S]*?)\\]\\)\\)\\.sort\\(\\);`));
  if (!match) return [];
  const items = [];
  const regex = /'([^']+)'/g;
  let m;
  while ((m = regex.exec(match[1])) !== null) {
    items.push(m[1]);
  }
  return items;
}

function extractCityCoordinates(fileContent) {
  const match = fileContent.match(/export const CITY_COORDINATES = \{([\s\S]*?)\};/);
  if (!match) return {};
  
  const result = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;
    
    const entryMatch = trimmed.match(/^'([^']+)'\s*:\s*\{\s*latitude:\s*([\d.]+),\s*longitude:\s*([\d.]+),\s*region:\s*'([^']*)'[\s]*\},?$/);
    if (entryMatch) {
      result[entryMatch[1]] = {
        latitude: parseFloat(entryMatch[2]),
        longitude: parseFloat(entryMatch[3]),
        region: entryMatch[4]
      };
    }
  }
  
  return result;
}

function extractDepartureCities(fileContent) {
  const match = fileContent.match(/export const DEPARTURE_CITIES_DATA: Record<string, any> = \{([\s\S]*?)\};/);
  if (!match) return {};
  
  const result = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let currentObj = {};
  let inObject = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;
    
    if (!inObject) {
      const keyMatch = trimmed.match(/^'([^']+)'\s*:\s*\{/);
      if (keyMatch) {
        currentKey = keyMatch[1];
        currentObj = {};
        inObject = true;
      }
    } else {
      if (trimmed === '},') {
        result[currentKey] = currentObj;
        inObject = false;
        currentKey = null;
      } else {
        const propMatch = trimmed.match(/(\w+)\s*:\s*(.+),?$/);
        if (propMatch) {
          let val = propMatch[2].trim();
          if (val.startsWith("'") && val.endsWith("'")) {
            val = val.slice(1, -1);
          }
          currentObj[propMatch[1]] = val;
        }
      }
    }
  }
  
  if (currentKey && Object.keys(currentObj).length > 0) {
    result[currentKey] = currentObj;
  }
  
  return result;
}

function extractAirports(fileContent) {
  const match = fileContent.match(/export const RUSSIAN_AIRPORTS: RussianAirport\[\] = \[([\s\S]*?)\];/);
  if (!match) return [];
  
  const airports = [];
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('{')) continue;
    
    const nameMatch = trimmed.match(/name:\s*'([^']+)'/);
    const iataMatch = trimmed.match(/iata:\s*'([^']+)'/);
    const cityMatch = trimmed.match(/citySlug:\s*'([^']+)'/);
    const latMatch = trimmed.match(/latitude:\s*([\d.]+)/);
    const lonMatch = trimmed.match(/longitude:\s*([\d.]+)/);
    
    if (nameMatch && cityMatch && latMatch && lonMatch) {
      airports.push({
        name: nameMatch[1],
        iata: iataMatch ? iataMatch[1] : '',
        citySlug: cityMatch[1],
        latitude: parseFloat(latMatch[1]),
        longitude: parseFloat(lonMatch[1])
      });
    }
  }
  
  return airports;
}

function extractExistingManualContent(fileContent) {
  const result = {};
  const lines = fileContent.split('\n');
  let currentKey = null;
  let currentContent = {};
  let inObject = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('export')) continue;
    
    if (!inObject) {
      const keyMatch = trimmed.match(/^'([^']+)'\s*:\s*\{/);
      if (keyMatch) {
        currentKey = keyMatch[1];
        currentContent = {};
        inObject = true;
        continue;
      }
    } else {
      if (trimmed === '},') {
        if (currentKey) {
          result[currentKey] = currentContent;
        }
        currentKey = null;
        inObject = false;
        continue;
      }
      
      const propMatch = trimmed.match(/^(\w+)\s*:\s*'([^']*)'(?:,|\s*$)/);
      if (propMatch) {
        currentContent[propMatch[1]] = propMatch[2];
      }
    }
  }
  
  return result;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestAirport(coords, airports) {
  if (!coords) return null;
  return airports
    .map(a => ({
      ...a,
      distanceKm: haversineKm(coords.latitude, coords.longitude, a.latitude, a.longitude)
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)[0] || null;
}

function getDistrictForRegion(region) {
  const r = (region || '').toLowerCase();
  if (r.includes('москва') || r.includes('московская')) return 'Центральный';
  if (r.includes('санкт-петербург') || r.includes('ленинградская') || r.includes('калининградская')) return 'Северо-Западный';
  if (r.includes('крым') || r.includes('севастополь') || r.includes('ростовская') || r.includes('волгоградская') || r.includes('астраханская') || r.includes('краснодарский')) return 'Южный';
  if (r.includes('дагестан') || r.includes('ингушетия') || r.includes('кабардино') || r.includes('карачаево') || r.includes('северная осетия') || r.includes('чеченская') || r.includes('ставропольский')) return 'Северо-Кавказский';
  if (r.includes('свердловская') || r.includes('челябинская') || r.includes('курганская') || r.includes('тюменская') || r.includes('ханты') || r.includes('ямало') || r.includes('оренбургская')) return 'Уральский';
  if (r.includes('новосибирская') || r.includes('омская') || r.includes('томская') || r.includes('кемеровская') || r.includes('алтайский') || r.includes('красноярский') || r.includes('республика алтай') || r.includes('республика тыва') || r.includes('республика хакасия') || r.includes('иркутская') || r.includes('забайкальский') || r.includes('сахалинская')) return 'Сибирский';
  if (r.includes('приморский') || r.includes('хабаровский') || r.includes('камчатский') || r.includes('амурская') || r.includes('республика саха') || r.includes('магаданская') || r.includes('чукотский')) return 'Дальневосточный';
  if (r.includes('республика алтай') || r.includes('республика тыва') || r.includes('республика хакасия') || r.includes('республика бурятия')) return 'Сибирский';
  if (r.includes('республика татарстан') || r.includes('республика башкортостан') || r.includes('республика мордовия') || r.includes('республика чувашия') || r.includes('республика марий эл') || r.includes('республика удмуртия')) return 'Приволжский';
  if (r.includes('республика коми') || r.includes('республика карелия') || r.includes('архангельская') || r.includes('вологодская') || r.includes('мурманская')) return 'Северо-Западный';
  return 'Центральный';
}

function estimateFlightHours(coords, dest) {
  const d = haversineKm(coords.latitude, coords.longitude, dest.lat, dest.lon);
  if (!d) return null;
  return Math.max(1, Math.round(d / 800 + 1.5));
}

function getLatitudeBand(lat) {
  if (lat > 60) return 'северных широтах';
  if (lat < 50) return 'юге России';
  return 'центральной полосе';
}

function getRegionTourism(region) {
  const r = (region || '').toLowerCase();
  if (r.includes('крым') || r.includes('севастополь') || r.includes('краснодарский') || r.includes('адыгея')) return 'побережье Чёрного моря с пляжными курортами и винными маршрутами';
  if (r.includes('дагестан') || r.includes('кабардино') || r.includes('карачаево') || r.includes('северная осетия') || r.includes('чеченская') || r.includes('ингушетия') || r.includes('ставропольский')) return 'высокогорный Кавказ с этнотуризмом, альпинизмом и горными озёрами';
  if (r.includes('калмыкия')) return 'калмыцкие степи, буддийские монастыри, охоту и рыбалку на Волге';
  if (r.includes('калининградская')) return 'Балтийское побережье с замками и янтарными пляжами';
  if (r.includes('ленинградская') || r.includes('псковская') || r.includes('новгородская')) return 'исторические города, крепости и озёра';
  if (r.includes('пермский') || r.includes('свердловская') || r.includes('челябинская') || r.includes('курганская') || r.includes('тюменская') || r.includes('ханты') || r.includes('ямало') || r.includes('оренбургская')) return 'Уральские горы, промышленные города и природные парки';
  if (r.includes('якутия') || r.includes('магаданская') || r.includes('сахалинская') || r.includes('камчатский') || r.includes('приморский') || r.includes('хабаровский') || r.includes('амурская') || r.includes('чукотский') || r.includes('забайкальский')) return 'Тихий океан, вулканы, тайгу и рыбалку';
  if (r.includes('новосибирская') || r.includes('омская') || r.includes('томская') || r.includes('кемеровская') || r.includes('алтайский') || r.includes('красноярский') || r.includes('республика алтай') || r.includes('республика тыва') || r.includes('республика хакасия') || r.includes('иркутская')) return 'горы Алтая, озеро Байкал и сибирскую тайгу';
  if (r.includes('республика татарстан') || r.includes('республика башкортостан') || r.includes('чувашская') || r.includes('мордовия') || r.includes('марий эл') || r.includes('республика удмуртия')) return 'Поволжье с кумыкскими пирогами, мечетями и речными круизами';
  if (r.includes('республика коми') || r.includes('республика карелия') || r.includes('архангельская') || r.includes('вологодская') || r.includes('мурманская')) return 'Крайний Север с озёрами и Соловецкими островами';
  if (r.includes('брянская') || r.includes('курская') || r.includes('липецкая') || r.includes('орловская') || r.includes('тамбовская') || r.includes('воронежская') || r.includes('белгородская')) return 'полесье, исторические усадьбы и природные парки';
  if (r.includes('калужская') || r.includes('тульская') || r.includes('рязанская') || r.includes('владимирская') || r.includes('ивановская') || r.includes('костромская') || r.includes('ярославская') || r.includes('московская') || r.includes('тверская') || r.includes('смоленская')) return 'Золотое кольцо с усадьбами и историческими городами';
  if (r.includes('псковская') || r.includes('орловская') || r.includes('курская') || r.includes('липецкая') || r.includes('воронежская')) return 'исторические города, музеи и природные комплексы';
  if (r.includes('пензенская') || r.includes('саратовская') || r.includes('ульяновская') || r.includes('самарская')) return 'Поволжье с степными просторами и волжскими городами';
  if (r.includes('астраханская') || r.includes('волгоградская') || r.includes('ростовская')) return 'степи, дельту Волги и рыбалку';
  return 'разнообразный отдых и исторические достопримечательности';
}

const DEST_COORDS = {
  turkey: { lat: 36.8969, lon: 30.7133 },
  egypt: { lat: 27.2579, lon: 33.7960 },
  uae: { lat: 25.2048, lon: 55.2708 },
  thailand: { lat: 13.7367, lon: 100.5231 },
};

const allCitiesContent = extractArray(readFile('src/app/cities/all-cities.ts'), 'allCities');
const cityCoordinates = extractCityCoordinates(readFile('src/shared/data/cityCoordinates.ts'));
const departureCitiesData = extractDepartureCities(readFile('src/shared/data/departureCitiesData.ts'));
const russianAirports = extractAirports(readFile('src/shared/data/russianAirports.ts'));

const existingManualContent = extractExistingManualContent(readFile('src/shared/data/cityManualContent.ts'));

console.log('allCities:', allCitiesContent.length);
console.log('coordinates:', Object.keys(cityCoordinates).length);
console.log('departure data:', Object.keys(departureCitiesData).length);
console.log('airports:', russianAirports.length);
console.log('existing manual:', Object.keys(existingManualContent).length);

function cityHash(cityName) {
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) {
    hash = ((hash << 5) - hash) + cityName.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function cleanAirportLabel(label) {
  if (!label) return 'аэропорт региона';
  return label.replace(/'/g, '').replace(/\"/g, '');
}

function generateUniqueContent(cityName) {
  const coords = cityCoordinates[cityName.toLowerCase()] || null;
  const cityData = departureCitiesData[cityName.toLowerCase()] || null;
  const hasRealAirport = !!cityData && !!cityData.airport;
  const region = coords ? coords.region : 'России';
  const districtName = getDistrictForRegion(region);
  const latBand = coords ? getLatitudeBand(coords.latitude) : 'территории России';
  const hash = cityHash(cityName);
  
  let nearestAirport = null;
  if (!hasRealAirport && coords) {
    nearestAirport = findNearestAirport(coords, russianAirports);
  }
  
  const rawAirportLabel = hasRealAirport ? cityData.airport : (nearestAirport ? `${nearestAirport.name} (${Math.round(nearestAirport.distanceKm)} км)` : `аэропорт региона`);
  const airportLabel = cleanAirportLabel(rawAirportLabel);
  
  const flightToTurkey = cityData && cityData.flightTimes && cityData.flightTimes.turkey 
    ? `${cityData.flightTimes.turkey} ч.` 
    : coords ? `≈${estimateFlightHours(coords, DEST_COORDS.turkey) || 'по запросу'} ч.` : 'по запросу';
  const flightToEgypt = cityData && cityData.flightTimes && cityData.flightTimes.egypt 
    ? `${cityData.flightTimes.egypt} ч.` 
    : coords ? `≈${estimateFlightHours(coords, DEST_COORDS.egypt) || 'по запросу'} ч.` : 'по запросу';
  const flightToUAE = cityData && cityData.flightTimes && cityData.flightTimes.uae 
    ? `${cityData.flightTimes.uae} ч.` 
    : coords ? `≈${estimateFlightHours(coords, DEST_COORDS.uae) || 'по запросу'} ч.` : 'по запросу';
  const flightToThailand = cityData && cityData.flightTimes && cityData.flightTimes.thailand 
    ? `${cityData.flightTimes.thailand} ч.` 
    : coords ? `≈${estimateFlightHours(coords, DEST_COORDS.thailand) || 'по запросу'} ч.` : 'по запросу';
  
  const tourismContext = getRegionTourism(region);

  const t = hash % 18;
  
  let overview = '';
  if (t < 6) {
    const openings = [
      `${cityName} — город в ${region}, ${districtName} федеральный округ, где можно заниматься ${tourismContext}. `,
      `В ${region}, в ${districtName} федеральном округе, расположен город ${cityName}, известный благодаря ${tourismContext}. `,
      `${cityName} входит в состав ${districtName} федерального округа, ${region}, и здесь развито ${tourismContext}. `,
      `На территории ${region}, ${districtName} федеральный округ, находится ${cityName} — точка старта для путешествий с ${tourismContext}. `,
      `Город ${cityName} раскинулся в ${districtName} федеральном округе, ${region}, и славится ${tourismContext}. `,
      `В состав ${districtName} федерального округа, ${region}, входит город ${cityName} с его особенным расположением для ${tourismContext}. `
    ];
    overview += openings[hash % openings.length];
    
    overview += `Благодаря положению на ${latBand}, город обеспечивает логистические преимущества для вылетов. `;
    
    const flights = [
      `До Турции ${flightToTurkey}, до Египта ${flightToEgypt}, до ОАЭ ${flightToUAE} и до Таиланда ${flightToThailand}. `,
      `Перелёты до Антальи занимают ${flightToTurkey}, до Хургады — ${flightToEgypt}, до Дубая — ${flightToUAE}, до Паттайи — ${flightToThailand}. `,
      `Расстояние до популярных стран можно преодолеть за ${flightToTurkey} до Турции, ${flightToEgypt} до Египта, ${flightToUAE} до ОАЭ и ${flightToThailand} до Таиланда. `,
      `Из города можно долететь до Антальи за ${flightToTurkey}, до Хургады — за ${flightToEgypt}, до Дубая — за ${flightToUAE}, до Паттайи — за ${flightToThailand}. `,
      `Время в пути до ключевых направлений: Турция — ${flightToTurkey}, Египет — ${flightToEgypt}, ОАЭ — ${flightToUAE}, Таиланд — ${flightToThailand}. `,
      `Курорты находятся в радиусе ${flightToTurkey} до Антальи, ${flightToEgypt} до Хургады, ${flightToUAE} до Дубая и ${flightToThailand} до Паттайи. `
    ];
    overview += flights[(hash >> 2) % flights.length];
    
    const airports = hasRealAirport
      ? [
          `${airportLabel} открывает прямые маршруты в Турцию, Египет, ОАЭ и Таиланд.`,
          `Из ${airportLabel} выполняются прямые чартерные и регулярные рейсы на курорты.`,
          `${airportLabel} обеспечивает прямое авиасообщение с популярными направлениями.`,
          `Прямые рейсы из ${airportLabel} сокращают время в пути и удобны для семейного отдыха.`,
          `${airportLabel} принимает рейсы в Турцию, Египет, ОАЭ и Таиланд без пересадок.`,
          `Вылеты из ${airportLabel} детально проработаны под туристические сезоны и расписания.`
        ]
      : nearestAirport
        ? [
            `Ближайший аэропорт ${nearestAirport.name} находится в ${Math.round(nearestAirport.distanceKm)} км — оттуда выполняются чартерные и регулярные рейсы.`,
            `Рейсы удобно начинать из ${nearestAirport.name} (${Math.round(nearestAirport.distanceKm)} км), где есть регулярные вылеты в туррегионы.`,
            `Логистически выгодно пользоваться ${nearestAirport.name} на расстоянии ${Math.round(nearestAirport.distanceKm)} км — отсюда летают на курорты.`,
            `В ${Math.round(nearestAirport.distanceKm)} км от города расположен ${nearestAirport.name} — удобная точка старта для путешествий.`,
            `Ближайший перевозчик — ${nearestAirport.name} (${Math.round(nearestAirport.distanceKm)} км), откуда можно улететь за границу.`,
            `Трансфер до ${nearestAirport.name} займёт около ${Math.round(nearestAirport.distanceKm / 100 * 2) + 1} часа, а дальше — прямой рейс.`
          ]
        : [
            `Авиапутешествия организуются из ближайших аэропортов региона с удобной логистикой.`,
            `Ближайшие региональные аэропорты позволяют организовать вылеты в любую страну.`,
            `Региональные терминалы обеспечивают комфортные стыковки и трансферы до отелей.`,
            `Вылеты из ближайших аэропортов проходят быстро и без лишних ожиданий.`,
            `Логистика вылетов выстроена через ближайшие аэропорты региона.`,
            `Ближайшие воздушные ворота гарантируют своевременное отправление и чартерные программы.`
          ];
    overview += ' ' + airports[(hash >> 4) % airports.length] + ' ';
    
    const closings = [
      `Мы подбираем туры с учётом сезона, цен и удобства трансфера.`,
      `Наши менеджеры подберут оптимальный вариант под ваши даты и бюджет.`,
      `Мы помогаем с подбором туров, отелей и трансферов.`,
      `Подберите тур с учётом сезона и личных предпочтений.`,
      `Мы настроим поездку под ваш график и бюджет.`,
      `Каждый клиент получает персональный подбор направлений и условий.`
    ];
    overview += closings[(hash >> 6) % closings.length];
  } else if (t < 12) {
    const openings = [
      `Для путешественников из ${cityName} удобны вылеты в Турцию, Египет, ОАЭ и Таиланд. `,
      `Выбирая отдых из ${cityName}, можно сэкономить на перелёте и посетить сразу несколько курортов. `,
      `Жители ${cityName} часто отправляются за границу через удобные авиамаршруты. `,
      `${cityName} — хороший вариант для старта в пляжный отдых и экскурсии. `,
      `Из ${cityName} открываются прямые и стыковочные маршруты на ближний и дальний зарубежье. `,
      `Планируя отпуск из ${cityName}, стоит обратить внимание на разные варианты вылетов. `
    ];
    overview += openings[hash % openings.length];
    
    overview += `${cityName} расположен на ${latBand} ${region}, в ${districtName} федеральном округе. `;
    
    const details = [
      `Город известен ${tourismContext}, поэтому многие совмещают отдых с экскурсиями. `,
      `Местные жители ценят ${tourismContext}, что отражено в туристических предложениях. `,
      `Благодаря природным особенностям, именно отсюда удобно стартовать в neue поездки. `,
      `Специфика региона — ${tourismContext}, поэтому туры отсюда особенно востребованы. `,
      `Ландшафт и инфраструктура создают хорошие условия для путешествий. `,
      `Климат и инфраструктура создают хорошие условия для путешествий. `
    ];
    overview += details[(hash >> 2) % details.length];
    
    overview += `До Антальи ${flightToTurkey}, до Хургады ${flightToEgypt}, до Дубая ${flightToUAE} и до Паттайи ${flightToThailand}. `;
    
    const closing = [
      hasRealAirport
        ? `${airportLabel} открывает прямые рейсы без пересадок на курорты.`
        : nearestAirport
          ? `Ближайший аэропорт ${nearestAirport.name} — ${Math.round(nearestAirport.distanceKm)} км. Оттуда удобно вылетать.`
          : `Ближайшие аэропорты региона позволяют долететь до любого курорта.`
    ];
    overview += closing[0];
  } else {
    const openings = [
      `Если вы живёте в ${cityName}, выбрав правильное направление, можно значительно сэкономить на отдыхе. `,
      `${cityName} даёт хорошие возможности для старта в заграничные поездки благодаря удобной инфраструктуре. `,
      `Из ${cityName} открывается доступ к популярным курортам с оптимальным сочетанием цены и времени в пути. `,
      `Вылеты из ${cityName} часто выгоднее, чем из соседних городов, особенно при раннем бронировании. `,
      `Город ${cityName} предлагает жителям и гостям разумные варианты для международных поездок. `,
      `Жителям ${cityName} доступны как пакетные туры, так и отдельные билеты за границу. `
    ];
    overview += openings[hash % openings.length];
    
    overview += `${cityName} находится на ${latBand} ${region}, в ${districtName} федеральном округе. `;
    
    const details = [
      `Здесь представлено ${tourismContext}, что делает город привлекательным для круглогодичного туризма. `,
      `Благодаря ${tourismContext}, город активно развивает туристические направления. `,
      `Город демонстрирует ${tourismContext} и участвует в международном туристическом обмене. `,
      `Природные особенности региона — ${tourismContext} — набирают популярность у путешественников. `,
      `С каждым сезоном ${cityName} укрепляет позиции как стартовая точка для путешествий. `,
      `Удачное сочетание ${tourismContext} делает город удобным хабом для туристов из округа. `
    ];
    overview += details[(hash >> 2) % details.length];
    
    overview += `Расстояние до Антальи — ${flightToTurkey}, до Хургады — ${flightToEgypt}, до Дубая — ${flightToUAE}, до Паттайи — ${flightToThailand}. `;
    
    const closing = [
      hasRealAirport
        ? `${airportLabel} даёт возможность вылетать без пересадок.`
        : nearestAirport
          ? `Ориентируйтесь на ${nearestAirport.name} (${Math.round(nearestAirport.distanceKm)} км) — это ближайшая точка вылета.`
          : `Вылеты из ближайших аэропортов региона проходят комфортно.`
    ];
    overview += closing[0];
  }

  const highlights = [
    hasRealAirport 
      ? `Аэропорт ${airportLabel} открывает доступ к Турции и Египту без пересадок.`
      : nearestAirport
        ? `Ближайший аэропорт ${nearestAirport.name} — ${Math.round(nearestAirport.distanceKm)} км. Оттуда удобно вылетать.`
        : `Из ближайших аэропортов региона можно улететь в любую страну мира.`,
    `До Антальи: ${flightToTurkey}`,
    `До Хургады: ${flightToEgypt}`,
    `До Дубая: ${flightToUAE}`,
    `До Паттайи: ${flightToThailand}`
  ];
  
  const flightContext = `Из ${cityName} выгодно планировать вылеты по сезону: в мае–октябре — Турция и Египет, ` +
    `в ноябре–апреле — ОАЭ, а с ноября по февраль — Таиланд. ` +
    `Мы учитываем пиковые даты и подбираем оптимальные варианты перелёта.`;
  
  const tips = [];
  if (hasRealAirport) {
    tips.push(`Уточняйте расписание рейсов из ${airportLabel} заранее, особенно на праздники.`);
  } else if (nearestAirport) {
    tips.push(`Забронируйте трансфер до ${nearestAirport.name} за ${Math.round(nearestAirport.distanceKm / 100 * 2) + 1} ч. до вылета.`);
  }
  tips.push(`Раннее бронирование за 2–3 месяца позволяет получить лучшие цены на туры.`);
  tips.push(`Горящие предложения доступны за 3–7 дней до вылета — следите за обновлениями.`);
  
  return { overview, highlights, flightContext, tips };
}

const finalContent = {};
let skippedCount = 0;
for (const city of allCitiesContent) {
  const key = city.toLowerCase();
  if (existingManualContent[key] && existingManualContent[key].overview) {
    finalContent[key] = existingManualContent[key];
    skippedCount++;
  } else {
    finalContent[key] = generateUniqueContent(city);
  }
}

const output = `export type CityManualContent = {
  overview?: string;
  highlights?: string[];
  flightContext?: string;
  tips?: string[];
};

export const CITY_MANUAL_CONTENT: Record<string, CityManualContent> = ${JSON.stringify(finalContent, null, 2)};

export function getCityManualContent(cityName: string): CityManualContent | undefined {
  const normalized = cityName.toLowerCase().trim();
  return CITY_MANUAL_CONTENT[normalized] || CITY_MANUAL_CONTENT[cityName.toLowerCase().trim()];
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src/shared/data/cityManualContent.ts'), output, 'utf-8');
console.log(`Generated manual content for ${Object.keys(finalContent).length} cities`);
console.log(`Preserved ${skippedCount} existing entries`);
if (allCitiesContent.length > 0) {
  const sampleKey = allCitiesContent[Math.min(1, allCitiesContent.length - 1)].toLowerCase();
  console.log(`Sample: ${allCitiesContent[1]} => ${JSON.stringify(finalContent[sampleKey]).slice(0, 150)}...`);
}
