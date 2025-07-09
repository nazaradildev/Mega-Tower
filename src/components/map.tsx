
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

// --- Leaflet Icon Fix ---
const customMarkerIcon = new L.Icon({
  iconUrl: '/khalifatower.png',
  iconSize: [40, 40], // Adjust size as needed
  iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -40] // Point from which the popup should open relative to the iconAnchor
});


const EsriSatelliteURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const EsriAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

// Coordinates for Burj Khalifa
const burjKhalifaPosition: L.LatLngExpression = [25.1972, 55.2744];

export function Map() {
  const mapRef = React.useRef<L.Map | null>(null);

  const setMap = React.useCallback((mapInstance: L.Map) => {
    // This is to prevent re-initialization error in dev environment with HMR
    if (mapRef.current) return;
    mapRef.current = mapInstance;
  }, []);

  return (
    <MapContainer 
      center={burjKhalifaPosition} 
      zoom={15} 
      className="h-full w-full rounded-lg"
      scrollWheelZoom={false}
      whenCreated={setMap}
      >
      <TileLayer
        url={EsriSatelliteURL}
        attribution={EsriAttribution}
      />
      <Marker position={burjKhalifaPosition} icon={customMarkerIcon}>
        <Popup>
          <div className="font-bold font-headline">Churchill Towers</div>
          <p className="text-sm">Business Bay, Dubai</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
