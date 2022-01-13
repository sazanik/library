import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loader = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};
