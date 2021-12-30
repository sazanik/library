import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainBar } from '../../MainBar/MainBar';
import { Box, Container } from '@mui/material';
import { Footer } from '../../Footer/Footer';

export const AppLayout = (): JSX.Element => {
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
