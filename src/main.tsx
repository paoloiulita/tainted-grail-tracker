import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { CssBaseline, ThemeProvider } from '@mui/material';
import i18n from 'i18next';
import { CampaignProvider } from './contexts/CampaignContext';
import App from './App';
import './index.css';
import en from './locales/en.json';
import it from './locales/it.json';
import theme from './theme';

i18n.init({
  resources: {
    en: { translation: en },
    it: { translation: it }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Missing root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CampaignProvider>
        <BrowserRouter basename="/tainted-grail-tracker/">
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </BrowserRouter>
      </CampaignProvider>
    </ThemeProvider>
  </React.StrictMode>
);