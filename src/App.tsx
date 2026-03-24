import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SchedulePage from './components/SchedulePage';
import StandingsPage from './components/StandingsPage';
import ItineraryView from './components/ItineraryView';
import RoutesPage from './components/RoutesPage';
import { ItineraryProvider } from './context/ItineraryContext';
import { RoutesProvider } from './context/RoutesContext';
import './styles/globals.css';

type View = 'schedule' | 'standings' | 'itinerary' | 'routes';

function App() {
  const [activeView, setActiveView] = useState<View>('schedule');

  const renderView = () => {
    switch (activeView) {
      case 'schedule':
        return <SchedulePage />;
      case 'standings':
        return <StandingsPage />;
      case 'itinerary':
        return <ItineraryView />;
      case 'routes':
        return <RoutesPage onNavigate={(view) => setActiveView(view as View)} />;
      default:
        return <SchedulePage />;
    }
  };

  return (
    <ItineraryProvider>
      <RoutesProvider>
        <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header 
            activeView={activeView} 
            onViewChange={(view) => setActiveView(view as View)} 
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