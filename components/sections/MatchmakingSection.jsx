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
    <section id="matchmaking" className="py-20 bg-gradient-to-br from-white to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-indigo-600 rounded-ms p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Matchmaking - Jugadores Activos
            </h2>
          </div>
          <p className="text-gray-600 text-xl mb-8 max-w-3xl mx-auto">
            Conecta con jugadores cerca de ti que buscan compañero de juego
          </p>
          
          {/* Botón CTA con transición suave entre tonos de azul */}
          <button
            onClick={() => {
              const token = localStorage.getItem('token');
              if (token) {
                window.location.href = '/create-post';
              } else {
                alert('Necesitas iniciar sesión para crear una postulación');
              }
            }}
            className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white px-8 py-3 rounded-md hover:from-blue-800 hover:via-blue-600 hover:to-blue-400 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 mb-8 flex items-center gap-3 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear mi postulación
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-all duration-200 font-medium flex items-center gap-2 ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* Todos ({PlayersService.getMockPlayers().length}) */}
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-full transition-all duration-200 font-medium flex items-center gap-2 ${
              filter === 'available'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 border border-gray-200'
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {/* Disponibles ({PlayersService.getAvailablePlayersNow().length}) */}
          </button>
          <button
            onClick={() => setFilter('beginner')}
            className={`px-4 py-2 rounded-full transition-all duration-200 font-medium flex items-center gap-2 ${
              filter === 'beginner'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
            }`}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Principiante
          </button>
          <button
            onClick={() => setFilter('intermediate')}
            className={`px-4 py-2 rounded-full transition-all duration-200 font-medium flex items-center gap-2 ${
              filter === 'intermediate'
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200'
            }`}
          >
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Intermedio
          </button>
          <button
            onClick={() => setFilter('advanced')}
            className={`px-4 py-2 rounded-full transition-all duration-200 font-medium flex items-center gap-2 ${
              filter === 'advanced'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
            }`}
          >
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Avanzado
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando jugadores...</p>
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
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay jugadores en esta categoría
            </h3>
            <p className="text-gray-500 mb-6">
              Prueba con otro filtro o sé el primero en crear una postulación
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
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Crear mi postulación
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {stats.total}
              </div>
              <div className="text-gray-600">Postulaciones activas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {stats.available}
              </div>
              <div className="text-gray-600">Disponibles hoy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                2h
              </div>
              <div className="text-gray-600">Tiempo promedio de respuesta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}