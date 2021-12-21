import React, { useEffect } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../context/Auth/AuthProvider';
import { MainRouting } from '../routing/MainRouting/MainRouting';
import { theme } from '../theme/theme';
import { styles } from './App.styles';
import { setLocalStore } from '../services/LocalStorage/LocalStorage.service';

export const App = (): JSX.Element => {
  useEffect(() => {
    window.addEventListener('beforeunload', setLocalStore);
    return () => window.removeEventListener('beforeunload', setLocalStore);
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Box sx={styles.box}>
          <MainRouting />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
};
