import React, { useState, useMemo } from 'react';
import { 
  generateRecommendations, 
  type RouteRecommendation 
} from '../data/routeRecommendations';
import { venues } from '../data/venues';
import { matches } from '../data/matches';
import { teams } from '../data/teams';
import { useItinerary } from '../context/ItineraryContext';
import { useRoutes, type SelectedTeamData } from '../context/RoutesContext';
import { REAL_CITY_DISTANCES } from '../utils/geoUtils';
import './RoutesPage.css';

const getRouteDistance = (cityList: string[]): number => {
  if (cityList.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < cityList.length - 1; i++) {
    const from = cityList[i];
    const to = cityList[i + 1];
    const distance = REAL_CITY_DISTANCES[from]?.[to] || REAL_CITY_DISTANCES[to]?.[from];
    if (distance) {
      total += distance;
    }
  }
  return total;
};

const PlaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

const CarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"/>
    <circle cx="7" cy="17" r="2"/>
    <circle cx="17" cy="17" r="2"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const RouteCard: React.FC<{ 
  route: RouteRecommendation; 
  onDetail: (route: RouteRecommendation) => void;
}> = ({ route, onDetail }) => {
  return (
    <div 
      className={`route-card ${route.recommended ? 'recommended' : ''}`}
      onClick={() => onDetail(route)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onDetail(route)}
    >
      {route.recommended && (
        <div className="recommended-badge">
          <StarIcon /> Recommended
        </div>
      )}
      
      <div className="route-header">
        <h3>{route.nameCn}</h3>
        <span className="route-name-en">{route.name}</span>
      </div>
      
      <div className="route-body">
        <div className="route-cities">
          {route.cities.map((city, i) => (
            <React.Fragment key={i}>
              <span className="city-tag">{city}</span>
              {i < route.cities.length - 1 && <span className="arrow">→</span>}
            </React.Fragment>
          ))}
        </div>
        
        <div className="route-stats">
          <div className="stat">
            <span className="stat-value">{route.matchCount}</span>
            <span className="stat-label">matches</span>
          </div>
          <div className="stat">
            <span className="stat-value">{route.totalDistance.toLocaleString()}</span>
            <span className="stat-label">km total</span>
          </div>
          <div className="stat">
            <span className="stat-value">{route.budget}</span>
            <span className="stat-label">budget</span>
          </div>
        </div>
        
        {route.teams.length > 0 && (
          <div className="route-teams">
            <span className="label">Teams: </span>
            {route.teams.slice(0, 3).map(team => (
              <span key={team} className="team-tag">{team}</span>
            ))}
            {route.teams.length > 3 && <span className="more">+{route.teams.length - 3}</span>}
          </div>
        )}
        
        <div className="route-reasons">
          {route.reasons.map((reason, i) => (
            <div key={i} className="reason-item">• {reason}</div>
          ))}
        </div>
        
        <div className="route-transport">
          {route.transportMode === 'drive' && <CarIcon />}
          {route.transportMode !== 'drive' && <PlaneIcon />}
          <span>
            {route.transportMode === 'drive' ? 'Drive' : route.transportMode === 'mixed' ? 'Drive + Fly' : 'Flight Required'}
          </span>
        </div>
      </div>
    </div>
  );
};

const RouteDetail: React.FC<{ 
  route: RouteRecommendation; 
  onBack: () => void;
  onNavigate: () => void;
}> = ({ route, onBack, onNavigate }) => {
  const { setPendingRouteData } = useItinerary();
  const [arrivalDate, setArrivalDate] = useState('2026-06-13');
  const [departureDate, setDepartureDate] = useState('2026-06-27');

  const routeCities = venues.filter(v => route.venues.includes(v.id)).map(v => v.city);

  const handleGenerateItinerary = () => {
    setPendingRouteData({
      routeName: route.name,
      cities: routeCities,
      arrivalDate,
      departureDate
    });
    onNavigate();
  };

  const allRouteMatches = venues
    .filter(v => route.venues.includes(v.id))
    .flatMap(v => matches.filter(m => m.venueId === v.id))
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${a.time}`).getTime());

  const groupMatches = allRouteMatches.filter(m => 
    !m.stage.includes('Round') && !m.stage.includes('Quarter') && 
    !m.stage.includes('Semi') && !m.stage.includes('Final') && !m.stage.includes('Third')
  );
  const knockoutMatches = allRouteMatches.filter(m => 
    m.stage.includes('Round') || m.stage.includes('Quarter') || 
    m.stage.includes('Semi') || m.stage.includes('Final') || m.stage.includes('Third')
  );

  const matchesByCity = route.venues.map(venueId => {
    const venue = venues.find(v => v.id === venueId);
    const cityGroupMatches = groupMatches
      .filter(m => m.venueId === venueId)
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
    const cityKnockoutMatches = knockoutMatches.filter(m => m.venueId === venueId);
    
    const dates = [...new Set(cityGroupMatches.map(m => m.date))].sort();
    const startDate = dates[0] || '';
    const endDate = dates[dates.length - 1] || '';
    
    return { 
      venueId, 
      venue, 
      groupMatches: cityGroupMatches,
      knockoutMatches: cityKnockoutMatches,
      startDate,
      endDate
    };
  });

  return (
    <div className="route-detail">
      <div className="detail-sticky-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <div className="detail-title">
          <h2>{route.nameCn}</h2>
        </div>
        <div></div>
      </div>

      <div className="detail-header">
        <p className="description">{route.description}</p>
      </div>

      <div className="ai-section">
        <h3>📅 Plan Your Trip</h3>
        <div className="ai-form">
          <div className="form-row-inline">
            <div className="form-field">
              <label>Arrival Date</label>
              <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} min="2026-06-11" max="2026-07-19" />
            </div>
            <div className="form-field">
              <label>Departure Date</label>
              <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} min="2026-06-11" max="2026-07-19" />
            </div>
            <button className="btn-generate-plan" onClick={handleGenerateItinerary}>
              ✨ Create My Plan
            </button>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3>📅 Group Stage</h3>
        <p className="stay-hint">Match schedule by city (June 11-27)</p>
        
        {matchesByCity.map(city => (
          <div key={city.venueId} className="city-section">
            <div className="city-header">
              <span className="city-name">🏙️ {city.venue?.city}</span>
              <span className="city-dates">{city.startDate} ~ {city.endDate}</span>
            </div>
            {city.groupMatches.length === 0 ? (
              <p className="no-match">No group stage matches</p>
            ) : (
              <div className="match-list">
                {city.groupMatches.map(match => (
                  <div key={match.id} className="match-item">
                    <div className="match-date">
                      <span className="month">{match.month}</span>
                      <span className="day">{match.day}</span>
                    </div>
                    <div className="match-info">
                      <div className="teams">{match.homeTeam} vs {match.awayTeam}</div>
                      <div className="venue">{match.venue} · {match.time} {match.timezone}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {knockoutMatches.length > 0 && (
        <div className="detail-section">
          <h3>🏆 Knockout Stage</h3>
          <p className="stay-hint">June 28 - July 19</p>
          
          {matchesByCity.map(city => (
            city.knockoutMatches.length > 0 ? (
              <div key={city.venueId} className="city-section">
                <div className="city-header">
                  <span className="city-name">🏙️ {city.venue?.city}</span>
                </div>
                <div className="match-list">
                  {city.knockoutMatches.map(match => (
                    <div key={match.id} className="match-item knockout-match">
                      <div className="match-date">
                        <span className="month">{match.month}</span>
                        <span className="day">{match.day}</span>
                      </div>
                      <div className="match-info">
                        <div className="match-stage">{match.stage}</div>
                        <div className="teams">{match.homeTeam} vs {match.awayTeam}</div>
                        <div className="venue">{match.venue} · {match.time} {match.timezone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      <div className="detail-section reasons">
        <h3>💡 Why This Route</h3>
        <ul>
          {route.reasons.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
        <div className="budget-info">
          <span>💰 Budget: {route.budget}</span>
          <span>📏 Total Distance: {route.totalDistance.toLocaleString()} km</span>
        </div>
      </div>
    </div>
  );
};

interface RoutesPageProps {
  onNavigate: (view: string) => void;
}

const RoutesPage: React.FC<RoutesPageProps> = ({ onNavigate }) => {
  const { selectedRouteId, selectedTeamId, setSelectedRoute, setSelectedTeam } = useRoutes();
  
  const recommendations = useMemo(() => {
    return generateRecommendations(3, '', 'balanced');
  }, []);
  
  const teamData = useMemo(() => {
    return teams
      .filter(t => !t.id.startsWith('playoff'))
      .map(team => {
        const teamMatches = matches.filter(m => 
          m.homeTeam === team.name || m.awayTeam === team.name
        );
        const cities = [...new Set(teamMatches.map(m => m.city))];
        return {
          team,
          matchCount: teamMatches.length,
          cities,
          totalDistance: getRouteDistance(cities),
          isStrong: !!(team.fifaRank && team.fifaRank <= 10)
        };
      })
      .filter(t => t.matchCount > 0)
      .sort((a, b) => (a.team.fifaRank || 999) - (b.team.fifaRank || 999));
  }, []);

  const selectedRoute = selectedRouteId ? recommendations.find(r => r.id === selectedRouteId) || null : null;
  const selectedTeam = selectedTeamId ? teamData.find(t => t.team.id === selectedTeamId) || null : null;

  const { setPendingTeamData } = useItinerary();
  const [arrivalDate, setArrivalDate] = useState('2026-06-13');
  const [departureDate, setDepartureDate] = useState('2026-06-27');

  const handleTeamClick = (team: SelectedTeamData) => {
    setSelectedTeam(team);
  };

  const handleGenerateTeamItinerary = () => {
    if (!selectedTeam) return;
    setPendingTeamData({
      teamName: selectedTeam.team.name,
      cities: selectedTeam.cities,
      arrivalDate,
      departureDate
    });
    onNavigate('itinerary');
  };

  if (selectedTeam) {
    const teamMatches = matches.filter(m => 
      m.homeTeam === selectedTeam.team.name || m.awayTeam === selectedTeam.team.name
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return (
      <div className="route-detail">
        <div className="detail-sticky-header">
          <button className="btn-back" onClick={() => setSelectedTeam(null)}>← Back</button>
          <div className="detail-title">
            <h2>{selectedTeam.team.flag} {selectedTeam.team.name}</h2>
          </div>
          <div></div>
        </div>

        <div className="detail-header">
          <p className="description">
            FIFA Rank: #{selectedTeam.team.fifaRank || 'N/A'} · {selectedTeam.matchCount} matches · {selectedTeam.cities.join(', ')}
          </p>
        </div>

        <div className="ai-section">
          <h3>📅 Plan Your Trip</h3>
          <div className="ai-form">
            <div className="form-row-inline">
              <div className="form-field">
                <label>Arrival Date</label>
                <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} min="2026-06-11" max="2026-07-19" />
              </div>
              <div className="form-field">
                <label>Departure Date</label>
                <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} min="2026-06-11" max="2026-07-19" />
              </div>
              <button className="btn-generate-plan" onClick={handleGenerateTeamItinerary}>
                ✨ Create My Plan
              </button>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>📅 Match Schedule</h3>
          <div className="match-list">
            {teamMatches.map(match => (
              <div key={match.id} className="match-item">
                <div className="match-date">
                  <span className="month">{match.month}</span>
                  <span className="day">{match.day}</span>
                </div>
                <div className="match-info">
                  <div className="teams">
                    {match.homeTeam} vs {match.awayTeam}
                  </div>
                  <div className="venue">{match.venue} · {match.city} · {match.time} {match.timezone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section reasons">
          <h3>💡 Why Follow This Team</h3>
          <ul>
            <li>{selectedTeam.matchCount} World Cup matches</li>
            <li>Matches in {selectedTeam.cities.length} cities</li>
            {selectedTeam.isStrong && <li>Top-tier team worth watching</li>}
          </ul>
          <div className="budget-info">
            <span>📏 Total Distance: {selectedTeam.totalDistance.toLocaleString()} km</span>
          </div>
        </div>
      </div>
    );
  }

  if (selectedRoute) {
    return <RouteDetail route={selectedRoute} onBack={() => setSelectedRoute(null)} onNavigate={() => onNavigate('itinerary')} />;
  }
  
  return (
    <div className="routes-page">
      <header className="routes-header">
        <div className="header-content">
          <h1>🗺️ Route Recommendations</h1>
          <p>16 host cities across North America · 6 curated routes</p>
        </div>
      </header>
      
      <div className="routes-container">
        <section className="routes-section">
          <h2 className="section-title">🛣️ Curated Routes</h2>
          <div className="routes-grid">
            {recommendations.map(route => (
              <RouteCard 
                key={route.id} 
                route={route}
                onDetail={setSelectedRoute}
              />
            ))}
          </div>
        </section>

        <section className="routes-section">
          <h2 className="section-title">⚽ Team Schedules</h2>
          <p className="section-desc">Choose your favorite team to see all their matches</p>
          <div className="routes-grid">
            {teamData.map(t => (
              <RouteCard 
                key={t.team.id}
                route={{
                  id: t.team.id,
                  name: t.team.name,
                  nameCn: `${t.team.fifaRank ? `#${t.team.fifaRank} ` : ''}${t.team.flag} ${t.team.name}`,
                  cities: t.cities,
                  venues: [],
                  matchIds: [],
                  matchCount: t.matchCount,
                  totalDistance: t.totalDistance,
                  budget: '$',
                  teams: [t.team.name],
                  reasons: t.cities.length > 0 ? [`Matches in ${t.cities.length} cities`] : [],
                  recommended: t.isStrong,
                  description: '',
                  transportMode: 'mixed' as const,
                  priority: t.team.fifaRank || 99
                }}
                onDetail={() => handleTeamClick(t)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoutesPage;
