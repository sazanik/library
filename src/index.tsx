import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App/App';
import './i18n/i18n';
import './index.scss';
import { store } from './store/store';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material';
import { AuthProvider } from './context/Auth/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
