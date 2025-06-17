// Server Component with ISR for game data
import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';

// Mock retro games data - using placeholder images that don't require external configuration
async function getRetroGames() {
  // For demo purposes, we'll simulate an API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: 1,
      name: "Super Mario Bros.",
      platform: "Nintendo Entertainment System",
      year: 1985,
      price: 29.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23FF6B6B'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E🍄 MARIO%3C/text%3E%3C/svg%3E",
      genre: "Platformer",
      description: "The classic that started it all! Jump and run through the Mushroom Kingdom."
    },
    {
      id: 2,
      name: "Sonic the Hedgehog",
      platform: "Sega Genesis",
      year: 1991,
      price: 24.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%234ECDC4'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E💨 SONIC%3C/text%3E%3C/svg%3E",
      genre: "Platformer",
      description: "Gotta go fast! Experience the blue blur's first adventure."
    },
    {
      id: 3,
      name: "Pac-Man",
      platform: "Arcade",
      year: 1980,
      price: 19.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23FFE66D'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='black' text-anchor='middle'%3E🟡 PAC-MAN%3C/text%3E%3C/svg%3E",
      genre: "Arcade",
      description: "Chomp dots and avoid ghosts in this timeless arcade classic."
    },
    {
      id: 4,
      name: "The Legend of Zelda",
      platform: "Nintendo Entertainment System",
      year: 1986,
      price: 39.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%2395E1D3'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E⚔️ ZELDA%3C/text%3E%3C/svg%3E",
      genre: "Adventure",
      description: "Embark on an epic quest to save Princess Zelda in Hyrule."
    },
    {
      id: 5,
      name: "Street Fighter II",
      platform: "Super Nintendo",
      year: 1991,
      price: 34.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23F38BA8'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E👊 STREET%3C/text%3E%3Ctext x='150' y='230' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EFIGHTER%3C/text%3E%3C/svg%3E",
      genre: "Fighting",
      description: "Master martial arts in the ultimate fighting game experience."
    },
    {
      id: 6,
      name: "Tetris",
      platform: "Game Boy",
      year: 1989,
      price: 22.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23A8DADC'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='black' text-anchor='middle'%3E🧩 TETRIS%3C/text%3E%3C/svg%3E",
      genre: "Puzzle",
      description: "Stack blocks and clear lines in this addictive puzzle game."
    },
    {
      id: 7,
      name: "Donkey Kong",
      platform: "Arcade",
      year: 1981,
      price: 27.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23D4A574'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E🦍 DONKEY%3C/text%3E%3Ctext x='150' y='230' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EKONG%3C/text%3E%3C/svg%3E",
      genre: "Platformer",
      description: "Help Mario rescue Pauline from the giant ape Donkey Kong."
    },
    {
      id: 8,
      name: "Mega Man 2",
      platform: "Nintendo Entertainment System",
      year: 1988,
      price: 32.99,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%236A9BD1'/%3E%3Ctext x='150' y='200' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3E🤖 MEGA%3C/text%3E%3Ctext x='150' y='230' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EMAN 2%3C/text%3E%3C/svg%3E",
      genre: "Action",
      description: "Battle robot masters with the Blue Bomber's legendary arsenal."
    }
  ];
}

export default async function GamesList() {
  const games = await getRetroGames();

  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-white mb-8 text-center font-mono">
        🎮 CLASSIC GAMES COLLECTION
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <div 
            key={game.id} 
            className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl border border-purple-500 border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={game.image}
                alt={game.name}
                width={300}
                height={400}
                className="w-full h-full object-cover"
                priority={game.id <= 4} // Prioritize loading for first 4 games
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {game.year}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2 font-mono">
                {game.name}
              </h3>
              
              <p className="text-gray-300 text-sm mb-2">
                {game.platform}
              </p>
              
              <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                {game.description}
              </p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                  {game.genre}
                </span>
                <span className="text-2xl font-bold text-green-400">
                  ${game.price}
                </span>
              </div>
              
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-semibold">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
