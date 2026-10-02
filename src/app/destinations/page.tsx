import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Направления | Велес Вояж',
  description: 'Все направления и страны для путешествий от Велес Вояж. Туры по всему миру: Европа, Азия, Африка, Америка, Океания.',
};

export default function DestinationsPage() {
  redirect('/wiki');
}
