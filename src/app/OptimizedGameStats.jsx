'use client';

import { useState, useEffect } from 'react';

export default function OptimizedGameStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('summary');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/stats/${selectedView}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data = await response.json();
        setStats(data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedView]);

  if (loading) {
    return (
      <div className="py-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-6 text-center">
          <div className="text-red-400 mb-2">⚠️ Error loading statistics</div>
          <p className="text-gray-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const renderSummaryView = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg text-center">
        <div className="text-3xl font-bold text-white">{stats.totalGames}</div>
        <div className="text-blue-200 text-sm mt-1">Total Games</div>
      </div>
      <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg text-center">
        <div className="text-3xl font-bold text-white">${stats.totalValue}</div>
        <div className="text-green-200 text-sm mt-1">Collection Value</div>
      </div>
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg text-center">
        <div className="text-3xl font-bold text-white">${stats.avgPrice}</div>
        <div className="text-purple-200 text-sm mt-1">Average Price</div>
      </div>
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-4 rounded-lg text-center">
        <div className="text-3xl font-bold text-white">{stats.oldestYear}-{stats.newestYear}</div>
        <div className="text-orange-200 text-sm mt-1">Year Range</div>
      </div>
    </div>
  );

  const renderDetailView = (data, title, color = 'cyan') => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className={`bg-${color}-600/20 border border-${color}-600/40 p-3 rounded-lg`}>
          <div className={`text-2xl font-bold text-${color}-400`}>{value}</div>
          <div className="text-gray-300 text-sm">{key}</div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            📊 Collection Statistics
          </h2>
          
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedView('summary')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedView === 'summary' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setSelectedView('genres')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedView === 'genres' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Genres
            </button>
            <button
              onClick={() => setSelectedView('platforms')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedView === 'platforms' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Platforms
            </button>
            <button
              onClick={() => setSelectedView('decades')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedView === 'decades' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Decades
            </button>
          </div>
        </div>

        {stats && (
          <div className="space-y-6">
            {selectedView === 'summary' && renderSummaryView()}
            {selectedView === 'genres' && renderDetailView(stats, 'Genres', 'purple')}
            {selectedView === 'platforms' && renderDetailView(stats, 'Platforms', 'blue')}
            {selectedView === 'decades' && renderDetailView(stats, 'Decades', 'green')}
          </div>
        )}
      </div>
    </section>
  );
}
