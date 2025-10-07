export default function PlayerCard({ player }) {
  const getLevelColor = (level) => {
    const colors = {
      'Principiante': 'bg-blue-100 text-blue-800',
      'Intermedio': 'bg-yellow-100 text-yellow-800',
      'Avanzado': 'bg-orange-100 text-orange-800',
      'Profesional': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const getAvailabilityColor = (status) => {
    const colors = {
      'Disponible ahora': 'bg-green-100 text-green-800',
      'Disponible hoy': 'bg-green-100 text-green-800',
      'Disponible esta semana': 'bg-yellow-100 text-yellow-800',
      'Disponible próximamente': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const timeAgo = (postedAt) => {
    const now = new Date();
    const posted = new Date(postedAt);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));
    
    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return `Hace ${Math.floor(diffInMinutes / 1440)}d`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-green-200">
      {/* Header with Avatar and Basic Info */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}&background=16a34a&color=fff&size=56`}
              alt={player.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-green-100"
            />
            {player.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{player.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{player.location}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {timeAgo(player.postedAt)}
        </span>
      </div>

      {/* Level and Rating */}
      <div className="flex items-center space-x-3 mb-5">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(player.level)}`}>
          {player.level}
        </span>
        {player.rating && (
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm font-medium text-gray-700 ml-1">{player.rating}</span>
          </div>
        )}
      </div>

      {/* Post Message */}
      <p className="text-gray-700 mb-6 leading-relaxed text-base">
        {player.message}
      </p>

      {/* Availability and Preferences */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Disponibilidad:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(player.availability)}`}>
            {player.availability}
          </span>
        </div>
        
        {player.preferredTime && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Horario preferido:</span>
            <span className="text-sm font-medium text-gray-700">{player.preferredTime}</span>
          </div>
        )}

        {player.courtType && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Superficie:</span>
            <span className="text-sm font-medium text-gray-700">{player.courtType}</span>
          </div>
        )}
      </div>

      {/* Distance */}
      {player.distance && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{player.distance} km de distancia</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Conectar
        </button>
        <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Ver Perfil
        </button>
      </div>
    </div>
  );
}