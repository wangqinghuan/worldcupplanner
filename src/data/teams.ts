export type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';
export type Region = 'Africa' | 'Asia' | 'Europe' | 'North America' | 'Oceania' | 'South America';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  group: Group;
  region: Region;
  fifaRank?: number;
  titles: number;
  qualified: boolean;
}

export interface GroupStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

export const teams: Team[] = [
  { id: 'mex', name: 'Mexico', shortName: 'MEX', flag: '🇲🇽', group: 'A', region: 'North America', fifaRank: 11, titles: 0, qualified: true },
  { id: 'rsa', name: 'South Africa', shortName: 'RSA', flag: '🇿🇦', group: 'A', region: 'Africa', fifaRank: 57, titles: 0, qualified: true },
  { id: 'kor', name: 'South Korea', shortName: 'KOR', flag: '🇰🇷', group: 'A', region: 'Asia', fifaRank: 24, titles: 0, qualified: true },
  { id: 'playoff-d', name: 'UEFA Playoff D Winner', shortName: 'POD', flag: '🏆', group: 'A', region: 'Europe', titles: 0, qualified: false },
  
  { id: 'can', name: 'Canada', shortName: 'CAN', flag: '🇨🇦', group: 'B', region: 'North America', fifaRank: 35, titles: 0, qualified: true },
  { id: 'sui', name: 'Switzerland', shortName: 'SUI', flag: '🇨🇭', group: 'B', region: 'Europe', fifaRank: 15, titles: 0, qualified: true },
  { id: 'qat', name: 'Qatar', shortName: 'QAT', flag: '🇶🇦', group: 'B', region: 'Asia', fifaRank: 58, titles: 0, qualified: true },
  { id: 'playoff-a', name: 'UEFA Playoff A Winner', shortName: 'POA', flag: '🏆', group: 'B', region: 'Europe', titles: 0, qualified: false },
  
  { id: 'bra', name: 'Brazil', shortName: 'BRA', flag: '🇧🇷', group: 'C', region: 'South America', fifaRank: 5, titles: 5, qualified: true },
  { id: 'mar', name: 'Morocco', shortName: 'MAR', flag: '🇲🇦', group: 'C', region: 'Africa', fifaRank: 13, titles: 0, qualified: true },
  { id: 'hai', name: 'Haiti', shortName: 'HAI', flag: '🇭🇹', group: 'C', region: 'North America', fifaRank: 89, titles: 0, qualified: true },
  { id: 'sco', name: 'Scotland', shortName: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C', region: 'Europe', fifaRank: 45, titles: 0, qualified: true },
  
  { id: 'usa', name: 'United States', shortName: 'USA', flag: '🇺🇸', group: 'D', region: 'North America', fifaRank: 11, titles: 0, qualified: true },
  { id: 'par', name: 'Paraguay', shortName: 'PAR', flag: '🇵🇾', group: 'D', region: 'South America', fifaRank: 58, titles: 0, qualified: true },
  { id: 'aus', name: 'Australia', shortName: 'AUS', flag: '🇦🇺', group: 'D', region: 'Asia', fifaRank: 23, titles: 0, qualified: true },
  { id: 'playoff-c', name: 'UEFA Playoff C Winner', shortName: 'POC', flag: '🏆', group: 'D', region: 'Europe', titles: 0, qualified: false },
  
  { id: 'ger', name: 'Germany', shortName: 'GER', flag: '🇩🇪', group: 'E', region: 'Europe', fifaRank: 16, titles: 4, qualified: true },
  { id: 'cuw', name: 'Curacao', shortName: 'CUW', flag: '🇨🇼', group: 'E', region: 'North America', fifaRank: 78, titles: 0, qualified: true },
  { id: 'civ', name: 'Ivory Coast', shortName: 'CIV', flag: '🇨🇮', group: 'E', region: 'Africa', fifaRank: 39, titles: 0, qualified: true },
  { id: 'ecu', name: 'Ecuador', shortName: 'ECU', flag: '🇪🇨', group: 'E', region: 'South America', fifaRank: 30, titles: 0, qualified: true },
  
  { id: 'ned', name: 'Netherlands', shortName: 'NED', flag: '🇳🇱', group: 'F', region: 'Europe', fifaRank: 7, titles: 0, qualified: true },
  { id: 'jpn', name: 'Japan', shortName: 'JPN', flag: '🇯🇵', group: 'F', region: 'Asia', fifaRank: 18, titles: 0, qualified: true },
  { id: 'tun', name: 'Tunisia', shortName: 'TUN', flag: '🇹🇳', group: 'F', region: 'Africa', fifaRank: 41, titles: 0, qualified: true },
  { id: 'playoff-b', name: 'UEFA Playoff B Winner', shortName: 'POB', flag: '🏆', group: 'F', region: 'Europe', titles: 0, qualified: false },
  
  { id: 'bel', name: 'Belgium', shortName: 'BEL', flag: '🇧🇪', group: 'G', region: 'Europe', fifaRank: 3, titles: 0, qualified: true },
  { id: 'egy', name: 'Egypt', shortName: 'EGY', flag: '🇪🇬', group: 'G', region: 'Africa', fifaRank: 36, titles: 0, qualified: true },
  { id: 'irn', name: 'Iran', shortName: 'IRN', flag: '🇮🇷', group: 'G', region: 'Asia', fifaRank: 21, titles: 0, qualified: true },
  { id: 'nzl', name: 'New Zealand', shortName: 'NZL', flag: '🇳🇿', group: 'G', region: 'Oceania', fifaRank: 77, titles: 0, qualified: true },
  
  { id: 'esp', name: 'Spain', shortName: 'ESP', flag: '🇪🇸', group: 'H', region: 'Europe', fifaRank: 8, titles: 1, qualified: true },
  { id: 'uru', name: 'Uruguay', shortName: 'URU', flag: '🇺🇾', group: 'H', region: 'South America', fifaRank: 14, titles: 2, qualified: true },
  { id: 'ksa', name: 'Saudi Arabia', shortName: 'KSA', flag: '🇸🇦', group: 'H', region: 'Asia', fifaRank: 56, titles: 0, qualified: true },
  { id: 'cpv', name: 'Cape Verde', shortName: 'CPV', flag: '🇨🇻', group: 'H', region: 'Africa', fifaRank: 80, titles: 0, qualified: true },
  
  { id: 'fra', name: 'France', shortName: 'FRA', flag: '🇫🇷', group: 'I', region: 'Europe', fifaRank: 2, titles: 2, qualified: true },
  { id: 'sen', name: 'Senegal', shortName: 'SEN', flag: '🇸🇳', group: 'I', region: 'Africa', fifaRank: 20, titles: 0, qualified: true },
  { id: 'nor', name: 'Norway', shortName: 'NOR', flag: '🇳🇴', group: 'I', region: 'Europe', fifaRank: 47, titles: 0, qualified: true },
  { id: 'playoff-2', name: 'Intercontinental Playoff 2 Winner', shortName: 'IC2', flag: '🏆', group: 'I', region: 'Asia', titles: 0, qualified: false },
  
  { id: 'arg', name: 'Argentina', shortName: 'ARG', flag: '🇦🇷', group: 'J', region: 'South America', fifaRank: 1, titles: 3, qualified: true },
  { id: 'aut', name: 'Austria', shortName: 'AUT', flag: '🇦🇹', group: 'J', region: 'Europe', fifaRank: 25, titles: 0, qualified: true },
  { id: 'alg', name: 'Algeria', shortName: 'ALG', flag: '🇩🇿', group: 'J', region: 'Africa', fifaRank: 32, titles: 0, qualified: true },
  { id: 'jor', name: 'Jordan', shortName: 'JOR', flag: '🇯🇴', group: 'J', region: 'Asia', fifaRank: 70, titles: 0, qualified: true },
  
  { id: 'por', name: 'Portugal', shortName: 'POR', flag: '🇵🇹', group: 'K', region: 'Europe', fifaRank: 6, titles: 0, qualified: true },
  { id: 'col', name: 'Colombia', shortName: 'COL', flag: '🇨🇴', group: 'K', region: 'South America', fifaRank: 12, titles: 0, qualified: true },
  { id: 'uzb', name: 'Uzbekistan', shortName: 'UZB', flag: '🇺🇿', group: 'K', region: 'Asia', fifaRank: 60, titles: 0, qualified: true },
  { id: 'playoff-1', name: 'Intercontinental Playoff 1 Winner', shortName: 'IC1', flag: '🏆', group: 'K', region: 'Africa', titles: 0, qualified: false },
  
  { id: 'eng', name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L', region: 'Europe', fifaRank: 4, titles: 1, qualified: true },
  { id: 'cro', name: 'Croatia', shortName: 'CRO', flag: '🇭🇷', group: 'L', region: 'Europe', fifaRank: 10, titles: 0, qualified: true },
  { id: 'pan', name: 'Panama', shortName: 'PAN', flag: '🇵🇦', group: 'L', region: 'North America', fifaRank: 34, titles: 0, qualified: true },
  { id: 'gha', name: 'Ghana', shortName: 'GHA', flag: '🇬🇭', group: 'L', region: 'Africa', fifaRank: 60, titles: 0, qualified: true },
];

export const getTeamsByGroup = (group: Group): Team[] => {
  return teams.filter(t => t.group === group);
};

export const getTeamById = (id: string): Team | undefined => {
  return teams.find(t => t.id === id);
};
