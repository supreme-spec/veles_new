"use client";



/**
 * Client Component для отображения статистики Wiki в виде сетки
 */
export function WikiStatsGrid({
  stats
}: {
  stats: {
    readyArticles: number;
    citiesCount: number;
    attractionsCount: number;
    totalCountries: number;
  }
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <div className="text-3xl font-bold text-blue-600 mb-2">{stats.readyArticles}</div>
        <div className="text-gray-600">Готовых статей</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-emerald-600 mb-2">{stats.totalCountries}</div>
        <div className="text-gray-600">Стран</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-amber-600 mb-2">{stats.citiesCount}</div>
        <div className="text-gray-600">Городов</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-purple-600 mb-2">{stats.attractionsCount}</div>
        <div className="text-gray-600">Достопримечательностей</div>
      </div>
    </div>
  );
}

