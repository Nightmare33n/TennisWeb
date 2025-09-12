'use client'

import { useState } from 'react';

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    postalCode: '',
    level: 'Principiante'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          location: {
            city: formData.city,
            postalCode: formData.postalCode
          },
          tennisInfo: {
            level: formData.level
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem('token', data.token);
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Error al registrarse');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Progress indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 1 ? '¡Únete a Tennis Connect!' : 'Cuéntanos de ti'}
          </h2>
          <p className="text-gray-600">
            {step === 1 
              ? 'Crea tu cuenta en segundos' 
              : 'Información básica para conectarte mejor'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ciudad de México"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="01234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel de Tennis
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Profesional">Profesional</option>
                </select>
              </div>
            </>
          )}

          <div className="flex space-x-3">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 font-medium"
              >
                Atrás
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Registrando...' : (step === 1 ? 'Continuar' : 'Crear Cuenta')}
            </button>
          </div>
        </form>

        {/* Switch to login */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}