import LiquidityLeaderboard from "../LiquidityLeaderboard";

export default function LiquidityLeaderboardExample() {
  const mockData = [
    { market: "BTC $100k", liquidity: 450 },
    { market: "US Election 2024", liquidity: 380 },
    { market: "ETH $10k", liquidity: 320 },
    { market: "Fed Rate Cut", liquidity: 280 },
    { market: "Champions League", liquidity: 210 },
  ];

  return <LiquidityLeaderboard data={mockData} />;
}
