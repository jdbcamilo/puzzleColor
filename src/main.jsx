import React from 'react';
import { createRoot } from 'react-dom/client';
import MemoryPathGame from './MemoryPathGame.jsx'; 
import './styles/App.css';

// Asegurar que el DOM esté listo
const initializeApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  try {
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <MemoryPathGame />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error initializing app:', error);
    
    // Fallback: mostrar mensaje de error
    rootElement.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h2>Error al cargar el juego</h2>
          <p>Por favor, recarga la página</p>
          <button onclick="window.location.reload()" style="
            background: white;
            color: #667eea;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          ">
            Recargar
          </button>
        </div>
      </div>
    `;
  }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}