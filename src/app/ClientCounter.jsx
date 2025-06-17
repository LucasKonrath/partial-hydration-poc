'use client';

import dynamic from 'next/dynamic';

// Lazy-load Counter with loading state
const LazyCounter = dynamic(() => import('./counter'), {
  loading: () => <div>Loading counter...</div>,
  ssr: false // Disable SSR for counter since it's purely client-side
});

export default function ClientCounter() {
  return <LazyCounter />;
}
