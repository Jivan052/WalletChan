import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'; // Optional: Add only if you have framer-motion installed

type AvatarType = 'fox' | 'bunny' | 'samurai';

interface AvatarOption {
  type: AvatarType;
  name: string;
  description: string;
  imageSrc: string;
  traits?: string[];
}

const avatarOptions: AvatarOption[] = [
  {
    type: 'fox',
    name: 'Kitsune-chan',
    description: 'A wise and mischievous fox spirit who knows all the crypto tricks!',
    imageSrc: 'https://i.pinimg.com/736x/a0/10/45/a01045ce2b0d7a06beb4937b6b0347fb.jpg',
    traits: ['Market Intelligence +20%', 'Luck +15%', 'Trading Speed +10%']
  },
  {
    type: 'bunny',
    name: 'Robo-Usagi',
    description: 'A cybernetic bunny who jumps through the blockchain with lightning speed!',
    imageSrc: 'https://i.pinimg.com/474x/32/85/a4/3285a4c8e7d5d7dfa0e302c986c59e4b.jpg',
    traits: ['Transaction Speed +25%', 'Tech Knowledge +15%', 'Energy +10%']
  },
  {
    type: 'samurai',
    name: 'Crypto Ronin',
    description: 'A wandering cyber samurai who slashes through high gas fees!',
    imageSrc: 'https://i.pinimg.com/474x/07/23/fe/0723fec8f8c9103cec9fa17421322e1d.jpg',
    traits: ['Security +20%', 'Fee Reduction +15%', 'Decision Making +10%']
  }
];

interface AvatarSelectorProps {
  onSelect: (type: AvatarType) => void;
  selectedAvatar?: AvatarType;
}

export function AvatarSelector({ onSelect, selectedAvatar }: AvatarSelectorProps) {
  const [selected, setSelected] = useState<AvatarType | undefined>(selectedAvatar);
  const [hoveredAvatar, setHoveredAvatar] = useState<AvatarType | null>(null);

  // If selectedAvatar prop changes, update local state
  useEffect(() => {
    if (selectedAvatar) {
      setSelected(selectedAvatar);
    }
  }, [selectedAvatar]);

  const handleSelect = (type: AvatarType) => {
    setSelected(type);
    onSelect(type);
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: AvatarType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(type);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Choose Your Wallet-chan!
        </h2>
        <p className="text-gray-600">
          Your companion will guide you through your crypto journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {avatarOptions.map((avatar) => (
          <Card 
            key={avatar.type}
            className={cn(
              "relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-200",
              selected === avatar.type 
                ? "ring-4 ring-pink-500 shadow-lg shadow-pink-500/20" 
                : "hover:border-pink-300"
            )}
            onClick={() => handleSelect(avatar.type)}
            onMouseEnter={() => setHoveredAvatar(avatar.type)}
            onMouseLeave={() => setHoveredAvatar(null)}
            onKeyDown={(e) => handleKeyDown(e, avatar.type)}
            tabIndex={0}
            role="button"
            aria-pressed={selected === avatar.type}
          >
            {/* Glow effect for selected avatar */}
            {selected === avatar.type && (
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-30"></div>
            )}
            
            <div className="relative">
              <CardHeader className="pb-2">
                <CardTitle className={cn(
                  "text-lg transition-colors duration-300",
                  selected === avatar.type ? "text-pink-600" : ""
                )}>
                  {avatar.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0 pb-4 flex justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-1">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className={cn(
                      "w-28 h-28 md:w-36 md:h-36 relative rounded-full overflow-hidden transition-transform duration-500",
                      (hoveredAvatar === avatar.type || selected === avatar.type) ? "scale-110" : ""
                    )}>
                      <img 
                        src={avatar.imageSrc} 
                        alt={avatar.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col items-center gap-2">
                <CardDescription className="text-center text-xs">
                  {avatar.description}
                </CardDescription>
                
                {avatar.traits && (selected === avatar.type || hoveredAvatar === avatar.type) && (
                  <div className="w-full pt-2">
                    <div className="text-xs font-medium text-center text-pink-600 mb-1">Character Traits</div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {avatar.traits.map((trait, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selected === avatar.type && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                )}
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center pt-8">
        <Button 
          disabled={!selected}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-opacity font-bold px-8 py-6 text-lg"
          onClick={() => selected && onSelect(selected)}
        >
          {selected ? `Select ${avatarOptions.find(a => a.type === selected)?.name}` : "Select Your Avatar"}
        </Button>
      </div>
    </div>
  );
}