import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Compass } from 'lucide-react';

interface WorldLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  tokenSymbol: string;
  description: string;
  tokenValue?: number;
  tokenChange?: number;
  color?: string;
  connections?: string[];
}

interface WorldMapProps {
  locations: WorldLocation[];
  onSelectLocation?: (location: WorldLocation) => void;
  className?: string;
}

const mockLocations = [
  { 
    id: 'eth', 
    name: 'Ethereum Kingdom', 
    x: 25, y: 30, 
    tokenSymbol: 'ETH', 
    tokenValue: 3245.67,
    tokenChange: 2.5,
    description: 'The main kingdom where smart contracts were born.',
    connections: ['matic', 'btc'] 
  },
  {
    id: 'matic',
    name: 'Polygon City',
    x: 50, y: 50,
    tokenSymbol: 'MATIC',
    tokenValue: 1.23,
    tokenChange: -1.2,
    description: 'A city of fast transactions and low fees.',
    connections: ['eth', 'sol']
  },
];

export function WorldMap({
  locations,
  onSelectLocation,
  className
}: WorldMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<WorldLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<WorldLocation | null>(null);
  const [zoom, setZoom] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  
  // Reset map position when zoom changes
  useEffect(() => {
    setMapPosition({ x: 0, y: 0 });
  }, [zoom]);
  
  const handleLocationClick = (location: WorldLocation) => {
    setSelectedLocation(location);
    if (onSelectLocation) {
      onSelectLocation(location);
    }
  };
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 2));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 1));
  };
  
  const handleResetView = () => {
    setZoom(1);
    setMapPosition({ x: 0, y: 0 });
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && zoom > 1) {
      const deltaX = (e.clientX - lastPosition.current.x) / zoom;
      const deltaY = (e.clientY - lastPosition.current.y) / zoom;
      
      setMapPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  
  const handleMouseLeave = () => {
    isDragging.current = false;
    setHoveredLocation(null);
  };
  
  // Create location connections
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    locations.forEach(location => {
      if (location.connections) {
        location.connections.forEach(targetId => {
          const targetLocation = locations.find(loc => loc.id === targetId);
          if (targetLocation) {
            // Determine if this connection includes the selected or hovered location
            const isActive = (selectedLocation?.id === location.id || selectedLocation?.id === targetId ||
                             hoveredLocation?.id === location.id || hoveredLocation?.id === targetId);
            
            connections.push(
              <line
                key={`${location.id}-${targetId}`}
                x1={`${location.x}%`}
                y1={`${location.y}%`}
                x2={`${targetLocation.x}%`}
                y2={`${targetLocation.y}%`}
                strokeWidth="2"
                strokeDasharray={isActive ? "none" : "5,5"}
                stroke={isActive ? "rgba(236, 72, 153, 0.8)" : "rgba(168, 85, 247, 0.4)"}
                className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}
              />
            );
          }
        });
      }
    });
    
    return connections;
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-cyber pb-1">Crypto World</h3>
          <p className="text-sm text-muted-foreground">Explore token ecosystems</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomOut} 
            disabled={zoom <= 1}
            className="w-8 h-8 p-0"
          >
            <ZoomOut size={16} />
          </Button>
          <span className="text-xs w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomIn} 
            disabled={zoom >= 2}
            className="w-8 h-8 p-0"
          >
            <ZoomIn size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetView}
            className="w-8 h-8 p-0"
          >
            <Compass size={16} />
          </Button>
        </div>
      </div>
      
      <div 
        className="relative overflow-hidden rounded-xl"
        style={{ height: '400px' }}
      >
        <div 
          ref={mapRef}
          className="relative w-full h-full border-2 border-kawaii-purple/20 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ 
            transform: `scale(${zoom}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
            transformOrigin: 'center',
            transition: isDragging.current ? 'none' : 'transform 0.2s ease-out'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            src="https://i.pinimg.com/474x/6e/d5/03/6ed503addf98124a8cdbf5732b2337e5.jpg" 
            alt="Crypto World Map" 
            className="w-full h-full object-cover pixelated"
            draggable="false"
          />
          
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {renderConnections()}
          </svg>
          
          {locations.map((location) => (
            <React.Fragment key={location.id}>
              <button
                className={cn(
                  "absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
                  selectedLocation?.id === location.id 
                    ? "bg-neon-purple scale-125 animate-pulse-soft z-30 ring-4 ring-purple-500/30" 
                    : hoveredLocation?.id === location.id
                      ? "bg-neon-pink scale-115 z-20 ring-2 ring-pink-500/20"
                      : "bg-pink-500/70 z-10 hover:scale-110"
                )}
                style={{ 
                  left: `${location.x}%`, 
                  top: `${location.y}%`,
                  boxShadow: selectedLocation?.id === location.id || hoveredLocation?.id === location.id
                    ? '0 0 12px rgba(236, 72, 153, 0.6)' 
                    : 'none'
                }}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
                aria-label={location.name}
              >
                <span className="sr-only">{location.name}</span>
              </button>
              
              {(selectedLocation?.id === location.id || hoveredLocation?.id === location.id) && (
                <div 
                  className="absolute z-20 px-2.5 py-1 bg-white/90 backdrop-blur-sm shadow-lg rounded pointer-events-none whitespace-nowrap"
                  style={{ 
                    left: `${location.x}%`, 
                    top: `${location.y + 4}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="font-medium text-xs">{location.name}</div>
                  <div className="text-xs text-pink-600 font-bold">{location.tokenSymbol}</div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {selectedLocation && (
        <div className="p-4 rounded-xl border-2 border-kawaii-purple/20 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold bg-gradient-cyber bg-clip-text text-transparent">
              {selectedLocation.name} <span className="text-sm">({selectedLocation.tokenSymbol})</span>
            </h3>
            
            {selectedLocation.tokenValue && selectedLocation.tokenChange && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">${selectedLocation.tokenValue.toLocaleString()}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  selectedLocation.tokenChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedLocation.tokenChange >= 0 ? '+' : ''}{selectedLocation.tokenChange}%
                </span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{selectedLocation.description}</p>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Visit {selectedLocation.tokenSymbol}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Market Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}