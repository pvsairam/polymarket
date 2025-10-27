// Vercel serverless function for /api/analytics/leaderboard
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
    
    const top = markets
      .sort((a: any, b: any) => parseFloat(b.liquidity || '0') - parseFloat(a.liquidity || '0'))
      .slice(0, 5)
      .map((m: any) => ({
        market: m.question || 'Untitled',
        liquidity: parseFloat(m.liquidity || '0'),
      }));
    
    return res.status(200).json(top);
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch leaderboard' });
  }
}
