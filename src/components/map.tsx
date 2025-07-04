"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { IconOptions } from 'leaflet';

// Fix for default icon path issue with webpack
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const position: [number, number] = [25.1843, 55.2633]; // Approx. coordinates for Churchill Towers, Business Bay

export function Map() {
  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full rounded-lg shadow-lg z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position}>
        <Popup>
          <b>Churchill Towers</b><br />
          Business Bay, Dubai. <br />
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Get Directions
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
