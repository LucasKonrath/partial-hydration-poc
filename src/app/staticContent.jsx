import Image from 'next/image';

// Server Component (no 'use client' → no client-side JS)
export default function StaticContent() {
  return (
    <div style={{ margin: '20px 0', padding: '1rem', border: '1px solid #eee' }}>
      <h2>Static Content (Server-Rendered)</h2>
      <p>This text is rendered on the server and sent as static HTML. No client-side JavaScript is loaded for this component.</p>
      <Image 
        src="https://nextjs.org/images/learn.png" 
        alt="Next.js Logo" 
        width={200}
        height={116}
        priority={true}
        style={{ marginTop: '1rem' }} 
      />
    </div>
  );
}