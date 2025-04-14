
import { Gift, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RewardDay {
  day: number;
  reward: string;
  claimed: boolean;
  isToday: boolean;
}

interface LoginRewardProps {
  rewards: RewardDay[];
  onClaimReward?: (day: number) => void;
  className?: string;
}

export function LoginReward({
  rewards,
  onClaimReward,
  className
}: LoginRewardProps) {
  const handleClaim = (day: number) => {
    if (onClaimReward) {
      onClaimReward(day);
    }
  };
  
  return (
    <div className={cn("kawaii-card p-4", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-5 h-5 text-neon-pink" />
        <h3 className="font-bold text-lg">Daily Login Rewards</h3>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {rewards.map((reward) => (
          <div 
            key={reward.day}
            className={cn(
              "p-2 rounded-lg flex flex-col items-center justify-center gap-1 border transition-all",
              reward.isToday && !reward.claimed ? "bg-kawaii-yellow/30 border-neon-orange animate-pulse-soft" : "border-border",
              reward.claimed ? "bg-muted/50" : ""
            )}
          >
            <span className="text-xs font-bold">Day {reward.day}</span>
            <div className="w-10 h-10 rounded-full bg-gradient-kawaii flex items-center justify-center">
              <img 
                src={`/rewards/reward-${reward.day}.png`} 
                alt={`Day ${reward.day} reward`}
                className="w-6 h-6 object-contain"
              />
            </div>
            <div className="mt-1">
              {reward.claimed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : reward.isToday ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-6 text-[10px] px-2 bg-gradient-kawaii text-white border-0 hover:opacity-90"
                  onClick={() => handleClaim(reward.day)}
                >
                  Claim
                </Button>
              ) : (
                <span className="text-[10px] text-muted-foreground">
                  {reward.reward}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
