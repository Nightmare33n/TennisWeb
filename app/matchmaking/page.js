'use client';

import MatchmakingSection from '../../components/sections/MatchmakingSection';
import Footer from '../../components/layout/Footer';

export default function MatchmakingPage() {
  return (
    <>
      {/* Hero Section for Matchmaking */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Encuentra tu compañero de juego
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Conecta con jugadores de tu nivel, organiza partidos y mejora tu juego. 
            Nuestra plataforma de matchmaking te ayuda a encontrar el oponente perfecto.
          </p>
        </div>
      </section>

      {/* Matchmaking Section */}
      <MatchmakingSection />

      {/* Additional Features for Matchmaking */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona el matchmaking?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nuestro sistema inteligente encuentra jugadores compatibles con tu nivel y disponibilidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Completa tu perfil</h3>
              <p className="text-gray-600">Indica tu nivel, horarios disponibles y preferencias de juego</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Busca jugadores</h3>
              <p className="text-gray-600">Encuentra jugadores compatibles cerca de ti con nuestro algoritmo</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Organiza partidos</h3>
              <p className="text-gray-600">Coordina horarios, reserva canchas y disfruta jugando</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}