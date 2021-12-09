import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Languages from '../components/dropdowns/Languages';
import AuthorsPage from '../pages/AuthorsPage';
import BooksTable from '../pages/BooksPage';
import { ThemeProvider, Box } from '@mui/material';
import { theme } from '../styles/theme';
import styles from '../styles/app';

export default function App(): JSX.Element {
  const { t } = useTranslation('translation');

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.box}>
        <Languages />
        <Link to='/'>{t('authors')}</Link>
        <Link to='/books'>{t('books')}</Link>
        <h1>{t('greeting')}</h1>

        <Routes>
          <Route path='/' element={<AuthorsPage />} />
          <Route path='/books' element={<BooksTable />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
