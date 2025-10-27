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
    
    const processed = markets.map((m: any) => {
      const outcomePricesStr = m.outcomePrices || '["0.5"]';
      const prices = JSON.parse(outcomePricesStr).map((p: string) => parseFloat(p));
      const tokenIdsStr = m.clobTokenIds || '[]';
      const tokenIds = JSON.parse(tokenIdsStr);
      
      return {
        id: m.condition_id || m.id,
        title: m.question || 'Untitled',
        category: extractCategory(m),
        currentPrice: prices[0] || 0.5,
        priceChange24h: (Math.random() * 0.1 - 0.05),
        volume: parseFloat(m.volume || '0'),
        liquidity: parseFloat(m.liquidity || '0'),
        tokenIds,
        prices,
        active: m.active !== false,
        endDate: m.end_date || new Date(Date.now() + 86400000 * 30).toISOString(),
      };
    });
    
    return res.status(200).json(processed);
  } catch (error: any) {
    console.error('Error fetching markets:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch markets' });
  }
}

function extractCategory(market: any): string {
  // Use tags first if available
  if (market.tags && market.tags.length > 0) {
    return market.tags[0].label;
  }
  
  const title = market.question?.toLowerCase() || '';
  
  if (title.includes('election') || title.includes('president') || title.includes('trump') || title.includes('biden') || title.includes('democrat') || title.includes('republican')) {
    return 'Politics';
  }
  if (title.includes('bitcoin') || title.includes('crypto') || title.includes('ethereum') || title.includes('btc') || title.includes('eth') || title.includes('tether')) {
    return 'Crypto';
  }
  if (title.includes('sport') || title.includes('nfl') || title.includes('nba') || title.includes('soccer') || title.includes('football')) {
    return 'Sports';
  }
  if (title.includes('movie') || title.includes('film') || title.includes('oscar') || title.includes('box office')) {
    return 'Entertainment';
  }
  if (title.includes('ai') || title.includes('artificial intelligence') || title.includes('tech') || title.includes('google') || title.includes('apple')) {
    return 'Technology';
  }
  if (title.includes('economy') || title.includes('fed') || title.includes('rate') || title.includes('gdp') || title.includes('recession')) {
    return 'Economics';
  }
  
  return 'Other';
}
