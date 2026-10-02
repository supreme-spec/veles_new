import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Энциклопедия стран мира | Велес Вояж - Путеводители по всем странам',
  description: 'Полная энциклопедия стран мира с подробными путеводителями: визы, достопримечательности, культура, транспорт, проживание. 195+ стран, актуальная информация 2026.',
  keywords: [
    'энциклопедия стран',
    'путеводители по странам',
    'все страны мира',
    'туризм по странам',
    'достопримечательности стран',
    'визы по странам',
    'цены в странах',
    'культура стран',
    'кухня стран',
    'Европа',
    'Азия',
    'Африка',
    'Америка',
    'Океания',
    'путешествия',
    'туризм',
    'отдых',
    'страны мира',
    'каталог стран',
    'гид по странам',
    'информация о странах',
    'туристические страны',
    'лучшие страны для путешествий',
    'бюджетный туризм',
    'экзотические страны',
    'популярные страны',
    'скрытые жемчужины',
    'секретные места',
    'дешевые страны',
    'дорогие страны',
    'безопасные страны',
    'опасные страны',
    'визовые страны',
    'безвизовые страны',
    'страны для отдыха',
    'страны для экскурсий',
    'страны для дайвинга',
    'страны для пляжного отдыха',
    'страны для горнолыжного отдыха',
    'страны для экстремального туризма',
    'Велес Вояж',
    'турагентство',
    'туризм 2026',
    'русская энциклопедия туризма',
    'путеводители 2026'
  ],
  openGraph: {
    title: 'Энциклопедия стран мира | Велес Вояж',
    description: 'Полная энциклопедия стран мира с подробными путеводителями: визы, достопримечательности, культура, транспорт, проживание.',
    type: 'website',
    url: 'https://veles-voyage.ru/wiki',
    siteName: 'Велес Вояж',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Энциклопедия стран мира | Велес Вояж',
    description: 'Полная энциклопедия стран мира с подробными путеводителями',
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

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

