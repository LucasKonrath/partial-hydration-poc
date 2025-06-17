// Server Component for footer
export default function RetroFooter() {
  return (
    <footer className="bg-black bg-opacity-50 backdrop-blur-sm border-t border-purple-500 border-opacity-30 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">
              🕹️ About Retro Gaming Hub
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your ultimate destination for classic video games from the golden age of gaming. 
              We specialize in authentic retro games from Nintendo, Sega, Atari, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">
              📚 Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  🎮 All Games
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  🏆 Top Rated
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  💎 Rare Finds
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                  📦 Pre-orders
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">
              📧 Stay Updated
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Get notified about new arrivals and exclusive retro gaming deals!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-l px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r transition-colors">
                📮
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Retro Gaming Hub. All rights reserved. Built with ❤️ for retro gaming enthusiasts.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                🐦 Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                📘 Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                📸 Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Retro ASCII Art */}
        <div className="text-center mt-6 text-xs text-gray-600 font-mono">
          <pre>
{`▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
░ GAME OVER - THANKS FOR PLAYING! INSERT COIN TO CONTINUE... ░
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`}
          </pre>
        </div>
      </div>
    </footer>
  );
}
