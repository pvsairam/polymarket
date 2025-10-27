import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import TopMoversSection from "@/components/TopMoversSection";
import MomentumChart from "@/components/MomentumChart";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import LiquidityLeaderboard from "@/components/LiquidityLeaderboard";
import LiveFeed from "@/components/LiveFeed";
import MarketCard from "@/components/MarketCard";
import MarketSpotlight from "@/components/MarketSpotlight";
import {
  useTopMovers,
  useCategoryBreakdown,
  useLiquidityLeaderboard,
  useMarkets,
  useMarketHistory,
} from "@/hooks/usePolymarketData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);

  // Reset selected market when filters change
  useEffect(() => {
    setSelectedMarketId(null);
  }, [selectedCategory, searchQuery]);

  // Fetch data from APIs
  const { data: topMovers, isLoading: moversLoading, error: moversError } = useTopMovers();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategoryBreakdown();
  const { data: leaderboard, isLoading: leaderboardLoading, error: leaderboardError } = useLiquidityLeaderboard();
  const { data: markets, isLoading: marketsLoading, error: marketsError } = useMarkets();

  // Filter markets based on category and search
  const filteredMarkets = useMemo(() => {
    if (!markets) return [];

    let filtered = markets;

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((m) => m.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((m) => 
        m.title.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [markets, selectedCategory, searchQuery]);

  // Auto-select first market in filtered view or first gainer
  const defaultMarketId = useMemo(() => {
    if (selectedCategory || searchQuery) {
      return filteredMarkets[0]?.id || null;
    }
    return topMovers?.gainers?.[0]?.id || null;
  }, [selectedCategory, searchQuery, filteredMarkets, topMovers]);

  const chartMarketId = selectedMarketId || defaultMarketId;
  const { data: chartData, isLoading: chartLoading, error: chartError } = useMarketHistory(chartMarketId);
  
  // Find the selected market details
  const selectedMarket = useMemo(() => {
    if (!markets || !chartMarketId) return null;
    return markets.find(m => m.id === chartMarketId) || topMovers?.gainers?.[0] || topMovers?.losers?.[0] || null;
  }, [markets, chartMarketId, topMovers]);

  // Generate live feed from all markets (not just filtered)
  const liveFeedItems = useMemo(() => {
    if (!markets || markets.length === 0) return [];

    // Sort by absolute price change and volume to get most active markets
    const activeMarkets = [...markets]
      .sort((a, b) => {
        const aScore = Math.abs(a.priceChange24h) * 0.7 + (a.volume / 1000000) * 0.3;
        const bScore = Math.abs(b.priceChange24h) * 0.7 + (b.volume / 1000000) * 0.3;
        return bScore - aScore;
      })
      .slice(0, 10) // Changed from 8 to 10 - can revert if needed
      .map((m, index) => ({
        id: m.id,
        type: m.priceChange24h > 0 ? ("price_change" as const) : ("volume_spike" as const),
        market: m.title.length > 50 ? m.title.substring(0, 50) + "..." : m.title,
        description: Math.abs(m.priceChange24h) > 1
          ? `${m.priceChange24h > 0 ? 'Up' : 'Down'} ${Math.abs(m.priceChange24h).toFixed(1)}% • $${(m.volume / 1000).toFixed(0)}k volume`
          : `Active trading: $${(m.volume / 1000).toFixed(0)}k volume`,
        timestamp: `${index * 2 + 1}m ago`,
      }));

    return activeMarkets;
  }, [markets]);

  // Loading state
  if (moversLoading || categoriesLoading || leaderboardLoading || marketsLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <DashboardHeader
          onSearch={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <main className="flex-1 flex items-center justify-center">
          <Card className="backdrop-blur-sm bg-card/80 border-card-border">
            <CardContent className="p-12">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-lg text-muted-foreground">Loading live market data...</p>
              </div>
            </CardContent>
          </Card>
        </main>
        <DashboardFooter />
      </div>
    );
  }

  // Error state - check all error states
  const hasError = moversError || categoriesError || leaderboardError || marketsError;
  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <DashboardHeader
          onSearch={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <main className="flex-1 flex items-center justify-center">
          <Card className="backdrop-blur-sm bg-card/80 border-card-border">
            <CardContent className="p-12">
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-lg font-semibold text-destructive">Unable to load market data</p>
                <p className="text-sm text-muted-foreground">
                  Please check your connection and try again
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
        <DashboardFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {!selectedCategory && !searchQuery ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TopMoversSection
                gainers={topMovers?.gainers || []}
                losers={topMovers?.losers || []}
                onMarketClick={setSelectedMarketId}
                selectedMarketId={selectedMarketId}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-sm bg-card/80 border-card-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {selectedCategory ? `${selectedCategory} Markets` : 'Search Results'}
                    <span className="text-sm text-muted-foreground font-normal ml-2">
                      ({filteredMarkets.length} {filteredMarkets.length === 1 ? 'market' : 'markets'})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredMarkets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredMarkets.slice(0, 12).map((market) => (
                        <MarketCard
                          key={market.id}
                          id={market.id}
                          title={market.title}
                          category={market.category}
                          currentPrice={market.currentPrice}
                          priceChange24h={market.priceChange24h}
                          volume={market.volume}
                          onClick={() => setSelectedMarketId(market.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No markets found matching your criteria</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chartLoading ? (
              <Card className="backdrop-blur-sm bg-card/80 border-card-border">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
                  <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
                  <div className="h-5 w-20 bg-muted animate-pulse rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <p className="text-sm text-muted-foreground">Loading chart...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : chartData && selectedMarket && !chartError ? (
              <MomentumChart
                title={selectedMarket.title}
                data={chartData.data}
                momentumScore={chartData.momentumScore}
              />
            ) : chartError ? (
              <Card className="backdrop-blur-sm bg-card/80 border-card-border">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-sm text-muted-foreground">
                      Unable to load chart data
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : null}
            {categories && categories.length > 0 && (
              <CategoryBreakdown data={categories} />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaderboard && leaderboard.length > 0 && (
              <LiquidityLeaderboard data={leaderboard} />
            )}
            {selectedMarket && (
              <MarketSpotlight
                title={selectedMarket.title}
                currentPrice={selectedMarket.currentPrice}
                priceChange24h={selectedMarket.priceChange24h}
                volume={selectedMarket.volume}
                liquidity={selectedMarket.liquidity}
                category={selectedMarket.category}
                id={selectedMarket.id}
              />
            )}
            {liveFeedItems.length > 0 && <LiveFeed items={liveFeedItems} />}
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
