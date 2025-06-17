const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();

// Mock database - in production, replace with actual database
const gamesDatabase = [
  {
    id: 1,
    name: "Super Mario Bros.",
    platform: "Nintendo Entertainment System",
    year: 1985,
    price: 29.99,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23FF6B6B'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E🍄 MARIO%3C/text%3E%3C/svg%3E",
    genre: "Platformer",
    description: "The classic that started it all! Jump and run through the Mushroom Kingdom.",
    rating: 9.5,
    popularity: 98,
    inStock: true,
    tags: ["classic", "nintendo", "platformer"]
  },
  {
    id: 2,
    name: "Sonic the Hedgehog",
    platform: "Sega Genesis",
    year: 1991,
    price: 24.99,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%234ECDC4'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E💨 SONIC%3C/text%3E%3C/svg%3E",
    genre: "Platformer",
    description: "Gotta go fast! Experience the blue blur's first adventure.",
    rating: 9.0,
    popularity: 85,
    inStock: true,
    tags: ["classic", "sega", "speed", "platformer"]
  },
  {
    id: 3,
    name: "Pac-Man",
    platform: "Arcade",
    year: 1980,
    price: 19.99,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23FFE66D'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='black' text-anchor='middle'%3E🟡 PAC-MAN%3C/text%3E%3C/svg%3E",
    genre: "Arcade",
    description: "Chomp dots and avoid ghosts in this timeless arcade classic.",
    rating: 8.8,
    popularity: 92,
    inStock: true,
    tags: ["arcade", "classic", "puzzle"]
  },
  {
    id: 4,
    name: "The Legend of Zelda",
    platform: "Nintendo Entertainment System",
    year: 1986,
    price: 39.99,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%2395E1D3'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E⚔️ ZELDA%3C/text%3E%3C/svg%3E",
    genre: "Adventure",
    description: "Embark on an epic quest to save Princess Zelda in Hyrule.",
    rating: 9.8,
    popularity: 96,
    inStock: true,
    tags: ["adventure", "nintendo", "rpg", "classic"]
  },
  {
    id: 5,
    name: "Space Invaders",
    platform: "Arcade",
    year: 1978,
    price: 22.99,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%236C5CE7'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E👾 INVADERS%3C/text%3E%3C/svg%3E",
    genre: "Shooter",
    description: "Defend Earth from the alien invasion in this pioneering shooter.",
    rating: 8.5,
    popularity: 78,
    inStock: true,
    tags: ["arcade", "shooter", "classic", "retro"]
  },
  {
    id: 6,
    name: "Donkey Kong",
    platform: "Arcade",
    year: 1981,
    price: 27.99,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23FFA726'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E🦍 KONG%3C/text%3E%3C/svg%3E",
    genre: "Platformer",
    description: "Help Mario rescue the princess from the mighty Donkey Kong.",
    rating: 8.7,
    popularity: 82,
    inStock: false,
    tags: ["arcade", "platformer", "nintendo", "classic"]
  },
  {
    id: 7,
    name: "Galaga",
    platform: "Arcade",
    year: 1981,
    price: 21.99,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23E74C3C'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E🚀 GALAGA%3C/text%3E%3C/svg%3E",
    genre: "Shooter",
    description: "Take on alien forces in this enhanced sequel to Galaxian.",
    rating: 8.9,
    popularity: 75,
    inStock: true,
    tags: ["arcade", "shooter", "space", "classic"]
  },
  {
    id: 8,
    name: "Street Fighter II",
    platform: "Arcade",
    year: 1991,
    price: 34.99,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%2334495e'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E👊 FIGHTER%3C/text%3E%3C/svg%3E",
    genre: "Fighting",
    description: "Master the art of combat in this legendary fighting game.",
    rating: 9.3,
    popularity: 88,
    inStock: true,
    tags: ["fighting", "arcade", "competitive", "classic"]
  }
];

// Cache middleware for games routes
const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const cache = req.app.locals.cache;
    const key = `games_${req.originalUrl}`;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.json(cachedResponse);
    }
    
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
    };
    next();
  };
};

// Validation rules
const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('sortBy').optional().isIn(['name', 'year', 'price', 'rating', 'popularity']),
  query('sortOrder').optional().isIn(['asc', 'desc']),
  query('genre').optional().isString().trim(),
  query('platform').optional().isString().trim(),
  query('minYear').optional().isInt({ min: 1970, max: new Date().getFullYear() }).toInt(),
  query('maxYear').optional().isInt({ min: 1970, max: new Date().getFullYear() }).toInt(),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('search').optional().isString().trim(),
  query('inStock').optional().isBoolean().toBoolean()
];

// GET /api/games - Get all games with filtering, sorting, and pagination
router.get('/', cacheMiddleware(300), paginationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 50));

    let filteredGames = [...gamesDatabase];
    
    // Apply filters
    const { genre, platform, minYear, maxYear, minPrice, maxPrice, search, inStock } = req.query;
    
    if (genre) {
      filteredGames = filteredGames.filter(game => 
        game.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
    
    if (platform) {
      filteredGames = filteredGames.filter(game => 
        game.platform.toLowerCase().includes(platform.toLowerCase())
      );
    }
    
    if (minYear) {
      filteredGames = filteredGames.filter(game => game.year >= minYear);
    }
    
    if (maxYear) {
      filteredGames = filteredGames.filter(game => game.year <= maxYear);
    }
    
    if (minPrice) {
      filteredGames = filteredGames.filter(game => game.price >= minPrice);
    }
    
    if (maxPrice) {
      filteredGames = filteredGames.filter(game => game.price <= maxPrice);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredGames = filteredGames.filter(game => 
        game.name.toLowerCase().includes(searchLower) ||
        game.description.toLowerCase().includes(searchLower) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (inStock !== undefined) {
      filteredGames = filteredGames.filter(game => game.inStock === inStock);
    }

    // Apply sorting
    const sortBy = req.query.sortBy || 'popularity';
    const sortOrder = req.query.sortOrder || 'desc';
    
    filteredGames.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'year') {
        comparison = a.year - b.year;
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortBy === 'popularity') {
        comparison = a.popularity - b.popularity;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Apply pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedGames = filteredGames.slice(startIndex, endIndex);
    
    const totalGames = filteredGames.length;
    const totalPages = Math.ceil(totalGames / limit);
    
    res.json({
      games: paginatedGames,
      pagination: {
        currentPage: page,
        totalPages,
        totalGames,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
      },
      filters: {
        genre,
        platform,
        minYear,
        maxYear,
        minPrice,
        maxPrice,
        search,
        inStock
      },
      sort: {
        sortBy,
        sortOrder
      }
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/games/:id - Get a specific game
router.get('/:id', cacheMiddleware(600), async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    
    if (isNaN(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }

    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 30));
    
    const game = gamesDatabase.find(g => g.id === gameId);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/games/featured/random - Get random featured games
router.get('/featured/random', cacheMiddleware(120), async (req, res) => {
  try {
    const count = Math.min(parseInt(req.query.count) || 3, 8);
    
    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 40));
    
    const shuffled = [...gamesDatabase].sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, count);
    
    res.json({
      games: featured,
      count: featured.length
    });
  } catch (error) {
    console.error('Error fetching featured games:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/games/genres - Get available genres
router.get('/meta/genres', cacheMiddleware(3600), async (req, res) => {
  try {
    const genres = [...new Set(gamesDatabase.map(game => game.genre))].sort();
    
    res.json({
      genres,
      count: genres.length
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/games/platforms - Get available platforms
router.get('/meta/platforms', cacheMiddleware(3600), async (req, res) => {
  try {
    const platforms = [...new Set(gamesDatabase.map(game => game.platform))].sort();
    
    res.json({
      platforms,
      count: platforms.length
    });
  } catch (error) {
    console.error('Error fetching platforms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
