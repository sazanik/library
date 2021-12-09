import React from 'react';
import './App.scss';
import { Link, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Languages from '../components/dropdowns/Languages';
import AuthorsPage from '../pages/AuthorsPage';
import BooksTable from '../pages/BooksPage';

export default function App(): JSX.Element {
  const { t } = useTranslation('translation');
  return (
    <div className='App'>
      <Languages />
      <Link to='/'>{t('authors')}</Link>
      <Link to='/books'>{t('books')}</Link>
      <h1>{t('greeting')}</h1>
      <Routes>
        <Route path='/' element={<AuthorsPage />} />
        <Route path='/books' element={<BooksTable />} />
      </Routes>
    </div>
  );
}
