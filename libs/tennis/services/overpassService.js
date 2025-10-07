import axios from 'axios';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const mexicoCitiesQueries = {
  'Ciudad de México': `
    [out:json][timeout:5];
    (
      node["sport"="tennis"](19.3,-99.3,19.5,-99.0);
    );
    out;
  `,
  'Guadalajara': `
    [out:json][timeout:25];
    (
      way["sport"="tennis"]["addr:city"~"Guadalajara"];
      node["sport"="tennis"]["addr:city"~"Guadalajara"];
    );
    out center meta;
  `,
  'Monterrey': `
    [out:json][timeout:25];
    (
      way["sport"="tennis"]["addr:city"~"Monterrey"];
      node["sport"="tennis"]["addr:city"~"Monterrey"];
    );
    out center meta;
  `,
  'Chihuahua': `
    [out:json][timeout:5];
    (
      node["sport"="tennis"](28.5,-106.2,28.8,-105.9);
    );
    out;
  `
};

// Cache para evitar consultas repetidas
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

class OverpassService {
  static async getTennisCourts(city = 'Ciudad de México', bounds = null) {
    const cacheKey = `${city}_${bounds ? bounds.join(',') : 'all'}`;
    
    // Verificar cache
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
    }

    // Siempre devolver mock data primero para mejor UX
    const mockCourts = this.getMockCourts(city);

    // Intentar obtener datos reales con reintentos
    try {
      const realCourts = await this.fetchWithRetry(city, bounds, 2); // 2 reintentos
      
      if (realCourts && realCourts.length > 0) {
        // Combinar datos reales con mock data
        const combinedCourts = [...mockCourts, ...realCourts];
        
        // Guardar en cache
        cache.set(cacheKey, {
          data: combinedCourts,
          timestamp: Date.now()
        });

        return combinedCourts;
      }
    } catch (error) {
      console.warn('Overpass API unavailable, using mock data:', error.message);
    }
    
    // Siempre retornar mock data para una buena experiencia
    return mockCourts;
  }

  static async fetchWithRetry(city, bounds, maxRetries) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        let query;
        
        if (bounds) {
          // Consulta simplificada por área
          query = `
            [out:json][timeout:5];
            (
              way["sport"="tennis"](${bounds.join(',')});
              node["sport"="tennis"](${bounds.join(',')});
            );
            out center;
          `;
        } else {
          // Consulta simplificada por ciudad
          query = mexicoCitiesQueries[city] || mexicoCitiesQueries['Ciudad de México'];
        }

        const response = await axios.post(OVERPASS_URL, query, {
          headers: {
            'Content-Type': 'text/plain',
          },
          timeout: 5000, // 5 segundos timeout muy rápido
        });

        const courts = this.parseCourtsData(response.data);
        return courts; // Retornar datos reales si se obtuvieron exitosamente
        
      } catch (error) {
        lastError = error;
        console.warn(`Overpass attempt ${attempt}/${maxRetries} failed:`, error.message);
        
        if (attempt < maxRetries) {
          // Esperar un poco antes del siguiente intento
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    // Si todos los intentos fallaron, lanzar el último error
    throw lastError;
  }

  static parseCourtsData(data) {
    if (!data || !data.elements) {
      return [];
    }

    return data.elements
      .filter(element => {
        // Filtrar solo elementos con coordenadas válidas
        return (element.lat && element.lon) || 
               (element.center && element.center.lat && element.center.lon);
      })
      .map(element => {
        const lat = element.lat || element.center?.lat;
        const lon = element.lon || element.center?.lon;
        const tags = element.tags || {};

        return {
          id: element.id,
          type: element.type,
          name: tags.name || tags['name:es'] || 'Cancha de Tennis',
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: this.buildAddress(tags),
          surface: tags.surface || 'No especificado',
          access: tags.access || 'unknown',
          club: tags.club || tags.amenity === 'club',
          phone: tags.phone,
          website: tags.website,
          opening_hours: tags.opening_hours,
          fee: tags.fee,
          lighting: tags.lit === 'yes',
          courts_count: tags.courts || 1,
          tags: tags
        };
      });
  }

  static buildAddress(tags) {
    const parts = [];
    if (tags['addr:street']) parts.push(tags['addr:street']);
    if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
    if (tags['addr:neighbourhood']) parts.push(tags['addr:neighbourhood']);
    if (tags['addr:city']) parts.push(tags['addr:city']);
    if (tags['addr:state']) parts.push(tags['addr:state']);
    
    return parts.length > 0 ? parts.join(', ') : 'Dirección no disponible';
  }

  static getMockCourts(city = 'Ciudad de México') {
    // Datos de ejemplo mejorados
    const mockCourts = {
      'Ciudad de México': [
        {
          id: 'mock_1',
          type: 'mock',
          name: 'Club de Tennis Chapultepec',
          lat: 19.4188,
          lng: -99.1779,
          address: 'Av. Constituyentes, Chapultepec, CDMX',
          surface: 'clay',
          access: 'private',
          club: true,
          courts_count: 6,
          lighting: true,
          phone: '+52 55 5555-0101',
          opening_hours: 'Mo-Su 06:00-22:00'
        },
        {
          id: 'mock_2',
          type: 'mock',
          name: 'Canchas Públicas Viveros de Coyoacán',
          lat: 19.3610,
          lng: -99.1896,
          address: 'Viveros de Coyoacán, CDMX',
          surface: 'hard',
          access: 'public',
          club: false,
          courts_count: 4,
          lighting: false,
          fee: 'yes'
        },
        {
          id: 'mock_3',
          type: 'mock',
          name: 'Club Deportivo Polanco',
          lat: 19.4338,
          lng: -99.1945,
          address: 'Polanco, Miguel Hidalgo, CDMX',
          surface: 'clay',
          access: 'members',
          club: true,
          courts_count: 8,
          lighting: true,
          phone: '+52 55 5555-0202',
          website: 'https://example.com'
        },
        {
          id: 'mock_4',
          type: 'mock',
          name: 'Deportivo Insurgentes Sur',
          lat: 19.3700,
          lng: -99.1620,
          address: 'Insurgentes Sur, Benito Juárez, CDMX',
          surface: 'hard',
          access: 'public',
          club: false,
          courts_count: 2,
          lighting: true,
          opening_hours: 'Mo-Fr 16:00-21:00; Sa-Su 08:00-18:00'
        },
        {
          id: 'mock_5',
          type: 'mock',
          name: 'Parque México Tennis Courts',
          lat: 19.4110,
          lng: -99.1670,
          address: 'Parque México, Condesa, CDMX',
          surface: 'hard',
          access: 'public',
          club: false,
          courts_count: 2,
          lighting: false,
          fee: 'no'
        }
      ],
      'Chihuahua': [
        {
          id: 'chih_1',
          type: 'mock',
          name: 'Ciudad Deportiva de Chihuahua',
          lat: 28.6458,
          lng: -106.0889,
          address: 'Ciudad Deportiva, Chihuahua, Chih.',
          surface: 'hard',
          access: 'public',
          club: false,
          courts_count: 3,
          lighting: true,
          opening_hours: 'Mo-Su 06:00-22:00',
          fee: 'yes'
        },
        {
          id: 'chih_2',
          type: 'mock',
          name: 'Canchas de Tenis Santo Niño',
          lat: 28.6580,
          lng: -106.0524,
          address: 'Santo Niño, Tecnológico s/n, Chihuahua, Chih. 31170',
          surface: 'hard',
          access: 'public',
          club: false,
          courts_count: 2,
          lighting: true,
          opening_hours: 'Mo-Su 06:00-23:00'
        },
        {
          id: 'chih_3',
          type: 'mock',
          name: 'Cancha de Tennis Progreso',
          lat: 28.6520,
          lng: -106.1045,
          address: 'Progreso, Av. Antonio de Deza y Ulloa s/n, Chihuahua, Chih. 31210',
          surface: 'hard',
          access: 'public',
          club: false,
          courts_count: 2,
          lighting: true,
          opening_hours: 'Mo-Su 06:00-20:00'
        },
        {
          id: 'chih_4',
          type: 'mock',
          name: 'Canchas De Tenis UACH',
          lat: 28.6390,
          lng: -106.0770,
          address: 'Campus Uach II, Universidad Autónoma de Chihuahua, Chih. 31125',
          surface: 'hard',
          access: 'public',
          club: false,
          courts_count: 4,
          lighting: true,
          opening_hours: 'Mo-Su 07:00-21:00'
        },
        {
          id: 'chih_5',
          type: 'mock',
          name: 'SPRTENNIS Academy',
          lat: 28.6255,
          lng: -106.1125,
          address: 'Fuente de los vientos, Fuentes del Valle, Chihuahua, Chih. 31207',
          surface: 'hard',
          access: 'private',
          club: true,
          courts_count: 4,
          lighting: true,
          opening_hours: 'Mo-Su 07:00-21:00',
          phone: '+52 614 xxx-xxxx'
        },
        {
          id: 'chih_6',
          type: 'mock',
          name: 'Campestre de Chihuahua',
          lat: 28.6750,
          lng: -106.0950,
          address: 'Club Campestre, Chihuahua, Chih.',
          surface: 'clay',
          access: 'members',
          club: true,
          courts_count: 6,
          lighting: true,
          opening_hours: 'Mo-Su 06:00-22:00'
        },
        {
          id: 'chih_7',
          type: 'mock',
          name: 'Polideportivo Luis H. Álvarez',
          lat: 28.7195,
          lng: -106.0906,
          address: 'Monte Real 11740, Quintas Carolinas, Chihuahua, Chih. 31146',
          surface: 'rubber',
          access: 'public',
          club: false,
          courts_count: 2,
          lighting: true,
          opening_hours: 'Mo-Su 06:00-22:00',
          fee: 'yes'
        }
      ]
    };

    return mockCourts[city] || mockCourts['Ciudad de México'];
  }

  static async getCourtsNearLocation(lat, lng, radiusKm = 10) {
    // Calcular bounding box aproximado
    const latDelta = radiusKm / 111; // Aproximadamente 111km por grado de latitud
    const lngDelta = radiusKm / (111 * Math.cos(lat * Math.PI / 180));
    
    const bounds = [
      lat - latDelta,  // south
      lng - lngDelta,  // west
      lat + latDelta,  // north
      lng + lngDelta   // east
    ];

    return await this.getTennisCourts(null, bounds);
  }
}

export default OverpassService;