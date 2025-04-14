
import React, { useState, useEffect } from 'react';
import { AvatarSelector } from '@/components/AvatarSelector';
import { Dashboard } from '@/components/Dashboard';
import { LandingPage } from '@/components/LandingPage';

type AvatarType = 'fox' | 'bunny' | 'samurai';

const Index = () => {
  const [avatarSelected, setAvatarSelected] = useState(false);
  const [avatarType, setAvatarType] = useState<AvatarType>('fox');
  const [showLanding, setShowLanding] = useState(true);
  
  const handleAvatarSelect = (type: AvatarType) => {
    setAvatarType(type);
    setAvatarSelected(true);
    setShowLanding(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };
  
  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-kawaii-pink/10 to-kawaii-purple/10">
      <header className="py-6 px-4 flex items-center justify-center">
        <h1 className="text-3xl font-bold bg-gradient-kawaii bg-clip-text text-transparent">
          WalletChan
          <span className="text-sm ml-1 align-top">Your Kawaii Crypto Sidekick</span>
        </h1>
      </header>
      
      <main className="container mx-auto px-4 pb-16">
        {!avatarSelected ? (
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <AvatarSelector onSelect={handleAvatarSelect} />
          </div>
        ) : (
          <Dashboard avatarType={avatarType} />
        )}
      </main>
    </div>
  );
};

export default Index;
