import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import pages from '../views/';
import styles from './App.styles';

import Layout from '../components/Layout/Layout';

export default function App(): ReactElement {
  const { Authors, Author, Books, Book, NotFound } = pages;
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
