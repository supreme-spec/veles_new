'use client';

import Link from 'next/link';
import { WikiSearch } from '@/features/wiki/components/WikiSearch';
import { WikiProvider } from '@/features/wiki/context/WikiContext';
import { RandomCountries } from '@/components/RandomCountries';
import { WikiStatsGrid } from '@/components/WikiStatsGrid';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type WikiPageClientProps = {
    stats: {
        readyArticles: number;
        citiesCount: number;
        attractionsCount: number;
        totalCountries: number;
    };
};

export function WikiPageClient({ stats }: WikiPageClientProps) {
    const searchParams = useSearchParams();
    const [initialSearch, setInitialSearch] = useState('');

    useEffect(() => {
        if (searchParams) {
            const search = searchParams.get('search');
            if (search) {
                setInitialSearch(search);
            }
        }
    }, [searchParams]);

    return (
        <WikiProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16 md:pt-20">
                <div className="container mx-auto px-4 py-8">

                    {/* Заголовок */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            <span className="mr-2">🌍</span>
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-600 bg-clip-text text-transparent drop-shadow-md">
                                Энциклопедия стран мира
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Откройте для себя удивительный мир путешествий с подробными гидами по странам,
                            информацией о визах, достопримечательностях и культурных особенностях
                        </p>
                    </div>

                    {/* Поиск */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <WikiSearch initialSearch={initialSearch} />
                    </div>

                    {/* Категории энциклопедии */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-12">
                        <Link href="/wiki/intro" prefetch={true} className="group">
                            <div className="h-full flex flex-col p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 hover:border-indigo-200 hover:shadow-md transition-all">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-3">🧭</span>
                                    <h3 className="text-xl font-semibold text-indigo-900 group-hover:text-indigo-700">Введение</h3>
                                </div>
                                <p className="text-indigo-700 text-sm flex-grow line-clamp-3">Узнайте о возможностях Велес Вояж и современных технологиях в путешествиях</p>
                            </div>
                        </Link>
                        <Link href="/wiki/countries" prefetch={true} className="group">
                            <div className="h-full flex flex-col p-6 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-200 hover:bg-blue-100 transition-all">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-3">🌍</span>
                                    <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700">Страны мира</h3>
                                </div>
                                <p className="text-blue-700 text-sm flex-grow line-clamp-3">Путеводители по {stats.totalCountries} странам мира с подробной информацией о визах, достопримечательностях и культуре</p>
                            </div>
                        </Link>
                        <Link href="/wiki/destinations" prefetch={true} className="group">
                            <div className="h-full flex flex-col p-6 bg-orange-50 rounded-lg border border-orange-100 hover:border-orange-200 hover:bg-orange-100 transition-all">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-4">🏝️</span>
                                    <h3 className="text-lg font-semibold text-orange-900 group-hover:text-orange-700">Направления</h3>
                                </div>
                                <p className="text-orange-700 text-sm flex-grow line-clamp-3">Популярные туристические направления и тематические подборки</p>
                            </div>
                        </Link>
                        <Link href="/wiki/culture" prefetch={true} className="group">
                            <div className="h-full flex flex-col p-6 bg-emerald-50 rounded-lg border border-emerald-100 hover:border-emerald-200 hover:bg-emerald-100 transition-all">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-3">🎭</span>
                                    <h3 className="text-xl font-semibold text-emerald-900 group-hover:text-emerald-700">Культура</h3>
                                </div>
                                <p className="text-emerald-700 text-sm flex-grow line-clamp-3">Традиции, обычаи, кухня и культурные особенности разных народов</p>
                            </div>
                        </Link>
                        <Link href="/wiki/travel-tips" prefetch={true} className="group">
                            <div className="h-full flex flex-col p-6 bg-amber-50 rounded-lg border border-amber-100 hover:border-amber-200 hover:bg-amber-100 transition-all">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-3">✈️</span>
                                    <h3 className="text-xl font-semibold text-amber-900 group-hover:text-amber-700">Советы туристам</h3>
                                </div>
                                <p className="text-amber-700 text-sm flex-grow line-clamp-3">Практические советы, лайфхаки и рекомендации для комфортных путешествий</p>
                            </div>
                        </Link>
                        <Link href="/wiki/places" prefetch={true} className="group">
                            <div className="h-full flex flex-col p-6 bg-purple-50 rounded-lg border border-purple-100 hover:border-purple-200 hover:bg-purple-100 transition-all">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-3">🗺️</span>
                                    <h3 className="text-xl font-semibold text-purple-900 group-hover:text-purple-700">Мировые локации</h3>
                                </div>
                                <p className="text-purple-700 text-sm flex-grow line-clamp-3">Интерактивная карта и каталог ключевых мест: города, достопримечательности, курорты и аэропорты</p>
                            </div>
                        </Link>
                    </div>

                    {/* Популярные страны */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-extrabold mb-6 text-center">
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-600 bg-clip-text text-transparent drop-shadow-md">
                                Популярные направления
                            </span>
                        </h2>
                        <RandomCountries count={6} />
                    </div>

                    {/* Статистика */}
                    <div className="bg-white rounded-lg border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Статистика энциклопедии</h2>
                        <WikiStatsGrid stats={stats} />
                    </div>
                </div>
            </div>
        </WikiProvider>
    );
}
