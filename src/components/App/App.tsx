import '../../firebase';
import '../../i18n/i18n';

import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from '../../context/AuthContextProvider';
import { Root } from '../../screens/Root';
import { store } from '../../store/store';
import { theme } from '../../theme/theme';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';

export const App = (): JSX.Element => {
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
