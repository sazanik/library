import React from 'react';
import { Root } from '../../screens/Root';
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
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';
import '../../firebase';

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
