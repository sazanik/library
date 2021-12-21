import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Authors/styles';

export const NotFound = (): JSX.Element => {
  return (
    <Box style={styles.box}>
      <Typography>Page not found</Typography>
    </Box>
  );
};
