import TopMoversSection from "../TopMoversSection";

export default function TopMoversSectionExample() {
  const mockGainers = [
    {
      id: "g1",
      title: "Bitcoin reaches $100k by end of 2025",
      category: "Crypto",
      currentPrice: 72.5,
      priceChange24h: 15.2,
      volume: 450000,
    },
    {
      id: "g2",
      title: "AI achieves AGI by 2026",
      category: "Tech",
      currentPrice: 45.8,
      priceChange24h: 12.7,
      volume: 180000,
    },
    {
      id: "g3",
      title: "Democrats win 2024 election",
      category: "Politics",
      currentPrice: 58.3,
      priceChange24h: 8.9,
      volume: 890000,
    },
    {
      id: "g4",
      title: "ETH reaches $10k in 2025",
      category: "Crypto",
      currentPrice: 38.2,
      priceChange24h: 7.5,
      volume: 320000,
    },
    {
      id: "g5",
      title: "Fed cuts rates in March 2025",
      category: "Economics",
      currentPrice: 64.1,
      priceChange24h: 6.3,
      volume: 510000,
    },
  ];

  const mockLosers = [
    {
      id: "l1",
      title: "Recession in 2025",
      category: "Economics",
      currentPrice: 23.5,
      priceChange24h: -12.4,
      volume: 290000,
    },
    {
      id: "l2",
      title: "BTC below $50k by June",
      category: "Crypto",
      currentPrice: 18.2,
      priceChange24h: -9.8,
      volume: 210000,
    },
    {
      id: "l3",
      title: "Oil reaches $120/barrel",
      category: "Commodities",
      currentPrice: 31.7,
      priceChange24h: -7.2,
      volume: 150000,
    },
    {
      id: "l4",
      title: "Tech stocks crash 30%",
      category: "Finance",
      currentPrice: 15.9,
      priceChange24h: -6.5,
      volume: 410000,
    },
    {
      id: "l5",
      title: "Champions League upset",
      category: "Sports",
      currentPrice: 42.3,
      priceChange24h: -5.1,
      volume: 95000,
    },
  ];

  return (
    <div className="p-6 bg-background">
      <TopMoversSection gainers={mockGainers} losers={mockLosers} />
    </div>
  );
}
