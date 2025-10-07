import MapInteractive from '../map/MapInteractive';

export default function MapSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-900 mb-6">
            Canchas de tennis en México
          </h2>
          <p className="text-green-700 text-xl max-w-3xl mx-auto">
            Explora canchas reales cerca de ti con datos actualizados de OpenStreetMap
          </p>
        </div>
        
        {/* Map Container */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-slate-200">
          <MapInteractive 
            height="480px" 
            city="Ciudad de México"
            showUserLocation={true}
          />
        </div>
      </div>
    </div>
  );
}