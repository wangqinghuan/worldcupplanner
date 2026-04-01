import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { ItineraryProvider } from './context/ItineraryContext';
import { RoutesProvider } from './context/RoutesContext';
import './styles/globals.css';

import HomePageEntry from './components/HomePageEntry';
import TeamRoutesPage from './components/TeamRoutesPage';
import TeamRouteDetail from './components/TeamRouteDetail';
import MatchSelectionPage from './components/MatchSelectionPage';
import RoutesListPage from './components/RoutesListPage';
import ItineraryPage from './components/ItineraryPage';

type View = 'home' | 'team-routes' | 'team-detail' | 'match-selection' | 'routes-list' | 'itinerary';

function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [selectedMatchIds, setSelectedMatchIds] = useState<number[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  const handleNavigate = (view: string) => {
    setActiveView(view as View);
  };

  const handleSelectTeam = (teamId: string) => {
    setSelectedTeamId(teamId);
    setActiveView('team-detail');
  };

  const handleSelectRoute = (_routeId: string, matchIds: number[]) => {
    setSelectedMatchIds(matchIds);
    setActiveView('itinerary');
  };

  const handleGenerateItinerary = (matchIds: number[]) => {
    setSelectedMatchIds(matchIds);
    setActiveView('itinerary');
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomePageEntry onNavigate={handleNavigate} />;
      case 'team-routes':
        return (
          <TeamRoutesPage 
            onSelectTeam={handleSelectTeam}
            onBack={() => setActiveView('home')}
          />
        );
      case 'team-detail':
        return (
          <TeamRouteDetail
            teamId={selectedTeamId}
            onGenerateItinerary={handleGenerateItinerary}
            onBack={() => setActiveView('team-routes')}
          />
        );
      case 'match-selection':
        return (
          <MatchSelectionPage
            onGenerateItinerary={handleGenerateItinerary}
            onBack={() => setActiveView('home')}
          />
        );
      case 'routes-list':
        return (
          <RoutesListPage
            onSelectRoute={handleSelectRoute}
            onBack={() => setActiveView('home')}
          />
        );
      case 'itinerary':
        return (
          <ItineraryPage
            matchIds={selectedMatchIds}
            onBack={() => setActiveView('home')}
          />
        );
      default:
        return <HomePageEntry onNavigate={handleNavigate} />;
    }
  };

  return (
    <ItineraryProvider>
      <RoutesProvider>
        <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header 
            activeView={activeView === 'team-detail' ? 'team-routes' : activeView === 'itinerary' ? 'home' : activeView} 
            onViewChange={handleNavigate}
          />
          
          <main style={{ flex: 1 }}>
            {renderView()}
          </main>

          <Footer />
        </div>
      </RoutesProvider>
    </ItineraryProvider>
  );
}

export default App;
