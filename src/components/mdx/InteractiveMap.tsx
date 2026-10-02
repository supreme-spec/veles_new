'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Типы для локаций
interface Location {
  id: number | string;
  name: string;
  type?: string;
  coordinates: [number, number];
  description?: string;
}

// Создаем тип для props
interface MapProps {
  coordinates?: [number, number];
  zoom?: number;
  height?: string;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
  locations?: Location[];
  title?: string;
}

// Динамический импорт SimpleMap компонента
const DynamicMap = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="bg-gradient-to-br from-blue-100/50 to-green-100/50 dark:from-blue-900/30 dark:to-green-900/30 border-2 border-dashed border-blue-200 dark:border-blue-800 flex items-center justify-center w-full h-full rounded-2xl backdrop-blur-sm">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">🌍</div>
        <p className="text-blue-800 dark:text-blue-300 font-bold uppercase tracking-widest text-xs">Инициализация карты...</p>
      </div>
    </div>
  )
});

const InteractiveMap: React.FC<MapProps> = ({
  coordinates,
  zoom = 6,
  height = "300px md:450px", // Use responsive height classes
  markers = [],
  locations = [],
  title
}) => {
  // We need to handle the height properly in the style object
  const mapHeight = typeof window !== 'undefined' && window.innerWidth < 768
    ? (height.includes('px') && !height.includes('md:') ? height : '300px')
    : (height.includes('md:') ? height.split('md:')[1] : height);
  // Превращаем locations в markers для совместимости
  const allMarkers = [
    ...markers,
    ...locations.map(loc => ({
      position: loc.coordinates,
      title: loc.name,
      description: loc.description || (loc.type === 'city' ? `${loc.name}` : `${loc.name}`)
    }))
  ];

  return (
    <div className="my-10 group">
      {title && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📍</span> {title}
        </h3>
      )}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-blue-500/10" style={{ height: mapHeight }}>
        <DynamicMap
          coordinates={coordinates}
          zoom={zoom}
          markers={allMarkers}
        />

        <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] uppercase font-bold tracking-tighter text-gray-600 dark:text-gray-400 shadow-xl z-10 border border-white/20">
          Интерактивный гид: {allMarkers.length} объектов
        </div>
      </div>

      {allMarkers.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Объекты на карте ({allMarkers.length}):
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside">
            {allMarkers.map((m, i) => (
              <li key={i}>
                {m.title}
                {Array.isArray(m.position) && m.position.length === 2
                  ? ` (${m.position[0]}, ${m.position[1]})`
                  : ''}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;