import React, { ReactElement, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import styles from './styles';
import theme from './theme';
import Layout from '../components/Layout/Layout';
import { store } from './store';
import pages from '../pages';

export default function App(): ReactElement {
  const { Registration, Login, Authors, Author, Books, Book, NotFound } = pages;

  const setLocalData = (): void => {
    console.log('Write');
    localStorage.setItem('store', JSON.stringify(store.getState()));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', setLocalData);
    return () => window.removeEventListener('beforeunload', setLocalData);
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.box}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Registration />} />
            <Route path='login' element={<Login />} />
            <Route path='authors' element={<Authors />} />
            <Route path='authors/:id' element={<Author />} />
            <Route path='books' element={<Books />} />
            <Route path='books/:id' element={<Book />} />
            <Route path='/*' element={<NotFound />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
