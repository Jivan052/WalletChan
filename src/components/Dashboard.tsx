import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletChan } from '@/components/WalletChan';
import { TokenCard } from '@/components/TokenCard';
import { QuestCard } from '@/components/QuestCard';
import { WorldMap } from '@/components/WorldMap';
import { LoginReward } from '@/components/LoginReward';
import { 
  Trophy, Wallet, Map, Gift, GraduationCap, 
  ArrowUpRight, ArrowDownRight, Sparkles, 
  RefreshCw, PlusCircle, BellRing
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

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

const mockLessons = [
  {
    id: 'lesson1',
    title: 'What are Gas Fees?',
    description: 'Gas fees are like mana costs in RPGs! Every spell (transaction) needs mana (ETH) to be cast on the blockchain.',
    level: 'Beginner',
    duration: '5 min',
    experience: 50
  },
  {
    id: 'lesson2',
    title: 'Smart Contracts 101',
    description: 'Smart contracts are like magical scrolls that automatically execute when specific conditions are met!',
    level: 'Beginner',
    duration: '8 min',
    experience: 80
  },
  {
    id: 'lesson3',
    title: 'DeFi Explained',
    description: 'Decentralized Finance is like an open fantasy marketplace where anyone can trade, lend and borrow without guilds!',
    level: 'Intermediate',
    duration: '12 min',
    experience: 120
  },
  {
    id: 'lesson4',
    title: 'NFTs & Digital Ownership',
    description: 'NFTs are like unique magical items in your inventory - each one is special and cant be duplicated!',
    level: 'Beginner',
    duration: '6 min',
    experience: 60
  }
];

export function Dashboard({ avatarType }: DashboardProps) {
  const [walletMessage, setWalletMessage] = useState<string | undefined>(undefined);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [claimedRewards, setClaimedRewards] = useState<number[]>([1, 2]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [valueChange, setValueChange] = useState(0);
  const { toast } = useToast();
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Calculate total portfolio value and change
      const total = mockTokens.reduce((acc, token) => acc + token.value, 0);
      setTotalValue(total);
      
      // Calculate weighted average change
      const weightedChange = mockTokens.reduce((acc, token) => {
        return acc + (token.change * (token.value / total));
      }, 0);
      setValueChange(parseFloat(weightedChange.toFixed(2)));
      
      // Set initial greeting
      setWalletMessage("Ohayou! Welcome to your crypto dashboard! How can I help you today?");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  const handleLessonStart = (lesson: any) => {
    setWalletMessage(`Let's learn about ${lesson.title}! This will be fun!`);
    toast({
      title: "Lesson Started",
      description: `You've started learning about ${lesson.title}!`,
    });
  };
  
  const getTotalQuestProgress = () => {
    const totalProgress = mockQuests.reduce((acc, quest) => acc + quest.progress, 0);
    const totalMaxProgress = mockQuests.reduce((acc, quest) => acc + quest.maxProgress, 0);
    return Math.round((totalProgress / totalMaxProgress) * 100);
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
          {isLoading ? (
            <>
              <Skeleton className="w-full h-36 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <Skeleton key={index} className="h-40 rounded-lg" />
                ))}
              </div>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="bg-gradient-kawaii bg-clip-text text-transparent">
                    Portfolio Summary
                  </CardTitle>
                  <CardDescription>
                    Your total balance and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <h3 className="text-2xl font-bold">${totalValue.toLocaleString()}</h3>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">24h Change</p>
                      <div className={`flex items-center ${valueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <h3 className="text-2xl font-bold">{valueChange}%</h3>
                        {valueChange >= 0 ? <ArrowUpRight className="ml-1" /> : <ArrowDownRight className="ml-1" />}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Tokens</p>
                      <h3 className="text-2xl font-bold">{mockTokens.length}</h3>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex flex-wrap gap-2 justify-between w-full">
                    <Button size="sm" className="gap-1">
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <PlusCircle className="w-4 h-4" />
                        Deposit
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        Withdraw
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              
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
            </>
          )}
        </TabsContent>
        
        <TabsContent value="quests" className="space-y-6">
          {isLoading ? (
            <Skeleton className="w-full h-[400px] rounded-lg" />
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="bg-gradient-cyber bg-clip-text text-transparent">
                        Quest Progress
                      </CardTitle>
                      <CardDescription>Complete quests to earn rewards</CardDescription>
                    </div>
                    <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {completedQuests.length} completed
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Overall quest progress</span>
                      <span>{getTotalQuestProgress()}%</span>
                    </div>
                    <Progress value={getTotalQuestProgress()} className="h-2" />
                  </div>

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
            </>
          )}
        </TabsContent>
        
        <TabsContent value="map" className="space-y-6">
          {isLoading ? (
            <Skeleton className="w-full h-[400px] rounded-lg" />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="bg-gradient-token bg-clip-text text-transparent">
                  Crypto World Map
                </CardTitle>
                <CardDescription>Explore different token ecosystems</CardDescription>
              </CardHeader>
              <CardContent>
                <WorldMap
                  locations={mockLocations}
                  onSelectLocation={handleLocationSelect}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="rewards" className="space-y-6">
          {isLoading ? (
            <Skeleton className="w-full h-[300px] rounded-lg" />
          ) : (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="bg-gradient-kawaii bg-clip-text text-transparent">
                        Daily Login Rewards
                      </CardTitle>
                      <CardDescription>Log in every day to earn special items</CardDescription>
                    </div>
                    <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <BellRing className="w-3 h-3" />
                      Day {claimedRewards.length}
                    </div>
                  </div>
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
            </>
          )}
        </TabsContent>
        
        <TabsContent value="learn" className="space-y-6">
          {isLoading ? (
            <Skeleton className="w-full h-[400px] rounded-lg" />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="bg-gradient-cyber bg-clip-text text-transparent">
                  Learn to Earn
                </CardTitle>
                <CardDescription>Learn about crypto with fun, anime-themed lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockLessons.map((lesson) => (
                    <Card key={lesson.id} className="kawaii-card border-pink-200 hover:border-pink-400 transition-colors">
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-1">{lesson.title}</h3>
                        <div className="flex gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">{lesson.level}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">{lesson.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {lesson.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-600 font-medium flex items-center">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {lesson.experience} XP
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleLessonStart(lesson)}
                          >
                            Start Lesson
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}