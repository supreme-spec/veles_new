'use client';

import React, { useState, useEffect } from 'react';

// Placeholder for Iran schemas - TODO: implement proper schema data
const iranSchemas = {};

interface CountryMapIntegrationProps {
  countryName: string;
  countryId: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  places?: Array<{
    name: string;
    lat: number;
    lng: number;
    type: 'city' | 'attraction' | 'resort' | 'airport';
    description?: string;
  }>;
  className?: string;
}

export const CountryMapIntegration: React.FC<CountryMapIntegrationProps> = ({
  countryName,
  countryId,
  coordinates,
  places = [],
  className = ''
}) => {
  const [activeMapProvider, setActiveMapProvider] = useState<'yandex' | 'google' | 'osm'>('yandex');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Получение координат по умолчанию для стран
  const getDefaultCoordinates = () => {
    if (coordinates && typeof coordinates.lat === 'number' && typeof coordinates.lng === 'number' &&
      (coordinates.lat !== 0 || coordinates.lng !== 0)) {
      return coordinates;
    }

    switch (countryId) {
      case 'vengriya-gid':
        return { lat: 47.4979, lng: 19.0402 }; // Будапешт
      case 'abkhaziya-gid':
        return { lat: 42.9849, lng: 41.0201 };
      case 'afghanistan':
        return { lat: 33.9391, lng: 67.7100 };
      case 'el-salvador':
        return { lat: 13.7942, lng: -88.8965 }; // Центр Сальвадора
      case 'congo':
        return { lat: -0.2280, lng: 15.8277 }; // Центр Республики Конго
      case 'north-korea-gid':
        return { lat: 39.0339, lng: 125.7543 }; // Пхеньян
      case 'dr-congo':
        return { lat: -2.8825, lng: 23.6583 }; // Центр Демократической Республики Конго
      case 'horvatiya-gid':
        return { lat: 45.0000, lng: 16.0000 }; // Центр Хорватии
      case 'kosta-rika-ekologicheskaya-respublika-gid':
        return { lat: 9.7489, lng: -83.7534 }; // Центр Коста-Рики
      case 'mexico':
        return { lat: 19.4326, lng: -99.1332 }; // Мехико
      case 'egypt':
        return { lat: 30.0444, lng: 31.2357 }; // Каир
      case 'equatorial-guinea':
        return { lat: 1.6500, lng: 10.2667 }; // Центр Экваториальной Гвинеи (Бата)
      case 'eritrea':
        return { lat: 15.1500, lng: 39.1333 }; // Центр Эритреи (координаты Кохайто как ориентир)
      case 'ethiopia':
        return { lat: 9.1450, lng: 40.4897 }; // Центр Эфиопии (Аддис-Абеба)
      case 'estonia':
        return { lat: 58.5953, lng: 25.0136 }; // Центр Эстонии
      case 'eswatini':
        return { lat: -26.5667, lng: 31.5667 }; // Центр Эсватини
      case 'finland':
        return { lat: 64.9631, lng: 25.7250 }; // Центр Финляндии
      case 'fiji':
        return { lat: -17.7133, lng: 178.0650 }; // Центр Фиджи (между островами Вити-Леву и Вануа-Леву)
      case 'albania':
        return { lat: 41.1533, lng: 20.1683 }; // Центр Албании
      case 'andorra':
        return { lat: 42.5063, lng: 1.5218 }; // Центр Андорры
      case 'angola':
        return { lat: -11.2027, lng: 17.8739 }; // Центр Анголы
      case 'antigua-barbuda':
        return { lat: 17.0608, lng: -61.7964 }; // Центр Антигуа и Барбуда
      case 'argentina':
        return { lat: -38.4161, lng: -63.6167 }; // Центр Аргентины
      case 'armenia':
        return { lat: 40.0691, lng: 45.0382 }; // Центр Армении
      case 'artsakh':
        return { lat: 39.8161, lng: 46.7638 }; // Центр Арцаха (Степанакерт)
      case 'sao-tome-and-principe':
        return { lat: 0.3301, lng: 6.7333 }; // Центр Сан-Томе и Принсипи
      case 'seychelles':
        return { lat: -4.6796, lng: 55.4920 }; // Центр Сейшельских Островов
      case 'australia':
        return { lat: -25.2744, lng: 133.7751 }; // Центр Австралии
      case 'avstriya-gid':
        return { lat: 47.5162, lng: 14.5501 }; // Центр Австрии
      case 'azerbaijan':
        return { lat: 40.1431, lng: 47.5769 }; // Центр Азербайджана
      case 'bahamas':
        return { lat: 25.0343, lng: -77.3963 }; // Центр Багам
      case 'bahrain':
        return { lat: 26.0667, lng: 50.5577 }; // Центр Бахрейна
      case 'bangladesh':
        return { lat: 23.6850, lng: 90.3563 }; // Центр Бангладеш
      case 'barbados':
        return { lat: 13.1939, lng: -59.5432 }; // Центр Барбадоса
      case 'belarus':
        return { lat: 53.7098, lng: 27.9534 }; // Центр Беларуси (Минск)
      case 'belgium':
        return { lat: 50.5039, lng: 4.4699 }; // Центр Бельгии
      case 'belize':
        return { lat: 17.1899, lng: -88.4976 }; // Центр Белиза
      case 'benin':
        return { lat: 9.3077, lng: 2.3158 }; // Центр Бенина
      case 'bolgariya-gid':
        return { lat: 42.6977, lng: 25.4858 }; // Центр Болгарии
      case 'bolivia':
        return { lat: -16.2902, lng: -63.5887 }; // Центр Боливии
      case 'bosnia-herzegovina':
        return { lat: 43.9159, lng: 17.6791 }; // Центр Боснии и Герцеговины
      case 'botswana':
        return { lat: -22.3250, lng: 24.6833 }; // Центр Ботсваны
      case 'burkina-faso':
        return { lat: 12.2383, lng: -1.5616 }; // Центр Буркина-Фасо (Уагадугу)
      case 'brazil':
        return { lat: -14.2350, lng: -51.9253 }; // Центр Бразилии
      case 'brunei':
        return { lat: 4.8903, lng: 114.9438 }; // Центр Брунея (Бандар-Сери-Бегаван)
      case 'burundi':
        return { lat: -3.3869, lng: 29.9189 }; // Центр Бурунди
      case 'cabo-verde':
        return { lat: 16.5388, lng: -23.0418 }; // Центр Кабо-Верде
      case 'cameroon':
        return { lat: 3.8667, lng: 11.5167 }; // Центр Камеруна (Яунде)
      case 'cambodia':
      case 'cambodia-gid':
        return { lat: 12.5657, lng: 104.9909 }; // Центр Камбоджи
      case 'canada':
        return { lat: 56.1304, lng: -106.3468 }; // Центр Канады
      case 'central-african-republic':
        return { lat: 6.6111, lng: 20.9394 }; // Центр ЦАР
      case 'chad':
        return { lat: 15.4542, lng: 18.7322 }; // Центр Чада (около Нджамены)
      case 'cote-d-ivoire':
        return { lat: 7.5400, lng: -5.5471 }; // Центр Кот-д'Ивуара
      case 'kitai-gid':
        return { lat: 39.9042, lng: 116.4074 }; // Центр Китая (Пекин)
      case 'chile':
        return { lat: -35.6751, lng: -71.5430 }; // Центр Чили (приблизительно)
      case 'colombia':
        return { lat: 4.5709, lng: -74.2973 }; // Центр Колумбии
      case 'cyprus-gid':
        return { lat: 35.1264, lng: 33.4299 }; // Центр Кипра
      case 'dominican-republic':
        return { lat: 18.7357, lng: -70.1627 }; // Центр Доминиканской Республики
      case 'dominica':
        return { lat: 15.4150, lng: -61.3710 }; // Центральная часть Доминики
      case 'chekhiya-gid':
        return { lat: 49.8175, lng: 15.4730 }; // Центр Чехии
      case 'denmark':
        return { lat: 56.2639, lng: 9.5018 }; // Центр Дании
      case 'donetsk':
        return { lat: 48.0159, lng: 37.8056 }; // Центр Донецка
      case 'france':
      case 'frantsiya-gid':
        return { lat: 46.6034, lng: 1.8883 }; // Центр Франции
      case 'gabon':
        return { lat: -0.8037, lng: 11.6094 }; // Центр Габона
      case 'gambia':
        return { lat: 13.4432, lng: -16.5735 }; // Центр Гамбии (Банжул)
      case 'georgia':
        return { lat: 42.3154, lng: 43.3569 }; // Центр Грузии (Тбилиси)
      case 'germaniya-gid':
        return { lat: 51.1657, lng: 10.4515 }; // Центр Германии
      case 'ghana':
        return { lat: 7.9465, lng: -1.0232 }; // Центр Ганы
      case 'gretsiya-gid':
        return { lat: 39.0742, lng: 21.8243 }; // Центр Греции
      case 'iceland':
        return { lat: 64.9631, lng: -19.0208 }; // Центр Исландии
      case 'grenada':
        return { lat: 12.1165, lng: -61.6790 }; // Центр Гренады (Сент-Джорджес)
      case 'guinea-bissau':
        return { lat: 11.8031, lng: -15.1804 }; // Центр Гвинеи-Бисау (Бисау)
      case 'guinea':
        return { lat: 10.5, lng: -11.5 }; // Центр Гвинеи
      case 'guyana':
        return { lat: 5.0, lng: -59.0 }; // Центр Гайаны
      case 'haiti':
        return { lat: 19.0, lng: -72.4167 }; // Центр Гаити
      case 'honduras':
        return { lat: 15.2000, lng: -86.2419 }; // Центр Гондураса
      case 'hong-kong':
        return { lat: 22.3964, lng: 114.1095 }; // Центр Гонконга
      case 'singapore':
      case 'singapur-gid':
        return { lat: 1.3521, lng: 103.8198 }; // Центр Сингапура
      case 'indiya-gid':
        return { lat: 20.5937, lng: 78.9629 }; // Центр Индии
      case 'indoneziya-gid':
        return { lat: -0.7893, lng: 113.9213 }; // Центр Индонезии
      case 'iran':
        return { lat: 32.4279, lng: 53.6880 }; // Центр Ирана
      case 'ireland':
        return { lat: 53.1424, lng: -7.6921 }; // Центр Ирландии
      case 'iraq':
        return { lat: 33.3152, lng: 44.3661 }; // Центр Ирака (Багдад)
      case 'israel':
        return { lat: 31.0461, lng: 34.8516 }; // Центр Израиля
      case 'italiya-gid':
        return { lat: 41.9028, lng: 12.4964 }; // Центр Италии (Рим)
      case 'jordan':
        return { lat: 31.9522, lng: 35.9364 }; // Центр Иордании (Амман)
      case 'kiribati':
        return { lat: 1.8667, lng: -157.4833 }; // Центр Кирибати (остров Рождества)
      case 'kosovo':
        return { lat: 42.6026, lng: 20.9029 }; // Центр Косово
      case 'kuwait':
        return { lat: 29.3775, lng: 47.9933 }; // Центр Кувейт
      case 'kyrgyzstan':
        return { lat: 41.2044, lng: 74.7661 }; // Центр Кыргызстана
      case 'laos':
        return { lat: 19.8563, lng: 102.4955 }; // Центр Лаоса
      case 'latvia':
        return { lat: 56.8796, lng: 24.6032 }; // Центр Латвии
      case 'lithuania':
        return { lat: 55.1694, lng: 23.8813 }; // Центр Литвы
      case 'luhansk':
        return { lat: 48.5741, lng: 39.3078 }; // Центр Луганской Народной Республики
      case 'lebanon-gid':
        return { lat: 33.8938, lng: 35.5018 }; // Центр Ливана (Бейрут)
      case 'lesotho':
        return { lat: -29.6100, lng: 28.2336 }; // Центр Лесото (Масеру)
      case 'liberia':
        return { lat: 6.4281, lng: -9.4295 };
      case 'libya':
        return { lat: 26.3351, lng: 17.2283 }; // Центр Либерии (Монровия)
      case 'oman':
        return { lat: 21.4735, lng: 55.9754 }; // Центр Омана
      case 'qatar-gid':
        return { lat: 25.3548, lng: 51.1839 }; // Центр Катар
      case 'saudi-arabia':
        return { lat: 23.8859, lng: 45.0792 }; // Центр Саудовской Аравии (Эр-Рияд)
      case 'palestina-gid':
        return { lat: 31.9522, lng: 35.2332 }; // Центр Палестины (Рамалла)
      case 'moldova':
        return { lat: 47.4116, lng: 28.3699 }; // Центр Молдовы (Кишинев)
      case 'liechtenstein':
        return { lat: 47.1660, lng: 9.5554 }; // Центр Лихтенштейна (Вадуц)
      case 'luxembourg':
        return { lat: 49.8153, lng: 6.1296 }; // Центр Люксембурга
      case 'macau':
        return { lat: 22.1987, lng: 113.5439 }; // Центр Макао
      case 'malawi':
        return { lat: -13.2543, lng: 34.3015 }; // Центр Малави
      case 'maldivy-gid':
        return { lat: 3.2028, lng: 73.2207 }; // Центр Мальдив
      case 'mali':
        return { lat: 12.6500, lng: -8.0000 }; // Центр Мали (Бамако)
      case 'malta':
        return { lat: 35.9375, lng: 14.3754 }; // Центр Мальты
      case 'mauritania':
        return { lat: 21.0079, lng: -10.9403 }; // Центр Мавритании (Нуакшот)
      case 'marshall-islands':
        return { lat: 7.1315, lng: 171.1845 }; // Центр Маршалловых Островов
      case 'micronesia':
        return { lat: 6.8875, lng: 158.2150 }; // Центр Микронезии
      case 'niger':
        return { lat: 17.6078, lng: 8.0817 }; // Центр Нигера (Ниамей)
      case 'nigeria':
        return { lat: 9.0820, lng: 8.6753 }; // Центр Нигерии (Абуджа)
      case 'mongolia-gid':
        return { lat: 46.8625, lng: 103.8467 }; // Центр Монголии (Улан-Батор)
      case 'morocco':
        return { lat: 31.7917, lng: -7.0926 }; // Центр Марокко
      case 'mozambique':
        return { lat: -18.6656, lng: 35.5296 }; // Центр Мозамбика
      case 'north-macedonia':
      case 'north-macedonia-gid':
        return { lat: 41.6086, lng: 21.7453 }; // Центр Северной Македонии (Скопье)
      case 'norway-gid':
        return { lat: 60.4720, lng: 8.4689 }; // Центр Норвегии
      case 'pakistan':
        return { lat: 30.3753, lng: 69.3451 }; // Центр Пакистана
      case 'poland':
      case 'polsha-gid':
        return { lat: 51.9194, lng: 19.1451 }; // Центр Польши
      case 'panama-gid':
        return { lat: 8.5380, lng: -80.7821 }; // Центр Панамы
      case 'russia':
        return { lat: 61.5240, lng: 105.3188 }; // Географический центр России
      case 'rwanda':
        return { lat: -1.9403, lng: 29.8739 }; // Центр Руанды (Кигали)
      case 'saint-kitts-and-nevis':
        return { lat: 17.3578, lng: -62.7830 }; // Центр Сент-Китс и Невис
      case 'saint-lucia':
        return { lat: 13.9094, lng: -60.9789 }; // Центр Сент-Люсии
      case 'saint-vincent-and-the-grenadines':
        return { lat: 13.2528, lng: -61.1971 }; // Центр Сент-Винсента и Гренадин
      case 'samoa':
        return { lat: -13.8333, lng: -171.7667 }; // Центр Самоа (Апиа)
      case 'senegal':
        return { lat: 14.6928, lng: -17.4467 }; // Центр Сенегала (Дакар)
      case 'sierra-leone':
        return { lat: 8.4844, lng: -13.2344 }; // Центр Сьерра-Леоне (Фритаун)
      case 'slovakiya-gid':
      case 'slovakia':
        return { lat: 48.6690, lng: 19.6990 }; // Центр Словакии
      case 'sloveniya-gid':
      case 'slovenia':
        return { lat: 46.1512, lng: 14.9955 }; // Центр Словении
      case 'somalia':
        return { lat: 5.1521, lng: 46.1996 }; // Географический центр Сомали
      case 'somaliland':
        return { lat: 9.5500, lng: 44.0500 }; // Центр Сомалиленда (район Харгейсы)
      case 'solomonovy-ostrova-melaneziya-gid':
      case 'solomon-islands':
        return { lat: -9.6457, lng: 160.1562 }; // Центр Соломоновых Островов
      case 'south-africa':
        return { lat: -30.5595, lng: 22.9375 }; // Географический центр ЮАР
      case 'yuzhnyi-sudan-gid':
      case 'south-sudan':
        return { lat: 4.8594, lng: 31.5713 }; // Джуба, столица Южного Судана
      case 'sudan':
        return { lat: 15.5007, lng: 32.5599 }; // Хартум, столица Судана
      case 'suriname':
        return { lat: 5.8253, lng: -55.1673 }; // Парамарибо, столица Суринама
      case 'sweden':
        return { lat: 59.3293, lng: 18.0686 }; // Стокгольм, столица Швеции
      case 'shveitsariya-gid':
      case 'switzerland':
        return { lat: 46.9480, lng: 7.4474 }; // Берн, столица Швейцарии
      case 'siriya-gid':
      case 'syria':
        return { lat: 33.5138, lng: 36.2765 }; // Дамаск, столица Сирии
      case 'uzhnaya-koreya-gid':
      case 'south-korea':
        return { lat: 36.5, lng: 127.5 }; // Центр Южной Кореи
      case 'yuzhnaya-osetiya-gid':
      case 'south-ossetia':
        return { lat: 42.2278, lng: 43.9693 }; // Цхинвал, центр Южной Осетии
      case 'ispaniya-gid':
      case 'spain':
        return { lat: 40.4637, lng: -3.7492 }; // Центр Испании (Мадрид)
      case 'shri-lanka-gid':
      case 'sri-lanka':
        return { lat: 7.8731, lng: 80.7718 }; // Центр Шри-Ланки
      case 'taiwan':
        return { lat: 25.0330, lng: 121.5654 }; // Тайбэй, столица Тайваня
      case 'tajikistan':
        return { lat: 38.5367, lng: 68.7800 }; // Душанбе, столица Таджикистана
      case 'tanzania':
        return { lat: -6.7924, lng: 39.2083 }; // Дар-эс-Салам, фактическая столица Танзании
      case 'thailand':
      case 'tailand-gid':
        return { lat: 13.7563, lng: 100.5018 }; // Бангкок, столица Таиланда
      case 'tibet':
        return { lat: 29.6465, lng: 91.1172 }; // Лхаса, столица Тибета
      case 'timor-leste':
        return { lat: -8.5569, lng: 125.5603 }; // Дили, столица Тимор-Лешти
      case 'togo':
        return { lat: 6.1319, lng: 1.2228 }; // Ломе, столица Того
      case 'tonga':
        return { lat: -21.1789, lng: -175.1982 }; // Нукуалофа, столица Тонги
      case 'transnistria':
        return { lat: 46.8434, lng: 29.6134 }; // Тирасполь, столица Приднестровья
      case 'trinidad-and-tobago':
        return { lat: 10.6596, lng: -61.5089 }; // Порт-оф-Спейн, столица Тринидад и Тобаго
      case 'tunisia':
        return { lat: 36.8065, lng: 10.1815 }; // Тунис, столица Туниса
      case 'turkmenistan':
        return { lat: 37.9601, lng: 58.3261 }; // Ашхабад, столица Туркменистана
      case 'turkey':
      case 'turtsiya-gid':
        return { lat: 39.9334, lng: 32.8597 }; // Анкара, столица Турции
      case 'uae':
      case 'oae-gid':
        return { lat: 24.4539, lng: 54.3773 }; // Абу-Даби, столица ОАЭ
      case 'tuvalu':
        return { lat: -8.5167, lng: 179.2167 }; // Фунафути, столица Тувалу
      case 'uganda':
        return { lat: 0.3136, lng: 32.5811 }; // Кампала, столица Уганды
      case 'uruguay':
        return { lat: -34.9011, lng: -56.1645 }; // Монтевидео, столица Уругвая
      case 'ukraine':
        return { lat: 50.4501, lng: 30.5234 }; // Киев, столица Украины
      case 'uzbekistan':
      case 'uzbekistan-gid':
        return { lat: 41.3775, lng: 64.5853 }; // Центр Узбекистана
      case 'velikobritaniya-gid':
        return { lat: 51.5074, lng: -0.1278 }; // Лондон, столица Великобритании
      case 'usa':
      case 'ssha-gid':
        return { lat: 39.8283, lng: -98.5795 }; // Географический центр США
      case 'vanuatu':
      case 'vanuatu-gid':
        return { lat: -15.3767, lng: 166.9592 }; // Центр Вануату (Порт-Вила)
      case 'venezuela':
      case 'venesuela-angel-tepuy-neft-karaibskie-plyazhi-gid':
        return { lat: 6.4238, lng: -66.5897 };
      case 'western-sahara':
      case 'zapadnaya-sahara-gid':
        return { lat: 24.2155, lng: -12.8858 }; // Центр Венесуэлы (Каракас)
      case 'vietnam':
      case 'vetnam-gid':
        return { lat: 16.0583, lng: 108.2772 }; // Центр Вьетнама (Дананг)
      case 'yemen':
      case 'yemen-gid':
        return { lat: 15.5527, lng: 48.5164 }; // Центр Йемена (Сана)
      case 'zambia':
        return { lat: -15.3875, lng: 28.3228 }; // Центр Замбии (Лусака)
      case 'zimbabwe':
        return { lat: -19.0154, lng: 29.1549 }; // Центр Зимбабве (Хараре)
      case 'netherlands':
      case 'niderlandy-gid':
        return { lat: 52.1326, lng: 5.2913 }; // Центр Нидерландов
      default:
        return { lat: 42.9849, lng: 41.0201 }; // Сухум по умолчанию
    }
  };

  const finalCoordinates = getDefaultCoordinates();

  // Предустановленные места для разных стран
  const getDefaultPlaces = () => {
    switch (countryId) {
      case 'abkhaziya-gid':
        return [
          { name: 'Сухум', lat: 42.9849, lng: 41.0201, type: 'city' as const, description: 'Столица Абхазии (65 тыс.), субтропический климат, набережная Махаджиров, Ботанический сад, крепость Диоскурия, пляжи' },
          { name: 'Гагра', lat: 43.2756, lng: 40.2697, type: 'resort' as const, description: 'Главный курорт Абхазии, пляжи, Приморский парк, замок принца Ольденбургского, горы защищают от ветров' },
          { name: 'Новый Афон', lat: 43.0864, lng: 40.0989, type: 'attraction' as const, description: 'Новоафонский монастырь XIX века, Новоафонская пещера с подземными залами, железная дорога, водопад' },
          { name: 'Озеро Рица', lat: 43.4803, lng: 40.5183, type: 'attraction' as const, description: 'Горное озеро на высоте 950 м, изумрудная вода, окружено горами, дача Сталина, популярное место для фото' },
          { name: 'Гудаута', lat: 43.1056, lng: 40.6067, type: 'resort' as const, description: 'Курортный город с широкими пляжами, тихая атмосфера, виноградники, близость к Новому Афону' },
          { name: 'Очамире', lat: 43.1667, lng: 40.4333, type: 'resort' as const, description: 'Приморский курорт у подножия гор, галечные пляжи, минеральные источники, спокойная атмосфера' }
        ];

      case 'netherlands':
      case 'niderlandy-gid':
        return [
          { name: 'Амстердам', lat: 52.3676, lng: 4.9041, type: 'city' as const, description: 'Столица Нидерландов, город каналов, музеев и свободы. Центр культуры и туризма.' },
          { name: 'Рейксмузеум', lat: 52.3600, lng: 4.8852, type: 'attraction' as const, description: 'Главный художественный музей страны, где хранится "Ночной дозор" Рембрандта.' },
          { name: 'Музей Ван Гога', lat: 52.3584, lng: 4.8811, type: 'attraction' as const, description: 'Крупнейшая в мире коллекция картин и рисунков Винсента Ван Гога.' },
          { name: 'Дом Анны Франк', lat: 52.3755, lng: 4.8807, type: 'attraction' as const, description: 'Историческое убежище, где Анна Франк писала свой знаменитый дневник.' },
          { name: 'Кёкенхоф', lat: 52.2688, lng: 4.5464, type: 'attraction' as const, description: 'Всемирно известный королевский парк тюльпанов (открыт весной).' },
          { name: 'Заансе Сханс', lat: 52.4383, lng: 4.8135, type: 'attraction' as const, description: 'Музей под открытым небом с историческими ветряными мельницами и мастерскими.' },
          { name: 'Киндердайк', lat: 51.8513, lng: 4.6065, type: 'attraction' as const, description: 'Система из 19 ветряных мельниц XVIII века, объект Всемирного наследия ЮНЕСКО.' },
          { name: 'Роттердам', lat: 51.9225, lng: 4.4792, type: 'city' as const, description: 'Крупнейший порт Европы, город современной архитектуры и инноваций.' },
          { name: 'Гаага', lat: 52.0705, lng: 4.3007, type: 'city' as const, description: 'Резиденция правительства и монарха, город международного права и пляжа Схевенинген.' },
          { name: 'Делфт', lat: 52.0116, lng: 4.3571, type: 'city' as const, description: 'Родина знаменитого бело-голубого фарфора и художника Яна Вермеера.' },
          { name: 'Утрехт', lat: 52.0908, lng: 5.1222, type: 'city' as const, description: 'Древний город с уникальными двухъярусными каналами и Домским собором.' }
        ];

      case 'cote-d-ivoire':
        return [
          { name: 'Абиджан', lat: 5.3600, lng: -4.0083, type: 'city' as const, description: 'Абиджан — экономическая столица Кот-д’Ивуара, «Париж Западной Африки». Крупнейший город и порт страны. Достопримечательности: собор Святого Павла, район Плато, Национальный музей, рынок Трешвиль.' },
          { name: 'Ямусукро', lat: 6.8276, lng: -5.2893, type: 'city' as const, description: 'Ямусукро — административная столица Кот-д’Ивуара. Известна гигантской базиликой Нотр-Дам-де-ла-Пэ, занесенной в Книгу рекордов Гиннесса, и президентским дворцом с озером крокодилов.' },
          { name: 'Гран-Басам', lat: 5.1968, lng: -3.7371, type: 'city' as const, description: 'Гран-Басам — историческая столица и колониальный город, объект ЮНЕСКО. Славится архитектурой XIX века, пляжами и Национальным музеем костюма.' },
          { name: 'Ман', lat: 7.4125, lng: -7.5536, type: 'city' as const, description: 'Ман — «город 18 гор» на западе страны. Центр экотуризма, известен водопадом Ла-Каскад, горой Тонкуи и традиционными масками народа дан.' },
          { name: 'Базилика Нотр-Дам-де-ла-Пэ', lat: 6.8115, lng: -5.2973, type: 'attraction' as const, description: 'Базилика Нотр-Дам-де-ла-Пэ — самая большая церковь в мире, расположенная в Ямусукро. Копия собора Святого Петра в Риме, но превышающая его по размерам.' },
          { name: 'Национальный парк Таи', lat: 5.7500, lng: -7.1167, type: 'attraction' as const, description: 'Национальный парк Таи — один из последних крупных остатков первичного тропического леса в Западной Африке. Объект ЮНЕСКО, дом для шимпанзе и карликовых бегемотов.' },
          { name: 'Ассини', lat: 5.1483, lng: -3.2883, type: 'resort' as const, description: 'Ассини — популярный пляжный курорт к востоку от Абиджана. Белоснежные пляжи, пальмы и элитный отдых на берегу Гвинейского залива.' },
          { name: 'Национальный парк Комое', lat: 9.1667, lng: -3.8333, type: 'attraction' as const, description: 'Национальный парк Комое — крупнейший парк Западной Африки, объект ЮНЕСКО. Разнообразная фауна: слоны, львы, антилопы. Расположен в зоне саванн на северо-востоке.' }
        ];

      case 'pakistan':
        return [
          { name: 'Исламабад', lat: 33.6844, lng: 73.0479, type: 'city' as const, description: 'Столица и административный центр Пакистана (1.1 млн), современный город, мечеть Фейсал, север страны, основан в 1960-х' },
          { name: 'Карачи', lat: 24.8607, lng: 67.0011, type: 'city' as const, description: 'Крупнейший город и главный морской порт Пакистана (15 млн), экономический центр, Аравийское море, юг страны, мегаполис' },
          { name: 'Лахор', lat: 31.5497, lng: 74.3436, type: 'city' as const, description: 'Культурная столица Пенджаба (11 млн) с историческим центром, форт Лахор, мечеть Бадшахи, восток Пакистана, объект ЮНЕСКО' },
          { name: 'Форт Лахор', lat: 31.5883, lng: 74.3158, type: 'attraction' as const, description: 'Историческая крепость XVI века, объект Всемирного наследия ЮНЕСКО, символ могущества империи Великих Моголов' },
          { name: 'Мохенджо-Даро', lat: 27.3230, lng: 68.1350, type: 'attraction' as const, description: 'Древний город цивилизации долины Инда (2600-1900 до н.э.), объект ЮНЕСКО, один из древнейших городов мира' },
          { name: 'Таксила', lat: 33.7500, lng: 72.8333, type: 'attraction' as const, description: 'Древний буддийский центр (VI век до н.э.), объект ЮНЕСКО, археологические руины, музей' },
          { name: 'Пешавар', lat: 34.0151, lng: 71.5249, type: 'city' as const, description: 'Старейший город в долине Инда (2.3 млн), ворота в Кхайберский перевал, граница с Афганистаном, северо-запад Пакистана, историческое значение' },
          { name: 'Кветта', lat: 30.1798, lng: 66.9755, type: 'city' as const, description: 'Столица Белуджистана (1.1 млн), расположена в долине реки Болан, горы, запад Пакистана, торговый центр, высота 1680 м' },
          { name: 'Мултан', lat: 30.1575, lng: 71.4793, type: 'city' as const, description: 'Город святых (1.9 млн) с древними мавзолеями и крепостями, центр Пенджаба, река Чинаб, историческое значение, восток Пакистана' },
          { name: 'Харпур', lat: 27.5295, lng: 68.7592, type: 'city' as const, description: 'Город в провинции Синд (200 тыс.) с историческим наследием, река Инд, юг Пакистана, сельскохозяйственный центр' },
          { name: 'Фаисалабад', lat: 31.4504, lng: 73.1350, type: 'city' as const, description: 'Текстильная столица Пакистана (3.2 млн), крупнейший центр производства хлопка, университеты, сады' },
          { name: 'Гилгит', lat: 35.9521, lng: 74.3164, type: 'city' as const, description: 'Ворота в Кашмир и Каркорам (10 тыс.) с видом на горы, река Гилгит, север Пакистана, высота 1500 м, треккинг' },
          { name: 'Скарду', lat: 35.2971, lng: 75.6333, type: 'city' as const, description: 'Столица Балтистана (15 тыс.) с потрясающими горными пейзажами, река Инд, север Пакистана, высота 2220 м, треккинг, К2' }
        ];
      case 'polsha-gid':
        return [
          { name: 'Варшава', lat: 52.2297, lng: 21.0122, type: 'city' as const, description: 'Столица Польши (1.8 млн), политический и культурный центр страны, Старый город ЮНЕСКО, река Висла, центр страны, восстановлен после войны' },
          { name: 'Краков', lat: 50.0647, lng: 19.9450, type: 'city' as const, description: 'Историческая столица Польши (780 тыс.) со Старым городом ЮНЕСКО, замок Вавель, река Висла, юг Польши, культурный центр' },
          { name: 'Гданьск', lat: 54.3520, lng: 18.6466, type: 'city' as const, description: 'Морской порт на Балтийском море (470 тыс.), жемчужина Поморья, исторический центр, север Польши, торговый центр' },
          { name: 'Вроцлав', lat: 51.1079, lng: 17.0385, type: 'city' as const, description: 'Город гномов (640 тыс.) с более чем 600 бронзовыми скульптурами, река Одра, запад Польши, университет, исторический центр' },
          { name: 'Закопане', lat: 49.2992, lng: 19.9496, type: 'resort' as const, description: 'Горнолыжный курорт в Татрах (27 тыс.), ворота в Карпаты, высота 800-1000 м, юг Польши, популярное место для отдыха' },
          { name: 'Старый город Кракова', lat: 50.0614, lng: 19.9372, type: 'attraction' as const, description: 'Центральный рынок, Мариацкий костёл, Рыночная площадь, объект ЮНЕСКО, XIV век, популярное место для туристов, Краков' },
          { name: 'Замок Вавель', lat: 50.0540, lng: 19.9355, type: 'attraction' as const, description: 'Королевский замок с кафедральным собором и сокровищницей, объект ЮНЕСКО' },
          { name: 'Аушвиц-Биркенау', lat: 50.0263, lng: 19.2034, type: 'attraction' as const, description: 'Бывший нацистский концлагерь, мемориальный комплекс, объект ЮНЕСКО' },
          { name: 'Соляная шахта Величка', lat: 49.9847, lng: 20.0433, type: 'attraction' as const, description: 'Подземные соляные камеры и часовни, объект ЮНЕСКО, XIII-XX века, глубина 327 м, юг Польши, популярное место' },
          { name: 'Замок Мальборк', lat: 54.0404, lng: 19.0269, type: 'attraction' as const, description: 'Крупнейший кирпичный замок мира, крепость Тевтонского ордена, объект ЮНЕСКО, XIII-XV века' }
        ];

      case 'panama-gid':
        return [
          { name: 'Панама-Сити', lat: 8.9833, lng: -79.5167, type: 'city' as const, description: 'Столица Панамы (880 тыс.), единственная столица мира на двух океанах, небоскребы, колониальный квартал Каско-Вьехо, объект ЮНЕСКО' },
          { name: 'Канал Панама', lat: 9.0833, lng: -79.5000, type: 'attraction' as const, description: 'Инженерное чудо мира, соединяющее Тихий и Атлантический океаны' },
          { name: 'Колон', lat: 9.3500, lng: -79.9000, type: 'city' as const, description: 'Карибский портовый город, ворота в Панаму с Атлантического побережья' },
          { name: 'Давид', lat: 8.4333, lng: -82.4333, type: 'city' as const, description: 'Столица провинции Чиреки (90 тыс.), крупнейший город западной Панамы, близость к границе с Коста-Рикой, торговый центр, запад страны' },
          { name: 'Лас-Таблас', lat: 7.8000, lng: -80.3000, type: 'city' as const, description: 'Город на Тихоокеанском побережье, известен своими пляжами и карнавалом' },
          { name: 'Боке-дель-Торо', lat: 8.8000, lng: -82.2500, type: 'resort' as const, description: 'Архипелаг с тропическими лесами, пляжами и богатой морской жизнью' },
          { name: 'Портобело', lat: 9.5500, lng: -79.6500, type: 'attraction' as const, description: 'Исторический карибский город с испанскими крепостями и золотым путем' },
          { name: 'Сан-Бласские острова', lat: 9.2167, lng: -78.1500, type: 'attraction' as const, description: 'Архипелаг из 365 островов, населенный коренным народом куна, Карибское море, автономная территория, восток Панамы, популярное место' },
          { name: 'Вулкан Бару', lat: 8.8000, lng: -82.5500, type: 'attraction' as const, description: 'Высшая точка Панамы (3475 м), действующий вулкан с видом на два океана' },
          { name: 'Национальный парк Ла-Амистад', lat: 8.5000, lng: -82.5000, type: 'attraction' as const, description: 'Биосферный заповедник ЮНЕСКО с тропическими лесами и эндемичной фауной' }
        ];

      case 'el-salvador':
        return [
          { name: 'Сан-Сальвадор', lat: 13.6929, lng: -89.1872, type: 'city' as const, description: 'Столица Сальвадора (1.1 млн), расположена в долине у подножия вулкана Сан-Сальвадор, исторический центр, собор' },
          { name: 'Хойя-де-Серен', lat: 13.8181, lng: -89.3481, type: 'attraction' as const, description: '"Помпеи Америки" - деревня майя, погребенная вулканическим пеплом, объект ЮНЕСКО' },
          { name: 'Вулкан Санта-Ана', lat: 13.8531, lng: -89.6306, type: 'attraction' as const, description: 'Самая высокая точка страны (2381 м) с кратерным озером изумрудного цвета' },
          { name: 'Эль-Сунсаль', lat: 13.7167, lng: -89.3167, type: 'resort' as const, description: 'Мировая мекка серфинга с постоянными волнами и международными соревнованиями' },
          { name: 'Сучитото', lat: 13.9392, lng: -89.0275, type: 'city' as const, description: 'Колониальный город XVI века с мощеными улицами и церковью Санта-Лусия' },
          { name: 'Озеро Коатепеке', lat: 13.8667, lng: -89.5500, type: 'attraction' as const, description: 'Кратерное озеро вулкана с термальными источниками и водными видами спорта' },
          { name: 'Тасумаль', lat: 13.9778, lng: -89.6944, type: 'attraction' as const, description: 'Крупнейший археологический комплекс майя в Сальвадоре с пирамидами и дворцами' },
          { name: 'Национальный парк Эль-Импосибле', lat: 13.8500, lng: -89.9833, type: 'attraction' as const, description: 'Биосферный резерват с сухыми тропическими лесами и более 400 видами птиц' },
          { name: 'Ла-Либертад', lat: 13.4881, lng: -89.3214, type: 'resort' as const, description: 'Рыбацкий порт и серфинг-центр (40 тыс.) с волнами для начинающих, Тихий океан, юг Сальвадора, популярное место для серфинга' },
          { name: 'Аэропорт Сан-Сальвадор', lat: 13.4400, lng: -89.0550, type: 'airport' as const, description: 'Международный аэропорт Монсеньор Ромеро' }
        ];
      case 'russia':
        return [
          { name: 'Москва', lat: 55.7558, lng: 37.6176, type: 'city' as const, description: 'Столица России, Кремль, Красная площадь и музеи мирового уровня' },
          { name: 'Санкт-Петербург', lat: 59.9311, lng: 30.3609, type: 'city' as const, description: 'Северная столица (5.4 млн), Эрмитаж, белые ночи и дворцовые ансамбли, объект ЮНЕСКО, река Нева, северо-запад России, культурный центр' },
          { name: 'Казань', lat: 55.7963, lng: 49.1088, type: 'city' as const, description: 'Столица Татарстана (1.3 млн), Казанский Кремль, мечети и соборы, объект ЮНЕСКО, река Волга, центр России, культурный центр' },
          { name: 'Великий Новгород', lat: 58.5250, lng: 31.2750, type: 'city' as const, description: 'Древнейший город России (859 г.), объект ЮНЕСКО, Софийский собор, Ярославово дворище' },
          { name: 'Суздаль', lat: 56.4167, lng: 40.4500, type: 'city' as const, description: 'Город-музей, объект ЮНЕСКО, белокаменные храмы, музей деревянного зодчества' },
          { name: 'Владимир', lat: 56.1283, lng: 40.4067, type: 'city' as const, description: 'Древняя столица Руси, объект ЮНЕСКО, Успенский и Дмитриевский соборы XII века' },
          { name: 'Сочи', lat: 43.6028, lng: 39.7342, type: 'resort' as const, description: 'Курорт на Черном море (450 тыс.), Красная Поляна и олимпийские объекты, юг России, популярное место для отдыха, субтропический климат' },
          { name: 'Владивосток', lat: 43.1155, lng: 131.8855, type: 'city' as const, description: 'Дальневосточные мосты (600 тыс.), бухты и морские прогулки, Тихий океан, восток России, порт, конечная точка Транссиба' },
          { name: 'Мурманск', lat: 68.9707, lng: 33.0749, type: 'city' as const, description: 'Ворота в Арктику (280 тыс.) и лучшее место для наблюдения северного сияния, Баренцево море, север России, незамерзающий порт' },
          { name: 'Озеро Байкал', lat: 53.5587, lng: 108.1650, type: 'attraction' as const, description: 'Самое глубокое озеро мира (1642 м), уникальная природа и зимний лёд, объект ЮНЕСКО, Сибирь, 20% пресной воды мира, популярное место' },
          { name: 'Петропавловск-Камчатский', lat: 53.0370, lng: 158.6559, type: 'attraction' as const, description: 'Вулканы Камчатки, гейзеры и дикая природа' }
        ];
      case 'samoa':
        return [
          { name: 'Апиа', lat: -13.8333, lng: -171.7667, type: 'city' as const, description: 'Столица Самоа (38 тыс.), культурный и административный центр, порт, колониальная архитектура, музей Стивенсона, рынки' },
          { name: 'Аэропорт Фалеоло', lat: -13.8300, lng: -172.0080, type: 'airport' as const, description: 'Международный аэропорт Самоа, главные воздушные ворота страны, связь с Австралией, Новой Зеландией, Фиджи' },
          { name: 'То-Суа океанская траншея', lat: -14.0167, lng: -171.4500, type: 'attraction' as const, description: 'Природная плавательная яма 30м глубиной с изумрудной водой, лавовая трубка, доступ по лестнице, популярное место для фото' },
          { name: 'Водопады Папапапаи-тай', lat: -13.9333, lng: -171.8000, type: 'attraction' as const, description: 'Высокий водопад 100м, падающий в океан, живописное место, доступ по тропе, окружен тропическим лесом' },
          { name: 'Пляж Лаломанд', lat: -13.8000, lng: -172.0000, type: 'resort' as const, description: 'Самый красивый пляж Самоа с белоснежным песком, спокойные воды, пальмы, идеальное место для отдыха' },
          { name: 'Дом Роберта Луиса Стивенсона', lat: -13.8500, lng: -171.7500, type: 'attraction' as const, description: 'Музей в доме знаменитого писателя, автор "Острова сокровищ", могила на горе Ваеа, колониальная архитектура' },
          { name: 'Лавовые поля Сале\'олавы', lat: -13.6000, lng: -172.5000, type: 'attraction' as const, description: 'Результат извержения 1905-1911 годов, лунный пейзаж, лавовые поля, уникальная геология, остров Савайи' },
          { name: 'Пещера Пеапеа', lat: -13.6500, lng: -172.3500, type: 'attraction' as const, description: 'Лавовая пещера с подземным озером на Савайи, сталактиты, сталагмиты, плавание, уникальная геология' },
          { name: 'Остров Маноно', lat: -13.8500, lng: -172.1000, type: 'attraction' as const, description: 'Остров без автомобилей, традиционная полинезийская жизнь, пешие тропы, пляжи, аутентичная культура' },
          { name: 'Культурная деревня Самоа', lat: -13.8000, lng: -171.7000, type: 'attraction' as const, description: 'Живой музей традиционной культуры Фа\'а Самоа, татуировки, танцы, ремесла, традиционные дома, фала' },
          { name: 'Национальный парк О-ле-Пупу-Пуэ', lat: -13.9500, lng: -171.6500, type: 'attraction' as const, description: 'Тропический дождевой лес с уникальной флорой и фауной, эндемичные виды, пешие тропы, водопады, птицы' },
          { name: 'Собор Непорочного Зачатия', lat: -13.8333, lng: -171.7667, type: 'attraction' as const, description: 'Главный католический собор Апии с красивой архитектурой, неоготика, историческое значение, центр города' }
        ];
      case 'senegal':
        return [
          { name: 'Дакар', lat: 14.6928, lng: -17.4467, type: 'city' as const, description: 'Столица Сенегала (3.9 млн), монумент африканского возрождения, порт, остров Горе, музеи, рынки, колониальная архитектура' },
          { name: 'Остров Горе', lat: 14.6673, lng: -17.3989, type: 'attraction' as const, description: 'Исторический остров, объект ЮНЕСКО, "Дверь без возврата", центр работорговли, музей, колониальные дома, 15 минут от Дакара' },
          { name: 'Розовое озеро Ретба', lat: 14.8422, lng: -17.2039, type: 'attraction' as const, description: 'Уникальное соленое озеро с розовой водой, добыча соли, концентрация соли 40%, популярное место для фото, 30 км от Дакара' },
          { name: 'Сен-Луи', lat: 16.0180, lng: -16.5119, type: 'city' as const, description: 'Колониальный город, объект ЮНЕСКО, колониальная архитектура, Джазовый фестиваль, остров на реке Сенегал, французская колония, мост Файдерб, 260 км от Дакара' },
          { name: 'Кап-Скиринг', lat: 12.3500, lng: -16.7500, type: 'resort' as const, description: 'Тропические пляжи Казаманса, курорты, серфинг, близость к Гамбии, регион Казаманс, традиционная культура' },
          { name: 'Парк Джудж', lat: 16.3000, lng: -16.2500, type: 'attraction' as const, description: 'Национальный парк, розовые фламинго и пеликаны, объект Рамсар, дельта реки Сенегал, более 400 видов птиц, сафари' },
          { name: 'Каменные круги Сенегамбии', lat: 13.7500, lng: -15.6167, type: 'attraction' as const, description: 'Археологические памятники, объект ЮНЕСКО, мегалиты III века до н.э., более 1000 каменных кругов, общие с Гамбией' },
          { name: 'Аэропорт Blaise Diagne', lat: 14.6700, lng: -17.0733, type: 'airport' as const, description: 'Международный аэропорт Дакара (DSS), главные воздушные ворота Сенегала, связь с Европой и Африкой' }
        ];
      case 'singapore':
      case 'singapur-gid':
        return [
          { name: 'Marina Bay Sands', lat: 1.2833, lng: 103.8607, type: 'attraction' as const, description: 'Иконический отель с бесконечным бассейном и обзорной площадкой, символ Сингапура' },
          { name: 'Gardens by the Bay', lat: 1.2816, lng: 103.8636, type: 'attraction' as const, description: 'Футуристические супердеревья и оранжереи, 101 га, Marina Bay, популярное место для фото, Сингапур, современная архитектура' },
          { name: 'Сингапурский зоопарк', lat: 1.4043, lng: 103.7930, type: 'attraction' as const, description: 'Один из лучших зоопарков мира без клеток, 28 га, более 300 видов животных, север Сингапура, популярное место' },
          { name: 'Сентоса', lat: 1.2494, lng: 103.8303, type: 'resort' as const, description: 'Курортный остров с пляжами и развлечениями, популярное место для отдыха' },
          { name: 'Сингапурский ботанический сад', lat: 1.3138, lng: 103.8159, type: 'attraction' as const, description: 'Объект ЮНЕСКО, национальный сад орхидей, исторический парк' },
          { name: 'Форт Каннинг', lat: 1.2956, lng: 103.8456, type: 'attraction' as const, description: 'Исторический холм, форт XIX века, археологические находки, парк' },
          { name: 'Чайнатаун', lat: 1.2827, lng: 103.8430, type: 'city' as const, description: 'Китайский квартал с храмом Buddha Tooth Relic, традиционная архитектура' },
          { name: 'Литтл Индия', lat: 1.3067, lng: 103.8521, type: 'city' as const, description: 'Индийский район с храмами и специями, культурный центр' },
          { name: 'Орчард Роуд', lat: 1.3048, lng: 103.8318, type: 'city' as const, description: 'Главная торговая улица с люксовыми брендами, шопинг в Сингапуре' },
          { name: 'Мерлион Парк', lat: 1.2868, lng: 103.8545, type: 'attraction' as const, description: 'Символ Сингапура, фото с Мерлионом, популярное место для туристов' },
          { name: 'Jewel Changi Airport', lat: 1.3644, lng: 103.9915, type: 'attraction' as const, description: 'Самый высокий крытый водопад в мире, архитектурная достопримечательность аэропорта' }
        ];
      case 'serbia':
        return [
          { name: 'Белград', lat: 44.8176, lng: 20.4633, type: 'city' as const, description: 'Столица Сербии на слиянии Савы и Дуная, крепость Калемегдан' },
          { name: 'Нови-Сад', lat: 45.2671, lng: 19.8335, type: 'city' as const, description: 'Культурная столица с фестивалем EXIT, Петроварадинская крепость' },
          { name: 'Ниш', lat: 43.3209, lng: 21.8954, type: 'city' as const, description: 'Третий по величине город Сербии (260 тыс.), родина императора Константина, крепость, башня черепов, археологический музей' },
          { name: 'Крепость Калемегдан', lat: 44.8225, lng: 20.4508, type: 'attraction' as const, description: 'Древняя крепость в центре Белграда с панорамными видами' },
          { name: 'Петроварадинская крепость', lat: 45.2511, lng: 19.8661, type: 'attraction' as const, description: '"Гибралтар на Дунае", место проведения фестиваля EXIT' },
          { name: 'Голубацкая крепость', lat: 44.6667, lng: 21.6333, type: 'attraction' as const, description: 'Средневековая крепость XIV века на Дунае, 9 башен, объект ЮНЕСКО' },
          { name: 'Национальный парк Тара', lat: 43.9167, lng: 19.4667, type: 'attraction' as const, description: 'Горы, изумрудная река Дрина, дом на скале' },
          { name: 'Златибор', lat: 43.7350, lng: 19.7100, type: 'resort' as const, description: 'Горный курорт, Шарганска осмица, Дрвенград' },
          { name: 'Суботица', lat: 46.1000, lng: 19.6667, type: 'city' as const, description: 'Архитектура сецессии, венгерское наследие' },
          { name: 'Врнячка Баня', lat: 43.6167, lng: 20.9000, type: 'resort' as const, description: 'Спа-курорт с термальными источниками' },
          { name: 'Ущелье Джердап', lat: 44.6667, lng: 22.1667, type: 'attraction' as const, description: 'Самое большое ущелье в Европе, Голубацкая крепость' },
          { name: 'Монастырь Студеница', lat: 43.4833, lng: 20.5333, type: 'attraction' as const, description: 'Монастырь ЮНЕСКО, усыпальница сербских королей' },
          { name: 'Аэропорт Никола Тесла', lat: 44.8184, lng: 20.3091, type: 'airport' as const, description: 'Международный аэропорт Белграда' }
        ];
      case 'slovakiya-gid':
      case 'slovakia':
        return [
          { name: 'Братислава', lat: 48.1486, lng: 17.1077, type: 'city' as const, description: 'Столица Словакии, Братиславский Град, исторический центр' },
          { name: 'Спишский Град', lat: 48.9500, lng: 20.7667, type: 'attraction' as const, description: 'Крупнейший средневековый замок в Центральной Европе, объект ЮНЕСКО' },
          { name: 'Высокие Татры', lat: 49.1644, lng: 20.1317, type: 'attraction' as const, description: 'Горный массив с живописными пейзажами и активным отдыхом, национальный парк' },
          { name: 'Кошице', lat: 48.7139, lng: 21.2581, type: 'city' as const, description: 'Вторая по величине, культурная столица Восточной Словакии, Собор св. Елизаветы' },
          { name: 'Замок Бойнице', lat: 48.6333, lng: 17.8667, type: 'attraction' as const, description: 'Самый романтичный замок Европы, зоопарк, популярное место для туристов' },
          { name: 'Замок Орава', lat: 49.4833, lng: 19.3000, type: 'attraction' as const, description: 'Один из самых фотографируемых замков, расположенный на скале, средневековая крепость' },
          { name: 'Попрад', lat: 49.0614, lng: 20.2981, type: 'city' as const, description: 'Ворота в Высокие Татры, близость к горнолыжным курортам' },
          { name: 'Банска Быстрица', lat: 48.7385, lng: 19.1531, type: 'city' as const, description: 'Горнодобывающий регион, замок Фердинанд, термы Радвань' },
          { name: 'Добшинская ледяная пещера', lat: 49.0000, lng: 18.8333, type: 'attraction' as const, description: 'Подземные ледники, существующие круглый год, уникальная природная достопримечательность' },
          { name: 'Раецкие Теплице', lat: 48.6333, lng: 17.8667, type: 'resort' as const, description: 'Термальные источники с лечебными свойствами, спа-курорт' },
          { name: 'Аэропорт Братислава', lat: 48.1700, lng: 17.2128, type: 'airport' as const, description: 'Международный аэропорт Братиславы (BTS), главные воздушные ворота Словакии' }
        ];
      case 'sloveniya-gid':
      case 'slovenia':
        return [
          { name: 'Любляна', lat: 46.0569, lng: 14.5058, type: 'city' as const, description: 'Столица Словении, зеленая столица Европы, Люблянский замок' },
          { name: 'Озеро Блед', lat: 46.3683, lng: 14.0947, type: 'attraction' as const, description: 'Иконическое озеро с островом и замком, жемчужина Словении, популярное место для туристов' },
          { name: 'Пещеры Постойна', lat: 45.7827, lng: 14.2031, type: 'attraction' as const, description: 'Самая известная пещера Словении, подземные чудеса, популярное место' },
          { name: 'Марибор', lat: 46.5547, lng: 15.6467, type: 'city' as const, description: 'Второй по величине город Словении (95 тыс.), винодельческий регион, старейшая виноградная лоза (400+ лет), замок, музеи, близость к Австрии' },
          { name: 'Пиран', lat: 45.5285, lng: 13.5684, type: 'city' as const, description: 'Венецианская жемчужина Адриатики, средневековый город, популярное место' },
          { name: 'Предъямский замок', lat: 45.8147, lng: 14.1267, type: 'attraction' as const, description: 'Замок в скале, уникальная архитектура, средневековая крепость' },
          { name: 'Озеро Бохинь', lat: 46.2833, lng: 13.8667, type: 'attraction' as const, description: 'Менее туристическое чем Блед, отличное место для хайкинга, природное озеро' },
          { name: 'Винтгар Горж', lat: 46.3839, lng: 14.0889, type: 'attraction' as const, description: 'Красивейшие мостики и водопады, природное ущелье, популярное место для фото' },
          { name: 'Пещеры Шкоцян', lat: 45.6631, lng: 13.9917, type: 'attraction' as const, description: 'Объект ЮНЕСКО, менее туристические чем Постойна, подземные пещеры' },
          { name: 'Логарская долина', lat: 46.3833, lng: 14.6167, type: 'attraction' as const, description: 'Альпийская ледниковая долина, водопад Ринка, идеально для хайкинга, природный парк' },
          { name: 'Аэропорт Любляна', lat: 46.2236, lng: 14.4576, type: 'airport' as const, description: 'Международный аэропорт Любляны им. Йоже Пучника (LJU), главные воздушные ворота Словении' }
        ];
      case 'solomonovy-ostrova-melaneziya-gid':
      case 'solomon-islands':
        return [
          { name: 'Хониара', lat: -9.4380, lng: 159.9497, type: 'city' as const, description: 'Столица Соломоновых Островов, административный и культурный центр' },
          { name: 'Айрон-Боттом-Саунд', lat: -9.3000, lng: 159.8000, type: 'attraction' as const, description: 'Крупнейшее кладбище кораблей WWII, подводный музей с 50+ затонувшими судами, популярное место для дайвинга' },
          { name: 'Лагуна Марово', lat: -8.4833, lng: 158.2500, type: 'attraction' as const, description: 'Крупнейшая соленая лагуна в мире (700 км²), объект ЮНЕСКО, природная достопримечательность' },
          { name: 'Водопады Матанико', lat: -9.4500, lng: 159.8500, type: 'attraction' as const, description: 'Серия живописных водопадов в 30 минутах от Хониары, природные бассейны' },
          { name: 'Остров черепов (Нью-Джорджия)', lat: -8.1000, lng: 157.2000, type: 'attraction' as const, description: 'Священное место с черепами предков, традиционная культура хедхантинга, историческое значение' },
          { name: 'Вулкан Тинакула', lat: -10.3833, lng: 165.8000, type: 'attraction' as const, description: 'Активный вулкан, лавовые потоки, горячие источники, уникальная экосистема' },
          { name: 'Пляж Бонеги', lat: -9.4667, lng: 159.8333, type: 'resort' as const, description: 'Пляж с черным вулканическим песком, остатки японского транспорта WWII, снорклинг' },
          { name: 'Культурная деревня Тенару', lat: -9.5000, lng: 160.0500, type: 'attraction' as const, description: 'Живая меланезийская культура, традиционные дома, ремесла, танцы' },
          { name: 'Заповедник Колобангара', lat: -8.0333, lng: 157.1833, type: 'attraction' as const, description: 'Потухший вулканический остров с уникальной флорой и фауной, эндемичные орхидеи, природный заповедник' },
          { name: 'Лагуна Вонгай', lat: -8.2000, lng: 157.7000, type: 'attraction' as const, description: 'Вторая по величине лагуна, уникальная экосистема с редкими видами кораллов' },
          { name: 'Остров Тетепаре', lat: -10.5000, lng: 165.9000, type: 'attraction' as const, description: 'Самый большой необитаемый вулканический остров, идеальное место для экотуризма' },
          { name: 'Аэропорт Хендерсон', lat: -9.4280, lng: 160.0546, type: 'airport' as const, description: 'Международный аэропорт Хендерсон в Хониаре (HIR), главные воздушные ворота Соломоновых Островов' }
        ];
      case 'south-africa':
        return [
          { name: 'Кейптаун', lat: -33.9249, lng: 18.4241, type: 'city' as const, description: 'Столица Западного Кейпа, V&A Waterfront, Bo-Kaap, набережная, популярное место для туристов' },
          { name: 'Столовая гора', lat: -33.9640, lng: 18.4037, type: 'attraction' as const, description: 'Канатная дорога, пешеходные тропы и панорамы двух океанов, символ Кейптауна' },
          { name: 'Мыс Доброй Надежды', lat: -34.3568, lng: 18.4721, type: 'attraction' as const, description: 'Национальный парк, колонии морских котиков и панорамные дороги, историческое место' },
          { name: 'Остров Роббен', lat: -33.8064, lng: 18.3661, type: 'attraction' as const, description: 'Тюрьма, где содержался Нельсон Мандела, объект ЮНЕСКО, музей, XVII-XX века' },
          { name: 'Парк Крюгер', lat: -24.0000, lng: 31.5000, type: 'attraction' as const, description: 'Самое известное сафари ЮАР, большая пятёрка и кемпы SANParks, национальный парк' },
          { name: 'Йоханнесбург', lat: -26.2041, lng: 28.0473, type: 'city' as const, description: 'Деловая столица, музей апартеида, кварталы Maboneng и Soweto' },
          { name: 'Дурбан', lat: -29.8587, lng: 31.0218, type: 'city' as const, description: 'Портовый город на Индийском океане, серфинг Golden Mile и индийская кухня' },
          { name: 'Гарден-Рут (Кнайсна)', lat: -34.0360, lng: 23.0469, type: 'resort' as const, description: 'Живописная дорога вдоль океана, лагуны и подвесные мосты, популярное место' },
          { name: 'Стелленбош', lat: -33.9349, lng: 18.8668, type: 'attraction' as const, description: 'Винодельческая столица, дегустации и архитектура Кейп-Датч' },
          { name: 'Драконовы горы (Амфитеатр)', lat: -28.5933, lng: 28.9340, type: 'attraction' as const, description: 'Объект ЮНЕСКО, водопад Тугела и трейлы любой сложности, горный массив' },
          { name: 'Пляж Боулдерс', lat: -34.1965, lng: 18.4511, type: 'resort' as const, description: 'Колония африканских пингвинов и спокойная бухта, популярное место для туристов' },
          { name: 'Пиланесберг', lat: -25.2523, lng: 27.0947, type: 'attraction' as const, description: 'Безмалярийный парк рядом с Сандтоном, сафари на 1–2 дня, национальный парк' },
          { name: 'Аэропорт OR Tambo', lat: -26.1337, lng: 28.2428, type: 'airport' as const, description: 'Главные воздушные ворота ЮАР (JNB), международный аэропорт Йоханнесбурга' }
        ];
      case 'yuzhnyi-sudan-gid':
      case 'south-sudan':
        return [
          { name: 'Джуба', lat: 4.8594, lng: 31.5713, type: 'city' as const, description: 'Столица Южного Судана, самый молодой город-столица в мире (2011)' },
          { name: 'Национальный парк Бандингило', lat: 7.0000, lng: 30.0000, type: 'attraction' as const, description: 'Вторая по величине миграция животных в мире: 1,2 млн антилоп коб, газелей и буйволов, национальный парк' },
          { name: 'Болота Судд', lat: 8.0000, lng: 30.5000, type: 'attraction' as const, description: 'Крупнейшее тропическое водно-болотное угодье мира (57,000 км²), плавучие острова папируса, крокодилы, бегемоты' },
          { name: 'Мавзолей доктора Джона Гаранга', lat: 4.8594, lng: 31.5713, type: 'attraction' as const, description: 'Памятник отцу независимости Южного Судана, современная архитектура, музей истории освободительной борьбы' },
          { name: 'Национальный парк Бома', lat: 6.8000, lng: 33.8000, type: 'attraction' as const, description: '22,800 км² дикой природы: слоны, жирафы, львы, дикие собаки, часть миграционного коридора, национальный парк' },
          { name: 'Горы Имматонг', lat: 3.9500, lng: 32.9000, type: 'attraction' as const, description: 'Высочайшие горы Южного Судана: гора Киньети (3,187 м), тропические леса, водопады, эндемичные виды' },
          { name: 'Румбек', lat: 6.8018, lng: 29.6786, type: 'city' as const, description: 'Региональный центр, культурный центр динка, традиционные жилища и ритуалы инициации' },
          { name: 'Национальный парк Лантото', lat: 5.0000, lng: 32.0000, type: 'attraction' as const, description: '760 км² саванны и леса, белые носороги (программа реинтродукции), антилопы, приматы, национальный парк' },
          { name: 'Водопады Фула', lat: 4.3500, lng: 28.2000, type: 'attraction' as const, description: 'Серия живописных водопадов в тропическом лесу, купание в природных бассейнах, редкие птицы' },
          { name: 'Аэропорт Джуба', lat: 4.8720, lng: 31.6011, type: 'airport' as const, description: 'Международный аэропорт Джубы (JUB), главные воздушные ворота страны' }
        ];
      case 'uzhnaya-koreya-gid':
      case 'south-korea':
        return [
          { name: 'Сеул', lat: 37.5665, lng: 126.9780, type: 'city' as const, description: 'Столица Южной Кореи: дворцы, небоскрёбы, K-Pop, шопинг в Мёндоне и Ганнаме' },
          { name: 'Дворец Кёнбоккун', lat: 37.5796, lng: 126.9770, type: 'attraction' as const, description: 'Главный королевский дворец династии Чосон (1395), церемония смены караула' },
          { name: 'N Seoul Tower', lat: 37.5512, lng: 126.9882, type: 'attraction' as const, description: 'Символ Сеула, панорамные виды и "замки любви" на ограждениях, популярное место' },
          { name: 'Пусан', lat: 35.1796, lng: 129.0756, type: 'city' as const, description: 'Морская столица Южной Кореи (3.4 млн), пляжи Хэундэ и Гваналли, крупнейший рыбный рынок Джагальчи, храм Хэдон Ёнгунса' },
          { name: 'Остров Чеджу', lat: 33.4996, lng: 126.5312, type: 'resort' as const, description: 'Вулканический остров, водопады, лавовые пещеры, пляжи и отели-курорты, популярное место' },
          { name: 'Кёнджу', lat: 35.8562, lng: 129.2247, type: 'attraction' as const, description: 'Древняя столица Силла (57 до н.э. - 935 н.э.), объект ЮНЕСКО, курганы, храм Пульгукса, музей под открытым небом' },
          { name: 'ДМЗ (Пханмунджом)', lat: 37.9539, lng: 126.7794, type: 'attraction' as const, description: 'Демилитаризованная зона, экскурсии в туннели и обсерваторию, историческое место' },
          { name: 'Инчхон', lat: 37.4563, lng: 126.7052, type: 'city' as const, description: 'Портовый город, Чайнатаун, парк Сонволь и мост Инчхон' },
          { name: 'Андон', lat: 36.5656, lng: 128.7250, type: 'attraction' as const, description: 'Деревня Хахве, объект ЮНЕСКО, традиционные маски и фестиваль масок' },
          { name: 'Чонджу', lat: 35.8242, lng: 127.1480, type: 'city' as const, description: 'Кулинарная столица, ханок-деревня и пибимпап' },
          { name: 'Сувон', lat: 37.2636, lng: 127.0286, type: 'attraction' as const, description: 'Крепость Хвасон (1794-1796), объект ЮНЕСКО, традиционные представления и фестивали' },
          { name: 'Аэропорт Инчхон', lat: 37.4602, lng: 126.4407, type: 'airport' as const, description: 'Главный международный аэропорт Южной Кореи (ICN), крупнейший аэропорт страны' }
        ];
      case 'cambodia':
      case 'cambodia-gid':
        return [
          { name: 'Пномпень', lat: 11.5564, lng: 104.9282, type: 'city' as const, description: 'Столица Камбоджи (2.2 млн), культурный и экономический центр, Королевский дворец, набережная Меконга' },
          { name: 'Сием Рип', lat: 13.3671, lng: 103.8448, type: 'city' as const, description: 'Город храмов Ангкор, главная туристическая достопримечательность, ворота к храмовому комплексу' },
          { name: 'Ангкор-Ват', lat: 13.4125, lng: 103.8669, type: 'attraction' as const, description: 'Крупнейший религиозный комплекс в мире, объект ЮНЕСКО XII века, восьмое чудо света' },
          { name: 'Храм Байон', lat: 13.4411, lng: 103.8592, type: 'attraction' as const, description: 'Храм с 200 каменными лицами Будды, последняя столица кхмерской империи, барельефы' },
          { name: 'Храм Та Пром', lat: 13.4347, lng: 103.8892, type: 'attraction' as const, description: 'Храм, поглощённый джунглями, место съёмок фильма "Лара Крофт", гигантские корни деревьев' },
          { name: 'Сиануквиль', lat: 10.6104, lng: 103.5265, type: 'resort' as const, description: 'Курортный город на побережье, пляжи, дайвинг, развитая инфраструктура, Сиамский залив' },
          { name: 'Пляж Отрес', lat: 10.5814, lng: 103.5050, type: 'resort' as const, description: 'Один из лучших пляжей страны, тихий и чистый, тропический рай' },
          { name: 'Баттамбанг', lat: 13.0957, lng: 103.2022, type: 'city' as const, description: 'Третий по величине город, бамбуковая железная дорога, аутентичная культура' },
          { name: 'Кампот', lat: 10.6104, lng: 104.1781, type: 'city' as const, description: 'Колониальный город, перец, плавучие отели, французская архитектура' },
          { name: 'Кеп', lat: 10.4833, lng: 104.3167, type: 'resort' as const, description: 'Старый французский курорт, рыбный рынок, тихие пляжи, крабовые рестораны' },
          { name: 'Озеро Тонлесап', lat: 13.1500, lng: 103.6000, type: 'attraction' as const, description: 'Плавучие деревни, крупнейшее озеро Юго-Восточной Азии, уникальная экосистема' },
          { name: 'Королевский дворец', lat: 11.5639, lng: 104.9314, type: 'attraction' as const, description: 'Действующая резиденция короля, Серебряная пагода с 5000 плиток, Пномпень' },
          { name: 'Храм Преа Вихеар', lat: 14.3928, lng: 104.6781, type: 'attraction' as const, description: 'Небесная крепость с панорамным видом на Таиланд, объект ЮНЕСКО, храм на утёсе' },
          { name: 'Кратие', lat: 12.4808, lng: 106.0186, type: 'city' as const, description: 'Город на Меконге, дельфины Иравади, речные круизы, природные достопримечательности' },
          { name: 'Остров Ко Ронг', lat: 10.6833, lng: 103.2833, type: 'resort' as const, description: 'Остров с райскими пляжами, белый песок, кристальная вода, тропический рай' },
          { name: 'Бамбуковая железная дорога', lat: 13.1036, lng: 103.1986, type: 'attraction' as const, description: 'Уникальный вид транспорта, поездка туда-обратно, красивые виды на рисовые поля, Баттамбанг' },
          { name: 'Музей геноцида Туол Сленг', lat: 11.5497, lng: 104.9178, type: 'attraction' as const, description: 'Музей жертв режима красных кхмеров, бывшая тюрьма S-21, важная страница истории' }
        ];
      case 'yuzhnaya-osetiya-gid':
      case 'south-ossetia':
        return [
          { name: 'Цхинвал', lat: 42.2278, lng: 43.9693, type: 'city' as const, description: 'Столица Южной Осетии, административный центр, основные достопримечательности' },
          { name: 'Цхинвальская крепость', lat: 42.2278, lng: 43.9693, type: 'attraction' as const, description: 'Древняя крепость в центре города, частично разрушенная в 2008 году, отличные виды' },
          { name: 'Джавское ущелье', lat: 42.4167, lng: 43.7833, type: 'attraction' as const, description: 'Живописное горное ущелье с водопадами и древними башнями, популярно для походов' },
          { name: 'Монастырь Бетлеми', lat: 42.2833, lng: 43.8500, type: 'attraction' as const, description: 'Древний православный монастырь XI века в горном ущелье, место паломничества' },
          { name: 'Перевал Мамисон', lat: 42.7000, lng: 43.8000, type: 'attraction' as const, description: 'Высокогорный перевал (2820 м) с потрясающими видами, зимой горнолыжный курорт' },
          { name: 'Башни в Кехви', lat: 42.3500, lng: 43.7167, type: 'attraction' as const, description: 'Средневековые осетинские башни XII-XVI веков, образцы горской архитектуры' },
          { name: 'Минеральные источники Багиаты', lat: 42.4000, lng: 44.1000, type: 'attraction' as const, description: 'Целебные минеральные источники с высоким содержанием железа и серы' },
          { name: 'Национальный парк Алагирский', lat: 42.5500, lng: 43.9000, type: 'attraction' as const, description: 'Горный заповедник с редкими видами флоры и фауны, маршруты для треккинга' },
          { name: 'Храм Святого Георгия в Джави', lat: 42.4167, lng: 43.7500, type: 'attraction' as const, description: 'Древний храм XIII века, посвященный покровителю Осетии святому Георгию' },
          { name: 'Зарамагские теснины', lat: 42.6833, lng: 43.8167, type: 'attraction' as const, description: 'Узкое горное ущелье с отвесными скалами и бурной рекой, рафтинг и альпинизм' }
        ];
      case 'ispaniya-gid':
      case 'spain':
        return [
          { name: 'Мадрид', lat: 40.4168, lng: -3.7038, type: 'city' as const, description: 'Столица Испании: Прадо, Королевский дворец, Ретиро, ночная жизнь' },
          { name: 'Барселона', lat: 41.3851, lng: 2.1734, type: 'city' as const, description: 'Столица Каталонии: Саграда Фамилия, Парк Гуэль, Готический квартал' },
          { name: 'Севилья', lat: 37.3891, lng: -5.9845, type: 'city' as const, description: 'Столица Андалусии: Алькасар, кафедральный собор, фламенко' },
          { name: 'Альгамбра', lat: 37.1760, lng: -3.5881, type: 'attraction' as const, description: 'Мавританский дворец в Гранаде, объект UNESCO, сады Хенералифе' },
          { name: 'Алькасар Севильи', lat: 37.3839, lng: -5.9914, type: 'attraction' as const, description: 'Королевский дворец XIV века, объект ЮНЕСКО, мудехарская архитектура, сады' },
          { name: 'Валенсия', lat: 39.4699, lng: -0.3763, type: 'city' as const, description: 'Город искусств и наук, паэлья, пляжи Коста-Бланка' },
          { name: 'Бильбао', lat: 43.2627, lng: -2.9253, type: 'city' as const, description: 'Музей Гуггенхайм, Страна Басков, гастрономия' },
          { name: 'Мескита', lat: 37.8791, lng: -4.7798, type: 'attraction' as const, description: 'Мечеть-собор в Кордове, объект UNESCO, лес колонн' },
          { name: 'Сантьяго-де-Компостела', lat: 42.8782, lng: -8.5448, type: 'attraction' as const, description: 'Конец Камино де Сантьяго, кафедральный собор, паломнический путь' },
          { name: 'Толедо', lat: 39.8628, lng: -4.0273, type: 'city' as const, description: 'Древняя столица, объект UNESCO, средневековые улицы и собор' },
          { name: 'Алькасар Толедо', lat: 39.8581, lng: -4.0226, type: 'attraction' as const, description: 'Крепость-дворец, символ Толедо, музей армии, панорамные виды' },
          { name: 'Пальма-де-Майорка', lat: 39.5696, lng: 2.6502, type: 'resort' as const, description: 'Столица Балеарских островов, пляжи, собор и замок Бельвер' },
          { name: 'Аэропорт Мадрид-Барахас', lat: 40.4839, lng: -3.5680, type: 'airport' as const, description: 'Главный международный аэропорт Испании (MAD)' }
        ];
      case 'shri-lanka-gid':
      case 'sri-lanka':
        return [
          { name: 'Коломбо', lat: 6.9271, lng: 79.8612, type: 'city' as const, description: 'Столица и коммерческий центр, международный аэропорт' },
          { name: 'Канди', lat: 7.2940, lng: 80.6350, type: 'city' as const, description: 'Культурная столица, храм Зуба Будды, священная гора' },
          { name: 'Храм Зуба Будды', lat: 7.2940, lng: 80.6414, type: 'attraction' as const, description: 'Священный храм с зубом Будды, объект ЮНЕСКО, XVII век, главная буддийская святыня' },
          { name: 'Сигирия', lat: 7.9570, lng: 80.7603, type: 'attraction' as const, description: 'Львиная скала, древняя крепость, объект UNESCO' },
          { name: 'Элла', lat: 6.8667, lng: 81.0500, type: 'city' as const, description: 'Горный курорт, пешие маршруты, водопады, живописные пейзажи' },
          { name: 'Галле', lat: 6.0329, lng: 80.2170, type: 'city' as const, description: 'Голландская крепость, объект UNESCO, колониальное наследие' },
          { name: 'Мирисса', lat: 5.9486, lng: 80.4553, type: 'resort' as const, description: 'Популярный пляж, наблюдение за китами, золотые пески' },
          { name: 'Аругам Бэй', lat: 6.8333, lng: 81.8333, type: 'resort' as const, description: 'Один из лучших серф-спотов Азии, уединенные пляжи' },
          { name: 'Национальный парк Яла', lat: 6.3667, lng: 81.3833, type: 'attraction' as const, description: 'Сафари, леопарды, слоны, богатая дикая природа' },
          { name: 'Нувара Элия', lat: 6.9497, lng: 80.7891, type: 'city' as const, description: 'Чайные плантации, английская архитектура, прохладный климат' },
          { name: 'Полоннарува', lat: 7.9333, lng: 81.0000, type: 'attraction' as const, description: 'Древний город, археологический памятник, объект UNESCO' },
          { name: 'Анурадхапура', lat: 8.3114, lng: 80.4037, type: 'attraction' as const, description: 'Древняя столица, археологический памятник, объект UNESCO' },
          { name: 'Аэропорт Бандаранаике', lat: 7.1756, lng: 79.8842, type: 'airport' as const, description: 'Главный международный аэропорт Шри-Ланки (CMB)' }
        ];
      case 'sudan':
        return [
          { name: 'Хартум', lat: 15.5518, lng: 32.5324, type: 'city' as const, description: 'Столица Судана, слияние Белого и Голубого Нила, культурный центр' },
          { name: 'Пирамиды Мероэ', lat: 16.9392, lng: 33.7278, type: 'attraction' as const, description: 'Более 200 пирамид царства Куш, объект UNESCO, древний некрополь' },
          { name: 'Джебель-Баркал', lat: 18.5362, lng: 31.8236, type: 'attraction' as const, description: 'Священная гора, древняя столица Напата, объект UNESCO, храм Амона' },
          { name: 'Керма', lat: 19.6167, lng: 30.4167, type: 'attraction' as const, description: 'Первая столица Нубии (2500-1500 гг. до н.э.), древнейшее африканское царство' },
          { name: 'Порт-Судан', lat: 19.6200, lng: 37.2200, type: 'city' as const, description: 'Морской порт, ворота к Красному морю, дайвинг, нетронутые рифы' },
          { name: 'Старая Донгола', lat: 19.1667, lng: 30.4833, type: 'attraction' as const, description: 'Руины средневекового христианского царства, фрески, древние рукописи' },
          { name: 'Национальный парк Диндер', lat: 12.8000, lng: 35.3000, type: 'attraction' as const, description: 'Крупнейший национальный парк (10,000 км²), сафари, большая африканская пятёрка' },
          { name: 'Нага и Мусавварат', lat: 16.2667, lng: 33.2833, type: 'attraction' as const, description: 'Эллинистические храмы I века н.э., синтез египетского и римского искусства' },
          { name: 'Байюда', lat: 18.5000, lng: 31.0000, type: 'attraction' as const, description: 'Каменистая пустыня, наскальные рисунки возрастом до 6000 лет, караванные пути' },
          { name: 'Фарас', lat: 22.2000, lng: 31.5000, type: 'attraction' as const, description: 'Затопленный древний город, фрески VII-XII веков в музеях Хартума и Варшавы' },
          { name: 'Омдурман', lat: 15.6367, lng: 32.4778, type: 'city' as const, description: 'Крупнейший город (2.5 млн), историческая столица, рынки, мечети' },
          { name: 'Аэропорт Хартум', lat: 15.5895, lng: 32.5532, type: 'airport' as const, description: 'Международный аэропорт Хартума (KRT), главные воздушные ворота страны' }
        ];
      case 'suriname':
        return [
          { name: 'Парамарибо', lat: 5.8253, lng: -55.1673, type: 'city' as const, description: 'Столица Суринама, исторический центр ЮНЕСКО, голландская колониальная архитектура' },
          { name: 'Исторический центр Парамарибо', lat: 5.8253, lng: -55.1673, type: 'attraction' as const, description: 'Объект ЮНЕСКО, деревянные дома XVIII-XIX веков, собор Святого Петра и Павла' },
          { name: 'Центральный природный заповедник', lat: 4.0000, lng: -56.0000, type: 'attraction' as const, description: 'Крупнейший девственный тропический лес мира, объект ЮНЕСКО, 1.6 млн гектаров' },
          { name: 'Пляж Галиби', lat: 5.8667, lng: -54.6000, type: 'resort' as const, description: 'Крупнейшее гнездовье кожистых черепах, индейская деревня калинья, мангровые леса' },
          { name: 'Природный парк Браунсберг', lat: 4.9333, lng: -55.1500, type: 'attraction' as const, description: 'Доступные джунгли с водопадами, пешие тропы, наблюдение за обезьянами и птицами' },
          { name: 'Река Коммевейне', lat: 5.4500, lng: -54.9500, type: 'attraction' as const, description: 'Плантационный маршрут, деревни маронов, руины голландских плантаций XVIII века' },
          { name: 'Национальный парк Кеси', lat: 5.8000, lng: -56.5000, type: 'attraction' as const, description: '🦜 Мангровые леса и болота, сотни видов птиц, розовые фламинго, ибисы, попугаи' },
          { name: 'Форт Зеландия', lat: 5.8288, lng: -55.1647, type: 'attraction' as const, description: 'Историческая крепость XVII века, музей истории, центр голландской колониальной администрации' },
          { name: 'Ботанический сад Палментуин', lat: 5.8333, lng: -55.1667, type: 'attraction' as const, description: 'Старейший ботанический сад Южной Америки (1695), тропическая флора, оазис спокойствия' },
          { name: 'Ньив-Никкери', lat: 5.9389, lng: -56.9897, type: 'city' as const, description: 'Приграничный городок, голландская архитектура, рисовые плантации, ворота в Гайану' },
          { name: 'Культурный центр Анд-да-Фри', lat: 5.8200, lng: -55.1700, type: 'attraction' as const, description: 'Главный культурный центр, кашакла (суринамская музыка), танцы разных народов, сувениры' },
          { name: 'Аэропорт Йохана Адольфа Пенгеля', lat: 5.4528, lng: -55.1878, type: 'airport' as const, description: 'Главный международный аэропорт Суринама (PBM)' }
        ];
      case 'sweden':
        return [
          { name: 'Стокгольм', lat: 59.3293, lng: 18.0686, type: 'city' as const, description: 'Столица Швеции (980 тыс.), "Красавица на воде", расположена на 14 островах, Балтийское море, музеи, Гамла Стан, объект ЮНЕСКО' },
          { name: 'Гамла Стан', lat: 59.3256, lng: 18.0714, type: 'attraction' as const, description: 'Старый город Стокгольма, средневековые улочки, Королевский дворец, объект ЮНЕСКО, XIII век, популярное место для туристов' },
          { name: 'Королевский дворец Стокгольма', lat: 59.3269, lng: 18.0714, type: 'attraction' as const, description: 'Официальная резиденция шведских монархов, объект культурного наследия, XVIII век, 608 комнат' },
          { name: 'Музей Васа', lat: 59.3280, lng: 18.0914, type: 'attraction' as const, description: '⛵ Единственный сохранившийся корабль XVII века, музей-корабль, затонул в 1628, поднят в 1961, Стокгольм, популярный музей' },
          { name: 'Музей ABBA', lat: 59.3286, lng: 18.0967, type: 'attraction' as const, description: 'Интерактивный музей легендарной группы ABBA, Стокгольм, костюмы, музыка, интерактивные экспонаты, популярное место' },
          { name: 'Гётеборг', lat: 57.7089, lng: 11.9746, type: 'city' as const, description: 'Второй по величине город Швеции (580 тыс.), порт на Северном море, парк развлечений Лисеберг, музеи, каналы, университет' },
          { name: 'Мальмё', lat: 55.6059, lng: 13.0007, type: 'city' as const, description: 'Город на юге (350 тыс.), соединен Эресуннским мостом с Копенгагеном, современная архитектура, музей, порт, юг Швеции' },
          { name: 'Висбю', lat: 57.6348, lng: 18.2948, type: 'city' as const, description: 'Средневековый город на острове Готланд (25 тыс.), объект ЮНЕСКО, крепостные стены, руины, Балтийское море, популярное место' },
          { name: 'Абиску', lat: 68.3497, lng: 18.8311, type: 'attraction' as const, description: '🌌 Лучшее место для наблюдения северного сияния, национальный парк, Лапландия, север Швеции, научная станция, треккинг' },
          { name: 'Юккасъярви', lat: 67.8500, lng: 20.6000, type: 'resort' as const, description: 'Ледяной отель, уникальный опыт ночевки в ледяных номерах, Лапландия, северное сияние, север Швеции, популярное место' },
          { name: 'Королевская тропа (Кунгследен)', lat: 68.0000, lng: 18.0000, type: 'attraction' as const, description: '🥾 Легендарный пеший маршрут через Лапландию, 440 км, горы, долины, хижины, север Швеции, популярный треккинг' },
          { name: 'Стокгольмский архипелаг', lat: 59.4000, lng: 18.8000, type: 'attraction' as const, description: 'Около 30 000 островов, идеальное место для летнего отдыха, Балтийское море, круизы, пляжи, близость к Стокгольму' },
          { name: 'Аэропорт Арланда', lat: 59.6519, lng: 17.9186, type: 'airport' as const, description: 'Главный международный аэропорт Стокгольма (ARN)' }
        ];
      case 'shveitsariya-gid':
      case 'switzerland':
        return [
          { name: 'Берн', lat: 46.9480, lng: 7.4474, type: 'city' as const, description: 'Столица Швейцарии (135 тыс.), исторический центр ЮНЕСКО, медведи, Цитглогге, река Ааре, собор, центр страны, франкоязычный регион' },
          { name: 'Цюрих', lat: 47.3769, lng: 8.5417, type: 'city' as const, description: 'Крупнейший город (420 тыс.), финансовый центр, международный аэропорт, культурная столица, озеро, река Лиммат, север Швейцарии' },
          { name: 'Женева', lat: 46.2044, lng: 6.1432, type: 'city' as const, description: 'Второй по величине город Швейцарии (200 тыс.), международные организации (ООН, Красный Крест), озеро Леман, фонтан Же до, Старый город, музеи' },
          { name: 'Маттерхорн', lat: 45.9763, lng: 7.6586, type: 'attraction' as const, description: 'Самая узнаваемая гора мира (4478 м), культовая вершина Альп, Церматт, граница с Италией, альпинизм, юг Швейцарии' },
          { name: 'Юнгфрауйох', lat: 46.5472, lng: 7.9758, type: 'attraction' as const, description: '🚂 Самая высокая ж/д станция Европы (3454 м), ледяной дворец, панорама на Альпы, объект ЮНЕСКО, центр Швейцарии, популярное место' },
          { name: 'Интерлакен', lat: 46.6863, lng: 7.8632, type: 'city' as const, description: 'Сердце Альп (5.5 тыс.), база для походов, между двух озёр, доступ к Юнгфрауйоху, центр Швейцарии, популярное место для туристов' },
          { name: 'Люцерн', lat: 47.0502, lng: 8.3093, type: 'city' as const, description: 'Классическая Швейцария (85 тыс.), озеро, горы, исторический центр, гора Пилатус, мост Капельбрюкке, центр Швейцарии' },
          { name: 'Церматт', lat: 46.0207, lng: 7.7491, type: 'resort' as const, description: '⛷ У подножия Маттерхорна (5.5 тыс.), горнолыжный курорт, круглогодичные лыжи, без автомобилей, юг Швейцарии, популярное место' },
          { name: 'Базель', lat: 47.5596, lng: 7.5886, type: 'city' as const, description: 'Третий по величине город Швейцарии (175 тыс.), культурная столица на границе с Германией и Францией, музеи, карнавал, университет' },
          { name: 'Лозанна', lat: 46.5197, lng: 6.6323, type: 'city' as const, description: 'Четвёртый по величине город (140 тыс.), олимпийская столица, озеро Леман, собор, университеты, запад Швейцарии, франкоязычный регион' },
          { name: 'Рейнский водопад', lat: 47.6772, lng: 8.6175, type: 'attraction' as const, description: 'Самый мощный водопад Европы (23 м высота, 150 м ширина), смотровые площадки, лодочные экскурсии, север Швейцарии, граница с Германией' },
          { name: 'Замок Шильон', lat: 46.4142, lng: 6.9275, type: 'attraction' as const, description: 'Средневековый замок на берегу Женевского озера, XIII век, вдохновил Байрона' },
          { name: 'Аэропорт Цюрих', lat: 47.4647, lng: 8.5492, type: 'airport' as const, description: 'Главный международный аэропорт Швейцарии (ZRH)' }
        ];
      case 'siriya-gid':
      case 'syria':
        return [
          { name: 'Дамаск', lat: 33.5138, lng: 36.2765, type: 'city' as const, description: 'Столица Сирии, древнейший постоянно населенный город мира (4000+ лет), объект ЮНЕСКО' },
          { name: 'Мечеть Омейядов', lat: 33.5119, lng: 36.3064, type: 'attraction' as const, description: 'Одна из древнейших мечетей мира (VIII век), мозаики с золотым фоном, усыпальница Иоанна Крестителя' },
          { name: 'Алеппо', lat: 36.2021, lng: 37.1343, type: 'city' as const, description: 'Древний город (4000 лет), объект ЮНЕСКО, цитадель, Великая мечеть, сильно поврежден в конфликте' },
          { name: 'Цитадель Алеппо', lat: 36.1992, lng: 37.1625, type: 'attraction' as const, description: 'Одна из крупнейших крепостей мира, средневековая архитектура, повреждена обстрелами' },
          { name: 'Пальмира', lat: 34.5500, lng: 38.2667, type: 'attraction' as const, description: 'Древний торговый город на Шелковом пути, объект ЮНЕСКО, "Невеста пустыни", частично разрушена ИГИЛ' },
          { name: 'Крак-де-Шевалье', lat: 34.7556, lng: 36.2944, type: 'attraction' as const, description: 'Лучше всего сохранившийся замок крестоносцев (XII век), объект ЮНЕСКО, поврежден артобстрелами' },
          { name: 'Босра', lat: 32.5167, lng: 36.4833, type: 'attraction' as const, description: 'Римский театр II века (лучший в мире), объект ЮНЕСКО, древняя столица римской провинции Аравия' },
          { name: 'Угарит (Рас-Шамра)', lat: 35.6000, lng: 35.7833, type: 'attraction' as const, description: '📜 Родина первого алфавита человечества (XIV век до н.э.), дворец и храмы бронзового века' },
          { name: 'Мари (Тель-Харири)', lat: 34.5500, lng: 40.8833, type: 'attraction' as const, description: 'Дворец XVIII века до н.э., 25000 клинописных табличек, месопотамская культура' },
          { name: 'Дура-Европос', lat: 34.7500, lng: 40.7333, type: 'attraction' as const, description: '"Помпеи Сирии" — идеально сохранившийся город, синагога с фресками III века, разграблен' },
          { name: 'Апамея', lat: 35.4167, lng: 36.4000, type: 'attraction' as const, description: 'Главная колоннада длиной 2 км, римские и византийские мозаики, эллинистическое планирование' },
          { name: 'Аэропорт Дамаск', lat: 33.4106, lng: 36.5156, type: 'airport' as const, description: 'Международный аэропорт Дамаска (DAM), частично функционирует' }
        ];
      case 'taiwan':
        return [
          { name: 'Тайбэй', lat: 25.0330, lng: 121.5654, type: 'city' as const, description: 'Столица Тайваня (2.7 млн), современный мегаполис, ночные рынки, храмы' },
          { name: 'Тайбэй 101', lat: 25.0338, lng: 121.5645, type: 'attraction' as const, description: 'Небоскреб высотой 508 м, бывший самый высокий в мире, смотровая площадка, символ Тайваня' },
          { name: 'Национальный дворец-музей', lat: 25.1024, lng: 121.5485, type: 'attraction' as const, description: 'Крупнейшая коллекция китайского искусства в мире (700 000 экспонатов), древние артефакты' },
          { name: 'Храм Луншань', lat: 25.0372, lng: 121.4996, type: 'attraction' as const, description: '🛕 Один из старейших храмов Тайбэя (1738), буддийский и даосский храм, традиционная архитектура' },
          { name: 'Тайнань', lat: 22.9993, lng: 120.2269, type: 'city' as const, description: 'Древняя столица Тайваня, "город ста храмов", исторический центр, традиционная культура' },
          { name: 'Национальный парк Тароко', lat: 24.1583, lng: 121.3000, type: 'attraction' as const, description: 'Мраморное ущелье невероятной красоты, горные тропы, водопады, уникальная природа' },
          { name: 'Озеро Солнца и Луны', lat: 23.8569, lng: 120.9153, type: 'attraction' as const, description: 'Живописное озеро в центре острова, горные пейзажи, храмы, популярное место для фото' },
          { name: 'Цзюфэнь', lat: 25.1097, lng: 121.8442, type: 'attraction' as const, description: '🏮 Старый горный город, узкие улочки, фонари, чайные дома, вдохновил аниме "Унесенные призраками"' },
          { name: 'Гаосюн', lat: 22.6273, lng: 120.3014, type: 'city' as const, description: 'Второй по величине город Тайваня (2.7 млн), крупнейший порт, современная архитектура, ночная жизнь, храмы, музеи, близость к пляжам' },
          { name: 'Алишань', lat: 23.5100, lng: 120.8100, type: 'attraction' as const, description: 'Горный курорт, древние кипарисы, рассветы, узкоколейная железная дорога, облачные леса' },
          { name: 'Кендинг', lat: 22.0042, lng: 120.7478, type: 'resort' as const, description: 'Тропический курорт на юге, пляжи, коралловые рифы, национальный парк, серфинг' },
          { name: 'Аэропорт Таоюань', lat: 25.0797, lng: 121.2342, type: 'airport' as const, description: 'Главный международный аэропорт Тайваня (TPE), связь с миром' }
        ];
      case 'tajikistan':
        return [
          { name: 'Душанбе', lat: 38.5367, lng: 68.7800, type: 'city' as const, description: 'Столица Таджикистана (820 тыс.), парки, музеи, самый высокий в мире флагшток (165 м), Дворец Наций' },
          { name: 'Дворец Наций', lat: 38.5800, lng: 68.7800, type: 'attraction' as const, description: 'Президентский дворец, символ независимости, архитектурная достопримечательность' },
          { name: 'Худжанд', lat: 40.2833, lng: 69.6333, type: 'city' as const, description: 'Один из древнейших городов Центральной Азии, знаменитый рынок Панджшанбе, крепость' },
          { name: 'Крепость Худжанда', lat: 40.2833, lng: 69.6333, type: 'attraction' as const, description: 'Древняя крепость, объект культурного наследия, остатки фортификаций, музей' },
          { name: 'Рынок Панджшанбе', lat: 40.2833, lng: 69.6333, type: 'attraction' as const, description: '🏪 Один из крупнейших рынков Центральной Азии, традиционные товары, специи, ковры' },
          { name: 'Пенджикент', lat: 39.5000, lng: 67.6167, type: 'attraction' as const, description: 'Руины древнего согдийского города (V-VIII века) на Великом шелковом пути, музей, фрески' },
          { name: 'Озеро Искандеркуль', lat: 39.0750, lng: 68.3667, type: 'attraction' as const, description: 'Легендарное озеро в Фанских горах, названное в честь Александра Македонского, высота 2195 м' },
          { name: 'Семь озер (Хафткул)', lat: 39.2000, lng: 68.5000, type: 'attraction' as const, description: 'Каскад из семи озер разного цвета в узком ущелье Фанских гор, невероятная красота' },
          { name: 'Памирский тракт (М41)', lat: 38.5000, lng: 72.0000, type: 'attraction' as const, description: '🛣 Одна из самых высокогорных и живописных дорог в мире (700 км), высота до 4655 м, Душанбе-Ош' },
          { name: 'Ваханская долина', lat: 37.0000, lng: 73.0000, type: 'attraction' as const, description: 'Зеленый коридор вдоль реки Пяндж на границе с Афганистаном, древние крепости, виды на Гиндукуш' },
          { name: 'Озеро Каракуль', lat: 39.0000, lng: 73.5000, type: 'attraction' as const, description: 'Бессточное соленое озеро в ударном кратере на высоте 3914 метров, площадь 380 км²' },
          { name: 'Пик Исмоила Сомони', lat: 38.9436, lng: 72.0150, type: 'attraction' as const, description: 'Высшая точка Таджикистана (7495 м), бывший пик Коммунизма, альпинизм, Памир' },
          { name: 'Гиссарская крепость', lat: 38.5167, lng: 68.5333, type: 'attraction' as const, description: 'Древняя крепость недалеко от Душанбе, музей под открытым небом, историческое наследие' },
          { name: 'Аэропорт Душанбе', lat: 38.5433, lng: 68.8250, type: 'airport' as const, description: 'Главный международный аэропорт Таджикистана (DYU), связь с миром' }
        ];
      case 'somalia':
        return [
          { name: 'Могадишо', lat: 2.0469, lng: 45.3182, type: 'city' as const, description: 'Столица Сомали (2.4 млн), исторический порт на Африканском Роге, Индийский океан, мечети, рынки, колониальная архитектура, пляжи' },
          { name: 'Харгейса', lat: 9.5624, lng: 44.0770, type: 'city' as const, description: 'Столица Сомалиленда (1.2 млн), более безопасный и развитый регион, рынки, университеты, культурный центр, север Сомали' },
          { name: 'Бербера', lat: 10.4396, lng: 45.0143, type: 'city' as const, description: '⚓ Ключевой порт на побережье Сомалиленда (200 тыс.), ворота в Красное море, пляжи, торговый центр, близость к Харгейсе' },
          { name: 'Пещеры Лаас-Гааль', lat: 9.6333, lng: 44.5167, type: 'attraction' as const, description: '🖐 Комплекс пещер с древними наскальными рисунками (5-10 тыс. лет), объект ЮНЕСКО, скотоводческие сцены, близость к Харгейсе' },
          { name: 'Пляж Лидо', lat: 2.0227, lng: 45.3336, type: 'resort' as const, description: 'Популярный пляж Могадишо с белым песком и Индийским океаном, историческое место отдыха, близость к центру города' },
          { name: 'Гора Шимбирис', lat: 10.2214, lng: 47.3689, type: 'attraction' as const, description: 'Высшая точка страны (2416 м) в горах Каркур, вулканический пик, панорамные виды, север Сомали, треккинг' },
          { name: 'Кисмайо', lat: -0.3556, lng: 42.5183, type: 'city' as const, description: '🛳 Южный портовый город (200 тыс.) и центр экспорта сельхозпродукции, Индийский океан, бананы, манго, юг Сомали' },
          { name: 'Босасо', lat: 11.2842, lng: 49.1816, type: 'city' as const, description: 'Торговый порт на побережье Аденского залива (250 тыс.), северо-восток Сомали, рыболовство, рынки, близость к горам' },
          { name: 'Галькайо', lat: 6.7697, lng: 47.4308, type: 'city' as const, description: 'Узловой город между севером и югом (545 тыс.), центр караванных путей, рынки, торговля, центральная Сомали' },
          { name: 'Национальный парк Даалло', lat: 10.4667, lng: 44.5333, type: 'attraction' as const, description: 'Заповедная зона с редкими хвойными лесами и эндемиками, горы, уникальная флора, север Сомали, близость к Эфиопии' },
          { name: 'Аэропорт Аден Адде', lat: 2.0144, lng: 45.3047, type: 'airport' as const, description: 'Международный аэропорт Могадишо (MGQ), главный вход в страну, связь с регионом и международными рейсами' }
        ];
      case 'somaliland':
        return [
          { name: 'Харгейса', lat: 9.5624, lng: 44.0770, type: 'city' as const, description: 'Столица Сомалиленда (1.2 млн), безопасный культурный центр, рынки, университеты, музеи, мирная обстановка, север Сомали' },
          { name: 'Бербера', lat: 10.4396, lng: 45.0143, type: 'city' as const, description: 'Порт на Красном море с лучшими пляжами региона (200 тыс.), курорты, дайвинг, торговый центр, близость к Харгейсе' },
          { name: 'Пещеры Лаас-Гааль', lat: 9.6333, lng: 44.5167, type: 'attraction' as const, description: '🖐 Наскальные рисунки возрастом 5-10 тыс. лет, объект UNESCO, скотоводческие сцены, древнее искусство, близость к Харгейсе' },
          { name: 'Зейла', lat: 11.3500, lng: 43.4667, type: 'city' as const, description: '🏺 Древний портовый город с мечетями XIII века (50 тыс.), историческое значение, Красное море, колониальная архитектура, север' },
          { name: 'Борама', lat: 9.9400, lng: 43.1800, type: 'city' as const, description: '🎓 Университетский город и центр культуры Аудала (150 тыс.), образование, традиционная культура, запад Сомалиленда' },
          { name: 'Бурао', lat: 9.5236, lng: 45.5363, type: 'city' as const, description: '🛣 Узловой торговый центр к востоку от столицы (200 тыс.), рынки, караванные пути, восток Сомалиленда, торговля' },
          { name: 'Эригабо', lat: 10.6167, lng: 47.3679, type: 'city' as const, description: 'Ворота в горы Галь и заповедник Даалло' },
          { name: 'Гора Шимбирис', lat: 10.2716, lng: 47.3656, type: 'attraction' as const, description: 'Высшая точка Сомалиленда (2416 м)' },
          { name: 'Национальный парк Даалло', lat: 10.4500, lng: 44.5333, type: 'attraction' as const, description: 'Влажные леса, хвойные деревья и эндемики' },
          { name: 'Пляжи Берберы', lat: 10.4120, lng: 45.0180, type: 'resort' as const, description: 'Белый песок и коралловые рифы Красного моря' },
          { name: 'Аэропорт Эгал', lat: 9.5184, lng: 44.0888, type: 'airport' as const, description: 'Международный аэропорт Харгейсы (HGA)' }
        ];
      case 'chad':
        return [
          { name: 'Нджамена', lat: 12.1348, lng: 15.0557, type: 'city' as const, description: 'Столица Чада (1.2 млн), расположена на реке Шари у границы с Камеруном, рынки, мечети, национальный музей' },
          { name: 'Озеро Чад', lat: 13.5000, lng: 14.0000, type: 'attraction' as const, description: 'Крупнейшее озеро региона Сахель, уникальная экосистема' },
          { name: 'Горы Тибести', lat: 21.0000, lng: 17.0000, type: 'attraction' as const, description: 'Высочайший горный массив Сахары с пиком Эми-Куси (3415 м)' },
          { name: 'Плато Эннеди', lat: 18.0000, lng: 21.0000, type: 'attraction' as const, description: 'Песчаниковые плато с каньонами и арками, объект ЮНЕСКО' },
          { name: 'Национальный парк Закума', lat: 10.5000, lng: 19.5000, type: 'attraction' as const, description: 'Крупнейший национальный парк страны с популяцией слонов' },
          { name: 'Сарх', lat: 9.1425, lng: 18.3929, type: 'city' as const, description: 'Второй по величине город Чада (100 тыс.), культурный центр народа сара, рынки, музеи, близость к национальным паркам, река Шари' },
          { name: 'Абеше', lat: 13.0500, lng: 20.7000, type: 'city' as const, description: 'Исторический город с мечетями и памятниками исламской культуры' },
          { name: 'Архи-де-Фада', lat: 17.5000, lng: 19.5000, type: 'attraction' as const, description: 'Удивительные природные арки из песчаника в пустыне' },
          { name: 'Водопады Гаутер', lat: 9.5000, lng: 14.0000, type: 'attraction' as const, description: 'Высокий водопад в тропической зоне юга страны' },
          { name: 'Мунду', lat: 8.6000, lng: 20.3000, type: 'city' as const, description: 'Административный центр региона Мунду-Курфу на востоке страны' }
        ];
      case 'kitai-gid':
        return [
          { name: 'Пекин', lat: 39.9042, lng: 116.4074, type: 'city' as const, description: 'Столица Китая с Запретным городом и Великой стеной' },
          { name: 'Шанхай', lat: 31.2304, lng: 121.4737, type: 'city' as const, description: 'Финансовый центр с небоскребами и набережной Вайтань' },
          { name: 'Гонконг', lat: 22.3193, lng: 114.1694, type: 'city' as const, description: 'Специальный административный район с ночной жизнью' },
          { name: 'Сиань', lat: 34.3416, lng: 108.9398, type: 'city' as const, description: 'Древняя столица с Терракотовой армией' },
          { name: 'Гуйлинь', lat: 25.2342, lng: 110.1806, type: 'attraction' as const, description: 'Карстовые горы Лицзян и река Ли' },
          { name: 'Чжанцзяцзе', lat: 29.3255, lng: 110.4815, type: 'attraction' as const, description: 'Национальный парк с "парящими горами"' },
          { name: 'Тибет (Лхаса)', lat: 29.6558, lng: 91.1170, type: 'attraction' as const, description: 'Дворец Потала и буддийские монастыри' },
          { name: 'Чэнду', lat: 30.5728, lng: 104.0668, type: 'city' as const, description: 'Столица Сычуани с резиденцией гигантских панд' },
          { name: 'Горы Хуаншань', lat: 30.1394, lng: 118.1806, type: 'attraction' as const, description: 'Желтые горы с гранитными пиками' }
        ];
      case 'chile':
        return [
          { name: 'Сантьяго', lat: -33.4489, lng: -70.6693, type: 'city' as const, description: 'Столица Чили (7 млн), расположена в долине у подножия Анд, исторический центр, площадь Пласа-де-Армас, винные долины' },
          { name: 'Вальпараисо', lat: -33.0458, lng: -71.6197, type: 'city' as const, description: 'Культурная столица Чили (295 тыс.), порт с цветными домами на холмах, фуникулеры, объект ЮНЕСКО, родина Пабло Неруды' },
          { name: 'Пустыня Атакама', lat: -23.3500, lng: -69.2667, type: 'attraction' as const, description: 'Самая сухая пустыня в мире с гейзерами и соляными озерами' },
          { name: 'Остров Пасхи', lat: -27.1127, lng: -109.3497, type: 'attraction' as const, description: 'Загадочный остров с каменными статуями моаи, объект ЮНЕСКО, Рапа-Нуи' },
          { name: 'Торрес-дель-Пайне', lat: -51.1167, lng: -72.9667, type: 'attraction' as const, description: 'Национальный парк в Патагонии с гранитными башнями и ледниками' },
          { name: 'Пукон', lat: -39.2833, lng: -71.9333, type: 'attraction' as const, description: 'Город и национальный парк с вулканами и термальными источниками' },
          { name: 'Консепсьон', lat: -36.8266, lng: -73.0497, type: 'city' as const, description: 'Второй по величине город Чили (220 тыс.), университетский центр, близость к пляжам, винные долины, горнолыжные курорты' },
          { name: 'Пунта-Аренас', lat: -53.1638, lng: -70.9171, type: 'city' as const, description: 'Край света, город на юге Чили (130 тыс.), ворота в Антарктиду, Магелланов пролив, Патагония' },
          { name: 'Антофагаста', lat: -23.6340, lng: -70.3967, type: 'city' as const, description: 'Портовый город в пустыне Атакама, центр медной промышленности' },
          { name: 'Вина-дель-Мар', lat: -33.0167, lng: -71.5500, type: 'resort' as const, description: 'Курортный город с пляжами и садами, "город садов"' }
        ];
      case 'colombia':
        return [
          { name: 'Богота', lat: 4.6097, lng: -74.0817, type: 'city' as const, description: 'Столица Колумбии, расположена на высоте 2640 м, центр культуры и политики' },
          { name: 'Золотой музей', lat: 4.6114, lng: -74.0717, type: 'attraction' as const, description: 'Музей с крупнейшей коллекцией доколумбового золота в мире, 34000 экспонатов' },
          { name: 'Медельин', lat: 6.2442, lng: -75.5812, type: 'city' as const, description: 'Город вечной весны, инновационный город с канатной дорогой' },
          { name: 'Картахена', lat: 10.3910, lng: -75.4922, type: 'city' as const, description: 'Колониальный город на Карибском побережье, объект ЮНЕСКО' },
          { name: 'Крепость Сан-Фелипе-де-Барахас', lat: 10.3910, lng: -75.4922, type: 'attraction' as const, description: 'Крупнейшая испанская крепость в Америке, объект ЮНЕСКО, XVII век' },
          { name: 'Кали', lat: 3.4516, lng: -76.5320, type: 'city' as const, description: 'Столица сальсы и культурный центр западной Колумбии' },
          { name: 'Барранкилья', lat: 10.9685, lng: -74.7813, type: 'city' as const, description: 'Главный порт Карибского побережья, город карнавалов' },
          { name: 'Кофейный треугольник', lat: 5.5320, lng: -75.7867, type: 'attraction' as const, description: 'Регион с кофейными плантациями и долиной Кокора, национальный символ' },
          { name: 'Тайрона', lat: 11.3097, lng: -74.0769, type: 'attraction' as const, description: 'Национальный парк с тропическими лесами и пляжами Карибского моря' },
          { name: 'Затерянный город', lat: 11.1058, lng: -74.0076, type: 'attraction' as const, description: 'Доколумбовый археологический объект, треккинг 4-6 дней' },
          { name: 'Санта-Марта', lat: 11.2404, lng: -74.2111, type: 'city' as const, description: 'Город на Карибском побережье, ворота в национальный парк Тайрона' },
          { name: 'Пасто', lat: 1.2136, lng: -77.2811, type: 'city' as const, description: 'Высокогорный город близ границы с Эквадором, культурная столица юга' }
        ];
      case 'comoros':
        return [
          { name: 'Морони', lat: -11.7000, lng: 43.2333, type: 'city' as const, description: 'Столица Комор (55 тыс.), расположена на острове Нгазиджа, арабская архитектура, мечети, вулкан Картала' },
          { name: 'Муцамуду', lat: -12.1667, lng: 44.3833, type: 'city' as const, description: 'Столица острова Анжуан, старинный город с колониальной архитектурой' },
          { name: 'Домони', lat: -12.3333, lng: 43.7333, type: 'city' as const, description: 'Главный город острова Мохели, ворота в Национальный морской парк' },
          { name: 'Фумбани', lat: -11.5167, lng: 43.3667, type: 'city' as const, description: 'Второй по величине город Комор на острове Нгазиджа (20 тыс.), известен плантациями ванили, рынки, пляжи, вулкан Картала' },
          { name: 'Вулкан Картала', lat: -11.3619, lng: 43.3714, type: 'attraction' as const, description: 'Действующий вулкан, высшая точка архипелага (2361 м)' },
          { name: 'Национальный парк Мохели', lat: -12.3333, lng: 43.7333, type: 'attraction' as const, description: 'Морской парк с наблюдением за морскими черепахами' },
          { name: 'Пляжи Памбазини', lat: -11.7167, lng: 43.2500, type: 'resort' as const, description: 'Уникальные черные пляжи с вулканическим песком' },
          { name: 'Плантации иланг-иланга', lat: -12.1667, lng: 44.3833, type: 'attraction' as const, description: 'Ароматические сады на острове Анжуан' },
          { name: 'Аэропорт Принца Саида Ибрагима', lat: -11.5333, lng: 43.2667, type: 'airport' as const, description: 'Международный аэропорт на острове Нгазиджа' },
          { name: 'Чимба', lat: -12.1833, lng: 44.4500, type: 'resort' as const, description: 'Белоснежные пляжи с кристально чистой водой на Анжуане' }
        ];
      case 'congo':
        return [
          { name: 'Браззавиль', lat: -4.2667, lng: 15.2833, type: 'city' as const, description: 'Столица Республики Конго, крупнейший город страны' },
          { name: 'Пуэнт-Нуар', lat: -4.7761, lng: 11.8635, type: 'city' as const, description: 'Второй по величине город Конго (1.2 млн), главный морской порт на Атлантическом океане, нефтяная столица, пляжи, рынки, музеи' },
          { name: 'Парижская пляжная дорога', lat: -4.7917, lng: 11.8333, type: 'resort' as const, description: 'Популярная набережная с ресторанами и пляжами' },
          { name: 'Национальный парк Нуабале-Ндоки', lat: 1.5000, lng: 16.5000, type: 'attraction' as const, description: 'Тропический лес с гориллами и шимпанзе, объект ЮНЕСКО' },
          { name: 'Лопе-Национальный парк', lat: -0.2500, lng: 15.2500, type: 'attraction' as const, description: 'Парк с богатой фауной, включая слонов и леопардов' },
          { name: 'Озеро Маленгуэ', lat: -2.6667, lng: 14.3333, type: 'resort' as const, description: 'Популярное место для рыбалки и водных видов спорта' },
          { name: 'Моссенджа', lat: -1.8833, lng: 15.5500, type: 'city' as const, description: 'Город на реке Конго, известен своими рыболовными угодьями' },
          { name: 'Долина динозавров', lat: -13.8333, lng: 13.8333, type: 'attraction' as const, description: 'Палеонтологические находки, включая окаменелости динозавров' },
          { name: 'Батеке-плато', lat: -2.5000, lng: 14.0000, type: 'attraction' as const, description: 'Высокое плато с водопадами и пещерами' },
          { name: 'Аэропорт Май-Маюн', lat: -4.2500, lng: 15.2500, type: 'airport' as const, description: 'Международный аэропорт столицы Браззавиля' }
        ];
      case 'north-korea-gid':
        return [
          { name: 'Пхеньян', lat: 39.0339, lng: 125.7543, type: 'city' as const, description: 'Столица Северной Кореи с монументальной архитектурой' },
          { name: 'Кэсон', lat: 40.0167, lng: 124.4000, type: 'attraction' as const, description: 'Древняя столица Кореи, объект Всемирного наследия ЮНЕСКО' },
          { name: 'ДМЗ', lat: 37.9300, lng: 126.7400, type: 'attraction' as const, description: 'Демилитаризованная зона, самая напряженная граница в мире' },
          { name: 'Хамхын', lat: 40.4333, lng: 127.5333, type: 'city' as const, description: 'Промышленный город на востоке страны' },
          { name: 'Чхонджин', lat: 41.7956, lng: 129.7750, type: 'city' as const, description: 'Северо-восточный город, близость к российской границе' },
          { name: 'Нампхо', lat: 38.7333, lng: 125.4000, type: 'city' as const, description: 'Морской город на западе страны, порт, промышленный центр, Желтое море, запад КНДР' },
          { name: 'Синъюи', lat: 40.1000, lng: 124.3833, type: 'city' as const, description: '"Город восстановления", реконструкция после войны' },
          { name: 'Горы Мёхян', lat: 40.0667, lng: 126.3667, type: 'attraction' as const, description: '"Гора таинственного аромата", выставка дружбы между народами' },
          { name: 'Порт Раджин', lat: 42.3333, lng: 130.3667, type: 'attraction' as const, description: 'Редкий доступ к морю, российско-кндр сотрудничество' }
        ];
      case 'dr-congo':
        return [
          { name: 'Киншаса', lat: -4.3250, lng: 15.3222, type: 'city' as const, description: 'Столица ДР Конго (15 млн), расположена на реке Конго напротив Браззавиля, музыкальная столица Африки, рынки, музеи' },
          { name: 'Лубумбаши', lat: -11.6667, lng: 27.4833, type: 'city' as const, description: 'Второй по величине город ДР Конго (2.5 млн), промышленный центр Катанги, медные и кобальтовые шахты, университеты, музеи, рынки' },
          { name: 'Букаву', lat: -2.4833, lng: 28.8500, type: 'city' as const, description: 'Город на озере Киву, близ Вирунга' },
          { name: 'Гома', lat: -1.6833, lng: 29.2167, type: 'city' as const, description: 'Город на озере Киву, у подножия вулкана Ньирагонго' },
          { name: 'Кисангани', lat: 0.5167, lng: 25.1833, type: 'city' as const, description: 'Крупнейший город в восточной части страны' },
          { name: 'Мбужи-Майи', lat: -3.3333, lng: 23.3500, type: 'city' as const, description: 'Город алмазной промышленности (1.5 млн), центр добычи алмазов, восток ДР Конго' },
          { name: 'Кананга', lat: -5.8833, lng: 22.4167, type: 'city' as const, description: 'Административный центр Касаи-Ориенталь (1.2 млн), торговый центр, центр ДР Конго' },
          { name: 'Колвези', lat: -10.7167, lng: 25.4667, type: 'city' as const, description: 'Город медной промышленности (450 тыс.), центр добычи меди и кобальта, юг ДР Конго' },
          { name: 'Национальный парк Вирунга', lat: -0.1667, lng: 29.3000, type: 'attraction' as const, description: 'Самый старый национальный парк Африки, дом для горных горилл, объект ЮНЕСКО, восток ДР Конго' },
          { name: 'Национальный парк Кахузи-Биега', lat: -2.3333, lng: 28.7500, type: 'attraction' as const, description: 'Место обитания восточных равнинных горилл, объект ЮНЕСКО, восток ДР Конго' },
          { name: 'Национальный парк Салонга', lat: -2.5000, lng: 21.5000, type: 'attraction' as const, description: 'Самый большой тропический лесной заповедник в Африке, объект ЮНЕСКО, центр ДР Конго' },
          { name: 'Вулкан Ньирагонго', lat: -1.5167, lng: 29.2500, type: 'attraction' as const, description: 'Активный вулкан с лавовым озером, восхождение ночью, популярное место, восток ДР Конго' },
          { name: 'Озеро Киву', lat: -2.0000, lng: 29.0000, type: 'attraction' as const, description: 'Красивое горное озеро с живописными пейзажами, граница с Руандой, восток ДР Конго' },
          { name: 'Река Конго', lat: -5.0000, lng: 15.0000, type: 'attraction' as const, description: 'Вторая по длине река в Африке, уникальная экосистема, центр ДР Конго' },
          { name: 'Аэропорт Нджили', lat: -4.3833, lng: 15.4444, type: 'airport' as const, description: 'Международный аэропорт Киншасы (FIH), главные воздушные ворота ДР Конго' }
        ];
      case 'horvatiya-gid':
        return [
          { name: 'Загреб', lat: 45.8150, lng: 15.9819, type: 'city' as const, description: 'Столица Хорватии, культурный и экономический центр страны' },
          { name: 'Дубровник', lat: 42.6507, lng: 18.0944, type: 'city' as const, description: 'Жемчужина Адриатики, средневековый город, объект ЮНЕСКО' },
          { name: 'Сплит', lat: 43.5081, lng: 16.4402, type: 'city' as const, description: 'Город-дворец Диоклетиана, второй по величине город страны' },
          { name: 'Дворец Диоклетиана', lat: 43.5081, lng: 16.4402, type: 'attraction' as const, description: 'Римский дворец IV века, объект ЮНЕСКО, центр Старого города Сплита' },
          { name: 'Плитвицкие озера', lat: 44.8804, lng: 15.6160, type: 'attraction' as const, description: 'Национальный парк с террасными озерами и водопадами, объект ЮНЕСКО' },
          { name: 'Ровинь', lat: 45.0811, lng: 13.6398, type: 'city' as const, description: 'Хорватская Венеция, венецианская архитектура и трюфели Истрии' },
          { name: 'Пула', lat: 44.8666, lng: 13.8496, type: 'city' as const, description: 'Город с римским амфитеатром, культурная столица Истрии' },
          { name: 'Римский амфитеатр Пулы', lat: 44.8733, lng: 13.8503, type: 'attraction' as const, description: 'Один из крупнейших сохранившихся римских амфитеатров, I век, летние концерты' },
          { name: 'Остров Хвар', lat: 43.1729, lng: 16.6413, type: 'attraction' as const, description: 'Самый солнечный остров Адриатики с лавандовыми полями' },
          { name: 'Корчула', lat: 42.9606, lng: 17.1343, type: 'city' as const, description: 'Остров Марко Поло, средневековый город-крепость' },
          { name: 'Крка', lat: 43.8069, lng: 15.9614, type: 'attraction' as const, description: 'Национальный парк с водопадами, разрешено плавание' },
          { name: 'Млет', lat: 42.7444, lng: 17.3622, type: 'attraction' as const, description: 'Зеленый остров с солеными озерами и бенедиктинским монастырем' }
        ];
      case 'vengriya-gid':
        return [
          { name: 'Будапешт', lat: 47.4979, lng: 19.0402, type: 'city' as const, description: 'Столица Венгрии, разделенная Дунаем на Буду и Пешт' },
          { name: 'Будайская крепость', lat: 47.4960, lng: 19.0396, type: 'attraction' as const, description: 'Королевский дворец, объект ЮНЕСКО, средневековая крепость, музей истории Будапешта' },
          { name: 'Рыбацкий бастион', lat: 47.5020, lng: 19.0344, type: 'attraction' as const, description: 'Неороманская терраса, панорамные виды на Дунай и Пешт, архитектура XIX века' },
          { name: 'Термальные купальни Сечени', lat: 47.5189, lng: 19.0814, type: 'attraction' as const, description: 'Самые известные термальные купальни Будапешта с 18 бассейнами' },
          { name: 'Озеро Балатон', lat: 46.9073, lng: 17.7324, type: 'attraction' as const, description: 'Крупнейшее озеро Центральной Европы, венгерское море' },
          { name: 'Токай', lat: 48.1185, lng: 21.4086, type: 'attraction' as const, description: 'Винодельческий регион Токай - объект всемирного наследия' },
          { name: 'Эгер', lat: 47.9026, lng: 20.3773, type: 'city' as const, description: 'Город красного вина и минарета, самый северный минарет в Европе' },
          { name: 'Дебрецен', lat: 47.5316, lng: 21.6273, type: 'city' as const, description: 'Второй по величине город Венгрии (200 тыс.), университетский центр, реформатская церковь, термальные источники, парки, музеи' },
          { name: 'Озеро Хевиз', lat: 46.7910, lng: 17.1933, type: 'attraction' as const, description: 'Крупнейшее термальное озеро в Европе с лотосами' },
          { name: 'Вишеград', lat: 47.7792, lng: 18.9679, type: 'attraction' as const, description: 'Средневековая крепость с видом на излучину Дуная' },
          { name: 'Печ', lat: 46.0727, lng: 18.2330, type: 'city' as const, description: 'Культурная столица с раннехристианскими некрополями ЮНЕСКО' },
          { name: 'Холлокё', lat: 47.9992, lng: 19.5925, type: 'attraction' as const, description: 'Живой музей под открытым небом, традиционная венгерская деревня' }
        ];
      case 'kosta-rika-ekologicheskaya-respublika-gid':
        return [
          { name: 'Сан-Хосе', lat: 9.9281, lng: -84.0907, type: 'city' as const, description: 'Столица Коста-Рики (340 тыс.), расположена в Центральной долине, музеи золота и нефрита, театры, кофейные плантации' },
          { name: 'Вулкан Ареналь', lat: 10.4631, lng: -84.7060, type: 'attraction' as const, description: 'Один из самых активных вулканов страны с горячими источниками и национальным парком' },
          { name: 'Национальный парк Мануэль-Антонио', lat: 9.4038, lng: -84.1624, type: 'attraction' as const, description: 'Один из самых популярных национальных парков с пляжами и богатой дикой природой' },
          { name: 'Облачный лес Монтеверде', lat: 10.3333, lng: -84.8167, type: 'attraction' as const, description: 'Уникальная экосистема облачного леса с канатными дорогами и биоразнообразием' },
          { name: 'Национальный парк Тортугеро', lat: 10.5800, lng: -83.5800, type: 'attraction' as const, description: 'Каналы и черепахи - известен как "Венеция Карибского региона"' },
          { name: 'Национальный парк Корковадо', lat: 8.4000, lng: -83.0000, type: 'attraction' as const, description: '"Биологически интенсивное место" с одним из самых высоких уровней биоразнообразия' },
          { name: 'Полуостров Никоя', lat: 9.7500, lng: -85.5000, type: 'region' as const, description: 'Полуостров с лучшими пляжами Тихого океана и серфинг-курортами' },
          { name: 'Вулкан Поас', lat: 10.1667, lng: -84.2333, type: 'attraction' as const, description: 'Второй по высоте действующий вулкан страны с кратерным озером' },
          { name: 'Пляж Мануэль-Антонио', lat: 9.4038, lng: -84.1624, type: 'beach' as const, description: 'Один из самых красивых пляжей страны с белым песком и джунглями' },
          { name: 'Тамариндо', lat: 10.4500, lng: -85.8333, type: 'city' as const, description: 'Популярный курорт и серфинг-деревня на побережье Тихого океана' }
        ];

      case 'burundi':
        return [
          { name: 'Бужумбура', lat: -3.3869, lng: 29.3663, type: 'city' as const, description: 'Столица Бурунди (1.2 млн), порт на озере Танганьика, второй по глубине озеро в мире, рынки, музеи, пляжи, кофейные плантации' },
          { name: 'Гитега', lat: -3.4263, lng: 29.9316, type: 'city' as const, description: 'Политическая столица страны с национальным музеем' },
          { name: 'Озеро Танганьика', lat: -3.3869, lng: 29.3663, type: 'attraction' as const, description: 'Второе по глубине озеро в мире, живописные берега' },
          { name: 'Национальный парк Кагера', lat: -2.8333, lng: 29.6667, type: 'attraction' as const, description: 'Обитание шимпанзе и других приматов, тропические леса' },
          { name: 'Водопады Карера', lat: -3.8333, lng: 29.9167, type: 'attraction' as const, description: 'Серия живописных водопадов на юго-востоке страны' },
          { name: 'Руанда', lat: -3.0556, lng: 29.7000, type: 'city' as const, description: 'Исторический город с королевскими памятниками и университетом' },
          { name: 'Аэропорт Мельхиора Ндадайе', lat: -3.3200, lng: 29.3200, type: 'airport' as const, description: 'Международный аэропорт в Бужумбуре' }
        ];
      case 'canada':
        return [
          { name: 'Торонто', lat: 43.6532, lng: -79.3832, type: 'city' as const, description: 'Крупнейший город Канады (2.9 млн), CN Tower (553 м), культурные достопримечательности, озеро Онтарио, музей ROM, Онтарио' },
          { name: 'Ванкувер', lat: 49.2827, lng: -123.1207, type: 'city' as const, description: 'Город у океана (675 тыс.), Скалистые горы, Stanley Park, Тихоокеанский порт, горнолыжные курорты, Британская Колумбия' },
          { name: 'Монреаль', lat: 45.5017, lng: -73.5673, type: 'city' as const, description: 'Франкоязычный культурный центр (1.8 млн), фестивали, подземный город, Старый Монреаль, базилика Нотр-Дам, Квебек' },
          { name: 'Ниагарский водопад', lat: 43.0895, lng: -79.0849, type: 'attraction' as const, description: 'Один из самых мощных водопадов мира (51 м высота), граница с США, круизы, смотровые площадки, Онтарио' },
          { name: 'Национальный парк Банф', lat: 51.4968, lng: -115.9281, type: 'attraction' as const, description: 'Первый национальный парк Канады (6641 км²), Скалистые горы, озеро Луиз, ледники, Альберта, объект ЮНЕСКО' },
          { name: 'Оттава', lat: 45.4215, lng: -75.6972, type: 'city' as const, description: 'Столица Канады (1 млн), музеи, канадская символика, Парламентский холм, канал Ридо, Онтарио, двуязычный город' },
          { name: 'Квебек-Сити', lat: 46.8139, lng: -71.2080, type: 'city' as const, description: 'Исторический город ЮНЕСКО (550 тыс.), французская атмосфера, крепостные стены, Шато-Фронтенак, Квебек' },
          { name: 'Юкон', lat: 60.7212, lng: -135.0568, type: 'attraction' as const, description: 'Край северного сияния, золотая лихорадка, Уайтхорс (столица), дикая природа, арктический климат, север Канады' },
          { name: 'Вистлер', lat: 50.1163, lng: -122.9574, type: 'resort' as const, description: 'Горнолыжный курорт в Британской Колумбии (12 тыс.), Олимпийские игры 2010, 200+ трасс, 120 км от Ванкувера' },
          { name: 'Аэропорт Торонто Пирсон', lat: 43.6777, lng: -79.6248, type: 'airport' as const, description: 'Крупнейший аэропорт Канады (YYZ), главные воздушные ворота страны, Торонто, Онтарио' },
          { name: 'Аэропорт Ванкувера', lat: 49.1947, lng: -123.1840, type: 'airport' as const, description: 'Международный аэропорт Британской Колумбии (YVR), главные воздушные ворота западного побережья' },
          { name: 'Аэропорт Монреаля Трудо', lat: 45.4706, lng: -73.7408, type: 'airport' as const, description: 'Крупнейший аэропорт Квебека (YUL), международный аэропорт Монреаля, главные воздушные ворота провинции' }
        ];
      case 'palestina-gid':
        return [
          { name: 'Вифлеем', lat: 31.7052, lng: 35.2067, type: 'city' as const, description: 'Город рождения Иисуса Христа (30 тыс.), главная христианская святыня, Храм Рождества (ЮНЕСКО), Западный берег, паломничество' },
          { name: 'Иерусалим', lat: 31.7719, lng: 35.2170, type: 'city' as const, description: 'Святой город для трех религий (950 тыс.), Храмовая гора, Стена Плача, Купол Скалы, Старый город (ЮНЕСКО), Израиль/Палестина' },
          { name: 'Иерихон', lat: 31.8667, lng: 35.4500, type: 'city' as const, description: 'Самый древний город мира (20 тыс.), ниже уровня моря (-258 м), археологические раскопки, Западный берег, оазис' },
          { name: 'Хеврон', lat: 31.5326, lng: 35.0998, type: 'city' as const, description: 'Святыня иудаизма, христианства и ислама (220 тыс.), Пещера Патриархов, старый город, Западный берег, историческое значение' },
          { name: 'Наблус', lat: 32.2211, lng: 35.2544, type: 'city' as const, description: 'Культурная столица Западного берега (160 тыс.), старый город, рынки, университет, традиционная архитектура, север Палестины' },
          { name: 'Рамалла', lat: 31.8992, lng: 35.2079, type: 'city' as const, description: 'Административный центр Палестины (40 тыс.), университеты, правительственные здания, близость к Иерусалиму, Западный берег' },
          { name: 'Газа', lat: 31.5017, lng: 34.4668, type: 'city' as const, description: 'Крупнейший город Сектора Газа (600 тыс.), пляжи, Средиземное море, исторический порт, мечети, юг Палестины' },
          { name: 'Храм Рождества', lat: 31.7052, lng: 35.2067, type: 'attraction' as const, description: 'Главный христианский храм, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Храмовая гора', lat: 31.7779, lng: 35.2352, type: 'attraction' as const, description: 'Святая гора для иудаизма и ислама, Купол Скалы' },
          { name: 'Стена Плача', lat: 31.7767, lng: 35.2342, type: 'attraction' as const, description: 'Святое место иудаизма, остатки Второго Храма' }
        ];
      case 'belgium':
        return [
          { name: 'Брюссель', lat: 50.8503, lng: 4.3517, type: 'city' as const, description: 'Столица Бельгии и Европейского союза (1.2 млн), Гран-Плас, Атомиум, собор, музеи, центр Европы, двуязычный город' },
          { name: 'Гран-Плас', lat: 50.8466, lng: 4.3528, type: 'attraction' as const, description: 'Главная площадь Брюсселя, объект ЮНЕСКО, ратуша, гильдейские дома, XVII век, популярное место для туристов, центр города' },
          { name: 'Брюгге', lat: 51.2093, lng: 3.2247, type: 'city' as const, description: 'Средневековый город с каналами (120 тыс.), "Северная Венеция", объект ЮНЕСКО, колокольня XIII века, север Бельгии, Фландрия' },
          { name: 'Антверпен', lat: 51.2194, lng: 4.4025, type: 'city' as const, description: 'Столица алмазов мира (530 тыс.), Кафедральный собор, порт, Рубенс, музеи, мода, север Бельгии, Фландрия' },
          { name: 'Гент', lat: 51.0543, lng: 3.7174, type: 'city' as const, description: 'Университетский город (265 тыс.), замок Гравенстен, графская пристань, собор, каналы, север Бельгии, Фландрия' },
          { name: 'Льеж', lat: 50.6333, lng: 5.5667, type: 'city' as const, description: 'Культурная столица Валлонии (200 тыс.), площадь Гюстава, собор, музеи, река Маас, восток Бельгии, франкоязычный регион' },
          { name: 'Намюр', lat: 50.4667, lng: 4.8667, type: 'city' as const, description: 'Столица Валлонии (110 тыс.), крепость на мысе, река Самбра, музеи, центр Бельгии, франкоязычный регион' },
          { name: 'Брюссель-Шарль де Голль', lat: 50.9014, lng: 4.4844, type: 'airport' as const, description: 'Крупнейший аэропорт страны (BRU), международные перелеты, главные воздушные ворота Бельгии, близость к Брюсселю' },
          { name: 'Атлантида', lat: 51.3333, lng: 3.2833, type: 'resort' as const, description: 'Пляжный курорт на побережье Северного моря, пляжи, дюны, близость к Брюгге, север Бельгии, популярное место отдыха' },
          { name: 'Спа', lat: 50.4833, lng: 5.8667, type: 'resort' as const, description: 'Знаменитый курорт с термальными источниками (10 тыс.), название "спа" происходит отсюда, Арденны, восток Бельгии, XVIII век' },
          { name: 'Арденны', lat: 50.3333, lng: 5.8333, type: 'attraction' as const, description: 'Горный регион с лесами, замками и пещерами, юг Бельгии, Франции и Люксембурга, треккинг, природа, исторические места' },
          { name: 'Монс', lat: 50.4500, lng: 3.9500, type: 'city' as const, description: 'Город с историческим центром (95 тыс.), объект ЮНЕСКО, колокольня, собор, запад Бельгии, Валлония, франкоязычный регион' },
          { name: 'Брюгге-де-мер', lat: 51.2333, lng: 3.1833, type: 'attraction' as const, description: 'Морской курорт с пляжами и портом, Северное море, близость к Брюгге, север Бельгии, популярное место для отдыха' }
        ];
      case 'belize':
        return [
          { name: 'Белиз-Сити', lat: 17.5046, lng: -88.1962, type: 'city' as const, description: 'Крупнейший город Белиза (60 тыс.), главный порт, международный аэропорт, отправная точка для поездок на острова и к рифу' },
          { name: 'Большая голубая дыра', lat: 17.3160, lng: -87.5350, type: 'attraction' as const, description: 'Гигантская морская воронка диаметром 300 метров и глубиной 124 метра, одно из лучших мест для дайвинга в мире, объект ЮНЕСКО' },
          { name: 'Караколь', lat: 16.7619, lng: -89.1172, type: 'attraction' as const, description: 'Крупнейший археологический памятник Белиза, пирамида Каана высотой 43 метра, древний город-государство майя' },
          { name: 'Ламанай', lat: 17.7520, lng: -88.6540, type: 'attraction' as const, description: 'Один из самых больших церемониальных центров майя на берегу реки Нью-Ривер, храм Высокого Храма (33 метра)' },
          { name: 'Шунантунич', lat: 17.0886, lng: -89.1414, type: 'attraction' as const, description: 'Хорошо сохранившийся археологический памятник майя, пирамида Эль-Кастильо высотой 40 метров, "Каменная женщина"' },
          { name: 'Алтун-Ха', lat: 17.7667, lng: -88.3500, type: 'attraction' as const, description: 'Руины майя "Каменная вода", храм Зеленой гробницы с знаменитой нефритовой маской, в 50 км от Белиз-Сити' },
          { name: 'Сан-Игнасио', lat: 17.1580, lng: -89.0690, type: 'city' as const, description: 'Туристический центр (20 тыс.), близость к руинам майя Караколь и Шунантунич, джунгли, река, идеальная база для археологических экскурсий' },
          { name: 'Амбергрис-Кей', lat: 18.0080, lng: -87.9290, type: 'resort' as const, description: 'Популярный островной курорт с длинным пляжем, белый песок, кристально чистая вода, дайвинг, снорклинг, прямой доступ к барьерному рифу' },
          { name: 'Плаценсия', lat: 16.5140, lng: -88.3660, type: 'resort' as const, description: 'Длинный пляж на материке (26 км), меньше туристов, местная атмосфера, доступные цены, идеальное место для бюджетного пляжного отдыха' },
          { name: 'Заповедник Кокскомб-Бейсин', lat: 16.8000, lng: -88.6000, type: 'attraction' as const, description: 'Единственный заповедник ягуаров в мире, площадь 400 км², треккинг в джунглях, наблюдение за птицами, экотуризм' },
          { name: 'Аэропорт Филип Голдсон', lat: 17.5361, lng: -88.3081, type: 'airport' as const, description: 'Международный аэропорт Белиза (BZE), расположен в 16 км от Белиз-Сити, главные воздушные ворота страны' },
          { name: 'Кей-Колкер', lat: 17.9500, lng: -87.9500, type: 'resort' as const, description: 'Уединенный островной курорт, меньше туристов, идеально для релаксации, снорклинг, дайвинг, пляжный отдых' },
          { name: 'Хопкинс', lat: 16.8000, lng: -88.3000, type: 'city' as const, description: 'Деревня гарифуна на побережье, аутентичная культура, традиционная музыка и танцы, пляжный отдых, культурные мероприятия' }
        ];
      case 'bhutan':
        return [
          { name: 'Тхимпху', lat: 27.4728, lng: 89.6390, type: 'city' as const, description: 'Столица Бутана (115 тыс.), самая высокая столица мира (2320 м), дзонги, монастыри, традиционная архитектура' },
          { name: 'Паро', lat: 27.4286, lng: 89.4164, type: 'city' as const, description: 'Культурный центр с монастырем Такцанг (15 тыс.), долина Паро, аэропорт, дзонг, запад Бутана, популярное место для туристов' },
          { name: 'Пунакха', lat: 27.5925, lng: 89.8779, type: 'city' as const, description: 'Зимняя столица с Пунакха Дзонгом (5 тыс.), долина, река, климат мягче чем в Тхимпху, запад Бутана, историческое значение' },
          { name: 'Бумтанг', lat: 27.6333, lng: 90.8167, type: 'city' as const, description: 'Духовный регион с древними монастырями (30 тыс.), долина, дзонги, центр Бутана, буддизм, исторические места' },
          { name: 'Тронгса', lat: 27.4667, lng: 90.4167, type: 'city' as const, description: 'Исторический регион с Курью Дзонгом (20 тыс.), центр Бутана, важная крепость, долина, горы' },
          { name: 'Лхентсе', lat: 27.7000, lng: 90.9167, type: 'city' as const, description: 'Культурный регион с Лхентсе Дзонгом (15 тыс.), восток Бутана, традиционная архитектура, горы, долина' },
          { name: 'Монастырь Такцанг (Гнездо тигра)', lat: 27.4954, lng: 89.3939, type: 'attraction' as const, description: 'Священное место буддизма, монастырь на скале (3120 м), Паро, треккинг 2-3 часа, XVII век, популярное место для фото' },
          { name: 'Ташичо Дзонг', lat: 27.4728, lng: 89.6390, type: 'attraction' as const, description: 'Административный и религиозный центр Тхимпху, дзонг XVII века, королевский дворец, правительство, монастырь' },
          { name: 'Пунакха Дзонг', lat: 27.5925, lng: 89.8779, type: 'attraction' as const, description: 'Один из самых красивых дзонгов Бутана, XVII век, слияние рек, коронация королей, архитектура, запад Бутана' },
          { name: 'Джакар Дзонг', lat: 27.6333, lng: 90.8167, type: 'attraction' as const, description: 'Духовный центр Бумтанга, дзонг XVII века, монастыри, центр Бутана, буддизм, историческое значение' },
          { name: 'Курью Дзонг', lat: 27.4667, lng: 90.4167, type: 'attraction' as const, description: 'Ключевая крепость в объединении Бутана, XVII век, Тронгса, центр страны, историческое значение, архитектура' },
          { name: 'Лхентсе Дзонг', lat: 27.7000, lng: 90.9167, type: 'attraction' as const, description: 'Известен уникальной архитектурой, дзонг XVII века, восток Бутана, традиционное искусство, горы, долина' },
          { name: 'Монастырь Кьячху Лхаканг', lat: 27.4286, lng: 89.4164, type: 'attraction' as const, description: 'Один из старейших монастырей Бутана, VII век, буддийская святыня, запад Бутана' },
          { name: 'Монастырь Тамшинг Лхаканг', lat: 27.6000, lng: 90.8333, type: 'attraction' as const, description: 'Известен живописью танка, буддийский монастырь, традиционное искусство, центр Бутана' },
          { name: 'Дочула Перевал', lat: 27.3000, lng: 89.5000, type: 'attraction' as const, description: 'Живописная точка с видами на Гималаи' }
        ];
      case 'benin':
        return [
          { name: 'Котону', lat: 6.3667, lng: 2.3833, type: 'city' as const, description: 'Экономическая столица Бенина (680 тыс.), порт на Атлантическом океане, рынки, музеи, пляжи, ворота в Ган и Абомей' },
          { name: 'Порто-Ново', lat: 6.4969, lng: 2.6044, type: 'city' as const, description: 'Официальная столица страны (265 тыс.), колониальная архитектура, музеи, близость к Котону, юг Бенина' },
          { name: 'Ганвье', lat: 6.4667, lng: 2.4167, type: 'attraction' as const, description: 'Деревня на воде, "Африканская Венеция"' },
          { name: 'Абомей', lat: 7.1828, lng: 1.9912, type: 'city' as const, description: 'Город с королевскими дворцами - объектом ЮНЕСКО' },
          { name: 'Уида', lat: 6.3594, lng: 2.0886, type: 'city' as const, description: 'Исторический город на побережье с Вратами невозвращения' },
          { name: 'Королевские дворцы Абомея', lat: 7.1828, lng: 1.9912, type: 'attraction' as const, description: 'Объект ЮНЕСКО, дворцы королевства Дагомея' },
          { name: 'Врата невозвращения', lat: 6.3594, lng: 2.0886, type: 'attraction' as const, description: 'Последний порт отправки рабов в Америку' },
          { name: 'Храм питонов в Уиде', lat: 6.3667, lng: 2.0833, type: 'attraction' as const, description: 'Центр культа вуду со священными питонами' },
          { name: 'Национальный парк Пенджари', lat: 11.5000, lng: 1.6667, type: 'attraction' as const, description: 'Биосферный резерват с львами и слонами' },
          { name: 'Этнографический музей Порто-Ново', lat: 6.4969, lng: 2.6044, type: 'attraction' as const, description: 'Король Тофа дворец с культурой 60 народов Бенина' },
          { name: 'Дворец короля Тофа', lat: 6.4969, lng: 2.6044, type: 'attraction' as const, description: 'Бразильская колониальная архитектура XIX века' },
          { name: 'Лес священных обезьян', lat: 6.4167, lng: 2.6333, type: 'attraction' as const, description: 'Священный лес народа йоруба с обезьянами-мона' },
          { name: 'Пляж Фиджрос', lat: 6.3167, lng: 2.4000, type: 'resort' as const, description: 'Лучший пляж страны с золотым песком' },
          { name: 'Центр искусств Уиды', lat: 6.3667, lng: 2.0833, type: 'attraction' as const, description: 'Современное искусство вуду и скульптуры' }
        ];
      case 'afghanistan':
        return [
          { name: 'Кабул', lat: 34.5553, lng: 69.2075, type: 'city' as const, description: 'Столица Афганистана (4.6 млн), расположена на высоте 1800 м, исторические сады Бабура, цитадель Бала-Хиссар, мечети, базары' },
          { name: 'Герат', lat: 34.3482, lng: 62.2097, type: 'city' as const, description: 'Культурная столица Афганистана (550 тыс.), цитадель Герата, мечеть Джума, мавзолеи, центр персидской культуры, Великий шелковый путь' },
          { name: 'Мазари-Шариф', lat: 36.7090, lng: 67.1109, type: 'city' as const, description: 'Священный город (500 тыс.), Голубая мечеть XV века, место паломничества, фестиваль красных тюльпанов, близость к Узбекистану' },
          { name: 'Кандагар', lat: 31.6289, lng: 65.7304, type: 'city' as const, description: 'Второй по величине город Афганистана (650 тыс.), историческая столица, мавзолей Ахмад-шаха Дуррани, мечети, базары, близость к Пакистану' },
          { name: 'Джелалабад', lat: 34.4264, lng: 70.4515, type: 'city' as const, description: 'Восточные ворота Афганистана (360 тыс.), субтропический климат, сады, близость к перевалу Хайбер, исторический торговый центр' },
          { name: 'Бамиан', lat: 34.8150, lng: 67.8183, type: 'attraction' as const, description: 'Долина Бамиан с нишами разрушенных буддийских статуй (VI век), объект ЮНЕСКО, пещерные монастыри, горные пейзажи, высота 2500 м' },
          { name: 'Минарет Джам', lat: 34.3964, lng: 64.0505, type: 'attraction' as const, description: '65-метровая башня XII века, объект ЮНЕСКО, единственный сохранившийся минарет династии Гуридов, изолированное расположение' },
          { name: 'Панджширская долина', lat: 35.3333, lng: 69.8333, type: 'attraction' as const, description: 'Долина сопротивления "пять львов", стратегическое ущелье, мавзолей Ахмад Шаха Масуда, горные пейзажи, река Панджшер' }
        ];
      case 'algeria':
        return [
          { name: 'Алжир', lat: 36.7529, lng: 3.0420, type: 'city' as const, description: 'Столица Алжира (3.5 млн), белый город на Средиземном море, Касба - объект ЮНЕСКО, мечети, музеи, французская архитектура' },
          { name: 'Касба Алжира', lat: 36.7872, lng: 3.0600, type: 'attraction' as const, description: 'Историческая цитадель, объект ЮНЕСКО, османская архитектура, XVI-XVII века' },
          { name: 'Оран', lat: 35.6991, lng: -0.6367, type: 'city' as const, description: 'Портовый город на западе Алжира (1.5 млн), второй по величине город, Средиземное море, французская архитектура' },
          { name: 'Константина', lat: 36.3650, lng: 6.6147, type: 'city' as const, description: 'Город на скалах (450 тыс.), исторический центр, мосты через ущелья, римские руины, восток Алжира' },
          { name: 'Аннаба', lat: 36.9000, lng: 7.7667, type: 'city' as const, description: 'Портовый город Гиппон (260 тыс.), руины древнего Гиппона Регия, пляжи, Средиземное море, восток Алжира' },
          { name: 'Тлемсен', lat: 34.8828, lng: -1.3167, type: 'city' as const, description: 'Город искусств и культуры (180 тыс.), мечети, медресе, объект ЮНЕСКО, запад Алжира, историческое значение' },
          { name: 'Сахара', lat: 28.0000, lng: 1.0000, type: 'attraction' as const, description: 'Величайшая пустыня мира (9 млн км²), песчаные дюны, оазисы, караванные пути, юг Алжира' },
          { name: 'Тассили-н-Аджер', lat: 26.5000, lng: 9.5000, type: 'attraction' as const, description: 'Каменные леса Сахары, объект ЮНЕСКО, наскальные рисунки возрастом до 8000 лет, юго-восток Алжира' },
          { name: 'Джемила', lat: 36.1167, lng: 5.6500, type: 'attraction' as const, description: 'Римский город в горах, объект ЮНЕСКО, руины I-III веков, амфитеатр, храмы, северо-восток Алжира' },
          { name: 'Тимгад', lat: 35.4667, lng: 6.6333, type: 'attraction' as const, description: 'Римская колония (100 г. н.э.), объект ЮНЕСКО, руины города, театр, триумфальная арка, форум, восток Алжира, горы Орес' },
          { name: 'Бени-Хаммед', lat: 34.7500, lng: 5.9000, type: 'attraction' as const, description: 'Древняя столица (XI век), объект ЮНЕСКО, руины хаммадидской крепости, мечети, дворцы, север Алжира, горы' },
          { name: 'Гардая', lat: 32.4833, lng: 3.6667, type: 'attraction' as const, description: 'Город в оазисе Мзаб (150 тыс.), объект ЮНЕСКО, ксары (укрепленные города), ибадитская архитектура, пустыня, юг Алжира' },
          { name: 'Гора Тахат', lat: 23.3333, lng: 5.5167, type: 'attraction' as const, description: 'Высшая точка Алжира (2918 м), массив Хоггар, вулканический пик, Сахара, треккинг, панорамные виды, юг Алжира' }
        ];
      case 'mexico':
        return [
          { name: 'Мехико', lat: 19.4326, lng: -99.1332, type: 'city' as const, description: 'Столица Мексики (9.2 млн), исторический центр - объект ЮНЕСКО, Сокало, Национальный дворец, собор, музеи, гастрономия' },
          { name: 'Теотиуакан', lat: 19.6925, lng: -98.8439, type: 'attraction' as const, description: 'Древний город ацтеков, объект ЮНЕСКО, пирамиды Солнца и Луны, II-VII века, церемониальный центр, музей' },
          { name: 'Канкун', lat: 21.1619, lng: -86.8515, type: 'resort' as const, description: 'Главный карибский курорт Мексики, белоснежные пляжи, отели all-inclusive, ночная жизнь, близость к Чичен-Ице и Тулуму' },
          { name: 'Чичен-Ица', lat: 20.6843, lng: -88.5678, type: 'attraction' as const, description: 'Пирамида Кукулькана майя, объект ЮНЕСКО, одно из Новых чудес света, обсерватория, поле для игры в мяч, IX-XII века' },
          { name: 'Тулум', lat: 20.2114, lng: -87.4653, type: 'attraction' as const, description: 'Древний город майя на утесе над Карибским морем, объект ЮНЕСКО, пляжи, сеноты, популярное место для фото, XIII-XV века' },
          { name: 'Ушмаль', lat: 20.3600, lng: -89.7700, type: 'attraction' as const, description: 'Древний город майя, объект ЮНЕСКО, пирамида Волшебника, архитектура Пуук, Дворец правителя, VI-X век' },
          { name: 'Паленке', lat: 17.4833, lng: -92.0500, type: 'attraction' as const, description: 'Древний город майя, объект ЮНЕСКО, храм Надписей, гробница Пакаля, окружен джунглями, III-VIII века' },
          { name: 'Плайя-дель-Кармен', lat: 20.6296, lng: -87.0739, type: 'resort' as const, description: 'Пляжный курорт на Ривьере Майя, Пятая авеню, сеноты, дайвинг, близость к Косумелю, молодежная атмосфера' },
          { name: 'Оахака', lat: 17.0654, lng: -96.7236, type: 'city' as const, description: 'Колониальный город, объект ЮНЕСКО, исторический центр, собор, рынки, мескаль, близость к Монте-Альбану' },
          { name: 'Монте-Альбан', lat: 17.0431, lng: -96.7678, type: 'attraction' as const, description: 'Древний город сапотеков, объект ЮНЕСКО, церемониальный центр, 500 г. до н.э., пирамиды, обсерватория, музей' },
          { name: 'Пуэрто-Вальярта', lat: 20.6534, lng: -105.2253, type: 'resort' as const, description: 'Тихоокеанский курорт, Малекон, пляжи, галереи, рестораны, китовое наблюдение, горы Сьерра-Мадре' },
          { name: 'Мерида', lat: 20.9674, lng: -89.5926, type: 'city' as const, description: 'Столица Юкатана (1 млн), "белый город", колониальная архитектура, собор, музеи, ворота к археологическим памятникам майя' }
        ];
      case 'equatorial-guinea':
        return [
          { name: 'Малабо', lat: 3.7500, lng: 8.7833, type: 'city' as const, description: 'Столица Экваториальной Гвинеи (300 тыс.) на острове Биоко, порт, испанская колониальная архитектура, собор, рынки, вулканический остров' },
          { name: 'Бата', lat: 1.8500, lng: 9.7500, type: 'city' as const, description: 'Крупнейший город страны на материке (250 тыс.), главный порт, пляжи, испанская архитектура, культурный центр' },
          { name: 'Национальный парк Монте-Ален', lat: 2.0000, lng: 10.5000, type: 'attraction' as const, description: 'Древний тропический лес с богатой флорой и фауной, гориллы, шимпанзе, слоны, эндемичные виды, биосферный резерват' },
          { name: 'Остров Биоко', lat: 3.6000, lng: 8.8000, type: 'attraction' as const, description: 'Вулканический остров в Гвинейском заливе, гора Санта-Исабель (3009 м), тропические леса, пляжи, эндемичная фауна' },
          { name: 'Сьюдад-де-ла-Пас', lat: 1.7000, lng: 9.8000, type: 'city' as const, description: 'Будущая столица страны в джунглях (строится), современная планировка, перенос столицы из Малабо' },
          { name: 'Эбебиин', lat: 2.1500, lng: 11.3333, type: 'city' as const, description: 'Город в провинции Кие-Нтем, ворота в национальный парк Монте-Ален, сельскохозяйственный регион, традиционная культура' },
          { name: 'Гора Санта-Исабель', lat: 3.5000, lng: 8.7500, type: 'attraction' as const, description: 'Самая высокая точка страны (3009 м) на острове Биоко, вулканический пик, облачные леса, треккинг, панорамные виды' },
          { name: 'Пляж Сан-Антонио', lat: 3.7333, lng: 8.7667, type: 'resort' as const, description: 'Один из лучших пляжей в столице Малабо, черный вулканический песок, спокойные воды, близость к центру' },
          { name: 'Остров Аннобон', lat: -1.4000, lng: 5.6167, type: 'attraction' as const, description: 'Удаленный вулканический остров с уникальной экосистемой, эндемичные виды, нетронутая природа, изоляция от материка' },
          { name: 'Монге', lat: 1.2000, lng: 9.5500, type: 'city' as const, description: 'Прибрежный город в провинции Литорал, рыболовство, пляжи, порт, традиционная архитектура, близость к национальным паркам' }
        ];
      case 'maldivy-gid':
        return [
          { name: 'Мале', lat: 4.1755, lng: 73.5093, type: 'city' as const, description: 'Столица Мальдив (200 тыс.), самая маленькая столица мира, мечеть Хукуру Миский, президентский дворец, рынки, ворота на курорты' },
          { name: 'Аэропорт Велана', lat: 4.1919, lng: 73.5299, type: 'airport' as const, description: 'Международный аэропорт Мальдив, главные ворота в страну' },
          { name: 'Биосферный заповедник Ханифару', lat: 5.2186, lng: 73.0847, type: 'attraction' as const, description: 'Объект Всемирного наследия ЮНЕСКО, место скопления мант и китовых акул' },
          { name: 'Атолл Ари', lat: 3.8500, lng: 72.8667, type: 'resort' as const, description: 'Популярный атолл для дайвинга с китовыми акулами и мантами' },
          { name: 'Атолл Баа', lat: 5.1000, lng: 73.0000, type: 'resort' as const, description: 'Биосферный заповедник с лучшими дайв-сайтами и курортами' },
          { name: 'Атолл Северный Мале', lat: 4.3000, lng: 73.5000, type: 'resort' as const, description: 'Ближайший к столице атолл с множеством курортов' },
          { name: 'Атолл Южный Мале', lat: 3.3000, lng: 73.5000, type: 'resort' as const, description: 'Тихий атолл к югу от столицы с прекрасными пляжами' },
          { name: 'Остров Ваадху', lat: 3.3000, lng: 73.0000, type: 'attraction' as const, description: 'Остров с биолюминесцентным пляжем "Море звезд"' },
          { name: 'Остров Маафуши', lat: 3.6500, lng: 72.9000, type: 'resort' as const, description: 'Популярный локальный остров для бюджетного отдыха' },
          { name: 'Подводный ресторан Ithaa', lat: 3.8500, lng: 72.8667, type: 'attraction' as const, description: 'Первый полностью подводный ресторан в мире в курорте Конрад' },
          { name: 'Подводный клуб Subsix', lat: 3.6000, lng: 72.8667, type: 'attraction' as const, description: 'Единственный подводный ночной клуб в мире в курорте Ниама' }
        ];
      case 'malawi':
        return [
          { name: 'Озеро Малави', lat: -12.0000, lng: 34.5000, type: 'attraction' as const, description: 'Третье по величине озеро в Африке, объект ЮНЕСКО с более чем 1000 видами рыб' },
          { name: 'Гора Муланье', lat: -15.9167, lng: 35.5833, type: 'attraction' as const, description: 'Высшая точка Малави (3002 м), изолированный гранитный массив с уникальной экосистемой' },
          { name: 'Национальный парк Ливонде', lat: -14.9667, lng: 35.2167, type: 'attraction' as const, description: 'Парк с реинтродуцированными популяциями слонов, носорогов и гепардов' },
          { name: 'Плато Ньика', lat: -10.5833, lng: 33.7500, type: 'attraction' as const, description: 'Высокогорное плато (2000-2500 м) с холмистыми лугами и более 200 видами орхидей' },
          { name: 'Лилонгве', lat: -13.9833, lng: 33.7833, type: 'city' as const, description: 'Столица Малави (990 тыс.), расположена на реке Лилонгве, рынки, заповедник дикой природы в черте города, музеи, ворота к озеру Малави' },
          { name: 'Блантайр', lat: -15.7861, lng: 35.0058, type: 'city' as const, description: 'Коммерческая столица на юге страны, бывшая колониальная столица' },
          { name: 'Остров Ликома', lat: -12.0667, lng: 34.7333, type: 'attraction' as const, description: 'Тропический остров с баобабами и англиканским собором Св. Петра' },
          { name: 'Мыс Мчези', lat: -14.0167, lng: 34.8333, type: 'attraction' as const, description: 'Популярное место среди бэкпекеров с кристально чистой водой и цихлидами' },
          { name: 'Чайные плантации Сатема', lat: -15.8833, lng: 35.6167, type: 'attraction' as const, description: 'Высокогорные чайные плантации с потрясающими видами на долины' },
          { name: 'Национальный музей Малави', lat: -15.7839, lng: 35.0100, type: 'attraction' as const, description: 'Главный музей страны с коллекцией этнографических артефактов' }
        ];
      case 'malayziya-gid':
        return [
          { name: 'Куала-Лумпур', lat: 3.1390, lng: 101.6869, type: 'city' as const, description: 'Столица Малайзии, башни Петронас' },
          { name: 'Джорджтаун', lat: 5.4141, lng: 100.3288, type: 'city' as const, description: 'Город-наследие UNESCO, стрит-арт' },
          { name: 'Лангкави', lat: 6.3500, lng: 99.8000, type: 'resort' as const, description: 'Островной курорт, duty-free зона' },
          { name: 'Малакка', lat: 2.1896, lng: 102.2501, type: 'city' as const, description: 'Исторический город, объект UNESCO' },
          { name: 'Форт А-Фамоса', lat: 2.1944, lng: 102.2500, type: 'attraction' as const, description: 'Португальская крепость XVI века, остатки колониальной эпохи, объект ЮНЕСКО' },
          { name: 'Камерон Хайлендс', lat: 4.4696, lng: 101.3778, type: 'attraction' as const, description: 'Город в горах, чайные плантации' },
          { name: 'Кота-Кинабалу', lat: 5.9804, lng: 116.0735, type: 'city' as const, description: 'Ворота в Борнео, морские закаты' },
          { name: 'Кучинг', lat: 1.5533, lng: 110.3592, type: 'city' as const, description: 'Столица Саравака, "кошачий город"' },
          { name: 'Пенанг', lat: 5.2819, lng: 100.4606, type: 'attraction' as const, description: 'Остров специй, мост Лангкави, объект ЮНЕСКО, колониальная архитектура, пляжи, Малайзия' },
          { name: 'Тиоман', lat: 2.8128, lng: 104.1478, type: 'resort' as const, description: 'Остров дайвинга, нетронутые пляжи, коралловые рифы, популярное место, восток Малайзии' },
          { name: 'Реданг', lat: 5.7643, lng: 103.0114, type: 'resort' as const, description: 'Остров коралловых рифов, дайвинг, снорклинг, морской парк, популярное место, восток Малайзии' }
        ];
      case 'eswatini':
        return [
          { name: 'Мбабане', lat: -26.3167, lng: 31.1333, type: 'city' as const, description: 'Административная столица Эсватини' },
          { name: 'Лобамба', lat: -26.4667, lng: 31.2000, type: 'city' as const, description: 'Королевская столица с дворцом, резиденция короля, традиционная культура, центр Эсватини' },
          { name: 'Манзини', lat: -26.4987, lng: 31.3801, type: 'city' as const, description: 'Крупнейший город страны (110 тыс.), торговый центр, рынки, близость к Мбабане, центр Эсватини' },
          { name: 'Национальный парк Хлане', lat: -26.2833, lng: 31.8667, type: 'attraction' as const, description: 'Королевский национальный парк с "Большой Пятеркой", сафари, дикая природа, восток Эсватини' },
          { name: 'Заповедник Млилване', lat: -26.5167, lng: 31.4167, type: 'attraction' as const, description: 'Самый старый заповедник страны, дикая природа, пешие тропы, центр Эсватини' },
          { name: 'Скала Сибебе', lat: -26.2667, lng: 31.1500, type: 'attraction' as const, description: 'Вторая по величине монолитная скала мира' },
          { name: 'Долина Эзулвини', lat: -26.4667, lng: 31.2000, type: 'attraction' as const, description: '"Долина небес" с королевскими дворцами' },
          { name: 'Свечная фабрика Свази', lat: -26.5000, lng: 31.3333, type: 'attraction' as const, description: 'Фабрика уникальных свечей ручной работы' }
        ];
      case 'egypt':
        return [
          { name: 'Каир', lat: 30.0444, lng: 31.2357, type: 'city' as const, description: 'Столица Египта (10 млн), крупнейший город Африки, пирамиды Гизы, исламский Каир, коптский квартал, река Нил' },
          { name: 'Пирамиды Гизы', lat: 29.9792, lng: 31.1342, type: 'attraction' as const, description: 'Великие пирамиды, объект ЮНЕСКО, одно из семи чудес света, XXVI век до н.э.' },
          { name: 'Сфинкс', lat: 29.9753, lng: 31.1376, type: 'attraction' as const, description: 'Великий Сфинкс Гизы, объект ЮНЕСКО, древнейшая монументальная скульптура, XXVI век до н.э.' },
          { name: 'Луксор', lat: 25.6872, lng: 32.6396, type: 'city' as const, description: 'Город-музей под открытым небом (500 тыс.), древние Фивы, храмы Карнака и Луксора, долина царей, река Нил, юг Египта' },
          { name: 'Карнакский храм', lat: 25.7186, lng: 32.6575, type: 'attraction' as const, description: 'Крупнейший храмовый комплекс Древнего Египта, объект ЮНЕСКО, колонный зал' },
          { name: 'Долина царей', lat: 25.7403, lng: 32.6014, type: 'attraction' as const, description: 'Некрополь фараонов, гробница Тутанхамона, объект ЮНЕСКО' },
          { name: 'Храм Хатшепсут', lat: 25.7381, lng: 32.6067, type: 'attraction' as const, description: 'Заупокойный храм царицы-фараона, высечен в скале, объект ЮНЕСКО' },
          { name: 'Хургада', lat: 27.2574, lng: 33.8129, type: 'resort' as const, description: 'Курорт на Красном море (250 тыс.), дайвинг, снорклинг, коралловые рифы, пляжи, популярное место для отдыха' },
          { name: 'Шарм-эль-Шейх', lat: 27.9158, lng: 34.3300, type: 'resort' as const, description: 'Дайвинг-курорт на Синае (35 тыс.), коралловые рифы, подводный мир, пляжи, ночная жизнь, популярное место' },
          { name: 'Асуан', lat: 24.0889, lng: 32.8998, type: 'city' as const, description: 'Город на Ниле (350 тыс.), нубийская культура, Асуанская плотина, остров Филе, храм Исиды, юг Египта' },
          { name: 'Александрия', lat: 31.2001, lng: 29.9187, type: 'city' as const, description: 'Средиземноморский порт (5.2 млн), древняя библиотека, крепость Кайт-Бей, катакомбы Ком-эль-Шукафа, север Египта' },
          { name: 'Абу-Симбел', lat: 22.3372, lng: 31.6258, type: 'attraction' as const, description: 'Храмы Рамзеса II, объект ЮНЕСКО, XIII век до н.э., перенесены в 1960-х' }
        ];
      case 'albania':
        return [
          { name: 'Тирана', lat: 41.3275, lng: 19.8187, type: 'city' as const, description: 'Столица Албании (860 тыс.), площадь Скандербега, мечеть Эфем Бей, музеи, центр страны' },
          { name: 'Берат', lat: 40.7086, lng: 19.9437, type: 'city' as const, description: 'Город тысячи окон, объект ЮНЕСКО, османская архитектура, крепость, исторический центр, юг Албании' },
          { name: 'Гирокастра', lat: 40.0667, lng: 20.1333, type: 'city' as const, description: 'Каменный город, объект ЮНЕСКО, средневековая крепость, родина Энвера Ходжи, юг Албании' },
          { name: 'Бутринт', lat: 39.7456, lng: 20.0200, type: 'attraction' as const, description: 'Древний греко-римский город, объект ЮНЕСКО, руины, амфитеатр, храмы' },
          { name: 'Ксамил', lat: 39.7333, lng: 20.0167, type: 'resort' as const, description: 'Бирюзовые пляжи Албанской Ривьеры, Ионическое море, популярное место для отдыха, юг Албании' },
          { name: 'Саранда', lat: 39.8737, lng: 20.0079, type: 'resort' as const, description: 'Курорт с ночными развлечениями (20 тыс.), Ионическое море, близость к Бутринту, юг Албании' },
          { name: 'Озеро Коман', lat: 40.6667, lng: 19.6500, type: 'attraction' as const, description: 'Круиз на пароме по озеру, живописные пейзажи, горы, популярное место, центр Албании' },
          { name: 'Голубой глаз', lat: 40.2833, lng: 20.0833, type: 'attraction' as const, description: 'Живописный источник с изумрудной водой, природный бассейн, популярное место для фото, юг Албании' },
          { name: 'Замок Лапрад', lat: 39.8833, lng: 20.0167, type: 'attraction' as const, description: 'Византийская крепость, историческое место, панорамные виды, юг Албании' }
        ];
      case 'andorra':
        return [
          { name: 'Андорра-ла-Велья', lat: 42.5063, lng: 1.5218, type: 'city' as const, description: 'Столица Андорры (23 тыс.), самая высокогорная столица Европы (1023 м), шоппинг, горнолыжные курорты' },
          { name: 'Грандвалира', lat: 42.3800, lng: 1.7073, type: 'resort' as const, description: 'Крупнейший лыжный курорт Андорры, 210 км трасс, Пиренеи, популярное место для зимнего отдыха' },
          { name: 'Вальнорд', lat: 42.3422, lng: 1.6953, type: 'resort' as const, description: 'Спокойные лыжные трассы, семейный курорт, Пиренеи, Андорра' },
          { name: 'Сольдеу', lat: 42.4086, lng: 1.6655, type: 'resort' as const, description: 'Центр активного отдыха, лыжные трассы, горнолыжный курорт, Пиренеи, Андорра' },
          { name: 'Пас-де-ла-Каса', lat: 42.5264, lng: 1.7356, type: 'resort' as const, description: 'Лыжная зона и шоппинг, граница с Францией, популярное место, Андорра' },
          { name: 'Эскальдес-Энгордань', lat: 42.5100, lng: 1.5350, type: 'attraction' as const, description: 'Термальный комплекс Кальдеа, спа-центр, горячие источники, популярное место, Андорра' },
          { name: 'Долина Мадриу-Перафита-Кларор', lat: 42.5667, lng: 1.5000, type: 'attraction' as const, description: 'Объект ЮНЕСКО, тропы для трекинга, дикая природа, Пиренеи, Андорра' },
          { name: 'Рок-дель-Кер', lat: 42.5333, lng: 1.5500, type: 'attraction' as const, description: 'Смотровая площадка с панорамными видами на Пиренеи, популярное место для фото, Андорра' },
          { name: 'Сан-Жулия-де-Лория', lat: 42.4667, lng: 1.4833, type: 'city' as const, description: 'Живописный город у реки (9 тыс.), юг Андорры, близость к Испании' }
        ];
      case 'argentina':
        return [
          { name: 'Буэнос-Айрес', lat: -34.6037, lng: -58.3816, type: 'city' as const, description: 'Столица, культурный центр с танго, архитектурой и кухней' },
          { name: 'Кладбище Реколета', lat: -34.5881, lng: -58.3931, type: 'attraction' as const, description: 'Историческое кладбище, объект культурного наследия, могила Эвиты Перон, архитектура' },
          { name: 'Водопады Игуасу', lat: -25.6953, lng: -54.4367, type: 'attraction' as const, description: 'Один из самых больших водопадов в мире на границе с Бразилией' },
          { name: 'Патагония', lat: -50.3404, lng: -72.1478, type: 'attraction' as const, description: 'Дикая природа, ледники, национальные парки' },
          { name: 'Ледник Перито-Морено', lat: -50.4833, lng: -73.2500, type: 'attraction' as const, description: 'Один из немногих ледников, которые продолжают расти' },
          { name: 'Мендоса', lat: -32.8895, lng: -68.8458, type: 'city' as const, description: 'Столица виноделия с видом на Анды' },
          { name: 'Ушуайя', lat: -54.8019, lng: -68.3029, type: 'city' as const, description: 'Самый южный город мира, ворота в Антарктиду' },
          { name: 'Салта', lat: -24.7821, lng: -65.4232, type: 'city' as const, description: 'Колониальная архитектура и знаменитый "Поезд облаков"' },
          { name: 'Барилоче', lat: -41.1333, lng: -71.3000, type: 'resort' as const, description: 'Швейцарский стиль, озера, горнолыжные курорты' },
          { name: 'Кордова', lat: -31.4201, lng: -64.1888, type: 'city' as const, description: 'Университетский город с богатой культурной жизнью' },
          { name: 'Иезуитский квартал Кордовы', lat: -31.4201, lng: -64.1888, type: 'attraction' as const, description: 'Иезуитский квартал, объект ЮНЕСКО, университет, церкви, эстансии' },
          { name: 'Полуостров Валдес', lat: -42.5833, lng: -64.0167, type: 'attraction' as const, description: 'Наблюдение за китами, морскими котиками и пингвинами' }
        ];
      case 'angola':
        return [
          { name: 'Луанда', lat: -8.8390, lng: 13.2894, type: 'city' as const, description: 'Столица Анголы (8.3 млн), порт на Атлантическом океане, форт Сан-Мигель, музеи, пляжи, португальская архитектура, нефтяная столица' },
          { name: 'Национальный парк Кисама', lat: -8.4167, lng: 13.2500, type: 'attraction' as const, description: 'Крупнейший сафари-парк страны' },
          { name: 'Водопады Каландула', lat: -9.5000, lng: 17.0000, type: 'attraction' as const, description: 'Одни из самых больших водопадов в Африке' },
          { name: 'Бенгела', lat: -12.5720, lng: 13.4055, type: 'city' as const, description: 'Прибрежный город с лучшими пляжами' },
          { name: 'Уамбо', lat: -12.3000, lng: 15.1167, type: 'city' as const, description: 'Город с колониальной архитектурой' },
          { name: 'Лубанго', lat: -14.9167, lng: 13.5000, type: 'city' as const, description: 'Горный город с базальтовыми скалами' },
          { name: 'Кабинда', lat: -5.5500, lng: 12.2000, type: 'city' as const, description: 'Северо-восточный анклав на побережье' },
          { name: 'Пустыня Намиб', lat: -16.0000, lng: 13.0000, type: 'attraction' as const, description: 'Уникальная пустыня в южной части страны' },
          { name: 'Горы Серанга', lat: -15.0000, lng: 14.0000, type: 'attraction' as const, description: 'Живописные горы в юго-восточной части' },
          { name: 'Остров Лулуа', lat: -6.5000, lng: 13.0000, type: 'attraction' as const, description: 'Экосистемный заповедник в дельте реки Конго' }
        ];
      case 'antigua-barbuda':
        return [
          { name: 'Сент-Джонс', lat: 17.1167, lng: -61.8500, type: 'city' as const, description: 'Столица Антигуа и Барбуда (25 тыс.), колониальная архитектура, порт, Карибское море' },
          { name: 'Английская гавань', lat: 17.1167, lng: -61.8500, type: 'attraction' as const, description: 'Историческая яхтенная гавань, объект ЮНЕСКО, XVIII век, Антигуа' },
          { name: 'Остров Барбуда', lat: 17.6167, lng: -61.7833, type: 'attraction' as const, description: 'Северный остров с птичьим заповедником, нетронутые пляжи, дикая природа, Карибское море' },
          { name: 'Shirley Heights', lat: 17.1000, lng: -61.8500, type: 'attraction' as const, description: 'Панорамная точка с видом на остров, историческое место, популярное место для фото, Антигуа' },
          { name: 'Devil\'s Bridge', lat: 17.1000, lng: -61.8667, type: 'attraction' as const, description: 'Природная арка у океана, известняковая формация, популярное место, Атлантический океан, Антигуа' },
          { name: 'Пляж Диккенсон Бэй', lat: 17.1000, lng: -61.8333, type: 'resort' as const, description: 'Один из лучших пляжей острова, белый песок, Карибское море, популярное место, Антигуа' },
          { name: 'Jumby Bay Island', lat: 17.0833, lng: -61.8000, type: 'resort' as const, description: 'Частный остров-курорт, люксовый отдых, пляжи, Карибское море, Антигуа' }
        ];
      case 'armenia':
        return [
          { name: 'Ереван', lat: 40.1792, lng: 44.4991, type: 'city' as const, description: 'Столица Армении, культурный и исторический центр' },
          { name: 'Гегард', lat: 40.8333, lng: 45.4167, type: 'attraction' as const, description: 'Древний монастырь, частично высечен в скале, объект ЮНЕСКО' },
          { name: 'Хор Вирап', lat: 39.8647, lng: 44.9125, type: 'attraction' as const, description: 'Монастырь с панорамным видом на гору Арарат' },
          { name: 'Гарни', lat: 40.1167, lng: 45.2000, type: 'attraction' as const, description: 'Языческий храм I века, единственный сохранившийся' },
          { name: 'Севан', lat: 40.5611, lng: 45.0180, type: 'resort' as const, description: 'Курорт на берегу крупнейшего высокогорного озера Кавказа' },
          { name: 'Дилижан', lat: 40.7419, lng: 44.8639, type: 'city' as const, description: 'Город в лесах, "армянская Швейцария"' },
          { name: 'Татев', lat: 39.3781, lng: 46.2667, type: 'attraction' as const, description: 'Монастырь на скале с канатной дорогой "Воротанский мост"' },
          { name: 'Арагац', lat: 40.5000, lng: 44.2000, type: 'attraction' as const, description: 'Высшая точка Армении (4090 м), горный массив' },
          { name: 'Нораванк', lat: 39.6167, lng: 45.9833, type: 'attraction' as const, description: 'Монастырь с красными стенами в ущелье реки Ахурян' },
          { name: 'Ахпат', lat: 40.7833, lng: 44.7500, type: 'attraction' as const, description: 'Монастырский комплекс XII-XIII веков в Дилижанском регионе' },
          { name: 'Амберд', lat: 40.4167, lng: 44.2500, type: 'attraction' as const, description: 'Средневековая крепость на склоне горы Арагац' },
          { name: 'Арени', lat: 40.3000, lng: 45.1000, type: 'city' as const, description: 'Село с древней винодельней и фестивалем винограда' }
        ];
      case 'artsakh':
        return [
          { name: 'Степанакерт', lat: 39.8161, lng: 46.7638, type: 'city' as const, description: 'Бывшая столица Нагорного Карабаха' },
          { name: 'Шуши (Шуша)', lat: 39.7553, lng: 46.7506, type: 'city' as const, description: 'Историческая культурная столица Карабаха' },
          { name: 'Монастырь Гандзасар', lat: 40.0761, lng: 46.7525, type: 'attraction' as const, description: 'Жемчужина армянской архитектуры XIII века' },
          { name: 'Амарасский монастырь', lat: 39.7833, lng: 46.7667, type: 'attraction' as const, description: 'Монастырь IV века, место создания армянского алфавита' },
          { name: 'Монастырь Дадиванк', lat: 40.1833, lng: 46.6000, type: 'attraction' as const, description: 'Монастырский комплекс IX-XIII веков в живописном ущелье' },
          { name: 'Монастырь Хатраванк', lat: 39.8000, lng: 46.9000, type: 'attraction' as const, description: 'Монастырь X-XIII веков на склоне горы' },
          { name: 'Крепость Майраберд', lat: 39.8500, lng: 46.8000, type: 'attraction' as const, description: 'Средневековая крепость XVIII века' },
          { name: 'Археологический комплекс Тигранакерт', lat: 39.7000, lng: 46.8500, type: 'attraction' as const, description: 'Руины древнего города, основанного царем Тиграном Великим' },
          { name: 'Водопады Джермук-Карабах', lat: 39.9500, lng: 46.5500, type: 'attraction' as const, description: 'Каскад водопадов в горном ущелье' },
          { name: 'Горис-Карабахские пещеры', lat: 39.9000, lng: 46.6000, type: 'attraction' as const, description: 'Система пещер в известняковых скалах' }
        ];
      case 'australia':
        return [
          { name: 'Сидней', lat: -33.8688, lng: 151.2093, type: 'city' as const, description: 'Крупнейший город Австралии, Оперный театр, Харбор-Бридж' },
          { name: 'Сиднейский оперный театр', lat: -33.8568, lng: 151.2153, type: 'attraction' as const, description: 'Архитектурный шедевр, объект ЮНЕСКО, символ Австралии, XX век' },
          { name: 'Мельбурн', lat: -37.8136, lng: 144.9631, type: 'city' as const, description: 'Культурная столица, уличное искусство, кофейни' },
          { name: 'Большой Барьерный риф', lat: -18.2500, lng: 147.9667, type: 'attraction' as const, description: 'Мировое наследие UNESCO, лучший дайвинг в мире' },
          { name: 'Улуру', lat: -25.3444, lng: 131.0369, type: 'attraction' as const, description: 'Священная красная скала в сердце континента, объект ЮНЕСКО' },
          { name: 'Ката Тьюта', lat: -25.3489, lng: 131.0296, type: 'attraction' as const, description: 'Красные каменные формации в пустыне, объект ЮНЕСКО' },
          { name: 'Голд Кост', lat: -28.0167, lng: 153.4000, type: 'resort' as const, description: 'Пляжный курорт с серфингом и парками развлечений' },
          { name: 'Брисбен', lat: -27.4698, lng: 153.0251, type: 'city' as const, description: 'Столица Квинсленда, ворота на Большой Барьерный риф' },
          { name: 'Перт', lat: -31.9505, lng: 115.8605, type: 'city' as const, description: 'Самый изолированный город мира (2.1 млн), золотой регион, Индийский океан, Кингс-Парк, Сван-Ривер, Западная Австралия' },
          { name: 'Аделаида', lat: -34.9285, lng: 138.6007, type: 'city' as const, description: 'Город-сад (1.4 млн), винодельческие регионы, фестивали, пляжи, долина Баросса, Южная Австралия, культурная столица' },
          { name: 'Дарвин', lat: -12.4634, lng: 130.8456, type: 'city' as const, description: 'Тропическая столица Северной территории (150 тыс.), Арафурское море, национальные парки, близость к Азии, тропический климат' },
          { name: 'Хобарт', lat: -42.8821, lng: 147.3272, type: 'city' as const, description: 'Столица Тасмании (240 тыс.), Монумент MONA, порт, исторический центр, гора Веллингтон, юг Австралии, остров' },
          { name: 'Канберра', lat: -35.2809, lng: 149.1300, type: 'city' as const, description: 'Столица Австралии (450 тыс.), Парламентский дом, Национальная галерея, озеро Берли-Гриффин, спланированный город, ACT' }
        ];
      case 'avstriya-gid':
        return [
          { name: 'Вена', lat: 48.2082, lng: 16.3738, type: 'city' as const, description: 'Столица Австрии (1.9 млн), имперская столица с дворцами и кофейнями, Шёнбрунн, Хофбург, опера, Дунай, объект ЮНЕСКО' },
          { name: 'Зальцбург', lat: 47.8095, lng: 13.0550, type: 'city' as const, description: 'Город Моцарта (155 тыс.), барочная архитектура, Хоэнзальцбург, объект ЮНЕСКО, фестивали, река Зальцах, запад Австрии' },
          { name: 'Крепость Хоэнзальцбург', lat: 47.7944, lng: 13.0467, type: 'attraction' as const, description: 'Крупнейшая полностью сохранившаяся крепость Центральной Европы, XI век, панорамные виды, Зальцбург, музей, канатная дорога' },
          { name: 'Инсбрук', lat: 47.2692, lng: 11.4041, type: 'city' as const, description: 'Альпийская столица (130 тыс.), Олимпийские игры, Нордкетте, Золотая крыша, Альпы, центр Тироля, горнолыжный курорт' },
          { name: 'Хальштатт', lat: 47.5623, lng: 13.6493, type: 'attraction' as const, description: 'Жемчужина Альп, живописная деревня у озера (800 жителей), объект ЮНЕСКО, соляные шахты, популярное место для фото, центр Австрии' },
          { name: 'Грац', lat: 47.0707, lng: 15.4395, type: 'city' as const, description: 'Столица Штирии (290 тыс.), ренессансный старый город, объект ЮНЕСКО, замок, музей современного искусства, юг Австрии' },
          { name: 'Линц', lat: 48.3064, lng: 14.2861, type: 'city' as const, description: 'Столица Верхней Австрии (210 тыс.), современное искусство, музей Лентос, Дунай, электронная музыка, центр Австрии' },
          { name: 'Клагенфурт', lat: 46.6250, lng: 14.3056, type: 'city' as const, description: 'Столица Каринтии (100 тыс.), озерный регион, озеро Вертерзе, замок, юг Австрии, близость к Словении, Альпы' },
          { name: 'Шёнбрунн', lat: 48.1847, lng: 16.3117, type: 'attraction' as const, description: 'Императорский дворец, парк, лабиринт, объект ЮНЕСКО, Вена, 1441 комната, зоопарк, летняя резиденция Габсбургов' },
          { name: 'Дахштайн', lat: 47.5570, lng: 13.6063, type: 'attraction' as const, description: 'Ледниковая гора (2995 м), Пять Пальцев, альпийские виды, ледяная пещера, центр Австрии, объект ЮНЕСКО, треккинг' },
          { name: 'Мельк', lat: 48.2275, lng: 15.3394, type: 'attraction' as const, description: 'Бенедиктинский монастырь, Дунай, библиотека, барокко, объект ЮНЕСКО, центр Австрии, 1089 год, панорамные виды' },
          { name: 'Китцбюэль', lat: 47.4469, lng: 12.3925, type: 'resort' as const, description: 'Горнолыжный курорт (8 тыс.), альпийские Альпы, Ханенкамм, 170 км трасс, Тироль, запад Австрии, популярное место' },
          { name: 'Брегенц', lat: 47.5031, lng: 9.7477, type: 'city' as const, description: 'Оперный фестиваль на озере (30 тыс.), Боденское озеро, плавучая сцена, замок, запад Австрии, граница с Германией и Швейцарией' }
        ];
      case 'azerbaijan':
        return [
          { name: 'Баку', lat: 40.4093, lng: 49.8671, type: 'city' as const, description: 'Столица Азербайджана (2.3 млн), современный мегаполис с историческим центром, объект ЮНЕСКО, Пламенные башни, Каспийское море' },
          { name: 'Гянджа', lat: 40.6828, lng: 46.3606, type: 'city' as const, description: 'Второй по величине город Азербайджана (330 тыс.), родина Узейира Гаджибекова, мавзолей Низами, мечети, музеи, близость к горам' },
          { name: 'Шеки', lat: 41.1919, lng: 47.1706, type: 'city' as const, description: 'Город с музеем в виде замка (65 тыс.), объект ЮНЕСКО, дворец Шекинских ханов, караван-сарай, север Азербайджана, Кавказ' },
          { name: 'Нахичевань', lat: 39.2089, lng: 45.4122, type: 'city' as const, description: 'Анклав между Ираном, Арменией и Турцией (95 тыс.), столица автономной республики, мавзолей Момине-хатун, юг Азербайджана' },
          { name: 'Габала', lat: 41.3597, lng: 47.8469, type: 'resort' as const, description: 'Горнолыжный курорт в Закавказских Альпах (13 тыс.), горы, треккинг, близость к Шеки, север Азербайджана, туризм' },
          { name: 'Шахризабль', lat: 40.7074, lng: 48.8105, type: 'attraction' as const, description: 'Город древнего стекла (25 тыс.), музей стекла и керамики, исторические ремесла, восток Азербайджана, Каспийское море' },
          { name: 'Янардаг', lat: 40.4379, lng: 50.0375, type: 'attraction' as const, description: 'Горящая гора, природный газ горит тысячи лет' },
          { name: 'Апшеронский полуостров', lat: 40.5000, lng: 50.0000, type: 'attraction' as const, description: 'Нефтяные вышки и вулканы в пригороде Баку' },
          { name: 'Нафталань', lat: 40.5167, lng: 46.8167, type: 'resort' as const, description: 'Курорт с нефтяными ваннами, уникальное лечение' },
          { name: 'Лерик', lat: 38.7739, lng: 48.4158, type: 'city' as const, description: 'Самый южный город, тропический климат, горы Талыш' },
          { name: 'Казах', lat: 40.2222, lng: 46.7333, type: 'attraction' as const, description: 'Город с уникальной архитектурой, башни-наблюдатели' },
          { name: 'Хыналыг', lat: 41.3167, lng: 47.3667, type: 'attraction' as const, description: 'Самое высокогорное село, уникальная культура и язык' }
        ];
      case 'bahamas':
        return [
          { name: 'Нассау', lat: 25.0478, lng: -77.3571, type: 'city' as const, description: 'Столица Багам, расположена на острове Нью-Провиденс' },
          { name: 'Эксума', lat: 23.5667, lng: -75.9167, type: 'attraction' as const, description: 'Остров с плавающими свиньями и песчаными отмелями' },
          { name: 'Харбор-Айленд', lat: 25.5000, lng: -76.6333, type: 'resort' as const, description: 'Остров с розовыми пляжами и колониальной архитектурой' },
          { name: 'Гранд-Багама', lat: 26.5000, lng: -78.5000, type: 'resort' as const, description: 'Второй по величине остров с курортами и дайвингом' },
          { name: 'Андрос', lat: 24.7000, lng: -77.8000, type: 'attraction' as const, description: 'Самый большой остров Багам с Голубыми дырами' },
          { name: 'Абако', lat: 26.3333, lng: -77.0000, type: 'resort' as const, description: 'Остров с живописными поселками и водными видами спорта' },
          { name: 'Электра', lat: 24.5000, lng: -76.0000, type: 'attraction' as const, description: 'Остров с рыболовными зонами и птичьими заповедниками' },
          { name: 'Бимини', lat: 25.7333, lng: -79.2667, type: 'resort' as const, description: 'Острова с курортами и возможностью дайвинга' },
          { name: 'Кат-Айленд', lat: 24.2167, lng: -74.4333, type: 'attraction' as const, description: 'Исторический остров с колониальной архитектурой' },
          { name: 'Лонг-Айленд', lat: 23.1833, lng: -75.0833, type: 'resort' as const, description: 'Остров с пляжами и возможностью снорклинга' },
          { name: 'Атлантида', lat: 25.0833, lng: -77.3167, type: 'resort' as const, description: 'Курортный комплекс с аквапарком и аквариумом' },
          { name: 'Баха Мар', lat: 25.0867, lng: -77.2750, type: 'resort' as const, description: 'Роскошный курорт с казино и гольфом' }
        ];
      case 'bahrain':
        return [
          { name: 'Манама', lat: 26.2172, lng: 50.5861, type: 'city' as const, description: 'Столица Бахрейна (200 тыс.), порт на Персидском заливе, форт Калат-аль-Бахрейн - объект ЮНЕСКО, Большая мечеть, Сук-аль-Манама, небоскребы' },
          { name: 'Дерево Жизни', lat: 25.9785, lng: 50.5533, type: 'attraction' as const, description: 'Загадочное дерево посреди пустыни' },
          { name: 'Башня Ал-Фатих', lat: 26.2172, lng: 50.5861, type: 'attraction' as const, description: '128-метровая минарета, одна из самых высоких в мире' },
          { name: 'Форт Калаат аль-Бахрейн', lat: 26.2250, lng: 50.5570, type: 'attraction' as const, description: 'Музей археологии и объект ЮНЕСКО' },
          { name: 'Мечеть Аль-Фатир', lat: 26.2500, lng: 50.6167, type: 'attraction' as const, description: 'Уникальная мечеть на острове Авале' },
          { name: 'Старый рынок (Сука)', lat: 26.2186, lng: 50.5861, type: 'attraction' as const, description: 'Традиционный рынок золота и специй' },
          { name: 'Королевский зоопарк', lat: 26.1833, lng: 50.5667, type: 'attraction' as const, description: 'Расположен в садах Аль-Зубаира, дикая природа, популярное место, Бахрейн' },
          { name: 'Пляж Аль-Хидд', lat: 26.1833, lng: 50.6000, type: 'resort' as const, description: 'Один из самых популярных пляжей с чистым песком, Персидский залив, популярное место, Бахрейн' },
          { name: 'Остров Амвайя', lat: 26.2667, lng: 50.6500, type: 'attraction' as const, description: 'Популярное место для водных видов спорта, дайвинг, снорклинг, Персидский залив, Бахрейн' },
          { name: 'Международный аэропорт Бахрейна', lat: 26.2708, lng: 50.6336, type: 'airport' as const, description: 'Главный аэропорт страны (BAH), международный аэропорт Манамы, главные воздушные ворота' }
        ];
      case 'bangladesh':
        return [
          { name: 'Дакка', lat: 23.8103, lng: 90.4125, type: 'city' as const, description: 'Столица Бангладеш (21 млн), "город мечетей", форт Лалбагх, дворец Ахсан-Манзил, речные круизы, рикши' },
          { name: 'Читтагонг', lat: 22.3475, lng: 91.8123, type: 'city' as const, description: 'Второй по величине город, главный морской порт страны, ворота в Хилл Трактс' },
          { name: 'Сундарбан', lat: 21.9500, lng: 89.1667, type: 'attraction' as const, description: 'Крупнейший мангровый лес в мире, дом бенгальских тигров, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Кокс-Базар', lat: 21.4286, lng: 92.0000, type: 'resort' as const, description: 'Самый длинный естественный пляж в мире (120 км), популярный курорт' },
          { name: 'Сайлен', lat: 24.8990, lng: 91.8710, type: 'city' as const, description: 'Культурный центр с буддийскими памятниками, руины монастырей' },
          { name: 'Пахарпур', lat: 25.0167, lng: 88.9833, type: 'attraction' as const, description: 'Древний буддийский монастырь Сомапура Вихара, объект ЮНЕСКО, VIII век' },
          { name: 'Хилл Трактс', lat: 22.5000, lng: 92.0000, type: 'attraction' as const, description: 'Горная область с племенными культурами, водопадами и треккинговыми маршрутами' },
          { name: 'Силхет', lat: 24.8949, lng: 91.8687, type: 'city' as const, description: 'Город в северо-восточной части страны, известный чайными плантациями' },
          { name: 'Старая Дакка', lat: 23.7104, lng: 90.4074, type: 'attraction' as const, description: 'Исторический центр столицы с архитектурой моголов и колониальной эпохи' },
          { name: 'Багерхат', lat: 22.3333, lng: 89.7833, type: 'attraction' as const, description: 'Исторический город с мечетями, объект Всемирного наследия ЮНЕСКО, XV век' },
          { name: 'Раджшахи', lat: 24.3667, lng: 88.6000, type: 'city' as const, description: 'Исторический город с богатым культурным наследием и манговыми садами' },
          { name: 'Сент-Мартина', lat: 20.7000, lng: 92.2167, type: 'resort' as const, description: 'Экзотический островной курорт с коралловыми рифами' }
        ];
      case 'belarus':
        return [
          { name: 'Минск', lat: 53.9047, lng: 27.5567, type: 'city' as const, description: 'Столица Беларуси (2 млн), советская архитектура, Троицкое предместье, Национальная библиотека, музеи, парки, проспект Независимости' },
          { name: 'Брестская крепость', lat: 52.0917, lng: 23.6833, type: 'attraction' as const, description: 'Мемориальный комплекс-герой, символ несгибаемости советского народа, оборона 1941, музей, скульптура "Мужество", объект культурного наследия' },
          { name: 'Мирский замок', lat: 53.4500, lng: 26.4833, type: 'attraction' as const, description: 'Средневековый замок, объект Всемирного наследия ЮНЕСКО, XVI век, готика и ренессанс, музей, восстановлен, 90 км от Минска' },
          { name: 'Несвижский дворец', lat: 53.2167, lng: 26.6833, type: 'attraction' as const, description: 'Дворцово-парковый ансамбль, объект Всемирного наследия ЮНЕСКО, резиденция Радзивиллов, XVI-XIX века, парк, музей, 120 км от Минска' },
          { name: 'Беловежская пуща', lat: 52.8500, lng: 24.0000, type: 'attraction' as const, description: 'Один из старейших лесов Европы, объект ЮНЕСКО, дом для зубров, биосферный заповедник, общий с Польшей, музей природы' },
          { name: 'Браславские озера', lat: 55.6333, lng: 27.0500, type: 'resort' as const, description: 'Национальный парк с сотнями озер и живописными пейзажами, рыбалка, пляжи, байдарки, ледниковые озера, 250 км от Минска' },
          { name: 'Гродно', lat: 53.6833, lng: 23.8167, type: 'city' as const, description: 'Город с историческим центром и костелами (370 тыс.), Старый замок, Новый замок, Фарный костел, близость к Польше и Литве' },
          { name: 'Витебск', lat: 55.1900, lng: 30.2000, type: 'city' as const, description: 'Родина Марка Шагала (370 тыс.), город искусств, фестиваль "Славянский базар", дом-музей Шагала, Успенский собор' },
          { name: 'Нарочь', lat: 54.4500, lng: 26.8000, type: 'resort' as const, description: 'Самое большое озеро страны (80 км²), популярный курорт, пляжи, санатории, рыбалка, водные виды спорта, 150 км от Минска' },
          { name: 'Могилев', lat: 53.9167, lng: 30.3333, type: 'city' as const, description: 'Исторический город на реке Днепр (380 тыс.), Ратуша, собор, театр, близость к России, промышленный центр' }
        ];
      case 'barbados':
        return [
          { name: 'Бриджтаун', lat: 13.1079, lng: -59.6052, type: 'city' as const, description: 'Столица Барбадоса (110 тыс.), порт на Карибском море, исторический центр - объект ЮНЕСКО, парламент, собор, пляжи, ром' },
          { name: 'Крейн-Бич', lat: 13.1300, lng: -59.4800, type: 'resort' as const, description: 'Один из лучших пляжей мира с розовым песком' },
          { name: 'Маунт-Гей', lat: 13.1000, lng: -59.5000, type: 'attraction' as const, description: 'Старейшая ромовая компания в мире, основанная в 1703 году' },
          { name: 'Батшеба-Бич', lat: 13.2000, lng: -59.5300, type: 'resort' as const, description: 'Популярный пляж для серфинга с базальтовыми образованиями' },
          { name: 'Хиллби', lat: 13.2000, lng: -59.5500, type: 'attraction' as const, description: 'Высшая точка острова с панорамными видами' },
          { name: 'Карлайл-Бей', lat: 13.0800, lng: -59.5800, type: 'resort' as const, description: 'Пляж с затопленными кораблями для дайвинга' },
          { name: 'Сент-Лоуренс-Гренд', lat: 13.0700, lng: -59.5800, type: 'resort' as const, description: 'Люксовые курорты на западном побережье' },
          { name: 'Сент-Филип', lat: 13.1500, lng: -59.4800, type: 'city' as const, description: 'Восточное побережье с дикими пляжами' },
          { name: 'Сент-Джордж', lat: 13.1500, lng: -59.5300, type: 'city' as const, description: 'Центральный район с историческими памятниками' },
          { name: 'Остин-Си-Гранд', lat: 13.0700, lng: -59.5700, type: 'attraction' as const, description: 'Популярное место для вечеринок и водных видов спорта' }
        ];
      case 'bolgariya-gid':
        return [
          { name: 'София', lat: 42.6977, lng: 23.3219, type: 'city' as const, description: 'Столица Болгарии с Александровским собором и римскими руинами' },
          { name: 'Пловдив', lat: 42.1354, lng: 24.7453, type: 'city' as const, description: 'Второй по величине город, один из старейших в Европе' },
          { name: 'Римский театр Пловдива', lat: 42.1472, lng: 24.7508, type: 'attraction' as const, description: 'Римский театр II века, один из лучших сохранившихся в мире, летние концерты' },
          { name: 'Варна', lat: 43.2141, lng: 27.9147, type: 'city' as const, description: 'Морская столица с Морским садом и археологическим музеем' },
          { name: 'Бургас', lat: 42.5048, lng: 27.4626, type: 'city' as const, description: 'Крупнейший порт на Черном море' },
          { name: 'Велико Тырново', lat: 43.0840, lng: 25.6870, type: 'city' as const, description: 'Бывшая столица Второго Болгарского царства' },
          { name: 'Крепость Царевец', lat: 43.0833, lng: 25.6500, type: 'attraction' as const, description: 'Средневековая крепость, резиденция болгарских царей, световое шоу' },
          { name: 'Несебр', lat: 42.6575, lng: 27.7189, type: 'attraction' as const, description: 'Старый город на полуострове, объект ЮНЕСКО' },
          { name: 'Созополь', lat: 42.4175, lng: 27.6922, type: 'resort' as const, description: 'Живописный порт с историческим центром' },
          { name: 'Банско', lat: 41.8356, lng: 23.4856, type: 'resort' as const, description: 'Горнолыжный курорт у подножия Пиринских гор' },
          { name: 'Рильский монастырь', lat: 42.1333, lng: 23.3500, type: 'attraction' as const, description: 'Один из самых важных монастырей православной церкви' },
          { name: 'Балчик', lat: 43.4136, lng: 28.1020, type: 'attraction' as const, description: 'Ботанический сад и дворец балканского царя' },
          { name: 'Шумен', lat: 43.2711, lng: 26.9361, type: 'city' as const, description: 'Город с памятником 1000-летию Болгарии' },
          { name: 'Плевен', lat: 43.4172, lng: 24.6142, type: 'city' as const, description: 'Город с панорамой Освободительной войны' },
          { name: 'Стара Загора', lat: 42.4258, lng: 25.6347, type: 'city' as const, description: 'Один из старейших городов Европы' },
          { name: 'Казанлык', lat: 42.6167, lng: 25.3931, type: 'city' as const, description: 'Столица Тракийской розы и виноделия' },
          { name: 'Фракийская гробница Казанлык', lat: 42.6167, lng: 25.3931, type: 'attraction' as const, description: 'Древняя фракийская гробница IV века до н.э., объект ЮНЕСКО, уникальные фрески' },
          { name: 'Поморие', lat: 42.5667, lng: 27.6167, type: 'resort' as const, description: 'Курорт с солёными озерами и грязелечебницами' }
        ];
      case 'bolivia':
        return [
          { name: 'Ла-Пас', lat: -16.4833, lng: -68.1500, type: 'city' as const, description: 'Административная столица на высоте 3650 м, самая высокая столица мира' },
          { name: 'Уюни', lat: -20.1333, lng: -67.4667, type: 'attraction' as const, description: 'Солончак Уюни - крупнейший солончак в мире, эффект зеркала в сезон дождей' },
          { name: 'Озеро Титикака', lat: -15.8333, lng: -69.3333, type: 'attraction' as const, description: 'Самое высокогорное судоходное озеро (3812 м), плавучие острова урос' },
          { name: 'Сукре', lat: -19.0333, lng: -65.2667, type: 'city' as const, description: 'Конституционная столица с колониальной архитектурой UNESCO' },
          { name: 'Потоси', lat: -19.5833, lng: -65.7500, type: 'city' as const, description: 'Город-памятник ЮНЕСКО, когда-то богатейший город Америки, серебряные рудники, XVI-XVIII века' },
          { name: 'Санта-Крус-де-ла-Сьерра', lat: -17.7863, lng: -63.1811, type: 'city' as const, description: 'Крупнейший город страны, современный деловой центр на равнине' },
          { name: 'Кочабамба', lat: -17.3895, lng: -66.1568, type: 'city' as const, description: 'Сельскохозяйственный центр, ворота в тропики, климатический пояс' },
          { name: 'Национальный парк Эдуардо Авароа', lat: -20.3333, lng: -67.5000, type: 'attraction' as const, description: 'Высокогорная пустыня с геотермальными источниками и фламинго' },
          { name: 'Тихуанако', lat: -16.5333, lng: -68.6833, type: 'attraction' as const, description: 'Археологический комплекс древней цивилизации Тихуанако, Портал Солнца, объект ЮНЕСКО, III-XII века' },
          { name: 'Оруро', lat: -17.9833, lng: -67.1167, type: 'city' as const, description: 'Культурный центр с карнавалом дьявола (UNESCO)' },
          { name: 'Копакабана', lat: -16.1667, lng: -69.0833, type: 'attraction' as const, description: 'Город на берегу озера Титикака, отправная точка к острову Солнца' },
          { name: 'Исла-дель-Солн', lat: -15.8333, lng: -69.3333, type: 'attraction' as const, description: 'Остров Солнца на озере Титикака, священное место инков' },
          { name: 'Долина Мертвого дерева', lat: -20.2000, lng: -67.5000, type: 'attraction' as const, description: 'Уникальные минерализованные деревья возрастом 4000 лет' },
          { name: 'Национальный парк Невадо де Тола', lat: -20.0000, lng: -67.8333, type: 'attraction' as const, description: 'Горный ландшафт с вулканами и снежными вершинами' }
        ];
      case 'bosnia-herzegovina':
        return [
          { name: 'Сараево', lat: 43.8563, lng: 18.4131, type: 'city' as const, description: 'Столица Боснии и Герцеговины, "Джерусалим Европы"' },
          { name: 'Мостар', lat: 43.3433, lng: 17.8081, type: 'city' as const, description: 'Город со знаменитым Старым мостом, объект ЮНЕСКО' },
          { name: 'Баня-Лука', lat: 44.7758, lng: 17.1856, type: 'city' as const, description: '"Зеленый город" и административный центр Республики Сербской' },
          { name: 'Бихач', lat: 44.8179, lng: 15.8707, type: 'city' as const, description: 'Город на реке Уна с живописными водопадами' },
          { name: 'Тузла', lat: 44.5384, lng: 18.6670, type: 'city' as const, description: 'Промышленный центр с богатыми соляными залежами' },
          { name: 'Старый мост Мостар', lat: 43.3433, lng: 17.8081, type: 'attraction' as const, description: 'Символ примирения, объект ЮНЕСКО' },
          { name: 'Башчаршия', lat: 43.8586, lng: 18.4351, type: 'attraction' as const, description: 'Старый турецкий рынок в Сараево' },
          { name: 'Водопад Кравице', lat: 43.3167, lng: 17.6500, type: 'attraction' as const, description: 'Каскад из 12 водопадов высотой до 25 метров' },
          { name: 'Форт Врано', lat: 43.8333, lng: 18.3833, type: 'attraction' as const, description: 'Историческая крепость над Сараево' },
          { name: 'Национальный парк Стрбское озеро', lat: 44.2000, lng: 19.1000, type: 'attraction' as const, description: 'Горное озеро на высоте 980 метров' }
        ];
      case 'botswana':
        return [
          { name: 'Габороне', lat: -24.6282, lng: 25.9231, type: 'city' as const, description: 'Столица Ботсваны, современный город с музеями и рынками' },
          { name: 'Касане', lat: -17.8189, lng: 25.1611, type: 'city' as const, description: 'Город в северной части страны, ворота в национальный парк Чобе' },
          { name: 'Дельта Окаванго', lat: -19.4833, lng: 22.8333, type: 'attraction' as const, description: 'Крупнейшая внутренняя дельта в мире, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Национальный парк Чобе', lat: -18.0000, lng: 25.0000, type: 'attraction' as const, description: 'Парк с крупнейшей популяцией слонов в мире' },
          { name: 'Соляные пустыни Макгадикгади', lat: -20.8000, lng: 26.3000, type: 'attraction' as const, description: 'Крупнейшие соляные равнины в мире, уникальные ландшафты' },
          { name: 'Холмы Цодило', lat: -18.2000, lng: 21.5000, type: 'attraction' as const, description: 'Наскальные рисунки возрастом до 70,000 лет, объект ЮНЕСКО' },
          { name: 'Заповедник Центральная Калахари', lat: -22.0000, lng: 22.0000, type: 'attraction' as const, description: 'Один из крупнейших заповедников в мире, дом для черногривых львов' }
        ];
      case 'burkina-faso':
        return [
          { name: 'Уагадугу', lat: 12.3714, lng: -1.5197, type: 'city' as const, description: 'Столица Буркина-Фасо (2.4 млн), расположена в саванне, рынки, музеи, кинофестиваль FESPACO, собор, ворота в национальные парки' },
          { name: 'Бобо-Диуласо', lat: 11.1833, lng: -4.2833, type: 'city' as const, description: 'Второй по величине город с мечетью в суданском стиле' },
          { name: 'Кудугу', lat: 11.3833, lng: -2.3333, type: 'city' as const, description: 'Город на юге страны, известен своими традициями народа кассена' },
          { name: 'Скалы Синду', lat: 11.5000, lng: -2.8333, type: 'attraction' as const, description: 'Уникальные геологические образования из песчаника, священное место' },
          { name: 'Национальный парк Арли', lat: 11.3500, lng: 1.4333, type: 'attraction' as const, description: 'Часть Всемирного наследия ЮНЕСКО, обитание слонов и львов' },
          { name: 'Деревня Тиебеле', lat: 10.5000, lng: -2.5000, type: 'attraction' as const, description: 'Традиционные расписные дома народа кассена' },
          { name: 'Национальный музей музыки', lat: 12.3714, lng: -1.5197, type: 'attraction' as const, description: 'Крупнейший музей музыки в Африке с традиционными инструментами' },
          { name: 'Большой рынок Уагадугу', lat: 12.3667, lng: -1.5333, type: 'attraction' as const, description: 'Самый большой рынок страны с товарами и ремеслами' },
          { name: 'Мечеть Бобо-Диуласо', lat: 11.1833, lng: -4.2833, type: 'attraction' as const, description: 'Архитектура в суданском стиле, символ города' },
          { name: 'Аэропорт Уагадугу', lat: 12.3532, lng: -1.5114, type: 'airport' as const, description: 'Международный аэропорт столицы' }
        ];
      case 'cabo-verde':
        return [
          { name: 'Прая', lat: 14.9333, lng: -23.5167, type: 'city' as const, description: 'Столица Кабо-Верде (160 тыс.), расположена на острове Сантьягу, порт, пляжи, португальская архитектура, рынки, ворота на другие острова' },
          { name: 'Санта-Мария', lat: 16.5833, lng: -22.9000, type: 'resort' as const, description: 'Главный курорт на острове Сал' },
          { name: 'Майнду', lat: 16.8833, lng: -25.0000, type: 'city' as const, description: 'Культурная столица на острове Сан-Висенте' },
          { name: 'Пико-ду-Фогу', lat: 14.9500, lng: -24.3667, type: 'attraction' as const, description: 'Самая высокая точка архипелага (2829 м)' },
          { name: 'Боа-Вишта', lat: 16.1167, lng: -22.9833, type: 'resort' as const, description: 'Популярный курорт с песчаными дюнами' },
          { name: 'Эш Каминда', lat: 16.0667, lng: -22.9167, type: 'attraction' as const, description: 'Знаменитые песчаные дюны' },
          { name: 'Сан-Антониу', lat: 17.9167, lng: -25.7167, type: 'city' as const, description: '"Зеленый" остров с горными пейзажами' },
          { name: 'Вулкан Пико', lat: 14.9500, lng: -24.3667, type: 'attraction' as const, description: 'Действующий вулкан на острове Фогу' },
          { name: 'Плато Гуинде', lat: 14.9167, lng: -23.5000, type: 'attraction' as const, description: 'Исторический центр Праи' },
          { name: 'Крепость Реал де Сан-Филипе', lat: 14.8833, lng: -24.4833, type: 'attraction' as const, description: 'Лучше сохранившаяся колониальная крепость' }
        ];
      case 'cameroon':
        return [
          { name: 'Яунде', lat: 3.8667, lng: 11.5167, type: 'city' as const, description: 'Столица Камеруна (4.3 млн), политический и культурный центр, музеи, рынки, университеты, колониальная архитектура, горный климат' },
          { name: 'Дуала', lat: 4.0500, lng: 9.7000, type: 'city' as const, description: 'Крупнейший город и экономическая столица (3.7 млн), морской порт, промышленный центр, ночная жизнь, близость к горе Камерун' },
          { name: 'Гора Камерун', lat: 4.2000, lng: 9.1833, type: 'attraction' as const, description: 'Активный вулкан, высшая точка страны (4095 м), треккинг, облачные леса, эндемичная флора, панорамные виды, 3-4 дня восхождение' },
          { name: 'Национальный парк Ваза', lat: 2.3333, lng: 14.8333, type: 'attraction' as const, description: 'Сафари в дикой природе, один из крупнейших национальных парков, жирафы, слоны, антилопы, более 300 видов птиц, саванна' },
          { name: 'Резерват Джа', lat: 2.6667, lng: 10.8333, type: 'attraction' as const, description: 'Тропические леса, объект Всемирного наследия ЮНЕСКО, гориллы, шимпанзе, слоны, биоразнообразие, экотуризм' },
          { name: 'Лимбе', lat: 4.0278, lng: 9.1944, type: 'resort' as const, description: 'Курортный город с ботаническим садом и пляжами, черный вулканический песок, центр спасения приматов, близость к горе Камерун' },
          { name: 'Баменда', lat: 6.5833, lng: 10.1667, type: 'city' as const, description: 'Город в западной части страны (350 тыс.), культурная столица региона, университет, традиционная архитектура, горы, кофе' },
          { name: 'Криби', lat: 2.9333, lng: 9.9333, type: 'city' as const, description: 'Южный порт с рыболовными зонами и пляжами (80 тыс.), курорт, морепродукты, близость к экватору, тропический климат' },
          { name: 'Водопады Эком', lat: 5.5000, lng: 10.1000, type: 'attraction' as const, description: 'Природное чудо с 80-метровыми каскадами, окружены тропическим лесом, доступ по тропе, популярное место для фото, западный регион' },
          { name: 'Национальный парк Лобеке', lat: 2.5000, lng: 13.0000, type: 'attraction' as const, description: 'Заповедник с богатой фауной и флорой, гориллы, лесные слоны, буйволы, более 300 видов птиц, тропический лес, граница с ЦАР' }
        ];
      case 'central-african-republic':
        return [
          { name: 'Банги', lat: 4.3612, lng: 18.5550, type: 'city' as const, description: 'Столица ЦАР (890 тыс.), крупнейший город страны, порт на реке Убанги, рынки, собор, близость к ДР Конго' },
          { name: 'Национальный парк Дзанга-Сангха', lat: 2.5833, lng: 16.5167, type: 'attraction' as const, description: 'Тропический лес с лесными слонами и гориллами, объект ЮНЕСКО, соляные лизунцы, экотуризм, юго-запад страны' },
          { name: 'Соляные лизунцы Дзанга-Баи', lat: 2.1833, lng: 16.4167, type: 'attraction' as const, description: 'Уникальное место наблюдения за лесными слонами, соляные поля, платформы для наблюдения, гориллы, обезьяны, парк Дзанга-Сангха' },
          { name: 'Национальный парк Манво-Гунда-Сен-Флорис', lat: 10.5000, lng: 22.5000, type: 'attraction' as const, description: 'Саванна с крупными млекопитающими, объект ЮНЕСКО, слоны, жирафы, львы, буйволы, север страны, река Аук' },
          { name: 'Бамианда', lat: 5.7667, lng: 20.6500, type: 'city' as const, description: 'Второй по величине город ЦАР (40 тыс.), центр провинции, рынки, традиционная культура, сельскохозяйственный регион' },
          { name: 'Боунга', lat: 9.1333, lng: 18.2667, type: 'city' as const, description: 'Город на севере страны (30 тыс.), близость к национальному парку, торговый центр, традиционная архитектура' },
          { name: 'Кага-Бандоро', lat: 6.9833, lng: 19.1833, type: 'city' as const, description: 'Город в центральной части страны (25 тыс.), исторический центр, рынки, близость к природным паркам' },
          { name: 'Гора Нгауи', lat: 10.7333, lng: 20.6833, type: 'attraction' as const, description: 'Высшая точка ЦАР (1420 м), север страны, гранитная гора, панорамные виды, треккинг, близость к парку Манво-Гунда' },
          { name: 'Озеро Бамингуи', lat: 7.5000, lng: 20.8333, type: 'attraction' as const, description: 'Крупнейшее озеро страны, рыболовство, водные виды спорта, окружено саванной, центральная часть страны' },
          { name: 'Водопады Богангу', lat: 4.5000, lng: 18.0000, type: 'attraction' as const, description: 'Живописные каскады в тропических лесах, река Богангу, доступ по тропе, окружены джунглями, юго-запад страны' }
        ];
      case 'portugaliya-gid':
        return [
          { name: 'Лиссабон', lat: 38.7223, lng: -9.1393, type: 'city' as const, description: 'Столица Португалии (550 тыс.), исторический центр, трамваи, замок Святого Георгия, Белен, фаду, мосты, Атлантический океан' },
          { name: 'Порту', lat: 41.1579, lng: -8.6291, type: 'city' as const, description: 'Город портвейна (240 тыс.) с живописной архитектурой, объект ЮНЕСКО, винные погреба, мост Дона Луиша, река Дору, север Португалии' },
          { name: 'Синтра', lat: 38.7879, lng: -9.3906, type: 'attraction' as const, description: 'Город с сказочными дворцами и парками (30 тыс.), объект ЮНЕСКО, дворец Пена, мавританский замок, 30 км от Лиссабона, горы' },
          { name: 'Дворец Пена', lat: 38.7879, lng: -9.3906, type: 'attraction' as const, description: 'Романтический дворец XIX века, объект ЮНЕСКО, символ Синтры, яркие цвета, парк, панорамные виды, королевская резиденция' },
          { name: 'Монастырь Жеронимуш', lat: 38.6979, lng: -9.2065, type: 'attraction' as const, description: 'Монастырь XVI века, объект ЮНЕСКО, мануэлино стиль, могила Васко да Гама, Белен, архитектура эпохи открытий' },
          { name: 'Башня Белен', lat: 38.6916, lng: -9.2160, type: 'attraction' as const, description: 'Форт XVI века, объект ЮНЕСКО, символ эпохи Великих географических открытий, река Тежу, Белен, мануэлино стиль' },
          { name: 'Алгарве', lat: 37.0194, lng: -8.5358, type: 'resort' as const, description: 'Курортный регион с золотыми пляжами, 300 дней солнца, скалы, пещеры, гольф, Фару, Лагуш, юг Португалии, Атлантика' },
          { name: 'Коимбра', lat: 40.2033, lng: -8.4103, type: 'city' as const, description: 'Студенческий город (140 тыс.) с древним университетом (XIII век), объект ЮНЕСКО, библиотека Жуанина, река Мондегу, центр Португалии' },
          { name: 'Мадейра', lat: 32.7607, lng: -16.9595, type: 'resort' as const, description: 'Остров вечной весны с тропическим климатом, Фуншал (110 тыс.), левады, горы, вино, цветы, Атлантика, 1000 км от Лиссабона' },
          { name: 'Óбидос', lat: 39.3606, lng: -9.1571, type: 'attraction' as const, description: 'Средневековый город в крепостных стенах' },
          { name: 'Брага', lat: 41.5454, lng: -8.4265, type: 'city' as const, description: 'Город с древними храмами и церквями' },
          { name: 'Авейру', lat: 40.6443, lng: -8.6455, type: 'city' as const, description: 'Португальская Венеция с каналами и цветными лодками' },
          { name: 'Мафра', lat: 38.9370, lng: -9.3258, type: 'attraction' as const, description: 'Дворец-монастырь с библиотекой на 40,000 книг' }
        ];
      case 'brazil':
        return [
          { name: 'Рио-де-Жанейро', lat: -22.9068, lng: -43.1729, type: 'city' as const, description: 'Город пляжей, карнавала и Христа-Искупителя (6.7 млн), Копакабана, Ипанема, Сахарная голова, объект ЮНЕСКО, самба' },
          { name: 'Сан-Паулу', lat: -23.5505, lng: -46.6333, type: 'city' as const, description: 'Финансовый центр страны (12.3 млн), крупнейший город Южной Америки, разнообразие ресторанов, музеи, небоскребы, ночная жизнь' },
          { name: 'Бразилиа', lat: -15.7801, lng: -47.9292, type: 'city' as const, description: 'Планируемая столица (3 млн), объект Всемирного наследия ЮНЕСКО, архитектура Оскара Нимейера, форма самолета, современная планировка' },
          { name: 'Салвадор', lat: -12.9714, lng: -38.5014, type: 'city' as const, description: 'Колониальная архитектура и афро-бразильская культура (2.9 млн), исторический центр - объект ЮНЕСКО, капоэйра, карнавал, пляжи' },
          { name: 'Олинда', lat: -8.0167, lng: -34.8500, type: 'attraction' as const, description: 'Колониальный город, объект ЮНЕСКО, португальская архитектура, XVI-XVIII века, карнавал, церкви, панорама на Ресифи' },
          { name: 'Статуя Христа-Искупителя', lat: -22.9519, lng: -43.2105, type: 'attraction' as const, description: 'Одно из Новых чудес света (38 м), символ Рио, гора Корковаду, панорама города, объект ЮНЕСКО, 1931 год' },
          { name: 'Водопады Игуасу', lat: -25.6953, lng: -54.4367, type: 'attraction' as const, description: 'Один из самых больших водопадов в мире, объект ЮНЕСКО, 275 каскадов, "Глотка дьявола", граница с Аргентиной, национальный парк' },
          { name: 'Амазония', lat: -3.4653, lng: -62.2159, type: 'attraction' as const, description: 'Крупнейший тропический лес мира, объект ЮНЕСКО, биоразнообразие, речные круизы, экотуризм, индейские общины, Манаус' },
          { name: 'Пантанал', lat: -19.0000, lng: -57.0000, type: 'attraction' as const, description: 'Крупнейшая тропическая заболоченная область, объект ЮНЕСКО, сафари, ягуары, кайманы, птицы, сезонные наводнения' },
          { name: 'Копакабана', lat: -22.9865, lng: -43.1883, type: 'resort' as const, description: 'Знаменитый пляж с белым песком (4 км), набережная, отели, рестораны, ночная жизнь, символ Рио-де-Жанейро' },
          { name: 'Фернанду-ди-Норонья', lat: -3.8449, lng: -32.4309, type: 'resort' as const, description: 'Тропический рай и морской заповедник, объект ЮНЕСКО, дайвинг, дельфины, черепахи, ограниченное количество туристов' }
        ];
      case 'brunei':
        return [
          { name: 'Бандар-Сери-Бегаван', lat: 4.8903, lng: 114.9438, type: 'city' as const, description: 'Столица Брунея (280 тыс.), мечети и дворцы, Королевский музей, водная деревня Кампонг-Айер, нефтяное богатство' },
          { name: 'Кампонг-Айер', lat: 4.8833, lng: 114.9500, type: 'attraction' as const, description: 'Водная деревня - крупнейшая в мире, 30 тыс. жителей на сваях, традиционный образ жизни, мечети, школы, магазины' },
          { name: 'Мечеть Султана Омара Али Сайфуддина', lat: 4.8833, lng: 114.9333, type: 'attraction' as const, description: 'Самая красивая мечеть в Азии (1958), золотой купол, мрамор, искусственное озеро, символ Брунея, архитектурный шедевр' },
          { name: 'Дворец Нурул Иман', lat: 4.8833, lng: 114.9333, type: 'attraction' as const, description: 'Резиденция султана с 1788 комнатами, крупнейший жилой дворец мира, открыт только во время Рамадана, архитектура ислама' },
          { name: 'Национальный парк Улу Тембуронг', lat: 4.5000, lng: 115.0000, type: 'attraction' as const, description: 'Первобытный тропический лес с канопи-мостом, нетронутая природа, обезьяны, птицы, речные круизы, экотуризм' },
          { name: 'Беракас', lat: 4.8000, lng: 115.0000, type: 'city' as const, description: 'Район с пляжами и курортами, популярное место для отдыха, рестораны морепродуктов, близость к столице' },
          { name: 'Серия-Бегаван', lat: 4.7500, lng: 114.8833, type: 'city' as const, description: 'Пригород столицы с историческими достопримечательностями, нефтяные месторождения, музеи, традиционная архитектура' },
          { name: 'Тутонг', lat: 4.7833, lng: 114.6500, type: 'city' as const, description: 'Город в западной части страны, сельскохозяйственный регион, традиционная культура, рынки, близость к национальным паркам' },
          { name: 'Белайт', lat: 4.5833, lng: 114.2000, type: 'city' as const, description: 'Северо-восточный город с природными достопримечательностями, сельскохозяйственный регион, традиционная культура, близость к лесам' },
          { name: 'Тембуронг', lat: 4.5000, lng: 115.1667, type: 'city' as const, description: 'Восточный район с национальным парком Улу Тембуронг, экотуризм, канопи-мост, нетронутая природа, речные круизы' },
          { name: 'Муара', lat: 4.9167, lng: 115.0500, type: 'city' as const, description: 'Портовый город у устья реки Бруней, пляжи, рыболовство, близость к столице, морской транспорт' },
          { name: 'Лаби', lat: 4.3333, lng: 114.8333, type: 'resort' as const, description: 'Пляжный курорт с живописными пейзажами, спокойная атмосфера, традиционная архитектура, близость к природным паркам' }
        ];
      case 'kuba-respublika-gid':
        return [
          { name: 'Гавана', lat: 23.1136, lng: -82.3666, type: 'city' as const, description: 'Столица Кубы с колониальной архитектурой и легендарной набережной Малекон' },
          { name: 'Варадеро', lat: 23.1441, lng: -81.2508, type: 'resort' as const, description: 'Самый известный курорт Кубы с 20 км белоснежных пляжей' },
          { name: 'Тринидад', lat: 21.8019, lng: -79.9845, type: 'city' as const, description: 'Колониальный город под защитой ЮНЕСКО с мощеными улицами' },
          { name: 'Виньялес', lat: 22.6167, lng: -83.7000, type: 'attraction' as const, description: 'Долина табачных плантаций и знаменитых сигар с Моготесами' },
          { name: 'Сантьяго-де-Куба', lat: 20.0443, lng: -75.8181, type: 'city' as const, description: 'Второй по величине город Кубы, место начала революции' },
          { name: 'Кайо-Коко', lat: 22.5125, lng: -78.4833, type: 'resort' as const, description: 'Нетронутый остров с фламинго и девственными пляжами' },
          { name: 'Национальный парк Сапата', lat: 22.2833, lng: -81.1333, type: 'attraction' as const, description: 'Крупнейшее болото Карибов с крокодилами и 175 видами птиц' },
          { name: 'Крепость Эль-Морро', lat: 23.1533, lng: -82.3556, type: 'attraction' as const, description: 'Историческая крепость XVI века, защищавшая Гавану от пиратов' },
          { name: 'Долина сахарных заводов', lat: 21.7833, lng: -79.9667, type: 'attraction' as const, description: 'Исторический комплекс с колониальными постройками и музеями' },
          { name: 'Финка Хемингуэя', lat: 23.0758, lng: -82.2625, type: 'attraction' as const, description: 'Дом-музей писателя Эрнеста Хемингуэя в пригороде Гаваны' }
        ];
      case 'chekhiya-gid':
        return [
          { name: 'Прага', lat: 50.0755, lng: 14.4378, type: 'city' as const, description: 'Столица Чехии, Золотой город с Пражским Градом и Карловым мостом' },
          { name: 'Чески-Крумлов', lat: 48.8127, lng: 14.3175, type: 'city' as const, description: 'Сказочный средневековый город ЮНЕСКО' },
          { name: 'Карлови Вары', lat: 50.2329, lng: 12.8738, type: 'resort' as const, description: 'Знаменитый термальный курорт с 13 источниками' },
          { name: 'Брно', lat: 49.1951, lng: 16.6068, type: 'city' as const, description: 'Второй по величине город Чехии (380 тыс.), моравская столица, виллы Тугендхат - объект ЮНЕСКО, собор, замок Шпилберк' },
          { name: 'Пльзень', lat: 49.7384, lng: 13.3736, type: 'city' as const, description: 'Город пива, дом пивоварни Pilsner Urquell' },
          { name: 'Крконоше', lat: 50.7364, lng: 15.7394, type: 'attraction' as const, description: 'Горный курорт с горой Снежка, чешские Альпы' },
          { name: 'Замок Карлштейн', lat: 49.9395, lng: 14.1875, type: 'attraction' as const, description: 'Готическая жемчужина, императорский замок' },
          { name: 'Тельч', lat: 49.1844, lng: 15.4523, type: 'attraction' as const, description: 'Ренессансная жемчужина с UNESCO статусом' },
          { name: 'Кутна-Гора', lat: 49.9483, lng: 15.2668, type: 'attraction' as const, description: 'Город серебра с Костницей и собором Святой Варвары' },
          { name: 'Замок Локет', lat: 50.1872, lng: 12.7572, type: 'attraction' as const, description: 'Чешский Нюрнберг без толп туристов' }
        ];
      case 'cyprus-gid':
        return [
          { name: 'Никосия', lat: 35.1856, lng: 33.3823, type: 'city' as const, description: 'Столица Кипра, последняя разделенная столица в мире' },
          { name: 'Лимассол', lat: 34.6667, lng: 33.0333, type: 'city' as const, description: 'Крупнейший курорт, порт, винодельческий центр' },
          { name: 'Пафос', lat: 34.7742, lng: 32.4217, type: 'city' as const, description: 'Культурная столица с археологическим парком ЮНЕСКО' },
          { name: 'Ларнака', lat: 34.9167, lng: 33.6333, type: 'city' as const, description: 'Исторический порт с соляным озером и аэропортом' },
          { name: 'Айя-Напа', lat: 35.0133, lng: 34.0011, type: 'resort' as const, description: 'Молодежный курорт с лучшими пляжами и ночной жизнью' },
          { name: 'Археологический парк Пафоса', lat: 34.7604, lng: 32.4074, type: 'attraction' as const, description: 'Римские мозаики II-IV вв., объект ЮНЕСКО' },
          { name: 'Петра-ту-Ромиу', lat: 34.6691, lng: 32.6258, type: 'attraction' as const, description: 'Скала Афродиты, легендарное место рождения богини' },
          { name: 'Пляж Нисси', lat: 35.0133, lng: 34.0011, type: 'beach' as const, description: 'Белоснежный пляж с бирюзовой водой, "Голубой флаг"' },
          { name: 'Монастырь Киккос', lat: 34.9833, lng: 32.7417, type: 'attraction' as const, description: 'Чудотворная икона Богородицы, сокровищница' },
          { name: 'Замок Колосси', lat: 34.6667, lng: 32.9333, type: 'attraction' as const, description: 'Крестоносная крепость XIII века, музей' }
        ];
      case 'northern-cyprus':
        return [
          { name: 'Лефкоша (Никосия)', lat: 35.1856, lng: 33.3823, type: 'city' as const, description: 'Столица Северного Кипра, единственная разделенная столица в мире' },
          { name: 'Гирне (Кирения)', lat: 35.3408, lng: 33.3184, type: 'city' as const, description: 'Город с самой красивой гаванью Кипра, замок Святого Илариона' },
          { name: 'Газимагуса (Фамагуста)', lat: 35.1264, lng: 33.9486, type: 'city' as const, description: 'Город-крепость с мощными стенами XIV-XV веков, город-призрак Вароша' },
          { name: 'Замок Святого Илариона', lat: 35.3117, lng: 33.2817, type: 'attraction' as const, description: 'Потрясающий замок XI века на высоте 732 м, вдохновил Уолта Диснея' },
          { name: 'Кирения - замок и гавань', lat: 35.3408, lng: 33.3184, type: 'attraction' as const, description: 'Византийский замок VII века, рестораны на набережной' },
          { name: 'Фамагуста - город-крепость', lat: 35.1264, lng: 33.9486, type: 'attraction' as const, description: 'Средневековая крепость, готический собор Святого Николая' },
          { name: 'Замок Кантара', lat: 35.4033, lng: 33.9339, type: 'attraction' as const, description: 'Замок X века на восточной оконечности гор Кирения, панорамные виды' },
          { name: 'Полуостров Карпасия', lat: 35.6033, lng: 34.0578, type: 'attraction' as const, description: 'Дикий полуостров с нетронутой природой, золотые пляжи' },
          { name: 'Саламис - древний город', lat: 35.1844, lng: 33.9006, type: 'attraction' as const, description: 'Руины античного города-государства VII века до н.э., римский театр' },
          { name: 'Замок Буффавенто', lat: 35.3167, lng: 33.3683, type: 'attraction' as const, description: 'Самый высокий замок Кипра (954 м), сложный подъем, потрясающие виды' },
          { name: 'Алагади Бич - пляж черепах', lat: 35.3583, lng: 33.3106, type: 'beach' as const, description: 'Охраняемый пляж, где откладывают яйца морские черепахи Карета-Карета' }
        ];
      case 'denmark':
        return [
          { name: 'Копенгаген', lat: 55.6761, lng: 12.5683, type: 'city' as const, description: 'Столица Дании, культурный и экономический центр страны' },
          { name: 'Орхус', lat: 56.1629, lng: 10.2039, type: 'city' as const, description: 'Второй по величине город Дании (340 тыс.), культурная столица, университет, музеи, собор, Старый город' },
          { name: 'Оденсе', lat: 55.3959, lng: 10.3883, type: 'city' as const, description: 'Третий по величине город Дании (180 тыс.), родина Ганса Христиана Андерсена, музей сказок, собор, парки' },
          { name: 'Ольборг', lat: 57.0488, lng: 9.9217, type: 'city' as const, description: 'Четвертый по величине город на севере Ютландии' },
          { name: 'Скаген', lat: 57.7173, lng: 10.5722, type: 'city' as const, description: 'Самая северная точка Дании, где встречаются моря' },
          { name: 'Статуя Русалочки', lat: 55.6927, lng: 12.5994, type: 'attraction' as const, description: 'Знаменитая скульптура, символ Копенгагена' },
          { name: 'Парк Тиволи', lat: 55.6743, lng: 12.5679, type: 'attraction' as const, description: 'Старейший парк развлечений в мире с аттракционами и концертами' },
          { name: 'Нюхавн', lat: 55.6803, lng: 12.5896, type: 'attraction' as const, description: 'Живописная гавань с цветными домиками в Копенгагене' },
          { name: 'Замок Кронборг', lat: 56.0383, lng: 12.6211, type: 'attraction' as const, description: 'Замок викингов, вдохновивший Шекспира на "Гамлет", объект ЮНЕСКО, XVI-XVII века' }
        ];
      case 'dominican-republic':
        return [
          { name: 'Санто-Доминго', lat: 18.4762, lng: -69.8967, type: 'city' as const, description: 'Столица Доминиканской Республики (2.9 млн), первый город Нового Света, колониальный квартал - объект ЮНЕСКО, Алькасар, собор, музеи' },
          { name: 'Пунта-Кана', lat: 18.5601, lng: -68.3725, type: 'resort' as const, description: 'Крупнейший туристический курорт с белоснежными пляжами' },
          { name: 'Кап-Кана', lat: 18.5167, lng: -68.3833, type: 'resort' as const, description: 'Элитный курорт с полем для гольфа и частными пляжами' },
          { name: 'Пуэрто-Плата', lat: 19.7945, lng: -70.6846, type: 'city' as const, description: 'Северное побережье, канатная дорога на гору Изабель-де-Торрес' },
          { name: 'Самана', lat: 19.2058, lng: -69.3364, type: 'attraction' as const, description: 'Полуостров с наблюдением за горбатыми китами и водопадом Эль-Лимон' },
          { name: 'Баваро', lat: 18.6667, lng: -68.4167, type: 'resort' as const, description: 'Семейные курорты и лучшие пляжи Карибов' },
          { name: 'Ла-Романа', lat: 18.4277, lng: -68.9726, type: 'city' as const, description: 'Восточное побережье, близость к национальному парку Катуси' },
          { name: 'Пико-Дуарте', lat: 18.8500, lng: -70.9833, type: 'attraction' as const, description: 'Высшая точка Карибов (3087 м), треккинг и альпийская растительность' }
        ];
      case 'djibouti':
        return [
          { name: 'Джибути', lat: 11.5721, lng: 43.1450, type: 'city' as const, description: 'Столица Джибути с колониальной архитектурой и центральным рынком' },
          { name: 'Озеро Ассаль', lat: 11.5972, lng: 42.8436, type: 'attraction' as const, description: 'Самое низкое место в Африке, соляные поля и уникальные пейзажи' },
          { name: 'Озеро Аббе', lat: 11.5972, lng: 41.7469, type: 'attraction' as const, description: 'Вулканическое озеро с известняковыми дымоходами' },
          { name: 'Залив Таджура', lat: 11.7828, lng: 42.8822, type: 'resort' as const, description: 'Популярный курорт с пляжами и возможностью дайвинга с китовыми акулами' },
          { name: 'Национальный парк Форе-дю-Дай', lat: 11.6500, lng: 42.9000, type: 'attraction' as const, description: 'Оазис в пустыне с богатой флорой и фауной' },
          { name: 'Гора Года Маунтинс', lat: 12.0000, lng: 42.5000, type: 'attraction' as const, description: 'Вулканические пейзажи и панорамные виды' },
          { name: 'Вулкан Эрта-Алей', lat: 13.6000, lng: 40.5000, type: 'attraction' as const, description: 'Активный вулкан с лавовым озером' },
          { name: 'Дилло', lat: 11.5972, lng: 41.7469, type: 'city' as const, description: 'Город у озера Аббе с уникальными известняковыми формациями' },
          { name: 'Таджура', lat: 11.7828, lng: 42.8822, type: 'city' as const, description: 'Прибрежный город с пляжами и дайвинг-сайтами' }
        ];
      case 'dominica':
        return [
          { name: 'Розо', lat: 15.3020, lng: -61.3894, type: 'city' as const, description: 'Столица Доминики на западном побережье острова, порт, рынки, музыка калинаго, близость к национальному парку Морн-Труа-Питон' },
          { name: 'Кипящее озеро', lat: 15.3167, lng: -61.3000, type: 'attraction' as const, description: 'Второе по величине термальное озеро в мире, находится в национальном парке Морн-Труа-Питон, объект ЮНЕСКО, гейзеры, пешеходные тропы, вулканическая активность' },
          { name: 'Национальный парк Морн-Труа-Питон', lat: 15.3167, lng: -61.3000, type: 'attraction' as const, description: 'Объект Всемирного наследия ЮНЕСКО, девственные тропические леса, вулканические пики, Кипящее озеро, эндемичные виды животных' },
          { name: 'Водопады Трафальгар', lat: 15.3000, lng: -61.3833, type: 'attraction' as const, description: 'Каскад водопадов на реке Трафальгар, доступны для купания и пеших прогулок, близость к Розо' },
          { name: 'Изумрудный бассейн', lat: 15.3000, lng: -61.3667, type: 'attraction' as const, description: 'Естественный бассейн в тропическом лесу, бирюзовая вода, пешие прогулки, близость к национальному парку' },
          { name: 'Пляж Калветт', lat: 15.5500, lng: -61.3667, type: 'beach' as const, description: 'Один из немногих черных вулканических пляжей Доминики, отличное место для серфинга и наблюдения за китами' },
          { name: 'Суфриер-Скоттс Хед Морской заповедник', lat: 15.2000, lng: -61.3500, type: 'attraction' as const, description: 'Первый морской заповедник Карибского бассейна, богатая морская жизнь, дайвинг, сноркелинг, коралловые рифы' },
          { name: 'Парк Папийот', lat: 15.3000, lng: -61.4000, type: 'attraction' as const, description: 'Эко-курорт в джунглях с ботаническим садом, водопадами и виллами, близость к Розо' },
          { name: 'Термальные бассейны Форт-Ширли', lat: 15.2333, lng: -61.3333, type: 'attraction' as const, description: 'Естественные горячие источники в джунглях, релаксация и терапия, близость к южному побережью' },
          { name: 'Калинаго Территория', lat: 15.4500, lng: -61.2500, type: 'attraction' as const, description: 'Резервация коренных калинаго на севостоке острова, традиционные ремесла, культура, деревянные дома' }
        ];
      case 'donetsk':
        return [
          { name: 'Донецк', lat: 48.0159, lng: 37.8056, type: 'city' as const, description: 'Столица ДНР, промышленный и культурный центр региона' },
          { name: 'Макеевка', lat: 48.0500, lng: 38.0000, type: 'city' as const, description: 'Крупный угледобывающий город с населением более 350 тысяч' },
          { name: 'Горловка', lat: 48.3333, lng: 38.1167, type: 'city' as const, description: 'Центр угольной промышленности и машиностроения' },
          { name: 'Донбасс Арена', lat: 48.0128, lng: 37.8071, type: 'attraction' as const, description: 'Современный футбольный стадион, домашняя арена ФК Шахтер' },
          { name: 'Саур-Могила', lat: 47.9167, lng: 38.6333, type: 'attraction' as const, description: 'Мемориальный комплекс на высоте 277,9 м, памятник защитникам Донбасса' },
          { name: 'Ботанический сад ДонНУ', lat: 47.9950, lng: 37.8127, type: 'attraction' as const, description: 'Один из крупнейших ботанических садов Европы с 8000 видами растений' },
          { name: 'Святогорская лавра', lat: 49.0333, lng: 37.5667, type: 'attraction' as const, description: 'Древний пещерный монастырь на меловых скалах Северского Донца' },
          { name: 'Национальный природный парк Святые горы', lat: 49.0167, lng: 37.5833, type: 'attraction' as const, description: 'Заповедная территория с меловыми скалами и сосновыми борами' },
          { name: 'Парк кованых фигур', lat: 48.0120, lng: 37.8090, type: 'attraction' as const, description: 'Уникальная коллекция кованых скульптур под открытым небом' },
          { name: 'Музей промышленности', lat: 48.0300, lng: 37.7900, type: 'attraction' as const, description: 'История индустриального развития Донбасса с экспонатами шахтного оборудования' }
        ];
      case 'ecuador':
        return [
          { name: 'Кито', lat: -0.2295, lng: -78.5250, type: 'city' as const, description: 'Столица Эквадора, самая высокая столица мира (2850 м), объект ЮНЕСКО' },
          { name: 'Гуаякиль', lat: -2.1962, lng: -79.8862, type: 'city' as const, description: 'Крупнейший город и главный порт страны' },
          { name: 'Куэнка', lat: -2.9000, lng: -79.0167, type: 'city' as const, description: 'Колониальный город, объект ЮНЕСКО, "южные Афины"' },
          { name: 'Ингапирка', lat: -2.5500, lng: -78.8667, type: 'attraction' as const, description: 'Крупнейший археологический комплекс инков в Эквадоре, храм Солнца, обсерватория' },
          { name: 'Галапагосские острова', lat: -0.7500, lng: -90.5000, type: 'attraction' as const, description: 'Лаборатория эволюции Дарвина, эндемичная фауна, объект ЮНЕСКО' },
          { name: 'Вулкан Котопахи', lat: -0.6500, lng: -78.4500, type: 'attraction' as const, description: 'Действующий вулкан 5897 м, второй по высоте в стране' },
          { name: 'Национальный парк Ясуни', lat: -1.0500, lng: -76.1000, type: 'attraction' as const, description: 'Самое биоразнообразное место на Земле, заповедник ваорани' },
          { name: 'Вулкан Чимборасо', lat: -1.4700, lng: -78.8167, type: 'attraction' as const, description: 'Самая удаленная от центра Земли точка (6263 м)' },
          { name: 'Лагуна Килотоа', lat: -0.8500, lng: -78.9000, type: 'attraction' as const, description: 'Изумрудное озеро в кратере потухшего вулкана' },
          { name: 'Пляжи Салинас', lat: -2.2167, lng: -80.9667, type: 'resort' as const, description: 'Главный курорт страны с белыми пляжами и наблюдением за китами' },
          { name: 'Облачный лес Миндо', lat: 0.0500, lng: -78.7667, type: 'attraction' as const, description: 'Биоразнообразие с 400+ видами птиц, колибри и туканами' }
        ];
      case 'eritrea':
        return [
          { name: 'Асмэра', lat: 15.3333, lng: 38.9333, type: 'city' as const, description: 'Столица Эритреи, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Массауа', lat: 15.6333, lng: 39.4500, type: 'city' as const, description: 'Исторический порт на Красном море' },
          { name: 'Керен', lat: 15.7833, lng: 38.4500, type: 'city' as const, description: 'Второй по величине город страны' },
          { name: 'Ассааб', lat: 13.0000, lng: 42.7500, type: 'city' as const, description: 'Портовый город на юге страны' },
          { name: 'Архипелаг Дахлак', lat: 15.3000, lng: 41.5000, type: 'resort' as const, description: 'Коралловые острова Красного моря' },
          { name: 'Кохайто', lat: 15.1500, lng: 39.1333, type: 'attraction' as const, description: 'Археологический комплекс аксумского периода' }
        ];
      case 'ethiopia':
        return [
          { name: 'Аддис-Абеба', lat: 8.9806, lng: 38.7578, type: 'city' as const, description: 'Столица Эфиопии (5 млн), расположена на высоте 2355 м, "новый цветок" Африки, Национальный музей, собор, рынки, ворота в исторические места' },
          { name: 'Лалибэла', lat: 12.0333, lng: 39.0500, type: 'attraction' as const, description: 'Уникальный комплекс из 11 монолитных церквей, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Гондэр', lat: 12.6000, lng: 37.4667, type: 'city' as const, description: '"Африканский Камелот" с комплексом замков Фасил-Гебби, объект ЮНЕСКО' },
          { name: 'Аксум', lat: 14.1167, lng: 38.7167, type: 'attraction' as const, description: 'Древний город с гигантскими стелами-обелисками, объект ЮНЕСКО' },
          { name: 'Харар', lat: 9.3167, lng: 42.1167, type: 'city' as const, description: 'Священный город ислама, объект ЮНЕСКО, средневековые стены, кормление гиен' },
          { name: 'Тиграйские церкви', lat: 14.2833, lng: 38.7167, type: 'attraction' as const, description: 'Высеченные в скалах церкви XII-XIII веков, объект ЮНЕСКО, уникальная архитектура' },
          { name: 'Национальный парк Сымен', lat: 13.0833, lng: 38.1667, type: 'attraction' as const, description: 'Горы с эндемичной фауной, включая обезьян гелада, объект ЮНЕСКО' },
          { name: 'Пустыня Данакиль', lat: 14.2000, lng: 40.2667, type: 'attraction' as const, description: 'Одно из самых жарких мест на Земле с соляными озерами и вулканом Эрта-Але' },
          { name: 'Бахр-Дар', lat: 11.5946, lng: 37.3908, type: 'city' as const, description: 'Город на озере Тана, ворота в национальный парк Сымен' },
          { name: 'Озеро Тана', lat: 12.0000, lng: 37.5000, type: 'attraction' as const, description: 'Крупнейшее озеро Эфиопии с островами и монастырями' }
        ];
      case 'estonia':
        return [
          { name: 'Таллин', lat: 59.4370, lng: 24.7536, type: 'city' as const, description: 'Столица Эстонии с одним из наиболее хорошо сохранившихся средневековых центров в Европе (объект ЮНЕСКО)' },
          { name: 'Тарту', lat: 58.3776, lng: 26.7290, type: 'city' as const, description: '"Интеллектуальная столица" (100 тыс.) с одним из старейших университетов Северной Европы (1632), музеи, река Эмайыги, юг Эстонии, культурный центр' },
          { name: 'Пярну', lat: 58.3859, lng: 24.4971, type: 'resort' as const, description: '"Летняя столица" (40 тыс.) с песчаными пляжами, Балтийское море, курорты, спа, запад Эстонии, популярное место для отдыха' },
          { name: 'Национальный парк Лахемаа', lat: 59.5000, lng: 25.0000, type: 'attraction' as const, description: 'Леса, болота, рыбацкие деревни и старинные усадьбы, 725 км², север Эстонии, треккинг, природа, исторические места' },
          { name: 'Остров Сааремаа', lat: 58.5000, lng: 22.5000, type: 'attraction' as const, description: 'Крупнейший остров Эстонии (2673 км²) с епископским замком в Курессааре и кратером от метеорита Каали, Балтийское море, запад Эстонии' },
          { name: 'Замок Курессааре', lat: 58.2639, lng: 22.5031, type: 'attraction' as const, description: 'Епископский замок на острове Сааремаа, объект культурного наследия, XIV-XV века' }
        ];
      case 'finland':
        return [
          { name: 'Хельсинки', lat: 60.1699, lng: 24.9384, type: 'city' as const, description: 'Столица Финляндии (650 тыс.), расположена на берегу Финского залива, собор, крепость Суоменлинна - объект ЮНЕСКО, дизайн, сауны' },
          { name: 'Турку', lat: 60.4518, lng: 22.2666, type: 'city' as const, description: 'Старейший город Финляндии, культурная столица с средневековым собором' },
          { name: 'Туркуский собор', lat: 60.4518, lng: 22.2666, type: 'attraction' as const, description: 'Кафедральный собор Турку, объект культурного наследия, XIII-XV века, главный храм Финляндии' },
          { name: 'Тампере', lat: 61.4978, lng: 23.7610, type: 'city' as const, description: 'Город-узел между Хельсинки и Лапландией, центр технологий и культуры' },
          { name: 'Оулу', lat: 65.0121, lng: 25.4651, type: 'city' as const, description: 'Город в северной Финляндии, ворота в Лапландию, центр высоких технологий' },
          { name: 'Рованиеми', lat: 66.5000, lng: 25.7167, type: 'city' as const, description: 'Столица Лапландии, официальная Рождественская деревня Санта-Клауса' },
          { name: 'Суоми-нурмаа', lat: 61.0000, lng: 25.0000, type: 'attraction' as const, description: 'Национальный парк с живописными лесами, озерами и возможностью наблюдения за северным сиянием' },
          { name: 'Лахденпохья', lat: 61.0333, lng: 28.1667, type: 'attraction' as const, description: 'Природный парк с озерами, реками и скалами, популярное место для отдыха на природе' },
          { name: 'Наукокоски', lat: 61.7000, lng: 26.5667, type: 'resort' as const, description: 'Курортный регион с озерами, реками и лесами, идеальное место для рыбалки и отдыха на природе' },
          { name: 'Корпиярви', lat: 63.0000, lng: 29.0000, type: 'attraction' as const, description: 'Озеро и природный парк в Восточной Финляндии, место обитания диких кабанов и других животных' },
          { name: 'Ахвенанмаа (Аландские острова)', lat: 60.1756, lng: 19.9450, type: 'attraction' as const, description: 'Автономный архипелаг между Финляндией и Швецией, известен живописными деревнями и велосипедными маршрутами' }
        ];
      case 'fiji':
        return [
          { name: 'Сува', lat: -18.1416, lng: 178.4210, type: 'city' as const, description: 'Столица Фиджи (95 тыс.), крупнейший город на острове Вити-Леву, порт, Тихий океан, музеи, колониальная архитектура, юг острова' },
          { name: 'Нади', lat: -17.7500, lng: 177.4500, type: 'city' as const, description: 'Город на западном побережье Вити-Леву (50 тыс.), международный аэропорт, курорты, близость к островам Маманука, запад Фиджи, туризм' },
          { name: 'Группа островов Маманука', lat: -17.6667, lng: 177.0833, type: 'resort' as const, description: '20 тропических островов с белоснежными пляжами и мягкими кораллами, Тихий океан, дайвинг, снорклинг, близость к Нади, популярное место' },
          { name: 'Острова Ясава', lat: -17.0000, lng: 177.2000, type: 'resort' as const, description: '16 вулканических островов с роскошными курортами и голубыми лагунами, Тихий океан, дайвинг, северо-запад Фиджи, популярное место для отдыха' },
          { name: 'Великий белый барьер (Астролябия)', lat: -18.2500, lng: 178.4167, type: 'attraction' as const, description: '130-километровый коралловый риф, один из лучших дайв-сайтов мира' },
          { name: 'Рынок Сувы', lat: -18.1390, lng: 178.4210, type: 'attraction' as const, description: 'Крупнейший рынок Южного Тихого океана с тропическими фруктами и ремеслами' },
          { name: 'Парк Коло-и-Сува', lat: -18.1167, lng: 178.4000, type: 'attraction' as const, description: 'Тропический лес с природными бассейнами и водопадами' },
          { name: 'Музей Фиджи', lat: -18.1394, lng: 178.4242, type: 'attraction' as const, description: 'Национальный музей с экспозицией 3,700-летней истории' }
        ];
      case 'france':
      case 'frantsiya-gid':
        return [
          { name: 'Париж', lat: 48.8566, lng: 2.3522, type: 'city' as const, description: 'Столица Франции, Эйфелева башня, Лувр, Нотр-Дам' },
          { name: 'Эйфелева башня', lat: 48.8584, lng: 2.2945, type: 'attraction' as const, description: 'Символ Парижа и всей Франции, построена в 1889 году' },
          { name: 'Версаль', lat: 48.8049, lng: 2.1201, type: 'attraction' as const, description: 'Королевский дворец с великолепными садами и фонтанами' },
          { name: 'Лувр', lat: 48.8606, lng: 2.3376, type: 'attraction' as const, description: 'Крупнейший художественный музей мира, дом Моны Лизы' },
          { name: 'Мон-Сен-Мишель', lat: 48.6361, lng: -1.5114, type: 'attraction' as const, description: 'Средневековый монастырь на острове в заливе Сен-Мало' },
          { name: 'Каркассон', lat: 43.2128, lng: 2.3536, type: 'attraction' as const, description: 'Средневековая крепость, объект ЮНЕСКО, крупнейшая цитадель Европы' },
          { name: 'Авиньон', lat: 43.9493, lng: 4.8055, type: 'city' as const, description: 'Папский дворец XIV века, объект ЮНЕСКО, резиденция пап в средние века' },
          { name: 'Шартрский собор', lat: 48.4478, lng: 1.4878, type: 'attraction' as const, description: 'Готический собор XII-XIII веков, объект ЮНЕСКО, витражное искусство' },
          { name: 'Замок Шамбор', lat: 47.6167, lng: 1.5167, type: 'attraction' as const, description: 'Один из самых известных замков долины Луары' },
          { name: 'Лазурный берег', lat: 43.5528, lng: 7.0174, type: 'resort' as const, description: 'Популярный курорт с Средиземным морем, Ницца, Канны, Сен-Тропе' },
          { name: 'Прованс', lat: 43.8333, lng: 5.0000, type: 'attraction' as const, description: 'Регион с лавандовыми полями, виноградниками и средневековыми деревнями' }
        ];
      case 'gabon':
        return [
          { name: 'Либревиль', lat: 0.3924, lng: 9.4536, type: 'city' as const, description: 'Столица Габона (800 тыс.), порт на побережье Атлантического океана, пляжи, рынки, музеи, французская архитектура, ворота в национальные парки' },
          { name: 'Порт-Жантиль', lat: -0.8000, lng: 9.5000, type: 'city' as const, description: 'Второй по величине город Габона, важный порт на реке Огове' },
          { name: 'Франсвиль', lat: -1.6333, lng: 13.5833, type: 'city' as const, description: 'Третий по величине город, центр добычи урана' },
          { name: 'Национальный парк Лоанго', lat: -0.5000, lng: 9.0000, type: 'attraction' as const, description: 'Самый известный парк страны, где лесные слоны выходят на пляж' },
          { name: 'Национальный парк Ивиндо', lat: 0.5000, lng: 12.5000, type: 'attraction' as const, description: 'Объект Всемирного наследия ЮНЕСКО с водопадами Конго и Лангуэ' },
          { name: 'Национальный парк Лопе', lat: -0.2500, lng: 11.5000, type: 'attraction' as const, description: 'Объект Всемирного наследия ЮНЕСКО, где саванна встречается с тропическим лесом' },
          { name: 'Ламбарене', lat: -0.7000, lng: 10.2000, type: 'city' as const, description: 'Город с историческим наследием Альберта Швейцера' },
          { name: 'Ойем', lat: 1.6000, lng: 11.5833, type: 'city' as const, description: 'Город на севере страны, база для посещения парка Лопе' },
          { name: 'Пляж Батаро', lat: 0.3500, lng: 9.4000, type: 'resort' as const, description: 'Популярный городской пляж в Либревиле' },
          { name: 'Национальный парк Монт-Понга', lat: -1.2500, lng: 9.6667, type: 'attraction' as const, description: 'Парк на побережье с популяцией манатов и дельфинов' }
        ];
      case 'gambia':
        return [
          { name: 'Банжул', lat: 13.4432, lng: -16.5735, type: 'city' as const, description: 'Столица Гамбии (35 тыс.), расположена на острове Сент-Мэрис в устье реки Гамбия, арка 22, музеи, рынки, ворота в национальные парки' },
          { name: 'Сери Кундар', lat: 13.2833, lng: -16.6333, type: 'resort' as const, description: 'Прибрежный курорт на юге страны' },
          { name: 'Брикатор', lat: 13.2667, lng: -16.6500, type: 'city' as const, description: 'Исторический город на юге, центр торговли орехами кешью' },
          { name: 'Джаньянг', lat: 13.3333, lng: -16.6833, type: 'city' as const, description: 'Рыбацкий город на острове Тене' },
          { name: 'Керван', lat: 13.2333, lng: -16.6167, type: 'resort' as const, description: 'Прибрежный курорт между Кололи и Коту' },
          { name: 'Остров Кунта-Кинте', lat: 13.4500, lng: -16.5667, type: 'attraction' as const, description: 'Место высадки африканских рабов, мемориал жертвам работорговли' },
          { name: 'Каменные круги Сенегамбии', lat: 13.5000, lng: -16.0000, type: 'attraction' as const, description: 'Археологические памятники, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Заповедник обезьян Биджило', lat: 13.3500, lng: -16.6667, type: 'attraction' as const, description: 'Природный заповедник с павианами, патасами и зелеными обезьянами' },
          { name: 'Пляжи Кололи и Коту', lat: 13.2500, lng: -16.6333, type: 'resort' as const, description: 'Популярные пляжи с белым песком и спокойными волнами' },
          { name: 'Водопады Кута-Кинте', lat: 13.4000, lng: -16.5000, type: 'attraction' as const, description: 'Редкие водопады в стране с тропическим климатом' },
          { name: 'Дельта реки Гамбия', lat: 13.3000, lng: -16.4000, type: 'attraction' as const, description: 'Мангровые заросли, водные птицы, крокодилы и бегемоты' },
          { name: 'Форт Джеймс', lat: 13.4400, lng: -16.5800, type: 'attraction' as const, description: 'Британский форт XVII века, связанный с историей работорговли' },
          { name: 'Маяк Кап Скиттинг', lat: 13.4833, lng: -16.6167, type: 'attraction' as const, description: 'Один из старейших маяков Африки, построенный в 1845 году' },
          { name: 'Национальный музей Гамбии', lat: 13.4450, lng: -16.5800, type: 'attraction' as const, description: 'Музей с археологическими находками и этнографическими экспонатами' },
          { name: 'Арка 22', lat: 13.4417, lng: -16.5789, type: 'attraction' as const, description: 'Символ независимости Гамбии, построенный в 1995 году' }
        ];
      case 'georgia':
        return [
          { name: 'Тбилиси', lat: 41.7151, lng: 44.8271, type: 'city' as const, description: 'Столица Грузии, культурный и экономический центр страны' },
          { name: 'Батуми', lat: 41.6403, lng: 41.6332, type: 'city' as const, description: 'Курорт на Черном море, современная архитектура и пляжи' },
          { name: 'Кутаиси', lat: 42.2679, lng: 42.6945, type: 'city' as const, description: 'Древняя столица Грузии, монастырь Баграта и Гелати' },
          { name: 'Мцхета', lat: 41.8492, lng: 44.7192, type: 'city' as const, description: 'Старая столица, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Сванетия', lat: 43.0000, lng: 42.5000, type: 'attraction' as const, description: 'Горный регион со Сванскими башнями, объект ЮНЕСКО' },
          { name: 'Сванские башни', lat: 43.0000, lng: 42.5000, type: 'attraction' as const, description: 'Средневековые оборонительные башни, уникальная архитектура' },
          { name: 'Казбеги', lat: 42.6700, lng: 44.6300, type: 'attraction' as const, description: 'Горный регион с монастырем Гергети на фоне Казбека' },
          { name: 'Кахетия', lat: 41.7000, lng: 45.8000, type: 'region' as const, description: 'Винодельный регион с традиционными винодельнями и фестивалями' },
          { name: 'Водопады Прометея', lat: 42.4264, lng: 42.5556, type: 'attraction' as const, description: 'Высокие водопады в пещерах Прометея' },
          { name: 'Национальный парк Боржоми-Кахетия', lat: 41.8333, lng: 43.4167, type: 'attraction' as const, description: 'Природный парк с минеральными источниками и лесами' }
        ];
      case 'guinea':
        return [
          { name: 'Конакри', lat: 9.5370, lng: -13.6785, type: 'city' as const, description: 'Столица Гвинеи (1.7 млн), порт на Атлантическом океане, острова Лос, пляжи, рынки, музеи, ворота в горы Фута-Джаллон' },
          { name: 'Канкан', lat: 10.3908, lng: -9.3067, type: 'city' as const, description: 'Третий по величине город, исторический центр империи Мали' },
          { name: 'Лабе', lat: 11.3172, lng: -12.2834, type: 'city' as const, description: 'Административный центр горного плато Фута-Джаллон' },
          { name: 'Маму', lat: 11.3900, lng: -12.0900, type: 'city' as const, description: 'Культурная столица Фута-Джаллона' },
          { name: 'Горы Фута-Джаллон', lat: 11.0000, lng: -12.0000, type: 'attraction' as const, description: 'Горное плато, водонапорная башня Западной Африки, истоки реки Нигер, высота до 1538 м, центр Гвинеи, треккинг, природа' },
          { name: 'Острова Лос', lat: 9.5167, lng: -13.8833, type: 'attraction' as const, description: 'Архипелаг у побережья с пляжами и историческим музеем, Атлантический океан, близость к Конакри, дайвинг, запад Гвинеи' },
          { name: 'Водопады Шут-де-ла-Саала', lat: 11.0500, lng: -12.2000, type: 'attraction' as const, description: 'Высочайший водопад Западной Африки, 300 м высотой, горы Фута-Джаллон, центр Гвинеи, популярное место для фото, треккинг' },
          { name: 'Заповедник Маунт-Нимба', lat: 7.5500, lng: -8.4000, type: 'attraction' as const, description: 'Объект Всемирного наследия ЮНЕСКО с уникальной экосистемой, граница с Кот-д\'Ивуаром, эндемичные виды, юг Гвинеи, горы' },
          { name: 'Национальный парк Верхний Нигер', lat: 10.8000, lng: -10.8000, type: 'attraction' as const, description: 'Национальный парк с богатой фауной и истоками реки Нигер, саванна, слоны, антилопы, центр Гвинеи, экотуризм' },
          { name: 'Дуэка', lat: 8.5000, lng: -9.5000, type: 'attraction' as const, description: 'Родина джембе, музыкальная мекка Африки, традиционные барабаны, фестивали, центр Гвинеи, культурное значение' }
        ];
      case 'guyana':
        return [
          { name: 'Джорджтаун', lat: 6.8013, lng: -58.1551, type: 'city' as const, description: 'Столица Гайаны (200 тыс.), колониальная архитектура, порт, река Демерара, рынки, музеи, Атлантический океан, север Гайаны' },
          { name: 'Водопад Кайетур', lat: 5.1747, lng: -59.4789, type: 'attraction' as const, description: 'Один из самых мощных однокаскадных водопадов в мире (226 м), центр Гайаны, река Потаро, популярное место для фото, треккинг' },
          { name: 'Саванна Рупунуни', lat: 3.0000, lng: -59.5000, type: 'attraction' as const, description: 'Обширные луга на границе с Бразилией (15 000 км²), дом для гигантских муравьедов, ягуаров, юг Гайаны, экотуризм' },
          { name: 'Горы Кануку', lat: 2.5000, lng: -59.0000, type: 'attraction' as const, description: 'Биоразнообразие тропических лесов и горных саванн, эндемичные виды, юг Гайаны, граница с Бразилией, треккинг, природа' },
          { name: 'Река Эссекибо', lat: 5.0000, lng: -59.0000, type: 'attraction' as const, description: 'Крупнейшая река Гайаны (1014 км) с 365 островами, Атлантический океан, центр страны, судоходство, рыболовство' },
          { name: 'Линден', lat: 5.9833, lng: -58.3000, type: 'city' as const, description: 'Промышленный центр с алюминиевым заводом (30 тыс.), бокситы, река Демерара, центр Гайаны, горнодобывающая промышленность' },
          { name: 'Нью-Амстердам', lat: 6.2548, lng: -57.5043, type: 'city' as const, description: 'Исторический порт с голландским фортом (35 тыс.), XVIII век, колониальная архитектура, река Бербис, север Гайаны' },
          { name: 'Shell Beach', lat: 8.0000, lng: -59.7500, type: 'resort' as const, description: 'Заповедник морских черепах с 140 км пляжей, Атлантический океан, кожистые черепахи, северо-запад Гайаны, экотуризм' },
          { name: 'Гора Рорайма', lat: 5.1433, lng: -60.7629, type: 'attraction' as const, description: 'Тепуи высотой 2810 м, вдохновение для "Затерянного мира", граница с Венесуэлой и Бразилией, юг Гайаны, треккинг, уникальная флора' },
          { name: 'Iwokrama Canopy Walkway', lat: 4.6719, lng: -58.6846, type: 'attraction' as const, description: 'Подвесная тропа в кронах деревьев на высоте 30 м, тропический лес, центр Гайаны, наблюдение за птицами, экотуризм' }
        ];
      case 'germaniya-gid':
        return [
          { name: 'Берлин', lat: 52.5200, lng: 13.4050, type: 'city' as const, description: 'Столица Германии (3.7 млн), культурный и политический центр, Бранденбургские ворота, Рейхстаг, музеи, река Шпрее, восток Германии' },
          { name: 'Мюнхен', lat: 48.1351, lng: 11.5820, type: 'city' as const, description: 'Столица Баварии (1.5 млн), Октоберфест, Национальный музей, Мариенплац, пивные, Альпы, юг Германии, культурный центр' },
          { name: 'Франкфурт-на-Майне', lat: 50.1109, lng: 8.6821, type: 'city' as const, description: 'Финансовый центр Германии (760 тыс.), небоскребы, Рёмер, международный аэропорт, река Майн, центр Германии, деловой центр' },
          { name: 'Гамбург', lat: 53.5511, lng: 9.9937, type: 'city' as const, description: 'Город-порт на реке Эльба (1.9 млн), Ратуша, Революционный театр, порт, каналы, север Германии, второй по величине город' },
          { name: 'Кёльн', lat: 50.9375, lng: 6.9603, type: 'city' as const, description: 'Город с готическим собором (1.1 млн), Римско-Германский музей, река Рейн, карнавал, запад Германии, четвертый по величине город' },
          { name: 'Замок Нойшванштайн', lat: 47.5576, lng: 10.7498, type: 'attraction' as const, description: 'Сказочный замок Людвига II, вдохновение для Замка Спящей красавицы' },
          { name: 'Рейхстаг', lat: 52.5186, lng: 13.3761, type: 'attraction' as const, description: 'Здание парламента Германии, стеклянный купол, историческое значение' },
          { name: 'Замок Вартбург', lat: 50.9667, lng: 10.3000, type: 'attraction' as const, description: 'Средневековый замок, объект ЮНЕСКО, место перевода Библии Лютером' },
          { name: 'Рейнская долина', lat: 50.3333, lng: 7.5000, type: 'attraction' as const, description: 'Живописная долина с замками, виноградниками и панорамами' },
          { name: 'Берлинская стена', lat: 52.5353, lng: 13.3920, type: 'attraction' as const, description: 'Исторический памятник, символ разделения и воссоединения Германии' },
          { name: 'Баварский лес', lat: 49.0000, lng: 13.0000, type: 'attraction' as const, description: 'Национальный парк с живописными пейзажами и биоразнообразием' },
          { name: 'Остров Рюген', lat: 54.4500, lng: 13.4000, type: 'resort' as const, description: 'Курортный остров в Балтийском море с белыми скалами' }
        ];
      case 'gretsiya-gid':
        return [
          { name: 'Афины', lat: 37.9838, lng: 23.7275, type: 'city' as const, description: 'Столица Греции, античные памятники, Акрополь' },
          { name: 'Микены', lat: 37.7308, lng: 22.7569, type: 'attraction' as const, description: 'Древний город бронзового века, объект ЮНЕСКО, Львиные ворота, гробницы' },
          { name: 'Эпидавр', lat: 37.5967, lng: 23.0794, type: 'attraction' as const, description: 'Древний театр IV века до н.э., объект ЮНЕСКО, храм Асклепия, акустика' },
          { name: 'Олимпия', lat: 37.6381, lng: 21.6297, type: 'attraction' as const, description: 'Место первых Олимпийских игр, объект ЮНЕСКО, храм Зевса, археологический музей' },
          { name: 'Санторини', lat: 36.3932, lng: 25.4615, type: 'resort' as const, description: 'Вулканический остров с белыми домиками и закатами' },
          { name: 'Миконос', lat: 37.4467, lng: 25.3289, type: 'resort' as const, description: 'Популярный остров с ветряными мельницами и ночной жизнью' },
          { name: 'Крит', lat: 35.2401, lng: 24.8093, type: 'attraction' as const, description: 'Крупнейший греческий остров, дворец Кносса, пляжи' },
          { name: 'Родос', lat: 36.4467, lng: 28.2278, type: 'attraction' as const, description: 'Остров с Средневековым городом и пляжами' },
          { name: 'Корфу', lat: 39.6243, lng: 19.9217, type: 'attraction' as const, description: 'Зеленый остров с венецианской архитектурой' },
          { name: 'Метеоры', lat: 39.7158, lng: 21.6306, type: 'attraction' as const, description: 'Монастыри на скалах, уникальный ландшафт' },
          { name: 'Дельфы', lat: 38.4824, lng: 22.5016, type: 'attraction' as const, description: 'Античный город, храм Аполлона, оракул' },
          { name: 'Закинф', lat: 37.8599, lng: 20.6238, type: 'attraction' as const, description: 'Остров с пляжем Навагио и синими пещерами' },
          { name: 'Олимп', lat: 40.0775, lng: 22.6170, type: 'attraction' as const, description: 'Гора богов, тропы, виды на Эгейское море' }
        ];
      case 'guatemala':
        return [
          { name: 'Гватемала-Сити', lat: 14.6347, lng: -90.5078, type: 'city' as const, description: 'Столица Гватемалы (2.9 млн), расположена в долине у подножия вулканов, Национальный дворец, собор, музеи, ворота в Антигуа и Тикаль' },
          { name: 'Антигуа-Гватемала', lat: 14.5616, lng: -90.7356, type: 'city' as const, description: 'Колониальный город ЮНЕСКО, центр изучения испанского языка' },
          { name: 'Тикаль', lat: 16.9167, lng: -89.6167, type: 'attraction' as const, description: 'Древний город майя в джунглях, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Озеро Атитлан', lat: 14.6937, lng: -91.1333, type: 'attraction' as const, description: 'Красивейшее озеро в кратере вулкана, окружено тремя вулканами' },
          { name: 'Вулкан Пакайя', lat: 14.3850, lng: -90.8725, type: 'attraction' as const, description: 'Активный вулкан, популярное место для восхождений' },
          { name: 'Чичикастенанго', lat: 14.9333, lng: -91.1167, type: 'city' as const, description: 'Город с крупнейшим рынком майя в Центральной Америке' },
          { name: 'Семук-Чампей', lat: 15.3833, lng: -90.0333, type: 'attraction' as const, description: 'Природный каскад бирюзовых бассейнов над подземной рекой' },
          { name: 'Флорес', lat: 16.9250, lng: -89.8917, type: 'city' as const, description: 'Островной город, ворота в национальный парк Тикаль' },
          { name: 'Панахачел', lat: 14.7333, lng: -91.1500, type: 'city' as const, description: 'Популярная туристическая деревня на озере Атитлан' },
          { name: 'Сан-Педро-Ла-Лагуна', lat: 14.7500, lng: -91.1667, type: 'city' as const, description: 'Деревня на озере Атитлан с йога-центрами и хостелами' }
        ];
      case 'guinea-bissau':
        return [
          { name: 'Бисау', lat: 11.8833, lng: -15.6167, type: 'city' as const, description: 'Столица Гвинеи-Бисау (500 тыс.), порт на острове в устье реки Геба, форт, рынки, португальская архитектура, ворота на острова Бижагош' },
          { name: 'Архипелаг Бижагош', lat: 11.3000, lng: -15.8000, type: 'attraction' as const, description: 'Биосферный заповедник ЮНЕСКО, уникальная культура народа бижагош' },
          { name: 'Национальный парк Оранго', lat: 11.3833, lng: -16.2500, type: 'attraction' as const, description: 'Дом бегемотов в соленой воде, морские черепахи на пляжах' },
          { name: 'Бафата', lat: 12.1667, lng: -14.6667, type: 'city' as const, description: 'Исторический город в глубине страны, центр торговли и ремесел' },
          { name: 'Остров Бубак', lat: 11.2833, lng: -15.8167, type: 'attraction' as const, description: 'Главный остров народа бижагош, матриархальное общество' },
          { name: 'Национальный парк Кантанжес', lat: 12.4000, lng: -14.9000, type: 'attraction' as const, description: 'Тропические леса, шимпанзе, водопады' },
          { name: 'Бисау Велью', lat: 11.8833, lng: -15.6000, type: 'attraction' as const, description: 'Колониальный центр столицы с португальской архитектурой' },
          { name: 'Рынок Маркет', lat: 11.8833, lng: -15.6167, type: 'attraction' as const, description: 'Культурный центр Бисау, яркие краски и ароматы специй' },
          { name: 'Остров Болама', lat: 11.5833, lng: -15.4833, type: 'attraction' as const, description: 'Бывшая столица колонии, заброшенная колониальная архитектура' },
          { name: 'Пляж Праия-Гранде', lat: 11.7000, lng: -15.7500, type: 'resort' as const, description: 'Нетронутый пляж недалеко от Бисау, чистая вода и природа' }
        ];
      case 'grenada':
        return [
          { name: 'Сент-Джорджес', lat: 12.0572, lng: -61.7614, type: 'city' as const, description: 'Столица Гренады (40 тыс.), порт на Карибском море, колониальная архитектура, форт Джордж, собор, рынки специй, пляжи' },
          { name: 'Гранд-Анс', lat: 12.0470, lng: -61.7610, type: 'resort' as const, description: 'Популярный курортный район с знаменитым пляжем' },
          { name: 'Пляж Гранд-Анс', lat: 12.0470, lng: -61.7610, type: 'beach' as const, description: 'Один из лучших пляжей Карибского бассейна с белым песком' },
          { name: 'Подводный парк скульптур', lat: 12.0400, lng: -61.7700, type: 'attraction' as const, description: 'Первый в мире подводный парк скульптур' },
          { name: 'Национальный парк Гранд-Этан', lat: 12.1500, lng: -61.7000, type: 'attraction' as const, description: 'Тропический лес с кратерным озером и водопадами' },
          { name: 'Шоколадная фабрика Grenada Chocolate Company', lat: 12.0800, lng: -61.7800, type: 'attraction' as const, description: 'Производство органического шоколада из какао бобов острова' },
          { name: 'Дистиллерия River Antoine Rum', lat: 12.0600, lng: -61.7500, type: 'attraction' as const, description: 'Самая старая в Карибском бассейне, производство рома по традиционным технологиям' },
          { name: 'Ботанический сад Лоуэр-Принсес', lat: 12.0500, lng: -61.7700, type: 'attraction' as const, description: 'Старейший ботанический сад в Восточных Карбах' },
          { name: 'Пляж Морне-Руа', lat: 12.0300, lng: -61.7000, type: 'beach' as const, description: 'Дикий пляж с черным вулканическим песком' },
          { name: 'Плантации специй', lat: 12.1000, lng: -61.7200, type: 'attraction' as const, description: 'Плантации мускатного ореха, корицы, гвоздики и имбиря' }
        ];
      case 'haiti':
        return [
          { name: 'Порт-о-Пренс', lat: 18.5333, lng: -72.3333, type: 'city' as const, description: 'Столица Гаити (1.2 млн), порт на Карибском море, цитадель Лаферьер - объект ЮНЕСКО, музеи, рынки, креольская культура' },
          { name: 'Жакмель', lat: 18.2333, lng: -72.5333, type: 'city' as const, description: 'Город на южном побережье с колониальной архитектурой' },
          { name: 'Цитадель Лаферьер', lat: 19.5667, lng: -72.2667, type: 'attraction' as const, description: 'Историческая крепость XIX века, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Бассен-Блё', lat: 18.3000, lng: -72.2000, type: 'attraction' as const, description: 'Серия из трех живописных водопадов с бирюзовыми бассейнами' },
          { name: 'Кап-Анжер', lat: 19.7500, lng: -72.2000, type: 'city' as const, description: 'Прибрежный город на севере, важный порт' },
          { name: 'Лес-Кайес', lat: 18.2833, lng: -73.7500, type: 'city' as const, description: 'Прибрежный город на юго-западе, центр религии вуду' },
          { name: 'Форт-Либерте', lat: 19.6667, lng: -71.8333, type: 'city' as const, description: 'Восточный портовый город, первый город на острове' },
          { name: 'Дворец Сан-Суси', lat: 19.5500, lng: -72.2500, type: 'attraction' as const, description: 'Руины дворца короля Анри Кристофа XIX века' },
          { name: 'Горы Логон', lat: 19.9333, lng: -71.8000, type: 'attraction' as const, description: 'Высшая точка страны (2680 м над уровнем моря)' },
          { name: 'Побережье Кот-дез-Аркаден', lat: 19.7500, lng: -72.2000, type: 'attraction' as const, description: 'Живописные пляжи с белым песком и кристально чистой водой' }
        ];
      case 'honduras':
        return [
          { name: 'Тегусигальпа', lat: 14.0818, lng: -87.2068, type: 'city' as const, description: 'Столица Гондураса (1.3 млн), расположена в долине на высоте 1000 м, собор, музеи, рынки, ворота в Копан и на Карибское побережье' },
          { name: 'Сан-Педро-Суле', lat: 15.5042, lng: -87.9985, type: 'city' as const, description: 'Второй по величине город, промышленный центр' },
          { name: 'Копан', lat: 14.9375, lng: -89.1608, type: 'attraction' as const, description: 'Археологический комплекс майя, объект ЮНЕСКО' },
          { name: 'Роатан', lat: 16.3263, lng: -86.5314, type: 'resort' as const, description: 'Крупнейший остров архипелага Бей-Айлендс, курорт' },
          { name: 'Ла-Сейба', lat: 15.7633, lng: -86.7817, type: 'city' as const, description: 'Город на Карибском побережье, ворота в тропики' },
          { name: 'Биосферный заповедник Рио-Платано', lat: 15.5000, lng: -84.5000, type: 'attraction' as const, description: 'Тропический лес, объект ЮНЕСКО' },
          { name: 'Озеро Йохоа', lat: 15.5000, lng: -87.0000, type: 'attraction' as const, description: 'Крупнейшее озеро страны' },
          { name: 'Утила', lat: 16.1024, lng: -86.9491, type: 'resort' as const, description: 'Остров, центр дайвинг-туризма' },
          { name: 'Гуанаха', lat: 16.3500, lng: -85.9000, type: 'resort' as const, description: 'Остров с нетронутой природой' },
          { name: 'Трухильо', lat: 15.9167, lng: -85.9500, type: 'city' as const, description: 'Исторический город на Карибском побережье' }
        ];
      case 'hong-kong':
        return [
          { name: 'Виктория', lat: 22.2844, lng: 114.1525, type: 'city' as const, description: 'Деловой и финансовый центр Гонконга на острове Гонконг' },
          { name: 'Пик Виктория', lat: 22.2711, lng: 114.1441, type: 'attraction' as const, description: 'Панорамный вид на мегаполис, высшая точка острова Гонконг (552 м)' },
          { name: 'Большой Будда', lat: 22.2539, lng: 113.9036, type: 'attraction' as const, description: 'Бронзовая статуя Будды на острове Лантау, крупнейшая в мире' },
          { name: 'Квилон', lat: 22.3056, lng: 114.1714, type: 'city' as const, description: 'Культурный и исторический центр на полуострове' },
          { name: 'Монгкок', lat: 22.3276, lng: 114.1625, type: 'attraction' as const, description: 'Густонаселенный район с рынками и уличной культурой' },
          { name: 'Яуматэй', lat: 22.2975, lng: 114.1728, type: 'attraction' as const, description: 'Традиционный китайский район с рынками и храмами' },
          { name: 'Тайлинь', lat: 22.3028, lng: 114.1733, type: 'attraction' as const, description: 'Исторический район с храмами и традиционной архитектурой' },
          { name: 'Остров Лантау', lat: 22.2500, lng: 113.9333, type: 'attraction' as const, description: 'Крупнейший остров Гонконга с монастырем По Лин' },
          { name: 'Монастырь По Лин', lat: 22.2539, lng: 113.9036, type: 'attraction' as const, description: 'Буддийский монастырь с Большим Буддой' },
          { name: 'Центральный район', lat: 22.2844, lng: 114.1567, type: 'attraction' as const, description: 'Финансовый район с небоскребами и Симфонией огней' }
        ];
      case 'ghana':
        return [
          { name: 'Аккра', lat: 5.5556, lng: -0.1961, type: 'city' as const, description: 'Столица Ганы, крупнейший город страны' },
          { name: 'Кумаси', lat: 6.6833, lng: -1.6167, type: 'city' as const, description: 'Второй по величине город, культурная столица народа ашанти' },
          { name: 'Кейп-Кост', lat: 5.1000, lng: -1.2500, type: 'city' as const, description: 'Исторический город с фортами работорговцев, объект ЮНЕСКО' },
          { name: 'Такоради', lat: 4.8833, lng: -1.7500, type: 'city' as const, description: 'Портовый город на побережье Атлантического океана' },
          { name: 'Форт Кейп-Кост', lat: 5.1083, lng: -1.2500, type: 'attraction' as const, description: 'Форт эпохи работорговли, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Национальный парк Какум', lat: 6.1833, lng: -1.5000, type: 'attraction' as const, description: 'Национальный парк с подвесным мостом над тропическим лесом' },
          { name: 'Национальный парк Моле', lat: 9.5000, lng: -2.2500, type: 'attraction' as const, description: 'Крупнейший национальный парк страны с сафари и слонами' },
          { name: 'Озеро Волта', lat: 6.0000, lng: -0.5000, type: 'attraction' as const, description: 'Крупнейшее искусственное озеро в мире' },
          { name: 'Кас', lat: 10.9000, lng: -1.1333, type: 'resort' as const, description: 'Курортный город на севере страны с богатой историей' },
          { name: 'Эльмине', lat: 5.0833, lng: -1.3500, type: 'attraction' as const, description: 'Город с фортами работорговцев, объект ЮНЕСКО' }
        ];
      case 'iceland':
        return [
          { name: 'Рейкьявик', lat: 64.1466, lng: -21.9426, type: 'city' as const, description: 'Столица Исландии, культурный и экономический центр страны' },
          { name: 'Голубая лагуна', lat: 63.8839, lng: -22.4450, type: 'attraction' as const, description: 'Термальный SPA-комплекс в лавовой зоне, самый известный геотермальный источник' },
          { name: 'Национальный парк Тингвеллир', lat: 64.0933, lng: -21.0428, type: 'attraction' as const, description: 'Объект ЮНЕСКО, место основания Альтинга - старейшего парламента мира' },
          { name: 'Гейзеры Хёйкадалюра', lat: 64.3133, lng: -21.2008, type: 'attraction' as const, description: 'Гидротермальное поле с активным гейзером Строккур, прорывается каждые 5-10 минут' },
          { name: 'Водопад Гюдльфосс', lat: 64.2808, lng: -20.1303, type: 'attraction' as const, description: '"Золотой водопад", один из самых мощных водопадов Исландии, двойной каскад' },
          { name: 'Черный пляж Рейнисфьяра', lat: 63.3933, lng: -20.0142, type: 'attraction' as const, description: 'Вулканический пляж с базальтовыми колоннами и мощными прибоями' },
          { name: 'Ледниковая лагуна Йёкюльсаурлоун', lat: 64.0433, lng: -16.2031, type: 'attraction' as const, description: 'Крупнейшая ледниковая лагуна в Исландии, ледяные айсберги' },
          { name: 'Озеро Миватн', lat: 65.5942, lng: -16.9397, type: 'attraction' as const, description: 'Вулканическое озеро на севере Исландии, "северная жемчужина"' },
          { name: 'Акюрейри', lat: 65.6835, lng: -18.0878, type: 'city' as const, description: '"Столица" Северной Исландии, культурный центр с интересной архитектурой' },
          { name: 'Водопад Сельяландсфосс', lat: 63.6331, lng: -19.9900, type: 'attraction' as const, description: 'Водопад высотой 60 метров, за который можно пройти' },
          { name: 'Церковь Халлгримскиркья', lat: 64.1419, lng: -21.9236, type: 'attraction' as const, description: 'Архитектурный шедевр в форме базальтовых колонн, самое высокое здание в Исландии' },
          { name: 'Водопад Скоугафосс', lat: 63.5667, lng: -19.4333, type: 'attraction' as const, description: 'Мощный водопад высотой 60 метров, часто появляется радуга в солнечную погоду' },
          { name: 'Ледяные пещеры Ватнайёкюдль', lat: 64.0000, lng: -16.2000, type: 'attraction' as const, description: '"Ледяной собор" - естественные туннели в леднике, доступны только зимой' },
          { name: 'Водопад Деттифосс', lat: 65.9833, lng: -16.5000, type: 'attraction' as const, description: 'Самый мощный водопад в Европе, до 500 куб. метров воды в секунду' },
          { name: 'Ледник Ватнайёкюдль', lat: 64.0000, lng: -16.5000, type: 'attraction' as const, description: 'Крупнейший ледник в Европе (8,100 кв. км), походы на леднике и снегоходные туры' }
        ];
      case 'indiya-gid':
        return [
          { name: 'Нью-Дели', lat: 28.6139, lng: 77.2090, type: 'city' as const, description: 'Столица Индии, культурный и политический центр страны' },
          { name: 'Мумбаи', lat: 19.0760, lng: 72.8777, type: 'city' as const, description: 'Финансовая столица Индии, город мечты с Болливудом' },
          { name: 'Тадж-Махал, Агра', lat: 27.1751, lng: 78.0421, type: 'attraction' as const, description: 'Мавзолей Шах-Джахана, символ вечной любви, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Красный форт, Дели', lat: 28.6562, lng: 77.2410, type: 'attraction' as const, description: 'Дворец Великих Моголов XVII века, объект ЮНЕСКО, резиденция императоров' },
          { name: 'Пещеры Аджанты', lat: 20.5522, lng: 75.7003, type: 'attraction' as const, description: 'Буддийские пещерные храмы II века до н.э., объект ЮНЕСКО, фрески' },
          { name: 'Пещеры Эллоры', lat: 20.0264, lng: 75.1792, type: 'attraction' as const, description: '34 пещерных храма (600-1000 н.э.), объект ЮНЕСКО, индуистские, буддийские, джайнские храмы' },
          { name: 'Гоа', lat: 15.2993, lng: 74.1240, type: 'resort' as const, description: 'Пляжная столица Индии с португальской архитектурой' },
          { name: 'Керала', lat: 10.8505, lng: 76.2711, type: 'attraction' as const, description: 'Штат с бэкватерами, кокосовыми рощами и аюрведой' },
          { name: 'Раджастхан', lat: 27.0238, lng: 74.2179, type: 'attraction' as const, description: 'Земля махараджей с дворцами и пустыней Тар' },
          { name: 'Варанаси', lat: 25.3176, lng: 82.9739, type: 'city' as const, description: 'Древнейший город мира, духовная столица на реке Ганг' },
          { name: 'Хампи', lat: 15.3350, lng: 76.4600, type: 'attraction' as const, description: 'Руины империи Виджаянагар, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Ришикеш', lat: 30.0869, lng: 78.2676, type: 'attraction' as const, description: 'Мировая столица йоги с ашрамами и подвесным мостом' },
          { name: 'Дарджилинг', lat: 27.0360, lng: 88.2627, type: 'attraction' as const, description: 'Чайная столица Индии с видом на Канченджангу' },
          { name: 'Ладакх', lat: 34.1526, lng: 77.5771, type: 'attraction' as const, description: 'Малый Тибет с буддийскими монастырями и высокогорными озерами' },
          { name: 'Бангалор', lat: 12.9716, lng: 77.5946, type: 'city' as const, description: 'Технологическая столица Индии, город IT-индустрии' }
        ];
      case 'indoneziya-gid':
        return [
          { name: 'Джакарта', lat: -6.2088, lng: 106.8456, type: 'city' as const, description: 'Столица Индонезии (10 млн), мегаполис на острове Ява, Старый город, мечеть Истикляль, национальный монумент, музеи' },
          { name: 'Бали', lat: -8.3405, lng: 115.0920, type: 'resort' as const, description: 'Туристическая жемчужина Индонезии с пляжами и храмами' },
          { name: 'Ява', lat: -7.6079, lng: 110.2038, type: 'attraction' as const, description: 'Самый населенный остров с храмом Боробудур' },
          { name: 'Боробудур', lat: -7.6080, lng: 110.2040, type: 'attraction' as const, description: 'Крупнейший буддийский храм, объект ЮНЕСКО, IX век, 504 статуи Будды, ступы' },
          { name: 'Прамбанан', lat: -7.7520, lng: 110.4915, type: 'attraction' as const, description: 'Индуистский храмовый комплекс, объект ЮНЕСКО, IX век, три главных храма' },
          { name: 'Комодо', lat: -8.5500, lng: 119.4500, type: 'attraction' as const, description: 'Национальный парк с комодскими драконами, объект ЮНЕСКО' },
          { name: 'Суматра', lat: 0.3750, lng: 101.8000, type: 'attraction' as const, description: 'Шестой по величине остров мира с тропическими лесами' },
          { name: 'Сулавеси', lat: -2.6700, lng: 119.6000, type: 'attraction' as const, description: 'Остров с уникальной подводной фауной и традиционными деревнями' },
          { name: 'Калимантан', lat: -0.3750, lng: 113.5000, type: 'attraction' as const, description: 'Индонезийская часть острова Борнео с орангутангами' },
          { name: 'Ломбок', lat: -8.6500, lng: 116.3000, type: 'resort' as const, description: 'Остров-альтернатива Бали с вулканом Ринани' },
          { name: 'Флорес', lat: -8.5000, lng: 121.7500, type: 'attraction' as const, description: 'Остров с национальным парком Комодо и деревней Буленг' },
          { name: 'Суракарта', lat: -7.5500, lng: 110.8167, type: 'city' as const, description: 'Город с королевским дворцом и традиционными танцами' },
          { name: 'Медан', lat: 3.5833, lng: 98.6667, type: 'city' as const, description: 'Третий по величине город Индонезии на острове Суматра' },
          { name: 'Бандунг', lat: -6.9175, lng: 107.6191, type: 'city' as const, description: 'Город на Яве, известный своими холмами и университетами' }
        ];
      case 'niger':
        return [
          { name: 'Ниамей', lat: 13.5137, lng: 2.1098, type: 'city' as const, description: 'Столица Нигера (1.3 млн), расположена на реке Нигер, Большая мечеть, Национальный музей, рынки, ворота в пустыню Тенере и Аир' },
          { name: 'Зиндер', lat: 13.8072, lng: 10.2954, type: 'city' as const, description: 'Второй по величине город Нигера (320 тыс.), историческая столица, султанат, мечеть, старый город, юг Нигера, торговый центр' },
          { name: 'Марди', lat: 13.5000, lng: 7.0833, type: 'city' as const, description: 'Город в центре страны (250 тыс.), важный торговый центр, рынки, сельскохозяйственный регион, близость к Ниамею' },
          { name: 'Агадес', lat: 16.9667, lng: 7.9833, type: 'city' as const, description: 'Город в пустыне Сахара (120 тыс.), известен своими традиционными ремеслами, мечеть XVI века, центр туарегов, север Нигера, караванные пути' },
          { name: 'Тахуа', lat: 14.9167, lng: 5.2667, type: 'city' as const, description: 'Город в северной части страны (100 тыс.), центр солевой торговли, рынки, традиционная архитектура, пустыня, караваны' },
          { name: 'Пустыня Сахара', lat: 20.0000, lng: 10.0000, type: 'attraction' as const, description: 'Крупнейшая пустыня мира, занимающая большую часть территории Нигера, дюны, оазисы, караванные пути, экстремальный климат' },
          { name: 'Национальный парк Водорослевого моря', lat: 16.0000, lng: 5.0000, type: 'attraction' as const, description: 'Национальный парк с богатой фауной, включая антилоп, слонов и хищников, саванна, объект ЮНЕСКО, запад Нигера' },
          { name: 'Долина Айру', lat: 18.0000, lng: 8.0000, type: 'attraction' as const, description: 'Горная долина с живописными пейзажами и традиционными фортами, туареги, наскальные рисунки, север Нигера, пустыня' },
          { name: 'Скалы Тегиди', lat: 14.0000, lng: 3.0000, type: 'attraction' as const, description: 'Гранитные скалы с наскальными рисунками и петроглифами, древнее искусство, объект ЮНЕСКО, запад Нигера, археология' },
          { name: 'Озеро Чад', lat: 13.0000, lng: 14.0000, type: 'attraction' as const, description: 'Крупное озеро на границе с Чадом, важный водный ресурс региона, рыболовство, водоплавающие птицы, юго-восток Нигера, сокращается' }
        ];
      case 'norway': // Changed from 'norway-gid'
        return [
          { name: 'Осло', lat: 59.9139, lng: 10.7522, type: 'city' as const, description: 'Столица Норвегии (700 тыс.), культурный и экономический центр страны, фьорд, музеи, парк Вигеланда, оперный театр, столичный регион' },
          { name: 'Берген', lat: 60.3913, lng: 5.3221, type: 'city' as const, description: 'Город фьордов (280 тыс.), старый город Брюгген - объект ЮНЕСКО, дожди, горы, ворота к фьордам, запад Норвегии, рыбный рынок' },
          { name: 'Брюгген', lat: 60.3958, lng: 5.3250, type: 'attraction' as const, description: 'Средневековая набережная, объект ЮНЕСКО, ганзейские склады, XIII-XVIII века, Берген, цветные деревянные дома, музей' },
          { name: 'Лофотенские острова', lat: 68.1475, lng: 14.5403, type: 'attraction' as const, description: 'Архипелаг за Полярным кругом с драматическими пейзажами, рыбацкие деревни, северное сияние, треккинг, север Норвегии' },
          { name: 'Тромсё', lat: 69.6492, lng: 18.9553, type: 'city' as const, description: 'Столица Арктики (75 тыс.), лучшее место для наблюдения северного сияния, полярная ночь, Арктический собор, университет, север' },
          { name: 'Ставангер', lat: 58.9690, lng: 5.7331, type: 'city' as const, description: 'Город фьордов (130 тыс.), ворота к Прекрасным фьордам, нефтяная столица, музей нефти, юго-запад Норвегии, порт' },
          { name: 'Фьорды', lat: 62.0, lng: 7.0, type: 'attraction' as const, description: 'Гейрангер-фьорд и Нэрёй-фьорд - объекты ЮНЕСКО, водопады, горы, круизы, запад Норвегии, ледниковые долины' },
          { name: 'Кафедра проповедника', lat: 59.0, lng: 6.0, type: 'attraction' as const, description: 'Знаменитый скальный выступ над Люсе-фьордом (604 м), популярное место для фото, треккинг 4 часа, юго-запад Норвегии' },
          { name: 'Язык Тролля', lat: 60.0, lng: 7.0, type: 'attraction' as const, description: 'Популярный скальный выступ (1100 м), одна из главных достопримечательностей, треккинг 10-12 часов, запад Норвегии, горы' },
          { name: 'Парк скульптур Вигеланда', lat: 59.9139, lng: 10.7522, type: 'attraction' as const, description: 'Уникальный парк в Осло с 212 скульптурами, работа Густава Вигеланда, бесплатный вход, популярное место, центр Осло' },
          { name: 'Атлантическая дорога', lat: 63.0, lng: 8.0, type: 'attraction' as const, description: 'Живописная дорога через острова (8.3 км), одна из самых крутых дорог мира, мосты, океан, запад Норвегии, популярное место для фото' }
        ];
      case 'nigeria':
        return [
          { name: 'Лагос', lat: 6.5244, lng: 3.3792, type: 'city' as const, description: 'Крупнейший город Африки (15 млн), экономическая столица, центр Нолливуда и афробита, порт, пляжи, ночная жизнь, рынки' },
          { name: 'Абуджа', lat: 9.0765, lng: 7.3986, type: 'city' as const, description: 'Современная столица Нигерии (3.6 млн), безопаснее Лагоса, современная архитектура, планируемый город, мечеть, собор' },
          { name: 'Кано', lat: 12.0022, lng: 8.5920, type: 'city' as const, description: 'Древний торговый центр (4.1 млн), 1000-летняя история, центр транссахарской торговли, стены Кано, мечети, базары, север Нигерии' },
          { name: 'Калабар', lat: 4.9517, lng: 8.3220, type: 'city' as const, description: 'Культурная столица Нигерии (470 тыс.), знаменитый декабрьский карнавал, музей, порт, тропический климат, юго-восток' },
          { name: 'Ибадан', lat: 7.3775, lng: 3.9470, type: 'city' as const, description: 'Третий по величине город (3.6 млн), центр образования, Университет Ибадана, исторический центр, рынки, юго-запад' },
          { name: 'Священная роща Осун-Осогбо', lat: 7.7667, lng: 4.5500, type: 'attraction' as const, description: 'Последний остаток древнего леса йоруба, святилища богини плодородия Осун, объект ЮНЕСКО, скульптуры, ежегодный фестиваль' },
          { name: 'Национальный парк Кросс-Ривер', lat: 6.2000, lng: 9.0000, type: 'attraction' as const, description: 'Старейший заповедник Нигерии, тропические леса, редкие приматы, гориллы, шимпанзе, эндемичные виды, юго-восток' },
          { name: 'Бенин-Сити', lat: 6.3350, lng: 5.6037, type: 'city' as const, description: 'Древняя столица империи Бенин (1.5 млн), знаменитые бронзовые изделия, музей, королевский дворец, XV-XIX века, юг Нигерии' },
          { name: 'Порт-Харкорт', lat: 4.8156, lng: 7.0498, type: 'city' as const, description: 'Центр нефтяной промышленности (1.9 млн), речной порт в дельте Нигера, университеты, рынки, близость к пляжам' },
          { name: 'Мукунгунгу', lat: 4.7561, lng: 5.2422, type: 'resort' as const, description: 'Пляжи на скалах, тропические леса, уникальная геология, популярное место для фото, юг Нигерии, дельта Нигера' }
        ];
      case 'iran':
        return [
          { name: 'Тегеран', lat: 35.6892, lng: 51.3890, type: 'city' as const, description: 'Столица Ирана (9 млн), расположена у подножия горы Точал, дворцы Голестан и Саадабад, башня Азади, базары, музеи' },
          { name: 'Исфахан', lat: 32.6546, lng: 51.6679, type: 'city' as const, description: 'Город с великолепной архитектурой (2.2 млн), "Половина мира", площадь Имама, мосты, мечети, базары, центр Персии, XVI-XVII века' },
          { name: 'Площадь Имама', lat: 32.6546, lng: 51.6679, type: 'attraction' as const, description: 'Площадь Нахш-е Джахан, объект ЮНЕСКО, мечети, дворец Али-Капу, XVII век, 512 м × 163 м, символ Исфахана' },
          { name: 'Шираз', lat: 29.5918, lng: 52.5837, type: 'city' as const, description: 'Город поэтов, цветов и садов (1.9 млн), ворота в Персеполь, мавзолеи Хафиза и Саади, сады Эрам, центр персидской культуры' },
          { name: 'Мешхед', lat: 36.2988, lng: 59.6057, type: 'city' as const, description: 'Священный город с мавзолеем Имама Резы (3.3 млн), главное место паломничества шиитов, золотой купол, базары, северо-восток Ирана' },
          { name: 'Язд', lat: 31.8972, lng: 54.3675, type: 'city' as const, description: 'Древний город в пустыне (1.3 млн), объект ЮНЕСКО, бадгиры, зороастрийские храмы, мечети, центр пустыни, уникальная архитектура' },
          { name: 'Кашан', lat: 33.9850, lng: 51.4094, type: 'city' as const, description: 'Город с традиционными персидскими садами (500 тыс.), сад Фин, исторические дома, ковры, керамика, между Тегераном и Исфаханом' },
          { name: 'Персеполь', lat: 29.9430, lng: 52.8860, type: 'attraction' as const, description: 'Древняя столица Персидской империи, объект ЮНЕСКО, VI век до н.э., руины дворцов, рельефы, близость к Ширазу' },
          { name: 'Пасаргада', lat: 30.1833, lng: 53.1667, type: 'attraction' as const, description: 'Первая столица Персидской империи, могила Кира Великого' },
          { name: 'Чога-Занбиль', lat: 32.0081, lng: 48.5203, type: 'attraction' as const, description: 'Эламский зиккурат, объект ЮНЕСКО, XIII век до н.э., древнейший зиккурат Ирана' },
          { name: 'Мазандаран', lat: 36.2269, lng: 52.4786, type: 'attraction' as const, description: 'Зеленый край с Каспийским морем и густыми лесами' },
          { name: 'Керман', lat: 30.2833, lng: 57.0833, type: 'city' as const, description: 'Город с историческими мечетями и караван-сараи' }
        ];
      case 'ireland':
        return [
          { name: 'Дублин', lat: 53.3498, lng: -6.2603, type: 'city' as const, description: 'Столица Ирландии, культурный и экономический центр страны' },
          { name: 'Кольцо Керри', lat: 52.0333, lng: -9.5167, type: 'attraction' as const, description: 'Живописный маршрут на юго-западе Ирландии' },
          { name: 'Утесы Мохер', lat: 52.9716, lng: -9.4309, type: 'attraction' as const, description: 'Высокие морские скалы на побережье Атлантики' },
          { name: 'Голуэй', lat: 53.2707, lng: -9.0568, type: 'city' as const, description: 'Культурная столица запада Ирландии' },
          { name: 'Корк', lat: 51.8985, lng: -8.4756, type: 'city' as const, description: 'Вторая столица Ирландии (210 тыс.), порт на реке Ли, собор Святого Финбарра, английский рынок, пивоварни' },
          { name: 'Лимерик', lat: 52.6680, lng: -8.6305, type: 'city' as const, description: 'Город на реке Шеннон, третий по величине город' },
          { name: 'Тринити-колледж', lat: 53.3441, lng: -6.2594, type: 'attraction' as const, description: 'Старейший университет Ирландии (1592), дом книги Келлс, библиотека XVIII века' },
          { name: 'Замок Бларни', lat: 51.9219, lng: -8.5619, type: 'attraction' as const, description: 'Замок XV века с камнем Бларни, поцелуй которого дарует красноречие' },
          { name: 'Скеллиг-Майкл', lat: 51.9167, lng: -10.5333, type: 'attraction' as const, description: 'Остров-монастырь VI-VIII веков, объект Всемирного наследия ЮНЕСКО, кельтское христианство' },
          { name: 'Пеннинальские горы', lat: 53.5000, lng: -7.5000, type: 'attraction' as const, description: 'Горный массив на западе Ирландии' },
          { name: 'Ньюгрейндж', lat: 53.6947, lng: -6.4467, type: 'attraction' as const, description: 'Древний мегалитический памятник (3200 до н.э.), объект ЮНЕСКО, старше Стоунхенджа и пирамид' }
        ];
      case 'iraq':
        return [
          { name: 'Багдад', lat: 33.3152, lng: 44.3661, type: 'city' as const, description: 'Столица Ирака, политический и культурный центр страны' },
          { name: 'Эрбиль', lat: 36.1900, lng: 44.0089, type: 'city' as const, description: 'Столица Иракского Курдистана, дом для Цитадели Эрбиля - объекта ЮНЕСКО' },
          { name: 'Вавилон', lat: 32.5355, lng: 44.4275, type: 'attraction' as const, description: 'Древний город, одно из чудес света, объект ЮНЕСКО' },
          { name: 'Кербела', lat: 32.6150, lng: 44.0317, type: 'city' as const, description: 'Священный город шиитов с мавзолеем Имама Хусейна' },
          { name: 'Наджаф', lat: 32.0300, lng: 44.3300, type: 'city' as const, description: 'Священный город шиитов с мавзолеем Имама Али' },
          { name: 'Басра', lat: 30.5000, lng: 47.8167, type: 'city' as const, description: 'Главный морской порт Ирака на Шатт-эль-Арабе' },
          { name: 'Самарра', lat: 34.1981, lng: 43.8703, type: 'attraction' as const, description: 'Древний город с мечетью Маликия, объект ЮНЕСКО' },
          { name: 'Мосул', lat: 36.3333, lng: 43.1333, type: 'city' as const, description: 'Исторический город на реке Тигр' },
          { name: 'Зиккурат в Уре', lat: 30.9625, lng: 46.1030, type: 'attraction' as const, description: 'Лучше сохранившийся шумерский зиккурат, объект ЮНЕСКО' },
          { name: 'Болота Месопотамии', lat: 31.0000, lng: 47.0000, type: 'attraction' as const, description: 'Уникальная водно-болотная система между Тигром и Евфратом' }
        ];
      case 'israel':
        return [
          { name: 'Иерусалим', lat: 31.7683, lng: 35.2137, type: 'city' as const, description: 'Столица Израиля, священный город для иудаизма, христианства и ислама' },
          { name: 'Стена Плача', lat: 31.7767, lng: 35.2345, type: 'attraction' as const, description: 'Священное место иудаизма, остаток Второго Храма, объект ЮНЕСКО' },
          { name: 'Храм Гроба Господня', lat: 31.7784, lng: 35.2297, type: 'attraction' as const, description: 'Главная христианская святыня, место распятия и воскресения Иисуса' },
          { name: 'Тель-Авив', lat: 32.0853, lng: 34.7818, type: 'city' as const, description: 'Финансовая столица Израиля, город-пляж с архитектурой Баухаус' },
          { name: 'Хайфа', lat: 32.7940, lng: 34.9896, type: 'city' as const, description: 'Третий по величине город Израиля (280 тыс.), порт на Средиземном море, Бахайские сады - объект ЮНЕСКО, гора Кармель' },
          { name: 'Мертвое море', lat: 31.5000, lng: 35.5000, type: 'attraction' as const, description: 'Самая низкая точка на Земле, соленое озеро с терапевтическими свойствами' },
          { name: 'Масада', lat: 31.3167, lng: 35.3500, type: 'attraction' as const, description: 'Древняя крепость на скале с панорамой Мертвого моря' },
          { name: 'Галилея', lat: 32.7833, lng: 35.5333, type: 'attraction' as const, description: 'Регион с озером Кинерет и христианскими святынями' },
          { name: 'Эйлат', lat: 29.5581, lng: 34.9482, type: 'resort' as const, description: 'Курорт на Красном море с дайвингом и пляжами' },
          { name: 'Бейт-Шемеш', lat: 31.7470, lng: 34.9881, type: 'city' as const, description: 'Город с археологическим музеем и руинами библейского храма' },
          { name: 'Цфат', lat: 32.9646, lng: 35.4952, type: 'city' as const, description: 'Город в Галилее с историческим кварталом и видом на озеро Кинерет' },
          { name: 'Кесария', lat: 32.5000, lng: 34.9000, type: 'attraction' as const, description: 'Древний город с римским театром и крестоносной крепостью' }
        ];
      case 'italiya-gid':
        return [
          { name: 'Рим', lat: 41.9028, lng: 12.4964, type: 'city' as const, description: 'Вечный город, Колизей, Ватикан, Форум' },
          { name: 'Флоренция', lat: 43.7696, lng: 11.2558, type: 'city' as const, description: 'Колыбель Возрождения, Уффици, Понте Веккьо' },
          { name: 'Венеция', lat: 45.4408, lng: 12.3155, type: 'city' as const, description: 'Город на воде, Сан-Марко, гондолы' },
          { name: 'Помпеи', lat: 40.7510, lng: 14.4894, type: 'attraction' as const, description: 'Древний город, погребенный вулканом Везувий, объект ЮНЕСКО, фрески, форумы' },
          { name: 'Милан', lat: 45.4642, lng: 9.1900, type: 'city' as const, description: 'Столица моды (1.4 млн), Дуомо, "Тайная вечеря" Леонардо да Винчи, север Италии, финансовый центр' },
          { name: 'Неаполь', lat: 40.8518, lng: 14.2681, type: 'city' as const, description: 'Родина пиццы, близость к Помпеям и Везувию' },
          { name: 'Сиракузы', lat: 37.0754, lng: 15.2866, type: 'city' as const, description: 'Древнегреческий город (120 тыс.), объект ЮНЕСКО, театр, катакомбы, остров Ортигия, Сицилия, VIII век до н.э., историческое значение' },
          { name: 'Агридженто', lat: 37.3089, lng: 13.5767, type: 'city' as const, description: 'Долина храмов (60 тыс.), объект ЮНЕСКО, древнегреческие храмы V века до н.э., Сицилия, археологический парк, популярное место' },
          { name: 'Чинкве-Терре', lat: 44.1074, lng: 9.7160, type: 'attraction' as const, description: 'Пять живописных прибрежных деревень, объект ЮНЕСКО, Лигурийское море, треккинг, виноградники, север Италии, популярное место' },
          { name: 'Пизанская башня', lat: 43.7230, lng: 10.3966, type: 'attraction' as const, description: 'Знаменитая наклонная башня (56 м), символ Италии, XII век, Площадь Чудес, объект ЮНЕСКО, Пisa, центр Италии' },
          { name: 'Амальфи', lat: 40.6318, lng: 14.6026, type: 'resort' as const, description: 'Живописное побережье (5 тыс.), лимончелло, позитано, объект ЮНЕСКО, Средиземное море, юг Италии, популярное место для отдыха' },
          { name: 'Флоренция - Уффици', lat: 43.7687, lng: 11.2569, type: 'attraction' as const, description: 'Один из лучших художественных музеев мира, коллекция эпохи Возрождения, Боттичелли, Микеланджело, Флоренция, центр Италии' },
          { name: 'Озеро Комо', lat: 45.9781, lng: 9.2714, type: 'attraction' as const, description: 'Самое живописное озеро Италии (146 км²), виллы и пальмы, Альпы, север Италии, популярное место для отдыха, курорты' }
        ];
      case 'yaponiya-gid':
        return [
          { name: 'Токио', lat: 35.6895, lng: 139.6917, type: 'city' as const, description: 'Столица Японии, современный мегаполис с традиционной культурой' },
          { name: 'Киото', lat: 35.0116, lng: 135.7681, type: 'city' as const, description: 'Бывшая столица Японии (794-1868), объект ЮНЕСКО, храмы, сады и традиционные кварталы' },
          { name: 'Осака', lat: 34.6937, lng: 135.5023, type: 'city' as const, description: 'Гастрономическая столица Японии с замком Осака и Дотонбори' },
          { name: 'Гора Фудзи', lat: 35.3606, lng: 138.7274, type: 'attraction' as const, description: 'Священная гора Японии, символ страны и объект Всемирного наследия ЮНЕСКО' },
          { name: 'Храм Сенсо-дзи', lat: 35.7148, lng: 139.7967, type: 'attraction' as const, description: 'Самый старый храм Токио (628), в районе Асакуса, буддийский храм' },
          { name: 'Национальный парк Йокосукава', lat: 35.3550, lng: 139.6350, type: 'attraction' as const, description: 'Природный парк с онсен-курортами и сакурой' },
          { name: 'Храм Кинкакудзи', lat: 35.0394, lng: 135.7292, type: 'attraction' as const, description: 'Золотой павильон в Киото (1397), покрытый золотыми листами, объект ЮНЕСКО' },
          { name: 'Нара', lat: 34.6851, lng: 135.8048, type: 'city' as const, description: 'Древняя столица Японии (710-784), объект ЮНЕСКО, крупнейший бронзовый Будда, храм Тодай-дзи' },
          { name: 'Хиросима', lat: 34.3853, lng: 132.4553, type: 'city' as const, description: 'Город мира с мемориалом атомной бомбардировки, объект ЮНЕСКО' },
          { name: 'Замок Химэдзи', lat: 34.8394, lng: 134.6939, type: 'attraction' as const, description: 'Белый замок-цапля, объект ЮНЕСКО, XVII век, лучший пример японской замковой архитектуры' },
          { name: 'Окинава', lat: 26.2124, lng: 127.6809, type: 'resort' as const, description: 'Южные острова с тропическим климатом и уникальной культурой' }
        ];
      case 'jamaica':
        return [
          { name: 'Кингстон', lat: 17.9712, lng: -76.7929, type: 'city' as const, description: 'Столица Ямайки (670 тыс.), культурный и деловой центр острова, порт, музеи, регги, юг Ямайки, Карибское море, исторический центр' },
          { name: 'Монтего-Бей', lat: 18.4712, lng: -77.9188, type: 'city' as const, description: 'Главный туристический центр (110 тыс.) с крупным аэропортом и курортами, пляжи, Карибское море, северо-запад Ямайки, популярное место' },
          { name: 'Негрил', lat: 18.2675, lng: -78.3333, type: 'resort' as const, description: 'Известен семимильным пляжем и скалами Вест-Энда для прыжков в воду, Карибское море, запад Ямайки, популярное место для отдыха' },
          { name: 'Очо-Риос', lat: 18.4041, lng: -76.9556, type: 'city' as const, description: 'Популярен водопадами Даннс-Ривер (20 тыс.), по которым можно взобраться наверх, Карибское море, север Ямайки, курорты' },
          { name: 'Голубые горы (Blue Mountains)', lat: 18.1096, lng: -76.7929, type: 'attraction' as const, description: 'Горный хребет с одним из самых дорогих сортов кофе в мире и треккинговыми маршрутами' },
          { name: 'Порт-Ройал', lat: 17.9333, lng: -76.8500, type: 'attraction' as const, description: 'Бывшая пиратская столица Карибского моря, погруженная частично в море, XVII век, археологические раскопки, юг Ямайки, историческое значение' },
          { name: 'Джеймстаун', lat: 18.1096, lng: -77.2975, type: 'attraction' as const, description: 'Исторический порт с музеем и старинной архитектурой' },
          { name: 'Рунвей-Бей', lat: 18.2000, lng: -78.2833, type: 'resort' as const, description: 'Популярный курорт с пляжами и возможностью рафтинга на бамбуковых плотах' },
          { name: 'Фалмут', lat: 18.4833, lng: -77.6500, type: 'city' as const, description: 'Портовый город недалеко от Монтего-Бей с живописной бухтой' },
          { name: 'Батта-Филд', lat: 18.0667, lng: -77.5167, type: 'attraction' as const, description: 'Место рождения Боба Марли, музей и культурный центр' }
        ];
      case 'jordan':
        return [
          { name: 'Амман', lat: 31.9522, lng: 35.9364, type: 'city' as const, description: 'Столица Иордании, современный город с древнеримскими руинами' },
          { name: 'Цитадель Аммана', lat: 31.9539, lng: 35.9344, type: 'attraction' as const, description: 'Древняя цитадель с храмом Геракла, византийская церковь, дворец Омейядов, объект ЮНЕСКО' },
          { name: 'Петра', lat: 30.3285, lng: 35.4444, type: 'attraction' as const, description: 'Античная Набатейская столица, высеченный в скале город, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Вади Рам', lat: 30.0558, lng: 35.4333, type: 'attraction' as const, description: 'Пустынный ландшафт с красными песчаниками, известный как "Долина Луны"' },
          { name: 'Акаба', lat: 29.5317, lng: 35.0062, type: 'resort' as const, description: 'Курортный город на побережье Красного моря с пляжами и дайвингом' },
          { name: 'Иераш', lat: 32.2777, lng: 35.8908, type: 'attraction' as const, description: 'Древний римский город с хорошо сохранившейся колоннадой и арками' },
          { name: 'Мертвое море', lat: 31.5000, lng: 35.5000, type: 'attraction' as const, description: 'Самое низкое место на Земле, соленое озеро с терапевтическими свойствами' },
          { name: 'Крепость Карк', lat: 31.1833, lng: 35.7000, type: 'attraction' as const, description: 'Крестоносная крепость XII века на вершине холма с панорамным видом' },
          { name: 'Мадаба', lat: 31.7167, lng: 35.8000, type: 'city' as const, description: 'Город с древними мозаиками, включая знаменитую карту Мадаба' },
          { name: 'Кастел', lat: 31.8500, lng: 35.8167, type: 'attraction' as const, description: 'Археологический музей на холме с панорамным видом на Иерусалим' },
          { name: 'Маан', lat: 30.1925, lng: 35.7361, type: 'city' as const, description: 'Город-врата к Петре и Вади Рам, важный торговый центр на Великом арабском пути' }
        ];
      case 'kazakhstan-gid':
        return [
          { name: 'Алматы', lat: 43.2220, lng: 76.8512, type: 'city' as const, description: 'Крупнейший город Казахстана, бывшая столица, культурный центр' },
          { name: 'Нур-Султан', lat: 51.1605, lng: 71.4704, type: 'city' as const, description: 'Столица Казахстана, современный мегаполис с оригинальной архитектурой' },
          { name: 'Байконур', lat: 45.6231, lng: 63.3218, type: 'city' as const, description: 'Город-космодром, с которого стартовали первые полеты в космос' },
          { name: 'Чимкент', lat: 42.3155, lng: 69.5869, type: 'city' as const, description: 'Третий по величине город Казахстана (1.1 млн), древний торговый центр на Великом шелковом пути, мечети, музеи, близость к Туркестану' },
          { name: 'Туркестан', lat: 43.3000, lng: 68.2500, type: 'attraction' as const, description: 'Мавзолей Ходжи Ахмеда Ясави, объект ЮНЕСКО, XIV век, святыня тюркского мира' },
          { name: 'Астана-Арена', lat: 51.0935, lng: 71.4164, type: 'attraction' as const, description: 'Современный стадион в столице с уникальной архитектурой' },
          { name: 'Медеу', lat: 43.1500, lng: 77.0667, type: 'attraction' as const, description: 'Высокогорный каток в Алматы, самый высокий в мире' },
          { name: 'Алтын Эмиш', lat: 43.0000, lng: 77.5000, type: 'attraction' as const, description: 'Национальный парк с уникальными природными ландшафтами и редкими животными' },
          { name: 'Большое Алматинское озеро', lat: 43.1833, lng: 77.1167, type: 'attraction' as const, description: 'Горное озеро в предгорьях Тянь-Шаня, популярное место отдыха' },
          { name: 'Хан-Шатыр', lat: 51.0935, lng: 71.4164, type: 'attraction' as const, description: 'Развлекательный комплекс в форме шатра в Нур-Султане' },
          { name: 'Босс and Голубые отмели', lat: 43.2500, lng: 76.9500, type: 'attraction' as const, description: 'Природный заповедник с разноцветными холмами и каньонами' }
        ];
      case 'kiribati':
        return [
          { name: 'Южная Тарава', lat: 1.3500, lng: 172.9500, type: 'city' as const, description: 'Столица Кирибати (63 тыс.), расположена на атолле Тарава, место битвы Второй мировой войны, пляжи, лагуны, традиционная культура' },
          { name: 'Остров Рождества (Киритимати)', lat: 1.8667, lng: -157.4833, type: 'attraction' as const, description: 'Крупнейший коралловый атолл в мире, лучшая костная рыбалка' },
          { name: 'Музей Кирибати', lat: 1.3382, lng: 172.9806, type: 'attraction' as const, description: 'Национальный музей с коллекцией традиционных лодок, оружия, предметов быта' },
          { name: 'Поле битвы Тарава', lat: 1.3523, lng: 172.9456, type: 'attraction' as const, description: 'Место ожесточенной битвы 1943 года, мемориалы, японские бункеры' },
          { name: 'Лагуна Тарава', lat: 1.3500, lng: 172.9500, type: 'attraction' as const, description: 'Огромная лагуна с кристально чистой водой, снорклинг, дайвинг' },
          { name: 'Рыболовные воды Абемама', lat: 0.3667, lng: 173.8167, type: 'attraction' as const, description: 'Лучшая костная рыбалка в мире, профессиональные гиды' },
          { name: 'Пляжи Аранука', lat: 0.1833, lng: 173.6333, type: 'resort' as const, description: 'Девственные пляжи с белоснежным песком, уединение' },
          { name: 'Традиционная деревня Буота', lat: 1.3833, lng: 173.0333, type: 'attraction' as const, description: 'Аутентичная деревня с традиционной архитектурой, местные ремесла' },
          { name: 'Католическая миссия Сакред Харт', lat: 1.3600, lng: 172.9700, type: 'attraction' as const, description: 'Историческая католическая миссия, красивая церковь' },
          { name: 'Птичий заповедник Феникс', lat: -3.7167, lng: -170.7167, type: 'attraction' as const, description: 'Крупнейший морской заповедник, миллионы морских птиц' },
          { name: 'Линия смены дат', lat: 0, lng: 180, type: 'attraction' as const, description: 'Место, где начинается новый день на планете, первые встречают рассвет' },
          { name: 'Аэропорт Бонрики', lat: 1.3382, lng: 172.9806, type: 'airport' as const, description: 'Международный аэропорт в Тараве, основные международные рейсы' }
        ];
      case 'kenya':
        return [
          { name: 'Найроби', lat: -1.2921, lng: 36.8219, type: 'city' as const, description: 'Столица Кении (4.4 млн), расположена на равнине на высоте 1795 м, национальный парк в черте города, музеи, базары, ворота в сафари' },
          { name: 'Масаи Мара', lat: -1.5000, lng: 35.1000, type: 'attraction' as const, description: 'Национальный заповедник с Великой миграцией животных, одна из "Большой пятерки"' },
          { name: 'Момбаса', lat: -4.0435, lng: 39.6682, type: 'city' as const, description: 'Крупнейший портовый город Кении на побережье Индийского океана' },
          { name: 'Амбосели', lat: -2.6400, lng: 37.2500, type: 'attraction' as const, description: 'Национальный парк с видом на гору Килиманджаро и стадами слонов' },
          { name: 'Озеро Накуру', lat: -0.3031, lng: 36.0800, type: 'attraction' as const, description: 'Соленое озеро, известное фламинго и рогатым быком' },
          { name: 'Самбуру', lat: 1.0000, lng: 37.5000, type: 'attraction' as const, description: 'Национальный резерв с редкими животными: сетатунгой, ориксом, берберийским бараном' },
          { name: 'Центра-Парк', lat: -0.1500, lng: 37.8000, type: 'attraction' as const, description: 'Национальный парк вблизи Найроби с леопардами, антилопами и птицами' },
          { name: 'Диани-Бич', lat: -4.3000, lng: 39.5833, type: 'resort' as const, description: 'Один из лучших пляжей Кении с белым песком и пальмами' },
          { name: 'Наро-Мору', lat: 0.1833, lng: 37.9000, type: 'attraction' as const, description: 'Город у подножия горы Кения, отправная точка к горе' },
          { name: 'Кисуму', lat: -0.0917, lng: 34.7681, type: 'city' as const, description: 'Третий по величине город Кении на берегу озера Виктория' }
        ];
      case 'kosovo':
        return [
          { name: 'Приштина', lat: 42.6629, lng: 21.1655, type: 'city' as const, description: 'Столица Косово (200 тыс.), расположена в долине, памятник "Новая родина", библиотека, мечети, рынки, сербская архитектура' },
          { name: 'Призрен', lat: 42.2139, lng: 20.7397, type: 'city' as const, description: 'Культурная столица Косово с османским наследием' },
          { name: 'Печ', lat: 42.6611, lng: 20.2889, type: 'city' as const, description: 'Город с Патриархатом, сербский православный центр' },
          { name: 'Митровица', lat: 42.8833, lng: 20.8667, type: 'city' as const, description: 'Разделенный город на реке Ибар' },
          { name: 'Джаковица', lat: 42.3833, lng: 20.4000, type: 'city' as const, description: 'Город на западе Косово, торговый центр' },
          { name: 'Монастырь Высокие Дечаны', lat: 42.5500, lng: 20.2667, type: 'attraction' as const, description: 'Сербский православный монастырь XIV века, объект ЮНЕСКО' },
          { name: 'Национальный парк Шар-планина', lat: 42.1167, lng: 20.9000, type: 'attraction' as const, description: 'Горная система на границе с Македонией, пешие маршруты' },
          { name: 'Музей Косово', lat: 42.6629, lng: 21.1655, type: 'attraction' as const, description: 'Национальный музей в Приштине с археологическими находками' },
          { name: 'Мечеть Сулеймана Паши', lat: 42.2139, lng: 20.7333, type: 'attraction' as const, description: 'Османская мечеть 1615 года в Призрене' },
          { name: 'Крепость Новобрдо', lat: 42.6167, lng: 21.4333, type: 'attraction' as const, description: 'Средневековая крепость XIV века, бывший центр добычи серебра' }
        ];
      case 'kuwait':
        return [
          { name: 'Эль-Кувейт', lat: 29.3775, lng: 47.9933, type: 'city' as const, description: 'Столица Кувейта (3.1 млн), порт на Персидском заливе, Кувейтские башни, Большая мечеть, музеи, небоскребы, Сук-аль-Мубаракия' },
          { name: 'Кувейтские башни', lat: 29.3775, lng: 47.9933, type: 'attraction' as const, description: 'Символ страны, три башни с вращающейся смотровой площадкой и рестораном' },
          { name: 'Башня Освобождения', lat: 29.3761, lng: 47.9922, type: 'attraction' as const, description: 'Вторая по высоте башня в стране, символ освобождения от иракской оккупации' },
          { name: 'Большая мечеть', lat: 29.3742, lng: 47.9792, type: 'attraction' as const, description: 'Самая большая мечеть в Кувейте, известная своей впечатляющей архитектурой' },
          { name: 'Сук Аль-Мубаракия', lat: 29.3769, lng: 47.9786, type: 'attraction' as const, description: 'Один из старейших рынков, где можно ощутить атмосферу старого Кувейта' },
          { name: 'Научный центр Кувейта', lat: 29.3758, lng: 48.0022, type: 'attraction' as const, description: 'Включает в себя аквариум, кинотеатр IMAX и интерактивные выставки' },
          { name: 'Национальный музей Кувейта', lat: 29.3733, lng: 47.9781, type: 'attraction' as const, description: 'Рассказывает об истории и наследии страны' },
          { name: 'Дом-музей "Зеркальный дом"', lat: 29.3725, lng: 47.9750, type: 'attraction' as const, description: 'Уникальный дом, полностью покрытый зеркальной мозаикой' },
          { name: 'Остров Файлака', lat: 29.2700, lng: 48.2500, type: 'attraction' as const, description: 'Археологические раскопки, относящиеся к эпохе Древней Греции' },
          { name: 'Пляж Эль-Кувейта', lat: 29.3667, lng: 48.0000, type: 'resort' as const, description: 'Один из самых популярных пляжей с чистым песком' }
        ];
      case 'kyrgyzstan':
        return [
          { name: 'Бишкек', lat: 42.8746, lng: 74.5698, type: 'city' as const, description: 'Столица Кыргызстана (1 млн), расположена у подножия Тянь-Шаня, площадь Ала-Тоо, музеи, базары, ворота в горы' },
          { name: 'Ош', lat: 40.5283, lng: 72.7985, type: 'city' as const, description: 'Второй по величине город Кыргызстана (320 тыс.), древний торговый центр на Великом шелковом пути, гора Сулайман-Тоо - объект ЮНЕСКО, базары' },
          { name: 'Каракол', lat: 42.4917, lng: 78.3936, type: 'city' as const, description: 'Город у подножия Тянь-Шаня, ворота в горы' },
          { name: 'Нарын', lat: 41.4287, lng: 75.9911, type: 'city' as const, description: 'Административный центр Нарынской области' },
          { name: 'Талас', lat: 42.5225, lng: 72.2428, type: 'city' as const, description: 'Город в центральной части страны, родина эпоса Манас' },
          { name: 'Озеро Иссык-Куль', lat: 42.5000, lng: 77.0000, type: 'attraction' as const, description: 'Второе по величине высокогорное озеро в мире, никогда не замерзает' },
          { name: 'Сулейман-Тоо', lat: 40.5267, lng: 72.8028, type: 'attraction' as const, description: 'Священная гора ислама, объект ЮНЕСКО' },
          { name: 'Ущелье Ала-Арча', lat: 42.7000, lng: 74.4167, type: 'attraction' as const, description: 'Национальный парк с альпийскими лугами и ледниками' },
          { name: 'Озеро Сон-Куль', lat: 41.6167, lng: 77.8667, type: 'attraction' as const, description: 'Высокогорное озеро, летние пастбища кочевников' },
          { name: 'Джеты-Огуз', lat: 42.5000, lng: 78.5000, type: 'attraction' as const, description: 'Знаменитые красные скалы "Семь быков"' },
          { name: 'Таш-Рабат', lat: 41.4167, lng: 75.2500, type: 'attraction' as const, description: 'Караван-сарай XV века на Великом Шелковом пути, объект культурного наследия' },
          { name: 'Дунганский рынок', lat: 42.4917, lng: 78.3936, type: 'attraction' as const, description: 'Китайско-мусульманский рынок в Караколе' },
          { name: 'Ущелье Катар-Кол', lat: 42.6667, lng: 79.0000, type: 'attraction' as const, description: 'Скрытое ущелье с нетронутой природой' },
          { name: 'Музей Манаса', lat: 42.8746, lng: 74.5698, type: 'attraction' as const, description: 'Национальный музей эпоса Манас' },
          { name: 'Пик Ленина', lat: 42.5000, lng: 77.0000, type: 'attraction' as const, description: 'Семитысячник (7134 м), популярный маршрут для альпинистов' }
        ];
      case 'laos':
        return [
          { name: 'Вьентьян', lat: 17.9667, lng: 102.6000, type: 'city' as const, description: 'Столица Лаоса (820 тыс.), расположена на реке Меконг, ступа Пха Тхатлуанг, храмы, ночные рынки, французская архитектура' },
          { name: 'Луангпхабанг', lat: 19.8833, lng: 102.1333, type: 'city' as const, description: 'Духовная столица, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Вангвьенг', lat: 18.9209, lng: 102.4482, type: 'city' as const, description: 'Приключенческий центр с карстовыми горами и пещерами' },
          { name: 'Плато Болавен', lat: 15.2000, lng: 106.0000, type: 'attraction' as const, description: 'Высокогорное плато с водопадами и кофейными плантациями' },
          { name: 'Си Фан Дон (4000 островов)', lat: 13.9500, lng: 105.9167, type: 'attraction' as const, description: 'Архипелаг островов на Меконге с иравадийскими дельфинами' },
          { name: 'Водопады Куанг Си', lat: 19.7489, lng: 101.9925, type: 'attraction' as const, description: 'Каскад известняковых водопадов с бирюзовыми бассейнами' },
          { name: 'Долина Кувшинов (Равнина Банок)', lat: 19.4500, lng: 103.2000, type: 'attraction' as const, description: 'Археологический комплекс с тысячами каменных кувшинов, объект ЮНЕСКО' },
          { name: 'Пещеры Пак У', lat: 20.0167, lng: 102.2167, type: 'attraction' as const, description: 'Священные пещеры в известняковых скалах на слиянии рек Меконг и Нам У' },
          { name: 'Будда-парк (Сьенг Кхуан)', lat: 17.9209, lng: 102.7643, type: 'attraction' as const, description: 'Сюрреалистический парк скульптур с более чем 200 статуями Будды' },
          { name: 'Национальный парк Нам Ха', lat: 20.5000, lng: 101.5000, type: 'attraction' as const, description: 'Биосферный заповедник с богатой флорой и фауной' }
        ];
      case 'nepal-gid':
        return [
          { name: 'Катманду', lat: 27.7172, lng: 85.3240, type: 'city' as const, description: 'Столица Непала (1.5 млн), расположена в долине на высоте 1400 м, площадь Дурбар - объект ЮНЕСКО, храмы, ступы, ворота в Гималаи' },
          { name: 'Площадь Дурбар в Катманду', lat: 27.7044, lng: 85.3078, type: 'attraction' as const, description: 'Королевский дворец, объект ЮНЕСКО, храмы, пагоды, архитектура XVI-XVIII веков' },
          { name: 'Покхара', lat: 28.2096, lng: 83.9856, type: 'city' as const, description: 'Туристическая столица у озера Фева с видом на Аннапурну' },
          { name: 'Лумбини', lat: 27.4900, lng: 83.2700, type: 'attraction' as const, description: 'Место рождения Будды, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Читван', lat: 27.5291, lng: 84.3647, type: 'attraction' as const, description: 'Национальный парк с сафари в джунглях, тигры и носороги' },
          { name: 'Бхактапур', lat: 27.6710, lng: 85.4290, type: 'city' as const, description: 'Древний город, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Патан', lat: 27.6667, lng: 85.3167, type: 'city' as const, description: 'Город древних храмов и ступ Боднатх' },
          { name: 'Эверест', lat: 27.9881, lng: 86.9250, type: 'attraction' as const, description: 'Высочайшая вершина мира 8848 м, трек к базовому лагерю' },
          { name: 'Аннапурна', lat: 28.5967, lng: 83.8200, type: 'attraction' as const, description: 'Горная масса с треккингом вокруг, 8091 м' },
          { name: 'Озеро Фева', lat: 28.2096, lng: 83.9856, type: 'attraction' as const, description: 'Живописное озеро в Покхаре с видом на Аннапурну' },
          { name: 'Ступа Боднатх', lat: 27.7214, lng: 85.3592, type: 'attraction' as const, description: 'Крупнейшая буддийская ступа в мире' }
        ];
      case 'latvia':
        return [
          { name: 'Рига', lat: 56.9496, lng: 24.1052, type: 'city' as const, description: 'Столица Латвии (630 тыс.), Старый город - объект ЮНЕСКО, югендстиль, Домский собор, Дом Черноголовых, мосты через Даугаву' },
          { name: 'Юрмала', lat: 56.9500, lng: 23.7167, type: 'resort' as const, description: 'Курортный город с длинными песчаными пляжами на побережье Балтийского моря' },
          { name: 'Сигулда', lat: 57.1500, lng: 24.8500, type: 'attraction' as const, description: '"Латвийская Швейцария" с замками Турайда и Сигулда, пещерами Гутманис' },
          { name: 'Замок Турайда', lat: 57.1833, lng: 24.8500, type: 'attraction' as const, description: 'Средневековый замок, объект культурного наследия, XIII век, музей' },
          { name: 'Кулдига', lat: 56.9667, lng: 21.9667, type: 'attraction' as const, description: '"Латвийская Венеция" с самым широким водопадом в Европе Вентас роза' },
          { name: 'Лиепая', lat: 56.5000, lng: 21.0000, type: 'city' as const, description: 'Портовый город на Балтийском море с военной историей и пляжами' },
          { name: 'Даугавпилс', lat: 55.8833, lng: 26.5333, type: 'city' as const, description: 'Крупнейший город на юго-востоке Латвии с величественной крепостью' },
          { name: 'Вентспилс', lat: 57.3833, lng: 21.5500, type: 'city' as const, description: 'Портовый город на западном побережье с живописным старым городом' },
          { name: 'Национальный парк Гауя', lat: 56.8500, lng: 24.6000, type: 'attraction' as const, description: 'Национальный парк с рекой Гауя, самой глубокой рекой в Европе' },
          { name: 'Рижский средневековый замок', lat: 56.9500, lng: 24.1000, type: 'attraction' as const, description: 'Дом Черноголовых и церковь Святого Петра в Старом городе Риги' },
          { name: 'Экологический парк Плуддземе', lat: 56.9333, lng: 23.8000, type: 'attraction' as const, description: 'Природный парк с озерами, лесами и возможностью наблюдения за птицами' }
        ];
      case 'lithuania':
        return [
          { name: 'Вильнюс', lat: 54.6872, lng: 25.2797, type: 'city' as const, description: 'Столица Литвы (540 тыс.), Старый город - объект ЮНЕСКО, башня Гедиминаса, собор, костел Святой Анны, ворота Аушрос' },
          { name: 'Каунас', lat: 54.8980, lng: 23.9078, type: 'city' as const, description: 'Второй по величине город Литвы (290 тыс.), временная столица 1919-1940, Старый город, замок, музеи, фуникулер' },
          { name: 'Клайпеда', lat: 55.7179, lng: 21.1250, type: 'city' as const, description: 'Морской порт на Балтийском море, самый западный город Литвы' },
          { name: 'Паланга', lat: 55.9179, lng: 21.0667, type: 'resort' as const, description: 'Курортный город на побережье Балтийского моря с живописным пляжем' },
          { name: 'Шауляй', lat: 55.9333, lng: 23.3167, type: 'city' as const, description: 'Город с красивым старым городом и крепостью' },
          { name: 'Тракай', lat: 54.6333, lng: 24.9333, type: 'attraction' as const, description: 'Город-крепость на острове в сердце Литвы, Тракайский замок, объект культурного наследия, XIV-XV века' },
          { name: 'Национальный парк Куршская коса', lat: 55.5000, lng: 21.0000, type: 'attraction' as const, description: 'Уникальная природная зона с живописными дюнами и озерами, объект ЮНЕСКО' },
          { name: 'Национальный парк Аукштайтия', lat: 54.2000, lng: 25.8000, type: 'attraction' as const, description: 'Самый большой национальный парк Литвы с озерами и лесами' },
          { name: 'Девинионис', lat: 54.2000, lng: 25.8000, type: 'attraction' as const, description: 'Священное место язычников, холм с телескопом' },
          { name: 'Музей стекла в Паланге', lat: 55.9167, lng: 21.0667, type: 'attraction' as const, description: 'Уникальный музей с коллекцией стеклянных изделий' }
        ];
      case 'luhansk':
        return [
          { name: 'Луганск', lat: 48.5741, lng: 39.3078, type: 'city' as const, description: 'Столица Луганской Народной Республики' },
          { name: 'Свято-Петро-Павловский собор', lat: 48.5698, lng: 39.3017, type: 'attraction' as const, description: 'Кафедральный собор Луганска с богатым внутренним убранством' },
          { name: 'Луганский природный заповедник', lat: 49.0500, lng: 38.7000, type: 'attraction' as const, description: 'Биосферный заповедник с девственными степями и редкой фауной' },
          { name: 'Замок Шарпантье', lat: 48.9167, lng: 38.4833, type: 'attraction' as const, description: 'Неоготический замок XIX века в Старобельске' },
          { name: 'Музей шахтерской славы', lat: 48.4167, lng: 39.2000, type: 'attraction' as const, description: 'История угледобычи в Донбассе с подземными галереями' },
          { name: 'Станично-Луганское водохранилище', lat: 48.6833, lng: 39.4667, type: 'attraction' as const, description: 'Крупнейшее водохранилище региона для рыбалки и отдыха' },
          { name: 'Святогорский монастырь', lat: 49.0333, lng: 37.5667, type: 'attraction' as const, description: 'Древний пещерный монастырь на берегу Северского Донца' },
          { name: 'Алчевск', lat: 48.4667, lng: 38.8000, type: 'city' as const, description: 'Промышленный город с краеведческим музеем' }
        ];
      case 'lebanon-gid':
        return [
          { name: 'Бейрут', lat: 33.8938, lng: 35.5018, type: 'city' as const, description: 'Столица Ливана, космополитичная столица с ночной жизнью и историческими достопримечательностями' },
          { name: 'Древний Библ (Джубейль)', lat: 34.1212, lng: 35.6480, type: 'attraction' as const, description: 'Один из древнейших городов мира (7000 лет), финикийские руины, объект ЮНЕСКО' },
          { name: 'Баальбек', lat: 34.0059, lng: 36.2040, type: 'attraction' as const, description: 'Римские храмы Юпитера, Бахуса и Венеры, объект ЮНЕСКО' },
          { name: 'Долина Кадиша и кедры Божии', lat: 34.2833, lng: 36.0167, type: 'attraction' as const, description: 'Святая долина, древние монастыри, библейские кедры, объект ЮНЕСКО' },
          { name: 'Сидон (Сайда)', lat: 33.5597, lng: 35.3706, type: 'city' as const, description: 'Древний финикийский порт с морской крепостью крестоносцев' },
          { name: 'Тир (Сур)', lat: 33.2704, lng: 35.1944, type: 'city' as const, description: 'Финикийская столица с римскими руинами и некрополем, объект ЮНЕСКО' },
          { name: 'Горнолыжный курорт Мзар', lat: 34.2833, lng: 35.8500, type: 'resort' as const, description: 'Лыжный курорт в Ливанских горах с 42 км трасс' },
          { name: 'Анджар', lat: 33.7275, lng: 35.9306, type: 'attraction' as const, description: 'Единственный омейядский город в Ливане, объект ЮНЕСКО' },
          { name: 'Винодельня Шато Ксара', lat: 33.8167, lng: 35.9000, type: 'attraction' as const, description: 'Одна из старейших виноделен Ближнего Востока в долине Бекаа' },
          { name: 'Голубиные скалы, Бейрут', lat: 33.8959, lng: 35.4784, type: 'attraction' as const, description: 'Природные арки в скалах на набережной Корниш' }
        ];
      case 'lesotho':
        return [
          { name: 'Масеру', lat: -29.3167, lng: 27.4833, type: 'city' as const, description: 'Столица Лесото (330 тыс.), расположена на границе с ЮАР, королевский дворец, собор, рынки, ворота в Драконовы горы' },
          { name: 'Перевал Сани (Сани Пасс)', lat: -29.1667, lng: 28.7000, type: 'attraction' as const, description: 'Самый высокий автомобильный перевал в Африке (2870 м)' },
          { name: 'Национальный парк Сехлабатебе', lat: -29.4000, lng: 28.9167, type: 'attraction' as const, description: 'Объект Всемирного наследия ЮНЕСКО с дикой природой' },
          { name: 'Горнолыжный курорт Африски', lat: -29.5000, lng: 28.5000, type: 'resort' as const, description: 'Единственный горнолыжный курорт в Южной Африке' },
          { name: 'Водопад Малецуньяне', lat: -29.2833, lng: 28.8000, type: 'attraction' as const, description: 'Один из самых высоких водопадов в ЮАР (192 м)' },
          { name: 'Горы Драконов (Дракенсберг)', lat: -29.5000, lng: 29.0000, type: 'attraction' as const, description: 'Часть горной системы Дракенсберг с драматичными пейзажами' },
          { name: 'Традиционные деревни басуто', lat: -29.4500, lng: 28.6000, type: 'attraction' as const, description: 'Деревни с традиционной архитектурой и культурой' },
          { name: 'Следы динозавров', lat: -29.3500, lng: 28.4000, type: 'attraction' as const, description: 'Юрские следы тероподов и сауроподов' },
          { name: 'Национальный музей Лесото', lat: -29.3167, lng: 27.4833, type: 'attraction' as const, description: 'Музей археологии, этнографии и истории Лесото' },
          { name: 'Рынок Сенека', lat: -29.3167, lng: 27.4833, type: 'attraction' as const, description: 'Крупнейший открытый рынок страны' }
        ];
      case 'liberia':
        return [
          { name: 'Монровия', lat: 6.3000, lng: -10.8000, type: 'city' as const, description: 'Столица Либерии (1.5 млн), порт на Атлантическом океане, названа в честь президента Монро, рынки, музеи, пляжи' },
          { name: 'Национальный парк Сапо', lat: 5.6667, lng: -8.5000, type: 'attraction' as const, description: 'Крупнейший национальный парк страны с редкими видами животных' },
          { name: 'Робертспорт', lat: 4.3667, lng: -11.4833, type: 'resort' as const, description: 'Один из лучших курортов Западной Африки с отличными пляжами' },
          { name: 'Озеро Писо', lat: 5.2500, lng: -10.3333, type: 'attraction' as const, description: 'Крупнейшее озеро Либерии, лагуна отделенная от океана' },
          { name: 'Бучи', lat: 5.9167, lng: -10.0333, type: 'city' as const, description: 'Пригород Монровии, известен своими пляжами' },
          { name: 'Вотерсайд Маркет', lat: 6.3167, lng: -10.8000, type: 'attraction' as const, description: 'Самый оживленный рынок страны в центре Монровии' },
          { name: 'Гбарнга', lat: 6.5000, lng: -9.5000, type: 'city' as const, description: 'Административный центр Бонг-округа в центральной части страны' },
          { name: 'Харпер', lat: 4.3833, lng: -7.9833, type: 'city' as const, description: 'Город на юге страны, на границе с Кот-д\'Ивуаром' },
          { name: 'Национальный музей Либерии', lat: 6.3000, lng: -10.8000, type: 'attraction' as const, description: 'Экспозиции по истории страны и культуры в центре Монровии' },
          { name: 'Пляж Джонс-Каунти', lat: 6.2500, lng: -10.7500, type: 'resort' as const, description: 'Живописный пляж с хорошими волнами для серфинга' }
        ];
      case 'libya':
        return [
          { name: 'Триполи', lat: 32.8872, lng: 13.1913, type: 'city' as const, description: 'Столица Ливии (1.1 млн), порт на Средиземном море, медина, Красный замок, мечети, римские руины, итальянская архитектура' },
          { name: 'Бенгази', lat: 32.1169, lng: 20.0667, type: 'city' as const, description: 'Второй по величине город Ливии, порт на Средиземном море' },
          { name: 'Сирт', lat: 31.2074, lng: 16.5872, type: 'city' as const, description: 'Портовый город на средиземноморском побережье' },
          { name: 'Гадамес', lat: 30.1333, lng: 9.5000, type: 'attraction' as const, description: 'Древний оазисный город в пустыне, объект ЮНЕСКО' },
          { name: 'Лептис-Магна', lat: 32.6333, lng: 14.2833, type: 'attraction' as const, description: 'Руины римского города, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Сабрата', lat: 32.7983, lng: 12.4836, type: 'attraction' as const, description: 'Римский город на побережье, объект ЮНЕСКО' },
          { name: 'Горы Джебель-Акдар', lat: 32.5000, lng: 13.5000, type: 'attraction' as const, description: 'Зеленые горы с оливковыми рощами и античными городами' },
          { name: 'Оазис Куфра', lat: 24.1667, lng: 23.2833, type: 'attraction' as const, description: 'Крупнейший оазис в пустыне, исторический пункт торговли' },
          { name: 'Джамахирия', lat: 32.4500, lng: 13.0167, type: 'city' as const, description: 'Город недалеко от Триполи, известен своими рынками' },
          { name: 'Мисурата', lat: 32.3756, lng: 15.0920, type: 'city' as const, description: 'Третий по величине город Ливии, важный порт' }
        ];
      case 'moldova':
        return [
          { name: 'Кишинев', lat: 47.0105, lng: 28.8638, type: 'city' as const, description: 'Столица Молдовы (670 тыс.), расположена на реке Бык, собор Рождества Христова, парки, винные погреба, музеи, советская архитектура' },
          { name: 'Сороки', lat: 47.8333, lng: 28.3333, type: 'city' as const, description: 'Исторический город на Днестре с крепостью и монастырями' },
          { name: 'Бельцы', lat: 47.7500, lng: 27.9167, type: 'city' as const, description: 'Крупный город в северной части Молдовы' },
          { name: 'Тирасполь', lat: 46.8333, lng: 29.6167, type: 'city' as const, description: 'Столица самопровозглашенной Приднестровской Молдавской Республики' },
          { name: 'Старый Орхей', lat: 47.4167, lng: 28.5000, type: 'attraction' as const, description: 'Археологический комплекс с пещерными монастырями на берегу Рыбницы' },
          { name: 'Винодельни Крикова', lat: 46.3167, lng: 28.4167, type: 'attraction' as const, description: 'Крупнейшее виноделие Молдовы с подземными галереями и дегустациями' },
          { name: 'Винодельни Милешть Мичь', lat: 46.5000, lng: 28.7000, type: 'attraction' as const, description: 'Семейное виноделие с органическими винами и уютной атмосферой' },
          { name: 'Сорокская крепость', lat: 47.8333, lng: 28.3333, type: 'attraction' as const, description: 'Средневековая крепость XIV века, один из символов Молдовы' },
          { name: 'Монастырь Кэприяна', lat: 47.0167, lng: 28.8500, type: 'attraction' as const, description: 'Один из старейших монастырей в Кишиневе с уникальной архитектурой' },
          { name: 'Национальный музей этнографии', lat: 47.0250, lng: 28.8333, type: 'attraction' as const, description: 'Музей с коллекцией археологических и этнографических экспонатов' },
          { name: 'Бендеры', lat: 46.8333, lng: 29.4667, type: 'city' as const, description: 'Исторический город на Днестре с крепостью и военной историей' },
          { name: 'Унгены', lat: 46.2000, lng: 28.5833, type: 'city' as const, description: 'Винодельный город на юге Молдовы, дом виноделен Purcari и Chateau Vartely' },
          { name: 'Комрат', lat: 46.3167, lng: 28.6500, type: 'city' as const, description: 'Столица Гагаузии, центр гагаузской культуры и традиций' },
          { name: 'Винодельня Purcari', lat: 46.2167, lng: 28.6000, type: 'attraction' as const, description: 'Одна из старейших виноделен Молдовы, основанная в 1827 году' },
          { name: 'Винодельня Chateau Vartely', lat: 46.1833, lng: 28.6167, type: 'attraction' as const, description: 'Современная винодельня с биодинамическим производством и винными турами' },
          { name: 'Музей археологии и этнографии в Сороках', lat: 47.8333, lng: 28.3333, type: 'attraction' as const, description: 'Музей с артефактами из средневековья и коллекцией этнографических экспонатов' },
          { name: 'Этнографический музей в Комрате', lat: 46.3167, lng: 28.6500, type: 'attraction' as const, description: 'Музей гагаузской культуры с традиционными костюмами и предметами быта' },
          { name: 'Площадь Мира', lat: 47.0000, lng: 28.8500, type: 'attraction' as const, description: 'Центральная площадь Кишинева с памятником Стефану Великому' },
          { name: 'Святой Воскресенский собор', lat: 47.0000, lng: 28.8500, type: 'attraction' as const, description: 'Главный православный храм Кишинева с византийской архитектурой' },
          { name: 'Бендерская крепость', lat: 46.8333, lng: 29.4667, type: 'attraction' as const, description: 'Средневековая крепость XVI века на берегу Днестра' }
        ];
      case 'rumyniya-gid':
        return [
          { name: 'Бухарест', lat: 44.4268, lng: 26.1025, type: 'city' as const, description: 'Столица Румынии, "Маленький Париж" с Дворцом Парламента' },
          { name: 'Дворец Парламента', lat: 44.4278, lng: 26.0872, type: 'attraction' as const, description: 'Второе по величине здание в мире, символ эпохи Чаушеску, 1100 комнат' },
          { name: 'Замок Бран', lat: 45.5145, lng: 25.3672, type: 'attraction' as const, description: 'Легендарный "Замок Дракулы" в Трансильвании' },
          { name: 'Сигишоара', lat: 46.2208, lng: 24.7909, type: 'city' as const, description: 'Средневековый город-крепость, родина Влада Цепеша' },
          { name: 'Клуж-Напока', lat: 46.7694, lng: 23.5900, type: 'city' as const, description: 'Культурная столица Трансильвании с университетской атмосферой' },
          { name: 'Замок Пелеш', lat: 45.3601, lng: 25.5427, type: 'attraction' as const, description: 'Королевский замок в Синее, первый электрифицированный замок Европы' },
          { name: 'Салина Турда', lat: 46.5747, lng: 23.7849, type: 'attraction' as const, description: 'Подземный город в соляной шахте с озером и арт-инсталляциями' },
          { name: 'Замок Корвин', lat: 45.7489, lng: 22.8814, type: 'attraction' as const, description: 'Готический замок в Хунедоаре, один из самых красивых в Европе' },
          { name: 'Констанца', lat: 44.1733, lng: 28.6369, type: 'city' as const, description: 'Крупнейший черноморский порт и курорт' },
          { name: 'Буковина', lat: 47.8100, lng: 25.9000, type: 'attraction' as const, description: 'Расписные монастыри Воронец и Молдовица - "Сикстинская капелла Востока"' },
          { name: 'Монастырь Воронец', lat: 47.5167, lng: 25.8667, type: 'attraction' as const, description: 'Расписной монастырь XV века, объект ЮНЕСКО, "Сикстинская капелла Востока"' },
          { name: 'Трансфэгэрашское шоссе', lat: 45.3728, lng: 24.6324, type: 'attraction' as const, description: 'Одна из самых красивых дорог мира через Карпаты' }
        ];
      case 'monaco':
        return [
          { name: 'Монте-Карло', lat: 43.7384, lng: 7.4246, type: 'city' as const, description: 'Символ роскоши и азарта, легендарное казино и оперный театр' },
          { name: 'Княжеский дворец', lat: 43.7325, lng: 7.4275, type: 'attraction' as const, description: 'Резиденция княжеской семьи смена караула в 11:55' },
          { name: 'Океанографический музей', lat: 43.7333, lng: 7.4250, type: 'attraction' as const, description: 'Музей морской биологии с 8000 морских обитателей' },
          { name: 'Кафедральный собор', lat: 43.7372, lng: 7.4218, type: 'attraction' as const, description: 'Усыпальница князей и их родственников в византийском стиле' },
          { name: 'Экзотический сад', lat: 43.7333, lng: 7.4200, type: 'attraction' as const, description: 'Ботанический оазис с редкими растениями и панорамным видом' },
          { name: 'Трасса Гран-при', lat: 43.7347, lng: 7.4225, type: 'attraction' as const, description: 'Самый престижный этап Формулы-1 по улицам Монако' },
          { name: 'Порт Монако', lat: 43.7361, lng: 7.4236, type: 'attraction' as const, description: 'Самая престижная яхтенная гавань мира с яхтами миллионеров' },
          { name: 'Рынок Ла-Кондамин', lat: 43.7361, lng: 7.4189, type: 'attraction' as const, description: 'Местная жизнь с продуктами, цветами, сувенирами и атмосферой провинции' },
          { name: 'Оперный театр Монте-Карло', lat: 43.7378, lng: 7.4250, type: 'attraction' as const, description: 'Музыкальная жемчужина с опера, балетом, классической музыкой' },
          { name: 'Пляжи Монако', lat: 43.7300, lng: 7.4250, type: 'resort' as const, description: 'Песчаные пляжи с чистотой, сервисом и шезлонгами от €25/день' }
        ];
      case 'liechtenstein':
        return [
          { name: 'Вадуц', lat: 47.1410, lng: 9.5215, type: 'city' as const, description: 'Столица Лихтенштейна (5.5 тыс.), замок Вадуц, музей искусств, парламент, центр княжества, долина Рейна, Альпы' },
          { name: 'Шан', lat: 47.1660, lng: 9.5100, type: 'city' as const, description: 'Старейший город Лихтенштейна (6 тыс.), замок Гутенберг, церковь, исторический центр, север страны, долина Рейна' },
          { name: 'Вильнеберг', lat: 47.1333, lng: 9.5500, type: 'city' as const, description: 'Город с замком Вильнеберг (2 тыс.), руины замка XIII века, панорамные виды, центр страны, горы' },
          { name: 'Бендэр', lat: 47.1833, lng: 9.5333, type: 'city' as const, description: 'Город с историческим центром (1.5 тыс.), церковь, традиционная архитектура, север страны, долина Рейна' },
          { name: 'Гамприн', lat: 47.2167, lng: 9.5167, type: 'city' as const, description: 'Город с пещерами и природными достопримечательностями (1.6 тыс.), пещера Тризенберг, горы, север страны, Альпы' },
          { name: 'Маурен', lat: 47.2333, lng: 9.5833, type: 'city' as const, description: 'Город с замком Монфорте (4 тыс.), руины замка, церковь, север страны, долина Рейна, близость к Австрии' },
          { name: 'Планкен', lat: 47.1833, lng: 9.6000, type: 'city' as const, description: 'Самый маленький муниципалитет Лихтенштейна (500 жителей), горы, панорамные виды, север страны, Альпы, граница с Австрией' },
          { name: 'Руггелль', lat: 47.2500, lng: 9.5333, type: 'city' as const, description: 'Город с замком Руггелль (2 тыс.), руины замка, церковь, север страны, долина Рейна, близость к Швейцарии' },
          { name: 'Шелленберг', lat: 47.2333, lng: 9.5500, type: 'city' as const, description: 'Город с замком Шелленберг (1 тыс.), руины замка, музей, север страны, долина Рейна, граница с Австрией' },
          { name: 'Тризен', lat: 47.1167, lng: 9.5333, type: 'city' as const, description: 'Город с замком Тризен (5 тыс.), руины замка, церковь, центр страны, долина Рейна, горы' }
        ];
      case 'luxembourg':
        return [
          { name: 'Люксембург', lat: 49.6116, lng: 6.1319, type: 'city' as const, description: 'Столица Люксембурга (120 тыс.), расположена в долине реки Альзетт, старые кварталы и укрепления - объект ЮНЕСКО, дворец, собор' },
          { name: 'Вишинген', lat: 49.7500, lng: 6.0833, type: 'city' as const, description: 'Город в северной части страны (15 тыс.), известен своими крепостями и средневековой архитектурой, замок, река Мозель, граница с Германией' },
          { name: 'Эш-сюр-Альзетт', lat: 49.5000, lng: 6.0000, type: 'city' as const, description: 'Второй по величине город Люксембурга (35 тыс.), промышленный центр, сталелитейная история, музеи, близость к французской границе' },
          { name: 'Замок Вишинген', lat: 49.7500, lng: 6.0833, type: 'attraction' as const, description: 'Средневековая крепость на горе, объект Всемирного наследия ЮНЕСКО, X век, панорамные виды, река Мозель, музей' },
          { name: 'Государственный музей истории искусства', lat: 49.6117, lng: 6.1317, type: 'attraction' as const, description: 'Музей с коллекцией европейской живописи и скульптур, центр Люксембурга, искусство XIV-XX веков, временные выставки' },
          { name: 'Национальный музей Люксембурга', lat: 49.6117, lng: 6.1317, type: 'attraction' as const, description: 'Музей истории и культуры страны, археология, этнография, центр Люксембурга, постоянные и временные выставки' },
          { name: 'Парк Большой-Дюк', lat: 49.6167, lng: 6.1167, type: 'attraction' as const, description: 'Роскошный парк в центре столицы с английским пейзажем, фонтаны, скульптуры, популярное место для прогулок, бесплатный вход' },
          { name: 'Рокк Брунье', lat: 49.6000, lng: 6.1333, type: 'attraction' as const, description: 'Исторический квартал столицы с музеем современного искусства, укрепления, панорамные виды, долина Альзетт, объект ЮНЕСКО' },
          { name: 'Мюнстер', lat: 49.6103, lng: 6.1283, type: 'attraction' as const, description: 'Кафедральный собор в готическом стиле в центре Люксембурга, XVII век, крипта, витражи, главный храм страны' },
          { name: 'Долина Мозеля', lat: 49.7000, lng: 6.2000, type: 'attraction' as const, description: 'Винодельческий регион с живописными виноградниками и деревнями, река Мозель, дегустации, граница с Германией, восток Люксембурга' }
        ];
      case 'macau':
        return [
          { name: 'Полуостров Макао', lat: 22.1987, lng: 113.5439, type: 'city' as const, description: 'Исторический центр Макао с Руинами собора Святого Павла' },
          { name: 'Котай', lat: 22.1500, lng: 113.5667, type: 'city' as const, description: 'Современный курортный район с крупными казино' },
          { name: 'Тайпа', lat: 22.1833, lng: 113.5500, type: 'city' as const, description: 'Традиционная китайская деревня с рынком' },
          { name: 'Руины собора Святого Павла', lat: 22.1987, lng: 113.5439, type: 'attraction' as const, description: 'Символ Макао, фасад бывшего Иезуитского колледжа' },
          { name: 'Площадь Сенадо', lat: 22.1900, lng: 113.5450, type: 'attraction' as const, description: 'Сердце исторического центра с португальской мозаикой' },
          { name: 'Башня Макао', lat: 22.1600, lng: 113.5550, type: 'attraction' as const, description: 'Смотровая площадка и банджи-джампинг, 338 метров' },
          { name: 'Venetian Macao', lat: 22.1500, lng: 113.5667, type: 'attraction' as const, description: 'Крупнейшее казино в Азии, копия Венеции с гондалами' },
          { name: 'Parisian Macao', lat: 22.1500, lng: 113.5667, type: 'attraction' as const, description: 'Казино с копией Эйфелевой башни' },
          { name: 'Храм А-Ма', lat: 22.1833, lng: 113.5500, type: 'attraction' as const, description: 'Самый древний храм Макао, покровительница рыбаков' },
          { name: 'Казино Wynn Macau', lat: 22.1500, lng: 113.5667, type: 'attraction' as const, description: 'Роскошное казино с интерьером из цветов' }
        ];
      case 'madagascar':
        return [
          { name: 'Антананариву', lat: -18.9137, lng: 47.5361, type: 'city' as const, description: 'Столица Мадагаскара (1.3 млн), расположена на холмах, королевский дворец Рува, рынки, зоопарк, музеи, ворота в национальные парки' },
          { name: 'Аллея баобабов', lat: -23.3529, lng: 45.2558, type: 'attraction' as const, description: 'Группа гигантских баобабов, лучшее место для заката на Мадагаскаре' },
          { name: 'Национальный парк Андасибе-Мантадия', lat: -19.0000, lng: 48.4167, type: 'attraction' as const, description: 'Дом лемуров, более 100 видов птиц и лемуров' },
          { name: 'Национальный парк Исалу', lat: -22.5500, lng: 45.4000, type: 'attraction' as const, description: 'Уникальные каменные формации, природные бассейны и каньоны' },
          { name: 'Фианаранцова', lat: -21.4536, lng: 47.0858, type: 'city' as const, description: 'Центральный город на возвышенности, духовные традиции' },
          { name: 'Тулеар (Тулиар)', lat: -23.3500, lng: 43.6667, type: 'city' as const, description: 'Южный побережный город с пляжами и водными видами спорта' },
          { name: 'Диего-Суарес (Анциранана)', lat: -12.3333, lng: 49.3000, type: 'city' as const, description: 'Северный город с красивой бухтой и национальным парком Масоала' },
          { name: 'Пляжи Носи-Бе', lat: -13.3333, lng: 48.5000, type: 'resort' as const, description: 'Коралловые рифы и белоснежные пляжи, дайвинг и сноркелинг' },
          { name: 'Национальный парк Цинги-де-Бемараха', lat: -17.8500, lng: 44.1000, type: 'attraction' as const, description: 'Уникальные карстовые образования, "каменный лес" из острых пиков' },
          { name: 'Национальный парк Раномафана', lat: -21.4500, lng: 47.3333, type: 'attraction' as const, description: 'Тропические леса и реки, водопады и горячие источники' }
        ];
      case 'mali':
        return [
          { name: 'Бамако', lat: 12.6500, lng: -8.0000, type: 'city' as const, description: 'Столица Мали (2.5 млн), расположена на реке Нигер, рынки, музеи, музыкальная столица Западной Африки, мосты' },
          { name: 'Дженне', lat: 13.9000, lng: -4.5500, type: 'attraction' as const, description: 'Древний город из глины, Великая мечеть Дженне, объект ЮНЕСКО' },
          { name: 'Тимбукту', lat: 16.7735, lng: -3.0074, type: 'attraction' as const, description: 'Легендарный город золота, центр исламской учености Средневековья, объект ЮНЕСКО' },
          { name: 'Мопти', lat: 14.4833, lng: -4.1833, type: 'city' as const, description: '"Венеция Мали", город на дельте реки Нигер, центр рыбной промышленности' },
          { name: 'Сикасо', lat: 11.3333, lng: -5.6667, type: 'city' as const, description: 'Южные ворота страны, известен мечетью Маккаран и золотыми приисками' },
          { name: 'Утес Бандиагара', lat: 14.5000, lng: -3.5000, type: 'attraction' as const, description: 'Страна догонов, песчаниковые скалы высотой до 500 метров, объект ЮНЕСКО' },
          { name: 'Национальный музей Мали', lat: 12.6500, lng: -8.0000, type: 'attraction' as const, description: 'Хранитель истории Мали, коллекция артефактов империи Мали' },
          { name: 'Большой рынок Бамако', lat: 12.6500, lng: -8.0000, type: 'attraction' as const, description: 'Один из крупнейших рынков Западной Африки, торговый центр страны' },
          { name: 'Национальный парк Букль дю Бауле', lat: 14.5000, lng: -1.5000, type: 'attraction' as const, description: 'Крупнейший парк страны, обитание слонов и других животных саванны' },
          { name: 'Гробницы Аскии в Гао', lat: 16.2667, lng: -0.0500, type: 'attraction' as const, description: 'Мавзолей Мухаммеда I Аскии, пирамидальная гробница, объект ЮНЕСКО' }
        ];
      case 'malta':
        return [
          { name: 'Валлетта', lat: 35.8989, lng: 14.5146, type: 'city' as const, description: 'Столица Мальты, объект ЮНЕСКО, Собор Святого Иоанна и Дворец Великого Магистра' },
          { name: 'Гозо', lat: 36.0562, lng: 14.2545, type: 'attraction' as const, description: '"Жемчужина Мальты", Цитадель в Виктории и храмы Джгантия, объект ЮНЕСКО' },
          { name: 'Сент-Джулианс', lat: 35.9167, lng: 14.4833, type: 'resort' as const, description: 'Курортный район с Пиратской бухтой, поп-клубами и казино' },
          { name: 'Слима', lat: 35.8983, lng: 14.5125, type: 'city' as const, description: 'Исторический курорт с Храмом Тригранты и форт Тинту' },
          { name: 'Мдина', lat: 35.8869, lng: 14.4025, type: 'attraction' as const, description: '"Молчаливый город", средневековая столица с узкими улочками' },
          { name: 'Гипогей Хал-Сафлиени', lat: 35.8833, lng: 14.5167, type: 'attraction' as const, description: 'Подземное святилище, объект ЮНЕСКО, единственное подземное святилище в мире' },
          { name: 'Храмы Джгантия', lat: 36.0461, lng: 14.2525, type: 'attraction' as const, description: 'Мегалитические храмы старше пирамид Гизы, объект ЮНЕСКО' },
          { name: 'Голубой грот', lat: 35.9000, lng: 14.4000, type: 'attraction' as const, description: 'Природное чудо с бирюзовым свечением воды' },
          { name: 'Цитадель Гозо', lat: 36.0562, lng: 14.2545, type: 'attraction' as const, description: 'Крепость на холме с панорамой, часть объекта ЮНЕСКО "Город Валлетта"' },
          { name: 'Марса-Гранд-Харбор', lat: 35.8833, lng: 14.5167, type: 'attraction' as const, description: '"Великая гавань", главная военно-морская база рыцарей' }
        ];
      case 'mauritania':
        return [
          { name: 'Нуакшот', lat: 18.0735, lng: -15.9582, type: 'city' as const, description: 'Столица Мавритании, расположена на побережье Атлантического океана' },
          { name: 'Нуадибу', lat: 20.9333, lng: -17.0333, type: 'city' as const, description: 'Второй по величине город Мавритании, важный порт и рыболовецкий центр' },
          { name: 'Шингетти', lat: 20.2333, lng: -12.0167, type: 'attraction' as const, description: 'Исторический город-ксар, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Уадан', lat: 20.8167, lng: -11.2000, type: 'attraction' as const, description: 'Город золотых песков, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Тишит', lat: 20.2500, lng: -11.1333, type: 'attraction' as const, description: 'Город с уникальной архитектурой, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Уалата', lat: 20.8333, lng: -11.2833, type: 'attraction' as const, description: 'Последний из городов-ксаров ЮНЕСКО, известен расписными фасадами' },
          { name: 'Атар', lat: 20.5167, lng: -13.0500, type: 'city' as const, description: 'Город в центре плато Адрар, ворота в пустыню' },
          { name: 'Структура Ришат (Глаз Сахары)', lat: 21.0733, lng: -11.4000, type: 'attraction' as const, description: 'Геологическая структура диаметром 40 км, видна из космоса' },
          { name: 'Национальный парк Банк-д\'Арген', lat: 16.5000, lng: -11.5000, type: 'attraction' as const, description: 'Крупнейший птичий заповедник Африки, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Железная дорога Зуэрат-Нуадибу', lat: 22.0000, lng: -15.0000, type: 'attraction' as const, description: '704 км железной дороги в пустыне, единственная железная дорога страны' }
        ];
      case 'marshall-islands':
        return [
          { name: 'Маджуро', lat: 7.0897, lng: 171.3805, type: 'city' as const, description: 'Столица Маршалловых Островов (28 тыс.), расположена на атолле Маджуро, пляжи, лагуны, дайвинг, традиционная культура, музеи' },
          { name: 'Бикини', lat: 11.5833, lng: 165.3667, type: 'attraction' as const, description: 'Атолл с ядерным наследием, где проводились американские ядерные испытания' },
          { name: 'Кваджалейн', lat: 8.7167, lng: 167.7333, type: 'attraction' as const, description: 'Крупнейшая лагуна мира, военная база США, объекты ядерных испытаний' },
          { name: 'Эниветок', lat: 11.3333, lng: 162.3333, type: 'attraction' as const, description: 'Атолл с ядерными испытаниями и научными исследованиями, знаменитый памятник Эниветок' },
          { name: 'Ронгелап', lat: 11.1667, lng: 166.8667, type: 'attraction' as const, description: 'Атолл, пострадавший от ядерных испытаний, пример экологического восстановления' },
          { name: 'Утирик', lat: 11.2333, lng: 169.8500, type: 'attraction' as const, description: 'Самый удаленный атолл, традиционный образ жизни маршалльцев' },
          { name: 'Малоэлап', lat: 8.9000, lng: 171.2000, type: 'attraction' as const, description: 'Атолл с богатой историей и традиционными ремеслами' },
          { name: 'Вото', lat: 9.5167, lng: 170.2333, type: 'attraction' as const, description: 'Атолл с живописными пляжами и кристальной водой' },
          { name: 'Аур', lat: 8.1500, lng: 171.1667, type: 'attraction' as const, description: 'Маленький атолл с нетронутой природой и традиционными деревнями' }
        ];
      case 'micronesia':
        return [
          { name: 'Паликир', lat: 6.9167, lng: 158.1500, type: 'city' as const, description: 'Столица Микронезии на острове Понпеи' },
          { name: 'Нан-Мадол', lat: 6.8400, lng: 158.3300, type: 'attraction' as const, description: '"Венеция Тихого океана" - древний город на искусственных островах' },
          { name: 'Лагуна Чуук', lat: 7.4500, lng: 151.8500, type: 'attraction' as const, description: 'Крупнейшее подводное кладбище мира с затонувшими кораблями WWII' },
          { name: 'Каменные деньги Яп', lat: 9.5300, lng: 138.1200, type: 'attraction' as const, description: 'Гигантские каменные диски, используемые как валюта' },
          { name: 'Манты Яп', lat: 9.5000, lng: 138.1000, type: 'attraction' as const, description: 'Круглогодичные встречи с мантами размахом до 7 метров' },
          { name: 'Водопады Кепрохи', lat: 6.8800, lng: 158.2200, type: 'attraction' as const, description: 'Каскад водопадов в тропическом дождевом лесу Понпеи' },
          { name: 'Пляж Лелу', lat: 5.3200, lng: 163.0000, type: 'resort' as const, description: 'Нетронутый коралловый пляж на острове Косраэ' },
          { name: 'Гора Доловекап', lat: 6.8900, lng: 158.1900, type: 'attraction' as const, description: 'Высшая точка Понпеи (782 м) с панорамными видами' }
        ];
      case 'mauritius':
        return [
          { name: 'Порт-Луи', lat: -20.1619, lng: 57.4984, type: 'city' as const, description: 'Столица Маврикия (150 тыс.), порт на Индийском океане, форт Аделаида, рынки, музей, ипподром, креольская архитектура' },
          { name: 'Гора Ле-Морн-Брабан', lat: -20.4417, lng: 57.3833, type: 'attraction' as const, description: 'Символ борьбы с рабством, объект Всемирного наследия ЮНЕСКО, высота 556 метров' },
          { name: 'Семицветные пески Шамарель', lat: -20.3969, lng: 57.5769, type: 'attraction' as const, description: 'Уникальное геологическое явление с песком семи различных цветов' },
          { name: 'Национальный парк Блэк-Ривер-Горджес', lat: -20.3467, lng: 57.4167, type: 'attraction' as const, description: 'Крупнейший национальный парк, защищающий остатки эндемичных тропических лесов' },
          { name: 'Гранд-Баи', lat: -20.0333, lng: 57.5833, type: 'resort' as const, description: 'Туристический центр севера с лучшими пляжами и водными видами спорта' },
          { name: 'Ботанический сад Памплемус', lat: -20.0833, lng: 57.5333, type: 'attraction' as const, description: 'Старейший ботанический сад в южном полушарии, основан в 1735 году' },
          { name: 'Флик-эн-Флак', lat: -20.2667, lng: 57.3667, type: 'resort' as const, description: 'Самый длинный пляж острова (7 км), спокойное море, идеально для семейного отдыха' },
          { name: 'Касела Парк', lat: -20.2000, lng: 57.5167, type: 'attraction' as const, description: 'Природный и приключенческий парк с подвесными мостами, зип-лайнами и животными' },
          { name: 'Остров Иль-о-Серф', lat: -20.0833, lng: 57.5500, type: 'attraction' as const, description: '"Олений остров", популярное место для однодневных поездок с прекрасными пляжами' },
          { name: 'Водопад Шамарель', lat: -20.3969, lng: 57.5769, type: 'attraction' as const, description: 'Красивый водопад высотой 100 метров рядом с семицветными песками' }
        ];
      case 'myanmar':
        return [
          { name: 'Янгон', lat: 16.8661, lng: 96.1951, type: 'city' as const, description: 'Крупнейший город Мьянмы, бывшая столица Рангун' },
          { name: 'Баган', lat: 21.1667, lng: 94.8667, type: 'attraction' as const, description: 'Археологический район с более чем 2000 буддийскими храмами и пагодами, объект ЮНЕСКО, XI-XIII века' },
          { name: 'Мандалай', lat: 21.9588, lng: 96.0891, type: 'city' as const, description: 'Второй по величине город Мьянмы (1.2 млн), последняя королевская столица, Королевский дворец, пагода Махамуни, холм Мандалай' },
          { name: 'Королевский дворец Мандалая', lat: 21.9950, lng: 96.1089, type: 'attraction' as const, description: 'Последний королевский дворец Бирмы, восстановлен, объект культурного наследия, XIX век' },
          { name: 'Озеро Инле', lat: 20.6000, lng: 96.9000, type: 'attraction' as const, description: 'Высокогорное озеро с плавучими деревнями и водными садами' },
          { name: 'Пагода Шведагон', lat: 16.7967, lng: 96.1597, type: 'attraction' as const, description: 'Самая священная пагода Мьянмы, покрыта золотом' },
          { name: 'Нгапали', lat: 18.4000, lng: 94.3167, type: 'resort' as const, description: 'Один из лучших пляжных курортов страны' },
          { name: 'Качин', lat: 25.8333, lng: 97.0000, type: 'attraction' as const, description: 'Северный регион с самой высокой точкой страны Хака' },
          { name: 'Мраук-У', lat: 20.1333, lng: 92.8833, type: 'attraction' as const, description: 'Древняя столица Араканского царства с развалинами храмов' }
        ];
      case 'mongolia-gid':
        return [
          { name: 'Улан-Батор', lat: 47.9212, lng: 106.9055, type: 'city' as const, description: 'Столица Монголии, современная столица с традиционными районами' },
          { name: 'Каракорум', lat: 47.2000, lng: 102.5000, type: 'attraction' as const, description: 'Древняя столица империи Чингисхана, монастырь Эрдэнэ-Зуу, XIII век' },
          { name: 'Пустыня Гоби', lat: 44.5000, lng: 106.0000, type: 'attraction' as const, description: 'Песчаные дюны, динозавры, экстремальный климат' },
          { name: 'Озеро Хубсугул', lat: 50.2500, lng: 100.5000, type: 'attraction' as const, description: '"Голубая жемчужина" Монголии, тайга, река Селенга' },
          { name: 'Алтайские горы', lat: 48.5000, lng: 89.0000, type: 'attraction' as const, description: 'Горы с петроглифами, озеро Дурген, беркутчи' },
          { name: 'Эрдэнэ-Зуу', lat: 47.2000, lng: 102.5000, type: 'attraction' as const, description: 'Самый древний монгольский буддийский монастырь, объект ЮНЕСКО, XVI век' },
          { name: 'Наадам', lat: 47.9212, lng: 106.9055, type: 'attraction' as const, description: 'Праздник национальных видов спорта: борьба, конные скачки, стрельба из лука' },
          { name: 'Ханги-Нуур', lat: 45.5000, lng: 103.0000, type: 'attraction' as const, description: 'Крупнейший заповедник Монголии с дикой природой' }
        ];
      case 'montenegro':
        return [
          { name: 'Подгорица', lat: 42.4304, lng: 19.2594, type: 'city' as const, description: 'Столица Черногории, современный город с богатой историей' },
          { name: 'Котор', lat: 42.4243, lng: 18.7702, type: 'city' as const, description: 'Средневековый город в фьорде, объект Всемирного наследия ЮНЕСКО' },
          { name: 'Будва', lat: 42.2865, lng: 18.8409, type: 'city' as const, description: 'Популярный курорт с древним Старым городом и живой ночной жизнью' },
          { name: 'Бар', lat: 42.0903, lng: 19.1031, type: 'city' as const, description: 'Южный портовый город с историческим комплексом Старого Бара' },
          { name: 'Цетине', lat: 42.3921, lng: 18.6665, type: 'city' as const, description: 'Историческая столица и духовный центр с монастырем Цетиния' },
          { name: 'Бока-Которский залив', lat: 42.4000, lng: 18.7500, type: 'attraction' as const, description: 'Самый южный фьорд Европы с драматическими пейзажами' },
          { name: 'Национальный парк Дурмитор', lat: 43.1000, lng: 19.1000, type: 'attraction' as const, description: 'Горный массив с озерами и каньоном реки Тара, объект ЮНЕСКО' },
          { name: 'Каньон реки Тара', lat: 43.1000, lng: 19.5000, type: 'attraction' as const, description: 'Самый глубокий каньон в Европе, до 1300 метров, объект ЮНЕСКО' },
          { name: 'Озеро Скадар', lat: 42.2000, lng: 19.1000, type: 'attraction' as const, description: 'Крупнейшее озеро на Балканах с богатой экосистемой' },
          { name: 'Монастырь Острог', lat: 42.9833, lng: 19.6167, type: 'attraction' as const, description: 'Монастырь в скале на высоте 1000 метров, важное религиозное место' }
        ];
      case 'morocco':
        return [
          { name: 'Рабат', lat: 34.0209, lng: -6.8416, type: 'city' as const, description: 'Столица Марокко, расположена на побережье Атлантического океана' },
          { name: 'Касабланка', lat: 33.5731, lng: -7.5898, type: 'city' as const, description: 'Крупнейший город и экономический центр Марокко' },
          { name: 'Фес', lat: 34.0333, lng: -5.0000, type: 'city' as const, description: 'Культурная столица Марокко с древней мединой, объект ЮНЕСКО' },
          { name: 'Марракеш', lat: 31.6300, lng: -8.0089, type: 'city' as const, description: 'Исторический город с красными кирпичами, площадь Джемаа эль-Фна' },
          { name: 'Мекнес', lat: 33.8950, lng: -5.5547, type: 'city' as const, description: 'Императорский город с воротами Баб-эль-Мансур' },
          { name: 'Волюбилис', lat: 34.0744, lng: -5.5553, type: 'attraction' as const, description: 'Римские руины, объект ЮНЕСКО, триумфальная арка, мозаики, II-III века' },
          { name: 'Медина Феса', lat: 34.0181, lng: -5.0060, type: 'attraction' as const, description: 'Крупнейшая пешеходная зона в мире, объект ЮНЕСКО' },
          { name: 'Мечеть Хасана II', lat: 33.6069, lng: -7.6200, type: 'attraction' as const, description: 'Самая большая мечеть в Африке с морским видом' },
          { name: 'Пустыня Сахара', lat: 29.9500, lng: -6.0000, type: 'attraction' as const, description: 'Золотые дюны Эрг Шебби и Эрг Чигага' },
          { name: 'Горы Атлас', lat: 31.0000, lng: -7.0000, type: 'attraction' as const, description: 'Горная система с высшей точкой Тубкаль (4167 м)' },
          { name: 'Шафшауэн', lat: 35.1667, lng: -5.2667, type: 'city' as const, description: '"Голубой город" в горах Риф с живописными улочками' }
        ];
      case 'north-macedonia-gid':
        return [
          { name: 'Скопье', lat: 41.9973, lng: 21.4280, type: 'city' as const, description: 'Столица Северной Македонии с османским базаром Чаршия и крепостью Кале' },
          { name: 'Охрид', lat: 41.1086, lng: 20.8003, type: 'city' as const, description: 'Город-музей под открытым небом, объект ЮНЕСКО с 365 церквями' },
          { name: 'Каньон Матка', lat: 41.9667, lng: 21.3000, type: 'attraction' as const, description: 'Самый глубокий каньон в Европе с изумрудной водой и пещерами' },
          { name: 'Битола', lat: 41.0297, lng: 21.3347, type: 'city' as const, description: 'Консульская столица с османской архитектурой и античной Гераклеей' },
          { name: 'Национальный парк Маврово', lat: 41.6500, lng: 20.7500, type: 'attraction' as const, description: 'Горный национальный парк с озером Маврово и лыжным курортом Попова Шапка' },
          { name: 'Струмица', lat: 41.4378, lng: 22.6436, type: 'city' as const, description: 'Город фестивалей с карнавалом и термальными источниками' },
          { name: 'Крива Паланка', lat: 42.2000, lng: 22.3333, type: 'city' as const, description: 'Винодельческий регион с традиционной архитектурой' },
          { name: 'Охридское озеро', lat: 41.1086, lng: 20.8003, type: 'attraction' as const, description: 'Самое древнее озеро в Европе, объект ЮНЕСКО с кристально чистой водой' },
          { name: 'Монастырь Св. Наума', lat: 40.9139, lng: 20.7347, type: 'attraction' as const, description: 'IX-вековом монастырь на берегу озера Охрид с источниками' },
          { name: 'Кокино', lat: 42.2667, lng: 21.9500, type: 'attraction' as const, description: 'Мегалитическая обсерватория бронзового века, 4-я в мире по важности' }
        ];
      case 'mozambique':
        return [
          { name: 'Мапуту', lat: -25.9692, lng: 32.5732, type: 'city' as const, description: 'Столица Мозамбика (1.1 млн), порт на Индийском океане, форт, железнодорожный вокзал, рынки, пляжи, португальская архитектура' },
          { name: 'Архипелаг Базаруто', lat: -21.6667, lng: 35.3333, type: 'resort' as const, description: 'Национальный морской парк с лучшими пляжами и дайвингом' },
          { name: 'Остров Мозамбик', lat: -15.0333, lng: 40.7333, type: 'attraction' as const, description: 'Объект Всемирного наследия ЮНЕСКО с португальской архитектурой' },
          { name: 'Пляж Тофу', lat: -23.8333, lng: 35.4667, type: 'attraction' as const, description: 'Популярное место для дайвинга с китовыми акулами' },
          { name: 'Национальный парк Горонгоса', lat: -18.8333, lng: 34.5000, type: 'attraction' as const, description: 'Сафари-парк с богатой фауной' },
          { name: 'Барра', lat: -23.5833, lng: 35.3333, type: 'resort' as const, description: 'Курорт с отличными условиями для кайтсерфинга, Индийский океан, пляжи, ветра, популярное место для водных видов спорта, юг Мозамбика' },
          { name: 'Пемба', lat: -12.9667, lng: 40.5167, type: 'city' as const, description: 'Северный город с белыми песчаными пляжами (200 тыс.), порт, коралловые рифы, дайвинг, близость к архипелагу Квиримбас, север Мозамбика' },
          { name: 'Виланкулос', lat: -22.0167, lng: 35.3167, type: 'city' as const, description: 'Ворота к архипелагу Базаруто (25 тыс.), пляжи, дайвинг, курорты, национальный парк, юг Мозамбика, Индийский океан' }
        ];
      case 'namibia':
        return [
          { name: 'Виндхук', lat: -22.5594, lng: 17.0832, type: 'city' as const, description: 'Столица Намибии (325 тыс.), расположена на высоте 1650 м, немецкая архитектура, церковь Христа, музеи, ворота в пустыню Намиб' },
          { name: 'Соссусфлей', lat: -24.7667, lng: 15.2833, type: 'attraction' as const, description: 'Гигантские красные дюны (до 325 м) и мертвые деревья, лучшие восходы и закаты, пустыня Намиб, национальный парк, центр Намибии' },
          { name: 'Национальный парк Этоша', lat: -18.8333, lng: 16.3333, type: 'attraction' as const, description: 'Крупнейший национальный парк Намибии (22 270 км²) с соляным плато и дикой природой, слоны, львы, жирафы, север страны' },
          { name: 'Свакопмунд', lat: -22.6667, lng: 14.5333, type: 'city' as const, description: 'Прибрежный город с немецкой архитектурой (45 тыс.), центр экстремальных видов спорта, дюны, Атлантический океан, запад Намибии' },
          { name: 'Каньон Фиш-Ривер', lat: -27.6333, lng: 17.8167, type: 'attraction' as const, description: 'Второй по величине каньон в мире, 160 км длины и до 550 м глубины, река Фиш, треккинг, юг Намибии, популярное место' },
          { name: 'Валвис-Бей', lat: -22.9576, lng: 14.5059, type: 'city' as const, description: 'Крупнейший порт страны с лагуной фламинго (85 тыс.), Атлантический океан, водные виды спорта, запад Намибии, близость к Свакопмунду' },
          { name: 'Оазис Гоуб', lat: -26.5833, lng: 15.0000, type: 'attraction' as const, description: 'Круглое озеро посреди пустыни, природное чудо, диаметр 100 м, глубина 55 м, популярное место для фото, юг Намибии' },
          { name: 'Людериц', lat: -26.6461, lng: 15.1617, type: 'city' as const, description: 'Прибрежный город с оазисом Гоуб и рыбным рынком (15 тыс.), немецкая архитектура, Атлантический океан, юг Намибии, близость к Гоубу' },
          { name: 'Дамараленд', lat: -20.0000, lng: 15.0000, type: 'attraction' as const, description: 'Земля наскальных рисунков Твифелфонтейн, объект Всемирного наследия ЮНЕСКО, петроглифы (6 тыс. лет), центр Намибии, горы' },
          { name: 'Кейп-Кросс', lat: -21.8333, lng: 14.2500, type: 'attraction' as const, description: 'Историческое место высадки португальцев в 1485 году с колонией тюленей (100 тыс.), Атлантический океан, запад Намибии, заповедник' }
        ];
      case 'nauru-gid':
        return [
          { name: 'Ярен', lat: -0.5472, lng: 166.9208, type: 'city' as const, description: 'Де-факто столица Науру (1.1 тыс.), расположена на острове, парламент, аэропорт, фосфатные шахты, пляжи, коралловые рифы' },
          { name: 'Озеро Буада', lat: -0.5333, lng: 166.9167, type: 'attraction' as const, description: 'Единственное пресноводное озеро страны, оазис среди фосфатных пустошей' },
          { name: 'Фосфатные пиннаклы', lat: -0.5167, lng: 166.9333, type: 'attraction' as const, description: 'Лунный пейзаж из острых известняковых башен, оставшихся после добычи фосфатов' },
          { name: 'Аэропорт Науру', lat: -0.5167, lng: 166.9333, type: 'airport' as const, description: 'Единственный аэропорт страны, принимающий международные рейсы из Брисбена' },
          { name: 'Парламент Науру', lat: -0.5500, lng: 166.9167, type: 'attraction' as const, description: 'Парламент самой маленькой республики мира с 19 депутатами' },
          { name: 'Церковь Науру Конгрегейшенал', lat: -0.5472, lng: 166.9208, type: 'attraction' as const, description: 'Главная протестантская церковь страны, построенная в 1907 году' },
          { name: 'Пляж Аниво', lat: -0.5167, lng: 166.9000, type: 'resort' as const, description: 'Единственный пригодный для купания пляж острова с белым коралловым песком' },
          { name: 'Мемориал японских пушек', lat: -0.5500, lng: 166.9500, type: 'attraction' as const, description: 'Остатки японской оккупации 1942-1945 годов с артиллерийскими орудиями' },
          { name: 'Стадион Linktett', lat: -0.5472, lng: 166.9125, type: 'attraction' as const, description: 'Национальный стадион на 3500 мест для футбольных матчей и австралийского футбола' },
          { name: 'Пещера Моква', lat: -0.5333, lng: 166.9000, type: 'attraction' as const, description: 'Известняковая пещера на побережье с сталактитами и летучими мышами' }
        ];
      case 'new-zealand-gid':
        return [
          { name: 'Окленд', lat: -36.8485, lng: 174.7622, type: 'city' as const, description: 'Крупнейший город Новой Зеландии, "город парусов", Sky Tower' },
          { name: 'Квинстаун', lat: -45.0312, lng: 168.6626, type: 'city' as const, description: 'Мировая столица экстрима, фьорды, банджи-джампинг' },
          { name: 'Милфорд-Саунд', lat: -44.6414, lng: 167.9189, type: 'attraction' as const, description: 'Самый известный фьорд Новой Зеландии, водопады, дикая природа' },
          { name: 'Хоббитон', lat: -37.8622, lng: 175.6762, type: 'attraction' as const, description: 'Съемочная площадка "Властелина колец", декорации, чаепитие' },
          { name: 'Роторуа', lat: -38.1368, lng: 176.2533, type: 'city' as const, description: 'Горячие источники, геотермальные чудеса, культура маори' },
          { name: 'Ледник Фокс', lat: -43.4861, lng: 170.0136, type: 'attraction' as const, description: 'Доступный альпийский ледник, пешая экскурсия' },
          { name: 'Кафедральная бухта', lat: -46.1691, lng: 167.5679, type: 'attraction' as const, description: 'Арки из песчаника, дикая природа, круизы' },
          { name: 'Веллингтон', lat: -41.2865, lng: 174.7762, type: 'city' as const, description: 'Столица Новой Зеландии, ветреная, музеи' },
          { name: 'Ледник Франца-Йозефа', lat: -43.3833, lng: 170.1667, type: 'attraction' as const, description: 'Ледник, альпийские пейзажи, проводник' },
          { name: 'Абель Тасман', lat: -40.8344, lng: 173.0292, type: 'attraction' as const, description: 'Национальный парк, золотой пляж, тропы, каякинг' }
        ];
      case 'niderlandy-gid':
        return [
          { name: 'Амстердам', lat: 52.3676, lng: 4.9041, type: 'city' as const, description: 'Столица Нидерландов, город каналов и музеев' },
          { name: 'Роттердам', lat: 51.9244, lng: 4.4777, type: 'city' as const, description: 'Крупнейший порт Европы (650 тыс.), современная архитектура, кубические дома, мост Эразма, музеи, ночная жизнь' },
          { name: 'Гаага', lat: 52.0705, lng: 4.3007, type: 'city' as const, description: 'Политическая столица, дом музея Маурицхёйс' },
          { name: 'Утрехт', lat: 52.0907, lng: 5.1214, type: 'city' as const, description: 'Средневековый город, Домский собор, каналы с набережными' },
          { name: 'Рейксмузеум', lat: 52.3600, lng: 4.8852, type: 'attraction' as const, description: 'Крупнейший музей Нидерландов с коллекцией Рембрандта' },
          { name: 'Музей Ван Гога', lat: 52.3584, lng: 4.8811, type: 'attraction' as const, description: 'Музей с крупнейшей коллекцией Ван Гога' },
          { name: 'Кёкенхоф', lat: 52.2688, lng: 4.5464, type: 'attraction' as const, description: 'Парк тюльпанов, работает только в апреле-мае' },
          { name: 'Каналы Амстердама', lat: 52.3702, lng: 4.8952, type: 'attraction' as const, description: 'Система каналов 17 века, объект ЮНЕСКО' },
          { name: 'Киндердайк', lat: 51.8839, lng: 4.6395, type: 'attraction' as const, description: '19 ветряных мельниц XVIII века, объект ЮНЕСКО' },
          { name: 'Гитхорн', lat: 52.7386, lng: 6.0765, type: 'attraction' as const, description: 'Деревня без дорог, "Голландская Венеция"' },
          { name: 'Хооге Велюве', lat: 52.0954, lng: 5.8372, type: 'attraction' as const, description: 'Национальный парк с музеем Крёллер-Мюллер' }
        ];
      case 'nicaragua-gid':
        return [
          { name: 'Гранада', lat: 11.9298, lng: -85.9560, type: 'city' as const, description: 'Колониальная жемчужина Никарагуа, один из старейших городов Америки' },
          { name: 'Ометепе', lat: 11.5269, lng: -85.5739, type: 'attraction' as const, description: 'Вулканический остров в озере Никарагуа с двумя вулканами' },
          { name: 'Вулкан Серро-Негро', lat: 12.5406, lng: -86.7028, type: 'attraction' as const, description: 'Молодой вулкан с уникальным вулкан-бордингом' },
          { name: 'Леон', lat: 12.4340, lng: -86.8770, type: 'city' as const, description: 'Интеллектуальная столица с собором ЮНЕСКО' },
          { name: 'Сан-Хуан-дель-Сур', lat: 11.2531, lng: -85.8704, type: 'resort' as const, description: 'Серферский рай с лучшими волнами Тихого океана' },
          { name: 'Кукурузные острова', lat: 12.1633, lng: -83.0633, type: 'attraction' as const, description: 'Карибские острова с белоснежными пляжами и английским креольским языком' },
          { name: 'Масайя', lat: 11.9742, lng: -86.0940, type: 'city' as const, description: 'Город ремесел с активным вулканом и видимой лавой' },
          { name: 'Эстели', lat: 13.0919, lng: -86.3531, type: 'city' as const, description: 'Горный регион с кофейными плантациями и прохладным климатом' },
          { name: 'Рио-Сан-Хуан', lat: 11.1167, lng: -84.7833, type: 'attraction' as const, description: 'Река к Карибскому морю с девственными джунглями' },
          { name: 'Лагуна-де-Апойо', lat: 11.9225, lng: -86.0342, type: 'attraction' as const, description: 'Кратерное озеро с чистейшей водой и возможностью каякинга' }
        ];
      case 'oman':
        return [
          { name: 'Маскат', lat: 23.5880, lng: 58.3829, type: 'city' as const, description: 'Столица Омана (1.4 млн), порт на Аравийском море, форты Джалали и Мирани, Большая мечеть, султанский дворец, музеи' },
          { name: 'Низва', lat: 22.9267, lng: 55.8814, type: 'city' as const, description: 'Древняя столица с мощным фортом' },
          { name: 'Салала', lat: 17.0151, lng: 54.0924, type: 'city' as const, description: 'Южная жемчужина с тропическим климатом' },
          { name: 'Пустыня Вахиба', lat: 21.4735, lng: 59.2700, type: 'attraction' as const, description: 'Золотые дюны и бедуинские лагеря' },
          { name: 'Вади Шаб', lat: 22.7106, lng: 58.3322, type: 'attraction' as const, description: 'Живописное ущелье с бирюзовыми бассейнами' },
          { name: 'Форт Джебель-Низва', lat: 22.9200, lng: 55.8700, type: 'attraction' as const, description: 'Древняя крепость с великолепным видом' },
          { name: 'Большая мечеть Султана Кабуса', lat: 23.5933, lng: 58.4000, type: 'attraction' as const, description: 'Одно из самых впечатляющих исламских зданий' },
          { name: 'Сур', lat: 22.5522, lng: 59.5278, type: 'city' as const, description: 'Город мореплавателей с древними верфями' }
        ];
      case 'qatar-gid':
        return [
          { name: 'Доха', lat: 25.2854, lng: 51.5310, type: 'city' as const, description: 'Столица Катар (650 тыс.), порт на Персидском заливе, Музей исламского искусства, Сук-Вакиф, небоскребы, Корниш, стадионы ЧМ-2022' },
          { name: 'Музей исламского искусства', lat: 25.3591, lng: 51.5523, type: 'attraction' as const, description: 'Архитектурный шедевр на искусственном острове' },
          { name: 'Национальный музей Катар', lat: 25.2879, lng: 51.5433, type: 'attraction' as const, description: 'Современный музей в форме "розы пустыни"' },
          { name: 'Сук Вакиф', lat: 25.2919, lng: 51.5342, type: 'attraction' as const, description: 'Традиционный рынок с ресторанами и магазинами' },
          { name: 'Перл-Катар (The Pearl)', lat: 25.3167, lng: 51.5333, type: 'attraction' as const, description: 'Искусственный остров с роскошными магазинами и ресторанами' },
          { name: 'Катар-Футурама (Qatar Foundation)', lat: 25.3167, lng: 51.4833, type: 'attraction' as const, description: 'Образовательный комплекс с футуристической архитектурой' },
          { name: 'Аспирейшн-тауэр', lat: 25.3000, lng: 51.5167, type: 'attraction' as const, description: 'Самое высокое здание в Катаре (300 м)' },
          { name: 'Внутреннее море (Хор-аль-Адаид)', lat: 24.8000, lng: 51.4667, type: 'attraction' as const, description: 'Природный заповедник с пустынными пейзажами' },
          { name: 'Катар Спортс Клаб', lat: 25.0833, lng: 51.5333, type: 'attraction' as const, description: 'Популярное место для водных видов спорта' },
          { name: 'Шахр аль-Хамрия', lat: 25.3333, lng: 51.5167, type: 'attraction' as const, description: 'Традиционный квартал в Дохе с музеем' }
        ];
      case 'saudi-arabia':
        return [
          { name: 'Эр-Рияд', lat: 24.7136, lng: 46.6753, type: 'city' as const, description: 'Столица Саудовской Аравии, Kingdom Centre Tower (302 м), Национальный музей, крепость Масмак' },
          { name: 'Мекка', lat: 21.4225, lng: 39.8262, type: 'attraction' as const, description: 'Священный город ислама (только для мусульман), Кааба, мечеть аль-Харам, гора Арафат' },
          { name: 'Медина', lat: 24.4686, lng: 39.6142, type: 'attraction' as const, description: 'Второй священный город ислама (только для мусульман), мечеть Пророка, могила Мухаммеда' },
          { name: 'Мадаин-Салих (Хегра)', lat: 26.7963, lng: 37.9643, type: 'attraction' as const, description: 'Объект ЮНЕСКО, гробницы набатеев в скалах, более 100 монументальных гробниц' },
          { name: 'Аль-Ула', lat: 26.6333, lng: 37.9167, type: 'attraction' as const, description: 'Исторический оазис с древними руинами, скальные образования, петроглифы, Winter at Tantora' },
          { name: 'Джидда', lat: 21.5433, lng: 39.1728, type: 'city' as const, description: 'Историческая часть Аль-Балад (ЮНЕСКО), архитектура из кораллового камня, набережная Корниш' },
          { name: '"Край света" (Джебель-Фихрейн)', lat: 24.8397, lng: 46.1314, type: 'attraction' as const, description: 'Драматические скалы 300 м в 90 км от Эр-Рияда, панорамный вид на пустыню' },
          { name: 'Проект NEOM', lat: 27.5000, lng: 35.5000, type: 'attraction' as const, description: 'Футуристический мегаполис $500 млрд (строится): The Line, Trojena, Oxagon' },
          { name: 'Таиф', lat: 21.2703, lng: 40.4150, type: 'city' as const, description: 'Горный курорт на высоте 1700 м, розовые сады и производство розового масла' },
          { name: 'Абха', lat: 18.2164, lng: 42.5053, type: 'city' as const, description: 'Горный регион на высоте 2200 м, зеленые горы, традиционная архитектура асири' }
        ];
      case 'papua-novaya-gvineya-plemennoy-raj-gid':
        return [
          { name: 'Порт-Морсби', lat: -9.4438, lng: 147.1803, type: 'city' as const, description: 'Столица Папуа-Новой Гвинеи (365 тыс.), порт на Коралловом море, Национальный музей, парламент, рынки, ворота в джунгли' },
          { name: 'Тропа Кокода', lat: -9.3000, lng: 147.5000, type: 'attraction' as const, description: 'Исторический трек через джунгли, 96 км, Вторая мировая война, центр Папуа-Новой Гвинеи, треккинг 8-10 дней, популярное место' },
          { name: 'Река Сепик', lat: -4.0000, lng: 143.0000, type: 'attraction' as const, description: 'Священная река с уникальными племенами (1126 км), север Папуа-Новой Гвинеи, традиционная культура, речные круизы, экотуризм' },
          { name: 'Маунт-Хаген', lat: -5.8333, lng: 144.2333, type: 'city' as const, description: 'Культурный центр хайлендеров (50 тыс.), горы, фестивали, центр Папуа-Новой Гвинеи, традиционная культура, высота 1700 м' },
          { name: 'Архипелаг Бисмарка', lat: -4.0000, lng: 152.0000, type: 'attraction' as const, description: 'Дайвинг мирового класса, коралловые рифы, затонувшие корабли, Тихий океан, север Папуа-Новой Гвинеи, популярное место' },
          { name: 'Вулкан Тавурвур', lat: -4.2714, lng: 152.2039, type: 'attraction' as const, description: 'Активный вулкан в кальдере Рабаул (688 м), последнее извержение 2014, остров Новая Британия, север Папуа-Новой Гвинеи, опасное место' },
          { name: 'Деревня мумий Асаро', lat: -6.1500, lng: 145.0000, type: 'attraction' as const, description: 'Церемониальные маски "Грязевых людей", традиционная культура, центр Папуа-Новой Гвинеи, популярное место для туристов, уникальные ритуалы' },
          { name: 'Национальный парк Вариет', lat: -5.7000, lng: 144.6500, type: 'attraction' as const, description: 'Горный парк с эндемичными видами, центр Папуа-Новой Гвинеи, треккинг, природа, уникальная флора и фауна, экотуризм' },
          { name: 'Тробрианские острова', lat: -8.5000, lng: 151.0000, type: 'attraction' as const, description: '"Острова любви" с матриархальным обществом, Тихий океан, восток Папуа-Новой Гвинеи, традиционная культура, пляжи, популярное место' },
          { name: 'Золотые прииски Вау', lat: -7.3333, lng: 146.7167, type: 'attraction' as const, description: 'Историческое золотодобывающее поселение (20 тыс.), золотая лихорадка 1920-х, центр Папуа-Новой Гвинеи, историческое значение' }
        ];
      case 'paraguay':
        return [
          { name: 'Асунсьон', lat: -25.2865, lng: -57.6470, type: 'city' as const, description: 'Столица Парагвая (540 тыс.), "Мать городов", один из старейших городов Южной Америки (1537), река Парагвай, музеи, юг страны' },
          { name: 'Сьюдад-дель-Эсте', lat: -25.5167, lng: -54.6167, type: 'city' as const, description: 'Крупный торговый город на границе с Бразилией и Аргентиной (300 тыс.), рядом с водопадами Игуасу, восток Парагвая, шопинг' },
          { name: 'Иезуитские миссии Ла-Сантисима-Тринидад-де-Парана', lat: -26.0167, lng: -57.1667, type: 'attraction' as const, description: 'Впечатляющие руины редукций, построенных иезуитами в XVII-XVIII веках, объекты Всемирного наследия ЮНЕСКО' },
          { name: 'Иезуитские миссии Хесус-де-Таваранге', lat: -25.3833, lng: -57.5500, type: 'attraction' as const, description: 'Впечатляющие руины редукций, построенных иезуитами в XVII-XVIII веках, объекты Всемирного наследия ЮНЕСКО' },
          { name: 'Гран-Чако', lat: -22.0000, lng: -60.0000, type: 'attraction' as const, description: 'Обширный, малонаселенный и дикий регион саванн и лесов (250 000 км²), занимающий западную часть страны, экотуризм, природа' },
          { name: 'Плотина Итайпу', lat: -25.4167, lng: -54.5833, type: 'attraction' as const, description: 'Одна из крупнейших ГЭС в мире, на границе с Бразилией, река Парана, восток Парагвая, популярное место для экскурсий' },
          { name: 'Национальный парк Дефианса', lat: -26.9667, lng: -55.8333, type: 'attraction' as const, description: 'Национальный парк с богатой флорой и фауной, включая ягуаров и тапиров, юг Парагвая, граница с Аргентиной, экотуризм' },
          { name: 'Энкаранасьон', lat: -25.8333, lng: -55.8333, type: 'city' as const, description: 'Город недалеко от столицы (140 тыс.) с историческим центром и рынком, река Парана, юг Парагвая, граница с Аргентиной, порт' },
          { name: 'Консепсьон', lat: -23.4000, lng: -57.4333, type: 'city' as const, description: 'Второй по величине город страны, расположенный на реке Парагвай' },
          { name: 'Пуэрто-Касадас', lat: -22.2833, lng: -60.9333, type: 'attraction' as const, description: 'Пограничный город с Боливией, ворота в регион Гран-Чако' }
        ];
      case 'peru-gid':
        return [
          { name: 'Лима', lat: -12.0464, lng: -77.0428, type: 'city' as const, description: 'Столица Перу, гастрономическая столица Южной Америки, исторический центр - объект ЮНЕСКО' },
          { name: 'Мачу-Пикчу', lat: -13.1631, lng: -72.5450, type: 'attraction' as const, description: 'Затерянный город инков, одно из Новых семи чудес света, объект ЮНЕСКО' },
          { name: 'Куско', lat: -13.5319, lng: -71.9676, type: 'city' as const, description: 'Археологическая столица Америки, бывшая столица империи инков, объект ЮНЕСКО' },
          { name: 'Саксайуаман', lat: -13.5083, lng: -71.9825, type: 'attraction' as const, description: 'Крепость инков, объект ЮНЕСКО, гигантские каменные блоки, церемониальный комплекс' },
          { name: 'Ольянтайтамбо', lat: -13.2578, lng: -72.2633, type: 'attraction' as const, description: 'Древний город инков, крепость и храмы, объект ЮНЕСКО, начало тропы инков' },
          { name: 'Линии Наска', lat: -14.7167, lng: -75.1333, type: 'attraction' as const, description: 'Гигантские геоглифы в пустыне Наска, объект ЮНЕСКО' },
          { name: 'Озеро Титикака', lat: -15.8333, lng: -69.3333, type: 'attraction' as const, description: 'Самое высокогорное судоходное озеро в мире, плавучие острова урос' },
          { name: 'Арекипа', lat: -16.4090, lng: -71.5375, type: 'city' as const, description: '"Белый город" с колониальной архитектурой из белого вулканического камня, объект ЮНЕСКО' },
          { name: 'Каньон Колка', lat: -15.4000, lng: -71.5667, type: 'attraction' as const, description: 'Один из самых глубоких каньонов в мире, обитание андских кондоров' },
          { name: 'Национальный парк Ману', lat: -11.8500, lng: -71.2667, type: 'attraction' as const, description: 'Биосферный заповедник с невероятным биоразнообразием, объект ЮНЕСКО' },
          { name: 'Священная долина инков', lat: -13.3333, lng: -72.0000, type: 'attraction' as const, description: 'Долина с археологическими памятниками инков, включая Ольянтайтамбо и Писак' },
          { name: 'Тропа инков', lat: -13.2500, lng: -72.4167, type: 'attraction' as const, description: 'Исторический путь инков, ведущий к Мачу-Пикчу, популярный треккинг маршрут' }
        ];
      case 'philippines':
      case 'filippiny-gid':
        return [
          { name: 'Манила', lat: 14.5995, lng: 120.9842, type: 'city' as const, description: 'Столица Филиппин, крупнейший город агломерации с колониальной историей Интрамурос' },
          { name: 'Боракай', lat: 11.9674, lng: 121.9248, type: 'resort' as const, description: 'Остров с белоснежными пляжами, пляжная классика Филиппин с White Beach' },
          { name: 'Эль-Нидо', lat: 11.1948, lng: 119.4193, type: 'attraction' as const, description: 'Город на Палаване с лагунами мечты и лучшими пляжами, Big Lagoon и Secret Lagoon' },
          { name: 'Себу', lat: 10.3157, lng: 123.8854, type: 'city' as const, description: 'Городская база, международный аэропорт, исторический район Heritage Monument' },
          { name: 'Базилика Санто-Ниньо', lat: 10.2936, lng: 123.9014, type: 'attraction' as const, description: 'Старейшая церковь Филиппин, XVI век, объект культурного наследия, статуя Святого Младенца' },
          { name: 'Бохоль', lat: 9.8349, lng: 124.1438, type: 'attraction' as const, description: 'Остров с Шоколадными холмами и долгопятыми, природные чудеса Филиппин' },
          { name: 'Сиаргао', lat: 9.8600, lng: 126.0547, type: 'resort' as const, description: 'Серферский рай с Cloud 9 - лучшими волнами, остров Guyam' },
          { name: 'Коррон', lat: 12.0010, lng: 120.2002, type: 'attraction' as const, description: 'Дайвинг среди затонувших кораблей, лучшие погружения, японские рэки WWII' },
          { name: 'Интрамурос', lat: 14.5906, lng: 120.9754, type: 'attraction' as const, description: 'Колониальная история Манилы, крепость Сантьяго и исторический комплекс' },
          { name: 'Подземная река Пуэрто-Принсеса', lat: 10.1673, lng: 118.9247, type: 'attraction' as const, description: 'ЮНЕСКО, подземная река с известняковыми пещерами, лимит 900 человек в день' },
          { name: 'Рисовые террасы Банауэ', lat: 16.9270, lng: 121.0583, type: 'attraction' as const, description: '2000-летнее наследие, культурные террасы народа ифугао в горах, объект ЮНЕСКО' },
          { name: 'Дайвинг с китовыми акулами в Ослобе', lat: 9.4576, lng: 123.3778, type: 'attraction' as const, description: 'Этично спорная активность, снорклинг и дайвинг с кормящимися китовыми акулами' },
          { name: 'Панглао', lat: 9.6452, lng: 124.0270, type: 'resort' as const, description: 'Остров у Бохоля с тихими пляжами и отличным дайвингом' },
          { name: 'Лас Кабаньяс', lat: 11.1948, lng: 119.4193, type: 'beach' as const, description: 'Тихий пляж в 10 минутах от центра Эль-Нидо, скрытая жемчужина' },
          { name: 'Puka Beach', lat: 11.9674, lng: 121.9248, type: 'beach' as const, description: 'Менее людный северный пляж Боракая' }
        ];
      case 'palau-gid':
        return [
          { name: 'Корор', lat: 7.3333, lng: 134.4833, type: 'city' as const, description: 'Главный туристический и деловой центр Палау' },
          { name: 'Blue Corner', lat: 7.2833, lng: 134.2167, type: 'attraction' as const, description: 'Один из лучших дайв-сайтов мира с серыми рифовыми акулами' },
          { name: 'Озеро Медуз', lat: 7.1592, lng: 134.3761, type: 'attraction' as const, description: 'Уникальное озеро с миллионами золотистых медуз' },
          { name: 'Скалистые острова', lat: 7.1833, lng: 134.3667, type: 'attraction' as const, description: '445 известняковых островов, объект ЮНЕСКО' },
          { name: 'Пелелиу', lat: 6.9833, lng: 134.2333, type: 'attraction' as const, description: 'Исторический остров с военными памятниками Второй мировой войны' },
          { name: 'Бабелдаоб', lat: 7.5000, lng: 134.5833, type: 'city' as const, description: 'Крупнейший остров Палау, административный центр' },
          { name: 'Уолонг Уолл', lat: 7.2167, lng: 134.3000, type: 'attraction' as const, description: 'Подводная стена с богатой морской жизнью' },
          { name: 'Милки Вэй', lat: 7.1667, lng: 134.3833, type: 'attraction' as const, description: 'Лагуна с целебной белой глиной на дне' },
          { name: 'Водопады Нгардмау', lat: 7.6167, lng: 134.5500, type: 'attraction' as const, description: 'Самый высокий водопад Палау (30 метров)' },
          { name: 'Нгерулмуд', lat: 7.514979, lng: 134.582521, type: 'city' as const, description: 'Столица Палау, самая маленькая столица в мире' }
        ];
      case 'rwanda':
        return [
          { name: 'Кигали', lat: -1.9403, lng: 29.8739, type: 'city' as const, description: 'Столица Руанды, самый чистый город Африки, мемориал геноцида' },
          { name: 'Национальный парк вулканов', lat: -1.5000, lng: 29.5000, type: 'attraction' as const, description: 'Треккинг к горным гориллам, вулкан Карисимби, место работы Дайан Фосси' },
          { name: 'Озеро Киву', lat: -2.0000, lng: 29.0000, type: 'attraction' as const, description: 'Одно из Великих африканских озёр, курорты Гисеньи и Кибуе' },
          { name: 'Национальный парк Акагера', lat: -2.0000, lng: 30.2000, type: 'attraction' as const, description: 'Классическое африканское сафари: слоны, львы, жирафы, носороги' },
          { name: 'Национальный парк Ньюнгве', lat: -2.4833, lng: 29.2167, type: 'attraction' as const, description: 'Древний тропический лес, шимпанзе, подвесной мост над кронами (90 метров)' },
          { name: 'Мусанзе (Рухенгери)', lat: -1.5000, lng: 29.6333, type: 'city' as const, description: 'Ворота в национальный парк вулканов, рынок и вулканические пейзажи' },
          { name: 'Бутаре (Хуйе)', lat: -2.5833, lng: 29.7500, type: 'city' as const, description: 'Университетский город, Национальный музей Руанды' },
          { name: 'Ньянза', lat: -2.3500, lng: 29.7500, type: 'city' as const, description: 'Древняя столица королевства, Королевский дворец с традиционными хижинами' },
          { name: 'Гисеньи', lat: -1.7000, lng: 29.2667, type: 'resort' as const, description: 'Курортный город на берегу озера Киву с пляжами и термальными источниками' },
          { name: 'Мемориал геноцида Кигали', lat: -1.9583, lng: 30.0906, type: 'attraction' as const, description: 'Музей и мемориал жертв геноцида 1994 года, место памяти и примирения' }
        ];
      case 'saint-kitts-and-nevis':
        return [
          { name: 'Бастер', lat: 17.3026, lng: -62.7177, type: 'city' as const, description: 'Столица федерации на острове Сент-Китс' },
          { name: 'Крепость Бримстоун-Хилл', lat: 17.3717, lng: -62.7968, type: 'attraction' as const, description: 'Объект ЮНЕСКО, "Гибралтар Карибов", британская крепость XVIII века' },
          { name: 'Чарлстаун', lat: 17.1389, lng: -62.6128, type: 'city' as const, description: 'Столица острова Невис, музей Александра Гамильтона' },
          { name: 'Пинни-Бич', lat: 17.1500, lng: -62.6333, type: 'resort' as const, description: '4 мили золотого песка на острове Невис' },
          { name: 'Саут-Фрайарс-Бич', lat: 17.2500, lng: -62.7000, type: 'resort' as const, description: 'Белый песок, спокойная вода, идеален для отдыха' },
          { name: 'Вулкан Лиамуига', lat: 17.3722, lng: -62.7989, type: 'attraction' as const, description: 'Высшая точка (1,156 м), потухший вулкан, треккинг к кратеру' },
          { name: 'Пик Невис', lat: 17.1500, lng: -62.5833, type: 'attraction' as const, description: 'Вулкан 985 м, горячие источники и термальные спа' },
          { name: 'Кокклешелл-Бич', lat: 17.2333, lng: -62.6833, type: 'resort' as const, description: 'Два пляжа с барами и видом на Невис' },
          { name: 'Плантация Романи', lat: 17.3200, lng: -62.7400, type: 'attraction' as const, description: 'Музей сахарных плантаций, историческое наследие' },
          { name: 'Аэропорт Роберта Л. Брэдшоу', lat: 17.3115, lng: -62.7186, type: 'airport' as const, description: 'Международный аэропорт Сент-Китс' }
        ];
      case 'saint-lucia':
        return [
          { name: 'Кастри', lat: 14.0100, lng: -60.9900, type: 'city' as const, description: 'Столица Сент-Люсии, круизный порт, Собор Непорочного Зачатия' },
          { name: 'Питоны (Pitons)', lat: 13.8086, lng: -61.0642, type: 'attraction' as const, description: 'Объект ЮНЕСКО, вулканические конусы Гро (798м) и Пти (743м)' },
          { name: 'Вулкан Суфриер', lat: 13.8394, lng: -61.0544, type: 'attraction' as const, description: 'Единственный drive-in вулкан в мире, серные источники и грязевые ванны' },
          { name: 'Суфриер', lat: 13.8500, lng: -61.0500, type: 'city' as const, description: 'Жемчужина острова, бывшая столица, основан в 1746 году' },
          { name: 'Родни-Бей', lat: 14.0700, lng: -60.9500, type: 'resort' as const, description: 'Туристический центр, пляж Редю, ночная жизнь и марина' },
          { name: 'Пляж Анс-Шастане', lat: 13.8600, lng: -61.0700, type: 'resort' as const, description: 'Черный вулканический песок, лучший снорклинг у Питонов' },
          { name: 'Маригот-Бей', lat: 13.9667, lng: -61.0333, type: 'resort' as const, description: 'Райская бухта, съемки "Доктор Дулиттл", марина и рестораны' },
          { name: 'Ботанический сад Diamond', lat: 13.8500, lng: -61.0417, type: 'attraction' as const, description: 'Тропические сады 1784 года, минеральные ванны, водопад Diamond Falls' },
          { name: 'Форт Родни', lat: 14.0833, lng: -60.9500, type: 'attraction' as const, description: 'Британская крепость 1778 года в национальном парке Пиджен-Айленд' },
          { name: 'Аэропорт Хьюаноры', lat: 13.7333, lng: -60.9500, type: 'airport' as const, description: 'Международный аэропорт UVF на юге острова' }
        ];
      case 'saint-vincent-and-the-grenadines':
        return [
          { name: 'Кингстаун', lat: 13.1583, lng: -61.2250, type: 'city' as const, description: 'Столица Сент-Винсента, форт Шарлотта, Ботанический сад 1765 года' },
          { name: 'Тобаго-Кейс', lat: 12.3667, lng: -61.3500, type: 'attraction' as const, description: 'Морской заповедник, плавание с черепахами и скатами, 5 необитаемых островов' },
          { name: 'Мюстик', lat: 12.8833, lng: -61.1833, type: 'resort' as const, description: 'Частный остров миллиардеров, дом Мика Джаггера, 74 роскошных виллы' },
          { name: 'Вулкан Суфриер', lat: 13.3333, lng: -61.1833, type: 'attraction' as const, description: 'Активный вулкан 1234м, кратерное озеро, последнее извержение 2021' },
          { name: 'Бекия', lat: 13.0167, lng: -61.2333, type: 'resort' as const, description: 'Яхтенная столица, пляж Принцессы Маргарет, традиционное судостроение' },
          { name: 'Остров Палм', lat: 12.5833, lng: -61.4167, type: 'resort' as const, description: 'Ультра-люкс частный остров, 5 эксклюзивных вилл, персональные дворецкие' },
          { name: 'Кануан', lat: 12.7167, lng: -61.3167, type: 'resort' as const, description: 'Гольф-остров, 18-луночное поле Джима Фацио, Raffles Resort' },
          { name: 'Водопады Дарк Вью', lat: 13.2833, lng: -61.2000, type: 'attraction' as const, description: 'Каскад из 7 водопадов в тропическом лесу, природные бассейны' },
          { name: 'Форт Шарлотта', lat: 13.1583, lng: -61.2250, type: 'attraction' as const, description: 'Британская крепость 1806 года, музей истории, панорамы столицы' },
          { name: 'Аэропорт Аргайл', lat: 13.1561, lng: -61.1497, type: 'airport' as const, description: 'Международный аэропорт SVD, новый терминал 2017 года' }
        ];
      case 'san-marino':
        return [
          { name: 'Башня Гуаита (Prima Torre)', lat: 43.9424, lng: 12.4578, type: 'attraction' as const, description: 'Старейшая крепость XI века, символ Сан-Марино с потрясающими видами на гору Титано' },
          { name: 'Башня Честа (Seconda Torre)', lat: 43.9419, lng: 12.4586, type: 'attraction' as const, description: 'XIII век, музей старинного оружия и доспехов на вершине горы' },
          { name: 'Башня Монтале (Terza Torre)', lat: 43.9411, lng: 12.4592, type: 'attraction' as const, description: 'XIV век, самая высокая башня на горе Титано' },
          { name: 'Палаццо Публико', lat: 43.9357, lng: 12.4466, type: 'attraction' as const, description: 'Здание правительства 1894 года с церемонией смены караула' },
          { name: 'Базилика Сан-Марино', lat: 43.9363, lng: 12.4472, type: 'attraction' as const, description: 'Главный храм страны в неоклассическом стиле' },
          { name: 'Пьяцца делла Либерта', lat: 43.9357, lng: 12.4467, type: 'attraction' as const, description: 'Центральная площадь с памятником Свободе и смотровой площадкой' },
          { name: 'Музей пыток', lat: 43.9350, lng: 12.4470, type: 'attraction' as const, description: 'Необычная коллекция средневековых орудий пыток' },
          { name: 'Государственный музей', lat: 43.9365, lng: 12.4475, type: 'attraction' as const, description: 'Археологические находки и история республики' },
          { name: 'Музей автомобилей Maranello Rosso', lat: 43.9420, lng: 12.4500, type: 'attraction' as const, description: 'Коллекция Ferrari и спортивных автомобилей' },
          { name: 'Сады Балуардо', lat: 43.9380, lng: 12.4490, type: 'attraction' as const, description: 'Живописный парк с панорамными видами на Апеннины' }
        ];
      case 'sao-tome-and-principe':
        return [
          { name: 'Сан-Томе', lat: 0.3364, lng: 6.7273, type: 'city' as const, description: 'Столица на острове Сан-Томе с колониальной архитектурой и Кафедральным собором' },
          { name: 'Аэропорт Сан-Томе', lat: 0.3781, lng: 6.7122, type: 'airport' as const, description: 'Международный аэропорт Сан-Томе (TMS), главные воздушные ворота страны' },
          { name: 'Пику-Кан-Гранде', lat: 0.1167, lng: 6.5667, type: 'attraction' as const, description: 'Вулканическая вершина высотой 300+ метров, похожая на палец, символ островов' },
          { name: 'Национальный парк Обо', lat: 0.2500, lng: 6.5500, type: 'attraction' as const, description: 'Биосферный заповедник с эндемичной флорой и фауной, гигантские бегонии' },
          { name: 'Остров Принсипи', lat: 1.6143, lng: 7.4056, type: 'attraction' as const, description: 'Биосферный заповедник ЮНЕСКО, более дикий и нетронутый чем Сан-Томе' },
          { name: 'Бока-ду-Инферну', lat: 0.0333, lng: 6.5167, type: 'attraction' as const, description: 'Скальная арка "Пасть Ада" с океанскими гейзерами, впечатляет во время прилива' },
          { name: 'Пляж Жале', lat: 0.0667, lng: 6.5667, type: 'resort' as const, description: 'Один из лучших пляжей острова с белым песком, снорклинг и морские черепахи' },
          { name: 'Плантация Роса-Агуштинью-Нету', lat: 0.2833, lng: 6.6500, type: 'attraction' as const, description: 'Историческая плантация какао с дегустацией органического шоколада' },
          { name: 'Водопады Сан-Николау', lat: 0.2000, lng: 6.5500, type: 'attraction' as const, description: 'Водопады в тропическом лесу, треккинг через джунгли и купание' },
          { name: 'Санту-Антониу', lat: 1.6333, lng: 7.4167, type: 'city' as const, description: 'Столица острова Принсипи, тихий город с португальским колониальным наследием' }
        ];
      case 'sierra-leone':
        return [
          { name: 'Фритаун', lat: 8.4844, lng: -13.2344, type: 'city' as const, description: 'Столица Сьерра-Леоне (1.2 млн) на побережье Атлантического океана, основан освобожденными рабами, пляжи, рынки, музеи, порт' },
          { name: 'Бо', lat: 7.9647, lng: -11.7383, type: 'city' as const, description: 'Второй по величине город (175 тыс.), университетский центр, Университет Нджала, рынки, юг страны, сельскохозяйственный регион' },
          { name: 'Кенема', lat: 7.8765, lng: -11.1907, type: 'city' as const, description: 'Центр алмазодобычи в восточной провинции (200 тыс.), алмазные шахты, рынки, близость к национальным паркам, горнодобывающая промышленность' },
          { name: 'Хлопковое дерево', lat: 8.4871, lng: -13.2485, type: 'attraction' as const, description: 'Символ Фритауна, место сбора освобожденных рабов в XVIII веке' },
          { name: 'Заповедник шимпанзе Такугама', lat: 8.4278, lng: -13.1083, type: 'attraction' as const, description: 'Центр спасения и реабилитации осиротевших шимпанзе, более 80 животных' },
          { name: 'Остров Банс', lat: 8.4000, lng: -13.0333, type: 'attraction' as const, description: 'Руины британского форта XVIII века, крупнейшего центра работорговли' },
          { name: 'Пляжи полуострова Фритаун', lat: 8.4000, lng: -13.3000, type: 'resort' as const, description: 'Одни из лучших пляжей Западной Африки: Лака-Бич, Ривер-Номер-2, Ламли-Бич' },
          { name: 'Национальный парк Гола', lat: 7.7000, lng: -10.8000, type: 'attraction' as const, description: 'Один из последних тропических лесов Западной Африки с эндемичными видами' },
          { name: 'Форт Шеффилд', lat: 8.4861, lng: -13.2750, type: 'attraction' as const, description: 'Британский форт 1794 года на мысе Сьерра-Леоне с панорамными видами на океан' },
          { name: 'Национальный музей Сьерра-Леоне', lat: 8.4847, lng: -13.2542, type: 'attraction' as const, description: 'Экспозиции по истории страны, культуре крио, археологии' },
          { name: 'Рынок Гамбола', lat: 8.4833, lng: -13.2500, type: 'attraction' as const, description: 'Крупнейший рынок Фритауна с традиционными товарами и местной едой' },
          { name: 'Аэропорт Лунги', lat: 8.6164, lng: -13.1955, type: 'airport' as const, description: 'Международный аэропорт Сьерра-Леоне' }
        ];
      case 'seychelles':
        return [
          { name: 'Виктория', lat: -4.6167, lng: 55.4500, type: 'city' as const, description: 'Одна из самых маленьких столиц в мире (27 тыс.), на острове Маэ, символ — маленькая копия лондонского Биг-Бена, рынки, музеи, порт' },
          { name: 'Пляж Анс-Сурс-д\'Аржан', lat: -4.3500, lng: 55.8333, type: 'resort' as const, description: 'На острове Ла-Диг, один из самых фотографируемых пляжей мира с гранитными валунами, белый песок, бирюзовая вода, популярное место для фото' },
          { name: 'Национальный парк Валле-де-Мэ', lat: -4.3333, lng: 55.7167, type: 'attraction' as const, description: 'На острове Праслен, объект Всемирного наследия ЮНЕСКО, доисторический лес, уникальная пальма коко-де-мер с крупнейшими в мире семенами, эндемичная флора' },
          { name: 'Атолл Альдабра', lat: -9.4000, lng: 46.3167, type: 'attraction' as const, description: 'Второй по величине коралловый атолл в мире (ЮНЕСКО), дом для крупнейшей в мире популяции гигантских черепах (150 тыс.), удаленный, ограниченный доступ' },
          { name: 'Остров Курьез', lat: -4.6667, lng: 55.7167, type: 'attraction' as const, description: 'Национальный морской парк, где свободно живут гигантские черепахи, близость к Маэ, дайвинг, снорклинг, тропические леса' },
          { name: 'Пляж Анс-Лацио', lat: -4.3167, lng: 55.6667, type: 'resort' as const, description: 'На острове Праслен, часто входит в списки лучших пляжей мира, белый песок, пальмы, бирюзовая вода, популярное место для отдыха' }
        ];
      case 'tanzania':
        return [
          { name: 'Дар-эс-Салам', lat: -6.7924, lng: 39.2083, type: 'city' as const, description: 'Фактическая столица Танзании (6 млн), крупнейший город, экономический центр, главный порт' },
          { name: 'Додома', lat: -6.1630, lng: 35.7516, type: 'city' as const, description: 'Официальная столица Танзании (410 тыс.), административный центр страны, парламент, университеты, центральное плато' },
          { name: 'Аруша', lat: -3.3869, lng: 36.6830, type: 'city' as const, description: '🚪 Ворота в сафари (416 тыс.), отправная точка для национальных парков, близость к Килиманджаро, рынки, отели, север Танзании' },
          { name: 'Серенгети', lat: -2.3333, lng: 34.8333, type: 'attraction' as const, description: 'Национальный парк (14 750 км²), Великая миграция (2 млн животных), Большая пятерка, один из старейших экосистем на планете, объект ЮНЕСКО' },
          { name: 'Нгоронгоро', lat: -3.1944, lng: 35.5444, type: 'attraction' as const, description: 'Кратер потухшего вулкана (20 км диаметр), объект ЮНЕСКО, высокая концентрация диких животных, уникальная экосистема, сафари' },
          { name: 'Килиманджаро', lat: -3.0674, lng: 37.3556, type: 'attraction' as const, description: 'Самая высокая гора Африки (5895 м), самая высокая отдельно стоящая гора в мире, восхождение 5-7 дней, три вулканических конуса' },
          { name: 'Занзибар (Стоун-Таун)', lat: -6.1650, lng: 39.1990, type: 'city' as const, description: 'Исторический каменный город (206 тыс.), объект ЮНЕСКО, арабское влияние, специи, работорговля, узкие улочки, пляжи' },
          { name: 'Тарангире', lat: -3.8500, lng: 36.0000, type: 'attraction' as const, description: 'Национальный парк (2850 км²), слоны (3000+), баобабы, сезонная миграция животных, менее туристический, север Танзании' },
          { name: 'Озеро Маньяра', lat: -3.5000, lng: 35.8333, type: 'attraction' as const, description: 'Национальный парк (330 км²), уникальные львы лазающие по деревьям, фламинго, озеро, щелочная вода, север Танзании' },
          { name: 'Аэропорт Килиманджаро', lat: -3.4244, lng: 37.0744, type: 'airport' as const, description: 'Международный аэропорт (JRO), главные воздушные ворота для сафари и восхождения' },
          { name: 'Аэропорт Дар-эс-Салам', lat: -6.8781, lng: 39.2026, type: 'airport' as const, description: 'Международный аэропорт Джулиус Ньерере (DAR), крупнейший аэропорт страны' },
          { name: 'Аэропорт Занзибар', lat: -6.2220, lng: 39.2249, type: 'airport' as const, description: 'Аэропорт Занзибара (ZNZ), связь с материком и международными рейсами' }
        ];
      case 'thailand':
      case 'tailand-gid':
        return [
          { name: 'Бангкок', lat: 13.7563, lng: 100.5018, type: 'city' as const, description: 'Столица Таиланда (10 млн), крупнейший город, исторический центр, международный аэропорт' },
          { name: 'Чиангмай', lat: 18.7883, lng: 98.9853, type: 'city' as const, description: 'Культурная столица Северного Таиланда (1.2 млн), храмы (300+), фестивали, старый город, стены, ворота, горы, кофе' },
          { name: 'Пхукет', lat: 7.8804, lng: 98.3923, type: 'city' as const, description: 'Крупнейший остров Таиланда (418 тыс.), пляжи, дайвинг, ночная жизнь, международный аэропорт, курорты, юг Таиланда' },
          { name: 'Паттайя', lat: 12.9276, lng: 100.8771, type: 'city' as const, description: 'Курортный город (120 тыс.), пляжи, ночная жизнь, развлечения, близость к Бангкоку (150 км), аквапарки, шоу' },
          { name: 'Краби', lat: 8.0863, lng: 98.9063, type: 'city' as const, description: 'Провинция (50 тыс.), скалы, пляжи, острова, скалолазание, популярное место для фото, юг Таиланда, национальные парки' },
          { name: 'Самуи', lat: 9.5120, lng: 100.0136, type: 'city' as const, description: 'Остров (60 тыс.), пляжи, водопады, йога, релакс, кокосовые пальмы, аэропорт, юг Таиланда, менее туристический чем Пхукет' },
          { name: 'Большой дворец', lat: 13.7500, lng: 100.4925, type: 'attraction' as const, description: 'Королевский дворец в Бангкоке, Храм Изумрудного Будды, главная достопримечательность' },
          { name: 'Аютайя', lat: 14.3692, lng: 100.5877, type: 'attraction' as const, description: '🏺 Древняя столица Сиама, руины храмов, объект ЮНЕСКО, исторический парк' },
          { name: 'Сукхотай', lat: 17.0169, lng: 99.7028, type: 'attraction' as const, description: 'Древняя столица Сиама, объект ЮНЕСКО, исторический парк, храмы, статуи Будды, XIII-XIV века' },
          { name: 'Пляж Майя Бэй', lat: 7.6806, lng: 98.7681, type: 'resort' as const, description: 'Знаменитый пляж на Пхи Пхи из фильма "Пляж", ограниченное количество туристов' },
          { name: 'Национальный парк Кхао Сок', lat: 8.9175, lng: 98.5236, type: 'attraction' as const, description: 'Тропический лес, озеро Чео Лан, плавучие домики, пещера Нам Талу' },
          { name: 'Храм Ват Арун', lat: 13.7437, lng: 100.4880, type: 'attraction' as const, description: '🛕 Храм Рассвета в Бангкоке, панорама реки Чао Прайя, уникальная архитектура' },
          { name: 'Остров Ко Куд', lat: 11.6347, lng: 102.5436, type: 'resort' as const, description: 'Остров без толп туристов, белый песок, водопады, рыбацкие деревни' },
          { name: 'Аэропорт Суварнабхуми', lat: 13.6900, lng: 100.7500, type: 'airport' as const, description: 'Международный аэропорт Бангкока (BKK), главные воздушные ворота Таиланда' },
          { name: 'Аэропорт Пхукет', lat: 8.1136, lng: 98.3169, type: 'airport' as const, description: 'Международный аэропорт Пхукета (HKT), связь с островами и международными рейсами' }
        ];
      case 'tibet':
        return [
          { name: 'Лхаса', lat: 29.6465, lng: 91.1172, type: 'city' as const, description: 'Столица Тибета (350 тыс.), духовный центр, Дворец Потала, храм Джоканг' },
          { name: 'Шигадзе', lat: 29.2667, lng: 88.8833, type: 'city' as const, description: 'Второй по величине город (100 тыс.), монастырь Ташилунпо, резиденция Панчен-ламы' },
          { name: 'Гьянцзе', lat: 28.9167, lng: 89.6000, type: 'city' as const, description: 'Древний город (60 тыс.), крепость Гьянцзе, монастырь Пелкор Чоде' },
          { name: 'Дворец Потала', lat: 29.6558, lng: 91.1169, type: 'attraction' as const, description: 'Крупнейший буддийский дворец в мире, резиденция далай-лам, объект ЮНЕСКО' },
          { name: 'Храм Джоканг', lat: 29.6528, lng: 91.1325, type: 'attraction' as const, description: '🛕 Самое священное место Тибета, основан царем Сонгцен Гампо в 7 веке' },
          { name: 'Гора Кайлас', lat: 31.0674, lng: 81.3125, type: 'attraction' as const, description: 'Священная гора для буддистов, индуистов, джайнов и бон, паломническая кора' },
          { name: 'Озеро Манасаровар', lat: 30.6667, lng: 81.5000, type: 'attraction' as const, description: 'Священное озеро у подножия Кайласа, место омовения паломников' },
          { name: 'Эверест (тибетская сторона)', lat: 28.0026, lng: 86.8528, type: 'attraction' as const, description: 'Базовый лагерь на северной стороне Эвереста, высота 5200 м' },
          { name: 'Монастырь Дрепунг', lat: 29.6833, lng: 91.0833, type: 'attraction' as const, description: 'Крупнейший монастырь школы Гелуг, вид на Лхасу, более 600 монахов' },
          { name: 'Монастырь Сера', lat: 29.6833, lng: 91.1167, type: 'attraction' as const, description: 'Монастырь школы Гелуг, знаменит монастырскими дебатами' },
          { name: 'Озеро Ямдрок', lat: 29.0000, lng: 90.5000, type: 'attraction' as const, description: 'Одно из трех священных озер Тибета, бирюзовая вода, высота 4441 м' },
          { name: 'Аэропорт Лхаса', lat: 29.2978, lng: 90.9119, type: 'airport' as const, description: 'Международный аэропорт Лхасы (LXA), главные воздушные ворота Тибета' }
        ];
      case 'timor-leste':
        return [
          { name: 'Дили', lat: -8.5569, lng: 125.5603, type: 'city' as const, description: 'Столица Тимор-Лешти (280 тыс.), португальское наследие, статуя Христа-Царя, Музей сопротивления' },
          { name: 'Баукау', lat: -8.4667, lng: 126.4500, type: 'city' as const, description: 'Второй по величине город (60 тыс.), исторический центр, отправная точка для горы Рамелау' },
          { name: 'Малайна', lat: -8.4167, lng: 127.1667, type: 'city' as const, description: 'Восточный регион (25 тыс.), близость к острову Жаку, национальный парк' },
          { name: 'Остров Атауро', lat: -8.2667, lng: 125.5833, type: 'attraction' as const, description: '🐠 Рекордное морское биоразнообразие (253 вида рыб), дайвинг, рыбацкие деревни' },
          { name: 'Гора Рамелау', lat: -8.9167, lng: 125.4833, type: 'attraction' as const, description: 'Высшая точка страны (2,986 м), священная гора, восхождение на рассвет' },
          { name: 'Остров Жаку', lat: -8.4333, lng: 127.3333, type: 'attraction' as const, description: 'Необитаемый остров, национальный парк, белоснежные пляжи, снорклинг' },
          { name: 'Статуя Христа-Царя', lat: -8.5500, lng: 125.5800, type: 'attraction' as const, description: 'Статуя Христа в Дили, лучшие закаты, вид на столицу' },
          { name: 'Музей сопротивления', lat: -8.5584, lng: 125.5736, type: 'attraction' as const, description: 'Музей борьбы за независимость, история 24-летней оккупации' },
          { name: 'Кофейные плантации Эрмеры', lat: -8.7500, lng: 125.4000, type: 'attraction' as const, description: '☕ Лучший кофе Азии, высокогорные плантации, дегустации' },
          { name: 'Пляж Ком', lat: -8.4167, lng: 126.8333, type: 'resort' as const, description: 'Лучший серфинг-спот, постоянные волны, малолюдные пляжи' },
          { name: 'Национальный парк Нино-Корис-Сантана', lat: -8.4167, lng: 127.1667, type: 'attraction' as const, description: 'Первый национальный парк, коралловые рифы, мангровые заросли' },
          { name: 'Аэропорт Николау Лобату', lat: -8.5500, lng: 125.5300, type: 'airport' as const, description: 'Международный аэропорт Дили (DIL), главные воздушные ворота Тимор-Лешти' }
        ];
      case 'togo':
        return [
          { name: 'Ломе', lat: 6.1319, lng: 1.2228, type: 'city' as const, description: 'Столица Того (1.5 млн), рынок фетишей, пляжи, музеи' },
          { name: 'Кпалиме', lat: 6.9000, lng: 0.6333, type: 'city' as const, description: 'Горный регион (100 тыс.), треккинг, прохладный климат' },
          { name: 'Кара', lat: 9.5500, lng: 1.2667, type: 'city' as const, description: 'Северный регион (100 тыс.), близость к Кутаммаку (ЮНЕСКО)' },
          { name: 'Рынок фетишей Акодессева', lat: 6.1300, lng: 1.2200, type: 'attraction' as const, description: '🔮 Крупнейший в мире рынок вуду, ритуальные предметы, экскурсии' },
          { name: 'Кутаммаку — земля батаммариба', lat: 9.5500, lng: 1.2667, type: 'attraction' as const, description: 'Объект ЮНЕСКО, традиционные дома-башни, уникальная архитектура' },
          { name: 'Гора Агу', lat: 7.0000, lng: 0.6000, type: 'attraction' as const, description: 'Высшая точка страны (986 м), треккинг, горные пейзажи' },
          { name: 'Пляж Робинсон', lat: 6.1400, lng: 1.2300, type: 'resort' as const, description: 'Самый популярный пляж Ломе, рестораны, бары, золотистый песок' },
          { name: 'Анехо', lat: 6.2333, lng: 1.5833, type: 'city' as const, description: 'Исторический город, рыбацкие деревни на сваях, пляжи' },
          { name: 'Национальный музей', lat: 6.1319, lng: 1.2228, type: 'attraction' as const, description: 'История и культура Того, коллекции артефактов' },
          { name: 'Озеро Того', lat: 6.2500, lng: 1.3000, type: 'attraction' as const, description: 'Озеро для спокойного отдыха, лодки, катера' },
          { name: 'Водопады Кпалиме', lat: 6.9000, lng: 0.6500, type: 'attraction' as const, description: 'Водопады в горном регионе, треккинг, природные красоты' },
          { name: 'Аэропорт Ломе', lat: 6.1656, lng: 1.2545, type: 'airport' as const, description: 'Международный аэропорт Ломе (LFW), главные воздушные ворота Того' }
        ];
      case 'tonga':
        return [
          { name: 'Нукуалофа', lat: -21.1389, lng: -175.2056, type: 'city' as const, description: 'Столица Тонги (25 тыс.), королевский дворец, древние мегалиты, лучшая инфраструктура' },
          { name: 'Неиафу (Вавау)', lat: -18.6500, lng: -174.0000, type: 'city' as const, description: '🐋 Королевство китов (6 тыс.), плавание с горбатыми китами, яхтинг, пещеры' },
          { name: 'Пангаи (Хаапай)', lat: -19.7500, lng: -174.3500, type: 'city' as const, description: 'Уединение (1.5 тыс.), необитаемые острова, коралловые атоллы, лагуны' },
          { name: 'Хаамонга-а-Мауи', lat: -21.1167, lng: -175.2167, type: 'attraction' as const, description: 'Древний мегалитический памятник XIII века, полинезийский Стоунхендж' },
          { name: 'Королевский дворец', lat: -21.1389, lng: -175.2056, type: 'attraction' as const, description: 'Деревянный дворец короля в викторианском стиле, символ монархии' },
          { name: 'Дыхательные отверстия Мапу-а-Вука', lat: -21.0833, lng: -175.1833, type: 'attraction' as const, description: '💨 Природные гейзеры высотой до 18 метров, морская вода под давлением' },
          { name: 'Пещеры Ауа', lat: -18.6333, lng: -173.9833, type: 'attraction' as const, description: 'Известняковые пещеры на Вавау, кристально чистая вода, сталактиты' },
          { name: 'Лагуна Фоа', lat: -19.7500, lng: -174.3500, type: 'resort' as const, description: 'Изолированная лагуна в Хаапай, бирюзовая вода, коралловые сады' },
          { name: 'Пляж Ха-атафу', lat: -21.0833, lng: -175.1167, type: 'resort' as const, description: 'Лучший пляж Тонгатапу, 5 км белого песка, серфинг, закаты' },
          { name: 'Остров Эуа', lat: -21.3833, lng: -174.9500, type: 'attraction' as const, description: 'Единственные тропические леса Тонги, эндемичные виды птиц, треккинг' },
          { name: 'Древний город Муа', lat: -21.1667, lng: -175.1167, type: 'attraction' as const, description: 'Древняя столица Тонгийской империи XIII-XV веков, археологические раскопки' },
          { name: 'Аэропорт Фуаамоту', lat: -21.2414, lng: -175.1497, type: 'airport' as const, description: 'Международный аэропорт Нукуалофы (TBU), главные воздушные ворота Тонги' }
        ];
      case 'transnistria':
        return [
          { name: 'Тирасполь', lat: 46.8434, lng: 29.6134, type: 'city' as const, description: 'Столица Приднестровья (135 тыс.), памятник Суворову, Дом Советов, музей СССР' },
          { name: 'Бендеры', lat: 46.8311, lng: 29.4686, type: 'city' as const, description: 'Второй по величине город (91 тыс.), Бендерская крепость XVI века, исторический центр' },
          { name: 'Рыбница', lat: 47.7667, lng: 29.0000, type: 'city' as const, description: '🏭 Промышленный центр (48 тыс.), металлургия, северная часть региона' },
          { name: 'Дубоссары', lat: 47.2670, lng: 29.1645, type: 'city' as const, description: '⚡ Энергетический центр (25 тыс.), Дубоссарская ГЭС, природа, рыбалка' },
          { name: 'Григориополь', lat: 47.1500, lng: 29.3000, type: 'city' as const, description: '🌾 Исторический город (9 тыс.), сельская местность, агротуризм' },
          { name: 'Памятник Суворову', lat: 46.8434, lng: 29.6134, type: 'attraction' as const, description: 'Памятник основателю Тирасполя, установлен в 1979 году, центральная площадь' },
          { name: 'Бендерская крепость', lat: 46.8311, lng: 29.4686, type: 'attraction' as const, description: 'Средневековая крепость XVI века, музей истории, башни и валы' },
          { name: 'Дом Советов', lat: 46.8415, lng: 29.6144, type: 'attraction' as const, description: 'Здание правительства с танком Т-34, символ непризнанной республики' },
          { name: 'Свято-Воскресенский собор', lat: 46.8456, lng: 29.6178, type: 'attraction' as const, description: 'Главный православный храм Приднестровья, построен в 1999 году' },
          { name: 'Музей истории Тирасполя', lat: 46.8423, lng: 29.6167, type: 'attraction' as const, description: '🏭 Экспозиции по истории региона от древности до современности' },
          { name: 'Дубоссарская ГЭС', lat: 47.2670, lng: 29.1645, type: 'attraction' as const, description: 'Крупнейшая ГЭС в регионе, построена в 1954 году, экскурсии' },
          { name: 'Винзавод ТВКЗ', lat: 46.8234, lng: 29.5987, type: 'attraction' as const, description: '🍇 Тираспольский винно-коньячный завод, дегустации, экскурсии по подвалам' }
        ];
      case 'trinidad-and-tobago':
        return [
          { name: 'Порт-оф-Спейн', lat: 10.6596, lng: -61.5089, type: 'city' as const, description: 'Столица Тринидад и Тобаго (37 тыс.), карнавал, калипсо, стальные барабаны, Queen\'s Park Savannah' },
          { name: 'Скарборо', lat: 11.1833, lng: -60.7333, type: 'city' as const, description: 'Столица Тобаго (17 тыс.), Форт Кинг Джордж, музей, панорамные виды' },
          { name: 'Сан-Фернандо', lat: 10.2833, lng: -61.4667, type: 'city' as const, description: '🏭 Второй по величине город (82 тыс.), промышленный центр, близость к пляжам' },
          { name: 'Озеро Пич-Лейк', lat: 10.2329, lng: -61.6383, type: 'attraction' as const, description: 'Крупнейший природный резервуар асфальта в мире (10 млн тонн), экскурсии' },
          { name: 'Заповедник Карони', lat: 10.6, lng: -61.4, type: 'attraction' as const, description: '🐦 40 км² мангровых болот, красные ибисы (до 10,000), анаконды, ламантины' },
          { name: 'Риф Буккоо', lat: 11.1667, lng: -60.8333, type: 'attraction' as const, description: 'Крупнейший коралловый риф в Карибах, 300+ видов рыб, Nylon Pool' },
          { name: 'Лес главного хребта', lat: 11.3, lng: -60.6, type: 'attraction' as const, description: 'Старейший защищенный лес в мире (1776 год), 300+ видов деревьев, 210 видов птиц' },
          { name: 'Храм в море (Waterloo)', lat: 10.28, lng: -61.64, type: 'attraction' as const, description: 'Единственный морской индуистский храм в мире, доступен во время отлива, Тринидад, Карибское море, уникальное место, популярное для фото' },
          { name: 'Форт Кинг Джордж', lat: 11.1833, lng: -60.7333, type: 'attraction' as const, description: 'Британский форт 1777-1781, музей Тобаго, панорамные виды на остров, Скарборо, историческое значение, популярное место' },
          { name: 'Алмазные водопады', lat: 10.7, lng: -61.5, type: 'attraction' as const, description: 'Три каскада водопадов по 15-20 м, естественные бассейны для купания, Тринидад, тропический лес, популярное место для отдыха' },
          { name: 'Пещеры летучих мышей', lat: 10.7833, lng: -61.2833, type: 'attraction' as const, description: '🦇 Крупнейшая популяция летучих мышей в Карибах (до 1 млн), вечерний вылет, Тринидад, уникальное зрелище, популярное место' },
          { name: 'Pigeon Point', lat: 11.1667, lng: -60.8333, type: 'resort' as const, description: 'Самый фотографируемый пляж Карибов, пальмовая роща, белый песок, снорклинг, Тобаго, Карибское море, популярное место' },
          { name: 'Store Bay', lat: 11.15, lng: -60.83, type: 'resort' as const, description: 'Лучший снорклинг на Тобаго, коралловые рифы прямо у берега, Карибское море, близость к Скарборо, популярное место' },
          { name: 'Englishman\'s Bay', lat: 11.25, lng: -60.75, type: 'resort' as const, description: 'Уединенный пляж без инфраструктуры, дикая природа, кристально чистая вода, Тобаго, Карибское море, популярное место для отдыха' },
          { name: 'Turtle Beach', lat: 11.3, lng: -60.7, type: 'resort' as const, description: 'Место гнездования морских черепах (март-август), наблюдение за черепахами ночью, Тобаго, Карибское море, экотуризм, популярное место' },
          { name: 'Maracas Bay', lat: 10.75, lng: -61.4, type: 'resort' as const, description: 'Лучший серфинг на Тринидаде, популярный пляж, местная еда (bake and shark), Карибское море, север Тринидада, популярное место' },
          { name: 'Las Cuevas Bay', lat: 10.8, lng: -61.4, type: 'resort' as const, description: 'Спокойный пляж, меньше туристов, хороший для семей, Тринидад, Карибское море, север острова, популярное место для отдыха' },
          { name: 'Аэропорт Пиарко', lat: 10.5954, lng: -61.3372, type: 'airport' as const, description: 'Международный аэропорт Пиарко (POS), главные воздушные ворота Тринидада, близость к Порт-оф-Спейн, крупнейший аэропорт страны' },
          { name: 'Аэропорт Кроун-Пойнт', lat: 11.1497, lng: -60.8322, type: 'airport' as const, description: 'Международный аэропорт Кроун-Пойнт (TAB), главные воздушные ворота Тобаго, близость к Скарборо, обслуживает туризм' }
        ];
      case 'tunisia':
        return [
          { name: 'Тунис', lat: 36.8065, lng: 10.1815, type: 'city' as const, description: 'Столица Туниса (638 тыс., агломерация 2.7 млн), медина (ЮНЕСКО), Национальный музей Бардо' },
          { name: 'Сфакс', lat: 34.7406, lng: 10.7603, type: 'city' as const, description: '🏭 Второй по величине город (330 тыс.), промышленный центр, медина, близость к острову Керкенна' },
          { name: 'Сусс', lat: 35.8254, lng: 10.6360, type: 'city' as const, description: 'Популярный пляжный курорт (173 тыс.), медина (ЮНЕСКО), рибат, золотые пляжи' },
          { name: 'Карфаген', lat: 36.8529, lng: 10.3233, type: 'attraction' as const, description: 'Руины древнего города, главного соперника Рима (ЮНЕСКО), термы Антонина, амфитеатр' },
          { name: 'Сиди-бу-Саид', lat: 36.8678, lng: 10.3417, type: 'attraction' as const, description: 'Бело-голубой городок на скале, самый фотографируемый город Туниса, кафе "Café des Nattes"' },
          { name: 'Эль-Джем', lat: 35.2964, lng: 10.7069, type: 'attraction' as const, description: 'Римский амфитеатр, третий по величине в мире (ЮНЕСКО), прекрасно сохранившийся' },
          { name: 'Кайруан', lat: 35.6711, lng: 10.1008, type: 'attraction' as const, description: 'Четвертый святой город ислама (ЮНЕСКО), Великая мечеть, мечеть Трех дверей, колодцы Аглабидов' },
          { name: 'Джерба', lat: 33.8081, lng: 10.8575, type: 'resort' as const, description: 'Крупнейший остров Туниса, популярный пляжный курорт, синагога Эль-Гриба, медина Хумт-Сук' },
          { name: 'Хаммамет', lat: 36.4000, lng: 10.6167, type: 'resort' as const, description: 'Популярный пляжный курорт, талассотерапия, золотые пляжи, спокойная атмосфера' },
          { name: 'Матмата', lat: 33.8000, lng: 9.8500, type: 'attraction' as const, description: 'Подземные дома берберов, места съемок "Звездных войн" (планета Татуин), уникальный опыт' },
          { name: 'Тозер', lat: 33.9200, lng: 8.1333, type: 'attraction' as const, description: 'Оазис в пустыне Сахара, пальмовые рощи, соляные озера, отправная точка для сафари' },
          { name: 'Дуз', lat: 33.4667, lng: 9.0167, type: 'attraction' as const, description: 'Ворота в Сахару, караван-сараи, верблюжьи сафари, песчаные дюны' },
          { name: 'Национальный музей Бардо', lat: 36.8092, lng: 10.1347, type: 'attraction' as const, description: 'Крупнейшая коллекция римских мозаик в мире, пунические артефакты, исламское искусство' },
          { name: 'Медина Туниса', lat: 36.8065, lng: 10.1815, type: 'attraction' as const, description: 'Исторический центр (ЮНЕСКО), мечеть Зитуна, рынки (суки), традиционные дома' },
          { name: 'Дугга', lat: 36.4231, lng: 9.2192, type: 'attraction' as const, description: 'Римские руины в горах (ЮНЕСКО), театр, храмы, капитолий, хорошо сохранившиеся' },
          { name: 'Аэропорт Тунис-Карфаген', lat: 36.8510, lng: 10.2272, type: 'airport' as const, description: 'Международный аэропорт Тунис-Карфаген (TUN), главные воздушные ворота страны' },
          { name: 'Аэропорт Энфида-Хаммамет', lat: 36.0758, lng: 10.4386, type: 'airport' as const, description: 'Международный аэропорт Энфида-Хаммамет (NBE), курортный аэропорт' },
          { name: 'Аэропорт Монастир', lat: 35.7581, lng: 10.7547, type: 'airport' as const, description: 'Международный аэропорт Монастир (MIR), курортный аэропорт' },
          { name: 'Аэропорт Джерба', lat: 33.8750, lng: 10.7753, type: 'airport' as const, description: 'Международный аэропорт Джерба (DJE), островной аэропорт' }
        ];
      case 'turkmenistan':
        return [
          { name: 'Ашхабад', lat: 37.9601, lng: 58.3261, type: 'city' as const, description: 'Беломраморная столица (1.1 млн), Монумент Нейтралитета, Дворец бракосочетаний, Колесо обозрения "Алем"' },
          { name: 'Туркменабад', lat: 39.1000, lng: 63.5667, type: 'city' as const, description: 'Второй по величине город (250 тыс.), исторический центр, близость к древним достопримечательностям' },
          { name: 'Мары', lat: 37.6000, lng: 61.8333, type: 'city' as const, description: 'Восточный регион (150 тыс.), близость к древнему Мерву, исторические места' },
          { name: 'Дашогуз', lat: 41.8333, lng: 59.9667, type: 'city' as const, description: 'Северный город, близость к Кёнеургенчу, региональный центр' },
          { name: 'Газовый кратер Дарваза', lat: 40.2525, lng: 58.4394, type: 'attraction' as const, description: '🔥 "Врата в ад" — горящий кратер в пустыне Каракумы, горит с 1971 года, уникальное природное явление' },
          { name: 'Древний Мерв', lat: 37.6628, lng: 62.1925, type: 'attraction' as const, description: 'Объект ЮНЕСКО, один из важнейших городов на Великом шелковом пути, крепость Эрк-Кала, мавзолей Султана Санджара' },
          { name: 'Кёнеургенч', lat: 42.3167, lng: 59.1500, type: 'attraction' as const, description: 'Древний город (ЮНЕСКО), мавзолей Тюрабек-ханым, минарет Кутлуг-Тимур, мавзолей Наджмеддина Кубра' },
          { name: 'Ниса', lat: 37.9667, lng: 58.2000, type: 'attraction' as const, description: 'Древняя столица Парфянского царства (ЮНЕСКО), руины крепостей, археологические находки' },
          { name: 'Каньоны Янги-Кала', lat: 40.2833, lng: 54.6000, type: 'attraction' as const, description: 'Разноцветные каньоны на западе страны, напоминающие Гранд-Каньон, потрясающие пейзажи' },
          { name: 'Подземное озеро Ков-Ата', lat: 38.2833, lng: 57.4333, type: 'attraction' as const, description: 'Теплое сероводородное озеро в пещере, температура +33-37°C круглый год, на глубине 60 метров' },
          { name: 'Монумент Нейтралитета', lat: 37.9601, lng: 58.3261, type: 'attraction' as const, description: 'Арка высотой 75 метров с золотой статуей, символ нейтралитета, музей и смотровая площадка' },
          { name: 'Дворец бракосочетаний "Багт кошги"', lat: 37.9601, lng: 58.3261, type: 'attraction' as const, description: 'Здание в форме восьмиконечной звезды, один из символов Ашхабада, уникальная архитектура' },
          { name: 'Колесо обозрения "Алем"', lat: 37.9601, lng: 58.3261, type: 'attraction' as const, description: '🎡 Крупнейшее в мире крытое колесо обозрения (Книга рекордов Гиннесса), панорамный вид на город' },
          { name: 'Национальный музей Туркменистана', lat: 37.9601, lng: 58.3261, type: 'attraction' as const, description: 'Главный музей страны, коллекция артефактов, туркменские ковры, ювелирные изделия, исторические экспонаты' },
          { name: 'Горы Копетдаг', lat: 37.5000, lng: 58.0000, type: 'attraction' as const, description: 'Горный хребет на границе с Ираном, высота до 2942 метров, оазисы у подножия, пешеходные тропы' },
          { name: 'Пустыня Каракумы', lat: 39.0000, lng: 58.0000, type: 'attraction' as const, description: 'Одна из крупнейших песчаных пустынь в мире, оазисы, путешествия по пустыне, закаты' },
          { name: 'Аэропорт Ашхабад', lat: 37.9868, lng: 58.3610, type: 'airport' as const, description: 'Международный аэропорт Ашхабад (ASB), главные воздушные ворота страны' }
        ];
      case 'uae':
      case 'oae-gid':
        return [
          { name: 'Дубай', lat: 25.2048, lng: 55.2708, type: 'city' as const, description: 'Крупнейший город ОАЭ (3.4 млн), торговый и туристический хаб, небоскребы' },
          { name: 'Абу-Даби', lat: 24.4539, lng: 54.3773, type: 'city' as const, description: 'Столица ОАЭ (1.7 млн), нефтяное сердце федерации, культурный центр' },
          { name: 'Шарджа', lat: 25.3463, lng: 55.4209, type: 'city' as const, description: 'Культурная столица (1.8 млн), музеи, дешевле Дубая на 30-50%' },
          { name: 'Бурдж-Халифа', lat: 25.1972, lng: 55.2744, type: 'attraction' as const, description: 'Самое высокое здание мира (828м), смотровые площадки' },
          { name: 'Мечеть шейха Зайда', lat: 24.4129, lng: 54.4747, type: 'attraction' as const, description: 'Белоснежное чудо, 82 купола, символ ОАЭ, бесплатный вход' },
          { name: 'Palm Jumeirah', lat: 25.1124, lng: 55.1390, type: 'attraction' as const, description: 'Искусственный остров-пальма, Atlantis, частные пляжи' },
          { name: 'Dubai Mall', lat: 25.1975, lng: 55.2796, type: 'attraction' as const, description: '🛍 Крупнейший ТЦ мира, аквариум, каток, танцующие фонтаны' },
          { name: 'Burj Al Arab', lat: 25.1413, lng: 55.1853, type: 'attraction' as const, description: '🏨 7-звездочный отель-парус, символ роскоши' },
          { name: 'Лувр Абу-Даби', lat: 24.5333, lng: 54.4000, type: 'attraction' as const, description: 'Шедевры мирового искусства под куполом' },
          { name: 'Ferrari World', lat: 24.4833, lng: 54.6000, type: 'attraction' as const, description: '🏎 Самая быстрая американская горка в мире' },
          { name: 'Аэропорт Дубай (DXB)', lat: 25.2532, lng: 55.3657, type: 'airport' as const, description: 'Крупнейший в мире по пассажиропотоку, Emirates hub' },
          { name: 'Аэропорт Абу-Даби (AUH)', lat: 24.4330, lng: 54.6511, type: 'airport' as const, description: 'Etihad Airways hub, роскошные залы' }
        ];
      case 'uganda':
        return [
          { name: 'Кампала', lat: 0.3136, lng: 32.5811, type: 'city' as const, description: 'Столица Уганды (1.7 млн), город на семи холмах, культурный центр' },
          { name: 'Бвинди', lat: -0.9833, lng: 29.6167, type: 'attraction' as const, description: '🦍 Непроходимый лес, UNESCO, половина мировой популяции горных горилл' },
          { name: 'Мерчисон-Фоллс', lat: 2.2667, lng: 31.6833, type: 'attraction' as const, description: 'Водопад на Ниле, сафари, слоны, львы, жирафы' },
          { name: 'Королева Елизаветы', lat: -0.2000, lng: 30.0000, type: 'attraction' as const, description: 'Национальный парк, древолазающие львы, сафари' },
          { name: 'Джинджа', lat: 0.4244, lng: 33.2042, type: 'city' as const, description: '🚣 Исток Нила, рафтинг, водные виды спорта' },
          { name: 'Горы Рувензори', lat: 0.3833, lng: 29.8667, type: 'attraction' as const, description: 'Лунные горы, заснеженные вершины на экваторе' },
          { name: 'Кибале', lat: 0.4500, lng: 30.3833, type: 'attraction' as const, description: '🐵 Национальный парк, треккинг к шимпанзе' }
        ];
      case 'uruguay':
        return [
          { name: 'Монтевидео', lat: -34.9011, lng: -56.1645, type: 'city' as const, description: 'Столица Уругвая (1.3 млн), набережная Рамбла, исторический район Сьюдад-Вьеха' },
          { name: 'Пунта-дель-Эсте', lat: -34.9475, lng: -54.9338, type: 'resort' as const, description: 'Главный курорт страны, "Южноамериканский Сен-Тропе", пляжи, яхты, скульптура "Рука"' },
          { name: 'Колония-дель-Сакраменто', lat: -34.4607, lng: -57.8339, type: 'attraction' as const, description: 'Исторический квартал UNESCO, колониальная архитектура, мощенные улочки, португальские и испанские укрепления, XVII-XVIII века' },
          { name: 'Кабо-Полонио', lat: -34.4167, lng: -53.7833, type: 'attraction' as const, description: 'Удаленная рыбацкая деревня и национальный парк, маяк, колония морских львов' },
          { name: 'Сальто', lat: -31.3883, lng: -57.9606, type: 'city' as const, description: 'Второй по величине город, термальные источники, эстансии, культура гаучо' },
          { name: 'Пайсанду', lat: -32.3214, lng: -58.0756, type: 'city' as const, description: 'Третий по величине город Уругвая (90 тыс.), промышленный центр, исторические достопримечательности, театры, музеи, близость к термальным источникам' },
          { name: 'Ла-Палома', lat: -34.6667, lng: -54.1667, type: 'resort' as const, description: 'Тихий пляжный курорт без толп туристов, широкие пляжи' },
          { name: 'Пунта-дель-Диабло', lat: -34.0500, lng: -53.5500, type: 'resort' as const, description: 'Дикие пляжи и природные парки, экотуризм' },
          { name: 'Аэропорт Карраско (MVD)', lat: -34.8383, lng: -56.0308, type: 'airport' as const, description: 'Главный международный аэропорт Уругвая, Монтевидео' },
          { name: 'Термальные источники Сальто-Гранде', lat: -31.3000, lng: -57.9000, type: 'attraction' as const, description: 'Лечебные воды и спа-комплексы, популярное место для отдыха' }
        ];
      case 'ukraine':
        return [
          { name: 'Киев', lat: 50.4501, lng: 30.5234, type: 'city' as const, description: 'Столица Украины (2.9 млн), древняя столица Киевской Руси, золотые купола' },
          { name: 'Львов', lat: 49.8397, lng: 24.0297, type: 'city' as const, description: 'Культурная столица (720 тыс.), "Маленький Париж", австро-венгерская архитектура, UNESCO' },
          { name: 'Одесса', lat: 46.4825, lng: 30.7233, type: 'city' as const, description: 'Морской порт (1 млн), "Жемчужина у моря", Потемкинская лестница, Оперный театр' },
          { name: 'Киево-Печерская лавра', lat: 50.4342, lng: 30.5586, type: 'attraction' as const, description: 'Древний монастырь XI века, подземные пещеры с мощами святых, UNESCO' },
          { name: 'Софийский собор', lat: 50.4528, lng: 30.5144, type: 'attraction' as const, description: 'Один из древнейших храмов Киевской Руси (1037), мозаики и фрески XI века, UNESCO' },
          { name: 'Каменец-Подольский', lat: 48.6800, lng: 26.5800, type: 'attraction' as const, description: 'Средневековая крепость на скале, каньон реки Смотрич, один из семи чудес Украины' },
          { name: 'Хотинская крепость', lat: 48.5167, lng: 26.4833, type: 'attraction' as const, description: 'Средневековая крепость, объект культурного наследия, XIII-XVIII века, место съемок фильмов' },
          { name: 'Карпаты', lat: 48.5000, lng: 24.0000, type: 'attraction' as const, description: 'Горный массив, пеший туризм, лыжный спорт, деревянные церкви, зеленый туризм' },
          { name: 'Харьков', lat: 49.9935, lng: 36.2304, type: 'city' as const, description: 'Второй по величине город (1.4 млн), промышленный центр, историческая архитектура' },
          { name: 'Аэропорт Борисполь (KBP)', lat: 50.3450, lng: 30.8947, type: 'airport' as const, description: 'Главный международный аэропорт Украины, Киев' },
          { name: 'Аэропорт Львов (LWO)', lat: 49.8125, lng: 23.9561, type: 'airport' as const, description: 'Международный аэропорт, Западная Украина' }
        ];
      case 'velikobritaniya-gid':
        return [
          { name: 'Лондон', lat: 51.5074, lng: -0.1278, type: 'city' as const, description: 'Столица Великобритании (9 млн), финансовый центр, Тауэр, Биг-Бен, музеи' },
          { name: 'Эдинбург', lat: 55.9533, lng: -3.1883, type: 'city' as const, description: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Столица Шотландии (500 тыс.), замок, фестивальный город, Королевская миля' },
          { name: 'Стоунхендж', lat: 51.1789, lng: -1.8262, type: 'attraction' as const, description: 'Загадочный неолитический памятник (5000 лет), каменные мегалиты, UNESCO' },
          { name: 'Лондонский Тауэр', lat: 51.5081, lng: -0.0759, type: 'attraction' as const, description: 'Крепость-дворец XI века, сокровища короны, вороны Тауэра, UNESCO' },
          { name: 'Букингемский дворец', lat: 51.5014, lng: -0.1419, type: 'attraction' as const, description: '👑 Официальная резиденция монархов, смена караула, 775 комнат' },
          { name: 'Биг-Бен', lat: 51.4994, lng: -0.1245, type: 'attraction' as const, description: '🕐 Знаменитая башня с часами, символ Лондона, Вестминстерский дворец' },
          { name: 'Британский музей', lat: 51.5194, lng: -0.1270, type: 'attraction' as const, description: 'Один из крупнейших музеев мира, бесплатный вход, Розеттский камень' },
          { name: 'Озерный край', lat: 54.4609, lng: -3.0886, type: 'attraction' as const, description: 'Национальный парк, 16 озер, родина поэтов, Уиндермир, UNESCO' },
          { name: 'Дорога гигантов', lat: 55.2408, lng: -6.5116, type: 'attraction' as const, description: 'Базальтовые колонны вулканического происхождения, Северная Ирландия, UNESCO' },
          { name: 'Эдинбургский замок', lat: 55.9486, lng: -3.1999, type: 'attraction' as const, description: 'Символ Шотландии на вулканическом холме, Камень Судьбы, пушка One o\'Clock Gun' },
          { name: 'Аэропорт Хитроу (LHR)', lat: 51.4700, lng: -0.4543, type: 'airport' as const, description: 'Крупнейший аэропорт Великобритании, Heathrow Express до центра' },
          { name: 'Аэропорт Гатвик (LGW)', lat: 51.1537, lng: -0.1821, type: 'airport' as const, description: 'Второй по величине аэропорт, Gatwick Express до центра' }
        ];
      case 'tuvalu':
        return [
          { name: 'Фунафути', lat: -8.5167, lng: 179.2167, type: 'city' as const, description: 'Столица Тувалу (6,000 человек), единственный город, аэропорт, правительственные здания' },
          { name: 'Морской заповедник Фунафути', lat: -8.5000, lng: 179.2000, type: 'attraction' as const, description: '33 км² защищенной морской территории, нетронутые коралловые рифы, тропические рыбы, дельфины, черепахи' },
          { name: 'Коралловые сады Te Afualiku', lat: -8.4500, lng: 179.1500, type: 'attraction' as const, description: 'Подводные коралловые сады в идеальном состоянии, разноцветные кораллы, идеальная видимость' },
          { name: 'Остров Тепука Ви', lat: -8.4833, lng: 179.1833, type: 'attraction' as const, description: 'Необитаемый остров в лагуне Фунафути, девственные пляжи, гнездовья морских птиц, уединение' },
          { name: 'Пляж Funafala', lat: -8.5500, lng: 179.2000, type: 'attraction' as const, description: 'Живописный пляж на западной стороне атолла, белый коралловый песок, пальмы, закаты над лагуной' },
          { name: 'Музей Te Maneapa', lat: -8.5167, lng: 179.2167, type: 'attraction' as const, description: 'Национальный музей с экспозицией полинезийской культуры, традиционных ремесел, истории Тувалу' },
          { name: 'Церковь Niu Sione', lat: -8.5244, lng: 179.1956, type: 'attraction' as const, description: 'Главная протестантская церковь Тувалу, красивая архитектура из местных материалов, центр общественной жизни' },
          { name: 'Парламент Тувалу', lat: -8.5211, lng: 179.1978, type: 'attraction' as const, description: 'Здание парламента одного из самых маленьких государств мира, всего 15 депутатов' },
          { name: 'Рыболовецкий порт', lat: -8.5167, lng: 179.2100, type: 'attraction' as const, description: '🐠 Традиционная гавань с рыбацкими лодками, утренний рыбный рынок, аутентичная атмосфера' },
          { name: 'Атолл Нукуфетау', lat: -8.0000, lng: 178.5000, type: 'attraction' as const, description: 'Второй по величине атолл с обширной лагуной, нетронутая природа, традиционные деревни, бёрдвотчинг' },
          { name: 'Атолл Нануме', lat: -6.3167, lng: 176.3167, type: 'attraction' as const, description: 'Коралловые сады, дайвинг, нетронутая природа, традиционные деревни' },
          { name: 'Атолл Ваитупу', lat: -7.4833, lng: 178.6833, type: 'city' as const, description: 'Самый большой атолл по площади, обширная лагуна, традиционные деревни' },
          { name: 'Аэропорт Фунафути (FUN)', lat: -8.5250, lng: 179.1964, type: 'airport' as const, description: 'Единственный международный аэропорт в стране, рейсы Fiji Airways' }
        ];
      case 'turkey':
      case 'turtsiya-gid':
        return [
          { name: 'Стамбул', lat: 41.0082, lng: 28.9784, type: 'city' as const, description: 'Город двух континентов (15.8 млн), Айя-София, Топкапы, Голубая мечеть, Босфор' },
          { name: 'Анкара', lat: 39.9334, lng: 32.8597, type: 'city' as const, description: 'Столица Турции (5.7 млн), мавзолей Ататюрка, Музей анатолийских цивилизаций' },
          { name: 'Анталья', lat: 36.8969, lng: 30.7133, type: 'city' as const, description: 'Турецкая Ривьера (2.5 млн), пляжи, all-inclusive, античные города' },
          { name: 'Измир', lat: 38.4237, lng: 27.1428, type: 'city' as const, description: 'Жемчужина Эгейского моря (4.4 млн), близость к Эфесу, аутентичность' },
          { name: 'Айя-София', lat: 41.0086, lng: 28.9802, type: 'attraction' as const, description: 'Бывший собор и мечеть, символ Стамбула, христианские мозаики, исламская архитектура' },
          { name: 'Голубая мечеть', lat: 41.0054, lng: 28.9769, type: 'attraction' as const, description: 'Мечеть Султанахмет, 6 минаретов, голубые изникские изразцы' },
          { nameп: 'Топкапы', lat: 41.0115, lng: 28.9815, type: 'attraction' as const, description: 'Дворец султанов, сокровищница, реликвии пророка, виды на Босфор' },
          { name: 'Каппадокия', lat: 38.6431, lng: 34.8309, type: 'attraction' as const, description: '🎈 Воздушные шары, уникальные ландшафты, пещерные отели, подземные города' },
          { name: 'Гёреме', lat: 38.6374, lng: 34.8354, type: 'attraction' as const, description: 'Музей под открытым небом, византийские церкви в скалах, фрески' },
          { name: 'Подземный город Деринкую', lat: 38.3667, lng: 34.7333, type: 'attraction' as const, description: 'Крупнейший подземный город Каппадокии, уходит на глубину 85 метров, мог вмещать 20,000 человек' },
          { name: 'Памуккале', lat: 37.9204, lng: 29.1209, type: 'attraction' as const, description: 'Белые террасы травертина, термальные источники, античный театр Иераполис' },
          { name: 'Эфес', lat: 37.9392, lng: 27.3409, type: 'attraction' as const, description: 'Античный город, библиотека Цельса, амфитеатр, домики на склоне' },
          { name: 'Пергам', lat: 39.1167, lng: 27.1833, type: 'attraction' as const, description: 'Античный город с акрополем, библиотекой (вторая после Александрийской), амфитеатром, храмом Траяна' },
          { name: 'Троя', lat: 39.9575, lng: 26.2389, type: 'attraction' as const, description: 'Легендарный город из "Илиады" Гомера, место Троянской войны, 9 слоев города, Троянский конь' },
          { name: 'Каньон Саклыкент', lat: 36.3090, lng: 29.3044, type: 'attraction' as const, description: '18-километровое ущелье, ледяная вода даже летом, грязевые ванны' },
          { name: 'Сумела', lat: 40.6910, lng: 39.6628, type: 'attraction' as const, description: 'Висячий монастырь, византийский монастырь в скале, крутой подъем 300м' },
          { name: 'Ани', lat: 40.5067, lng: 43.5719, type: 'attraction' as const, description: 'Город 1001 церкви, руины армянской столицы, граница с Арменией' },
          { name: 'Озеро Салда', lat: 37.5500, lng: 29.6833, type: 'attraction' as const, description: '"Турецкие Мальдивы", кратерное озеро с белым песком и бирюзовой водой' },
          { name: 'Долина бабочек', lat: 36.5667, lng: 29.1167, type: 'attraction' as const, description: 'Скрытая бухта с белым песком, доступна только на лодке, названа в честь бабочек' },
          { name: 'Фетхие', lat: 36.6518, lng: 29.1265, type: 'resort' as const, description: 'Бирюзовое побережье, дайвинг, яхтинг, Кабак бухта, остров Кекова' },
          { name: 'Каш', lat: 36.2000, lng: 29.6333, type: 'resort' as const, description: 'Бирюзовое побережье, дайвинг, снорклинг, пляж Патара, менее туристично' },
          { name: 'Бодрум', lat: 37.0344, lng: 27.4305, type: 'resort' as const, description: 'Эгейский курорт, ночная жизнь, яхтинг, мавзолей в Галикарнасе' },
          { name: 'Мармарис', lat: 36.8550, lng: 28.2742, type: 'resort' as const, description: 'Средиземноморский курорт, длинные песчаные пляжи, активная ночная жизнь' },
          { name: 'Шириндже', lat: 38.0333, lng: 27.1667, type: 'attraction' as const, description: 'Горная деревня с винодельнями, традиционная архитектура, панорамные виды' },
          { name: 'Галлиполи', lat: 40.4167, lng: 26.6833, type: 'attraction' as const, description: 'Поля сражений Первой мировой войны, мемориалы, исторические места' },
          { name: 'Галатская башня', lat: 41.0256, lng: 28.9742, type: 'attraction' as const, description: 'Средневековая башня в Стамбуле, панорамные виды на город и Босфор' },
          { name: 'Гранд Базар', lat: 41.0106, lng: 28.9681, type: 'attraction' as const, description: '🛍 Крупнейший крытый базар в мире, более 4000 магазинов, ковры, керамика, сувениры' },
          { name: 'Аэропорт Стамбул', lat: 41.2753, lng: 28.7519, type: 'airport' as const, description: 'Международный аэропорт Стамбула (IST), главные воздушные ворота Турции' },
          { name: 'Аэропорт Анталья', lat: 36.8986, lng: 30.8005, type: 'airport' as const, description: 'Международный аэропорт Антальи (AYT), курортный аэропорт' },
          { name: 'Аэропорт Измир', lat: 38.2922, lng: 27.1569, type: 'airport' as const, description: 'Международный аэропорт Измира (ADB), аэропорт Эгейского региона' }
        ];
      case 'uzbekistan':
      case 'uzbekistan-gid':
        return [
          { name: 'Ташкент', lat: 41.2995, lng: 69.2401, type: 'city' as const, description: 'Столица Узбекистана (2.8 млн), современный мегаполис, метро, музеи, базар Чорсу' },
          { name: 'Самарканд', lat: 39.6547, lng: 66.9597, type: 'city' as const, description: 'Жемчужина Шелкового пути, Регистан, мавзолей Гур-Эмир, некрополь Шахи-Зинда, UNESCO объект' },
          { name: 'Бухара', lat: 39.7747, lng: 64.4286, type: 'city' as const, description: 'Священный город, крепость Арк, минарет Калян, медресе, Ляби-Хауз, UNESCO объект' },
          { name: 'Хива', lat: 41.3785, lng: 60.3644, type: 'city' as const, description: 'Музей под открытым небом, Ичан-Кала, застывшая во времени, UNESCO объект' },
          { name: 'Регистан', lat: 39.6547, lng: 66.9597, type: 'attraction' as const, description: 'Площадь Регистан в Самарканде, три медресе XV-XVII веков, символ страны' },
          { name: 'Мавзолей Гур-Эмир', lat: 39.6547, lng: 66.9597, type: 'attraction' as const, description: 'Мавзолей Тамерлана, объект ЮНЕСКО, XV век, усыпальница династии Тимуридов' },
          { name: 'Шахрисабз', lat: 39.0572, lng: 66.8342, type: 'city' as const, description: 'Родина Тамерлана, дворец Ак-Сарай, руины "белого дворца", UNESCO объект' },
          { name: 'Фергана', lat: 40.3842, lng: 71.7843, type: 'city' as const, description: 'Ферганская долина, центр шелкоткачества (Маргилан), керамика (Риштан), традиционные ремесла' },
          { name: 'Нукус', lat: 42.4647, lng: 59.6144, type: 'city' as const, description: 'Столица Каракалпакстана, музей Савицкого, запрещенное советское искусство' },
          { name: 'Аэропорт Ташкент', lat: 41.2573, lng: 69.2812, type: 'airport' as const, description: 'Международный аэропорт Ташкента (TAS), главные воздушные ворота Узбекистана' },
          { name: 'Аэропорт Самарканд', lat: 39.7006, lng: 66.9839, type: 'airport' as const, description: 'Международный аэропорт Самарканда (SKD), прямые международные рейсы' }
        ];
      case 'usa':
      case 'ssha-gid':
        return [
          { name: 'Нью-Йорк', lat: 40.7128, lng: -74.0060, type: 'city' as const, description: 'Финансовая столица мира (8.8 млн), небоскребы, Бродвей, Статуя Свободы, Центральный парк' },
          { name: 'Лос-Анджелес', lat: 34.0522, lng: -118.2437, type: 'city' as const, description: 'Голливуд (4.0 млн), пляжи, развлечения, студии, Аллея славы, Санта-Моника' },
          { name: 'Вашингтон', lat: 38.9072, lng: -77.0369, type: 'city' as const, description: 'Столица США (705 тыс.), Белый дом, Капитолий, музеи, мемориалы, Национальная аллея, река Потомак, восток США' },
          { name: 'Сан-Франциско', lat: 37.7749, lng: -122.4194, type: 'city' as const, description: 'Мост Золотые Ворота, Алькатрас, технологический центр (875 тыс.), канатные дороги, залив, запад США, Калифорния' },
          { name: 'Чикаго', lat: 41.8781, lng: -87.6298, type: 'city' as const, description: 'Архитектура, небоскребы (2.7 млн), джаз, пицца, озеро Мичиган, музеи, театры, третий по величине город, центр США' },
          { name: 'Майами', lat: 25.7617, lng: -80.1918, type: 'city' as const, description: 'Пляжи, арт-деко архитектура Саут-Бич (470 тыс.), ночная жизнь, латиноамериканская культура, Атлантический океан, юго-восток США' },
          { name: 'Лас-Вегас', lat: 36.1699, lng: -115.1398, type: 'city' as const, description: 'Казино, шоу-программы (650 тыс.), тематические отели, свадебные часовни, Гранд-Каньон рядом, пустыня, запад США, Невада' },
          { name: 'Гранд-Каньон', lat: 36.1069, lng: -112.1129, type: 'attraction' as const, description: 'Одно из семи природных чудес света, длина 446 км, глубина 1.8 км, пешие маршруты, рафтинг' },
          { name: 'Йеллоустоун', lat: 44.4280, lng: -110.5885, type: 'attraction' as const, description: 'Первый национальный парк мира (1872), гейзер Олд-Фейтфул, горячие источники, бизоны, медведи гризли' },
          { name: 'Йосемити', lat: 37.8651, lng: -119.5383, type: 'attraction' as const, description: 'Гранитные скалы, водопады, секвойи, скала Эль-Капитан, водопад Йосемити (739 м)' },
          { name: 'Ниагарский водопад', lat: 43.0962, lng: -79.0377, type: 'attraction' as const, description: 'Самый мощный водопад Северной Америки, высота 51 м, три водопада, подсветка ночью, катер к подножию' },
          { name: 'Статуя Свободы', lat: 40.6892, lng: -74.0445, type: 'attraction' as const, description: 'Символ свободы и демократии, подарок Франции 1886 года, высота 93 метра, смотровая площадка в короне' },
          { name: 'Аэропорт JFK', lat: 40.6413, lng: -73.7781, type: 'airport' as const, description: 'Международный аэропорт имени Джона Кеннеди (JFK), крупнейший в Нью-Йорке, Квинс, главные воздушные ворота восточного побережья' },
          { name: 'Аэропорт LAX', lat: 33.9425, lng: -118.4081, type: 'airport' as const, description: 'Международный аэропорт Лос-Анджелеса (LAX), западное побережье, крупнейший аэропорт западного побережья, Калифорния' }
        ];
      case 'vanuatu':
      case 'vanuatu-gid':
        return [
          { name: 'Порт-Вила', lat: -17.7333, lng: 168.3167, type: 'city' as const, description: 'Столица Вануату (50 тыс.), главный туристический центр, международный аэропорт, круизный порт' },
          { name: 'Вулкан Ясур', lat: -19.5322, lng: 169.4478, type: 'attraction' as const, description: 'Один из самых доступных действующих вулканов мира (361 м), постоянно активный стромболианский вулкан, ночные туры, остров Танна, популярное место' },
          { name: 'SS President Coolidge', lat: -15.5167, lng: 167.2167, type: 'attraction' as const, description: 'Крупнейший доступный рэк в мире, 200-метровое судно времен WWII, все уровни дайверов, остров Эспириту-Санто, Тихий океан, популярное место' },
          { name: 'Голубая дыра Матевулу', lat: -15.2167, lng: 166.8833, type: 'attraction' as const, description: 'Кристально чистый пресноводный бассейн ярко-голубого цвета среди джунглей, плавание, снорклинг, остров Эспириту-Санто, популярное место' },
          { name: 'Лэнд-дайвинг (Пентекост)', lat: -15.7500, lng: 168.1833, type: 'attraction' as const, description: 'Родина банджи-джампинга, традиционный ритуал плодородия, мужчины прыгают с 30-метровых башен, остров Пентекост, уникальное зрелище, популярное место' },
          { name: 'Луганвилль', lat: -15.5167, lng: 167.1833, type: 'city' as const, description: 'Второй по величине город (15 тыс.), ворота к SS President Coolidge, голубым дырам, дайв-сайтам, остров Эспириту-Санто, Тихий океан' },
          { name: 'Ленакел', lat: -19.5500, lng: 169.3000, type: 'city' as const, description: 'Главный город острова Танна (3 тыс.), база для посещения вулкана Ясур, традиционные деревни, юг Вануату, Тихий океан' },
          { name: 'Аэропорт Бауэрфилд', lat: -17.6993, lng: 168.3198, type: 'airport' as const, description: 'Международный аэропорт Порт-Вилы (VLI), главные воздушные ворота Вануату, близость к столице, крупнейший аэропорт страны' },
          { name: 'Аэропорт Санто-Пеколеа', lat: -15.5050, lng: 167.2200, type: 'airport' as const, description: 'Аэропорт Эспириту-Санто (SON), обслуживает дайвинг-туризм, остров Эспириту-Санто, близость к Луганвиллю, второй по величине аэропорт' }
        ];
      case 'vatican-gid':
      case 'vatican':
        return [
          { name: 'Сикстинская капелла', lat: 41.9029, lng: 12.4545, type: 'attraction' as const, description: 'Фрески Микеланджело, "Сотворение Адама", "Страшный суд", место избрания Папы, XV век, объект ЮНЕСКО, популярное место' },
          { name: 'Собор Святого Петра', lat: 41.9022, lng: 12.4539, type: 'attraction' as const, description: 'Крупнейшая христианская базилика (1506-1626), гробница Святого Петра, купол Микеланджело, "Пьета", объект ЮНЕСКО, популярное место' },
          { name: 'Музеи Ватикана', lat: 41.9065, lng: 12.4536, type: 'attraction' as const, description: '54 галереи, 9 км выставочных залов, Рафаэлевы станцы, античные скульптуры, один из крупнейших музеев мира, популярное место' },
          { name: 'Площадь Святого Петра', lat: 41.9022, lng: 12.4574, type: 'attraction' as const, description: 'Колоннада Бернини (284 колонны), египетский обелиск, фонтаны, XVII век, объект ЮНЕСКО, популярное место для фото' },
          { name: 'Станцы Рафаэля', lat: 41.9036, lng: 12.4545, type: 'attraction' as const, description: '4 зала с фресками Рафаэля, "Афинская школа", "Парнас", "Диспута", XVI век, объект ЮНЕСКО, популярное место' },
          { name: 'Пинакотека Ватикана', lat: 41.9065, lng: 12.4536, type: 'attraction' as const, description: '🖼 Картины Рафаэля, Караваджо, Леонардо да Винчи, "Преображение" Рафаэля, коллекция эпохи Возрождения, популярное место' },
          { name: 'Сады Ватикана', lat: 41.9036, lng: 12.4491, type: 'attraction' as const, description: '23 гектара садов, гроты, фонтаны, вертолетная площадка Папы, только с экскурсией, объект ЮНЕСКО, популярное место' },
          { name: 'Некрополь Скави', lat: 41.9022, lng: 12.4539, type: 'attraction' as const, description: 'Древнее кладбище под собором, гробница Святого Петра, только по предварительной записи' },
          { name: 'Аэропорт Фьюмичино (FCO)', lat: 41.8003, lng: 12.2389, type: 'airport' as const, description: 'Международный аэропорт Рима, 32 км от Ватикана, главные воздушные ворота' },
          { name: 'Аэропорт Чампино (CIA)', lat: 41.7994, lng: 12.5919, type: 'airport' as const, description: 'Аэропорт Рима для лоукостов, 20 км от Ватикана' }
        ];
      case 'vietnam':
      case 'vetnam-gid':
        return [
          { name: 'Ханой', lat: 21.0285, lng: 105.8542, type: 'city' as const, description: 'Столица Вьетнама (8 млн), Старый квартал, озеро Хоан Кием, храмы, уличная еда' },
          { name: 'Хошимин (Сайгон)', lat: 10.8231, lng: 106.6297, type: 'city' as const, description: 'Крупнейший город (9 млн), французская архитектура, рынки, ночная жизнь' },
          { name: 'Дананг', lat: 16.0544, lng: 108.2022, type: 'city' as const, description: 'Третий по величине город Вьетнама (1.2 млн), порт на Южно-Китайском море, пляжи, мост Дракона, Мраморные горы, ворота в Хойан и Хюэ' },
          { name: 'Хойан', lat: 15.8801, lng: 108.3380, type: 'city' as const, description: 'ЮНЕСКО город, японский мост, фонарики, старинные дома, романтическая атмосфера' },
          { name: 'Хюэ', lat: 16.4637, lng: 107.5909, type: 'city' as const, description: 'Древняя столица (350 тыс.), Императорский город, цитадель, гробницы императоров' },
          { name: 'Императорский город Хюэ', lat: 16.4637, lng: 107.5909, type: 'attraction' as const, description: 'Императорская цитадель, объект ЮНЕСКО, дворец, храмы, гробницы династии Нгуен, XIX век' },
          { name: 'Сапа', lat: 22.3380, lng: 103.8443, type: 'city' as const, description: 'Горный курорт, рисовые террасы, треккинг, деревни этнических меньшинств' },
          { name: 'Бухта Халонг', lat: 20.9101, lng: 107.1839, type: 'attraction' as const, description: 'ЮНЕСКО, 1600 карстовых островов, круизы, пещеры, каякинг, одно из 7 новых чудес природы' },
          { name: 'Рисовые террасы Сапы', lat: 22.3380, lng: 103.8443, type: 'attraction' as const, description: '🌾 Многоуровневые рисовые поля на склонах гор, деревни хмонг, треккинг, лучшие фото май-сентябрь' },
          { name: 'Национальный парк Фонг Нха', lat: 17.6000, lng: 106.3000, type: 'attraction' as const, description: '🕳 Крупнейшие пещеры мира, пещера Шон (подземная река), Парадайз пещера, ЮНЕСКО' },
          { name: 'Фукуок', lat: 10.2899, lng: 103.9840, type: 'resort' as const, description: 'Крупнейший остров Вьетнама, тропические пляжи, дайвинг, канатная дорога (самая длинная в мире)' },
          { name: 'Нячанг', lat: 12.2388, lng: 109.1967, type: 'resort' as const, description: 'Популярный пляжный курорт, все виды водного спорта, башни Понагар, грязи и минеральные источники' },
          { name: 'Аэропорт Ной Бай (HAN)', lat: 21.2212, lng: 105.8072, type: 'airport' as const, description: 'Международный аэропорт Ханоя, главные воздушные ворота севера Вьетнама' },
          { name: 'Аэропорт Таншоннят (SGN)', lat: 10.8188, lng: 106.6519, type: 'airport' as const, description: 'Международный аэропорт Хошимина, главные воздушные ворота юга Вьетнама' },
          { name: 'Аэропорт Дананг (DAD)', lat: 16.0439, lng: 108.1994, type: 'airport' as const, description: 'Международный аэропорт Дананга, ворота к центральному Вьетнаму, Хойану, Хюэ' }
        ];
      case 'venezuela':
      case 'venesuela-angel-tepuy-neft-karaibskie-plyazhi-gid':
        return [
          { name: 'Каракас', lat: 10.4806, lng: -66.9036, type: 'city' as const, description: 'Столица Венесуэлы (3 млн), культурный и экономический центр, канатная дорога на гору Авила' },
          { name: 'Водопад Анхель', lat: 5.9669, lng: -62.5362, type: 'attraction' as const, description: 'Самый высокий водопад мира (979 м), падает с тепуи Ауянтепуи, национальный парк Канайма' },
          { name: 'Гора Рорайма', lat: 5.1431, lng: -60.7627, type: 'attraction' as const, description: '"Мать всех вод" (2810 м), треугольная тепуи на стыке трех стран, вдохновила "Затерянный мир"' },
          { name: 'Национальный парк Лос-Рокес', lat: 11.9500, lng: -66.6833, type: 'resort' as const, description: '42 коралловых острова, белоснежные пляжи, бирюзовая вода, кайтсерфинг, дайвинг' },
          { name: 'Национальный парк Канайма', lat: 5.7000, lng: -61.6000, type: 'attraction' as const, description: '🌅 30,000 км² тепуи и водопадов, объект ЮНЕСКО, племена пемон, древнейшие породы Земли' },
          { name: 'Остров Маргарита', lat: 10.9978, lng: -63.9547, type: 'resort' as const, description: '"Жемчужина Карибов", 50 пляжей, беспошлинная торговля, кайтсерфинг в Эль-Яке' },
          { name: 'Дельта Ориноко', lat: 8.6000, lng: -62.0000, type: 'attraction' as const, description: 'Мангровые лабиринты, племена варао, речные дельфины, кайманы, сотни видов птиц' },
          { name: 'Льянос', lat: 8.0000, lng: -67.0000, type: 'attraction' as const, description: '🦆 300,000 км² саванн, ковбойская культура льянеро, ранчо, наблюдение за дикой природой' },
          { name: 'Пик Боливар', lat: 8.5502, lng: -71.0520, type: 'attraction' as const, description: 'Высшая точка Венесуэлы (4978 м) в Андах, ледник Хумбольдта, альпинизм' },
          { name: 'Меданосы де Коро', lat: 11.4083, lng: -69.6819, type: 'attraction' as const, description: 'Единственная пустыня Венесуэлы, песчаные дюны до 40 м, сэндбординг, закаты' },
          { name: 'Маракайбо', lat: 10.6317, lng: -71.6406, type: 'city' as const, description: 'Второй по величине город (1.5 млн), нефтяная столица, озеро Маракайбо' },
          { name: 'Аэропорт Симон Боливар (CCS)', lat: 10.6012, lng: -66.9912, type: 'airport' as const, description: 'Главный международный аэропорт Каракаса, воздушные ворота Венесуэлы' }
        ];
      case 'western-sahara':
      case 'zapadnaya-sahara-gid':
        return [
          { name: 'Эль-Аюн', lat: 27.1536, lng: -13.2033, type: 'city' as const, description: 'Административный центр (200 тыс.), крупнейший город, белые дюны, музей сахрави' },
          { name: 'Дахла', lat: 23.7167, lng: -15.9333, type: 'city' as const, description: '‍♂ Мировая столица кайтсерфинга (100 тыс.), лагуна, пляжи, рыболовство' },
          { name: 'Лагуна Дахла', lat: 23.7167, lng: -15.9333, type: 'attraction' as const, description: '‍♂ Идеальные условия для кайтсерфинга круглый год, теплая вода, белые дюны' },
          { name: 'Белые дюны Эль-Аюна', lat: 27.1000, lng: -13.2000, type: 'attraction' as const, description: 'Огромные песчаные дюны, сэндбординг, верблюжьи прогулки, ночевка в пустыне' },
          { name: 'Залив Сен-Кинтен', lat: 23.8500, lng: -15.8000, type: 'attraction' as const, description: '🐋 Природный заповедник, наблюдение за дельфинами, китами, розовыми фламинго' },
          { name: 'Пляж Пунта-Серена', lat: 23.6000, lng: -15.9500, type: 'resort' as const, description: 'Бескрайний песчаный пляж, серфинг, рыбалка, дикая природа, розовые фламинго' },
          { name: 'Розовое озеро (Себхет Тах)', lat: 27.0000, lng: -12.8000, type: 'attraction' as const, description: 'Уникальный природный феномен, соленое озеро с розовой водой, наблюдение за птицами' },
          { name: 'Смара', lat: 26.7333, lng: -11.6667, type: 'city' as const, description: 'Внутренний город (50 тыс.), торговый центр, караванные маршруты' },
          { name: 'Бужжур', lat: 26.1333, lng: -14.4833, type: 'city' as const, description: 'Прибрежный город (30 тыс.), порт, рыбалка, менее туристично' },
          { name: 'Фосфатные карьеры Бу-Краа', lat: 26.3333, lng: -12.8667, type: 'attraction' as const, description: 'Крупнейшие фосфатные месторождения в мире, промышленный туризм, конвейерная лента 100 км' },
          { name: 'Рыбацкий порт Дахлы', lat: 23.7167, lng: -15.9500, type: 'attraction' as const, description: '🎣 Крупнейший рыболовецкий порт региона, морская рыбалка, свежие морепродукты' },
          { name: 'Аэропорт Эль-Аюн (EUN)', lat: 27.1517, lng: -13.2192, type: 'airport' as const, description: 'Главный аэропорт региона, международные рейсы через Марокко' }
        ];
      case 'yemen':
      case 'yemen-gid':
        return [
          { name: 'Сана', lat: 15.3694, lng: 44.1910, type: 'city' as const, description: 'Столица (2.9 млн), старый город ЮНЕСКО, 8-этажные глиняные дома, Великая мечеть' },
          { name: 'Аден', lat: 12.7794, lng: 45.0367, type: 'city' as const, description: 'Временная столица, порт в кратере вулкана, британское наследие' },
          { name: 'Шибам', lat: 15.9263, lng: 48.6257, type: 'attraction' as const, description: '🏢 "Манхэттен пустыни" (ЮНЕСКО), первые глиняные небоскребы XVI века, 500 домов до 30м' },
          { name: 'Остров Сокотра', lat: 12.5000, lng: 53.9000, type: 'attraction' as const, description: '"Галапагосы Индийского океана" (ЮНЕСКО), 30% растений эндемичны, драконовы деревья' },
          { name: 'Забид', lat: 14.1951, lng: 43.3147, type: 'attraction' as const, description: 'Древний университетский город (ЮНЕСКО), столица исламского образования XIII-XV вв.' },
          { name: 'Мариб', lat: 15.4353, lng: 45.3311, type: 'attraction' as const, description: '👑 Столица царства Савы, развалины плотины Мариб (VIII в. до н.э.), царица Савская' },
          { name: 'Дар аль-Хаджар', lat: 15.1641, lng: 44.1358, type: 'attraction' as const, description: 'Дворец на скале, символ Йемена, самое фотографируемое здание' },
          { name: 'Хадрамаут', lat: 15.9500, lng: 48.7800, type: 'attraction' as const, description: 'Долина небоскребов, цепь городов с глиняными домами, торговля благовониями' },
          { name: 'Таиз', lat: 13.5820, lng: 44.0209, type: 'city' as const, description: 'Горный город, крепость Каср аль-Салах, прохладный климат' },
          { name: 'Вади Дахар', lat: 15.2000, lng: 44.0500, type: 'attraction' as const, description: '🌄 Живописная долина, традиционные деревни, древние системы орошения' },
          { name: 'Аэропорт Сана (SAH)', lat: 15.4762, lng: 44.2197, type: 'airport' as const, description: 'Главный международный аэропорт Йемена, воздушные ворота страны' },
          { name: 'Аэропорт Аден (ADE)', lat: 12.8295, lng: 45.0288, type: 'airport' as const, description: 'Международный аэропорт Адена, второй по важности аэропорт' }
        ];
      case 'zambia':
        return [
          { name: 'Лусака', lat: -15.3875, lng: 28.3228, type: 'city' as const, description: 'Столица Замбии (2.5 млн), административный и экономический центр, рынки, музеи, университеты, юг страны' },
          { name: 'Ливингстон', lat: -17.8419, lng: 25.8543, type: 'city' as const, description: 'Туристическая столица (150 тыс.), рядом с водопадом Виктория, музеи, рынки, отели, юг Замбии, граница с Зимбабве' },
          { name: 'Водопад Виктория', lat: -17.9243, lng: 25.8572, type: 'attraction' as const, description: 'Один из крупнейших водопадов мира (ЮНЕСКО), "Гремящий дым", ширина 1.7 км, высота 108 м, река Замбези, рафтинг, банджи' },
          { name: 'Национальный парк Южная Луангва', lat: -13.0000, lng: 31.5000, type: 'attraction' as const, description: 'Родина пеших сафари, лучшее место для наблюдения за леопардами, слоны, бегемоты, река Луангва, восток Замбии, ночные сафари' },
          { name: 'Национальный парк Нижняя Замбези', lat: -15.0000, lng: 29.5000, type: 'attraction' as const, description: '🛶 Сафари на каноэ, слоны и бегемоты, уникальный опыт с воды, река Замбези, юг Замбии, менее туристический' },
          { name: 'Национальный парк Кафуэ', lat: -15.0000, lng: 26.0000, type: 'attraction' as const, description: 'Один из крупнейших парков Африки (22 400 км²), разнообразная экосистема, антилопы, львы, река Кафуэ, центр Замбии' },
          { name: 'Ндола', lat: -12.9683, lng: 28.6336, type: 'city' as const, description: '🏭 Второй по величине город (500 тыс.), промышленный центр, медь, кобальт, север Замбии, рынки' },
          { name: 'Китве', lat: -12.8000, lng: 28.2000, type: 'city' as const, description: '⛏ Горнодобывающий центр (500 тыс.), медь, кобальт, промышленный регион, север Замбии, близость к Ндоле' },
          { name: 'Кабве', lat: -14.2167, lng: 28.4500, type: 'city' as const, description: 'Исторический город (200 тыс.), культурное наследие, центр провинции, рынки, центральная Замбия' },
          { name: 'Озеро Кариба', lat: -17.0000, lng: 27.5000, type: 'attraction' as const, description: 'Одно из крупнейших искусственных озер мира (5400 км²), водные виды спорта, рыбалка, граница с Зимбабве, река Замбези' },
          { name: 'Аэропорт Лусака (LUN)', lat: -15.3308, lng: 28.4526, type: 'airport' as const, description: 'Главный международный аэропорт Замбии' },
          { name: 'Аэропорт Ливингстон (LVI)', lat: -17.8219, lng: 25.8227, type: 'airport' as const, description: 'Международный аэропорт для доступа к водопаду Виктория' }
        ];
      case 'zimbabwe':
        return [
          { name: 'Хараре', lat: -17.8292, lng: 31.0522, type: 'city' as const, description: 'Столица Зимбабве (1.5 млн), административный и экономический центр, рынки, музеи, университеты, северо-восток страны' },
          { name: 'Виктория-Фолс', lat: -17.9243, lng: 25.8572, type: 'city' as const, description: 'Туристический город (35 тыс.), рядом с водопадом Виктория, отели, рафтинг, банджи, граница с Замбией, северо-запад' },
          { name: 'Водопад Виктория', lat: -17.9243, lng: 25.8572, type: 'attraction' as const, description: 'Один из крупнейших водопадов мира (ЮНЕСКО), "Гремящий дым", зимбабвийская сторона предлагает самые панорамные виды, ширина 1.7 км, высота 108 м' },
          { name: 'Великий Зимбабве', lat: -20.2686, lng: 30.9333, type: 'attraction' as const, description: 'Руины древнего города, столицы империи Мономотапа (XI-XV века), крупнейший каменный монумент в Африке южнее Сахары (ЮНЕСКО), юг Зимбабве' },
          { name: 'Национальный парк Хванге', lat: -18.5000, lng: 26.5000, type: 'attraction' as const, description: 'Крупнейший заповедник в стране (14 600 км²), известный огромной популяцией слонов (40 тыс.), Большая пятерка, запад Зимбабве' },
          { name: 'Национальный парк Мана-Пулс', lat: -15.7000, lng: 29.3500, type: 'attraction' as const, description: '🛶 Объект ЮНЕСКО на реке Замбези, популярен для пеших сафари и сафари на каноэ, бегемоты, крокодилы, север Зимбабве' },
          { name: 'Горы Матобо', lat: -20.5000, lng: 28.5000, type: 'attraction' as const, description: 'Национальный парк с гранитными холмами и наскальными рисунками бушменов (ЮНЕСКО), пещеры, балансирующие скалы, юго-запад Зимбабве' },
          { name: 'Булавайо', lat: -20.1500, lng: 28.5833, type: 'city' as const, description: 'Второй по величине город (650 тыс.), исторический центр, музеи, железнодорожный музей, юго-запад Зимбабве' },
          { name: 'Озеро Кариба', lat: -17.0000, lng: 27.5000, type: 'attraction' as const, description: 'Одно из крупнейших искусственных озер мира (5400 км²), водные виды спорта, рыбалка, граница с Замбией, река Замбези, север Зимбабве' },
          { name: 'Руины Кхами', lat: -20.1500, lng: 28.4000, type: 'attraction' as const, description: 'Археологический памятник, объект ЮНЕСКО, руины XV-XVII веков, близость к Булавайо, каменные стены, юго-запад Зимбабве' },
          { name: 'Аэропорт Хараре (HRE)', lat: -17.8292, lng: 31.0522, type: 'airport' as const, description: 'Главный международный аэропорт Зимбабве' },
          { name: 'Аэропорт Виктория-Фолс (VFA)', lat: -18.0958, lng: 25.8392, type: 'airport' as const, description: 'Международный аэропорт для доступа к водопаду Виктория' }
        ];
      default:
        return places;
    }
  };

  // Получаем места либо из переданных props, либо из предустановленных мест
  const defaultPlaces = places && places.length > 0
    ? places
    : getDefaultPlaces();

  // Генерация URL для разных картографических сервисов
  const generateMapUrls = () => {
    const centerLat = finalCoordinates.lat;
    const centerLng = finalCoordinates.lng;

    return {
      yandex: `https://yandex.ru/maps/?ll=${centerLng}%2C${centerLat}&z=9&l=map`,
      google: `https://www.google.com/maps/@${centerLat},${centerLng},9z`,
      osm: `https://www.openstreetmap.org/#map=9/${centerLat}/${centerLng}`
    };
  };

  const mapUrls = generateMapUrls();

  const generateRouteUrl = () => {
    switch (activeMapProvider) {
      case 'yandex':
        // Правильный формат для Яндекс Карт: rtext=откуда~куда~следующая точка
        const yandexWaypoints = defaultPlaces.slice(0, 4).map(place => `${place.lat},${place.lng}`).join('~');
        return `https://yandex.ru/maps/?rtext=${yandexWaypoints}&rtt=auto`;
      case 'google':
        // Google Maps: директория с координатами через слеш
        const googleWaypoints = defaultPlaces.slice(0, 4).map(place => `${place.lat},${place.lng}`).join('/');
        return `https://www.google.com/maps/dir/${googleWaypoints}`;
      default:
        // OpenStreetMap - простая карта с центром
        return mapUrls.osm;
    }
  };

  return (
    <div id="maps" className={`country-map-integration bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          🗺️ Интерактивная карта {countryName}
        </h3>
        <p className="text-sm text-gray-600">
          Исследуйте ключевые места и планируйте маршрут. {countryName} — идеальное место для путешествий.
        </p>
      </div>

      {/* Переключатель картографических сервисов */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveMapProvider('yandex')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${activeMapProvider === 'yandex'
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            📍 Яндекс Карты
          </button>
          <button
            onClick={() => setActiveMapProvider('google')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${activeMapProvider === 'google'
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            🌍 Google Maps
          </button>
          <button
            onClick={() => setActiveMapProvider('osm')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${activeMapProvider === 'osm'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            🗺️ Интерактивная карта
          </button>
        </div>
      </div>

      {/* Ключевые места */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">📍 Ключевые места:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {defaultPlaces.map((place, index) => (
            <div key={index} className="flex items-center text-sm p-2 bg-gray-50 rounded-md">
              <span className="mr-2">
                {place.type === 'city' && '🏛️'}
                {place.type === 'resort' && '🏖️'}
                {place.type === 'attraction' && '⭐'}
                {place.type === 'airport' && '✈️'}
              </span>
              <div>
                <div className="font-medium text-gray-900">{place.name}</div>
                {place.description && (
                  <div className="text-gray-600 text-xs">{place.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="space-y-2">
        <a
          href={mapUrls[activeMapProvider]}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          🗺️ Открыть карту {countryName}
        </a>

        {defaultPlaces.length > 1 && (
          <a
            href={generateRouteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            🚗 Построить маршрут по достопримечательностям
          </a>
        )}

        <button
          onClick={() => {
            if (isClient) {
              const mapData = {
                country: countryName,
                places: defaultPlaces,
                coordinates: finalCoordinates
              };
              if (navigator.clipboard) {
                navigator.clipboard.writeText(JSON.stringify(mapData, null, 2));
                alert('Данные карты скопированы в буфер обмена!');
              }
            }
          }}
          className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          📋 Экспортировать точки маршрута
        </button>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <div>📍 Центральные координаты: {finalCoordinates.lat.toFixed(4)}°N, {Math.abs(finalCoordinates.lng).toFixed(4)}°{finalCoordinates.lng >= 0 ? 'E' : 'W'}</div>
          <div>🎯 Найдено {defaultPlaces.length} ключевых мест для посещения</div>
          <div>🗺️ Поддержка: Яндекс Карты, Google Maps, Stadia Maps</div>
        </div>
      </div>

      {/* Структурированные данные для карты */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": countryName,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": finalCoordinates.lat,
              "longitude": finalCoordinates.lng
            },
            "hasMap": mapUrls[activeMapProvider],
            "containedInPlace": defaultPlaces.map(place => ({
              "@type": "Place",
              "name": place.name,
              "description": place.description,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": place.lat,
                "longitude": place.lng
              }
            }))
          }, null, 2)
        }}
      />

      {/* Дополнительные структурированные данные для Ирана */}
      {countryId === 'iran' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(iranSchemas, null, 2)
          }}
        />
      )}
    </div>
  );
};