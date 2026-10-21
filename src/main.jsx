import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <>
    <div className="demo-banner" role="note">Demo preview · sample data · no real sign-in or company services connected</div>
    <App />
  </>
);
