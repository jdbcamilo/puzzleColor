import React from 'react';
import ReactDOM from 'react-dom/client';
import MemoryPathGame from './MemoryPathGame.jsx'; 
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MemoryPathGame />
  </React.StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.accept();
}