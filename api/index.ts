// Vercel serverless function
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GAMMA_API_BASE = "https://gamma-api.polymarket.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  
  try {
    // Route handling
    if (!path || !Array.isArray(path)) {
      return res.status(404).json({ error: 'Not found' });
    }

    const route = '/' + path.join('/');

    // Fetch markets from Polymarket
    if (route === '/markets' || route === '/markets/movers' || 
        route === '/analytics/categories' || route === '/analytics/leaderboard') {
      
      const response = await fetch(`${GAMMA_API_BASE}/markets?limit=100&active=true&closed=false`);
      const markets = await response.json();
      
      // Process based on route
      if (route === '/markets') {
        const processed = markets.slice(0, 10).map((m: any) => ({
          id: m.condition_id || m.id,
          title: m.question || 'Untitled',
          category: extractCategory(m),
          price: parseFloat(m.outcomePrices?.[0] || '0.5'),
          volume: parseFloat(m.volume || '0'),
          liquidity: parseFloat(m.liquidity || '0'),
          priceChange24h: Math.random() * 0.1 - 0.05,
        }));
        return res.json(processed);
      }
      
      if (route === '/markets/movers') {
        const processed = markets.slice(0, 20).map((m: any) => ({
          id: m.condition_id || m.id,
          title: m.question || 'Untitled',
          category: extractCategory(m),
          price: parseFloat(m.outcomePrices?.[0] || '0.5'),
          volume: parseFloat(m.volume || '0'),
          priceChange24h: Math.random() * 0.15 - 0.075,
        }));
        
        const sorted = processed.sort((a, b) => b.priceChange24h - a.priceChange24h);
        return res.json({
          gainers: sorted.slice(0, 10),
          losers: sorted.slice(-10).reverse(),
        });
      }
      
      if (route === '/analytics/categories') {
        const categories = [
          { name: 'Politics', value: 35, color: '#8b5cf6' },
          { name: 'Crypto', value: 25, color: '#3b82f6' },
          { name: 'Sports', value: 20, color: '#10b981' },
          { name: 'Other', value: 20, color: '#6366f1' },
        ];
        return res.json(categories);
      }
      
      if (route === '/analytics/leaderboard') {
        const top = markets.slice(0, 5).map((m: any) => ({
          market: m.question || 'Untitled',
          liquidity: parseFloat(m.liquidity || '0'),
        }));
        return res.json(top);
      }
    }
    
    // Market history
    if (route.includes('/history')) {
      const data = Array.from({ length: 7 }, (_, i) => ({
        timestamp: `Oct ${20 + i}`,
        price: 0.5 + Math.random() * 0.3,
      }));
      return res.json({ data, momentumScore: 65 });
    }

    return res.status(404).json({ error: 'Not found' });
    
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

function extractCategory(market: any): string {
  const title = market.question?.toLowerCase() || '';
  if (title.includes('election') || title.includes('trump') || title.includes('biden')) return 'Politics';
  if (title.includes('bitcoin') || title.includes('crypto') || title.includes('eth')) return 'Crypto';
  if (title.includes('sport') || title.includes('nfl') || title.includes('nba')) return 'Sports';
  return 'Other';
}
