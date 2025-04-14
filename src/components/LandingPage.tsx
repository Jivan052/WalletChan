
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { MarketData } from './MarketData';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const { toast } = useToast();
  
  const handleBuy = (crypto: string) => {
    toast({
      title: "Coming Soon!",
      description: `Buying ${crypto} will be available soon!`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 bg-gradient-kawaii">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Welcome to WalletChan
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Your kawaii crypto sidekick that makes crypto fun and easy!
                Manage your digital assets with a cute companion by your side.
              </p>
              <Button 
                onClick={onGetStarted} 
                size="lg" 
                className="bg-white text-neon-purple hover:bg-white/90 transition-all duration-300"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96 animate-float rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://i.pinimg.com/736x/85/06/b1/8506b16d61e05875073a6244778ef858.jpg" 
                  alt="WalletChan Fox Avatar" 
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-kawaii-cyan/30 to-kawaii-purple/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Crypto Market</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with real-time cryptocurrency prices and market trends.
            </p>
          </div>
          
          <MarketData onBuy={handleBuy} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cute Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the kawaii features that make crypto management fun!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="kawaii-card border-kawaii-pink/30">
              <CardHeader>
                <CardTitle className="text-xl">Personalized Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Choose your own kawaii companion to guide you through your crypto journey.</p>
              </CardContent>
            </Card>
            
            <Card className="kawaii-card border-kawaii-purple/30">
              <CardHeader>
                <CardTitle className="text-xl">Quest System</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Complete fun missions to earn rewards and learn about crypto in a gamified way.</p>
              </CardContent>
            </Card>
            
            <Card className="kawaii-card border-kawaii-blue/30">
              <CardHeader>
                <CardTitle className="text-xl">Mini World Map</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Visualize your portfolio as a colorful pixel-art world map and explore your assets.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">WalletChan</h2>
              <p className="opacity-80">Your Kawaii Crypto Sidekick</p>
            </div>
            <div>
              <Button variant="outline" onClick={onGetStarted} className="border-white text-white hover:bg-white hover:text-neon-purple">
                Get Started Now
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p>© 2025 WalletChan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
