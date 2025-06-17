import { Suspense } from 'react';
import RetroGameHeader from './RetroGameHeader';
import GamesList from './GamesList';
import GameFilters from './GameFilters';
import GameStats from './GameStats';
import ShoppingCart from './ShoppingCart';
import RetroLoader from './RetroLoader';
import RetroFooter from './RetroFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <RetroGameHeader />
      <ShoppingCart />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<RetroLoader message="Loading game filters..." />}>
          <GameFilters />
        </Suspense>
        <Suspense fallback={<RetroLoader message="Loading retro games..." />}>
          <GamesList />
        </Suspense>
        <Suspense fallback={<RetroLoader message="Loading collection stats..." />}>
          <GameStats />
        </Suspense>
      </div>
      <RetroFooter />
    </div>
  );
}