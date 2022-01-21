import { Box, Typography } from '@mui/material';
import React from 'react';

import { styles } from './Footer.styles';

export const Footer = (): JSX.Element => (
  <Box sx={styles.box}>
    <Typography>{new Date().getFullYear()}</Typography>
  </Box>
);
