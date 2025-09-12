'use client'

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }

    // For now, just show a basic dashboard
    setUser({ name: 'Usuario' });
    setLoading(false);
  }, []);

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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-green-600">🎾 Tennis Connect MX</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">¡Hola, {user?.name}!</span>
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
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a tu Dashboard!
          </h2>
          <p className="text-gray-600 mb-8">
            Tu plataforma para conectar con jugadores de tennis en México
          </p>
          
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Dashboard en Construcción
            </h3>
            <p className="text-gray-600">
              Pronto podrás ver jugadores cerca, organizar partidos y mucho más.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}