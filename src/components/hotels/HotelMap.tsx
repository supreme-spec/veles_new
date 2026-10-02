'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const VECTOR_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

const OSM_RASTER_STYLE = {
  version: 8,
  name: 'osm-raster-fallback',
  sources: {
    osm: {
      type: 'raster',
      tiles: [
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [{ id: 'osm-raster', type: 'raster', source: 'osm' }],
} as const;

export interface HotelMapPoint {
  id: string;
  name: string;
  city: string;
  country: string;
  stars?: number | null;
  minPrice?: number | null;
  lng: number;
  lat: number;
}

interface HotelMapProps {
  hotels: HotelMapPoint[];
  selectedHotelId?: string | null;
  onSelectHotel?: (hotelId: string | null) => void;
}

export function HotelMap({ hotels, selectedHotelId, onSelectHotel }: HotelMapProps) {
  const mapRef = useRef<any>(null);
  const [mapStyle, setMapStyle] = useState<any>(VECTOR_STYLE);
  const [styleFailed, setStyleFailed] = useState(false);
  const [hasGeolocation, setHasGeolocation] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator && !!navigator.geolocation && window.isSecureContext) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' as PermissionName })
          .then((res) => {
            if (res.state !== 'denied') setHasGeolocation(true);
          })
          .catch(() => setHasGeolocation(false));
      } else {
        setHasGeolocation(true);
      }
    }
  }, []);

  const center = useMemo(() => {
    if (hotels.length === 1) {
      return { lng: hotels[0]!.lng, lat: hotels[0]!.lat };
    }
    if (hotels.length > 1) {
      return {
        lng: hotels.reduce((sum, h) => sum + h.lng, 0) / hotels.length,
        lat: hotels.reduce((sum, h) => sum + h.lat, 0) / hotels.length,
      };
    }
    return { lng: 37.6173, lat: 55.7558 };
  }, [hotels]);

  const initialViewState = useMemo(() => ({
    longitude: center.lng,
    latitude: center.lat,
    zoom: hotels.length > 1 ? 4 : 12,
  }), [center, hotels.length]);

  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-slate-200">
      <Map
        ref={mapRef}
        mapStyle={mapStyle}
        initialViewState={initialViewState}
        maxZoom={16}
        interactiveLayerIds={[]}
        onClick={() => onSelectHotel?.(null)}
        onError={(e: any) => {
          if (!styleFailed) {
            console.warn('[MAP] Vector style failed, switching to OSM raster:', e?.error?.message || e);
            setStyleFailed(true);
            setMapStyle(OSM_RASTER_STYLE);
          }
        }}
      >
        <NavigationControl position="top-right" />
        {hasGeolocation && <GeolocateControl position="top-right" />}

        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            longitude={hotel.lng}
            latitude={hotel.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onSelectHotel?.(hotel.id);
            }}
          >
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-lg border ${
                selectedHotelId === hotel.id
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              {hotel.stars ? '★'.repeat(hotel.stars) : '🏨'}
            </div>
          </Marker>
        ))}

        {selectedHotelId && (() => {
          const selected = hotels.find((h) => h.id === selectedHotelId);
          if (!selected) return null;
          return (
            <Popup
              longitude={selected.lng}
              latitude={selected.lat}
              anchor="top"
              closeButton
              closeOnClick={false}
              onClose={() => onSelectHotel?.(null)}
            >
              <div className="p-2">
                <h3 className="font-bold text-slate-900">{selected.name}</h3>
                <p className="text-xs text-slate-500">{selected.city}, {selected.country}</p>
                {selected.minPrice != null && (
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {Number(selected.minPrice).toLocaleString('ru-RU')} ₽
                  </p>
                )}
              </div>
            </Popup>
          );
        })()}
      </Map>
    </div>
  );
}
