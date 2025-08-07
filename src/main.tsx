import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import * as serviceWorker from './utils/serviceWorker';

// Initialize React app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for offline support
serviceWorker.register({
  onUpdate: (registration) => {
    // Show update notification to user
    console.log('New version available! Refresh to update.');
  },
  onSuccess: (registration) => {
    console.log('App is ready for offline use!');
  }
});