import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainBar } from '../MainBar/MainBar';

export const Layout = (): JSX.Element => {
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
