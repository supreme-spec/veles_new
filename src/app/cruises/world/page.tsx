import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon, GlobeAltIcon, CameraIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import StructuredData from '@/components/SEO/StructuredData';
import { worldSchemas } from '@/shared/data/cruises/world';


export const metadata: Metadata = {
  title: 'Кругосветные круизы 2026 | Велес Вояж - Уникальное приключение по экзотическим уголкам планеты',
  description: 'Кругосветные круизы: Европа, Азия, Африка, Северная и Южная Америка, Австралия, Океания. Барселона, Дубай, Сингапур, Сидней, Сан-Франциско, Рио-де-Жанейро, Кейптаун. Все континенты, экзотические уголки планеты, бронирование от 250 000₽.',
};

export default function WorldCruisePage() {
  return (
    <>
      <StructuredData schemas={worldSchemas} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20 pt-24">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
              <span className="mr-3">⛵</span>
              <span className="text-gradient-animated drop-shadow-md">
                Кругосветные круизы
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Уникальное приключение по самым экзотическим уголкам планеты с Велес Вояж
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <GlobeAltIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">6 Континентов</h3>
              <p className="text-gray-600 dark:text-gray-400">Европа, Азия, Африка, Америка, Австралия, Океания</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <ClockIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">90-120 Дней</h3>
              <p className="text-gray-600 dark:text-gray-400">Эпическое путешествие</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BanknotesIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">От 250 000₽</h3>
              <p className="text-gray-600 dark:text-gray-400">Премиум стоимость</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BuildingOfficeIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Люкс класс</h3>
              <p className="text-gray-600 dark:text-gray-400">Высший уровень сервиса</p>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-extrabold mb-6 animate-fade-in-up">
              <span className="text-gradient-animated drop-shadow-md">
                Откройте для себя мир
              </span>
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6">
                Кругосветные круизы — это вершина морских путешествий, позволяющая посетить десятки стран 
                и континентов в одном незабываемом приключении. 
                От исторических достопримечательностей Европы до экзотических пляжей Кариб, 
                от древних храмов Азии до дикой природы Африки — 
                каждый день круиза наполнен новыми открытиями и неповторимыми впечатлениями.
              </p>

              <p className="mb-6">
                Круиз — это отель, который плывёт за вами: мы подбираем маршруты с оценкой гостей от 4.8, включая полный пансион и портовые сборы. Перед поездкой узнайте больше о <Link href="/wiki/countries">странах и континентах всего мира</Link> в нашей энциклопедии путешественника.
              </p>
               
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные маршруты</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Европа и Африка</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Барселона — стартовая точка с архитектурой Гауди и средиземноморской культурой</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Кейптаун — "жемчужина ЮАР" с Table Mountain и пингвинами на пляже Бульдерс</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Дубай — современный мегаполис с бурджами и шейхами в пустыне</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Сингапур — город-государство с Gardens by the Bay и Marina Bay Sands</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Маврикий — тропический рай с белыми пляжами и коралловыми рифами</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Азия и Океания</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Сидней — оперный театр, Харбор-Бридж и пляжи Бонди</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Фиджи — архипелаг из более чем 300 островов с кристально чистой водой</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Бора-Бора — "жемчужина Тихого океана" с оверуотер-бунгало</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Таити — остров любви с вулканами и тропическими садами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Новая Зеландия — страна хоббитов с фьордами Мильфорд и гейзерами Роторуа</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Уникальные мировые впечатления</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <GlobeAltIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Культурное погружение</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Посещение исторических памятников, участие в традиционных фестивалях и изучение местных обычаев.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <CameraIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Фото-туры по миру</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Профессиональные фотосессии в самых живописных точках планеты с опытными фотографами.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Гастрономические путешествия</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Дегустации национальных блюд, винные туры и кулинарные мастер-классы от шеф-поваров.
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Что включено в круиз</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <BuildingOfficeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Проживание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Просторные люксовые каюты с панорамными окнами, персональный консьерж, высокоскоростной Wi-Fi
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <StarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Питание</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Мишленовские рестораны, национальные кухни, диетическое меню, премиальные вина и напитки
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <PaperAirplaneIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Экскурсии</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Элитные экскурсии с частными гидами, VIP-доступ к закрытым достопримечательностям
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Почему выбирают нас</h3>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <span>Экспертные знания о всех континентах и их культурах</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">Готовы к кругосветному приключению?</h2>
              <p className="text-white mb-6">
                Свяжитесь с нами, чтобы спланировать ваш идеальный кругосветный круиз
              </p>
              <Link 
                href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20кругосветный%20круиз%20с%20Велес%20Вояж."
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
                  Когда лучше всего ехать в кругосветное путешествие?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Кругосветные круизы доступны круглый год, но лучшее время зависит от выбранных маршрутов. 
                  Рекомендуется планировать путешествие с учетом сезонов в разных регионах: 
                  зима в Европе совпадает с летом в Южном полушарии. 
                  Мы поможем выбрать оптимальное время для вашего маршрута.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Нужна ли виза для кругосветного круиза?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Для разных стран требуются разные визы. Мы предоставляем помощь в оформлении 
                  всех необходимых документов, включая визы, медицинские справки и страхование. 
                  Наши специалисты помогут пройти весь процесс подготовки.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Что взять с собой в кругосветный круиз?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Рекомендуется взять многослойную одежду для разных климатов, 
                  формальную одежду для ресторанов, удобную обувь для экскурсий, 
                  фотоаппарат, зарядные устройства, а также все необходимые документы. 
                  Мы предоставим подробный чек-лист перед поездкой.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}