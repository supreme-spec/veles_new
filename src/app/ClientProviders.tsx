'use client';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';

const TelegramChatWidget = dynamic(
  () => import('@/components/TelegramChatWidget').then(mod => mod.TelegramChatWidget),
  { ssr: false }
);
const CookieConsentBanner = dynamic(
  () => import('@/shared/components/ui/CookieConsentBanner').then(mod => mod.CookieConsentBanner),
  { ssr: false }
);

function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <TelegramChatWidget />
      <CookieConsentBanner />
    </ThemeProvider>
  );
}

export default ClientProviders;
