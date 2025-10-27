import LiveFeed from "../LiveFeed";

export default function LiveFeedExample() {
  const mockItems = [
    {
      id: "1",
      type: "new_market" as const,
      market: "AI Achieves AGI by 2026",
      description: "New market opened with initial liquidity of $50k",
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      type: "price_change" as const,
      market: "Bitcoin $100k by EOY",
      description: "Price surged 15% in the last hour",
      timestamp: "5 minutes ago",
      value: 15,
    },
    {
      id: "3",
      type: "volume_spike" as const,
      market: "Fed Rate Cut March 2025",
      description: "$120k traded in the last 10 minutes",
      timestamp: "8 minutes ago",
    },
  ];

  return <LiveFeed items={mockItems} />;
}
