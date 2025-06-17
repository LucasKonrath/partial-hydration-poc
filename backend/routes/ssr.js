const express = require('express');
const { JSDOM } = require('jsdom');
const router = express.Router();

// Mock React SSR setup - in production, you'd use actual React SSR
const generateSSRHtml = async (componentName, props = {}) => {
  const baseHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Retro Games Collection - ${componentName}</title>
      <meta name="description" content="Discover amazing retro games from the golden age of gaming">
      <meta name="keywords" content="retro games, arcade, nintendo, sega, classic games">
      
      <!-- Open Graph meta tags -->
      <meta property="og:title" content="Retro Games Collection">
      <meta property="og:description" content="Discover amazing retro games from the golden age of gaming">
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://your-domain.com">
      
      <!-- Twitter Card meta tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="Retro Games Collection">
      <meta name="twitter:description" content="Discover amazing retro games from the golden age of gaming">
      
      <!-- Preload critical resources -->
      <link rel="preload" href="/api/games" as="fetch" crossorigin="anonymous">
      <link rel="preload" href="/api/stats/summary" as="fetch" crossorigin="anonymous">
      
      <!-- Critical CSS (inline for fastest render) -->
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
          font-family: system-ui, -apple-system, sans-serif; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: white;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
        .header { text-align: center; padding: 2rem 0; }
        .loading { 
          text-align: center; 
          padding: 2rem; 
          font-size: 1.2rem;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .games-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
          gap: 1.5rem; 
          margin: 2rem 0; 
        }
        .game-card { 
          background: rgba(255,255,255,0.1); 
          border-radius: 12px; 
          padding: 1.5rem; 
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: transform 0.3s ease;
        }
        .game-card:hover { transform: translateY(-5px); }
        .game-title { font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem; }
        .game-platform { color: #ffd700; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .game-price { font-size: 1.2rem; font-weight: bold; color: #4ade80; }
        .stats-container { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 1rem; 
          margin: 2rem 0; 
        }
        .stat-card { 
          background: rgba(255,255,255,0.1); 
          padding: 1.5rem; 
          border-radius: 8px; 
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .stat-value { font-size: 2rem; font-weight: bold; display: block; }
        .stat-label { font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem; }
      </style>
    </head>
    <body>
      <div id="root">
        <div class="container">
          <header class="header">
            <h1>🎮 Retro Games Collection</h1>
            <p>Discover amazing games from the golden age of gaming</p>
          </header>
          
          <div id="app-content">
            ${await generateComponentHTML(componentName, props)}
          </div>
        </div>
      </div>
      
      <!-- Hydration script -->
      <script>
        window.__INITIAL_DATA__ = ${JSON.stringify(props)};
        
        // Progressive enhancement
        document.addEventListener('DOMContentLoaded', function() {
          // Add interactivity after DOM is loaded
          const cards = document.querySelectorAll('.game-card');
          cards.forEach(card => {
            card.addEventListener('click', function() {
              const gameId = this.dataset.gameId;
              if (gameId) {
                // Navigate to game detail or add to cart
                console.log('Game clicked:', gameId);
              }
            });
          });
          
          // Load additional data via API for hydration
          loadAdditionalData();
        });
        
        async function loadAdditionalData() {
          try {
            // Progressively enhance with fresh data
            const [gamesResponse, statsResponse] = await Promise.all([
              fetch('/api/games?limit=6'),
              fetch('/api/stats/summary')
            ]);
            
            const gamesData = await gamesResponse.json();
            const statsData = await statsResponse.json();
            
            // Update UI with fresh data
            updateGamesDisplay(gamesData.games);
            updateStatsDisplay(statsData.data);
          } catch (error) {
            console.error('Error loading additional data:', error);
          }
        }
        
        function updateGamesDisplay(games) {
          const container = document.getElementById('games-container');
          if (container && games) {
            // Update games list with fresh data
            container.innerHTML = games.map(game => \`
              <div class="game-card" data-game-id="\${game.id}">
                <div class="game-title">\${game.name}</div>
                <div class="game-platform">\${game.platform} (\${game.year})</div>
                <div class="game-price">$\${game.price.toFixed(2)}</div>
                <p style="margin-top: 1rem; opacity: 0.9; font-size: 0.9rem;">\${game.description}</p>
              </div>
            \`).join('');
          }
        }
        
        function updateStatsDisplay(stats) {
          const elements = {
            'total-games': stats.totalGames,
            'total-value': \`$\${stats.totalValue.toFixed(2)}\`,
            'avg-price': \`$\${stats.avgPrice.toFixed(2)}\`,
            'year-range': \`\${stats.oldestYear}-\${stats.newestYear}\`
          };
          
          Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
          });
        }
      </script>
    </body>
    </html>
  `;
  
  return baseHtml;
};

const generateComponentHTML = async (componentName, props) => {
  switch (componentName) {
    case 'GamesList':
      return generateGamesListHTML(props);
    case 'GameStats':
      return generateGameStatsHTML(props);
    case 'Home':
      return generateHomePageHTML(props);
    default:
      return '<div class="loading">Loading content...</div>';
  }
};

const generateGamesListHTML = async (props) => {
  const games = props.games || [
    { id: 1, name: "Super Mario Bros.", platform: "NES", year: 1985, price: 29.99, description: "The classic that started it all!" },
    { id: 2, name: "Sonic the Hedgehog", platform: "Genesis", year: 1991, price: 24.99, description: "Gotta go fast!" },
    { id: 3, name: "Pac-Man", platform: "Arcade", year: 1980, price: 19.99, description: "Chomp dots and avoid ghosts!" }
  ];

  return `
    <section>
      <h2 style="font-size: 2rem; margin-bottom: 1.5rem; text-align: center;">Featured Retro Games</h2>
      <div id="games-container" class="games-grid">
        ${games.map(game => `
          <div class="game-card" data-game-id="${game.id}">
            <div class="game-title">${game.name}</div>
            <div class="game-platform">${game.platform} (${game.year})</div>
            <div class="game-price">$${game.price.toFixed(2)}</div>
            <p style="margin-top: 1rem; opacity: 0.9; font-size: 0.9rem;">${game.description}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
};

const generateGameStatsHTML = async (props) => {
  const stats = props.stats || {
    totalGames: 8,
    totalValue: 242.91,
    avgPrice: 30.36,
    oldestYear: 1980,
    newestYear: 1991
  };

  return `
    <section>
      <h2 style="font-size: 2rem; margin-bottom: 1.5rem; text-align: center;">Collection Statistics</h2>
      <div class="stats-container">
        <div class="stat-card">
          <span class="stat-value" id="total-games">${stats.totalGames}</span>
          <div class="stat-label">Total Games</div>
        </div>
        <div class="stat-card">
          <span class="stat-value" id="total-value">$${stats.totalValue.toFixed(2)}</span>
          <div class="stat-label">Collection Value</div>
        </div>
        <div class="stat-card">
          <span class="stat-value" id="avg-price">$${stats.avgPrice.toFixed(2)}</span>
          <div class="stat-label">Average Price</div>
        </div>
        <div class="stat-card">
          <span class="stat-value" id="year-range">${stats.oldestYear}-${stats.newestYear}</span>
          <div class="stat-label">Year Range</div>
        </div>
      </div>
    </section>
  `;
};

const generateHomePageHTML = async (props) => {
  const gamesHTML = await generateGamesListHTML(props);
  const statsHTML = await generateGameStatsHTML(props);
  
  return `
    ${gamesHTML}
    ${statsHTML}
    
    <section style="margin-top: 3rem; text-align: center;">
      <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">🕹️ Start Your Retro Journey</h2>
      <p style="opacity: 0.9; max-width: 600px; margin: 0 auto;">
        Explore our carefully curated collection of classic games that defined generations. 
        From arcade legends to console classics, find your next nostalgic adventure.
      </p>
    </section>
  `;
};

// Cache middleware for SSR routes
const ssrCacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const cache = req.app.locals.cache;
    const key = `ssr_${req.originalUrl}`;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.send(cachedResponse);
    }
    
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
    };
    next();
  };
};

// SSR Routes

// GET / - Home page with SSR
router.get('/', ssrCacheMiddleware(300), async (req, res) => {
  try {
    // Fetch initial data for SSR
    const [gamesData, statsData] = await Promise.all([
      // Simulate API calls (in production, these would be actual database queries)
      new Promise(resolve => setTimeout(() => resolve({
        games: [
          { id: 1, name: "Super Mario Bros.", platform: "NES", year: 1985, price: 29.99, description: "The classic that started it all!" },
          { id: 2, name: "Sonic the Hedgehog", platform: "Genesis", year: 1991, price: 24.99, description: "Gotta go fast!" },
          { id: 3, name: "Pac-Man", platform: "Arcade", year: 1980, price: 19.99, description: "Chomp dots and avoid ghosts!" }
        ]
      }), 50)),
      new Promise(resolve => setTimeout(() => resolve({
        totalGames: 8,
        totalValue: 242.91,
        avgPrice: 30.36,
        oldestYear: 1980,
        newestYear: 1991
      }), 30))
    ]);

    const html = await generateSSRHtml('Home', {
      games: gamesData.games,
      stats: statsData
    });

    res.send(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Error</title></head>
      <body>
        <h1>🎮 Retro Games</h1>
        <p>Sorry, we're having technical difficulties. Please try again later.</p>
      </body>
      </html>
    `);
  }
});

// GET /games - Games listing page with SSR
router.get('/games', ssrCacheMiddleware(300), async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { genre, platform, page = 1 } = req.query;
    
    // Simulate fetching filtered games
    await new Promise(resolve => setTimeout(resolve, 80));
    
    const gamesData = {
      games: [
        { id: 1, name: "Super Mario Bros.", platform: "NES", year: 1985, price: 29.99, description: "The classic that started it all!" },
        { id: 2, name: "Sonic the Hedgehog", platform: "Genesis", year: 1991, price: 24.99, description: "Gotta go fast!" },
        { id: 3, name: "Pac-Man", platform: "Arcade", year: 1980, price: 19.99, description: "Chomp dots and avoid ghosts!" },
        { id: 4, name: "The Legend of Zelda", platform: "NES", year: 1986, price: 39.99, description: "Epic adventure awaits!" }
      ]
    };

    const html = await generateSSRHtml('GamesList', {
      games: gamesData.games,
      filters: { genre, platform, page }
    });

    res.send(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Error loading games page');
  }
});

// GET /stats - Statistics page with SSR
router.get('/stats', ssrCacheMiddleware(600), async (req, res) => {
  try {
    // Simulate fetching comprehensive stats
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const statsData = {
      totalGames: 8,
      totalValue: 242.91,
      avgPrice: 30.36,
      oldestYear: 1980,
      newestYear: 1991,
      genreBreakdown: {
        'Platformer': 3,
        'Arcade': 3,
        'Adventure': 1,
        'Shooter': 1
      }
    };

    const html = await generateSSRHtml('GameStats', {
      stats: statsData
    });

    res.send(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Error loading stats page');
  }
});

// GET /game/:id - Individual game page with SSR
router.get('/game/:id', ssrCacheMiddleware(600), async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    
    if (isNaN(gameId)) {
      return res.status(400).send('Invalid game ID');
    }

    // Simulate fetching game details
    await new Promise(resolve => setTimeout(resolve, 60));
    
    const gameData = {
      id: gameId,
      name: "Super Mario Bros.",
      platform: "Nintendo Entertainment System",
      year: 1985,
      price: 29.99,
      description: "The classic that started it all! Jump and run through the Mushroom Kingdom to rescue Princess Peach from Bowser.",
      genre: "Platformer",
      rating: 9.5
    };

    const html = await generateSSRHtml('GameDetail', {
      game: gameData
    });

    res.send(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Error loading game details');
  }
});

module.exports = router;
