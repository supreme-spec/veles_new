import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import { SITE_URL } from '@/shared/constants/seo';
import { generatePersonSchema } from '@/lib/seo/unifiedSEO';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Свистунов Сергей Григорьевич - Генеральный директор Велес Вояж',
  description: 'Сергей Свистунов - генеральный директор турагентства Велес Вояж. ООО «Велес», лицензия РТА 0035678. Опыт в международном туризме и управлении капиталом.',
  url: `${SITE_URL}/team/sergey-svistunov`,
  type: 'website',
  keywords: [
    'Свистунов Сергей',
    'Свистунов Сергей Григорьевич',
    'генеральный директор Велес Вояж',
    'руководитель турагентства',
    'эксперт по туризму',
    'лицензия РТА 0035678'
  ],
});

const personSchema = generatePersonSchema({
  name: 'Свистунов Сергей Григорьевич',
  jobTitle: 'Генеральный директор, финансовый советник',
  image: `${SITE_URL}/images/svistunov.webp`,
  sameAs: [
    'https://finradun.ru',
    'https://vk.com/veles__voyage',
    'https://t.me/veles_voyage',
    'https://www.instagram.com/radun.veles/',
    `${SITE_URL}/about/experts/sergey-svistunov`
  ]
});

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: 'Велес Вояж',
  url: SITE_URL,
  founder: {
    '@type': 'Person',
    '@id': `${SITE_URL}#person/svistunov`,
    name: 'Свистунов Сергей Григорьевич'
  }
};

export default function SergeySvistunovPage() {
  return (
    <>
      <StructuredData schemas={[personSchema, organizationSchema]} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-20 pt-20 md:pt-24">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/svistunov.webp"
                  alt="Свистунов Сергей Григорьевич - Генеральный директор ООО Велес"
                  fill
                  sizes="192px"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                  Свистунов Сергей Григорьевич
                </h1>
                <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  Генеральный директор ООО «Велес»
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Опытный предприниматель и путешественник с глубокими знаниями туристической индустрии. 
                  Основатель турагентства Велес Вояж с лицензией РТА 0035678.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    Туристический бизнес
                  </span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    Организация путешествий
                  </span>
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                    Международный туризм
                  </span>
                  <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm">
                    Управление турагентством
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://www.finradun.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    finradun.ru
                  </a>
                  <a
                    href="https://vk.com/veles__voyage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    VK
                  </a>
                  <a
                    href="https://t.me/veles_voyage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/experts"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Все эксперты
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
