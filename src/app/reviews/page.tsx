import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import {
  reviewsSchemas,
  reviewsDatePublished,
  reviewsDateModified,
} from '@/shared/data/pages/reviews';
import { SITE_URL } from '@/shared/constants/seo';

// Извлекаем данные из схем для метаданных
const articleSchema = reviewsSchemas.find(s => s['@type'] === 'Article') as any;
const faqSchema = reviewsSchemas.find(s => s['@type'] === 'FAQPage') as any;

export const metadata: Metadata = generateSEOMetadata({
  title: articleSchema?.headline || 'Честные отзывы путешественников о Велес Вояж',
  description: articleSchema?.description || 'Реальные отзывы путешественников о Велес Вояж. Более 500 гостей поделились впечатлениями о турах в Турцию, Дубай, Египет и Абхазию.',
  url: `${SITE_URL}/reviews`,
  type: 'article',
  keywords: articleSchema?.keywords || [],
  publishedTime: reviewsDatePublished,
  modifiedTime: reviewsDateModified,
  includeWeb3: true,
  includeAI: true,
  includeVideo: true,
  videoData: {
    name: 'Отзывы клиентов - Велес Вояж',
    description: 'Видеоотзывы туристов о путешествиях',
    contentUrl: 'https://rutube.ru/u/velesvoyage/',
    embedUrl: 'https://rutube.ru/u/velesvoyage/'
  },
  faqs: faqSchema?.mainEntity?.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer.text
  })) || []
});

const ReviewsPage = () => {
  const reviewsSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Велес Вояж',
    '@id': `${SITE_URL}#organization`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Павлов С.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Летали в этом году в Турцию через данную компанию, оперативно помогли подобрать тур, сопровождали и все подсказали, а самое главное цены ниже чем у других. Рекомендую',
        datePublished: '2023-07',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Тур в Турцию',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Екатерина К.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Только что вернулись из Турции, отдыхали в г. Мармарис, оформляли все через компанию "Велес". Все очень четко, быстро, просила выгодные варианты найти, получилось все как по заказу. Ребята работают на совесть.',
        datePublished: '2023-08',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Тур в Мармарис',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Naira N.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Хочу выразить свою благодарность за подбор тура, отзывчивость и терпеливость. Агент постоянно был на связи, помогал, советовал. Выбрали Дубай, отель Aloft Palm Jumeirah. Отдых прошел замечательно.',
        datePublished: '2023-08',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Тур в Дубай',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Оля К.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Выражаю огромную благодарность туристическому агентству Велес, за организацию нашего отпуска. Все было на высшем уровне, на всех этапах были на связи практически 24/7.',
        datePublished: '2024-07',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Международный тур',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Сергей А.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Хотим сказать огромное спасибо ребятам, за качественную и самое главное быструю работу. Летали в заграничный Дубай. Подобрали хороший отель, решили все вопросы.',
        datePublished: '2026-04',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Тур в Дубай',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Марина К.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Вчера вернулись с мужем из Хургады. И сразу же хотим поблагодарить Анастасию, которая терпеливо, детально, объективно консультировала нас - новичков с момента обращения за подбором тура до прилета домой.',
        datePublished: '2026-04',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Тур в Хургаду',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Анастасия Л.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Только вернулись из жаркой Абхазии. Ребятам огромное спасибо! Всегда на связи, всё расскажут, помогут если что решить проблемы. Подобрали тур под бюджет.',
        datePublished: '2024-09',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Тур в Абхазию',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Севан В.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Летали в Дубай. Все по структуре было сделано великолепно, перелеты в удобное время, отель отличный, трансфер и постоянной контроль при необходимости.',
        datePublished: '2024-10',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Тур в Дубай',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Яна И.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: 'Мы пользуемся услугами ребят уже не первый год и все наши путешествия проходят комфортно благодаря им! Всегда очень быстро и оперативно подбирают подходящие варианты.',
        datePublished: '2026-06',
        itemReviewed: {
          '@type': 'TouristTrip',
          name: 'Международные туры',
        },
      },
    ],
  };

  return (
    <article>
      <StructuredData schemas={[...reviewsSchemas, reviewsSchema]} />

      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 relative">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
                Честные отзывы путешественников о Велес Вояж
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto relative">
              Более 500 гостей поделились своими впечатлениями о турах с Велес Вояж. Мы публикуем
              отзывы без цензуры, сохраняя авторский стиль — даже конструктивную критику.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 mb-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 relative">
                  Реальные истории наших путешественников
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Мы собрали для вас реальные отзывы наших клиентов.
                  Эти истории путешествий помогут вам сделать правильный выбор для вашего отдыха.
                </p>
              </div>

              {/* Real Customer Reviews Section */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="speakable-summary bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      П
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Павлов С.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Летали в этом году в <Link href="/wiki/turkey" className="text-blue-600 hover:text-blue-800 underline">Турцию</Link> через данную компанию, оперативно помогли подобрать тур, сопровождали и все подсказали, а самое главное цены ниже чем у других. Рекомендую 👌🔥"
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Турция • Июль 2023
                  </div>
                </div>

                <div className="speakable-summary bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-green-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                      Е
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Екатерина К.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Только что вернулись из <Link href="/wiki/turkey" className="text-blue-600 hover:text-blue-800 underline">Турции</Link>, отдыхали в г. <Link href="/wiki/marmaris" className="text-blue-600 hover:text-blue-800 underline">Мармарис</Link>, оформляли все через компанию "Велес". Все очень четко, быстро, просила выгодные варианты найти, получилось все как по заказу. Ребята работают на совесть."
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Мармарис, Турция • Август 2023
                  </div>
                </div>

                <div className="speakable-summary bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-amber-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      Н
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Naira N.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Хочу выразить свою благодарность за подбор тура, отзывчивость и терпеливость. Агент постоянно был на связи, помогал, советовал. Выбрали <Link href="/wiki/uae" className="text-blue-600 hover:text-blue-800 underline">Дубай</Link>, отель Aloft Palm Jumeirah. Отдых прошел замечательно, все было как мы и планировали."
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Дубай, ОАЭ • Август 2023
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-purple-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      О
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Оля К.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Выражаю огромную благодарность туристическому агентству Велес, за организацию нашего отпуска. Все было на высшем уровне, на всех этапах были на связи практически 24/7 🙏🏻🤗 за это огромное спасибо. Рекомендую ребят как профессионалов своего дела."
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Международный тур • Июль 2024
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-cyan-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      С
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Сергей А.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Хотим сказать огромное спасибо ребятам, за качественную и самое главное быструю работу. Летали в заграничный <Link href="/wiki/uae" className="text-blue-600 hover:text-blue-800 underline">Дубай</Link>. Подобрали хороший отель, решили все вопросы. Порекомендовали отличную компанию по аренде авто. В общем мы остались очень довольны!"
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Дубай, ОАЭ • Апрель 2026
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-rose-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      М
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Марина К.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Вчера вернулись с мужем из <Link href="/wiki/hurghada" className="text-blue-600 hover:text-blue-800 underline">Хургады</Link>. И сразу же хотим поблагодарить Анастасию, которая терпеливо, детально, объективно консультировала нас - новичков с момента обращения за подбором тура до прилета домой. Спасибо за профессионализм!"
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Хургада, Египет • Апрель 2026
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-emerald-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-lg">
                      А
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Анастасия Л.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Только вернулись из жаркой <Link href="/wiki/abkhazia" className="text-blue-600 hover:text-blue-800 underline">Абхазии</Link>. Ребятам огромное спасибо! Всегда на связи, всё расскажут, помогут если что решить проблемы. Подобрали тур под бюджет. В следующий раз однозначно к вам))"
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Абхазия • Сентябрь 2024
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-violet-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      С
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Севан В.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Летали в <Link href="/wiki/uae" className="text-blue-600 hover:text-blue-800 underline">Дубай</Link>. Все по структуре было сделано великолепно, перелеты в удобное время, отель отличный, трансфер и постоянной контроль при необходимости. Теперь знаем с каким туроператором будем покорять остальные страны."
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Дубай, ОАЭ • Октябрь 2024
                  </div>
                </div>

                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-fuchsia-100 dark:border-gray-600 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      Я
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 dark:text-white">Яна И.</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Мы пользуемся услугами ребят уже не первый год и все наши путешествия проходят комфортно благодаря им! Всегда очень быстро и оперативно подбирают подходящие варианты, учитывая все наши пожелания 🙌 Отдохнули очень круто! Спасибо вам большое! 🫶🏻"
                  </p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Международные туры • Июнь 2026
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 my-10 border-l-4 border-indigo-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-5 -translate-y-16 translate-x-16"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-6 flex items-center">
                    <span className="mr-3 text-2xl">💬</span>
                    Отзывы наших клиентов
                  </h3>

                  <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    Выше представлены некоторые из отзывов наших клиентов.
                    Свяжитесь с нами через Telegram или WhatsApp для получения консультации.
                  </p>

                  <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://t.me/veles_voyage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                    >
                      Написать в Telegram
                    </a>
                    <a
                      href="https://wa.me/79850635134"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                    >
                      Написать в WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-16">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-green-100 dark:border-gray-600">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="mr-2 text-green-600">⭐</span>
                    Почему клиенты выбирают нас
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Прямые контракты с отелями и перевозчиками без наценок</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Конкурентные цены без скрытых наценок</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Круглосуточная поддержка во время путешествий</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Широкий выбор направлений по всему миру</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Профессиональные консультации от опытных туристов</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-purple-100 dark:border-gray-600">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="mr-2 text-purple-600">📢</span>
                    Оставьте свой отзыв
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Если вы уже путешествовали с нами, поделитесь своим впечатлением!
                    Ваш отзыв поможет другим клиентам сделать правильный выбор.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="https://vk.com/topic-221452803_49400765"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Написать отзыв в ВКонтакте
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Готовы к своему следующему приключению?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Свяжитесь с нами, и мы поможем спланировать идеальное путешествие,
                  которое оставит у вас только положительные впечатления.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="https://t.me/Anastasiiiiyyaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    Связаться с нами
                  </a>
                  <Link
                    href="/tours"
                    className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-full hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    Посмотреть туры
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReviewsPage;
