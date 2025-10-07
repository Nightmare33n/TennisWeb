import { CTAButtons } from '../ui/CTAButtons';

export default function HeroSection() {
  return (
    <main id="hero-section" className="min-h-screen relative">
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
              Sistema de emparejamiento para contactar con
              <span className="text-green-400"> otros jugadores</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Encuentra compañeros de juego cerca de ti, organiza partidos y mejora tu nivel. 
              La comunidad de tennis más activa de México.
            </p>
            
            <CTAButtons />
          </div>
        </div>
      </div>
    </main>
  );
}