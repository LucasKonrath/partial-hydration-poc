// Server Component (async data fetching)
async function getBlogPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache', // Cache data for faster subsequent loads
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function BlogPosts() {
  const posts = await getBlogPosts();

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