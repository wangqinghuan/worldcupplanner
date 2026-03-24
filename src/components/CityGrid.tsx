import React from 'react';
import { venues } from '../data/venues';
import './CityGrid.css';

interface CityGridProps {
  onCitySelect: (cityId: string) => void;
}

const CityGrid: React.FC<CityGridProps> = ({ onCitySelect }) => {
  return (
    <section className="city-grid-section section-py">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Host Cities</h2>
          <p className="section-intro">Explore 16 world-class venues across North America.</p>
        </div>
        
        <div className="city-cards-grid">
          {venues.map(city => (
            <div 
              key={city.id} 
              className="host-city-card"
              onClick={() => onCitySelect(city.id)}
            >
              <div 
                className="city-image-container"
                style={{ backgroundImage: `url(${city.image})` }}
              >
                <div className="city-match-badge">
                  {city.matchesCount} matches
                </div>
              </div>
              <div className="city-card-info">
                <h3 className="city-card-name">{city.city}</h3>
                <p className="city-card-stadium">{city.stadium}</p>
                <div className="city-card-country">{city.country}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityGrid;
