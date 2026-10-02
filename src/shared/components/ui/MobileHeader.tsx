'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface MobileHeaderProps {
  title?: string;
  showSearch?: boolean;
  onSearchChange?: (query: string) => void;
}

export function MobileHeader({ 
   title = 'Велес Вояж', 
   showSearch = true, 
   onSearchChange 
 }: MobileHeaderProps) {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchChange) {
      onSearchChange(searchQuery.trim());
    }
  };

  const menuItems = [
    { href: '/', label: '🏠 Главная', icon: '🏠' },
    { href: '/wiki', label: '📖 Энциклопедия', icon: '📖' },
    { href: '/privacy', label: '🔒 Конфиденциальность', icon: '🔒' },
    { href: '/terms', label: '📋 Условия', icon: '📋' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo и заголовок */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <h1 className="text-lg font-bold text-gray-900 hidden sm:block">
                {title}
              </h1>
            </Link>
          </div>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <span>{item.icon}</span>
                <span>{item.label.replace(/^\S+\s/, '')}</span>
              </Link>
            ))}
          </nav>

          {/* Кнопки действий */}
          <div className="flex items-center space-x-2">
            {/* Поиск */}
            {showSearch && (
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  aria-label="Поиск"
                >
                  🔍
                </button>
                
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: -10 }}
                      animate={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-3"
                    >
                      <form onSubmit={handleSearchSubmit}>
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Поиск по странам..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                        <div className="mt-2 flex justify-end">
                          <button
                            type="submit"
                            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 transition-colors"
                          >
                            Найти
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Мобильное меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              aria-label="Меню"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? { rotate: 0, y: 0 }
                      : { rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="w-full h-0.5 bg-current"
                />
                <motion.div
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="w-full h-0.5 bg-current"
                />
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? { rotate: 0, y: 0 }
                      : { rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="w-full h-0.5 bg-current"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-3 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label.replace(/^\S+\s/, '')}</span>
                </Link>
              ))}
              
              {showSearch && (
                <div className="pt-3 border-t border-gray-200">
                  <form onSubmit={handleSearchSubmit} className="flex space-x-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Поиск по странам..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      🔍
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
