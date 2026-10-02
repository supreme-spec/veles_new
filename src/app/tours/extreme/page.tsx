import type { Metadata } from 'next';
import Link from 'next/link';
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  InformationCircleIcon} from '@heroicons/react/24/outline';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { formatMetadataDates } from '@/shared/utils';
import StructuredData from '@/components/SEO/StructuredData';
import {
  toursExtremeSchemas,
  toursExtremeDatePublished,
  toursExtremeDateModified,
  setToursExtremeDates} from '@/shared/data/pages/tours-extreme';

// Обновляем даты при каждом рендере
setToursExtremeDates(formatMetadataDates());

// Извлекаем данные из схем для метаданных
const articleSchema = toursExtremeSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = toursExtremeSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Экстремальные туры 2026 | Велес Вояж',
  description:
    articleSchema?.description ||
    'Экстремальные туры: альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг, сноуборд, горные лыжи. Приключения, экстрим, адреналин, комфортное проживание, профессиональные инструкторы, бронирование онлайн, туризм 2026.',
  url: 'https://veles-voyage.ru/tours/extreme',
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: toursExtremeDatePublished,
  modifiedTime: toursExtremeDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Экстремальные туры - Видеогид',
    description: 'Видеообзоры экстремальных туров',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'},
  faqs:
    faqSchema?.mainEntity?.map((item: any) => ({
      question: item.name,
      answer: item.acceptedAnswer.text})) || []});

export default function ExtremeToursPage() {
  return (
    <>
      <StructuredData schemas={toursExtremeSchemas} />
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
              <span className="mr-2">⛰️</span>
              <span className="text-gradient-animated drop-shadow-md">Экстремальные туры</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Для любителей острых ощущений и приключений
            </p>
            
            {/* Speakable summary for AI/GEO */}
            <div id="speakable-summary" className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-3xl mx-auto text-left">
              <h2 className="text-xl font-bold mb-3 text-blue-900">Экстремальные туры и приключения от Велес Вояж</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Активности:</strong> альпинизм, рафтинг, дайвинг, парашютный спорт, бейсджампинг, кайтсерфинг</li>
                <li><strong>Локации:</strong> дикие уголки планеты, горы, океан, джунгли</li>
                <li><strong>Продолжительность:</strong> 10-21 дней, эпические приключения</li>
                <li><strong>Сопровождение:</strong> профессиональные инструкторы, поддержка 24/7</li>
              </ul>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <MapPinIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">10+ Направлений</h3>
              <p className="text-gray-600 dark:text-gray-400">Дикие уголки планеты</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <ClockIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">10-21 Дней</h3>
              <p className="text-gray-600 dark:text-gray-400">Эпические приключения</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BanknotesIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">От 150 000₽</h3>
              <p className="text-gray-600 dark:text-gray-400">Конкурентные цены</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <StarIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Адреналин</h3>
              <p className="text-gray-600 dark:text-gray-400">Незабываемые эмоции</p>
            </div>
          </div>

          {/* AEO intro with concrete numbers */}
          <section
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16"
            aria-labelledby="about-extreme"
          >
            <h2
              id="about-extreme"
              className="text-3xl font-extrabold mb-6 animate-fade-in-up"
            >
              <span className="text-gradient-animated drop-shadow-md">
                Сколько стоит и когда ехать в экстремальный тур в 2026
              </span>
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              Средняя стоимость экстремального тура в 2026 году начинается от 150 000 ₽ на человека и
              сильно зависит от направления и сложности программы. Российские маршруты (Алтай,
              Камчатка) доступны с июня по сентябрь, а зарубежные восхождения планируют в их локальные
              сухие сезоны. В стоимость обязательно включена расширенная страховка с покрытием
              активного отдыха.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Сравнение направлений
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-200">
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Направление</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Лучший сезон</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Средняя цена (от)</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Виза для РФ</th>
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold">Сложность</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Алтай (Россия)</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">июнь–сентябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 80 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">нужен загранпаспорт РФ</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Камчатка (Россия)</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">июль–сентябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 120 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">нужен загранпаспорт РФ</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">высокая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Патагония (Аргентина/Чили)</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">ноябрь–март</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 200 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">без визы до 90 дней</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">высокая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Исландия</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">июнь–август</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от €1 800</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">нужен Шенген</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">средняя</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Непал</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">октябрь–ноябрь, март–май</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 150 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">виза по прилёте</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">высокая</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">Килиманджаро (Танзания)</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">январь–февраль, июнь–октябрь</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">от 250 000 ₽</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">виза по прилёте</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3">высокая</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Откройте для себя экстрим
              </span>
            </h2>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6">
                Экстремальные туры — это вызов самому себе, возможность выйти за пределы зоны
                комфорта и испытать незабываемые эмоции. От покорения вершин Гималаев до прыжков с
                парашютом над пустыней Сахары, от рафтинга по бурным рекам Амазонки до сафари в
                диких саваннах Африки — каждый маршрут предлагает уникальный опыт для настоящих
                искателей приключений.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Популярные направления
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3">
                    Горные вершины
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Непал — Эверест, Аннапурна, Дхаулагири</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Швейцария — Альпы, Маттерхорн, Юнгфрау</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Россия — Эльбрус, Казбек, Пик Ленина</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3">
                    Экстремальные активности
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Новая Зеландия — прыжки с парашютом, рафтинг, дайвинг</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                      <span>ЮАР — сафари, прыжки с моста, дайвинг с акулами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Канада — восхождения, снегоходы, каякинг</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Исландия — вулканы, гейзеры, северное сияние</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Что включено в тур
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <BuildingOfficeIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Проживание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Гостиницы и базы отдыха вблизи точек активности
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <StarIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Питание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Энергетическая пища для активного отдыха
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <PaperAirplaneIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Трансферы</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Трансферы к точкам активности и обратно
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Экстремальные особенности
              </h3>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <StarIcon className="w-6 h-6 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Профессиональные инструкторы</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Все экстремальные активности проводятся под руководством профессиональных
                      инструкторов с международными сертификатами. Мы обеспечиваем максимальную
                      безопасность и качество приключений, предоставляя современное оборудование и
                      подробный инструктаж.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Почему выбирают нас
              </h3>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Индивидуальный подход к каждому клиенту</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Профессиональные инструкторы с международными сертификатами</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Гибкие условия бронирования и оплаты</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Круглосуточная поддержка во время путешествия</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Экспертные знания о экстремальных направлениях</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Готовы к экстремальному приключению?
              </h2>
              <p className="text-orange-100 mb-6">
                Свяжитесь с нами, чтобы спланировать ваш идеальный экстремальный тур
              </p>
              <Link
                href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20экстремальный%20тур%20с%20Велес%20Вояж."
                target="_blank"
                className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105"
              >
                Забронировать тур
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-extrabold mb-6 text-center animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Часто задаваемые вопросы
              </span>
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                  Какая физическая подготовка необходима для экстремального тура?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Для каждого маршрута требуется разный уровень подготовки. Мы рекомендуем пройти
                  медицинское обследование и консультацию с врачом перед поездкой. Также необходима
                  хорошая общая физическая форма и отсутствие противопоказаний.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                  Какое оборудование предоставляется?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Рекомендуем взять личные вещи и удобную одежду для активного отдыха.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                  Какая страховка необходима для экстремального тура?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Обязательна страховка с покрытием экстремальных видов активности. Мы можем помочь
                  с оформлением специализированной страховки, которая покроет медицинские расходы,
                  эвакуацию и другие риски.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
