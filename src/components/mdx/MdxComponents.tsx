'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    InformationCircleIcon,
    LightBulbIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// Custom heading components for MDX
export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
    <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white ${className}`} {...props}>
        {children}
    </h1>
);

export const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
    <h2 className={`text-3xl font-extrabold mb-4 text-gray-900 dark:text-white ${className}`} {...props}>
        {children}
    </h2>
);

export const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
    <h3 className={`text-2xl font-bold mb-3 text-gray-900 dark:text-white ${className}`} {...props}>
        {children}
    </h3>
);

interface InfoBlockProps {
    type?: 'info' | 'tip' | 'warning' | 'success';
    title?: string;
    children: React.ReactNode;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ type = 'info', title, children }) => {
    const styles = {
        info: {
            container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
            icon: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
            title: 'text-blue-800 dark:text-blue-300'
        },
        tip: {
            container: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
            icon: <LightBulbIcon className="h-6 w-6 text-amber-500" />,
            title: 'text-amber-800 dark:text-amber-300'
        },
        warning: {
            container: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800',
            icon: <ExclamationTriangleIcon className="h-6 w-6 text-rose-500" />,
            title: 'text-rose-800 dark:text-rose-300'
        },
        success: {
            container: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
            icon: <CheckCircleIcon className="h-6 w-6 text-emerald-500" />,
            title: 'text-emerald-800 dark:text-emerald-300'
        }
    };

    const currentStyle = styles[type] || styles.info;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`my-6 md:my-8 p-4 md:p-5 rounded-xl md:rounded-2xl border-l-4 ${currentStyle.container} shadow-sm`}
        >
            <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 mt-1">
                    {currentStyle.icon}
                </div>
                <div className="flex-grow">
                    {title && <h4 className={`text-base md:text-lg font-bold mb-2 ${currentStyle.title}`}>{title}</h4>}
                    <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

interface FeatureGridProps {
    columns?: 1 | 2 | 3;
    children: React.ReactNode;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ columns = 2, children }) => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3'
    };

    return (
        <div className={`grid gap-6 my-10 ${gridCols[columns]}`}>
            {children}
        </div>
    );
};

interface FeatureItemProps {
    icon: string;
    title: string;
    children: React.ReactNode;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, children }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-5 md:p-6 bg-white dark:bg-gray-800/50 rounded-xl md:rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-100/50 dark:shadow-none hover:shadow-2xl transition-all duration-300"
        >
            <div className="text-3xl md:text-4xl mb-4 bg-gray-50 dark:bg-gray-700 w-12 md:w-16 h-12 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl">
                {icon}
            </div>
            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">{title}</h4>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {children}
            </div>
        </motion.div>
    );
};

export const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-1.5 py-0.5 rounded font-medium">
        {children}
    </span>
);


interface WikiHeroProps {
    src: string;
    alt: string;
    title: string;
    subtitle?: string;
}

export const WikiHero: React.FC<WikiHeroProps> = ({ src, alt, title, subtitle }) => (
    <div className="relative w-full h-[50vh] md:h-[65vh] min-h-[350px] md:min-h-[500px] my-6 md:my-8 overflow-hidden rounded-2xl md:rounded-[3rem] shadow-2xl group border border-white/5 bg-slate-900">
        <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center', color: 'transparent' }}
            className="transition-transform duration-[4s] scale-105 group-hover:scale-110"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 z-20">
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight max-w-[95%] break-words hyphens-auto"
            >
                {title}
            </motion.h1>
            {subtitle && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-3xl text-blue-100/90 font-bold max-w-4xl drop-shadow-xl"
                >
                    {subtitle}
                </motion.div>
            )}
        </div>
    </div>
);

interface MdxImageProps {
    src: string;
    alt: string;
    caption?: string;
}

export const MdxImage: React.FC<MdxImageProps> = ({ src, alt, caption }) => (
    <figure className="my-6 md:my-10 overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 group bg-gray-50 dark:bg-gray-900 leading-snug">
        <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center', color: 'transparent' }}
                className="transition-transform duration-[2.5s] ease-out group-hover:scale-110 w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-1000" />
        </div>
        {caption && (
            <figcaption className="mt-4 px-6 pb-6 text-center">
                <div className="inline-block w-12 h-1 bg-blue-500/20 mb-3 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '100%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-full bg-blue-500"
                    />
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed italic !m-0">
                    {caption}
                </div>
            </figcaption>
        )}
    </figure>
);
export const ResponsiveTable: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="my-8 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
            <div className="inline-block min-w-full align-middle">
                {children}
            </div>
        </div>
    </div>
);

export const PriceList: React.FC<{ title: string; icon?: string; children: React.ReactNode }> = ({ title, icon = '💰', children }) => (
    <div className="my-10 bg-white dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden leading-snug">
        <div className="p-6 border-b border-gray-50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white !my-0">{title}</h4>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {children}
        </div>
    </div>
);

export const PriceItem: React.FC<{ icon: string; label: string; price: string }> = ({ icon, label, price }) => (
    <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors duration-300">
        <div className="flex items-center gap-3 md:gap-4">
            <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl bg-gray-100 dark:bg-gray-700 text-lg md:text-xl group-hover:scale-110 transition-transform">
                {icon}
            </span>
            <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">{label}</span>
        </div>
        <span className="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400 font-mono tracking-tight text-right">
            {price}
        </span>
    </div>
);

export const ShareButton: React.FC = () => {
    const handleShare = async () => {
        const shareData = {
            title: document.title,
            text: 'Посмотрите этот крутой путеводитель на Велес Вояж!',
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Ссылка скопирована в буфер обмена!');
            } catch (err) {
                console.error('Error copying:', err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
            <span className="text-xl">🔗</span>
            Поделиться статьей
        </button>
    );
};

export const SocialLinks: React.FC = () => (
    <div className="flex flex-wrap gap-4 my-8">
        <ShareButton />
    </div>
);

interface StepListProps {
    children: React.ReactNode;
}

export const StepList: React.FC<StepListProps> = ({ children }) => (
    <div className="my-10 relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/20 before:to-transparent">
        {children}
    </div>
);

interface StepItemProps {
    number: string;
    title: string;
    children: React.ReactNode;
}

export const StepItem: React.FC<StepItemProps> = ({ number, title, children }) => (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-500/30 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 font-bold shadow-xl z-[1] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform duration-500 group-hover:scale-125">
            {number}
        </div>
        {/* Card */}
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h4>
            <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {children}
            </div>
        </div>
    </div>
);
