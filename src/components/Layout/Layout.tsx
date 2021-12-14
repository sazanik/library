import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function Layout(): ReactElement {
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
}
