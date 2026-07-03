import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { enforceHttpsRedirect } from './utils/security';
import { router, routerFallbackElement } from './app/router';
import { store } from './app/store';

enforceHttpsRedirect();

const rootElement = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={routerFallbackElement} />
    </Provider>
  </React.StrictMode>
);

if (import.meta.env.PROD && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener(
    'load',
    () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    },
    { once: true }
  );
}
