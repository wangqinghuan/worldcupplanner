import React from 'react';
import StandingsTable from './StandingsTable';
import { type Group } from '../data/teams';
import './StandingsPage.css';

const groups: Group[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const StandingsPage: React.FC = () => {
  return (
    <div className="standings-page-full">
      <header className="standings-header-full">
        <h1>🏆 Group Standings</h1>
        <p className="subtitle">Live tournament standings by group</p>
      </header>
      <div className="standings-content-full">
        <div className="standings-grid-full">
          {groups.map(group => (
            <StandingsTable key={group} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StandingsPage;
