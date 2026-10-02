"use client";

/**
 * Client Component для кнопки открытия Telegram
 * Вынесен из contacts/page.tsx для правильного разделения Server/Client Components
 */
export function TelegramButton() {
  const openTelegram = () => {
    const telegramUrl = 'https://t.me/Anastasiiiiyyaa';
    // Try to open in Telegram app first, fallback to browser
    if (typeof window !== 'undefined') {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        // On mobile, try to open the app directly
        window.location.href = telegramUrl;
      } else {
        // On desktop, open in new tab
        window.open(telegramUrl, '_blank');
      }
    }
  };

  return (
    <button 
      onClick={openTelegram}
      className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      title="Заказать консультацию через Telegram"
    >
      Заказать консультацию
    </button>
  );
}

