import { Box, Typography } from '@mui/material';
import React from 'react';

import { styles } from './ScreensNotFound.styles';

export const ScreensNotFound = (): JSX.Element => {
  return (
    <Box sx={styles.box}>
      <Typography>Page not found</Typography>
    </Box>
  );
};
