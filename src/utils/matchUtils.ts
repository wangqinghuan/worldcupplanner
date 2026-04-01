import { matches } from '../data/matches';

export const getMatchesByTeam = (teamName: string): typeof matches => {
  return matches.filter(m => 
    m.homeTeam.toLowerCase() === teamName.toLowerCase() || 
    m.awayTeam.toLowerCase() === teamName.toLowerCase()
  );
};

export const getMatchesByCity = (cityName: string): typeof matches => {
  return matches.filter(m => m.city === cityName);
};

export const getMatchIdsFromMatches = (matchesData: typeof matches): number[] => {
  return matchesData.map(m => m.id);
};

export const getTeamNameFromId = (teamId: string): string => {
  const mapping: Record<string, string> = {
    'argentina': 'Argentina',
    'brazil': 'Brazil',
    'france': 'France',
    'england': 'England',
    'germany': 'Germany',
    'spain': 'Spain',
    'portugal': 'Portugal',
    'usa': 'United States',
    'mexico': 'Mexico',
    'canada': 'Canada'
  };
  return mapping[teamId] || teamId;
};
