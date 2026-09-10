import { useState, useEffect } from 'react';
import api from './services/api';

function App() {
  const [message, setMessage] = useState<string>('Laddar...');
  const [status, setStatus] = useState<string>('Kollar anslutning...');

  useEffect(() => {
    // Hämta root-endpointen från FastAPI
    api.get('/')
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage('Kunde inte nå FastAPI-backenden');
        console.error(error);
      });

    // Hämta health-check
    api.get('/health')
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch(() => {
        setStatus('offline');
      });
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>ML Fullstack Dashboard</h1>
      <p><strong>FastAPI Svar:</strong> {message}</p>
      <p><strong>Backend Status:</strong> <span style={{ color: status === 'healthy' ? 'green' : 'red' }}>{status}</span></p>
    </div>
  );
}

export default App;