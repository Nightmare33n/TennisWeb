'use client'

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }

    loadUserPosts();
  }, [activeTab]);

  const loadUserPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/my?status=${activeTab}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
        if (data.posts.length > 0) {
          setUser(data.posts[0].author);
        }
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta postulación?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        alert('Error al eliminar la postulación');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error de conexión');
    }
  };

  const handleToggleStatus = async (postId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        loadUserPosts();
      } else {
        alert('Error al actualizar la postulación');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error de conexión');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'paused': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-blue-100 text-blue-800',
      'expired': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      'active': 'Activa',
      'paused': 'Pausada',
      'completed': 'Completada',
      'expired': 'Expirada'
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-green-600">🎾 Tennis Connect</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">¡Hola, {user?.name || 'Usuario'}!</span>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Panel de Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => window.location.href = '/create-post'}
              className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Crear Postulación</h3>
                  <p className="text-green-100">Busca un compañero de juego</p>
                </div>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/#matchmaking'}
              className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ver Jugadores</h3>
                  <p className="text-blue-100">Encuentra compañeros disponibles</p>
                </div>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </button>

            <div className="bg-white p-6 rounded-xl shadow border text-left">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Mis Estadísticas</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Postulaciones activas:</span>
                  <span className="font-medium">{posts.filter(p => p.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total vistas:</span>
                  <span className="font-medium">{posts.reduce((acc, p) => acc + p.views, 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Posts */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-gray-900">Mis Postulaciones</h3>

            {/* Tabs */}
            <div className="mt-4 flex space-x-1 bg-gray-100 rounded-lg p-1">
              {[
                { key: 'active', label: 'Activas' },
                { key: 'paused', label: 'Pausadas' },
                { key: 'all', label: 'Todas' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes postulaciones</h3>
                <p className="text-gray-500 mb-6">Crea tu primera postulación para encontrar compañeros de juego</p>
                <button
                  onClick={() => window.location.href = '/create-post'}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Crear Primera Postulación
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h4>
                        <p className="text-gray-600 mb-3">{post.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📍 {post.location.address}, {post.location.city}</span>
                          <span>⏰ {post.gameDetails.preferredTime}</span>
                          <span>👀 {post.views} vistas</span>
                          <span>💬 {post.responses.length} respuestas</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(post.status)}`}>
                          {getStatusText(post.status)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Creada {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        {post.status === 'active' && (
                          <button
                            onClick={() => handleToggleStatus(post._id, post.status)}
                            className="px-4 py-2 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                          >
                            Pausar
                          </button>
                        )}
                        {post.status === 'paused' && (
                          <button
                            onClick={() => handleToggleStatus(post._id, post.status)}
                            className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            Activar
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="px-4 py-2 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}