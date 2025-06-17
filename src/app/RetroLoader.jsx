// Server Component for loading states
export default function RetroLoader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Retro-style loading animation */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-pink-500 border-b-transparent rounded-full animate-spin animate-reverse"></div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="text-xl text-white font-mono mb-2">
          {message}
        </div>
        <div className="text-gray-400 text-sm font-mono">
          🕹️ Please wait...
        </div>
      </div>
      
      {/* Retro dots animation */}
      <div className="flex space-x-2 mt-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
