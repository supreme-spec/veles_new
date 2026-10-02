import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Города вылета — туры из 700+ городов России | Велес Вояж',
  description: 'Полный список городов вылета Велес Вояж: туры в Турцию, Египет, ОАЭ и Таиланд из Москвы, Санкт-Петербурга и регионов России. Выберите свой город и подберите тур онлайн.',
};

export default function CitiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
