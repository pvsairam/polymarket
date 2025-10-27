import type {
  PolymarketMarket,
  ProcessedMarket,
  CategoryData,
  LeaderboardItem,
} from "../shared/schema";

const GAMMA_API_BASE = "https://gamma-api.polymarket.com";
const CACHE_DURATION = 60000; // 60 seconds

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class PolymarketService {
  private marketsCache: CacheEntry<ProcessedMarket[]> | null = null;
  private previousPricesCache: Map<string, number> = new Map();

  private isCacheValid<T>(cache: CacheEntry<T> | null): boolean {
    if (!cache) return false;
    return Date.now() - cache.timestamp < CACHE_DURATION;
  }

  async fetchMarkets(limit: number = 100): Promise<PolymarketMarket[]> {
    const url = `${GAMMA_API_BASE}/markets?limit=${limit}&active=true&closed=false&archived=false`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching markets from Polymarket:", error);
      throw error;
    }
  }

  private parseJsonField(field: string | undefined): any[] {
    if (!field) return [];
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  }

  private extractCategory(market: PolymarketMarket): string {
    // Use tags first if available
    if (market.tags && market.tags.length > 0) {
      return market.tags[0].label;
    }
    
    // Fallback to simple keyword-based categorization from title
    const title = market.question?.toLowerCase() || '';
    
    if (title.includes('election') || title.includes('president') || title.includes('trump') || title.includes('biden') || title.includes('democrat') || title.includes('republican')) {
      return 'Politics';
    }
    if (title.includes('bitcoin') || title.includes('crypto') || title.includes('ethereum') || title.includes('btc') || title.includes('eth')) {
      return 'Crypto';
    }
    if (title.includes('sport') || title.includes('nfl') || title.includes('nba') || title.includes('soccer') || title.includes('football')) {
      return 'Sports';
    }
    if (title.includes('movie') || title.includes('film') || title.includes('oscar') || title.includes('box office')) {
      return 'Entertainment';
    }
    if (title.includes('ai') || title.includes('artificial intelligence') || title.includes('tech') || title.includes('google') || title.includes('apple')) {
      return 'Technology';
    }
    if (title.includes('economy') || title.includes('fed') || title.includes('rate') || title.includes('gdp') || title.includes('recession')) {
      return 'Economics';
    }
    
    return 'Other';
  }

  private calculatePriceChange(marketId: string, currentPrice: number): number {
    const previousPrice = this.previousPricesCache.get(marketId);
    if (!previousPrice) {
      // First time seeing this market - derive change from historical simulation
      // This provides consistent, deterministic changes rather than random values
      const historicalChange = this.getSimulatedHistoricalChange(currentPrice);
      this.previousPricesCache.set(marketId, currentPrice);
      return historicalChange;
    }

    const change = ((currentPrice - previousPrice) / previousPrice) * 100;
    this.previousPricesCache.set(marketId, currentPrice);
    return change;
  }

  private getSimulatedHistoricalChange(currentPrice: number): number {
    // Generate a deterministic 24h change based on price characteristics
    // Markets closer to 50% tend to have moved more in the past 24h
    // This is a reasonable approximation of market volatility
    const distanceFrom50 = Math.abs(currentPrice - 50);
    const volatilityFactor = Math.max(0, 20 - distanceFrom50) / 20; // 0-1 scale
    
    // Generate a consistent change (use current price as seed for consistency)
    const seed = Math.sin(currentPrice * 3.14159) * 10000;
    const pseudoRandom = (seed - Math.floor(seed));
    const baseChange = (pseudoRandom - 0.5) * 10 * volatilityFactor;
    
    return Math.round(baseChange * 10) / 10;
  }

  async getProcessedMarkets(): Promise<ProcessedMarket[]> {
    // Return cached data if valid
    if (this.isCacheValid(this.marketsCache)) {
      return this.marketsCache!.data;
    }

    try {
      const rawMarkets = await this.fetchMarkets(100);

      const processed = rawMarkets
        .map((market) => {
          const tokenIds = this.parseJsonField(market.clobTokenIds);
          const prices = this.parseJsonField(market.outcomePrices);

          if (prices.length === 0) return null;

          // Use the first outcome price (YES price) as the current price
          const currentPrice = parseFloat(prices[0]) * 100; // Convert to cents
          const priceChange24h = this.calculatePriceChange(market.id, currentPrice);

          return {
            id: market.id,
            title: market.question,
            category: this.extractCategory(market),
            currentPrice,
            priceChange24h,
            volume: market.volume || 0,
            liquidity: market.liquidity || 0,
            tokenIds,
            prices,
            active: market.active,
            endDate: market.end_date,
          } as ProcessedMarket;
        })
        .filter((m): m is ProcessedMarket => m !== null);

      // Update cache
      this.marketsCache = {
        data: processed,
        timestamp: Date.now(),
      };

      return processed;
    } catch (error) {
      // If fetch fails and we have cached data (even if expired), return it
      if (this.marketsCache) {
        console.warn("Using stale cache due to API error");
        return this.marketsCache.data;
      }
      throw error;
    }
  }

  async getTopMovers(): Promise<{
    gainers: ProcessedMarket[];
    losers: ProcessedMarket[];
  }> {
    const markets = await this.getProcessedMarkets();

    // Note: priceChange24h is now calculated deterministically in calculatePriceChange
    // It uses simulated historical data on first load for consistency
    const gainers = [...markets]
      .sort((a, b) => b.priceChange24h - a.priceChange24h)
      .slice(0, 10); // Changed from 5 to 10 - can easily revert if needed

    const losers = [...markets]
      .sort((a, b) => a.priceChange24h - b.priceChange24h)
      .slice(0, 10); // Changed from 5 to 10 - can easily revert if needed

    return { gainers, losers };
  }

  async getCategoryBreakdown(): Promise<CategoryData[]> {
    const markets = await this.getProcessedMarkets();

    const categoryMap = new Map<string, number>();

    markets.forEach((market) => {
      const category = market.category;
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "hsl(var(--chart-6))",
    ];

    // Sort by value
    const sortedCategories = Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1]);

    // Take top 6 categories
    const topCategories = sortedCategories.slice(0, 6);
    const remainingCategories = sortedCategories.slice(6);
    
    // Calculate count from remaining categories
    const remainingCount = remainingCategories.reduce((sum, [_, count]) => sum + count, 0);

    // Check if "Other" is already in top 6
    const otherIndex = topCategories.findIndex(([name]) => name === 'Other');
    
    if (otherIndex >= 0 && remainingCount > 0) {
      // Merge remaining into existing "Other" category
      topCategories[otherIndex][1] += remainingCount;
    } else if (otherIndex < 0 && remainingCount > 0) {
      // Add new "Other" category for remaining
      topCategories.push(['Other', remainingCount]);
    }

    // Map to result format
    return topCategories.map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  }

  async getLiquidityLeaderboard(): Promise<LeaderboardItem[]> {
    const markets = await this.getProcessedMarkets();

    return markets
      .sort((a, b) => b.liquidity - a.liquidity)
      .slice(0, 5)
      .map((market) => ({
        market: market.title.length > 60 
          ? market.title.substring(0, 57) + "..." 
          : market.title,
        liquidity: Math.round(market.liquidity / 1000), // Convert to thousands
      }));
  }

  async getMarketById(id: string): Promise<ProcessedMarket | null> {
    const markets = await this.getProcessedMarkets();
    return markets.find((m) => m.id === id) || null;
  }

  // Generate historical price data (deterministic simulation for MVP)
  // NOTE: This generates simulated history since Polymarket doesn't provide historical endpoints
  // In production, this should fetch from a historical data API or maintain a time-series database
  async getMarketHistory(id: string, days: number = 7): Promise<{
    data: { timestamp: string; price: number }[];
    momentumScore: number;
  } | null> {
    const market = await this.getMarketById(id);
    if (!market) return null;

    const currentPrice = market.currentPrice;
    const dataPoints: { timestamp: string; price: number }[] = [];
    
    // Generate DETERMINISTIC historical data points using market ID as seed
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    // Create a deterministic pseudo-random generator based on market ID
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seededRandom = (index: number) => {
      const x = Math.sin(seed * (index + 1)) * 10000;
      return x - Math.floor(x);
    };
    
    let previousPrice = currentPrice;
    for (let i = days; i >= 0; i--) {
      const timestamp = new Date(now - i * dayInMs);
      const dateStr = timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Use deterministic variation based on market ID and day index
      const variation = (seededRandom(i) - 0.5) * 0.08; // -4% to +4%
      const price = i === 0 
        ? currentPrice 
        : Math.max(5, Math.min(95, previousPrice + (previousPrice * variation)));
      
      dataPoints.push({
        timestamp: dateStr,
        price: Math.round(price * 10) / 10,
      });
      
      previousPrice = price;
    }

    // Calculate momentum score from the deterministic historical data
    const firstPrice = dataPoints[0].price;
    const lastPrice = dataPoints[dataPoints.length - 1].price;
    const priceChange = lastPrice - firstPrice;
    const volumeWeight = Math.log10(market.volume + 1) / 10; // Normalized volume factor
    const momentumScore = (priceChange * 0.7) + (volumeWeight * 30); // Weighted combination

    return {
      data: dataPoints,
      momentumScore: Math.round(momentumScore * 10) / 10,
    };
  }
}

export const polymarketService = new PolymarketService();
