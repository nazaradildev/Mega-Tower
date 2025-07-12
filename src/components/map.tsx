
'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';

// --- Leaflet Icon Fix ---
const customMarkerIcon = new L.Icon({
  iconUrl: '/khalifatower.png',
  iconSize: [120, 120], // Adjust size as needed
  iconAnchor: [60, 120], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -120] // Point from which the popup should open relative to the iconAnchor
});


const EsriSatelliteURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const EsriAttribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

// Coordinates for Burj Khalifa
const burjKhalifaPosition: L.LatLngExpression = [25.1972, 55.2744];

export function Map({ isInDialog = false }: { isInDialog?: boolean }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Ensure the cleanup happens only once by checking if a map instance already exists on the ref
    if (mapContainerRef.current && !mapRef.current) {
        mapRef.current = L.map(mapContainerRef.current, {
            center: burjKhalifaPosition,
            zoom: 15,
            scrollWheelZoom: false,
            attributionControl: false, 
        });

        L.tileLayer(EsriSatelliteURL).addTo(mapRef.current);

        L.marker(burjKhalifaPosition, { icon: customMarkerIcon })
            .addTo(mapRef.current)
            .bindPopup(
                '<div class="font-bold font-headline">Burj Khalifa</div>'
            );
    }
    
    // Invalidate size when map is shown in a dialog to fix tile loading issues
    if (isInDialog && mapRef.current) {
      setTimeout(() => {
          mapRef.current?.invalidateSize();
      }, 100);
    }

    // Cleanup function
    return () => {
        if (mapRef.current) {
            // This check prevents error during fast refresh in development
            if ((mapRef.current as any)._container) {
                mapRef.current.remove();
            }
            mapRef.current = null;
        }
    };
  }, [isInDialog]);

  return (
    <div ref={mapContainerRef} className="h-full w-full" />
  );
}
