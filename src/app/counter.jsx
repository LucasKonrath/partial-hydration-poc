// Client Component (requires 'use client' → hydrated on client)
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ margin: '20px 0', padding: '1rem', border: '1px solid #eee' }}>
      <h2>Dynamic Counter (Hydrated)</h2>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Increment
      </button>
    </div>
  );
}