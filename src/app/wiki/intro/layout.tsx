import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Введение в Велес Вояж | Путеводитель нового поколения',
  description: 'Велес Вояж - современный интерактивный путеводитель и турагентство. Откройте мир путешествий по-новому.',
  keywords: ['путеводитель', 'путешествия', 'турагентство', 'туризм', 'Велес Вояж', 'интерактивный путеводитель', 'энциклопедия стран', 'путеводители по странам', 'туризм 2026', 'организация путешествий', 'индивидуальные туры', 'морские круизы', 'поддержка 24/7', 'экспертные советы', 'русская энциклопедия туризма'],
  openGraph: {
    title: 'Введение в Велес Вояж',
    description: 'Современный интерактивный путеводитель и лицензированное турагентство',
    type: 'article',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || '1b9d713dc3f02bed',
    other: {
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || '1b9d713dc3f02bed',
      'tg:site_verification': process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || 'veles_voyage_official',
    },
  },
};

export default function WikiIntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

