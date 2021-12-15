import React, { ReactElement, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import styles from './styles';
import theme from './theme';
import Layout from '../components/Layout/Layout';
import { store } from './store';
import pages from '../pages';
import AuthProvider from '../context/Auth/AuthProvider';
import RequireAuth from '../components/hoc/RequireAuth';

export default function App(): ReactElement {
  const { Auth, Authors, Author, Books, Book, NotFound } = pages;

  const setLocalData = (): void => {
    localStorage.setItem('store', JSON.stringify(store.getState()));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', setLocalData);
    return () => window.removeEventListener('beforeunload', setLocalData);
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Box sx={styles.box}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Auth />} />
              <Route
                path='authors'
                element={
                  <RequireAuth>
                    <Authors />
                  </RequireAuth>
                }
              />
              <Route
                path='authors/:id'
                element={
                  <RequireAuth>
                    <Author />
                  </RequireAuth>
                }
              />
              <Route
                path='books'
                element={
                  <RequireAuth>
                    <Books />
                  </RequireAuth>
                }
              />
              <Route
                path='books/:id'
                element={
                  <RequireAuth>
                    <Book />
                  </RequireAuth>
                }
              />
              <Route path='/*' element={<NotFound />} />
            </Route>
          </Routes>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}
