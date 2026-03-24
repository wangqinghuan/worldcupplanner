export interface PlayoffInfo {
  path: string;
  group: string;
  semiFinalists: string[];
  seededTeam?: string;
  finalDate: string;
}

export const playoffTeams: Record<string, PlayoffInfo> = {
  'UEFA Playoff A Winner': {
    path: 'UEFA Playoff A',
    group: 'Group B (Canada, Switzerland, Qatar)',
    semiFinalists: ['Italy', 'Wales', 'Bosnia', 'Northern Ireland'],
    finalDate: 'March 31',
  },
  'UEFA Playoff B Winner': {
    path: 'UEFA Playoff B',
    group: 'Group F (Netherlands, Japan, Tunisia)',
    semiFinalists: ['Ukraine', 'Poland', 'Sweden', 'Albania'],
    finalDate: 'March 31',
  },
  'UEFA Playoff C Winner': {
    path: 'UEFA Playoff C',
    group: 'Group D (USA, Paraguay, Australia)',
    semiFinalists: ['Turkey', 'Romania', 'Slovakia', 'Kosovo'],
    finalDate: 'March 31',
  },
  'UEFA Playoff D Winner': {
    path: 'UEFA Playoff D',
    group: 'Group A (Mexico, South Africa, South Korea)',
    semiFinalists: ['Denmark', 'Czechia', 'Ireland', 'North Macedonia'],
    finalDate: 'March 31',
  },
  'Intercontinental Playoff 1 Winner': {
    path: 'Intercontinental Playoff 1',
    group: 'Group K (Portugal, Uzbekistan, Colombia)',
    semiFinalists: ['Jamaica', 'New Caledonia'],
    seededTeam: 'DR Congo',
    finalDate: 'March 31',
  },
  'Intercontinental Playoff 2 Winner': {
    path: 'Intercontinental Playoff 2',
    group: 'Group I (France, Senegal, Norway)',
    semiFinalists: ['Bolivia', 'Suriname'],
    seededTeam: 'Iraq',
    finalDate: 'March 31',
  },
};

export const getPlayoffInfo = (teamName: string): PlayoffInfo | null => {
  return playoffTeams[teamName] || null;
};

export const isPlayoffTeam = (teamName: string): boolean => {
  return teamName.includes('Playoff') && teamName.includes('Winner');
};
