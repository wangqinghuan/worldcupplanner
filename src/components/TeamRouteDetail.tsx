import React, { useState } from 'react';
import { getTeamRoute } from '../data/teamsRouteTree';
import { getMatchesByTeam, getMatchesByCity } from '../utils/matchUtils';
import { venues } from '../data/venues';
import TeamRouteMap from './TeamRouteMap';
import './TeamRouteDetail.css';

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const calculateRouteDistance = (groupStageCities: string[], knockoutRoute: { stage: string; city: string }[]): number => {
  const allCities = [...groupStageCities, ...knockoutRoute.map(r => r.city)];
  let totalDistance = 0;
  let prevCity = '';
  
  for (const city of allCities) {
    if (prevCity && prevCity !== city) {
      const fromVenue = venues.find(v => v.city === prevCity);
      const toVenue = venues.find(v => v.city === city);
      if (fromVenue && toVenue) {
        totalDistance += haversineDistance(fromVenue.lat, fromVenue.lng, toVenue.lat, toVenue.lng);
      }
    }
    prevCity = city;
  }
  
  return totalDistance;
};

interface TeamRouteDetailProps {
  teamId: string;
  onGenerateItinerary: (matchIds: number[]) => void;
  onBack: () => void;
}

const TeamRouteDetail: React.FC<TeamRouteDetailProps> = ({ teamId, onGenerateItinerary, onBack }) => {
  const team = getTeamRoute(teamId);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  
  if (!team) {
    return (
      <div className="team-route-detail">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <p>Team not found</p>
      </div>
    );
  }

  const teamMatches = getMatchesByTeam(team.teamName);
  const groupMatchIds = teamMatches.slice(0, 3).map(m => m.id);
  const groupStageCities = [team.groupStage.city1, team.groupStage.city2, team.groupStage.city3];

  const routeDistances = team.knockoutRoutes.map(route => 
    calculateRouteDistance(groupStageCities, route.route)
  );
  const distanceDiff = Math.abs(routeDistances[0] - routeDistances[1]);

  const generateItinerary = (knockoutPathIndex: number) => {
    const allMatchIds = [...groupMatchIds];
    
    if (team.knockoutRoutes[knockoutPathIndex]) {
      const knockoutRoute = team.knockoutRoutes[knockoutPathIndex].route;
      
      knockoutRoute.forEach(stop => {
        const cityMatches = getMatchesByCity(stop.city);
        const knockoutStageMatch = cityMatches.find(m => m.stage === stop.stage);
        if (knockoutStageMatch) {
          allMatchIds.push(knockoutStageMatch.id);
        }
      });
    }
    
    onGenerateItinerary(allMatchIds);
  };

  return (
    <div className="team-route-detail">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="team-header">
          <span className="team-flag">{getTeamEmoji(teamId)}</span>
          <h1>{team.teamName}</h1>
        </div>
      </div>

      <div className="route-content">
        <div className="route-left">
          <section className="group-stage">
            <h2>📅 Group Stage (Confirmed)</h2>
            <div className="cities-row">
              <div className="city-card">
                <span className="city-name">{team.groupStage.city1}</span>
                <span className="city-date">{team.groupStage.dates[0]}</span>
              </div>
              <span className="arrow">→</span>
              <div className="city-card">
                <span className="city-name">{team.groupStage.city2}</span>
                <span className="city-date">{team.groupStage.dates[1]}</span>
              </div>
              <span className="arrow">→</span>
              <div className="city-card">
                <span className="city-name">{team.groupStage.city3}</span>
                <span className="city-date">{team.groupStage.dates[2]}</span>
              </div>
            </div>
          </section>

          <section className="knockout-routes">
            <h2>🔀 Knockout Routes</h2>
            <p className="disclaimer">
              * Based on official FIFA World Cup 2026 bracket. Actual path depends on group stage results.
            </p>
            <div className="distance-comparison">
              <div className="distance-item">
                <span className="route-label">1st Place:</span>
                <span className="route-distance">{Math.round(routeDistances[0])} mi</span>
              </div>
              <div className="distance-item">
                <span className="route-label">2nd Place:</span>
                <span className="route-distance">{Math.round(routeDistances[1])} mi</span>
              </div>
              <div className="distance-diff">
                Difference: {Math.round(distanceDiff)} miles
              </div>
            </div>
            <p className="route-note">
              Your team could take different paths depending on group stage result:
            </p>
            
            {team.knockoutRoutes.map((route, index) => (
              <div 
                key={index} 
                className={`route-option ${selectedRouteIndex === index ? 'selected' : ''}`}
                onClick={() => setSelectedRouteIndex(index)}
              >
                <div className="route-header">
                  <h3>{route.ifQualified}</h3>
                  <span className="route-badge">{index === 0 ? '1st Place' : '2nd Place'}</span>
                </div>
                <div className="route-path">
                  {route.route.map((stop, idx) => (
                    <React.Fragment key={idx}>
                      <div className="stop">
                        <span className="stop-stage">{stop.stage}</span>
                        <span className="stop-city">{stop.city}</span>
                        {stop.opponent && stop.opponent !== 'TBD' && (
                          <span className="stop-opponent">vs {stop.opponent}</span>
                        )}
                      </div>
                      {idx < route.route.length - 1 && <span className="arrow">→</span>}
                    </React.Fragment>
                  ))}
                </div>
                <button 
                  className="generate-btn-small"
                  onClick={(e) => {
                    e.stopPropagation();
                    generateItinerary(index);
                  }}
                >
                  Generate Itinerary →
                </button>
              </div>
            ))}
          </section>
        </div>

        <div className="route-right">
          <TeamRouteMap
            groupStageCities={groupStageCities}
            groupStageDates={team.groupStage.dates}
            knockoutRoutes={team.knockoutRoutes}
            selectedRouteIndex={selectedRouteIndex}
          />
        </div>
      </div>
    </div>
  );
};

function getTeamEmoji(teamId: string): string {
  const emojis: Record<string, string> = {
    argentina: '🇦🇷',
    brazil: '🇧🇷',
    france: '🇫🇷',
    england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    germany: '🇩🇪',
    spain: '🇪🇸',
    portugal: '🇵🇹',
    usa: '🇺🇸',
    mexico: '🇲🇽',
    canada: '🇨🇦'
  };
  return emojis[teamId] || '⚽';
}

export default TeamRouteDetail;
