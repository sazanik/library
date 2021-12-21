import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './NotFound.styles';

export const NotFound = (): JSX.Element => {
  return (
    <Box sx={styles.box}>
      <Typography>Page not found</Typography>
    </Box>
  );
};
