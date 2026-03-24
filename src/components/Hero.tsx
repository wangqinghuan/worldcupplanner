import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="container hero-inner">
        <h1 className="hero-headline">
          Plan your perfect <br />
          <span>FIFA World Cup 2026™</span> journey
        </h1>
        <p className="hero-subline">
          The ultimate tournament itinerary planner across 16 host cities in USA, Mexico, and Canada.
        </p>
        
        <div className="hero-stats-row">
          <div className="stat-item">
            <span className="stat-num">3</span>
            <span className="stat-txt">HOST COUNTRIES</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-num">16</span>
            <span className="stat-txt">HOST CITIES</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-num">104</span>
            <span className="stat-txt">MATCHES</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
