// Server Component (no 'use client' → no client-side JS)
export default function RetroGameHeader() {
  return (
    <header className="bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-4 font-mono">
            🕹️ RETRO GAMING HUB
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Relive the Golden Age of Gaming
          </p>
          <p className="text-gray-400">
            Classic games from Nintendo, Sega, Atari, and more!
          </p>
        </div>
        
        {/* Retro ASCII art decoration */}
        <div className="text-center mt-6 text-xs text-gray-500 font-mono">
          <pre>
{`    ████████    ████████    ██      ██  ████████
    ██    ██    ██          ████  ████  ██
    ████████    ████████      ██████    ████████
    ██    ██    ██            ██████    ██
    ██    ██    ████████      ██  ██    ████████`}
          </pre>
        </div>
      </div>
    </header>
  );
}
