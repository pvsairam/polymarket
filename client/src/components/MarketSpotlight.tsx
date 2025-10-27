import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight, DollarSign, BarChart3 } from "lucide-react";

interface MarketSpotlightProps {
  title: string;
  currentPrice: number;
  priceChange24h: number;
  volume: number;
  liquidity: number;
  category: string;
  id: string;
}

export default function MarketSpotlight({
  title,
  currentPrice,
  priceChange24h,
  volume,
  liquidity,
  category,
  id,
}: MarketSpotlightProps) {
  const isPositive = priceChange24h >= 0;
  const pricePercentage = (currentPrice * 100).toFixed(1);

  // Construct Polymarket URL - markets are at polymarket.com/event/{slug}
  // For now we'll use a generic link since we don't have the slug
  const polymarketUrl = `https://polymarket.com`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="backdrop-blur-sm bg-card/80 border-card-border h-full" data-testid="card-market-spotlight">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Market Spotlight</CardTitle>
          <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-primary/10 text-primary">
            {category}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Market Title */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Selected Market</h3>
            <p className="text-base font-semibold leading-tight" data-testid="text-spotlight-title">
              {title.length > 80 ? title.substring(0, 80) + "..." : title}
            </p>
          </div>

          {/* Price Display */}
          <div className="flex items-baseline gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Current Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold" data-testid="text-spotlight-price">
                  {pricePercentage}%
                </span>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isPositive ? "text-chart-2" : "text-chart-1"
                  }`}
                  data-testid="text-spotlight-change"
                >
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {isPositive ? "+" : ""}
                  {priceChange24h.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="font-semibold" data-testid="text-spotlight-volume">
                  ${(volume / 1000).toFixed(0)}k
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Liquidity</p>
                <p className="font-semibold" data-testid="text-spotlight-liquidity">
                  ${(liquidity / 1000).toFixed(0)}k
                </p>
              </div>
            </div>
          </div>

          {/* Trade Button */}
          <Button
            className="w-full gap-2"
            variant="default"
            onClick={() => window.open(polymarketUrl, '_blank')}
            data-testid="button-trade-polymarket"
          >
            Trade on Polymarket
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
