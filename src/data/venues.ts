export interface Venue {
  id: string;
  city: string;
  country: 'USA' | 'Mexico' | 'Canada';
  stadium: string;
  matchesCount: number;
  lat: number;
  lng: number;
  image: string;
  capacity: number;
  elevation?: number;
  description: string;
}

export const venues: Venue[] = [
  { 
    id: 'nyc', 
    city: 'New York/New Jersey', 
    country: 'USA', 
    stadium: 'MetLife Stadium', 
    matchesCount: 8, 
    lat: 40.8128, 
    lng: -74.0742, 
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    capacity: 82500,
    description: 'Home of the NFL\'s Giants and Jets. Final venue.'
  },
  { 
    id: 'dal', 
    city: 'Dallas', 
    country: 'USA', 
    stadium: 'AT&T Stadium', 
    matchesCount: 9, 
    lat: 32.7473, 
    lng: -97.0945, 
    image: 'https://images.unsplash.com/photo-1549046675-dd779977883a?auto=format&fit=crop&w=800&q=80',
    capacity: 80000,
    description: 'State-of-the-art stadium with retractable roof. Hosts most matches.'
  },
  { 
    id: 'kc', 
    city: 'Kansas City', 
    country: 'USA', 
    stadium: 'Arrowhead Stadium', 
    matchesCount: 6, 
    lat: 39.0490, 
    lng: -94.4839, 
    image: 'https://images.unsplash.com/photo-1620313835017-f6d3910c5980?auto=format&fit=crop&w=800&q=80',
    capacity: 73080,
    description: 'Known for its incredible home-field advantage and loud fans.'
  },
  { 
    id: 'hou', 
    city: 'Houston', 
    country: 'USA', 
    stadium: 'NRG Stadium', 
    matchesCount: 7, 
    lat: 29.6847, 
    lng: -95.4107, 
    image: 'https://images.unsplash.com/photo-1530089711124-9ca31fb9e8c3?auto=format&fit=crop&w=800&q=80',
    capacity: 72220,
    description: 'Climate-controlled venue perfect for Texas heat.'
  },
  { 
    id: 'atl', 
    city: 'Atlanta', 
    country: 'USA', 
    stadium: 'Mercedes-Benz Stadium', 
    matchesCount: 8, 
    lat: 33.7553, 
    lng: -84.4006, 
    image: 'https://images.unsplash.com/photo-1575917649705-5b59aec1ca66?auto=format&fit=crop&w=800&q=80',
    capacity: 75000,
    description: 'Semi-final venue with stunning architecture and retractable roof.'
  },
  { 
    id: 'la', 
    city: 'Los Angeles', 
    country: 'USA', 
    stadium: 'SoFi Stadium', 
    matchesCount: 8, 
    lat: 33.9535, 
    lng: -118.3392, 
    image: 'https://images.unsplash.com/photo-1515895309268-51739c323de0?auto=format&fit=crop&w=800&q=80',
    capacity: 70000,
    description: 'Ultra-modern stadium home to Rams and Chargers. Quarter-final venue.'
  },
  { 
    id: 'phi', 
    city: 'Philadelphia', 
    country: 'USA', 
    stadium: 'Lincoln Financial Field', 
    matchesCount: 6, 
    lat: 39.9012, 
    lng: -75.1675, 
    image: 'https://images.unsplash.com/photo-1569931307044-846114a72d5b?auto=format&fit=crop&w=800&q=80',
    capacity: 69280,
    description: 'Historic stadium in the heart of Philadelphia.'
  },
  { 
    id: 'sea', 
    city: 'Seattle', 
    country: 'USA', 
    stadium: 'Lumen Field', 
    matchesCount: 6, 
    lat: 47.5952, 
    lng: -122.3316, 
    image: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?auto=format&fit=crop&w=800&q=80',
    capacity: 69000,
    description: 'Soccer-crazed city with passionate Sounders fans.'
  },
  { 
    id: 'sf', 
    city: 'San Francisco Bay Area', 
    country: 'USA', 
    stadium: 'Levi\'s Stadium', 
    matchesCount: 6, 
    lat: 37.4033, 
    lng: -121.9694, 
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    capacity: 68500,
    description: 'Tech-forward stadium in the heart of Silicon Valley.'
  },
  { 
    id: 'bos', 
    city: 'Boston', 
    country: 'USA', 
    stadium: 'Gillette Stadium', 
    matchesCount: 7, 
    lat: 42.0909, 
    lng: -71.2643, 
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80',
    capacity: 65878,
    description: 'Quarter-final venue. Home of Patriots, hosting World Cup matches in Foxborough.'
  },
  { 
    id: 'mia', 
    city: 'Miami', 
    country: 'USA', 
    stadium: 'Hard Rock Stadium', 
    matchesCount: 7, 
    lat: 25.9581, 
    lng: -80.2389, 
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80',
    capacity: 64767,
    description: 'Third-place match venue. Beach vibes meet world-class football.'
  },
  { 
    id: 'mex', 
    city: 'Mexico City', 
    country: 'Mexico', 
    stadium: 'Estadio Azteca', 
    matchesCount: 5, 
    lat: 19.3031, 
    lng: -99.1505, 
    image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=80',
    capacity: 87523,
    elevation: 2240,
    description: 'Historic stadium. Hosted 1970 and 1986 finals. Opening match venue.'
  },
  { 
    id: 'mon', 
    city: 'Monterrey', 
    country: 'Mexico', 
    stadium: 'Estadio BBVA', 
    matchesCount: 4, 
    lat: 25.6685, 
    lng: -100.2443, 
    image: 'https://images.unsplash.com/photo-1588613437175-f09df9510e14?auto=format&fit=crop&w=800&q=80',
    capacity: 53400,
    description: 'Modern stadium in Mexico\'s industrial capital.'
  },
  { 
    id: 'gua', 
    city: 'Guadalajara', 
    country: 'Mexico', 
    stadium: 'Estadio Akron', 
    matchesCount: 4, 
    lat: 20.6811, 
    lng: -103.4627, 
    image: 'https://images.unsplash.com/photo-1599385553648-28340d1279a0?auto=format&fit=crop&w=800&q=80',
    capacity: 49600,
    description: 'Home of Chivas. One of Mexico\'s most iconic stadiums.'
  },
  { 
    id: 'tor', 
    city: 'Toronto', 
    country: 'Canada', 
    stadium: 'BMO Field', 
    matchesCount: 6, 
    lat: 43.6332, 
    lng: -79.4186, 
    image: 'https://images.unsplash.com/photo-1503506191283-195a857f012f?auto=format&fit=crop&w=800&q=80',
    capacity: 45736,
    description: 'Canada\'s first major World Cup match venue.'
  },
  { 
    id: 'van', 
    city: 'Vancouver', 
    country: 'Canada', 
    stadium: 'BC Place', 
    matchesCount: 7, 
    lat: 49.2767, 
    lng: -123.1119, 
    image: 'https://images.unsplash.com/photo-1560814304-4f05b62af116?auto=format&fit=crop&w=800&q=80',
    capacity: 54500,
    description: 'Stadium with retractable roof in beautiful British Columbia.'
  },
];

export const getVenueById = (id: string): Venue | undefined => {
  return venues.find(v => v.id === id);
};

export const getVenuesByCountry = (country: 'USA' | 'Mexico' | 'Canada'): Venue[] => {
  return venues.filter(v => v.country === country);
};
