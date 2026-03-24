import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { venues } from '../data/venues';
import type { Itinerary } from '../utils/geminiRouteGenerator';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

const NumberIcon = (num: number) => L.divIcon({
  className: 'custom-number-icon',
  html: `<div class="number-marker">${num}</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

interface MapViewProps {
  plan?: Itinerary | null;
  onCitySelect?: (cityId: string) => void;
}

const cityNameMap: Record<string, string> = {
  'New York': 'New York/New Jersey',
  'NY': 'New York/New Jersey',
  'NYC': 'New York/New Jersey',
  'San Francisco': 'San Francisco Bay Area',
  'SF': 'San Francisco Bay Area',
  'Los Angeles': 'Los Angeles',
  'LA': 'Los Angeles',
};

const normalizeCityName = (city: string): string => {
  return cityNameMap[city] || city;
};

const MapView: React.FC<MapViewProps> = ({ plan, onCitySelect }) => {
  const handleCityClick = (cityId: string) => {
    if (onCitySelect) {
      onCitySelect(cityId);
    }
  };

  const orderedCities = useMemo(() => {
    if (plan) {
      const seen = new Set<string>();
      const uniqueCities: string[] = [];
      
      plan.days.forEach(day => {
        if (!seen.has(day.city)) {
          seen.add(day.city);
          uniqueCities.push(day.city);
        }
      });
      
      return uniqueCities.map((city, idx) => {
        const normalizedCity = normalizeCityName(city);
        const venue = venues.find(v => v.city === normalizedCity);
        return {
          city: city,
          order: idx + 1,
          venue: venue,
          uniqueKey: `city-${city}`
        };
      });
    }
    return [];
  }, [plan]);

  const routeLines = useMemo(() => {
    const lines: {from: [number, number], to: [number, number], mode: string}[] = [];
    for (let i = 0; i < orderedCities.length - 1; i++) {
      const from = orderedCities[i].venue;
      const to = orderedCities[i + 1].venue;
      if (from && to) {
        const distance = Math.sqrt(
          Math.pow(to.lat - from.lat, 2) + Math.pow(to.lng - from.lng, 2)
        );
        lines.push({
          from: [from.lat, from.lng],
          to: [to.lat, to.lng],
          mode: distance > 5 ? 'flight' : 'drive'
        });
      }
    }
    return lines;
  }, [orderedCities]);

  if (!plan) {
    return (
      <div className="map-view-container">
        <h2 className="section-title">Route Map</h2>
        <div className="map-empty">
          <p>Generate an itinerary to view your route map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-view-container">
      <h2 className="section-title">Route Map</h2>
      <div className="map-wrapper">
        <MapContainer 
          center={[38, -98]} 
          zoom={4} 
          scrollWheelZoom={true}
          className="leaflet-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {routeLines.map((line, idx) => (
            <Polyline 
              key={idx}
              positions={[line.from, line.to]} 
              color={line.mode === 'flight' ? '#3b82f6' : '#10b981'}
              weight={line.mode === 'flight' ? 2 : 3}
              dashArray={line.mode === 'flight' ? '5, 10' : undefined}
              opacity={0.8}
            />
          ))}

          {orderedCities.map((item) => {
            if (!item.venue) return null;
            return (
              <Marker
                key={item.uniqueKey}
                position={[item.venue.lat, item.venue.lng]}
                icon={NumberIcon(item.order)}
                eventHandlers={{
                  click: () => handleCityClick(item.venue?.id || ''),
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <strong>{item.city}</strong>
                    <p>{item.venue.stadium}</p>
                    <small>Stop #{item.order}</small>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      {routeLines.length > 0 && (
        <div className="route-legend">
          <span className="legend-item"><span className="dot flight"></span> Flight</span>
          <span className="legend-item"><span className="dot drive"></span> Drive</span>
        </div>
      )}
    </div>
  );
};

export default MapView;
