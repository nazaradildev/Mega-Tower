
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TowerControl } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

// --- Leaflet Icon Fix ---
// This is a common workaround for a bug in Leaflet where default icons don't load correctly with bundlers like Webpack.
// We are creating a custom icon that points to the correct image paths.
const customIconHTML = ReactDOMServer.renderToString(
  <div className="bg-primary-gradient p-2 rounded-full shadow-lg">
    <TowerControl className="h-6 w-6 text-primary-foreground" />
  </div>
);

const customMarkerIcon = new L.DivIcon({
  html: customIconHTML,
  className: 'dummy-class-to-avoid-default-leaflet-styling', // This class is not styled, it's just to prevent Leaflet from applying its own styles.
  iconSize: [40, 40],
  iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -40] // Point from which the popup should open relative to the iconAnchor
});


const EsriSatelliteURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const EsriAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

// Coordinates for Burj Khalifa
const burjKhalifaPosition: L.LatLngExpression = [25.1972, 55.2744];

export function Map() {
  return (
    <MapContainer 
      center={burjKhalifaPosition} 
      zoom={15} 
      className="h-full w-full rounded-lg"
      scrollWheelZoom={false}
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
