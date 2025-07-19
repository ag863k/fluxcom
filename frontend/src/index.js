import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Imports the Tailwind CSS styles
import App from './App';   // Imports your main App component

// This is the standard entry point for a Create React App project.
// It finds the 'root' div in your public/index.html file.
const root = ReactDOM.createRoot(document.getElementById('root'));

// It then tells React to render your entire <App /> component inside that div.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
