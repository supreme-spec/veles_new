import type { Metadata } from 'next';
import { SITE_URL } from '@/shared/constants/seo';

export const travelTipsMetadata: Metadata = {
  title: "Советы путешественникам | Велес Вояж - Практические рекомендации для туристов",
  description: "Практические советы и лайфхаки для комфортных и безопасных путешествий. Рекомендации по визам, бюджету, сборам, безопасности и здоровью в путешествии.",
  keywords: ["путешествия", "туризм", "советы путешественникам", "виза", "документы", "бюджет", "сборы", "безопасность", "здоровье", "связь", "интернет", "чартерные рейсы", "проживание в отеле", "турагентство", "Велес Вояж", "travel tips", "tourism advice", "visa requirements", "travel safety", "hotel accommodation", "charter flights"],
  authors: [{ name: "Велес Вояж" }],
  creator: "Велес Вояж",
  publisher: "Велес Вояж",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/wiki/travel-tips',
    languages: {
      ru: '/wiki/travel-tips',
      'x-default': '/wiki/travel-tips',
    },
  },
  openGraph: {
    title: "Советы путешественникам | Велес Вояж",
    description: "Практические советы и лайфхаки для комфортных и безопасных путешествий",
    url: `${SITE_URL}/wiki/travel-tips`,
    siteName: "Велес Вояж",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Советы путешественникам - Велес Вояж"
      }
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Советы путешественникам | Велес Вояж",
    description: "Практические советы и лайфхаки для комфортных и безопасных путешествий",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || '1b9d713dc3f02bed',
    other: {
      'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'L2tg-VBWP7EN-Gv2ND9Vd33yM5vdZWIvZ0eI7QVk0o4',
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_1 || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_2 || '1b9d713dc3f02bed',
      'tg:site_verification': process.env.NEXT_PUBLIC_TELEGRAM_VERIFICATION || 'veles_voyage_official',
    }
  },
};