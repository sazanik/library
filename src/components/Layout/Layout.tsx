import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';

export const Layout = (): JSX.Element => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>{new Date().getFullYear()}</footer>
    </>
  );
};
