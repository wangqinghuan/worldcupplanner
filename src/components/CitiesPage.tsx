import React, { useState } from 'react';
import { venues, getVenuesByCountry } from '../data/venues';
import './CitiesPage.css';

const CitiesPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const filteredVenues = selectedCountry === 'all' 
    ? venues 
    : getVenuesByCountry(selectedCountry as 'USA' | 'Mexico' | 'Canada');

  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'USA': return '🇺🇸';
      case 'Mexico': return '🇲🇽';
      case 'Canada': return '🇨🇦';
      default: return '🏟️';
    }
  };

  return (
    <div className="cities-page">
      <header className="cities-header">
        <h1>2026 FIFA World Cup Host Cities</h1>
        <p className="subtitle">16 stadiums across United States, Canada & Mexico</p>
        
        <div className="country-tabs">
          <button
            className={`country-tab ${selectedCountry === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCountry('all')}
          >
            All Countries
          </button>
          <button
            className={`country-tab ${selectedCountry === 'USA' ? 'active' : ''}`}
            onClick={() => setSelectedCountry('USA')}
          >
            🇺🇸 United States (11)
          </button>
          <button
            className={`country-tab ${selectedCountry === 'Mexico' ? 'active' : ''}`}
            onClick={() => setSelectedCountry('Mexico')}
          >
            🇲🇽 Mexico (3)
          </button>
          <button
            className={`country-tab ${selectedCountry === 'Canada' ? 'active' : ''}`}
            onClick={() => setSelectedCountry('Canada')}
          >
            🇨🇦 Canada (2)
          </button>
        </div>
      </header>

      <div className="cities-content">
        <div className="results-count">
          {filteredVenues.length} venues
        </div>

        <div className="cities-grid">
          {filteredVenues.map(venue => (
            <div key={venue.id} className="venue-card">
              <div className="venue-image">
                <img src={venue.image} alt={venue.stadium} />
                <div className="venue-badge">
                  {getCountryFlag(venue.country)}
                </div>
                <div className="matches-badge">
                  {venue.matchesCount} matches
                </div>
              </div>
              
              <div className="venue-details">
                <h3 className="venue-city">
                  {venue.city}
                  <span className="country-name">{venue.country}</span>
                </h3>
                <p className="venue-stadium">{venue.stadium}</p>
                
                <div className="venue-stats">
                  <div className="stat">
                    <span className="stat-value">{venue.capacity.toLocaleString()}</span>
                    <span className="stat-label">Capacity</span>
                  </div>
                  {venue.elevation && (
                    <div className="stat">
                      <span className="stat-value">{venue.elevation.toLocaleString()}m</span>
                      <span className="stat-label">Elevation</span>
                    </div>
                  )}
                </div>
                
                <p className="venue-description">{venue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitiesPage;
