import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
