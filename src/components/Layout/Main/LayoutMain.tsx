import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../../Footer/Footer';
import { MainBar } from '../../MainBar/MainBar';
import { styles } from './LayoutMain.styles';

export const LayoutMain = (): JSX.Element => {
  return (
    <Container sx={styles.container} maxWidth={false} disableGutters={true}>
      <MainBar />
      <Box sx={styles.centerBox}>
        <Outlet />
      </Box>
      <Footer />
    </Container>
  );
};
