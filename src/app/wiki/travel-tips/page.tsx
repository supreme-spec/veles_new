import Link from 'next/link';
import { getWikiPages } from '@/shared/data/wikiPages-mdx';
import { normalizeCountryName } from '@/shared/utils/normalization';
import StructuredData from '@/components/SEO/StructuredData';
import {
  generateArticleSchema,
  generateHowToSchema,
  generateFAQSchema,
} from '@/lib/seo/unifiedSEO';
import { SITE_URL, SITE_LAST_UPDATED_ISO } from '@/shared/constants/seo';

const PAGE_URL = `${SITE_URL}/wiki/travel-tips`;
const ARTICLE_IMAGE = `${SITE_URL}/images/logo.png`;

export default async function TravelTipsPage() {
  const wikiPages = await getWikiPages();

  const tipCategories = [
    {
      id: 'visa-documents',
      title: 'Документы и визы',
      icon: '📋',
      tips: [
        'Проверяйте срок действия загранпаспорта: для Шенгена — минимум 3 месяца после выезда, для большинства стран Азии и Африки — 6 месяцев',
        'Делайте бумажные и электронные копии паспорта, виз, билетов и страховки — храните отдельно от оригиналов',
        'Сверяйте визовые требования на сайте МИД РФ и консульства за 4–6 недель до вылета',
        'Оформляйте медицинскую страховку с покрытием не менее 30 000 евро'
      ]
    },
    {
      id: 'budgeting',
      title: 'Планирование бюджета',
      icon: '💰',
      tips: [
        'Закладывайте 15–20% бюджета на непредвиденные расходы (штрафы, такси, лекарства)',
        'Сравните курс обмена в банке и в аэропорту — разница достигает 10%',
        'Бронируйте жильё и трансфер за 2–3 месяца: цены на пиковые даты растут в 1.5–2 раза',
        'Учитывайте чаевые (в США — 15–20% в ресторанах) и местные налоги (city tax в Европе)'
      ]
    },
    {
      id: 'packing',
      title: 'Сборы в дорогу',
      icon: '🎒',
      tips: [
        'Кладите лекарства, документы и зарядку в ручную кладь, а не в багаж',
        'Проверяйте лимиты авиакомпании: у лоукостеров часто 0 кг бесплатного багажа',
        'Берите универсальный адаптер (тип C/F) и павербанк до 20 000 мАч',
        'Скачивайте офлайн-карты (Maps.me) и переводчик (Google Переводчик) до отъезда'
      ]
    },
    {
      id: 'safety',
      title: 'Безопасность',
      icon: '🛡️',
      tips: [
        'Изучите местный менталитет и запретные темы (религия, политика) перед разговором с местными',
        'Носите с собой копию документов, а не оригинал, на пляже и в толпе',
        'Отправьте маршрут и отель родным в WhatsApp или Telegram',
        'Запишите номера экстренных служб и посольства РФ в телефон'
      ]
    },
    {
      id: 'health',
      title: 'Здоровье в путешествии',
      icon: '🏥',
      tips: [
        'Проверьте на сайте ВОЗ, нужны ли прививки (жёлтая лихорадка, малярия) для страны',
        'Соберите аптечку: антисептик, пластыри, средство от укачивания, сорбенты',
        'В странах с нецентрализованным водоснабжением пейте только бутилированную воду',
        'Первые 2–3 дня избегайте уличной еды и сырых морепродуктов'
      ]
    },
    {
      id: 'communication',
      title: 'Связь и интернет',
      icon: '📱',
      tips: [
        'Узнайте тариф роуминга своего оператора — звонок может стоить 50–150 ₽/мин',
        'Купите местную SIM-карту (Турция, Таиланд, ОАЭ) или eSIM за 1–2 дня до выезда',
        'Скачайте мессенджеры с Wi-Fi-звонками (WhatsApp, Telegram) для связи с домом',
        'Сохраните важные номера в телефоне и в бумажном блокноте'
      ]
    }
  ];

  const countrySpecificTips = [
    { region: 'Европа', countries: ['albania', 'austria', 'armenia'], tip: 'В 27 странах Шенгена — единая валюта евро и общая виза; срок действия паспорта — минимум 3 месяца после выезда' },
    { region: 'Азия', countries: ['afghanistan', 'bangladesh', 'bhutan'], tip: 'Уважайте религиозные традиции и дресс-код: плечи и колени закрыты в храмах обязательны' },
    { region: 'Карибы', countries: ['bahamas', 'barbados', 'antigua-barbuda'], tip: 'Ураганный сезон длится с июня по ноябрь — страхуйте отмену рейса и тура' },
    { region: 'Африка', countries: ['algeria', 'botswana', 'angola'], tip: 'Обязательно узнайте о прививках (жёлтая лихорадка) и профилактике малярии за 2 недели до выезда' }
  ];

  // ---- JSON-LD: Article + HowTo (Азия) + FAQPage ----
  const articleSchema = generateArticleSchema({
    headline: 'Полезные советы путешественникам: чек-листы и лайфхаки',
    description:
      'Проверенные чек-листы по документам, визам, бюджету, сборам, безопасности и здоровью. Составлено тревел-экспертами Велес Вояж по опыту сопровождения туров и данным МИД РФ и Ростуризма.',
    url: PAGE_URL,
    image: ARTICLE_IMAGE,
    datePublished: SITE_LAST_UPDATED_ISO,
    dateModified: SITE_LAST_UPDATED_ISO,
    keywords: [
      'советы путешественникам',
      'чек-лист в поездку',
      'что взять в отпуск',
      'виза для россиян',
      'медицинская страховка',
      'задержка рейса',
      'роуминг за границей',
      'Велес Вояж',
    ],
    wordCount: 1200,
    section: 'Советы путешественникам',
  });

  const asiaPackingHowTo = generateHowToSchema({
    name: 'Как собрать чемодан в Азию: полный чек-лист',
    description:
      'Пошаговый порядок сборов в поездку по странам Азии (Таиланд, Вьетнам, Шри-Ланка, Индия), чтобы ничего не забыть и пройти контроль без задержек.',
    totalTime: 'PT2H',
    step: [
      {
        name: 'Проверьте визу и срок загранпаспорта',
        text: 'Срок действия паспорта должен быть минимум 6 месяцев после въезда. Для Таиланда, Вьетнама и многих стран Азии виза оформляется по прилёте или онлайн (e-visa) — распечатайте подтверждение.',
      },
      {
        name: 'Подберите одежду под климат',
        text: 'Возьмите дышащие ткани (льняное, хлопок), лёгкую дождевик на сезон дождей (май–октябрь) и закрытую одежду для храмов: плечи и колени должны быть закрыты.',
      },
      {
        name: 'Соберите аптечку',
        text: 'Сорбенты, средство от укачивания, антисептик, пластыри, репеллент от комаров и личные лекарства в оригинальной упаковке с инструкцией.',
      },
      {
        name: 'Упакуйте электронику и адаптер',
        text: 'В Азии распространён тип розетки A/C/F и напряжение 220В. Возьмите универсальный адаптер и павербанк до 20 000 мАч в ручную кладь.',
      },
      {
        name: 'Скопируйте документы',
        text: 'Сохраните фото паспорта, визы, билетов и страховки в телефон и облако, а бумажные копии положите отдельно от оригиналов.',
      },
      {
        name: 'Распределите багаж',
        text: 'Документы, лекарства, зарядку и немного наличных — в ручную кладь. Основную одежду и косметику — в чемодан. Проверьте вес на сайте авиакомпании.',
      },
    ],
  });

  const faqSchema = generateFAQSchema([
    {
      question: 'Какие документы нужны для выезда за границу россиянину в 2026 году?',
      answer:
        'Заграничный паспорт (действителен минимум 3–6 месяцев после выезда), действующая виза или подтверждение безвизового въезда, обратный билет, бронь жилья и медицинская страховка. Точный список зависит от страны — проверьте его на сайте МИД РФ за 4–6 недель до поездки.',
    },
    {
      question: 'Нужна ли медицинская страховка для выезда из России?',
      answer:
        'Для большинства стран страховка обязательна (минимум 30 000 евро покрытия), а для Шенгена и Турции она требуется при оформлении визы. Без полиса лечение за рубежом оплачивается полностью из собственного кошелька — счёт может превысить стоимость всего тура.',
    },
    {
      question: 'Что делать, если задержали или отменили рейс?',
      answer:
        'Сохраните посадочный талон и отметку о задержке/отмене от авиакомпании. При задержке более 2 часов вы имеете право на воду и питание, более 4 часов — на тёплую еду, при ночёвке — на отель. При отмене рейса перевозчик обязан вернуть деньги или предложить альтернативный рейс. Если тур куплен пакетом — вопросы решает ваш туроператор.',
    },
    {
      question: 'Сколько наличных брать в путешествие и как платить картой за рубежом?',
      answer:
        'Берите наличные на первые 2–3 дня и мелкие расходы (чаевые, рынки): обычно 150–300$ на человека. Основные траты оплачивайте картой с выгодным курсом (Universeal, Tinkoff Travel, дебетовые карты с кэшбэком). Уведомите банк о поездке, чтобы не заблокировали операцию.',
    },
    {
      question: 'Как дешево оставаться на связи за границей без роуминга?',
      answer:
        'Купите местную SIM-карту в аэропорту или eSIM онлайн за 1–2 дня до выезда (Турция, Таиланд, ОАЭ, страны ЕС). Альтернатива — тариф оператора с безлимитным интернетом за рубежом. Звонки домой делайте через WhatsApp или Telegram по Wi-Fi отеля.',
    },
  ]);

  return (
    <>
      <StructuredData schemas={[articleSchema, asiaPackingHowTo, faqSchema]} />

      <article className="container mx-auto px-4 py-8 max-w-6xl pt-20 md:pt-24">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold mb-4">
            <span className="mr-2">💡</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              Полезные советы путешественникам: чек-листы и лайфхаки
            </span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Советы путешественникам Велес Вояж — это проверенные чек-листы по документам, визам,
            бюджету, сборам, безопасности и здоровью. Мы составили их на основе опыта сопровождения
            туров и данных МИД РФ и Ростуризма, без «воды» и общих слов.
          </p>
        </header>

        <section aria-labelledby="categories" className="mb-10">
          <h2 id="categories" className="text-2xl font-semibold text-gray-900 dark:text-white mb-5">
            Чек-листы по категориям
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipCategories.map(category => (
              <div key={category.id} className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="asia-packing" className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-6 mb-10 border border-amber-100 dark:border-amber-900/30">
          <h2 id="asia-packing" className="text-2xl font-semibold text-amber-900 dark:text-amber-200 mb-4">
            🎒 Как собрать чемодан в Азию: полный чек-лист
          </h2>
          <p className="text-sm text-amber-800 dark:text-amber-200/80 mb-4 leading-relaxed">
            Порядок сборов для Таиланда, Вьетнама, Шри-Ланки и Индии. Соблюдайте его по шагам — так
            ничего не забудете и пройдёте контроль без задержек.
          </p>
          <ul className="space-y-3">
            <li className="text-sm text-amber-800 dark:text-amber-100/90 flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span><strong>Проверьте визу и срок загранпаспорта.</strong> Паспорт действителен минимум 6 месяцев после въезда. Виза для Таиланда, Вьетнама и ряда стран Азии — по прилёте или онлайн (e-visa), распечатайте подтверждение.</span>
            </li>
            <li className="text-sm text-amber-800 dark:text-amber-100/90 flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span><strong>Подберите одежду под климат.</strong> Дышащий хлопок и лён, лёгкий дождевик на сезон дождей (май–октябрь), закрытая одежда для храмов — плечи и колени закрыты.</span>
            </li>
            <li className="text-sm text-amber-800 dark:text-amber-100/90 flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span><strong>Соберите аптечку.</strong> Сорбенты, средство от укачивания, антисептик, пластыри, репеллент и личные лекарства в оригинальной упаковке.</span>
            </li>
            <li className="text-sm text-amber-800 dark:text-amber-100/90 flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span><strong>Упакуйте электронику и адаптер.</strong> В Азии типы розеток A/C/F, напряжение 220В. Универсальный адаптер и павербанк до 20 000 мАч — в ручную кладь.</span>
            </li>
            <li className="text-sm text-amber-800 dark:text-amber-100/90 flex items-start">
              <span className="font-bold mr-2">5.</span>
              <span><strong>Скопируйте документы.</strong> Фото паспорта, визы, билетов и страховки — в телефон и облако, бумажные копии отдельно от оригиналов.</span>
            </li>
            <li className="text-sm text-amber-800 dark:text-amber-100/90 flex items-start">
              <span className="font-bold mr-2">6.</span>
              <span><strong>Распределите багаж.</strong> Документы, лекарства и зарядку — в ручную кладь, основную одежду — в чемодан. Сверьте вес на сайте авиакомпании.</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="delayed-flight" className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 mb-10 border border-blue-100 dark:border-blue-900/30">
          <h2 id="delayed-flight" className="text-2xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
            ✈️ Что делать при задержке рейса
          </h2>
          <ol className="space-y-3 list-decimal list-inside">
            <li className="text-sm text-blue-800 dark:text-blue-100/90">
              Сохраните посадочный талон и отметку о задержке/отмене от авиакомпании — это основание для компенсаций.
            </li>
            <li className="text-sm text-blue-800 dark:text-blue-100/90">
              При задержке более 2 часов требуйте у стойки воду и питание, более 4 часов — тёплую еду, при ночёвке в аэропорту — отель и трансфер.
            </li>
            <li className="text-sm text-blue-800 dark:text-blue-100/90">
              При отмене рейса перевозчик обязан вернуть деньги или предложить альтернативный вариант до пункта назначения.
            </li>
            <li className="text-sm text-blue-800 dark:text-blue-100/90">
              Если тур куплен пакетом (авиабилет + отель), вопросы решает ваш туроператор, а не авиакомпания.
            </li>
          </ol>
        </section>

        <section aria-labelledby="regions" className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-10">
          <h2 id="regions" className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🗺️ Советы по регионам
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {countrySpecificTips.map((regionTip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800/40 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{regionTip.region}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{regionTip.tip}</p>
                <div className="flex flex-wrap gap-2">
                  {regionTip.countries.map(countryId => {
                    const country = wikiPages[countryId];
                    const countryName = country
                      ? normalizeCountryName(country.title)
                      : countryId.replace(/-/g, ' ');

                    return (
                      <Link
                        key={countryId}
                        href={`/wiki/${countryId}`}
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors no-underline border border-blue-200 dark:border-blue-700 hover:border-blue-300"
                      >
                        {countryName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq" className="mb-10">
          <h2 id="faq" className="text-2xl font-semibold text-gray-900 dark:text-white mb-5">
            Частые вопросы путешественников
          </h2>
          <div className="space-y-4">
            <details className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Какие документы нужны для выезда за границу россиянину в 2026 году?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Заграничный паспорт (действителен минимум 3–6 месяцев после выезда), действующая виза
                или подтверждение безвизового въезда, обратный билет, бронь жилья и медицинская
                страховка. Точный список зависит от страны — проверьте его на сайте МИД РФ за 4–6
                недель до поездки.
              </p>
            </details>
            <details className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Нужна ли медицинская страховка для выезда из России?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Для большинства стран страховка обязательна (минимум 30 000 евро покрытия), а для
                Шенгена и Турции она требуется при оформлении визы. Без полиса лечение за рубежом
                оплачивается полностью из собственного кошелька — счёт может превысить стоимость всего
                тура.
              </p>
            </details>
            <details className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Что делать, если задержали или отменили рейс?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Сохраните посадочный талон и отметку о задержке/отмене от авиакомпании. При задержке
                более 2 часов вы имеете право на воду и питание, более 4 часов — на тёплую еду, при
                ночёвке — на отель. При отмене рейса перевозчик обязан вернуть деньги или предложить
                альтернативный рейс. Если тур куплен пакетом — вопросы решает ваш туроператор.
              </p>
            </details>
            <details className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Сколько наличных брать в путешествие и как платить картой за рубежом?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Берите наличные на первые 2–3 дня и мелкие расходы (чаевые, рынки): обычно 150–300$ на
                человека. Основные траты оплачивайте картой с выгодным курсом (Universeal, Tinkoff
                Travel, дебетовые карты с кэшбэком). Уведомите банк о поездке, чтобы не заблокировали
                операцию.
              </p>
            </details>
            <details className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                Как дешево оставаться на связи за границей без роуминга?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Купите местную SIM-карту в аэропорту или eSIM онлайн за 1–2 дня до выезда (Турция,
                Таиланд, ОАЭ, страны ЕС). Альтернатива — тариф оператора с безлимитным интернетом за
                рубежом. Звонки домой делайте через WhatsApp или Telegram по Wi-Fi отеля.
              </p>
            </details>
          </div>
        </section>

        <section aria-labelledby="important-notice" className="bg-yellow-50 dark:bg-amber-900/10 border border-yellow-200 dark:border-amber-900/30 rounded-xl p-6 mb-10">
          <h2 id="important-notice" className="text-xl font-semibold mb-4 text-yellow-800 dark:text-amber-300">
            ⚠️ Важно помнить
          </h2>
          <p className="text-sm text-yellow-700 dark:text-amber-200/80 mb-6 leading-relaxed">
            Визовые требования, правила въезда и санитарные нормы меняются. Всегда сверяйте
            актуальную информацию на официальных сайтах МИД РФ, консульств и Ростуризма перед
            бронированием и выездом.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-yellow-800 dark:text-amber-300 mb-2">Перелёты чартерными рейсами</h3>
              <p className="text-sm text-yellow-700 dark:text-amber-200/80 leading-relaxed">
                Чартерные рейсы — это нерегулярные перелёты, которые туроператор организует специально
                для туристов в курортные города, куда нет прямых регулярных рейсов. Из-за этого отдых
                становится доступнее.
              </p>
              <ul className="mt-3 ml-4 space-y-1 text-sm text-yellow-700 dark:text-amber-200/70 list-disc">
                <li>туроператор имеет право менять детали (время вылета, авиакомпанию, аэропорт),</li>
                <li>точное расписание чартеров известно ближе к дате выезда,</li>
                <li>это предусмотрено договором на туристический продукт и не считается ошибкой.</li>
              </ul>
            </div>

            <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg border border-yellow-200/50 dark:border-amber-900/20">
              <h4 className="font-bold text-yellow-800 dark:text-amber-300 mb-1">Пример ситуации</h4>
              <p className="text-sm text-yellow-700 dark:text-amber-200/80 italic">
                Купили тур по акции «Раннее бронирование» с вылетом в субботу утром — это ориентировочное
                время. Вылет состоится в назначенный день, но авиакомпания и время могут измениться,
                иногда меняется и аэропорт. Это особенность чартерных перевозок, а не ошибка менеджера.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-yellow-800 dark:text-amber-300 mb-2">Проживание в отеле</h3>
              <p className="text-sm text-yellow-700 dark:text-amber-200/80 leading-relaxed">
                Проживание в гостинице считается по ночам. Если заезд указан на 10 утра, а вы приехали
                в 22:00 — это не нарушение: первая ночь считается с даты заезда, а не с конкретного
                времени суток.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 dark:border-blue-400/20 rounded-xl">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium text-center italic">
              ✨ Мы заранее предупреждаем туристов о возможных изменениях и остаёмся на связи 24/7,
              чтобы ваш отдых был спокойным и комфортным.
            </p>
          </div>
        </section>

        <nav aria-label="Дополнительные ресурсы" className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Дополнительные ресурсы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/wiki/countries" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              🌍 Все страны мира
            </Link>
            <Link href="/wiki/destinations" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              🏝️ Популярные направления
            </Link>
            <Link href="/wiki" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              📚 Главная энциклопедии
            </Link>
          </div>
        </nav>

        <aside className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
          <h3 className="font-semibold mb-2">Источники:</h3>
          <ul className="space-y-1">
            <li>
              <a href="https://www.mid.ru" rel="nofollow noopener" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
                МИД РФ — официальная информация о странах и визах
              </a>
            </li>
            <li>
              <a href="https://rostravel.ru" rel="nofollow noopener" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
                Ростуризм — права туристов и правила выезда
              </a>
            </li>
            <li>
              <a href="https://www.who.int" rel="nofollow noopener" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
                ВОЗ — рекомендации по прививкам для путешественников
              </a>
            </li>
          </ul>
        </aside>
      </article>
    </>
  );
}
