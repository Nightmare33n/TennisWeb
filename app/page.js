import MapSection from '../components/sections/MapSection';
import MatchmakingSection from '../components/sections/MatchmakingSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      
      {/* Hero Section */}
      <main className="min-h-screen relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/herobg.jpg)',
            filter: 'brightness(0.7)'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Content */}
        <div className="relative z-10 pt-16 pb-16 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Conecta con jugadores de 
                <span className="text-green-400"> tennis en México</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Encuentra compañeros de juego cerca de ti, organiza partidos y mejora tu nivel. 
                La comunidad de tennis más activa de México.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Ver Jugadores Cerca
                </button>
                <button className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-30 transition-colors flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Explorar Canchas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-5xl font-bold text-green-600 mb-3">500+</div>
                <div className="text-gray-600 text-lg">Jugadores Activos</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-green-600 mb-3">1,200+</div>
                <div className="text-gray-600 text-lg">Partidos Organizados</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-green-600 mb-3">15</div>
                <div className="text-gray-600 text-lg">Ciudades en México</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <MapSection />

        {/* Matchmaking Section */}
        <MatchmakingSection />

        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                ¿Cómo funciona?
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Simple, rápido y efectivo para conectar jugadores
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-green-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Crea tu perfil</h3>
                <p className="text-gray-600 leading-relaxed">Indica tu nivel, ubicación y disponibilidad para conectar con jugadores compatibles</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Encuentra jugadores</h3>
                <p className="text-gray-600 leading-relaxed">Explora perfiles por nivel, ubicación y horarios disponibles en tiempo real</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Conecta y juega</h3>
                <p className="text-gray-600 leading-relaxed">Organiza partidos, reserva canchas y mejora tu nivel jugando regularmente</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}