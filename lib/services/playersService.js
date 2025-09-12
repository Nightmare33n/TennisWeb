// Mock data service para jugadores buscando partidos
class PlayersService {
  static getMockPlayers() {
    const now = new Date();
    
    return [
      {
        id: 1,
        name: "Carlos Mendoza",
        location: "Polanco, CDMX",
        level: "Intermedio", 
        rating: 4.2,
        avatar: null,
        isOnline: true,
        message: "Busco jugador para partido este sábado en la mañana. Tengo cancha reservada en club privado. Nivel intermedio preferiblemente.",
        availability: "Disponible hoy",
        preferredTime: "8:00 AM - 12:00 PM",
        courtType: "Arcilla",
        distance: 2.3,
        postedAt: new Date(now.getTime() - 15 * 60 * 1000) // 15 min ago
      },
      {
        id: 2,
        name: "Ana Ruiz",
        location: "Roma Norte, CDMX", 
        level: "Avanzado",
        rating: 4.7,
        avatar: null,
        isOnline: false,
        message: "Jugadora avanzada busca rival competitivo para entrenar. Disponible entre semana por las tardes. ¡Vamos a jugar!",
        availability: "Disponible esta semana",
        preferredTime: "5:00 PM - 8:00 PM",
        courtType: "Dura",
        distance: 4.1,
        postedAt: new Date(now.getTime() - 45 * 60 * 1000) // 45 min ago
      },
      {
        id: 3,
        name: "Miguel Torres",
        location: "Condesa, CDMX",
        level: "Principiante",
        rating: 3.8,
        avatar: null,
        isOnline: true,
        message: "Nuevo en el tennis, busco alguien paciente para practicar juntos. Parque México tiene canchas públicas disponibles.",
        availability: "Disponible ahora",
        preferredTime: "Flexible",
        courtType: "Cualquiera",
        distance: 1.8,
        postedAt: new Date(now.getTime() - 5 * 60 * 1000) // 5 min ago
      },
      {
        id: 4,
        name: "Sofia Hernández",
        location: "Santa Fe, CDMX",
        level: "Intermedio",
        rating: 4.1,
        avatar: null,
        isOnline: true,
        message: "¿Alguien para jugar mañana temprano? Tengo cancha en club deportivo. Busco nivel similar para buen partido.",
        availability: "Disponible hoy",
        preferredTime: "7:00 AM - 10:00 AM",
        courtType: "Dura",
        distance: 8.5,
        postedAt: new Date(now.getTime() - 25 * 60 * 1000) // 25 min ago
      },
      {
        id: 5,
        name: "Roberto García",
        location: "Del Valle, CDMX",
        level: "Profesional",
        rating: 4.9,
        avatar: null,
        isOnline: false,
        message: "Ex-profesional ofrece sparring para jugadores avanzados. Entrenamiento intenso, mejora tu juego conmigo.",
        availability: "Disponible próximamente",
        preferredTime: "6:00 AM - 9:00 AM",
        courtType: "Arcilla",
        distance: 6.2,
        postedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: 6,
        name: "Lucía Morales",
        location: "Coyoacán, CDMX",
        level: "Intermedio",
        rating: 4.0,
        avatar: null,
        isOnline: true,
        message: "Mamá tenista busca otras mamás para jugar mientras los niños están en clase. ¡Diversión garantizada!",
        availability: "Disponible esta semana",
        preferredTime: "10:00 AM - 2:00 PM",
        courtType: "Cualquiera",
        distance: 5.7,
        postedAt: new Date(now.getTime() - 1.5 * 60 * 60 * 1000) // 1.5 hours ago
      },
      {
        id: 7,
        name: "Diego Ramírez",
        location: "Narvarte, CDMX",
        level: "Avanzado",
        rating: 4.5,
        avatar: null,
        isOnline: true,
        message: "Jugador serio busca compañero constante para entrenar 3 veces por semana. Objetivo: torneo local en diciembre.",
        availability: "Disponible hoy",
        preferredTime: "6:00 PM - 9:00 PM",
        courtType: "Dura",
        distance: 3.4,
        postedAt: new Date(now.getTime() - 20 * 60 * 1000) // 20 min ago
      },
      {
        id: 8,
        name: "Valentina López",
        location: "Doctores, CDMX",
        level: "Principiante",
        rating: 3.5,
        avatar: null,
        isOnline: false,
        message: "Principiante motivada busca grupo de práctica. Quiero aprender más sobre técnica y estrategia del juego.",
        availability: "Disponible esta semana",
        preferredTime: "4:00 PM - 7:00 PM",
        courtType: "Cualquiera",
        distance: 7.1,
        postedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000) // 3 hours ago
      }
    ];
  }

  static getPlayersNearLocation(lat, lng, radiusKm = 20) {
    // Para demo, retornamos todos los jugadores con distancias simuladas
    return this.getMockPlayers();
  }

  static getPlayersByLevel(level) {
    return this.getMockPlayers().filter(player => player.level === level);
  }

  static getAvailablePlayersNow() {
    return this.getMockPlayers().filter(player => 
      player.availability === 'Disponible ahora' || player.availability === 'Disponible hoy'
    );
  }
}

export default PlayersService;