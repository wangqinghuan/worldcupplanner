import React from 'react';
import './HomePageEntry.css';

interface HomePageEntryProps {
  onNavigate: (view: string) => void;
}

const HomePageEntry: React.FC<HomePageEntryProps> = ({ onNavigate }) => {
  return (
    <div className="home-page-entry">
      <section className="hero-section">
        <h1>World Cup 2026 Route Planner</h1>
        <p className="hero-subtitle">
          Plan your ultimate football journey across 16 cities in USA, Canada & Mexico
        </p>
      </section>

      <section className="entry-section">
        <h2>How can we help you today?</h2>
        
        <div className="entry-cards">
          <div 
            className="entry-card"
            onClick={() => onNavigate('team-routes')}
          >
            <div className="card-icon">🔍</div>
            <h3>Find by Team</h3>
            <p>I know which team I want to follow</p>
          </div>

          <div 
            className="entry-card"
            onClick={() => onNavigate('match-selection')}
          >
            <div className="card-icon">📋</div>
            <h3>Find by Matches</h3>
            <p>I have specific matches I want to attend</p>
          </div>

          <div 
            className="entry-card"
            onClick={() => onNavigate('routes-list')}
          >
            <div className="card-icon">🗺️</div>
            <h3>Explore Routes</h3>
            <p>Show me recommended routes</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="feature">
          <span className="feature-icon">🏟️</span>
          <h4>104 Matches</h4>
          <p>Across 16 cities</p>
        </div>
        <div className="feature">
          <span className="feature-icon">✈️</span>
          <h4>3 Countries</h4>
          <p>USA, Canada, Mexico</p>
        </div>
        <div className="feature">
          <span className="feature-icon">📅</span>
          <h4>Jun 11 - Jul 19</h4>
          <p>39 days of football</p>
        </div>
      </section>
    </div>
  );
};

export default HomePageEntry;
