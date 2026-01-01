
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Función de inicialización segura.
 * Verifica que el elemento raíz sea un Nodo válido antes de montar React.
 * Esto evita el error de MutationObserver causado por scripts externos (como Tailwind CDN)
 * que intentan observar el DOM antes de que esté listo.
 */
const mountApplication = () => {
  const container = document.getElementById('root');

  if (!(container instanceof HTMLElement)) {
    // Si el nodo no existe o no es del tipo correcto, esperamos un poco y reintentamos
    console.warn('[LimpiaBnB] El nodo raíz no está listo. Reintentando...');
    requestAnimationFrame(mountApplication);
    return;
  }

  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('[LimpiaBnB] Error crítico durante el montaje:', error);
  }
};

// Iniciamos la carga cuando el DOM esté interactivo o completo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApplication);
} else {
  mountApplication();
}
