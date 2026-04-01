export interface TeamRoute {
  teamId: string;
  teamName: string;
  group: string;
  groupStage: {
    city1: string;
    city2: string;
    city3: string;
    dates: string[];
  };
  knockoutRoutes: {
    ifQualified: string;
    route: {
      stage: string;
      city: string;
      opponent: string;
    }[];
  }[];
}

// 基于 CBS Sports 官方 2026 世界杯淘汰赛 bracket
// https://www.cbssports.com/soccer/news/2026-world-cup-schedule-time-location-groups-bracket-usmnt/

const groupPaths: Record<string, { first: string[]; second: string[] }> = {
  'A': {
    first: ['Mexico City (vs Norway)', 'Mexico City (vs England)', 'Miami (vs Brazil)', 'Atlanta (vs Argentina)', 'New York/New Jersey (vs France)'],
    second: ['Los Angeles (vs Switzerland)', 'Houston (vs Netherlands)', 'Boston (vs France)', 'Dallas (vs Spain)', 'New York/New Jersey (vs France)']
  },
  'B': {
    first: ['Vancouver (vs Ivory Coast)', 'Vancouver (vs Portugal)', 'Kansas City (vs Argentina)', 'Atlanta (vs Brazil)', 'New York/New Jersey (vs France)'],
    second: ['Los Angeles (vs Denmark)', 'Houston (vs Netherlands)', 'Boston (vs France)', 'Dallas (vs Spain)', 'New York/New Jersey (vs France)']
  },
  'C': {
    first: ['Houston (vs Japan)', 'New York/New Jersey (vs Senegal)', 'Miami (vs England)', 'Atlanta (vs Argentina)', 'New York/New Jersey (vs France)'],
    second: ['Monterrey (vs Netherlands)', 'Houston (vs Denmark)', 'Boston (vs France)', 'Dallas (vs Spain)', 'New York/New Jersey (vs France)']
  },
  'D': {
    first: ['San Francisco Bay Area (vs Austria)', 'Seattle (vs Belgium)', 'Los Angeles (vs Spain)', 'Dallas (vs France)', 'New York/New Jersey (vs Argentina)'],
    second: ['Dallas (vs Egypt)', 'Atlanta (vs Argentina)', 'Kansas City (vs Portugal)', 'Atlanta (vs Brazil)', 'New York/New Jersey (vs France)']
  },
  'E': {
    first: ['Boston (vs Scotland)', 'Philadelphia (vs France)', 'Boston (vs Netherlands)', 'Dallas (vs Spain)', 'New York/New Jersey (vs Argentina)'],
    second: ['Dallas (vs Senegal)', 'New York/New Jersey (vs Brazil)', 'Miami (vs England)', 'Atlanta (vs Argentina)', 'New York/New Jersey (vs France)']
  },
  'F': {
    first: ['Monterrey (vs Morocco)', 'Houston (vs Denmark)', 'Boston (vs France)', 'Dallas (vs Spain)', 'New York/New Jersey (vs Argentina)'],
    second: ['Houston (vs Brazil)', 'New York/New Jersey (vs Senegal)', 'Miami (vs England)', 'Atlanta (vs Argentina)', 'New York/New Jersey (vs France)']
  },
  'G': {
    first: ['Seattle (vs Algeria)', 'Seattle (vs USA)', 'Los Angeles (vs Spain)', 'Dallas (vs France)', 'New York/New Jersey (vs Argentina)'],
    second: ['Dallas (vs Turkey)', 'Atlanta (vs Argentina)', 'Kansas City (vs Portugal)', 'Atlanta (vs Brazil)', 'New York/New Jersey (vs France)']
  },
  'H': {
    first: ['Los Angeles (vs Austria)', 'Dallas (vs Croatia)', 'Los Angeles (vs Belgium)', 'Dallas (vs France)', 'New York/New Jersey (vs Argentina)'],
    second: ['Miami (vs Argentina)', 'Atlanta (vs Turkey)', 'Kansas City (vs Portugal)', 'Atlanta (vs Brazil)', 'New York/New Jersey (vs France)']
  },
  'I': {
    first: ['New York/New Jersey (vs Australia)', 'Philadelphia (vs Germany)', 'Boston (vs Netherlands)', 'Dallas (vs Spain)', 'New York/New Jersey (vs Argentina)'],
    second: ['Dallas (vs Ecuador)', 'New York/New Jersey (vs Brazil)', 'Miami (vs England)', 'Atlanta (vs Argentina)', 'New York/New Jersey (vs France)']
  },
  'J': {
    first: ['Miami (vs Uruguay)', 'Atlanta (vs Turkey)', 'Kansas City (vs Portugal)', 'Atlanta (vs Brazil)', 'New York/New Jersey (vs France)'],
    second: ['Los Angeles (vs Spain)', 'Dallas (vs Croatia)', 'Los Angeles (vs Belgium)', 'Dallas (vs France)', 'New York/New Jersey (vs Argentina)']
  },
  'K': {
    first: ['Kansas City (vs Paraguay)', 'Vancouver (vs Italy)', 'Kansas City (vs Argentina)', 'Atlanta (vs Brazil)', 'New York/New Jersey (vs France)'],
    second: ['Toronto (vs Croatia)', 'Dallas (vs Spain)', 'Los Angeles (vs Belgium)', 'Dallas (vs France)', 'New York/New Jersey (vs Argentina)']
  },
  'L': {
    first: ['Atlanta (vs Saudi Arabia)', 'Mexico City (vs Mexico)', 'Miami (vs Brazil)', 'Atlanta (vs Argentina)', 'New York/New Jersey (vs France)'],
    second: ['Toronto (vs Colombia)', 'Dallas (vs Spain)', 'Los Angeles (vs Belgium)', 'Dallas (vs France)', 'New York/New Jersey (vs Argentina)']
  }
};

const knockoutStages = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'];

const parseCityAndOpponent = (str: string): { city: string; opponent: string } => {
  const match = str.match(/^(.+?)\s*\(vs (.+?)\)$/);
  if (match) {
    return { city: match[1], opponent: match[2] };
  }
  return { city: str, opponent: 'TBD' };
};

const createKnockoutRoutes = (group: string) => {
  const routes = groupPaths[group];
  if (!routes) return [];

  const createRoute = (path: string[]) => {
    return path.map((item, idx) => {
      const { city, opponent } = parseCityAndOpponent(item);
      return {
        stage: knockoutStages[idx],
        city,
        opponent
      };
    });
  };

  return [
    { ifQualified: 'If 1st in group (Winner)', route: createRoute(routes.first) },
    { ifQualified: 'If 2nd in group (Runner-up)', route: createRoute(routes.second) }
  ];
};

export const teamsRouteTree: TeamRoute[] = [
  {
    teamId: 'argentina',
    teamName: 'Argentina',
    group: 'J',
    groupStage: { city1: 'Kansas City', city2: 'Dallas', city3: 'Dallas', dates: ['Jun 16', 'Jun 22', 'Jun 27'] },
    knockoutRoutes: createKnockoutRoutes('J')
  },
  {
    teamId: 'brazil',
    teamName: 'Brazil',
    group: 'C',
    groupStage: { city1: 'New York/New Jersey', city2: 'Philadelphia', city3: 'Miami', dates: ['Jun 13', 'Jun 19', 'Jun 24'] },
    knockoutRoutes: createKnockoutRoutes('C')
  },
  {
    teamId: 'france',
    teamName: 'France',
    group: 'I',
    groupStage: { city1: 'New York/New Jersey', city2: 'Philadelphia', city3: 'Boston', dates: ['Jun 16', 'Jun 22', 'Jun 26'] },
    knockoutRoutes: createKnockoutRoutes('I')
  },
  {
    teamId: 'england',
    teamName: 'England',
    group: 'L',
    groupStage: { city1: 'Dallas', city2: 'Boston', city3: 'New York/New Jersey', dates: ['Jun 17', 'Jun 23', 'Jun 27'] },
    knockoutRoutes: createKnockoutRoutes('L')
  },
  {
    teamId: 'germany',
    teamName: 'Germany',
    group: 'E',
    groupStage: { city1: 'Houston', city2: 'Toronto', city3: 'New York/New Jersey', dates: ['Jun 14', 'Jun 20', 'Jun 25'] },
    knockoutRoutes: createKnockoutRoutes('E')
  },
  {
    teamId: 'spain',
    teamName: 'Spain',
    group: 'H',
    groupStage: { city1: 'Atlanta', city2: 'Atlanta', city3: 'Guadalajara', dates: ['Jun 15', 'Jun 21', 'Jun 26'] },
    knockoutRoutes: createKnockoutRoutes('H')
  },
  {
    teamId: 'portugal',
    teamName: 'Portugal',
    group: 'K',
    groupStage: { city1: 'Houston', city2: 'Houston', city3: 'Miami', dates: ['Jun 17', 'Jun 23', 'Jun 27'] },
    knockoutRoutes: createKnockoutRoutes('K')
  },
  {
    teamId: 'usa',
    teamName: 'United States',
    group: 'D',
    groupStage: { city1: 'Los Angeles', city2: 'Seattle', city3: 'Los Angeles', dates: ['Jun 12', 'Jun 19', 'Jun 25'] },
    knockoutRoutes: createKnockoutRoutes('D')
  },
  {
    teamId: 'mexico',
    teamName: 'Mexico',
    group: 'A',
    groupStage: { city1: 'Mexico City', city2: 'Guadalajara', city3: 'Mexico City', dates: ['Jun 11', 'Jun 18', 'Jun 24'] },
    knockoutRoutes: createKnockoutRoutes('A')
  },
  {
    teamId: 'canada',
    teamName: 'Canada',
    group: 'B',
    groupStage: { city1: 'Toronto', city2: 'Vancouver', city3: 'Vancouver', dates: ['Jun 12', 'Jun 18', 'Jun 24'] },
    knockoutRoutes: createKnockoutRoutes('B')
  }
];

export const getTeamRoute = (teamId: string): TeamRoute | undefined => {
  return teamsRouteTree.find(team => team.teamId === teamId);
};
