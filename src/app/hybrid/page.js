import { Suspense } from 'react';
import OptimizedGamesList from './OptimizedGamesList';
import OptimizedGameStats from './OptimizedGameStats';
import RetroGameHeader from './RetroGameHeader';
import RetroFooter from './RetroFooter';
import RetroLoader from './RetroLoader';

// This component demonstrates the hybrid approach
export default function HybridPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <RetroGameHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
            🎮 Retro Games Universe
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the perfect blend of Server-Side Rendering and dynamic API-driven content
          </p>
          
          <div className="mt-6 flex justify-center gap-4">
            <div className="bg-green-600/20 border border-green-600 px-4 py-2 rounded-lg">
              <span className="text-green-400 font-semibold">✓ SSR Optimized</span>
            </div>
            <div className="bg-blue-600/20 border border-blue-600 px-4 py-2 rounded-lg">
              <span className="text-blue-400 font-semibold">⚡ API Powered</span>
            </div>
            <div className="bg-purple-600/20 border border-purple-600 px-4 py-2 rounded-lg">
              <span className="text-purple-400 font-semibold">🚀 Performance</span>
            </div>
          </div>
        </div>

        {/* These components use the Express API backend */}
        <Suspense fallback={<RetroLoader message="Loading games from API..." />}>
          <OptimizedGamesList />
        </Suspense>

        <Suspense fallback={<RetroLoader message="Loading statistics..." />}>
          <OptimizedGameStats />
        </Suspense>

        {/* Performance metrics section */}
        <section className="mt-12 py-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🚀 Performance Features
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="text-lg font-semibold text-white mb-2">Server-Side Rendering</h4>
                <p className="text-gray-300 text-sm">
                  Initial HTML rendered on Express server for instant page loads and perfect SEO
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h4 className="text-lg font-semibold text-white mb-2">Progressive Hydration</h4>
                <p className="text-gray-300 text-sm">
                  Client-side JavaScript enhances the page with real-time data and interactivity
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">💾</div>
                <h4 className="text-lg font-semibold text-white mb-2">Smart Caching</h4>
                <p className="text-gray-300 text-sm">
                  Multi-layer caching strategy with in-memory, HTTP, and browser caching
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h4 className="text-lg font-semibold text-white mb-2">Rate Limiting</h4>
                <p className="text-gray-300 text-sm">
                  Built-in protection against abuse with intelligent rate limiting
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="text-lg font-semibold text-white mb-2">Real-time APIs</h4>
                <p className="text-gray-300 text-sm">
                  RESTful APIs with filtering, sorting, pagination, and validation
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="text-lg font-semibold text-white mb-2">Hybrid Architecture</h4>
                <p className="text-gray-300 text-sm">
                  Best of both worlds: SSR for speed, APIs for dynamic content
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture explanation */}
        <section className="mt-8 py-8">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-center mb-4 text-purple-300">
              🏗️ Hybrid Architecture Explained
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">SSR Routes (Express Server)</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• <code className="bg-gray-700 px-1 rounded">/</code> - Server-rendered home page</li>
                  <li>• <code className="bg-gray-700 px-1 rounded">/games</code> - Server-rendered games list</li>
                  <li>• <code className="bg-gray-700 px-1 rounded">/stats</code> - Server-rendered statistics</li>
                  <li>• <code className="bg-gray-700 px-1 rounded">/game/:id</code> - Server-rendered game details</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-400 mb-2">API Routes (JSON Endpoints)</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• <code className="bg-gray-700 px-1 rounded">/api/games</code> - Games data with filtering</li>
                  <li>• <code className="bg-gray-700 px-1 rounded">/api/stats</code> - Collection statistics</li>
                  <li>• <code className="bg-gray-700 px-1 rounded">/api/games/:id</code> - Individual game data</li>
                  <li>• <code className="bg-gray-700 px-1 rounded">/health</code> - Server health monitoring</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <p className="text-blue-200 text-center text-sm">
                💡 <strong>Pro Tip:</strong> The Express backend serves pre-rendered HTML for instant loading, 
                then Next.js takes over with dynamic API calls for real-time updates and interactivity.
              </p>
            </div>
          </div>
        </section>
      </div>
      
      <RetroFooter />
    </div>
  );
}
