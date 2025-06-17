// Server Component (async data fetching with ISR)
import { unstable_noStore as noStore } from 'next/cache';

async function getBlogPosts() {
  noStore();  // Opt out of static rendering for this fetch
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      next: {
        revalidate: 60, // Revalidate every 60 seconds
        tags: ['blog-posts']
      }
    });
    
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPosts() {
  const posts = await getBlogPosts();

  if (!posts.length) {
    return (
      <div style={{ margin: '20px 0', padding: '1rem', border: '1px solid #eee' }}>
        <h2>Latest Blog Posts</h2>
        <p>No posts available at the moment. Please try again later.</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px 0', padding: '1rem', border: '1px solid #eee' }}>
      <h2>Latest Blog Posts (Server-Fetched)</h2>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}