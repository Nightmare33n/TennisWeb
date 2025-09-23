export default function PostCard({ post }) {
  const getLevelColor = (level) => {
    const colors = {
      'Principiante': 'bg-blue-100 text-blue-800',
      'Intermedio': 'bg-yellow-100 text-yellow-800',
      'Avanzado': 'bg-orange-100 text-orange-800',
      'Profesional': 'bg-red-100 text-red-800',
      'Cualquiera': 'bg-gray-100 text-gray-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const timeAgo = (postedAt) => {
    const now = new Date();
    const posted = new Date(postedAt);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));

    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return `Hace ${Math.floor(diffInMinutes / 1440)}d`;
  };

  const handleConnect = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Necesitas iniciar sesión para conectar con otros jugadores');
      return;
    }

    // Si permite WhatsApp, abrir WhatsApp
    if (post.communication.allowWhatsApp && post.communication.whatsappNumber) {
      const message = encodeURIComponent(`¡Hola! Vi tu postulación "${post.title}" en Tennis Connect y me interesa jugar contigo.`);
      window.open(`https://wa.me/52${post.communication.whatsappNumber}?text=${message}`, '_blank');
    } else {
      // Placeholder para chat interno
      alert('Chat interno próximamente. Mientras tanto, contacta al usuario directamente.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-green-200">
      {/* Header with Avatar and Basic Info */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name}&background=16a34a&color=fff&size=56`}
              alt={post.author.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-green-100"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{post.author.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{post.location.address}, {post.location.city}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {timeAgo(post.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-bold text-lg text-gray-900 mb-3">{post.title}</h4>

      {/* Level and Game Details */}
      <div className="flex items-center space-x-3 mb-5">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(post.level)}`}>
          Busca: {post.level}
        </span>
        <span className="text-sm text-gray-600">
          {post.gameDetails.gameType} • {post.gameDetails.duration}
        </span>
      </div>

      {/* Post Description */}
      <p className="text-gray-700 mb-6 leading-relaxed text-base">
        {post.description}
      </p>

      {/* Game Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Horario preferido:</span>
          <span className="text-sm font-medium text-gray-700">{post.gameDetails.preferredTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Tipo de cancha:</span>
          <span className="text-sm font-medium text-gray-700">{post.gameDetails.courtType}</span>
        </div>

        {post.location.venueName && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Lugar:</span>
            <span className="text-sm font-medium text-gray-700">{post.location.venueName}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{post.views} vistas</span>
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.responses.length} respuestas</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={handleConnect}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.communication.allowWhatsApp ? 'WhatsApp' : 'Conectar'}
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