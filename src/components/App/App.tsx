import React, { useEffect } from 'react';
import { Root } from '../../screens/Root';
import { setLocalStore } from '../../services/LocalStorage/LocalStorage.service';
import { store } from '../../store/store';
import '../../i18n/i18n';
import { theme } from '../../theme/theme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthContextProvider } from '../../context/AuthContextProvider';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../UI/ErrorFallback/ErrorFallback';

export const App = (): JSX.Element => {
  useEffect(() => {
    window.addEventListener('beforeunload', setLocalStore);
    return () => window.removeEventListener('beforeunload', setLocalStore);
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <AuthContextProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline>
                  <Root />
                </CssBaseline>
              </LocalizationProvider>
            </AuthContextProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};
