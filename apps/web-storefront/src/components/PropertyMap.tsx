"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PropertySummary } from "@welqo/types";

// Custom CSS for Price Bubbles
const priceBubbleStyle = `
  .price-bubble {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 99px;
    padding: 4px 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 12px;
    color: #0f172a;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    white-space: nowrap;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .price-bubble:hover {
    background: #e67e22;
    color: white;
    border-color: #e67e22;
    transform: scale(1.1);
    z-index: 1000;
  }
  .dark .price-bubble {
    background: #1e293b;
    color: white;
    border-color: #334155;
  }
  .dark .price-bubble:hover {
    background: #e67e22;
    border-color: #e67e22;
  }
`;

interface PropertyMapProps {
  properties: PropertySummary[];
  center?: [number, number];
  zoom?: number;
}

// Component to handle map center updates when properties change
function ChangeView({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && (bounds as any).length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

export const PropertyMap = ({ 
  properties, 
  center = [50.4292, 2.8319], // Default to Lens
  zoom = 12 
}: PropertyMapProps) => {
  useEffect(() => {
    const styleId = 'leaflet-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = priceBubbleStyle;
      document.head.appendChild(style);
    }
  }, []);

  // Calculate map bounds
  const validProperties = properties.filter(p => p.location.latitude && p.location.longitude);
  const bounds = validProperties.map(p => [p.location.latitude!, p.location.longitude!] as [number, number]);

  return (
    <div className="w-full h-full z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="w-full h-full"
        zoomControl={false}
      >
        <ChangeView bounds={bounds} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Mockup Interest Area (Subtle Dark Circle) */}
        {validProperties.length > 0 && (
          <Circle 
            center={[validProperties[0].location.latitude!, validProperties[0].location.longitude!]}
            pathOptions={{ 
              fillColor: '#0f172a', 
              fillOpacity: 0.05, 
              color: '#0f172a', 
              weight: 1,
              dashArray: '8, 8'
            }}
            radius={1500}
          />
        )}

        {validProperties.map((p) => {
          const priceIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="price-bubble">${p.price.base}€</div>`,
            iconSize: [45, 24],
            iconAnchor: [22, 12]
          });
          
          return (
            <Marker 
              key={p.id} 
              position={[p.location.latitude!, p.location.longitude!]}
              icon={priceIcon}
            >
              <Popup>
                <div className="p-1 max-w-[200px]">
                  <img 
                    src={p.coverPhoto} 
                    alt={p.title} 
                    className="w-full h-24 object-cover rounded-md mb-2" 
                  />
                  <h4 className="font-bold text-sm leading-tight mb-1">{p.title}</h4>
                  <p className="text-welqo-terracotta font-mono font-bold text-sm">
                    {p.price.base}€ <span className="text-[10px] text-slate-400 uppercase">/ nuit</span>
                  </p>
                  <a 
                    href={`/logements/${p.slug}`} 
                    className="mt-2 block text-center py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase rounded hover:bg-welqo-terracotta transition-colors"
                  >
                    Voir le détail
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
