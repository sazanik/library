import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainBar } from '../../MainBar/MainBar';
import { Box, Container } from '@mui/material';
import { Footer } from '../../Footer/Footer';
import { styles } from './LayoutMain.styles';

export const LayoutMain = (): JSX.Element => {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <MainBar />
      <Box sx={styles.box}>
        <Outlet />
      </Box>
      <Footer />
    </Container>
  );
};
