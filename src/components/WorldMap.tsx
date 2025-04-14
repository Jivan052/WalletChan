
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface WorldLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  tokenSymbol: string;
  description: string;
}

interface WorldMapProps {
  locations: WorldLocation[];
  onSelectLocation?: (location: WorldLocation) => void;
  className?: string;
}

export function WorldMap({
  locations,
  onSelectLocation,
  className
}: WorldMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<WorldLocation | null>(null);
  
  const handleLocationClick = (location: WorldLocation) => {
    setSelectedLocation(location);
    if (onSelectLocation) {
      onSelectLocation(location);
    }
  };
  
  return (
    <div className={cn("relative", className)}>
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-kawaii-purple/50">
        <img 
          src="https://i.pinimg.com/474x/6e/d5/03/6ed503addf98124a8cdbf5732b2337e5.jpg" 
          alt="Crypto World Map" 
          className="w-full h-full object-cover pixelated"
        />
        
        {locations.map((location) => (
          <button
            key={location.id}
            className={cn(
              "absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all",
              selectedLocation?.id === location.id 
                ? "bg-neon-purple scale-125 animate-pulse-soft z-20" 
                : "bg-neon-pink z-10 hover:scale-110"
            )}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            onClick={() => handleLocationClick(location)}
          >
            <span className="sr-only">{location.name}</span>
          </button>
        ))}
      </div>
      
      {selectedLocation && (
        <div className="mt-4 p-4 kawaii-card">
          <h3 className="text-lg font-bold mb-1 bg-gradient-cyber bg-clip-text text-transparent">
            {selectedLocation.name} ({selectedLocation.tokenSymbol})
          </h3>
          <p className="text-sm text-muted-foreground">{selectedLocation.description}</p>
        </div>
      )}
    </div>
  );
}
