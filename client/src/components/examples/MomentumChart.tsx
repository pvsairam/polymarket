import MomentumChart from "../MomentumChart";

export default function MomentumChartExample() {
  const mockData = [
    { timestamp: "Jan 1", price: 45 },
    { timestamp: "Jan 5", price: 52 },
    { timestamp: "Jan 10", price: 48 },
    { timestamp: "Jan 15", price: 65 },
    { timestamp: "Jan 20", price: 62 },
    { timestamp: "Jan 25", price: 71 },
    { timestamp: "Jan 30", price: 68 },
  ];

  return (
    <MomentumChart
      title="Bitcoin $100k by EOY 2025"
      data={mockData}
      momentumScore={12.5}
    />
  );
}
