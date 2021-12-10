import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../styles/main';

export default function NotFound(): JSX.Element {
  return (
    <Box style={styles.box}>
      <Typography>Page not found</Typography>
    </Box>
  );
}
