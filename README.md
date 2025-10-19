# Chess.com Performance Dashboard

A modern, interactive analytics dashboard for visualizing and analyzing Chess.com match data. Built with Next.js, TypeScript, and React, this dashboard provides comprehensive insights into chess performance metrics, player statistics, and game analytics.

## Features

### 📊 Real-Time Analytics
- **Overview Dashboard**: Comprehensive view of key metrics including total matches, active players, average match duration, and win rates
- **Match Results Visualization**: Interactive charts showing distribution of game outcomes over time
- **Rating Trends**: Track player rating progression with detailed historical data
- **Performance Metrics**: Statistical analysis of chess performance with visual representations

### 🎮 Match Management
- **Match History**: Complete record of all games with detailed information
- **Match Details**: View individual match data including:
  - Players (white/black)
  - Game result
  - Duration and move count
  - Player ratings
  - Time control
  - Opening used

### 👥 Player Analytics
- **Player Leaderboard**: Rankings by rating and performance
- **Individual Player Stats**:
  - Current rating
  - Win rate
  - Average move time
  - Most common openings
  - Total games (wins/losses/draws)
  - Rating history

### 📈 Deep Analytics
- **Opening Performance**: Analysis of most popular chess openings by frequency
- **Rating Progression**: Average rating trends over time
- **Result Distribution**: Visual breakdown of wins, losses, and draws
- **Time Management**: Move time distribution analysis

### ⚙️ Customization
- **Settings Page**: Configure dashboard preferences (coming soon)
- **Dark Mode**: Built-in dark theme for comfortable viewing
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Technology Stack

### Frontend
- **[Next.js 15.2.4](https://nextjs.org/)**: React framework with App Router
- **[React 19](https://react.dev/)**: UI library
- **[TypeScript 5](https://www.typescriptlang.org/)**: Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)**: Accessible component primitives
- **[Lucide React](https://lucide.dev/)**: Icon library

### Data Visualization
- **[Recharts 2.15.4](https://recharts.org/)**: Charting library for React
- **[D3.js](https://d3js.org/)**: Data visualization library

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)**: Re-usable component library
- **[Geist Font](https://vercel.com/font)**: Modern font family
- **[next-themes](https://github.com/pacocoursey/next-themes)**: Theme management

### Development Tools
- **[Jest](https://jestjs.io/)**: Testing framework
- **[React Testing Library](https://testing-library.com/react)**: Component testing
- **[ESLint](https://eslint.org/)**: Code linting
- **[pnpm](https://pnpm.io/)**: Fast, disk space efficient package manager

## Project Structure

```
Chess.com-Performance-Dashboard/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── analytics/           # Analytics endpoints
│   │   ├── matches/             # Match data endpoints
│   │   └── players/             # Player data endpoints
│   ├── analytics/               # Analytics page
│   ├── matches/                 # Matches page
│   ├── players/                 # Players page
│   ├── settings/                # Settings page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── charts/                  # Chart components
│   │   ├── bar-chart.tsx
│   │   ├── line-chart.tsx
│   │   ├── openings-chart.tsx
│   │   ├── pie-chart.tsx
│   │   ├── rating-chart.tsx
│   │   └── results-chart.tsx
│   ├── ui/                      # UI primitives (shadcn/ui)
│   ├── header.tsx               # Header component
│   ├── match-table.tsx          # Match table component
│   ├── player-table.tsx         # Player table component
│   ├── sidebar.tsx              # Sidebar navigation
│   └── stat-card.tsx            # Statistics card component
├── lib/                         # Utility libraries
│   ├── cache.ts                # Caching utilities
│   ├── mock-data.ts            # Mock data generators
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Helper functions
├── hooks/                       # Custom React hooks
├── __tests__/                   # Test files
│   ├── api/                    # API tests
│   ├── components/             # Component tests
│   └── lib/                    # Library tests
├── public/                      # Static assets
├── styles/                      # Global styles
└── next.config.mjs             # Next.js configuration
```

## Installation

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Chess.com-Performance-Dashboard.git
   cd Chess.com-Performance-Dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality

### Development Workflow

1. **Start the dev server**: Run `pnpm dev` to start the development server with hot reload
2. **Make changes**: Edit files in `app/`, `components/`, or `lib/` directories
3. **View changes**: Changes are reflected immediately in the browser
4. **Lint code**: Run `pnpm lint` to check code quality

## API Routes

The dashboard includes several API endpoints for data retrieval:

### Analytics
- `GET /api/analytics` - Retrieve overall match analytics
  - Total matches
  - Average duration
  - Result distribution
  - Popular openings
  - Rating trends

### Matches
- `GET /api/matches` - List all matches
  - Supports pagination
  - Returns match details with player information

### Players
- `GET /api/players` - List all players with statistics
- `GET /api/players/[username]` - Get specific player details
  - Player stats
  - Rating history
  - Game records

## Data Types

### ChessMatch
```typescript
interface ChessMatch {
  match_id: string
  player_white: string
  player_black: string
  result: "white" | "black" | "draw"
  duration: number // in seconds
  moves: number
  timestamp: string
  white_rating: number
  black_rating: number
  time_control: string
  opening: string
}
```

### PlayerStats
```typescript
interface PlayerStats {
  player_id: string
  username: string
  rating: number
  win_rate: number
  avg_move_time: number
  most_common_openings: string[]
  total_games: number
  wins: number
  losses: number
  draws: number
  rating_history: RatingPoint[]
}
```

### MatchAnalytics
```typescript
interface MatchAnalytics {
  total_matches: number
  avg_duration: number
  result_distribution: {
    white: number
    black: number
    draw: number
  }
  popular_openings: { name: string; count: number }[]
  rating_trends: RatingPoint[]
}
```

## Caching

The application implements a caching layer to improve performance:
- API responses are cached with configurable TTL (Time To Live)
- Default cache duration: 10 minutes (600,000ms)
- Cache implementation in `lib/cache.ts`

## Testing

The project includes test infrastructure using Jest and React Testing Library:

```bash
# Run tests (note: test script needs to be added to package.json)
npm test
```

Test files are located in the `__tests__/` directory:
- API route tests
- Component tests
- Utility function tests

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure settings

3. **Deploy**
   - Click "Deploy"
   - Your dashboard will be live!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

## Configuration

### Next.js Config
The `next.config.mjs` file includes:
- ESLint configuration
- TypeScript settings
- Image optimization settings

### Tailwind CSS
Styling is configured in `tailwind.config.ts` with custom theme extensions

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: description of your changes"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all components are properly typed
- Follow the existing code structure

## Roadmap

- [ ] Integration with live Chess.com API
- [ ] User authentication and personalized dashboards
- [ ] Advanced filtering and search capabilities
- [ ] Export data to CSV/JSON
- [ ] Comparison between multiple players
- [ ] Game replay visualization
- [ ] Real-time match updates
- [ ] Mobile app version
- [ ] Advanced opening analysis
- [ ] Tournament tracking

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [v0.dev](https://v0.dev) by Vercel
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Chess data structure inspired by Chess.com API
- Icons by [Lucide](https://lucide.dev/)

## Support

For issues, questions, or contributions:
- Create an issue on [GitHub](https://github.com/johaankjis/Chess.com-Performance-Dashboard/issues)
- Contribute via pull requests

---

**Built with ♟️ for chess enthusiasts and data analysts**
