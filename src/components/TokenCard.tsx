

import { Coins, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TokenCardProps {
  name: string;
  symbol: string;
  balance: number;
  value: number;
  change: number;
  iconSrc?: string;
  className?: string;
}

export function TokenCard({
  name,
  symbol,
  balance,
  value,
  change,
  iconSrc,
  className
}: TokenCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className={cn("kawaii-card p-4", className)}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-token flex items-center justify-center">
          {iconSrc ? (
            <img src={iconSrc} alt={symbol} className="w-6 h-6" />
          ) : (
            <Coins className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-xs text-muted-foreground">{symbol}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <p className="text-xs text-muted-foreground">Balance</p>
          <p className="font-bold">{balance.toFixed(6)} {symbol}</p>
        </div>
        
        <div className="token-bar">
          <div 
            className="token-bar-fill bg-gradient-token"
            style={{ width: `${Math.min(balance * 10, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <p className="font-medium">${value.toFixed(2)}</p>
          <div className={cn(
            "flex items-center text-sm",
            isPositive ? "text-green-500" : "text-destructive"
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {isPositive ? "+" : ""}{change.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
