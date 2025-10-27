import type { Express } from "express";
import { storage } from "./storage";
import { polymarketService } from "./polymarket";

export async function registerRoutes(app: Express): Promise<Express> {
  // Polymarket API endpoints

  // Get all processed markets
  app.get("/api/markets", async (req, res) => {
    try {
      const markets = await polymarketService.getProcessedMarkets();
      res.json(markets);
    } catch (error) {
      console.error("Error fetching markets:", error);
      res.status(500).json({ error: "Failed to fetch markets" });
    }
  });

  // Get top movers (gainers and losers)
  app.get("/api/markets/movers", async (req, res) => {
    try {
      const movers = await polymarketService.getTopMovers();
      res.json(movers);
    } catch (error) {
      console.error("Error fetching top movers:", error);
      res.status(500).json({ error: "Failed to fetch top movers" });
    }
  });

  // Get category breakdown
  app.get("/api/analytics/categories", async (req, res) => {
    try {
      const categories = await polymarketService.getCategoryBreakdown();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching category breakdown:", error);
      res.status(500).json({ error: "Failed to fetch category breakdown" });
    }
  });

  // Get liquidity leaderboard
  app.get("/api/analytics/leaderboard", async (req, res) => {
    try {
      const leaderboard = await polymarketService.getLiquidityLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Get specific market by ID
  app.get("/api/markets/:id", async (req, res) => {
    try {
      const market = await polymarketService.getMarketById(req.params.id);
      if (!market) {
        res.status(404).json({ error: "Market not found" });
        return;
      }
      res.json(market);
    } catch (error) {
      console.error("Error fetching market:", error);
      res.status(500).json({ error: "Failed to fetch market" });
    }
  });

  // Get market price history and momentum
  app.get("/api/markets/:id/history", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const history = await polymarketService.getMarketHistory(req.params.id, days);
      if (!history) {
        res.status(404).json({ error: "Market not found" });
        return;
      }
      res.json(history);
    } catch (error) {
      console.error("Error fetching market history:", error);
      res.status(500).json({ error: "Failed to fetch market history" });
    }
  });

  return app;
}
