
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area } from 'recharts';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline: { price: number[] };
}

interface MarketDataProps {
  onBuy: (crypto: string) => void;
}

export const MarketData = ({ onBuy }: MarketDataProps) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      
      const data = await response.json();
      setCryptoData(data);
    } catch (err) {
      console.error('Error fetching crypto data:', err);
      setError('Failed to load market data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchCryptoData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };
  
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1_000_000_000) {
      return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
    }
    return `$${(marketCap / 1_000_000).toFixed(2)}M`;
  };
  
  const prepareChartData = (sparklineData: number[]) => {
    return sparklineData.map((price, index) => ({
      time: index,
      value: price,
    }));
  };

  if (loading && cryptoData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <RefreshCw className="animate-spin h-8 w-8 text-neon-purple mb-4" />
        <p className="text-gray-600">Loading market data...</p>
      </div>
    );
  }

  if (error && cryptoData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchCryptoData} variant="outline">
          Try Again <RefreshCw className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
        <Button variant="outline" size="sm" onClick={fetchCryptoData} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Volume (24h)</TableHead>
                <TableHead>Chart (7d)</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptoData.map((crypto) => (
                <TableRow key={crypto.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://coinicons-api.vercel.app/api/icon/${crypto.symbol.toLowerCase()}`} 
                        alt={crypto.name} 
                        className="w-6 h-6"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/tokens/placeholder-token.png';
                        }}
                      />
                      <span>{crypto.name}</span>
                      <span className="text-gray-500 text-xs">{crypto.symbol.toUpperCase()}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(crypto.current_price)}</TableCell>
                  <TableCell>
                    <div className={`flex items-center ${crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell>{formatMarketCap(crypto.market_cap)}</TableCell>
                  <TableCell>${(crypto.total_volume / 1_000_000).toFixed(2)}M</TableCell>
                  <TableCell className="w-32 min-w-[120px]">
                    {crypto.sparkline?.price && (
                      <div className="h-10">
                        <ChartContainer
                          config={{
                            line: {
                              color: crypto.price_change_percentage_24h >= 0 ? '#16a34a' : '#dc2626',
                            },
                          }}
                        >
                          <AreaChart data={prepareChartData(crypto.sparkline.price)}>
                            <defs>
                              <linearGradient id={`gradient-${crypto.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop 
                                  offset="0%" 
                                  stopColor={crypto.price_change_percentage_24h >= 0 ? '#16a34a' : '#dc2626'} 
                                  stopOpacity={0.3} 
                                />
                                <stop 
                                  offset="100%" 
                                  stopColor={crypto.price_change_percentage_24h >= 0 ? '#16a34a' : '#dc2626'} 
                                  stopOpacity={0} 
                                />
                              </linearGradient>
                            </defs>
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke={crypto.price_change_percentage_24h >= 0 ? '#16a34a' : '#dc2626'} 
                              fillOpacity={1} 
                              fill={`url(#gradient-${crypto.id})`} 
                              strokeWidth={1.5} 
                            />
                            <ChartTooltip 
                              content={<ChartTooltipContent />} 
                            />
                          </AreaChart>
                        </ChartContainer>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      onClick={() => onBuy(crypto.name)}
                      className="bg-neon-purple hover:bg-neon-purple/90"
                    >
                      Buy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Data provided by CoinGecko API. Refreshes automatically every minute.
      </div>
    </div>
  );
};
