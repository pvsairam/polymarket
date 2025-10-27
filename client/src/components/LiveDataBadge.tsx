import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTopMovers, REFETCH_INTERVAL } from "@/hooks/usePolymarketData";

export default function LiveDataBadge() {
  const { dataUpdatedAt } = useTopMovers();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    // Calculate seconds since last update
    const secondsSinceUpdate = Math.floor((Date.now() - dataUpdatedAt) / 1000);
    const secondsUntilNext = 60 - (secondsSinceUpdate % 60);
    
    // Reset countdown based on actual data update time
    setCountdown(secondsUntilNext);
  }, [dataUpdatedAt]);

  useEffect(() => {
    // Count down every second
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 60; // Reset to 60
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-card-border">
      <motion.div
        className="w-2 h-2 rounded-full bg-chart-2"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        data-testid="indicator-live"
      />
      <span className="text-sm font-medium" data-testid="text-live-status">
        Live Data
      </span>
      <span className="text-xs text-muted-foreground" data-testid="text-countdown">
        • Next update in {countdown}s
      </span>
    </div>
  );
}
