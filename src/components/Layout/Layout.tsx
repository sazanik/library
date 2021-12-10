import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function Layout(): JSX.Element {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet />
      <footer>2021</footer>
    </>
  );
}
