const express = require('express');
const router = express.Router();

// Mock stats calculation - in production, this would query your database
const calculateStats = async () => {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const games = [
    { id: 1, price: 29.99, year: 1985, inStock: true },
    { id: 2, price: 24.99, year: 1991, inStock: true },
    { id: 3, price: 19.99, year: 1980, inStock: true },
    { id: 4, price: 39.99, year: 1986, inStock: true },
    { id: 5, price: 22.99, year: 1978, inStock: true },
    { id: 6, price: 27.99, year: 1981, inStock: false },
    { id: 7, price: 21.99, year: 1981, inStock: true },
    { id: 8, price: 34.99, year: 1991, inStock: true }
  ];
  
  const availableGames = games.filter(game => game.inStock);
  const totalGames = availableGames.length;
  const totalValue = availableGames.reduce((sum, game) => sum + game.price, 0);
  const avgPrice = totalValue / totalGames;
  const years = availableGames.map(game => game.year);
  const newestYear = Math.max(...years);
  const oldestYear = Math.min(...years);
  
  // Genre distribution (mock data)
  const genreStats = {
    'Platformer': 3,
    'Arcade': 3,
    'Adventure': 1,
    'Shooter': 2,
    'Fighting': 1
  };
  
  // Platform distribution
  const platformStats = {
    'Arcade': 5,
    'Nintendo Entertainment System': 2,
    'Sega Genesis': 1
  };
  
  return {
    totalGames,
    totalValue: parseFloat(totalValue.toFixed(2)),
    avgPrice: parseFloat(avgPrice.toFixed(2)),
    newestYear,
    oldestYear,
    yearRange: newestYear - oldestYear,
    genreStats,
    platformStats,
    priceRanges: {
      'Under $25': availableGames.filter(g => g.price < 25).length,
      '$25 - $35': availableGames.filter(g => g.price >= 25 && g.price < 35).length,
      '$35+': availableGames.filter(g => g.price >= 35).length
    },
    decadeStats: {
      '1970s': availableGames.filter(g => g.year >= 1970 && g.year < 1980).length,
      '1980s': availableGames.filter(g => g.year >= 1980 && g.year < 1990).length,
      '1990s': availableGames.filter(g => g.year >= 1990 && g.year < 2000).length
    }
  };
};

// Cache middleware for stats
const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const cache = req.app.locals.cache;
    const key = `stats_${req.originalUrl}`;
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

// GET /api/stats - Get comprehensive game collection statistics
router.get('/', cacheMiddleware(300), async (req, res) => {
  try {
    const stats = await calculateStats();
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: stats
    });
  } catch (error) {
    console.error('Error calculating stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to calculate statistics' 
    });
  }
});

// GET /api/stats/summary - Get basic summary stats (lighter payload)
router.get('/summary', cacheMiddleware(600), async (req, res) => {
  try {
    const stats = await calculateStats();
    
    res.json({
      success: true,
      data: {
        totalGames: stats.totalGames,
        totalValue: stats.totalValue,
        avgPrice: stats.avgPrice,
        newestYear: stats.newestYear,
        oldestYear: stats.oldestYear
      }
    });
  } catch (error) {
    console.error('Error calculating summary stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to calculate summary statistics' 
    });
  }
});

// GET /api/stats/genres - Get genre distribution
router.get('/genres', cacheMiddleware(600), async (req, res) => {
  try {
    const stats = await calculateStats();
    
    res.json({
      success: true,
      data: stats.genreStats
    });
  } catch (error) {
    console.error('Error calculating genre stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to calculate genre statistics' 
    });
  }
});

// GET /api/stats/platforms - Get platform distribution
router.get('/platforms', cacheMiddleware(600), async (req, res) => {
  try {
    const stats = await calculateStats();
    
    res.json({
      success: true,
      data: stats.platformStats
    });
  } catch (error) {
    console.error('Error calculating platform stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to calculate platform statistics' 
    });
  }
});

// GET /api/stats/prices - Get price range distribution
router.get('/prices', cacheMiddleware(600), async (req, res) => {
  try {
    const stats = await calculateStats();
    
    res.json({
      success: true,
      data: stats.priceRanges
    });
  } catch (error) {
    console.error('Error calculating price stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to calculate price statistics' 
    });
  }
});

// GET /api/stats/decades - Get decade distribution
router.get('/decades', cacheMiddleware(600), async (req, res) => {
  try {
    const stats = await calculateStats();
    
    res.json({
      success: true,
      data: stats.decadeStats
    });
  } catch (error) {
    console.error('Error calculating decade stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to calculate decade statistics' 
    });
  }
});

module.exports = router;
