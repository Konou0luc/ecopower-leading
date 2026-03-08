'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Require dynamic import for React-Leaflet since window is not defined on server
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface UserMapProps {
  latitude: number;
  longitude: number;
  userName: string;
  locationSource?: string;
  city?: string;
  country?: string;
}

export default function UserLocationMap({ 
  latitude, 
  longitude, 
  userName,
  locationSource,
  city,
  country
}: UserMapProps) {
  const [mounted, setMounted] = useState(false);
  const position: [number, number] = [latitude, longitude];

  useEffect(() => {
    // Leaflet marker icons fix for Next.js
    (async function init() {
      const L = await import('leaflet');
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      });
      setMounted(true);
    })();
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <div className="flex flex-col items-center text-gray-400">
          <MapPin size={32} className="mb-2 text-gray-300" />
          <p>Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-200 relative z-0">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <p className="font-bold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 mt-1">
                {city && country ? `${city}, ${country}` : 'Position GPS'}
              </p>
              {locationSource && (
                <p className="text-[10px] text-gray-400 mt-2 italic">
                  Source: {locationSource === 'gps' ? 'Position GPS exacte' : 'Saisie manuelle'}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
