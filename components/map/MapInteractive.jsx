'use client'

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Importar dinámicamente para evitar problemas de SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

import OverpassService from '../../lib/services/overpassService';
import CourtMarker from './CourtMarker';

export default function MapInteractive({ 
  height = '400px', 
  city = 'Ciudad de México',
  showUserLocation = false,
  onCourtSelect = null 
}) {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Coordenadas por defecto (Ciudad de México - Zócalo)
  const defaultCenter = [19.4326, -99.1332];
  const defaultZoom = 11;

  useEffect(() => {
    setMounted(true);
    loadTennisCourts();
    if (showUserLocation) {
      getUserLocation();
    }
  }, [city]);

  const loadTennisCourts = async () => {
    setLoading(true);
    try {
      const courtsData = await OverpassService.getTennisCourts(city);
      setCourts(courtsData);
    } catch (error) {
      // Error silenciado - el usuario verá que no se cargan las canchas
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        
        if (map) {
          map.setView([location.lat, location.lng], 13);
        }
      },
      (error) => {
        // Manejo silencioso de errores de geolocalización
        // Los errores son esperados y no requieren logging en producción
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const handleNearMeClick = async () => {
    if (userLocation) {
      setLoading(true);
      try {
        const nearCourts = await OverpassService.getCourtsNearLocation(
          userLocation.lat, 
          userLocation.lng, 
          10 // 10km radius
        );
        setCourts(nearCourts);
      } catch (error) {
        // Error silenciado - el usuario verá que no se cargan las canchas cercanas
      } finally {
        setLoading(false);
      }
    }
  };

  // Crear icono personalizado para canchas
  const courtIcon = useMemo(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      return new L.divIcon({
        html: `
          <div style="
            background: #16a34a;
            border: 2px solid white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">
            <span style="color: white; font-size: 12px;">🎾</span>
          </div>
        `,
        className: 'custom-court-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
    }
    return null;
  }, []);

  // Crear icono para ubicación del usuario
  const userIcon = useMemo(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      return new L.divIcon({
        html: `
          <div style="
            background: #3b82f6;
            border: 3px solid white;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `,
        className: 'custom-user-icon',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
    }
    return null;
  }, []);

  if (!mounted) {
    // Mostrar placeholder hasta que el componente se monte
    return (
      <div className="relative">
        <div 
          className="bg-green-100 rounded-xl flex items-center justify-center"
          style={{ height }}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-600">Cargando mapa...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Controles */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        {showUserLocation && userLocation && (
          <button
            onClick={handleNearMeClick}
            disabled={loading}
            className="bg-white shadow-lg px-3 py-2 rounded-lg text-sm font-medium text-green-600 hover:bg-green-50 disabled:opacity-50"
          >
            📍 Cerca de mí
          </button>
        )}
        <button
          onClick={loadTennisCourts}
          disabled={loading}
          className="bg-white shadow-lg px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          🔄 Actualizar
        </button>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center z-[1001] rounded-xl">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
              <span className="text-sm text-gray-600">Cargando canchas...</span>
            </div>
          </div>
        </div>
      )}

      {/* Mapa */}
      <div style={{ height }} className="rounded-xl overflow-hidden">
        <MapContainer
          center={userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter}
          zoom={userLocation ? 13 : defaultZoom}
          style={{ height: '100%', width: '100%' }}
          whenReady={(map) => setMap(map.target)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Marcadores de canchas */}
          {courts.map((court) => (
            <Marker
              key={court.id}
              position={[court.lat, court.lng]}
              icon={courtIcon}
              eventHandlers={{
                click: () => {
                  if (onCourtSelect) {
                    onCourtSelect(court);
                  }
                }
              }}
            >
              <Popup>
                <CourtMarker court={court} />
              </Popup>
            </Marker>
          ))}

          {/* Marcador de usuario */}
          {showUserLocation && userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userIcon}
            >
              <Popup>
                <div className="text-center">
                  <div className="text-lg mb-1">📍</div>
                  <p className="font-medium">Tu ubicación</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Stats */}
      <div className="mt-4 text-center text-sm text-gray-600">
        {courts.length > 0 && (
          <p>
             Mostrando {courts.length} cancha{courts.length !== 1 ? 's' : ''} de tennis
            {userLocation && ' cerca de ti'}
          </p>
        )}
      </div>
    </div>
  );
}