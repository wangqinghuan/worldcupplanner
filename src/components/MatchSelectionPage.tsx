import React, { useState, useMemo } from 'react';
import { matches } from '../data/matches';
import './MatchSelectionPage.css';

interface MatchSelectionPageProps {
  onGenerateItinerary: (matchIds: number[]) => void;
  onBack: () => void;
}

const MatchSelectionPage: React.FC<MatchSelectionPageProps> = ({ onGenerateItinerary, onBack }) => {
  const [selectedMatches, setSelectedMatches] = useState<number[]>([]);
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterStage, setFilterStage] = useState('all');

  const filteredMatches = useMemo(() => {
    return matches.filter(m => {
      const countryMatch = filterCountry === 'all' || m.country === filterCountry;
      const stageMatch = filterStage === 'all' || m.stage === filterStage;
      return countryMatch && stageMatch;
    });
  }, [filterCountry, filterStage]);

  const toggleMatch = (matchId: number) => {
    setSelectedMatches(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  const handleGenerate = () => {
    if (selectedMatches.length > 0) {
      onGenerateItinerary(selectedMatches);
    }
  };

  return (
    <div className="match-selection-page">
      <div className="container">
        <button className="back-btn" onClick={onBack}>← Back</button>
        
        <header className="page-header">
          <h1>Find by Matches</h1>
          <p>Select the matches you want to attend</p>
        </header>

        <div className="selection-controls">
          <div className="filters">
            <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}>
              <option value="all">All Countries</option>
              <option value="USA">USA</option>
              <option value="Mexico">Mexico</option>
              <option value="Canada">Canada</option>
            </select>
            <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)}>
              <option value="all">All Stages</option>
              <option value="Group Stage">Group Stage</option>
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
              <option value="Group C">Group C</option>
              <option value="Group D">Group D</option>
              <option value="Group E">Group E</option>
              <option value="Group F">Group F</option>
              <option value="Group G">Group G</option>
              <option value="Group H">Group H</option>
              <option value="Group I">Group I</option>
              <option value="Group J">Group J</option>
              <option value="Group K">Group K</option>
              <option value="Group L">Group L</option>
              <option value="Round of 32">Round of 32</option>
              <option value="Round of 16">Round of 16</option>
              <option value="Quarter-final">Quarter-final</option>
              <option value="Semi-final">Semi-final</option>
              <option value="Final">Final</option>
            </select>
          </div>
          
          <div className="selection-summary">
            <span>{selectedMatches.length} matches selected</span>
            <button 
              className="generate-btn"
              onClick={handleGenerate}
              disabled={selectedMatches.length === 0}
            >
              Generate Itinerary →
            </button>
          </div>
        </div>

        <div className="matches-list">
          {filteredMatches.map(match => (
            <div 
              key={match.id}
              className={`match-item ${selectedMatches.includes(match.id) ? 'selected' : ''}`}
              onClick={() => toggleMatch(match.id)}
            >
              <div className="match-checkbox">
                {selectedMatches.includes(match.id) && '✓'}
              </div>
              <div className="match-info">
                <span className="match-date">{match.month} {match.day}</span>
                <span className="match-teams">{match.homeTeam} vs {match.awayTeam}</span>
                <span className="match-venue">{match.city} • {match.time}</span>
              </div>
              <div className="match-stage">{match.stage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchSelectionPage;
