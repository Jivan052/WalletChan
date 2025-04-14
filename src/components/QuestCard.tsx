
import { Trophy, CheckCircle, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  title: string;
  description: string;
  reward: string;
  progress: number;
  maxProgress: number;
  completed?: boolean;
  onClaim?: () => void;
  className?: string;
}

export function QuestCard({
  title,
  description,
  reward,
  progress,
  maxProgress,
  completed = false,
  onClaim,
  className
}: QuestCardProps) {
  const progressPercentage = (progress / maxProgress) * 100;
  const isCompletable = progress >= maxProgress && !completed;
  
  return (
    <div className={cn(
      "kawaii-card p-4 relative overflow-hidden",
      completed ? "bg-muted/50" : "",
      className
    )}>
      {completed && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      )}
      
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-cyber flex items-center justify-center shrink-0">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Progress: {progress}/{maxProgress}</span>
            <span>{progressPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium">Reward:</span>
            <span className="text-xs text-neon-purple font-bold">{reward}</span>
          </div>
          
          {isCompletable && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-8 bg-gradient-cyber text-white border-0 hover:opacity-90"
              onClick={onClaim}
            >
              Claim
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
