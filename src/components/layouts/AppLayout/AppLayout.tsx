import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainBar } from '../../MainBar/MainBar';

export const AppLayout = (): JSX.Element => {
  return (
    <>
      <header>
        <MainBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>{new Date().getFullYear()}</footer>
    </>
  );
};
