import React from 'react';
import { presetRoutes, type PresetRoute } from '../data/routesData';
import { getMatchesByCity } from '../utils/matchUtils';
import './RoutesListPage.css';

interface RoutesListPageProps {
  onSelectRoute: (routeId: string, matchIds: number[]) => void;
  onBack: () => void;
}

const RoutesListPage: React.FC<RoutesListPageProps> = ({ onSelectRoute, onBack }) => {
  const handleSelectRoute = (route: PresetRoute) => {
    const allMatchIds: number[] = [];
    
    route.cities.forEach(city => {
      const cityMatches = getMatchesByCity(city);
      allMatchIds.push(...cityMatches.map(m => m.id));
    });
    
    const uniqueMatchIds = [...new Set(allMatchIds)];
    onSelectRoute(route.id, uniqueMatchIds);
  };

  return (
    <div className="routes-list-page">
      <div className="container">
        <button className="back-btn" onClick={onBack}>← Back</button>
        
        <header className="page-header">
          <h1>Explore Routes</h1>
          <p>Choose a pre-planned route to see matches and cities</p>
        </header>

        <div className="routes-grid">
          {presetRoutes.map((route: PresetRoute) => (
            <div 
              key={route.id}
              className="route-card"
              onClick={() => handleSelectRoute(route)}
            >
              <div className="route-image">
                <img src={route.image} alt={route.name} />
              </div>
              <div className="route-content">
                <h3>{route.name}</h3>
                <p className="route-description">{route.description}</p>
                
                <div className="route-stats">
                  <div className="stat">
                    <span className="stat-value">{route.cities.length}</span>
                    <span className="stat-label">Cities</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{route.matchCount}</span>
                    <span className="stat-label">Matches</span>
                  </div>
                </div>

                <div className="route-cities">
                  {route.cities.map((city, idx) => (
                    <span key={idx} className="city-tag">
                      {city.split('/')[0]}
                    </span>
                  ))}
                </div>

                <p className="route-suitable">
                  <strong>Best for:</strong> {route.suitableFor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesListPage;
