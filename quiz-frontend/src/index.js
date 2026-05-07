import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);
// StrictMode is a tool for highlighting potential problems in an application. 
// It activates additional checks and warnings for its descendants. 
// It does not render any visible UI and does not affect the production build. 

  // - Finds the <div id="root"> in public/index.html.
  // - Mounts the entire React app inside that div.
  // - React.StrictMode adds extra development warnings.