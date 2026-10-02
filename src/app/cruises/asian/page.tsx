import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon, GlobeAltIcon, CameraIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import StructuredData from '@/components/SEO/StructuredData';
import { asianSchemas } from '@/shared/data/cruises/asian';


export const metadata: Metadata = {
  title: 'Азиатские воды 2026 | Велес Вояж - Круизы по Юго-Восточной Азии',
  description: 'Азиатские воды: Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия. Бангкок, Хошимин, Куала-Лумпур, Сингапур, Бали. Экзотика, древние храмы, богатая культура, бронирование от 110 000₽.',
};

export default function AsianCruisePage() {
  return (
    <>
      <StructuredData schemas={asianSchemas} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20 pt-24">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
              <span className="mr-3">🌴</span>
              <span className="text-gradient-animated drop-shadow-md">
                Азиатские воды
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Исследуйте экзотические острова и богатую культуру Юго-Восточной Азии с Велес Вояж
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <GlobeAltIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">5 Стран</h3>
              <p className="text-gray-600 dark:text-gray-400">Таиланд, Вьетнам, Малайзия, Сингапур, Индонезия</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <ClockIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">10-15 Дней</h3>
              <p className="text-gray-600 dark:text-gray-400">Оптимальная продолжительность</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BanknotesIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">От 110 000₽</h3>
              <p className="text-gray-600 dark:text-gray-400">Конкурентные цены</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BuildingOfficeIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Премиум класс</h3>
              <p className="text-gray-600 dark:text-gray-400">Комфортабельные лайнеры</p>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Откройте для себя Азию
              </span>
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6">
                Азиатские воды — это удивительное путешествие по экзотическим островам и древним цивилизациям Юго-Восточной Азии. 
                От тропических пляжей Таиланда до современных небоскребов Сингапура, от вулканических пейзажей Индонезии 
               до культурных сокровищ Вьетнама — каждый день круиза наполнен яркими красками и незабываемыми впечатлениями.
             </p>

              <p className="mb-6">
                Круиз — это отель, который плывёт за вами: мы подбираем маршруты с оценкой гостей от 4.8, включая полный пансион и портовые сборы. Перед поездкой узнайте больше о <Link href="/wiki/culture">культуре Юго-Восточной Азии</Link> в нашей энциклопедии путешественника.
              </p>
               
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Таиланд и Малайзия</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Бангкок — столица Таиланда, сочетающая буддийские храмы и современные небоскребы</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Пхукет — крупнейший остров Таиланда с белоснежными пляжами и бирюзовыми водами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Куала-Лумпур — столица Малайзии, дом башни Петронас и разнообразной культуры</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Пенанг — остров специй с колониальной архитектурой и великолепной кухней</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Лангкави — duty free остров с тропическими лесами и пляжами</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Вьетнам, Сингапур и Индонезия</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Хошимин (Сайгон) — динамичный город с французским наследием и современной архитектурой</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Халонг — залив с известняковыми столбами, объект Всемирного наследия ЮНЕСКО</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Сингапур — город-государство, родина Лего и сказок Андерсена</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Бали — "остров богов" с вулканами, рисовыми террасами и храмами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Джакарта — столица Индонезии, расположенная на острове Ява</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Уникальные азиатские впечатления</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <GlobeAltIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Культурные экскурсии</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Посещение древних храмов, буддийских монастырей, королевских дворцов и исторических достопримечательностей.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <CameraIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Кулинарные туры</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Дегустации экзотических блюд, мастер-классы по приготовлению тайской, вьетнамской и индонезийской кухни.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Спа и wellness</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Традиционные тайские массажи, балийские спа-ритуалы и йога на фоне тропических пейзажей.
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Что включено в круиз</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <BuildingOfficeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Проживание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Просторные каюты с балконами, современные удобства, панорамные виды на море
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <StarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Питание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Интернациональная кухня, национальные азиатские блюда, шведский стол, диетическое меню
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <PaperAirplaneIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Экскурсии</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Профессиональные экскурсии с гидами-переводчиками, посещение достопримечательностей
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Почему выбирают нас</h3>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Экспертные знания о Юго-Восточной Азии и её культурах</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Индивидуальный подход к каждому путешественнику</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Профессиональные гиды-переводчики на борту</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Гибкие условия бронирования и оплаты</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Круглосуточная поддержка во время путешествия</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Эксклюзивные маршруты и уникальные впечатления</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Готовы к азиатскому приключению?</h2>
              <p className="text-white mb-6">
                Свяжитесь с нами, чтобы спланировать ваш идеальный круиз по Азии
              </p>
              <Link 
                href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20азиатский%20круиз%20с%20Велес%20Вояж."
                target="_blank"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105"
              >
                Забронировать круиз
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
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Когда лучше всего ехать в Азию?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Лучшее время для азиатских круизов — зима и ранняя весна (ноябрь-март), 
                  когда погода наиболее комфортная, меньше дождей, а температура приятная. 
                  Это позволяет насладиться пляжами, экскурсиями и активными видами отдыха.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Нужна ли виза для посещения азиатских стран?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Для разных стран требуется разное визовое оформление: 
                  Таиланд и Малайзия — безвизовый режим для туристов до 30 дней, 
                  Вьетнам — электронная виза, Сингапур — безвизовый режим до 30 дней, 
                  Индонезия — по прибытию или электронная виза.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Что взять с собой в азиатский круиз?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Рекомендуется взять легкую одежду, головные уборы, солнцезащитные средства, 
                  удобную обувь для экскурсий, фотоаппарат, зарядные устройства, 
                  а также документы, визы и медицинскую страховку. 
                  На борту лайнера можно арендовать специальное оборудование.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}