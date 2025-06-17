# 🎮 Retro Games Hybrid Backend & Frontend

This project demonstrates a high-performance hybrid architecture combining **Server-Side Rendering (SSR)** with **API-driven content** using Express.js backend and Next.js frontend.

## 🚀 Quick Start

### Start Both Servers
```bash
# Install all dependencies
npm run install:all

# Start both backend and frontend in development mode
npm run dev:both
```

### Individual Server Management
```bash
# Backend only (Express - Port 3001)
npm run dev:backend

# Frontend only (Next.js - Port 3000)
npm run dev:frontend
```

## 🏗️ Architecture Overview

This application showcases two complementary approaches for optimal performance:

### 1. **Server-Side Rendering (SSR)** - Express Backend
- **Port:** 3001
- **Purpose:** Pre-rendered HTML for instant loading and SEO
- **Routes:** `/`, `/games`, `/stats`, `/game/:id`
- **Benefits:** Fast initial page load, perfect SEO, works without JavaScript

### 2. **API-Driven Content** - JSON Endpoints
- **Port:** 3001 (same server)
- **Purpose:** Dynamic data for interactive features
- **Routes:** `/api/games`, `/api/stats`, `/health`
- **Benefits:** Real-time updates, client-side interactivity, progressive enhancement

## 📊 Performance Optimizations

### Backend (Express)
- ✅ **In-Memory Caching** - NodeCache with 5-minute TTL
- ✅ **Response Compression** - Gzip/Deflate encoding
- ✅ **Rate Limiting** - 100 requests/15min (general), 300/15min (API)
- ✅ **Security Headers** - Helmet.js with CSP
- ✅ **Request Validation** - Express-validator with sanitization
- ✅ **Error Handling** - Structured error responses
- ✅ **Health Monitoring** - `/health` endpoint

### Frontend (Next.js)
- ✅ **Hybrid Routing** - SSR + Client-side navigation
- ✅ **Progressive Enhancement** - Works without JavaScript
- ✅ **API Proxying** - Seamless backend integration
- ✅ **Code Splitting** - Automatic bundle optimization
- ✅ **Static Optimization** - Pre-rendered when possible

## 🔗 API Documentation

### Games Endpoints

#### Get All Games
```http
GET /api/games
```

**Query Parameters:**
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | number | Page number for pagination | 1 |
| `limit` | number | Items per page (max 100) | 10 |
| `sortBy` | string | Sort field: name, year, price, rating, popularity | popularity |
| `sortOrder` | string | Sort direction: asc, desc | desc |
| `genre` | string | Filter by genre | - |
| `platform` | string | Filter by platform | - |
| `minYear` | number | Minimum year filter | - |
| `maxYear` | number | Maximum year filter | - |
| `minPrice` | number | Minimum price filter | - |
| `maxPrice` | number | Maximum price filter | - |
| `search` | string | Search in name, description, tags | - |
| `inStock` | boolean | Filter by availability | - |

**Example Request:**
```bash
curl "http://localhost:3001/api/games?genre=Platformer&sortBy=year&limit=5"
```

**Example Response:**
```json
{
  "games": [
    {
      "id": 1,
      "name": "Super Mario Bros.",
      "platform": "Nintendo Entertainment System",
      "year": 1985,
      "price": 29.99,
      "genre": "Platformer",
      "description": "The classic that started it all!",
      "rating": 9.5,
      "popularity": 98,
      "inStock": true,
      "tags": ["classic", "nintendo", "platformer"]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalGames": 8,
    "hasNextPage": true,
    "hasPrevPage": false,
    "nextPage": 2,
    "prevPage": null
  },
  "filters": { "genre": "Platformer" },
  "sort": { "sortBy": "year", "sortOrder": "asc" }
}
```

#### Get Single Game
```http
GET /api/games/:id
```

#### Get Featured Games
```http
GET /api/games/featured/random?count=3
```

#### Get Metadata
```http
GET /api/games/meta/genres
GET /api/games/meta/platforms
```

### Statistics Endpoints

#### Get All Statistics
```http
GET /api/stats
```

#### Get Summary Statistics
```http
GET /api/stats/summary
```

#### Get Specific Statistics
```http
GET /api/stats/genres      # Genre distribution
GET /api/stats/platforms   # Platform distribution  
GET /api/stats/prices      # Price range distribution
GET /api/stats/decades     # Decade distribution
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "totalGames": 7,
    "totalValue": 194.93,
    "avgPrice": 27.85,
    "newestYear": 1991,
    "oldestYear": 1978
  }
}
```

### Health Check
```http
GET /health
```

Returns server status, uptime, and memory usage.

## 🎯 SSR Routes (Server-Side Rendered)

### Home Page
```http
GET http://localhost:3001/
```
Pre-rendered homepage with featured games and statistics.

### Games Listing
```http
GET http://localhost:3001/games?genre=Platformer&platform=NES
```
Server-rendered games list with filtering support.

### Statistics Dashboard
```http
GET http://localhost:3001/stats
```
Server-rendered comprehensive statistics page.

### Game Details
```http
GET http://localhost:3001/game/:id
```
Server-rendered individual game page with full details.

## 🔄 Hybrid Usage Examples

### Example 1: Progressive Enhancement
```javascript
// Page loads with SSR content immediately
// Then JavaScript enhances with real-time data

useEffect(() => {
  // Load fresh data from API
  fetch('/api/games?limit=6')
    .then(response => response.json())
    .then(data => updateUI(data.games));
}, []);
```

### Example 2: SEO + Interactivity
1. **Initial Load:** Server renders HTML with games data
2. **SEO Benefits:** Search engines see complete content
3. **Hydration:** JavaScript adds sorting, filtering, real-time updates
4. **Performance:** Best of both worlds

### Example 3: Fallback Strategy
- SSR provides content even if JavaScript fails
- Progressive enhancement adds features when available
- Graceful degradation ensures accessibility

## 🛠️ Development

### File Structure
```
project/
├── backend/                 # Express server
│   ├── routes/
│   │   ├── games.js        # Games API endpoints
│   │   ├── stats.js        # Statistics endpoints
│   │   └── ssr.js          # SSR routes
│   ├── server.js           # Main server
│   └── package.json
├── src/app/                # Next.js frontend
│   ├── hybrid/             # Hybrid demo page
│   ├── OptimizedGamesList.jsx
│   ├── OptimizedGameStats.jsx
│   └── page.js
└── package.json
```

### Environment Variables
```bash
# Backend (.env)
NODE_ENV=development
PORT=3001
CORS_ORIGINS=http://localhost:3000
CACHE_TTL=300
RATE_LIMIT_MAX_REQUESTS=100
```

### Caching Strategy
- **API Responses:** 5 minutes (frequently changing data)
- **SSR Pages:** 5 minutes (balance freshness vs performance)
- **Metadata:** 1 hour (rarely changing data)
- **Static Assets:** 1 day (with proper ETags)

## 🚀 Production Deployment

### Backend Optimization
```bash
# Set production environment
NODE_ENV=production

# Use PM2 for process management
pm2 start server.js --name retro-games-api

# Configure external caching (Redis)
REDIS_URL=redis://localhost:6379
```

### Frontend Optimization
```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### Performance Monitoring
```bash
# Check server health
curl http://localhost:3001/health

# Monitor cache hit rates (check X-Cache header)
curl -I http://localhost:3001/api/games

# Load testing
npm run load-test
```

## 📈 Performance Metrics

### Expected Performance
- **SSR First Paint:** < 100ms
- **API Response Time:** < 50ms (cached), < 200ms (fresh)
- **Cache Hit Rate:** > 80%
- **Memory Usage:** < 200MB
- **Concurrent Users:** 1000+ (with proper scaling)

### Monitoring
- Server uptime and memory via `/health`
- Cache performance via `X-Cache` headers
- Response times via logging middleware
- Error rates via structured error handling

## 🤝 Integration Examples

### Next.js Integration
```javascript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      }
    ];
  }
};
```

### React Hook Example
```javascript
const useGames = (filters = {}) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchGames = async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/games?${params}`);
      const data = await response.json();
      setGames(data.games);
      setLoading(false);
    };
    
    fetchGames();
  }, [filters]);
  
  return { games, loading };
};
```

## 🔧 Troubleshooting

### Common Issues
1. **Port Conflicts:** Ensure ports 3000 and 3001 are available
2. **CORS Errors:** Check CORS_ORIGINS configuration
3. **Cache Issues:** Clear cache or restart server
4. **API Timeouts:** Check network connectivity and server health

### Debug Commands
```bash
# Check if backend is running
curl http://localhost:3001/health

# Test API endpoints
curl "http://localhost:3001/api/games?limit=1"

# Check SSR rendering
curl http://localhost:3001/ | head -20

# Monitor server logs
cd backend && npm run dev
```

This hybrid architecture provides the optimal balance of performance, SEO, and user experience by leveraging both SSR and API-driven approaches where each excels.
