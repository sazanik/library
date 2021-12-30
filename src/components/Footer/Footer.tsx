import React from 'react';
import { styles } from './Footer.styles';
import { Box, Typography } from '@mui/material';

export const Footer = (): JSX.Element => (
  <Box sx={styles.box}>
    <Typography>{new Date().getFullYear()}</Typography>
  </Box>
);
