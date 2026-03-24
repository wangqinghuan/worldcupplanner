import React, { useState, useMemo } from 'react';
import { matches } from '../data/matches';
import { teams } from '../data/teams';
import { venues } from '../data/venues';
import { type Group } from '../data/teams';
import StandingsTable from './StandingsTable';
import MatchCard from './MatchCard';
import './HomePage.css';

const HomePage: React.FC = () => {
  const groupStages: Group[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = useMemo(() => {
    return matches.filter(m => {
      const countryMatch = selectedCountry === 'all' || m.country === selectedCountry;
      const dateMatch = selectedDate === 'all' || m.date === selectedDate;
      const stageMatch = selectedStage === 'all' || m.stage === selectedStage;
      const search = searchQuery.toLowerCase();
      const searchMatch = searchQuery === '' || 
        m.homeTeam.toLowerCase().includes(search) || 
        m.awayTeam.toLowerCase().includes(search) || 
        m.city.toLowerCase().includes(search);
      return countryMatch && dateMatch && stageMatch && searchMatch;
    }).slice(0, 20);
  }, [selectedCountry, selectedDate, selectedStage, searchQuery]);

  const uniqueDates = useMemo(() => {
    return [...new Set(matches.map(m => m.date))].sort();
  }, []);

  const uniqueStages = useMemo(() => {
    return [...new Set(matches.map(m => m.stage))].sort();
  }, []);
  
  const totalMatches = matches.length;
  const totalTeams = teams.length;
  const totalVenues = venues.length;

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>🏆 2026 FIFA World Cup</h1>
          <p className="hero-subtitle">June 11 - July 19, 2026 | USA · Canada · Mexico</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="number">{totalTeams}</span>
              <span className="label">Teams</span>
            </div>
            <div className="hero-stat">
              <span className="number">{totalMatches}</span>
              <span className="label">Matches</span>
            </div>
            <div className="hero-stat">
              <span className="number">{totalVenues}</span>
              <span className="label">Venues</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-nav">
        <div className="container">
          <div className="nav-cards">
            <a href="#/schedule" className="nav-card">
              <span className="nav-icon">📅</span>
              <span className="nav-title">Schedule</span>
              <span className="nav-desc">All 104 matches</span>
            </a>
            <a href="#/standings" className="nav-card">
              <span className="nav-icon">📊</span>
              <span className="nav-title">Standings</span>
              <span className="nav-desc">Group rankings</span>
            </a>
            <a href="#/schedule" className="nav-card">
              <span className="nav-icon">🚩</span>
              <span className="nav-title">Teams</span>
              <span className="nav-desc">48 nations</span>
            </a>
            <a href="#/routes" className="nav-card">
              <span className="nav-icon">🏟️</span>
              <span className="nav-title">Venues</span>
              <span className="nav-desc">16 cities</span>
            </a>
          </div>
        </div>
      </section>

      <section id="schedule" className="section">
        <div className="container">
          <h2 className="section-title">Match Schedule</h2>
          <p className="section-subtitle">Complete fixture list for the 2026 FIFA World Cup</p>
          
          <div className="filter-row">
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="all">All Countries</option>
              <option value="USA">USA</option>
              <option value="Mexico">Mexico</option>
              <option value="Canada">Canada</option>
            </select>
            <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
              <option value="all">All Dates</option>
              {uniqueDates.slice(0, 10).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)}>
              <option value="all">All Stages</option>
              {uniqueStages.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Search teams..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="matches-preview">
            {filteredMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
            {filteredMatches.length === 0 && (
              <p className="no-match">No matches found</p>
            )}
          </div>

          <a href="#/schedule" className="view-all-btn">View Full Schedule →</a>
        </div>
      </section>

      <section id="standings" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Group Standings</h2>
          <p className="section-subtitle">Live tournament standings by group</p>
          
          <div className="standings-grid">
            {groupStages.slice(0, 6).map(group => (
              <StandingsTable key={group} group={group} />
            ))}
          </div>

          <a href="#/standings" className="view-all-btn">View All Groups →</a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Tournament Info</h2>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>📍 Host Countries</h3>
              <p>The 2026 World Cup marks the first time three nations co-host the tournament. The USA hosts the most matches (78), followed by Mexico (13) and Canada (13).</p>
            </div>
            <div className="info-card">
              <h3>🏆 Tournament Format</h3>
              <p>48 teams in 12 groups of 4. Top 2 from each group plus 8 best third-place finishers advance to the new Round of 32.</p>
            </div>
            <div className="info-card">
              <h3>⚽ Key Dates</h3>
              <p><strong>June 11:</strong> Opening match in Mexico City<br/>
              <strong>June 28:</strong> Round of 32 begins<br/>
              <strong>July 19:</strong> Final at MetLife Stadium</p>
            </div>
            <div className="info-card">
              <h3>🎟️ Tickets</h3>
              <p>Over 500 million ticket requests for just 7 million available seats. All official lottery phases are now closed.</p>
              <a href="https://www.fifa.com/tickets" target="_blank" rel="noopener noreferrer" className="info-link">Buy Tickets →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
