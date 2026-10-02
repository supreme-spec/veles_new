import type { ReactNode } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/shared/components/ui/OptimizedImage';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  hero?: {
    title: string;
    subtitle: string;
    image?: string;
    cta?: {
      text: string;
      href: string;
    };
  };
  className?: string;
}

export function PageLayout({
  children,
  title,
  description: _description,
  hero,
  className = '',
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Hero секция */}
      {hero && (
        <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
          {/* Фоновые элементы */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 opacity-30">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">{hero.title}</h1>
                <p className="text-xl lg:text-2xl text-white mb-8 leading-relaxed">
                  {hero.subtitle}
                </p>
                {hero.cta && (
                  <a
                    href={hero.cta.href}
                    className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>{hero.cta.text}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                )}
              </div>

              {hero.image && (
                <div className="relative">
                  <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <OptimizedImage
                      src={hero.image}
                      alt={hero.title}
                      width={600}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Плавающие элементы */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-sm"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-md"></div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Основной контент */}
      <main className="relative">
        {/* Хлебные крошки для навигации */}
        {title && (
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  🏠 Главная
                </Link>
                <span>→</span>
                <span className="text-gray-900 font-medium">{title}</span>
              </nav>
            </div>
          </div>
        )}

        {/* Контент страницы */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>

      {/* Футер с быстрыми ссылками */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Велес Вояж</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Ваш умный путеводитель по миру с поддержкой Web3 технологий. Открывайте новые
                горизонты путешествий с современными решениями.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/wiki" className="hover:text-white transition-colors">
                    📖 Энциклопедия
                  </Link>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    🔒 Конфиденциальность
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Технологии</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>⚡ Next.js 14</li>
                <li>💎 TonConnect</li>
                <li>🎨 TailwindCSS</li>
                <li>📱 PWA Ready</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Велес Вояж. Создано с ❤️ для путешественников.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
