import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MarketCard from "./MarketCard";

interface Market {
  id: string;
  title: string;
  category: string;
  currentPrice: number;
  priceChange24h: number;
  volume: number;
}

interface TopMoversSectionProps {
  gainers: Market[];
  losers: Market[];
  onMarketClick?: (marketId: string) => void;
  selectedMarketId?: string | null;
}

export default function TopMoversSection({ gainers, losers, onMarketClick, selectedMarketId }: TopMoversSectionProps) {
  const gainersScrollRef = useRef<HTMLDivElement>(null);
  const losersScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = (280 + 16) * 5; // card width + gap, 5 cards at a time
      const currentScroll = ref.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      ref.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="group"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2" data-testid="text-gainers-title">
            <span className="text-green-600">↑</span> Top Gainers
          </h2>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => scroll(gainersScrollRef, 'left')}
              className="h-8 w-8 rounded-md flex items-center justify-center bg-card/60 backdrop-blur-sm border border-card-border hover-elevate"
              aria-label="Scroll left"
              data-testid="button-scroll-left-gainers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(gainersScrollRef, 'right')}
              className="h-8 w-8 rounded-md flex items-center justify-center bg-card/60 backdrop-blur-sm border border-card-border hover-elevate"
              aria-label="Scroll right"
              data-testid="button-scroll-right-gainers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <div 
            ref={gainersScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide max-w-[1464px]" 
            style={{ scrollbarWidth: 'none' }}
          >
            {gainers.map((market) => (
              <div key={market.id} className="flex-shrink-0 w-[280px] h-[140px] snap-start">
                <MarketCard
                  {...market}
                  onClick={() => onMarketClick?.(market.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2" data-testid="text-losers-title">
            <span className="text-destructive">↓</span> Top Losers
          </h2>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => scroll(losersScrollRef, 'left')}
              className="h-8 w-8 rounded-md flex items-center justify-center bg-card/60 backdrop-blur-sm border border-card-border hover-elevate"
              aria-label="Scroll left"
              data-testid="button-scroll-left-losers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(losersScrollRef, 'right')}
              className="h-8 w-8 rounded-md flex items-center justify-center bg-card/60 backdrop-blur-sm border border-card-border hover-elevate"
              aria-label="Scroll right"
              data-testid="button-scroll-right-losers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <div 
            ref={losersScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide max-w-[1464px]" 
            style={{ scrollbarWidth: 'none' }}
          >
            {losers.map((market) => (
              <div key={market.id} className="flex-shrink-0 w-[280px] h-[140px] snap-start">
                <MarketCard
                  {...market}
                  onClick={() => onMarketClick?.(market.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
