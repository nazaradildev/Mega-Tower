
'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';

// --- Leaflet Icon Fix ---
const customMarkerIcon = new L.Icon({
  iconUrl: '/khalifatower.png',
  iconSize: [80, 80], // Adjust size as needed
  iconAnchor: [40, 80], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -80] // Point from which the popup should open relative to the iconAnchor
});


const EsriSatelliteURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const EsriAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

// Coordinates for Burj Khalifa
const burjKhalifaPosition: L.LatLngExpression = [25.1972, 55.2744];

export function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    let map: L.Map;
    if (mapContainerRef.current && !mapRef.current) {
        // Map is not initialized yet
        map = L.map(mapContainerRef.current, {
            center: burjKhalifaPosition,
            zoom: 15,
            scrollWheelZoom: false,
            attributionControl: false, // This will hide the attribution control
        });

        L.tileLayer(EsriSatelliteURL, {
            attribution: EsriAttribution,
        }).addTo(map);

        L.marker(burjKhalifaPosition, { icon: customMarkerIcon })
            .addTo(map)
            .bindPopup(
                '<div class="font-bold font-headline">Burj Khalifa</div>'
            );
        
        mapRef.current = map;
    }

    // Cleanup function
    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <div ref={mapContainerRef} className="h-full w-full rounded-lg" />
  );
}
