import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";

interface FeedItem {
  id: string;
  type: "new_market" | "price_change" | "volume_spike";
  market: string;
  description: string;
  timestamp: string;
  value?: number;
}

interface LiveFeedProps {
  items: FeedItem[];
}

export default function LiveFeed({ items }: LiveFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "new_market":
        return <Sparkles className="w-4 h-4 text-chart-2" />;
      case "price_change":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "volume_spike":
        return <TrendingDown className="w-4 h-4 text-chart-1" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "new_market":
        return "New Market";
      case "price_change":
        return "Price Surge";
      case "volume_spike":
        return "Volume Spike";
      default:
        return type;
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-card-border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold" data-testid="text-feed-title">
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-md hover-elevate border border-card-border"
                data-testid={`feed-item-${item.id}`}
              >
                <div className="mt-1">{getIcon(item.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm font-medium" data-testid={`text-feed-market-${item.id}`}>
                      {item.market}
                    </p>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {getTypeLabel(item.type)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground" data-testid={`text-feed-description-${item.id}`}>
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`text-feed-timestamp-${item.id}`}>
                    {item.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
