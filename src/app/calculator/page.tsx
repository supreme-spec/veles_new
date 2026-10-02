import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { SITE_URL } from '@/shared/constants/seo';
import TourCalculatorClient from './TourCalculatorClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Калькулятор стоимости тура 2026 | Велес Вояж',
  description: 'Рассчитайте примерную стоимость тура в Турцию, Египет, ОАЭ и другие страны. Онлайн-калькулятор от Велес Вояж.',
  url: `${SITE_URL}/calculator`,
  type: 'website',
  keywords: ['калькулятор тура', 'рассчитать стоимость путешествия', 'цена тура 2026', 'калькулятор путешествий'],
});

const TourCalculator = () => {
  return <TourCalculatorClient />;
};

export default TourCalculator;
