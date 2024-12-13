import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// This is what builds the app dont touch this.. If you want to add anything, do so on app.js 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

