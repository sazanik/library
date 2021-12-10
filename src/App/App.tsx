import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import { theme } from '../styles/theme';
import pages from '../pages/';
import styles from '../styles/app';

import Layout from '../components/Layout/Layout';

export default function App(): JSX.Element {
  const { AuthorsPage, AuthorPage, BooksPage, BookPage, NotFound } = pages;
  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.box}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<AuthorsPage />} />
            <Route path='/:id' element={<AuthorPage />} />
            <Route path='/books' element={<BooksPage />} />
            <Route path='/books/id' element={<BookPage />} />
            <Route path='/*' element={<NotFound />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
