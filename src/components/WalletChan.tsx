
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AvatarType = 'fox' | 'bunny' | 'samurai';

interface WalletChanProps {
  avatarType: AvatarType;
  message?: string;
  customMessages?: string[];
  className?: string;
}

const defaultMessages = [
  "Welcome back, senpai! Let's manage your crypto today!",
  "Gas fees are high today... maybe wait a bit? 😓",
  "Your portfolio is looking kawaii today! ✨",
  "Did you check your daily rewards yet?",
  "Remember to complete your quests for more rewards!",
  "The blockchain never sleeps, and neither do I! I'm here 24/7!",
  "Hodl strong, senpai! The market will recover soon!",
  "Have you considered staking some of your tokens?",
  "Your security is important! Remember to keep your keys safe!",
  "Sugoi~ You've been hodling for a while now!"
];

export function WalletChan({ 
  avatarType, 
  message, 
  customMessages = [], 
  className 
}: WalletChanProps) {
  const [currentMessage, setCurrentMessage] = useState(message || defaultMessages[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Combine default and custom messages
  const allMessages = [...defaultMessages, ...customMessages];
  
  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * allMessages.length);
    setCurrentMessage(allMessages[randomIndex]);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const getAvatarSrc = () => {
    return `/avatars/${avatarType}-avatar.png`;
  };

  return (
    <div className={cn("flex items-end gap-4", className)}>
      <div className="speech-bubble max-w-xs">
        <p className={cn(
          "text-sm transition-opacity duration-500",
          isAnimating ? "opacity-0" : "opacity-100"
        )}>
          {currentMessage}
        </p>
      </div>
      
      <div 
        className="w-24 h-24 cursor-pointer"
        onClick={getRandomMessage}
      >
        <img 
          src={getAvatarSrc()} 
          alt={`${avatarType} avatar`} 
          className="w-full h-full object-contain animate-bounce-small"
        />
      </div>
    </div>
  );
}
