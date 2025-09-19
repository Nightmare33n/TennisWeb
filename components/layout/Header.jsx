'use client'

import { useState } from 'react';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <header  className="fixed top-0 w-full backdrop-blur-xl border-b border-white/20 z-50 shadow-xl z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Professional */}
            <div className="flex items-center">
              <div className="bg-green-600 rounded-lg p-2 mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 2c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM21 9V7l-3-2c-1.1 0-2.3.3-3.2 1L12 8.7c-.4.4-1 .4-1.4 0L8.2 6c-.9-.7-2.1-1-3.2-1L2 7v2c0 .6.4 1 1 1h16c.6 0 1-.4 1-1zM12 10.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm0 4c-2.2 0-4 1.8-4 4v3c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-3c0-2.2-1.8-4-4-4z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Tennis Connect
                </h1>
                <p className="text-xs text-green-600 -mt-1 font-medium">México</p>
              </div>
            </div>

            {/* Navigation - Professional */}
            <nav className="hidden md:flex items-center space-x-1">
              <a href="#players" className="relative px-4 py-2 text-white font-medium flex items-center gap-2 group overflow-hidden">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-green-400">Jugadores</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 ease-out group-hover:w-full"></div>
              </a>
              <a href="#courts" className="relative px-4 py-2 text-white font-medium flex items-center gap-2 group overflow-hidden">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-green-400">Canchas</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 ease-out group-hover:w-full"></div>
              </a>
              <a href="/matchmaking" className="relative px-4 py-2 text-white font-medium flex items-center gap-2 group overflow-hidden">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-green-400">Matchmaking</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 ease-out group-hover:w-full"></div>
              </a>
              <a href="#about" className="relative px-4 py-2 text-white font-medium flex items-center gap-2 group overflow-hidden">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-green-400">Nosotros</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 ease-out group-hover:w-full"></div>
              </a>
            </nav>

            {/* Auth Buttons - Enhanced */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-white hover:text-green-600 font-medium transition-all duration-200 px-4 py-2 hover:bg-green-50 rounded-sm"
              >
                Entrar
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-sm hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
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