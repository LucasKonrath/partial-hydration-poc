import { Suspense } from 'react';
import StaticContent from './staticContent';
import BlogPosts from './BlogPosts';
import ClientCounter from './ClientCounter';

export default function Home() {
  return (
    <div>
      <StaticContent />
      <Suspense fallback={<div>Loading counter...</div>}>
        <ClientCounter />
      </Suspense>
      <Suspense fallback={<div>Loading blog posts...</div>}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}