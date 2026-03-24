import matchData from './matches.json';

export type MatchStatus = 'scheduled' | 'live' | 'completed';

export interface Match {
  id: number;
  matchNumber: number;
  date: string;
  month: string;
  day: string;
  weekday: string;
  time: string;
  timezone: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  city: string;
  venueId: string;
  country: 'USA' | 'Mexico' | 'Canada';
  stage: string;
  status?: MatchStatus;
  homeScore?: number;
  awayScore?: number;
}

// Type casting the imported JSON data
export const matches = matchData as Match[];
