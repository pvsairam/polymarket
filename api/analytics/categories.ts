// Vercel serverless function for /api/analytics/categories
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const categories = [
    { name: 'Politics', value: 35, color: '#8b5cf6' },
    { name: 'Crypto', value: 25, color: '#3b82f6' },
    { name: 'Sports', value: 20, color: '#10b981' },
    { name: 'Other', value: 20, color: '#6366f1' },
  ];
  
  return res.status(200).json(categories);
}
