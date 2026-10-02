'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

// Lazy load icons to reduce bundle size
import { Bars3Icon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { MapIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

import { PWAInstallButton } from './PWAInstallButton';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!mounted) return () => { }; // Return empty cleanup function

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => { }; // Return empty cleanup function for else case
  }, [isDropdownOpen, mounted]);

  // Блокировка прокрутки фона при открытом меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Закрываем мобильное меню при изменении размера экрана
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleDropdownToggle = () => {
    if (mounted) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleDropdownClose = () => {
    if (mounted) {
      setIsDropdownOpen(false);
    }
  };

  // Основные навигационные элементы (видны всегда)
  const mainNavigationItems = [
    { href: '/', label: 'Главная', icon: HomeIcon },
    { href: '/tours', label: 'Туры', icon: MapIcon },
    { href: '/hotels', label: 'Отели', icon: HomeIcon },
    { href: '/flights', label: 'Авиа', icon: PaperAirplaneIcon },
    { href: '/cruises', label: 'Круизы', icon: MapIcon },
  ];

  // Дополнительные навигационные элементы (в dropdown)
  const additionalNavigationItems = [
    { href: '/about', label: 'О компании', icon: InformationCircleIcon },
    { href: '/contacts', label: 'Контакты', icon: PhoneIcon },
    { href: '/wiki', label: 'Энциклопедия', icon: MapIcon },
    { href: '/blog', label: 'Блог', icon: MapIcon },
    { href: '/faq', label: 'Частые вопросы', icon: MapIcon },
    { href: '/reviews', label: 'Отзывы клиентов', icon: MapIcon },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          mounted && isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
        }`}
        suppressHydrationWarning
      >
        {/* Декоративная полоса в цветах флага России */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-blue-600 to-red-600"></div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20 lg:h-24">
            {/* Logo */}
            <Link
              href="/"
              className="group transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]"
              onClick={closeMobileMenu}
            >
              <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-16 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.svg"
                  alt="Логотип Велес Вояж"
                  width={64}
                  height={64}
                  priority
                  className="w-full h-full object-contain drop-shadow-md"
                  unoptimized
                />
              </div>

              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-sm group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-purple-700 dark:group-hover:from-blue-300 dark:group-hover:via-indigo-300 dark:group-hover:to-purple-300 transition-all duration-300 hidden lg:inline text-sm sm:text-base md:text-lg font-bold whitespace-nowrap flex-shrink-0">
                Велес Вояж
              </span>

              {/* Миниатюрный 3D-герб в меню */}
              <div className="nav-eagle-badge scale-[0.4] sm:scale-[0.55] md:scale-[0.65] lg:scale-90 transition-transform duration-300 hidden sm:block">
                <div className="nav-flag-base">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 stripe-white"></div>
                    <div className="flex-1 stripe-blue"></div>
                    <div className="flex-1 stripe-red"></div>
                  </div>
                </div>
                <div className="nav-eagle-container">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/2/29/Coat_of_Arms_of_the_Russian_Federation_2.svg"
                    alt="Герб России"
                    width={42}
                    height={42}
                    priority
                    style={{ width: 'auto', height: 'auto' }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 flex-nowrap">
              {mainNavigationItems.map(item => {
                // Improved active state detection
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    className={`relative px-2 py-2 text-xs sm:text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap flex-shrink-0 ${isActive
                      ? 'text-white dark:text-white bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-700 dark:to-red-700 shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500 dark:hover:from-blue-600 dark:hover:to-red-600'
                      }`}
                  >
                    <span className="flex items-center space-x-1 whitespace-nowrap">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-white to-red-600"
                        layoutId="navbar-active-indicator"
                        initial={false}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 500, damping: 30 }
                        }
                      />
                    )}
                  </Link>
                );
              })}

              {/* Dropdown for additional items */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleDropdownToggle}
                  className={`flex items-center space-x-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${isDropdownOpen
                    ? 'text-white dark:text-white bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-700 dark:to-red-700 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500 dark:hover:from-blue-600 dark:hover:to-red-600'
                    }`}
                >
                  <span className="whitespace-nowrap">Еще</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {mounted && isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    {additionalNavigationItems.map(item => {
                      const isActive =
                        pathname === item.href ||
                        (item.href !== '/' && pathname?.startsWith(item.href));
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          prefetch={true}
                          onClick={() => {
                            handleDropdownClose();
                            closeMobileMenu();
                          }}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm w-full ${isActive
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right side buttons for desktop */}
            <div className="hidden lg:flex items-center gap-1 flex-nowrap">
              {/* Phone Button */}
              <a
                href="tel:+79850635134"
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                title="Позвонить"
                aria-label="Позвонить"
              >
                <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline whitespace-nowrap">+7 985 063-51-34</span>
              </a>

              {/* Telegram Button */}
              <a
                href="https://t.me/Anastasiiiiyyaa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors flex-shrink-0"
                title="Написать в Telegram"
                aria-label="Написать в Telegram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors flex-shrink-0"
                  title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
                  suppressHydrationWarning
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </button>
              )}
              {/* PWA Install Button */}
              {mounted && <PWAInstallButton />}
            </div>

            {/* Mobile Menu Button Section */}
            <div className="flex lg:hidden items-center space-x-1 sm:space-x-2">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-1.5 sm:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
                  title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
                  suppressHydrationWarning
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              )}
              <button
                onClick={toggleMobileMenu}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
                aria-label="Открыть меню"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Container */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[90vw] z-50
          bg-white dark:bg-gray-900 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:hidden
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Меню</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 sm:p-4 space-y-2">
              {/* Main navigation items */}
              {mainNavigationItems.map(item => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors ${isActive
                      ? 'text-white dark:text-white bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-700 dark:to-red-700 shadow-md'
                      : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500 dark:hover:from-blue-600 dark:hover:to-red-600'
                      }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}

              {/* Additional navigation items */}
              {additionalNavigationItems.map(item => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors ${isActive
                      ? 'text-white dark:text-white bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-700 dark:to-red-700 shadow-md'
                      : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500 dark:hover:from-blue-600 dark:hover:to-red-600'
                      }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Wallet Section */}
            <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-4"></div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                 ООО «Велес» — № РТА 0035678.{' '}
                <Link
                  href="/privacy"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 no-underline"
                >
                  Политика конфиденциальности
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
