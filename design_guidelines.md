# Polymarket Analytics Dashboard - Design Guidelines

## Design Philosophy

**Visual Direction:** Sleek, modern, futuristic, yet minimal analytics dashboard inspired by polymarket.com but even more elegant. More white space, light gradients, glassmorphism hints. The design should feel faster, cleaner, and more insightful than the original Polymarket interface.

**Tagline:** "Cut through the noise — trade with insight."

---

## Color Palette

- **Primary Colors:** Neutral greys, soft whites
- **Accent Colors:** Subtle blues and lilacs for charts and data visualization
- **No harsh tones:** Maintain a sophisticated, professional aesthetic
- **Glassmorphism:** Use subtle transparency, blur effects, and light borders for card components
- **Chart Colors:** Soft gradients transitioning from blues to lilacs for area charts; distinct but muted colors for line charts

---

## Typography

**Font Families:** Inter or Satoshi (choose one and use consistently)

**Hierarchy:**
- **Hero/Dashboard Title:** Large, bold, minimal weight
- **Section Headers:** Medium-large, clear distinction from body text
- **Card Titles/Market Names:** Medium weight, readable at various sizes
- **Data/Numbers:** Slightly heavier weight to emphasize metrics
- **Body Text/Descriptions:** Regular weight, optimized for readability
- **Labels/Metadata:** Smaller, lighter weight

**Readability:** Clear, readable, minimal approach - prioritize legibility over decoration

---

## Layout System

**Spacing:** Use generous white space to create breathing room and enhance the minimal aesthetic. Establish consistent spacing rhythm using Tailwind units: primarily 4, 6, 8, 12, 16, 24 for padding/margins.

**Grid Structure:**
- **Dashboard Layout:** Full-width container with max-width constraint (max-w-7xl)
- **Card Grids:** Responsive grid layout - 1 column mobile, 2 columns tablet, 3-4 columns desktop
- **Chart Sections:** Full-width within containers, responsive height scaling

**Responsive Breakpoints:**
- Mobile: Single column, stacked layout
- Tablet: 2-column grids, adjusted chart heights
- Desktop: Multi-column grids, full chart experiences

---

## Component Design

### Navigation/Header
- Clean, minimal top navigation with "Live Data" badge in top right corner
- Search bar with glassmorphism styling
- Category filters (politics, crypto, sports) as pill-shaped buttons
- Sticky header on scroll with subtle shadow

### Dashboard Cards
- Glassmorphism effect: semi-transparent background, subtle blur, light border
- Smooth rounded corners (moderate radius)
- Hover state: subtle elevation/glow effect
- Internal padding: comfortable spacing around content
- Shadow: soft, multi-layered shadows for depth

### Market Cards (Top Movers, Live Markets)
- **Layout:** Compact card with market title, current price prominently displayed
- **Metrics:** 24h % change, volume, category tag
- **Visual Indicators:** Color-coded percentage changes (subtle green/red), trending icons
- **Sorting Options:** Liquidity, volatility, popularity filters

### Charts & Data Visualization
- **Chart Types:** 
  - Line/Area charts for price history (Recharts or ECharts)
  - Bar charts for liquidity leaderboard
  - Pie/Donut charts for category breakdown
  - Heatmaps for category concentration
- **Animation:** Smooth transitions when data updates, animated entry effects
- **Axes:** Clean, minimal grid lines, clear labels
- **Tooltips:** Glassmorphism styled, clear data presentation
- **Legends:** Minimal, positioned strategically

### Whale Activity Tracker
- List/feed format showing large order movements
- Timestamp, market name, order size, direction (buy/sell)
- Visual prominence for significant whale activities
- Subtle animations when new activity appears

### Live Feed
- Auto-updating list with smooth fade-in animations for new items
- Recent market openings, price changes, high-volume activity
- Timestamp with relative time (e.g., "2m ago")
- Compact layout with clear visual hierarchy

### Loading States
- Skeleton loaders matching card/chart layouts
- Smooth fade transitions between loading and loaded states
- Subtle pulse animations on skeleton elements

### Empty States
- Minimal illustrations or icons
- Clear messaging about missing data or filters
- Suggested actions to populate the view

---

## Animations & Interactions

**Animation Library:** Framer Motion

**Micro-interactions:**
- Smooth fade-ins on component mount
- Hover transitions on cards and buttons (subtle scale, glow, or shadow changes)
- Number counters for metrics (animated count-up effect)
- Chart transitions when new data arrives (smooth interpolation)
- Loading spinners with subtle rotation
- Auto-refresh pulse indicator

**Performance:** Target 60 fps, keep animations lightweight and performant

**Timing:** Use consistent easing functions (ease-in-out), moderate duration (200-400ms for most interactions)

---

## Data Presentation

### Metrics Display
- Large, bold numbers for key metrics
- Clear labels and units
- Visual indicators for trends (arrows, percentage changes)
- Comparison data where relevant (e.g., 24h change)

### Market Momentum Score
- Calculated from weighted combination of price delta + volume delta
- Visual representation (gauge, progress bar, or colored indicator)
- Tooltip explaining calculation methodology

### Timestamps
- "Last updated: X seconds ago" indicator
- Auto-refresh every 60 seconds with visual feedback

---

## Footer

**Content:**
```
Built with ❤️ by xtestnet (link to https://x.com/xtestnet)
Data courtesy of Polymarket (link to https://polymarket.com)
```

**Styling:** Minimal, centered, subtle text color, appropriate spacing from main content

---

## Images

**Live Data Badge:** Top right corner - small badge/pill showing "🔴 Live Data" with subtle pulse animation

**No Hero Image:** This is a data-focused dashboard - prioritize immediate data visibility over decorative imagery

**Icons:** Use for category tags, trending indicators, and navigation. Keep style consistent (outline or solid, not mixed)

---

## Responsiveness

- Mobile: Stacked layout, simplified charts, touch-friendly tap targets
- Tablet: 2-column grids, medium chart sizes, collapsible sections
- Desktop: Multi-column grids, full chart experiences, expansive data views
- Auto-fit every screen size using Tailwind responsive breakpoints
- Test at 320px (small mobile), 768px (tablet), 1024px (desktop), 1920px (large desktop)

---

## Performance & UX

- Fast load times with lazy loading for charts
- Smooth 60s auto-refresh with visual indicators
- Loading skeletons during data fetch
- Async suspense for chart modules
- Cached API responses to respect rate limits
- Smooth transitions between data states
- No jarring layout shifts

---

## Accessibility

- Sufficient color contrast for all text
- Keyboard navigation support
- ARIA labels for interactive elements
- Screen reader friendly data tables
- Focus indicators on interactive elements