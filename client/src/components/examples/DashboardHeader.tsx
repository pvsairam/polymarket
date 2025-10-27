import { useState } from "react";
import DashboardHeader from "../DashboardHeader";

export default function DashboardHeaderExample() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onSearch={(query) => console.log("Search:", query)}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
