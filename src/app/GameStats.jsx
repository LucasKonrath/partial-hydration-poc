'use client';

import { useState, useEffect } from 'react';

export default function GameStats() {
  const [stats, setStats] = useState({
    totalGames: 0,
    totalValue: 0,
    avgPrice: 0,
    newestYear: 0,
    oldestYear: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate loading game stats
    const loadStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        totalGames: 8,
        totalValue: 242.91,
        avgPrice: 30.36,
        newestYear: 1991,
        oldestYear: 1980
      });
      setIsVisible(true);
    };

    loadStats();
  }, []);

  const statItems = [
    {
      icon: '🎮',
      label: 'Total Games',
      value: stats.totalGames,
      suffix: ' games'
    },
    {
      icon: '💰',
      label: 'Collection Value',
      value: `$${stats.totalValue.toFixed(2)}`,
      suffix: ''
    },
    {
      icon: '📊',
      label: 'Average Price',
      value: `$${stats.avgPrice.toFixed(2)}`,
      suffix: ''
    },
    {
      icon: '📅',
      label: 'Year Range',
      value: `${stats.oldestYear} - ${stats.newestYear}`,
      suffix: ''
    }
  ];

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-6 border border-purple-500 border-opacity-30">
        <h3 className="text-2xl font-bold text-white mb-6 text-center font-mono">
          📈 COLLECTION STATS
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <div 
              key={item.label}
              className={`text-center p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 ${
                isVisible ? 'animate-pulse-once' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-xl font-bold text-white mb-1">
                {item.value}{item.suffix}
              </div>
              <div className="text-gray-400 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Fun retro-style progress bars */}
        <div className="mt-6 space-y-3">
          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Platformers</span>
              <span>50%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full w-1/2 transition-all duration-1000"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Nintendo Games</span>
              <span>37.5%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full w-3/8 transition-all duration-1000"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>80s Classics</span>
              <span>62.5%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full w-5/8 transition-all duration-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
