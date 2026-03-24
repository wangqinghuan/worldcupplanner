import type { Match } from '../data/matches';
import type { Venue } from '../data/venues';
import { calculateDistance } from './geoUtils';

export type TransportMode = 'flight' | 'drive';

export interface TravelSegment {
  fromVenue: Venue;
  toVenue: Venue;
  distance: number;
  flightTimeHours: number;
  mode: TransportMode;
  feasibility: 'ok' | 'tight' | 'impossible';
  availableHours: number;
  requiredHours: number;
  note?: string;
}

export interface TripPlan {
  orderedMatches: Match[];
  travelSegments: TravelSegment[];
  totalDistance: number;
  totalFlights: number;
  warnings: string[];
  feasibilityScore: 'green' | 'yellow' | 'red';
}

const DRIVE_SPEED_KMH = 100;
const FLIGHT_SPEED_KMH = 800;
const AIRPORT_PROCESS_HOURS = 3;
const SECURITY_CLEARANCE_HOURS = 1;

const getRequiredFlightHours = (distance: number): number => {
  const flightTime = distance / FLIGHT_SPEED_KMH;
  return flightTime + AIRPORT_PROCESS_HOURS + SECURITY_CLEARANCE_HOURS;
};

const getRequiredDriveHours = (distance: number): number => {
  return distance / DRIVE_SPEED_KMH + 1;
};

export const planTrip = (selectedMatches: Match[], venues: Venue[]): TripPlan => {
  if (selectedMatches.length === 0) {
    return {
      orderedMatches: [],
      travelSegments: [],
      totalDistance: 0,
      totalFlights: 0,
      warnings: [],
      feasibilityScore: 'green'
    };
  }

  const sortedMatches = [...selectedMatches].sort(
    (a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
  );

  const travelSegments: TravelSegment[] = [];
  const warnings: string[] = [];
  let totalDistance = 0;
  let totalFlights = 0;

  for (let i = 0; i < sortedMatches.length - 1; i++) {
    const currentMatch = sortedMatches[i];
    const nextMatch = sortedMatches[i + 1];
    const currentVenue = venues.find(v => v.id === currentMatch.venueId);
    const nextVenue = venues.find(v => v.id === nextMatch.venueId);

    if (!currentVenue || !nextVenue) continue;

    const distance = calculateDistance(currentVenue, nextVenue);
    totalDistance += distance;

    const currentEndTime = new Date(`${currentMatch.date}T${currentMatch.time}`);
    currentEndTime.setHours(currentEndTime.getHours() + 2);
    
    const nextStartTime = new Date(`${nextMatch.date}T${nextMatch.time}`);
    const availableHours = (nextStartTime.getTime() - currentEndTime.getTime()) / (1000 * 60 * 60);

    const requiredDriveHours = getRequiredDriveHours(distance);
    const requiredFlightHours = getRequiredFlightHours(distance);
    const flightTimeHours = distance / FLIGHT_SPEED_KMH;

    let mode: TransportMode;
    let requiredHours: number;
    let feasibility: 'ok' | 'tight' | 'impossible';
    let note: string | undefined;

    if (currentVenue.country !== nextVenue.country || distance > 500) {
      mode = 'flight';
      totalFlights++;
      requiredHours = requiredFlightHours;
      
      const bufferHours = availableHours - requiredHours;
      if (bufferHours < 0) {
        feasibility = 'impossible';
        warnings.push(
          `❌ ${currentMatch.homeTeam} vs ${nextMatch.homeTeam}: ${currentVenue.city} → ${nextVenue.city}. ` +
          `需要 ${Math.round(requiredHours)}h，但只有 ${Math.round(availableHours)}h。无法赶上！`
        );
      } else if (bufferHours < 3) {
        feasibility = 'tight';
        warnings.push(
          `⚠️ ${currentMatch.homeTeam} vs ${nextMatch.homeTeam}: ${currentVenue.city} → ${nextVenue.city}. ` +
          `时间紧张！只有 ${Math.round(availableHours)}h，建议 ${Math.round(requiredHours)}h。`
        );
      } else {
        feasibility = 'ok';
      }
    } else {
      mode = 'drive';
      requiredHours = requiredDriveHours;
      
      if (availableHours < requiredHours) {
        feasibility = 'impossible';
        warnings.push(
          `❌ ${currentMatch.homeTeam} vs ${nextMatch.homeTeam}: ${currentVenue.city} → ${nextVenue.city}. ` +
          `驾驶需要 ${Math.round(requiredHours)}h，但只有 ${Math.round(availableHours)}h。无法赶到！`
        );
      } else if (availableHours < requiredHours + 2) {
        feasibility = 'tight';
        warnings.push(
          `⚠️ ${currentMatch.homeTeam} vs ${nextMatch.homeTeam}: ${currentVenue.city} → ${nextVenue.city}. ` +
          `时间较紧，建议留出更多时间。`
        );
      } else {
        feasibility = 'ok';
      }
    }

    travelSegments.push({
      fromVenue: currentVenue,
      toVenue: nextVenue,
      distance,
      flightTimeHours,
      mode,
      feasibility,
      availableHours,
      requiredHours,
      note
    });
  }

  const impossibleCount = travelSegments.filter(s => s.feasibility === 'impossible').length;
  const tightCount = travelSegments.filter(s => s.feasibility === 'tight').length;
  
  let feasibilityScore: 'green' | 'yellow' | 'red';
  if (impossibleCount > 0) {
    feasibilityScore = 'red';
  } else if (tightCount > 0) {
    feasibilityScore = 'yellow';
  } else {
    feasibilityScore = 'green';
  }

  return {
    orderedMatches: sortedMatches,
    travelSegments,
    totalDistance,
    totalFlights,
    warnings,
    feasibilityScore
  };
};

export const reorderMatches = (matches: Match[], fromIndex: number, toIndex: number): Match[] => {
  const result = [...matches];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
};
