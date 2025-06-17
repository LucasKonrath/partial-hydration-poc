'use client';

import { useState } from 'react';

export default function GameFilters() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const platforms = ['all', 'Nintendo Entertainment System', 'Sega Genesis', 'Super Nintendo', 'Game Boy', 'Arcade'];
  const genres = ['all', 'Platformer', 'Adventure', 'Fighting', 'Puzzle', 'Action', 'Arcade'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25', label: 'Under $25' },
    { value: '25-35', label: '$25 - $35' },
    { value: '35+', label: 'Over $35' }
  ];

  return (
    <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-6 mb-8 border border-purple-500 border-opacity-30">
      <h3 className="text-2xl font-bold text-white mb-4 font-mono">🔍 FILTER GAMES</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Platform Filter */}
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Platform
          </label>
          <select 
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-purple-500 focus:outline-none"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform === 'all' ? 'All Platforms' : platform}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Genre
          </label>
          <select 
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-purple-500 focus:outline-none"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Price Range
          </label>
          <select 
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-purple-500 focus:outline-none"
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedPlatform !== 'all' && (
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
            Platform: {selectedPlatform}
            <button 
              onClick={() => setSelectedPlatform('all')}
              className="hover:text-red-300"
            >
              ✕
            </button>
          </span>
        )}
        {selectedGenre !== 'all' && (
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
            Genre: {selectedGenre}
            <button 
              onClick={() => setSelectedGenre('all')}
              className="hover:text-red-300"
            >
              ✕
            </button>
          </span>
        )}
        {priceRange !== 'all' && (
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
            Price: {priceRanges.find(r => r.value === priceRange)?.label}
            <button 
              onClick={() => setPriceRange('all')}
              className="hover:text-red-300"
            >
              ✕
            </button>
          </span>
        )}
      </div>

      {/* Clear All Filters */}
      {(selectedPlatform !== 'all' || selectedGenre !== 'all' || priceRange !== 'all') && (
        <button 
          onClick={() => {
            setSelectedPlatform('all');
            setSelectedGenre('all');
            setPriceRange('all');
          }}
          className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
