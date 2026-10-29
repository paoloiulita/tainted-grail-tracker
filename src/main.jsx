import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import App from './App';
import './index.css';

// Initialize i18next
i18n.configure({
  resources: {
    en: {
      translation: require('./locales/en.json')
    },
    it: {
      translation: require('./locales/it.json')
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/tainted-grail-tracker/">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);