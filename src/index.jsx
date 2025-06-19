import React, { useState } from 'react';

function App() {
  const [sql, setSql] = useState('');
  const [result, setResult] = useState('');

  const handleRun = async () => {
    // 假设你有 window.api.query(sql) 实现与主进程通信
    if (window.api && window.api.query) {
      const res = await window.api.query(sql);
      setResult(JSON.stringify(res, null, 2));
    } else {
      setResult('Query API not available.');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: 8, borderBottom: '1px solid #ccc' }}>
        <textarea
          value={sql}
          onChange={e => setSql(e.target.value)}
          style={{ width: '100%', height: '80%', fontFamily: 'monospace' }}
          placeholder="Enter SQL here..."
        />
        <button onClick={handleRun} style={{ marginTop: 8 }}>Run SQL</button>
      </div>
      <div style={{ flex: 1, padding: 8 }}>
        <h3>Result</h3>
        <pre style={{ background: '#f5f5f5', height: '80%', overflow: 'auto' }}>{result}</pre>
      </div>
    </div>
  );
}

export default App;