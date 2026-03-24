import React, { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import MatchCard from './MatchCard';
import { matches } from '../data/matches';
import './MatchesView.css';

interface MatchesViewProps {
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

const MatchesView: React.FC<MatchesViewProps> = ({ selectedCity, onCityChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const filteredMatches = useMemo(() => {
    const result = matches.filter(m => {
      const cityMatch = selectedCity === 'all' || m.venueId === selectedCity;
      const countryMatch = selectedCountry === 'all' || m.country === selectedCountry;
      const stageMatch = selectedStage === 'all' || m.stage === selectedStage;
      const dateMatch = selectedDate === 'all' || m.date === selectedDate;
      
      const search = searchQuery.toLowerCase();
      const searchMatch = searchQuery === '' || 
        m.homeTeam.toLowerCase().includes(search) || 
        m.awayTeam.toLowerCase().includes(search) || 
        m.city.toLowerCase().includes(search) ||
        m.matchNumber.toString() === searchQuery;

      return cityMatch && countryMatch && stageMatch && dateMatch && searchMatch;
    });

    return result;
  }, [selectedCity, selectedCountry, selectedStage, selectedDate, searchQuery]);

  const resetAll = () => {
    onCityChange('all');
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedStage('all');
    setSelectedDate('all');
  };

  return (
    <div className="matches-page-v6">
      <FilterBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        selectedCity={selectedCity}
        onCityChange={onCityChange}
        selectedStage={selectedStage}
        onStageChange={setSelectedStage}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onReset={resetAll}
      />

      <main className="container section-py">
        <div className="results-status-v6">
          Showing <strong>{filteredMatches.length}</strong> matches
        </div>
        
        <div className="matches-card-grid-v6">
          {filteredMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
          
          {filteredMatches.length === 0 && (
            <div className="no-results-v6">
              <h3>No matches match your criteria</h3>
              <button className="btn-outline" onClick={resetAll}>Reset All Filters</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MatchesView;
