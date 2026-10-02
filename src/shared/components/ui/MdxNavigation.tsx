'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
    id: string;
    label: string;
    icon: string;
}

const navItems: NavItem[] = [
    { id: 'overview', label: 'Обзор', icon: '🏠' },
    { id: 'history', label: 'История', icon: '🎨' },
    { id: 'geography', label: 'География', icon: '🌍' },
    { id: 'seasons', label: 'Сезоны', icon: '📅' },
    { id: 'visa', label: 'Визы', icon: '🎫' },
    { id: 'transport', label: 'Транспорт', icon: '✈️' },
    { id: 'budget', label: 'Бюджет', icon: '💰' },
    { id: 'food', label: 'Еда', icon: '🍽️' },
    { id: 'attractions', label: 'Достопримечательности', icon: '🏛️' },
    { id: 'safety', label: 'Правила', icon: '⚠️' },
    { id: 'shopping', label: 'Шоппинг', icon: '🛍️' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'maps', label: 'Карты', icon: '🗺️' },
];

export const MdxNavigation: React.FC = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0% -70% 0%',
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        window.addEventListener('scroll', handleScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for sticky nav and navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="mb-8 sticky top-[64px] md:top-24 z-30 transition-all duration-300 -mx-4 px-4">
            <div className={`
        relative max-w-fit mx-auto p-1 rounded-2xl border transition-all duration-500
        ${isScrolled
                    ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl border-blue-100 dark:border-blue-900/50'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'
                }
      `}>
                {/* Mobile Swipe Indicators/Fades */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10 pointer-events-none opacity-0 sm:hidden" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10 pointer-events-none opacity-100 sm:hidden" />

                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 px-0.5 sm:flex-wrap sm:justify-center max-w-[90vw] md:max-w-6xl scroll-smooth">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`
                  relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  flex items-center gap-2 whitespace-nowrap group flex-shrink-0
                  ${isActive
                                        ? 'text-white scale-100'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                    }
                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl -z-10 shadow-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                <span className={`${isActive ? 'inline' : 'hidden md:inline'}`}>
                                    {item.label}
                                </span>

                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 hidden md:block"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Global CSS for hidden scrollbars */}
            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </nav>
    );
};
