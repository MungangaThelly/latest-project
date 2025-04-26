import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Kör MSW i dev mode bara
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass', // eller 'warn'  
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
