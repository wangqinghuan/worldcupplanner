import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import { venues } from '../data/venues';
import 'leaflet/dist/leaflet.css';
import './TeamRouteMap.css';

const StopIcon = (isGroupStage: boolean) => L.divIcon({
  className: 'stop-icon',
  html: `<div class="stop-marker ${isGroupStage ? 'group' : 'knockout'}"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

const CityLabelIcon = (city: string, stage: string) => L.divIcon({
  className: 'city-label-icon',
  html: `<div class="city-label"><span class="city-name">${city}</span><span class="city-stage">${stage}</span></div>`,
  iconSize: [120, 40],
  iconAnchor: [60, -10]
});

const PlaneIcon = (isGroupStage: boolean) => L.divIcon({
  className: 'plane-icon',
  html: `<div class="plane-marker ${isGroupStage ? 'group' : 'knockout'}">✈️</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const SegmentIcon = (num: string | number, isGroupStage: boolean) => L.divIcon({
  className: 'segment-icon',
  html: `<div class="segment-marker ${isGroupStage ? 'group' : 'knockout'}">${num}</div>`,
  iconSize: [num.toString().length > 1 ? 32 : 24, 24],
  iconAnchor: [(num.toString().length > 1 ? 32 : 24) / 2, 12]
});

interface TeamRouteMapProps {
  groupStageCities: string[];
  groupStageDates: string[];
  knockoutRoutes: {
    ifQualified: string;
    route: { stage: string; city: string }[];
  }[];
  selectedRouteIndex: number;
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const TeamRouteMap: React.FC<TeamRouteMapProps> = ({
  groupStageCities,
  groupStageDates,
  knockoutRoutes,
  selectedRouteIndex
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const getCityPosition = (cityName: string) => {
    const venue = venues.find(v => v.city === cityName);
    return venue ? { lat: venue.lat, lng: venue.lng, stadium: venue.stadium } : null;
  };

  const getAllStops = () => {
    const stops: { city: string; stage: string; date?: string; isGroupStage: boolean }[] = [];
    
    groupStageCities.forEach((city, idx) => {
      stops.push({ city, stage: 'Group Stage', date: groupStageDates[idx], isGroupStage: true });
    });
    
    const knockoutRoute = knockoutRoutes[selectedRouteIndex]?.route || [];
    knockoutRoute.forEach(stop => {
      stops.push({ city: stop.city, stage: stop.stage, isGroupStage: false });
    });
    
    return stops;
  };

  const allStops = getAllStops();
  const positions = allStops.map(s => getCityPosition(s.city)).filter(Boolean) as { lat: number; lng: number; stadium: string }[];

  const segments = useMemo(() => {
    const result: { from: [number, number]; to: [number, number]; num: number; isGroupStage: boolean; distance: number; isSameCity: boolean; curvePoints: [number, number][] }[] = [];
    let segmentNum = 0;

    for (let i = 0; i < positions.length - 1; i++) {
      const fromCity = allStops[i].city;
      const toCity = allStops[i + 1].city;
      const isGroupStage = allStops[i + 1].isGroupStage;
      const isSameCity = fromCity === toCity;

      const fromPos = [positions[i].lat, positions[i].lng] as [number, number];
      const toPos = [positions[i + 1].lat, positions[i + 1].lng] as [number, number];
      
      const distance = haversineDistance(positions[i].lat, positions[i].lng, positions[i + 1].lat, positions[i + 1].lng);
      
      if (!isSameCity) {
        segmentNum++;
      }

      const curvePoints: [number, number][] = [fromPos];
      
      if (isSameCity) {
        const offset = 0.15;
        const curvedLat = positions[i].lat + offset;
        const curvedLng = positions[i].lng + offset;
        
        for (let t = 0.05; t <= 0.95; t += 0.05) {
          const lat = Math.pow(1-t, 2) * positions[i].lat + 2 * (1-t) * t * curvedLat + Math.pow(t, 2) * positions[i + 1].lat;
          const lng = Math.pow(1-t, 2) * positions[i].lng + 2 * (1-t) * t * curvedLng + Math.pow(t, 2) * positions[i + 1].lng;
          curvePoints.push([lat, lng]);
        }
      } else {
        const midLat = (positions[i].lat + positions[i + 1].lat) / 2;
        const midLng = (positions[i].lng + positions[i + 1].lng) / 2;
        
        const latDiff = Math.abs(positions[i + 1].lat - positions[i].lat);
        const lngDiff = Math.abs(positions[i + 1].lng - positions[i].lng);
        const offset = Math.max(latDiff, lngDiff) * 0.35;
        
        const direction = segmentNum % 2 === 0 ? 1 : -1;
        const curvedLat = midLat + offset * direction;
        const curvedLng = midLng + offset * direction;
        
        for (let t = 0.05; t <= 0.95; t += 0.05) {
          const lat = Math.pow(1-t, 2) * positions[i].lat + 2 * (1-t) * t * curvedLat + Math.pow(t, 2) * positions[i + 1].lat;
          const lng = Math.pow(1-t, 2) * positions[i].lng + 2 * (1-t) * t * curvedLng + Math.pow(t, 2) * positions[i + 1].lng;
          curvePoints.push([lat, lng]);
        }
      }
      
      curvePoints.push(toPos);
      
      result.push({
        from: fromPos,
        to: toPos,
        num: segmentNum,
        isGroupStage,
        distance,
        isSameCity,
        curvePoints
      });
    }
    
    return result;
  }, [allStops, positions]);

  const validSegments = useMemo(() => segments.filter(s => !s.isSameCity), [segments]);

  const totalDistance = useMemo(() => segments.reduce((sum, seg) => sum + seg.distance, 0), [segments]);

  const getCurvePeak = (from: [number, number], to: [number, number], segmentIndex: number): [number, number] => {
    const midLat = (from[0] + to[0]) / 2;
    const midLng = (from[1] + to[1]) / 2;
    
    const latDiff = Math.abs(to[0] - from[0]);
    const lngDiff = Math.abs(to[1] - from[1]);
    const offset = Math.max(latDiff, lngDiff) * 0.35;
    
    const direction = segmentIndex % 2 === 0 ? 1 : -1;
    const curvedLat = midLat + offset * direction * 0.4;
    const curvedLng = midLng + offset * direction * 0.4;
    
    return [curvedLat, curvedLng];
  };

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const totalSegments = validSegments.length;
      if (totalSegments === 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      const durationPerSegment = 2000;
      const totalDuration = totalSegments * durationPerSegment;
      
      const progress = (timestamp - startTime) % totalDuration;
      setAnimationProgress(progress / totalDuration);
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [validSegments.length]);

  useEffect(() => {
    setAnimationProgress(0);
  }, [selectedRouteIndex]);

  const getPlanePosition = (): [number, number] => {
    const totalSegments = validSegments.length;
    if (totalSegments === 0) return [0, 0];
    
    const currentSegmentIndex = Math.floor(animationProgress * totalSegments);
    const segmentProgress = (animationProgress * totalSegments) % 1;
    
    const segIndex = Math.min(currentSegmentIndex, totalSegments - 1);
    const seg = validSegments[segIndex];
    
    if (!seg) return [0, 0];
    
    const numPoints = seg.curvePoints.length;
    const pointIndex = Math.floor(segmentProgress * (numPoints - 1));
    const pointProgress = (segmentProgress * (numPoints - 1)) % 1;
    
    const fromPoint = seg.curvePoints[Math.min(pointIndex, numPoints - 1)];
    const toPoint = seg.curvePoints[Math.min(pointIndex + 1, numPoints - 1)];
    
    const lat = fromPoint[0] + (toPoint[0] - fromPoint[0]) * pointProgress;
    const lng = fromPoint[1] + (toPoint[1] - fromPoint[1]) * pointProgress;
    
    return [lat, lng];
  };

  const getCurrentSegmentIndex = (): number => {
    const totalSegments = validSegments.length;
    if (totalSegments === 0) return -1;
    return Math.min(Math.floor(animationProgress * totalSegments), totalSegments - 1);
  };

  const toggleFullscreen = async () => {
    if (!mapRef.current) return;
    
    try {
      if (!isFullscreen) {
        await mapRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.log('Fullscreen error:', err);
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const currentSegIndex = getCurrentSegmentIndex();

  return (
    <div className={`team-route-map ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="map-header">
        <h3>🗺️ Your Travel Route</h3>
      </div>
      <p className="route-title">{knockoutRoutes[selectedRouteIndex]?.ifQualified}</p>
      
      <div className="map-container" ref={mapRef}>
        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          {isFullscreen ? '✕' : '⛶'}
        </button>
        <MapContainer
          center={[40, -100]}
          zoom={4}
          scrollWheelZoom={true}
          className="leaflet-container"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {segments.map((seg, idx) => {
            const color = seg.isGroupStage ? '#22c55e' : '#3b82f6';
            const isPast = currentSegIndex > idx || (currentSegIndex === idx && animationProgress * validSegments.length > idx);
            const isCurrent = currentSegIndex === idx;
            
            return (
              <Polyline
                key={`seg-${idx}`}
                positions={seg.curvePoints}
                color={color}
                weight={isCurrent ? 5 : 4}
                opacity={isPast || isCurrent ? 0.9 : 0.4}
                lineCap="round"
                lineJoin="round"
              />
            );
          })}

          {validSegments.map((seg, idx) => {
            const peak = getCurvePeak(seg.from, seg.to, seg.num);
            const isPast = currentSegIndex > idx;
            const isCurrent = currentSegIndex === idx;
            
            return (
              <Marker
                key={`seg-marker-${idx}`}
                position={peak}
                icon={SegmentIcon(seg.num, seg.isGroupStage)}
                opacity={isPast || isCurrent ? 1 : 0.4}
              />
            );
          })}

          {validSegments.length > 0 && (
            <Marker
              key={`plane-${animationProgress}`}
              position={getPlanePosition()}
              icon={PlaneIcon(validSegments[currentSegIndex]?.isGroupStage ?? false)}
              zIndexOffset={1000}
            />
          )}
          
          {allStops.map((stop, idx) => {
            const pos = getCityPosition(stop.city);
            if (!pos) return null;
            return (
              <React.Fragment key={`stop-${stop.city}-${idx}`}>
                <Marker
                  position={[pos.lat, pos.lng]}
                  icon={StopIcon(stop.isGroupStage)}
                >
                  <Popup>
                    <div className="route-popup">
                      <strong>Match {idx + 1}</strong>
                      <p>{stop.city}</p>
                      <p className="stage">{stop.stage}</p>
                      {stop.date && <p className="date">{stop.date}</p>}
                      <p className="venue">{pos.stadium}</p>
                    </div>
                  </Popup>
                </Marker>
                <Marker
                  position={[pos.lat, pos.lng]}
                  icon={CityLabelIcon(stop.city, stop.stage)}
                />
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      <div className="map-stats">
        <div className="distance-info">
          <span className="distance-label">Total Distance:</span>
          <span className="distance-value">{Math.round(totalDistance)} miles</span>
        </div>
      </div>

      <div className="map-legend-new">
        <div className="legend-item">
          <span className="legend-line group"></span>
          <span>Group Stage</span>
        </div>
        <div className="legend-item">
          <span className="legend-line knockout"></span>
          <span>Knockout</span>
        </div>
      </div>
    </div>
  );
};

export default TeamRouteMap;
