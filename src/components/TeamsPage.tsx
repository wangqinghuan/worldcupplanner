import React, { useState } from 'react';
import { teams, type Group, type Team } from '../data/teams';
import './TeamsPage.css';

const groups: Group[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const TeamsPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = ['all', 'Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];

  const filteredTeams = teams.filter(team => {
    const groupMatch = selectedGroup === 'all' || team.group === selectedGroup;
    const regionMatch = selectedRegion === 'all' || team.region === selectedRegion;
    const searchMatch = searchQuery === '' || 
      team.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return groupMatch && regionMatch && searchMatch;
  });

  const groupTeamsByGroup = () => {
    if (selectedGroup !== 'all') {
      return { [selectedGroup]: filteredTeams };
    }
    
    const grouped: Record<string, Team[]> = {};
    filteredTeams.forEach(team => {
      if (!grouped[team.group]) {
        grouped[team.group] = [];
      }
      grouped[team.group].push(team);
    });
    return grouped;
  };

  const grouped = groupTeamsByGroup();

  return (
    <div className="teams-page">
      <header className="teams-header">
        <h1>2026 FIFA World Cup Teams</h1>
        <p className="subtitle">48 qualified teams from 6 continents</p>
        
        <div className="filters">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="filter-select"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>
        </div>

        <div className="group-tabs">
          <button
            className={`group-tab ${selectedGroup === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedGroup('all')}
          >
            All
          </button>
          {groups.map(group => (
            <button
              key={group}
              className={`group-tab ${selectedGroup === group ? 'active' : ''}`}
              onClick={() => setSelectedGroup(group)}
            >
              Group {group}
            </button>
          ))}
        </div>
      </header>

      <div className="teams-content">
        <div className="results-count">
          Showing {filteredTeams.length} teams
        </div>

        {Object.entries(grouped).map(([group, groupTeams]) => (
          <div key={group} className="group-section">
            {selectedGroup === 'all' && (
              <h2 className="group-title">Group {group}</h2>
            )}
            
            <div className="teams-grid">
              {groupTeams.map(team => (
                <div key={team.id} className="team-card">
                  <div className="team-flag">{team.flag}</div>
                  <div className="team-info">
                    <h3 className="team-name">{team.name}</h3>
                    <div className="team-meta">
                      <span className="region">{team.region}</span>
                      {team.fifaRank && (
                        <span className="rank">FIFA #{team.fifaRank}</span>
                      )}
                    </div>
                    <div className="team-stats">
                      {team.titles > 0 && (
                        <span className="titles">{team.titles} World Cup title{team.titles > 1 ? 's' : ''}</span>
                      )}
                      <span className="group-badge">Group {team.group}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredTeams.length === 0 && (
          <div className="no-results">
            <p>No teams found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
