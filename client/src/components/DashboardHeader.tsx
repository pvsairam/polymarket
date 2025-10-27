import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LiveDataBadge from "./LiveDataBadge";
import { ThemeToggle } from "./ThemeToggle";

interface DashboardHeaderProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string | null) => void;
  selectedCategory?: string | null;
}

const categories = ["Politics", "Crypto", "Sports", "Other"];

export default function DashboardHeader({
  onSearch,
  onCategoryChange,
  selectedCategory,
}: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight" data-testid="text-app-title">
              Polymarket Analytics
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-app-tagline">
              Real-time insights for smarter trading
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LiveDataBadge />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-4">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground hidden md:block" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange?.(selectedCategory === category ? null : category)}
                data-testid={`button-filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
