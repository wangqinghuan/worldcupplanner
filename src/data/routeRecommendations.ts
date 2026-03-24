import { venues } from './venues';
import { matches } from './matches';
import { calculateDistance } from '../utils/geoUtils';

export interface RouteRecommendation {
  id: string;
  name: string;
  nameCn: string;
  description: string;
  teams: string[];
  venues: string[];
  cities: string[];
  matchCount: number;
  totalDistance: number;
  transportMode: 'flight' | 'mixed' | 'drive';
  budget: '$' | '$$' | '$$$';
  reasons: string[];
  matchIds: number[];
  recommended: boolean;
  priority: number;
}

const POPULAR_TEAMS = [
  'Brazil', 'Argentina', 'France', 'Germany', 
  'England', 'Spain', 'Portugal', 'Netherlands',
  'United States', 'Mexico'
];

export const teamRoutes: Record<string, string[]> = {
  'Brazil': ['nyc', 'phi', 'mia'],
  'Argentina': ['kc', 'dal'],
  'France': ['nyc', 'phi', 'bos'],
  'Germany': ['hou', 'tor', 'nyc'],
  'England': ['dal', 'bos', 'nyc'],
  'Spain': ['atl', 'gua'],
  'Portugal': ['hou', 'mia'],
  'Netherlands': ['dal', 'hou', 'kc'],
  'United States': ['la', 'sea'],
  'Mexico': ['mex', 'gua'],
  'Canada': ['tor', 'van'],
};

const CITY_DISTANCE_MATRIX: Record<string, number> = {
  'nyc-bos': 306,
  'nyc-phi': 150,
  'nyc-atl': 1200,
  'nyc-mia': 2060,
  'bos-phi': 440,
  'bos-atl': 1520,
  'phi-atl': 1170,
  'atl-mia': 660,
  'dal-hou': 385,
  'dal-kc': 805,
  'hou-kc': 1140,
  'sea-sf': 1090,
  'sf-la': 550,
  'sea-la': 1135,
  'van-sea': 230,
  'mex-gua': 545,
  'mex-mon': 900,
  'gua-mon': 755,
  'tor-van': 3350,
  'tor-nyc': 560,
  'tor-bos': 680,
};

const getDistance = (from: string, to: string): number => {
  const key1 = `${from}-${to}`;
  const key2 = `${to}-${from}`;
  if (CITY_DISTANCE_MATRIX[key1]) return CITY_DISTANCE_MATRIX[key1];
  if (CITY_DISTANCE_MATRIX[key2]) return CITY_DISTANCE_MATRIX[key2];
  
  const v1 = venues.find(v => v.id === from);
  const v2 = venues.find(v => v.id === to);
  if (v1 && v2) {
    return calculateDistance({ lat: v1.lat, lng: v1.lng }, { lat: v2.lat, lng: v2.lng });
  }
  return 1000;
};

const calculateRouteDistance = (venueIds: string[]): number => {
  let total = 0;
  for (let i = 0; i < venueIds.length - 1; i++) {
    total += getDistance(venueIds[i], venueIds[i + 1]);
  }
  return total;
};

const getTransportMode = (distance: number, venueCount: number): 'flight' | 'mixed' | 'drive' => {
  if (distance < 500 && venueCount <= 2) return 'drive';
  if (distance < 1500) return 'mixed';
  return 'flight';
};

const generateReasons = (
  venueIds: string[], 
  teamNames: string[],
  distance: number,
  transport: 'flight' | 'mixed' | 'drive'
): string[] => {
  const reasons: string[] = [];
  
  if (teamNames.length > 0) {
    reasons.push(`Follow ${teamNames[0]}'s complete journey`);
  }
  
  if (venueIds.includes('nyc')) {
    reasons.push('Includes NYC - Final venue');
  }
  
  if (venueIds.includes('mex')) {
    reasons.push('Historic Estadio Azteca');
  }
  
  if (transport === 'drive') {
    reasons.push('Compact cities - drivable');
  } else if (transport === 'mixed') {
    reasons.push('Convenient transport between cities');
  }
  
  if (distance < 1000) {
    reasons.push('Short total distance - saves time');
  }
  
  if (venueIds.includes('bos') || venueIds.includes('nyc') || venueIds.includes('phi')) {
    reasons.push('Northeast corridor classic');
  }
  
  if (venueIds.includes('dal') || venueIds.includes('hou') || venueIds.includes('kc')) {
    reasons.push('Texas - top teams concentrated');
  }
  
  if (venueIds.includes('sea') || venueIds.includes('sf') || venueIds.includes('la')) {
    reasons.push('West Coast - stunning views');
  }
  
  return reasons.slice(0, 4);
};

const getBudgetLevel = (venueIds: string[]): '$' | '$$' | '$$$' => {
  const expensiveCities = ['nyc', 'la', 'mia', 'sf'];
  const cheapCities = ['kc', 'dal', 'hou', 'gua', 'mon'];
  
  const expCount = venueIds.filter(id => expensiveCities.includes(id)).length;
  const cheapCount = venueIds.filter(id => cheapCities.includes(id)).length;
  
  if (expCount >= 2) return '$$$';
  if (cheapCount >= 2) return '$';
  return '$$';
};

export const getPopularTeams = (): string[] => POPULAR_TEAMS;

export const getTeamMatches = (team: string): number[] => {
  return matches
    .filter(m => m.homeTeam === team || m.awayTeam === team)
    .map(m => m.id);
};

export const getTeamVenues = (team: string): string[] => {
  const venueIds = [...new Set(
    matches
      .filter(m => m.homeTeam === team || m.awayTeam === team)
      .map(m => m.venueId)
  )];
  if (venueIds.length <= 2) return venueIds;
  if (venueIds.length === 3 && venueIds.includes('nyc')) {
    return ['dal', 'hou', 'kc'];
  }
  return venueIds;
};

const getMatchDate = (matchId: number): Date => {
  const match = matches.find(m => m.id === matchId);
  if (!match) return new Date('2030-01-01');
  return new Date(`${match.date}T${match.time}`);
};

const sortMatchesByDate = (matchIds: number[]): number[] => {
  return [...matchIds].sort((a, b) => getMatchDate(a).getTime() - getMatchDate(b).getTime());
};

const sortVenuesByMatchOrder = (venueIds: string[], matchIds: number[]): string[] => {
  const venueOrder: Record<string, number> = {};
  matchIds.forEach(id => {
    const match = matches.find(m => m.id === id);
    if (match) {
      const order = matchIds.indexOf(id);
      if (venueOrder[match.venueId] === undefined) {
        venueOrder[match.venueId] = order;
      }
    }
  });
  
  return [...venueIds].sort((a, b) => 
    (venueOrder[a] || 999) - (venueOrder[b] || 999)
  );
};

export const generateRecommendations = (
  matchCount: number = 3,
  teamFilter: string = '',
  preference: 'balanced' | 'shortest' | 'teams' | 'budget' = 'balanced'
): RouteRecommendation[] => {
  const recommendations: RouteRecommendation[] = [];
  
  if (teamFilter) {
    const teamVenues = getTeamVenues(teamFilter);
    const allTeamMatches = sortMatchesByDate(getTeamMatches(teamFilter));
    
    if (teamVenues.length > 0) {
      const sortedVenues = sortVenuesByMatchOrder(teamVenues, allTeamMatches);
      
      recommendations.push({
        id: `team-${teamFilter.toLowerCase().replace(' ', '-')}`,
        name: `${teamFilter} Fan Route`,
        nameCn: `${teamFilter} Fan Route`,
        description: `Follow ${teamFilter}'s complete World Cup journey`,
        teams: [teamFilter],
        venues: sortedVenues,
        cities: sortedVenues.map(id => venues.find(v => v.id === id)?.city || ''),
        matchCount: allTeamMatches.length,
        totalDistance: calculateRouteDistance(sortedVenues),
        transportMode: getTransportMode(calculateRouteDistance(sortedVenues), sortedVenues.length),
        budget: getBudgetLevel(sortedVenues),
        reasons: generateReasons(sortedVenues, [teamFilter], calculateRouteDistance(sortedVenues), getTransportMode(calculateRouteDistance(sortedVenues), sortedVenues.length)),
        matchIds: allTeamMatches.slice(0, matchCount),
        recommended: true,
        priority: 1
      });
    }
    
    if (preference === 'shortest') {
      recommendations.sort((a, b) => a.totalDistance - b.totalDistance);
    } else if (preference === 'budget') {
      recommendations.sort((a, b) => {
        const order = { '$': 0, '$$': 1, '$$$': 2 };
        return order[a.budget] - order[b.budget];
      });
    }
    
    return recommendations;
  }
  
  const presetRoutes = [
    { 
      venues: ['dal', 'hou', 'kc'], 
      name: 'South-Central Powerhouse', 
      nameCn: 'South-Central Powerhouse',
      description: 'Features Argentina, Portugal, Germany, England, Netherlands'
    },
    { 
      venues: ['nyc', 'phi', 'bos'], 
      name: 'Northeast Corridor', 
      nameCn: 'Northeast Corridor',
      description: 'Features Brazil, France, England, Germany + Final venue'
    },
    { 
      venues: ['mex', 'gua', 'mon'], 
      name: 'Mexico Fiesta', 
      nameCn: 'Mexico Fiesta',
      description: 'Most affordable - includes Opening Match'
    },
    { 
      venues: ['la', 'sf'], 
      name: 'California Dream', 
      nameCn: 'California Dream',
      description: 'Sunshine, beaches, tech culture'
    },
    { 
      venues: ['van', 'sea'], 
      name: 'Pacific Northwest', 
      nameCn: 'Pacific Northwest',
      description: 'Natural beauty, Canadian vibes'
    },
    { 
      venues: ['atl', 'mia'], 
      name: 'Southeast Sun', 
      nameCn: 'Southeast Sun',
      description: 'Sunny coast, Cuban/Caribbean culture'
    },
  ];
  
  presetRoutes.forEach((route, index) => {
    const allRouteMatches = matches
      .filter(m => route.venues.includes(m.venueId))
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
    
    const routeMatchIds = allRouteMatches.slice(0, matchCount).map(m => m.id);
    
    const actualTeams = [...new Set(
      matches
        .filter(m => route.venues.includes(m.venueId))
        .flatMap(m => [m.homeTeam, m.awayTeam])
        .filter(t => !t.startsWith('Group') && !t.startsWith('UEFA') && !t.startsWith('FIFA') && !t.startsWith('Winner'))
    )].slice(0, 5);
    
    const distance = calculateRouteDistance(route.venues);
    const transport = getTransportMode(distance, route.venues.length);
    
    recommendations.push({
      id: `route-${index + 1}`,
      name: route.name,
      nameCn: route.nameCn,
      description: route.description || route.venues.map(id => venues.find(v => v.id === id)?.city).join(' → '),
      teams: actualTeams,
      venues: route.venues,
      cities: route.venues.map(id => venues.find(v => v.id === id)?.city || ''),
      matchCount: allRouteMatches.length,
      totalDistance: distance,
      transportMode: transport,
      budget: getBudgetLevel(route.venues),
      reasons: generateReasons(route.venues, actualTeams, distance, transport),
      matchIds: routeMatchIds,
      recommended: index < 3,
      priority: index + 2
    });
  });
  
  if (preference === 'shortest') {
    recommendations.sort((a, b) => a.totalDistance - b.totalDistance);
  } else if (preference === 'budget') {
    recommendations.sort((a, b) => {
      const order = { '$': 0, '$$': 1, '$$$': 2 };
      return order[a.budget] - order[b.budget];
    });
  } else if (preference === 'teams' && !teamFilter) {
    recommendations.sort((a, b) => b.teams.length - a.teams.length);
  }
  
  return recommendations;
};

export const getMatchDetails = (matchId: number) => {
  return matches.find(m => m.id === matchId);
};

export const getVenuesForRoute = (venueIds: string[]) => {
  return venueIds.map(id => venues.find(v => v.id === id)).filter(Boolean);
};

export const getTransportInfo = (fromId: string, toId: string) => {
  const distance = getDistance(fromId, toId);
  const flightHours = Math.round(distance / 800 * 10) / 10 + 1;
  const driveHours = Math.round(distance / 100 * 10) / 10;
  
  return {
    distance,
    flightHours,
    driveHours,
    flightNote: distance > 500 ? `${flightHours}h flight` : null,
    driveNote: distance < 1000 ? `${driveHours}h drive` : null,
  };
};
