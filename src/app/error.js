'use client';

export default function Error({ error, reset }) {
  return (
    <div style={{
      padding: '20px',
      margin: '20px 0',
      border: '1px solid #ff0000',
      borderRadius: '8px',
    }}>
      <h2>Something went wrong!</h2>
      <p>{error.message || 'An unexpected error occurred'}</p>
      <button
        onClick={reset}
        style={{
          padding: '8px 16px',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Try again
      </button>
    </div>
  );
}
