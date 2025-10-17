'use client'

import { useState, useEffect } from 'react';
import PostCard from '../players/PostCard';

export default function MatchmakingSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, available: 0 });

  useEffect(() => {
    loadPosts();
  }, [filter]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      let url = '/api/posts?limit=20';

      if (filter !== 'all') {
        if (filter === 'available') {
          // Load posts from today or with immediate availability
          url += '&status=active';
        } else {
          // Filter by level
          url += `&level=${filter}`;
        }
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);

        // Calculate stats
        const total = data.posts.length;
        const available = data.posts.filter(post =>
          post.gameDetails.preferredTime.toLowerCase().includes('hoy') ||
          post.gameDetails.preferredTime.toLowerCase().includes('ahora') ||
          post.gameDetails.preferredTime.toLowerCase().includes('disponible')
        ).length;

        setStats({ total, available });
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="matchmaking" className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Jugadores Activos
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Encuentra compañeros de juego cerca de ti
          </p>

          {/* Stats compactas */}
          <div className="flex items-center justify-center gap-6 md:gap-12 mb-8 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">
                <span className="font-semibold text-green-600">{stats.total}</span> activas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">
                <span className="font-semibold text-green-600">{stats.available}</span> disponibles hoy
              </span>
            </div>
          </div>

          {/* Botón CTA */}
          <button
            onClick={() => {
              const token = localStorage.getItem('token');
              if (token) {
                window.location.href = '/create-post';
              } else {
                alert('Necesitas iniciar sesión para crear una postulación');
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear postulación
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 font-medium ${
              filter === 'all'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 font-medium flex items-center gap-2 ${
              filter === 'available'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {filter === 'available' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            Disponibles hoy
          </button>
          <button
            onClick={() => setFilter('beginner')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 font-medium ${
              filter === 'beginner'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Principiante
          </button>
          <button
            onClick={() => setFilter('intermediate')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 font-medium ${
              filter === 'intermediate'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Intermedio
          </button>
          <button
            onClick={() => setFilter('advanced')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 font-medium ${
              filter === 'advanced'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Avanzado
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Buscando jugadores activos...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="bg-green-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No hay postulaciones aquí
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              {filter === 'all'
                ? 'Sé el primero en crear una postulación y conecta con otros jugadores'
                : 'Prueba con otro filtro o crea una nueva postulación'}
            </p>
            <button
              onClick={() => {
                const token = localStorage.getItem('token');
                if (token) {
                  window.location.href = '/create-post';
                } else {
                  alert('Necesitas iniciar sesión para crear una postulación');
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Crear postulación
            </button>
          </div>
        )}
      </div>
    </section>
  );
}