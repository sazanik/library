import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainBar } from '../../MainBar/MainBar';
import { Container } from '@mui/material';
import { Footer } from '../../Footer/Footer';

export const AppLayout = (): JSX.Element => {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <MainBar />
      <Outlet />
      <Footer />
    </Container>
  );
};
