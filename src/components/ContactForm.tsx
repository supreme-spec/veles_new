"use client";

import { useState } from 'react';
import { useCSRF } from '@/shared/hooks/useCSRF';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const { token: csrfToken, isLoading: csrfLoading, error: csrfError } = useCSRF();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'Планирование путешествия',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем наличие CSRF токена
    if (!csrfToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Ошибка безопасности. Пожалуйста, обновите страницу и попробуйте снова.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Отправляем данные на API с CSRF токеном
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('CSRF token validation failed');
        }
        throw new Error('Failed to send message');
      }

      // Создаем сообщение для Telegram
      const telegramMessage = `Привет! Меня зовут ${formData.name}.

` +
        `📧 Email: ${formData.email}
` +
        `📋 Тема: ${formData.subject}

` +
        `💬 Сообщение:
${formData.message}

` +
        `Отправлено с сайта veles-voyage.ru`;

      // Telegram username
      const telegramUsername = 'Anastasiiiiyyaa';
      const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(telegramMessage)}`;

      // Показываем сообщение об успехе
      setSubmitStatus({
        type: 'success',
        message: 'Сейчас вы будете перенаправлены в Telegram для отправки сообщения'
      });

      // Перенаправляем в Telegram через 2 секунды
      setTimeout(() => {
        window.open(telegramUrl, '_blank');
        setIsSubmitting(false);
        
        // Сбрасываем форму
        setFormData({
          name: '',
          email: '',
          subject: 'Планирование путешествия',
          message: ''
        });
        
        // Очищаем статус через некоторое время
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 3000);
      }, 2000);
    } catch (error) {
      console.error('[ContactForm] Submit error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error && error.message.includes('CSRF')
          ? 'Ошибка безопасности. Пожалуйста, обновите страницу и попробуйте снова.'
          : 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        💌 Напишите нам
      </h2>
      
      {/* Status Messages */}
      {submitStatus.type && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {submitStatus.type === 'success' ? '✅' : '❌'}
            </span>
            <span>{submitStatus.message}</span>
          </div>
        </div>
      )}
      
      {/* CSRF Error Display */}
      {csrfError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
          <div className="flex items-center">
            <span className="mr-2">⚠️</span>
            <span>Ошибка загрузки защиты формы. Пожалуйста, обновите страницу.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Скрытое поле с CSRF токеном для дополнительной защиты */}
        {csrfToken && (
          <input type="hidden" name="csrf_token" value={csrfToken} />
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ваше имя *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Как к вам обращаться?"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Телефон или Telegram *
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Телефон или Telegram"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Тема сообщения *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isSubmitting}
          >
            <option value="Планирование путешествия">Планирование путешествия</option>
            <option value="Информация о турах">Информация о турах</option>
            <option value="Бронирование">Бронирование</option>
            <option value="Техническая поддержка">Техническая поддержка</option>
            <option value="Партнерство">Партнерство</option>
            <option value="Другое">Другое</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Сообщение *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
            placeholder="Куда и когда хотите поехать? (необязательно)"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || csrfLoading || !csrfToken}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isSubmitting || csrfLoading || !csrfToken
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Подготовка сообщения...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <span className="mr-2">📱</span>
              Получить подборку путешествий
            </span>
          )}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Мы используем ваши данные только для связи и подбора путешествия
      </p>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-medium">📱 Telegram связь:</span> После отправки формы вы будете перенаправлены в Telegram для быстрой связи с нашими менеджерами.
        </p>
      </div>
    </div>
  );
}