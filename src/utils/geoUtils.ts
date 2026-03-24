import type { Match } from '../data/matches';
import type { Venue } from '../data/venues';

export interface Location {
  lat: number;
  lng: number;
}

export const calculateDistance = (loc1: Location, loc2: Location): number => {
  const R = 6371;
  const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
  const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

export const checkConflict = (m1: Match, m2: Match, v1: Venue, v2: Venue) => {
  if (!m1 || !m2 || !v1 || !v2) return null;
  
  // Sort by date
  const [first, second] = [m1, m2].sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime());
  const [vFirst, vSecond] = first === m1 ? [v1, v2] : [v2, v1];

  const time1 = new Date(first.date + 'T' + first.time).getTime();
  const time2 = new Date(second.date + 'T' + second.time).getTime();
  const diffHours = (time2 - time1) / (1000 * 60 * 60);
  
  const distance = calculateDistance({ lat: vFirst.lat, lng: vFirst.lng }, { lat: vSecond.lat, lng: vSecond.lng });
  
  // Assume a match lasts 2 hours, plus 3 hours for airport, plus flight time (approx 800km/h)
  const requiredTravelTime = 2 + 3 + (distance / 800);

  if (diffHours < requiredTravelTime) {
    return {
      severity: 'error',
      message: `Travel conflict: ${first.homeTeam} vs ${second.homeTeam}. Only ${Math.round(diffHours)}h available, but need ~${Math.round(requiredTravelTime)}h for travel.`,
      distance
    };
  }
  
  return { severity: 'ok', distance };
};

export const formatKmToMiles = (km: number) => Math.round(km * 0.621371);

export const REAL_CITY_DISTANCES: Record<string, Record<string, number>> = {
  'New York/New Jersey': {
    'Dallas': 2210,
    'Kansas City': 1780,
    'Houston': 2280,
    'Atlanta': 1220,
    'Los Angeles': 3980,
    'Philadelphia': 150,
    'Seattle': 3900,
    'San Francisco Bay Area': 4100,
    'Boston': 340,
    'Miami': 2130,
    'Mexico City': 3380,
    'Monterrey': 2320,
    'Guadalajara': 2760,
    'Toronto': 560,
    'Vancouver': 4000,
  },
  'Dallas': {
    'New York/New Jersey': 2210,
    'Kansas City': 740,
    'Houston': 360,
    'Atlanta': 1170,
    'Los Angeles': 1990,
    'Philadelphia': 2100,
    'Seattle': 2680,
    'San Francisco Bay Area': 2390,
    'Boston': 2500,
    'Miami': 1780,
    'Mexico City': 1510,
    'Monterrey': 930,
    'Guadalajara': 1660,
    'Toronto': 2080,
    'Vancouver': 2820,
  },
  'Kansas City': {
    'New York/New Jersey': 1780,
    'Dallas': 740,
    'Houston': 1040,
    'Atlanta': 1120,
    'Los Angeles': 2290,
    'Philadelphia': 1680,
    'Seattle': 2490,
    'San Francisco Bay Area': 2390,
    'Boston': 2030,
    'Miami': 1960,
    'Mexico City': 2080,
    'Monterrey': 1760,
    'Guadalajara': 2230,
    'Toronto': 1340,
    'Vancouver': 2580,
  },
  'Houston': {
    'New York/New Jersey': 2280,
    'Dallas': 360,
    'Kansas City': 1040,
    'Atlanta': 1120,
    'Los Angeles': 2210,
    'Philadelphia': 2170,
    'Seattle': 2890,
    'San Francisco Bay Area': 2630,
    'Boston': 2580,
    'Miami': 1540,
    'Mexico City': 1280,
    'Monterrey': 690,
    'Guadalajara': 1450,
    'Toronto': 2280,
    'Vancouver': 3070,
  },
  'Atlanta': {
    'New York/New Jersey': 1220,
    'Dallas': 1170,
    'Kansas City': 1120,
    'Houston': 1120,
    'Los Angeles': 3130,
    'Philadelphia': 1130,
    'Seattle': 3500,
    'San Francisco Bay Area': 3390,
    'Boston': 1520,
    'Miami': 660,
    'Mexico City': 2410,
    'Monterrey': 1880,
    'Guadalajara': 2370,
    'Toronto': 1240,
    'Vancouver': 3620,
  },
  'Los Angeles': {
    'New York/New Jersey': 3980,
    'Dallas': 1990,
    'Kansas City': 2290,
    'Houston': 2210,
    'Atlanta': 3130,
    'Philadelphia': 3900,
    'Seattle': 1790,
    'San Francisco Bay Area': 550,
    'Boston': 4200,
    'Miami': 3760,
    'Mexico City': 2500,
    'Monterrey': 1880,
    'Guadalajara': 2210,
    'Toronto': 3500,
    'Vancouver': 2180,
  },
  'Philadelphia': {
    'New York/New Jersey': 150,
    'Dallas': 2100,
    'Kansas City': 1680,
    'Houston': 2170,
    'Atlanta': 1130,
    'Los Angeles': 3900,
    'Seattle': 3800,
    'San Francisco Bay Area': 4020,
    'Boston': 450,
    'Miami': 1960,
    'Mexico City': 3250,
    'Monterrey': 2700,
    'Guadalajara': 3220,
    'Toronto': 520,
    'Vancouver': 3900,
  },
  'Seattle': {
    'New York/New Jersey': 3900,
    'Dallas': 2680,
    'Kansas City': 2490,
    'Houston': 2890,
    'Atlanta': 3500,
    'Los Angeles': 1790,
    'Philadelphia': 3800,
    'San Francisco Bay Area': 1100,
    'Boston': 4000,
    'Miami': 4400,
    'Mexico City': 3560,
    'Monterrey': 3150,
    'Guadalajara': 3530,
    'Toronto': 2700,
    'Vancouver': 230,
  },
  'San Francisco Bay Area': {
    'New York/New Jersey': 4100,
    'Dallas': 2390,
    'Kansas City': 2390,
    'Houston': 2630,
    'Atlanta': 3390,
    'Los Angeles': 550,
    'Philadelphia': 4020,
    'Seattle': 1100,
    'Boston': 4300,
    'Miami': 4010,
    'Mexico City': 2920,
    'Monterrey': 2480,
    'Guadalajara': 2840,
    'Toronto': 3500,
    'Vancouver': 1290,
  },
  'Boston': {
    'New York/New Jersey': 340,
    'Dallas': 2500,
    'Kansas City': 2030,
    'Houston': 2580,
    'Atlanta': 1520,
    'Los Angeles': 4200,
    'Philadelphia': 450,
    'Seattle': 4000,
    'San Francisco Bay Area': 4300,
    'Miami': 2280,
    'Mexico City': 3570,
    'Monterrey': 2950,
    'Guadalajara': 3520,
    'Toronto': 700,
    'Vancouver': 4100,
  },
  'Miami': {
    'New York/New Jersey': 2130,
    'Dallas': 1780,
    'Kansas City': 1960,
    'Houston': 1540,
    'Atlanta': 660,
    'Los Angeles': 3760,
    'Philadelphia': 1960,
    'Seattle': 4400,
    'San Francisco Bay Area': 4010,
    'Boston': 2280,
    'Mexico City': 2050,
    'Monterrey': 1700,
    'Guadalajara': 2170,
    'Toronto': 2400,
    'Vancouver': 4530,
  },
  'Mexico City': {
    'New York/New Jersey': 3380,
    'Dallas': 1510,
    'Kansas City': 2080,
    'Houston': 1280,
    'Atlanta': 2410,
    'Los Angeles': 2500,
    'Philadelphia': 3250,
    'Seattle': 3560,
    'San Francisco Bay Area': 2920,
    'Boston': 3570,
    'Miami': 2050,
    'Monterrey': 810,
    'Guadalajara': 540,
    'Toronto': 3310,
    'Vancouver': 3820,
  },
  'Monterrey': {
    'New York/New Jersey': 2320,
    'Dallas': 930,
    'Kansas City': 1760,
    'Houston': 690,
    'Atlanta': 1880,
    'Los Angeles': 1880,
    'Philadelphia': 2700,
    'Seattle': 3150,
    'San Francisco Bay Area': 2480,
    'Boston': 2950,
    'Miami': 1700,
    'Mexico City': 810,
    'Guadalajara': 740,
    'Toronto': 2910,
    'Vancouver': 3460,
  },
  'Guadalajara': {
    'New York/New Jersey': 2760,
    'Dallas': 1660,
    'Kansas City': 2230,
    'Houston': 1450,
    'Atlanta': 2370,
    'Los Angeles': 2210,
    'Philadelphia': 3220,
    'Seattle': 3530,
    'San Francisco Bay Area': 2840,
    'Boston': 3520,
    'Miami': 2170,
    'Mexico City': 540,
    'Monterrey': 740,
    'Toronto': 3360,
    'Vancouver': 3790,
  },
  'Toronto': {
    'New York/New Jersey': 560,
    'Dallas': 2080,
    'Kansas City': 1340,
    'Houston': 2280,
    'Atlanta': 1240,
    'Los Angeles': 3500,
    'Philadelphia': 520,
    'Seattle': 2700,
    'San Francisco Bay Area': 3500,
    'Boston': 700,
    'Miami': 2400,
    'Mexico City': 3310,
    'Monterrey': 2910,
    'Guadalajara': 3360,
    'Vancouver': 3100,
  },
  'Vancouver': {
    'New York/New Jersey': 4000,
    'Dallas': 2820,
    'Kansas City': 2580,
    'Houston': 3070,
    'Atlanta': 3620,
    'Los Angeles': 2180,
    'Philadelphia': 3900,
    'Seattle': 230,
    'San Francisco Bay Area': 1290,
    'Boston': 4100,
    'Miami': 4530,
    'Mexico City': 3820,
    'Monterrey': 3460,
    'Guadalajara': 3790,
    'Toronto': 3100,
  },
};
