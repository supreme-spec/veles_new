'use client';

import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

interface MapClientProps {
  coordinates?: [number, number] | undefined;
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
}

const MapClient: React.FC<MapClientProps> = ({ coordinates, zoom = 6, markers = [] }) => {
  const [selectedMarker, setSelectedMarker] = useState<{
    position: [number, number];
    title: string;
    description?: string;
  } | null>(null);

  const [mapRef, setMapRef] = useState<maplibregl.Map | null>(null);

  const center: [number, number] = coordinates || (markers?.[0]?.position || [34.555, 69.177]);

  useEffect(() => {
    if (mapRef && markers && markers.length > 0) {
      const first = markers[0]!;
      const bounds = new maplibregl.LngLatBounds([first.position[0], first.position[1]]);
      markers.forEach((marker) => {
        bounds.extend([marker.position[0], marker.position[1]]);
      });
      mapRef.fitBounds(bounds, { padding: 50 });
    }
  }, [mapRef, markers]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Map
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
          zoom: zoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        mapLib={maplibregl}
        onLoad={(evt) => setMapRef(evt.target)}
      >
        <NavigationControl position="bottom-right" />

        {markers.map((marker, index) => (
          <Marker
            key={index}
            longitude={marker.position[0]}
            latitude={marker.position[1]}
            onClick={() => setSelectedMarker(marker)}
          >
            <div
              className="w-6 h-6 flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-transform hover:scale-125 border-2 border-white bg-blue-500"
              title={marker.title}
            >
              <span className="text-white text-xs font-bold">{index + 1}</span>
            </div>
          </Marker>
        ))}

        {selectedMarker && (
          <Popup
            longitude={selectedMarker.position[0]}
            latitude={selectedMarker.position[1]}
            anchor="bottom"
            onClose={() => setSelectedMarker(null)}
            closeOnClick={false}
            className="rounded-xl"
          >
            <div className="p-2 min-w-[150px]">
              <strong className="text-blue-600 block mb-1 text-sm">{selectedMarker.title}</strong>
              {selectedMarker.description && (
                <p className="text-xs text-gray-600 !m-0">{selectedMarker.description}</p>
              )}
            </div>
          </Popup>
        )}
      </Map>

      <div className="absolute bottom-2 left-2 z-10 text-[10px] text-gray-500 bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded">
        MapLibre | OpenFreeMap © OpenMapTiles | Data from OpenStreetMap
      </div>
    </div>
  );
};

export default MapClient;
