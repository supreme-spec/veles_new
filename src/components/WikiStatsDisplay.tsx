'use client';

import { useWikiStatsSimple } from './WikiStats';

interface WikiStatsDisplayProps {
  className?: string;
}

/**
 * Client Component для отображения статистики Wiki
 */
export function WikiStatsDisplay({ className = '' }: WikiStatsDisplayProps) {
  const stats = useWikiStatsSimple();

  return (
    <div className={`space-y-2 text-sm text-blue-700 ${className}`}>
      <div className="flex items-center space-x-2">
        <span>🏢</span>
        <span>Лицензированное турагентство</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>📚</span>
        <span>
          {stats.readyArticles} готовых стран, {stats.citiesCount} городов
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span>🎯</span>
        <span>{stats.attractionsCount}+ достопримечательностей</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>🔍</span>
        <span>Инновационные технологии</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>📱</span>
        <span>PWA поддержка</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>👨‍💼</span>
        <span>Персональные консультации</span>
      </div>
    </div>
  );
}
