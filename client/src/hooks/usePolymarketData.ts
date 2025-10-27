import { useQuery } from "@tanstack/react-query";
import type { ProcessedMarket, CategoryData, LeaderboardItem } from "@shared/schema";

export const REFETCH_INTERVAL = 60000; // 60 seconds

export function useMarkets() {
  return useQuery<ProcessedMarket[]>({
    queryKey: ["/api/markets"],
    refetchInterval: REFETCH_INTERVAL,
    staleTime: 30000, // Consider data stale after 30s
  });
}

export function useTopMovers() {
  return useQuery<{ gainers: ProcessedMarket[]; losers: ProcessedMarket[] }>({
    queryKey: ["/api/markets/movers"],
    refetchInterval: REFETCH_INTERVAL,
    staleTime: 30000,
  });
}

export function useCategoryBreakdown() {
  return useQuery<CategoryData[]>({
    queryKey: ["/api/analytics/categories"],
    refetchInterval: REFETCH_INTERVAL,
    staleTime: 30000,
  });
}

export function useLiquidityLeaderboard() {
  return useQuery<LeaderboardItem[]>({
    queryKey: ["/api/analytics/leaderboard"],
    refetchInterval: REFETCH_INTERVAL,
    staleTime: 30000,
  });
}

export function useMarketHistory(marketId: string | null, days: number = 7) {
  return useQuery<{
    data: { timestamp: string; price: number }[];
    momentumScore: number;
  }>({
    queryKey: [`/api/markets/${marketId}/history?days=${days}`],
    enabled: !!marketId,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: 30000,
  });
}
