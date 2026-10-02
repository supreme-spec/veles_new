import type { Metadata } from 'next';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon, BanknotesIcon, BuildingOfficeIcon, PaperAirplaneIcon, InformationCircleIcon, GlobeAltIcon, CameraIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import StructuredData from '@/components/SEO/StructuredData';
import { mediterraneanSchemas } from '@/shared/data/cruises/mediterranean';


export const metadata: Metadata = {
  title: 'Средиземноморские круизы 2026 | Велес Вояж - Круизы по Средиземному морю',
  description: 'Средиземноморские круизы: Греция, Италия, Испания, Франция, Хорватия. Афины, Рим, Барселона, Ницца, Дубровник. Древние цивилизации, солнечные побережья, архитектура, кухня, бронирование от 90 000₽.',
};

export default function MediterraneanCruisePage() {
  return (
    <>
      <StructuredData schemas={mediterraneanSchemas} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-20 pt-24">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
              <span className="mr-3">🏛️</span>
              <span className="text-gradient-animated drop-shadow-md">
                Средиземноморские круизы
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Исследуйте древние цивилизации и солнечные побережья Средиземного моря с Велес Вояж
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <GlobeAltIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">5 Стран</h3>
              <p className="text-gray-600 dark:text-gray-400">Греция, Италия, Испания, Франция, Хорватия</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <ClockIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">7-14 Дней</h3>
              <p className="text-gray-600 dark:text-gray-400">Оптимальная продолжительность</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <BanknotesIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">От 90 000₽</h3>
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
                Откройте для себя Средиземноморье
              </span>
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6">
                Средиземноморские круизы — это уникальная возможность погрузиться в историю древних цивилизаций, 
                насладиться солнечными пляжами и насыщенной культурой южноевропейских стран. 
                От античных руин Греции до романтических улочек Италии, от архитектурных шедевров Испании 
                до изысканной французской культуры — каждый день круиза наполнен культурными открытиями 
                и незабываемыми впечатлениями.
              </p>

              <p className="mb-6">
                Круиз — это отель, который плывёт за вами: мы подбираем маршруты с оценкой гостей от 4.8, включая полный пансион и портовые сборы. Перед поездкой узнайте больше о <Link href="/wiki/culture">культуре Средиземноморья</Link> в нашей энциклопедии путешественника.
              </p>
               
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Популярные направления</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Греция и Италия</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Санторини — вулканический остров с белыми домами и синими куполами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Миконос — остров ветряных мельниц и живописных улочек</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Неаполь — ворота в Помпеи и Везувий, колыбель пиццы</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Венеция — город на воде с каналами, гондолами и маскарадами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Рим — Вечный город с Колизеем, Ватиканом и форумами</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Испания, Франция и Хорватия</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Барселона — город Гауди с парком Гуэль и собором Саграда Фамилия</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Ницца — французская Ривьера с Променадой Английских</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Дубровник — "жемчужина Адриатики" с крепостными стенами</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Сплит — исторический город с Дворцом Диоклетиана</span>
                    </li>
                    <li className="flex items-start">
                      <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" />
                      <span>Марсель — самый старый город Франции с Вieux Port</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Уникальные средиземноморские впечатления</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <GlobeAltIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Исторические экскурсии</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Посещение античных руин, средневековых замков, соборов и музеев с профессиональными гидами.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <CameraIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Кулинарные мастер-классы</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Изучение традиционных рецептов средиземноморской кухни, дегустации вин и оливкового масла.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Арт-туры</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Посещение художественных галерей, архитектурных достопримечательностей и культурных мероприятий.
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
                    Средиземноморская кухня, международные блюда, шведский стол, диетическое меню
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
                  <span>Экспертные знания о Средиземноморье и его истории</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">Готовы к средиземноморскому приключению?</h2>
              <p className="text-white mb-6">
                Свяжитесь с нами, чтобы спланировать ваш идеальный круиз по Средиземноморью
              </p>
              <Link 
                href="https://wa.me/79850635134?text=Привет!%20Хочу%20запланировать%20средиземноморский%20круиз%20с%20Велес%20Вояж."
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
                  Когда лучше всего ехать в Средиземноморье?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Лучшее время для средиземноморских круизов — лето (май-сентябрь), 
                  когда погода наиболее комфортная, море теплее, а достопримечательности открыты. 
                  В этот период можно насладиться пляжами, экскурсиями и активными видами отдыха.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Нужна ли виза для посещения средиземноморских стран?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Для разных стран требуется разное визовое оформление: 
                  Греция, Италия, Испания, Франция — шенгенская виза, 
                  Хорватия — безвизовый режим до 90 дней для туристов.
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Что взять с собой в средиземноморский круиз?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Рекомендуется взять легкую одежду, купальники, головные уборы, 
                  солнцезащитные средства, удобную обувь для экскурсий, фотоаппарат, 
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