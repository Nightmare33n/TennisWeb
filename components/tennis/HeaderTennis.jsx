'use client'

import { useState } from 'react';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

export default function HeaderTennis() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-6xl mx-auto px-4 z-50">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100/50">
          <div className="flex justify-between items-center h-16 px-6">
            {/* Logo - Minimal */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎾</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Tennis Connect</span>
            </div>

            {/* Navigation - Minimal */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#matchmaking" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                Jugadores
              </a>
              <a href="#map" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                Canchas
              </a>
              <a href="#features" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
                Funciones
              </a>
            </nav>

            {/* Auth Buttons - Minimal */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors px-4 py-2"
              >
                Entrar
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-colors font-medium"
              >
                Registro
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
}
