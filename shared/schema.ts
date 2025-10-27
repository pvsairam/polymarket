import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Polymarket data types
export interface PolymarketMarket {
  id: string;
  question: string;
  slug: string;
  condition_id: string;
  market_maker_address: string;
  clobTokenIds: string; // Stringified JSON array
  outcomePrices: string; // Stringified JSON array
  volume: number;
  liquidity: number;
  active: boolean;
  closed: boolean;
  archived: boolean;
  end_date: string;
  tags?: Array<{ label: string; slug: string }>;
  events?: Array<{ title: string; slug: string }>;
  negRisk: boolean;
}

export interface ProcessedMarket {
  id: string;
  title: string;
  category: string;
  currentPrice: number;
  priceChange24h: number;
  volume: number;
  liquidity: number;
  tokenIds: string[];
  prices: number[];
  active: boolean;
  endDate: string;
}

export interface PriceHistoryPoint {
  timestamp: string;
  price: number;
}

export interface MarketMomentum {
  marketId: string;
  title: string;
  data: PriceHistoryPoint[];
  momentumScore: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface LeaderboardItem {
  market: string;
  liquidity: number;
}
