export default function CourtMarker({ court }) {
  const getAccessBadge = (access) => {
    const styles = {
      public: 'bg-green-100 text-green-800',
      private: 'bg-red-100 text-red-800',
      customers: 'bg-orange-100 text-orange-800',
      members: 'bg-purple-100 text-purple-800',
      unknown: 'bg-gray-100 text-gray-800'
    };

    const labels = {
      public: 'Público',
      private: 'Privado',
      customers: 'Solo clientes',
      members: 'Solo miembros',
      unknown: 'No especificado'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[access] || styles.unknown}`}>
        {labels[access] || labels.unknown}
      </span>
    );
  };

  const getSurfaceBadge = (surface) => {
    const surfaceMap = {
      'clay': 'Arcilla',
      'hard': 'Dura',
      'grass': 'Césped',
      'artificial_grass': 'Césped artificial',
      'concrete': 'Concreto',
      'asphalt': 'Asfalto'
    };

    return surfaceMap[surface] || surface || 'No especificado';
  };

  return (
    <div className="min-w-[280px] p-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {court.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            📍 {court.address}
          </p>
        </div>
        <div className="ml-2 flex-shrink-0">
          <span className="text-lg">🎾</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        {getAccessBadge(court.access)}
        {court.club && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            🏆 Club
          </span>
        )}
        {court.lighting && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            💡 Iluminado
          </span>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Superficie:</span>
          <span className="font-medium">{getSurfaceBadge(court.surface)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Canchas:</span>
          <span className="font-medium">{court.courts_count}</span>
        </div>

        {court.phone && (
          <div className="flex justify-between">
            <span className="text-gray-600">Teléfono:</span>
            <a 
              href={`tel:${court.phone}`}
              className="font-medium text-green-600 hover:text-green-800"
            >
              {court.phone}
            </a>
          </div>
        )}

        {court.website && (
          <div className="flex justify-between">
            <span className="text-gray-600">Web:</span>
            <a 
              href={court.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Visitar sitio
            </a>
          </div>
        )}

        {court.opening_hours && (
          <div className="flex justify-between">
            <span className="text-gray-600">Horarios:</span>
            <span className="font-medium text-right max-w-[120px] break-words">
              {court.opening_hours}
            </span>
          </div>
        )}

        {court.fee && (
          <div className="flex justify-between">
            <span className="text-gray-600">Costo:</span>
            <span className="font-medium">
              {court.fee === 'yes' ? '💰 Con costo' : court.fee}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${court.lat},${court.lng}`;
              window.open(url, '_blank');
            }}
            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
          >
            📍 Ir a cancha
          </button>
          <button 
            className="flex-1 border border-green-600 text-green-600 px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-50 transition-colors"
          >
            🎾 Ver jugadores
          </button>
        </div>
      </div>

      {/* Debug info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && court.type === 'mock' && (
        <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
          <span className="text-orange-600 font-medium">⚠️ Datos de prueba</span>
        </div>
      )}
    </div>
  );
}