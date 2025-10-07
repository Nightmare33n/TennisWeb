export default function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Jugadores Activos",
    },
    {
      number: "1,200+", 
      label: "Partidos Organizados",
    },
    {
      number: "15",
      label: "Ciudades en México",
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-5xl font-bold text-green-600 mb-3">
                {stat.number}
              </div>
              <div className="text-gray-600 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}