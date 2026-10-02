'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

interface InteractionSignalProps {
    contentId: string;
}

export function InteractionSignal({ contentId }: InteractionSignalProps) {
    const [voted, setVoted] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<'helpful' | 'unhelpful' | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Только на клиенте проверяем localStorage
        const hasVoted = localStorage.getItem(`voted_${contentId}`);
        if (hasVoted) {
            setVoted(true);
            setFeedback(hasVoted as 'helpful' | 'unhelpful');
        }
    }, [contentId]);

    const handleVote = (type: 'helpful' | 'unhelpful') => {
        if (voted || !mounted) return;

        // В реальности здесь был бы запрос к API (Vercel Analytics или Supabase)
        localStorage.setItem(`voted_${contentId}`, type);
        setVoted(true);
        setFeedback(type);

        // Имитация отправки сигнала для SEO-движка
        console.log(`[SEO Signal] User marked ${contentId} as ${type}`);
    };

    // Не рендерим ничего на сервере до полной гидратации
    if (!mounted) {
        return (
            <div className="py-8 px-4 border-t border-b border-gray-100 dark:border-gray-800 my-8">
                <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        Был ли этот раздел полезен?
                    </h3>
                    <div className="flex items-center space-x-4">
                        <button
                            disabled
                            className="flex items-center space-x-2 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed"
                        >
                            <ThumbsUp className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Полезно</span>
                        </button>

                        <button
                            disabled
                            className="flex items-center space-x-2 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed"
                        >
                            <ThumbsDown className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Нет</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (voted) {
        return (
            <div className="flex items-center justify-center space-x-2 py-6 px-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    {feedback === 'helpful'
                        ? 'Спасибо! Ваш отзыв помог нам улучшить путеводитель.'
                        : 'Спасибо за отзыв! Мы работаем над улучшением контента.'}
                </span>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 border-t border-b border-gray-100 dark:border-gray-800 my-8">
            <div className="flex flex-col items-center space-y-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    Был ли этот раздел полезен?
                </h3>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => handleVote('helpful')}
                        className="flex items-center space-x-2 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group"
                    >
                        <ThumbsUp className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">Полезно</span>
                    </button>

                    <button
                        onClick={() => handleVote('unhelpful')}
                        className="flex items-center space-x-2 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all group"
                    >
                        <ThumbsDown className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-800 dark:group-hover:text-red-400">Нет</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
