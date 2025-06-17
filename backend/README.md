# Retro Games Express Backend

A high-performance Express.js backend that serves both Server-Side Rendered (SSR) HTML and JSON API endpoints for a retro games application.

## 🚀 Features

### Performance Optimizations
- **In-memory caching** with NodeCache for fast data retrieval
- **Response compression** with gzip/deflate encoding
- **Rate limiting** to prevent abuse and ensure stability
- **Static file serving** with proper cache headers
- **Efficient error handling** and logging

### SSR (Server-Side Rendering)
- Pre-rendered HTML pages for better SEO and initial load performance
- Progressive enhancement with client-side JavaScript
- Critical CSS inlined for fastest first paint
- Meta tags and Open Graph support for social sharing

### JSON API Endpoints
- RESTful API design with comprehensive game data
- Advanced filtering, sorting, and pagination
- Input validation and sanitization
- Structured error responses
- Multiple data formats (summary, detailed, paginated)

### Security & Best Practices
- Helmet.js for security headers
- CORS configuration for cross-origin requests
- Request validation with express-validator
- Environment-based configuration
- Graceful error handling and shutdown

## 📁 Project Structure

```
backend/
├── routes/
│   ├── games.js      # Game data API endpoints
│   ├── stats.js      # Statistics API endpoints
│   └── ssr.js        # Server-side rendered pages
├── package.json      # Dependencies and scripts
├── server.js         # Main server configuration
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## 🛠 Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Or start the production server:**
   ```bash
   npm start
   ```

## 🔗 API Endpoints

### Games API (`/api/games`)

#### Get All Games
```
GET /api/games
```
**Query Parameters:**
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)
- `sortBy` (string): Sort field - name, year, price, rating, popularity
- `sortOrder` (string): asc or desc (default: desc)
- `genre` (string): Filter by genre
- `platform` (string): Filter by platform
- `minYear`, `maxYear` (number): Filter by year range
- `minPrice`, `maxPrice` (number): Filter by price range
- `search` (string): Search in name, description, and tags
- `inStock` (boolean): Filter by availability

**Example Response:**
```json
{
  "games": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalGames": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "filters": {...},
  "sort": {...}
}
```

#### Get Single Game
```
GET /api/games/:id
```

#### Get Featured Games
```
GET /api/games/featured/random?count=3
```

#### Get Metadata
```
GET /api/games/meta/genres
GET /api/games/meta/platforms
```

### Statistics API (`/api/stats`)

#### Get All Statistics
```
GET /api/stats
```

#### Get Summary Statistics
```
GET /api/stats/summary
```

#### Get Specific Stats
```
GET /api/stats/genres
GET /api/stats/platforms
GET /api/stats/prices
GET /api/stats/decades
```

### SSR Pages

#### Home Page
```
GET /
```
Server-rendered home page with featured games and stats.

#### Games Listing
```
GET /games
```
Server-rendered games listing with filtering support.

#### Statistics Page
```
GET /stats
```
Server-rendered statistics dashboard.

#### Game Detail
```
GET /game/:id
```
Server-rendered individual game page.

## ⚡ Performance Features

### Caching Strategy
- **API responses**: Cached for 5-10 minutes depending on data volatility
- **SSR pages**: Cached for 5 minutes with cache headers
- **Static metadata**: Cached for 1 hour (genres, platforms)
- **Cache headers**: Proper HTTP cache control for client-side caching

### Response Optimization
- **Compression**: Gzip/deflate compression for all responses
- **Content negotiation**: Proper MIME types and encoding
- **Selective fields**: API supports field selection to reduce payload size
- **Pagination**: Prevents large data transfers

### Security Measures
- **Rate limiting**: 100 requests per 15 minutes for general routes, 300 for API
- **Helmet.js**: Security headers including CSP, HSTS, etc.
- **Input validation**: All query parameters and request bodies validated
- **CORS**: Configurable cross-origin resource sharing
- **Error sanitization**: No sensitive information leaked in error responses

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=development          # Environment mode
PORT=3001                    # Server port
CORS_ORIGINS=http://localhost:3000  # Allowed origins
CACHE_TTL=300               # Default cache TTL in seconds
RATE_LIMIT_MAX_REQUESTS=100 # Rate limit threshold
```

### Cache Configuration
```javascript
// Configurable cache durations
API_CACHE_DURATION=300      # 5 minutes for API responses
SSR_CACHE_DURATION=300      # 5 minutes for SSR pages
METADATA_CACHE_DURATION=3600 # 1 hour for metadata
```

## 📊 Monitoring

The server includes built-in monitoring endpoints:

### Health Check
```
GET /health
```
Returns server status, uptime, and memory usage.

### Cache Status
Response headers include cache status:
- `X-Cache: HIT` - Response served from cache
- `X-Cache: MISS` - Response generated fresh

## 🚀 Production Deployment

1. **Build optimizations:**
   - Set `NODE_ENV=production`
   - Configure proper CORS origins
   - Set up external caching (Redis recommended)
   - Configure database connections

2. **Scaling considerations:**
   - Use cluster mode for multi-core utilization
   - Implement Redis for shared caching across instances
   - Set up load balancing for high availability
   - Monitor memory usage and cache hit rates

3. **Security hardening:**
   - Use HTTPS in production
   - Configure proper firewall rules
   - Set up monitoring and logging
   - Regular security updates

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Load testing
npm run load-test
```

## 🤝 Integration with Frontend

This backend is designed to work with the Next.js frontend application. The frontend can:

1. **Use SSR pages** for initial page loads and SEO
2. **Progressively enhance** with API calls for dynamic content
3. **Implement hybrid routing** between SSR and client-side navigation
4. **Cache API responses** on the client side for optimal performance

## 📈 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- User authentication and sessions
- Real-time features with WebSockets
- Advanced analytics and metrics
- Content delivery network (CDN) integration
- Microservices architecture migration
