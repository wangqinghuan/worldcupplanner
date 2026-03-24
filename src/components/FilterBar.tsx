import React from 'react';
import { venues } from '../data/venues';
import './FilterBar.css';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCountry: string;
  onCountryChange: (c: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedStage: string;
  onStageChange: (s: string) => void;
  selectedDate: string;
  onDateChange: (d: string) => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery, onSearchChange,
  selectedCountry, onCountryChange,
  selectedCity, onCityChange,
  selectedStage, onStageChange,
  selectedDate, onDateChange,
  onReset
}) => {
  const stages = [
    'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F',
    'Group G', 'Group H', 'Group I', 'Group J', 'Group K', 'Group L',
    'Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'
  ];

  return (
    <div className="filter-bar-final">
      <div className="container filter-layout">
        <div className="filter-main-search">
          <input 
            type="text" 
            placeholder="Search teams, cities, match numbers..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-controls-grid">
          <select value={selectedCountry} onChange={(e) => onCountryChange(e.target.value)}>
            <option value="all">Any Country</option>
            <option value="USA">USA</option>
            <option value="Mexico">Mexico</option>
            <option value="Canada">Canada</option>
          </select>

          <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)}>
            <option value="all">Any City</option>
            {venues
              .filter(v => selectedCountry === 'all' || v.country === selectedCountry)
              .sort((a,b) => a.city.localeCompare(b.city))
              .map(v => (
                <option key={v.id} value={v.id}>{v.city}</option>
              ))}
          </select>

          <select value={selectedDate} onChange={(e) => onDateChange(e.target.value)}>
            <option value="all">Any Date</option>
            <option value="2026-06-11">Jun 11</option>
            <option value="2026-06-12">Jun 12</option>
            <option value="2026-06-13">Jun 13</option>
            <option value="2026-06-14">Jun 14</option>
            <option value="2026-06-15">Jun 15</option>
            <option value="2026-06-16">Jun 16</option>
            {/* Extended dates can be mapped here */}
          </select>

          <select value={selectedStage} onChange={(e) => onStageChange(e.target.value)}>
            <option value="all">Any Stage</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="filter-actions-final">
          <button className="reset-link-final" onClick={onReset}>Clear All Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
