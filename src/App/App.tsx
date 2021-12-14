import React, { ReactElement, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import pages from '../views/';
import styles from './App.styles';

import Layout from '../components/Layout/Layout';
import { store } from './store';

export default function App(): ReactElement {
  const { Authors, Author, Books, Book, NotFound } = pages;

  const setLocalData = (): void => {
    console.log('Write');
    localStorage.setItem('store', JSON.stringify(store.getState()));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', setLocalData);
    return () => window.removeEventListener('beforeunload', setLocalData);
  });

  return (
    <ThemeProvider theme={styles.theme}>
      <Box sx={styles.box}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Authors />} />
            <Route path='/:id' element={<Author />} />
            <Route path='/books' element={<Books />} />
            <Route path='/books/:id' element={<Book />} />
            <Route path='/*' element={<NotFound />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
