import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { WeeklyServicePhoto } from '@/shared/components/ui/WeeklyServicePhoto';
import { generateEnhancedSEOMetadata as generateSEOMetadata } from '@/lib/seo/unifiedSEO';
import { generateUniversalSchemas } from '@/lib/seo/universalSEO';
import { SchemaScripts } from '@/components/SchemaScripts';
import { FAQSection } from '@/components/FAQSection';
import { AggregateReviewSchema } from '@/shared/components/seo/AggregateReviewSchema';
import { BookingSteps } from '@/components/BookingSteps';
import { WeeklyHeroBackground } from '@/shared/components/ui/WeeklyHeroBackground';
import { WORLD_DESTINATIONS_DATA } from '@/shared/data/worldDestinationsData';
import { SITE_URL } from '@/shared/constants/seo';
import { DestinationImage } from '@/components/DestinationImage';
import { BookOpen, Globe2, Map as MapIcon, Trophy, Users, Headphones, Smartphone, Sparkles, Wallet, ShieldCheck, Target, Check } from 'lucide-react';

const HOME_FAQ = [
  {
    question: 'Как забронировать тур в Велес Вояж?',
    answer:
      'Забронируйте тур онлайн на сайте или позвоните +7 985 063-51-34. Менеджер подберет маршрут и свяжется с вами в течение 15 минут.',
  },
  {
    question: 'Работаете ли вы с турами по России?',
    answer:
      'Да, мы организуем индивидуальные путешествия по всем регионам России, а также международные туры и морские круизы с полной поддержкой 24/7.',
  },
  {
    question: 'Нужна ли виза в Египет в 2026 году?',
    answer:
      'Для граждан России виза в Египет оформляется по прибытии в аэропорт (стоимость около 25 USD) либо заранее через электронную визу. Загранпаспорт должен быть действителен минимум 6 месяцев.',
  },
  {
    question: 'Сколько стоит тур в Турцию «всё включено» из Москвы?',
    answer:
      'Тур в Турцию «всё включено» из Москвы на двоих обычно стоит от 90 000 до 160 000 рублей за 7 ночей в зависимости от отеля и сезона. Точную цену подберёт менеджер Велес Вояж.',
  },
];

export const metadata: Metadata = generateSEOMetadata({
  title: 'Туры и круизы 2026 — Велес Вояж | Подбор путешествий',
  description:
    'Турагентство Велес Вояж (РТА 0035678): подбор туров в Турцию, Египет, ОАЭ, морские круизы. Индивидуальные маршруты, поддержка 24/7, лучшие цены 2026.',
  url: SITE_URL,
  type: 'website',
  keywords: [
    'индивидуальные туры',
    'авторские путешествия',
    'морские круизы 2026',
    'путеводители по странам',
    'турагентство Велес Вояж',
    'РТА 0035678',
  ],
  faqs: HOME_FAQ.slice(0, 2),
});

const POPULAR_DESTINATION_SLUGS = [
  'турция',
  'египет',
  'оаэ',
  'таиланд',
  'мальдивы',
  'греция',
  'шри-ланка',
  'вьетнам',
];

export default async function Home() {
  const schemas = await generateUniversalSchemas({
    title: 'Туры и круизы 2026 — Велес Вояж',
    description:
      'Турагентство Велес Вояж (РТА 0035678). Подбор туров в Турцию, Египет, ОАЭ и морских круизов. Индивидуальные маршруты, поддержка 24/7, лучшие цены.',
    url: SITE_URL,
    type: 'website',
    keywords: [
      'индивидуальные туры',
      'авторские путешествия',
      'морские круизы 2026',
      'путеводители по странам',
      'турагентство Велес Вояж',
      'РТА 0035678',
    ],
    faqs: HOME_FAQ,
  });

  const faqData = HOME_FAQ;

  return (
    <>
      <SchemaScripts schemas={schemas} />
      <AggregateReviewSchema ratingValue={4.9} reviewCount={1242} itemName="Велес Вояж" itemType="TravelAgency" />
      <main className="min-h-screen">
        {/* Hero Section */}
        <WeeklyHeroBackground>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center text-white">
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight drop-shadow-2xl">
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Отдых, <span className="text-blue-600">продуманный до мелочей</span>
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 lg:mb-12 font-medium leading-relaxed drop-shadow-lg">
                <span className="bg-gradient-to-r from-white/95 via-blue-50/90 to-indigo-100/90 bg-clip-text text-transparent">
                  Подберём тур под ваши пожелания, даты и бюджет — и будем на связи до, во время и
                  после поездки
                </span>
              </p>

              {/* Info card and buttons - responsive layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start mb-4 sm:mb-6 md:mb-8">
                {/* Buttons - full width on mobile, left on desktop */}
                <div className="order-1 lg:order-1 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center lg:justify-start w-full">
                  <Link
                    href="/wiki"
                    className="group relative inline-flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold py-3 sm:py-3.5 md:py-4 lg:py-5 px-4 sm:px-5 md:px-6 lg:px-10 rounded-xl sm:rounded-xl md:rounded-2xl text-sm sm:text-sm md:text-base lg:text-lg transition-all duration-300 border border-white/50 hover:border-white shadow-xl hover:shadow-white/20 transform hover:scale-[1.03] hover:-translate-y-0.5 overflow-hidden active:scale-95 w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        <span>Исследовать Wiki</span>
                      </span>
                  </Link>
                  <Link
                    href="/wiki/countries"
                    className="group relative inline-flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold py-3 sm:py-3.5 md:py-4 lg:py-5 px-4 sm:px-5 md:px-6 lg:px-10 rounded-xl sm:rounded-xl md:rounded-2xl text-sm sm:text-sm md:text-base lg:text-lg transition-all duration-300 border border-white/50 hover:border-white shadow-xl hover:shadow-white/20 transform hover:scale-[1.03] hover:-translate-y-0.5 overflow-hidden active:scale-95 w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        <Globe2 className="w-5 h-5" />
                        <span>Страны мира</span>
                      </span>
                  </Link>
                  <Link
                    href="/wiki/places"
                    className="group relative inline-flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold py-3 sm:py-3.5 md:py-4 lg:py-5 px-4 sm:px-5 md:px-6 lg:px-10 rounded-xl sm:rounded-xl md:rounded-2xl text-sm sm:text-sm md:text-base lg:text-lg transition-all duration-300 border border-white/50 hover:border-white shadow-xl hover:shadow-white/20 transform hover:scale-[1.03] hover:-translate-y-0.5 overflow-hidden active:scale-95 w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        <MapIcon className="w-5 h-5" />
                        <span>Мировые локации</span>
                      </span>
                  </Link>
                </div>

                {/* Info card - full width on mobile, right on desktop */}
                <div className="order-2 lg:order-2 w-full">
                  <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md rounded-xl shadow-2xl p-3 sm:p-3.5 md:p-4 lg:p-4 border border-white/30 dark:border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden w-full">
                    {/* Subtle decorative elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-0"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-green-400/10 to-emerald-400/10 rounded-full blur-2xl -z-0"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-2 sm:mb-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                          <span className="text-sm sm:text-base">✈️</span>
                        </div>
                        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                          Путешествуйте через наше турагентство
                        </h2>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                        <div className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-md bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 dark:hover:from-green-900/30 transition-all duration-300 border border-green-100/50 dark:border-green-800/30">
                          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-white text-[9px] sm:text-[10px] font-bold">
                              ✓
                            </span>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-xs sm:text-sm mb-0.5 text-left">
                              Внимание к вашим пожеланиям
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-[11px] leading-tight text-left">
                              Сначала выясняем, каким вы видите отдых, и только потом предлагаем
                              варианты — без навязывания
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-md bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 dark:hover:from-blue-900/30 transition-all duration-300 border border-blue-100/50 dark:border-blue-800/30">
                          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-white text-[9px] sm:text-[10px] font-bold">
                              ✓
                            </span>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-xs sm:text-sm mb-0.5 text-left">
                              Официальная лицензия РТА 0035678
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-[11px] leading-tight text-left">
                              аккредитованное турагентство
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-md bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 dark:hover:from-purple-900/30 transition-all duration-300 border border-purple-100/50 dark:border-purple-800/30">
                          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-md flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-white text-[9px] sm:text-[10px] font-bold">
                              ✓
                            </span>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-xs sm:text-sm mb-0.5 text-left">
                              Прозрачные условия
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-[11px] leading-tight text-left">
                              До бронирования вы знаете полную стоимость, условия и детали — чтобы
                              на месте не было сюрпризов
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-md bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-orange-900/20 dark:to-amber-900/20 hover:from-orange-100 dark:hover:from-orange-900/30 transition-all duration-300 border border-orange-100/50 dark:border-orange-800/30">
                          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-md flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-white text-[9px] sm:text-[10px] font-bold">
                              ✓
                            </span>
                          </div>
                          <div className="text-left">
                            <p className="text-gray-900 dark:text-gray-100 font-semibold text-xs sm:text-sm mb-0.5 text-left">
                              Помогаем сделать правильный выбор
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-[11px] leading-tight text-left">
                              Вам не нужно сравнивать сотни вариантов самим — мы отсеиваем лишнее и
                              показываем то, что подходит именно вам
                            </p>
                          </div>
                        </div>
                      </div>

                      <a
                        href="https://t.me/Anastasiiiiyyaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 sm:py-2.5 md:py-2.5 lg:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transform hover:scale-105 text-xs sm:text-xs md:text-sm lg:text-sm overflow-hidden active:scale-95"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                        <span className="relative z-10">Получить подборку путешествий</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WeeklyHeroBackground>

        {/* Why Choose Us Section */}
        <section
          aria-label="Почему выбирают Велес Вояж"
          className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                <span className="text-gradient-animated drop-shadow-md">
                  Почему выбирают Велес Вояж?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Мы создаём незабываемые путешествия для наших клиентов
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="group relative bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern"></div>
                <div className="relative z-10 mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 relative z-10">
                  Поддержка на каждом этапе
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 relative z-10">
                  Помогаем с подготовкой поездки и остаёмся на связи во время путешествия — вы не
                  остаётесь один на один с вопросами
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern"></div>
                <div className="relative z-10 mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 relative z-10">
                  Внимание к вашим пожеланиям
                </h3>
                <p className="text-sm sm:text-base md:text-gray-600 dark:text-gray-300 relative z-10">
                  Сначала выясняем, каким вы видите отдых, и только потом предлагаем варианты — без
                  навязывания
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern"></div>
                <div className="relative z-10 mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <Headphones className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 relative z-10">
                  Прозрачные условия
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 relative z-10">
                  До бронирования вы знаете полную стоимость, условия и детали — чтобы на месте не
                  было сюрпризов
                </p>
              </div>

              <div className="group relative bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-modern hover-lift text-center overflow-hidden transition-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-modern"></div>
                <div className="relative z-10 mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <Globe2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2 relative z-10">
                  Помогаем сделать правильный выбор
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 relative z-10">
                  Вам не нужно сравнивать сотни вариантов самим — мы отсеиваем лишнее и показываем
                  то, что подходит именно вам
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section
          aria-label="Наши услуги"
          className="py-10 sm:py-12 lg:py-16 bg-white dark:bg-gray-900"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                <span className="text-gradient-animated drop-shadow-md">Наши услуги</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Полный спектр туристических услуг: от консультации до организации путешествия
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-modern-lg overflow-hidden hover-lift transition-modern flex flex-col h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 transition-modern pointer-events-none z-0"></div>
                <div className="h-28 sm:h-32 md:h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative z-10">
                  <div className="relative w-full h-full">
                    <WeeklyServicePhoto serviceType="tours" alt="Туры" />
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow relative z-10">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                    Туры
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 md:mb-4 flex-grow">
                    Маршруты под ваши интересы и бюджет
                  </p>
                  <Link
                    href="/tours"
                    className="inline-block bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 md:py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-bounce text-xs sm:text-sm mt-auto shadow-modern relative z-10 active:scale-95"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-modern-lg overflow-hidden hover-lift transition-modern flex flex-col h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-teal-500/10 group-hover:via-blue-500/10 group-hover:to-cyan-500/10 transition-modern pointer-events-none z-0"></div>
                <div className="h-28 sm:h-32 md:h-40 bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center relative z-10">
                  <div className="relative w-full h-full">
                    <WeeklyServicePhoto
                      serviceType="cruises"
                      cruiseType="mediterranean"
                      alt="Морские круизы по Средиземному морю и Карибам от Велес Вояж"
                    />
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow relative z-10">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                    Морские круизы
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 md:mb-4 flex-grow">
                    Откройте красоты океанских островов и морских побережий
                  </p>
                  <Link
                    href="/cruises"
                    className="inline-block bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 md:py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-bounce text-xs sm:text-sm mt-auto shadow-modern relative z-10 active:scale-95"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-modern-lg overflow-hidden hover-lift transition-modern flex flex-col h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-rose-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-rose-500/10 transition-modern pointer-events-none z-0"></div>
                <div className="h-28 sm:h-32 md:h-40 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center relative z-10">
                  <div className="relative w-full h-full">
                    <WeeklyServicePhoto
                      serviceType="support"
                      alt="Круглосуточная поддержка клиентов 24/7 от Велес Вояж"
                    />
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow relative z-10">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                    Поддержка 24/7
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 md:mb-4 flex-grow">
                    Круглосуточная помощь в планировании и во время путешествий
                  </p>
                  <Link
                    href="/support"
                    className="inline-block bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 md:py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-bounce text-xs sm:text-sm mt-auto shadow-modern relative z-10 active:scale-95"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations (GEO: "Туры В ...") */}
        <section
          aria-label="Популярные направления 2026"
          className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                <span className="text-gradient-animated drop-shadow-md">
                  Куда поехать в 2026 году: популярные направления и цены
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Туры в самые востребованные страны: визы, лучшие курорты и цены
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {POPULAR_DESTINATION_SLUGS.map(slug => {
                const dest = WORLD_DESTINATIONS_DATA[slug];
                if (!dest) return null;
                return (
                  <article key={slug} className="country-card">
                    <div className="country-image">
                      <DestinationImage
                        src={dest.image}
                        alt={`Туры в ${dest.nameAccusative || dest.name} - популярное направление 2026 от Велес Вояж`}
                      />
                    </div>
                    <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow relative z-10">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                        {dest.name}
                        <span className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                          {dest.visaRequired ? 'нужна виза' : 'без визы'} · {dest.priceNote}
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 md:mb-4 flex-grow">
                        {dest.description}
                      </p>
                      {dest.estimatedCost &&
                        (() => {
                          const price = dest.estimatedCost;
                          if (!price)
                            return (
                                <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-3 md:mb-4">
                                Цена по запросу
                              </span>
                            );
                          return (
                            <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-3 md:mb-4">
                              от {price.toLocaleString('ru-RU')} ₽{' '}
                              <span className="text-xs sm:text-sm md:text-sm font-medium text-gray-500 dark:text-gray-400">
                                {dest.priceNote}
                              </span>
                            </p>
                          );
                        })()}
                      <Link
                        href={`/wiki/${dest.slug}`}
                        className="inline-block bg-indigo-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 md:py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-bounce text-xs sm:text-sm mt-auto shadow-modern relative z-10 active:scale-95"
                      >
                        Подробнее →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="text-center mt-6 sm:mt-8 lg:mt-10">
              <Link
                href="/wiki/countries"
                className="inline-block bg-indigo-600 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm sm:text-base active:scale-95"
              >
                Все страны и направления
              </Link>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section
          aria-label="Наша философия и ценности"
          className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                <span className="text-gradient-animated drop-shadow-md">Наша философия</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Открываем мир через призму личного опыта
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2" /> Велес — покровитель путешественников
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Имя нашего агентства не случайно. Велес — древнеславянский бог-покровитель
                  путешественников, торговцев и странников. Он олицетворяет мудрость, накопленную
                  через познание мира, и защищает тех, кто отважился покинуть привычное окружение
                  ради новых открытий.
                </p>
                <Link
                  href="/mission"
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
                >
                  Наша миссия
                </Link>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-indigo-500" /> Наши ценности
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      Аутентичные и уникальные впечатления
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      Устойчивый и ответственный туризм
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      Современные технологии в путешествиях
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      Персональный подход к каждому клиенту
                    </li>
                  </ul>
                  <Link
                    href="/values"
                    className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors mt-4"
                  >
                    Подробнее о наших ценностях
                  </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-indigo-500" /> Наш подход
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      Индивидуальные маршруты под ваши интересы
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      Экспертное знание направлений
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      Полное сопровождение 24/7
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 shrink-0 text-indigo-600 dark:text-indigo-400" />
                      Безопасность и комфорт
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section aria-label="Наша команда" className="py-10 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
                <span className="text-gradient-animated drop-shadow-md">Наша команда</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
                Команда опытных путешественников и профессионалов туристической индустрии
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
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
                  Сергей Свистунов
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                  Генеральный директор
                </p>
                <p className="text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg p-3 border border-white/30 dark:border-gray-600/50 shadow-sm">
                  Опытный предприниматель и путешественник с глубокими знаниями туристической
                  индустрии
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
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
                  Анастасия Колесникова
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">Директор</p>
                <p className="text-gray-700 dark:text-gray-200 text-sm font-medium leading-relaxed bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg p-3 border border-white/30 dark:border-gray-600/50 shadow-sm">
                  Эксперт в области туристических услуг и клиентского сопровождения
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/about"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Подробнее о нас
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          aria-label="Преимущества работы с нами"
          className="py-10 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Преимущества работы с нами
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Полная поддержка на всех этапах путешествия
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white dark:bg-gray-700 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500">
                <div className="relative z-10 mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <MapIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Полная энциклопедия
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Подробные путеводители по всем странам мира с актуальной информацией о визах,
                  культуре и достопримечательностях.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500">
                <div className="relative z-10 mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Цифровые решения
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Современные решения для планирования и организации путешествий.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500">
                <div className="relative z-10 mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Персональный опыт
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Индивидуальные рекомендации и маршруты, адаптированные под ваши предпочтения и
                  стиль путешествий.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500">
                <div className="relative z-10 mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <Wallet className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Прозрачные условия
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Прямые контракты с поставщиками услуг и эксклюзивные предложения позволяют
                  предлагать лучшие цены на рынке.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500">
                <div className="relative z-10 mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Надежность и безопасность
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Лицензия РТА 0035678, полное страхование и юридическая защита всех туристических
                  услуг.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-500">
                <div className="relative z-10 mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                  <Headphones className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Круглосуточная поддержка
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Наши специалисты всегда на связи для решения любых вопросов во время вашего
                  путешествия.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HowTo: Как забронировать тур в 5 шагов */}
        <BookingSteps />

        {/* FAQ Section */}
        <FAQSection faqs={faqData} title="Полезные вопросы" schemaId={`${SITE_URL}/#faq-home`} />

        {/* CTA Section */}
        <section aria-label="Призыв к действию" className="py-10 sm:py-12 lg:py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Расскажите, каким вы видите своё путешествие
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8">
              Подберём варианты отдыха с учётом ваших пожеланий, дат и бюджета
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/wiki"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base md:text-lg transition-colors duration-200"
              >
                Получить подборку путешествий
              </Link>
              <Link
                href="/wiki/countries"
                className="inline-flex items-center justify-center bg-transparent hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base md:text-lg transition-colors duration-200 border-2 border-white"
              >
                Посмотреть страны
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
