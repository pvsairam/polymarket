// Vercel serverless function for /api/markets/[id]/history
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Market ID required' });
  }

  try {
    // Generate deterministic simulated data based on market ID
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const basePrice = 0.4 + (seed % 30) / 100;
    
    const data = Array.from({ length: 7 }, (_, i) => {
      const variance = Math.sin(seed + i) * 0.15;
      return {
        timestamp: `Oct ${20 + i}`,
        price: Math.max(0.1, Math.min(0.9, basePrice + variance)),
      };
    });
    
    const momentumScore = 45 + (seed % 40);
    
    return res.status(200).json({ data, momentumScore });
  } catch (error: any) {
    console.error('Error generating history:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate history' });
  }
}
