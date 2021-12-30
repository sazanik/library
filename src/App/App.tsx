import React, { useEffect } from 'react';
import { MainRouting } from '../routing/MainRouting/MainRouting';
import { setLocalStore } from '../services/LocalStorage/LocalStorage.service';
import { store } from '../store/store';
import '../i18n/i18n';
import { theme } from '../theme/theme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../context/Auth/AuthProvider';

export const App = (): JSX.Element => {
  useEffect(() => {
    window.addEventListener('beforeunload', setLocalStore);
    return () => window.removeEventListener('beforeunload', setLocalStore);
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline>
              <MainRouting />
            </CssBaseline>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
