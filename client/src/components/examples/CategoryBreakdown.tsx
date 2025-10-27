import CategoryBreakdown from "../CategoryBreakdown";

export default function CategoryBreakdownExample() {
  const mockData = [
    { name: "Politics", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Crypto", value: 30, color: "hsl(var(--chart-2))" },
    { name: "Sports", value: 15, color: "hsl(var(--chart-3))" },
    { name: "Other", value: 10, color: "hsl(var(--chart-4))" },
  ];

  return <CategoryBreakdown data={mockData} />;
}
