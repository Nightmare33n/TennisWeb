'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          setError('Error en la autenticación de Google');
          setLoading(false);
          return;
        }

        if (!code) {
          setError('Código de autorización no encontrado');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token
          localStorage.setItem('token', data.token);

          // Redirect based on user status
          if (data.isNewUser) {
            // New user needs to complete onboarding
            router.push('/onboarding');
          } else {
            // Existing user, go to dashboard
            router.push('/dashboard');
          }
        } else {
          setError(data.message || 'Error en la autenticación');
          setLoading(false);
        }
      } catch (error) {
        console.error('Google callback error:', error);
        setError('Error de conexión');
        setLoading(false);
      }
    };

    handleGoogleCallback();
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Procesando autenticación con Google...
          </h2>
          <p className="text-gray-600">
            Por favor espera mientras completamos tu registro.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="bg-red-100 rounded-full p-3 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error de autenticación
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 font-medium"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return null;
}