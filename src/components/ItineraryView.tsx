import React, { useEffect, useState, useRef } from 'react';
import { useItinerary } from '../context/ItineraryContext';
import { generateItinerary } from '../utils/geminiRouteGenerator';
import { matches } from '../data/matches';
import MapView from './MapView';
import './ItineraryView.css';

const formatDateRange = (start: string, end: string) => {
  const days = Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${start} ~ ${end} (${days} days)`;
};

const formatCreatedTime = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const parseActivity = (activity: string) => {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(activity)) !== null) {
    if (match.index > lastIndex) {
      parts.push(activity.slice(lastIndex, match.index));
    }
    parts.push(
      <a 
        key={key++} 
        href={match[2]} 
        target="_blank" 
        rel="noopener noreferrer"
        className="activity-link"
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < activity.length) {
    parts.push(activity.slice(lastIndex));
  }

  return parts.length > 0 ? parts : activity;
};

const ItineraryView: React.FC = () => {
  const { 
    plans,
    currentPlanId,
    addPlan,
    deletePlan,
    setCurrentPlan,
    isGenerating, 
    setIsGenerating, 
    pendingRouteData, 
    pendingTeamData, 
    setPendingRouteData, 
    setPendingTeamData, 
    clearAll 
  } = useItinerary();
  
  const [error, setError] = useState<string | null>(null);
  const [, setNow] = useState(Date.now());
  const isGeneratingRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const generatePlan = async () => {
      if (isGeneratingRef.current) return;
      
      if (pendingRouteData) {
        isGeneratingRef.current = true;
        setIsGenerating(true);
        setError(null);
        try {
          const result = await generateItinerary(
            { name: pendingRouteData.routeName, cities: pendingRouteData.cities },
            pendingRouteData.arrivalDate,
            pendingRouteData.departureDate,
            'balanced',
            matches
          );
          
          addPlan({
            name: pendingRouteData.routeName,
            cities: pendingRouteData.cities,
            arrivalDate: pendingRouteData.arrivalDate,
            departureDate: pendingRouteData.departureDate,
            itinerary: result,
          });
        } catch (e) {
          console.error('Failed to generate itinerary:', e);
          setError(e instanceof Error ? e.message : 'Failed to generate itinerary. Please try again.');
        } finally {
          setIsGenerating(false);
          setPendingRouteData(null);
          isGeneratingRef.current = false;
        }
      } else if (pendingTeamData) {
        isGeneratingRef.current = true;
        setIsGenerating(true);
        setError(null);
        try {
          const result = await generateItinerary(
            { name: pendingTeamData.teamName, cities: pendingTeamData.cities },
            pendingTeamData.arrivalDate,
            pendingTeamData.departureDate,
            'balanced',
            matches
          );
          
          addPlan({
            name: pendingTeamData.teamName,
            cities: pendingTeamData.cities,
            arrivalDate: pendingTeamData.arrivalDate,
            departureDate: pendingTeamData.departureDate,
            itinerary: result,
          });
        } catch (e) {
          console.error('Failed to generate itinerary:', e);
          setError(e instanceof Error ? e.message : 'Failed to generate itinerary. Please try again.');
        } finally {
          setIsGenerating(false);
          setPendingTeamData(null);
          isGeneratingRef.current = false;
        }
      }
    };

    generatePlan();
  }, [pendingRouteData, pendingTeamData, addPlan, setIsGenerating, setPendingRouteData, setPendingTeamData]);

  const handleRetry = () => {
    setError(null);
    isGeneratingRef.current = false;
  };

  if (isGenerating) {
    return (
      <div className="itinerary-view">
        <div className="generating-overlay">
          <div className="generating-content">
            <div className="spinner"></div>
            <h2>🤖 Creating your trip plan...</h2>
            <p>This will only take a moment</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="itinerary-view">
        <div className="error-state">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button className="btn-retry" onClick={handleRetry}>
                🔄 Try Again
              </button>
              <button className="btn-ghost" onClick={clearAll}>
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="empty-itinerary">
        <div className="empty-content">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <h2>Plan Your World Cup Trip</h2>
          <p>Generate a plan from Routes or Team Schedules pages.</p>
        </div>
      </div>
    );
  }

  const currentPlan = plans.find(p => p.id === currentPlanId) || plans[plans.length - 1];
  const otherPlans = plans.filter(p => p.id !== currentPlan?.id);

  return (
    <div className="itinerary-view">
      <div className="itinerary-header">
        <div className="summary-banner">
          <h2>📋 My Trip Plans ({plans.length})</h2>
        </div>
        
        <div className="plans-sidebar">
          <div className="plans-list">
            {currentPlan && (
              <div 
                className="plan-item current"
                role="button"
                tabIndex={0}
              >
                <div className="plan-item-header">
                  <span className="plan-badge current-badge">Active</span>
                  <span className="plan-time">{formatCreatedTime(currentPlan.createdAt)}</span>
                </div>
                <div className="plan-item-name">{currentPlan.name}</div>
                <div className="plan-item-dates">{formatDateRange(currentPlan.arrivalDate, currentPlan.departureDate)}</div>
                <div className="plan-item-cities">{currentPlan.cities.join(' → ')}</div>
              </div>
            )}
            
            {otherPlans.length > 0 && (
              <div className="other-plans-header">Other Plans</div>
            )}
            
            {otherPlans.map((plan) => (
              <div key={plan.id} className="plan-item saved-plan">
                <div className="plan-item-header">
                  <span className="plan-badge">Saved</span>
                  <span className="plan-time">{formatCreatedTime(plan.createdAt)}</span>
                  <button 
                    className="btn-delete-plan" 
                    onClick={(e) => { e.stopPropagation(); deletePlan(plan.id); }}
                    title="Delete plan"
                  >
                    ×
                  </button>
                </div>
                <div className="plan-item-name">{plan.name}</div>
                <div className="plan-item-dates">{formatDateRange(plan.arrivalDate, plan.departureDate)}</div>
                <button 
                  className="btn-set-current" 
                  onClick={() => setCurrentPlan(plan.id)}
                >
                  View This Plan
                </button>
              </div>
            ))}
          </div>
          
          <div className="plans-actions">
            <button className="btn-ghost btn-sm" onClick={clearAll}>Clear All</button>
          </div>
        </div>
      </div>

      {currentPlan && (
        <div className="itinerary-body">
          <div className="matches-list">
            <div className="itinerary-title">
              <h3>{currentPlan.name}</h3>
              <span className="days-count">{currentPlan.itinerary.days.length} days</span>
            </div>
            {currentPlan.itinerary.days.map((day, i) => (
              <div key={i} className="ai-day-card">
                <div className="ai-day-header">
                  <span className="ai-day-num">Day {day.day}</span>
                  <span className="ai-day-date">{day.date}</span>
                  <span className="ai-day-city">📍 {day.city}</span>
                  {day.transport && <span className="ai-day-transport">🚗 {day.transport}</span>}
                </div>
                <div className="ai-day-activities">
                  {day.activities.map((activity, j) => (
                    <div key={j} className="activity-item">• {parseActivity(activity)}</div>
                  ))}
                </div>
                {day.matches.length > 0 && (
                  <div className="ai-day-matches">⚽ {day.matches.join(', ')}</div>
                )}
              </div>
            ))}
          </div>

          <div className="map-panel">
            <MapView plan={currentPlan.itinerary} onCitySelect={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryView;
