'use client';

import { useState, useMemo, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import Link from 'next/link';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

type LandmarkType = 'wonder' | 'nature' | 'city' | 'culture' | 'religion';

interface Landmark {
  id: number;
  name: string;
  country: string;
  type: LandmarkType;
  lng: number;
  lat: number;
  description: string;
  wikiLink: string;
}

const LANDMARKS: Landmark[] = [
  // Чудеса света
  { id: 1, name: 'Великая Китайская стена', country: 'Китай', type: 'wonder', lng: 116.5704, lat: 40.4319, description: 'Древнейшее оборонительное сооружение протяжённостью более 21 000 км.', wikiLink: '/wiki/china' },
  { id: 2, name: 'Мачу-Пикчу', country: 'Перу', type: 'wonder', lng: -72.5450, lat: -13.1631, description: 'Затерянный город инков на высоте 2 430 м в Андах.', wikiLink: '/wiki/peru' },
  { id: 3, name: 'Колизей', country: 'Италия', type: 'wonder', lng: 12.4924, lat: 41.8902, description: 'Амфитеатр Древнего Рима, вмещавший 50 000 зрителей.', wikiLink: '/wiki/italy' },
  { id: 4, name: 'Тадж-Махал', country: 'Индия', type: 'wonder', lng: 78.0421, lat: 27.1751, description: 'Мавзолей из белого мрамора, шедевр могольской архитектуры.', wikiLink: '/wiki/india' },
  { id: 5, name: 'Христос-Искупитель', country: 'Бразилия', type: 'wonder', lng: -43.2105, lat: -22.9519, description: 'Статуя высотой 38 м на вершине горы Корковаду в Рио.', wikiLink: '/wiki/brazil' },
  { id: 6, name: 'Чичен-Ица', country: 'Мексика', type: 'wonder', lng: -88.5686, lat: 20.6843, description: 'Пирамида Кукулькана — центр цивилизации майя.', wikiLink: '/wiki/mexico' },
  { id: 7, name: 'Петра', country: 'Иордания', type: 'wonder', lng: 35.4444, lat: 30.3285, description: 'Город, высеченный в розовых скалах набатейцами.', wikiLink: '/wiki/jordan' },

  // Европа: Запад
  { id: 8, name: 'Эйфелева башня', country: 'Франция', type: 'city', lng: 2.2945, lat: 48.8584, description: 'Символ Парижа, 330 м кованого железа.', wikiLink: '/wiki/france' },
  { id: 9, name: 'Лувр', country: 'Франция', type: 'culture', lng: 2.3376, lat: 48.8606, description: 'Крупнейший музей мира: Мона Лиза, Венера Милосская.', wikiLink: '/wiki/france' },
  { id: 10, name: 'Версаль', country: 'Франция', type: 'culture', lng: 2.1204, lat: 48.8049, description: 'Дворец Людовика XIV с Зеркальной галереей.', wikiLink: '/wiki/france' },
  { id: 11, name: 'Мон-Сен-Мишель', country: 'Франция', type: 'culture', lng: -1.5115, lat: 48.6361, description: 'Аббатство на скалистом острове в Нормандии.', wikiLink: '/wiki/france' },
  { id: 12, name: 'Саграда Фамилия', country: 'Испания', type: 'culture', lng: 2.1744, lat: 41.4036, description: 'Незавершённый шедевр Гауди, строится с 1882 года.', wikiLink: '/wiki/spain' },
  { id: 13, name: 'Альгамбра', country: 'Испания', type: 'culture', lng: -3.5886, lat: 37.1760, description: 'Дворцовый комплекс мавританских правителей в Гранаде.', wikiLink: '/wiki/spain' },
  { id: 14, name: 'Парк Гуэль', country: 'Испания', type: 'culture', lng: 2.1527, lat: 41.4145, description: 'Мозаичный парк Гауди с видом на Барселону.', wikiLink: '/wiki/spain' },
  { id: 15, name: 'Биг-Бен', country: 'Великобритания', type: 'city', lng: -0.1246, lat: 51.5007, description: 'Часовая башня Вестминстерского дворца в Лондоне.', wikiLink: '/wiki/uk' },
  { id: 16, name: 'Стоунхендж', country: 'Великобритания', type: 'culture', lng: -1.8262, lat: 51.1789, description: 'Мегалитическое сооружение возрастом 5 000 лет.', wikiLink: '/wiki/uk' },
  { id: 17, name: 'Тауэр', country: 'Великобритания', type: 'culture', lng: -0.0759, lat: 51.5081, description: 'Крепость на Темзе, хранилище короны Великобритании.', wikiLink: '/wiki/uk' },
  { id: 18, name: 'Эдинбургский замок', country: 'Великобритания', type: 'culture', lng: -3.1999, lat: 55.9486, description: 'Древняя крепость на вулканической скале в Шотландии.', wikiLink: '/wiki/uk' },
  { id: 19, name: 'Дом Анны Франк', country: 'Нидерланды', type: 'culture', lng: 4.8840, lat: 52.3752, description: 'Музей-убежище в Амстердаме, где скрывалась семья Франк.', wikiLink: '/wiki/netherlands' },
  { id: 20, name: 'Кёкенхоф', country: 'Нидерланды', type: 'nature', lng: 4.5462, lat: 52.2600, description: 'Крупнейший цветочный парк мира: 7 млн тюльпанов.', wikiLink: '/wiki/netherlands' },
  { id: 21, name: 'Атомиум', country: 'Бельгия', type: 'city', lng: 4.3414, lat: 50.8949, description: 'Монумент в виде кристалла железа высотой 102 м.', wikiLink: '/wiki/belgium' },

  // Европа: Юг
  { id: 22, name: 'Акрополь', country: 'Греция', type: 'culture', lng: 23.7267, lat: 37.9715, description: 'Древнегреческая цитадель с Парфеноном в Афинах.', wikiLink: '/wiki/greece' },
  { id: 23, name: 'Санторини', country: 'Греция', type: 'nature', lng: 25.4615, lat: 36.3932, description: 'Белоснежные дома на вулканических скалах Эгейского моря.', wikiLink: '/wiki/greece' },
  { id: 24, name: 'Метеоры', country: 'Греция', type: 'nature', lng: 21.6306, lat: 39.7217, description: 'Монастыри на вершинах гигантских песчаниковых скал.', wikiLink: '/wiki/greece' },
  { id: 25, name: 'Голубая мечеть', country: 'Турция', type: 'religion', lng: 28.9768, lat: 41.0054, description: 'Мечеть Султанахмет с шестью минаретами в Стамбуле.', wikiLink: '/wiki/turkey' },
  { id: 26, name: 'Айя-София', country: 'Турция', type: 'religion', lng: 28.9802, lat: 41.0086, description: 'Собор VI века, ставший мечетью, — шедевр Византии.', wikiLink: '/wiki/turkey' },
  { id: 27, name: 'Каппадокия', country: 'Турция', type: 'nature', lng: 34.8303, lat: 38.6431, description: 'Скальные города и полёты на воздушных шарах.', wikiLink: '/wiki/turkey' },
  { id: 28, name: 'Эфес', country: 'Турция', type: 'culture', lng: 27.3400, lat: 37.9395, description: 'Античный город с храмом Артемиды и библиотекой Цельса.', wikiLink: '/wiki/turkey' },
  { id: 29, name: 'Памуккале', country: 'Турция', type: 'nature', lng: 29.1240, lat: 37.9200, description: 'Белоснежные травертиновые террасы с термальными водами.', wikiLink: '/wiki/turkey' },
  { id: 30, name: 'Ватикан', country: 'Ватикан', type: 'religion', lng: 12.4534, lat: 41.9029, description: 'Собор Святого Петра, Сикстинская капелла, музеи.', wikiLink: '/wiki/italy' },
  { id: 31, name: 'Венеция', country: 'Италия', type: 'city', lng: 12.3155, lat: 45.4408, description: 'Город на воде: Гранд-канал, площадь Сан-Марко.', wikiLink: '/wiki/italy' },
  { id: 32, name: 'Помпеи', country: 'Италия', type: 'culture', lng: 14.4869, lat: 40.7509, description: 'Город, погребённый под пеплом Везувия в 79 году.', wikiLink: '/wiki/italy' },
  { id: 33, name: 'Амальфитанское побережье', country: 'Италия', type: 'nature', lng: 14.6027, lat: 40.6340, description: 'Отвесные скалы с пастельными деревнями над морем.', wikiLink: '/wiki/italy' },
  { id: 34, name: 'Дубровник', country: 'Хорватия', type: 'city', lng: 18.1083, lat: 42.6507, description: '«Жемчужина Адриатики» — город-крепость со стенами.', wikiLink: '/wiki/croatia' },
  { id: 35, name: 'Плитвицкие озёра', country: 'Хорватия', type: 'nature', lng: 15.5820, lat: 44.8654, description: '16 каскадных озёр с водопадами в национальном парке.', wikiLink: '/wiki/croatia' },
  { id: 36, name: 'Дворец Диоклетиана', country: 'Хорватия', type: 'culture', lng: 16.4397, lat: 43.5081, description: 'Римский дворец IV века в центре Сплита.', wikiLink: '/wiki/croatia' },
  { id: 37, name: 'Мостар', country: 'Босния', type: 'culture', lng: 17.8152, lat: 43.3372, description: 'Старый мост XVI века над рекой Неретвой.', wikiLink: '/wiki/bosnia' },

  // Европа: Центр и Север
  { id: 38, name: 'Нойшванштайн', country: 'Германия', type: 'culture', lng: 10.7498, lat: 47.5576, description: 'Замок Людвига II, вдохновивший Disney.', wikiLink: '/wiki/germany' },
  { id: 39, name: 'Бранденбургские ворота', country: 'Германия', type: 'city', lng: 13.3777, lat: 52.5163, description: 'Символ Берлина и воссоединения Германии.', wikiLink: '/wiki/germany' },
  { id: 40, name: 'Кёльнский собор', country: 'Германия', type: 'religion', lng: 6.9573, lat: 50.9413, description: 'Готический собор со шпилями 157 м, строился 632 года.', wikiLink: '/wiki/germany' },
  { id: 41, name: 'Карлов мост', country: 'Чехия', type: 'culture', lng: 14.4115, lat: 50.0865, description: 'Готический мост XIV века с 30 статуями в Праге.', wikiLink: '/wiki/czechia' },
  { id: 42, name: 'Пражский Град', country: 'Чехия', type: 'culture', lng: 14.4014, lat: 50.0910, description: 'Крупнейший замковый комплекс в мире.', wikiLink: '/wiki/czechia' },
  { id: 43, name: 'Озеро Блед', country: 'Словения', type: 'nature', lng: 14.0833, lat: 46.3625, description: 'Ледниковое озеро с островком и церковью в Альпах.', wikiLink: '/wiki/slovenia' },
  { id: 44, name: 'Халльштатт', country: 'Австрия', type: 'nature', lng: 13.6542, lat: 47.5622, description: 'Деревня у озера в Альпах, объект ЮНЕСКО.', wikiLink: '/wiki/austria' },
  { id: 45, name: 'Шёнбрунн', country: 'Австрия', type: 'culture', lng: 16.3122, lat: 48.1847, description: 'Летняя резиденция Габсбургов с 1 441 залом.', wikiLink: '/wiki/austria' },
  { id: 46, name: 'Маттерхорн', country: 'Швейцария', type: 'nature', lng: 7.6586, lat: 45.9763, description: 'Пирамидальная вершина 4 478 м в Альпах.', wikiLink: '/wiki/switzerland' },
  { id: 47, name: 'Юнгфрауйох', country: 'Швейцария', type: 'nature', lng: 7.9850, lat: 45.5475, description: '«Вершина Европы» — станция на высоте 3 454 м.', wikiLink: '/wiki/switzerland' },
  { id: 48, name: 'Утёсы Мохер', country: 'Ирландия', type: 'nature', lng: -9.4261, lat: 52.9715, description: 'Отвесные скалы высотой 214 м над Атлантикой.', wikiLink: '/wiki/ireland' },
  { id: 49, name: 'Мостовая Гигантов', country: 'Великобритания', type: 'nature', lng: -6.5116, lat: 55.2408, description: '40 000 базальтовых колонн вулканического происхождения.', wikiLink: '/wiki/uk' },
  { id: 50, name: 'Голубая лагуна', country: 'Исландия', type: 'nature', lng: -22.4481, lat: 63.8804, description: 'Геотермальный курорт с молочно-голубой водой.', wikiLink: '/wiki/iceland' },
  { id: 51, name: 'Гейсир', country: 'Исландия', type: 'nature', lng: -20.3000, lat: 64.3100, description: 'Долина гейзеров — родина слова «гейзер».', wikiLink: '/wiki/iceland' },
  { id: 52, name: 'Фьорды Норвегии', country: 'Норвегия', type: 'nature', lng: 6.8482, lat: 61.2176, description: 'Гейрангер-фьорд — отвесные скалы и водопады.', wikiLink: '/wiki/norway' },
  { id: 53, name: 'Тромсё', country: 'Норвегия', type: 'nature', lng: 18.9553, lat: 69.6492, description: 'Столица Северного сияния за полярным кругом.', wikiLink: '/wiki/norway' },
  { id: 54, name: 'Гамла Стан', country: 'Швеция', type: 'city', lng: 18.0717, lat: 59.3253, description: 'Средневековый старый город Стокгольма на островах.', wikiLink: '/wiki/sweden' },
  { id: 55, name: 'Тиволи', country: 'Дания', type: 'city', lng: 12.5681, lat: 55.6737, description: 'Парк развлечений 1843 года в центре Копенгагена.', wikiLink: '/wiki/denmark' },
  { id: 56, name: 'Русалочка', country: 'Дания', type: 'culture', lng: 12.5993, lat: 55.6929, description: 'Скульптура по сказке Андерсена в гавани Копенгагена.', wikiLink: '/wiki/denmark' },
  { id: 57, name: 'Кафедральный собор', country: 'Финляндия', type: 'religion', lng: 24.9525, lat: 60.1699, description: 'Белоснежный символ Хельсинки на Сенатской площади.', wikiLink: '/wiki/finland' },

  // Россия и Восточная Европа
  { id: 58, name: 'Кремль', country: 'Россия', type: 'culture', lng: 37.6173, lat: 55.7520, description: 'Резиденция президента, соборы и Оружейная палата.', wikiLink: '/wiki/russia' },
  { id: 59, name: 'Храм Василия Блаженного', country: 'Россия', type: 'religion', lng: 37.6231, lat: 55.7525, description: 'Девять разноцветных куполов на Красной площади.', wikiLink: '/wiki/russia' },
  { id: 60, name: 'Эрмитаж', country: 'Россия', type: 'culture', lng: 30.3146, lat: 59.9398, description: '3 млн экспонатов в Зимнем дворце Санкт-Петербурга.', wikiLink: '/wiki/russia' },
  { id: 61, name: 'Петергоф', country: 'Россия', type: 'culture', lng: 29.9060, lat: 59.8840, description: '«Русский Версаль» с 150 фонтанами.', wikiLink: '/wiki/russia' },
  { id: 62, name: 'Байкал', country: 'Россия', type: 'nature', lng: 107.5000, lat: 53.5000, description: 'Глубочайшее озеро мира — 1 642 м, 20% пресной воды.', wikiLink: '/wiki/russia' },
  { id: 63, name: 'Парламент', country: 'Венгрия', type: 'city', lng: 19.0455, lat: 47.5073, description: 'Неоготическое здание на Дунае в Будапеште.', wikiLink: '/wiki/hungary' },
  { id: 64, name: 'Вавельский замок', country: 'Польша', type: 'culture', lng: 19.9354, lat: 50.0547, description: 'Резиденция польских королей в Кракове.', wikiLink: '/wiki/poland' },
  { id: 65, name: 'Замок Бран', country: 'Румыния', type: 'culture', lng: 25.3672, lat: 45.5149, description: '«Замок Дракулы» в Трансильвании.', wikiLink: '/wiki/romania' },
  { id: 66, name: 'Белградская крепость', country: 'Сербия', type: 'culture', lng: 20.4513, lat: 44.8231, description: 'Крепость у слияния Савы и Дуная.', wikiLink: '/wiki/serbia' },

  // Азия
  { id: 67, name: 'Ангкор-Ват', country: 'Камбоджа', type: 'religion', lng: 103.8670, lat: 13.4125, description: 'Крупнейший храмовый комплекс мира, XII век.', wikiLink: '/wiki/cambodia' },
  { id: 68, name: 'Бухта Халонг', country: 'Вьетнам', type: 'nature', lng: 107.0800, lat: 20.9100, description: '3 000 известняковых островов в изумрудной воде.', wikiLink: '/wiki/vietnam' },
  { id: 69, name: 'Хойан', country: 'Вьетнам', type: 'culture', lng: 108.3380, lat: 15.8801, description: 'Древний торговый порт с фонариками и мостами.', wikiLink: '/wiki/vietnam' },
  { id: 70, name: 'Туннели Ку-Чи', country: 'Вьетнам', type: 'culture', lng: 106.4933, lat: 11.0500, description: 'Подземная сеть тоннелей войны длиной 250 км.', wikiLink: '/wiki/vietnam' },
  { id: 71, name: 'Большой дворец', country: 'Таиланд', type: 'religion', lng: 100.4913, lat: 13.7500, description: 'Резиденция королей Таиланда с Изумрудным Буддой.', wikiLink: '/wiki/thailand' },
  { id: 72, name: 'Ват Арун', country: 'Таиланд', type: 'religion', lng: 100.4888, lat: 13.7437, description: '«Храм Рассвета» с 82-метровой башней пранг.', wikiLink: '/wiki/thailand' },
  { id: 73, name: 'Острова Пхи-Пхи', country: 'Таиланд', type: 'nature', lng: 98.7780, lat: 7.7400, description: 'Бирюзовые лагуны и скалы из фильма «Пляж».', wikiLink: '/wiki/thailand' },
  { id: 74, name: 'Аюттхая', country: 'Таиланд', type: 'culture', lng: 100.5600, lat: 14.3532, description: 'Руины древней столицы Сиама, 400 храмов.', wikiLink: '/wiki/thailand' },
  { id: 75, name: 'Фусими Инари', country: 'Япония', type: 'religion', lng: 135.7727, lat: 34.9671, description: '10 000 алых ворот тории на горе в Киото.', wikiLink: '/wiki/japan' },
  { id: 76, name: 'Фудзи', country: 'Япония', type: 'nature', lng: 138.7314, lat: 35.3606, description: 'Священная гора Японии, 3 776 м.', wikiLink: '/wiki/japan' },
  { id: 77, name: 'Кинкаку-дзи', country: 'Япония', type: 'religion', lng: 135.7292, lat: 35.0394, description: 'Золотой павильон, отражающийся в зеркальном пруду.', wikiLink: '/wiki/japan' },
  { id: 78, name: 'Боробудур', country: 'Индонезия', type: 'religion', lng: 110.2038, lat: -7.6079, description: 'Крупнейший буддийский храм мира, IX век.', wikiLink: '/wiki/indonesia' },
  { id: 79, name: 'Рисовые террасы Бали', country: 'Индонезия', type: 'nature', lng: 115.3120, lat: -8.4095, description: 'Изумрудные ступени Тегаллаланг, система субак.', wikiLink: '/wiki/indonesia' },
  { id: 80, name: 'Остров Комодо', country: 'Индонезия', type: 'nature', lng: 119.4900, lat: -8.5500, description: 'Единственное место обитания комодских драконов.', wikiLink: '/wiki/indonesia' },
  { id: 81, name: 'Башни Петронас', country: 'Малайзия', type: 'city', lng: 101.7117, lat: 3.1579, description: 'Небоскрёбы-близнецы 452 м с мостом на 41 этаже.', wikiLink: '/wiki/malaysia' },
  { id: 82, name: 'Пещеры Бату', country: 'Малайзия', type: 'religion', lng: 101.6847, lat: 3.2378, description: 'Индуистский храм в известняковой пещере, 272 ступени.', wikiLink: '/wiki/malaysia' },
  { id: 83, name: 'Марина Бэй Сэндс', country: 'Сингапур', type: 'city', lng: 103.8591, lat: 1.2834, description: 'Отель с бассейном-инфинити на крыше, 57 этаж.', wikiLink: '/wiki/singapore' },
  { id: 84, name: 'Сады у залива', country: 'Сингапур', type: 'nature', lng: 103.8636, lat: 1.2816, description: 'Футуристические супердеревья и облачный лес.', wikiLink: '/wiki/singapore' },
  { id: 85, name: 'Баган', country: 'Мьянма', type: 'religion', lng: 94.8600, lat: 21.1717, description: '2 000 буддийских храмов на равнине, XI–XIII века.', wikiLink: '/wiki/myanmar' },
  { id: 86, name: 'Пагода Шведагон', country: 'Мьянма', type: 'religion', lng: 96.1492, lat: 16.8714, description: 'Золотая ступа высотой 99 м в Янгоне.', wikiLink: '/wiki/myanmar' },
  { id: 87, name: 'Луангпхабанг', country: 'Лаос', type: 'culture', lng: 102.1350, lat: 19.8867, description: 'Город 30 храмов у слияния Меконга и Кхана.', wikiLink: '/wiki/laos' },
  { id: 88, name: 'Запретный город', country: 'Китай', type: 'culture', lng: 116.3970, lat: 39.9163, description: 'Императорский дворец на 980 зданий в Пекине.', wikiLink: '/wiki/china' },
  { id: 89, name: 'Терракотовая армия', country: 'Китай', type: 'culture', lng: 109.2785, lat: 34.3842, description: '8 000 глиняных воинов в гробнице Цинь Шихуана.', wikiLink: '/wiki/china' },
  { id: 90, name: 'Чжанцзяцзе', country: 'Китай', type: 'nature', lng: 110.4790, lat: 29.3250, description: 'Парящие горы из фильма «Аватар».', wikiLink: '/wiki/china' },
  { id: 91, name: 'Река Ли', country: 'Китай', type: 'nature', lng: 110.2900, lat: 25.2740, description: 'Карстовые холмы Гуйлиня на банкноте 20 юаней.', wikiLink: '/wiki/china' },
  { id: 92, name: 'Бурдж-Халифа', country: 'ОАЭ', type: 'city', lng: 55.2744, lat: 25.1972, description: 'Высочайшее здание мира — 828 м, 163 этажа.', wikiLink: '/wiki/uae' },
  { id: 93, name: 'Пальма Джумейра', country: 'ОАЭ', type: 'city', lng: 55.1330, lat: 25.1120, description: 'Искусственный остров в форме пальмы в Дубае.', wikiLink: '/wiki/uae' },
  { id: 94, name: 'Мёртвое море', country: 'Иордания', type: 'nature', lng: 35.5000, lat: 31.5000, description: 'Самая низкая точка Земли, −430 м, вода держит.', wikiLink: '/wiki/jordan' },
  { id: 95, name: 'Вади-Рам', country: 'Иордания', type: 'nature', lng: 35.4200, lat: 29.5320, description: '«Лунная долина» — красные пески и скалы.', wikiLink: '/wiki/jordan' },
  { id: 96, name: 'Старый город Иерусалима', country: 'Израиль', type: 'religion', lng: 35.2339, lat: 31.7683, description: 'Стена Плача, Храм Гроба Господня, Купол Скалы.', wikiLink: '/wiki/israel' },
  { id: 97, name: 'Масада', country: 'Израиль', type: 'culture', lng: 35.3539, lat: 31.3156, description: 'Крепость Ирода на скале над Мёртвым морем.', wikiLink: '/wiki/israel' },
  { id: 98, name: 'Персеполь', country: 'Иран', type: 'culture', lng: 52.8916, lat: 29.9352, description: 'Церемониальная столица Персидской империи.', wikiLink: '/wiki/iran' },
  { id: 99, name: 'Исфахан', country: 'Иран', type: 'culture', lng: 51.6776, lat: 32.6546, description: 'Площадь Имама с бирюзовыми мечетями.', wikiLink: '/wiki/iran' },
  { id: 100, name: 'Регистан', country: 'Узбекистан', type: 'culture', lng: 66.9757, lat: 39.6542, description: 'Ансамбль трёх медресе в Самарканде.', wikiLink: '/wiki/uzbekistan' },

  // Африка
  { id: 101, name: 'Пирамиды Гизы', country: 'Египет', type: 'wonder', lng: 31.1342, lat: 29.9792, description: 'Единственное сохранившееся чудо Древнего мира.', wikiLink: '/wiki/egypt' },
  { id: 102, name: 'Сфинкс', country: 'Египет', type: 'culture', lng: 31.1372, lat: 29.9753, description: 'Статуя с телом льва и головой фараона, 4 500 лет.', wikiLink: '/wiki/egypt' },
  { id: 103, name: 'Абу-Симбел', country: 'Египет', type: 'culture', lng: 31.6258, lat: 22.3372, description: 'Храмы Рамзеса II, высеченные в скале.', wikiLink: '/wiki/egypt' },
  { id: 104, name: 'Долина царей', country: 'Египет', type: 'culture', lng: 32.6014, lat: 25.7402, description: '63 гробницы фараонов, включая Тутанхамона.', wikiLink: '/wiki/egypt' },
  { id: 105, name: 'Водопад Виктория', country: 'Замбия', type: 'nature', lng: 25.8543, lat: -17.9243, description: '«Дымящийся гром» — 1 708 м шириной, 108 м высота.', wikiLink: '/wiki/zambia' },
  { id: 106, name: 'Столовая гора', country: 'ЮАР', type: 'nature', lng: 18.4033, lat: -33.9628, description: 'Плоская вершина 1 085 м над Кейптауном.', wikiLink: '/wiki/south-africa' },
  { id: 107, name: 'Мыс Доброй Надежды', country: 'ЮАР', type: 'nature', lng: 18.4970, lat: -34.3568, description: 'Легендарный мыс на стыке двух океанов.', wikiLink: '/wiki/south-africa' },
  { id: 108, name: 'Серенгети', country: 'Танзания', type: 'nature', lng: 34.8333, lat: -2.3333, description: 'Великая миграция: 2 млн антилоп гну ежегодно.', wikiLink: '/wiki/tanzania' },
  { id: 109, name: 'Килиманджаро', country: 'Танзания', type: 'nature', lng: 37.3556, lat: -3.0674, description: 'Высочайшая точка Африки — 5 895 м.', wikiLink: '/wiki/tanzania' },
  { id: 110, name: 'Нгоронгоро', country: 'Танзания', type: 'nature', lng: 35.4833, lat: -3.2000, description: 'Кратер потухшего вулкана с 25 000 животных.', wikiLink: '/wiki/tanzania' },
  { id: 111, name: 'Масай-Мара', country: 'Кения', type: 'nature', lng: 35.1439, lat: -1.4061, description: 'Сафари-резерват с «большой пятёркой».', wikiLink: '/wiki/kenya' },
  { id: 112, name: 'Медина Марракеша', country: 'Марокко', type: 'culture', lng: -7.9811, lat: 31.6295, description: 'Лабиринт рынков, дворцов и мечетей.', wikiLink: '/wiki/morocco' },
  { id: 113, name: 'Сахара (Мерзуга)', country: 'Марокко', type: 'nature', lng: -4.0100, lat: 31.0800, description: 'Дюны Эрг-Шебби высотой до 150 м.', wikiLink: '/wiki/morocco' },
  { id: 114, name: 'Шефшауэн', country: 'Марокко', type: 'city', lng: -5.2624, lat: 35.1688, description: '«Голубой город» в горах Риф.', wikiLink: '/wiki/morocco' },

  // Америка
  { id: 115, name: 'Статуя Свободы', country: 'США', type: 'city', lng: -74.0445, lat: 40.6892, description: 'Символ Нью-Йорка, дар Франции, 93 м.', wikiLink: '/wiki/usa' },
  { id: 116, name: 'Гранд-Каньон', country: 'США', type: 'nature', lng: -112.1401, lat: 36.0544, description: 'Каньон Колорадо: 446 км, глубина 1 800 м.', wikiLink: '/wiki/usa' },
  { id: 117, name: 'Йеллоустоун', country: 'США', type: 'nature', lng: -110.5885, lat: 44.4280, description: 'Первый нацпарк мира: гейзеры, бизоны, волки.', wikiLink: '/wiki/usa' },
  { id: 118, name: 'Йосемити', country: 'США', type: 'nature', lng: -119.5383, lat: 37.8651, description: 'Гранитные скалы Эль-Капитан и водопады.', wikiLink: '/wiki/usa' },
  { id: 119, name: 'Золотые Ворота', country: 'США', type: 'city', lng: -122.4783, lat: 37.8199, description: 'Висячий мост 2 737 м в Сан-Франциско.', wikiLink: '/wiki/usa' },
  { id: 120, name: 'Ниагарский водопад', country: 'США', type: 'nature', lng: -79.0377, lat: 43.0962, description: 'Три водопада на границе США и Канады.', wikiLink: '/wiki/usa' },
  { id: 121, name: 'Каньон Антилопы', country: 'США', type: 'nature', lng: -111.3743, lat: 36.8619, description: 'Волнистые стены из песчаника в Аризоне.', wikiLink: '/wiki/usa' },
  { id: 122, name: 'Долина Монументов', country: 'США', type: 'nature', lng: -110.1114, lat: 36.9983, description: 'Красные mesas на границе Аризоны и Юты.', wikiLink: '/wiki/usa' },
  { id: 123, name: 'Гора Рашмор', country: 'США', type: 'culture', lng: -103.4591, lat: 43.8791, description: 'Барельефы четырёх президентов в скале.', wikiLink: '/wiki/usa' },
  { id: 124, name: 'Теотиуакан', country: 'Мексика', type: 'culture', lng: -98.8438, lat: 19.6925, description: 'Пирамиды Солнца и Луны, «Город богов».', wikiLink: '/wiki/mexico' },
  { id: 125, name: 'Водопады Игуасу', country: 'Бразилия', type: 'nature', lng: -54.4444, lat: -25.6953, description: '275 водопадов на границе Бразилии и Аргентины.', wikiLink: '/wiki/brazil' },
  { id: 126, name: 'Амазонка', country: 'Бразилия', type: 'nature', lng: -62.0000, lat: -3.4653, description: 'Крупнейший тропический лес планеты.', wikiLink: '/wiki/brazil' },
  { id: 127, name: 'Куско', country: 'Перу', type: 'culture', lng: -71.9675, lat: -13.5319, description: 'Бывшая столица инков на высоте 3 400 м.', wikiLink: '/wiki/peru' },
  { id: 128, name: 'Титикака', country: 'Перу', type: 'nature', lng: -69.0000, lat: -15.8400, description: 'Высочайшее судоходное озеро мира, 3 812 м.', wikiLink: '/wiki/peru' },
  { id: 129, name: 'Галапагосы', country: 'Эквадор', type: 'nature', lng: -90.3333, lat: -0.9538, description: 'Архипелаг, вдохновивший теорию Дарвина.', wikiLink: '/wiki/ecuador' },
  { id: 130, name: 'Картахена', country: 'Колумбия', type: 'city', lng: -75.5144, lat: 10.3910, description: 'Колониальный город с крепостью на Карибах.', wikiLink: '/wiki/colombia' },
  { id: 131, name: 'Торрес-дель-Пайне', country: 'Чили', type: 'nature', lng: -72.8500, lat: -51.2538, description: 'Гранитные башни Патагонии и ледники.', wikiLink: '/wiki/chile' },
  { id: 132, name: 'Остров Пасхи', country: 'Чили', type: 'culture', lng: -109.3497, lat: -27.1127, description: '887 каменных статуй моаи в Тихом океане.', wikiLink: '/wiki/chile' },
  { id: 133, name: 'Атакама', country: 'Чили', type: 'nature', lng: -69.2500, lat: -24.5000, description: 'Самая сухая пустыня мира, марсианские пейзажи.', wikiLink: '/wiki/chile' },
  { id: 134, name: 'Перито-Морено', country: 'Аргентина', type: 'nature', lng: -73.0500, lat: -50.4967, description: 'Ледник шириной 5 км в Патагонии.', wikiLink: '/wiki/argentina' },
  { id: 135, name: 'Солончак Уюни', country: 'Боливия', type: 'nature', lng: -67.4897, lat: -20.1338, description: 'Крупнейший солончак мира, зеркало неба.', wikiLink: '/wiki/bolivia' },
  { id: 136, name: 'Гавана', country: 'Куба', type: 'city', lng: -82.3500, lat: 23.1400, description: 'Колониальная архитектура и ретро-автомобили.', wikiLink: '/wiki/cuba' },
  { id: 137, name: 'Си-Эн Тауэр', country: 'Канада', type: 'city', lng: -79.3871, lat: 43.6426, description: 'Башня 553 м в Торонто, символ Канады.', wikiLink: '/wiki/canada' },
  { id: 138, name: 'Банф', country: 'Канада', type: 'nature', lng: -115.5708, lat: 51.1784, description: 'Бирюзовые озёра в Скалистых горах.', wikiLink: '/wiki/canada' },
  { id: 139, name: 'Шато Фронтенак', country: 'Канада', type: 'culture', lng: -71.2033, lat: 46.8123, description: 'Замок-отель над рекой Святого Лаврентия.', wikiLink: '/wiki/canada' },

  // Океания
  { id: 140, name: 'Сиднейский оперный театр', country: 'Австралия', type: 'culture', lng: 151.2153, lat: -33.8568, description: 'Парусообразные крыши на берегу гавани.', wikiLink: '/wiki/australia' },
  { id: 141, name: 'Большой Барьерный риф', country: 'Австралия', type: 'nature', lng: 147.6992, lat: -18.2871, description: 'Крупнейшая коралловая система, 2 300 км.', wikiLink: '/wiki/australia' },
  { id: 142, name: 'Улуру', country: 'Австралия', type: 'nature', lng: 131.0369, lat: -25.3444, description: 'Красный монолит в сердце Австралии, 348 м.', wikiLink: '/wiki/australia' },
  { id: 143, name: 'Милфорд-Саунд', country: 'Новая Зеландия', type: 'nature', lng: 167.9256, lat: -44.6714, description: 'Фьорд с водопадами в «Средиземье».', wikiLink: '/wiki/new-zealand' },
  { id: 144, name: 'Хоббитон', country: 'Новая Зеландия', type: 'culture', lng: 175.6833, lat: -37.8722, description: 'Декорации Шира из «Властелина колец».', wikiLink: '/wiki/new-zealand' },
];

const TYPE_COLORS: Record<string, string> = {
  wonder: '#dc2626',
  nature: '#16a34a',
  city: '#2563eb',
  culture: '#9333ea',
  religion: '#d97706',
};

const TYPE_LABELS: Record<string, string> = {
  all: 'Все',
  wonder: 'Чудеса света',
  nature: 'Природа',
  city: 'Города',
  culture: 'Культура',
  religion: 'Религия',
};

export default function WorldLandmarksMap() {
  const [selected, setSelected] = useState<Landmark | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [hasGeolocation, setHasGeolocation] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator && !!navigator.geolocation && window.isSecureContext) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' as PermissionName })
          .then((res) => {
            if (res.state !== 'denied') setHasGeolocation(true);
          })
          .catch(() => setHasGeolocation(false));
      } else {
        setHasGeolocation(true);
      }
    }
  }, []);

  const filtered = useMemo(
    () => filter === 'all' ? LANDMARKS : LANDMARKS.filter((l) => l.type === filter),
    [filter]
  );

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[650px] rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-wrap gap-1.5 sm:gap-2 max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-2rem)]">
        {Object.entries(TYPE_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => { setFilter(key); setSelected(null); }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg transition-all ${
              filter === key
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
            }`}
          >
            {label}
            {key !== 'all' && (
              <span className="ml-1 opacity-60">
                {LANDMARKS.filter((l) => l.type === key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/90 dark:bg-gray-800/90 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-300 shadow-lg">
        {filtered.length} объектов
      </div>

      <Map
        initialViewState={{ longitude: 20, latitude: 25, zoom: 2 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        mapLib={maplibregl}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />
        {hasGeolocation && <GeolocateControl position="bottom-right" />}

        {filtered.map((lm) => (
          <Marker
            key={lm.id}
            longitude={lm.lng}
            latitude={lm.lat}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(lm);
            }}
          >
            <div
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-150 active:scale-125"
              style={{ backgroundColor: TYPE_COLORS[lm.type] }}
              title={lm.name}
            />
          </Marker>
        ))}

        {selected && (
          <Popup
            longitude={selected.lng}
            latitude={selected.lat}
            anchor="bottom"
            onClose={() => setSelected(null)}
            closeOnClick={false}
            maxWidth="90vw"
            className="max-w-[90vw] md:max-w-[320px] rounded-xl"
          >
            <div className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: TYPE_COLORS[selected.type] }}
                />
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                  {selected.name}
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-2 font-medium">
                {selected.country}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                {selected.description}
              </p>
              <Link
                href={selected.wikiLink}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors w-full justify-center"
              >
                Путеводитель по стране
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </Popup>
        )}
      </Map>

      <div className="absolute bottom-2 left-2 z-10 text-[10px] text-gray-500 bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded">
        MapLibre | OpenFreeMap © OpenMapTiles | Data from OpenStreetMap
      </div>
    </div>
  );
}
