import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon, GlobeAltIcon, CameraIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import StructuredData from '@/components/SEO/StructuredData';
import { alaskaSchemas } from '@/shared/data/cruises/alaska';


export const metadata: Metadata = {
  title: 'Круизы в Аляску 2026 | Велес Вояж - Путешествие к ледникам Аляски',
  description: 'Круизы в Аляску: Юнак, Глэйшер-Бей, Джуно, Ситка, Кетчен. Ледники, дикая природа, уникальные животные, бронирование от 130 000₽.',
};

export default function AlaskaCruisePage() {
  return (
    <>
      <StructuredData schemas={alaskaSchemas} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20 pt-24">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
              <span className="mr-3">❄️</span>
              <span className="text-gradient-animated drop-shadow-md">
                Круизы в Аляску
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Путешествие к ледникам и дикой природе последнего рубежа с Велес Вояж
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <GlobeAltIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">5 Портов</h3>
              <p className="text-gray-600 dark:text-gray-400">Юнак, Глэйшер-Бей, Джуно, Ситка, Кетчен</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <ClockIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">7-14 Дней</h3>
              <p className="text-gray-600 dark:text-gray-400">Оптимальная продолжительность</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BanknotesIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">От 130 000₽</h3>
              <p className="text-gray-600 dark:text-gray-400">Конкурентные цены</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BuildingOfficeIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Премиум класс</h3>
              <p className="text-gray-600 dark:text-gray-400">Специализированные лайнеры</p>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Откройте для себя Аляску
              </span>
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6">
                Круизы в Аляску — это настоящее приключение для любителей дикой природы, 
                ледников и уникальной флоры и фауны крайнего севера. 
                От величественных ледниковых массивов до обширных тайги, 
                от северного сияния до встреч с медведями и китами — 
                каждый день круиза наполнен дикой красотой и незабываемыми впечатлениями.
              </p>

              <p className="mb-6">
                Круиз — это отель, который плывёт за вами: мы подбираем маршруты с оценкой гостей от 4.8, включая полный пансион и портовые сборы. Перед поездкой узнайте больше о <Link href="/wiki/places">достопримечательностях и местах Аляски</Link> в нашей энциклопедии путешественника.
              </p>
               
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Ледниковые экскурсии</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Юнак — крупнейший пригород Юно, отправная точка для ледниковых экскурсий</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Глэйшер-Бей — живописный залив с возможностью увидеть ледники вблизи</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Матануска-глетчер — один из самых доступных ледников для посещения</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Кенай-Фьордс — национальный парк с великолепными фьордами и ледниками</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Денали — национальный парк с самой высокой горой Северной Америки</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Городские порты</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Джуно — столица Аляски, расположенная среди гор и ледников</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Ситка — исторический город с русским наследием и тотемными столбами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Кетчен — рыбацкий порт с богатой историей золотой лихорадки</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Скагуэй — город золотой лихорадки 1898 года, отправная точка для поездок на поезде</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Вrangell — небольшой город с богатой историей и доступом к дикой природе</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Уникальные аляскинские впечатления</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <GlobeAltIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Наблюдение за дикой природой</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Экскурсии для наблюдения за китами, медведями, орланами и другими представителями северной фауны.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <CameraIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Фото-туры по Аляске</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Профессиональные фотосессии в самых живописных точках Аляски с опытными фотографами.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Культурные экскурсии</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Знакомство с культурой коренных народов Аляски, история золотой лихорадки и русского наследия.
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Что включено в круиз</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <BuildingOfficeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Проживание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Просторные каюты с панорамными окнами, современные удобства, специальное отопление
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <StarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Питание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Северная кухня, международные блюда, шведский стол, диетическое меню с учетом климата
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <PaperAirplaneIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Экскурсии</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Профессиональные экскурсии с гидами-натуралистами, посещение достопримечательностей
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Почему выбирают нас</h3>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Экспертные знания о Аляске и её дикой природе</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Индивидуальный подход к каждому путешественнику</span>
                </li>
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Профессиональные гиды-натуралисты на борту</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">Готовы к аляскинскому приключению?</h2>
              <p className="text-white mb-6">
                Свяжитесь с нами, чтобы спланировать ваш идеальный круиз по Аляске
              </p>
              <Link 
                href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20круиз%20по%20Аляске%20с%20Велес%20Вояж."
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
                  Когда лучше всего ехать в Аляску?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Лучшее время для аляскинских круизов — лето (май-сентябрь), 
                  когда дни длинные, погода наиболее комфортная, а дикая природа наиболее активна. 
                  В этот период можно насладиться максимальным количеством дневного света 
                  и наблюдением за животными.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Нужна ли виза для посещения Аляски?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Аляска является частью США, поэтому для граждан России необходима американская виза. 
                  Рекомендуется оформлять туристическую визу за несколько месяцев до поездки.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Что взять с собой в аляскинский круиз?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Рекомендуется взять теплую одежду (даже летом может быть прохладно), 
                  водонепроницаемую куртку, удобную обувь для экскурсий, фотоаппарат, 
                  зарядные устройства, а также документы, визу и медицинскую страховку. 
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