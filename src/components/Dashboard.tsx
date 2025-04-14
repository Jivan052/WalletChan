
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletChan } from '@/components/WalletChan';
import { TokenCard } from '@/components/TokenCard';
import { QuestCard } from '@/components/QuestCard';
import { WorldMap } from '@/components/WorldMap';
import { LoginReward } from '@/components/LoginReward';
import { Trophy, Wallet, Map, Gift, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type AvatarType = 'fox' | 'bunny' | 'samurai';

interface DashboardProps {
  avatarType: AvatarType;
}

// Mock data
const mockTokens = [
  { name: 'Ethereum', symbol: 'ETH', balance: 0.543, value: 1234.56, change: 2.45, iconSrc: '/tokens/eth.png' },
  { name: 'Bitcoin', symbol: 'BTC', balance: 0.0215, value: 645.78, change: -1.23, iconSrc: '/tokens/btc.png' },
  { name: 'Polygon', symbol: 'MATIC', balance: 120.5, value: 98.76, change: 5.67, iconSrc: '/tokens/matic.png' },
  { name: 'Solana', symbol: 'SOL', balance: 4.75, value: 345.20, change: 10.45, iconSrc: '/tokens/sol.png' }
];

const mockQuests = [
  { id: 'q1', title: 'First Trade Quest', description: 'Send tokens to a friend', reward: 'Novice Trader Badge', progress: 0, maxProgress: 1 },
  { id: 'q2', title: 'Elemental Alchemy', description: 'Swap one token for another', reward: 'Alchemist Badge', progress: 0, maxProgress: 1 },
  { id: 'q3', title: 'Portfolio Master', description: 'Hold 3 different tokens', reward: 'Collector Badge', progress: 2, maxProgress: 3 },
  { id: 'q4', title: 'Diamond Hands', description: 'HODL a token for 7 days', reward: 'Diamond Badge', progress: 3, maxProgress: 7 }
];

const mockLocations = [
  { id: 'eth', name: 'Ethereum Kingdom', x: 25, y: 30, tokenSymbol: 'ETH', description: 'The main kingdom where smart contracts were born. A realm of innovation and high gas fees.' },
  { id: 'btc', name: 'Bitcoin Capital', x: 60, y: 20, tokenSymbol: 'BTC', description: 'The ancient capital city, the first of its kind. Strong walls, secure and reliable.' },
  { id: 'matic', name: 'Polygon Magic Land', x: 40, y: 60, tokenSymbol: 'MATIC', description: 'A magical place where transactions are fast and fees are low. Many treasures to find here!' },
  { id: 'sol', name: 'Solana Speedway', x: 75, y: 45, tokenSymbol: 'SOL', description: 'The fastest region in the crypto world, where everything happens in the blink of an eye.' }
];

const mockLoginRewards = [
  { day: 1, reward: 'Sticker', claimed: true, isToday: false },
  { day: 2, reward: 'Avatar Frame', claimed: true, isToday: false },
  { day: 3, reward: 'Pixel Pet', claimed: false, isToday: true },
  { day: 4, reward: 'Background', claimed: false, isToday: false },
  { day: 5, reward: 'Animation', claimed: false, isToday: false },
  { day: 6, reward: 'Voice Pack', claimed: false, isToday: false },
  { day: 7, reward: 'Special NFT', claimed: false, isToday: false }
];

export function Dashboard({ avatarType }: DashboardProps) {
  const [walletMessage, setWalletMessage] = useState<string | undefined>(undefined);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [claimedRewards, setClaimedRewards] = useState<number[]>([1, 2]);
  const { toast } = useToast();
  
  const handleQuestClaim = (questId: string) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests([...completedQuests, questId]);
      setWalletMessage("Quest completed! Sugoi~ You earned a new badge!");
      toast({
        title: "Quest Completed!",
        description: "You've earned a new badge for your collection!",
      });
    }
  };
  
  const handleRewardClaim = (day: number) => {
    if (!claimedRewards.includes(day)) {
      setClaimedRewards([...claimedRewards, day]);
      setWalletMessage(`You claimed your Day ${day} reward! Arigatou for logging in!`);
      toast({
        title: "Daily Reward Claimed!",
        description: `You've received your Day ${day} login reward!`,
      });
    }
  };
  
  const handleLocationSelect = (location: any) => {
    setWalletMessage(`Let's explore ${location.name}! ${location.tokenSymbol} is such an interesting place!`);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <WalletChan 
        avatarType={avatarType} 
        message={walletMessage}
        className="max-w-4xl mx-auto"
      />
      
      <Tabs defaultValue="portfolio" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="portfolio" className="flex items-center gap-1">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </TabsTrigger>
          <TabsTrigger value="quests" className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Quests</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-1">
            <Map className="w-4 h-4" />
            <span className="hidden sm:inline">World Map</span>
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-1">
            <Gift className="w-4 h-4" />
            <span className="hidden sm:inline">Rewards</span>
          </TabsTrigger>
          <TabsTrigger value="learn" className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Learn</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="bg-gradient-kawaii bg-clip-text text-transparent">
                Your Token Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockTokens.map((token) => (
                  <TokenCard
                    key={token.symbol}
                    name={token.name}
                    symbol={token.symbol}
                    balance={token.balance}
                    value={token.value}
                    change={token.change}
                    iconSrc={token.iconSrc}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="bg-gradient-cyber bg-clip-text text-transparent">
                Available Quests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockQuests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    title={quest.title}
                    description={quest.description}
                    reward={quest.reward}
                    progress={quest.progress}
                    maxProgress={quest.maxProgress}
                    completed={completedQuests.includes(quest.id)}
                    onClaim={() => handleQuestClaim(quest.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="bg-gradient-token bg-clip-text text-transparent">
                Crypto World Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WorldMap
                locations={mockLocations}
                onSelectLocation={handleLocationSelect}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="bg-gradient-kawaii bg-clip-text text-transparent">
                Daily Login Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LoginReward
                rewards={mockLoginRewards.map(reward => ({
                  ...reward,
                  claimed: claimedRewards.includes(reward.day)
                }))}
                onClaimReward={handleRewardClaim}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="bg-gradient-cyber bg-clip-text text-transparent">
                Learn to Earn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Learn about crypto with fun, anime-themed lessons!</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="kawaii-card p-4">
                    <h3 className="font-bold mb-2">What are Gas Fees?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Gas fees are like mana costs in RPGs! Every spell (transaction) needs mana (ETH) to be cast on the blockchain.
                    </p>
                    <Button variant="outline" className="w-full">Start Lesson</Button>
                  </div>
                  
                  <div className="kawaii-card p-4">
                    <h3 className="font-bold mb-2">Smart Contracts 101</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Smart contracts are like magical scrolls that automatically execute when specific conditions are met!
                    </p>
                    <Button variant="outline" className="w-full">Start Lesson</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
