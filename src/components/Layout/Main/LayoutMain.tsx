import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainBar } from '../../UI/MainBar/MainBar';
import { Box, Container } from '@mui/material';
import { Footer } from '../../UI/Footer/Footer';

export const LayoutMain = (): JSX.Element => {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <MainBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Container>
  );
};
