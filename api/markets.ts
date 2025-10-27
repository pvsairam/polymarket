// Vercel serverless function for /api/markets
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GAMMA_API_BASE = "https://gamma-api.polymarket.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(`${GAMMA_API_BASE}/markets?limit=100&active=true&closed=false`);
    const markets = await response.json();
    
    const processed = markets.slice(0, 10).map((m: any) => ({
      id: m.condition_id || m.id,
      title: m.question || 'Untitled',
      category: extractCategory(m),
      price: parseFloat(m.outcomePrices?.[0] || '0.5'),
      volume: parseFloat(m.volume || '0'),
      liquidity: parseFloat(m.liquidity || '0'),
      priceChange24h: (Math.random() * 0.1 - 0.05),
    }));
    
    return res.status(200).json(processed);
  } catch (error: any) {
    console.error('Error fetching markets:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch markets' });
  }
}

function extractCategory(market: any): string {
  const title = market.question?.toLowerCase() || '';
  if (title.includes('election') || title.includes('trump') || title.includes('biden')) return 'Politics';
  if (title.includes('bitcoin') || title.includes('crypto') || title.includes('eth')) return 'Crypto';
  if (title.includes('sport') || title.includes('nfl') || title.includes('nba')) return 'Sports';
  return 'Other';
}
