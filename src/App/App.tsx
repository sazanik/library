import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { MainRouting } from '../routing/MainRouting/MainRouting';
import { styles } from './App.styles';
import { setLocalStore } from '../services/LocalStorage/LocalStorage.service';

export const App = (): JSX.Element => {
  useEffect(() => {
    window.addEventListener('beforeunload', setLocalStore);
    return () => window.removeEventListener('beforeunload', setLocalStore);
  });

  return (
    <Box sx={styles.box}>
      <MainRouting />
    </Box>
  );
};
