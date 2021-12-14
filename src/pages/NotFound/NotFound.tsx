import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../Authors/styles';

export default function NotFound(): ReactElement {
  return (
    <Box style={styles.box}>
      <Typography>Page not found</Typography>
    </Box>
  );
}
