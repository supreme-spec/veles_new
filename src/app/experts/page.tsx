import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { SITE_URL } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Эксперты и квалификация Велес Вояж - профессиональная команда',
  description: 'Познакомьтесь с экспертами Велес Вояж: Свистунов Сергей и Колесникова Анастасия. Лицензия РТА 0035678, опыт в туризме, персональный подход к каждому клиенту.',
  url: `${SITE_URL}/experts`,
  type: 'website',
  keywords: [
    'эксперты туризма',
    'квалификация турагентства',
    'профессиональные гиды',
    'лицензия РТА 0035678',
    'Свистунов Сергей',
    'Колесникова Анастасия',
    'опыт в туризме',
    'профессиональное турагентство'
  ],
});

const expertsSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Велес Вояж',
    url: 'https://veles-voyage.ru',
    description: 'Профессиональное турагентство с лицензией РТА 0035678',
    founder: [
      {
        '@type': 'Person',
        name: 'Свистунов Сергей Григорьевич',
        jobTitle: 'Генеральный директор',
        description: 'Опытный предприниматель и путешественник с глубокими знаниями туристической индустрии',
        knowsAbout: ['Туристический бизнес', 'Организация путешествий', 'Международный туризм', 'Управление турагентством']
      },
      {
        '@type': 'Person',
        name: 'Колесникова Анастасия Юрьевна',
        jobTitle: 'Директор',
        description: 'Эксперт в области туристических услуг и клиентского сопровождения',
        knowsAbout: ['Туристические услуги', 'Клиентский сервис', 'Организация туров', 'Международный туризм']
      }
    ]
  }
};

export default function ExpertsPage() {
  return (
    <>
      <StructuredData schemas={[expertsSchema]} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-20 pt-20 md:pt-24">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              <span className="mr-2">👨‍💼</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
                Эксперты и квалификация Велес Вояж
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Наша команда профессионалов с многолетним опытом в туристической индустрии. 
              Официальная лицензия РТА 0035678 гарантирует качество и безопасность наших услуг.
            </p>
          </div>

          {/* Квалификация компании */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">📜</span>
              Квалификация и лицензии
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Лицензия РТА 0035678</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Официальная лицензия Реестра турагентств России с 21 июня 2023 года. 
                  Гарантируем юридическую ответственность за все организованные путешествия.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Опыт работы</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Более 500 успешно организованных индивидуальных маршрутов по России и миру. 
                  Глубокие знания туристической индустрии и международных стандартов.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Экспертное знание</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Энциклопедия по 200+ странам с актуальной информацией о визах, 
                  достопримечательностях и особенностях путешествий.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Поддержка 24/7</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Круглосуточная поддержка клиентов во время путешествий. 
                  Оперативное решение любых вопросов в любой точке мира.
                </p>
              </div>
            </div>
          </div>

          {/* Команда экспертов */}
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              <span className="mr-2">👥</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Наша команда
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Свистунов Сергей */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6">
                    <Image 
                      src="/images/svistunov.webp" 
                      alt="Свистунов Сергей Григорьевич - Генеральный директор ООО Велес"
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Свистунов Сергей Григорьевич
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                    Генеральный директор ООО «Велес»
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Экспертные области:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        Туристический бизнес
                      </span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                        Организация путешествий
                      </span>
                      <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                        Международный туризм
                      </span>
                      <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm">
                        Управление турагентством
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Опытный предприниматель и путешественник с глубокими знаниями туристической индустрии. 
                    Основатель турагентства Велес Вояж с лицензией РТА 0035678.
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href="https://www.finradun.ru/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      Персональный сайт
                    </a>
                    <a 
                      href="https://www.instagram.com/radun.veles/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 dark:text-pink-400 hover:underline font-medium"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Колесникова Анастасия */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6">
                    <Image 
                      src="/images/kolesnikova.webp" 
                      alt="Колесникова Анастасия Юрьевна - Директор ООО Велес"
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Колесникова Анастасия Юрьевна
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                    Директор ООО «Велес»
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Экспертные области:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        Туристические услуги
                      </span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                        Клиентский сервис
                      </span>
                      <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                        Организация туров
                      </span>
                      <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm">
                        Международный туризм
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Эксперт в области туристических услуг и клиентского сопровождения. 
                    Директор турагентства Велес Вояж с лицензией РТА 0035678.
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href="https://franglish-original.ru/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      Персональный сайт
                    </a>
                    <a 
                      href="https://www.instagram.com/anastasia_k._1147/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 dark:text-pink-400 hover:underline font-medium"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Сертификаты и достижения */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              Достижения и стандарты качества
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">500+</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Организовано туров</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Успешно организованных индивидуальных маршрутов по России и миру
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">200+</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Стран в энциклопедии</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Актуальная информация о визах, достопримечательностях и туризме
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">4.9/5</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Рейтинг клиентов</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Высокая оценка качества услуг и клиентского сервиса
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link 
              href="/about"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
            >
              Подробнее о компании
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
