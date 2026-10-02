'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { OptimizedImage } from './OptimizedImage';

interface CountryCard {
  id: string;
  title: string;
  continent: string;
  description: string;
  image?: string;
  flag?: string;
  capital?: string;
  population?: string;
  isPopular?: boolean;
}

interface CountryCardsProps {
  countries: CountryCard[];
  title?: string;
  showPopularFirst?: boolean;
  gridCols?: 2 | 3 | 4;
  className?: string;
}

export function CountryCards({ 
   countries, 
   title = "Популярные направления",
   showPopularFirst = true,
   gridCols = 3,
   className = ""
 }: CountryCardsProps) {
   const sortedCountries = showPopularFirst 
     ? [...countries].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
     : countries;
 
   const gridClass = {
     2: "grid-cols-1 sm:grid-cols-2",
     3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 
     4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    }[gridCols];

  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={`py-8 ${className}`}>
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>
      )}
      
      <div className={`grid ${gridClass} gap-6`}>
        {sortedCountries.map((country, index) => (
          <motion.div
            key={country.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }
            }
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    y: -8,
                    transition: { duration: 0.2 },
                  }
            }
            className="group relative"
          >
            <Link href={`/wiki/${country.id}`}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-indigo-200">
                {/* Популярный бейдж */}
                {country.isPopular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      ⭐ Популярное
                    </span>
                  </div>
                )}

                {/* Изображение */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                  {country.image ? (
                    <OptimizedImage
                      src={country.image}
                      alt={`Достопримечательности ${country.title}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-50">
                        {country.flag || '🏛️'}
                      </div>
                    </div>
                  )}
                  
                  {/* Градиент оверлей */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Флаг в углу */}
                  {country.flag && (
                    <div className="absolute bottom-4 left-4">
                      <span className="text-2xl drop-shadow-lg">{country.flag}</span>
                    </div>
                  )}
                </div>

                {/* Контент */}
                <div className="p-6">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {country.title}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {country.continent}
                      </span>
                    </div>
                    
                    {/* Краткая информация */}
                    {(country.capital || country.population) && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        {country.capital && (
                          <div className="flex items-center space-x-1">
                            <span>🏛️</span>
                            <span>{country.capital}</span>
                          </div>
                        )}
                        {country.population && (
                          <div className="flex items-center space-x-1">
                            <span>👥</span>
                            <span>{country.population}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {country.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 font-medium text-sm group-hover:text-indigo-800 transition-colors">
                      Читать далее →
                    </span>
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Кнопка "Посмотреть все" */}
      {countries.length > 6 && (
        <div className="text-center mt-8">
          <Link
            href="/wiki"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Посмотреть все страны</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}

// Утилитные стили для line-clamp (добавить в globals.css)
/*
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
*/
