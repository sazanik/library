import '../../firebase';
import '../../i18n/i18n';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import { PAGINATION_LOCALES } from '../../constants/constants';
import { AuthContextProvider } from '../../context/AuthContextProvider';
import { useAppSelector } from '../../hooks';
import { Root } from '../../screens/Root';
import { theme } from '../../theme/theme';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';

export const App = (): JSX.Element => {
  const { locale } = useAppSelector((state) => state.app);

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, PAGINATION_LOCALES[locale]),
    //eslint-disable-next-line
    [locale, theme]
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <ThemeProvider theme={themeWithLocale}>
          <AuthContextProvider>
            <CssBaseline>
              <Root />
            </CssBaseline>
          </AuthContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
