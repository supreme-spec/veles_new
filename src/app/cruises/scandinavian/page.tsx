import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon, GlobeAltIcon, CameraIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import StructuredData from '@/components/SEO/StructuredData';
import { scandinavianSchemas } from '@/shared/data/cruises/scandinavian';


export const metadata: Metadata = {
  title: 'Скандинавские фьорды 2026 | Велес Вояж - Круизы по Норвегии и Скандинавии',
  description: 'Скандинавские фьорды: Норвегия, Швеция, Дания. Осло, Берген, Ставангер, Гейрангер, Хельсинки, Стокгольм, Копенгаген. Величественные фьорды, дикая природа, северное сияние, скандинавская кухня, бронирование от 120 000₽.',
};

export default function ScandinavianCruisePage() {
  return (
    <>
      <StructuredData schemas={scandinavianSchemas} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20 pt-24">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
              <span className="mr-3">⛰️</span>
              <span className="text-gradient-animated drop-shadow-md">
                Скандинавские фьорды
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Исследуйте величественные фьорды и дикую природу Скандинавии с Велес Вояж
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <GlobeAltIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">3 Страны</h3>
              <p className="text-gray-600 dark:text-gray-400">Норвегия, Швеция, Дания</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <ClockIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">10-14 Дней</h3>
              <p className="text-gray-600 dark:text-gray-400">Оптимальная продолжительность</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BanknotesIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">От 120 000₽</h3>
              <p className="text-gray-600 dark:text-gray-400">Конкурентные цены</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BuildingOfficeIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Люкс класс</h3>
              <p className="text-gray-600 dark:text-gray-400">Комфортабельные лайнеры</p>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Откройте для себя Скандинавские фьорды
              </span>
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6">
                Скандинавские фьорды — это одно из самых впечатляющих природных чудес мира, 
                где величественные горные хребты встречаются с кристально чистыми водами фьордов. 
                От драматических пейзажей Норвегии до утонченной культуры Швеции и Дании — 
                каждый день круиза наполнен уникальными впечатлениями и незабываемыми моментами.
              </p>

              <p className="mb-6">
                Круиз — это отель, который плывёт за вами: мы подбираем маршруты с оценкой гостей от 4.8, включая полный пансион и портовые сборы. Перед поездкой узнайте больше о <Link href="/wiki/culture">культуре Скандинавии</Link> в нашей энциклопедии путешественника.
              </p>
               
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Норвегия</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Гейрангер-фьорд — один из самых известных фьордов мира, объект Всемирного наследия ЮНЕСКО</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Наэруой-фьорд — живописный фьорд с великолепными пейзажами и водопадами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Берген — культурная столица Норвегии, город среди семи гор</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Флориан — живописный город на берегу фьорда с богатой историей</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Тромсё — город под северным сиянием, идеальное место для наблюдения за полярными огнями</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Швеция и Дания</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Стокгольм — город на архипелаге, сочетающий современность и историю</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Копенгаген — столица Дании, родина Лего и сказок Андерсена</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Мальмё — шведский город с датским влиянием, соединенный мостом с Копенгагеном</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Гётеборг — второй по величине город Швеции, расположенный у живописной реки Гёте</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Хельсинки — финская столица, сочетающая северную строгость и скандинавский уют</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Уникальные морские впечатления</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <GlobeAltIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Наблюдение за дикой природой</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Экскурсии для наблюдения за китами, морскими львами, орланами и другими представителями северной фауны.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <CameraIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Фото-туры по фьордам</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Профессиональные фотосессии в самых живописных точках фьордов с опытными фотографами.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Культурные мастер-классы</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Изучение традиционных ремесел, кулинарные мастер-классы и знакомство с саамской культурой.
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Что включено в круиз</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <BuildingOfficeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Проживание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Люксовые каюты с панорамными окнами и балконами с видом на фьорды
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <StarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Питание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Изысканные блюда скандинавской кухни, международная гастрономия, шведский стол
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
                  <span>Экспертные знания о Скандинавии и фьордах</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">Готовы к скандинавскому приключению?</h2>
              <p className="text-white mb-6">
                Свяжитесь с нами, чтобы спланировать ваш идеальный круиз по фьордам
              </p>
              <Link 
                href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20круиз%20по%20скандинавским%20фьордам%20с%20Велес%20Вояж."
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
                  Когда лучше всего ехать в Скандинавские фьорды?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Лучшее время для круиза по скандинавским фьордам — лето (июнь-август), 
                  когда дни длинные, погода комфортная, а фьорды наиболее доступны для плавания. 
                  В этот период можно насладиться полярным днем и наблюдать за дикой природой в полной мере.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Нужна ли виза для посещения скандинавских стран?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Гражданам России необходима шенгенская виза для посещения Норвегии, Швеции и Дании.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Что взять с собой в круиз по фьордам?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Рекомендуется взять теплую одежду (даже летом может быть прохладно), 
                  удобную обувь для экскурсий, фотоаппарат, зарядные устройства, 
                  а также документы и визу. На борту лайнера можно арендовать специальное оборудование.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}