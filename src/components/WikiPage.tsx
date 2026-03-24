import React, { useState } from 'react';
import { worldCupWinners, worldCupRecords, topScorers, hostCountries, famousMoments, tournamentStats, funFacts } from '../data/wiki';
import './WikiPage.css';

type Tab = 'overview' | 'winners' | 'moments' | 'fun' | 'records' | 'scorers' | 'hosts';

const WikiPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('winners');

  return (
    <div className="wiki-page">
      <header className="wiki-header">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>📚 World Cup History</h1>
          <p className="hero-subtitle">The Complete Guide to FIFA World Cup (1930-2026)</p>
        </div>
      </header>

      <div className="wiki-content">
        <div className="wiki-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
          <button 
            className={`tab ${activeTab === 'winners' ? 'active' : ''}`}
            onClick={() => setActiveTab('winners')}
          >
            🏆 Champions
          </button>
          <button 
            className={`tab ${activeTab === 'moments' ? 'active' : ''}`}
            onClick={() => setActiveTab('moments')}
          >
            ⭐ Famous Moments
          </button>
          <button 
            className={`tab ${activeTab === 'fun' ? 'active' : ''}`}
            onClick={() => setActiveTab('fun')}
          >
            💡 Did You Know?
          </button>
          <button 
            className={`tab ${activeTab === 'records' ? 'active' : ''}`}
            onClick={() => setActiveTab('records')}
          >
            📊 Records
          </button>
          <button 
            className={`tab ${activeTab === 'scorers' ? 'active' : ''}`}
            onClick={() => setActiveTab('scorers')}
          >
            ⚽ Top Scorers
          </button>
          <button 
            className={`tab ${activeTab === 'hosts' ? 'active' : ''}`}
            onClick={() => setActiveTab('hosts')}
          >
            🌍 Host History
          </button>
        </div>

        <div className="wiki-section">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h2>World Cup at a Glance</h2>
              <p className="section-intro">The FIFA World Cup is the biggest sporting event on Earth</p>
              
              <div className="stats-grid">
                {tournamentStats.map((stat, idx) => (
                  <div key={idx} className="stat-card">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-note">{stat.note}</div>
                  </div>
                ))}
              </div>

              <div className="overview-text">
                <h3>About the World Cup</h3>
                <p>
                  The FIFA World Cup is an international football competition contested by the senior 
                  national teams of the member nations of FIFA. It is held every four years and is 
                  the most prestigious trophy in international football.
                </p>
                <p>
                  The first World Cup was held in 1930 in Uruguay, with only 13 teams participating. 
                  Since then, it has grown to include up to 48 teams (starting from 2026), with over 
                  1 billion people watching the final.
                </p>
                <p>
                  <strong>2026 World Cup</strong> will make history as the first tournament hosted by 
                  three countries - USA, Canada, and Mexico. With 48 teams and 104 matches, it will 
                  be the biggest World Cup ever!
                </p>
              </div>

              <div className="trophy-section">
                <h3>🏆 The Trophy</h3>
                <p>
                  The current FIFA World Cup Trophy was introduced in 1974. Made of 18-carat gold, 
                  it stands 36.8 cm tall and weighs 6.175 kg. The names of the winning nations are 
                  engraved on the bottom of the trophy.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'moments' && (
            <div className="moments-section">
              <h2>Famous World Cup Moments</h2>
              <p className="section-intro">The most memorable moments in World Cup history</p>
              
              <div className="moments-timeline">
                {famousMoments.map((moment, idx) => (
                  <div key={idx} className="moment-card">
                    <div className="moment-year">{moment.year}</div>
                    <div className="moment-title">{moment.title}</div>
                    <div className="moment-desc">{moment.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'fun' && (
            <div className="fun-section">
              <h2>💡 Did You Know?</h2>
              <p className="section-intro">25 surprising facts about the World Cup</p>
              
              <div className="fun-grid">
                {funFacts.map((fact) => (
                  <div key={fact.id} className="fun-card">
                    <div className="fun-icon">{fact.icon}</div>
                    <div className="fun-title">{fact.title}</div>
                    <div className="fun-desc">{fact.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'winners' && (
            <div className="winners-section">
              <h2>All World Cup Champions (1930-2022)</h2>
              <p className="section-intro">22 tournaments, 8 different champions</p>
              
              <div className="winners-grid">
                {worldCupWinners.slice().reverse().map((wc) => (
                  <div key={wc.year} className="winner-card">
                    <div className="year">{wc.year}</div>
                    <div className="host">{wc.host}</div>
                    <div className="winner">{wc.winner}</div>
                    <div className="score">{wc.score}</div>
                    <div className="runner-up">vs {wc.runnerUp}</div>
                  </div>
                ))}
              </div>

              <div className="titles-summary">
                <h3>🏆 Titles by Country</h3>
                <div className="titles-grid">
                  <div className="title-item">
                    <span className="flag">🇧🇷</span>
                    <span className="country">Brazil</span>
                    <span className="count">5</span>
                    <span className="years">1958, 62, 70, 94, 02</span>
                  </div>
                  <div className="title-item">
                    <span className="flag">🇩🇪</span>
                    <span className="country">Germany</span>
                    <span className="count">4</span>
                    <span className="years">1954, 74, 90, 14</span>
                  </div>
                  <div className="title-item">
                    <span className="flag">🇮🇹</span>
                    <span className="country">Italy</span>
                    <span className="count">4</span>
                    <span className="years">1934, 38, 82, 06</span>
                  </div>
                  <div className="title-item">
                    <span className="flag">🇦🇷</span>
                    <span className="country">Argentina</span>
                    <span className="count">3</span>
                    <span className="years">1978, 86, 22</span>
                  </div>
                  <div className="title-item">
                    <span className="flag">🇫🇷</span>
                    <span className="country">France</span>
                    <span className="count">2</span>
                    <span className="years">1998, 2018</span>
                  </div>
                  <div className="title-item">
                    <span className="flag">🇺🇾</span>
                    <span className="country">Uruguay</span>
                    <span className="count">2</span>
                    <span className="years">1930, 1950</span>
                  </div>
                  <div className="title-item">
                    <span className="flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                    <span className="country">England</span>
                    <span className="count">1</span>
                    <span className="years">1966</span>
                  </div>
                  <div className="title-item">
                    <span className="flag">🇪🇸</span>
                    <span className="country">Spain</span>
                    <span className="count">1</span>
                    <span className="years">2010</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="records-section">
              <h2>World Cup Records</h2>
              <p className="section-intro">Historic achievements since 1930</p>
              
              <div className="records-grid">
                {worldCupRecords.map((record, idx) => (
                  <div key={idx} className="record-card">
                    <div className="record-category">{record.category}</div>
                    <div className="record-value">{record.value}</div>
                    <div className="record-desc">{record.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scorers' && (
            <div className="scorers-section">
              <h2>All-Time Top Scorers</h2>
              <p className="section-intro">Most goals in World Cup history</p>
              
              <table className="scorers-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Country</th>
                    <th>Goals</th>
                    <th>Tournaments</th>
                  </tr>
                </thead>
                <tbody>
                  {topScorers.map((scorer) => (
                    <tr key={scorer.rank}>
                      <td className="rank">#{scorer.rank}</td>
                      <td className="player">{scorer.player}</td>
                      <td className="country">{scorer.country}</td>
                      <td className="goals">{scorer.goals}</td>
                      <td className="years">{scorer.years}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'hosts' && (
            <div className="hosts-section">
              <h2>Host Nations History</h2>
              <p className="section-intro">Every World Cup host country</p>
              
              <table className="hosts-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Host(s)</th>
                    <th>Teams</th>
                    <th>Matches</th>
                  </tr>
                </thead>
                <tbody>
                  {hostCountries.map((host) => (
                    <tr key={host.year} className={host.year === 2026 ? 'current' : ''}>
                      <td className="year">{host.year}</td>
                      <td className="host">{host.host}</td>
                      <td className="teams">{host.teams}</td>
                      <td className="matches">{host.matches}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="host-note">
                <p>📌 <strong>2026 World Cup:</strong> First tournament hosted by three countries (USA, Canada, Mexico). 
                Expanded to 48 teams and 104 matches - the biggest World Cup ever!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WikiPage;
