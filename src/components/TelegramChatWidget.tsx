'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Lazy load framer-motion to reduce bundle size

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function TelegramChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! 🌍\n\nДобро пожаловать в турагентство Велес Вояж!\n\nМы поможем вам организовать незабываемое путешествие. Наши специалисты готовы ответить на все ваши вопросы:\n\n✨ Подбор туров «всё включено»\n🌊 Морские круизы\n🗺️ Планирование маршрутов\n📞 Поддержка 24/7\n\nНапишите ваш вопрос, и мы обязательно поможем! 💙\n\n⏰ Если мы не ответили в данный момент, пожалуйста, подождите — мы обязательно ответим вам в ближайшее время!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const telegramUsername = 'Anastasiiiiyyaa';

  // Автопрокрутка к последнему сообщению
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Фокус на input при открытии
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, userMessage]);

    setInputMessage('');
    setIsSending(true);

    // Имитация отправки (без перехода в Telegram)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '✅ Сообщение получено! Для получения ответа нажмите кнопку "Открыть в Telegram" ниже, чтобы продолжить общение.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsSending(false);
    }, 500);
  };

  const handleOpenTelegram = () => {
    // Собираем все сообщения пользователя
    const userMessages = messages
      .filter(msg => msg.sender === 'user')
      .map(msg => msg.text)
      .join('\n\n');

    const telegramMessage = userMessages
      ? `Сообщения с сайта veles-voyage.ru:\n\n${userMessages}`
      : 'Привет! Хочу задать вопрос о путешествиях.';

    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(telegramMessage)}`;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      window.location.href = telegramUrl;
    } else {
      window.open(telegramUrl, '_blank');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Кнопка для открытия чата */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 md:bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Открыть чат"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </button>
      )}

      {/* Окно чата */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col animate-fade-in-up"
          style={{ height: '600px', maxHeight: 'calc(100vh - 6rem)' }}
        >
          {/* Заголовок */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Велес Вояж"
                  width={40}
                  height={40}
                  priority
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-semibold">Telegram чат</h3>
                <p className="text-xs text-white">Обычно отвечаем сразу</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Закрыть чат"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${message.sender === 'user'
                        ? 'text-white'
                        : 'text-gray-500 dark:text-gray-400'
                      }`}
                  >
                    {message.timestamp.toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Информационное сообщение и кнопки */}
          <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
            <button
              onClick={handleOpenTelegram}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center space-x-2 mb-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span>Открыть в Telegram</span>
            </button>
            <a
              href="https://vk.com/veles__voyage"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0077FF] hover:bg-[#0051CC] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center space-x-2 mb-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.785 16.241s.335-.039.508-.23c.165-.18.16-.515.16-.515s-.023-1.442.675-1.654c.688-.207 1.57 1.38 2.501 1.99.706.46 1.241.359 1.241.359l2.498-.037s1.31-.083.688-1.12c-.051-.082-.36-.75-1.856-2.18-1.57-1.5-1.356-1.255.53-3.85 1.156-1.98 1.618-3.19-.157-3.19h-2.001s-.146-.02-.254.055c-.106.073-.174.243-.174.243s-.313.84-.68 1.556c-.82 1.55-1.15 1.633-1.283 1.537-.31-.23-.232-.93-.232-1.428 0-1.55.234-2.19-.458-2.354-.23-.055-.398-.091-.985-.097-.752-.01-1.388.01-1.748.207-.24.13-.425.42-.312.437.14.02.456.093.622.34.213.315.205.91.205.91s.12 1.78-.279 2.001c-.275.15-.653-.156-1.465-1.55-.416-.88-1.13-2.85-1.13-2.85s-.075-.19-.21-.293c-.162-.13-.388-.171-.388-.171h-1.91s-.29.009-.397.133c-.096.11-.007.34-.007.34s1.78 4.19 3.79 6.31c1.844 1.95 3.94 1.82 3.94 1.82h.95s.29-.02.44.17c.14.18.11.42.11.42s-.05 1.35-.12 2.72c-.14 2.08-.31 2.35.27 2.7.39.24 1.35.46 3.05.35 0 0 .92.06 1.58-.55.5-.46.45-1.2.45-1.2s-.03-.84.19-1.2c.19-.3.42-.47.42-.47z" />
              </svg>
              <span>Присоединяйтесь к нам в ВКонтакте</span>
            </a>
            <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
              💬 Продолжите общение в Telegram для получения ответа
            </p>
          </div>

          {/* Поле ввода */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                disabled={isSending}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isSending}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Отправить сообщение"
              >
                {isSending ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
