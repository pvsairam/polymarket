import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MarketCardProps {
  id: string;
  title: string;
  category: string;
  currentPrice: number;
  priceChange24h: number;
  volume: number;
  onClick?: () => void;
}

export default function MarketCard({
  id,
  title,
  category,
  currentPrice,
  priceChange24h,
  volume,
  onClick,
}: MarketCardProps) {
  const isPositive = priceChange24h >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      data-testid={`card-market-${id}`}
    >
      <Card
        className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden backdrop-blur-sm bg-card/80 border-card-border h-full"
        onClick={onClick}
      >
        <CardContent className="p-4 space-y-3 h-full flex flex-col">
          <div className="flex items-start justify-between gap-2 min-h-[2.5rem]">
            <h3 className="font-semibold text-sm line-clamp-2 flex-1" data-testid={`text-market-title-${id}`}>
              {title}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs" data-testid={`badge-category-${id}`}>
              {category}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold" data-testid={`text-price-${id}`}>
                {currentPrice.toFixed(1)}¢
              </span>
              <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-destructive"}`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold" data-testid={`text-change-${id}`}>
                  {isPositive ? "+" : ""}
                  {priceChange24h.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Volume</span>
              <span className="font-medium" data-testid={`text-volume-${id}`}>
                ${(volume / 1000).toFixed(1)}k
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
