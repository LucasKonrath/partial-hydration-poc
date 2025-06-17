export default function Loading() {
  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f0f0',
      borderRadius: '8px'
    }}>
      <div className="loading-spinner">Loading...</div>
    </div>
  );
}
