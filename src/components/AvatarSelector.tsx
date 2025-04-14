
import React, { useState } from 'react';
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

type AvatarType = 'fox' | 'bunny' | 'samurai';

interface AvatarOption {
  type: AvatarType;
  name: string;
  description: string;
  imageSrc: string;
}

const avatarOptions: AvatarOption[] = [
  {
    type: 'fox',
    name: 'Kitsune-chan',
    description: 'A wise and mischievous fox spirit who knows all the crypto tricks!',
    imageSrc: 'https://i.pinimg.com/736x/a0/10/45/a01045ce2b0d7a06beb4937b6b0347fb.jpg'
  },
  {
    type: 'bunny',
    name: 'Robo-Usagi',
    description: 'A cybernetic bunny who jumps through the blockchain with lightning speed!',
    imageSrc: 'https://i.pinimg.com/474x/32/85/a4/3285a4c8e7d5d7dfa0e302c986c59e4b.jpg'
  },
  {
    type: 'samurai',
    name: 'Crypto Ronin',
    description: 'A wandering cyber samurai who slashes through high gas fees!',
    imageSrc: 'https://i.pinimg.com/474x/07/23/fe/0723fec8f8c9103cec9fa17421322e1d.jpg'
  }
];

interface AvatarSelectorProps {
  onSelect: (type: AvatarType) => void;
  selectedAvatar?: AvatarType;
}

export function AvatarSelector({ onSelect, selectedAvatar }: AvatarSelectorProps) {
  const [selected, setSelected] = useState<AvatarType | undefined>(selectedAvatar);

  const handleSelect = (type: AvatarType) => {
    setSelected(type);
    onSelect(type);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center bg-gradient-kawaii bg-clip-text text-transparent">
        Choose Your Wallet-chan!
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {avatarOptions.map((avatar) => (
          <Card 
            key={avatar.type}
            className={cn(
              "kawaii-card cursor-pointer transform transition-all duration-300 hover:scale-105",
              selected === avatar.type ? "ring-4 ring-neon-purple" : ""
            )}
            onClick={() => handleSelect(avatar.type)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{avatar.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 flex justify-center">
              <div className="w-40 h-40 relative overflow-hidden rounded-full bg-gradient-kawaii p-1">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 relative rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-kawaii rounded-full animate-float">
                    <img 
                      src={avatar.imageSrc} 
                      alt={avatar.name}
                      className="w-full h-full object-contain animate-float"
                    />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <CardDescription className="text-center text-xs">
                {avatar.description}
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <Button 
          disabled={!selected}
          className="bg-gradient-kawaii hover:opacity-90 transition-opacity font-bold"
          onClick={() => selected && onSelect(selected)}
        >
          Confirm Choice
        </Button>
      </div>
    </div>
  );
}
