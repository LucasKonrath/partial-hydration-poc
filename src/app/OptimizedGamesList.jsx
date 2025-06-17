'use client';

import { useState, useEffect } from 'react';

export default function OptimizedGamesList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    sortBy: 'popularity',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams(filters);
        const response = await fetch(`/api/games?${queryParams}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        
        const data = await response.json();
        setGames(data.games);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filters]);

  const handleSortChange = (newSortBy) => {
    setFilters(prev => ({
      ...prev,
      sortBy: newSortBy,
      sortOrder: prev.sortBy === newSortBy && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">⚠️ Error loading games</div>
        <p className="text-gray-300">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          🎮 Retro Games Collection
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => handleSortChange('name')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filters.sortBy === 'name' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Name {filters.sortBy === 'name' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('year')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filters.sortBy === 'year' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Year {filters.sortBy === 'year' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('price')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filters.sortBy === 'price' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Price {filters.sortBy === 'price' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
                <p className="text-cyan-400 text-sm">{game.platform}</p>
                <p className="text-gray-400 text-xs">Released: {game.year}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">${game.price.toFixed(2)}</div>
                {game.inStock ? (
                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full">In Stock</span>
                ) : (
                  <span className="text-xs bg-red-600 px-2 py-1 rounded-full">Out of Stock</span>
                )}
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{game.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">{game.genre}</span>
                {game.rating && (
                  <span className="text-xs bg-yellow-600 px-2 py-1 rounded-full">⭐ {game.rating}</span>
                )}
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 rounded-lg text-white text-sm font-semibold transition-all duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {games.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">🎮 No games found</div>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      )}
    </section>
  );
}
