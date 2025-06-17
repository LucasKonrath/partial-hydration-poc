import dynamic from 'next/dynamic';
import StaticContent from './staticContent';
import BlogPosts from './BlogPosts';

// Lazy-load Counter (only loaded when needed)
const LazyCounter = dynamic(() => import('./counter'), { ssr: true }); // SSR enabled

export default function Home() {
  return (
    <div>
      <StaticContent />
      <LazyCounter />
      <BlogPosts />
    </div>
  );
};