'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  MapIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  const footerSections = {
    company: {
      title: 'Компания',
      links: [
        { href: '/about', label: 'О нас' },
        { href: '/contacts', label: 'Контакты' },
        { href: '/requisites', label: 'Реквизиты компании' },
        { href: '/mission', label: 'Наша миссия' },
        { href: '/values', label: 'Наши ценности' },
        { href: '/cities', label: 'Города России' },
        { href: '/reviews', label: 'Отзывы клиентов' },
        { href: '/faq', label: 'Частые вопросы (FAQ)' },
        { href: '/blog', label: 'Блог' },
        { href: '/partners', label: 'Партнёры' },
        { href: '/sitemap.xml', label: 'Карта сайта' }
      ]
    },
    destinations: {
      title: 'Путешествия',
      links: [
        { href: '/tours', label: 'Туры' },
        { href: '/cruises', label: 'Круизы' },
        { href: '/flights', label: 'Авиа' },
        { href: '/hotels', label: 'Отели' }
      ]
    },
    services: {
      title: 'Услуги',
      links: [
        { href: '/tours', label: 'Туры' },
        { href: '/cruises', label: 'Круизы' },
        { href: '/support', label: 'Поддержка' }
      ]
    },
    legal: {
      title: 'Правовая информация',
      links: [
        { href: '/privacy', label: 'Политика конфиденциальности' },
        { 
          href: 'https://ev.economy.gov.ru/lk_exp/registry/ta/b2f9be6b-d62c-4290-bffd-42b171b115f0', 
          label: 'Реестровый номер турагентства',
          external: true
        },
        { href: '/wiki/travel-tips#important-notice', label: '⚠️ Важно помнить' }
      ]
    }
  };

  const socialLinks = [
    {
      href: 'https://vk.com/veles__voyage',
      label: 'ВКонтакте',
      className: 'bg-[#0077FF] hover:bg-[#0066EE] text-white hover:shadow-lg hover:shadow-[#0077FF]/30',
      icon: (
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g transform="translate(1.65, -0.15)">
            <path d="M15.684 12.988c.712.695 1.446 1.369 2.117 2.106.303.333.593.678.835 1.058.344.542.102 1.488-.549 1.521l-3.14.004c-.813.064-1.44-.26-1.968-.838-.426-.464-.814-.959-1.214-1.443-.163-.197-.333-.388-.535-.539-.333-.248-.621-.176-.798.194-.183.382-.224.802-.249 1.222-.036.623-.223.826-.849.855-1.336.061-2.585-.205-3.737-.905-1.025-.623-1.815-1.48-2.482-2.467-1.314-1.942-2.316-4.04-3.181-6.204-.207-.519-.047-.791.517-.8.995-.015 1.99-.013 2.985-.001.378.005.632.203.778.558.559 1.359 1.258 2.639 2.138 3.805.233.309.479.611.792.839.28.204.502.131.642-.186.09-.204.133-.428.156-.65.077-.751.084-1.503-.037-2.251-.077-.474-.326-.757-.798-.853-.241-.049-.205-.145-.09-.279.198-.231.428-.344.757-.344l3.543-.002c.459.091.564.298.624.754l-.004 3.23c.01.246.126.83.518.966.27.094.462-.11.643-.284.774-.744 1.347-1.636 1.838-2.58.261-.502.481-1.025.683-1.554.143-.374.373-.559.789-.554l3.418.003c.105 0 .211.002.314.02.607.104.775.39.596.985-.316 1.053-.889 1.968-1.536 2.836-.615.823-1.304 1.583-1.97 2.361-.269.314-.247.491.042.809z" />
          </g>
        </svg>
      )
    },
    {
      href: 'https://t.me/veles_voyage',
      label: 'Telegram',
      className: 'bg-[#24A1DE] hover:bg-[#2092CA] text-white hover:shadow-lg hover:shadow-[#24A1DE]/30',
      icon: (
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M21.927 3.228a1.2 1.2 0 0 0-1.226-.264L2.83 9.77a1.2 1.2 0 0 0-.07 2.227l4.896 1.86 1.88 5.673a1.2 1.2 0 0 0 2.016.368l2.67-2.617 4.978 3.655a1.2 1.2 0 0 0 1.905-.722l3-15.54a1.2 1.2 0 0 0-.278-1.446zm-3.352 3.227L8.71 13.567l-2.88-1.094 12.745-6.018zm-2.072 10.457l-3.924-2.88 7.024-6.425-3.1 9.305z" />
        </svg>
      )
    },
    {
      href: 'https://rutube.ru/channel/38701755/',
      label: 'Rutube',
      className: 'bg-[#0D121D] hover:bg-[#161F30] text-white border border-white/10 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/20',
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 4.5h6.5c2.6 0 4.5 1.8 4.5 4.3 0 1.9-1.1 3.4-2.8 4.1L17.5 20h-3.4l-3.8-6.3H8.2V20H5V4.5zm3.2 2.7v4.1h3.1c1.2 0 2-.7 2-2s-.8-2.1-2-2.1H8.2z"
            fill="currentColor"
          />
          <circle cx="18.5" cy="5.5" r="2.2" fill="#FF2634" />
        </svg>
      )
    },
    {
      href: 'https://max.ru/id5032362524_biz',
      label: 'MAX',
      className: 'bg-[#5B50FF] hover:bg-[#4E43EE] text-white hover:shadow-lg hover:shadow-[#5B50FF]/30',
      icon: (
        <span className="text-xs font-black tracking-wider text-white select-none">
          MAX
        </span>
      )
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-indigo-400 mb-3">
              Велес Вояж
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Откройте мир с нами! Продуманный выбор путешествий, незабываемые впечатления.
            </p>

             {/* Contact Info - More compact */}
             <div className="space-y-2">
               <div className="flex items-center space-x-2">
                 <PhoneIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                 <a href="tel:+79850635134" className="text-gray-300 text-sm hover:text-indigo-400 transition-colors">
                   +7 985 063-51-34
                 </a>
               </div>
               <div className="flex items-center space-x-2">
                 <EnvelopeIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                 <a href="mailto:hello@veles-voyage.ru" className="text-gray-300 text-sm hover:text-indigo-400 transition-colors">
                   hello@veles-voyage.ru
                 </a>
               </div>
               <div className="flex items-start space-x-2">
                 <MapIcon className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                 <div className="text-gray-300 text-sm">
                   <div>пр-т Керамиков, д. 103, Голицыно, Московская обл., 143041</div>
                   <div>пр-т Московский, д. 9/2, Пушкино, Московская обл., 141207</div>
                 </div>
               </div>
               <div className="flex items-start space-x-2">
                 <span className="text-gray-400 text-xs">⏰ Пн–Пт: 09:00–21:00</span>
               </div>
               <div className="flex items-start space-x-2">
                 <span className="text-gray-400 text-xs">⏰ Сб–Вс: 10:00–16:00</span>
               </div>
             </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">
                🌟 Подпишитесь на новости
              </h4>
              <p className="text-gray-300">
                Получайте эксклюзивные предложения и новости о путешествиях
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="https://t.me/veles_voyage" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors duration-200 text-center"
              >
                Подписаться
              </Link>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md ${social.className}`}
                title={social.label}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <GlobeAltIcon className="w-5 h-5 text-gray-400" />
            <select
              aria-label="Выберите язык"
              className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-gray-300"
            >
              <option value="ru">🇷🇺 Русский</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col items-center text-sm text-gray-400 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full">
              <div className="flex items-center space-x-1 mb-2 sm:mb-0">
                <span className="text-gray-400">© {currentYear} Велес Вояж. Все права защищены.</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Сделано с</span>
                <HeartIcon className="w-4 h-4 text-red-500 inline-block" />
                <span className="text-gray-400">в России</span>
              </div>
            </div>
            
            {/* Federal Registry Information - Mobile Optimized */}
            <div className="text-left text-xs text-gray-400 w-full hidden sm:block">
              ООО «Велес» (ИНН 5032362524, ОГРН 1235000077685) включено в Единый Федеральный реестр турагентов, субагентов.{' '}
              <a 
                href="https://ev.economy.gov.ru/lk_exp/registry/ta/b2f9be6b-d62c-4290-bffd-42b171b115f0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Запись в реестре № РТА 0035678 от 21.06.2023 г.
              </a>{' '}
              by Radun{' '}
              <Link 
                href="/privacy"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Политика конфиденциальности.
              </Link>
            </div>
            
            {/* Mobile Version - Shortened */}
            <div className="text-center text-xs text-gray-400 w-full sm:hidden">
              ООО «Велес» (ИНН 5032362524, ОГРН 1235000077685) — № РТА 0035678.{' '}
              <Link 
                href="/privacy"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}