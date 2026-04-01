import React, { useMemo } from 'react';
import { matches } from '../data/matches';
import { getCityDetailById, cityDetails } from '../data/cityDetails';
import './ItineraryPage.css';

const cityNameToId: Record<string, string> = cityDetails.reduce((acc, c) => {
  acc[c.city] = c.id;
  return acc;
}, {} as Record<string, string>);

interface ItineraryPageProps {
  matchIds: number[];
  onBack: () => void;
  onSave?: () => void;
}

interface CityGroup {
  city: string;
  cityId: string;
  matches: typeof matches;
  arrivalDate?: string;
  departureDate?: string;
}

const ItineraryPage: React.FC<ItineraryPageProps> = ({ matchIds, onBack, onSave }) => {
  const selectedMatches = useMemo(() => {
    return matches.filter(m => matchIds.includes(m.id)).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [matchIds]);

  const cityGroups = useMemo(() => {
    const groups: Record<string, CityGroup> = {};
    
    selectedMatches.forEach(match => {
      const cityId = cityNameToId[match.city] || '';
      
      if (!groups[cityId]) {
        groups[cityId] = {
          city: match.city,
          cityId,
          matches: []
        };
      }
      groups[cityId].matches.push(match);
    });
    
    const groupsArray = Object.values(groups);
    // Sort groups by first match date
    return groupsArray.sort((a, b) => {
      const aDate = new Date(a.matches[0].date).getTime();
      const bDate = new Date(b.matches[0].date).getTime();
      return aDate - bDate;
    });
  }, [selectedMatches]);

  return (
    <div className="itinerary-page">
      <div className="container">
        <button className="back-btn" onClick={onBack}>← Back</button>
        
        <header className="page-header">
          <h1>Your Itinerary</h1>
          <p>{selectedMatches.length} matches across {cityGroups.length} cities</p>
          {onSave && (
            <button className="save-btn" onClick={onSave}>Save Itinerary</button>
          )}
        </header>

        <div className="itinerary-summary">
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-number">{selectedMatches.length}</span>
              <span className="stat-label">Matches</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">{cityGroups.length}</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">
                {selectedMatches.length > 0 ? selectedMatches[0].month + ' ' + selectedMatches[0].day : '-'}
              </span>
              <span className="stat-label">Start</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">
                {selectedMatches.length > 0 ? selectedMatches[selectedMatches.length - 1].month + ' ' + selectedMatches[selectedMatches.length - 1].day : '-'}
              </span>
              <span className="stat-label">End</span>
            </div>
          </div>
        </div>

        <div className="city-groups">
          {cityGroups.map((group, index) => {
            const cityDetail = getCityDetailById(group.cityId);
            
            return (
              <div key={group.cityId} className="city-group">
                <div className="city-header">
                  <div className="city-number">City {index + 1}</div>
                  <h2>{group.city}</h2>
                </div>

                <div className="city-matches">
                  <h3>🏟️ Matches</h3>
                  {group.matches.map(match => (
                    <div key={match.id} className="match-row">
                      <span className="match-date">{match.month} {match.day}</span>
                      <span className="match-team">{match.homeTeam} vs {match.awayTeam}</span>
                      <span className="match-time">{match.time}</span>
                    </div>
                  ))}
                </div>

                {cityDetail && (
                  <>
                    <div className="city-transport">
                      <h3>✈️ Getting Around</h3>
                      <p><strong>From airport:</strong> {cityDetail.transport.fromAirport}</p>
                      <p><strong>Tips:</strong> {cityDetail.transport.tips}</p>
                    </div>

                    <div className="city-stay">
                      <h3>🏨 Where to Stay</h3>
                      <p>Recommended areas:</p>
                      <div className="areas-list">
                        {cityDetail.whereToStay.map((area, idx) => (
                          <span key={idx} className="area-tag">{area}</span>
                        ))}
                      </div>
                    </div>

                    <div className="city-things">
                      <h3>🎯 Things to Do</h3>
                      <ul>
                        {cityDetail.thingsToDo.slice(0, 5).map((thing, idx) => (
                          <li key={idx}>{thing}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="city-food">
                      <h3>🍔 Local Food</h3>
                      <ul>
                        {cityDetail.food.slice(0, 3).map((food, idx) => (
                          <li key={idx}>{food}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="city-cost">
                      <h3>💰 Costs</h3>
                      <p>Beer: {cityDetail.beerPrice}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="cta-section">
          <a 
            href="https://www.fifa.com/tickets" 
            target="_blank" 
            rel="noopener noreferrer"
            className="buy-tickets-btn"
          >
            Buy Tickets on FIFA.com →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
