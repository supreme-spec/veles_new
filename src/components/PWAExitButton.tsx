'use client';

import { useState } from 'react';
import { 
  XMarkIcon, 
  ArrowTopRightOnSquareIcon, 
  ArrowDownTrayIcon, 
  DevicePhoneMobileIcon 
} from '@heroicons/react/24/outline';
import { usePWADetection } from '@/hooks/usePWADetection';

export default function PWAManager() {
  const [isVisible, setIsVisible] = useState(false);
  const { isPWA, isInstallable, installPWA } = usePWADetection();

  const handleExitPWA = () => {
    const currentUrl = window.location.href;
    const userAgent = navigator.userAgent;
    
    // Открываем URL в браузере по умолчанию
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      // iOS
      window.open(currentUrl, '_blank');
      alert('Страница открыта в Safari. Вы можете закрыть PWA через диспетчер задач (дважды нажмите кнопку Home и смахните приложение вверх).');
    } else if (userAgent.includes('Android')) {
      // Android
      window.open(currentUrl, '_blank');
      alert('Страница открыта в браузере. Закройте PWA через меню недавних приложений.');
    } else {
      // Desktop
      window.open(currentUrl, '_blank');
      if (confirm('Страница открыта в новой вкладке браузера. Закрыть PWA окно?')) {
        window.close();
      }
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Показываем кнопку только если PWA активно или доступна установка
  if (!isPWA && !isInstallable) {
    return null;
  }

  return (
    <>
      {/* Плавающая кнопка-триггер */}
      <button
        onClick={toggleVisibility}
        className={`
          fixed top-4 right-4 z-50 p-3 rounded-full 
          bg-gradient-to-r from-blue-600 to-purple-600 
          hover:from-blue-700 hover:to-purple-700
          text-white shadow-lg backdrop-blur-sm
          transition-all duration-300 ease-in-out
          ${isVisible ? 'scale-0' : 'scale-100'}
          hover:scale-110 active:scale-95
        `}
        title={isPWA ? "Опции PWA" : "Установить приложение"}
        aria-label={isPWA ? "Показать опции PWA" : "Установить как приложение"}
      >
        {isPWA ? (
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        ) : (
          <DevicePhoneMobileIcon className="w-5 h-5" />
        )}
      </button>

      {/* Модальное окно с опциями */}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-slide-up border border-gray-200 dark:border-gray-700">
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Закрыть"
            >
              <XMarkIcon className="w-4 h-4 text-gray-500" />
            </button>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 pr-8">
                  {isPWA ? 'PWA Режим' : 'Установить приложение'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {isPWA 
                    ? 'Вы используете приложение в PWA режиме. Управляйте режимом просмотра.'
                    : 'Установите приложение для лучшего опыта использования.'
                  }
                </p>
              </div>

              <div className="space-y-3">
                {isPWA ? (
                  <>
                    <button
                      onClick={handleExitPWA}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Открыть в браузере
                    </button>
                    
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <DevicePhoneMobileIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        PWA режим активен
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {isInstallable && (
                      <button
                        onClick={installPWA}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors font-medium"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Установить приложение
                      </button>
                    )}
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <div className="font-medium mb-1">Преимущества PWA:</div>
                      <ul className="space-y-1">
                        <li>• Быстрая загрузка</li>
                        <li>• Работа оффлайн</li>
                        <li>• Уведомления</li>
                        <li>• Нативный интерфейс</li>
                      </ul>
                    </div>
                  </>
                )}
                
                <button
                  onClick={() => setIsVisible(false)}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                >
                  {isPWA ? 'Остаться в PWA' : 'Возможно, позже'}
                </button>
              </div>

              {isPWA && (
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  PWA обеспечивает лучшую производительность и работу оффлайн
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
