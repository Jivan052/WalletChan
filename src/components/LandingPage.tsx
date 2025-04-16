import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, TrendingDown, RefreshCw, Github } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { MarketData } from './MarketData';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll events for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleBuy = (crypto: string) => {
    toast({
      title: "Coming Soon!",
      description: `Buying ${crypto} will be available soon!`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-neon-purple/20"></div>
            <span className={`font-bold text-xl ${isScrolled ? 'text-neon-purple' : 'text-white'}`}>
              WalletChan
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className={`hover:opacity-80 transition ${isScrolled ? 'text-gray-800' : 'text-white/90'}`}>Features</a>
            <a href="#market" className={`hover:opacity-80 transition ${isScrolled ? 'text-gray-800' : 'text-white/90'}`}>Market</a>
            <Button 
              onClick={onGetStarted} 
              size="sm"
              className="bg-neon-purple hover:bg-neon-purple/90"
            >
              Launch App
            </Button>
          </nav>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 bg-gradient-kawaii" id="home">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-pink-500 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Welcome to WalletChan
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                Your kawaii crypto sidekick that makes crypto fun and easy!
                Manage your digital assets with a cute companion by your side.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={onGetStarted} 
                  size="lg" 
                  className="bg-white text-neon-purple hover:bg-white/90 transition-all duration-300"
                >
                  Get Started <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="mt-8 flex items-center gap-2 text-sm opacity-80">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white"></div>
                  ))}
                </div>
                <span>Trusted by 10,000+ crypto enthusiasts</span>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
                <img 
                  src="https://i.pinimg.com/736x/85/06/b1/8506b16d61e05875073a6244778ef858.jpg" 
                  alt="WalletChan Fox Avatar" 
                  className="relative z-10 w-full h-full object-contain drop-shadow-lg animate-float"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 py-6 px-4 md:px-8 bg-white/10 backdrop-blur-md rounded-xl">
            {[
              { label: "Supported Coins", value: "20+" },
              { label: "Active Users", value: "10K+" },
              { label: "Daily Transactions", value: "$1.2M" },
              { label: "Countries", value: "150+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section id="market" className="py-16 px-4 bg-gradient-to-br from-cyan-500/30 to-purple-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Crypto Market</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with real-time cryptocurrency prices and market trends.
              WalletChan helps you make informed decisions.
            </p>
          </div>
          
          <MarketData onBuy={handleBuy} />
          
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => toast({ title: "Refreshing market data..." })}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-pink-500/10 text-pink-600 rounded-full text-sm font-medium mb-3">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cute Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the kawaii features that make crypto management fun and engaging!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="kawaii-card border-pink-500/30 h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-3 text-2xl">
                  👾
                </div>
                <CardTitle className="text-xl">Personalized Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Choose your own kawaii companion to guide you through your crypto journey.</p>
              </CardContent>
            </Card>
            
            <Card className="kawaii-card border-purple-500/30 h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3 text-2xl">
                  🏆
                </div>
                <CardTitle className="text-xl">Quest System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Complete fun missions to earn rewards and learn about crypto in a gamified way.</p>
              </CardContent>
            </Card>
            
            <Card className="kawaii-card border-blue-500/30 h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 text-2xl">
                  🗺️
                </div>
                <CardTitle className="text-xl">Mini World Map</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Visualize your portfolio as a colorful pixel-art world map and explore your assets.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-500/10 text-purple-600 rounded-full text-sm font-medium mb-3">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the community of crypto enthusiasts who love WalletChan's kawaii approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "WalletChan made crypto fun again! I love my little fox companion who celebrates with me when my investments do well.",
                author: "Sophia T.",
                role: "Crypto Enthusiast"
              },
              {
                quote: "As a beginner in crypto, the gamified learning experience with quests helped me understand complex concepts easily.",
                author: "Jake M.",
                role: "New Investor"
              },
              {
                quote: "The cutest crypto tracker ever! I check my portfolio more often now just to see my WalletChan's reactions.",
                author: "Emma L.",
                role: "Long-term Hodler"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex-1">
                    <p className="text-lg mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20"></div>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Kawaii Crypto Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of users who are managing their crypto with a cute companion by their side.
            </p>
            <Button 
              onClick={onGetStarted} 
              size="lg" 
              className="bg-white text-neon-purple hover:bg-white/90 transition-all duration-300 text-lg px-8"
            >
              Get Started Now <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-neon-purple rounded-full"></div>
                <h2 className="text-2xl font-bold">WalletChan</h2>
              </div>
              <p className="text-gray-600 mb-4">Your Kawaii Crypto Sidekick that makes managing digital assets fun and engaging.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-neon-purple">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-neon-purple">Roadmap</a></li>
                <li><a href="#" className="text-gray-600 hover:text-neon-purple">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-neon-purple">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-neon-purple">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-neon-purple">Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-neon-purple">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-neon-purple">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-neon-purple">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 text-center md:flex md:justify-between md:items-center">
            <p className="text-gray-600 mb-4 md:mb-0">© 2025 WalletChan. All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <a href="#" className="text-gray-600 hover:text-neon-purple text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-neon-purple text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-neon-purple text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};