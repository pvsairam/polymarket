# Polymarket Analytics Dashboard

Real-time analytics dashboard for tracking Polymarket prediction markets with live data, interactive charts, and market insights.

## 🚀 Features

- **Real-time Market Data** - Auto-refreshes every 60 seconds from Polymarket Gamma API
- **Top Movers** - Horizontal carousels showcasing top 10 gainers and losers (5 cards per slide)
- **Market Spotlight** - Detailed view of selected market with direct trading link
- **Interactive Charts** - Momentum charts with historical price trends
- **Category Analytics** - Visual breakdown of markets by category (pie chart)
- **Liquidity Leaderboard** - Top 5 markets ranked by trading liquidity
- **Live Activity Feed** - Real-time feed of 10 most active markets
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **Refresh Countdown** - Live indicator showing seconds until next data refresh
- **Advanced Filtering** - Search and category-based market filtering

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **UI Components:** Shadcn UI, Radix UI primitives
- **State Management:** TanStack Query (React Query v5)
- **Charts:** Recharts with custom gradients
- **Animations:** Framer Motion
- **Backend:** Express.js, Node.js
- **Routing:** Wouter
- **Database:** PostgreSQL with Drizzle ORM (optional)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/polymarket-analytics-dashboard.git
cd polymarket-analytics-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 API Endpoints

- `GET /api/markets` - All processed markets
- `GET /api/markets/movers` - Top 10 gainers and losers
- `GET /api/markets/:id` - Specific market details
- `GET /api/markets/:id/history` - Market historical data
- `GET /api/analytics/categories` - Category breakdown with percentages
- `GET /api/analytics/leaderboard` - Top 5 markets by liquidity

## 🎨 Design System

- **Glassmorphism UI** with backdrop blur effects and subtle borders
- **Custom color palette** optimized for light and dark themes
- **Responsive design** - Mobile-first approach with breakpoints
- **Smooth animations** using Framer Motion for micro-interactions

## 📊 Data Source

Market data powered by [Polymarket Gamma API](https://gamma-api.polymarket.com)

## 🚢 Deploy to Vercel

### Quick Deploy

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy Polymarket Analytics Dashboard"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click **Deploy**
   - Done! Live in 2-3 minutes

### No Environment Variables Needed

This app requires **zero configuration**:
- ✅ No DATABASE_URL needed (uses Polymarket API)
- ✅ No API keys required
- ✅ Works out of the box

## 👨‍💻 Developer

**For ideas and collaboration:**
- Twitter/X: [@xtestnet](https://x.com/xtestnet)
- Telegram: [@pvsairam](https://t.me/pvsairam)

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Market data from [Polymarket](https://polymarket.com)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Charts by [Recharts](https://recharts.org)

---

**Tagline:** Real-time insights for smarter trading.
